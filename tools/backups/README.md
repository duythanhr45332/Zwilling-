# WIX CMS Data Backups & Formatting Log

## 1. Nguyên trạng bản Backup (Raw Snapshot)
- **Thư mục lưu trữ nguyên gốc:** `tools/backups/live-wix-2026-10-09-raw/`
- **Thời gian snapshot:** `2026-10-09`
- **Mô tả:** Chứa toàn bộ các file CSV nguyên bản vừa xuất trực tiếp từ Wix Studio CMS, giữ nguyên các cột hệ thống (`Created Date`, `Updated Date`, `Owner`, các cột URL động như `Products (Item)`, `Categories (Item)`).

### Danh mục số lượng bản ghi:
- **`Products.csv`:** 172 sản phẩm Master (Phương án B)
- **`ProductVariants.csv`:** 236 biến thể màu sắc & kích thước
- **`Categories.csv`:** 90 danh mục sản phẩm (Đã bổ sung đầy đủ link ảnh và mô tả từ Wix)
- **`Series.csv`:** 27 dòng sản phẩm (Đã bổ sung ảnh banner/thumbnail dòng sản phẩm)
- **`Brands.csv`:** 3 thương hiệu (ZWILLING, STAUB, MIYABI kèm logo chính hãng)
- **`Stores.csv`:** 3 showroom chính hãng (Crescent Mall, Estella Place, Lotte Liễu Giai)
- **`FeatureBlocks.csv`:** 59 khối tính năng
- **`FeatureItems.csv`:** 241 chi tiết điểm nhấn

---

## 2. Bản Format chuẩn hóa (Clean & Re-importable)
- **Thư mục sử dụng:**
  - `tools/live-wix-csv/`: Lưu trữ bản backup đã format sạch để tra cứu, lưu trữ.
  - `wix-csv/`: Dữ liệu chuẩn dùng cho build hệ thống, website và mock data.
- **Quy chuẩn format:**
  - Đặt `ID` làm cột đầu tiên, `title` làm cột thứ hai, theo đúng chuẩn CMS schema.
  - Loại bỏ các cột siêu dữ liệu Wix tự sinh (`Created Date`, `Updated Date`, `Owner`, dynamic URLs) để file có thể **Re-import vào Wix bất kỳ lúc nào mà không bị lỗi/cảnh báo**.
  - Chuẩn hóa mã hóa UTF-8, định dạng xuống dòng chuẩn Unix (`\n`), dấu nháy kép theo chuẩn RFC-4180.
  - Sắp xếp thứ tự bản ghi ổn định (theo `sortOrder`, `ID`, phân cấp danh mục).

---

## 3. Cách chạy lại script chuẩn hóa
Nếu sau này tải file mới từ Wix về, chỉ cần đặt vào `tools/backups/live-wix-YYYY-MM-DD-raw` hoặc `tools/live-wix-csv` và chạy:
```bash
python3 tools/format-wix-backup.py
node scripts/build-mock-data.mjs
npm run build
```
