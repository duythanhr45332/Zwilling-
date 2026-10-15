import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {loadSource} from './load-source.mjs';
const dir = fileURLToPath(new URL('.', import.meta.url));
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(dir + 'Code.gs', 'utf8') + '\nthis.api={buildNewProducts,csv_,HEADERS,SPEC_HEADERS};', context);
const {buildNewProducts: build, csv_, HEADERS, SPEC_HEADERS} = context.api;
const source = loadSource(process.argv[2]);
const brand = 'brand-zwilling';
const cats = source.Categories.slice(1).map(r => Object.fromEntries(source.Categories[0].map((h, i) => [h, r[i]])));
const cat = cats.find(c => c.taxonomy === 'product');
const make = (changes = {}) => HEADERS.map(h => ({
  'Mã nhóm sản phẩm *': 'test-new', 'Tên sản phẩm *': 'Bộ dao "Mới", đẹp', 'SKU *': '000-TEST-1',
  'Thương hiệu *': `ZWILLING [${brand}]`, 'Danh mục sản phẩm *': `${cat.Title} [${cat.ID}]`,
  'Giá bán *': '100000', 'Tồn kho *': '2', 'Mô tả chi tiết': 'Dòng một\nDòng hai, "ba"',
  'Nhãn': 'Mới;Bán chạy', ...changes
}[h] || ''));
const specs = [SPEC_HEADERS, ['000-TEST-1', 'Thông số kỹ thuật', 'Chất liệu', 'Thép, "bền"']];
const input = [HEADERS, make(), make({'SKU *': '000-TEST-2', 'Giá bán *': '200000', 'Kích thước': '20 cm'})];
const result = build(input, specs, source);
assert.equal(result.products.length, 1);
assert.equal(result.variants.length, 2);
assert.equal(result.products[0].minPrice, 100000);
assert.equal(result.products[0].maxPrice, 200000);
assert.equal(result.products[0].slug, 'bo-dao-moi-dep');
assert.equal(result.variants[0].sku, '000-TEST-1');
assert.equal(result.variants[0].isDefault, 'true');
assert.equal(result.variants[1].isDefault, 'false');
assert.equal(result.variants[1].product, result.products[0].ID);
const colored = build([HEADERS, make({'Màu sắc': 'Đen'}),
  make({'SKU *': '000-TEST-2', 'Màu sắc': 'Đỏ'})], [SPEC_HEADERS], source);
assert.equal(colored.products[0].color, 'Đen'); // Product uses the default SKU's color.
assert.equal(colored.variants[1].color, 'Đỏ');
if (source.Products[0].includes('color')) assert.ok(colored.files['Products.csv'].split('\r\n')[0].includes('"color"'));
assert.equal(JSON.parse(result.variants[0].specs)[0].value, 'Thép, "bền"');
assert.equal(result.products[0].categoryPath, cat.path);
assert.ok(!result.files['Products.csv'].includes('Created Date'));
assert.ok(result.files['ProductVariants.csv'].includes('Dòng một\nDòng hai, ""ba""'));
assert.equal(csv_([['a,b', 'x"y', 'a\nb']]), '\uFEFF"a,b","x""y","a\nb"\r\n');
const reject = (changes, pattern, spec = [SPEC_HEADERS]) => assert.throws(() => build([HEADERS, make(changes)], spec, source), pattern);
reject({'SKU *': source.ProductVariants[1][source.ProductVariants[0].indexOf('sku')]}, /SKU trùng/);
reject({'Thương hiệu *': 'unknown'}, /không có/);
reject({'Danh mục sản phẩm *': cats.find(c => c.taxonomy === 'brand').ID}, /sai loại/);
reject({'Giá bán *': '100,000'}, /số không âm/);
reject({'Giá bán *': '-1'}, /số không âm/);
reject({'Tồn kho *': '1.5'}, /số không âm/);
reject({'Giá gốc': '999'}, /Giá gốc/);
reject({'Ảnh chính': 'https://drive.google.com/foo'}, /wix:image/);
reject({'Slug': 'Tên có dấu'}, /Slug phải/);
reject({'Link Shopee': 'javascript:alert(1)'}, /Link không hợp lệ/);
reject({'Slug': source.Products[1][source.Products[0].indexOf('slug')]}, /Slug trùng/);
reject({'Mã nhóm sản phẩm *': source.Products[1][source.Products[0].indexOf('ID')].replace(/^prod-/, '')}, /Mã nhóm đã có/);
const otherSeries = source.Series.slice(1).find(r => r[source.Series[0].indexOf('brand')] !== brand);
reject({'Dòng sản phẩm': otherSeries[source.Series[0].indexOf('ID')]}, /không thuộc thương hiệu/);
reject({}, /SKU không có/, [SPEC_HEADERS, ['unknown', 'a', 'b', 'c']]);
assert.throws(() => build([HEADERS, make(), make()], [SPEC_HEADERS], source), /SKU trùng/);
assert.throws(() => build([HEADERS, make(), make({'SKU *': '000-TEST-2', 'Tên sản phẩm *': 'Khác'})], [SPEC_HEADERS], source), /cùng mã nhóm/);
assert.throws(() => build([HEADERS], [SPEC_HEADERS], source), /Chưa có/);
assert.throws(() => build([['changed'], ['x']], [SPEC_HEADERS], source), /tiêu đề/);
const images = build([HEADERS, make({'Ảnh chính': 'wix:image://v1/test.jpg/a.jpg',
  'Ảnh phụ': 'wix:image://v1/one.jpg/a.jpg\nwix:image://v1/two.jpg/b.jpg'})], [SPEC_HEADERS], source);
assert.equal(JSON.parse(images.products[0].gallery).length, 2);
assert.equal(JSON.parse(images.products[0].gallery)[1].type, 'image');
assert.equal(images.variants[0].mainImage, images.products[0].mainImage);
const snapshot = JSON.stringify(source);
build(input, specs, source);
assert.equal(JSON.stringify(source), snapshot);
fs.mkdirSync('/tmp/wix-product-sheet', {recursive:true});
for (const [name, text] of Object.entries(result.files)) fs.writeFileSync('/tmp/wix-product-sheet/test-' + name, text);
for (const [name, rows] of Object.entries(source)) fs.writeFileSync('/tmp/wix-product-sheet/roundtrip-' + name + '.csv', csv_(rows));
console.log('PASS: new products, grouping, references, SKU zeros, JSON, CSV escaping, duplicates, invalid inputs, source immutability.');
