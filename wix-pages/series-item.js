/**
 * WIX VELO PAGE CODE: Trang Series (Item) — Chi tiết dòng sản phẩm của thương hiệu
 * Dynamic Page URL: /brands/{brand}/{slug} (Ví dụ: /brands/zwilling/zwilling-pro)
 * 
 * Các phần tử trên trang:
 * 1. #seriesBreadcrumb (Tag Name: wx-breadcrumb)
 * 2. #seriesTitle      (Text element - hiển thị tên dòng sản phẩm, ví dụ: ZWILLING PRO)
 * 3. #seriesDesc       (Text element - mô tả dòng sản phẩm, tự ẩn nếu rỗng)
 * 4. #productListing   (Tag Name: wx-product-listing) — CHỈ HIỂN THỊ SẢN PHẨM CỦA SERIES ĐÓ
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async function () {
  console.log('[Wix Velo] Đang nạp trang Series (Item)...');

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
    let currentSeries = null;

    // 1. Xác định Series hiện tại (từ Dynamic Dataset hoặc từ URL)
    try {
      if ($w('#dynamicDataset')) {
        await $w('#dynamicDataset').onReadyAsync();
        currentSeries = $w('#dynamicDataset').getCurrentItem();
      }
    } catch (e) {}

    // Fallback: nếu dataset chưa sẵn sàng, lấy slug từ URL (/brands/zwilling/zwilling-pro -> slug là zwilling-pro)
    const pathSegments = wixLocation.path || [];
    let seriesSlug = '';
    let brandSlug = '';

    if (pathSegments.length >= 2) {
      seriesSlug = pathSegments[pathSegments.length - 1];
      brandSlug = pathSegments[pathSegments.length - 2];
    } else if (pathSegments.length === 1) {
      seriesSlug = pathSegments[0];
    }

    if (!currentSeries || !currentSeries.slug) {
      if (seriesSlug) {
        const sRes = await wixData.query('Series').eq('slug', seriesSlug).find();
        if (sRes.items.length > 0) currentSeries = sRes.items[0];
      }
    }

    if (!currentSeries) {
      console.warn('[Wix Velo] Không xác định được Series hiện tại.');
      return;
    }

    console.log('[Wix Velo] Đang hiển thị Series:', currentSeries.title, 'Slug:', currentSeries.slug);

    const seriesId = currentSeries.ID || currentSeries._id;
    const seriesDbId = currentSeries._id;

    // Tìm các phần tử trên trang
    const breadcrumbEl = findElement(['#seriesBreadcrumb', '#brandBreadcrumb', '#categoryBreadcrumb', '#breadcrumb']);
    const productListingEl = findElement(['#productListing', '#seriesProductListing', '#categoryProductListing']);

    // 2. Lấy thông tin Thương hiệu mẹ của Series
    let brandObj = null;
    const brandRef = currentSeries.brand;
    if (brandRef) {
      try {
        const bRes = await wixData.query('Brands')
          .hasSome('_id', [brandRef])
          .or(wixData.query('Brands').hasSome('ID', [brandRef]))
          .or(wixData.query('Brands').hasSome('slug', [brandRef]))
          .find();
        if (bRes.items.length > 0) brandObj = bRes.items[0];
      } catch (e) {}
    }

    if (!brandObj && brandSlug) {
      try {
        const bRes = await wixData.query('Brands').eq('slug', brandSlug).find();
        if (bRes.items.length > 0) brandObj = bRes.items[0];
      } catch (e) {}
    }

    const brandTitle = brandObj ? brandObj.title : (brandSlug || 'BRAND').toUpperCase();
    const brandUrlSlug = brandObj ? (brandObj.slug || brandObj.ID) : brandSlug;

    // 3. Tiêu đề & Mô tả Series
    try {
      if ($w('#seriesTitle')) $w('#seriesTitle').text = currentSeries.title || '';
      if ($w('#seriesDesc')) {
        if (currentSeries.description) {
          $w('#seriesDesc').text = currentSeries.description;
          $w('#seriesDesc').expand();
        } else {
          $w('#seriesDesc').collapse();
        }
      }
    } catch (e) {}

    // 4. Cài đặt Breadcrumb: TRANG CHỦ › THƯƠNG HIỆU › [TÊN THƯƠNG HIỆU] › [TÊN SERIES]
    // Ví dụ: TRANG CHỦ › THƯƠNG HIỆU › ZWILLING › ZWILLING PRO
    const breadcrumbItems = [
      { label: 'TRANG CHỦ', url: '/' },
      { label: 'THƯƠNG HIỆU', url: '/brands' },
      { label: brandTitle, url: `/brands/${brandUrlSlug}` },
      { label: currentSeries.title.toUpperCase(), url: '#' }
    ];
    safeSet(breadcrumbEl, 'items', breadcrumbItems);

    // 5. Truy vấn sản phẩm: CHỈ LẤY CÁC SẢN PHẨM THUỘC SERIES NÀY
    const [catsRes, prodsRes] = await Promise.all([
      wixData.query('Categories').eq('depth', 0).ascending('sortOrder').find(),
      wixData.query('Products')
        .hasSome('series', [seriesDbId, seriesId, currentSeries.slug].filter(Boolean))
        .eq('status', 'active')
        .limit(1000)
        .find()
    ]);

    console.log(`[Wix Velo] Tìm thấy ${prodsRes.items.length} sản phẩm của Series "${currentSeries.title}".`);

    // Nạp dữ liệu vào Lưới sản phẩm & Bộ lọc Drawer
    safeSet(productListingEl, 'categories', catsRes.items);
    safeSet(productListingEl, 'products', prodsRes.items);

    // Bấm sản phẩm -> Chuyển sang chi tiết PDP (/product/{slug})
    safeOn(productListingEl, 'product-select', (e) => {
      const slug = e.detail?.product?.slug || e.detail?.product?.ID;
      if (slug) {
        wixLocation.to(`/product/${slug}`);
      }
    });

  } catch (err) {
    console.error('[Wix Velo] Lỗi nạp dữ liệu trang Series (Item):', err);
  }
});
