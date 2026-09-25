/**
 * =========================================================================
 * WIX VELO BACKEND SCRIPT: KIỂM TRA & ĐỒNG BỘ GIÁ TỰ ĐỘNG CHO COLLECTION PRODUCTS
 * =========================================================================
 * File: backend/syncProductPrices.web.js
 *
 * Chức năng:
 *   1. Quét toàn bộ sản phẩm trong collection 'Products'.
 *   2. Kiểm tra các sản phẩm đang bị thiếu trường 'minPrice' hoặc có giá = 0 (dẫn đến hiển thị 'Liên hệ').
 *   3. Tự động đọc giá tương ứng từ collection 'ProductVariants' (trường 'price' và 'compareAtPrice').
 *   4. Ghi trực tiếp giá vào trường 'minPrice' và 'maxPrice' của collection 'Products' bằng bulkUpdate.
 *
 * Cách chạy trong Wix Studio:
 *   1. Mở file này trong Backend của Wix Studio.
 *   2. Bấm icon Play (▶️ Run / Test function) bên cạnh hàm `checkAndSyncProductPrices`.
 *   3. Bấm nút "Run" ở bảng bên phải để kiểm tra và cập nhật tức thì.
 * =========================================================================
 */
import { Permissions, webMethod } from 'wix-web-module';
import wixData from 'wix-data';

export const checkAndSyncProductPrices = webMethod(Permissions.Admin, async () => {
  console.log('🚀 [Sync Prices] Bắt đầu rà soát giá trong Collection Products & ProductVariants...');

  const report = {
    totalProductsScanned: 0,
    productsHadPrice: 0,
    productsMissingPrice: 0,
    productsUpdated: 0,
    updatedSample: [],
    stillMissingSample: [],
    sampleFieldsInCMS: [],
    errors: []
  };

  try {
    // 1. Đọc toàn bộ sản phẩm từ Collection 'Products'
    const prodsRes = await wixData.query('Products')
      .limit(1000)
      .find();

    const products = prodsRes.items;
    report.totalProductsScanned = products.length;

    if (products.length === 0) {
      return {
        success: false,
        message: '⚠️ Collection Products đang trống hoặc không có sản phẩm nào.'
      };
    }

    // Ghi nhận mẫu các trường thực tế có trong CMS để người dùng dễ kiểm tra
    report.sampleFieldsInCMS = Object.keys(products[0]);

    // 2. Đọc toàn bộ biến thể từ Collection 'ProductVariants'
    const variantsRes = await wixData.query('ProductVariants')
      .limit(1000)
      .find();

    const variants = variantsRes.items;
    console.log(`📦 [Sync Prices] Đã tải ${products.length} sản phẩm và ${variants.length} biến thể.`);

    // Xây dựng map giá theo Product ID và SKU
    const variantPriceMap = {};
    for (const v of variants) {
      const prodRef = typeof v.product === 'object' ? (v.product._id || v.product.ID) : v.product;
      const sku = String(v.sku || '').trim();

      const priceData = {
        price: Number(v.price) || 0,
        compareAtPrice: Number(v.compareAtPrice) || 0
      };

      if (prodRef && (!variantPriceMap[prodRef] || v.isDefault)) {
        variantPriceMap[prodRef] = priceData;
      }
      if (sku && (!variantPriceMap[sku] || v.isDefault)) {
        variantPriceMap[sku] = priceData;
      }
    }

    // 3. Rà soát từng sản phẩm xem có giá không
    const toUpdate = [];

    for (const p of products) {
      const currentId = String(p.ID || p._id || '').trim();
      const currentSku = currentId.replace(/^prod-/, '').trim();

      // Kiểm tra các trường giá có thể có trong sản phẩm
      const currentMinPrice = Number(p.minPrice || p.price || p.min_price || p.gia || 0);

      if (currentMinPrice > 0) {
        report.productsHadPrice++;
        // Đảm bảo minPrice luôn có giá trị chuẩn number
        if (!p.minPrice) {
          p.minPrice = currentMinPrice;
          if (!p.maxPrice) p.maxPrice = currentMinPrice;
          toUpdate.push(p);
        }
      } else {
        report.productsMissingPrice++;

        // Tìm giá từ ProductVariants
        let matchedVariant = variantPriceMap[currentId] || 
                             variantPriceMap[p._id] || 
                             variantPriceMap[currentSku];

        if (matchedVariant && matchedVariant.price > 0) {
          p.minPrice = matchedVariant.price;
          if (!p.maxPrice || Number(p.maxPrice) <= 0) {
            p.maxPrice = matchedVariant.price;
          }
          if (matchedVariant.compareAtPrice > 0 && !p.compareAtPrice) {
            p.compareAtPrice = matchedVariant.compareAtPrice;
          }

          toUpdate.push(p);

          if (report.updatedSample.length < 10) {
            report.updatedSample.push({
              title: p.title,
              id: currentId,
              syncedPrice: matchedVariant.price
            });
          }
        } else {
          if (report.stillMissingSample.length < 10) {
            report.stillMissingSample.push({
              title: p.title,
              id: currentId
            });
          }
        }
      }
    }

    console.log(`🎯 [Sync Prices] Tìm thấy: ${report.productsHadPrice} SP đã có giá, ${report.productsMissingPrice} SP thiếu giá.`);
    console.log(`💾 [Sync Prices] Chuẩn bị cập nhật giá cho ${toUpdate.length} sản phẩm vào Database...`);

    // 4. Ghi cập nhật hàng loạt (bulkUpdate) theo batch
    if (toUpdate.length > 0) {
      const BATCH_SIZE = 50;
      for (let i = 0; i < toUpdate.length; i += BATCH_SIZE) {
        const batch = toUpdate.slice(i, i + BATCH_SIZE);
        await wixData.bulkUpdate('Products', batch);
        console.log(` -> Đã ghi batch ${Math.min(i + BATCH_SIZE, toUpdate.length)} / ${toUpdate.length}`);
      }
      report.productsUpdated = toUpdate.length;
    }

    return {
      success: true,
      ...report,
      message: `Đã kiểm tra ${report.totalProductsScanned} sản phẩm: cập nhật thành công giá cho ${report.productsUpdated} sản phẩm!`
    };

  } catch (error) {
    console.error('❌ [Sync Prices Lỗi]:', error);
    report.errors.push(error.message || String(error));
    return {
      success: false,
      ...report,
      error: error.message || String(error)
    };
  }
});
