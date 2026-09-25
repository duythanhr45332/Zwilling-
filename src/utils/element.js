/**
 * Đăng ký Custom Element an toàn, tránh lỗi trùng lặp constructor hoặc tag name trong Wix Studio / Velo
 */
export function safeDefine(tagName, elementClass) {
  if (typeof window === 'undefined' || !window.customElements) return;

  const existing = window.customElements.get(tagName);
  if (existing) {
    return;
  }

  try {
    window.customElements.define(tagName, elementClass);
  } catch (err) {
    if (err.name === 'NotSupportedError' && err.message.includes('constructor')) {
      class SubclassedElement extends elementClass {}
      window.customElements.define(tagName, SubclassedElement);
    } else {
      console.warn(`[my-wix-ui-lib] Không thể đăng ký ${tagName}:`, err);
    }
  }
}
