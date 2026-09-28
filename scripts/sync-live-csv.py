import csv
import os

LIVE_DIR = 'tools/live-wix-csv'
TARGET_DIR = 'wix-csv'

os.makedirs(TARGET_DIR, exist_ok=True)

# 1. Sync FeatureBlocks
live_blocks_file = os.path.join(LIVE_DIR, 'FeatureBlocks.csv')
if os.path.exists(live_blocks_file):
    with open(live_blocks_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        blocks = []
        for r in reader:
            title = r.get('\ufeff"Title"') or r.get('Title') or r.get('title') or ''
            blocks.append({
                'ID': r.get('ID', ''),
                'title': title,
                'component': r.get('component', ''),
                'heading': r.get('heading', ''),
                'body': r.get('body', ''),
                'ctaLabel': r.get('ctaLabel', ''),
                'image': r.get('image', ''),
                'sourceSheet': r.get('sourceSheet', ''),
                'sourceTitle': r.get('sourceTitle', ''),
                'internalNote': r.get('internalNote', '')
            })

    target_blocks_file = os.path.join(TARGET_DIR, 'FeatureBlocks.csv')
    with open(target_blocks_file, 'w', encoding='utf-8', newline='') as f:
        fieldnames = ['ID', 'title', 'component', 'heading', 'body', 'ctaLabel', 'image', 'sourceSheet', 'sourceTitle', 'internalNote']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(blocks)
    print(f'Synced {len(blocks)} blocks to {target_blocks_file}')

# 2. Sync FeatureItems
live_items_file = os.path.join(LIVE_DIR, 'FeatureItems.csv')
if os.path.exists(live_items_file):
    with open(live_items_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        items = []
        for r in reader:
            title = r.get('\ufeff"Title"') or r.get('Title') or r.get('title') or ''
            items.append({
                'ID': r.get('ID', ''),
                'title': title,
                'block': r.get('block', ''),
                'position': r.get('position', '1'),
                'body': r.get('body', ''),
                'image': r.get('image', ''),
                'coordX': r.get('coordX', ''),
                'coordY': r.get('coordY', '')
            })

    target_items_file = os.path.join(TARGET_DIR, 'FeatureItems.csv')
    with open(target_items_file, 'w', encoding='utf-8', newline='') as f:
        fieldnames = ['ID', 'title', 'block', 'position', 'body', 'image', 'coordX', 'coordY']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(items)
    print(f'Synced {len(items)} items to {target_items_file}')
