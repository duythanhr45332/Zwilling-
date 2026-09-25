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
      image: b.logo || b.bannerImage || null,
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

    safeSet(productListingEl, 'brands', brandsRes.items);
    safeSet(productListingEl, 'categories', catsRes.items);
    safeSet(productListingEl, 'products', prodsRes.items);

    // Click sản phẩm -> chuyển sang chi tiết PDP (/product/{slug})
    safeOn(productListingEl, 'product-select', (e) => {
      const slug = e.detail?.product?.slug || e.detail?.product?.ID;
      if (slug) {
        wixLocation.to(`/product/${slug}`);
      }
    });

  } catch (err) {
    console.error('[Wix Velo] Lỗi nạp dữ liệu trang Brands (List):', err);
  }
});
