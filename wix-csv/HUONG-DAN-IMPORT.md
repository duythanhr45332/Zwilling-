# Hướng dẫn import CSV vào Wix CMS

Làm lần lượt từ Bước 0 đến Bước 11. **Dừng lại ở các điểm "Kiểm tra"** nếu kết quả không đúng, đừng import tiếp.

Tên nút trong Wix có thể khác đôi chút tùy Wix Editor / Wix Studio và ngôn ngữ giao diện; dưới đây ghi theo giao diện tiếng Anh.

---

## Bước 0. Chuẩn bị

1. **Dữ liệu nguồn là thư mục `wix-csv/`.** Sửa trực tiếp trong các file CSV ở đây.
2. **Không mở rồi lưu file CSV bằng Excel.** Excel đổi mã hóa làm hỏng tiếng Việt và cắt chuỗi JSON. Muốn xem thì mở bằng VS Code.
3. **Bật Dev Mode (Velo)** trong editor, để thấy Collection ID, field key và chạy được đoạn kiểm tra ở Bước 11.
4. **Nếu site có bật Sandbox cho CMS**, import vào **Live** hoặc đồng bộ sandbox sang live sau khi xong.
5. **Hai điều không sửa được sau khi tạo:**
   - **Collection ID** phải đúng tuyệt đối như bảng dưới (phân biệt hoa thường), vì code Velo gọi đúng tên này.
   - **Field key** phải trùng tên cột CSV (ví dụ `minPrice`, `brandCategoryRootSlug`). Wix tạo field key từ tên field lúc tạo và không cho đổi. Tạo sai thì phải xóa field rồi tạo lại.

---

## Thứ tự import

Field Reference chỉ tạo được khi collection đích đã tồn tại, nên phải đi theo thứ tự này.

| Bước | Collection ID | File | Số item | Trỏ tới |
|---|---|---|---|---|
| 1 | `Brands` | `Brands.csv` | 3 | — |
| 2 | `Categories` | `Categories.csv` | 91 | `Categories` (cha) |
| 3 | `Series` | `Series.csv` | 31 | `Brands` |
| 4 | `Products` | `Products.csv` | 236 | `Brands`, `Series`, `Categories` |
| 5 | `ProductVariants` | `ProductVariants.csv` | 236 | `Products` |
| 6 | `FeatureBlocks` | `FeatureBlocks.csv` | 68 | — |
| 7 | `FeatureItems` | `FeatureItems.csv` | 236 | `FeatureBlocks` |
| 8 | `ProductFeatureBlocks` | *(không import, chỉ tạo field)* | 0 | `Products`, `FeatureBlocks` |
| 9 | `ExcelImportRows` | `ExcelImportRows.csv` *(tùy chọn)* | 236 | `ProductVariants` |

Không import `_page-blocks.csv`, `_images-manifest.csv`, `_report.txt`: đây là file tra cứu.

---

## Thao tác chung cho mỗi file

1. **Tạo collection:** vào **CMS** → **Create Collection** → **Start from scratch**. Nhập tên đúng cột *Collection ID* ở trên, rồi kiểm tra Collection ID Wix sinh ra có trùng không.
2. **Mở trình import:** mở collection vừa tạo → nút **⋯ / More Actions** → **Import** (CSV) → chọn file.
3. **Ghép cột với field:**
   - Cột **`ID`** → field hệ thống **ID**.
   - Cột **`title`** → field **Title** có sẵn.
   - Mỗi cột còn lại → **tạo field mới**, **tên field gõ đúng tên cột**, chọn **kiểu** theo bảng của bước đó.
   - Field **Reference** → chọn đúng **collection đích** trong bảng.
4. **Import**, rồi xem số item trong collection có khớp cột *Số item* không.

---

## Bước 1. `Brands`

| Cột | Kiểu field |
|---|---|
| `ID` | ID (hệ thống) |
| `title` | Title (có sẵn) |
| `slug` | Text |
| `description` | Text |
| `logo` | Image |
| `bannerImage` | Image |
| `sortOrder` | Number |
| `isActive` | Boolean |

> **Kiểm tra quan trọng nhất.** Mở collection, bật hiện cột **ID**. Item ZWILLING phải có ID **`brand-zwilling`**.
>
> Nếu Wix tự sinh ID khác (chuỗi ngẫu nhiên), **dừng lại**: mọi Reference ở các bước sau sẽ không khớp. Khi đó chuyển sang ghi dữ liệu bằng Velo `wixData.bulkSave`, không import CSV nữa.

## Bước 2. `Categories`

| Cột | Kiểu field | Ghi chú |
|---|---|---|
| `ID` | ID | |
| `title` | Title | |
| `slug` | Text | |
| `taxonomy` | Text | `product`, `brand`, `material` |
| `parent` | **Reference → `Categories`** | Trỏ về chính collection này |
| `path` | Text | |
| `depth` | Number | |
| `description` | Text | |
| `image` | Image | |
| `bannerImage` | Image | |
| `productCount` | Number | |
| `sortOrder` | Number | |
| `isActive` | Boolean | |

Nếu lúc import chưa chọn được Reference trỏ về chính `Categories` (collection chưa có field nào): tạo field `parent` kiểu Reference → `Categories` trong **Manage Fields** trước, rồi mới import và ghép cột `parent` vào field đó.

> **Kiểm tra:** item **Dao Santoku** (`cat-p-dao-bep--dao-santoku`) có `parent` hiện là **Dao Bếp**.

## Bước 3. `Series`

| Cột | Kiểu field |
|---|---|
| `ID` | ID |
| `title` | Title |
| `slug` | Text |
| `brand` | **Reference → `Brands`** |
| `description` | Text |
| `image` | Image |
| `bannerImage` | Image |
| `sortOrder` | Number |
| `isActive` | Boolean |

> **Kiểm tra:** series **ZWILLING PRO** có `brand` hiện là **ZWILLING**. Đúng thì Reference qua CSV hoạt động, các bước sau làm tương tự.

## Bước 4. `Products`

| Cột | Kiểu field | Ghi chú |
|---|---|---|
| `ID` | ID | |
| `title` | Title | |
| `slug` | Text | |
| `brand` | **Reference → `Brands`** | |
| `series` | **Reference → `Series`** | Trống với sản phẩm không có series |
| `category` | **Reference → `Categories`** | |
| `brandCategory` | **Reference → `Categories`** | |
| `materialCategory` | **Reference → `Categories`** | Trống ở đa số sản phẩm |
| `categoryPath` | Text | |
| `brandCategoryPath` | Text | |
| `brandCategoryRootSlug` | Text | |
| `displayCategory` | Text | |
| `minPrice` | Number | |
| `maxPrice` | Number | |
| `soldCount` | Number | |
| `labels` | Tags | Chuỗi JSON, ví dụ `["Bán chạy"]` |
| `status` | Text | |
| `mainImage` | Image | |
| `gallery` | Text | Các URL ảnh phụ, cách nhau bởi dấu `;` |

> **Kiểm tra:**
> - **Reference:** sản phẩm `prod-1002144` (MIYABI Santoku 18cm) có brand **MIYABI**, series **MIYABI KAIZEN II 5000FCD**, category **Dao Santoku**.
> - **Tags:** field `labels` của sản phẩm này là **một tag "Bán chạy"**. Nếu Wix hiện nguyên chuỗi `["Bán chạy"]` thành một tag, sửa tay 3 sản phẩm có nhãn (xem `_report.txt`); chỉ có 3 sản phẩm này có nhãn.

## Bước 5. `ProductVariants`

| Cột | Kiểu field | Ghi chú |
|---|---|---|
| `ID` | ID | |
| `title` | Title | |
| `sku` | Text | Text, không phải Number |
| `product` | **Reference → `Products`** | |
| `sortOrder` | Number | |
| `shortDescription` | Text | |
| `description` | Text | |
| `color` | Text | |
| `sizeLabel` | Text | |
| `price` | Number | |
| `compareAtPrice` | Number | |
| `shopeeUrl` | URL | |
| `tiktokUrl` | URL | |
| `sourceUrl` | URL | |
| `stock` | Number | |
| `isDefault` | Boolean | |
| `mainImage` | Image | Ảnh chính của SKU |
| `gallery` | Text | Các URL ảnh phụ, cách nhau bởi dấu `;` |
| `specs` | Array | Chuỗi JSON |

> **Kiểm tra:**
> - **`specs`:** `sku-1002144` có `specs` là danh sách thông số (Xuất xứ: Nhật Bản…), không phải một chuỗi dài.
> - **`sku`:** `40508-026` giữ nguyên dấu gạch.

## Bước 6. `FeatureBlocks`

| Cột | Kiểu field |
|---|---|
| `ID` | ID |
| `title` | Title |
| `component` | Text |
| `heading` | Text |
| `body` | Text |
| `ctaLabel` | Text |
| `image` | Image |
| `sourceSheet` | Text |
| `sourceTitle` | Text |
| `internalNote` | Text |

## Bước 7. `FeatureItems`

| Cột | Kiểu field | Ghi chú |
|---|---|---|
| `ID` | ID | |
| `title` | Title | |
| `block` | **Reference → `FeatureBlocks`** | |
| `position` | Number | Thứ tự hiển thị |
| `body` | Text | Nội dung chi tiết |
| `image` | Image | Ảnh minh họa card (nếu có) |
| `coordX` | Number | Tọa độ X trên ảnh (0-100%, dùng cho Hotspot point) |
| `coordY` | Number | Tọa độ Y trên ảnh (0-100%, dùng cho Hotspot point) |

> **Kiểm tra:** `block-zwilling-pro-2` có các item với `coordX`, `coordY` hiển thị các dấu tròn tương ứng trên ảnh dao. Có thể dùng công cụ `tools/hotspot-tool.html` để gắn điểm trực quan và tự động cập nhật.

## Bước 8. `ProductFeatureBlocks` (không import)

File CSV chỉ có header, nên chỉ tạo collection và field trong **Manage Fields**:

| Field key | Kiểu field |
|---|---|
| `title` | Title (có sẵn) |
| `product` | **Reference → `Products`** |
| `block` | **Reference → `FeatureBlocks`** |
| `variant` | Text |
| `position` | Number |

Dữ liệu điền sau, khi đã có danh sách SKU dùng từng trang A–H.

## Bước 9. `ExcelImportRows` (tùy chọn)

Dòng Excel gốc, để tra cứu. File lớn nhất (khoảng 1,5 MB), có thể bỏ qua nếu không cần.

| Cột | Kiểu field |
|---|---|
| `ID` | ID |
| `title` | Title |
| `sheetName` | Text |
| `rowNo` | Number |
| `raw` | Object |
| `variant` | **Reference → `ProductVariants`** |

## Bước 10. Quyền truy cập

Với **mọi collection** ở trên: mở collection → **⋯** → **Permissions & Privacy**:

| Quyền | Ai |
|---|---|
| Xem nội dung (Read) | **Anyone** |
| Thêm / sửa / xóa | **Admin** |

Riêng `ExcelImportRows` để quyền xem là **Admin**, vì chỉ dùng nội bộ.

## Bước 11. Kiểm tra cuối bằng Velo

1. Tạo file **`backend/import-check.web.js`** và dán đoạn dưới vào:

```js
import { Permissions, webMethod } from 'wix-web-module';
import wixData from 'wix-data';

const EXPECTED = {
  Brands: 3, Categories: 91, Series: 31, Products: 236,
  ProductVariants: 236, FeatureBlocks: 68, FeatureItems: 236,
};

export const checkImport = webMethod(Permissions.Admin, async () => {
  const counts = {};
  for (const [collection, expected] of Object.entries(EXPECTED)) {
    const actual = await wixData.query(collection).count();
    counts[collection] = { expected, actual, ok: actual === expected };
  }

  const result = await wixData.query('Products')
    .eq('_id', 'prod-1002144')
    .include('brand', 'series', 'category')
    .find();
  const product = result.items[0];

  return {
    counts,
    sample: product
      ? { brand: product.brand?.title, series: product.series?.title, category: product.category?.title }
      : 'Không thấy prod-1002144: ID không được giữ nguyên khi import',
  };
});
```

2. Mở một trang bất kỳ, thêm vào page code rồi bấm **Preview** và xem Console:

```js
import { checkImport } from 'backend/import-check.web';

$w.onReady(async () => {
  console.log(JSON.stringify(await checkImport(), null, 2));
});
```

3. **Đạt khi:**
   - mọi `ok` là `true`
   - `sample` ra `MIYABI` / `MIYABI KAIZEN II 5000FCD` / `Dao Santoku`

   Kiểm xong thì xóa đoạn page code này.

---

## Gặp lỗi thì làm gì

| Hiện tượng | Nguyên nhân thường gặp | Cách xử lý |
|---|---|---|
| ID sau import khác ID trong CSV | Trình import không giữ ID tự đặt | Dừng import CSV; ghi dữ liệu bằng Velo `bulkSave` |
| Reference trống | Field Reference trỏ nhầm collection, hoặc collection đích chưa import | Kiểm tra lại collection đích; import lại file |
| Tiếng Việt thành ký tự lạ | File CSV đã bị mở và lưu bằng Excel | Khôi phục file CSV rồi import lại; chỉ mở CSV bằng VS Code |
| Field key khác tên cột (ví dụ `minprice`) | Gõ sai tên lúc tạo field | Xóa field, tạo lại đúng tên, import lại cột đó |
| `specs` / `raw` hiện dạng chuỗi hoặc báo lỗi | Trình import không nhận JSON cho Array / Object | Ghi riêng các field này bằng Velo `bulkSave` |
| Link bị trống | Ô trong Excel không phải link (ví dụ "Không thấy") | Xem `_report.txt`, sửa trong Excel rồi chạy lại script |
| Import lại bị trùng item | Cột `ID` chưa ghép vào field ID | Xóa item trùng; lần sau ghép `ID` → ID để Wix cập nhật item cũ |
