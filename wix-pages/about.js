/**
 * WIX VELO PAGE CODE: Trang Tĩnh Giới Thiệu (About Us)
 * URL Trang tĩnh trên Wix Studio: /about (hoặc /gioi-thieu)
 * 
 * Các phần tử trên trang Wix Studio:
 * 1. #aboutBreadcrumb (hoặc #breadcrumb) — Tag Name: wx-breadcrumb
 *    -> Hiển thị đường dẫn: TRANG CHỦ › GIỚI THIỆU
 * 2. #aboutTitle (hoặc #pageTitle) — (Tùy chọn) Text element hiển thị tiêu đề trang
 * 3. #aboutDesc — (Tùy chọn) Text element hiển thị mô tả
 */

import wixLocation from 'wix-location';

$w.onReady(function () {
  console.log('[Wix Velo] Đang khởi tạo Breadcrumb trang About (Giới thiệu)...');

  // Helper tìm kiếm phần tử an toàn (hỗ trợ cả ID tùy chỉnh và ID mặc định của Wix như #customElement1)
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

  // 1. Tìm phần tử Breadcrumb (kiểm tra cả ID tùy chỉnh và ID mặc định của Wix)
  const breadcrumbEl = findElement([
    '#aboutBreadcrumb',
    '#breadcrumb',
    '#pageBreadcrumb',
    '#customElement1',
    '#customElement2',
    '#customElement3',
    '#customElement'
  ]);

  if (breadcrumbEl) {
    // Thiết lập ngôn ngữ
    safeSet(breadcrumbEl, 'lang', 'vi');

    // Thiết lập cấu trúc đường dẫn Breadcrumb: TRANG CHỦ › GIỚI THIỆU
    const breadcrumbItems = [
      { label: 'TRANG CHỦ', url: '/' },
      { label: 'GIỚI THIỆU', url: '#' }
    ];

    safeSet(breadcrumbEl, 'items', breadcrumbItems);

    // Lắng nghe sự kiện click Breadcrumb để điều hướng về Trang chủ
    safeOn(breadcrumbEl, 'breadcrumb-click', (e) => {
      const targetUrl = e.detail?.item?.url;
      if (targetUrl && targetUrl !== '#') {
        wixLocation.to(targetUrl);
      }
    });

    console.log('[Wix Velo] Đã nạp thành công Breadcrumb cho trang About.');
  } else {
    console.warn('[Wix Velo] Không tìm thấy phần tử Custom Element wx-breadcrumb (#aboutBreadcrumb hoặc #breadcrumb) trên trang.');
  }

  // 2. Cập nhật tiêu đề nếu có phần tử text trên trang
  try {
    if ($w('#aboutTitle')) $w('#aboutTitle').text = 'GIỚI THIỆU VỀ ZWILLING';
    if ($w('#pageTitle')) $w('#pageTitle').text = 'GIỚI THIỆU';
  } catch (e) {}
});
