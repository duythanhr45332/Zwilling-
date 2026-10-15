/**
 * WIX VELO PAGE CODE: Trang Brands (List) — Danh sách tất cả Thương hiệu
 * URL: /brands
 * 
 * Các phần tử Custom Element trên trang:
 * 1. #brandBreadcrumb (Tag Name: wx-breadcrumb)
 * 2. #brandCarousel   (Tag Name: wx-category-carousel)
 * 3. #productListing  (Tag Name: wx-product-listing)
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async function () {
  console.log('[Wix Velo] Đang nạp trang danh sách thương hiệu Brands (List)...');

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
    const breadcrumbEl = findElement(['#brandBreadcrumb', '#categoryBreadcrumb', '#breadcrumb']);
    const brandCarouselEl = findElement(['#brandCarousel', '#categoryCarousel']);
    const productListingEl = findElement(['#productListing', '#categoryProductListing']);

    // 1. Breadcrumb: TRANG CHỦ › THƯƠNG HIỆU
    safeSet(breadcrumbEl, 'items', [
      { label: 'TRANG CHỦ', url: '/' },
      { label: 'THƯƠNG HIỆU', url: '#' }
    ]);

    safeOn(breadcrumbEl, 'breadcrumb-click', (e) => {
      const targetUrl = e.detail?.item?.url;
      if (targetUrl && targetUrl !== '#') {
        wixLocation.to(targetUrl);
      }
    });

    // 2. Lấy danh sách Thương hiệu (Brands)
    const brandsRes = await wixData.query('Brands')
      .ascending('sortOrder')
      .find();

    const brandsData = brandsRes.items.map(b => ({
      ...b,
      title: b.title,
      image: b.image || b.logo || b.bannerImage || null,
      slug: b.slug || b.ID
    }));

    safeSet(brandCarouselEl, 'items', brandsData);
    safeSet(brandCarouselEl, 'categories', brandsData);

    // Click vào thương hiệu -> chuyển sang /brands/{slug} (ví dụ: /brands/zwilling)
    safeOn(brandCarouselEl, 'category-select', (e) => {
      const slug = e.detail?.category?.slug || e.detail?.category?.ID || e.detail?.category?._id;
      if (slug) {
        wixLocation.to(`/brands/${slug}`);
      }
    });

    // 3. Lấy toàn bộ sản phẩm và danh mục cho bộ lọc drawer
    const [catsRes, prodsRes] = await Promise.all([
      wixData.query('Categories').eq('depth', 0).ascending('sortOrder').find(),
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

        console.log(`[Wix Velo] Tìm thấy ${varRes.items.length} biến thể ProductVariants cho ${products.length} sản phẩm Brands List.`);

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

    safeSet(productListingEl, 'brands', brandsRes.items);
    safeSet(productListingEl, 'categories', catsRes.items);
    safeSet(productListingEl, 'products', products);

    // Click sản phẩm -> chuyển sang chi tiết PDP (/product/{slug}?color=...)
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
    console.error('[Wix Velo] Lỗi nạp dữ liệu trang Brands (List):', err);
  }
});
