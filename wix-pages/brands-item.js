/**
 * WIX VELO PAGE CODE: Trang Brands (Item) — Thương hiệu & Các dòng Series
 * URL Dynamic Page: /brands/{slug} (Ví dụ: /brands/zwilling, /brands/miyabi, /brands/staub)
 * 
 * Logic hoạt động chuẩn:
 * - Mặc định: Hiển thị tiêu đề Brand, Carousel Series (ZWILLING PRO, Tanrei...) và toàn bộ sản phẩm của Brand.
 * - Khi click vào 1 Series (hoặc vào qua URL ?series=zwilling-pro):
 *    1. TỰ ĐỘNG THU GỌN / ẨN CAROUSEL SERIES (#seriesSection collapse về 0px).
 *    2. Cập nhật tiêu đề thành tên Series (ví dụ: ZWILLING PRO).
 *    3. Cập nhật Breadcrumb: TRANG CHỦ › THƯƠNG HIỆU › ZWILLING › ZWILLING PRO.
 *    4. Lưới sản phẩm: CHỈ HIỂN THỊ CÁC SẢN PHẨM THUỘC SERIES ĐÓ.
 * - Khi click Back trình duyệt HOẶC click vào "ZWILLING" trên Breadcrumb:
 *    1. Tự động nhận diện URL thay đổi (xóa ?series khỏi URL).
 *    2. Tự động phục hồi lại Carousel Series, tiêu đề Brand và toàn bộ sản phẩm của Brand.
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async function () {
  console.log('[Wix Velo] Đang nạp trang thương hiệu Brands (Item)...');

  // Helper tìm Custom Element an toàn
  function findElement(ids) {
    for (const id of ids) {
      try {
        const el = $w(id);
        if (el && typeof el.setAttribute === 'function') return el;
      } catch (e) {}
    }
    return null;
  }

  // Helper tìm Section an toàn (hỗ trợ collapse/expand)
  function findSection(ids) {
    for (const id of ids) {
      try {
        const el = $w(id);
        if (el && typeof el.collapse === 'function') return el;
      } catch (e) {}
    }
    return null;
  }

  // Helper gán thuộc tính cho Custom Element an toàn
  function safeSet(el, attrName, val) {
    if (el && typeof el.setAttribute === 'function') {
      el.setAttribute(attrName, typeof val === 'string' ? val : JSON.stringify(val));
    }
  }

  // Helper lắng nghe sự kiện an toàn
  function safeOn(el, eventName, handler) {
    if (el && typeof el.on === 'function') {
      el.on(eventName, handler);
    }
  }

  try {
    let currentBrand = null;

    // 1. Xác định Thương hiệu hiện tại (từ Dynamic Dataset hoặc từ URL)
    try {
      if ($w('#dynamicDataset')) {
        await $w('#dynamicDataset').onReadyAsync();
        currentBrand = $w('#dynamicDataset').getCurrentItem();
      }
    } catch (e) {}

    if (!currentBrand || !currentBrand.slug) {
      const pathSegments = wixLocation.path || [];
      const slugFromUrl = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : '';
      if (slugFromUrl) {
        const bRes = await wixData.query('Brands').eq('slug', slugFromUrl).find();
        if (bRes.items.length > 0) currentBrand = bRes.items[0];
      }
    }

    if (!currentBrand) {
      console.warn('[Wix Velo] Không xác định được thương hiệu hiện tại.');
      return;
    }

    console.log('[Wix Velo] Đang hiển thị thương hiệu:', currentBrand.title, 'Slug:', currentBrand.slug);

    const brandId = currentBrand.ID || currentBrand._id;
    const brandDbId = currentBrand._id;
    const brandSlug = currentBrand.slug || currentBrand.ID;

    // Tìm các phần tử trên trang
    const breadcrumbEl = findElement(['#brandBreadcrumb', '#categoryBreadcrumb', '#breadcrumb']);
    const seriesCarouselEl = findElement(['#seriesCarousel', '#categoryCarousel']);
    const productListingEl = findElement(['#productListing', '#categoryProductListing', '#brandProductListing']);
    const seriesSection = findSection(['#seriesSection', '#sectionSeries', '#subCategorySection', '#categoryCarouselSection']);

    // 2. Lấy danh sách Series, danh sách đầy đủ Thương hiệu (cho sidebar),
    // danh mục và toàn bộ sản phẩm của thương hiệu
    const [seriesRes, brandsRes, catsRes, prodsRes] = await Promise.all([
      wixData.query('Series')
        .hasSome('brand', [brandDbId, brandId].filter(Boolean))
        .ascending('sortOrder')
        .find(),
      wixData.query('Brands')
        .ascending('sortOrder')
        .find(),
      wixData.query('Categories')
        .ascending('sortOrder')
        .limit(500)
        .find(),
      wixData.query('Products')
        .hasSome('brand', [brandDbId, brandId].filter(Boolean))
        .eq('status', 'active')
        .limit(1000)
        .find()
    ]);

    const allSeries = seriesRes.items;
    let allBrandProducts = prodsRes.items;

    // Tự động bổ sung giá (minPrice/price) và ảnh từ ProductVariants nếu Products bị thiếu
    const needEnrich = allBrandProducts.filter(p => (!p.minPrice && !p.price && !p.min_price) || !p.mainImage);
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

        allBrandProducts = allBrandProducts.map(p => {
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

    console.log(`[Wix Velo] Tìm thấy ${allSeries.length} series, ${brandsRes.items.length} thương hiệu và ${allBrandProducts.length} sản phẩm của ${currentBrand.title}.`);

    // Gán dữ liệu cho sidebar: Thương hiệu hiển thị tất cả, danh mục tự động lọc theo sản phẩm hiện có
    safeSet(productListingEl, 'brands', brandsRes.items);
    safeSet(productListingEl, 'categories', catsRes.items);

    // ==========================================
    // HÀM 1: HIỂN THỊ CHẾ ĐỘ SERIES CỤ THỂ (ẨN CAROUSEL, CHỈ HIỆN SẢN PHẨM CỦA SERIES)
    // ==========================================
    function showSeriesView(seriesItem) {
      console.log('[Wix Velo] Đang kích hoạt chế độ xem Series:', seriesItem.title);

      // 1. Ẩn hoàn toàn Section chứa Carousel Series về 0px
      if (seriesCarouselEl) {
        try { seriesCarouselEl.collapse(); } catch (e) {}
      }
      if (seriesSection) {
        try { seriesSection.collapse(); } catch (e) {}
      }

      // 2. Cập nhật Tiêu đề trang thành tên Series (ZWILLING PRO)
      try {
        if ($w('#brandTitle')) $w('#brandTitle').text = seriesItem.title || '';
        if ($w('#brandDesc')) {
          if (seriesItem.description) {
            $w('#brandDesc').text = seriesItem.description;
            $w('#brandDesc').expand();
          } else {
            $w('#brandDesc').collapse();
          }
        }
      } catch (e) {}

      // 3. Cập nhật Breadcrumb: TRANG CHỦ › THƯƠNG HIỆU › [BRAND] › [SERIES]
      safeSet(breadcrumbEl, 'items', [
        { label: 'TRANG CHỦ', url: '/' },
        { label: 'THƯƠNG HIỆU', url: '/brands' },
        { label: currentBrand.title.toUpperCase(), url: `/brands/${brandSlug}` },
        { label: seriesItem.title.toUpperCase(), url: '#' }
      ]);

      // 4. Lọc lưới sản phẩm: CHỈ HIỂN THỊ SẢN PHẨM THUỘC SERIES NÀY
      const seriesProds = allBrandProducts.filter(p => {
        if (!p.series) return false;
        return p.series === seriesItem.ID || 
               p.series === seriesItem._id || 
               p.series === seriesItem.slug ||
               (seriesItem.slug && p.series.includes(seriesItem.slug)) ||
               (seriesItem.ID && p.series.includes(seriesItem.ID));
      });

      console.log(`[Wix Velo] Series ${seriesItem.title} có ${seriesProds.length} sản phẩm.`);
      safeSet(productListingEl, 'products', seriesProds);
    }

    // ==========================================
    // HÀM 2: HIỂN THỊ CHẾ ĐỘ THƯƠNG HIỆU TỔNG QUÁT (HIỆN CAROUSEL SERIES + TẤT CẢ SẢN PHẨM)
    // ==========================================
    function showBrandOverview() {
      console.log('[Wix Velo] Đang hiển thị tổng quan thương hiệu:', currentBrand.title);

      // 1. Tiêu đề & mô tả thương hiệu
      try {
        if ($w('#brandTitle')) $w('#brandTitle').text = currentBrand.title || '';
        if ($w('#brandDesc')) {
          if (currentBrand.description) {
            $w('#brandDesc').text = currentBrand.description;
            $w('#brandDesc').expand();
          } else {
            $w('#brandDesc').collapse();
          }
        }
      } catch (e) {}

      // 2. Breadcrumb: TRANG CHỦ › THƯƠNG HIỆU › [TÊN THƯƠNG HIỆU]
      safeSet(breadcrumbEl, 'items', [
        { label: 'TRANG CHỦ', url: '/' },
        { label: 'THƯƠNG HIỆU', url: '/brands' },
        { label: currentBrand.title.toUpperCase(), url: '#' }
      ]);

      // 3. Mở rộng Section & nạp dữ liệu Carousel Series nếu có
      if (allSeries.length > 0) {
        if (seriesSection) {
          try { seriesSection.expand(); } catch (e) {}
        }
        if (seriesCarouselEl) {
          try { seriesCarouselEl.expand(); } catch (e) {}
          safeSet(seriesCarouselEl, 'items', allSeries);
          safeSet(seriesCarouselEl, 'categories', allSeries);
          safeSet(seriesCarouselEl, 'selectedId', '');
        }
      } else {
        if (seriesCarouselEl) {
          safeSet(seriesCarouselEl, 'items', []);
          try { seriesCarouselEl.collapse(); } catch (e) {}
        }
        if (seriesSection) {
          try { seriesSection.collapse(); } catch (e) {}
        }
      }

      // 4. Lưới sản phẩm: Hiển thị tất cả sản phẩm của Thương hiệu
      safeSet(productListingEl, 'products', allBrandProducts);
    }

    // ==========================================
    // HÀM LẤY SERIES QUERY PARAM CHUẨN XÁC
    // ==========================================
    function getActiveSeriesParam(loc) {
      // 1. Kiểm tra trực tiếp window.location.search (trình duyệt thật luôn cập nhật trước và chuẩn nhất khi Back/Forward)
      if (typeof window !== 'undefined' && window.location) {
        try {
          const search = window.location.search;
          if (!search) {
            // Không hề có query search string -> Đang ở /brands/miyabi
            return null;
          }
          const params = new URLSearchParams(search);
          if (params.has('series')) {
            return params.get('series');
          }
          return null;
        } catch (e) {}
      }

      // 2. Kiểm tra từ object loc do wixLocation.onChange truyền vào
      if (loc && loc.query) {
        return loc.query.series || null;
      }

      // 3. Fallback sang wixLocation.query
      if (wixLocation && wixLocation.query) {
        return wixLocation.query.series || null;
      }

      return null;
    }

    // ==========================================
    // HÀM ĐIỀU HƯỚNG THEO URL QUERY PARAMS
    // ==========================================
    function checkAndApplyRoute(loc) {
      const querySeriesSlug = getActiveSeriesParam(loc);
      console.log('[Brands Item] checkAndApplyRoute, series =', querySeriesSlug);

      if (querySeriesSlug) {
        const cleanQuery = querySeriesSlug.toLowerCase().trim();
        const sItem = allSeries.find(s => {
          const sSlug = (s.slug || '').toLowerCase();
          const sID = (s.ID || '').toLowerCase();
          const sDbId = (s._id || '').toLowerCase();
          return sSlug === cleanQuery || 
                 sID === cleanQuery || 
                 sDbId === cleanQuery ||
                 (sID && sID.endsWith(cleanQuery)) ||
                 (sSlug && cleanQuery.includes(sSlug)) ||
                 (cleanQuery && sSlug && cleanQuery.endsWith(sSlug));
        });

        if (sItem) {
          showSeriesView(sItem);
          return;
        }
      }

      // Không có ?series trên URL -> Hiển thị lại toàn bộ Thương hiệu
      showBrandOverview();
    }

    // 3. Áp dụng router ngay khi vào trang
    checkAndApplyRoute();

    // ==========================================
    // 4. LẮNG NGHE THAY ĐỔI URL (Khi người dùng bấm nút BACK / FORWARD của trình duyệt)
    // ==========================================
    try {
      wixLocation.onChange((loc) => {
        console.log('[Brands Item] wixLocation.onChange kích hoạt:', loc);
        checkAndApplyRoute(loc);
      });
    } catch (e) {
      console.warn('[Brands Item] Lỗi đăng ký wixLocation.onChange:', e);
    }

    // Phòng thủ bổ sung cho trình duyệt (popstate event)
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      try {
        window.addEventListener('popstate', () => {
          console.log('[Brands Item] window popstate kích hoạt');
          checkAndApplyRoute();
          setTimeout(() => checkAndApplyRoute(), 50);
        });
      } catch (e) {}
    }

    // ==========================================
    // 5. LẮNG NGHE KHI CLICK VÀO BREADCRUMB:
    // Click vào "MIYABI" (hoặc "ZWILLING") -> Trở về tổng quan thương hiệu
    // Click vào "TRANG CHỦ" hoặc "THƯƠNG HIỆU" -> Điều hướng tới trang tương ứng
    // ==========================================
    if (breadcrumbEl) {
      safeOn(breadcrumbEl, 'breadcrumb-click', (e) => {
        const item = e.detail?.item;
        if (!item) return;

        console.log('[Brands Item] Click Breadcrumb:', item);

        const targetUrl = item.url || '';

        // Nếu click vào chính Thương hiệu hiện tại (ví dụ: /brands/miyabi hoặc nhãn "MIYABI")
        if (
          targetUrl === `/brands/${brandSlug}` ||
          targetUrl === `/brands/${currentBrand.ID}` ||
          item.label === currentBrand.title.toUpperCase() ||
          item.label === (currentBrand.title || '').toUpperCase()
        ) {
          // Xóa query param ?series khỏi URL trên trình duyệt
          try {
            wixLocation.queryParams.remove(['series']);
          } catch (err) {}

          // Phục hồi lại màn tổng quan Thương hiệu
          showBrandOverview();
          return;
        }

        // Nếu click vào các cấp cha như TRANG CHỦ hoặc THƯƠNG HIỆU
        if (targetUrl && targetUrl !== '#') {
          wixLocation.to(targetUrl);
        }
      });
    }

    // ==========================================
    // 6. SỰ KIỆN KHI CLICK VÀO 1 SERIES TRÊN CAROUSEL:
    // Tự động chuyển sang chế độ Series (ẨN CAROUSEL VÀ CHỈ SHOW SẢN PHẨM SERIES ĐÓ)
    // ==========================================
    if (seriesCarouselEl) {
      safeOn(seriesCarouselEl, 'category-select', (e) => {
        const sItem = e.detail?.category;
        if (!sItem) return;

        const seriesSlug = sItem.slug || sItem.ID || sItem._id;
        console.log('[Brands Item] Người dùng bấm vào Series:', sItem.title, 'Slug:', seriesSlug);

        // Cập nhật Query Param trên URL để giữ trạng thái (có thể bookmark/chia sẻ/ấn Back)
        try {
          wixLocation.queryParams.add({ series: seriesSlug });
        } catch (err) {}

        // Kích hoạt giao diện Series: Ẩn Carousel, đổi breadcrumb, đổi title, chỉ show sản phẩm của Series
        showSeriesView(sItem);
      });
    }

    // 7. Sự kiện khi click vào sản phẩm -> chuyển sang trang PDP (/product/{slug})
    safeOn(productListingEl, 'product-select', (e) => {
      const slug = e.detail?.product?.slug || e.detail?.product?.ID;
      if (slug) {
        wixLocation.to(`/product/${slug}`);
      }
    });

  } catch (err) {
    console.error('[Wix Velo] Lỗi nạp dữ liệu trang Brands (Item):', err);
  }
});
