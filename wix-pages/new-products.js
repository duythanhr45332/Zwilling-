/**
 * WIX VELO PAGE CODE: Trang Tĩnh Sản Phẩm Mới (New Arrivals)
 * Hiển thị các sản phẩm được gắn nhãn "Mới" và "Mới mở bán"
 * URL Trang tĩnh trên Wix Studio: /new-products (hoặc /san-pham-moi, /new-arrivals)
 * 
 * Các phần tử trên trang Wix Studio:
 * 1. #newProductListing (hoặc #productListing, #catalogElement) — Tag Name: wx-product-listing
 *    -> Hiển thị toàn bộ danh sách sản phẩm mới kèm thanh Filter Toolbar (Danh mục, Thương hiệu, Khoảng giá, Sắp xếp)
 * 2. #newBreadcrumb (hoặc #breadcrumb) — (Tùy chọn) Tag Name: wx-breadcrumb
 *    -> Hiển thị: TRANG CHỦ › SẢN PHẨM MỚI
 * 3. #newTitle (hoặc #pageTitle) — (Tùy chọn) Text element tiêu đề trang
 * 
 * TỐI ƯU HIỆU NĂNG CAO CẤP:
 * - Hỗ trợ Caching tức thì 0ms qua wix-storage-frontend (sessionStorage)
 * - Tương thích Wix Warmup Data (SSR render)
 * - Truy vấn sản phẩm có nhãn "Mới" hoặc "Mới mở bán"
 * - Tự động bổ sung ảnh đại diện và giá từ ProductVariants nếu Products chưa có mainImage
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import wixWindowFrontend from 'wix-window-frontend';
import { session } from 'wix-storage-frontend';

$w.onReady(async function () {
  console.log('[Wix Velo] Đang khởi tạo trang Sản Phẩm Mới (Mới & Mới mở bán)...');

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
  const productListingEl = findElement([
    '#newProductListing',
    '#productListing',
    '#bestsellerProductListing',
    '#catalogElement',
    '#categoryProductListing'
  ]);
  const breadcrumbEl = findElement([
    '#newBreadcrumb',
    '#breadcrumb',
    '#bestsellerBreadcrumb',
    '#categoryBreadcrumb'
  ]);

  // Xóa bỏ thuộc tính loading tồn đọng (nếu có) để không bị kẹt skeleton
  if (productListingEl && typeof productListingEl.removeAttribute === 'function') {
    try { productListingEl.removeAttribute('loading'); } catch (e) {}
  }

  // Thiết lập ngôn ngữ mặc định
  safeSet(productListingEl, 'lang', 'vi');
  safeSet(breadcrumbEl, 'lang', 'vi');

  // 1. Cấu hình Breadcrumb: TRANG CHỦ › SẢN PHẨM MỚI
  if (breadcrumbEl) {
    safeSet(breadcrumbEl, 'items', [
      { label: 'TRANG CHỦ', url: '/' },
      { label: 'SẢN PHẨM MỚI', url: '#' }
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
    if ($w('#newTitle')) $w('#newTitle').text = 'SẢN PHẨM MỚI';
    if ($w('#pageTitle')) $w('#pageTitle').text = 'SẢN PHẨM MỚI';
  } catch (e) {}

  // ============================================================
  // BƯỚC 1: KIỂM TRA CACHE TỨC THÌ (0ms KHI QUAY LẠI TRANG)
  // ============================================================
  let hasCached = false;
  try {
    const cachedProds = session.getItem('zw_new_prods_v1');
    const cachedCats = session.getItem('zw_new_cats_v1');
    const cachedBrands = session.getItem('zw_new_brands_v1');

    if (cachedProds && productListingEl) {
      safeSet(productListingEl, 'products', cachedProds);
      if (cachedCats) safeSet(productListingEl, 'categories', cachedCats);
      if (cachedBrands) safeSet(productListingEl, 'brands', cachedBrands);
      hasCached = true;
    }
  } catch (e) {}

  // Kiểm tra Wix Warmup Data (SSR)
  const warmup = wixWindowFrontend.warmupData.get('newProductsPageData');
  if (warmup && !hasCached && productListingEl) {
    if (warmup.products) safeSet(productListingEl, 'products', warmup.products);
    if (warmup.categories) safeSet(productListingEl, 'categories', warmup.categories);
    if (warmup.brands) safeSet(productListingEl, 'brands', warmup.brands);
    hasCached = true;
  }

  // Nếu chưa có phần tử listing trên trang, dừng sớm
  if (!productListingEl) {
    console.warn('[Wix Velo] Không tìm thấy phần tử Custom Element wx-product-listing (#newProductListing hoặc #productListing) trên trang.');
    return;
  }

  // ============================================================
  // BƯỚC 2: TRUY VẤN DỮ LIỆU SẢN PHẨM "MỚI" & "MỚI MỞ BÁN"
  // ============================================================
  try {
    // Truy vấn song song Brands, Categories cấp 0 và Sản phẩm Mới
    const [brandsRes, catsRes, prodResPrimary] = await Promise.all([
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

      // CHỈ lấy các sản phẩm có nhãn "Mới" hoặc "Mới mở bán"
      wixData.query('Products')
        .eq('status', 'active')
        .contains('labels', 'Mới')
        .or(
          wixData.query('Products')
            .eq('status', 'active')
            .contains('labels', 'Mới mở bán')
        )
        .or(
          wixData.query('Products')
            .eq('status', 'active')
            .contains('labels', 'New')
        )
        .descending('_createdDate')
        .find()
    ]);

    let products = prodResPrimary.items;

    // Chuẩn hóa và hiển thị đầy đủ nhãn cho từng sản phẩm
    products = products.map(p => {
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

      // Giữ nguyên nhãn "Mới" hoặc "Mới mở bán" vốn có
      const hasNew = labels.some(l => /mới/i.test(l) || /new/i.test(l));
      if (!hasNew) {
        labels.unshift('Mới');
      }

      return {
        ...p,
        labels: labels,
        isNew: true
      };
    });

    // Bổ sung giá và ảnh từ ProductVariants nếu Products bị thiếu
    const needEnrichIds = products
      .filter(p => (!p.minPrice && !p.price && !p.min_price) || !p.mainImage)
      .map(p => p.ID || p._id);

    if (needEnrichIds.length > 0) {
      try {
        const varRes = await wixData.query('ProductVariants')
          .hasSome('product', needEnrichIds)
          .limit(1000)
          .find();

        const varMap = {};
        varRes.items.forEach(v => {
          const prodRef = typeof v.product === 'object' ? (v.product._id || v.product.ID) : v.product;
          if (prodRef && (!varMap[prodRef] || v.isDefault)) {
            varMap[prodRef] = v;
          }
        });

        products = products.map(p => {
          const pid = p.ID || p._id;
          const v = varMap[pid];
          if (!v) return p;
          return {
            ...p,
            minPrice: p.minPrice || p.price || v.price,
            price: p.price || p.minPrice || v.price,
            compareAtPrice: p.compareAtPrice || v.compareAtPrice,
            mainImage: p.mainImage || v.mainImage,
            gallery: p.gallery || v.gallery
          };
        });
      } catch (errVar) {
        console.warn('[Wix Velo] Không thể truy vấn ProductVariants bổ sung:', errVar);
      }
    }

    // Nạp dữ liệu vào Component List Product kèm Filter
    safeSet(productListingEl, 'brands', brandsRes.items);
    safeSet(productListingEl, 'categories', catsRes.items);
    safeSet(productListingEl, 'products', products);

    console.log(`[Wix Velo] Đã nạp thành công ${products.length} sản phẩm Mới.`);

    // Lưu vào Cache sessionStorage để người dùng quay lại không phải chờ
    try {
      session.setItem('zw_new_prods_v1', JSON.stringify(products));
      session.setItem('zw_new_cats_v1', JSON.stringify(catsRes.items));
      session.setItem('zw_new_brands_v1', JSON.stringify(brandsRes.items));
    } catch (e) {}

    // Lưu vào Warmup Data (nếu chạy ở phía server Wix)
    if (wixWindowFrontend.rendering.env === 'backend') {
      wixWindowFrontend.warmupData.set('newProductsPageData', {
        products: products,
        categories: catsRes.items,
        brands: brandsRes.items
      });
    }

    // Lắng nghe sự kiện click vào sản phẩm -> chuyển hướng sang trang chi tiết PDP (/product/{slug})
    safeOn(productListingEl, 'product-select', (e) => {
      const slug = e.detail?.product?.slug || e.detail?.product?.ID;
      if (slug) {
        wixLocation.to(`/product/${slug}`);
      }
    });

  } catch (err) {
    console.error('[Wix Velo] Lỗi nạp dữ liệu trang Sản Phẩm Mới:', err);
  }
});
