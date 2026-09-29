import fs from 'fs';
import path from 'path';

function parseCsv(text) {
  const rows = [];
  let currentRow = [];
  let currentVal = '';
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {
      currentVal += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentVal);
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentVal);
      if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  if (currentVal || currentRow.length > 0) {
    currentRow.push(currentVal);
    rows.push(currentRow);
  }
  return rows;
}

// 1. Ensure dist folders exist
fs.mkdirSync(path.resolve('dist', 'tools'), { recursive: true });
fs.mkdirSync(path.resolve('dist', 'data'), { recursive: true });
fs.mkdirSync(path.resolve('public', 'data'), { recursive: true });
const distImagesPath = path.resolve('dist', 'images');
if (fs.existsSync(distImagesPath) && fs.statSync(distImagesPath).isFile()) {
  fs.unlinkSync(distImagesPath);
}
fs.mkdirSync(distImagesPath, { recursive: true });

// 2. Generate blocks-data.json (prioritize tools/live-wix-csv)
const candidateBlocksPaths = [
  path.resolve('tools', 'live-wix-csv', 'FeatureBlocksWix.csv.csv'),
  path.resolve('tools', 'live-wix-csv', 'FeatureBlocksWix.csv'),
  path.resolve('tools', 'live-wix-csv', 'FeatureBlocks.csv'),
  path.resolve('wix-csv', 'FeatureBlocks.csv')
];
const blocksCsvPath = candidateBlocksPaths.find(p => fs.existsSync(p)) || candidateBlocksPaths[candidateBlocksPaths.length - 1];

const candidateItemsPaths = [
  path.resolve('tools', 'live-wix-csv', 'FeatureItemsWix.csv'),
  path.resolve('tools', 'live-wix-csv', 'FeatureItems.csv'),
  path.resolve('wix-csv', 'FeatureItems.csv')
];
const itemsCsvPath = candidateItemsPaths.find(p => fs.existsSync(p)) || candidateItemsPaths[candidateItemsPaths.length - 1];

const cleanHdr = (hdr) => hdr.map((h) => h.replace(/^\ufeff/, '').replace(/^"(.*)"$/, '$1').trim().toLowerCase());

let blocks = [];
if (fs.existsSync(blocksCsvPath)) {
  const rows = parseCsv(fs.readFileSync(blocksCsvPath, 'utf8'));
  if (rows.length > 1) {
    const h = cleanHdr(rows[0]);
    const idIdx = h.indexOf('id');
    const titleIdx = h.indexOf('title');
    const compIdx = h.indexOf('component');
    const imgIdx = h.indexOf('image');
    const srcSheetIdx = h.indexOf('sourcesheet');
    const srcTitleIdx = h.indexOf('sourcetitle');

    blocks = rows.slice(1).map(r => ({
      ID: r[idIdx] || '',
      title: r[titleIdx] || '',
      component: r[compIdx] || 'story',
      image: r[imgIdx] || '',
      sourceSheet: srcSheetIdx >= 0 ? r[srcSheetIdx] : '',
      sourceTitle: r[srcTitleIdx] || ''
    }));
  }
}

let items = [];
if (fs.existsSync(itemsCsvPath)) {
  const rows = parseCsv(fs.readFileSync(itemsCsvPath, 'utf8'));
  if (rows.length > 1) {
    const h = cleanHdr(rows[0]);
    const idIdx = h.indexOf('id');
    const titleIdx = h.indexOf('title');
    const blockIdx = h.indexOf('block');
    const posIdx = h.indexOf('position');
    const bodyIdx = h.indexOf('body');
    const imgIdx = h.indexOf('image');
    const cxIdx = h.indexOf('coordx');
    const cyIdx = h.indexOf('coordy');

    items = rows.slice(1).map(r => ({
      ID: r[idIdx] || '',
      title: r[titleIdx] || '',
      block: r[blockIdx] || '',
      position: Number(r[posIdx]) || 1,
      body: r[bodyIdx] || '',
      image: r[imgIdx] || '',
      coordX: cxIdx >= 0 ? r[cxIdx] : '',
      coordY: cyIdx >= 0 ? r[cyIdx] : ''
    }));
  }
}

const dataJson = JSON.stringify({ blocks, items }, null, 2);
fs.writeFileSync(path.resolve('dist', 'data', 'blocks-data.json'), dataJson, 'utf8');
fs.writeFileSync(path.resolve('public', 'data', 'blocks-data.json'), dataJson, 'utf8');
console.log(`[postbuild] Generated blocks-data.json with ${blocks.length} blocks and ${items.length} items`);

// 3. Copy HTML files to dist
if (fs.existsSync(path.resolve('tools', 'hotspot-tool.html'))) {
  const toolContent = fs.readFileSync(path.resolve('tools', 'hotspot-tool.html'), 'utf8');
  fs.writeFileSync(path.resolve('dist', 'tools', 'hotspot-tool.html'), toolContent, 'utf8');
  fs.writeFileSync(path.resolve('dist', 'hotspot-tool.html'), toolContent, 'utf8');
  console.log('[postbuild] Copied tools/hotspot-tool.html to dist/tools/ and dist/');
}

if (fs.existsSync(path.resolve('index.html'))) {
  const indexContent = fs.readFileSync(path.resolve('index.html'), 'utf8');
  fs.writeFileSync(path.resolve('dist', 'index.html'), indexContent, 'utf8');
  console.log('[postbuild] Copied index.html to dist/index.html');
}

// 4. Ensure all images are copied as real files to dist/images
const imagesDir = path.resolve('wix-csv', 'images');
if (fs.existsSync(imagesDir)) {
  const files = fs.readdirSync(imagesDir);
  let count = 0;
  for (const f of files) {
    if (!f.startsWith('.')) {
      const srcFile = path.join(imagesDir, f);
      const destFile = path.resolve('dist', 'images', f);
      if (fs.statSync(srcFile).isFile()) {
        fs.copyFileSync(srcFile, destFile);
        count++;
      }
    }
  }
  console.log(`[postbuild] Copied ${count} product images to dist/images/`);
}
console.log('[postbuild] Ready for Vercel production deployment!');
