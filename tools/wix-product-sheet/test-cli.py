"""Exercise the downloaded-XLSX path against the current eight-collection snapshot."""
import csv
import subprocess
import tempfile
from pathlib import Path
from openpyxl import Workbook

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
with tempfile.TemporaryDirectory(prefix='wix-sheet-cli-test-') as tmp:
    temp = Path(tmp)
    book = Workbook()
    book.remove(book.active)
    for source in (ROOT / 'tools/backups/live-wix-2026-10-09-raw').glob('*.csv'):
        sheet = book.create_sheet(source.stem)
        for row in csv.reader(source.open(encoding='utf-8-sig', newline='')):
            sheet.append(row)
    # Read the canonical headers directly from the same Apps Script used by the CLI.
    import json
    headers = json.loads(subprocess.check_output(['node', '-e',
        "const fs=require('fs'),vm=require('vm'),c=vm.createContext({});vm.runInContext(fs.readFileSync(process.argv[1],'utf8')+';this.h=[HEADERS,SPEC_HEADERS,BLOCK_HEADERS,ITEM_HEADERS]',c);process.stdout.write(JSON.stringify(c.h));",
        str(HERE / 'Code.gs')], text=True))
    for name, header in zip(['Nhap san pham','Thong so','Nhap FeatureBlocks','Nhap FeatureItems'], headers):
        book.create_sheet(name).append(header)
    product = {'Mã nhóm sản phẩm *':'cli-feature-test','Tên sản phẩm *':'Dao "Mới", đẹp','SKU *':'000-CLI-1',
               'Thương hiệu *':'brand-zwilling','Danh mục sản phẩm *':'cat-p-dao-bep--dao-dau-bep',
               'Giá bán *':'1000','Tồn kho *':'2','Màu sắc':'Đen','Story block (ID)':'block-cli-story'}
    book['Nhap san pham'].append([product.get(h,'') for h in headers[0]])
    book['Nhap FeatureBlocks'].append(['block-cli-story','Story thử','story','','','','','','',''])
    book['Nhap FeatureItems'].append(['item-cli-story','block-cli-story','1','Giới thiệu','Dòng 1\nDòng 2, "quote"','','',''])
    book.save(temp/'input.xlsx')
    command=['python3',str(HERE/'export-xlsx.py'),str(temp/'input.xlsx'),'--out',str(temp/'out')]
    subprocess.run(command,check=True,capture_output=True,text=True)
    assert {p.name for p in (temp/'out').glob('*.csv')} == {'Products.csv','ProductVariants.csv','FeatureBlocks.csv','FeatureItems.csv'}
    def read(name):
        return list(csv.DictReader((temp/'out'/name).open(encoding='utf-8-sig',newline='')))
    assert read('Products.csv')[0]['storyBlock']=='block-cli-story'
    assert read('Products.csv')[0]['color']=='Đen'
    assert read('ProductVariants.csv')[0]['sku']=='000-CLI-1'
    assert read('FeatureItems.csv')[0]['body']=='Dòng 1\nDòng 2, "quote"'
    assert subprocess.run(command,capture_output=True).returncode != 0
    print('PASS: XLSX CLI produces four linked CSVs, preserves text/zeros, refuses overwrite.')
