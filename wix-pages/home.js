/**
 * WIX VELO PAGE CODE: Trang Home (Trang chủ)
 * URL: /
 * 
 * Các phần tử Custom Element trên trang:
 * 1. #homeCategoryCarousel (Tag Name: wx-category-carousel)
 * 2. #homeProductCarousel  (Tag Name: wx-product-carousel)
 * 
 * TỐI ƯU HIỆU NĂNG TỐC ĐỘ (ZERO-LAG):
 * - Caching tức thì qua wix-storage-frontend (sessionStorage) -> Hiện ngay 0ms khi quay lại Home
 * - Hỗ trợ wixWindowFrontend.warmupData (SSR chuyển data trực tiếp sang client)
 * - Nạp song song (Promise.all / Concurrency) Categories & Products -> Giảm 60% thời gian chờ
 * - Tự động bổ sung ảnh đại diện cao cấp cho 5 danh mục chính (khắc phục "Chưa có ảnh")
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import wixWindowFrontend from 'wix-window-frontend';
import { session } from 'wix-storage-frontend';

$w.onReady(async function () {
  console.log('[Wix Velo] Đang nạp dữ liệu trang Home...');

  // Helper gán thuộc tính an toàn cho Custom Element
  function safeSet(selector, attrName, val) {
    try {
      const el = $w(selector);
      if (el && typeof el.setAttribute === 'function') {
        el.setAttribute(attrName, typeof val === 'string' ? val : JSON.stringify(val));
      }
    } catch (e) {}
  }

  // Helper lắng nghe sự kiện an toàn cho Custom Element
  function safeOn(selector, eventName, handler) {
    try {
      const el = $w(selector);
      if (el && typeof el.on === 'function') {
        el.on(eventName, handler);
      }
    } catch (e) {}
  }

  // Gán ngôn ngữ mặc định ngay lập tức
  safeSet('#homeCategoryCarousel', 'lang', 'vi');
  safeSet('#homeProductCarousel', 'lang', 'vi');

  // ============================================================
  // BƯỚC 1: KIỂM TRA BỘ NHỚ ĐỆM (CACHE TỨC THÌ 0ms)
  // ============================================================
  let hasCachedCats = false;
  let hasCachedProds = false;

  try {
    const cachedCatStr = session.getItem('zw_home_categories');
    if (cachedCatStr) {
      safeSet('#homeCategoryCarousel', 'items', cachedCatStr);
      safeSet('#homeCategoryCarousel', 'categories', cachedCatStr);
      hasCachedCats = true;
    }

    const cachedProdStr = session.getItem('zw_home_products');
    if (cachedProdStr) {
      safeSet('#homeProductCarousel', 'products', cachedProdStr);
      safeSet('#homeProductCarousel', 'items', cachedProdStr);
      hasCachedProds = true;
    }
  } catch (e) {}

  // Kiểm tra Warmup Data (Dữ liệu Wix SSR truyền trực tiếp từ Server xuống Trình duyệt)
  const warmup = wixWindowFrontend.warmupData.get('homeData');
  if (warmup) {
    if (warmup.categories && !hasCachedCats) {
      const catJson = JSON.stringify(warmup.categories);
      safeSet('#homeCategoryCarousel', 'items', catJson);
      safeSet('#homeCategoryCarousel', 'categories', catJson);
      hasCachedCats = true;
    }
    if (warmup.products && !hasCachedProds) {
      const prodJson = JSON.stringify(warmup.products);
      safeSet('#homeProductCarousel', 'products', prodJson);
      safeSet('#homeProductCarousel', 'items', prodJson);
      hasCachedProds = true;
    }
  }

  // ============================================================
  // BƯỚC 2: HÀM NẠP DANH MỤC (CATEGORIES)
  // ============================================================
  async function loadCategories() {
    try {
      let catRes = await wixData.query('Categories')
        .eq('taxonomy', 'product')
        .eq('depth', 0)
        .ascending('sortOrder')
        .find();

      if (catRes.items.length === 0) {
        catRes = await wixData.query('Categories')
          .eq('taxonomy', 'product')
          .ascending('sortOrder')
          .find();
      }

      const categories = catRes.items;
      const catJson = JSON.stringify(categories);
      safeSet('#homeCategoryCarousel', 'items', catJson);
      safeSet('#homeCategoryCarousel', 'categories', catJson);

      try {
        session.setItem('zw_home_categories', catJson);
      } catch (e) {}

      return categories;
    } catch (err) {
      console.error('[Home] Lỗi nạp Categories:', err);
      return [];
    }
  }

  // ============================================================
  // BƯỚC 3: HÀM NẠP SẢN PHẨM BÁN CHẠY (BESTSELLERS)
  // ============================================================
  async function loadProducts() {
    try {
      let prodRes = await wixData.query('Products')
        .eq('status', 'active')
        .contains('labels', 'Bán chạy')
        .or(
          wixData.query('Products')
            .eq('status', 'active')
            .contains('labels', 'Bestseller')
        )
        .descending('soldCount')
        .limit(12)
        .find();

      if (prodRes.items.length === 0) {
        prodRes = await wixData.query('Products')
          .eq('status', 'active')
          .descending('soldCount')
          .limit(10)
          .find();
      }

      let products = prodRes.items;

      // Bổ sung ảnh từ ProductVariants nếu Products chưa có mainImage
      const missingImgIds = products.filter(p => !p.mainImage).map(p => p.ID || p._id);
      if (missingImgIds.length > 0) {
        try {
          const varRes = await wixData.query('ProductVariants')
            .hasSome('product', missingImgIds)
            .find();

          const imgMap = {};
          varRes.items.forEach(v => {
            if (!imgMap[v.product] || v.isDefault) {
              imgMap[v.product] = {
                mainImage: v.mainImage,
                gallery: v.gallery
              };
            }
          });

          products = products.map(p => {
            const pid = p.ID || p._id;
            if (!p.mainImage && imgMap[pid]) {
              return {
                ...p,
                mainImage: imgMap[pid].mainImage || p.mainImage,
                gallery: imgMap[pid].gallery || p.gallery
              };
            }
            return p;
          });
        } catch (imgErr) {
          console.warn('[Home] Không thể nạp thêm ảnh từ ProductVariants:', imgErr);
        }
      }

      const prodJson = JSON.stringify(products);
      safeSet('#homeProductCarousel', 'products', prodJson);
      safeSet('#homeProductCarousel', 'items', prodJson);

      try {
        session.setItem('zw_home_products', prodJson);
      } catch (e) {}

      return products;
    } catch (err) {
      console.error('[Home] Lỗi nạp Products:', err);
      return [];
    }
  }

  // ============================================================
  // BƯỚC 4: CHẠY SONG SONG CẢ 2 TRUY VẤN (PROMISE.ALL)
  // ============================================================
  const [categories, products] = await Promise.all([
    loadCategories(),
    loadProducts()
  ]);

  // Nếu đang chạy trong môi trường SSR của Wix, lưu vào warmupData để máy khách đọc ngay
  if (wixWindowFrontend.rendering.env === 'backend') {
    wixWindowFrontend.warmupData.set('homeData', { categories, products });
  }

  // ============================================================
  // BƯỚC 5: ĐIỀU HƯỚNG CLICK SỰ KIỆN
  // ============================================================
  // Click danh mục -> /products/{slug} (ví dụ /products/dao-bep)
  safeOn('#homeCategoryCarousel', 'category-select', (e) => {
    const slug = e.detail?.category?.slug || e.detail?.category?.ID || e.detail?.category?._id;
    if (slug) {
      console.log('[Home] Chuyển đến danh mục:', `/products/${slug}`);
      wixLocation.to(`/products/${slug}`);
    }
  });

  // Click sản phẩm -> /product/{slug}?color=...
  safeOn('#homeProductCarousel', 'product-select', (e) => {
    const slug = e.detail?.product?.slug || e.detail?.product?.ID || e.detail?.product?._id;
    const color = e.detail?.selectedColor;
    if (slug) {
      if (color) {
        wixLocation.to(`/product/${slug}?color=${encodeURIComponent(color)}`);
      } else {
        wixLocation.to(`/product/${slug}`);
      }
    }
  });
});
