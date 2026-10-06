import { LitElement, html, css } from 'lit';
import { safeDefine } from '../../utils/element.js';
import { formatCurrencyVND, calculateProductPricing, parseGallery, safeJsonParse, resolveImageUrl, jsonObjectConverter, getColorHex } from '../../utils/formatters.js';
import { dispatchCustomEvent } from '../../utils/events.js';
import { t } from '../../utils/i18n.js';

export class WxProductCard extends LitElement {
  static properties = {
    product: { type: Object, converter: jsonObjectConverter },
    data: { type: Object, converter: jsonObjectConverter },
    activeImageIndex: { type: Number },
    lang: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      box-sizing: border-box;
      height: 100%;
      margin: 0;
      padding: 0;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    button, input, select, textarea, a {
      font-family: inherit;
    }

    .card {
      background: #ffffff;
      border: 1px solid #e7e7e7;
      border-radius: 4px; /* Bo góc 4px */
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
      padding: 0;
      cursor: pointer;
      transition: box-shadow 0.2s ease, border-color 0.2s ease;
    }

    .card:hover {
      border-color: #cccccc;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
    }

    /* Top Bar: Chỉ còn % Giảm giá (Đỏ) + Labels (Đen) - padding trên dưới 8px, trái phải 16px */
    .top-bar {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      min-height: 38px;
      padding: 8px 16px;
      margin-bottom: 0;
      position: relative;
      z-index: 5;
      font-size: 12px;
      box-sizing: border-box;
    }

    .badges-group {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
    }

    .badge-pill {
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 2px;
      line-height: 1.1;
      display: inline-block;
    }

    .badge-discount {
      background: #d40026;
      color: #ffffff;
    }

    .badge-label {
      background: #111111;
      color: #ffffff;
    }

    /* Image Viewport: Full w theo card sản phẩm */
    .image-viewport {
      position: relative;
      width: 100%;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0;
      overflow: hidden;
      border-radius: 0;
    }

    .image-viewport img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      transition: transform 0.25s ease, opacity 0.2s ease;
    }

    .card:hover .image-viewport img {
      transform: scale(1.02);
    }

    .image-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: #fbfbfb;
      border: 1px dashed #e2e2e2;
      border-radius: 4px;
      color: #aaaaaa;
      gap: 6px;
      font-size: 11px;
    }

    /* Nút Next / Back khi hover card */
    .nav-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #111111;
      font-size: 14px;
      font-weight: 700;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0.2s ease, background 0.15s ease;
      z-index: 10;
    }

    .card:hover .nav-arrow {
      opacity: 1;
      visibility: visible;
    }

    .nav-arrow:hover {
      background: #111111;
      color: #ffffff;
      border-color: #111111;
    }

    .nav-arrow.prev {
      left: 8px;
    }

    .nav-arrow.next {
      right: 8px;
    }

    /* Thanh tiến trình phân đoạn ảnh */
    .image-progress-bar {
      width: 100%;
      height: 2px;
      background: #e5e5e5;
      position: relative;
      margin-bottom: 0;
      border-radius: 0;
      overflow: hidden;
    }

    .image-progress-thumb {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #111111;
      transition: left 0.2s ease, width 0.2s ease;
    }

    /* Content Area: padding trên dưới 8px, trái phải 16px */
    .content-area {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      padding: 8px 16px;
    }

    .brand-title {
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #666666;
      margin-bottom: 4px;
    }

    .product-title {
      font-size: 16px;
      font-weight: 700;
      color: #111111;
      line-height: 1.35;
      margin: 0 0 10px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: 44px;
    }

    /* Rating Stars */
    .rating-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 12px;
      font-size: 12px;
      color: #555555;
    }

    .stars {
      color: #f59e0b;
      font-size: 13px;
      letter-spacing: 1px;
    }

    .rating-text {
      font-size: 11px;
      color: #666666;
    }

    .variant-sizes {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #444444;
      margin-bottom: 6px;
    }

    .card-color-swatches {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 4px;
      margin-bottom: 8px;
    }

    .card-color-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.15);
      display: inline-block;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
      flex-shrink: 0;
      transition: transform 0.15s ease;
    }

    .card-color-dot:hover {
      transform: scale(1.2);
    }

    .card-color-more {
      font-size: 11px;
      font-weight: 600;
      color: #666666;
      margin-left: 2px;
    }

    /* Price Row */
    .footer-row {
      margin-top: auto;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      padding-top: 8px;
    }

    .price-col {
      display: flex;
      flex-direction: column;
    }

    .compare-price {
      font-size: 14px;
      color: #817367;
      text-decoration: line-through;
      margin-bottom: 2px;
    }

    .current-price {
      font-size: 16px;
      font-weight: 700;
      color: #111111;
    }
  `;

  constructor() {
    super();
    this.product = null;
    this.activeImageIndex = 0;
    this.lang = 'vi';
  }

  _getImages() {
    if (!this.product) return [];
    const p = this.product;
    const list = [];
    if (p.mainImage) {
      const resolved = resolveImageUrl(p.mainImage);
      if (resolved) list.push(resolved);
    }
    const rawGallery = p.gallery || p.media || p.images || p.mediaGallery;
    if (rawGallery) {
      const g = parseGallery(rawGallery);
      g.forEach((url) => {
        const resolved = resolveImageUrl(url);
        if (resolved && !list.includes(resolved)) list.push(resolved);
      });
    }
    return list;
  }

  _prevImage(e, images) {
    e.stopPropagation();
    if (!images.length) return;
    this.activeImageIndex = (this.activeImageIndex - 1 + images.length) % images.length;
  }

  _nextImage(e, images) {
    e.stopPropagation();
    if (!images.length) return;
    this.activeImageIndex = (this.activeImageIndex + 1) % images.length;
  }

  _onClick() {
    dispatchCustomEvent(this, 'product-click', { product: this.product });
  }

  _getCardColors() {
    if (!this.product) return [];
    const p = this.product;
    const colors = [];
    if (p.variants && Array.isArray(p.variants) && p.variants.length > 0) {
      for (const v of p.variants) {
        const c = v.color || '';
        if (c && !colors.some(existing => existing.toLowerCase() === c.toLowerCase())) {
          colors.push(c);
        }
      }
    } else if (p.color) {
      colors.push(p.color);
    }
    return colors;
  }

  render() {
    if (!this.product) return html``;

    const p = this.product;
    const images = this._getImages();
    const currentImg = images[this.activeImageIndex] || p.mainImage || (images.length ? images[0] : '');
    const { price, comparePrice, discountPercent } = calculateProductPricing(p);
    const brandName = p.brand ? p.brand.replace('brand-', '').toUpperCase() : '';
    const cardColors = this._getCardColors();
    const hasPriceRange = Boolean(p.variants && p.variants.length > 1 && p.minPrice && p.maxPrice && Number(p.minPrice) < Number(p.maxPrice));
    const effectiveDiscount = hasPriceRange ? null : discountPercent;

    // Danh sách nhãn labels
    let labelList = [];
    if (Array.isArray(p.labels)) {
      labelList = p.labels;
    } else if (typeof p.labels === 'string') {
      const parsed = safeJsonParse(p.labels);
      if (Array.isArray(parsed)) {
        labelList = parsed;
      } else if (p.labels.trim() && p.labels !== '[]') {
        const clean = p.labels.replace(/[\[\]"']/g, '').trim();
        if (clean) labelList = [clean];
      }
    } else if (p.label) {
      labelList = [p.label];
    } else if (p.ribbon) {
      labelList = [p.ribbon];
    }
    if (p.isBestseller || p.bestseller) {
      const bestLabel = this.lang === 'vi' ? 'Bán chạy' : 'Bestseller';
      if (!labelList.includes(bestLabel) && !labelList.includes('Bestseller') && !labelList.includes('Bán chạy')) {
        labelList.unshift(bestLabel);
      }
    }
    // Ánh xạ song ngữ cho các nhãn chuẩn (Bán chạy <-> Bestseller, Mới <-> New...)
    const LABEL_MAP_EN = {
      'bán chạy': 'Bestseller',
      'mới': 'New',
      'mới mở bán': 'New to sale',
      'giảm giá': 'On sale'
    };
    const LABEL_MAP_VI = {
      'bestseller': 'Bán chạy',
      'best seller': 'Bán chạy',
      'new': 'Mới',
      'new to sale': 'Mới mở bán',
      'on sale': 'Giảm giá'
    };
    labelList = labelList.filter(Boolean).map((lbl) => {
      const lower = String(lbl).trim().toLowerCase();
      if (this.lang === 'en') {
        return LABEL_MAP_EN[lower] || lbl;
      } else {
        return LABEL_MAP_VI[lower] || lbl;
      }
    });

    // Tính toán độ rộng thanh tiến trình
    const totalImages = images.length;
    const progressWidth = totalImages > 1 ? 100 / totalImages : 100;
    const progressLeft = totalImages > 1 ? (this.activeImageIndex / totalImages) * 100 : 0;

    return html`
      <div class="card" @click="${this._onClick}">
        <!-- Top Bar: % Giảm giá + Labels (Đã bỏ icon heart) -->
        <div class="top-bar">
          <div class="badges-group">
            ${effectiveDiscount
              ? html`<span class="badge-pill badge-discount">-${effectiveDiscount}%</span>`
              : ''}
            ${labelList.map(
              (label) => html`<span class="badge-pill badge-label">${label}</span>`
            )}
          </div>
        </div>

        <!-- Image Viewport với Nút Next/Back Gallery khi Hover -->
        <div class="image-viewport">
          ${totalImages > 1
            ? html`
                <button
                  class="nav-arrow prev"
                  @click="${(e) => this._prevImage(e, images)}"
                  aria-label="${t('prevImage', this.lang)}"
                >
                  &#x2039;
                </button>
                <button
                  class="nav-arrow next"
                  @click="${(e) => this._nextImage(e, images)}"
                  aria-label="${t('nextImage', this.lang)}"
                >
                  &#x203A;
                </button>
              `
            : ''}

          ${currentImg
            ? html`<img src="${currentImg}" alt="${p.title}" loading="lazy" />`
            : html`
                <div class="image-placeholder">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span>${t('noImage', this.lang)}</span>
                </div>
              `}
        </div>

        <!-- Thanh chỉ báo ảnh hiện tại nếu có nhiều ảnh gallery -->
        ${totalImages > 1
          ? html`
              <div class="image-progress-bar">
                <div
                  class="image-progress-thumb"
                  style="width: ${progressWidth}%; left: ${progressLeft}%;"
                ></div>
              </div>
            `
          : ''}

        <div class="content-area">
          ${brandName ? html`<div class="brand-title">${brandName}</div>` : ''}
          <h3 class="product-title" title="${p.title}">${p.title}</h3>

          ${p.rating
            ? html`
                <div class="rating-row">
                  <span class="stars">★★★★★</span>
                  <span class="rating-text">${p.rating} ${p.reviewCount ? `(${p.reviewCount})` : ''}</span>
                </div>
              `
            : ''}

          ${p.sizeLabel ? html`<div class="variant-sizes">${p.sizeLabel}</div>` : ''}

          ${cardColors.length > 1
            ? html`
                <div class="card-color-swatches" title="${cardColors.join(', ')}">
                  ${cardColors.slice(0, 5).map(
                    (c) => html`
                      <span
                        class="card-color-dot"
                        style="background: ${getColorHex(c)}"
                        title="${c}"
                      ></span>
                    `
                  )}
                  ${cardColors.length > 5
                    ? html`<span class="card-color-more">+${cardColors.length - 5}</span>`
                    : ''}
                </div>
              `
            : ''}

          <div class="footer-row">
            <div class="price-col">
              ${!hasPriceRange && comparePrice && comparePrice > price
                ? html`<span class="compare-price">${formatCurrencyVND(comparePrice)}</span>`
                : ''}
              <span class="current-price">
                ${hasPriceRange
                  ? `${formatCurrencyVND(p.minPrice)} – ${formatCurrencyVND(p.maxPrice)}`
                  : price
                  ? formatCurrencyVND(price)
                  : t('contactUs', this.lang)}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

safeDefine('wx-product-card', WxProductCard);
