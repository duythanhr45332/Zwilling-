/**
 * WIX VELO PAGE CODE: Trang Tĩnh Cơ Hội Nghề Nghiệp (Careers)
 * URL Trang tĩnh trên Wix Studio: /careers (hoặc /co-hoi-nghe-nghiep)
 * 
 * Các phần tử trên trang Wix Studio:
 * 1. #aboutBreadcrumb (hoặc #careerBreadcrumb, #breadcrumb) — Tag Name: wx-breadcrumb
 *    -> Hiển thị đường dẫn: TRANG CHỦ › CƠ HỘI NGHỀ NGHIỆP
 * 2. #careerTitle (hoặc #aboutTitle, #pageTitle) — (Tùy chọn) Text element hiển thị tiêu đề trang
 */

import wixLocation from 'wix-location';

$w.onReady(function () {
  console.log('[Wix Velo] Đang khởi tạo Breadcrumb trang Cơ hội nghề nghiệp (Careers)...');

  // Helper tìm kiếm phần tử an toàn (hỗ trợ cả #aboutBreadcrumb đang dùng trên trang và các ID dự phòng)
  function findElement(ids) {
    for (const id of ids) {
      try {
        const el = $w(id);
        if (el && typeof el.setAttribute === 'function') {
          return el;
        }
      } catch (e) {}
    }
    // Tìm kiếm dự phòng theo kiểu CustomElement nếu trên trang chỉ có 1 custom element
    try {
      const customEl = $w('CustomElement');
      if (customEl && typeof customEl.setAttribute === 'function') {
        return customEl;
      }
    } catch (e) {}
    return null;
  }

  // Helper gán thuộc tính an toàn cho Custom Element
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
    } catch (e) {}
  }

  // Helper lắng nghe sự kiện an toàn cho Custom Element
  function safeOn(elOrSelector, eventName, handler) {
    try {
      const el = typeof elOrSelector === 'string' ? $w(elOrSelector) : elOrSelector;
      if (el && typeof el.on === 'function') {
        el.on(eventName, handler);
      }
    } catch (e) {}
  }

  // 1. Tìm phần tử Breadcrumb (hỗ trợ luôn #aboutBreadcrumb như trên Wix Studio của bạn)
  const breadcrumbEl = findElement([
    '#aboutBreadcrumb',
    '#careerBreadcrumb',
    '#careersBreadcrumb',
    '#breadcrumb',
    '#pageBreadcrumb',
    '#customElement1',
    '#customElement2',
    '#customElement3',
    '#customElement'
  ]);

  if (breadcrumbEl) {
    // Xóa cờ loading nếu có
    if (typeof breadcrumbEl.removeAttribute === 'function') {
      try { breadcrumbEl.removeAttribute('loading'); } catch (e) {}
    }

    // Thiết lập ngôn ngữ
    safeSet(breadcrumbEl, 'lang', 'vi');

    // Thiết lập cấu trúc đường dẫn Breadcrumb: TRANG CHỦ › CƠ HỘI NGHỀ NGHIỆP
    const breadcrumbItems = [
      { label: 'TRANG CHỦ', url: '/' },
      { label: 'CƠ HỘI NGHỀ NGHIỆP', url: '#' }
    ];

    safeSet(breadcrumbEl, 'items', breadcrumbItems);

    // Lắng nghe sự kiện click Breadcrumb để điều hướng về Trang chủ
    safeOn(breadcrumbEl, 'breadcrumb-click', (e) => {
      const targetUrl = e.detail?.item?.url;
      if (targetUrl && targetUrl !== '#') {
        wixLocation.to(targetUrl);
      }
    });

    console.log('[Wix Velo] Đã nạp thành công Breadcrumb cho trang Cơ hội nghề nghiệp.');
  } else {
    console.warn('[Wix Velo] Không tìm thấy phần tử Custom Element wx-breadcrumb trên trang Cơ hội nghề nghiệp.');
  }

  // 2. Cập nhật tiêu đề nếu có phần tử text trên trang
  try {
    if ($w('#careerTitle')) $w('#careerTitle').text = 'CƠ HỘI NGHỀ NGHIỆP';
    if ($w('#pageTitle')) $w('#pageTitle').text = 'CƠ HỘI NGHỀ NGHIỆP';
  } catch (e) {}
});
