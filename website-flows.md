# Luồng điều hướng website sản phẩm

- Ngày cập nhật: 15/09/2026.
- Trạng thái: Luồng Products và Brands đã được người dùng xác nhận.
- **Ngôn ngữ: Việt (vi) và Anh (en); yêu cầu slug trang động theo từng ngôn ngữ.** Chi tiết và giới hạn Wix ở mục 8.
- Mục đích: Lưu yêu cầu để đối chiếu thiết kế, cấu trúc CMS và triển khai.
- Nền tảng đã định hướng: Wix Studio + Wix CMS; bổ sung CSS, Velo hoặc Custom Element khi cần.
- Người dùng đã đồng ý kết hợp page riêng + CMS cho bố cục giới thiệu riêng và Dynamic Page cho trang lặp lại. Phạm vi Custom Elements xem [custom-elements-plan.md](custom-elements-plan.md).
- Phạm vi: Website trưng bày sản phẩm, không thanh toán trực tiếp. Các chức năng thương mại trong ảnh tham khảo không tự động trở thành yêu cầu.

## 1. Luồng Products

```text
Menu Products
└── /products
    Danh mục chính + toàn bộ sản phẩm
    │
    ├── Cookware
    │   Banner + mô tả + danh mục con + sản phẩm thuộc Cookware
    │   │
    │   └── Bakeware
    │       Danh mục con + sản phẩm thuộc Bakeware
    │       │
    │       ├── Baking Dishes
    │       │   Chỉ danh sách sản phẩm thuộc Baking Dishes
    │       │   └── Chi tiết sản phẩm
    │       │
    │       └── Ramekins
    │           Chỉ danh sách sản phẩm thuộc Ramekins
    │           └── Chi tiết sản phẩm
    │
    ├── Knives
    │   Danh mục con + sản phẩm thuộc Knives
    │   └── Chef’s Knives / Knife Sets / các danh mục con khác
    │       Sản phẩm thuộc danh mục được chọn
    │       └── Chi tiết sản phẩm
    │
    └── Các danh mục khác theo dữ liệu CMS
```

### 1.1. Trang tổng Products

Bấm Products trên menu mở trang `/products`.

Thứ tự nội dung:

1. Breadcrumb: Home → Products.
2. Tiêu đề PRODUCTS.
3. Hàng danh mục chính gồm ảnh và tên, bấm để vào trang danh mục.
4. Tổng số kết quả, sắp xếp và bộ lọc.
5. Lưới sản phẩm từ tất cả danh mục và thương hiệu trong phạm vi được hiển thị.
6. Số sản phẩm đã hiển thị trên tổng kết quả, thanh tiến trình và Load More.

### 1.2. Trang danh mục chính — ví dụ Cookware

- Breadcrumb: Home → Products → Cookware.
- Banner, tiêu đề và mô tả của danh mục.
- Hàng danh mục con: Bakeware, Cookware Accessories, Cookware Sets… theo dữ liệu thực tế.
- Bộ lọc, sắp xếp và danh sách sản phẩm thuộc Cookware.
- Đếm kết quả và tải thêm.

### 1.3. Trang danh mục con — ví dụ Bakeware

- Breadcrumb: Home → Products → Cookware → Bakeware.
- Tiêu đề Bakeware.
- Hiển thị các mục con: Baking Dishes và Ramekins trong ví dụ tham khảo.
- Bộ lọc, sắp xếp và danh sách sản phẩm thuộc Bakeware.
- Đếm kết quả và tải thêm.

### 1.4. Trang danh mục cuối — ví dụ Baking Dishes

- Breadcrumb: Home → Products → Cookware → Bakeware → Baking Dishes.
- Tiêu đề Baking Dishes.
- Không có hàng danh mục con khi danh mục không còn cấp con.
- Bộ lọc, sắp xếp và danh sách sản phẩm thuộc Baking Dishes.
- Đếm kết quả và tải thêm.

### 1.5. Quy tắc của luồng Products

- Cây danh mục hỗ trợ ít nhất ba cấp; mỗi nhánh có thể có số cấp khác nhau.
- Danh mục cha bao gồm sản phẩm thuộc các cấp con bên dưới.
- Danh mục còn cấp con hiển thị cả mục con và danh sách sản phẩm.
- Danh mục cuối hiển thị danh sách sản phẩm, không hiển thị hàng mục con.
- Có banner/mô tả thì hiển thị; phần không có dữ liệu được thu gọn.
- Banner và nội dung giới thiệu thuộc riêng từng trang: `/products/cookware` và `/products/knives` không dùng chung nội dung. Quy tắc dùng lại phần danh sách không yêu cầu mọi trang có cùng bố cục giới thiệu.
- Luồng này không giới hạn một thương hiệu, trừ khi người xem chọn bộ lọc Brand.
- Tên, ảnh, số lượng và thứ tự danh mục lấy từ CMS. Không sao chép mặc định số lượng sản phẩm trong ảnh tham khảo.

## 2. Luồng Brands

```text
Menu Brands
└── /brands
    Danh sách thương hiệu + toàn bộ sản phẩm
    │
    └── ZWILLING
        Nội dung giới thiệu + danh mục của ZWILLING
        │
        ├── Knives
        │   Danh sách Series dao của ZWILLING
        │   │
        │   ├── Pro
        │   │   Chỉ danh sách sản phẩm ZWILLING / Knives / Pro
        │   │   └── Chi tiết sản phẩm
        │   │
        │   ├── Four Star
        │   ├── Gourmet
        │   └── Các Series khác theo CMS
        │
        ├── Cookware
        ├── Storage
        └── Các danh mục của thương hiệu theo CMS
```

### 2.1. Trang tổng Brands

- Breadcrumb: Home → Brands.
- Tiêu đề BRANDS.
- Danh sách thương hiệu gồm ảnh và tên.
- Bộ lọc, sắp xếp và sản phẩm thuộc nhiều thương hiệu.
- Đếm kết quả và tải thêm.

### 2.2. Trang thương hiệu — ví dụ ZWILLING

- Hiển thị nội dung giới thiệu riêng của thương hiệu.
- Có thể có banner/video và các khối ảnh/chữ tùy nội dung được cung cấp.
- Hiển thị các danh mục của ZWILLING: Knives, Cookware, Storage, Tools…
- Chọn Knives dẫn đến trang ZWILLING/Knives, giữ nguyên ngữ cảnh thương hiệu.
- Trang MIYABI đã được cung cấp làm tham khảo cho bố cục giới thiệu thương hiệu; không mặc định mọi thương hiệu có nội dung giống nhau.

### 2.3. Trang Brand + Category — ZWILLING/Knives

- Tiêu đề ZWILLING KNIVES và mô tả tương ứng.
- Hiển thị danh sách Series dao của ZWILLING, ví dụ Spectrum, Pro, Four Star, Gourmet, Professional S, TWIN Signature.
- Mỗi Series có ảnh đại diện và tên.
- Chọn Pro dẫn đến trang ZWILLING/Knives/Pro.
- Không nhầm danh sách Series ở đây với Subcategories của luồng Products.

### 2.4. Trang Series — ZWILLING/Knives/Pro

Người dùng đã xác nhận: trang này chỉ hiển thị danh sách sản phẩm của Series Pro trong ngữ cảnh ZWILLING/Knives.

- Breadcrumb và tiêu đề theo ngữ cảnh.
- Bộ lọc/sắp xếp, lưới sản phẩm và tải thêm.
- Không cần khối giới thiệu Series hoặc danh sách Series khác.
- Sản phẩm phải khớp đồng thời:
  - Brand: ZWILLING.
  - Category: Knives, bao gồm danh mục con phù hợp.
  - Series: Pro.

### 2.5. Quy tắc của luồng Brands

- Giữ ngữ cảnh thương hiệu khi chuyển sang Category và Series.
- Knives trong ZWILLING không dẫn sang trang Knives chung có cả MIYABI.
- Danh mục của thương hiệu và danh mục sản phẩm chung có thể có ảnh, nhãn và thứ tự khác nhau.
- Series và Subcategory là hai loại dữ liệu khác nhau.
- Các tên Series trong ảnh là ví dụ tham khảo; chỉ hiển thị các Series đã chuẩn bị trong CMS.
- Luồng ZWILLING → Knives → Pro đã chốt; cách điều hướng chi tiết của các nhánh thương hiệu khác cần đối chiếu khi có dữ liệu/UI tương ứng.

## 3. Đường dẫn và trang chi tiết

Các đường dẫn dưới đây ghi nhận luồng đã trao đổi, chưa phải cấu hình route đã được tạo hoặc kiểm chứng trên Wix.

| Trang | Đường dẫn tham chiếu |
| --- | --- |
| Products | `/products` |
| Cookware | `/products/cookware` |
| Knives | `/products/knives` |
| Bakeware | `/products/cookware/bakeware` |
| Baking Dishes | `/products/cookware/bakeware/baking-dishes` |
| Brands | `/brands` |
| ZWILLING | `/brands/zwilling` |
| ZWILLING Knives | `/brands/zwilling/knives` |
| ZWILLING Knives Pro | `/brands/zwilling/knives/pro` |

Hai luồng cùng dẫn đến trang chi tiết của một sản phẩm:

```text
Products → Knives → Chef’s Knives ───────┐
                                        ├── Cùng một trang chi tiết sản phẩm
Brands → ZWILLING → Knives → Pro ────────┘
```

- Mỗi sản phẩm chỉ lưu một lần trong Products.
- Trang chi tiết dùng chung dù truy cập từ Products hay Brands.
- URL chi tiết và quy tắc breadcrumb khi vào từ hai luồng chưa chốt.
- Trang chi tiết có kích thước/thông số khác nhau theo loại sản phẩm; UI chi tiết còn chờ ảnh tham khảo.

## 4. Hệ quả đối với cấu trúc CMS

Đây là định hướng thiết kế để hỗ trợ các luồng, chưa phải schema đã triển khai.

### 4.1. Tách nội dung riêng của trang và danh sách theo CMS

Người dùng xác nhận các trang có nội dung giới thiệu khác nhau. Mỗi trang cần được xem là hai phần:

1. **Phần giới thiệu riêng:** banner, tiêu đề, mô tả, ảnh/video và các khối nội dung theo thiết kế của trang đó.
2. **Phần danh sách theo ngữ cảnh:** danh mục con hoặc Series và danh sách sản phẩm được lấy/lọc từ CMS.

| Trang | Nội dung giới thiệu riêng | Phần lấy theo ngữ cảnh CMS |
| --- | --- | --- |
| `/products/cookware` | Banner và nội dung Cookware | Danh mục con và sản phẩm thuộc Cookware |
| `/products/knives` | Banner và nội dung Knives | Danh mục con và sản phẩm thuộc Knives |
| `/products/cookware/bakeware` | Nội dung riêng nếu thiết kế có | Danh mục con và sản phẩm thuộc Bakeware |
| `/brands/zwilling` | Giới thiệu thương hiệu ZWILLING | Danh mục của ZWILLING |
| Trang Brand + Category, ví dụ ZWILLING/Cookware | Nội dung riêng của tổ hợp thương hiệu/danh mục nếu có; không mặc định sao chép từ Cookware chung | Danh sách theo cấu hình nhánh; nhánh ZWILLING/Knives đã chốt hiển thị Series |
| `/brands/zwilling/knives/pro` | Tiêu đề/breadcrumb; vẫn giữ yêu cầu không có khối giới thiệu Series | Sản phẩm khớp Brand + Category + Series |

**Định hướng triển khai:**

- Nếu chỉ khác ảnh/chữ và giữ cùng bố cục: dùng một mẫu dynamic page, nội dung lấy từ bản ghi tương ứng.
- Nếu khác bố cục giới thiệu: dựng phần giới thiệu riêng trong Wix Studio hoặc dùng ContentBlocks có loại bố cục; phần danh sách vẫn đọc từ CMS theo ID danh mục/thương hiệu của trang.
- Không bắt buộc dựng một trang kéo thả cho từng SKU hoặc sao chép thủ công danh sách sản phẩm.
- Việc nội dung giới thiệu được chỉnh trực tiếp trong Editor hay quản lý qua CMS cần chốt theo từng mẫu UI; yêu cầu hiện tại là nội dung mỗi trang phải độc lập.
- Luồng điều hướng không thay đổi khi các trang có bố cục/nội dung giới thiệu khác nhau.

### 4.2. Các collection dự kiến

| Collection | Vai trò |
| --- | --- |
| Products | Sản phẩm; liên kết Brand, Categories, Series; nội dung và thông số |
| Categories | Cây danh mục sản phẩm nhiều cấp, có quan hệ cha–con |
| Brands | Thương hiệu và nội dung cơ bản |
| BrandCategories | Trang kết hợp Brand + Category, có ảnh/tiêu đề/mô tả/thứ tự riêng |
| Series | Dòng sản phẩm, liên kết tới thương hiệu và BrandCategories phù hợp |
| ContentBlocks | Các khối giới thiệu có ảnh/chữ/video theo trang |

## 5. Checklist đối chiếu triển khai

- [ ] Bấm Products mở trang tổng có danh mục chính và sản phẩm.
- [ ] Cookware, Knives và các trang thương hiệu hiển thị đúng banner/nội dung riêng, không dùng nhầm nội dung của trang khác.
- [ ] Phần danh mục con/Series/sản phẩm vẫn cập nhật từ CMS dù phần giới thiệu được thiết kế riêng.
- [ ] Danh mục cha trả về sản phẩm thuộc cả các cấp con.
- [ ] Baking Dishes không hiện hàng danh mục con khi không có cấp con.
- [ ] Bấm Brands mở danh sách thương hiệu và sản phẩm.
- [ ] ZWILLING chỉ hiện các danh mục được cấu hình cho ZWILLING.
- [ ] ZWILLING/Knives hiện Series dao ZWILLING.
- [ ] ZWILLING/Knives/Pro chỉ hiện sản phẩm khớp cả ba điều kiện.
- [ ] Bộ lọc/sắp xếp không làm mất ngữ cảnh trang đang xem.
- [ ] Tổng kết quả và số đã tải phản ánh đúng bộ lọc hiện tại.
- [ ] Không lặp sản phẩm do nhiều quan hệ danh mục.
- [ ] Cả hai luồng dẫn đến cùng bản ghi và trang chi tiết sản phẩm.
- [ ] Phần trống trong ảnh chụp không tự động được coi là yêu cầu thiết kế.
- [ ] Không đưa giỏ hàng/thanh toán từ ảnh mẫu vào phạm vi catalog.

## 6. Những điểm còn cần xác nhận

- Giao diện và hành vi khi mở từng bộ lọc, All Filters, menu và tìm kiếm.
- Giao diện mobile và hành vi carousel khi kéo/chạm.
- UI trang chi tiết sản phẩm và các nhóm thông số.
- Danh sách bộ lọc chính thức theo từng nhóm sản phẩm.
- Nội dung và luồng chi tiết cho các nhánh Brand + Category ngoài ví dụ ZWILLING/Knives.
- Quy tắc URL cuối cùng, breadcrumb trang chi tiết và dữ liệu SEO.

## 7. Ảnh tham khảo do người dùng cung cấp

Ảnh là nguồn tham khảo UI/luồng. Nội dung quảng cáo, giá, số kết quả, logo thanh toán và chức năng thương mại trong ảnh không tự động là yêu cầu của dự án.

| Nội dung | File |
| --- | --- |
| Trang chủ | `screencapture-zwilling-au-2026-09-15-13_56_25.png` |
| Cookware | `screencapture-zwilling-au-cookware-2026-09-15-13_57_20.png` |
| Bakeware | `screencapture-zwilling-au-cookware-bakeware-2026-09-15-14_02_28.png` |
| Baking Dishes | `screencapture-zwilling-au-cookware-bakeware-baking-dishes-2026-09-15-14_02_49.png` |
| Brands | `screencapture-zwilling-au-brands-2026-09-15-14_03_30 (1).png` |
| MIYABI | `screencapture-zwilling-au-brands-miyabi-2026-09-15-14_04_53.png` |
| Danh mục ZWILLING | `Screenshot 2026-09-15 at 14.14.34.png` |
| Series ZWILLING Knives | `Screenshot 2026-09-15 at 14.13.40.png` |
| Products | `screencapture-zwilling-au-products-2026-09-15-14_20_38.png` |

Các file `screencapture-*` nằm trong thư mục Downloads của người dùng; hai ảnh `Screenshot` nằm trong Desktop. Ảnh chưa được sao chép vào dự án.


## 8. Yêu cầu song ngữ và slug — cập nhật 15/09/2026

- Đã xác nhận: website có hai ngôn ngữ Việt (vi) và Anh (en).
- Yêu cầu: slug của trang động theo ngôn ngữ, không chỉ thêm mã ngôn ngữ vào cùng một slug.
- Nội dung, nhãn bộ lọc, breadcrumb, CTA và SEO phải theo ngôn ngữ đang xem.
- Chuyển ngôn ngữ giữ nguyên thực thể sản phẩm/category/brand/series, chuyển đến URL bản dịch tương ứng.
- Đề xuất lưu slugVi/slugEn và ánh xạ URL theo ID ổn định; tên brand/series có thể giữ nguyên. Các field slug không tự làm Wix sinh route đa ngôn ngữ.
- URL trong các phần trước là cấu trúc logic tham chiếu. Ngôn ngữ chính, prefix và URL cuối cùng chưa chốt.
- Giới hạn đã kiểm tra: Wix Multilingual hiện không hỗ trợ dịch URL của Dynamic Page; cơ chế mặc định giữ URL và thêm mã ngôn ngữ. Vì vậy yêu cầu slug riêng cần prototype route/template riêng hoặc Velo Router, không coi là tính năng mặc định đã đáp ứng.
- Giai đoạn 1 phải thử một cặp trang VI/EN, chuyển ngôn ngữ, 404, canonical/hreflang và tránh trùng route. Nếu cần nhân đôi template/route, cập nhật số template và ước lượng trước khi nhân rộng; giữ chung bản ghi sản phẩm gốc.
- Object thông số cần tự ánh xạ nhãn/giá trị VI/EN qua Velo; không mặc định Wix Multilingual tự dịch Object.

Nguồn: [Wix Multilingual: Translating CMS Content](https://support.wix.com/en/article/wix-multilingual-translating-cms-collection-content).
