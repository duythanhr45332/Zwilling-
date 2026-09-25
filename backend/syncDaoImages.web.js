/**
 * =========================================================================
 * WIX VELO BACKEND SCRIPT: TỰ ĐỘNG GẮN ẢNH CHO 35 SẢN PHẨM DAO (V3 - FINAL)
 * =========================================================================
 * Vị trí đặt file trong Wix Studio:
 *   Thư mục: Backend / syncDaoImages.web.js (hoặc syncDaoImages.jsw)
 *
 * Cách chạy:
 *   1. Mở file này trong Wix Studio Code Editor.
 *   2. Bấm vào biểu tượng Play (▶️ Run / Test function) cạnh tên hàm `syncDaoImagesToProducts`.
 *   3. Bấm nút "Run" ở bảng bên phải để thực thi!
 * =========================================================================
 */
import { Permissions, webMethod } from 'wix-web-module';
import { mediaManager } from 'wix-media-backend';
import { elevate } from 'wix-auth';
import wixData from 'wix-data';

export const syncDaoImagesToProducts = webMethod(Permissions.Admin, async () => {
  console.log('🚀 [Sync Images] Bắt đầu quét Media Manager của Wix...');

  const report = {
    totalFilesScanned: 0,
    knifeImagesFound: 0,
    skusFound: 0,
    productsUpdated: 0,
    updatedList: [],
    sampleFiles: [],
    errors: []
  };

  try {
    // 1. Chuẩn bị hàm gọi API với quyền Admin
    let listFilesFn;
    try {
      listFilesFn = elevate(mediaManager.listFiles);
    } catch (e) {
      listFilesFn = mediaManager.listFiles;
    }

    // Hàm trích xuất mảng file an toàn
    function extractFiles(res) {
      if (!res) return [];
      if (Array.isArray(res)) return res;
      if (res.files && Array.isArray(res.files)) return res.files;
      if (res.items && Array.isArray(res.items)) return res.items;
      if (res.fileDescriptors && Array.isArray(res.fileDescriptors)) return res.fileDescriptors;
      return [];
    }

    // Quét file với phân trang
    let allFiles = [];
    let skip = 0;
    const limit = 100;
    let keepReading = true;

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
            console.error('[Sync Images] Lỗi listFiles:', err3.message);
          }
        }
      }

      const batch = extractFiles(rawRes);
      console.log(`[Sync Images] Đợt quét (skip=${skip}): nhận được ${batch.length} file.`);

      if (batch.length === 0) {
        keepReading = false;
      } else {
        allFiles.push(...batch);
        skip += batch.length;
        if (batch.length < limit || allFiles.length >= 1000) {
          keepReading = false;
        }
      }
    }

    report.totalFilesScanned = allFiles.length;
    console.log(`📁 [Sync Images] Tổng cộng tìm thấy: ${allFiles.length} file trong Media Manager.`);

    // 2. Gom nhóm ảnh theo SKU từ tên file gốc (originalFileName / URL)
    // Tên file gốc chuẩn: "30570-231_Main Image_001.jpg" hoặc "30570-231_Gallery_001.jpg"
    const skuMap = {};

    for (const f of allFiles) {
      // Ưu tiên originalFileName và displayName (vì f.fileName của Wix là mã hash nội bộ)
      let fileName = f.originalFileName || f.displayName || f.title || '';
      let fileUrl = f.fileUrl || f.url || '';

      // Nếu fileName rỗng hoặc chưa chứa 'main'/'gallery', trích xuất từ fileUrl:
      // Định dạng: wix:image://v1/<hash>/<original_name.jpg>#...
      if ((!fileName || (!fileName.toLowerCase().includes('main') && !fileName.toLowerCase().includes('gallery'))) && fileUrl) {
        try {
          const urlParts = fileUrl.split('/');
          if (urlParts.length >= 5) {
            const decoded = decodeURIComponent(urlParts[4].split('#')[0]);
            if (decoded && (decoded.toLowerCase().includes('main') || decoded.toLowerCase().includes('gallery'))) {
              fileName = decoded;
            }
          }
        } catch (e) {}
      }

      // Fallback cuối
      if (!fileName) {
        fileName = f.fileName || f.name || '';
      }

      if (!fileName || !fileName.includes('_')) continue;

      const parts = fileName.split('_');
      const sku = parts[0].trim();

      if (!fileUrl) continue;

      if (!skuMap[sku]) {
        skuMap[sku] = {
          mainImage: '',
          gallery: []
        };
      }

      const lowerName = fileName.toLowerCase();
      if (lowerName.includes('main image') || lowerName.includes('main')) {
        skuMap[sku].mainImage = fileUrl;
        report.knifeImagesFound++;
      } else if (lowerName.includes('gallery')) {
        skuMap[sku].gallery.push({
          name: fileName,
          url: fileUrl
        });
        report.knifeImagesFound++;
      }
    }

    // Sắp xếp gallery theo đúng thứ tự (001, 002, 003...)
    for (const sku in skuMap) {
      skuMap[sku].gallery.sort((a, b) => a.name.localeCompare(b.name));
    }

    report.skusFound = Object.keys(skuMap).length;
    console.log(`🎯 [Sync Images] Nhận diện thành công ${report.knifeImagesFound} ảnh Dao thuộc ${report.skusFound} SKU!`);
    console.log('[Sync Images] Các SKU nhận diện được:', Object.keys(skuMap).slice(0, 10).join(', ') + '...');

    if (report.skusFound === 0) {
      console.warn('⚠️ Không tìm thấy ảnh nào khớp tên SKU_Main Image hoặc SKU_Gallery.');
      return {
        ...report,
        message: 'Không nhận diện được ảnh Dao. Vui lòng kiểm tra lại tên file trên Media Manager.'
      };
    }

    // 3. Đọc dữ liệu từ collection 'Products' trong Wix CMS
    const productsRes = await wixData.query('Products')
      .limit(1000)
      .find();

    const products = productsRes.items;
    console.log(`📦 [Sync Images] Đang rà soát ${products.length} sản phẩm trong Collection Products...`);

    const toUpdate = [];

    for (const p of products) {
      // ID dạng "prod-30570-231" -> Lấy "30570-231"
      const currentId = String(p._id || p.ID || p.id || '').trim();
      const currentSku = currentId.replace(/^prod-/, '').trim();

      let matchedData = skuMap[currentSku];
      if (!matchedData && p.sku) {
        matchedData = skuMap[String(p.sku).trim()];
      }

      if (matchedData) {
        let changed = false;

        // Cập nhật mainImage
        if (matchedData.mainImage && p.mainImage !== matchedData.mainImage) {
          p.mainImage = matchedData.mainImage;
          changed = true;
        }

        // Cập nhật gallery chuẩn định dạng Media Gallery của Wix CMS (Array of objects)
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
      }
    }

    // 4. Cập nhật hàng loạt (bulkUpdate)
    if (toUpdate.length > 0) {
      console.log(`💾 [Sync Images] Đang cập nhật ${toUpdate.length} sản phẩm Dao vào Database...`);
      await wixData.bulkUpdate('Products', toUpdate);
      report.productsUpdated = toUpdate.length;
      console.log(`🎉 [Sync Images] HOÀN TẤT! Đã gán ảnh thành công cho ${toUpdate.length} sản phẩm Dao.`);
    } else {
      console.log('ℹ️ [Sync Images] Tất cả sản phẩm đã có ảnh từ trước hoặc không cần cập nhật.');
    }

    return {
      success: true,
      ...report,
      message: `Đã cập nhật thành công ${toUpdate.length} sản phẩm Dao!`
    };

  } catch (error) {
    console.error('❌ [Sync Images Lỗi]:', error);
    report.errors.push(error.message || String(error));
    return {
      success: false,
      ...report,
      error: error.message || String(error)
    };
  }
});
