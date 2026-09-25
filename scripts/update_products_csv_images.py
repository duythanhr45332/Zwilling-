import os
import csv
import urllib.parse

def generate_csv_with_images(base_url, output_csv=None):
    """
    Cập nhật cột mainImage và gallery trong Products.csv dựa trên thư mục Dao_compressed
    base_url: ví dụ 'https://raw.githubusercontent.com/user/repo/main/wix-csv/Dao_compressed'
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    image_dir = os.path.join(base_dir, 'wix-csv', 'Dao_compressed')
    input_csv = os.path.join(base_dir, 'wix-csv', 'Products.csv')
    
    if output_csv is None:
        output_csv = input_csv

    # Quét thư mục ảnh
    files = sorted(os.listdir(image_dir))
    sku_map = {}
    for f in files:
        if f.endswith(('.jpg', '.jpeg', '.png', '.webp')) and '_' in f:
            sku = f.split('_')[0].strip()
            if sku not in sku_map:
                sku_map[sku] = {'main': None, 'gallery': []}
            
            # Encode URL nếu tên file có dấu cách
            encoded_name = urllib.parse.quote(f)
            file_url = f"{base_url.rstrip('/')}/{encoded_name}"
            
            if 'Main Image' in f:
                sku_map[sku]['main'] = file_url
            elif 'Gallery' in f:
                sku_map[sku]['gallery'].append((f, file_url))

    # Sắp xếp gallery theo thứ tự tên file (001, 002...)
    for sku in sku_map:
        sku_map[sku]['gallery'].sort(key=lambda x: x[0])

    # Đọc Products.csv và cập nhật
    with open(input_csv, mode='r', encoding='utf-8') as f:
        reader = list(csv.DictReader(f))
        fieldnames = reader[0].keys() if reader else []

    updated_count = 0
    for row in reader:
        pid = row.get('ID', '').replace('prod-', '').strip()
        if pid in sku_map:
            data = sku_map[pid]
            if data['main']:
                row['mainImage'] = data['main']
            if data['gallery']:
                row['gallery'] = ';'.join([item[1] for item in data['gallery']])
            updated_count += 1

    with open(output_csv, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(reader)

    print(f"Thành công! Đã cập nhật ảnh cho {updated_count} sản phẩm trong {output_csv}")

if __name__ == '__main__':
    import sys
    url = sys.argv[1] if len(sys.argv) > 1 else 'https://YOUR_DOMAIN_OR_GITHUB_RAW/Dao_compressed'
    generate_csv_with_images(url)
