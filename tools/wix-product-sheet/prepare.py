#!/usr/bin/env python3
"""Prepare bounded Google Sheets REST batches from the CSV snapshot; no cloud writes."""
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = Path('/tmp/wix-product-sheet')
OUT.mkdir(exist_ok=True)
NAMES = ['Brands', 'Categories', 'Series', 'Products', 'ProductVariants', 'FeatureBlocks',
         'FeatureItems', 'FeatureItemsWix', 'FeatureItemsKhachhang', 'Stores']
INPUT = ['Mã nhóm sản phẩm *', 'Tên sản phẩm *', 'SKU *', 'Tên biến thể', 'Thương hiệu *',
         'Dòng sản phẩm', 'Danh mục sản phẩm *', 'Danh mục thương hiệu', 'Danh mục chất liệu',
         'Giá bán *', 'Giá gốc', 'Tồn kho *', 'Mô tả ngắn', 'Mô tả chi tiết', 'Màu sắc',
         'Kích thước', 'Ảnh chính', 'Ảnh phụ', 'Nhãn', 'Link Shopee', 'Link TikTok', 'Link nguồn', 'Slug']
SPEC = ['SKU *', 'Nhóm thông số *', 'Tên thông số *', 'Giá trị *']
source = {}
for name in NAMES:
    with (ROOT / 'tools/live-wix-csv' / (name + '.csv')).open(encoding='utf-8-sig', newline='') as f:
        source[name] = list(csv.reader(f))
    assert all(len(r) == len(source[name][0]) for r in source[name])
(OUT / 'source.json').write_text(json.dumps(source, ensure_ascii=False))

guide = [
    ['HƯỚNG DẪN NHẬP SẢN PHẨM WIX', 'Nội dung'],
    ['Bắt đầu', 'Khách chỉ nhập tab Nhap san pham và Thong so. Các tab tên tiếng Anh là dữ liệu nguồn để tra cứu.'],
    ['Phạm vi', 'Thêm sản phẩm mới và nhiều biến thể/SKU cho sản phẩm mới. Không dùng mẫu này để sửa sản phẩm cũ hoặc thêm SKU vào sản phẩm cũ.'],
    ['1. Nhập sản phẩm', 'Mỗi SKU một dòng. Các cột có * bắt buộc. Mã nhóm giống nhau sẽ tạo chung một sản phẩm. SKU phải khác nhau.'],
    ['Ví dụ cách nhập', 'Mã nhóm: dao-moi-2026 | Tên: Dao mới | SKU: 001-NEW | Chọn thương hiệu/danh mục | Giá: 500000 | Tồn kho: 10. Đây chỉ là ví dụ, chưa có dòng mẫu để xuất nhầm.'],
    ['2. Chọn danh mục', 'Chọn tên kèm [ID] trong danh sách. Dòng sản phẩm phải thuộc đúng thương hiệu. Nếu cần thương hiệu/danh mục/dòng mới, nhờ quản trị tạo trên Wix và cập nhật dữ liệu tra cứu trước.'],
    ['3. Nhập thông số', 'Trong tab Thong so: mỗi thông số một dòng gồm SKU, nhóm (ví dụ Thông số kỹ thuật), tên (ví dụ Chất liệu), giá trị (ví dụ Thép không gỉ).'],
    ['4. Kiểm tra', 'Sau khi quản trị cài Apps Script một lần, tải lại Sheet, chọn Wix CSV → Kiểm tra sản phẩm mới. Lỗi sẽ ghi rõ số dòng.'],
    ['5. Xuất CSV', 'Chọn Wix CSV → Tải ZIP CSV sản phẩm mới. Bấm tải trong hộp thoại rồi giải nén. Chỉ có dữ liệu tab nhập mới, không trộn với sản phẩm cũ.'],
    ['6. Import Wix', 'Import Products.csv vào collection Products trước, sau đó ProductVariants.csv vào ProductVariants. Map ID vào trường hệ thống ID và reference vào đúng trường liên kết. Thử 1–2 sản phẩm trước khi nhập cả lô.'],
    ['Sau khi import thành công', 'Quản trị cập nhật các tab nguồn từ bản xuất Wix mới rồi lưu trữ/xóa các dòng đã import trong 2 tab nhập. File chỉ kiểm tra trùng với snapshot hiện có, không tự đọc dữ liệu Wix trực tiếp.'],
    ['SKU và mã nhóm', 'Định dạng văn bản để giữ số 0 đầu. Chỉ dùng chữ không dấu, số, dấu - hoặc _. Công cụ tự tạo ID prod-<mã nhóm viết thường> và sku-<SKU viết thường>.'],
    ['Nhiều biến thể', 'Các SKU cùng nhóm phải có cùng tên sản phẩm, thương hiệu, dòng, danh mục, slug và nhãn. SKU xuất hiện đầu tiên là biến thể mặc định; ảnh của SKU đầu tiên dùng cho sản phẩm.'],
    ['Giá và tồn kho', 'Số nguyên không âm, không nhập đ/ký hiệu tiền hoặc dấu phân cách hàng nghìn. Giá gốc có thể trống; nếu nhập thì không nhỏ hơn giá bán. Min/max giá tự tính theo các SKU.'],
    ['Ảnh chính', 'Để trống để gắn sau, hoặc dùng URI wix:image://v1/... lấy từ Wix Media/CSV xuất Wix. Link Drive, đường dẫn máy và ảnh dán vào ô không được chuyển tự động.'],
    ['Ảnh phụ', 'Mỗi URI wix:image://v1/... một dòng hoặc ngăn bằng dấu ;. Công cụ tạo JSON gallery theo cấu trúc CSV nguồn. Kiểm tra ánh xạ Media Gallery khi import Wix.'],
    ['Nhãn và mô tả', 'Nhãn cách nhau bằng dấu ;. Mô tả được giữ dấu tiếng Việt và xuống dòng. Công cụ tự đóng gói labels/specs/gallery dưới dạng JSON.'],
    ['Slug', 'Có thể để trống để tạo từ tên. Nếu nhập, chỉ dùng chữ thường không dấu, số và dấu -. Công cụ chặn slug trùng.'],
    ['Trạng thái', 'Sản phẩm mới xuất status=active, soldCount=0; isDefault=true cho SKU đầu tiên. Kiểm tra nội dung trước khi import.'],
    ['Các tab nguồn', 'Giữ nguyên toàn bộ cột, thứ tự và nội dung của 10 CSV. Không đổi tên tab hoặc hàng tiêu đề. Đã có 236 sản phẩm và 236 biến thể.'],
    ['Ba bản FeatureItems', 'FeatureItems, FeatureItemsWix, FeatureItemsKhachhang được giữ riêng, không gộp. Mã build hiện ưu tiên FeatureItemsWix. Quản trị chọn đúng bản khi import; không import cả ba vào cùng collection.'],
    ['Xuất dữ liệu nguồn', 'Wix CSV → Tải 10 CSV nguồn (quản trị): xuất từng tab nguồn về CSV giữ nguyên header. Không bao gồm tab nhập mới. Đây là bản sao dữ liệu, không phải danh sách sản phẩm mới.'],
    ['Cài menu — quản trị làm một lần', 'Mở liên kết mã ở dòng dưới, tải file Code.gs và mở bằng trình soạn văn bản. Trong Sheet: Tiện ích mở rộng → Apps Script → thay toàn bộ Code.gs bằng mã đã tải → Lưu → chạy onOpen và cấp quyền cho file hiện tại → tải lại Sheet.'],
    ['Mã Apps Script', 'SCRIPT_URL'],
    ['Quyền của công cụ', 'Mã chỉ đọc spreadsheet hiện tại và tạo ZIP trong hộp thoại trình duyệt. Không gửi dữ liệu ra ngoài, không ghi vào Wix và không tạo file trong Drive. Mỗi người dùng có thể cần cấp quyền khi chạy lần đầu.'],
    ['Tình trạng cài đặt', 'Mã đã được cung cấp và kiểm thử logic chuyển đổi; chưa gắn vào Apps Script của file. Menu chỉ xuất hiện sau bước cài một lần ở trên.'],
    ['Giới hạn mẫu nhập', 'Đã chuẩn bị 500 dòng SKU và 1.000 dòng thông số. Khi cần thêm, mở rộng bảng nhập/định dạng văn bản để giữ SKU và kiểm tra dropdown.'],
    ['Khi chưa cài menu xuất', 'Tệp → Tải xuống → Microsoft Excel (.xlsx), gửi file cho người quản trị chạy công cụ export-xlsx.py trong dự án. Khách vẫn nhập trên Google Sheets.'],
    ['Cập nhật danh sách chọn', 'Dropdown được tạo từ CSV ban đầu. Nếu thêm thương hiệu/danh mục/dòng mới trên Wix, quản trị cập nhật tab nguồn và bổ sung lựa chọn [ID] tương ứng trong dropdown.'],
    ['Nguồn hướng dẫn Wix', 'https://support.wix.com/en/article/importing-data-to-a-database-collection'],
]

def records(name):
    return [dict(zip(source[name][0], r)) for r in source[name][1:]]

options = {4: [f"{r['Title']} [{r['ID']}]" for r in records('Brands')],
           5: [f"{r['Title']} [{r['ID']}]" for r in records('Series')]}
for col, taxonomy in [(6, 'product'), (7, 'brand'), (8, 'material')]:
    options[col] = [f"{r['Title']} · {r['path']} [{r['ID']}]" for r in records('Categories') if r['taxonomy'] == taxonomy]

sheets = [('Huong dan', 100, guide, len(guide), 2),
          ('Nhap san pham', 101, [INPUT], 501, len(INPUT)),
          ('Thong so', 102, [SPEC], 1001, len(SPEC))]
sheets += [(n, 110 + i, source[n], len(source[n]), len(source[n][0])) for i, n in enumerate(NAMES)]
structure = []
for name, sid, rows, count, width in sheets:
    structure.append({'addSheet': {'properties': {'sheetId': sid, 'title': name,
                      'gridProperties': {'rowCount': max(count + 10, 100), 'columnCount': max(width, 26),
                                         'frozenRowCount': 1, 'frozenColumnCount': 0 if sid == 100 else 1}}}})
(OUT / 'structure.json').write_text(json.dumps(structure))
manifest = []
for name, sid, rows, count, width in sheets:
    for start in range(0, len(rows), 15):
        chunk = rows[start:start + 15]
        requests = [{'updateCells': {'range': {'sheetId': sid, 'startRowIndex': start, 'endRowIndex': start + len(chunk),
                      'startColumnIndex': 0, 'endColumnIndex': width},
                      'rows': [{'values': [{'userEnteredValue': {'stringValue': v}} for v in r]} for r in chunk],
                      'fields': 'userEnteredValue'}}]
        path = OUT / f'data-{sid}-{start:04}.json'
        path.write_text(json.dumps(requests, ensure_ascii=False))
        manifest.append(str(path))
(OUT / 'manifest.json').write_text(json.dumps(manifest))
fmt = []
for name, sid, rows, count, width in sheets:
    area = {'sheetId': sid, 'startRowIndex': 0, 'endRowIndex': count, 'startColumnIndex': 0, 'endColumnIndex': width}
    fmt += [
        {'repeatCell': {'range': area, 'cell': {'userEnteredFormat': {'numberFormat': {'type': 'TEXT'},
          'textFormat': {'fontFamily': 'Arial', 'fontSize': 10}, 'verticalAlignment': 'TOP',
          'wrapStrategy': 'WRAP' if sid < 103 else 'CLIP'}}, 'fields': 'userEnteredFormat'}},
        {'repeatCell': {'range': dict(area, endRowIndex=1), 'cell': {'userEnteredFormat': {
          'backgroundColor': {'red': .94, 'green': .94, 'blue': .94}, 'textFormat': {'bold': True}, 'wrapStrategy': 'WRAP'}},
          'fields': 'userEnteredFormat(backgroundColor,textFormat.bold,wrapStrategy)'}},
        {'updateDimensionProperties': {'range': {'sheetId': sid, 'dimension': 'COLUMNS', 'startIndex': 0, 'endIndex': width},
          'properties': {'pixelSize': 190}, 'fields': 'pixelSize'}},
        {'updateDimensionProperties': {'range': {'sheetId': sid, 'dimension': 'ROWS', 'startIndex': 0, 'endIndex': 1},
          'properties': {'pixelSize': 46}, 'fields': 'pixelSize'}}]
    if sid == 100:
        fmt.append({'updateDimensionProperties': {'range': {'sheetId': sid, 'dimension': 'COLUMNS', 'startIndex': 1, 'endIndex': 2}, 'properties': {'pixelSize': 860}, 'fields': 'pixelSize'}})
    elif sid in (101, 102):
        props = []
        for i, header in enumerate(rows[0]):
            prop = {'columnIndex': i, 'columnName': header, 'columnType': 'TEXT'}
            if sid == 101 and i in options:
                prop.update(columnType='DROPDOWN', dataValidationRule={'condition': {
                    'type': 'ONE_OF_LIST', 'values': [{'userEnteredValue': v} for v in options[i]]}})
            props.append(prop)
        fmt.append({'addTable': {'table': {'name': 'SanPhamMoi' if sid == 101 else 'ThongSoMoi',
            'range': area, 'columnProperties': props,
            'rowsProperties': {'headerColorStyle': {'rgbColor': {'red': .94, 'green': .94, 'blue': .94}},
                               'firstBandColorStyle': {'rgbColor': {'red': 1, 'green': 1, 'blue': 1}},
                               'secondBandColorStyle': {'rgbColor': {'red': 1, 'green': 1, 'blue': 1}}}}}})
        fmt.append({'repeatCell': {'range': dict(area, endRowIndex=1),
            'cell': {'userEnteredFormat': {'textFormat': {'foregroundColorStyle': {'rgbColor': {'red': 0, 'green': 0, 'blue': 0}}}}},
            'fields': 'userEnteredFormat.textFormat.foregroundColorStyle'}})
        if sid == 101:
            for a, b in [(4, 9), (12, 14), (16, 18)]:
                fmt.append({'updateDimensionProperties': {'range': {'sheetId': sid, 'dimension': 'COLUMNS', 'startIndex': a, 'endIndex': b}, 'properties': {'pixelSize': 310}, 'fields': 'pixelSize'}})
    else:
        fmt.append({'setBasicFilter': {'filter': {'range': area}}})
        fmt.append({'addProtectedRange': {'protectedRange': {'range': area, 'warningOnly': True,
                    'description': 'Dữ liệu nguồn CSV. Chỉ quản trị cập nhật sau khi đồng bộ Wix.'}}})
    fmt.append({'addProtectedRange': {'protectedRange': {'range': dict(area, endRowIndex=1),
                  'warningOnly': True, 'description': 'Không đổi tên hoặc thứ tự tiêu đề; công cụ xuất dùng cấu trúc này.'}}})
(OUT / 'format.json').write_text(json.dumps(fmt, ensure_ascii=False))
(OUT / 'sheets.json').write_text(json.dumps([{'name': n, 'id': i, 'rows': len(r), 'columns': w} for n, i, r, c, w in sheets]))
print(f'Prepared {len(sheets)} tabs, {len(manifest)} bounded data batches in {OUT}')
