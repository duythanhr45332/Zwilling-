/**
 * =========================================================================
 * WIX VELO BACKEND SCRIPT: TỰ ĐỘNG GẮN ẢNH CHO TOÀN BỘ SẢN PHẨM (ALL PRODUCTS)
 * =========================================================================
 * File: backend/syncAllProductImages.web.js
 *
 * Tính năng:
 *   1. Tự động quét toàn bộ thư viện Media Manager của Wix (không giới hạn 1000 ảnh).
 *   2. Nhận diện SKU tự động từ tên file:
 *        - "<SKU>_Main Image_001.jpg" -> Gán vào trường 'mainImage'
 *        - "<SKU>_Gallery_001.jpg"   -> Gán vào trường 'gallery' (sắp xếp 001, 002, 003...)
 *   3. Khớp chính xác với Collection 'Products' trong Wix CMS qua ID (`prod-<SKU>`) hoặc trường `sku`.
 *   4. Cập nhật hàng loạt (bulkUpdate) nhanh chóng, an toàn.
 *
 * Cách chạy trong Wix Studio:
 *   1. Copy toàn bộ code này vào file Backend: `syncAllProductImages.web.js`
 *   2. Bấm vào icon Play (▶️ Run / Test function) bên cạnh dòng `syncAllProductImagesToCMS`.
 *   3. Bấm nút "Run" ở bảng bên phải để bắt đầu quét và cập nhật.
 * =========================================================================
 */
import { Permissions, webMethod } from 'wix-web-module';
import { mediaManager } from 'wix-media-backend';
import { elevate } from 'wix-auth';
import wixData from 'wix-data';

export const syncAllProductImagesToCMS = webMethod(Permissions.Admin, async () => {
  console.log('🚀 [Sync All Images] Bắt đầu quét toàn bộ ảnh trong Media Manager...');

  const report = {
    totalFilesScanned: 0,
    productImagesMatched: 0,
    skusFound: 0,
    productsUpdated: 0,
    updatedList: [],
    unmatchedSkus: [],
    productsWithoutImages: [],
    errors: []
  };

  try {
    // 1. Khởi tạo hàm gọi Media Manager với quyền Admin
    let listFilesFn;
    try {
      listFilesFn = elevate(mediaManager.listFiles);
    } catch (e) {
      listFilesFn = mediaManager.listFiles;
    }

    function extractFiles(res) {
      if (!res) return [];
      if (Array.isArray(res)) return res;
      if (res.files && Array.isArray(res.files)) return res.files;
      if (res.items && Array.isArray(res.items)) return res.items;
      if (res.fileDescriptors && Array.isArray(res.fileDescriptors)) return res.fileDescriptors;
      return [];
    }

    // 2. Quét toàn bộ file trong Media Manager với phân trang (hỗ trợ > 1500 file)
    let allFiles = [];
    let skip = 0;
    const limit = 100;
    let keepReading = true;
    const MAX_FILES = 5000; // Giới hạn an toàn tối đa 5000 file

    while (keepReading) {
      let rawRes = null;
      try {
        rawRes = await listFilesFn(null, null, { limit, skip });
      } catch (err1) {
        try {
          rawRes = await listFilesFn({ paging: { limit, skip } });
        } catch (err2) {
          try {
            rawRes = await listFilesFn();
          } catch (err3) {
            console.error('[Sync All Images] Lỗi listFiles:', err3.message);
          }
        }
      }

      const batch = extractFiles(rawRes);
      console.log(`[Sync All Images] Đợt quét (skip=${skip}): nhận được ${batch.length} file.`);

      if (batch.length === 0) {
        keepReading = false;
      } else {
        allFiles.push(...batch);
        skip += batch.length;
        if (batch.length < limit || allFiles.length >= MAX_FILES) {
          keepReading = false;
        }
      }
    }

    report.totalFilesScanned = allFiles.length;
    console.log(`📁 [Sync All Images] Tổng cộng tìm thấy: ${allFiles.length} file trong Media Manager.`);

    // 3. Gom nhóm ảnh theo SKU từ tên file
    // Cấu trúc tên: "<SKU>_Main Image_001.jpg" hoặc "<SKU>_Gallery_001.jpg"
    const skuMap = {};

    for (const f of allFiles) {
      let fileName = f.originalFileName || f.displayName || f.title || '';
      let fileUrl = f.fileUrl || f.url || '';

      // Fallback: Lấy tên file gốc từ URL nếu Wix mã hóa
      if ((!fileName || (!fileName.toLowerCase().includes('main') && !fileName.toLowerCase().includes('gallery'))) && fileUrl) {
        try {
          const urlParts = fileUrl.split('/');
          if (urlParts.length >= 5) {
            const decoded = decodeURIComponent(urlParts[4].split('#')[0]);
            if (decoded && (decoded.toLowerCase().includes('main') || decoded.toLowerCase().includes('gallery'))) {
              fileName = decoded;
            }
          }
        } catch (e) { }
      }

      if (!fileName) {
        fileName = f.fileName || f.name || '';
      }

      if (!fileName || !fileName.includes('_')) continue;

      const parts = fileName.split('_');
      const sku = parts[0].trim();

      if (!sku || !fileUrl) continue;

      if (!skuMap[sku]) {
        skuMap[sku] = {
          mainImage: '',
          gallery: []
        };
      }

      const lowerName = fileName.toLowerCase();
      if (lowerName.includes('main image') || lowerName.includes('main')) {
        skuMap[sku].mainImage = fileUrl;
        report.productImagesMatched++;
      } else if (lowerName.includes('gallery')) {
        skuMap[sku].gallery.push({
          name: fileName,
          url: fileUrl
        });
        report.productImagesMatched++;
      }
    }

    // Sắp xếp gallery theo đúng thứ tự 001, 002, 003...
    for (const sku in skuMap) {
      skuMap[sku].gallery.sort((a, b) => a.name.localeCompare(b.name));
    }

    report.skusFound = Object.keys(skuMap).length;
    console.log(`🎯 [Sync All Images] Nhận diện được ${report.productImagesMatched} ảnh thuộc ${report.skusFound} SKU!`);

    if (report.skusFound === 0) {
      return {
        ...report,
        success: false,
        message: '⚠️ Không nhận diện được ảnh nào có định dạng SKU_Main Image hoặc SKU_Gallery.'
      };
    }

    // 4. Đọc toàn bộ danh sách sản phẩm trong Collection 'Products'
    const productsRes = await wixData.query('Products')
      .limit(1000)
      .find();

    const products = productsRes.items;
    console.log(`📦 [Sync All Images] Đang đối soát với ${products.length} sản phẩm trong Collection 'Products'...`);

    const toUpdate = [];

    for (const p of products) {
      const currentId = String(p._id || p.ID || p.id || '').trim();
      const currentSku = currentId.replace(/^prod-/, '').trim();

      let matchedData = skuMap[currentSku];
      if (!matchedData && p.sku) {
        matchedData = skuMap[String(p.sku).trim()];
      }

      if (matchedData) {
        let changed = false;

        // Cập nhật ảnh đại diện (mainImage)
        if (matchedData.mainImage && p.mainImage !== matchedData.mainImage) {
          p.mainImage = matchedData.mainImage;
          changed = true;
        }

        // Cập nhật bộ sưu tập ảnh (gallery) theo chuẩn Media Gallery của Wix
        if (matchedData.gallery.length > 0) {
          p.gallery = matchedData.gallery.map(g => ({
            src: g.url,
            type: 'image',
            title: g.name
          }));
          changed = true;
        }

        if (changed) {
          if (!p._id && (p.ID || p.id)) {
            p._id = p.ID || p.id;
          }
          toUpdate.push(p);
          report.updatedList.push({
            id: p._id,
            sku: currentSku,
            title: p.title,
            hasMainImage: !!p.mainImage,
            galleryCount: matchedData.gallery.length
          });
        }
      } else {
        report.productsWithoutImages.push({
          id: currentId,
          sku: currentSku,
          title: p.title
        });
      }
    }

    // 5. Cập nhật hàng loạt vào database theo từng batch nhỏ (tránh overload Wix Data)
    if (toUpdate.length > 0) {
      console.log(`💾 [Sync All Images] Bắt đầu ghi dữ liệu cho ${toUpdate.length} sản phẩm...`);
      const BATCH_SIZE = 50;
      for (let i = 0; i < toUpdate.length; i += BATCH_SIZE) {
        const batch = toUpdate.slice(i, i + BATCH_SIZE);
        await wixData.bulkUpdate('Products', batch);
        console.log(` -> Đã ghi batch ${Math.min(i + BATCH_SIZE, toUpdate.length)} / ${toUpdate.length}`);
      }
      report.productsUpdated = toUpdate.length;
      console.log(`🎉 [Sync All Images] THÀNH CÔNG! Đã gán ảnh cho ${toUpdate.length} sản phẩm.`);
    } else {
      console.log('ℹ️ [Sync All Images] Tất cả sản phẩm đều đã có ảnh hoặc không có thay đổi mới.');
    }

    return {
      success: true,
      ...report,
      message: `Đã cập nhật thành công ảnh cho ${toUpdate.length} sản phẩm!`
    };

  } catch (error) {
    console.error('❌ [Sync All Images Lỗi]:', error);
    report.errors.push(error.message || String(error));
    return {
      success: false,
      ...report,
      error: error.message || String(error)
    };
  }
});
