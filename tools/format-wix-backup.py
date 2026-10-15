#!/usr/bin/env python3
"""
Format and standardize live Wix CMS exports for clean backup and local synchronization.
"""

import csv
import os
import glob
import shutil

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW_BACKUP_DIR = os.path.join(ROOT_DIR, 'tools', 'backups', 'live-wix-2026-10-09-raw')
LIVE_CSV_DIR = os.path.join(ROOT_DIR, 'tools', 'live-wix-csv')
WIX_CSV_DIR = os.path.join(ROOT_DIR, 'wix-csv')

SCHEMAS = {
    'Brands.csv': {
        'cols': ['ID', 'title', 'slug', 'description', 'image', 'bannerImage', 'sortOrder', 'isActive'],
        'sort': lambda r: (int(r.get('sortOrder') or 999), r.get('ID', ''))
    },
    'Categories.csv': {
        'cols': ['ID', 'title', 'slug', 'taxonomy', 'parent', 'path', 'depth', 'description', 'image', 'bannerImage', 'productCount', 'sortOrder', 'isActive'],
        'sort': lambda r: (int(r.get('sortOrder') or 999), int(r.get('depth') or 0), r.get('path', ''))
    },
    'FeatureBlocks.csv': {
        'cols': ['ID', 'title', 'component', 'heading', 'body', 'ctaLabel', 'image', 'sourceSheet', 'sourceTitle', 'internalNote', 'series'],
        'sort': lambda r: (r.get('series', ''), r.get('title', ''), r.get('ID', ''))
    },
    'FeatureItems.csv': {
        'cols': ['ID', 'title', 'block', 'position', 'body', 'image', 'coordX', 'coordY'],
        'sort': lambda r: (r.get('block', ''), int(r.get('position') or 0), r.get('ID', ''))
    },
    'ProductVariants.csv': {
        'cols': ['ID', 'title', 'sku', 'product', 'sortOrder', 'shortDescription', 'description', 'color', 'sizeLabel', 'price', 'compareAtPrice', 'shopeeUrl', 'tiktokUrl', 'sourceUrl', 'stock', 'isDefault', 'mainImage', 'gallery', 'specs'],
        'sort': lambda r: (r.get('product', ''), int(r.get('sortOrder') or 999), r.get('sku', ''))
    },
    'Products.csv': {
        'cols': ['ID', 'title', 'slug', 'brand', 'series', 'category', 'brandCategory', 'materialCategory', 'categoryPath', 'brandCategoryPath', 'brandCategoryRootSlug', 'displayCategory', 'minPrice', 'maxPrice', 'soldCount', 'labels', 'status', 'mainImage', 'gallery', 'color'],
        'sort': lambda r: (r.get('brand', ''), r.get('series', ''), r.get('title', ''))
    },
    'Series.csv': {
        'cols': ['ID', 'title', 'slug', 'brand', 'description', 'image', 'bannerImage', 'sortOrder', 'isActive'],
        'sort': lambda r: (r.get('brand', ''), int(r.get('sortOrder') or 999), r.get('title', ''))
    },
    'Stores.csv': {
        'cols': ['ID', 'title', 'address', 'city', 'hotline', 'openHours', 'latitude', 'longitude', 'googleMapsUrl', 'image', 'position'],
        'sort': lambda r: (int(r.get('position') or 999), r.get('title', ''))
    }
}

def clean_value(val):
    if val is None:
        return ''
    val = val.strip()
    # Normalize Windows line endings to Unix
    val = val.replace('\r\n', '\n').replace('\r', '\n')
    return val

def format_all():
    print(f"Reading raw exports from: {RAW_BACKUP_DIR}")
    results = {}

    for fname, conf in SCHEMAS.items():
        src_path = os.path.join(RAW_BACKUP_DIR, fname)
        if not os.path.exists(src_path):
            print(f"Skipping (not found): {fname}")
            continue

        cols = conf['cols']
        sort_fn = conf['sort']

        with open(src_path, 'r', encoding='utf-8-sig') as f:
            reader = csv.reader(f)
            raw_headers = [h.strip() for h in next(reader)]

            # Map raw headers
            hmap = {}
            for idx, h in enumerate(raw_headers):
                hl = h.lower()
                if hl == 'title':
                    hmap['title'] = idx
                elif hl == 'id':
                    hmap['ID'] = idx
                elif hl == 'logoimage':
                    hmap['image'] = idx
                    hmap['logoImage'] = idx
                else:
                    hmap[h] = idx

            rows = []
            for r in reader:
                if not any(c.strip() for c in r):
                    continue
                row_dict = {}
                for col in cols:
                    idx = hmap.get(col)
                    if idx is not None and idx < len(r):
                        row_dict[col] = clean_value(r[idx])
                    else:
                        row_dict[col] = ''
                rows.append(row_dict)

            # Sort rows deterministically
            if sort_fn:
                rows.sort(key=sort_fn)

            results[fname] = rows
            print(f"Processed {fname}: {len(rows)} rows, {len(cols)} columns")

            # Write clean formatted file to tools/live-wix-csv
            live_out = os.path.join(LIVE_CSV_DIR, fname)
            with open(live_out, 'w', encoding='utf-8', newline='') as out_f:
                writer = csv.writer(out_f, quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
                writer.writerow(cols)
                for row in rows:
                    writer.writerow([row[col] for col in cols])

            # Write clean formatted file to wix-csv
            wix_out = os.path.join(WIX_CSV_DIR, fname)
            with open(wix_out, 'w', encoding='utf-8', newline='') as out_f:
                writer = csv.writer(out_f, quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
                writer.writerow(cols)
                for row in rows:
                    writer.writerow([row[col] for col in cols])

    print("\nSuccessfully formatted and synchronized all collections!")

if __name__ == '__main__':
    format_all()
