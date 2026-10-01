# Hướng Dẫn Tích Hợp Thư Viện Web Components Lên Wix Studio

File bundle đã được build thành công tại:
📁 **`dist/my-wix-ui-lib.bundle.js`** (~68 KB)

---

## 1. Cách Đẩy File Bundle Lên Wix Studio

Trong Wix Studio, Custom Element yêu cầu đường dẫn **HTTPS URL** nạp mã JavaScript.

### Phương án A: Upload lên Hosting miễn phí (Khuyên dùng - Nhanh nhất)
Bạn có thể đưa file `dist/my-wix-ui-lib.bundle.js` lên bất kỳ dịch vụ static CDN nào, ví dụ:
- **Vercel / Netlify:** Kéo thả folder `dist` vào [vercel.com](https://vercel.com) hoặc [app.netlify.com/drop](https://app.netlify.com/drop) để có ngay 1 link HTTPS vĩnh viễn (ví dụ: `https://my-wix-lib.vercel.app/my-wix-ui-lib.bundle.js`).
- **GitHub Pages:** Đẩy lên repo GitHub và bật GitHub Pages.
- **jsDelivr / cdnjs / Cloudflare R2**.

### Phương án B: Nhúng qua Custom Code (Settings Site)
1. Mở **Dashboard** website Wix → **Settings** → **Custom Code**.
2. Bấm **+ Add Custom Code**.
3. Dán thẻ script trỏ tới file bundle vào phần **Head** hoặc **Body - end**, chọn **All Pages**.
```html
<script src="https://DUONG_DAN_CDN_CUA_BAN/my-wix-ui-lib.bundle.js"></script>
```

---

## 2. Cách Cấu Hình Custom Element Trong Wix Studio

Khi kéo phần tử **Custom Element** vào bất kỳ trang nào:
1. Chọn phần tử → Bấm icon **Settings** (bánh răng).
2. **Source:** Chọn **Server URL** và dán URL file `my-wix-ui-lib.bundle.js`.
3. **Tag Name:** Điền đúng tên tag của component tương ứng:
   - Breadcrumb: `wx-breadcrumb`
   - Dải danh mục: `wx-category-carousel`
   - Dải sản phẩm trượt: `wx-product-carousel`
   - Lưới sản phẩm & Lọc: `wx-product-listing`
   - Chi tiết sản phẩm: `wx-product-detail`

---

## 3. Mã Velo Chi Tiết Cho Từng Trang (Khớp 100% Cấu Trúc Trang Của Bạn)

### 3.1. Trang `Home`
- **Các element trên trang:**
  - `#homeCategoryCarousel` (Tag: `wx-category-carousel`)
  - `#homeProductCarousel` (Tag: `wx-product-carousel`)
- **Velo Code:**
```javascript
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async function () {
  console.log('[Wix Velo] Đang nạp dữ liệu trang Home...');

  function safeSet(selector, attrName, val) {
    try {
      const el = $w(selector);
      if (el && typeof el.setAttribute === 'function') {
        el.setAttribute(attrName, typeof val === 'string' ? val : JSON.stringify(val));
      }
    } catch (e) {}
  }

  function safeOn(selector, eventName, handler) {
    try {
      const el = $w(selector);
      if (el && typeof el.on === 'function') {
        el.on(eventName, handler);
      }
    } catch (e) {}
  }

  try {
    // 1. Nạp đúng 5 danh mục sản phẩm chính (taxonomy: product, depth: 0)
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
    safeSet('#homeCategoryCarousel', 'items', catJson);
    safeSet('#homeCategoryCarousel', 'categories', catJson);

    // 2. Nạp sản phẩm Bestseller (ưu tiên sản phẩm có nhãn Bestseller/Bán chạy)
    let prodRes = await wixData.query('Products')
      .eq('status', 'active')
      .contains('labels', 'Bestseller')
      .or(wixData.query('Products').eq('status', 'active').contains('labels', 'Bán chạy'))
      .or(wixData.query('Products').eq('status', 'active').eq('ribbon', 'Bestseller'))
      .or(wixData.query('Products').eq('status', 'active').eq('bestseller', true))
      .limit(12)
      .find();

    // Fallback: nếu chưa gán nhãn trong DB, lấy top sản phẩm theo lượt bán (soldCount) hoặc mới nhất
    if (prodRes.items.length === 0) {
      prodRes = await wixData.query('Products')
        .eq('status', 'active')
        .descending('soldCount')
        .limit(10)
        .find();
    }

    // Đảm bảo các sản phẩm đưa vào carousel đều có nhãn Bestseller
    const bestsellerProducts = prodRes.items.map(p => {
      let labels = p.labels;
      if (!labels || (Array.isArray(labels) && labels.length === 0) || labels === '[]') {
        labels = ['Bán chạy'];
      }
      return { ...p, labels };
    });
    
    safeSet('#homeProductCarousel', 'products', JSON.stringify(bestsellerProducts));

    // 3. Điều hướng khi click danh mục -> Chuyển sang /products/{slug}
    safeOn('#homeCategoryCarousel', 'category-select', (e) => {
      const slug = e.detail?.category?.slug || e.detail?.category?.ID || e.detail?.category?._id;
      if (slug) {
        console.log('[Home] Chuyển đến danh mục:', `/products/${slug}`);
        wixLocation.to(`/products/${slug}`);
      }
    });

    // 4. Điều hướng khi click sản phẩm -> Chuyển sang chi tiết PDP
    safeOn('#homeProductCarousel', 'product-select', (e) => {
      const slug = e.detail?.product?.slug || e.detail?.product?.ID || e.detail?.product?._id;
      if (slug) {
        wixLocation.to(`/products-item/${slug}`);
      }
    });
  } catch (err) {
    console.error('Lỗi nạp dữ liệu trang Home:', err);
  }
});
```

---

### 3.2. Trang `Categories (List)` — URL: `/products`
Trang tổng quan danh mục sản phẩm (Menu bấm vào `Products`).

- **Cấu trúc phần tử trên trang (3 Section riêng biệt hoặc 1 Section dùng Vertical Stack):**
  1. **Section 1: Breadcrumb & Tiêu đề trang**
     - Custom Element: `#categoryBreadcrumb` (Tag Name: `wx-breadcrumb`)
     - Text element (h1): Tiêu đề "PRODUCTS"
  2. **Section 2: Hàng 5 danh mục sản phẩm chính**
     - Custom Element: `#categoryCarousel` (Tag Name: `wx-category-carousel`)
  3. **Section 3: Lưới sản phẩm & Bộ lọc Drawer**
     - Custom Element: `#productListing` (Tag Name: `wx-product-listing`)

- **Mã Velo trang `Categories (List)`:**
```javascript
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async function () {
  try {
    // 1. Cài đặt Breadcrumb: TRANG CHỦ › SẢN PHẨM
    $w('#categoryBreadcrumb').setAttribute('items', JSON.stringify([
      { label: 'TRANG CHỦ', url: '/' },
      { label: 'SẢN PHẨM', url: '/products' }
    ]));

    // 2. Lấy đúng 5 danh mục sản phẩm cấp 0 (Dao Bếp, Nồi & Chảo, Dụng cụ bàn ăn...)
    let catRes = await wixData.query('Categories')
      .eq('taxonomy', 'product')
      .eq('depth', 0)
      .ascending('sortOrder')
      .find();

    if (catRes.items.length === 0) {
      catRes = await wixData.query('Categories')
        .eq('taxonomy', 'product')
        .find();
    }

    const catJson = JSON.stringify(catRes.items);
    $w('#categoryCarousel').setAttribute('items', catJson);
    $w('#categoryCarousel').setAttribute('categories', catJson);

    // 3. Lấy thương hiệu và toàn bộ sản phẩm cho lưới và bộ lọc drawer
    const [brandsRes, prodsRes] = await Promise.all([
      wixData.query('Brands').ascending('title').find(),
      wixData.query('Products').eq('status', 'active').limit(1000).find()
    ]);

    $w('#productListing').setAttribute('categories', catJson);
    $w('#productListing').setAttribute('brands', JSON.stringify(brandsRes.items));
    $w('#productListing').setAttribute('products', JSON.stringify(prodsRes.items));

    // 4. Sự kiện khi click vào danh mục -> chuyển sang trang động /products/{slug}
    $w('#categoryCarousel').on('category-select', (e) => {
      const slug = e.detail?.category?.slug || e.detail?.category?.ID;
      if (slug) {
        wixLocation.to(`/products/${slug}`);
      }
    });

    // 5. Sự kiện khi click vào sản phẩm -> chuyển sang trang chi tiết PDP (/product/{slug})
    $w('#productListing').on('product-select', (e) => {
      const slug = e.detail?.product?.slug || e.detail?.product?.ID;
      if (slug) {
        wixLocation.to(`/product/${slug}`);
      }
    });
  } catch (err) {
    console.error('Lỗi nạp dữ liệu trang Categories (List):', err);
  }
});
```

---

### 3.3. Trang `Categories (Item)` — URL: `/products/{slug}`
Trang động của từng danh mục (ví dụ: `/products/dao-bep`, `/products/dao-santoku`, `/products/noi-chao`...).

- **Cấu trúc phần tử trên trang:**
  1. **Section 1: Breadcrumb**
     - Custom Element: `#categoryBreadcrumb` (Tag Name: `wx-breadcrumb`)
  2. **Section 2: Tiêu đề & Giới thiệu danh mục**
     - Text element `#categoryTitle`: hiển thị tên danh mục
     - Text element `#categoryDesc`: hiển thị mô tả danh mục (tự động ẩn nếu rỗng)
  3. **Section 3: Hàng danh mục con (Subcategories)**
     - Custom Element: `#subCategoryCarousel` (Tag Name: `wx-category-carousel`)
     - *Quy tắc:* Nếu danh mục còn cấp con thì hiển thị; nếu là danh mục lá cuối cùng (không có cấp con) thì component này sẽ tự thu gọn (collapse).
  4. **Section 4: Lưới sản phẩm & Bộ lọc Drawer**
     - Custom Element: `#categoryProductListing` (Tag Name: `wx-product-listing`)

- **Mã Velo trang `Categories (Item)`:**
```javascript
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async function () {
  console.log('[Wix Velo] Đang khởi tạo trang Categories (Item)...');

  // Helper tìm phần tử theo danh sách ID dự phòng (tránh lỗi nếu đặt ID khác nhau)
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

  // Helper an toàn gán dữ liệu cho Custom Element
  function safeSet(el, attrName, val) {
    if (el && typeof el.setAttribute === 'function') {
      el.setAttribute(attrName, typeof val === 'string' ? val : JSON.stringify(val));
    }
  }

  // Helper an toàn lắng nghe sự kiện từ Custom Element
  function safeOn(el, eventName, handler) {
    if (el && typeof el.on === 'function') {
      el.on(eventName, handler);
    }
  }

  try {
    // 1. Xác định Danh mục hiện tại
    let currentCat = null;
    
    // Thử lấy từ Dynamic Dataset nếu có
    try {
      if ($w('#dynamicDataset')) {
        await $w('#dynamicDataset').onReadyAsync();
        currentCat = $w('#dynamicDataset').getCurrentItem();
      }
    } catch (e) {}

    // Fallback: nếu dataset chưa sẵn sàng, lấy slug trực tiếp từ URL (ví dụ: /products/dao-bep -> slug = dao-bep)
    if (!currentCat || !currentCat.slug) {
      const pathSegments = wixLocation.path || [];
      const slugFromUrl = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : '';
      if (slugFromUrl) {
        const catRes = await wixData.query('Categories').eq('slug', slugFromUrl).find();
        if (catRes.items.length > 0) {
          currentCat = catRes.items[0];
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

    // Tìm các Custom Elements và Section trên trang (hỗ trợ cả các ID phổ biến)
    const breadcrumbEl = findElement(['#categoryBreadcrumb', '#breadcrumb']);
    const subCatEl = findElement(['#subCategoryCarousel', '#categoryCarousel', '#subCategories']);
    const productListingEl = findElement(['#categoryProductListing', '#productListing', '#catalogElement', '#catalogView']);
    const subCatSection = findElement(['#subCategorySection', '#sectionSubCategories', '#subCatSection']);

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

    console.log(`[Wix Velo] Tìm thấy ${subCatRes.items.length} danh mục con.`);

    if (subCatRes.items.length > 0) {
      if (subCatSection) {
        try { subCatSection.expand(); } catch (e) {}
      }
      if (subCatEl) {
        try { subCatEl.expand(); } catch (e) {}
        safeSet(subCatEl, 'items', subCatRes.items);
        safeSet(subCatEl, 'categories', subCatRes.items);

        safeOn(subCatEl, 'category-select', (e) => {
          const slug = e.detail?.category?.slug || e.detail?.category?.ID;
          if (slug) {
            wixLocation.to(`/products/${slug}`);
          }
        });
      }
    } else {
      // Khi không còn danh mục con (danh mục lá như Dao Santoku):
      // 1. Gán danh sách rỗng để component tự ẩn (display: none, height: 0, min-height: 0)
      if (subCatEl) {
        safeSet(subCatEl, 'items', []);
        safeSet(subCatEl, 'categories', []);
        try { subCatEl.collapse(); } catch (e) {}
        try {
          if (subCatEl.parent && typeof subCatEl.parent.collapse === 'function') {
            subCatEl.parent.collapse();
          }
        } catch (e) {}
      }
      // 2. Thu gọn Section chứa nó để triệt tiêu hoàn toàn khoảng trắng
      if (subCatSection) {
        try { subCatSection.collapse(); } catch (e) {}
      }
    }

    // 5. Lấy danh sách sản phẩm:
    // Bao gồm sản phẩm của chính danh mục này VÀ của tất cả danh mục con trực thuộc
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

    console.log(`[Wix Velo] Tìm thấy ${prodRes.items.length} sản phẩm.`);

    // Nạp vào Lưới sản phẩm & Bộ lọc
    safeSet(productListingEl, 'brands', brandsRes.items);
    if (subCatRes.items.length > 0) {
      safeSet(productListingEl, 'categories', subCatRes.items);
    } else {
      safeSet(productListingEl, 'categories', [currentCat]);
    }
    safeSet(productListingEl, 'products', prodRes.items);

    // Bấm sản phẩm -> chuyển trang chi tiết PDP (/product/{slug})
    safeOn(productListingEl, 'product-select', (e) => {
      const slug = e.detail?.product?.slug || e.detail?.product?.ID;
      if (slug) {
        wixLocation.to(`/product/${slug}`);
      }
    });

  } catch (err) {
    console.error('[Wix Velo] Lỗi nạp dữ liệu trang Categories (Item):', err);
  }
});
```

---

### 3.4. Luồng Trang `Brands`

#### 3.4.1. Trang `Brands (List)` — URL: `/brands`
Trang danh sách tất cả các thương hiệu.
- **Các phần tử trên trang:**
  1. `#brandBreadcrumb` (Tag: `wx-breadcrumb`)
  2. `#brandCarousel` (Tag: `wx-category-carousel`): Hiển thị 3 thương hiệu `MIYABI`, `ZWILLING`, `STAUB`. Bấm chuyển sang `/brands/{slug}`.
  3. `#productListing` (Tag: `wx-product-listing`): Lưới toàn bộ sản phẩm của các thương hiệu.
- **Mã Velo trang `Brands (List)`:** *(File: [`wix-pages/brands-list.js`](wix-pages/brands-list.js))*
```javascript
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
    $w('#brandBreadcrumb').setAttribute('items', JSON.stringify([
      { label: 'TRANG CHỦ', url: '/' },
      { label: 'THƯƠNG HIỆU', url: '#' }
    ]));

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
```

---

#### 3.4.2. Trang `Brands (Item)` — URL Dynamic: `/brands/{slug}`
Trang động cho từng thương hiệu (ví dụ: `/brands/zwilling`, `/brands/miyabi`, `/brands/staub`).
- **Các phần tử trên trang:**
  1. `#brandBreadcrumb` (Tag: `wx-breadcrumb`): `TRANG CHỦ › THƯƠNG HIỆU › [TÊN THƯƠNG HIỆU]` (khi chọn series: `TRANG CHỦ › THƯƠNG HIỆU › [TÊN THƯƠNG HIỆU] › [TÊN SERIES]`)
  2. `#brandTitle` & `#brandDesc` (Text element: Tên & mô tả thương hiệu hoặc Series)
  3. Section `#seriesSection` chứa `#seriesCarousel` (Tag: `wx-category-carousel`):
     - Hiển thị danh sách các Series của Thương hiệu (ví dụ ZWILLING có 21 Series: PRO, TANREI, FOUR STAR...).
     - Khi bấm vào 1 Series: **TỰ ĐỘNG THU GỌN / ẨN CAROUSEL SERIES** (`#seriesSection.collapse()` về 0px, y hệt logic trang `products/dao-bep` -> `dao-santoku`)!
  4. `#productListing` (Tag: `wx-product-listing`): Lưới hiển thị các sản phẩm (khi chọn series: **CHỈ HIỂN THỊ CÁC SẢN PHẨM CỦA SERIES ĐÓ**).
- **Mã Velo trang `Brands (Item)`:** *(File: [`wix-pages/brands-item.js`](wix-pages/brands-item.js))*
```javascript
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async function () {
  console.log('[Wix Velo] Đang nạp trang thương hiệu Brands (Item)...');

  function findElement(ids) {
    for (const id of ids) {
      try {
        const el = $w(id);
        if (el && typeof el.setAttribute === 'function') return el;
      } catch (e) {}
    }
    return null;
  }

  function findSection(ids) {
    for (const id of ids) {
      try {
        const el = $w(id);
        if (el && typeof el.collapse === 'function') return el;
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
    const allBrandProducts = prodsRes.items;

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

    // 7. Sự kiện khi click vào sản phẩm -> chuyển sang chi tiết PDP (/product/{slug})
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
```

---

### 3.5. Trang `Product (Item)` — Chi tiết sản phẩm (PDP)
- **URL Dynamic Page:** `/product/{slug}` (ví dụ: `/product/miyabi-kaizen-ii-5000fcd-dao-bep-santoku-18cm`)
- **Các Custom Element trên trang:**
  - `#productBreadcrumb` (Tag Name: `wx-breadcrumb`)
  - `#productDetail` (Tag Name: `wx-product-detail`)
  - `#storySection` (Tag Name: `wx-feature-story`)
  - `#hotspotSection` (Tag Name: `wx-feature-highlights`)
  - `#relatedProducts` (Tag Name: `wx-related-products` hoặc `wx-related`): Hiển thị đúng 4 sản phẩm cùng danh mục
- **Velo Code:**
```javascript
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async function () {
  console.log('[Wix Velo] Đang nạp trang chi tiết sản phẩm (PDP)...');

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

  try {
    let currentProduct = null;

    // 1. Thử lấy từ Dynamic Dataset nếu có
    try {
      if ($w('#dynamicDataset')) {
        await $w('#dynamicDataset').onReadyAsync();
        currentProduct = $w('#dynamicDataset').getCurrentItem();
      }
    } catch (e) {}

    // 2. Dự phòng: đọc slug trực tiếp từ URL (ví dụ: /product/abc-xyz -> slug: abc-xyz)
    if (!currentProduct || !currentProduct.slug) {
      const pathSegments = wixLocation.path || [];
      const slugFromUrl = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : '';
      if (slugFromUrl) {
        const pRes = await wixData.query('Products').eq('slug', slugFromUrl).find();
        if (pRes.items.length > 0) currentProduct = pRes.items[0];
      }
    }

    if (!currentProduct) {
      console.warn('[Wix Velo] Không tìm thấy thông tin sản phẩm hiện tại.');
      return;
    }

    console.log('[Wix Velo] Đang hiển thị sản phẩm:', currentProduct.title, '(_id:', currentProduct._id, ')');

    const breadcrumbEl = findElement(['#productBreadcrumb', '#categoryBreadcrumb', '#breadcrumb']);
    const detailEl = findElement(['#productDetail', '#compProductDetail', '#productDetailComp']);

    // 3. Xây dựng Breadcrumb đa cấp động:
    // TRANG CHỦ › SẢN PHẨM › [DANH MỤC CHA] › [DANH MỤC CON] › [TÊN SẢN PHẨM]
    const breadcrumbItems = [
      { label: 'TRANG CHỦ', url: '/' },
      { label: 'SẢN PHẨM', url: '/products' }
    ];

    const catId = currentProduct.category;
    if (catId) {
      try {
        const catRes = await wixData.query('Categories')
          .hasSome('_id', [catId])
          .or(wixData.query('Categories').hasSome('ID', [catId]))
          .find();

        if (catRes.items.length > 0) {
          const currentCat = catRes.items[0];

          // Nếu danh mục con có danh mục cha (ví dụ: Dao Bếp -> Dao Santoku)
          if (currentCat.parent) {
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
          }

          // Thêm danh mục hiện tại vào breadcrumb
          breadcrumbItems.push({
            label: currentCat.title.toUpperCase(),
            url: `/products/${currentCat.slug}`
          });
        }
      } catch (e) {
        console.error('[Wix Velo] Lỗi nạp Breadcrumb danh mục:', e);
      }
    }

    // Thêm chính tên sản phẩm vào cuối breadcrumb
    breadcrumbItems.push({
      label: (currentProduct.title || '').toUpperCase(),
      url: '#'
    });
    safeSet(breadcrumbEl, 'items', breadcrumbItems);

    // 4. Truy vấn biến thể (ProductVariants) để lấy thông số kỹ thuật (specs), mô tả chi tiết, ảnh gallery
    let variant = null;
    try {
      const variantRes = await wixData.query('ProductVariants')
        .hasSome('product', [currentProduct._id, currentProduct.ID].filter(Boolean))
        .find();
      if (variantRes.items.length > 0) {
        variant = variantRes.items[0];
      }
    } catch (err) {
      console.warn('[Wix Velo] Không thể truy vấn ProductVariants:', err);
    }

    // 5. Gộp dữ liệu đầy đủ từ Products và ProductVariants
    const fullProduct = {
      ...currentProduct,
      ...(variant || {}),
      title: currentProduct.title || (variant && variant.title),
      brand: currentProduct.brand,
      series: currentProduct.series,
      minPrice: currentProduct.minPrice || (variant && variant.price),
      maxPrice: currentProduct.maxPrice,
      compareAtPrice: currentProduct.compareAtPrice || (variant && variant.compareAtPrice),
      labels: currentProduct.labels,
      specs: (variant && variant.specs) ? variant.specs : currentProduct.specs,
      description: (variant && variant.description) ? variant.description : currentProduct.description,
      shortDescription: (variant && variant.shortDescription) ? variant.shortDescription : currentProduct.shortDescription,
      mainImage: (variant && variant.mainImage) ? variant.mainImage : currentProduct.mainImage,
      gallery: (variant && variant.gallery) ? variant.gallery : currentProduct.gallery,
      shopeeUrl: (variant && variant.shopeeUrl) ? variant.shopeeUrl : currentProduct.shopeeUrl,
      tiktokUrl: (variant && variant.tiktokUrl) ? variant.tiktokUrl : currentProduct.tiktokUrl
    };

    // Gán dữ liệu vào Custom Element <wx-product-detail>
    safeSet(detailEl, 'product', fullProduct);

  } catch (err) {
    console.error('[Wix Velo] Lỗi nạp dữ liệu trang Product (Item):', err);
  }
});
```

---

## 7. CẤU HÌNH TRANG TĨNH: BEST SELLER (`/bestseller` hoặc `/best-sellers`)

Trang tĩnh hiển thị toàn bộ sản phẩm bán chạy kèm thanh Filter Toolbar (Lọc danh mục, Thương hiệu, Khoảng giá, Sắp xếp).

### 7.1. Tạo trang trên Wix Studio
1. Vào **Pages** trong Wix Studio -> Chọn **Add Page** -> **Blank Page**.
2. Đặt tên trang: `Best Seller` (hoặc `Sản phẩm bán chạy`).
3. Vào **Page Settings** -> **SEO Basics**:
   - URL slug: `bestseller` (hoặc `best-sellers`).
   - Tiêu đề: `Sản Phẩm Bán Chạy | ZWILLING & STAUB`.

### 7.2. Thêm Custom Element vào trang
1. Chọn **Add Elements (+) -> Embed & Social -> Custom Element**.
2. Thiết lập thuộc tính phần tử:
   - **Tag Name**: `wx-product-listing`
   - **Source**: Velo file hoặc URL bundle `my-wix-ui-lib.bundle.js`
   - **Element ID**: `#bestsellerProductListing` (hoặc `#productListing`)
   - **Width**: `100%` (hoặc Max-width 1240px căn giữa).
3. *(Tùy chọn)* Thêm tiêu đề trang (Text Element) với ID `#bestsellerTitle` và Breadcrumb Custom Element (Tag Name `wx-breadcrumb`, ID `#bestsellerBreadcrumb`).

### 7.3. Dán mã Velo cho trang Best Seller
Mở bảng code của trang và dán toàn bộ nội dung từ file [`wix-pages/bestseller.js`](file:///Users/nguyenvantuan/Documents/Free/WixftZW/wix-pages/bestseller.js).

---

## 8. CẤU HÌNH TRANG TĨNH: GIỚI THIỆU / ABOUT (`/about` hoặc `/gioi-thieu`)

Trang tĩnh hiển thị thông tin thương hiệu kèm thanh Breadcrumb `TRANG CHỦ › GIỚI THIỆU`.

### 8.1. Thêm Custom Element Breadcrumb vào trang About
1. Mở trang **About** (hoặc **Giới thiệu**) trên Wix Studio.
2. Chọn **Add Elements (+) -> Embed & Social -> Custom Element**.
3. Thiết lập thuộc tính:
   - **Tag Name**: `wx-breadcrumb`
   - **Source**: Velo file hoặc URL bundle `my-wix-ui-lib.bundle.js`
   - **Element ID**: `#aboutBreadcrumb` (hoặc `#breadcrumb`)
   - **Width**: `100%` (hoặc Max-width 1240px).

### 8.2. Dán mã Velo cho trang About
Mở bảng code của trang và dán toàn bộ nội dung từ file [`wix-pages/about.js`](file:///Users/nguyenvantuan/Documents/Free/WixftZW/wix-pages/about.js).

