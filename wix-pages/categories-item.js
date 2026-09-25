/**
 * WIX VELO PAGE CODE: Trang Categories (Item) — Trang danh mục động
 * URL: /products/{slug} (Ví dụ: /products/dao-bep, /products/dao-santoku)
 * 
 * Các phần tử trên trang:
 * 1. #categoryBreadcrumb    (Tag Name: wx-breadcrumb)
 * 2. #categoryTitle         (Text element - hiển thị tên danh mục)
 * 3. #categoryDesc          (Text element - hiển thị mô tả, tự ẩn nếu rỗng)
 * 4. Section #subCategorySection chứa #subCategoryCarousel (Tag Name: wx-category-carousel)
 *    -> TỰ ĐỘNG THU GỌN VỀ 0PX KHI ĐẾN DANH MỤC LÁ (KHÔNG CÒN CON)
 * 5. #categoryProductListing (Tag Name: wx-product-listing)
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async function () {
  console.log('[Wix Velo] Đang khởi tạo trang Categories (Item)...');

  // Helper tìm phần tử an toàn
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

  // Helper gán thuộc tính an toàn
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
    // 1. Xác định Danh mục hiện tại (từ Dataset hoặc trực tiếp từ URL slug)
    let currentCat = null;
    try {
      if ($w('#dynamicDataset')) {
        await $w('#dynamicDataset').onReadyAsync();
        currentCat = $w('#dynamicDataset').getCurrentItem();
      }
    } catch (e) {}

    if (!currentCat || !currentCat.slug) {
      const pathSegments = wixLocation.path || [];
      const slugFromUrl = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : '';
      if (slugFromUrl) {
        const catRes = await wixData.query('Categories').eq('slug', slugFromUrl).find();
        if (catRes.items.length > 0) currentCat = catRes.items[0];
      }
    }

    if (!currentCat) {
      console.warn('[Wix Velo] Không xác định được danh mục hiện tại.');
      return;
    }

    console.log('[Wix Velo] Danh mục hiện tại:', currentCat.title, 'Slug:', currentCat.slug);

    const catId = currentCat.ID || currentCat._id;
    const catDbId = currentCat._id;

    // Tìm các phần tử và Section trên trang
    const breadcrumbEl = findElement(['#categoryBreadcrumb', '#breadcrumb']);
    const subCatEl = findElement(['#subCategoryCarousel', '#categoryCarousel', '#subCategories']);
    const productListingEl = findElement(['#categoryProductListing', '#productListing', '#catalogElement', '#catalogView']);
    const subCatSection = $w('#subCategorySection') || findElement(['#sectionSubCategories', '#subCatSection']);

    // 2. Tiêu đề & Mô tả danh mục nếu có text element
    try {
      if ($w('#categoryTitle')) $w('#categoryTitle').text = currentCat.title || '';
      if ($w('#categoryDesc')) {
        if (currentCat.description) {
          $w('#categoryDesc').text = currentCat.description;
          $w('#categoryDesc').expand();
        } else {
          $w('#categoryDesc').collapse();
        }
      }
    } catch (e) {}

    // 3. Breadcrumb: TRANG CHỦ › SẢN PHẨM › [CHA NẾU CÓ] › [DANH MỤC HIỆN TẠI]
    const breadcrumbItems = [
      { label: 'TRANG CHỦ', url: '/' },
      { label: 'SẢN PHẨM', url: '/products' }
    ];

    if (currentCat.parent) {
      try {
        const parentRes = await wixData.query('Categories')
          .hasSome('_id', [currentCat.parent])
          .or(wixData.query('Categories').hasSome('ID', [currentCat.parent]))
          .find();
        if (parentRes.items.length > 0) {
          const parentCat = parentRes.items[0];
          breadcrumbItems.push({
            label: parentCat.title.toUpperCase(),
            url: `/products/${parentCat.slug}`
          });
        }
      } catch (e) {}
    }

    breadcrumbItems.push({
      label: currentCat.title.toUpperCase(),
      url: '#'
    });
    safeSet(breadcrumbEl, 'items', breadcrumbItems);

    // Lắng nghe sự kiện click breadcrumb
    safeOn(breadcrumbEl, 'breadcrumb-click', (e) => {
      const targetUrl = e.detail?.item?.url;
      if (targetUrl && targetUrl !== '#') {
        wixLocation.to(targetUrl);
      }
    });

    // 4. Lấy danh mục con (Subcategories) của danh mục hiện tại
    let subCatRes = await wixData.query('Categories')
      .hasSome('parent', [catDbId, catId].filter(Boolean))
      .ascending('sortOrder')
      .find();

    if (subCatRes.items.length === 0 && currentCat.slug) {
      subCatRes = await wixData.query('Categories')
        .startsWith('path', `/${currentCat.slug}/`)
        .ascending('sortOrder')
        .find();
    }

    if (subCatRes.items.length > 0) {
      // Có danh mục con -> Mở rộng Section & nạp dữ liệu Carousel
      if (subCatSection) {
        try { subCatSection.expand(); } catch (e) {}
      }
      if (subCatEl) {
        try { subCatEl.expand(); } catch (e) {}
        safeSet(subCatEl, 'items', subCatRes.items);
        safeSet(subCatEl, 'categories', subCatRes.items);

        safeOn(subCatEl, 'category-select', (e) => {
          const slug = e.detail?.category?.slug || e.detail?.category?.ID;
          if (slug) wixLocation.to(`/products/${slug}`);
        });
      }
    } else {
      // Danh mục lá cuối cùng (như DAO SANTOKU) -> Thu gọn triệt để Section về 0px
      if (subCatEl) {
        safeSet(subCatEl, 'items', []);
        safeSet(subCatEl, 'categories', []);
        try { subCatEl.collapse(); } catch (e) {}
      }
      if (subCatSection) {
        try { subCatSection.collapse(); } catch (e) {}
      }
    }

    // 5. Truy vấn sản phẩm (bao gồm cả danh mục cha và toàn bộ danh mục con)
    const allCatIds = [
      catDbId,
      catId,
      ...subCatRes.items.map(s => s._id),
      ...subCatRes.items.map(s => s.ID)
    ].filter(Boolean);

    let filterQuery = wixData.query('Products').hasSome('category', allCatIds);
    if (currentCat.path) {
      filterQuery = filterQuery.or(wixData.query('Products').contains('categoryPath', currentCat.path));
    } else if (currentCat.slug) {
      filterQuery = filterQuery.or(wixData.query('Products').contains('categoryPath', currentCat.slug));
    }

    const [brandsRes, prodRes] = await Promise.all([
      wixData.query('Brands').ascending('title').find(),
      filterQuery.eq('status', 'active').limit(1000).find()
    ]);

    let products = prodRes.items;

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

    // Nạp dữ liệu vào Lưới sản phẩm & Bộ lọc
    safeSet(productListingEl, 'brands', brandsRes.items);
    safeSet(productListingEl, 'categories', subCatRes.items.length > 0 ? subCatRes.items : [currentCat]);
    safeSet(productListingEl, 'products', products);

    // Click sản phẩm -> chuyển sang trang PDP (/product/{slug})
    safeOn(productListingEl, 'product-select', (e) => {
      const slug = e.detail?.product?.slug || e.detail?.product?.ID;
      if (slug) wixLocation.to(`/product/${slug}`);
    });

  } catch (err) {
    console.error('[Wix Velo] Lỗi nạp dữ liệu trang Categories (Item):', err);
  }
});
