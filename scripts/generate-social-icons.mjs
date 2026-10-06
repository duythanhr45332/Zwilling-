import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
  crcTable[n] = c;
}
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function decodePng(filePath) {
  const buf = fs.readFileSync(filePath);
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  let pos = 8;
  const idats = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') idats.push(buf.subarray(pos + 8, pos + 8 + len));
    pos += 12 + len;
  }
  const decompressed = zlib.inflateSync(Buffer.concat(idats));
  const scanlineLen = 1 + w * 4;
  const rgba = Buffer.alloc(w * h * 4);
  const cur = Buffer.alloc(w * 4);
  const prev = Buffer.alloc(w * 4);
  
  for (let y = 0; y < h; y++) {
    const filter = decompressed[y * scanlineLen];
    const src = y * scanlineLen + 1;
    for (let x = 0; x < w * 4; x++) {
      const val = decompressed[src + x];
      if (filter === 0) cur[x] = val;
      else if (filter === 1) cur[x] = (val + (x >= 4 ? cur[x - 4] : 0)) & 0xff;
      else if (filter === 2) cur[x] = (val + prev[x]) & 0xff;
      else if (filter === 3) cur[x] = (val + Math.floor(((x >= 4 ? cur[x - 4] : 0) + prev[x]) / 2)) & 0xff;
      else if (filter === 4) {
        const a = x >= 4 ? cur[x - 4] : 0;
        const b = prev[x];
        const c = x >= 4 ? prev[x - 4] : 0;
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        const pr = (pb < pa && pb <= pc) ? b : (pc <= pa && pc <= pb ? c : a);
        cur[x] = (val + pr) & 0xff;
      }
    }
    cur.copy(rgba, y * w * 4);
    cur.copy(prev);
  }
  return { w, h, data: rgba };
}

function writePng(w, h, rgba) {
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const scanlineLen = 1 + w * 4;
  const raw = Buffer.alloc(h * scanlineLen);
  for (let y = 0; y < h; y++) {
    raw[y * scanlineLen] = 0;
    rgba.copy(raw, y * scanlineLen + 1, y * w * 4, (y + 1) * w * 4);
  }
  const idatChunk = makeChunk('IDAT', zlib.deflateSync(raw, { level: 9 }));
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const buf = Buffer.alloc(12 + data.length);
  buf.writeUInt32BE(data.length, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  buf.writeUInt32BE(crc32(buf.subarray(4, 8 + data.length)), 8 + data.length);
  return buf;
}

function resizeRgba(src, targetW, targetH) {
  const out = Buffer.alloc(targetW * targetH * 4);
  const xRatio = src.w / targetW;
  const yRatio = src.h / targetH;
  
  for (let ty = 0; ty < targetH; ty++) {
    const syStart = ty * yRatio;
    const syEnd = (ty + 1) * yRatio;
    for (let tx = 0; tx < targetW; tx++) {
      const sxStart = tx * xRatio;
      const sxEnd = (tx + 1) * xRatio;
      
      let rSum = 0, gSum = 0, bSum = 0, aSum = 0, weightSum = 0;
      
      const y0 = Math.floor(syStart);
      const y1 = Math.min(src.h - 1, Math.ceil(syEnd));
      const x0 = Math.floor(sxStart);
      const x1 = Math.min(src.w - 1, Math.ceil(sxEnd));
      
      for (let y = y0; y <= y1; y++) {
        const yWeight = Math.max(0, Math.min(y + 1, syEnd) - Math.max(y, syStart));
        if (yWeight <= 0) continue;
        for (let x = x0; x <= x1; x++) {
          const xWeight = Math.max(0, Math.min(x + 1, sxEnd) - Math.max(x, sxStart));
          const w = xWeight * yWeight;
          if (w <= 0) continue;
          
          const idx = (y * src.w + x) * 4;
          const a = src.data[idx + 3] / 255;
          rSum += src.data[idx] * a * w;
          gSum += src.data[idx + 1] * a * w;
          bSum += src.data[idx + 2] * a * w;
          aSum += src.data[idx + 3] * w;
          weightSum += w;
        }
      }
      
      const outIdx = (ty * targetW + tx) * 4;
      const finalA = aSum / weightSum;
      if (finalA > 0.5) {
        const aNorm = finalA / 255;
        out[outIdx] = Math.round(Math.min(255, Math.max(0, (rSum / weightSum) / aNorm)));
        out[outIdx + 1] = Math.round(Math.min(255, Math.max(0, (gSum / weightSum) / aNorm)));
        out[outIdx + 2] = Math.round(Math.min(255, Math.max(0, (bSum / weightSum) / aNorm)));
        out[outIdx + 3] = Math.round(Math.min(255, Math.max(0, finalA)));
      } else {
        out[outIdx] = 0; out[outIdx + 1] = 0; out[outIdx + 2] = 0; out[outIdx + 3] = 0;
      }
    }
  }
  return out;
}

function cropRgba(src, cx, cy, cw, ch) {
  const out = Buffer.alloc(cw * ch * 4);
  for (let y = 0; y < ch; y++) {
    const sy = cy + y;
    for (let x = 0; x < cw; x++) {
      const sx = cx + x;
      const outIdx = (y * cw + x) * 4;
      if (sx >= 0 && sx < src.w && sy >= 0 && sy < src.h) {
        const srcIdx = (sy * src.w + sx) * 4;
        src.data.copy(out, outIdx, srcIdx, srcIdx + 4);
      }
    }
  }
  return { w: cw, h: ch, data: out };
}

const shopeeFile = 'C:/Users/DELL/.gemini/antigravity-ide/brain/6e33865b-b610-4deb-8fb5-2da4dab6edd4/.user_uploaded/media_1790914886532.png';
const tiktokFile = 'C:/Users/DELL/.gemini/antigravity-ide/brain/6e33865b-b610-4deb-8fb5-2da4dab6edd4/.user_uploaded/media_1790914893917.png';
const messFile = 'C:/Users/DELL/.gemini/antigravity-ide/brain/6e33865b-b610-4deb-8fb5-2da4dab6edd4/.user_uploaded/media_1790914900418.png';

const shopeeSrc = decodePng(shopeeFile);
const tiktokSrc = decodePng(tiktokFile);
const messSrc = decodePng(messFile);

// TikTok square crop centered around note
const ttSize = 640;
const ttCrop = cropRgba(tiktokSrc, Math.round(380 - ttSize / 2), Math.round(489 - ttSize / 2), ttSize, ttSize);

// Target 96x96 for ultra-crisp display at 22px
const shopee96 = resizeRgba(shopeeSrc, 96, 96);
const tiktok96 = resizeRgba(ttCrop, 96, 96);
const mess96 = resizeRgba(messSrc, 96, 96);

const shopeePng = writePng(96, 96, shopee96);
const tiktokPng = writePng(96, 96, tiktok96);
const messPng = writePng(96, 96, mess96);

const shopeeBase64 = `data:image/png;base64,${shopeePng.toString('base64')}`;
const tiktokBase64 = `data:image/png;base64,${tiktokPng.toString('base64')}`;
const messBase64 = `data:image/png;base64,${messPng.toString('base64')}`;

// Save to public/images and dist/images and wix-csv/images
const dirs = [
  path.resolve('public', 'images'),
  path.resolve('dist', 'images'),
  path.resolve('wix-csv', 'images')
];

for (const d of dirs) {
  fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(d, 'icon-shopee.png'), shopeePng);
  fs.writeFileSync(path.join(d, 'icon-tiktok.png'), tiktokPng);
  fs.writeFileSync(path.join(d, 'icon-mess.png'), messPng);
  
  // Also copy original full resolution
  fs.copyFileSync(shopeeFile, path.join(d, 'icon-shopee-hd.png'));
  fs.copyFileSync(tiktokFile, path.join(d, 'icon-tiktok-hd.png'));
  fs.copyFileSync(messFile, path.join(d, 'icon-mess-hd.png'));
}

// Generate src/utils/social-icons.js
const iconsJsContent = `// Auto-generated social action button icons (Shopee, TikTok, Messenger)
export const DEFAULT_SHOPEE_ICON = '${shopeeBase64}';
export const DEFAULT_TIKTOK_ICON = '${tiktokBase64}';
export const DEFAULT_MESS_ICON = '${messBase64}';
`;

fs.writeFileSync(path.resolve('src', 'utils', 'social-icons.js'), iconsJsContent, 'utf8');
console.log('Successfully generated icons and src/utils/social-icons.js');
