/**
 * Phát Custom Event chuẩn xuyên qua Shadow DOM (bubbles & composed)
 */
export function dispatchCustomEvent(element, eventName, detail = {}) {
  const event = new CustomEvent(eventName, {
    detail,
    bubbles: true,
    composed: true,
    cancelable: true
  });
  element.dispatchEvent(event);
  return event;
}
