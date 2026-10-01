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
      } catch (e) { }
    }
    return null;
  }

  function findContainer(ids) {
    for (const id of ids) {
      try {
        const el = $w(id);
        if (el && typeof el.collapse === 'function') return el;
      } catch (e) { }
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
    } catch (e) { }

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
            } catch (e) { }
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
          } catch (e) { }
        }

        // 4. Cách 3: Nạp danh sách FeatureBlocks có sẵn trong CMS để chọn lọc
        if (blocks.length === 0) {
          try {
            const allBlocksRes = await wixData.query('FeatureBlocks')
              .limit(100)
              .find();
            if (allBlocksRes.items && allBlocksRes.items.length > 0) {
              blocks = allBlocksRes.items;
            }
          } catch (e) {
            console.warn('[Wix Velo] Không thể truy vấn FeatureBlocks:', e);
          }
        }

        console.log('[Wix Velo PDP] Số blocks tìm thấy động:', blocks.length, 'cho sản phẩm:', currentProduct.title);

        // Hàm chọn lọc block chính xác nhất cho từng sản phẩm (tránh gộp nhiều block của cả series vào một sản phẩm)
        function selectBestBlock(blockList, product, sTitle) {
          if (!blockList || blockList.length === 0) return null;
          const pTitle = (product.title || product.name || '').toLowerCase();
          const pSlug = (product.slug || '').toLowerCase();
          const sTitleNorm = (sTitle || '').toLowerCase();

          // Chuẩn hóa loại bỏ brand name nằm xen giữa slug và title (giúp khớp chính xác như: chảo gang staub có miệng rót -> chảo gang có miệng rót)
          const pTitleClean = pTitle.replace(/zwilling|staub|miyabi|ballarini/gi, '').replace(/\s+/g, ' ').trim();
          const pSlugClean = pSlug.replace(/-(zwilling|staub|miyabi|ballarini)-/gi, '-').replace(/^-(zwilling|staub|miyabi|ballarini)-/, '');

          // Chuẩn hóa đồng nghĩa Set <-> Bộ
          const pTitleSynonym = pTitleClean.replace(/\bset\b/gi, 'bộ');
          const pSlugSynonym = pSlugClean.replace(/set-/g, 'bo-');

          let bestBlock = null;
          let maxScore = 0;

          for (const b of blockList) {
            let score = 0;
            const bId = (b.ID || b._id || '').toLowerCase().replace('block-', '');
            const bSt = (b.sourceTitle || '').toLowerCase();
            const bStClean = bSt.replace(/\s*\/\s*storage/gi, '').replace(/\s*\(.*?\)/g, '').trim();
            const bIdClean = bId.replace(/-\d+$/, '').replace(/-storage$/, '');

            // Loại trừ nếu block có đặc thù riêng không khớp sản phẩm
            if (bSt.includes('miệng rót') && !pTitle.includes('miệng rót') && !pSlug.includes('mieng-rot')) continue;
            if (bSt.includes('american grill') && !pTitle.includes('american grill') && !pSlug.includes('american-grill')) continue;

            // Phân biệt nồi gang vs âu sứ khi có từ khóa trùng như bí ngô, cà chua
            if (bSt.includes('âu sứ') && (pTitle.includes('nồi gang') || pSlug.includes('noi-gang'))) continue;
            if ((bSt.includes('staub pumpkin') || bSt.includes('dáng bí ngô')) && (pTitle.includes('âu sứ') || pSlug.includes('au-su'))) continue;

            // Khớp chính xác cụm từ hoặc slug (bao gồm cả dạng đồng nghĩa bộ/set và bStClean)
            if (bSt && (pTitle.includes(bSt) || pSlug.includes(bSt) || pTitleClean.includes(bSt) || pSlugClean.includes(bSt))) score += 20;
            if (bStClean && bStClean !== bSt && (pTitle.includes(bStClean) || pSlug.includes(bStClean) || pTitleSynonym.includes(bStClean) || pSlugSynonym.includes(bStClean.replace(/\s+/g, '-')))) score += 20;

            if (bId && (pSlug.includes(bId) || pTitle.includes(bId) || pSlugClean.includes(bId) || pTitleClean.includes(bId))) score += 20;
            if (bIdClean && (pSlug.includes(bIdClean) || pTitle.includes(bIdClean.replace(/-/g, ' ')) || pSlugClean.includes(bIdClean) || pSlugSynonym.includes(bIdClean) || pTitleSynonym.includes(bIdClean.replace(/-/g, ' ')))) score += 25;

            // Đặc thù: Bộ/Set đựng gia vị
            if ((bIdClean.includes('dung-gia-vi') || bSt.includes('đựng gia vị')) && (pSlug.includes('dung-gia-vi') || pTitle.includes('đựng gia vị'))) {
              score += 35;
            }

            // Đặc thù: Âu sứ Bí Ngô / Cà Chua / Ớt Chuông
            if (bSt.includes('âu sứ') && bSt.includes('bí ngô') && (pSlug.includes('bi-ngo') || pTitle.includes('bí ngô')) && (pSlug.includes('au-su') || pTitle.includes('âu sứ'))) score += 35;
            if (bSt.includes('âu sứ') && bSt.includes('cà chua') && (pSlug.includes('ca-chua') || pTitle.includes('cà chua')) && (pSlug.includes('au-su') || pTitle.includes('âu sứ'))) score += 35;
            if (bSt.includes('ớt chuông') && (pSlug.includes('ot-chuong') || pTitle.includes('ớt chuông'))) score += 35;

            // Đặc thù: Khay nướng sứ
            if (bSt.includes('khay nướng sứ') && (pSlug.includes('khay-nuong') || pTitle.includes('khay nướng'))) score += 35;

            // Đặc thù: Dụng cụ nấu ăn silicone
            if (bSt.includes('silicone') && bSt.includes('dụng cụ nấu') && (pSlug.includes('silicone') || pTitle.includes('silicone')) && (pSlug.includes('xeng') || pSlug.includes('va-') || pSlug.includes('co-phet') || pTitle.includes('xẻng') || pTitle.includes('vá') || pTitle.includes('cọ phết'))) score += 35;

            // Đặc thù: Thớt Ebony
            if (bSt.includes('thớt ebony') && (pSlug.includes('thot') || pTitle.includes('thớt')) && (pSlug.includes('ebony') || pTitle.includes('ebony'))) score += 35;

            // Đặc thù: Dinnerware sứ (Dĩa sứ, Tô sứ, Chén sứ, Cốc sứ)
            if ((bSt.includes('dinnerware') || bIdClean.includes('dinnerware')) && (pSlug.includes('dia-su') || pSlug.includes('to-su') || pSlug.includes('chen-su') || pSlug.includes('chen-dia') || pSlug.includes('coc-') || pTitle.includes('dĩa sứ') || pTitle.includes('tô sứ') || pTitle.includes('chén sứ') || pTitle.includes('chén dĩa') || pTitle.includes('cốc'))) score += 35;

            // Đặc thù: Fresh & Save Túi, Nắp, Bộ 27/40 món
            if (bSt.includes('túi hút chân không') && (pSlug.includes('tui-bao-quan') || pTitle.includes('túi bảo quản') || pSlug.includes('tui-hut-chan-khong') || pTitle.includes('túi hút chân không'))) score += 35;
            if (bSt.includes('nắp hút chân không') && (pSlug.includes('nap-hut-chan-khong') || pTitle.includes('nắp hút chân không'))) score += 35;
            if (bSt.includes('hút chân không 27 / 40') && (pSlug.includes('27-mon') || pSlug.includes('40-mon') || pTitle.includes('27 món') || pTitle.includes('40 món'))) score += 35;

            // Xử lý dòng STAUB DÁNG TRÒN (Round Cocotte / Mini 10cm, 18-26cm)
            if (bSt.includes('dáng tròn') && (pTitle.includes('nồi gang') || pTitle.includes('mini') || pSlug.includes('mini') || pSlug.includes('dang-tron') || pTitle.includes('tròn') || pSlug.includes('tron'))) {
              score += 15;
            }

            // Khớp từng từ khóa trong tiêu đề nguồn (> 2 ký tự, bỏ qua tên thương hiệu chung)
            const brandWords = ['zwilling', 'staub', 'miyabi', 'ballarini', 'demeyere'];
            const words = bSt.split(/\s+/).filter(w => w.length > 2 && !brandWords.includes(w));
            for (const w of words) {
              if (pTitle.includes(w) || pSlug.includes(w)) score += 3;
            }

            if (score > maxScore) {
              maxScore = score;
              bestBlock = b;
            }
          }

          if (maxScore >= 15) return bestBlock;

          // Dự phòng nếu không có từ khớp riêng: ưu tiên block trùng tên series
          if (sTitleNorm) {
            for (const b of blockList) {
              const bSt = (b.sourceTitle || '').toLowerCase();
              if (bSt && bSt.includes(sTitleNorm)) return b;
            }
          }

          return null;
        }

        // 6. Nếu có blocks, chọn lọc đúng storyBlock và hotspotBlock trước, sau đó chỉ truy vấn FeatureItems của đúng 2 block đó
        if (blocks.length > 0) {
          const rawStoryBlocks = blocks.filter((b) => (b.component || 'story') === 'story');
          const rawHotspotBlocks = blocks.filter((b) => b.component === 'highlights');

          // Chọn đúng 1 Story block và 1 Hotspot block tương ứng nhất cho sản phẩm
          const storyBlock = selectBestBlock(rawStoryBlocks, currentProduct, seriesTitle);
          const hotspotBlock = selectBestBlock(rawHotspotBlocks, currentProduct, seriesTitle);

          console.log('[Wix Velo PDP] Block chọn lọc:', {
            story: storyBlock ? (storyBlock._id || storyBlock.ID) : 'NONE',
            hotspot: hotspotBlock ? (hotspotBlock._id || hotspotBlock.ID) : 'NONE'
          });

          let storyItems = [];
          let hotspotItems = [];

          // Truy vấn FeatureItems riêng cho Story Block (chuẩn CMS relational query)
          if (storyBlock) {
            try {
              const sId = storyBlock._id || storyBlock.ID || '';
              const sRes = await wixData.query('FeatureItems')
                .eq('block', sId)
                .ascending('position')
                .limit(20)
                .find();
              storyItems = sRes.items || [];

              if (storyItems.length === 0 && storyBlock.title) {
                const sRes2 = await wixData.query('FeatureItems')
                  .eq('block', storyBlock.title)
                  .ascending('position')
                  .limit(20)
                  .find();
                if (sRes2.items.length > 0) storyItems = sRes2.items;
              }
            } catch (itemErr) {
              console.warn('[Wix Velo] Lỗi khi truy vấn Story FeatureItems:', itemErr);
            }
          }

          // Truy vấn FeatureItems riêng cho Hotspot Block (chuẩn CMS relational query)
          if (hotspotBlock) {
            try {
              const hId = hotspotBlock._id || hotspotBlock.ID || '';
              const hRes = await wixData.query('FeatureItems')
                .eq('block', hId)
                .ascending('position')
                .limit(20)
                .find();
              hotspotItems = hRes.items || [];

              if (hotspotItems.length === 0 && hotspotBlock.title) {
                const hRes2 = await wixData.query('FeatureItems')
                  .eq('block', hotspotBlock.title)
                  .ascending('position')
                  .limit(20)
                  .find();
                if (hRes2.items.length > 0) hotspotItems = hRes2.items;
              }
            } catch (itemErr) {
              console.warn('[Wix Velo] Lỗi khi truy vấn Hotspot FeatureItems:', itemErr);
            }
          }

          console.log('[Wix Velo PDP] Số Story items:', storyItems.length, '| Số Hotspot items:', hotspotItems.length);

          // Nạp riêng cho Component 1 (Story Section)
          if (storyBlock) {
            if (storyContainer && typeof storyContainer.expand === 'function') storyContainer.expand();
            if (storyEl) {
              if (typeof storyEl.expand === 'function') storyEl.expand();
              safeSet(storyEl, 'blocks', [storyBlock]);
              safeSet(storyEl, 'items', storyItems);
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
              safeSet(hotspotEl, 'items', hotspotItems);
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
            const combinedItems = [...storyItems, ...hotspotItems];
            if (combinedBlocks.length > 0) {
              if (typeof featureBlocksEl.expand === 'function') featureBlocksEl.expand();
              safeSet(featureBlocksEl, 'blocks', combinedBlocks);
              safeSet(featureBlocksEl, 'items', combinedItems);
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

    // 7. Nạp Component Related Products (Chỉ hiển thị 4 sản phẩm cùng danh mục)
    const relatedEl = findElement(['#relatedProducts', '#wxRelatedProducts', '#compRelatedProducts', '#related']);
    const relatedContainer = findContainer(['#sectionRelatedProducts', '#relatedSection', '#relatedContainer']);

    if (relatedEl) {
      try {
        const catId = currentProduct.category;
        const currentProdId = currentProduct._id || currentProduct.ID;

        // Truy vấn tối đa 4 sản phẩm cùng danh mục, loại trừ sản phẩm hiện tại
        let relatedItems = [];
        if (catId) {
          const relRes = await wixData.query('Products')
            .eq('category', catId)
            .ne('_id', currentProdId)
            .limit(4)
            .find();
          relatedItems = relRes.items;
        }

        // Nếu danh mục con có ít hơn 4 sản phẩm, bổ sung thêm sản phẩm cùng Brand
        if (relatedItems.length < 4 && currentProduct.brand) {
          const remainingCount = 4 - relatedItems.length;
          const excludeIds = [currentProdId, ...relatedItems.map(p => p._id || p.ID)].filter(Boolean);
          const brandRes = await wixData.query('Products')
            .eq('brand', currentProduct.brand)
            .not(wixData.query('Products').hasSome('_id', excludeIds))
            .limit(remainingCount)
            .find();
          relatedItems = [...relatedItems, ...brandRes.items];
        }

        if (relatedItems.length > 0) {
          if (relatedContainer && typeof relatedContainer.expand === 'function') relatedContainer.expand();
          if (typeof relatedEl.expand === 'function') relatedEl.expand();
          safeSet(relatedEl, 'products', relatedItems);
        } else {
          if (relatedContainer && typeof relatedContainer.collapse === 'function') relatedContainer.collapse();
          if (typeof relatedEl.collapse === 'function') relatedEl.collapse();
        }

        // Lắng nghe sự kiện click sản phẩm để điều hướng sang trang PDP mới
        safeOn(relatedEl, 'product-select', (e) => {
          const targetProduct = e.detail?.product;
          if (targetProduct && targetProduct.slug) {
            wixLocation.to(`/product/${targetProduct.slug}`);
          }
        });
      } catch (relErr) {
        console.warn('[Wix Velo] Lỗi nạp dữ liệu Related Products:', relErr);
      }
    }

  } catch (err) {
    console.error('[Wix Velo] Lỗi nạp dữ liệu trang Product (Item):', err);
  }
});
