/**
 * WIX VELO PAGE CODE: Trang Tĩnh Best Seller (Sản phẩm bán chạy)
 * URL Trang tĩnh trên Wix Studio: /bestseller (hoặc /best-sellers)
 * 
 * Các phần tử trên trang Wix Studio:
 * 1. #bestsellerProductListing (hoặc #productListing) — Tag Name: wx-product-listing
 *    -> Hiển thị toàn bộ danh sách sản phẩm bán chạy kèm thanh Filter Toolbar (Danh mục, Thương hiệu, Khoảng giá, Sắp xếp)
 * 2. #bestsellerBreadcrumb (hoặc #breadcrumb) — (Tùy chọn) Tag Name: wx-breadcrumb
 *    -> Hiển thị: TRANG CHỦ › BÁN CHẠY NHẤT
 * 3. #pageTitle (hoặc #bestsellerTitle) — (Tùy chọn) Text element tiêu đề trang
 * 
 * TỐI ƯU HIỆU NĂNG CAO CẤP:
 * - Hỗ trợ Caching tức thì 0ms qua wix-storage-frontend (sessionStorage)
 * - Tương thích Wix Warmup Data (SSR render)
 * - Truy vấn sản phẩm có nhãn "Bán chạy" / "Bestseller" hoặc sắp xếp theo soldCount giảm dần
 * - Tự động bổ sung ảnh đại diện từ ProductVariants nếu Products chưa có mainImage
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import wixWindowFrontend from 'wix-window-frontend';
import { session } from 'wix-storage-frontend';

$w.onReady(async function () {
  console.log('[Wix Velo] Đang khởi tạo trang tĩnh Best Seller...');

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
  const productListingEl = findElement(['#bestsellerProductListing', '#productListing', '#catalogElement', '#categoryProductListing']);
  const breadcrumbEl = findElement(['#bestsellerBreadcrumb', '#breadcrumb', '#categoryBreadcrumb']);

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
      { label: 'BÁN CHẠY NHẤT', url: '#' }
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
    if ($w('#bestsellerTitle')) $w('#bestsellerTitle').text = 'SẢN PHẨM BÁN CHẠY';
    if ($w('#pageTitle')) $w('#pageTitle').text = 'SẢN PHẨM BÁN CHẠY';
  } catch (e) {}

  // ============================================================
  // BƯỚC 1: KIỂM TRA CACHE TỨC THÌ (0ms KHI QUAY LẠI TRANG)
  // ============================================================
  let hasCached = false;
  try {
    const cachedProds = session.getItem('zw_bestseller_prods_v2');
    const cachedCats = session.getItem('zw_bestseller_cats');
    const cachedBrands = session.getItem('zw_bestseller_brands');

    if (cachedProds && productListingEl) {
      safeSet(productListingEl, 'products', cachedProds);
      if (cachedCats) safeSet(productListingEl, 'categories', cachedCats);
      if (cachedBrands) safeSet(productListingEl, 'brands', cachedBrands);
      hasCached = true;
    }
  } catch (e) {}

  // Kiểm tra Wix Warmup Data (SSR)
  const warmup = wixWindowFrontend.warmupData.get('bestsellerPageData');
  if (warmup && !hasCached && productListingEl) {
    if (warmup.products) safeSet(productListingEl, 'products', warmup.products);
    if (warmup.categories) safeSet(productListingEl, 'categories', warmup.categories);
    if (warmup.brands) safeSet(productListingEl, 'brands', warmup.brands);
    hasCached = true;
  }

  // Nếu chưa có phần tử listing trên trang, dừng sớm
  if (!productListingEl) {
    console.warn('[Wix Velo] Không tìm thấy phần tử Custom Element wx-product-listing (#bestsellerProductListing hoặc #productListing) trên trang.');
    return;
  }

  // ============================================================
  // BƯỚC 2: TRUY VẤN DỮ LIỆU SẢN PHẨM BÁN CHẠY & BỘ LỌC
  // ============================================================
  try {
    // Truy vấn song song Brands, Categories cấp 1 và Sản phẩm Bán chạy
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

      // CHỈ lấy các sản phẩm thực sự gắn nhãn 'Bán chạy' hoặc 'Bestseller'
      wixData.query('Products')
        .eq('status', 'active')
        .contains('labels', 'Bán chạy')
        .or(
          wixData.query('Products')
            .eq('status', 'active')
            .contains('labels', 'Bestseller')
        )
        .descending('soldCount')
        .find()
    ]);

    let products = prodResPrimary.items;

    // Đảm bảo tất cả sản phẩm trong trang này đều được gán nhãn Bán chạy nếu chưa có
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
      if (!labels.includes('Bán chạy') && !labels.includes('Bestseller')) {
        labels.unshift('Bán chạy');
      }
      return {
        ...p,
        labels: labels,
        isBestseller: true
      };
    });

    // Bổ sung giá và ảnh từ ProductVariants nếu Products bị thiếu
    const needEnrichIds = products.filter(p => (!p.minPrice && !p.price && !p.min_price) || !p.mainImage).map(p => p.ID || p._id);
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

    console.log(`[Wix Velo] Đã nạp thành công ${products.length} sản phẩm Best Seller.`);

    // Lưu vào Cache sessionStorage để người dùng quay lại không phải chờ
    try {
      session.setItem('zw_bestseller_prods_v2', JSON.stringify(products));
      session.setItem('zw_bestseller_cats', JSON.stringify(catsRes.items));
      session.setItem('zw_bestseller_brands', JSON.stringify(brandsRes.items));
    } catch (e) {}

    // Lưu vào Warmup Data (nếu chạy ở phía server Wix)
    if (wixWindowFrontend.rendering.env === 'backend') {
      wixWindowFrontend.warmupData.set('bestsellerPageData', {
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
    console.error('[Wix Velo] Lỗi nạp dữ liệu trang Best Seller:', err);
  }
});
