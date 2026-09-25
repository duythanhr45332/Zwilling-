#!/usr/bin/env python3
"""
generate_feature_csv.py
Standardizes FeatureBlocks, FeatureItems, and _page-blocks.csv
so that Component 1 ALWAYS follows the unified structure:
  position = 1: Story banner (Heading + Body)
  position = 2: 3-Column Card 1 (Title + Body)
  position = 3: 3-Column Card 2 (Title + Body)
  position = 4: 3-Column Card 3 (Title + Body)
Component 2 (highlights):
  position = 1..N: Accordion / Anatomy items

Eliminates orphaned 'intro' blocks and ensures all block IDs remain consistent.
"""

import csv
import os
import shutil

CSV_DIR = 'wix-csv'

# Backup current CSVs first
for fname in ['FeatureBlocks.csv', 'FeatureItems.csv', '_page-blocks.csv']:
    src = os.path.join(CSV_DIR, fname)
    bak = os.path.join(CSV_DIR, f'{fname}.bak')
    if os.path.exists(src) and not os.path.exists(bak):
        shutil.copy2(src, bak)
        print(f"Backed up {src} -> {bak}")

# Load current data
with open(os.path.join(CSV_DIR, 'FeatureBlocks.csv.bak'), 'r', encoding='utf-8') as f:
    blocks = list(csv.DictReader(f))

with open(os.path.join(CSV_DIR, 'FeatureItems.csv.bak'), 'r', encoding='utf-8') as f:
    items = list(csv.DictReader(f))

with open(os.path.join(CSV_DIR, '_page-blocks.csv.bak'), 'r', encoding='utf-8') as f:
    pages = list(csv.DictReader(f))

blocks_by_id = {b['ID']: b for b in blocks}
items_by_block = {}
for it in items:
    b = it['block']
    if b not in items_by_block:
        items_by_block[b] = []
    items_by_block[b].append(it)

# Blocks to remove (the orphaned intro blocks or absorbed blocks)
REMOVE_BLOCK_IDS = {
    'block-zwilling-tanrei-2',
    'block-miyabi-kaizen-ii-5000fcd-2',
    'block-zwilling-gourmet-2',
    'block-milano-2',
    'block-madura-2',
    'block-dinnerware-2',
    'block-may-hut-chan-khong-2',
    'block-bo-hop-cube-hut-chan-khong-2',
    'block-keo-zwilling-twin-select-keo-da-nang-2',
}

# New items dictionary for story blocks that need restructure
# Key: blockId, Value: list of 4 item dicts
RESTRUCTURED_STORY_ITEMS = {}

# 1. ZWILLING FOURSTAR
fourstar_cur = items_by_block['block-zwilling-fourstar-1']
RESTRUCTURED_STORY_ITEMS['block-zwilling-fourstar-1'] = [
    {
        'ID': 'block-zwilling-fourstar-1-item-1',
        'title': fourstar_cur[3]['title'],  # ZWILLING FOUR STAR: SẮC BÉN VÀ CHÍNH XÁC VƯỢT THỜI GIAN
        'block': 'block-zwilling-fourstar-1',
        'position': '1',
        'body': fourstar_cur[3]['body'],
        'image': ''
    },
    {
        'ID': 'block-zwilling-fourstar-1-item-2',
        'title': fourstar_cur[0]['title'],  # CHẾ TÁC TẠI ĐỨC
        'block': 'block-zwilling-fourstar-1',
        'position': '2',
        'body': fourstar_cur[0]['body'],
        'image': ''
    },
    {
        'ID': 'block-zwilling-fourstar-1-item-3',
        'title': fourstar_cur[1]['title'],  # DẤU ẤN CỦA KỸ NGHỆ RÈN DAO
        'block': 'block-zwilling-fourstar-1',
        'position': '3',
        'body': fourstar_cur[1]['body'],
        'image': ''
    },
    {
        'ID': 'block-zwilling-fourstar-1-item-4',
        'title': fourstar_cur[2]['title'],  # THOẢI MÁI VÀ AN TOÀN KHI SỬ DỤNG
        'block': 'block-zwilling-fourstar-1',
        'position': '4',
        'body': fourstar_cur[2]['body'],
        'image': ''
    }
]

# 2. ZWILLING TANREI
tanrei_cur = items_by_block['block-zwilling-tanrei-1']
RESTRUCTURED_STORY_ITEMS['block-zwilling-tanrei-1'] = [
    {
        'ID': 'block-zwilling-tanrei-1-item-1',
        'title': 'ZWILLING TANREI: TẦM CAO MỚI CỦA THÉP DAMASCUS',
        'block': 'block-zwilling-tanrei-1',
        'position': '1',
        'body': 'ZWILLING TANREI kết hợp độ chính xác của nghệ thuật chế tác dao Nhật Bản cùng chất lượng kỹ thuật chuẩn Đức. Sự giao thoa này tạo nên một tuyệt tác vừa đạt độ sắc bén vượt trội, vừa sở hữu thiết kế Damascus đầy ấn tượng.',
        'image': ''
    },
    {
        'ID': 'block-zwilling-tanrei-1-item-2',
        'title': tanrei_cur[0]['title'],  # CHẾ TÁC TẠI SEKI
        'block': 'block-zwilling-tanrei-1',
        'position': '2',
        'body': tanrei_cur[0]['body'],
        'image': ''
    },
    {
        'ID': 'block-zwilling-tanrei-1-item-3',
        'title': tanrei_cur[1]['title'],  # VÂN DAMASCUS ĐỘC BẢN
        'block': 'block-zwilling-tanrei-1',
        'position': '3',
        'body': tanrei_cur[1]['body'],
        'image': ''
    },
    {
        'ID': 'block-zwilling-tanrei-1-item-4',
        'title': tanrei_cur[2]['title'],  # ĐỘ CỨNG VƯỢT TRỘI, SẮC BÉN ẤN TƯỢNG
        'block': 'block-zwilling-tanrei-1',
        'position': '4',
        'body': tanrei_cur[2]['body'],
        'image': ''
    }
]

# 3. MIYABI KAIZEN II 5000FCD
miyabi_cur = items_by_block['block-miyabi-kaizen-ii-5000fcd-1']
RESTRUCTURED_STORY_ITEMS['block-miyabi-kaizen-ii-5000fcd-1'] = [
    {
        'ID': 'block-miyabi-kaizen-ii-5000fcd-1-item-1',
        'title': 'DÒNG DAO MIYABI 5000FCD',
        'block': 'block-miyabi-kaizen-ii-5000fcd-1',
        'position': '1',
        'body': 'Tinh hoa chế tác dao Nhật Bản, dành cho mọi gian bếp. MIYABI 5000FCD hội tụ những dấu ấn đặc trưng của một lưỡi dao Nhật: hệ vân Damascus cuốn hút, cán dao hoàn thiện tinh tế và độ sắc bén vượt trội. Một lựa chọn lý tưởng cho cả người yêu dao Nhật lâu năm lẫn những ai lần đầu khám phá nghệ thuật chế tác dao đến từ xứ sở mặt trời mọc.',
        'image': ''
    },
    {
        'ID': 'block-miyabi-kaizen-ii-5000fcd-1-item-2',
        'title': miyabi_cur[0]['title'],  # VẺ ĐẸP VƯỢT THỜI GIAN
        'block': 'block-miyabi-kaizen-ii-5000fcd-1',
        'position': '2',
        'body': miyabi_cur[0]['body'],
        'image': ''
    },
    {
        'ID': 'block-miyabi-kaizen-ii-5000fcd-1-item-3',
        'title': miyabi_cur[1]['title'],  # ĐỘ SẮC BÉN VƯỢT TRỘI
        'block': 'block-miyabi-kaizen-ii-5000fcd-1',
        'position': '3',
        'body': miyabi_cur[1]['body'],
        'image': ''
    },
    {
        'ID': 'block-miyabi-kaizen-ii-5000fcd-1-item-4',
        'title': miyabi_cur[2]['title'],  # CÁN DAO ĐẦY DẤU ẤN
        'block': 'block-miyabi-kaizen-ii-5000fcd-1',
        'position': '4',
        'body': miyabi_cur[2]['body'],
        'image': ''
    }
]

# 4. ZWILLING GOURMET
gourmet_cur = items_by_block['block-zwilling-gourmet-1']
RESTRUCTURED_STORY_ITEMS['block-zwilling-gourmet-1'] = [
    {
        'ID': 'block-zwilling-gourmet-1-item-1',
        'title': 'ZWILLING GOURMET: LỰA CHỌN TIN CẬY CHO GIAN BẾP HẰNG NGÀY',
        'block': 'block-zwilling-gourmet-1',
        'position': '1',
        'body': 'Sẵn sàng đồng hành trong mọi công việc bếp núc, dao ZWILLING GOURMET kết hợp độ sắc bén bền bỉ cùng trọng lượng nhẹ linh hoạt. Lưỡi dao được tối ưu hóa cho việc cắt thái nhẹ nhàng, chính xác và thoải mái, lý tưởng cho những người yêu thích nấu nướng mỗi ngày.',
        'image': ''
    },
    {
        'ID': 'block-zwilling-gourmet-1-item-2',
        'title': gourmet_cur[0]['title'],  # THIẾT KẾ VƯỢT THỜI GIAN
        'block': 'block-zwilling-gourmet-1',
        'position': '2',
        'body': gourmet_cur[0]['body'],
        'image': ''
    },
    {
        'ID': 'block-zwilling-gourmet-1-item-3',
        'title': gourmet_cur[1]['title'],  # LƯỠI DAO TÔI LẠNH
        'block': 'block-zwilling-gourmet-1',
        'position': '3',
        'body': gourmet_cur[1]['body'],
        'image': ''
    },
    {
        'ID': 'block-zwilling-gourmet-1-item-4',
        'title': gourmet_cur[2]['title'],  # CÔNG THỨC THÉP ĐỘC QUYỀN
        'block': 'block-zwilling-gourmet-1',
        'position': '4',
        'body': gourmet_cur[2]['body'],
        'image': ''
    }
]

# 5. MILANO
milano_cur = items_by_block['block-milano-1']
milano_intro = blocks_by_id.get('block-milano-2', {})
RESTRUCTURED_STORY_ITEMS['block-milano-1'] = [
    {
        'ID': 'block-milano-1-item-1',
        'title': 'ZWILLING MILANO: ĐỈNH CAO THIẾT KẾ Ý',
        'block': 'block-milano-1',
        'position': '1',
        'body': milano_intro.get('body', 'Nước Ý không chỉ nổi tiếng với phong cách sống “la dolce vita” mà còn là cái nôi của thiết kế hiện đại. Sự giao thoa độc đáo giữa tinh thần tối giản, vẻ thanh lịch và công năng vượt trội đã định hình những thiết kế Ý được yêu thích trên toàn thế giới.\n\nTinh thần ấy được thể hiện trọn vẹn trong ZWILLING Milano—dòng nồi chảo do Matteo Thun & Antonio Rodriguez thiết kế. Từ nồi đến chảo, mỗi sản phẩm đều mang phong cách sống Ý đầy tinh tế, góp phần truyền cảm hứng và nâng tầm không gian bếp.'),
        'image': ''
    },
    {
        'ID': 'block-milano-1-item-2',
        'title': milano_cur[0]['title'],  # THIẾT KẾ TẠI Ý
        'block': 'block-milano-1',
        'position': '2',
        'body': milano_cur[0]['body'],
        'image': ''
    },
    {
        'ID': 'block-milano-1-item-3',
        'title': milano_cur[1]['title'],  # HIỆU SUẤT NẤU NƯỚNG VƯỢT TRỘI
        'block': 'block-milano-1',
        'position': '3',
        'body': milano_cur[1]['body'],
        'image': ''
    },
    {
        'ID': 'block-milano-1-item-4',
        'title': milano_cur[2]['title'],  # LỚP PHỦ THẾ HỆ MỚI
        'block': 'block-milano-1',
        'position': '4',
        'body': milano_cur[2]['body'],
        'image': ''
    }
]

# 6. MADURA
madura_cur1 = items_by_block['block-madura-1']
madura_cur2 = items_by_block['block-madura-2']
RESTRUCTURED_STORY_ITEMS['block-madura-1'] = [
    {
        'ID': 'block-madura-1-item-1',
        'title': madura_cur2[1]['title'],  # ZWILLING MADURA PLUS
        'block': 'block-madura-1',
        'position': '1',
        'body': madura_cur2[1]['body'],
        'image': ''
    },
    {
        'ID': 'block-madura-1-item-2',
        'title': madura_cur1[0]['title'],  # LỚP CHỐNG DÍNH BỀN BỈ
        'block': 'block-madura-1',
        'position': '2',
        'body': madura_cur1[0]['body'],
        'image': ''
    },
    {
        'ID': 'block-madura-1-item-3',
        'title': madura_cur1[1]['title'],  # TAY CẦM CÁCH NHIỆT
        'block': 'block-madura-1',
        'position': '3',
        'body': madura_cur1[1]['body'],
        'image': ''
    },
    {
        'ID': 'block-madura-1-item-4',
        'title': madura_cur2[0]['title'],  # VÀNH RÓT TIỆN DỤNG
        'block': 'block-madura-1',
        'position': '4',
        'body': madura_cur2[0]['body'],
        'image': ''
    }
]

# 7. DINNERWARE
dinner_cur1 = items_by_block['block-dinnerware-1']
dinner_cur2 = items_by_block['block-dinnerware-2']
RESTRUCTURED_STORY_ITEMS['block-dinnerware-1'] = [
    {
        'ID': 'block-dinnerware-1-item-1',
        'title': dinner_cur1[0]['title'],  # THIẾT KẾ STAUB VƯỢT THỜI GIAN
        'block': 'block-dinnerware-1',
        'position': '1',
        'body': dinner_cur1[0]['body'],
        'image': ''
    },
    {
        'ID': 'block-dinnerware-1-item-2',
        'title': dinner_cur1[1]['title'],  # GỐM SỨ BỀN BỈ
        'block': 'block-dinnerware-1',
        'position': '2',
        'body': dinner_cur1[1]['body'],
        'image': ''
    },
    {
        'ID': 'block-dinnerware-1-item-3',
        'title': dinner_cur2[0]['title'],  # LINH HOẠT CHO MỌI BỮA ĂN
        'block': 'block-dinnerware-1',
        'position': '3',
        'body': dinner_cur2[0]['body'],
        'image': ''
    },
    {
        'ID': 'block-dinnerware-1-item-4',
        'title': dinner_cur2[1]['title'],  # DỄ DÀNG VỆ SINH MỖI NGÀY
        'block': 'block-dinnerware-1',
        'position': '4',
        'body': dinner_cur2[1]['body'],
        'image': ''
    }
]

# 8. BỘ HỘP CUBE HÚT CHÂN KHÔNG
cube_cur1 = items_by_block['block-bo-hop-cube-hut-chan-khong-1']
cube_cur2 = items_by_block['block-bo-hop-cube-hut-chan-khong-2']
RESTRUCTURED_STORY_ITEMS['block-bo-hop-cube-hut-chan-khong-1'] = [
    {
        'ID': 'block-bo-hop-cube-hut-chan-khong-1-item-1',
        'title': cube_cur1[0]['title'],  # LƯU TRỮ. XẾP GỌN. TỐI ƯU KHÔNG GIAN.
        'block': 'block-bo-hop-cube-hut-chan-khong-1',
        'position': '1',
        'body': cube_cur1[0]['body'],
        'image': ''
    },
    {
        'ID': 'block-bo-hop-cube-hut-chan-khong-1-item-2',
        'title': cube_cur1[1]['title'],  # THIẾT KẾ TIẾT KIỆM KHÔNG GIAN
        'block': 'block-bo-hop-cube-hut-chan-khong-1',
        'position': '2',
        'body': cube_cur1[1]['body'],
        'image': ''
    },
    {
        'ID': 'block-bo-hop-cube-hut-chan-khong-1-item-3',
        'title': cube_cur2[0]['title'],  # NẮP KÍN, BẢO QUẢN TƯƠI LÂU
        'block': 'block-bo-hop-cube-hut-chan-khong-1',
        'position': '3',
        'body': cube_cur2[0]['body'],
        'image': ''
    },
    {
        'ID': 'block-bo-hop-cube-hut-chan-khong-1-item-4',
        'title': cube_cur2[1]['title'],  # SẮP XẾP GỌN GÀNG, TINH TẾ
        'block': 'block-bo-hop-cube-hut-chan-khong-1',
        'position': '4',
        'body': cube_cur2[1]['body'],
        'image': ''
    }
]

# 9. KÉO ZWILLING TWIN SELECT - KÉO ĐA NĂNG
keo_cur1 = items_by_block['block-keo-zwilling-twin-select-keo-da-nang-1']
keo_cur2 = items_by_block['block-keo-zwilling-twin-select-keo-da-nang-2']
RESTRUCTURED_STORY_ITEMS['block-keo-zwilling-twin-select-keo-da-nang-1'] = [
    {
        'ID': 'block-keo-zwilling-twin-select-keo-da-nang-1-item-1',
        'title': keo_cur1[0]['title'],  # HIỆU SUẤT CẮT CHÍNH XÁC CHO MỌI NHU CẦU
        'block': 'block-keo-zwilling-twin-select-keo-da-nang-1',
        'position': '1',
        'body': keo_cur1[0]['body'],
        'image': ''
    },
    {
        'ID': 'block-keo-zwilling-twin-select-keo-da-nang-1-item-2',
        'title': keo_cur2[0]['title'],  # THÉP KHÔNG GỈ CÔNG THỨC ĐẶC BIỆT
        'block': 'block-keo-zwilling-twin-select-keo-da-nang-1',
        'position': '2',
        'body': keo_cur2[0]['body'],
        'image': ''
    },
    {
        'ID': 'block-keo-zwilling-twin-select-keo-da-nang-1-item-3',
        'title': keo_cur2[1]['title'],  # LƯỠI KÉO TÔI LẠNH FRIODUR®
        'block': 'block-keo-zwilling-twin-select-keo-da-nang-1',
        'position': '3',
        'body': keo_cur2[1]['body'],
        'image': ''
    },
    {
        'ID': 'block-keo-zwilling-twin-select-keo-da-nang-1-item-4',
        'title': keo_cur2[2]['title'],  # TAY CẦM THOẢI MÁI, DỄ DÀNG SỬ DỤNG
        'block': 'block-keo-zwilling-twin-select-keo-da-nang-1',
        'position': '4',
        'body': keo_cur2[2]['body'],
        'image': ''
    }
]

# Generate New FeatureBlocks
new_blocks = [b for b in blocks if b['ID'] not in REMOVE_BLOCK_IDS]

# Generate New FeatureItems
new_items = []
for b in new_blocks:
    bid = b['ID']
    if bid in RESTRUCTURED_STORY_ITEMS:
        new_items.extend(RESTRUCTURED_STORY_ITEMS[bid])
    else:
        # Keep existing items for this block
        cur = items_by_block.get(bid, [])
        for it in cur:
            new_items.append(it)

# Generate New _page-blocks.csv
new_pages = []
for p in pages:
    bids = p['blockIds'].split()
    filtered_bids = [b for b in bids if b not in REMOVE_BLOCK_IDS]
    new_pages.append({
        'sheet': p['sheet'],
        'pageTitle': p['pageTitle'],
        'sourceUrl': p['sourceUrl'],
        'blockIds': ' '.join(filtered_bids)
    })

# Write FeatureBlocks.csv
with open(os.path.join(CSV_DIR, 'FeatureBlocks.csv'), 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['ID', 'title', 'component', 'heading', 'body', 'ctaLabel', 'image', 'sourceSheet', 'sourceTitle', 'internalNote'])
    writer.writeheader()
    writer.writerows(new_blocks)

# Write FeatureItems.csv
with open(os.path.join(CSV_DIR, 'FeatureItems.csv'), 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['ID', 'title', 'block', 'position', 'body', 'image'])
    writer.writeheader()
    writer.writerows(new_items)

# Write _page-blocks.csv
with open(os.path.join(CSV_DIR, '_page-blocks.csv'), 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['sheet', 'pageTitle', 'sourceUrl', 'blockIds'])
    writer.writeheader()
    writer.writerows(new_pages)

print(f"SUCCESS: FeatureBlocks.csv ({len(new_blocks)} rows)")
print(f"SUCCESS: FeatureItems.csv ({len(new_items)} rows)")
print(f"SUCCESS: _page-blocks.csv ({len(new_pages)} rows)")
