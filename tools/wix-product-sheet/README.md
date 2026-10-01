# Mẫu Google Sheets nhập sản phẩm Wix

[Mở Google Sheets](https://docs.google.com/spreadsheets/d/1WqYBdfWo4d2xRiXgFd_cXo5dAuYbAYoS50iQDpsAy3A/edit)

- `Huong dan`: hướng dẫn tiếng Việt và liên kết mã Apps Script.
- `Nhap san pham`: một SKU mỗi dòng; mã nhóm chung tạo một sản phẩm với nhiều biến thể.
- `Thong so`: một thông số mỗi dòng, liên kết bằng SKU.
- 10 tab nguồn: giữ toàn bộ cột và dữ liệu từ `tools/live-wix-csv/*.csv`, gồm cả ba bản FeatureItems riêng biệt.

Khách có thể nhập ngay. Menu xuất cần quản trị cài `Code.gs` một lần trong **Tiện ích mở rộng → Apps Script**, lưu, chạy `onOpen`, cấp quyền cho file hiện tại và tải lại Sheet. Kết nối hiện tại không cung cấp API cài Apps Script; mã chưa được gắn vào file. Công cụ chỉ đọc Sheet hiện tại, tạo ZIP tải qua hộp thoại; không ghi vào Wix hoặc Drive.

## Xuất không cần cài menu

Tải Sheet bằng **Tệp → Tải xuống → Microsoft Excel (.xlsx)** rồi chạy tại thư mục dự án:

```sh
python3 tools/wix-product-sheet/export-xlsx.py '/đường/dẫn/nhap-san-pham.xlsx' --out /tmp/wix-new-products
```

Cần Python có `openpyxl` và Node.js. Công cụ dùng cùng logic với `Code.gs`, kiểm tra toàn bộ trước khi xuất và không ghi đè thư mục có sẵn. Kết quả gồm `Products.csv`, `ProductVariants.csv`, UTF-8 BOM. Không xuất dòng mẫu vì tab nhập khởi tạo rỗng.

## Phạm vi và quy tắc

- Chỉ thêm sản phẩm mới, chưa hỗ trợ cập nhật sản phẩm cũ hoặc thêm SKU vào nhóm cũ.
- Thương hiệu, dòng và danh mục lấy từ các tab nguồn; chọn theo tên kèm `[ID]`. Tạo mới các đối tượng này trên Wix rồi cập nhật danh sách trước khi nhập sản phẩm.
- Tự tạo ID ổn định, slug, min/max giá, JSON `gallery`, `labels`, `specs`; SKU đầu tiên của nhóm là mặc định và cung cấp ảnh cấp sản phẩm.
- Chặn SKU/ID/slug trùng với snapshot nguồn, sai reference/taxonomy, dòng sản phẩm sai thương hiệu, giá/tồn kho sai và thông số không có SKU.
- Ảnh dùng URI `wix:image://v1/...` hoặc để trống để gắn sau; không tự upload ảnh.
- Import `Products.csv` trước `ProductVariants.csv` vào **Wix CMS**, ánh xạ ID/reference và thử 1–2 sản phẩm trước. Chưa thử import vào Wix live.
- Sau khi import, cập nhật snapshot nguồn và lưu trữ/xóa dòng nhập đã xử lý. Kiểm tra trùng không truy vấn Wix trực tiếp.
- Xuất 10 CSV nguồn là thao tác riêng. Không import ba bản FeatureItems vào cùng collection; code build hiện ưu tiên `FeatureItemsWix`.

## Kiểm thử và tái tạo

```sh
python3 tools/wix-product-sheet/prepare.py
node tools/wix-product-sheet/test-export.mjs
```

`prepare.py` tạo payload Google Sheets có giới hạn vùng trong `/tmp/wix-product-sheet`; không gọi Google hoặc sửa CSV gốc. Các sheet ID trong payload chỉ dùng cho workbook mới. Các payload hướng dẫn có placeholder `SCRIPT_URL`, cần thay bằng URL file mã đã upload trước khi gửi. Mã gọi connector nằm trong phiên làm việc, không có credentials trong repository.

Kiểm thử bao gồm nhóm nhiều SKU, giữ số 0 đầu, Unicode/xuống dòng/dấu nháy trong CSV, liên kết danh mục, min/max giá, JSON thông số, và từ chối dữ liệu không hợp lệ.

Đã đối chiếu toàn bộ ô của 10 tab nguồn trên Google Sheets với CSV gốc; kiểm tra native table, dropdown, vùng nhập, màu chữ/nền và định dạng văn bản qua API. Chưa kiểm tra giao diện bằng trình duyệt; các ô nội dung dài trong tab nguồn chủ ý hiển thị gọn, xem đầy đủ trên thanh công thức. Chưa chạy Apps Script trong Google hoặc import vào Wix live.
