/**
 * File: backend/syncDaoImages.web.js (hoặc đặt trong backend code của Wix Studio)
 * Mục đích: Tự động quét 219 ảnh Dao đã tải lên Wix Media Manager
 * và cập nhật thẳng vào cột 'mainImage' và 'gallery' trong Collection 'Products' theo SKU.
 */
import { Permissions, webMethod } from 'wix-web-module';
import { mediaManager } from 'wix-media-backend';
import wixData from 'wix-data';

export const syncDaoImagesToProducts = webMethod(Permissions.Admin, async () => {
  console.log('[Sync Images] Bắt đầu quét Media Manager...');

  try {
    // 1. Quét danh sách file trong Media Manager (lấy tối đa 500 file gần nhất)
    const mediaFiles = await mediaManager.listFiles({
      limit: 500
    });

    const files = mediaFiles.files || mediaFiles.items || [];
    console.log(`[Sync Images] Tìm thấy ${files.length} file trên Media Manager.`);

    // 2. Gom nhóm ảnh theo SKU từ tên file gốc (fileName)
    // Ví dụ: "30570-231_Main Image_001.jpg" hoặc "30570-231_Gallery_001.jpg"
    const skuMap = {};

    for (const f of files) {
      const originalName = f.fileName || f.originalFileName || f.title || '';
      if (!originalName.includes('_')) continue;

      const sku = originalName.split('_')[0].trim();
      if (!skuMap[sku]) {
        skuMap[sku] = {
          mainImage: '',
          gallery: []
        };
      }

      // Wix fileUrl trả về định dạng chuẩn: wix:image://v1/...
      const fileUrl = f.fileUrl;

      if (originalName.includes('Main Image')) {
        skuMap[sku].mainImage = fileUrl;
      } else if (originalName.includes('Gallery')) {
        skuMap[sku].gallery.push({
          fileName: originalName,
          fileUrl: fileUrl
        });
      }
    }

    // Sắp xếp gallery theo đúng thứ tự 001, 002, 003...
    for (const sku in skuMap) {
      skuMap[sku].gallery.sort((a, b) => a.fileName.localeCompare(b.fileName));
    }

    const matchedSkus = Object.keys(skuMap);
    console.log(`[Sync Images] Nhận diện được ${matchedSkus.length} SKU từ danh sách ảnh.`);

    // 3. Đọc dữ liệu từ collection 'Products'
    const productsRes = await wixData.query('Products')
      .limit(1000)
      .find();

    const products = productsRes.items;
    const toUpdate = [];

    for (const p of products) {
      // ID dạng "prod-30570-231" -> Lấy "30570-231"
      const sku = (p._id || p.ID || '').replace('prod-', '').trim();

      if (skuMap[sku]) {
        const imageInfo = skuMap[sku];
        let hasChange = false;

        // Cập nhật mainImage
        if (imageInfo.mainImage && p.mainImage !== imageInfo.mainImage) {
          p.mainImage = imageInfo.mainImage;
          hasChange = true;
        }

        // Cập nhật gallery (nối các URL bằng dấu chấm phẩy ;)
        if (imageInfo.gallery.length > 0) {
          const galleryStr = imageInfo.gallery.map(g => g.fileUrl).join(';');
          if (p.gallery !== galleryStr) {
            p.gallery = galleryStr;
            hasChange = true;
          }
        }

        if (hasChange) {
          toUpdate.push(p);
        }
      }
    }

    // 4. Lưu lại vào collection 'Products'
    if (toUpdate.length > 0) {
      await wixData.bulkUpdate('Products', toUpdate);
      console.log(`[Sync Images] Đã cập nhật thành công ${toUpdate.length} sản phẩm!`);
    } else {
      console.log('[Sync Images] Không có sản phẩm nào cần cập nhật mới.');
    }

    return {
      success: true,
      totalFiles: files.length,
      skusFound: matchedSkus.length,
      productsUpdated: toUpdate.length,
      updatedSkus: toUpdate.map(p => (p._id || p.ID).replace('prod-', ''))
    };

  } catch (error) {
    console.error('[Sync Images Lỗi]:', error);
    return {
      success: false,
      error: error.message || error
    };
  }
});
