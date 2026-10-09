import assert from 'node:assert/strict';
import {runPage} from './test-page-harness.mjs';

const product={_id:'p1',slug:'test-product',title:'Test product',status:'active',category:'c1',brand:'b1'};
for(const status of ['inactive','draft','',undefined]) {
  const page=await runPage({...product,status},{},{related:true});
  assert.deepEqual(page.redirects,['/products']);
  assert.equal(page.calls.length,0,'Hidden dataset item must not load variants, features or recommendations');
  for(const id of ['#productDetail','#storySection','#hotspotSection','#featureBlocks','#relatedProducts']) {
    assert.equal(page.writes[id].collapsed,true);
    assert.deepEqual(Object.keys(page.writes[id]),['collapsed']);
  }
}
const rows={Products:[product,
  {_id:'hidden-category',status:'inactive',category:'c1',brand:'b1'},
  {_id:'active-category',status:'active',category:'c1',brand:'b1'},
  {_id:'hidden-brand',status:'inactive',category:'c2',brand:'b1'},
  {_id:'active-brand',status:'active',category:'c2',brand:'b1'},
  {_id:'missing-status',category:'c1',brand:'b1'}]};
const visible=await runPage(product,rows,{related:true});
assert.equal(visible.redirects.length,0);
assert.ok(visible.writes['#productDetail'].product);
assert.deepEqual(Array.from(visible.writes['#relatedProducts'].products,p=>p._id),['active-category','active-brand']);
// No dataset: the direct URL query must enforce the same status rule.
for (const status of ['active','inactive']) {
  const page=await runPage(null,{Products:[{...product,status}]},{path:['product','test-product']});
  assert.ok(page.calls[0].filters.some(([k,v])=>k==='status'&&v==='active'));
  assert.equal(page.redirects.length,status==='active'?0:1);
  if(status==='inactive') assert.equal(page.calls.length,1);
}
const missing=await runPage(null,{Products:[]},{path:['product','missing']});
assert.deepEqual(missing.redirects,['/products']);
console.log('PASS: inactive/empty status and missing products leave PDP without loading content; category/brand recommendations contain active products only; active products remain visible.');
