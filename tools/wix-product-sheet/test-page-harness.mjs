import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url));
const pageCode = fs.readFileSync(path.join(dir,'../../wix-pages/products-item.js'),'utf8').replace(/^import .*;$/gm,'');
export async function runPage(product, rows, options = {}) {
  const writes = {}, calls = [], redirects = [];
  function query(collection) {
    const filters = []; let sortKey, max = Infinity, matches = () => true;
    const and = fn => {const before=matches; matches=r=>before(r)&&fn(r);};
    const q = {eq(k,v){filters.push([k,v]);and(r=>r[k]===v);return q;},
      hasSome(k,v){filters.push([k,v]);and(r=>Array.isArray(r[k])?r[k].some(x=>v.includes(x)):v.includes(r[k]));return q;},
      or(other){const before=matches;matches=r=>before(r)||other.matches(r);return q;},
      ne(k,v){and(r=>r[k]!==v);return q;},not(other){and(r=>!other.matches(r));return q;},
      matches(r){return matches(r);},ascending(k){sortKey=k;return q;},descending(){return q;},limit(n){max=n;return q;},
      async find(){calls.push({collection,filters});return {items:(rows[collection]||[]).filter(matches).sort((a,b)=>sortKey ? Number(a[sortKey])-Number(b[sortKey]) : 0).slice(0,max)};}};
    return q;
  }
  const ids = ['#productDetail','#storySection','#hotspotSection','#featureBlocks', ...(options.related ? ['#relatedProducts'] : [])];
  const elements = Object.fromEntries(ids.map(id=>[id,{setAttribute(k,v){(writes[id]??={})[k]=JSON.parse(v);},expand(){},collapse(){(writes[id]??={}).collapsed=true;},on(){}}]));
  elements['#dynamicDataset']={onReadyAsync:async()=>{},getCurrentItem:()=>product};
  let ready;
  const $w = id => {if(!elements[id])throw Error('Not found');return elements[id];};
  $w.onReady = fn => {ready=fn;};
  const context=vm.createContext({$w,wixData:{query},wixLocation:{path:options.path || [],to(url){redirects.push(url);}},console:{log(){},warn(){},error(...args){throw Error(JSON.stringify(args));}}});
  vm.runInContext(pageCode,context);await ready();return {writes,calls,redirects};
}
