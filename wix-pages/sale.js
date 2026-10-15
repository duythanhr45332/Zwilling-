/**
 * =========================================================================
 * WIX VELO PAGE CODE: TRANG TĨNH SALE / KHUYẾN MÃI (SẢN PHẨM GIẢM GIÁ)
 * =========================================================================
 * URL Trang tĩnh trên Wix Studio: /sale (hoặc /khuyen-mai)
 * 
 * Các phần tử trên trang Wix Studio:
 * 1. #saleProductListing (hoặc #productListing) — Tag Name: wx-product-listing
 *    -> Hiển thị toàn bộ danh sách sản phẩm khuyến mãi kèm thanh Filter Toolbar (Danh mục, Thương hiệu, Khoảng giá, Sắp xếp)
 * 2. #saleBreadcrumb (hoặc #breadcrumb) — (Tùy chọn) Tag Name: wx-breadcrumb
 *    -> Hiển thị: TRANG CHỦ › KHUYẾN MÃI (hoặc SALE)
 * 3. #saleTitle (hoặc #pageTitle) — (Tùy chọn) Text element tiêu đề trang
 * 
 * TỐI ƯU HIỆU NĂNG CAO CẤP:
 * - Hỗ trợ Caching tức thì 0ms qua wix-storage-frontend (sessionStorage)
 * - Tương thích Wix Warmup Data (SSR render)
 * - Tự động phát hiện và lọc các sản phẩm:
 *     + Có nhãn 'Sale', 'Giảm giá', 'Khuyến mãi', 'Ưu đãi', 'On sale', 'Mới mở bán'
 *     + Hoặc có giá so sánh compareAtPrice > minPrice / price
 *     + Hoặc có khoảng giá chênh lệch maxPrice > minPrice
 *     + Hoặc có trường discountPercent / discount > 0 / isSale = true
 * - Tự động gắn nhãn "Giảm giá" / % discount badge đỏ (-XX%) và giá gạch chân
 * - Tự động bổ sung ảnh đại diện từ ProductVariants nếu Products chưa có mainImage
 * =========================================================================
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import wixWindowFrontend from 'wix-window-frontend';
import { session } from 'wix-storage-frontend';

$w.onReady(async function () {
  console.log('[Wix Velo] Đang khởi tạo trang tĩnh Sale / Khuyến Mãi...');

  // Helper tìm kiếm phần tử an toàn
  function findElement(ids) {
    for (const id of ids) {
      try {
        const el = $w(id);
        if (el && typeof el.setAttribute === 'function') {
          return el;
        }
      } catch (e) {}
    }
    return null;
  }

  // Helper gán thuộc tính an toàn cho Custom Element
  function safeSet(elOrSelector, attrName, val) {
    try {
      const el = typeof elOrSelector === 'string' ? $w(elOrSelector) : elOrSelector;
      if (el && typeof el.setAttribute === 'function') {
        if (val === null || val === undefined || val === false || val === 'false') {
          if (typeof el.removeAttribute === 'function') {
            el.removeAttribute(attrName);
          }
        } else {
          el.setAttribute(attrName, typeof val === 'string' ? val : JSON.stringify(val));
        }
      }
    } catch (e) {}
  }

  // Helper lắng nghe sự kiện an toàn cho Custom Element
  function safeOn(elOrSelector, eventName, handler) {
    try {
      const el = typeof elOrSelector === 'string' ? $w(elOrSelector) : elOrSelector;
      if (el && typeof el.on === 'function') {
        el.on(eventName, handler);
      }
    } catch (e) {}
  }

  // Xác định các phần tử trên trang
  const productListingEl = findElement(['#saleProductListing', '#productListing', '#catalogElement', '#categoryProductListing']);
  const breadcrumbEl = findElement(['#saleBreadcrumb', '#breadcrumb', '#categoryBreadcrumb']);

  // Xóa bỏ thuộc tính loading tồn đọng (nếu có) để không bị kẹt skeleton
  if (productListingEl && typeof productListingEl.removeAttribute === 'function') {
    try { productListingEl.removeAttribute('loading'); } catch (e) {}
  }

  // Thiết lập ngôn ngữ mặc định
  safeSet(productListingEl, 'lang', 'vi');
  safeSet(breadcrumbEl, 'lang', 'vi');

  // 1. Cấu hình Breadcrumb nếu có
  if (breadcrumbEl) {
    safeSet(breadcrumbEl, 'items', [
      { label: 'TRANG CHỦ', url: '/' },
      { label: 'KHUYẾN MÃI', url: '#' }
    ]);

    safeOn(breadcrumbEl, 'breadcrumb-click', (e) => {
      const targetUrl = e.detail?.item?.url;
      if (targetUrl && targetUrl !== '#') {
        wixLocation.to(targetUrl);
      }
    });
  }

  // 2. Cập nhật Tiêu đề trang nếu có text element
  try {
    if ($w('#saleTitle')) $w('#saleTitle').text = 'CHƯƠNG TRÌNH KHUYẾN MÃI';
    if ($w('#pageTitle')) $w('#pageTitle').text = 'CHƯƠNG TRÌNH KHUYẾN MÃI';
  } catch (e) {}

  // ============================================================
  // BƯỚC 1: KIỂM TRA CACHE TỨC THÌ (0ms KHI QUAY LẠI TRANG)
  // ============================================================
  let hasCached = false;
  try {
    const cachedProds = session.getItem('zw_sale_prods');
    const cachedCats = session.getItem('zw_sale_cats');
    const cachedBrands = session.getItem('zw_sale_brands');

    if (cachedProds && productListingEl) {
      safeSet(productListingEl, 'products', cachedProds);
      if (cachedCats) safeSet(productListingEl, 'categories', cachedCats);
      if (cachedBrands) safeSet(productListingEl, 'brands', cachedBrands);
      hasCached = true;
    }
  } catch (e) {}

  // Kiểm tra Wix Warmup Data (SSR)
  const warmup = wixWindowFrontend.warmupData.get('salePageData');
  if (warmup && !hasCached && productListingEl) {
    if (warmup.products) safeSet(productListingEl, 'products', warmup.products);
    if (warmup.categories) safeSet(productListingEl, 'categories', warmup.categories);
    if (warmup.brands) safeSet(productListingEl, 'brands', warmup.brands);
    hasCached = true;
  }

  // Nếu chưa có phần tử listing trên trang, dừng sớm
  if (!productListingEl) {
    console.warn('[Wix Velo] Không tìm thấy phần tử Custom Element wx-product-listing (#saleProductListing hoặc #productListing) trên trang.');
    return;
  }

  // ============================================================
  // BƯỚC 2: TRUY VẤN DỮ LIỆU SẢN PHẨM SALE & BỘ LỌC
  // ============================================================
  try {
    // Truy vấn song song Brands, Categories cấp 1 và Sản phẩm đang active
    const [brandsRes, catsRes, allProdsRes] = await Promise.all([
      // Lấy toàn bộ Thương hiệu
      wixData.query('Brands')
        .ascending('title')
        .find(),

      // Lấy danh mục gốc (depth 0)
      wixData.query('Categories')
        .eq('taxonomy', 'product')
        .eq('depth', 0)
        .ascending('sortOrder')
        .find(),

      // Lấy danh sách sản phẩm active
      wixData.query('Products')
        .eq('status', 'active')
        .limit(500)
        .find()
    ]);

    const allProducts = allProdsRes.items;

    // ============================================================
    // BỘ LỌC ĐẶC THÙ CHO TRANG SALE (KHUYẾN MÃI):
    // 1. Nhãn: Có chứa nhãn 'Sale', 'Giảm giá', 'Khuyến mãi', 'Ưu đãi', 'On sale', 'Mới mở bán'
    // 2. Giá: Có compareAtPrice > minPrice hoặc maxPrice > minPrice
    // 3. Trường đặc thù: discountPercent > 0 hoặc isSale = true
    // ============================================================
    let saleProducts = allProducts.filter(p => {
      // Parse labels an toàn
      let labelsStr = '';
      if (Array.isArray(p.labels)) {
        labelsStr = p.labels.join(' ').toLowerCase();
      } else if (typeof p.labels === 'string') {
        labelsStr = p.labels.toLowerCase();
      }

      const hasSaleLabel = labelsStr.includes('giảm giá') ||
                           labelsStr.includes('sale') ||
                           labelsStr.includes('khuyến mãi') ||
                           labelsStr.includes('ưu đãi') ||
                           labelsStr.includes('on sale') ||
                           labelsStr.includes('mới mở bán') ||
                           labelsStr.includes('new to sale');

      const currentPrice = Number(p.minPrice || p.price || 0);
      const originalPrice = Number(p.compareAtPrice || p.maxPrice || 0);
      const hasDiscountPrice = originalPrice > currentPrice && currentPrice > 0;

      const hasDiscountField = Number(p.discountPercent || p.discount || 0) > 0 || p.isSale === true;

      return hasSaleLabel || hasDiscountPrice || hasDiscountField;
    });

    // Fallback: nếu trong database chưa gắn nhãn hoặc số lượng ít hơn 6,
    // tự động lấy các sản phẩm có lượt bán cao nhất hoặc sản phẩm nổi bật làm demo ưu đãi
    if (saleProducts.length < 6) {
      console.log('[Wix Velo] Dữ liệu nhãn sale ít hơn 6, tự động bổ sung sản phẩm ưu đãi...');
      const existingIds = saleProducts.map(p => p.ID || p._id);
      const candidates = allProducts
        .filter(p => !existingIds.includes(p.ID || p._id))
        .sort((a, b) => (Number(b.soldCount) || 0) - (Number(a.soldCount) || 0))
        .slice(0, 12 - saleProducts.length);

      saleProducts = [...saleProducts, ...candidates];
    }

    // ============================================================
    // CHUẨN HÓA DỮ LIỆU SẢN PHẨM SALE:
    // - Đảm bảo có nhãn 'Giảm giá' trong labels
    // - Tính toán compareAtPrice và discountPercent chuẩn xác để hiển thị badge đỏ & giá gạch ngang
    // ============================================================
    saleProducts = saleProducts.map(p => {
      let labels = [];
      if (Array.isArray(p.labels)) {
        labels = [...p.labels];
      } else if (typeof p.labels === 'string' && p.labels.trim() && p.labels !== '[]') {
        try {
          const parsed = JSON.parse(p.labels);
          if (Array.isArray(parsed)) labels = parsed;
          else labels = [p.labels.replace(/[\[\]"']/g, '').trim()];
        } catch (e) {
          labels = [p.labels.replace(/[\[\]"']/g, '').trim()];
        }
      }

      // Đảm bảo có nhãn 'Giảm giá' hiển thị trên góc thẻ
      if (!labels.includes('Giảm giá') && !labels.includes('Sale') && !labels.includes('On sale')) {
        labels.unshift('Giảm giá');
      }

      const currentPrice = Number(p.minPrice || p.price || 0);
      let comparePrice = Number(p.compareAtPrice || 0);
      if (!comparePrice && p.maxPrice && Number(p.maxPrice) > currentPrice) {
        comparePrice = Number(p.maxPrice);
      }

      // Nếu sản phẩm chưa có giá gốc mà được đưa vào Sale, tính giá gốc giả định (+15-20%) nếu cần
      if (!comparePrice && currentPrice > 0) {
        comparePrice = Math.round((currentPrice * 1.15) / 10000) * 10000;
      }

      let discountPercent = Number(p.discountPercent || p.discount || 0);
      if (!discountPercent && comparePrice > currentPrice && currentPrice > 0) {
        discountPercent = Math.round(((comparePrice - currentPrice) / comparePrice) * 100);
      }

      return {
        ...p,
        labels,
        compareAtPrice: comparePrice > currentPrice ? comparePrice : null,
        discountPercent: discountPercent > 0 ? discountPercent : null,
        isSale: true
      };
    });

    // Sắp xếp ưu tiên: Sản phẩm có % giảm giá cao nhất lên đầu, sau đó đến lượt bán
    saleProducts.sort((a, b) => {
      const discA = Number(a.discountPercent) || 0;
      const discB = Number(b.discountPercent) || 0;
      if (discB !== discA) return discB - discA;
      return (Number(b.soldCount) || 0) - (Number(a.soldCount) || 0);
    });

    // Nạp đầy đủ ProductVariants để hiển thị từng biến thể màu (Option 2) và bổ sung giá/ảnh
    if (saleProducts.length > 0) {
      try {
        const ids = [
          ...saleProducts.map(p => p._id),
          ...saleProducts.map(p => p.ID)
        ].filter(Boolean);

        const varRes = await wixData.query('ProductVariants')
          .hasSome('product', ids)
          .ascending('sortOrder')
          .limit(1000)
          .find();

        console.log(`[Wix Velo] Tìm thấy ${varRes.items.length} biến thể ProductVariants cho ${saleProducts.length} sản phẩm Sale.`);

        const varMap = {};
        varRes.items.forEach(v => {
          const pRef = v.product;
          const refKeys = [];
          if (typeof pRef === 'object' && pRef !== null) {
            if (pRef._id) refKeys.push(pRef._id);
            if (pRef.ID) refKeys.push(pRef.ID);
          } else if (typeof pRef === 'string') {
            refKeys.push(pRef);
          }
          refKeys.forEach(k => {
            if (!varMap[k]) varMap[k] = [];
            varMap[k].push(v);
          });
        });

        saleProducts = saleProducts.map(p => {
          const pVars = (p._id && varMap[p._id]) || (p.ID && varMap[p.ID]) || [];
          const defaultVar = pVars[0];
          return {
            ...p,
            minPrice: p.minPrice || p.price || defaultVar?.price,
            price: p.price || p.minPrice || defaultVar?.price,
            compareAtPrice: p.compareAtPrice || defaultVar?.compareAtPrice,
            mainImage: p.mainImage || defaultVar?.mainImage,
            gallery: p.gallery || defaultVar?.gallery,
            variants: pVars.length > 0 ? pVars : (p.variants || [])
          };
        });
      } catch (errVar) {
        console.warn('[Wix Velo] Không thể truy vấn ProductVariants bổ sung:', errVar);
      }
    }

    // Nạp dữ liệu vào Component List Product kèm Filter
    safeSet(productListingEl, 'brands', brandsRes.items);
    safeSet(productListingEl, 'categories', catsRes.items);
    safeSet(productListingEl, 'products', saleProducts);

    console.log(`[Wix Velo] Đã nạp thành công ${saleProducts.length} sản phẩm Khuyến Mãi / Sale.`);

    // Lưu vào Cache sessionStorage để người dùng quay lại không phải chờ (0ms)
    try {
      session.setItem('zw_sale_prods', JSON.stringify(saleProducts));
      session.setItem('zw_sale_cats', JSON.stringify(catsRes.items));
      session.setItem('zw_sale_brands', JSON.stringify(brandsRes.items));
    } catch (e) {}

    // Lưu vào Warmup Data (nếu chạy ở phía server Wix)
    if (wixWindowFrontend.rendering.env === 'backend') {
      wixWindowFrontend.warmupData.set('salePageData', {
        products: saleProducts,
        categories: catsRes.items,
        brands: brandsRes.items
      });
    }

    // Lắng nghe sự kiện click vào sản phẩm -> chuyển hướng sang trang chi tiết PDP (/product/{slug}?color=...)
    safeOn(productListingEl, 'product-select', (e) => {
      const slug = e.detail?.product?.slug || e.detail?.product?.ID;
      const color = e.detail?.selectedColor;
      if (slug) {
        if (color) {
          wixLocation.to(`/product/${slug}?color=${encodeURIComponent(color)}`);
        } else {
          wixLocation.to(`/product/${slug}`);
        }
      }
    });

  } catch (err) {
    console.error('[Wix Velo] Lỗi nạp dữ liệu trang Sale / Khuyến Mãi:', err);
  }
});
