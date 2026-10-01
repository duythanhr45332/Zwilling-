/** @OnlyCurrentDoc */
// Paste this entire file into Extensions > Apps Script in the supplied Sheet.
// Uses only the current spreadsheet. CSV ZIP downloads in a dialog, not to Drive.
const INPUT_SHEET = 'Nhap san pham';
const SPEC_SHEET = 'Thong so';
const HEADERS = ['Mã nhóm sản phẩm *', 'Tên sản phẩm *', 'SKU *', 'Tên biến thể',
  'Thương hiệu *', 'Dòng sản phẩm', 'Danh mục sản phẩm *', 'Danh mục thương hiệu',
  'Danh mục chất liệu', 'Giá bán *', 'Giá gốc', 'Tồn kho *', 'Mô tả ngắn',
  'Mô tả chi tiết', 'Màu sắc', 'Kích thước', 'Ảnh chính', 'Ảnh phụ',
  'Nhãn', 'Link Shopee', 'Link TikTok', 'Link nguồn', 'Slug'];
const SPEC_HEADERS = ['SKU *', 'Nhóm thông số *', 'Tên thông số *', 'Giá trị *'];
const SOURCE_NAMES = ['Brands', 'Categories', 'Series', 'Products', 'ProductVariants',
  'FeatureBlocks', 'FeatureItems', 'FeatureItemsWix', 'FeatureItemsKhachhang', 'Stores'];

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Wix CSV')
    .addItem('Kiểm tra sản phẩm mới', 'checkNewProducts')
    .addItem('Tải ZIP CSV sản phẩm mới', 'downloadNewProducts')
    .addSeparator()
    .addItem('Tải 10 CSV nguồn (quản trị)', 'downloadSourceCsv')
    .addToUi();
}

function readSheet_(name) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sheet) throw new Error('Thiếu tab: ' + name);
  return sheet.getDataRange().getDisplayValues();
}

function objects_(rows, expected) {
  if (expected && JSON.stringify(rows[0]) !== JSON.stringify(expected))
    throw new Error('Tên hoặc thứ tự cột đã thay đổi. Khôi phục hàng tiêu đề của tab nhập.');
  return rows.slice(1).map((r, i) => Object.assign({_row: i + 2},
    Object.fromEntries(rows[0].map((h, j) => [h, r[j] === undefined ? '' : String(r[j])]))))
    .filter(r => rows[0].some(h => r[h] !== ''));
}

function sourceData_() {
  return Object.fromEntries(SOURCE_NAMES.map(n => [n, readSheet_(n)]));
}

function slug_(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function csv_(rows) {
  return '\uFEFF' + rows.map(r => r.map(v => '"' + String(v == null ? '' : v)
    .replace(/"/g, '""') + '"').join(',')).join('\r\n') + '\r\n';
}

function rows_(headers, objects) {
  return [headers, ...objects.map(r => headers.map(h => r[h] == null ? '' : r[h]))];
}

// Pure transformation: also exercised by test-export.mjs without Google access.
function buildNewProducts(input, specs, source) {
  const entries = objects_(input, HEADERS), specRows = objects_(specs, SPEC_HEADERS);
  if (!entries.length) throw new Error('Chưa có sản phẩm mới trong tab ' + INPUT_SHEET + '.');
  const lookup = name => new Map(objects_(source[name]).map(r => [r.ID, r]));
  const brands = lookup('Brands'), series = lookup('Series'), categories = lookup('Categories');
  const oldProducts = lookup('Products'), oldVariants = lookup('ProductVariants');
  const oldSkus = new Set([...oldVariants.values()].map(r => r.sku.toLowerCase()));
  const oldSlugs = new Set([...oldProducts.values()].map(r => r.slug));
  const seenSku = new Set(), seenSlug = new Set(), groups = new Map(), variants = [], errors = [];
  const specMap = new Map();
  const fail = (row, message) => { throw new Error('Dòng ' + row + ': ' + message); };
  function ref(value, map, label, row, required, taxonomy) {
    value = value.trim();
    if (!value) { if (required) fail(row, 'Thiếu ' + label); return ''; }
    const match = value.match(/\[([^\]]+)\]$/);
    const id = match ? match[1] : value;
    if (!map.has(id)) fail(row, label + ' không có trong dữ liệu tra cứu: ' + id);
    if (taxonomy && map.get(id).taxonomy !== taxonomy) fail(row, label + ' sai loại danh mục.');
    return id;
  }
  function number(value, label, row, required, integer) {
    value = value.trim();
    if (!value) { if (required) fail(row, 'Thiếu ' + label); return ''; }
    if (!/^\d+(\.\d+)?$/.test(value) || !Number.isFinite(Number(value)) ||
        (integer && !Number.isSafeInteger(Number(value))))
      fail(row, label + ' phải là số không âm, không dùng dấu phân cách hàng nghìn.');
    return Number(value);
  }
  function image(value, row) {
    if (value && !/^wix:image:\/\/v1\/[^\s]+$/.test(value))
      fail(row, 'Ảnh phải dùng URI wix:image://v1/... lấy từ Wix Media; có thể để trống và gắn sau.');
    return value;
  }
  function url(value, row) {
    if (value && !/^https?:\/\/[^\s]+$/i.test(value)) fail(row, 'Link không hợp lệ: ' + value);
    return value;
  }
  specRows.forEach(r => {
    const vals = SPEC_HEADERS.map(h => r[h].trim());
    if (vals.some(v => !v)) { errors.push('Thong so dòng ' + r._row + ': điền đủ 4 cột.'); return; }
    const key = vals[0].toLowerCase();
    if (!specMap.has(key)) specMap.set(key, []);
    specMap.get(key).push({section: vals[1], name: vals[2], value: vals[3]});
  });
  entries.forEach(r => {
    try {
      const [group, title, sku, variantTitle, brandText, seriesText, catText, brandCatText,
        materialText, priceText, compareText, stockText, shortDescription, description, color,
        sizeLabel, mainText, galleryText, labelText, shopeeText, tiktokText, sourceText, slugText]
        = HEADERS.map(h => r[h].trim());
      const row = r._row;
      if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(group)) fail(row, 'Mã nhóm: chỉ chữ không dấu, số, - hoặc _.');
      if (!title) fail(row, 'Thiếu tên sản phẩm.');
      if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(sku)) fail(row, 'SKU: chỉ chữ không dấu, số, - hoặc _.');
      const skuKey = sku.toLowerCase(), productId = 'prod-' + group.toLowerCase();
      const variantId = 'sku-' + skuKey;
      if (oldProducts.has(productId)) fail(row, 'Mã nhóm đã có trên tab Products; mẫu này chỉ thêm sản phẩm mới.');
      if (oldVariants.has(variantId) || oldSkus.has(skuKey) || seenSku.has(skuKey)) fail(row, 'SKU trùng: ' + sku);
      const brand = ref(brandText, brands, 'thương hiệu', row, true);
      const seriesId = ref(seriesText, series, 'dòng sản phẩm', row, false);
      if (seriesId && series.get(seriesId).brand !== brand) fail(row, 'Dòng sản phẩm không thuộc thương hiệu đã chọn.');
      const category = ref(catText, categories, 'danh mục sản phẩm', row, true, 'product');
      const brandCategory = ref(brandCatText, categories, 'danh mục thương hiệu', row, false, 'brand');
      const materialCategory = ref(materialText, categories, 'danh mục chất liệu', row, false, 'material');
      const price = number(priceText, 'giá bán', row, true, true);
      const compareAtPrice = number(compareText, 'giá gốc', row, false, true);
      const stock = number(stockText, 'tồn kho', row, true, true);
      if (compareAtPrice !== '' && compareAtPrice < price) fail(row, 'Giá gốc phải lớn hơn hoặc bằng giá bán.');
      const mainImage = image(mainText, row);
      const gallery = galleryText ? JSON.stringify(galleryText.split(/[\n;]/).map(s => s.trim())
        .filter(Boolean).map(src => ({src: image(src, row), title: '', type: 'image'}))) : '';
      const labels = labelText ? JSON.stringify(labelText.split(';').map(s => s.trim()).filter(Boolean)) : '';
      const slug = slugText || slug_(title);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail(row, 'Slug phải gồm chữ thường không dấu, số và dấu -.');
      const categoryPath = categories.get(category).path;
      const brandCategoryPath = brandCategory ? categories.get(brandCategory).path : '';
      const product = {Title: title, ID: productId, slug, brand, series: seriesId, category,
        brandCategory, materialCategory, categoryPath, brandCategoryPath,
        brandCategoryRootSlug: brandCategoryPath.split('/').filter(Boolean)[0] || '',
        displayCategory: '', minPrice: price, maxPrice: price, soldCount: 0,
        status: 'active', mainImage, gallery, labels};
      const signature = JSON.stringify([title, slug, brand, seriesId, category, brandCategory, materialCategory, labels]);
      const prior = groups.get(productId);
      if (prior && prior.signature !== signature) fail(row, 'Các SKU cùng mã nhóm phải có cùng tên, slug, thương hiệu, dòng, danh mục và nhãn.');
      if (!prior && (oldSlugs.has(slug) || seenSlug.has(slug))) fail(row, 'Slug trùng sản phẩm khác: ' + slug);
      const variant = {Title: variantTitle || title, ID: variantId, sku, product: productId,
        sortOrder: prior ? prior.count : 0, shortDescription, description, color, sizeLabel,
        price, compareAtPrice, shopeeUrl: url(shopeeText, row), tiktokUrl: url(tiktokText, row),
        sourceUrl: url(sourceText, row), stock, isDefault: prior ? 'false' : 'true',
        mainImage, gallery, specs: JSON.stringify(specMap.get(skuKey) || [])};
      // Commit only after all checks for this row succeed.
      if (prior) {
        prior.product.minPrice = Math.min(prior.product.minPrice, price);
        prior.product.maxPrice = Math.max(prior.product.maxPrice, price);
        prior.count++;
      } else {
        groups.set(productId, {product, signature, count: 1});
        seenSlug.add(slug);
      }
      seenSku.add(skuKey);
      variants.push(variant);
    } catch (e) { errors.push(e.message); }
  });
  for (const sku of specMap.keys()) if (!seenSku.has(sku)) errors.push('Thong so: SKU không có trong các dòng sản phẩm hợp lệ: ' + sku);
  if (errors.length) throw new Error(errors.join('\n'));
  const productHeaders = source.Products[0].filter(h => !['Created Date', 'Updated Date', 'Owner', 'Products (Item)'].includes(h));
  const variantHeaders = source.ProductVariants[0].filter(h => !['Created Date', 'Updated Date', 'Owner'].includes(h));
  const products = [...groups.values()].map(g => g.product);
  for (const [headers, sample] of [[productHeaders, products[0]], [variantHeaders, variants[0]]])
    for (const header of headers) if (!(header in sample)) throw new Error('Cột nguồn chưa được hỗ trợ: ' + header);
  return {products, variants, files: {
    'Products.csv': csv_(rows_(productHeaders, products)),
    'ProductVariants.csv': csv_(rows_(variantHeaders, variants))
  }};
}

function buildCurrent_() {
  return buildNewProducts(readSheet_(INPUT_SHEET), readSheet_(SPEC_SHEET), sourceData_());
}

function checkNewProducts() {
  try {
    const result = buildCurrent_();
    SpreadsheetApp.getUi().alert('Hợp lệ: ' + result.products.length + ' sản phẩm, ' + result.variants.length +
      ' SKU. Chưa import vào Wix. ID được kiểm tra với dữ liệu nguồn trong file này.');
  } catch (e) { SpreadsheetApp.getUi().alert(String(e.message)); }
}

function showZip_(files, name) {
  const blobs = Object.entries(files).map(([file, content]) => Utilities.newBlob(content, 'text/csv', file));
  const zip = Utilities.zip(blobs, name);
  const base64 = Utilities.base64Encode(zip.getBytes());
  const instructions = name === 'wix-source-csv.zip'
    ? 'Dữ liệu nguồn: Brands → Categories → Series → Products → ProductVariants; FeatureBlocks trước bản FeatureItems đã chọn; Stores độc lập. Không import cả ba bản FeatureItems.'
    : 'Import Products trước, ProductVariants sau. Kiểm tra ánh xạ ID, reference, gallery và specs bằng 1–2 sản phẩm trước.';
  const html = '<!doctype html><meta charset="utf-8"><style>body{font:15px Arial;padding:20px;line-height:1.6}</style>' +
    '<p>CSV đã sẵn sàng. Tải ZIP, giải nén rồi import từng file vào đúng collection Wix CMS.</p>' +
    '<a download="' + name + '" href="data:application/zip;base64,' + base64 + '">Tải ' + name + '</a>' +
    '<p>' + instructions + '</p>';
  SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(html).setWidth(540).setHeight(270), 'Tải CSV Wix');
}

function downloadNewProducts() {
  try {
    const result = buildCurrent_();
    showZip_(result.files, 'wix-new-products.zip');
  } catch (e) { SpreadsheetApp.getUi().alert(String(e.message)); }
}

function downloadSourceCsv() {
  const ui = SpreadsheetApp.getUi();
  if (ui.alert('Xuất dữ liệu nguồn',
    'Có 3 bản FeatureItems riêng biệt. Không import cả ba vào cùng collection. Thao tác này không bao gồm tab Nhap san pham.',
    ui.ButtonSet.OK_CANCEL) !== ui.Button.OK) return;
  try { showZip_(Object.fromEntries(SOURCE_NAMES.map(n => [n + '.csv', csv_(readSheet_(n))])), 'wix-source-csv.zip'); }
  catch (e) { ui.alert(String(e.message)); }
}
