# ZWILLING UI Library (Lit 3 Web Components) & Wix CMS Integration

Bộ 5 Web Components (Custom Elements) độc lập, tái sử dụng được xây dựng bằng **Lit 3** và đóng gói bằng **Vite 5** thành file standalone **`dist/my-wix-ui-lib.bundle.js`** phục vụ nhúng trực tiếp vào **Wix Studio**, **Wix Editor** và kết nối qua **Wix Velo**.

> 📖 **Xem tài liệu chi tiết đầy đủ tại:** [`PROJECT-SUMMARY.md`](./PROJECT-SUMMARY.md) và [`wix-velo-setup.md`](./wix-velo-setup.md).

---

## 1. Danh Sách 5 Components

| # | Tag Name | Class | Mô tả & Tính Năng Nổi Bật |
| :--- | :--- | :--- | :--- |
| **1** | `<wx-breadcrumb>` | `WxBreadcrumb` | Thanh điều hướng breadcrumb đa cấp động (`HOME › PRODUCTS › DAO BẾP › DAO SANTOKU`). |
| **2** | `<wx-category-carousel>` | `WxCategoryCarousel` | Carousel danh mục sản phẩm trượt ngang kèm thanh tiến trình và 2 nút mũi tên tròn. Tự động chuyển dạng grid khi < 6 mục. **Tự động ẩn hoàn toàn (0px) khi danh mục rỗng**. |
| **3** | `<wx-product-carousel>` | `WxProductCarousel` | Carousel danh sách card sản phẩm nổi bật (tính % giảm giá, wishlist heart, rating CMS, giá VND). |
| **4** | `<wx-product-listing>` | `WxProductListing` | Danh sách sản phẩm dạng lưới 4 cột kèm Toolbar bộ lọc drawer (Category, Brand, Price) và sắp xếp. **Phân trang 32 sản phẩm: thanh tiến trình đỏ `#d40026` + nút `LOAD MORE`**. |
| **5** | `<wx-product-detail>` | `WxProductDetail` | Trang chi tiết sản phẩm (PDP): Gallery ảnh kèm thumbnails, giá, % giảm giá, đặc điểm nổi bật, nút Shopee/TikTok Shop, và Accordions thông số kỹ thuật. |

---

## 2. Các Luồng Trang Trên Wix Studio

- **Trang Home (`/`):** `#homeCategoryCarousel` + `#homeProductCarousel`. Click danh mục chuyển đến `/products/{slug}`.
- **Trang Categories List (`/products`):** `#categoryBreadcrumb` + `#categoryCarousel` + `#productListing`.
- **Trang Categories Item (`/products/{slug}`):** `#categoryBreadcrumb` + `#subCategorySection` (`#subCategoryCarousel`) + `#categoryProductListing`. Tự động thu gọn Section khi vào danh mục lá.
- **Trang Product Detail (`/products-item/{slug}`):** `#productBreadcrumb` + `#productDetail`.

---

## 3. Lệnh Phát Triển & Đóng Gói

```bash
# Cài đặt thư viện
npm install

# Khởi chạy server kiểm thử trực quan tại local
npm run dev

# Đóng gói bundle standalone cho Wix Studio (tự chèn header Wix ESLint)
npm run build
```
File bundle hoàn thiện được lưu tại: `dist/my-wix-ui-lib.bundle.js` (~74 KB).

---

## 4. Tài Liệu & File Mã Nguồn Velo Trong Dự Án
- 📂 **[`wix-pages/`](./wix-pages/)**: Thư mục chứa toàn bộ file mã nguồn Velo riêng biệt của từng trang:
  - [`wix-pages/home.js`](./wix-pages/home.js): Mã trang Home (`/`).
  - [`wix-pages/categories-list.js`](./wix-pages/categories-list.js): Mã trang tổng quan sản phẩm (`/products`).
  - [`wix-pages/categories-item.js`](./wix-pages/categories-item.js): Mã trang danh mục động (`/products/{slug}`).
  - [`wix-pages/products-item.js`](./wix-pages/products-item.js): Mã trang chi tiết sản phẩm PDP (`/products-item/{slug}`).
  - [`wix-pages/brands-item.js`](./wix-pages/brands-item.js): Mã trang thương hiệu (`/brands/{slug}`).
- [`PROJECT-SUMMARY.md`](./PROJECT-SUMMARY.md): Báo cáo tổng kết toàn bộ kiến trúc, các lỗi kỹ thuật đã giải quyết và hướng dẫn vận hành.
- [`wix-velo-setup.md`](./wix-velo-setup.md): Hướng dẫn thiết lập Wix Studio tổng thể.
- [`website-flows.md`](./website-flows.md): Đặc tả luồng điều hướng website theo ngôn ngữ Việt - Anh.
- [`wix-csv/HUONG-DAN-IMPORT.md`](./wix-csv/HUONG-DAN-IMPORT.md): Hướng dẫn import CMS Collections vào Wix.

