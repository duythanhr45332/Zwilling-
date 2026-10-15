import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const wixCsvDir = path.join(rootDir, 'wix-csv');

function parseCSV(content) {
  // Strip BOM if present
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }

  const rows = [];
  let currentRow = [];
  let currentVal = '';
  let insideQuote = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        currentVal += '"';
        i++; // skip escaped quote
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      currentRow.push(currentVal);
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !insideQuote) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentVal);
      currentVal = '';
      if (currentRow.length > 0 && currentRow.some(c => c.trim().length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentVal += char;
    }
  }
  if (currentVal.length > 0 || currentRow.length > 0) {
    currentRow.push(currentVal);
    if (currentRow.some(c => c.trim().length > 0)) {
      rows.push(currentRow);
    }
  }

  if (rows.length === 0) return [];
  const headers = rows[0].map(h => h.trim());
  const data = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const item = {};
    headers.forEach((h, idx) => {
      let val = row[idx] !== undefined ? row[idx].trim() : '';
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      else if (/^-?\d+$/.test(val) && !h.toLowerCase().includes('sku') && !h.toLowerCase().includes('id')) {
        val = parseInt(val, 10);
      }
      item[h] = val;
    });
    data.push(item);
  }
  return data;
}

const brands = parseCSV(fs.readFileSync(path.join(wixCsvDir, 'Brands.csv'), 'utf8'));
const categories = parseCSV(fs.readFileSync(path.join(wixCsvDir, 'Categories.csv'), 'utf8'));
const series = parseCSV(fs.readFileSync(path.join(wixCsvDir, 'Series.csv'), 'utf8'));
const products = parseCSV(fs.readFileSync(path.join(wixCsvDir, 'Products.csv'), 'utf8'));
const variants = parseCSV(fs.readFileSync(path.join(wixCsvDir, 'ProductVariants.csv'), 'utf8'));
const featureBlocks = parseCSV(fs.readFileSync(path.join(wixCsvDir, 'FeatureBlocks.csv'), 'utf8'));
const featureItems = parseCSV(fs.readFileSync(path.join(wixCsvDir, 'FeatureItems.csv'), 'utf8'));

// Gắn ảnh thực tế từ Dao_compressed cho các sản phẩm dao nếu chưa có ảnh
const daoDir = path.join(wixCsvDir, 'Dao_compressed');
let daoFiles = [];
if (fs.existsSync(daoDir)) {
  daoFiles = fs.readdirSync(daoDir);
}

// Nạp bản đồ ảnh trực tiếp từ live Wix export (chứa URL wix:image:// và gallery đầy đủ)
const liveImagesMapPath = path.join(rootDir, 'tools', 'wix-live-images-map.json');
let liveImagesMap = {};
if (fs.existsSync(liveImagesMapPath)) {
  try {
    liveImagesMap = JSON.parse(fs.readFileSync(liveImagesMapPath, 'utf8'));
    console.log(`Loaded ${Object.keys(liveImagesMap).length} live Wix image entries from wix-live-images-map.json`);
  } catch (e) {
    console.warn('Failed to parse wix-live-images-map.json:', e);
  }
}

const variantByProduct = new Map();
variants.forEach(v => {
  if (v.product) {
    variantByProduct.set(v.product, v);
  }
});

function normalizeColor(color, title = '') {
  if (!color) {
    const match = title.match(/\((?:Màu\s+)?([^)]+)\)/i);
    if (match) color = match[1].trim();
    else if (title.includes('ZWILLING Nova')) color = 'Bạc';
  }
  if (!color) return '';

  let c = color.trim();
  // Filter non-color values like dimensions, features, etc.
  if (/^(cao |dáng |H:|H :|Quánh|size |5 rãnh|Phiên bản|Mới)/i.test(c) || c === 'Dáng thấp') {
    if (title.includes('thép') || title.includes('Thép') || title.includes('Núm nồi gang')) return 'Bạc';
    if (title.includes('FRESH & SAVE')) return 'Trắng Trong';
    if (title.includes('Ebony') || title.includes('Chảo Rán')) return 'Đen';
    return 'Bạc';
  }

  if (c === 'Trắng Trufle') c = 'Trắng Truffle';
  if (c === 'Bề mặt bóng') c = 'Bạc';
  if (c.toLowerCase() === 'kem') c = 'Kem';
  if (c.toLowerCase() === 'hồng') c = 'Hồng';
  if (c.toLowerCase() === 'bạc') c = 'Bạc';
  if (c === 'bạc, kèm ống hút') c = 'Bạc';
  if (c === 'kem, kèm ống hút') c = 'Kem';
  if (c === 'hồng, kèm ống hút') c = 'Hồng';
  if (c.toLowerCase() === 'xanh dark blue') c = 'Xanh Dark Blue';
  if (c === 'Set màu Macaron') c = 'Macaron';
  if (c === 'Nhiều Màu') c = 'Nhiều màu';
  return c;
}

const cleanTitle = (t) => {
  return t
    .replace(/\s*\((?:Màu\s+)?(?:Đỏ|Xanh|Trắng|Đen|Vàng|Hồng|Nâu|Bạc|Cam|Kem|Macaron|Trong suốt|Nhiều màu)[^)]*\)/i, '')
    .replace(/\s*\((?:dáng đứng|dáng ngồi)\)/i, '')
    .trim();
};

const extractSize = (t) => {
  const cmMatch = t.match(/(\d+(?:\.\d+)?)\s*cm/i);
  if (cmMatch) return cmMatch[1] + ' cm';
  const mlMatch = t.match(/(\d+)\s*ml/i);
  if (mlMatch) return mlMatch[1] + ' ml';
  const monMatch = t.match(/(\d+)\s*món/i);
  if (monMatch) return monMatch[1] + ' món';
  const doiMatch = t.match(/(\d+)\s*đôi/i);
  if (doiMatch) return doiMatch[1] + ' đôi';
  return '';
};

// 1. Enrich images from Wix live map and fallback to Dao_compressed for variants
variants.forEach(v => {
  v.color = normalizeColor(v.color, v.title);
  const sku = (v.sku || (v.ID || '').replace(/^sku-/, '')).trim();

  // Ưu tiên nạp ảnh gốc từ Wix media
  if (sku && liveImagesMap[sku]) {
    const live = liveImagesMap[sku];
    if (live.mainImage) v.mainImage = live.mainImage;
    if (live.gallery) v.gallery = live.gallery;
  }

  // Fallback sang thư mục Dao_compressed nếu chưa có ảnh
  if (sku && daoFiles.length > 0) {
    if (!v.mainImage) {
      const mainImg = daoFiles.find(f => f.startsWith(sku + '_Main Image') || f.startsWith(sku + '_main'));
      if (mainImg) {
        v.mainImage = `/wix-csv/Dao_compressed/${mainImg}`;
      }
    }
    if (!v.gallery) {
      const galleryImgs = daoFiles.filter(f => f.startsWith(sku + '_Gallery'));
      galleryImgs.sort();
      if (galleryImgs.length > 0) {
        v.gallery = galleryImgs.map(f => `/wix-csv/Dao_compressed/${f}`).join(';');
      }
    }
  }
});

// 2. Gom nhóm các biến thể theo master product ID
const variantsByMasterId = new Map();
variants.forEach(v => {
  if (v.product) {
    if (!variantsByMasterId.has(v.product)) variantsByMasterId.set(v.product, []);
    variantsByMasterId.get(v.product).push(v);
  }
});

// 3. Hoàn thiện master products kèm danh sách variants đầy đủ và ảnh từ Wix
const masterProducts = [];

products.forEach(p => {
  const baseTitle = cleanTitle(p.title);
  const size = extractSize(baseTitle) || p.sizeLabel || '';
  const pVariants = variantsByMasterId.get(p.ID) || [];

  let minPrice = Infinity;
  let maxPrice = -Infinity;

  pVariants.forEach(v => {
    if (size) v.sizeLabel = size;
    const pr = Number(v.price || 0);
    if (pr > 0) {
      if (pr < minPrice) minPrice = pr;
      if (pr > maxPrice) maxPrice = pr;
    }
  });

  if (minPrice === Infinity) minPrice = Number(p.minPrice || 0);
  if (maxPrice === -Infinity) maxPrice = Number(p.maxPrice || minPrice);

  const defaultVar = pVariants[0];

  const masterProd = {
    ...p,
    title: baseTitle,
    sizeLabel: size,
    minPrice,
    maxPrice,
    color: defaultVar?.color || p.color || '',
    mainImage: defaultVar?.mainImage || p.mainImage || '',
    gallery: defaultVar?.gallery || p.gallery || '',
    variants: pVariants
  };

  masterProducts.push(masterProd);
});

console.log('Parsed Counts:');
console.log('Brands:', brands.length);
console.log('Categories:', categories.length);
console.log('Series:', series.length);
console.log('Raw Products:', products.length, '-> Master Products:', masterProducts.length);
console.log('Variants:', variants.length);
console.log('FeatureBlocks:', featureBlocks.length);
console.log('FeatureItems:', featureItems.length);

// 4. Update CSV files (Products.csv and ProductVariants.csv)
function escapeCSV(val) {
  if (val === undefined || val === null) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

const productHeaders = [
  'ID', 'title', 'slug', 'brand', 'series', 'category', 'brandCategory', 'materialCategory',
  'categoryPath', 'brandCategoryPath', 'brandCategoryRootSlug', 'displayCategory',
  'minPrice', 'maxPrice', 'soldCount', 'labels', 'status', 'mainImage', 'gallery', 'color'
];

const productCsvContent = [
  productHeaders.join(','),
  ...masterProducts.map(p => productHeaders.map(h => escapeCSV(p[h])).join(','))
].join('\n') + '\n';

fs.writeFileSync(path.join(wixCsvDir, 'Products.csv'), productCsvContent, 'utf8');
const liveProdCsv = path.join(rootDir, 'tools', 'live-wix-csv', 'Products.csv');
if (fs.existsSync(path.dirname(liveProdCsv))) {
  fs.writeFileSync(liveProdCsv, productCsvContent, 'utf8');
}

const variantHeaders = [
  'ID', 'title', 'sku', 'product', 'sortOrder', 'shortDescription', 'description',
  'color', 'sizeLabel', 'price', 'compareAtPrice', 'shopeeUrl', 'tiktokUrl', 'sourceUrl',
  'stock', 'isDefault', 'mainImage', 'gallery', 'specs'
];

const variantCsvContent = [
  variantHeaders.join(','),
  ...variants.map(v => variantHeaders.map(h => escapeCSV(v[h])).join(','))
].join('\n') + '\n';

fs.writeFileSync(path.join(wixCsvDir, 'ProductVariants.csv'), variantCsvContent, 'utf8');
const liveVarCsv = path.join(rootDir, 'tools', 'live-wix-csv', 'ProductVariants.csv');
if (fs.existsSync(path.dirname(liveVarCsv))) {
  fs.writeFileSync(liveVarCsv, variantCsvContent, 'utf8');
}

// 5. Output JS mock data
const outContent = `// Dữ liệu chuẩn trực tiếp từ các file CSV trong wix-csv
export const BRANDS = ${JSON.stringify(brands, null, 2)};
export const CATEGORIES = ${JSON.stringify(categories, null, 2)};
export const SERIES = ${JSON.stringify(series, null, 2)};
export const PRODUCTS = ${JSON.stringify(masterProducts, null, 2)};
export const VARIANTS = ${JSON.stringify(variants, null, 2)};
export const FEATURE_BLOCKS = ${JSON.stringify(featureBlocks, null, 2)};
export const FEATURE_ITEMS = ${JSON.stringify(featureItems, null, 2)};

// Tương thích ngược:
export const MOCK_BRANDS = BRANDS;
export const MOCK_CATEGORIES = CATEGORIES;
export const MOCK_SERIES = SERIES;
export const MOCK_PRODUCTS = PRODUCTS;
export const MOCK_VARIANTS = VARIANTS;
export const MOCK_FEATURE_BLOCKS = FEATURE_BLOCKS;
export const MOCK_FEATURE_ITEMS = FEATURE_ITEMS;
`;

const productsOnlyContent = `// Dữ liệu chuẩn từ wix-csv/Products.csv
export const PRODUCTS = ${JSON.stringify(masterProducts, null, 2)};
export default PRODUCTS;
`;

fs.mkdirSync(path.join(rootDir, 'src', 'data'), { recursive: true });
fs.writeFileSync(path.join(rootDir, 'src', 'data', 'mock-data.js'), outContent, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'data', 'products.js'), productsOnlyContent, 'utf8');
console.log('Successfully generated master products & variants in src/data/ and CSVs!');
