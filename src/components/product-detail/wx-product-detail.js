import { LitElement, html, css } from 'lit';
import { safeDefine } from '../../utils/element.js';
import { formatCurrencyVND, calculateProductPricing, parseGallery, safeJsonParse, jsonObjectConverter, resolveImageUrl, booleanConverter } from '../../utils/formatters.js';
import { t } from '../../utils/i18n.js';

export class WxProductDetail extends LitElement {
  static properties = {
    product: { type: Object, converter: jsonObjectConverter },
    data: { type: Object, converter: jsonObjectConverter },
    selectedImageIndex: { type: Number },
    openSections: { type: Object },
    lang: { type: String },
    loading: { type: Boolean, converter: booleanConverter },
    isZoomed: { state: true },
    zoomX: { state: true },
    zoomY: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #111111;
    }

    :host([hidden]) {
      display: none !important;
    }

    @keyframes wx-shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    @keyframes wx-fade-in {
      from {
        opacity: 0;
        transform: translateY(3px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    .pdp-grid {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      gap: 56px;
      animation: wx-fade-in 0.25s ease-out;
    }

    .skeleton-box {
      background: linear-gradient(90deg, #f2f2f2 25%, #e8e8e8 50%, #f2f2f2 75%);
      background-size: 200% 100%;
      animation: wx-shimmer 1.5s infinite ease-in-out;
      border-radius: 4px;
    }

    .skeleton-main-img {
      width: 100%;
      max-width: 650px;
      height: 650px;
      margin-bottom: 24px;
    }

    @media (max-width: 768px) {
      .skeleton-main-img {
        height: auto;
        aspect-ratio: 1 / 1;
      }
    }

    .skeleton-thumbs {
      display: flex;
      gap: 12px;
      max-width: 650px;
    }

    .skeleton-thumb {
      width: 64px;
      height: 64px;
    }

    .skeleton-info-col {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    @media (max-width: 900px) {
      .pdp-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }
    }

    /* Left Gallery */
    .gallery-col {
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .main-viewport-box {
      position: relative;
      width: 100%;
      max-width: 650px;
      height: 650px;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      overflow: hidden;
      cursor: zoom-in;
    }

    @media (max-width: 768px) {
      .main-viewport-box {
        height: auto;
        aspect-ratio: 1 / 1;
      }
    }

    .badge-top-left {
      position: absolute;
      top: 14px;
      left: 14px;
      border: 1px solid #111111;
      padding: 4px 8px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      background: #ffffff;
      z-index: 2;
      pointer-events: none;
    }

    .main-img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      transition: transform 0.12s ease-out, opacity 0.2s ease;
      pointer-events: none;
      user-select: none;
      will-change: transform, transform-origin;
    }

    /* Icon kính lúp có dấu + ở góc dưới phải */
    .zoom-badge {
      position: absolute;
      bottom: 14px;
      right: 14px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #222222;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
      z-index: 3;
    }

    .main-viewport-box.zoomed .zoom-badge {
      opacity: 0;
      transform: scale(0.8);
    }

    .nav-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.92);
      border: 1px solid #e0e0e0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 18px;
      color: #222222;
      transition: all 0.15s ease;
      z-index: 4;
    }

    .nav-arrow:hover {
      background: #111111;
      color: #ffffff;
      border-color: #111111;
    }

    .nav-arrow.prev {
      left: 12px;
    }

    .nav-arrow.next {
      right: 12px;
    }

    /* Thumbnail Matrix */
    .thumbnails-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      max-width: 650px;
      width: 100%;
      gap: 10px;
    }

    @media (max-width: 600px) {
      .thumbnails-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .thumb-cell {
      aspect-ratio: 1;
      border: 1px solid #e2e2e2;
      border-radius: 2px;
      background: #ffffff;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.15s ease;
      position: relative;
    }

    .thumb-cell:hover {
      border-color: #999999;
    }

    .thumb-cell.active {
      border: 2px solid #111111;
    }

    .thumb-cell img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    /* Right Info */
    .info-col {
      display: flex;
      flex-direction: column;
    }

    .brand-logo-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }

    .brand-name {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #444444;
    }

    .brand-logo-sq {
      width: 32px;
      height: 32px;
      background: #d40026;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 900;
      border-radius: 2px;
    }

    .product-title {
      font-size: 24px;
      font-weight: 800;
      line-height: 1.3;
      margin: 0 0 14px 0;
      color: #111111;
    }

    /* Price Row */
    .price-row {
      display: flex;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 16px;
    }

    .compare-price {
      font-size: 16px;
      color: #888888;
      text-decoration: line-through;
    }

    .sale-price {
      font-size: 26px;
      font-weight: 800;
      color: #111111;
    }

    .discount-box {
      border: 1px solid #d40026;
      color: #d40026;
      font-size: 12px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 2px;
    }

    /* Rating row */
    .rating-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      margin-bottom: 20px;
    }

    .stars {
      color: #f59e0b;
      font-size: 14px;
      letter-spacing: 2px;
    }

    .rating-link {
      color: #444444;
      text-decoration: underline;
      cursor: pointer;
    }

    /* Bullet highlights */
    .highlights-box {
      margin-bottom: 28px;
      border-top: 1px solid #f0f0f0;
      padding-top: 16px;
    }

    .highlights-title {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 10px;
      color: #111111;
    }

    .highlights-list {
      list-style-type: disc;
      padding-left: 20px;
      font-size: 13px;
      color: #444444;
      line-height: 1.7;
    }

    /* Accordions */
    .accordion-section {
      border-top: 1px solid #e5e5e5;
    }

    .accordion-item {
      border-bottom: 1px solid #e5e5e5;
    }

    .accordion-header {
      width: 100%;
      background: none;
      border: none;
      padding: 16px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #111111;
      text-align: left;
    }

    .accordion-icon {
      font-size: 14px;
      transition: transform 0.2s ease;
    }

    .accordion-body {
      padding: 0 0 20px 0;
      font-size: 13px;
      line-height: 1.6;
      color: #444444;
    }

    .specs-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
    }

    .specs-table td {
      padding: 8px 12px;
      border-bottom: 1px solid #f0f0f0;
    }

    .specs-table td:first-child {
      font-weight: 600;
      width: 40%;
      color: #666666;
    }
  `;

  constructor() {
    super();
    this.product = null;
    this.data = null;
    this.selectedImageIndex = 0;
    this.lang = 'vi';
    this.loading = false;
    this.openSections = {
      description: true,
      specifications: false,
      instructions: false
    };
    this.isZoomed = false;
    this.zoomX = 50;
    this.zoomY = 50;
  }

  _onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    this.zoomX = Math.max(0, Math.min(100, x));
    this.zoomY = Math.max(0, Math.min(100, y));
    this.isZoomed = true;
  }

  _onMouseLeave() {
    this.isZoomed = false;
    this.zoomX = 50;
    this.zoomY = 50;
  }

  _getImages() {
    const list = [];
    const p = this.data || this.product;
    if (!p) return list;
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

  _prevImage(images) {
    if (!images.length) return;
    this.selectedImageIndex = (this.selectedImageIndex - 1 + images.length) % images.length;
  }

  _nextImage(images) {
    if (!images.length) return;
    this.selectedImageIndex = (this.selectedImageIndex + 1) % images.length;
  }

  _toggleSection(sectionKey) {
    this.openSections = {
      ...this.openSections,
      [sectionKey]: !this.openSections[sectionKey]
    };
  }

  render() {
    const rawProduct = this.data || this.product;
    const isExplicitLoading = this.loading === true || this.loading === 'true';
    const isLoading = isExplicitLoading || (!rawProduct && this.product === null);

    if (isLoading) {
      return html`
        <div class="pdp-grid" role="status" aria-label="Loading product details">
          <!-- Cột Gallery Skeleton -->
          <div class="gallery-col">
            <div class="skeleton-box skeleton-main-img"></div>
            <div class="skeleton-thumbs">
              <div class="skeleton-box skeleton-thumb"></div>
              <div class="skeleton-box skeleton-thumb"></div>
              <div class="skeleton-box skeleton-thumb"></div>
              <div class="skeleton-box skeleton-thumb"></div>
            </div>
          </div>

          <!-- Cột Info Skeleton -->
          <div class="skeleton-info-col">
            <div class="skeleton-box" style="width: 35%; height: 16px;"></div>
            <div class="skeleton-box" style="width: 85%; height: 32px;"></div>
            <div class="skeleton-box" style="width: 45%; height: 28px; margin-top: 8px;"></div>
            <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 14px;">
              <div class="skeleton-box" style="width: 100%; height: 48px; border-radius: 4px;"></div>
              <div class="skeleton-box" style="width: 100%; height: 48px; border-radius: 4px;"></div>
              <div class="skeleton-box" style="width: 100%; height: 48px; border-radius: 4px;"></div>
            </div>
          </div>
        </div>
      `;
    }

    if (!rawProduct) return html``;

    const p = rawProduct;
    const images = this._getImages();
    const currentImg = images[this.selectedImageIndex] || images[0];
    const brandName = p.brand ? p.brand.replace('brand-', '').toUpperCase() : '';
    const seriesName = p.series ? p.series.replace('series-', '').replace(/--.+/, '').toUpperCase() : '';
    const { price, comparePrice, discountPercent } = calculateProductPricing(p);

    const specsData = safeJsonParse(p.specs, []);

    return html`
      <div class="pdp-grid">
        <!-- Cột Gallery bên trái -->
        <div class="gallery-col">
          <div
            class="main-viewport-box ${this.isZoomed ? 'zoomed' : ''}"
            @mousemove="${this._onMouseMove}"
            @mouseleave="${this._onMouseLeave}"
          >
            ${p.labels && p.labels.length
              ? html`<span class="badge-top-left">${Array.isArray(p.labels) ? p.labels[0] : p.labels}</span>`
              : ''}
            
            ${images.length > 1
              ? html`
                  <button class="nav-arrow prev" @click="${(e) => { e.stopPropagation(); this._prevImage(images); }}" aria-label="${t('prevImage', this.lang)}">&#x2039;</button>
                  <button class="nav-arrow next" @click="${(e) => { e.stopPropagation(); this._nextImage(images); }}" aria-label="${t('nextImage', this.lang)}">&#x203A;</button>
                `
              : ''}

            <!-- Icon kính lúp có dấu + góc dưới phải -->
            <div class="zoom-badge" aria-hidden="true" title="Phóng to chi tiết">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>

            ${currentImg
              ? html`
                  <img
                    class="main-img"
                    src="${currentImg}"
                    alt="${p.title}"
                    style="${this.isZoomed
                      ? `transform-origin: ${this.zoomX}% ${this.zoomY}%; transform: scale(2.4);`
                      : 'transform-origin: center center; transform: scale(1);'}"
                  />
                `
              : html`
                  <div style="width: 100%; height: 350px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f9f9f9; border: 1px dashed #d5d5d5; border-radius: 4px; color: #999; gap: 8px;">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span style="font-size: 12px;">${t('noImage', this.lang)}</span>
                  </div>
                `}
          </div>

          <!-- Thumbnail Matrix -->
          ${images.length > 1
            ? html`
                <div class="thumbnails-grid">
                  ${images.map((img, idx) => html`
                    <div
                      class="thumb-cell ${idx === this.selectedImageIndex ? 'active' : ''}"
                      @click="${() => (this.selectedImageIndex = idx)}"
                    >
                      <img src="${img}" alt="Thumbnail ${idx + 1}" />
                    </div>
                  `)}
                </div>
              `
            : ''}
        </div>

        <!-- Cột Thông tin bên phải -->
        <div class="info-col">
          ${brandName ? html`<div class="brand-row">${brandName}</div>` : ''}

          <h1 class="product-title">${p.title}</h1>

          ${seriesName ? html`<div class="series-name">${t('seriesLabel', this.lang, seriesName)}</div>` : ''}

          <!-- Price Row -->
          <div class="price-row">
            ${comparePrice && comparePrice > price
              ? html`<span class="compare-price">${formatCurrencyVND(comparePrice)}</span>`
              : ''}
            <span class="sale-price">${price ? formatCurrencyVND(price) : t('contactUs', this.lang)}</span>
            ${discountPercent ? html`<span class="discount-box">-${discountPercent}%</span>` : ''}
          </div>

          <!-- Ratings nếu có -->
          ${p.rating
            ? html`
                <div class="rating-row">
                  <span class="stars">★★★★★</span>
                  <span>${p.rating}</span>
                  ${p.reviewCount ? html`<span class="rating-link">${t('reviewsCount', this.lang, p.reviewCount)}</span>` : ''}
                </div>
              `
            : ''}

          <!-- Highlights Bullet list nếu có shortDescription -->
          ${p.shortDescription
            ? html`
                <div class="highlights-box">
                  <div class="highlights-title">${t('highlights', this.lang)}</div>
                  <div style="font-size: 14px; line-height: 1.6; color: #444;">
                    ${p.shortDescription}
                  </div>
                </div>
              `
            : ''}

          <!-- Accordion Sections -->
          <div class="accordion-section">
            <!-- 1. Description -->
            <div class="accordion-item">
              <button class="accordion-header" @click="${() => this._toggleSection('description')}">
                <span>${t('descriptionTab', this.lang)}</span>
                <span class="accordion-icon">${this.openSections.description ? '▲' : '▼'}</span>
              </button>
              ${this.openSections.description
                ? html`
                    <div class="accordion-body">
                      ${p.description || p.shortDescription || t('noDescription', this.lang)}
                    </div>
                  `
                : ''}
            </div>

            <!-- 2. Specifications -->
            <div class="accordion-item">
              <button class="accordion-header" @click="${() => this._toggleSection('specifications')}">
                <span>${t('specsTab', this.lang)}</span>
                <span class="accordion-icon">${this.openSections.specifications ? '▲' : '▼'}</span>
              </button>
              ${this.openSections.specifications
                ? html`
                    <div class="accordion-body">
                      ${specsData && specsData.length > 0
                        ? html`
                            <table class="specs-table">
                              <tbody>
                                ${specsData.map(
                                  (s) => html`
                                    <tr>
                                      <td>${s.name || s.key}</td>
                                      <td>${s.value}</td>
                                    </tr>
                                  `
                                )}
                              </tbody>
                            </table>
                          `
                        : html`<p>${t('noSpecs', this.lang)}</p>`}
                    </div>
                  `
                : ''}
            </div>

            <!-- 3. Manual and Safety Instructions -->
            <div class="accordion-item">
              <button class="accordion-header" @click="${() => this._toggleSection('instructions')}">
                <span>${t('instructionsTab', this.lang)}</span>
                <span class="accordion-icon">${this.openSections.instructions ? '▲' : '▼'}</span>
              </button>
              ${this.openSections.instructions
                ? html`
                    <div class="accordion-body">
                      ${p.instructions || p.manual || html`
                        <ul>
                          ${(t('defaultInstructions', this.lang) || []).map((step) => html`<li>${step}</li>`)}
                        </ul>
                      `}
                    </div>
                  `
                : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

safeDefine('wx-product-detail', WxProductDetail);
