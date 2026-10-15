/**
 * Định dạng tiền tệ VND (hỗ trợ số thực, chuỗi số, hoặc chuỗi có dấu chấm/phẩy)
 */
export function formatCurrencyVND(amount) {
  if (amount === null || amount === undefined || amount === '') return '';
  if (typeof amount === 'string') {
    const clean = Number(amount.replace(/[^\d]/g, ''));
    if (!isNaN(clean) && clean > 0) amount = clean;
  }
  if (isNaN(amount) || Number(amount) <= 0) return '';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Trích xuất giá sản phẩm một cách thông minh, hỗ trợ mọi biến thể tên trường
 * (minPrice, price, min_price, gia, regularPrice, maxPrice...)
 */
export function extractProductPrice(p) {
  if (!p || typeof p !== 'object') return 0;
  const candidates = [
    p.minPrice,
    p.price,
    p.min_price,
    p.regularPrice,
    p.unitPrice,
    p.gia,
    p.donGia,
    p.cost,
    p.maxPrice,
    p.max_price
  ];
  for (const v of candidates) {
    if (v !== null && v !== undefined && v !== '') {
      if (typeof v === 'number' && v > 0) return v;
      if (typeof v === 'string') {
        const clean = Number(v.replace(/[^\d]/g, ''));
        if (!isNaN(clean) && clean > 0) return clean;
      }
    }
  }
  return 0;
}

/**
 * Tính toán giá sản phẩm theo đúng quy tắc:
 * - maxPrice là giá sản phẩm (giá niêm yết / giá gốc)
 * - minPrice là giá đã giảm
 * - Từ đó tính ra phần trăm giảm giá: ((maxPrice - minPrice) / maxPrice) * 100
 */
export function calculateProductPricing(p) {
  if (!p || typeof p !== 'object') {
    return { price: 0, comparePrice: null, discountPercent: null };
  }

  const toNum = (v) => {
    if (v === null || v === undefined || v === '') return 0;
    if (typeof v === 'number') return isNaN(v) ? 0 : v;
    if (typeof v === 'string') {
      const n = Number(v.replace(/[^\d]/g, ''));
      return isNaN(n) ? 0 : n;
    }
    return 0;
  };

  const maxP = toNum(p.maxPrice) || toNum(p.max_price) || toNum(p.compareAtPrice) || toNum(p.regularPrice) || toNum(p.price);
  const minP = toNum(p.minPrice) || toNum(p.min_price) || toNum(p.discountedPrice);

  let price = 0;
  let comparePrice = null;
  let discountPercent = null;

  if (maxP > 0 && minP > 0 && maxP > minP) {
    // Có giảm giá: giá bán là minPrice, giá gốc trước giảm là maxPrice
    price = minP;
    comparePrice = maxP;
    discountPercent = Math.round(((maxP - minP) / maxP) * 100);
  } else {
    // Không giảm giá: giá sản phẩm là maxPrice (hoặc minPrice nếu maxPrice để trống)
    price = maxP || minP || toNum(p.price) || toNum(p.unitPrice);
    comparePrice = null;
    discountPercent = null;
  }

  // Fallback nếu price vẫn chưa lấy được từ các trường trên
  if ((!price || price <= 0) && typeof extractProductPrice === 'function') {
    price = extractProductPrice(p);
  }

  return { price, comparePrice, discountPercent };
}

/**
 * Trích xuất mức giá bán thực tế của sản phẩm (dùng để lọc và sắp xếp)
 */
export function getProductEffectivePrice(p) {
  if (!p || typeof p !== 'object') return 0;
  const { price } = calculateProductPricing(p);
  if (typeof price === 'number' && !isNaN(price) && price > 0) return price;
  const ext = extractProductPrice(p);
  return (typeof ext === 'number' && !isNaN(ext) && ext > 0) ? ext : 0;
}

/**
 * Parse an toàn mảng hoặc object JSON từ chuỗi CSV / Wix Attribute
 */
export function safeJsonParse(str, fallback = null) {
  if (!str) return fallback;
  if (typeof str === 'object') return str;
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallback;
  }
}

/**
 * Chuyển đổi định dạng wix:image:// hoặc URL thông thường sang URL xem được
 */
export function resolveImageUrl(url, fallback = '') {
  if (!url) return fallback;
  if (typeof url === 'object' && url) {
    url = url.src || url.url || fallback;
  }
  if (typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;

  // wix:image://v1/<media_id>/<filename>#originWidth=...
  if (trimmed.startsWith('wix:image://')) {
    const parts = trimmed.split('/');
    if (parts.length >= 4) {
      const mediaId = parts[3].split('#')[0];
      return `https://static.wixstatic.com/media/${mediaId}`;
    }
  }
  return trimmed;
}

/**
 * Tách chuỗi gallery ngăn cách bởi dấu chấm phẩy hoặc mảng
 */
export function parseGallery(galleryStr) {
  if (!galleryStr) return [];
  // Nếu là chuỗi JSON array hoặc object
  if (typeof galleryStr === 'string') {
    const trimmed = galleryStr.trim();
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed) galleryStr = parsed;
      } catch (e) {}
    }
  }
  if (Array.isArray(galleryStr)) {
    return galleryStr
      .map((item) => {
        if (!item) return '';
        if (typeof item === 'object') return item.src || item.url || '';
        return String(item);
      })
      .filter(Boolean);
  }
  if (typeof galleryStr !== 'string') return [];
  return galleryStr.split(';').map((s) => s.trim()).filter(Boolean);
}

/**
 * Hàm helper decode các entity HTML thường gặp (&quot;, &#34;, &amp;)
 */
function decodeHtmlEntities(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#34;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

/**
 * Converter cho Array attribute trong Wix Studio
 */
export const jsonArrayConverter = {
  fromAttribute(value) {
    if (!value) return [];
    if (typeof value === 'object') return Array.isArray(value) ? value : [value];
    try {
      let str = typeof value === 'string' ? decodeHtmlEntities(value.trim()) : '';
      if (str.startsWith('[') || str.startsWith('{')) {
        const parsed = JSON.parse(str);
        return Array.isArray(parsed) ? parsed : [parsed];
      }
      // Hỗ trợ chuỗi dạng "TRANG CHỦ > CỬA HÀNG" hoặc "TRANG CHỦ, CỬA HÀNG"
      if (str.includes('>') || str.includes(',')) {
        const separator = str.includes('>') ? '>' : ',';
        return str.split(separator).map(s => s.trim()).filter(Boolean).map((label, idx, arr) => ({
          label,
          url: idx === 0 ? '/' : (idx === arr.length - 1 ? '#' : '')
        }));
      }
      if (str) return [{ label: str, url: '#' }];
      return [];
    } catch (e) {
      console.warn('[jsonArrayConverter] Lỗi parse JSON:', e, value);
      return [];
    }
  },
  toAttribute(value) {
    return JSON.stringify(value);
  }
};

/**
 * Converter cho Object attribute trong Wix Studio
 */
export const jsonObjectConverter = {
  fromAttribute(value) {
    if (!value) return null;
    if (typeof value === 'object') return value;
    try {
      let str = typeof value === 'string' ? decodeHtmlEntities(value.trim()) : '';
      return JSON.parse(str);
    } catch (e) {
      console.warn('[jsonObjectConverter] Lỗi parse JSON:', e, value);
      return null;
    }
  },
  toAttribute(value) {
    return JSON.stringify(value);
  }
};

/**
 * Converter cho Boolean attribute trong Wix Studio
 * Khắc phục triệt để lỗi setAttribute('loading', 'false') khiến Lit hiểu nhầm là true
 */
export const booleanConverter = {
  fromAttribute(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'boolean') return value;
    const str = String(value).trim().toLowerCase();
    if (str === 'false' || str === '0' || str === '' || str === 'null' || str === 'undefined') {
      return false;
    }
    return true;
  },
  toAttribute(value) {
    return value ? 'true' : null;
  }
};

/**
 * Ánh xạ tên màu sang mã màu HEX / Gradient chuẩn thương hiệu
 */
export function getColorHex(colorName) {
  if (!colorName) return '#cccccc';
  const name = colorName.toLowerCase();
  if (name.includes('nhiều màu')) return 'linear-gradient(135deg, #e53935, #fb8c00, #43a047, #1e88e5)';
  if (name.includes('trong suốt')) return 'linear-gradient(135deg, #ffffff 40%, #e0e0e0 60%)';
  if (name.includes('cherry blossom') || name.includes('anh đào')) return '#e8a8b8';
  if (name.includes('đỏ cherry')) return '#b51a2b';
  if (name.includes('grenadine')) return '#6b1d28';
  if (name.includes('bordeaux')) return '#58111a';
  if (name.includes('đỏ cam')) return '#d34125';
  if (name.includes('đỏ')) return '#c8102e';
  if (name.includes('basil')) return '#315438';
  if (name.includes('sage')) return '#879b83';
  if (name.includes('lime')) return '#84b82c';
  if (name.includes('lục')) return '#2d7a3a';
  if (name.includes('dark blue')) return '#1b3558';
  if (name.includes('hoàng gia')) return '#1f487e';
  if (name.includes('lamer') || name.includes('la mer')) return '#2b767a';
  if (name.includes('xanh')) return '#1d5f8a';
  if (name.includes('truffle') || name.includes('trufle')) return '#ece8db';
  if (name.includes('trắng')) return '#f8f8f8';
  if (name.includes('citron')) return '#f1b82d';
  if (name.includes('gold')) return '#d4af37';
  if (name.includes('vàng hồng')) return '#d49a89';
  if (name.includes('vàng')) return '#f1b82d';
  if (name.includes('chocolate')) return '#4a2c20';
  if (name.includes('nâu')) return '#5a3d2e';
  if (name.includes('granada') || name.includes('cinnamon') || name.includes('quế') || name.includes('cam')) return '#d65a27';
  if (name.includes('macaron')) return '#eec0c8';
  if (name.includes('sorbet')) return '#f28599';
  if (name.includes('hồng')) return '#f098aa';
  if (name.includes('kem')) return '#f3e5ab';
  if (name.includes('đen')) return '#222222';
  if (name.includes('bạc') || name.includes('inox') || name.includes('bề mặt bóng')) return '#c0c0c0';
  if (name.includes('xám')) return '#808080';
  return '#cccccc';
}

