import {runPage} from './test-page-harness.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadSource} from './load-source.mjs';
const dir = path.dirname(fileURLToPath(import.meta.url));
const sandbox = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(dir, 'Code.gs'), 'utf8') + '\nthis.api={buildNewProducts,HEADERS,SPEC_HEADERS,BLOCK_HEADERS,ITEM_HEADERS,SOURCE_NAMES};', sandbox);
const {buildNewProducts: build, HEADERS, SPEC_HEADERS, BLOCK_HEADERS, ITEM_HEADERS, SOURCE_NAMES} = sandbox.api;
const source = loadSource(process.argv[2]);
const cat = source.Categories.slice(1).find(r => r[source.Categories[0].indexOf('taxonomy')] === 'product');
const inputRow = changes => HEADERS.map(h => ({'Mã nhóm sản phẩm *':'feature-test', 'Tên sản phẩm *':'Tên hoàn toàn khác', 'SKU *':'000-FEATURE-1', 'Thương hiệu *':'brand-zwilling', 'Danh mục sản phẩm *':cat[source.Categories[0].indexOf('ID')], 'Giá bán *':'1000', 'Tồn kho *':'2', 'Màu sắc':'Đen', ...changes}[h] || ''));
const blocks = [BLOCK_HEADERS,
  ['block-feature-story', 'Story mới', 'story', '', 'Heading', 'Nội dung', '', '', '', ''],
  ['block-feature-highlights', 'Hotspots mới', 'highlights', '', '', '', '', 'wix:image://v1/test.jpg/test.jpg', '', '']];
const items = [ITEM_HEADERS,
  ['feature-intro', 'block-feature-story', '1', 'Giới thiệu', 'Dòng 1\nDòng 2, "quote"', '', '', ''],
  ['feature-card', 'block-feature-story', '2', 'Thẻ', '', '', '', ''],
  ['feature-hotspot', 'block-feature-highlights', '1', 'Mũi dao', 'Chi tiết', '', '0', '100']];
const input = [HEADERS, inputRow({'Story block (ID)':'block-feature-story', 'Highlights block (ID)':'block-feature-highlights'})];
const out = build(input, [SPEC_HEADERS], source, blocks, items);
assert.equal(out.products[0].storyBlock, 'block-feature-story');
assert.equal(out.products[0].highlightsBlock, 'block-feature-highlights');
assert.equal(out.products[0].color, 'Đen');
assert.equal(out.featureItems[2].coordX, 0);
assert.equal(out.featureItems[2].coordY, 100);
assert.deepEqual(Object.keys(out.files).sort(), ['FeatureBlocks.csv','FeatureItems.csv','ProductVariants.csv','Products.csv']);
assert.ok(out.files['Products.csv'].split('\r\n')[0].includes('"storyBlock"'));
assert.ok(out.files['FeatureItems.csv'].includes('Dòng 1\nDòng 2, ""quote""'));
const reject = (i = input, b = blocks, it = items, re) => assert.throws(() => build(i,[SPEC_HEADERS],source,b,it),re);
reject([HEADERS,inputRow({'Story block (ID)':'block-feature-highlights'})],blocks,items,/component=story/);
reject([HEADERS,inputRow({'Highlights block (ID)':'missing'})],blocks,items,/không có/);
reject(input,[...blocks,blocks[1]],items,/ID block/);
reject(input,blocks,[...items,items[1]],/ID item/);
const badPosition = structuredClone(items); badPosition[2][2]='1'; reject(input,blocks,badPosition,/Trùng thứ tự/);
const badCoords = structuredClone(items); badCoords[3][6]='101'; reject(input,blocks,badCoords,/0 đến 100/);
const halfCoords = structuredClone(items); halfCoords[3][7]=''; reject(input,blocks,halfCoords,/cùng có/);
const badSeries = structuredClone(blocks); badSeries[1][3]='missing'; reject(input,badSeries,items,/Series/);
const oldId = source.FeatureBlocks[1][source.FeatureBlocks[0].indexOf('ID')];
const duplicateBlock = structuredClone(blocks); duplicateBlock[1][0]=oldId; reject(input,duplicateBlock,items,/đã tồn tại/);
const tooMany = [ITEM_HEADERS, ...Array.from({length:21},(_,i)=>['item-'+i,'block-feature-story',String(i+1),'Title','','','',''])];
reject(input,blocks,tooMany,/20 item/);
reject([HEADERS,input[1],inputRow({'SKU *':'000-FEATURE-2'})],blocks,items,/cùng mã nhóm/);
const legacy = build([HEADERS.slice(0,23),inputRow({}).slice(0,23)],[SPEC_HEADERS],source);
assert.equal(Object.keys(legacy.files).length,2);
assert.ok(!legacy.files['Products.csv'].split('\r\n')[0].includes('storyBlock'));
assert.equal(SOURCE_NAMES.length,8);
assert.ok(!SOURCE_NAMES.includes('FeatureItemsWix'));
// Existing blocks can be selected without exporting them again.
const story = source.FeatureBlocks.slice(1).find(r=>r[source.FeatureBlocks[0].indexOf('component')]==='story');
const existing = build([HEADERS,inputRow({'Story block (ID)':story[1]})],[SPEC_HEADERS],source);
assert.equal(existing.featureBlocks.length,0);
assert.equal(existing.products[0].storyBlock,story[1]);
// Exercise the actual Wix page with stubbed dataset/data API and custom elements.

const data = {FeatureBlocks:[{_id:'s1',component:'story',sourceTitle:'Unrelated'}, {_id:'h1',component:'highlights',sourceTitle:'Unrelated'}],FeatureItems:[{_id:'i1',block:'s1',position:1,title:'Intro'}, {_id:'i2',block:'h1',position:1,title:'Hotspot'}]};
let page=await runPage({status:'active',_id:'p1',title:'Different name',slug:'different-name',storyBlock:'s1',highlightsBlock:{_id:'h1'}},data);
assert.equal(page.writes['#storySection'].blocks[0]._id,'s1');
assert.equal(page.writes['#hotspotSection'].blocks[0]._id,'h1');
assert.equal(page.writes['#storySection'].items[0]._id,'i1');
assert.equal(page.calls.filter(c=>c.collection==='FeatureBlocks').length,2);
page=await runPage({status:'active',_id:'p1',title:'Unrelated',slug:'unrelated',storyBlock:'missing',highlightsBlock:'s1'},data);
assert.equal(page.writes['#storySection'].collapsed,true);
assert.equal(page.writes['#hotspotSection'].collapsed,true);
page=await runPage({status:'active',_id:'p1',title:'Unrelated',slug:'unrelated'},data);
assert.equal(page.writes['#storySection'].blocks[0]._id,'s1');
assert.equal(page.writes['#hotspotSection'].blocks[0]._id,'h1');
page=await runPage({status:'active',_id:'p1',title:'Unrelated',slug:'unrelated',storyBlock:'s1'},data);
assert.equal(page.writes['#storySection'].blocks[0]._id,'s1');
assert.equal(page.writes['#hotspotSection'].blocks[0]._id,'h1');
console.log('PASS: feature CSV export, validation, references, color, legacy workbook, explicit Wix page rendering and legacy fallback.');
