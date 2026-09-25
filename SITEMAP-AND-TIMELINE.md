# BÁO CÁO TIẾN ĐỘ & SƠ ĐỒ CẤU TRÚC WEBSITE (SITEMAP & TIMELINE)
### Dự án: Xây dựng Website Trưng bày Sản phẩm ZWILLING (ZWILLING - MIYABI - STAUB)

---

## TỔNG QUAN PHƯƠNG THỨC XÂY DỰNG WEBSITE

* **Nguyên tắc thiết kế & dựng trang**:
  * **Toàn bộ 100% các trang** đều được xây dựng trên nền tảng **kéo thả trực quan (Wix Studio)** giúp dễ dàng tùy biến bố cục, banner và nội dung giới thiệu.
  * **Các trang danh mục & bán hàng đặc thù** (Trang Chủ, Sản Phẩm, Chi Tiết Sản Phẩm, Thương Hiệu, Thương Hiệu Detail, Bestseller, Sale) sẽ có **các Section Custom Element đi kèm** để xử lý dữ liệu động (bộ lọc giá, thanh trượt danh mục, lưới sản phẩm tải thêm, bảng thông số kỹ thuật và liên kết mua sắm Shopee/TikTok Shop).
  * **Các trang nội dung & thông tin** (Về chúng tôi, Về chúng tôi chi tiết, Liên lạc) được **dựng kéo thả hoàn toàn (100% Native Drag & Drop)**, tối ưu việc kể câu chuyện thương hiệu và tương tác liên hệ của khách hàng.

---

# PHẦN 1: SƠ ĐỒ CẤU TRÚC WEBSITE (SITEMAP)

## 1. Sơ Đồ Phân Cấp Các Trang (Visual Sitemap)

```text
WEBSITE ZWILLING VIỆT NAM
│
├── 0. Khung Giao Diện Dùng Chung (Global Header & Footer - Kéo thả)
│   ├── Thanh điều hướng Menu chính, ô tìm kiếm nhanh, chuyển đổi ngôn ngữ (VI | EN)
│   └── Chân trang: Thông tin công ty, liên kết gian hàng Shopee/TikTok Shop, chính sách
│
├── 1. TRANG CHỦ (Home) ── [/]
│   ├── [Kéo thả]: Banner sự kiện chuyển động, khối giới thiệu di sản, banner khuyến mãi
│   └── [Section Custom Element]: Dải 5 danh mục nổi bật, dải sản phẩm bán chạy nhất
│
├── 2. TRANG SẢN PHẨM (Products) ── [/products] hoặc [/products/{danh-mục}]
│   ├── [Kéo thả]: Banner giới thiệu ngành hàng (Dao bếp, Nồi chảo, Bàn ăn...), mô tả
│   └── [Section Custom Element]: Dải danh mục con tự động co giãn, Lưới sản phẩm & Bộ lọc thông minh (giá/hãng), nút xem thêm 32 sản phẩm
│
├── 3. TRANG CHI TIẾT SẢN PHẨM (Product Detail - PDP) ── [/product/{tên-sản-phẩm}]
│   ├── [Kéo thả]: Khối gợi ý bộ sưu tập đi kèm, bài viết hướng dẫn nấu ăn/chăm sóc dao
│   └── [Section Custom Element]: Bộ sưu tập ảnh sắc nét (zoom đa góc), bảng thông số kỹ thuật (xuất xứ, chất liệu), nút chuyển tiếp mua hàng Shopee/TikTok Shop chính hãng
│
├── 4. TRANG SALE / KHUYẾN MÃI (Sale) ── [/sale]
│   ├── [Kéo thả]: Banner chương trình ưu đãi mùa lễ hội, đếm ngược thời gian (nếu có)
│   └── [Section Custom Element]: Lưới sản phẩm đang có giá ưu đãi (% giảm giá nổi bật, nhãn Sale) + Bộ lọc theo mức giá & thương hiệu
│
├── 5. TRANG THƯƠNG HIỆU (Brands) ── [/brands]
│   ├── [Kéo thả]: Banner tổng quan 3 thương hiệu di sản Đức - Nhật - Pháp
│   └── [Section Custom Element]: Dải danh thiếp 3 thương hiệu (ZWILLING, MIYABI, STAUB) và lưới sản phẩm đại diện
│
├── 6. TRANG THƯƠNG HIỆU CHI TIẾT (Brand Detail) ── [/brands/{tên-thương-hiệu}]
│   ├── [Kéo thả]: Câu chuyện lịch sử riêng của từng hãng, hình ảnh nghệ nhân & công nghệ độc quyền
│   └── [Section Custom Element]: Dải các dòng sản phẩm (Series) đặc trưng và lưới sản phẩm riêng biệt của thương hiệu đó
│
├── 7. TRANG SẢN PHẨM BÁN CHẠY (Bestseller) ── [/bestseller]
│   ├── [Kéo thả]: Banner Top sản phẩm được người tiêu dùng Việt Nam yêu thích nhất
│   └── [Section Custom Element]: Lưới sản phẩm có huy hiệu "Bán chạy" + Bộ lọc nhanh theo ngành hàng
│
├── 8. TRANG VỀ CHÚNG TÔI (About Us) ── [/about]
│   └── [100% Kéo thả thuần túy]: Lịch sử hơn 290 năm thành lập (từ năm 1731), tầm nhìn, sứ mệnh, cam kết chất lượng toàn cầu
│
├── 9. TRANG VỀ CHÚNG TÔI CHI TIẾT (About Us Detail) ── [/about/{chủ-đề}]
│   └── [100% Kéo thả thuần túy]: Các bài viết chuyên sâu về công nghệ luyện thép trui lạnh FRIODUR (Đức), nghệ thuật rèn dao thủ công Seki (Nhật Bản), quy trình tráng men gang thủ công STAUB (Pháp)
│
└── 10. TRANG LIÊN LẠC (Contact Us) ── [/contact]
    └── [100% Kéo thả thuần túy]: Form gửi thư yêu cầu tư vấn, bản đồ vị trí văn phòng/showroom, thông tin Hotline, Email và danh sách đối tác phân phối chính hãng
```

---

## 2. Bảng Phân Định Phương Thức Xây Dựng 10 Trang Website

| STT | Tên Trang | Địa Chỉ (URL) | Phương Thức Xây Dựng | Các Khối & Tính Năng Nổi Bật |
| :---: | :--- | :--- | :---: | :--- |
| **01** | **Trang Chủ** | `/` | **Kéo thả + Section Custom Element** | Banner thương hiệu kéo thả; Section dải danh mục chuyển động và dải sản phẩm bán chạy nhất tự động cập nhật. |
| **02** | **Trang Sản Phẩm** | `/products`<br>`/products/{slug}` | **Kéo thả + Section Custom Element** | Banner và mô tả danh mục kéo thả; Section thanh trượt danh mục con, bộ lọc đa năng (giá, hãng) và lưới phân trang 32 sản phẩm. |
| **03** | **Trang Chi Tiết Sản Phẩm** | `/product/{slug}` | **Kéo thả + Section Custom Element** | Khối thông tin liên quan kéo thả; Section gallery ảnh phóng to, thông số kỹ thuật (specs), nút dẫn link mua Shopee/TikTok Shop. |
| **04** | **Trang Sale (Khuyến Mãi)** | `/sale` | **Kéo thả + Section Custom Element** | Banner chương trình kéo thả; Section lưới sản phẩm giảm giá có hiển thị giá gốc, giá khuyến mãi và nhãn Sale đỏ nổi bật. |
| **05** | **Trang Thương Hiệu** | `/brands` | **Kéo thả + Section Custom Element** | Bố cục giới thiệu 3 thương hiệu kéo thả; Section dải thương hiệu và toàn bộ sản phẩm tổng hợp. |
| **06** | **Trang Thương Hiệu Detail** | `/brands/{slug}` | **Kéo thả + Section Custom Element** | Không gian câu chuyện di sản riêng kéo thả; Section dải các dòng sản phẩm (Series: Pro, Four Star, Cocotte...) và danh sách sản phẩm theo hãng. |
| **07** | **Trang Bestseller** | `/bestseller` | **Kéo thả + Section Custom Element** | Tiêu đề và thông điệp trang kéo thả; Section lưới sản phẩm bán chạy nhất kèm bộ lọc linh hoạt. |
| **08** | **Trang Về Chúng Tôi** | `/about` | **100% Kéo thả thuần túy** | Thiết kế bố cục dòng thời gian (Timeline 1731 - nay), hình ảnh di sản, khối triết lý chất lượng chuẩn Đức. |
| **09** | **Trang Về Chúng Tôi Chi Tiết** | `/about/{slug}` | **100% Kéo thả thuần túy** | Bài viết đồ họa chuyên sâu về công nghệ chế tác độc quyền (Thép trui lạnh FRIODUR, Đúc gang Pháp, Luyện kiếm Nhật). |
| **10** | **Trang Liên Lạc** | `/contact` | **100% Kéo thả thuần túy** | Form liên hệ tiếp nhận thông tin, Google Maps chỉ đường showroom, số điện thoại chăm sóc khách hàng và mạng lưới phân phối. |

---

# PHẦN 2: BẢNG KẾ HOẠCH & TIẾN ĐỘ THỰC HIỆN THEO SITEMAP (PROJECT TASKS BY SITEMAP)

Toàn bộ các đầu việc được cấu trúc trực tiếp **THEO TỪNG TRANG TRONG SITEMAP**, giúp Khách hàng và Lead đối soát tiến độ trang một cách trực quan, minh bạch.

* **Cấu trúc 9 cột chuẩn quản lý**: **Task | Priority | Owner | Status | Start date | End date | Milestone | Deliverable | Notes**.
* **Quy ước mức độ ưu tiên (Priority)**:
  * `P0`: Tối quan trọng, quyết định tiến độ toàn dự án.
  * `P1`: Quan trọng, cần hoàn thành đúng cam kết tiến độ.
  * `P2`: Tính năng bổ trợ, nâng cao trải nghiệm.
* **Trạng thái (Status)**: `Completed` (Đã xong) | `In progress` (Đang làm) | `Not started` (Chưa bắt đầu) | `Blocked` (Đang nghẽn/Chờ duyệt)

---

### BẢNG THEO DÕI TIẾN ĐỘ THEO SITEMAP (TASK TRACKING TABLE)

| Task | Priority | Owner | Status | Start date | End date | Milestone | Deliverable | Notes |
| :--- | :---: | :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| **[CMS] Chuẩn hóa danh mục 3 cấp, mức giá, nhãn Sale và Bestseller** | `P0` | Content / CMS | `Completed` | 23/09/2026 | 24/09/2026 | CMS & Dữ liệu | File dữ liệu 100+ sản phẩm chuẩn hóa | Phân loại sẵn toàn bộ nhãn Sale và Bestseller |
| **[CMS] Nhập dữ liệu danh mục, thương hiệu, sản phẩm lên hệ thống website** | `P0` | Wix Dev / CMS | `Completed` | 24/09/2026 | 25/09/2026 | CMS & Dữ liệu | Dữ liệu hiển thị trực tiếp trên CMS | Sẵn sàng liên kết vào các trang động |
| **[CMS] Xử lý và tải lên bộ thư viện ảnh sản phẩm sắc nét (ảnh chính, ảnh các góc)** | `P1` | Content / Design | `In progress` | 25/09/2026 | 27/09/2026 | CMS & Dữ liệu | Thư viện hình ảnh sắc nét, tối ưu dung lượng | Đảm bảo tốc độ tải trang nhanh mượt |
| **[Header & Footer] Dựng thanh Menu chính kéo thả, ô tìm kiếm nhanh và Chân trang** | `P1` | Wix Dev | `In progress` | 26/09/2026 | 27/09/2026 | 0. Khung dùng chung | Khung Header & Footer dùng chung toàn site | [Kéo thả] Tích hợp mạng xã hội & gian hàng chính hãng |
| **[Trang Chủ] Dựng khối Banner sự kiện & 2 Section Carousel danh mục/bestseller** | `P0` | Wix Dev / UI | `In progress` | 27/09/2026 | 29/09/2026 | 1. Trang Chủ | Giao diện Trang Chủ hoàn chỉnh | [Kéo thả + Section Custom Element] Nổi bật 3 thương hiệu |
| **[Trang Sản Phẩm] Dựng Banner kéo thả & Section danh mục con, bộ lọc giá/hãng, lưới 32 SP** | `P0` | Wix Dev | `Not started` | 29/09/2026 | 02/10/2026 | 2. Trang Sản Phẩm | Trang Danh mục & Lưới sản phẩm | [Kéo thả + Section Custom Element] Nút xem thêm 32 SP |
| **[Trang Chi Tiết SP] Dựng khối thông tin & Section gallery ảnh zoom, specs, nút Shopee/TikTok** | `P0` | Wix Dev | `Not started` | 02/10/2026 | 04/10/2026 | 3. Trang Chi Tiết SP | Trang Chi Tiết Sản Phẩm (PDP) | [Kéo thả + Section Custom Element] Mua hàng 1-click |
| **[Trang Sale] Dựng Banner ưu đãi kéo thả & Section lưới sản phẩm giảm giá, nhãn Sale đỏ** | `P1` | Wix Dev | `Not started` | 04/10/2026 | 06/10/2026 | 4. Trang Sale | Trang Khuyến Mãi (Sale) | [Kéo thả + Section Custom Element] Tự động cập nhật giảm giá |
| **[Trang Thương Hiệu] Dựng Banner giới thiệu & Section dải 3 thương hiệu kèm lưới sản phẩm** | `P1` | Wix Dev | `Not started` | 06/10/2026 | 07/10/2026 | 5. Trang Thương Hiệu | Trang Tổng hợp 3 Thương hiệu | [Kéo thả + Section Custom Element] ZWILLING, MIYABI, STAUB |
| **[Trang Thương Hiệu Detail] Dựng câu chuyện hãng & Section dải Series, lưới sản phẩm theo hãng** | `P1` | Wix Dev / Content | `Not started` | 07/10/2026 | 09/10/2026 | 6. Trang Brand Detail | Trang riêng từng thương hiệu | [Kéo thả + Section Custom Element] Công nghệ & Series độc quyền |
| **[Trang Bestseller] Dựng Banner thông điệp & Section lưới sản phẩm bán chạy kèm huy hiệu** | `P1` | Wix Dev | `Not started` | 09/10/2026 | 10/10/2026 | 7. Trang Bestseller | Trang Sản Phẩm Bán Chạy | [Kéo thả + Section Custom Element] Huy hiệu Bestseller |
| **[Trang Về Chúng Tôi] Dựng bố cục dòng thời gian di sản 290 năm lịch sử (từ 1731) và tầm nhìn** | `P1` | UI/UX / Content | `Not started` | 10/10/2026 | 12/10/2026 | 8. Trang Về Chúng Tôi | Trang Về Chúng Tôi hoàn chỉnh | [100% Kéo thả thuần túy] Bố cục Timeline trang trọng |
| **[Trang Về Chúng Tôi Detail] Dựng các bài viết chuyên đề công nghệ rèn Đức, Nhật, Pháp** | `P2` | UI/UX / Content | `Not started` | 12/10/2026 | 13/10/2026 | 9. Trang About Detail | Trang Chuyên Đề Công Nghệ | [100% Kéo thả thuần túy] Thép FRIODUR, rèn Seki, men gang |
| **[Trang Liên Lạc] Dựng Form gửi thư tư vấn, bản đồ Showroom, Hotline và mạng lưới đối tác** | `P1` | Wix Dev | `Not started` | 13/10/2026 | 14/10/2026 | 10. Trang Liên Lạc | Trang Liên Hệ hoàn chỉnh | [100% Kéo thả thuần túy] Tiếp nhận yêu cầu & chỉ đường |
| **[Toàn Site] Cài đặt và kiểm tra tính năng chuyển đổi Song ngữ (Tiếng Việt - Tiếng Anh)** | `P0` | Wix Dev / Content | `Not started` | 14/10/2026 | 16/10/2026 | Tối ưu toàn site | Toàn bộ 10 trang hỗ trợ song ngữ | Tiếng Việt là mặc định, chuyển đổi ngôn ngữ tức thì |
| **[Toàn Site] Tối ưu hiển thị Điện thoại (Mobile), Máy tính bảng và tốc độ tải trang dưới 1.5s** | `P0` | Frontend / QA | `Not started` | 16/10/2026 | 17/10/2026 | Tối ưu toàn site | Giao diện Mobile mượt mà, tải nhanh | Thao tác vuốt chạm cảm ứng nhẹ nhàng, không chờ đợi |
| **[Nghiệm Thu] Kiểm thử tổng thể 10 trang: Kiểm tra liên kết, nút mua hàng, bộ lọc và form** | `P0` | QA / Tester | `Not started` | 17/10/2026 | 19/10/2026 | Nghiệm thu & Ra mắt | Báo cáo kiểm thử chất lượng toàn diện | Đảm bảo 100% không có link hỏng hay lỗi hiển thị |
| **[Ra Mắt] Khách hàng nghiệm thu (UAT), trỏ tên miền chính thức và bàn giao quản trị** | `P0` | PM / Khách hàng | `Not started` | 19/10/2026 | 20/10/2026 | Nghiệm thu & Ra mắt | Website chính thức hoạt động (Go-Live) | Bàn giao tài liệu hướng dẫn quản trị sản phẩm |

---

## 3. Các Cột Mốc Nghiệm Thu Theo Sitemap (Milestones)

1. **Cột mốc 1 (Ngày 27/09)**: Hoàn tất toàn bộ dữ liệu sản phẩm CMS, hình ảnh và thanh Header/Footer.
2. **Cột mốc 2 (Ngày 10/10)**: Hoàn thành và nghiệm thu các trang bán hàng chính (Trang Chủ, Sản Phẩm, Chi Tiết Sản Phẩm, Sale, Thương Hiệu, Bestseller).
3. **Cột mốc 3 (Ngày 14/10)**: Hoàn thành và nghiệm thu các trang nội dung kéo thả thuần (Về chúng tôi, Về chúng tôi chi tiết, Liên lạc).
4. **Cột mốc 4 (Ngày 17/10)**: Kiểm tra tối ưu toàn bộ 10 trang trên Mobile và chuyển đổi song ngữ Việt - Anh.
5. **Cột mốc 5 (Ngày 20/10)**: Khách hàng duyệt nghiệm thu tổng thể (UAT), kết nối tên miền chính thức và ra mắt website.
