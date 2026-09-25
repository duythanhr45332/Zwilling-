# TỔNG KẾT DỰ ÁN: ZWILLING WIX STUDIO UI LIBRARY & VELO CMS INTEGRATION

Tài liệu này lưu trữ toàn bộ kiến trúc, các component đã xây dựng, cấu trúc luồng trang trên Wix Studio, code Velo từng trang và các giải pháp kỹ thuật đã xử lý để dễ dàng tra cứu và tiếp tục phát triển.

---

## 1. Triết Lý & Nguyên Tắc Cốt Lõi
* **Component là khung giao diện thuần túy (Pure UI Frames):** Hoàn toàn KHÔNG chứa dữ liệu mẫu cứng (zero mock data), KHÔNG chứa ảnh demo giả lập (Unsplash/Lorem Picsum), KHÔNG chứa rating giả.
* **Dữ liệu 100% từ Wix CMS:** Toàn bộ thông tin hiển thị (tên, giá, nhãn, ảnh, danh mục, thông số kỹ thuật) được truyền động từ các collection trên Wix CMS (`Categories`, `Products`, `ProductVariants`, `Brands`, `Series`) qua thuộc tính của Custom Element.
* **Placeholder tiêu chuẩn:** Nếu dữ liệu trong CMS chưa có ảnh, component hiển thị SVG placeholder xám tối giản ("Chưa có ảnh"), tuyệt đối không lấy ảnh ngẫu nhiên từ internet.

---

## 2. Chi Tiết 5 Web Components (Lit 3)

| Tên Tag | Class | File Nguồn | Chức Năng & Đặc Điểm Kỹ Thuật |
| :--- | :--- | :--- | :--- |
| `<wx-breadcrumb>` | `WxBreadcrumb` | `src/components/breadcrumb/wx-breadcrumb.js` | Điều hướng phân cấp động theo mảng `items`: `[{ label, url }]`. Tự động in hoa nhãn, mục cuối cùng hiển thị dạng text không click. |
| `<wx-category-carousel>` | `WxCategoryCarousel` | `src/components/category-carousel/wx-category-carousel.js` | Hàng danh mục ngang. Tự động hiển thị dạng Carousel (có mũi tên tròn `<` `>` + thanh tiến trình) khi $\ge 6$ mục, hoặc dạng Grid căn giữa khi $< 6$ mục. **Khi không có dữ liệu (danh mục lá), tự động ẩn hoàn toàn với `display: none; height: 0; min-height: 0; margin: 0; padding: 0`**. |
| `<wx-product-carousel>` | `WxProductCarousel` | `src/components/product-carousel/wx-product-carousel.js` | Carousel sản phẩm nổi bật (trang Home). Tính % giảm giá từ `compareAtPrice`, hiển thị badge, nút yêu thích tim, rating thật từ CMS. |
| `<wx-product-listing>` | `WxProductListing` | `src/components/product-listing/wx-product-listing.js` | Lưới 4 cột (responsive 3/2/1 cột). Có Toolbar kết quả, sắp xếp, mở Drawer lọc bên phải (Danh mục, Thương hiệu, Khoảng giá). **Phân trang 32 sản phẩm: thanh tiến trình màu đỏ (`#d40026`) + nút `LOAD MORE` màu đen**. Tự động reset về 32 mục khi đổi bộ lọc. |
| `<wx-product-card>` | `WxProductCard` | `src/components/product-listing/wx-product-card.js` | Card sản phẩm tái sử dụng trong Listing và Carousel. Tự động chuyển đổi ảnh đại diện (hover sang ảnh thứ 2 trong `gallery` nếu có). |
| `<wx-product-detail>` | `WxProductDetail` | `src/components/product-detail/wx-product-detail.js` | Trang chi tiết sản phẩm (PDP): Gallery ảnh đồng bộ thumbnail, nút mua qua Shopee/TikTok Shop, bảng Accordion thông số kỹ thuật parse từ JSON. |

---

## 3. Cấu Trúc Luồng & URL Trên Wix Studio

| Tên Trang | URL / Slug | Element Cần Có & ID | File Velo Tương Ứng | Nhiệm Vụ |
| :--- | :--- | :--- | :--- | :--- |
| **Home** | `/` | `#homeCategoryCarousel`<br>`#homeProductCarousel` | [`wix-pages/home.js`](wix-pages/home.js) | Hiển thị 5 danh mục chính cấp 0 và 10 sản phẩm nổi bật. Click danh mục chuyển đến `/products/{slug}`. |
| **Categories (List)** | `/products` | `#categoryBreadcrumb`<br>`#categoryCarousel`<br>`#productListing` | [`wix-pages/categories-list.js`](wix-pages/categories-list.js) | Trang tổng quan tất cả sản phẩm. Carousel hiển thị 5 danh mục chính. Lưới hiển thị toàn bộ sản phẩm và bộ lọc. |
| **Categories (Item)** | `/products/{slug}` | `#categoryBreadcrumb`<br>`#subCategorySection` chứa `#subCategoryCarousel`<br>`#categoryProductListing` | [`wix-pages/categories-item.js`](wix-pages/categories-item.js) | Trang động theo danh mục (vd: `/products/dao-bep`, `/products/dao-santoku`). Tự động hiển thị danh mục con nếu có, tự động thu gọn Section nếu là danh mục cuối. |
| **Product (Item)** | `/product/{slug}` | `#productBreadcrumb`<br>`#productDetail` | [`wix-pages/products-item.js`](wix-pages/products-item.js) | Trang chi tiết sản phẩm (PDP). Hiển thị đầy đủ thông số kỹ thuật, ảnh gallery và link gian hàng. |
| **Brands (List)** | `/brands` | `#brandBreadcrumb`<br>`#brandCarousel`<br>`#productListing` | [`wix-pages/brands-list.js`](wix-pages/brands-list.js) | Trang danh sách 3 thương hiệu (ZWILLING, MIYABI, STAUB) và toàn bộ sản phẩm. |
| **Brands (Item)** | `/brands/{slug}` | `#brandBreadcrumb`<br>`#seriesSection` chứa `#seriesCarousel`<br>`#productListing` | [`wix-pages/brands-item.js`](wix-pages/brands-item.js) | Trang thương hiệu động (ví dụ `/brands/zwilling`). Bấm vào Series (như ZWILLING PRO) sẽ chuyển hướng sang trang riêng của Series đó. |
| **Series (Item)** | `/brands/{brand}/{slug}` | `#seriesBreadcrumb`<br>`#productListing` | [`wix-pages/series-item.js`](wix-pages/series-item.js) | Trang dòng sản phẩm Series (ví dụ `/brands/zwilling/zwilling-pro`). Chỉ hiển thị danh sách sản phẩm của Series đó, không hiển thị carousel Series. |

---

## 4. Các Giải Pháp Kỹ Thuật Đã Xử Lý (Gotchas & Fixes)

### 4.1. Lỗi `TypeError: ...on is not a function`
* **Nguyên nhân:** Khi gọi `$w('#id').on(...)` trên phần tử chưa tồn tại trên trang hoặc phần tử không phải Custom Element, Velo ném lỗi làm dừng toàn bộ script.
* **Giải pháp:** Sử dụng các hàm helper phòng thủ `safeSet(el, attr, val)` và `safeOn(el, event, handler)` cùng hàm `findElement([id1, id2...])`. Không bao giờ crash kể cả khi sai tên ID.

### 4.2. Danh Mục Cha Không Có Sản Phẩm Trực Tiếp (Ví dụ `Dao Bếp`)
* **Nguyên nhân:** Trong CMS, 35 sản phẩm dao được gán trực tiếp vào các danh mục con (`Dao Santoku`, `Dao Đầu Bếp`, `Dao Gọt`...). Danh mục cha `Dao Bếp` không có sản phẩm nào mang `category: 'cat-p-dao-bep'`.
* **Giải pháp:** Trong query Velo của trang `Categories (Item)`, gom tất cả `_id` và `ID` của danh mục con thành mảng `allCatIds` và query bằng `hasSome('category', allCatIds)`. Kết hợp với `.or(contains('categoryPath', slug))` để luôn lấy đủ 100% sản phẩm.

### 4.3. Thu Gọn Section Trắng Khi Đến Danh Mục Lá (Ví dụ `Dao Santoku`)
* **Nguyên nhân:** Khi đến danh mục lá, không còn danh mục con nên carousel rỗng. Nhưng Section trong Wix Studio vẫn giữ chiều cao mặc định gây khoảng trắng lớn.
* **Giải pháp:**
  1. Trong component: đặt `display: none !important; height: 0 !important; min-height: 0 !important; margin: 0; padding: 0;`.
  2. Trong Wix Studio: đặt ID của Section là `subCategorySection`.
  3. Trong Velo: gọi `$w('#subCategorySection').collapse()`. Khi đó Section thu gọn hoàn toàn về 0px, kéo lưới sản phẩm lên sát Breadcrumb.

### 4.4. Phân Trang 32 Sản Phẩm & Load More
* **Cơ chế:**
  - Hiển thị 32 sản phẩm đầu tiên (`pageSize = 32`, `visibleCount = 32`).
  - Nếu tổng số sản phẩm $> 32$, hiển thị thanh `Đang hiển thị X trên tổng số Y sản phẩm`, thanh tiến trình đỏ `#d40026`, và nút `XEM THÊM SẢN PHẨM` màu đen.
  - Bấm `XEM THÊM SẢN PHẨM` nạp thêm 32 sản phẩm tiếp theo.
  - Khi đổi bộ lọc danh mục/thương hiệu/khoảng giá hoặc sắp xếp, tự động reset `visibleCount = 32`.

### 4.5. Kiến Trúc Song Ngữ (i18n) — Mặc Định 100% Tiếng Việt
* **Nguyên tắc:** Hiện tại website triển khai bản Tiếng Việt trước, sau đó mở rộng song ngữ Tiếng Anh. Tuyệt đối không để lẫn lộn hai thứ tiếng trong cùng một nhãn.
* **Cơ chế triển khai:**
  - File tập trung `src/utils/i18n.js` cung cấp từ điển hoàn chỉnh cho `vi` và `en`.
  - Mọi component (`wx-product-listing`, `wx-product-detail`, `wx-product-card`, `wx-breadcrumb`, `wx-filter-toolbar`, `wx-category-carousel`, `wx-brand-carousel`, `wx-product-carousel`, `wx-specs-table`) đều sở hữu thuộc tính `lang` với giá trị mặc định là `'vi'`.
  - Nếu thuộc tính `lang` không truyền, component tự động nhận diện từ `document.documentElement.lang` hoặc fallback về `'vi'`.
  - Accordion chi tiết sản phẩm:
    - Tiếng Việt: `MÔ TẢ SẢN PHẨM`, `THÔNG SỐ KỸ THUẬT`, `HƯỚNG DẪN SỬ DỤNG & BẢO QUẢN`.
    - Tiếng Anh: `PRODUCT DESCRIPTION`, `SPECIFICATIONS`, `INSTRUCTIONS & CARE`.
  - Breadcrumbs: `TRANG CHỦ`, `SẢN PHẨM`, `THƯƠNG HIỆU` (tự động nhận diện và chuyển đổi khi chuyển ngôn ngữ).

---

## 5. Quy Trình Build & Cập Nhật Lên Wix

1. **Chỉnh sửa code tại local:** thư mục `src/`.
2. **Build bundle production:**
   ```bash
   npm run build
   ```
   *Script tự động chèn header kiểm duyệt Wix ESLint và xuất ra file:*  
   👉 `dist/my-wix-ui-lib.bundle.js`
3. **Cập nhật lên Wix Studio:** Copy nội dung file `dist/my-wix-ui-lib.bundle.js` hoặc upload file lên hosting tĩnh (Vercel, Netlify, GitHub Pages) để dán link vào Custom Element Settings trên Wix.

---

## 6. Danh Sách File Tài Liệu Tham Khảo Trong Thư Mục
* [`wix-velo-setup.md`](file:///Users/nguyenvantuan/Documents/Free/WixftZW/wix-velo-setup.md): Hướng dẫn chi tiết mã Velo cho tất cả các trang.
* [`website-flows.md`](file:///Users/nguyenvantuan/Documents/Free/WixftZW/website-flows.md): Đặc tả luồng người dùng và hành trình điều hướng.
* [`wix-csv/HUONG-DAN-IMPORT.md`](file:///Users/nguyenvantuan/Documents/Free/WixftZW/wix-csv/HUONG-DAN-IMPORT.md): Quy chuẩn cấu trúc và thứ tự import dữ liệu CMS vào Wix.
