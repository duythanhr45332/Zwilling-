# Nhập sản phẩm và nội dung chi tiết Wix

[Google Sheets nhập liệu](https://docs.google.com/spreadsheets/d/1WqYBdfWo4d2xRiXgFd_cXo5dAuYbAYoS50iQDpsAy3A/edit)

Cập nhật ngày 09/10/2026. File mã trên Drive đã thay bằng `Code.gs` mới và đọc lại khớp nguyên văn. Chưa cài mã vào Apps Script gắn với Sheet, tạo field trên Wix hoặc publish page code; cần làm các bước dưới đây.

## Cài đặt một lần

1. Trong tab `Huong dan`, mở liên kết **Mã Apps Script**, tải bản mới. Vào **Tiện ích mở rộng → Apps Script**, thay toàn bộ `Code.gs`, lưu, chạy `onOpen`, cấp quyền nếu được hỏi và tải lại Sheet. Công cụ chỉ đọc spreadsheet hiện tại và tạo ZIP trong hộp thoại; không ghi vào Wix hoặc Drive.
2. Trong **Wix CMS → Products**, tạo hai field kiểu **Reference** đến **FeatureBlocks**, với field ID chính xác `storyBlock` và `highlightsBlock` (single reference, không phải multi-reference). Giữ field `color` đã có trong snapshot. Kiểm tra `FeatureItems.block` liên kết đến FeatureBlocks và quyền đọc của các collection trên trang public.
3. Thay page code của **Product (Item)** bằng nội dung `wix-pages/products-item.js` trong dự án. Preview với một sản phẩm đã chọn block, một sản phẩm cũ để trống block, và một link bị thiếu/sai loại. Kiểm tra mobile rồi Publish.

## Các tab nhập

| Tab | Cách nhập |
| --- | --- |
| `Nhap san pham` | Mỗi SKU một dòng. Cùng mã nhóm tạo một sản phẩm. Hai cột cuối X/Y nhận ID Story/Highlights từ dữ liệu nguồn hoặc block mới. Có thể dán dạng `Tên [ID]`. |
| `Thong so` | Mỗi thông số một dòng, liên kết bằng SKU. |
| `Nhap FeatureBlocks` | Mỗi block mới một dòng. ID duy nhất, tên, loại `story` hoặc `highlights`; chọn Series có sẵn nếu cần. |
| `Nhap FeatureItems` | Mỗi item mới một dòng, chỉ rõ ID block cha và thứ tự. ID item không trùng dữ liệu nguồn; thứ tự nguyên dương không trùng trong cùng block. |

Không sửa tên/thứ tự tiêu đề. Vùng nhập được chuẩn bị cho 500 SKU, 1.000 thông số, 500 block và 1.000 item; mở rộng bảng khi cần. Các dòng DEMO có sẵn là minh họa, vẫn được xuất nếu chưa xóa; không import demo vào Wix thật.

### Dùng lại nội dung có sẵn

Chỉ điền X/Y trong `Nhap san pham`, không cần tạo block hoặc item mới. Ví dụ nội dung Gourmet: Story `block-zwilling-gourmet-1`, Highlights `block-zwilling-gourmet-3`. Chỉ chọn khi nội dung phù hợp sản phẩm.

### Tạo nội dung mới

- Nhập block trước, ví dụ `block-dao-moi-story`, rồi nhập item liên kết bằng đúng ID đó. Điền ID block ở X hoặc Y của sản phẩm.
- `story`: item có thứ tự nhỏ nhất cung cấp tiêu đề/nội dung/ảnh giới thiệu lớn; các item tiếp theo thành thẻ tính năng. Dữ liệu ở block là dự phòng cho banner.
- `highlights`: ảnh chính ở block, nội dung từng điểm ở item. Tọa độ X/Y là phần trăm 0–100 tính từ trái/trên ảnh; 0 là giá trị hợp lệ. Để trống cả hai thì không có chấm hotspot. Không dùng tọa độ cho story.
- Tổng tối đa 20 item/block theo page code hiện tại. Có thể thêm item mới vào block nguồn có sẵn nhưng sẽ ảnh hưởng mọi sản phẩm dùng block đó. Không dùng cùng ID để cập nhật nội dung cũ qua luồng thêm mới.
- Ảnh dùng URI `wix:image://v1/...` hoặc để trống để gắn sau; công cụ không upload ảnh.

## Xuất và import

1. **Wix CSV → Kiểm tra sản phẩm mới**.
2. **Wix CSV → Tải ZIP CSV sản phẩm mới**. ZIP luôn có Products.csv và ProductVariants.csv; thêm FeatureBlocks.csv/FeatureItems.csv nếu hai tab tương ứng có dòng mới. Chỉ xuất dữ liệu nhập mới, không trộn snapshot.
3. Backup CMS hiện tại, rồi import vào **Wix CMS** theo thứ tự **FeatureBlocks → FeatureItems → Products → ProductVariants**, bỏ qua file không có trong ZIP. Map `ID` vào ID hệ thống, `Title` vào `title` hiện có, `FeatureItems.block` và `Products.storyBlock/highlightsBlock` vào Reference đến FeatureBlocks, `ProductVariants.product` vào Reference đến Products. Map đủ các field xuất và kiểm tra preview. Nếu báo ID trùng, chọn bỏ qua và kiểm tra lại, không ghi đè. Thử 1–2 sản phẩm trên site test trước.
4. Cập nhật các tab nguồn từ Wix sau import, lưu trữ/xóa các dòng nhập đã xử lý ở cả bốn tab. Việc kiểm tra trùng chỉ dựa trên snapshot, không truy vấn Wix trực tiếp.

`color` cấp Products lấy từ SKU đầu tiên (mặc định); từng ProductVariants giữ màu riêng. Các SKU cùng nhóm phải có cùng tên, slug, thương hiệu, dòng, danh mục, nhãn và hai ID block. Không hỗ trợ thêm SKU vào sản phẩm cũ hay cập nhật sản phẩm cũ qua mẫu này.

Mã trang ưu tiên từng liên kết `storyBlock`/`highlightsBlock` đã chỉ định, không chấm điểm tên cho phần đó. ID không tồn tại, sai loại hoặc lỗi tải sẽ ẩn section tương ứng và ghi log; không tự thay bằng nội dung khác. Field trống vẫn dùng luồng tìm theo series/tên hiện tại, có giới hạn fallback quét 100 block. Hai single references không phụ thuộc trường `featureBlocks` cũ.

Theo [hướng dẫn import của Wix](https://support.wix.com/en/article/wix-code-importing-data-in-the-data-manager), Reference lưu ID hệ thống của item được tham chiếu; field không được map có thể bị xóa dữ liệu khi import. Vì vậy kiểm thử CSV ở local chưa đủ để khẳng định dữ liệu live được bảo toàn: phải kiểm tra mapping đầy đủ và thử trên site test. Không dùng ZIP 8 CSV nguồn để thêm sản phẩm mới.

## Làm theo hai demo trong Sheet

| Demo | Nhập liên kết ở X/Y | Nội dung mong đợi |
| --- | --- | --- |
| `DEMO-DAO-001` | `block-zwilling-gourmet-1` / `block-zwilling-gourmet-3` | Dùng lại Story/Highlights Gourmet, không xuất lại block/item nguồn. |
| `DEMO-NOI-001` | `block-demo-noi-gang-story` / `block-demo-noi-gang-highlights` | Tạo hai block riêng; Story gồm banner + 3 thẻ; Highlights gồm ảnh lớn + 2 điểm. |

1. Xem hai dòng sản phẩm trong `Nhap san pham` và 8 dòng `Thong so` (4 thông số/SKU).
2. `Nhap FeatureBlocks` dòng 2–3 định nghĩa hai block mới của nồi. Highlights dùng ảnh chính tại đây.
3. `Nhap FeatureItems` dòng 2–5 thuộc Story: thứ tự 1 là banner; 2–4 là thẻ. Dòng 6–7 thuộc Highlights, X/Y lần lượt 35/40 và 65/60 (%).
4. Xuất toàn bộ demo sẽ có **2 Products, 2 ProductVariants, 2 FeatureBlocks, 6 FeatureItems**. Thông số được gộp thành JSON ở `ProductVariants.specs`. `color` ở Products lần lượt Đen/Đỏ.
5. Thử trên site test có cùng dữ liệu nguồn và ID; kiểm tra tên, SKU, màu, giá, tồn kho, thông số, banner/thẻ/hotspot trên desktop và mobile, cùng một sản phẩm cũ.
6. Khi nhập thật, xóa nội dung demo trong cả bốn tab nhập, giữ hàng tiêu đề và định dạng. Tạo mã nhóm/SKU/slug và ID block/item mới; thay nội dung bằng dữ liệu đã duyệt. Dùng lại block thì chỉ điền X/Y; tạo nội dung riêng thì thêm block/item.

Ảnh tính năng demo được tái sử dụng từ snapshot STAUB; nội dung, giá và thông số là minh họa. Tọa độ cần căn lại theo ảnh thực tế. Ảnh chính sản phẩm và link mua đang trống, cần bổ sung cho sản phẩm thật. `demo-input.json` lưu đúng bộ mẫu để kiểm thử, không phải công cụ ghi đè Sheet.

## Ẩn và hiện lại sản phẩm

Sau khi cập nhật `wix-pages/products-item.js` mới lên trang Product (Item) và Publish, sửa field **Products.status** trong Wix CMS:

- `active`: được hiển thị trên các danh sách, sản phẩm liên quan và trang chi tiết.
- `inactive`: ẩn khỏi các truy vấn danh sách/đề xuất; mở link chi tiết sẽ chuyển về `/products` trước khi nạp nội dung sản phẩm, biến thể và feature blocks.
- Trạng thái trống hoặc khác `active` cũng không được hiển thị. Giữ chính xác chữ thường `active` khi bật lại.

Giữ nguyên Products, ProductVariants và FeatureBlocks/FeatureItems để có thể hiện lại bằng cách đổi `status` thành `active`. Không cần sửa/xóa các block dùng chung. Công cụ xuất sản phẩm mới vẫn đặt `active`; không dùng lại CSV thêm mới để cập nhật trạng thái sản phẩm đã nhập.

Đây là quy tắc hiển thị của code, không phải quyền truy cập dữ liệu hay HTTP 404. Nếu cần gỡ item khỏi bản public hoặc kết quả tìm kiếm, kiểm tra thêm cơ chế Draft/Published và SEO của Wix; chuyển hướng phía trình duyệt không tự gỡ URL khỏi chỉ mục Google.

Thử một sản phẩm `inactive` ở danh mục, Related Products và link trực tiếp, rồi đổi lại `active` để kiểm tra khôi phục. Kiểm tra trên bản public sau khi thay đổi CMS đã có hiệu lực ở Live.

## Xuất từ Excel tải về

Tải Sheet bằng **Tệp → Tải xuống → Microsoft Excel (.xlsx)**, rồi chạy:

```sh
python3 tools/wix-product-sheet/export-xlsx.py '/đường/dẫn/nhap-san-pham.xlsx' --out /tmp/wix-new-products
```

Cần Python `openpyxl` và Node.js. Dùng cùng logic với Apps Script; xuất UTF-8 BOM, từ chối ghi đè thư mục có sẵn. Workbook cũ 23 cột và không có hai tab tính năng vẫn dùng được nếu không chọn nội dung mới.

## Snapshot và kiểm thử

8 tab nguồn đồng bộ từ `tools/backups/live-wix-2026-10-09-raw`: 172 Products, 236 ProductVariants, 3 Brands, 90 Categories, 27 Series, 59 FeatureBlocks, 241 FeatureItems, 3 Stores. Hai tab FeatureItemsWix/FeatureItemsKhachhang đã xóa và không còn được mã tham chiếu. Menu **Tải 8 CSV nguồn** chỉ xuất snapshot, không xuất các tab nhập.

```sh
node tools/wix-product-sheet/test-export.mjs
node tools/wix-product-sheet/test-features.mjs
node tools/wix-product-sheet/test-demo.mjs
node tools/wix-product-sheet/test-visibility.mjs
python3 tools/wix-product-sheet/test-cli.py
```

Hai bài kiểm thử Node mặc định đọc snapshot trên; có thể truyền đường dẫn thư mục CSV hoặc JSON làm đối số. Kiểm thử gồm nhóm SKU, color, reference, block/item mới, ID và thứ tự trùng, tọa độ, CSV Unicode/xuống dòng, XLSX → CSV, và chạy page code thật với API/dataset giả lập để kiểm tra ưu tiên block cùng fallback cũ.

Kiểm thử demo đọc CSV bằng Python CSV parser độc lập, kiểm tra ID mới không trùng snapshot, source không bị sửa, chạy page code thật với API giả lập và gọi template Story/Highlights thật: banner + 3 thẻ và 2 hotspot. Có thể truyền JSON đọc lại từ Sheet vào `test-demo.mjs` để kiểm tra dữ liệu sau khi ghi.

Đã kiểm tra dữ liệu, định dạng, phạm vi native table và dropdown qua Sheets API. Chưa kiểm tra giao diện bằng trình duyệt hoặc import vào Wix live. `prepare.py` là công cụ tái tạo workbook ban đầu từ snapshot cũ, không dùng cập nhật workbook hiện tại.
