/**
 * WIX VELO PAGE CODE: Trang Categories (List) — Tổng quan toàn bộ sản phẩm
 * URL: /products
 * 
 * Các phần tử Custom Element trên trang:
 * 1. #categoryBreadcrumb (Tag Name: wx-breadcrumb)
 * 2. #categoryCarousel   (Tag Name: wx-category-carousel)
 * 3. #productListing     (Tag Name: wx-product-listing)
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async function () {
  console.log('[Wix Velo] Đang nạp dữ liệu trang Categories (List)...');

  function findElement(ids) {
    for (const id of ids) {
      try {
        const el = $w(id);
        if (el && typeof el.setAttribute === 'function') return el;
      } catch (e) {}
    }
    return null;
  }

  function safeSet(el, attrName, val) {
    if (el && typeof el.setAttribute === 'function') {
      el.setAttribute(attrName, typeof val === 'string' ? val : JSON.stringify(val));
    }
  }

  function safeOn(el, eventName, handler) {
    if (el && typeof el.on === 'function') {
      el.on(eventName, handler);
    }
  }

  try {
    const breadcrumbEl = findElement(['#categoryBreadcrumb', '#breadcrumb']);
    const categoryCarouselEl = findElement(['#categoryCarousel', '#categoriesCarousel']);
    const productListingEl = findElement(['#productListing', '#categoryProductListing', '#catalogElement', '#catalogView']);

    // 1. Cài đặt Breadcrumb: TRANG CHỦ › SẢN PHẨM
    safeSet(breadcrumbEl, 'items', [
      { label: 'TRANG CHỦ', url: '/' },
      { label: 'SẢN PHẨM', url: '/products' }
    ]);

    // 2. Lấy 5 danh mục sản phẩm chính cấp 0 (Dao Bếp, Nồi & Chảo, Dụng cụ bàn ăn...)
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

    const catJson = JSON.stringify(catRes.items);
    safeSet(categoryCarouselEl, 'items', catJson);
    safeSet(categoryCarouselEl, 'categories', catJson);

    // 3. Lấy danh sách thương hiệu và toàn bộ sản phẩm
    const [brandsRes, prodsRes] = await Promise.all([
      wixData.query('Brands').ascending('title').find(),
      wixData.query('Products').eq('status', 'active').limit(1000).find()
    ]);

    let products = prodsRes.items;

    // Tự động bổ sung giá (minPrice/price) và ảnh từ ProductVariants nếu Products bị thiếu
    const needEnrich = products.filter(p => (!p.minPrice && !p.price && !p.min_price) || !p.mainImage);
    if (needEnrich.length > 0) {
      try {
        const ids = needEnrich.map(p => p.ID || p._id).filter(Boolean);
        const varRes = await wixData.query('ProductVariants')
          .hasSome('product', ids)
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
        console.warn('[Wix Velo] Không thể fallback ProductVariants:', errVar);
      }
    }

    safeSet(productListingEl, 'categories', catJson);
    safeSet(productListingEl, 'brands', JSON.stringify(brandsRes.items));
    safeSet(productListingEl, 'products', JSON.stringify(products));

    // 4. Sự kiện click danh mục -> Chuyển sang /products/{slug}
    safeOn(categoryCarouselEl, 'category-select', (e) => {
      const slug = e.detail?.category?.slug || e.detail?.category?.ID || e.detail?.category?._id;
      if (slug) {
        wixLocation.to(`/products/${slug}`);
      }
    });

    // 5. Sự kiện click sản phẩm -> Chuyển sang chi tiết PDP (/product/{slug})
    safeOn(productListingEl, 'product-select', (e) => {
      const slug = e.detail?.product?.slug || e.detail?.product?.ID || e.detail?.product?._id;
      if (slug) {
        wixLocation.to(`/product/${slug}`);
      }
    });
  } catch (err) {
    console.error('Lỗi nạp dữ liệu trang Categories (List):', err);
  }
});
