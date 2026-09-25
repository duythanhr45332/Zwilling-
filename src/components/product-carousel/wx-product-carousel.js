import { LitElement, html, css } from 'lit';
import { safeDefine } from '../../utils/element.js';
import { dispatchCustomEvent } from '../../utils/events.js';
import { jsonArrayConverter } from '../../utils/formatters.js';
import { t } from '../../utils/i18n.js';
import '../product-listing/wx-product-card.js';

export class WxProductCarousel extends LitElement {
  static properties = {
    title: { type: String },
    products: { type: Array, converter: jsonArrayConverter },
    items: { type: Array, converter: jsonArrayConverter },
    data: { type: Array, converter: jsonArrayConverter },
    lang: { type: String },
    loading: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      background: #ffffff;
      padding: 0;
      width: 100%;
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

    .carousel-title {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #111111;
      margin-bottom: 16px;
    }

    .carousel-wrapper {
      position: relative;
      width: 100%;
    }

    .track {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 4px 0 8px 0;
      animation: wx-fade-in 0.25s ease-out;
    }

    .track::-webkit-scrollbar {
      display: none;
    }

    .card-item {
      flex: 0 0 260px;
      height: 420px;
    }

    /* Skeleton Loading Cards */
    .skeleton-card {
      background: #ffffff;
      border: 1px solid #eeeeee;
      padding: 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .skeleton-box {
      background: linear-gradient(90deg, #f2f2f2 25%, #e8e8e8 50%, #f2f2f2 75%);
      background-size: 200% 100%;
      animation: wx-shimmer 1.5s infinite ease-in-out;
      border-radius: 4px;
    }

    .skeleton-img {
      width: 100%;
      height: 300px;
    }

    .skeleton-brand {
      width: 40%;
      height: 12px;
    }

    .skeleton-title {
      width: 85%;
      height: 16px;
    }

    .skeleton-price {
      width: 55%;
      height: 18px;
      margin-top: auto;
    }

    @media (max-width: 640px) {
      .card-item {
        flex: 0 0 220px;
        height: 390px;
      }
      .skeleton-img {
        height: 210px;
      }
    }

    /* Bottom progress bar & navigation arrows */
    .controls-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 14px;
      padding: 0 4px;
    }

    .nav-arrow-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid #e0e0e0;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #555555;
      font-size: 13px;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .nav-arrow-btn:hover {
      border-color: #111111;
      color: #111111;
    }

    .progress-track {
      flex: 1;
      height: 2px;
      background: #dcdcdc;
      position: relative;
      border-radius: 1px;
      overflow: hidden;
    }

    .progress-thumb {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #111111;
      width: 25%;
      transition: left 0.2s ease, width 0.2s ease;
    }
  `;

  constructor() {
    super();
    this.title = '';
    this.products = null;
    this.items = null;
    this.data = null;
    this.lang = 'vi';
    this.loading = false;
    this._progressLeft = 0;
    this._progressWidth = 25;
  }

  firstUpdated() {
    this._track = this.shadowRoot.querySelector('.track');
    this._initScroll();
  }

  updated(changedProps) {
    if (changedProps.has('products') || changedProps.has('items') || changedProps.has('data')) {
      this._initScroll();
    }
  }

  _initScroll() {
    if (this._track) {
      this._track.addEventListener('scroll', () => this._updateProgress());
      this._updateProgress();
    }
  }

  _updateProgress() {
    if (!this._track) return;
    const { scrollLeft, scrollWidth, clientWidth } = this._track;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      this._progressWidth = 100;
      this._progressLeft = 0;
    } else {
      this._progressWidth = Math.max(15, (clientWidth / scrollWidth) * 100);
      const availableProgress = 100 - this._progressWidth;
      this._progressLeft = (scrollLeft / maxScroll) * availableProgress;
    }
    const thumb = this.shadowRoot.querySelector('.progress-thumb');
    if (thumb) {
      thumb.style.width = `${this._progressWidth}%`;
      thumb.style.left = `${this._progressLeft}%`;
    }
  }

  _scroll(direction) {
    if (!this._track) return;
    const distance = 320 * direction;
    this._track.scrollBy({ left: distance, behavior: 'smooth' });
  }

  _onProductClick(e) {
    dispatchCustomEvent(this, 'product-select', { product: e.detail.product });
  }

  render() {
    const rawList = this.data || this.items || this.products;
    const hasRaw = rawList !== null && rawList !== undefined;
    const list = Array.isArray(rawList) ? rawList : [];

    // Nếu đã nạp data nhưng rỗng và không loading
    if (hasRaw && list.length === 0 && !this.loading) return html``;

    // Nếu chưa có data (đang đợi nạp) hoặc loading = true: Hiện Skeleton Product Shimmer
    if (!list.length) {
      return html`
        <div class="carousel-wrapper">
          ${this.title ? html`<div class="carousel-title">${this.title}</div>` : ''}
          <div class="track" role="status" aria-label="Loading products">
            ${[1, 2, 3, 4].map(
              () => html`
                <div class="card-item skeleton-card">
                  <div class="skeleton-box skeleton-img"></div>
                  <div class="skeleton-box skeleton-brand"></div>
                  <div class="skeleton-box skeleton-title"></div>
                  <div class="skeleton-box skeleton-price"></div>
                </div>
              `
            )}
          </div>
        </div>
      `;
    }

    return html`
      <div class="carousel-wrapper">
        ${this.title ? html`<div class="carousel-title">${this.title}</div>` : ''}
        <div class="track" role="list">
          ${list.map(
            (p) => html`
              <div class="card-item" role="listitem">
                <wx-product-card
                  .product="${p}"
                  .lang="${this.lang}"
                  @product-click="${this._onProductClick}"
                ></wx-product-card>
              </div>
            `
          )}
        </div>

        <div class="controls-row">
          <button class="nav-arrow-btn" @click="${() => this._scroll(-1)}" aria-label="${t('scrollLeft', this.lang)}">&#x2039;</button>
          <div class="progress-track">
            <div class="progress-thumb"></div>
          </div>
          <button class="nav-arrow-btn" @click="${() => this._scroll(1)}" aria-label="${t('scrollRight', this.lang)}">&#x203A;</button>
        </div>
      </div>
    `;
  }
}

safeDefine('wx-product-carousel', WxProductCarousel);
safeDefine('wx-product', class WxProduct extends WxProductCarousel {});
