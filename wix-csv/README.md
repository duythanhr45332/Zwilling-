# CSV import vào Wix CMS

Đây là **nguồn dữ liệu duy nhất** của dự án: sửa trực tiếp trong các file CSV ở thư mục này. `ID` được đặt cố định theo dữ liệu (`brand-zwilling`, `sku-1002144`…) nên import lại sẽ ghi đè đúng item cũ, không tạo bản trùng.

Ảnh: mỗi sản phẩm và mỗi SKU có 2 cột — `mainImage` (1 URL ảnh chính) và `gallery` (các URL ảnh phụ, cách nhau bởi dấu `;`).

## Các file

| File | Collection | Ghi chú |
|---|---|---|
| `Brands.csv` | Brands | |
| `Categories.csv` | Categories | Cả 3 cây `product`, `brand`, `material` |
| `Series.csv` | Series | Đã gộp tên viết nhiều kiểu (xem `_report.txt`) |
| `Products.csv` | Products | Tạm thời mỗi SKU là 1 product |
| `ProductVariants.csv` | ProductVariants | `specs` là chuỗi JSON |
| `FeatureBlocks.csv` | FeatureBlocks | Tách tự động từ sheet A–H, **cần rà lại** |
| `FeatureItems.csv` | FeatureItems | |
| `ProductFeatureBlocks.csv` | ProductFeatureBlocks | **Chỉ có header**: chưa có danh sách SKU dùng trang nào |
| `ExcelImportRows.csv` | ExcelImportRows | `raw` là chuỗi JSON của cả dòng Excel |

File phụ, không import:

| File | Dùng để |
|---|---|
| `_page-blocks.csv` | Tra trang A–H gồm những khối nào, để điền `ProductFeatureBlocks` |
| `_images-manifest.csv` | Mỗi ảnh trong `images/` thuộc item nào, field nào |
| `_report.txt` | Số dòng từng file và các cảnh báo khi đọc Excel |

Hướng dẫn import từng bước (kiểu field cho từng cột, điểm kiểm tra, xử lý lỗi): [HUONG-DAN-IMPORT.md](HUONG-DAN-IMPORT.md).

## Thứ tự import

Reference chỉ gắn được khi item được trỏ tới đã có sẵn, nên import theo thứ tự:

1. `Brands`
2. `Categories`
3. `Series`
4. `Products`
5. `ProductVariants`
6. `FeatureBlocks`
7. `FeatureItems`
8. `ProductFeatureBlocks`
9. `ExcelImportRows`

## Định dạng cột

| Kiểu field trong Wix | Giá trị trong CSV |
|---|---|
| `ID` | Map vào `_id` (ID) của item |
| Reference | `_id` của item được trỏ tới, ví dụ `brand-zwilling` |
| Number | Số nguyên, không có dấu phân cách: `4590000` |
| Boolean | `true` / `false` |
| Tags (`labels`) | Chuỗi JSON: `["Bán chạy"]` |
| Array (`specs`) | Chuỗi JSON: `[{"section":"Thông số kỹ thuật","name":"Xuất xứ","value":"Nhật Bản"}]` |
| Object (`raw`) | Chuỗi JSON |
| Image | Để trống. Upload ảnh từ `images/` rồi gắn theo `_images-manifest.csv` |

**Trước khi import toàn bộ**, thử import 2–3 dòng mỗi file để kiểm tra Wix có nhận đúng cột ID, Reference, Tags, Array hay không. Nếu trình import CSV không nhận các kiểu này, đổi sang ghi bằng Velo `wixData.bulkSave` với cùng dữ liệu.

## Cần rà lại sau khi import

- **FeatureBlocks:** `component` được đoán theo vị trí trong trang:
  - khối có ảnh đầu tiên: `story`
  - khối có nút "KHÁM PHÁ…" hoặc chỉ có 1 dòng: `intro`
  - các khối có ảnh phía sau: `highlights`
- **Trang MADURA:** đoạn "ZWILLING MADURA PLUS" đang nằm thành một feat trong khối highlights, đúng ra là khối `intro`.
- **Trang Twin Select:** dòng eyebrow "ZWILLING TWIN SELECT" ở đầu trang bị bỏ.
- **Series để trống:** Ceramics, Fresh & Save và phần lớn Dụng cụ bếp STAUB, vì cột series trong Excel chỉ ghi tên chung chung.
- **Nhãn "Set savings"** (SKU dòng 6 sheet DAO) chưa có bản VN nên chưa được gắn.
