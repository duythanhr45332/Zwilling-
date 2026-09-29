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

  function findContainer(ids) {
    for (const id of ids) {
      try {
        const el = $w(id);
        if (el && typeof el.collapse === 'function') return el;
      } catch (e) {}
    }
    return null;
  }

  function safeSet(el, attrName, val) {
    if (el && typeof el.setAttribute === 'function') {
      el.setAttribute(attrName, typeof val === 'string' ? val : JSON.stringify(val));
    }
  }

  function safeOn(el, eventName, handler) {
    if (el && typeof el.on === 'function') {
      try {
        el.on(eventName, handler);
      } catch (e) {
        console.warn(`[Wix Velo] Không thể gán sự kiện ${eventName}:`, e);
      }
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

    // Lắng nghe sự kiện click Breadcrumb để chuyển hướng
    safeOn(breadcrumbEl, 'breadcrumb-click', (e) => {
      const targetUrl = e.detail?.item?.url;
      if (targetUrl && targetUrl !== '#') {
        wixLocation.to(targetUrl);
      }
    });

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
    const storyEl = findElement([
      '#storySection', '#wxStorySection', '#featureStory', '#wxFeatureStory',
      '#storyBlock', '#story', '#customElementStory', '#customElement1', '#customElement'
    ]);
    const hotspotEl = findElement([
      '#hotspotSection', '#wxHotspotSection', '#featureHotspot', '#wxFeatureHighlights',
      '#hotspotBlock', '#hotspot', '#highlights', '#highlightsSection', '#wxHotspot',
      '#customElementHotspot', '#customElement2', '#customElement3'
    ]);
    const featureBlocksEl = findElement(['#featureBlocks', '#productFeatureBlocks', '#wxFeatureBlocks']);

    // Hỗ trợ thu gọn cả Section hoặc Box bọc ngoài trên Wix Studio
    const hotspotContainer = findContainer([
      '#sectionHotspot', '#hotspotSectionContainer', '#sectionHighlights',
      '#highlightsSectionContainer', '#boxHotspot', '#hotspotBox',
      '#hotspotSectionWrap', '#sectionCustomElement2', '#sectionCustomElement3'
    ]);
    const storyContainer = findContainer([
      '#sectionStory', '#storySectionContainer', '#boxStory', '#storyBox',
      '#sectionCustomElement1'
    ]);

    if (storyEl || hotspotEl || featureBlocksEl) {
      try {
        // =========================================================================
        // TRUY VẤN FEATURE BLOCKS ĐỘNG (CMS-DRIVEN & RELATIONAL QUERY)
        // =========================================================================
        let blocks = [];

        // 1. Phân giải thông tin Series của sản phẩm (hỗ trợ cả Object Reference, String ID, Array)
        let sVal = currentProduct.series;
        if (Array.isArray(sVal) && sVal.length > 0) sVal = sVal[0];
        let seriesId = '';
        let seriesTitle = '';
        let seriesSlug = '';

        if (typeof sVal === 'object' && sVal !== null) {
          seriesId = sVal._id || sVal.ID || '';
          seriesTitle = sVal.title || sVal.name || '';
          seriesSlug = sVal.slug || '';
        } else if (typeof sVal === 'string' && sVal.trim()) {
          seriesId = sVal.trim();
        }

        // Nếu có seriesId nhưng chưa có seriesTitle hoặc seriesSlug, tra cứu bảng Series
        if (seriesId && (!seriesTitle || !seriesSlug)) {
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
              if (sRow.ID) seriesId = sRow.ID;
            }
          } catch (e) {
            console.warn('[Wix Velo] Không thể truy vấn Series:', e);
          }
        }

        // 2. Cách 1: Truy vấn trực tiếp theo trường liên kết CMS (nếu Products có featureBlocks)
        let directBlocks = currentProduct.featureBlocks;
        if (directBlocks) {
          const directIds = Array.isArray(directBlocks)
            ? directBlocks.map(b => (typeof b === 'object' ? b._id || b.ID : b)).filter(Boolean)
            : (typeof directBlocks === 'string' ? directBlocks.split(',').map(s => s.trim()).filter(Boolean) : []);

          if (directIds.length > 0) {
            try {
              const dRes = await wixData.query('FeatureBlocks')
                .hasSome('_id', directIds)
                .or(wixData.query('FeatureBlocks').hasSome('ID', directIds))
                .find();
              if (dRes.items.length > 0) blocks = dRes.items;
            } catch (e) {}
          }
        }

        // 3. Cách 2: Truy vấn trực tiếp theo trường `series` trong FeatureBlocks (Chuẩn CMS)
        if (blocks.length === 0 && seriesId) {
          try {
            const bBySeries = await wixData.query('FeatureBlocks')
              .eq('series', seriesId)
              .or(wixData.query('FeatureBlocks').hasSome('series', [seriesId]))
              .find();
            if (bBySeries.items.length > 0) {
              blocks = bBySeries.items;
            }
          } catch (e) {}
        }

        // 4. Cách 3: Dự phòng thông minh tự động tìm kiếm theo Slug / Tiêu đề (không cần bảng fix cứng)
        if (blocks.length === 0) {
          try {
            let bQuery = wixData.query('FeatureBlocks');

            // Khớp theo tên series (sourceTitle)
            if (seriesTitle) {
              const titleCandidates = [
                seriesTitle,
                seriesTitle.toUpperCase(),
                seriesTitle.toLowerCase()
              ];
              bQuery = bQuery.hasSome('sourceTitle', titleCandidates);
            }

            // Khớp theo slug series trong ID block
            if (seriesSlug) {
              const cleanSlug = seriesSlug.replace(/^series-/, '').replace(/^(zwilling|staub|miyabi)-/, '');
              bQuery = bQuery.or(wixData.query('FeatureBlocks').contains('ID', seriesSlug))
                             .or(wixData.query('FeatureBlocks').contains('ID', cleanSlug));
            }

            const autoRes = await bQuery.hasSome('component', ['story', 'highlights']).find();
            if (autoRes.items.length > 0) {
              blocks = autoRes.items;
            }
          } catch (e) {}
        }

        // 5. Cách 4: Dự phòng cho sản phẩm lẻ / phụ kiện không gắn Series (như máy hút, gốm sứ, khay nướng...)
        if (blocks.length === 0) {
          const pSlug = (currentProduct.slug || '').toLowerCase();
          const pTitle = (currentProduct.title || '').toLowerCase();

          try {
            const candidateKeywords = [
              'may-hut-chan-khong', 'tui-hut-chan-khong', 'hop-thuy-tinh-hut-chan-khong',
              'hop-nhua-hut-chan-khong', 'bo-to-hut-chan-khong', 'bo-hop-cube-hut-chan-khong',
              'bo-nap-hut-chan-khong', 'ly-giu-nhiet-zwilling-thermoplus', 'thot-zwilling-now',
              'dua-zwilling-now', 'dung-cu-nau-an', 'thot-ebony', 'khay-nuong-su-staub',
              'au-su-staub-bi-ngo', 'au-su-staub-ca-chua', 'au-su-staub-ot-chuong',
              'chao-gang-staub-american-grill', 'chao-gang-co-mieng-rot', 'staub-oven-dish', 'num-noi-gang-staub',
              'dia-su', 'to-su', 'chen-dia', 'dinnerware'
            ];

            for (const kw of candidateKeywords) {
              if (pSlug.includes(kw) || pTitle.includes(kw.replace(/-/g, ' '))) {
                let targetKw = kw;
                if (['dia-su', 'to-su', 'chen-dia'].includes(kw)) targetKw = 'dinnerware';
                const kwRes = await wixData.query('FeatureBlocks').contains('ID', targetKw).find();
                if (kwRes.items.length > 0) {
                  blocks = kwRes.items;
                  break;
                }
              }
            }
          } catch (e) {}
        }

        console.log('[Wix Velo PDP] Số blocks tìm thấy động:', blocks.length, 'cho sản phẩm:', currentProduct.title);

        // Hàm chọn lọc block chính xác nhất cho từng sản phẩm (tránh gộp nhiều block của cả series vào một sản phẩm)
        function selectBestBlock(blockList, product, sTitle) {
          if (!blockList || blockList.length === 0) return null;
          if (blockList.length === 1) {
            const single = blockList[0];
            const bSt = (single.sourceTitle || '').toLowerCase();
            const pTitle = (product.title || '').toLowerCase();
            const pSlug = (product.slug || '').toLowerCase();
            // Nếu block có đặc thù riêng (như 'miệng rót' hay 'american grill') mà sản phẩm không phải thì không nạp nhầm
            if (bSt.includes('miệng rót') && !pTitle.includes('miệng rót') && !pSlug.includes('mieng-rot')) return null;
            if (bSt.includes('american grill') && !pTitle.includes('american grill') && !pSlug.includes('american-grill')) return null;
            return single;
          }

          const pTitle = (product.title || '').toLowerCase();
          const pSlug = (product.slug || '').toLowerCase();
          const sTitleNorm = (sTitle || '').toLowerCase();

          let bestBlock = null;
          let maxScore = 0;

          for (const b of blockList) {
            let score = 0;
            const bId = (b.ID || b._id || '').toLowerCase().replace('block-', '');
            const sTitle = (b.sourceTitle || '').toLowerCase();

            // Khớp chính xác cụm từ hoặc slug
            if (sTitle && (pTitle.includes(sTitle) || pSlug.includes(sTitle))) score += 15;
            if (bId && (pSlug.includes(bId) || pTitle.includes(bId))) score += 15;

            // Xử lý dòng STAUB DÁNG TRÒN (Round Cocotte / Mini 10cm, 18-26cm)
            if (sTitle.includes('dáng tròn') && (pTitle.includes('nồi gang') || pTitle.includes('mini') || pSlug.includes('mini') || pSlug.includes('dang-tron'))) {
              score += 20;
            }

            // Khớp từng từ khóa trong tiêu đề nguồn (> 2 ký tự)
            const words = sTitle.split(/\s+/).filter(w => w.length > 2);
            for (const w of words) {
              if (pTitle.includes(w) || pSlug.includes(w)) score += 2;
            }

            if (score > maxScore) {
              maxScore = score;
              bestBlock = b;
            }
          }

          // Dự phòng nếu không có từ khớp riêng: ưu tiên block trùng tên series hoặc block đầu tiên
          if (!bestBlock && blockList.length > 0) {
            for (const b of blockList) {
              const sTitle = (b.sourceTitle || '').toLowerCase();
              if (sTitleNorm && sTitle.includes(sTitleNorm)) return b;
            }
            return blockList[0];
          }

          return bestBlock;
        }

        // 6. Nếu có blocks, truy vấn FeatureItems và đẩy vào Custom Elements
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

          const rawStoryBlocks = blocks.filter((b) => (b.component || 'story') === 'story');
          const rawHotspotBlocks = blocks.filter((b) => b.component === 'highlights');

          // Chọn đúng 1 Story block và 1 Hotspot block tương ứng nhất cho sản phẩm
          const storyBlock = selectBestBlock(rawStoryBlocks, currentProduct, seriesTitle);
          const hotspotBlock = selectBestBlock(rawHotspotBlocks, currentProduct, seriesTitle);

          // Nạp riêng cho Component 1 (Story Section)
          if (storyBlock) {
            if (storyContainer && typeof storyContainer.expand === 'function') storyContainer.expand();
            if (storyEl) {
              if (typeof storyEl.expand === 'function') storyEl.expand();
              safeSet(storyEl, 'blocks', [storyBlock]);
              safeSet(storyEl, 'items', allItems);
            }
          } else {
            if (storyEl) {
              if (typeof storyEl.collapse === 'function') storyEl.collapse();
              safeSet(storyEl, 'blocks', []);
              safeSet(storyEl, 'items', []);
            }
            if (storyContainer && typeof storyContainer.collapse === 'function') storyContainer.collapse();
          }

          // Nạp riêng cho Component 2 (Hotspot / Highlights Section)
          if (hotspotBlock) {
            if (hotspotContainer && typeof hotspotContainer.expand === 'function') hotspotContainer.expand();
            if (hotspotEl) {
              if (typeof hotspotEl.expand === 'function') hotspotEl.expand();
              safeSet(hotspotEl, 'blocks', [hotspotBlock]);
              safeSet(hotspotEl, 'items', allItems);
            }
          } else {
            if (hotspotEl) {
              if (typeof hotspotEl.collapse === 'function') hotspotEl.collapse();
              safeSet(hotspotEl, 'blocks', []);
              safeSet(hotspotEl, 'items', []);
            }
            if (hotspotContainer && typeof hotspotContainer.collapse === 'function') hotspotContainer.collapse();
          }

          // Nạp cho Component gộp nếu vẫn dùng tag cũ
          if (featureBlocksEl) {
            const combinedBlocks = [storyBlock, hotspotBlock].filter(Boolean);
            if (combinedBlocks.length > 0) {
              if (typeof featureBlocksEl.expand === 'function') featureBlocksEl.expand();
              safeSet(featureBlocksEl, 'blocks', combinedBlocks);
              safeSet(featureBlocksEl, 'items', allItems);
            } else {
              if (typeof featureBlocksEl.collapse === 'function') featureBlocksEl.collapse();
            }
          }
        } else {
          // Không có blocks cho sản phẩm này -> Tự động thu gọn (collapse) toàn bộ Custom Elements & Sections
          if (storyEl) {
            if (typeof storyEl.collapse === 'function') storyEl.collapse();
            safeSet(storyEl, 'blocks', []);
            safeSet(storyEl, 'items', []);
          }
          if (storyContainer && typeof storyContainer.collapse === 'function') storyContainer.collapse();

          if (hotspotEl) {
            if (typeof hotspotEl.collapse === 'function') hotspotEl.collapse();
            safeSet(hotspotEl, 'blocks', []);
            safeSet(hotspotEl, 'items', []);
          }
          if (hotspotContainer && typeof hotspotContainer.collapse === 'function') hotspotContainer.collapse();

          if (featureBlocksEl && typeof featureBlocksEl.collapse === 'function') featureBlocksEl.collapse();
        }
      } catch (featErr) {
        console.warn('[Wix Velo] Không thể nạp FeatureBlocks:', featErr);
        // Trong trường hợp lỗi ngoại lệ, thu gọn các phần tử để tránh khung vỡ
        if (storyEl && typeof storyEl.collapse === 'function') storyEl.collapse();
        if (storyContainer && typeof storyContainer.collapse === 'function') storyContainer.collapse();
        if (hotspotEl && typeof hotspotEl.collapse === 'function') hotspotEl.collapse();
        if (hotspotContainer && typeof hotspotContainer.collapse === 'function') hotspotContainer.collapse();
        if (featureBlocksEl && typeof featureBlocksEl.collapse === 'function') featureBlocksEl.collapse();
      }
    }

  } catch (err) {
    console.error('[Wix Velo] Lỗi nạp dữ liệu trang Product (Item):', err);
  }
});
