import wixData from 'wix-data';
import wixLocation from 'wix-location';

/**
 * Mã Velo cho trang ZWILLING STORES (Hệ thống cửa hàng)
 * - Tự động thiết lập Breadcrumb: "TRANG CHỦ > CỬA HÀNG" (hỗ trợ ID #bestsellerBreadcrumb hoặc #breadcrumb)
 * - Tự động kết nối Custom Element <wx-store-locator> với Bộ sưu tập CMS 'Stores'
 */
$w.onReady(async function () {
  console.log('[Wix Velo] Đang khởi tạo trang ZWILLING STORES...');

  // Helper tìm kiếm phần tử an toàn theo danh sách candidate IDs
  function findElement(ids) {
    for (const id of ids) {
      try {
        const el = $w(id);
        if (el && typeof el.setAttribute === 'function') {
          return el;
        }
      } catch (e) {}
    }
    return null;
  }

  // Helper gán thuộc tính an toàn cho Wix Custom Element (luôn dùng setAttribute)
  function safeSet(elOrSelector, attrName, val) {
    try {
      const el = typeof elOrSelector === 'string' ? $w(elOrSelector) : elOrSelector;
      if (el && typeof el.setAttribute === 'function') {
        if (val === null || val === undefined || val === false || val === 'false') {
          if (typeof el.removeAttribute === 'function') {
            el.removeAttribute(attrName);
          }
        } else {
          el.setAttribute(attrName, typeof val === 'string' ? val : JSON.stringify(val));
        }
      }
      try {
        if (el) el[attrName] = val;
      } catch (e) {}
    } catch (e) {}
  }

  // ==========================================
  // 1. CẤU HÌNH BREADCRUMB: "TRANG CHỦ > CỬA HÀNG"
  // ==========================================
  const breadcrumbEl = findElement([
    '#bestsellerBreadcrumb',
    '#storeBreadcrumb',
    '#breadcrumb',
    '#wxBreadcrumb',
    '#customElementBreadcrumb'
  ]);

  if (breadcrumbEl) {
    // Xóa cờ loading (nếu có) để hủy trạng thái skeleton ngay lập tức
    if (typeof breadcrumbEl.removeAttribute === 'function') {
      try { breadcrumbEl.removeAttribute('loading'); } catch (e) {}
    }

    safeSet(breadcrumbEl, 'lang', 'vi');

    // Gán dữ liệu hiển thị Breadcrumb
    const breadcrumbItems = [
      { label: 'TRANG CHỦ', url: '/' },
      { label: 'CỬA HÀNG', url: '/stores' }
    ];
    safeSet(breadcrumbEl, 'items', breadcrumbItems);

    // Lắng nghe sự kiện click trên Breadcrumb để chuyển hướng
    try {
      if (typeof breadcrumbEl.on === 'function') {
        breadcrumbEl.on('breadcrumb-click', (event) => {
          const url = event?.detail?.item?.url;
          if (url && url !== '#') {
            wixLocation.to(url);
          }
        });
      }
    } catch (e) {}
    console.log('[Wix Velo] Đã thiết lập Breadcrumb thành công: TRANG CHỦ > CỬA HÀNG');
  }

  // ==========================================
  // 2. CẤU HÌNH STORE LOCATOR (HỆ THỐNG CỬA HÀNG)
  // ==========================================
  const locatorEl = findElement([
    '#storeLocator',
    '#wxStoreLocator',
    '#stores',
    '#customElement1',
    '#customElement2'
  ]);

  if (locatorEl) {
    safeSet(locatorEl, 'lang', 'vi');

    try {
      // Truy vấn dữ liệu từ bộ sưu tập CMS 'Stores'
      const res = await wixData.query('Stores')
        .ascending('position')
        .find();

      if (res.items && res.items.length > 0) {
        console.log(`[Wix Velo] Đã nạp ${res.items.length} cửa hàng từ CMS Stores.`);
        // Chuẩn hóa dữ liệu cửa hàng từ Wix CMS để đảm bảo đầy đủ id, latitude, longitude
        const normalizedStores = res.items.map((s, index) => {
          const storeId = s._id || s.id || s.ID || `store-${index}`;
          return {
            ...s,
            id: storeId,
            ID: storeId,
            latitude: Number(s.latitude || s.lat || s.Latitude) || 0,
            longitude: Number(s.longitude || s.lng || s.Longitude) || 0
          };
        });
        safeSet(locatorEl, 'stores', normalizedStores);
      } else {
        console.log('[Wix Velo] CMS Stores chưa có dữ liệu, component dùng 3 showroom ZWILLING mặc định.');
      }
    } catch (err) {
      console.warn('[Wix Velo] CMS Stores chưa được tạo (sử dụng 3 showroom ZWILLING mặc định):', err);
    }
  }
});
