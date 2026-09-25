/**
 * WIX VELO PAGE CODE: Trang Product (Item) — Chi tiết sản phẩm (PDP)
 * Dynamic Page URL: /product/{slug}
 * (Ví dụ: /product/miyabi-kaizen-ii-5000fcd-dao-bep-santoku-18cm)
 * 
 * Các phần tử Custom Element trên trang:
 * 1. #productBreadcrumb (Tag Name: wx-breadcrumb)
 * 2. #productDetail     (Tag Name: wx-product-detail)
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async function () {
  console.log('[Wix Velo] Đang nạp trang chi tiết sản phẩm (PDP)...');

  function findElement(ids) {
    for (const id of ids) {
      try {
        const el = $w(id);
        if (el && typeof el.setAttribute === 'function') return el;
      } catch (e) {}
    }
    return null;
  }

  function safeSet(el, attrName, val) {
    if (el && typeof el.setAttribute === 'function') {
      el.setAttribute(attrName, typeof val === 'string' ? val : JSON.stringify(val));
    }
  }

  try {
    let currentProduct = null;

    // 1. Thử lấy từ Dynamic Dataset nếu có
    try {
      if ($w('#dynamicDataset')) {
        await $w('#dynamicDataset').onReadyAsync();
        currentProduct = $w('#dynamicDataset').getCurrentItem();
      }
    } catch (e) {}

    // 2. Dự phòng: đọc slug trực tiếp từ URL (ví dụ: /product/abc-xyz -> slug: abc-xyz)
    if (!currentProduct || !currentProduct.slug) {
      const pathSegments = wixLocation.path || [];
      const slugFromUrl = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : '';
      if (slugFromUrl) {
        const pRes = await wixData.query('Products').eq('slug', slugFromUrl).find();
        if (pRes.items.length > 0) currentProduct = pRes.items[0];
      }
    }

    if (!currentProduct) {
      console.warn('[Wix Velo] Không tìm thấy thông tin sản phẩm hiện tại.');
      return;
    }

    console.log('[Wix Velo] Đang hiển thị sản phẩm:', currentProduct.title, '(_id:', currentProduct._id, ')');

    const breadcrumbEl = findElement(['#productBreadcrumb', '#categoryBreadcrumb', '#breadcrumb']);
    const detailEl = findElement(['#productDetail', '#compProductDetail', '#productDetailComp']);

    // 3. Xây dựng Breadcrumb đa cấp động:
    // TRANG CHỦ › SẢN PHẨM › [DANH MỤC CHA] › [DANH MỤC CON] › [TÊN SẢN PHẨM]
    const breadcrumbItems = [
      { label: 'TRANG CHỦ', url: '/' },
      { label: 'SẢN PHẨM', url: '/products' }
    ];

    const catId = currentProduct.category;
    if (catId) {
      try {
        const catRes = await wixData.query('Categories')
          .hasSome('_id', [catId])
          .or(wixData.query('Categories').hasSome('ID', [catId]))
          .find();

        if (catRes.items.length > 0) {
          const currentCat = catRes.items[0];

          // Nếu danh mục con có danh mục cha (ví dụ: Dao Bếp -> Dao Santoku)
          if (currentCat.parent) {
            const parentRes = await wixData.query('Categories')
              .hasSome('_id', [currentCat.parent])
              .or(wixData.query('Categories').hasSome('ID', [currentCat.parent]))
              .find();
            if (parentRes.items.length > 0) {
              const parentCat = parentRes.items[0];
              breadcrumbItems.push({
                label: parentCat.title.toUpperCase(),
                url: `/products/${parentCat.slug}`
              });
            }
          }

          // Thêm danh mục hiện tại vào breadcrumb
          breadcrumbItems.push({
            label: currentCat.title.toUpperCase(),
            url: `/products/${currentCat.slug}`
          });
        }
      } catch (e) {
        console.error('[Wix Velo] Lỗi nạp Breadcrumb danh mục:', e);
      }
    }

    // Thêm chính tên sản phẩm vào cuối breadcrumb
    breadcrumbItems.push({
      label: (currentProduct.title || '').toUpperCase(),
      url: '#'
    });
    safeSet(breadcrumbEl, 'items', breadcrumbItems);

    // 4. Truy vấn biến thể (ProductVariants) để lấy thông số kỹ thuật (specs), mô tả chi tiết, ảnh gallery
    let variant = null;
    try {
      const variantRes = await wixData.query('ProductVariants')
        .hasSome('product', [currentProduct._id, currentProduct.ID].filter(Boolean))
        .find();
      if (variantRes.items.length > 0) {
        variant = variantRes.items[0];
      }
    } catch (err) {
      console.warn('[Wix Velo] Không thể truy vấn ProductVariants:', err);
    }

    // 5. Gộp dữ liệu đầy đủ từ Products và ProductVariants
    const fullProduct = {
      ...currentProduct,
      ...(variant || {}),
      title: currentProduct.title || (variant && variant.title),
      brand: currentProduct.brand,
      series: currentProduct.series,
      minPrice: currentProduct.minPrice || (variant && variant.price),
      maxPrice: currentProduct.maxPrice,
      compareAtPrice: currentProduct.compareAtPrice || (variant && variant.compareAtPrice),
      labels: currentProduct.labels,
      specs: (variant && variant.specs) ? variant.specs : currentProduct.specs,
      description: (variant && variant.description) ? variant.description : currentProduct.description,
      shortDescription: (variant && variant.shortDescription) ? variant.shortDescription : currentProduct.shortDescription,
      mainImage: (variant && variant.mainImage) ? variant.mainImage : currentProduct.mainImage,
      gallery: (variant && variant.gallery) ? variant.gallery : currentProduct.gallery,
      shopeeUrl: (variant && variant.shopeeUrl) ? variant.shopeeUrl : currentProduct.shopeeUrl,
      tiktokUrl: (variant && variant.tiktokUrl) ? variant.tiktokUrl : currentProduct.tiktokUrl
    };

    // Gán dữ liệu vào Custom Element <wx-product-detail>
    safeSet(detailEl, 'product', fullProduct);

    // 6. Nạp các khối tính năng FeatureBlocks & FeatureItems theo Series của sản phẩm
    const storyEl = findElement(['#storySection', '#wxStorySection', '#featureStory', '#wxFeatureStory']);
    const hotspotEl = findElement(['#hotspotSection', '#wxHotspotSection', '#featureHotspot', '#wxFeatureHighlights', '#hotspotBlock']);
    const featureBlocksEl = findElement(['#featureBlocks', '#productFeatureBlocks', '#wxFeatureBlocks']);

    if (storyEl || hotspotEl || featureBlocksEl) {
      try {
        // Bảng ánh xạ chính xác từ Series ID sang Block IDs của FeatureBlocks
        const SERIES_BLOCK_MAP = {
          // Dao bếp
          'series-zwilling-zwilling-tanrei': ['block-zwilling-tanrei-1', 'block-zwilling-tanrei-3'],
          'series-zwilling-zwilling-pro': ['block-zwilling-pro-1', 'block-zwilling-pro-2'],
          'series-zwilling-zwilling-pro-hb': ['block-zwilling-pro-1', 'block-zwilling-pro-2'],
          'series-zwilling-zwilling-four-star': ['block-zwilling-fourstar-1', 'block-zwilling-fourstar-2'],
          'series-zwilling-zwilling-gourmet': ['block-zwilling-gourmet-1', 'block-zwilling-gourmet-3'],
          'series-miyabi-miyabi-kaizen-ii-5000fcd': ['block-miyabi-kaizen-ii-5000fcd-1', 'block-miyabi-kaizen-ii-5000fcd-3'],
          'series-zwilling-zwilling-twin-pollux': ['block-zwilling-twin-pollux-1'],
          'series-zwilling-zwilling-now-s': ['block-zwilling-now-s-block-dao-keo-1'],

          // Nồi gang Staub
          'series-staub-staub-round-cocotte': ['block-staub-dang-tron-1', 'block-staub-dang-tron-2'],
          'series-staub-staub-twister-cocotte': ['block-staub-dang-tron-1', 'block-staub-dang-tron-2'],
          'series-staub-staub-chistera': ['block-staub-dang-tron-1', 'block-staub-dang-tron-2'],
          'series-staub-staub-snowflake': ['block-staub-dang-tron-1', 'block-staub-dang-tron-2'],
          'series-staub-staub-rice-cocotte': ['block-staub-dang-tron-1', 'block-staub-dang-tron-2'],
          'series-staub-staub-steamer': ['block-staub-dang-tron-1', 'block-staub-dang-tron-2'],
          'series-staub-staub-artshape': ['block-staub-pumpkin-1', 'block-staub-pumpkin-2'],
          'series-staub-staub-grill': ['block-chao-gang-staub-american-grill-1'],
          'series-staub-staub-knob': ['block-num-noi-gang-staub-1'],

          // Nồi chảo Zwilling
          'series-zwilling-zwilling-milano': ['block-milano-1', 'block-milano-3'],
          'series-zwilling-zwilling-madura-plus': ['block-madura-1', 'block-madura-3'],
          'series-zwilling-zwilling-pro-ii': ['block-zwilling-pro-ii-1'],
          'series-zwilling-zwilling-spirit': ['block-zwilling-spirit-1'],
          'series-zwilling-zwilling-twin-specials': ['block-zwilling-pro-ii-1'],
          'series-zwilling-zwilling-unlock': ['block-milano-1', 'block-milano-3'],
          'series-zwilling-zwilling-steamer': ['block-zwilling-pro-ii-1'],

          // Dụng cụ đồ bếp, bàn ăn, ly
          'series-zwilling-zwilling-prof': ['block-dung-cu-nau-an-thep-zwilling-prof-1'],
          'series-zwilling-zwilling-twin-select': ['block-keo-zwilling-twin-select-keo-da-nang-1', 'block-keo-zwilling-twin-select-keo-da-nang-3'],
          'series-zwilling-zwilling-minimale': ['block-zwilling-minimale-mau-bac-nham-silver-vang-hong-nham-rose-go-1'],
          'series-zwilling-zwilling-nova': ['block-zwilling-nova-1'],
          'series-zwilling-zwilling-sorrento': ['block-ly-zwilling-sorrento-1'],
          'series-zwilling-zwilling-now': ['block-thot-zwilling-now-1'],
          'series-zwilling-zwilling-twin': ['block-zwilling-twin-pollux-1']
        };

        // 1. Phân giải thông tin Series của sản phẩm (hỗ trợ cả String ID, Object Reference, Array)
        let sVal = currentProduct.series;
        if (Array.isArray(sVal) && sVal.length > 0) sVal = sVal[0];
        let seriesId = '';
        let seriesTitle = '';
        let seriesSlug = '';

        if (typeof sVal === 'object' && sVal !== null) {
          seriesId = sVal._id || sVal.ID || '';
          seriesTitle = sVal.title || sVal.name || '';
          seriesSlug = sVal.slug || '';
        } else if (typeof sVal === 'string') {
          seriesId = sVal;
        }

        // Nếu có seriesId nhưng chưa có seriesTitle, truy vấn bảng Series
        if (seriesId && (!seriesTitle || !SERIES_BLOCK_MAP[seriesId])) {
          try {
            const seriesRes = await wixData.query('Series')
              .hasSome('_id', [seriesId])
              .or(wixData.query('Series').hasSome('ID', [seriesId]))
              .or(wixData.query('Series').hasSome('slug', [seriesSlug || seriesId]))
              .find();

            if (seriesRes.items.length > 0) {
              const sRow = seriesRes.items[0];
              seriesTitle = sRow.title || seriesTitle;
              seriesSlug = sRow.slug || seriesSlug;
              if (sRow.ID && SERIES_BLOCK_MAP[sRow.ID]) {
                seriesId = sRow.ID;
              } else if (sRow._id && SERIES_BLOCK_MAP[sRow._id]) {
                seriesId = sRow._id;
              }
            }
          } catch (e) {
            console.warn('[Wix Velo] Không thể truy vấn Series:', e);
          }
        }

        // 2. Xác định danh sách Block IDs mục tiêu
        let targetBlockIds = SERIES_BLOCK_MAP[seriesId] || [];

        // Thử tìm theo slug nếu chưa có
        if (targetBlockIds.length === 0 && seriesSlug) {
          for (const [k, v] of Object.entries(SERIES_BLOCK_MAP)) {
            if (k.endsWith(seriesSlug) || k.includes(seriesSlug)) {
              targetBlockIds = v;
              break;
            }
          }
        }

        // 3. Fallback theo từ khóa tiêu đề sản phẩm (hữu ích cho sản phẩm chưa gán series hoặc Ceramic, FS)
        if (targetBlockIds.length === 0) {
          const tLower = (currentProduct.title || '').toLowerCase();
          if (tLower.includes('tanrei')) {
            targetBlockIds = ['block-zwilling-tanrei-1', 'block-zwilling-tanrei-3'];
          } else if (tLower.includes('pro hb') || tLower.includes('zwilling pro')) {
            targetBlockIds = ['block-zwilling-pro-1', 'block-zwilling-pro-2'];
          } else if (tLower.includes('four star')) {
            targetBlockIds = ['block-zwilling-fourstar-1', 'block-zwilling-fourstar-2'];
          } else if (tLower.includes('gourmet')) {
            targetBlockIds = ['block-zwilling-gourmet-1', 'block-zwilling-gourmet-3'];
          } else if (tLower.includes('kaizen') || tLower.includes('miyabi')) {
            targetBlockIds = ['block-miyabi-kaizen-ii-5000fcd-1', 'block-miyabi-kaizen-ii-5000fcd-3'];
          } else if (tLower.includes('twin pollux')) {
            targetBlockIds = ['block-zwilling-twin-pollux-1'];
          } else if (tLower.includes('now s')) {
            targetBlockIds = ['block-zwilling-now-s-block-dao-keo-1'];
          } else if (tLower.includes('dáng tròn') || tLower.includes('round cocotte') || tLower.includes('staub mini')) {
            targetBlockIds = ['block-staub-dang-tron-1', 'block-staub-dang-tron-2'];
          } else if (tLower.includes('bí ngô') || tLower.includes('pumpkin')) {
            targetBlockIds = ['block-staub-pumpkin-1', 'block-staub-pumpkin-2'];
          } else if (tLower.includes('american grill')) {
            targetBlockIds = ['block-chao-gang-staub-american-grill-1'];
          } else if (tLower.includes('núm nồi')) {
            targetBlockIds = ['block-num-noi-gang-staub-1'];
          } else if (tLower.includes('milano')) {
            targetBlockIds = ['block-milano-1', 'block-milano-3'];
          } else if (tLower.includes('madura')) {
            targetBlockIds = ['block-madura-1', 'block-madura-3'];
          } else if (tLower.includes('pro ii')) {
            targetBlockIds = ['block-zwilling-pro-ii-1'];
          } else if (tLower.includes('spirit')) {
            targetBlockIds = ['block-zwilling-spirit-1'];
          } else if (tLower.includes('twin select')) {
            targetBlockIds = ['block-keo-zwilling-twin-select-keo-da-nang-1', 'block-keo-zwilling-twin-select-keo-da-nang-3'];
          } else if (tLower.includes('twin prof') || tLower.includes('zwilling prof')) {
            targetBlockIds = ['block-dung-cu-nau-an-thep-zwilling-prof-1'];
          } else if (tLower.includes('minimale')) {
            targetBlockIds = ['block-zwilling-minimale-mau-bac-nham-silver-vang-hong-nham-rose-go-1'];
          } else if (tLower.includes('nova')) {
            targetBlockIds = ['block-zwilling-nova-1'];
          } else if (tLower.includes('sorrento')) {
            targetBlockIds = ['block-ly-zwilling-sorrento-1'];
          } else if (tLower.includes('máy hút chân không')) {
            targetBlockIds = ['block-may-hut-chan-khong-1', 'block-may-hut-chan-khong-3'];
          } else if (tLower.includes('túi hút chân không')) {
            targetBlockIds = ['block-tui-hut-chan-khong-1', 'block-tui-hut-chan-khong-2'];
          } else if (tLower.includes('hộp nhựa hút chân không')) {
            targetBlockIds = ['block-hop-nhua-hut-chan-khong-1'];
          } else if (tLower.includes('hộp thủy tinh hút chân không')) {
            targetBlockIds = ['block-hop-thuy-tinh-hut-chan-khong-1', 'block-hop-thuy-tinh-hut-chan-khong-2'];
          } else if (tLower.includes('hộp cube')) {
            targetBlockIds = ['block-bo-hop-cube-hut-chan-khong-1'];
          } else if (tLower.includes('tô hút chân không')) {
            targetBlockIds = ['block-bo-to-hut-chan-khong-1', 'block-bo-to-hut-chan-khong-2'];
          } else if (tLower.includes('nắp hút chân không')) {
            targetBlockIds = ['block-bo-nap-hut-chan-khong-1'];
          } else if (tLower.includes('hút chân không 27') || tLower.includes('hút chân không 40')) {
            targetBlockIds = ['block-bo-san-pham-hut-chan-khong-27-40-mon-1', 'block-may-hut-chan-khong-3'];
          } else if (tLower.includes('âu sứ') && tLower.includes('cà chua')) {
            targetBlockIds = ['block-au-su-staub-ca-chua-1'];
          } else if (tLower.includes('âu sứ') && tLower.includes('ớt chuông')) {
            targetBlockIds = ['block-au-su-staub-ot-chuong-1'];
          } else if (tLower.includes('âu sứ') && tLower.includes('bí ngô')) {
            targetBlockIds = ['block-au-su-staub-bi-ngo-1'];
          } else if (tLower.includes('khay nướng sứ')) {
            targetBlockIds = ['block-khay-nuong-su-staub-1'];
          } else if (tLower.includes('thớt ebony')) {
            targetBlockIds = ['block-thot-ebony-1'];
          } else if (tLower.includes('thớt') && tLower.includes('now')) {
            targetBlockIds = ['block-thot-zwilling-now-1'];
          } else if (tLower.includes('đũa') && tLower.includes('now')) {
            targetBlockIds = ['block-dua-zwilling-now-set-6-mau-set-hong-set-macaron-1'];
          } else if (tLower.includes('thermoplus') || tLower.includes('ly giữ nhiệt')) {
            targetBlockIds = ['block-ly-giu-nhiet-zwilling-thermoplus-900ml-kem-ong-hut-1', 'block-ly-giu-nhiet-zwilling-thermoplus-900ml-kem-ong-hut-2'];
          }
        }

        // 4. Thực hiện truy vấn FeatureBlocks từ CMS
        let blocks = [];
        if (targetBlockIds && targetBlockIds.length > 0) {
          const blocksRes = await wixData.query('FeatureBlocks')
            .hasSome('_id', targetBlockIds)
            .or(wixData.query('FeatureBlocks').hasSome('ID', targetBlockIds))
            .or(wixData.query('FeatureBlocks').hasSome('id', targetBlockIds))
            .find();

          if (blocksRes.items.length > 0) {
            blocks = blocksRes.items;
          }
        }

        // Dự phòng: Tìm theo sourceTitle (hỗ trợ nhiều biến thể viết hoa/thường)
        if (blocks.length === 0 && seriesTitle) {
          const titleCandidates = [
            seriesTitle,
            seriesTitle.toUpperCase(),
            seriesTitle.toLowerCase()
          ];
          const blocksRes = await wixData.query('FeatureBlocks')
            .hasSome('sourceTitle', titleCandidates)
            .hasSome('component', ['story', 'highlights'])
            .find();

          if (blocksRes.items.length > 0) {
            blocks = blocksRes.items;
          }
        }

        console.log('[Wix Velo PDP] Target Block IDs:', targetBlockIds, '-> Số blocks tìm thấy:', blocks.length);

        // 5. Nếu có blocks, truy vấn FeatureItems và đẩy vào Custom Elements
        if (blocks.length > 0) {
          const blockKeys = [];
          blocks.forEach((b) => {
            if (b._id) blockKeys.push(b._id);
            if (b.ID) blockKeys.push(b.ID);
            if (b.id) blockKeys.push(b.id);
          });

          const itemsRes = await wixData.query('FeatureItems')
            .hasSome('block', blockKeys)
            .ascending('position')
            .find();

          const allItems = itemsRes.items || [];
          console.log('[Wix Velo PDP] Số FeatureItems tìm thấy:', allItems.length);
          const storyBlocks = blocks.filter((b) => (b.component || 'story') === 'story');
          const hotspotBlocks = blocks.filter((b) => b.component === 'highlights');

          // Nạp riêng cho Component 1 (Story Section)
          if (storyEl) {
            if (storyBlocks.length > 0) {
              if (typeof storyEl.expand === 'function') storyEl.expand();
              safeSet(storyEl, 'blocks', storyBlocks);
              safeSet(storyEl, 'items', allItems);
            } else {
              if (typeof storyEl.collapse === 'function') storyEl.collapse();
            }
          }

          // Nạp riêng cho Component 2 (Hotspot / Highlights Section)
          if (hotspotEl) {
            if (hotspotBlocks.length > 0) {
              if (typeof hotspotEl.expand === 'function') hotspotEl.expand();
              safeSet(hotspotEl, 'blocks', hotspotBlocks);
              safeSet(hotspotEl, 'items', allItems);
            } else {
              if (typeof hotspotEl.collapse === 'function') hotspotEl.collapse();
            }
          }

          // Nạp cho Component gộp nếu vẫn dùng tag cũ
          if (featureBlocksEl) {
            if (blocks.length > 0) {
              if (typeof featureBlocksEl.expand === 'function') featureBlocksEl.expand();
              safeSet(featureBlocksEl, 'blocks', blocks);
              safeSet(featureBlocksEl, 'items', allItems);
            } else {
              if (typeof featureBlocksEl.collapse === 'function') featureBlocksEl.collapse();
            }
          }
        } else {
          // Không có blocks cho sản phẩm này -> Tự động thu gọn (collapse) để không hiển thị khung trống
          if (storyEl && typeof storyEl.collapse === 'function') storyEl.collapse();
          if (hotspotEl && typeof hotspotEl.collapse === 'function') hotspotEl.collapse();
          if (featureBlocksEl && typeof featureBlocksEl.collapse === 'function') featureBlocksEl.collapse();
        }
      } catch (featErr) {
        console.warn('[Wix Velo] Không thể nạp FeatureBlocks:', featErr);
        // Trong trường hợp lỗi ngoại lệ, thu gọn các phần tử để tránh khung vỡ
        if (storyEl && typeof storyEl.collapse === 'function') storyEl.collapse();
        if (hotspotEl && typeof hotspotEl.collapse === 'function') hotspotEl.collapse();
        if (featureBlocksEl && typeof featureBlocksEl.collapse === 'function') featureBlocksEl.collapse();
      }
    }

  } catch (err) {
    console.error('[Wix Velo] Lỗi nạp dữ liệu trang Product (Item):', err);
  }
});
