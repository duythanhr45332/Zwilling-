/**
 * WIX VELO PAGE CODE: Trang Blog — Danh sách bài viết
 * URL: /blog
 * 
 * Các phần tử Custom Element trên trang:
 * 1. #blogBreadcrumb (Tag Name: wx-breadcrumb)
 * 
 * HƯỚNG DẪN CÀI ĐẶT TRÊN WIX:
 * 1. Vào trang Blog trên Wix Editor/Studio
 * 2. Thêm Custom Element → Tag Name: wx-breadcrumb → Server URL: link tới bundle JS
 * 3. Đặt ID cho phần tử breadcrumb: blogBreadcrumb
 * 4. Copy toàn bộ code này vào phần Code (Velo) của trang Blog
 */

import wixLocation from 'wix-location';

$w.onReady(function () {
  console.log('[Wix Velo] Đang nạp trang Blog...');

  // === Hàm tiện ích (giống các trang khác) ===
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

  function safeOn(el, eventName, handler) {
    if (el && typeof el.on === 'function') {
      el.on(eventName, handler);
    }
  }

  // === Tìm phần tử Breadcrumb ===
  const breadcrumbEl = findElement(['#aboutBreadcrumb', '#blogBreadcrumb', '#breadcrumb']);

  // === 1. Breadcrumb: TRANG CHỦ › BÀI VIẾT ===
  safeSet(breadcrumbEl, 'lang', 'vi');
  safeSet(breadcrumbEl, 'items', [
    { label: 'Trang chủ', url: '/' },
    { label: 'Blog' }
  ]);

  // Xử lý click điều hướng trên breadcrumb
  safeOn(breadcrumbEl, 'breadcrumb-click', (e) => {
    const targetUrl = e.detail?.item?.url;
    if (targetUrl && targetUrl !== '#') {
      wixLocation.to(targetUrl);
    }
  });

  console.log('[Wix Velo] Trang Blog đã sẵn sàng.');
});
