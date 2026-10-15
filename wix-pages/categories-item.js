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
        if (catRes.items.length > 0) {
          currentCat = catRes.items.find(c => c.taxonomy === 'product') || catRes.items[0];
        }
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
    let subCatQuery = wixData.query('Categories')
      .hasSome('parent', [catDbId, catId].filter(Boolean));
    if (currentCat.taxonomy) {
      subCatQuery = subCatQuery.eq('taxonomy', currentCat.taxonomy);
    }
    let subCatRes = await subCatQuery.ascending('sortOrder').find();

    // Fallback: nếu parent chưa có nhưng phân cấp theo path thực sự của danh mục cha
    if (subCatRes.items.length === 0 && currentCat.path && currentCat.path.length > 1) {
      let pathQuery = wixData.query('Categories')
        .startsWith('path', currentCat.path)
        .ne('path', currentCat.path);
      if (catDbId) pathQuery = pathQuery.ne('_id', catDbId);
      if (catId) pathQuery = pathQuery.ne('ID', catId);
      if (currentCat.taxonomy) pathQuery = pathQuery.eq('taxonomy', currentCat.taxonomy);
      subCatRes = await pathQuery.ascending('sortOrder').find();
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

    // Nạp dữ liệu vào Lưới sản phẩm & Bộ lọc
    safeSet(productListingEl, 'brands', brandsRes.items);
    safeSet(productListingEl, 'categories', subCatRes.items.length > 0 ? subCatRes.items : [currentCat]);
    safeSet(productListingEl, 'products', products);

    // Click sản phẩm -> chuyển sang trang PDP (/product/{slug}?color=...)
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
    console.error('[Wix Velo] Lỗi nạp dữ liệu trang Categories (Item):', err);
  }
});
