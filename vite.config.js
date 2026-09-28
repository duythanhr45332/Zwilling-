import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function hotspotApiPlugin() {
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

  function escapeCsvCell(cell) {
    if (cell === null || cell === undefined) return '';
    const str = String(cell);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }

  return {
    name: 'hotspot-api-plugin',
    configureServer(server) {
      // API 1: Lấy danh sách blocks và items từ CSV (ưu tiên tools/live-wix-csv)
      server.middlewares.use('/api/blocks-data', (req, res, next) => {
        if (req.method !== 'GET') return next();
        try {
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

          const cleanHeader = (hdr) => hdr.map((h) => h.replace(/^\ufeff/, '').replace(/^"(.*)"$/, '$1').trim().toLowerCase());

          let blocks = [];
          if (fs.existsSync(blocksCsvPath)) {
            const rawBlocks = fs.readFileSync(blocksCsvPath, 'utf8');
            const rows = parseCsv(rawBlocks);
            if (rows.length > 1) {
              const h = cleanHeader(rows[0]);
              const idIdx = h.indexOf('id');
              const titleIdx = h.indexOf('title');
              const compIdx = h.indexOf('component');
              const imgIdx = h.indexOf('image');
              const srcSheetIdx = h.indexOf('sourcesheet');
              const srcTitleIdx = h.indexOf('sourcetitle');

              blocks = rows.slice(1).map((r) => ({
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
            const rawItems = fs.readFileSync(itemsCsvPath, 'utf8');
            const rows = parseCsv(rawItems);
            if (rows.length > 1) {
              const h = cleanHeader(rows[0]);
              const idIdx = h.indexOf('id');
              const titleIdx = h.indexOf('title');
              const blockIdx = h.indexOf('block');
              const posIdx = h.indexOf('position');
              const bodyIdx = h.indexOf('body');
              const imgIdx = h.indexOf('image');
              const cxIdx = h.indexOf('coordx');
              const cyIdx = h.indexOf('coordy');

              items = rows.slice(1).map((r) => ({
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

          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({ blocks, items }));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        }
      });

      // API 2: Lưu dữ liệu hotspots vào cả tools/live-wix-csv và wix-csv
      server.middlewares.use('/api/save-hotspots', (req, res, next) => {
        if (req.method !== 'POST') return next();
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const payload = JSON.parse(body);
            const candidateItemsPaths = [
              path.resolve('tools', 'live-wix-csv', 'FeatureItemsWix.csv'),
              path.resolve('tools', 'live-wix-csv', 'FeatureItems.csv'),
              path.resolve('wix-csv', 'FeatureItems.csv')
            ];
            const candidateBlocksPaths = [
              path.resolve('tools', 'live-wix-csv', 'FeatureBlocksWix.csv.csv'),
              path.resolve('tools', 'live-wix-csv', 'FeatureBlocksWix.csv'),
              path.resolve('tools', 'live-wix-csv', 'FeatureBlocks.csv'),
              path.resolve('wix-csv', 'FeatureBlocks.csv')
            ];
            const itemsCsvPath = path.resolve('wix-csv', 'FeatureItems.csv');
            const blocksCsvPath = path.resolve('wix-csv', 'FeatureBlocks.csv');

            // 1. Trường hợp gửi thẳng fullCsv hoàn chỉnh
            if (payload.fullCsv && typeof payload.fullCsv === 'string') {
              const csvContent = payload.fullCsv.trim() + '\n';
              for (const p of candidateItemsPaths) {
                try {
                  fs.mkdirSync(path.dirname(p), { recursive: true });
                  fs.writeFileSync(p, csvContent, 'utf8');
                } catch (e) {}
              }

              // Cập nhật block images nếu có
              if (payload.blockImages && typeof payload.blockImages === 'object') {
                const targetBlocksFiles = candidateBlocksPaths.filter(p => fs.existsSync(p));

                for (const bFilePath of targetBlocksFiles) {
                  if (fs.existsSync(bFilePath)) {
                    const bRows = parseCsv(fs.readFileSync(bFilePath, 'utf8'));
                    const cleanHdr = bRows[0].map((h) => h.replace(/^\ufeff/, '').replace(/^"(.*)"$/, '$1').trim().toLowerCase());
                    const bIdIdx = cleanHdr.indexOf('id');
                    const bImgIdx = cleanHdr.indexOf('image');
                    if (bIdIdx >= 0 && bImgIdx >= 0) {
                      for (let i = 1; i < bRows.length; i++) {
                        const id = bRows[i][bIdIdx];
                        if (payload.blockImages[id]) {
                          let imgVal = payload.blockImages[id];
                          if (imgVal.startsWith('data:image/')) {
                            try {
                              const base64Data = imgVal.split(',')[1];
                              const extMatch = imgVal.match(/^data:image\/(\w+);/);
                              const ext = extMatch ? (extMatch[1] === 'jpeg' ? 'jpg' : extMatch[1]) : 'png';
                              const imgFilename = `${id}.${ext}`;
                              const targetDiskPath = path.resolve('wix-csv', 'images', imgFilename);
                              fs.writeFileSync(targetDiskPath, Buffer.from(base64Data, 'base64'));
                              imgVal = `images/${imgFilename}`;
                            } catch (e) {
                              console.error('Error writing base64 image for', id, e);
                            }
                          }
                          bRows[i][bImgIdx] = imgVal;
                        }
                      }
                      const bOutput = bRows.map((r) => r.map(escapeCsvCell).join(',')).join('\n') + '\n';
                      fs.writeFileSync(bFilePath, bOutput, 'utf8');
                    }
                  }
                }
              }

              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              return res.end(
                JSON.stringify({
                  success: true,
                  message: 'Đã lưu toàn bộ bản CSV hoàn chỉnh vào FeatureItems.csv!'
                })
              );
            }

            // 2. Trường hợp cập nhật nhiều blocks cùng lúc (allBlocksData)
            if (payload.allBlocksData && typeof payload.allBlocksData === 'object') {
              const rawItems = fs.readFileSync(itemsCsvPath, 'utf8');
              const rows = parseCsv(rawItems);
              const header = rows[0] || ['ID', 'title', 'block', 'position', 'body', 'image'];
              let cxIdx = header.indexOf('coordX');
              let cyIdx = header.indexOf('coordY');
              if (cxIdx < 0) { header.push('coordX'); cxIdx = header.length - 1; }
              if (cyIdx < 0) { header.push('coordY'); cyIdx = header.length - 1; }

              const idIdx = header.indexOf('ID');
              const titleIdx = header.indexOf('title');
              const blockIdx = header.indexOf('block');
              const posIdx = header.indexOf('position');
              const bodyIdx = header.indexOf('body');
              const imgIdx = header.indexOf('image');

              const blockIdsToUpdate = new Set(Object.keys(payload.allBlocksData));
              // Giữ lại các hàng không bị update
              const keptRows = rows.slice(1).filter((r) => !blockIdsToUpdate.has(r[blockIdx]));
              const newlyAddedRows = [];

              for (const [bId, itemsList] of Object.entries(payload.allBlocksData)) {
                itemsList.forEach((it, idx) => {
                  const r = [];
                  r[idIdx] = it.ID || `${bId}-item-${idx + 1}`;
                  r[titleIdx] = it.title || '';
                  r[blockIdx] = bId;
                  r[posIdx] = String(idx + 1);
                  r[bodyIdx] = it.body || '';
                  r[imgIdx] = it.image || '';
                  r[cxIdx] = it.coordX !== undefined && it.coordX !== null ? String(it.coordX) : '';
                  r[cyIdx] = it.coordY !== undefined && it.coordY !== null ? String(it.coordY) : '';
                  newlyAddedRows.push(r);
                });
              }

              const allRows = [header, ...keptRows, ...newlyAddedRows];
              const csvOutput = allRows.map((r) => r.map(escapeCsvCell).join(',')).join('\n') + '\n';
              fs.writeFileSync(itemsCsvPath, csvOutput, 'utf8');

              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              return res.end(
                JSON.stringify({
                  success: true,
                  message: `Đã lưu toàn bộ ${blockIdsToUpdate.size} blocks vào wix-csv/FeatureItems.csv!`
                })
              );
            }

            // 3. Trường hợp cập nhật một block đơn lẻ
            const { blockId, items = [], blockImage } = payload;
            if (!blockId) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'Thiếu blockId' }));
            }

            const rawItems = fs.readFileSync(itemsCsvPath, 'utf8');
            const rows = parseCsv(rawItems);
            const header = rows[0] || ['ID', 'title', 'block', 'position', 'body', 'image'];

            let cxIdx = header.indexOf('coordX');
            let cyIdx = header.indexOf('coordY');
            if (cxIdx < 0) { header.push('coordX'); cxIdx = header.length - 1; }
            if (cyIdx < 0) { header.push('coordY'); cyIdx = header.length - 1; }

            const idIdx = header.indexOf('ID');
            const titleIdx = header.indexOf('title');
            const blockIdx = header.indexOf('block');
            const posIdx = header.indexOf('position');
            const bodyIdx = header.indexOf('body');
            const imgIdx = header.indexOf('image');

            const otherRows = rows.slice(1).filter((r) => r[blockIdx] !== blockId);
            const newRows = items.map((it, idx) => {
              const row = [];
              row[idIdx] = it.ID || `${blockId}-item-${idx + 1}`;
              row[titleIdx] = it.title || '';
              row[blockIdx] = blockId;
              row[posIdx] = String(idx + 1);
              row[bodyIdx] = it.body || '';
              row[imgIdx] = it.image || '';
              row[cxIdx] = it.coordX !== undefined && it.coordX !== null ? String(it.coordX) : '';
              row[cyIdx] = it.coordY !== undefined && it.coordY !== null ? String(it.coordY) : '';
              return row;
            });

            const allRows = [header, ...otherRows, ...newRows];
            const csvOutput = allRows
              .map((r) => r.map(escapeCsvCell).join(','))
              .join('\n') + '\n';

            fs.writeFileSync(itemsCsvPath, csvOutput, 'utf8');

            if (blockImage && fs.existsSync(blocksCsvPath)) {
              let imgVal = blockImage;
              if (imgVal.startsWith('data:image/')) {
                try {
                  const base64Data = imgVal.split(',')[1];
                  const extMatch = imgVal.match(/^data:image\/(\w+);/);
                  const ext = extMatch ? (extMatch[1] === 'jpeg' ? 'jpg' : extMatch[1]) : 'png';
                  const imgFilename = `${blockId}.${ext}`;
                  const targetDiskPath = path.resolve('wix-csv', 'images', imgFilename);
                  fs.writeFileSync(targetDiskPath, Buffer.from(base64Data, 'base64'));
                  imgVal = `images/${imgFilename}`;
                } catch (e) {
                  console.error('Error saving base64 image for', blockId, e);
                }
              }

              const rawBlocks = fs.readFileSync(blocksCsvPath, 'utf8');
              const bRows = parseCsv(rawBlocks);
              const bHeader = bRows[0];
              const bIdIdx = bHeader.indexOf('ID');
              const bImgIdx = bHeader.indexOf('image');
              if (bIdIdx >= 0 && bImgIdx >= 0) {
                for (let i = 1; i < bRows.length; i++) {
                  if (bRows[i][bIdIdx] === blockId) {
                    bRows[i][bImgIdx] = imgVal;
                    break;
                  }
                }
                const bOutput = bRows.map((r) => r.map(escapeCsvCell).join(',')).join('\n') + '\n';
                fs.writeFileSync(blocksCsvPath, bOutput, 'utf8');
              }
            }

            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(
              JSON.stringify({
                success: true,
                message: `Đã lưu thành công ${items.length} point cho block ${blockId} vào wix-csv/FeatureItems.csv!`,
                savedItems: newRows.length
              })
            );
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    }
  };
}

function prependWixHeader() {
  return {
    name: 'prepend-wix-header',
    closeBundle() {
      const bundlePath = path.resolve('dist', 'my-wix-ui-lib.bundle.js');
      if (fs.existsSync(bundlePath)) {
        const content = fs.readFileSync(bundlePath, 'utf8');
        const header = `/* eslint-disable */
/* global globalThis, litPropertyMetadata */
var globalThis = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this;
if (!globalThis.litPropertyMetadata) {
  globalThis.litPropertyMetadata = new WeakMap();
}
var litPropertyMetadata = globalThis.litPropertyMetadata;
`;
        fs.writeFileSync(bundlePath, header + content, 'utf8');
        console.log('[vite] Prepended Wix ESLint header successfully!');
      }
    }
  };
}

export default defineConfig({
  plugins: [hotspotApiPlugin(), prependWixHeader()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: 'src/index.js',
      name: 'MyWixUiLib',
      fileName: () => 'my-wix-ui-lib.bundle.js',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        extend: true
      }
    }
  }
});
