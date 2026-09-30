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

products.forEach(p => {
  const sku = (p.ID || '').replace(/^prod-/, '').trim();
  if (sku && daoFiles.length > 0) {
    if (!p.mainImage) {
      const mainImg = daoFiles.find(f => f.startsWith(sku + '_Main Image') || f.startsWith(sku + '_main'));
      if (mainImg) {
        p.mainImage = `/wix-csv/Dao_compressed/${mainImg}`;
      }
    }
    if (!p.gallery) {
      const galleryImgs = daoFiles.filter(f => f.startsWith(sku + '_Gallery'));
      galleryImgs.sort();
      if (galleryImgs.length > 0) {
        p.gallery = galleryImgs.map(f => `/wix-csv/Dao_compressed/${f}`).join(';');
      }
    }
  }
});

variants.forEach(v => {
  const sku = (v.sku || (v.ID || '').replace(/^sku-/, '')).trim();
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

console.log('Parsed Counts:');
console.log('Brands:', brands.length);
console.log('Categories:', categories.length);
console.log('Series:', series.length);
console.log('Products:', products.length);
console.log('Variants:', variants.length);
console.log('FeatureBlocks:', featureBlocks.length);
console.log('FeatureItems:', featureItems.length);

const outContent = `// Dữ liệu chuẩn trực tiếp từ các file CSV trong wix-csv
export const BRANDS = ${JSON.stringify(brands, null, 2)};
export const CATEGORIES = ${JSON.stringify(categories, null, 2)};
export const SERIES = ${JSON.stringify(series, null, 2)};
export const PRODUCTS = ${JSON.stringify(products, null, 2)};
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
export const PRODUCTS = ${JSON.stringify(products, null, 2)};
export default PRODUCTS;
`;

fs.mkdirSync(path.join(rootDir, 'src', 'data'), { recursive: true });
fs.writeFileSync(path.join(rootDir, 'src', 'data', 'mock-data.js'), outContent, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'data', 'products.js'), productsOnlyContent, 'utf8');
console.log('Successfully generated src/data/mock-data.js and src/data/products.js');
