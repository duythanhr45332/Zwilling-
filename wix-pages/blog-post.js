/**
 * WIX VELO PAGE CODE: Trang Post — Chi tiết bài viết Blog
 * URL: /news/[slug]
 * 
 * Các phần tử Custom Element trên trang:
 * 1. #aboutBreadcrumb (Tag Name: wx-breadcrumb)
 * 
 * HƯỚNG DẪN CÀI ĐẶT TRÊN WIX:
 * 1. Vào trang Post (trang con của Blog) trên Wix Editor/Studio
 * 2. Thêm Custom Element → Tag Name: wx-breadcrumb → Source: Velo File (wix-ui-lib.js)
 * 3. Đặt ID cho phần tử breadcrumb: aboutBreadcrumb (hoặc blogBreadcrumb)
 * 4. Copy toàn bộ code này vào phần Page Code của trang Post
 */

import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

$w.onReady(function () {
  console.log('[Wix Velo] Đang nạp trang Blog Post...');

  function findElement(ids) {
    for (const id of ids) {
      try {
        const el = $w(id);
        if (el && typeof el.setAttribute === 'function') return el;
      } catch (e) {}
    }
    try {
      const customEl = $w('CustomElement');
      if (customEl && typeof customEl.setAttribute === 'function') {
        return customEl;
      }
    } catch (e) {}
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
  const breadcrumbEl = findElement(['#aboutBreadcrumb', '#blogBreadcrumb', '#breadcrumb', '#customElement1']);

  if (!breadcrumbEl) {
    console.warn('[Blog Post] Không tìm thấy breadcrumb element');
    return;
  }

  safeSet(breadcrumbEl, 'lang', 'vi');

  // === Lấy tiêu đề bài viết từ trang ===
  let postTitle = '';

  // Cách 1: Lấy từ tiêu đề trang (wixWindow)
  try {
    const pageTitle = wixWindow.getComponentInfo && wixWindow.getComponentInfo();
    if (pageTitle && pageTitle.title) {
      postTitle = pageTitle.title;
    }
  } catch (e) {}

  // Cách 2: Lấy từ URL slug và format thành tiêu đề
  if (!postTitle) {
    const path = wixLocation.path || [];
    // URL dạng /news/ten-bai-viet → path = ['news', 'ten-bai-viet']
    if (path.length >= 2) {
      const slug = path[path.length - 1];
      // Chuyển slug thành title: "ten-bai-viet" → "Ten bai viet"
      postTitle = decodeURIComponent(slug)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
    }
  }

  // Cách 3: Lấy từ element title trên trang (nếu có)
  if (!postTitle) {
    try {
      const titleEl = $w('#postTitle') || $w('#title1');
      if (titleEl && titleEl.text) {
        postTitle = titleEl.text;
      }
    } catch (e) {}
  }

  // === Breadcrumb: TRANG CHỦ › BÀI VIẾT › [TÊN BÀI VIẾT] ===
  const breadcrumbItems = [
    { label: 'Trang chủ', url: '/' },
    { label: 'Tin tức', url: '/news' }
  ];

  if (postTitle) {
    breadcrumbItems.push({ label: postTitle });
  }

  safeSet(breadcrumbEl, 'items', breadcrumbItems);

  // Xử lý click điều hướng trên breadcrumb
  safeOn(breadcrumbEl, 'breadcrumb-click', (e) => {
    const targetUrl = e.detail?.item?.url;
    if (targetUrl && targetUrl !== '#') {
      wixLocation.to(targetUrl);
    }
  });

  console.log('[Wix Velo] Trang Blog Post đã sẵn sàng. Tiêu đề:', postTitle);
});
