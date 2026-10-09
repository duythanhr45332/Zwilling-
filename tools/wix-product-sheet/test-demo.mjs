// Check the exact demo entered in Sheets, through CSV and the real page/component code.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {loadSource} from './load-source.mjs';
import {runPage} from './test-page-harness.mjs';
const dir=fileURLToPath(new URL('.',import.meta.url));
const input=JSON.parse(fs.readFileSync(process.argv[2] || dir+'demo-input.json','utf8'));
const source=loadSource();
const original=JSON.stringify(source);
const context=vm.createContext({});
vm.runInContext(fs.readFileSync(dir+'Code.gs','utf8')+'\nthis.build=buildNewProducts;',context);
const result=context.build(input['Nhap san pham'],input['Thong so'],source,input['Nhap FeatureBlocks'],input['Nhap FeatureItems']);
assert.equal(JSON.stringify(source),original,'Source snapshot must not change');
// Independent CSV parser, including BOM, commas, quotes, Unicode and multiline bodies.
const parsed=JSON.parse(execFileSync('python3',['-c',
  'import csv,io,json,sys; print(json.dumps({k:list(csv.DictReader(io.StringIO(v.lstrip("\\ufeff")))) for k,v in json.load(sys.stdin).items()}))'],
  {input:JSON.stringify(result.files),encoding:'utf8'}));
const expectedCounts={Products:2,ProductVariants:2,FeatureBlocks:2,FeatureItems:6};
for(const [name,count] of Object.entries(expectedCounts)) {
  const records=parsed[name+'.csv'];
  assert.equal(records.length,count);
  const oldIDs=new Set(source[name].slice(1).map(r=>r[source[name][0].indexOf('ID')]));
  assert.ok(records.every(r=>!oldIDs.has(r.ID)),name+' must contain only new IDs');
}
assert.equal(parsed['Products.csv'][0].color,'Đen');
assert.equal(parsed['Products.csv'][1].color,'Đỏ');
for (const [i, variant] of parsed['ProductVariants.csv'].entries()) {
  const entered=input['Nhap san pham'][i+1];
  assert.equal(variant.sku,entered[2]);
  assert.equal(variant.price,entered[9]);
  assert.equal(variant.stock,entered[11]);
  assert.equal(variant.description,entered[13]);
  assert.equal(variant.color,entered[14]);
  assert.equal(variant.product,parsed['Products.csv'][i].ID);
  assert.deepEqual(JSON.parse(variant.specs),input['Thong so'].slice(1)
    .filter(r=>r[0]===variant.sku).map(r=>({section:r[1],name:r[2],value:r[3]})));
}
assert.equal(parsed['FeatureItems.csv'][0].body,input['Nhap FeatureItems'][1][4]);
assert.equal(parsed['FeatureItems.csv'][0].image,input['Nhap FeatureItems'][1][5]);
const toWix=r=>Object.fromEntries(Object.entries(r).map(([k,v])=>[k==='ID'?'_id':k==='Title'?'title':k,v]));
const rows={};
for(const [name,table] of Object.entries(source)) {
  rows[name]=table.slice(1).map(r=>toWix(Object.fromEntries(table[0].map((h,i)=>[h,r[i]]))));
  rows[name].push(...(parsed[name+'.csv']||[]).map(toWix));
}
for(const p of parsed['Products.csv']) {
  const page=await runPage(toWix(p),rows);
  assert.equal(page.writes['#storySection'].blocks[0]._id,p.storyBlock);
  assert.equal(page.writes['#hotspotSection'].blocks[0]._id,p.highlightsBlock);
  assert.ok(page.writes['#storySection'].items.every(x=>x.block===p.storyBlock));
  assert.ok(page.writes['#hotspotSection'].items.every(x=>x.block===p.highlightsBlock));
  assert.ok(page.writes['#storySection'].items.length>0);
  assert.ok(page.writes['#hotspotSection'].items.length>0);
}
// Exercise actual Lit template methods without a browser; this is not a visual test.
const flatten=x=>typeof x==='function'?'':Array.isArray(x)?x.map(flatten).join(''):String(x??'');
const tag=(strings,...values)=>strings.reduce((s,x,i)=>s+x+flatten(values[i]),'');
const ui=vm.createContext({LitElement:class{},html:tag,css:tag,themeStyles:'',safeDefine(){},
  jsonObjectConverter:{},resolveImageUrl:x=>x,t:()=>'',Set});
const component=fs.readFileSync(dir+'../../src/components/product-detail/wx-feature-blocks.js','utf8')
  .replace(/^import .*;$/gm,'').replace(/^export class /gm,'class ');
vm.runInContext(component+'\nthis.Component=WxFeatureBlocks;',ui);
const element=new ui.Component();
const story=rows.FeatureBlocks.find(b=>b._id==='block-demo-noi-gang-story');
const items=rows.FeatureItems.filter(i=>i.block===story._id).sort((a,b)=>a.position-b.position);
const html=element._renderStoryBlock(story,items);
assert.equal((html.match(/class="feature-card"/g)||[]).length,3);
assert.ok(html.includes(items[0].title));
assert.ok(html.includes(items[0].image));
const highlights=rows.FeatureBlocks.find(b=>b._id==='block-demo-noi-gang-highlights');
const hotspots=rows.FeatureItems.filter(i=>i.block===highlights._id);
const hotspotHtml=element._renderHighlightsBlock(highlights,hotspots);
assert.equal((hotspotHtml.match(/class="hotspot-pin /g)||[]).length,2);
assert.ok(hotspotHtml.includes('left: 35%; top: 40%;'));
assert.ok(hotspotHtml.includes('left: 65%; top: 60%;'));
assert.ok(hotspotHtml.includes(highlights.image));
console.log('PASS: demo Sheets → 4 CSVs → page bindings → Story banner + 3 cards and 2 hotspot templates; source unchanged, new IDs only.');
