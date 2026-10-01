#!/usr/bin/env python3
"""Convert File > Download > Microsoft Excel from the supplied Sheet into Wix CSV.

Requires Python openpyxl and Node.js. Reuses the exact Apps Script conversion logic.
Creates a new output directory and never replaces existing exports.
"""
import argparse
import json
from pathlib import Path
import subprocess
import tempfile

from openpyxl import load_workbook

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('workbook', type=Path)
parser.add_argument('--out', required=True, type=Path)
args = parser.parse_args()
if args.out.exists():
    parser.error('Thư mục xuất đã tồn tại. Chọn đường dẫn mới để không ghi đè CSV.')
book = load_workbook(args.workbook, data_only=False, read_only=True)

def read(name):
    sheet = book[name]
    rows = []
    for row in sheet.iter_rows():
        if any(c.data_type == 'f' for c in row):
            raise ValueError(f'{name}: không dùng công thức trong vùng dữ liệu nhập/nguồn.')
        rows.append(['' if c.value is None else str(c.value) for c in row])
    while rows and not any(rows[-1]):
        rows.pop()
    width = max(i + 1 for i, v in enumerate(rows[0]) if v)
    if any(any(r[width:]) for r in rows):
        raise ValueError(f'{name}: có dữ liệu ngoài cột tiêu đề.')
    return [r[:width] for r in rows]

names = ['Brands', 'Categories', 'Series', 'Products', 'ProductVariants', 'FeatureBlocks',
         'FeatureItems', 'FeatureItemsWix', 'FeatureItemsKhachhang', 'Stores']
payload = {'input': read('Nhap san pham'), 'specs': read('Thong so'),
           'source': {name: read(name) for name in names}}
runner = """
const fs = require('fs'), vm = require('vm');
const sandbox = vm.createContext({});
vm.runInContext(fs.readFileSync(process.argv[1], 'utf8') + '\\nthis.build = buildNewProducts;', sandbox);
const p = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
try { process.stdout.write(JSON.stringify(sandbox.build(p.input, p.specs, p.source))); }
catch (e) { process.stderr.write(e.message + '\\n'); process.exit(1); }
"""
with tempfile.TemporaryDirectory(prefix='wix-export-') as tmp:
    data = Path(tmp) / 'input.json'
    data.write_text(json.dumps(payload, ensure_ascii=False), encoding='utf-8')
    result = subprocess.run(['node', '-e', runner, str(Path(__file__).with_name('Code.gs')), str(data)],
                            capture_output=True, text=True)
if result.returncode:
    parser.exit(1, result.stderr)
output = json.loads(result.stdout)
args.out.mkdir(parents=True)
for name, content in output['files'].items():
    with (args.out / name).open('w', encoding='utf-8', newline='') as file:
        file.write(content)
print(f"Đã xuất {len(output['products'])} sản phẩm, {len(output['variants'])} SKU → {args.out}")
