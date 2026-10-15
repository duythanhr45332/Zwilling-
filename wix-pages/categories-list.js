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

    // Lắng nghe sự kiện click Breadcrumb để chuyển hướng (TRANG CHỦ -> /)
    safeOn(breadcrumbEl, 'breadcrumb-click', (e) => {
      const targetUrl = e.detail?.item?.url;
      if (targetUrl && targetUrl !== '#') {
        wixLocation.to(targetUrl);
      }
    });

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

    // Nạp đầy đủ ProductVariants để hiển thị từng biến thể màu (Option 2) và bổ sung giá/ảnh
    if (products.length > 0) {
      try {
        const ids = [
          ...products.map(p => p._id),
          ...products.map(p => p.ID)
        ].filter(Boolean);

        const varRes = await wixData.query('ProductVariants')
          .hasSome('product', ids)
          .ascending('sortOrder')
          .limit(1000)
          .find();

        console.log(`[Wix Velo] Tìm thấy ${varRes.items.length} biến thể ProductVariants cho ${products.length} sản phẩm.`);

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

        products = products.map(p => {
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

    // 5. Sự kiện click sản phẩm -> Chuyển sang chi tiết PDP (/product/{slug}?color=...)
    safeOn(productListingEl, 'product-select', (e) => {
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
  } catch (err) {
    console.error('Lỗi nạp dữ liệu trang Categories (List):', err);
  }
});
