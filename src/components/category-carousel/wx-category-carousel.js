import { LitElement, html, css } from 'lit';
import { safeDefine } from '../../utils/element.js';
import { dispatchCustomEvent } from '../../utils/events.js';
import { jsonArrayConverter, resolveImageUrl } from '../../utils/formatters.js';
import { t } from '../../utils/i18n.js';

export class WxCategoryCarousel extends LitElement {
  static properties = {
    items: { type: Array, converter: jsonArrayConverter },
    categories: { type: Array, converter: jsonArrayConverter },
    data: { type: Array, converter: jsonArrayConverter },
    selectedId: { type: String },
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
      min-height: 0;
      box-sizing: border-box;
    }

    :host([hidden]) {
      display: none !important;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    button, input, select, textarea {
      font-family: inherit;
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

    .carousel-wrapper {
      position: relative;
      width: 100%;
    }

    /* Carousel track khi >= 6 items */
    .track {
      display: flex;
      gap: 28px;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 4px 0 8px 0;
      animation: wx-fade-in 0.25s ease-out;
    }

    /* Skeleton Loading Cards */
    .skeleton-card {
      flex: 0 0 188px;
      width: 188px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      box-sizing: border-box;
    }

    .skeleton-box {
      background: linear-gradient(90deg, #f2f2f2 25%, #e8e8e8 50%, #f2f2f2 75%);
      background-size: 200% 100%;
      animation: wx-shimmer 1.5s infinite ease-in-out;
      border-radius: 4px;
    }

    .skeleton-img {
      width: 188px;
      height: 188px;
    }

    .skeleton-label {
      width: 110px;
      height: 16px;
    }

    @media (max-width: 600px) {
      .skeleton-card {
        flex: 0 0 145px;
        width: 145px;
      }
      .skeleton-img {
        width: 145px;
        height: 145px;
      }
      .skeleton-label {
        width: 80px;
        height: 14px;
      }
    }

    .track::-webkit-scrollbar {
      display: none;
    }

    /* Khi < 6 items: Bỏ carousel, xếp cân đối */
    .track.static-grid {
      overflow-x: visible;
      flex-wrap: wrap;
      justify-content: center;
      gap: 28px;
      padding: 4px 0 0 0;
    }

    .item-card {
      font-family: inherit;
      flex: 0 0 188px;
      width: 188px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
      color: inherit;
      text-decoration: none;
    }

    .item-card.active .item-label {
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .image-box {
      width: 188px;
      height: 188px;
      aspect-ratio: 1 / 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
      overflow: hidden;
      background: transparent;
      position: relative;
    }

    .image-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      transition: transform 0.35s cubic-bezier(0.2, 0, 0.2, 1);
    }

    .item-card:hover .image-box img {
      transform: scale(1.06);
    }

    .item-card:hover .item-label {
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .placeholder-box {
      width: 100%;
      height: 100%;
      background: #f5f5f5;
      border: 1px dashed #d5d5d5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #999999;
      font-size: 11px;
      gap: 4px;
    }

    .item-label {
      font-family: inherit;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #111111;
      margin: 0;
      line-height: 1.35;
      text-align: center;
      transition: color 0.2s ease, text-decoration 0.2s ease;
    }

    .item-description {
      font-family: inherit;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: normal;
      text-transform: none;
      color: #666666;
      margin: 4px 0 0 0;
      line-height: 1.4;
      text-align: center;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      transition: color 0.2s ease;
    }

    .item-card:hover .item-description {
      color: #333333;
    }

    @media (max-width: 600px) {
      .track, .track.static-grid {
        gap: 16px;
      }
      .item-card {
        flex: 0 0 145px;
        width: 145px;
      }
      .image-box {
        width: 145px;
        height: 145px;
      }
      .item-label {
        font-size: 13px;
      }
      .item-description {
        font-size: 11px;
        margin-top: 2px;
      }
    }

    /* Controls row: chỉ hiện khi >= 6 items */
    .controls-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 12px;
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
      width: 30%;
      transition: left 0.2s ease, width 0.2s ease;
    }
  `;

  constructor() {
    super();
    this.items = null;
    this.categories = null;
    this.data = null;
    this.selectedId = '';
    this.lang = 'vi';
    this.loading = false;
    this._progressLeft = 0;
    this._progressWidth = 30;
  }

  firstUpdated() {
    this._track = this.shadowRoot.querySelector('.track');
    this._checkScroll();
  }

  updated(changedProps) {
    if (changedProps.has('items') || changedProps.has('categories') || changedProps.has('data')) {
      this._checkScroll();
    }
  }

  _checkScroll() {
    const list = this.categories || this.data || this.items || [];
    if (this._track && list.length >= 6) {
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
    const distance = 300 * direction;
    this._track.scrollBy({ left: distance, behavior: 'smooth' });
  }

  _selectItem(item) {
    this.selectedId = item._id || item.ID || item.id || item.slug;
    dispatchCustomEvent(this, 'category-select', { category: item });
  }

  render() {
    const rawList = this.categories || this.data || this.items;
    const hasRaw = rawList !== null && rawList !== undefined;
    const list = Array.isArray(rawList) ? rawList : [];

    // Nếu đã nạp data nhưng rỗng và không loading
    if (hasRaw && list.length === 0 && !this.loading) {
      this.removeAttribute('has-items');
      return html``;
    }

    // Nếu chưa có data (đang đợi nạp) hoặc loading = true: Hiện Skeleton Shimmer
    if (!list.length) {
      return html`
        <div class="carousel-wrapper">
          <div class="track static-grid" role="status" aria-label="Loading categories">
            ${[1, 2, 3, 4, 5].map(() => html`
              <div class="skeleton-card">
                <div class="skeleton-box skeleton-img"></div>
                <div class="skeleton-box skeleton-label"></div>
              </div>
            `)}
          </div>
        </div>
      `;
    }

    this.setAttribute('has-items', '');
    const isCarousel = list.length >= 6;

    return html`
      <div class="carousel-wrapper">
        <div class="track ${isCarousel ? '' : 'static-grid'}" role="list">
          ${list.map((item) => {
            const id = item._id || item.ID || item.id || item.slug;
            const isSelected = this.selectedId === id;
            const label = item.title || item.name || '';
            const description = item.description || item.subtitle || item.desc || '';
            const rawImg = item.image || item.mainImage || item.bannerImage;
            const imgSrc = rawImg ? resolveImageUrl(rawImg) : '';

            return html`
              <button
                class="item-card ${isSelected ? 'active' : ''}"
                @click="${() => this._selectItem(item)}"
                role="listitem"
              >
                <div class="image-box">
                  ${imgSrc
                    ? html`
                        <img
                          src="${imgSrc}"
                          alt="${label}"
                          loading="lazy"
                          @error="${(e) => {
                            e.target.style.display = 'none';
                            const p = e.target.parentElement.querySelector('.placeholder-box');
                            if (p) p.style.display = 'flex';
                          }}"
                        />
                        <div class="placeholder-box" style="display: none;">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                          <span>${t('noImage', this.lang)}</span>
                        </div>
                      `
                    : html`
                        <div class="placeholder-box">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                          <span>${t('noImage', this.lang)}</span>
                        </div>
                      `}
                </div>
                <span class="item-label">${label}</span>
                ${description ? html`<span class="item-description">${description}</span>` : ''}
              </button>
            `;
          })}
        </div>

        ${isCarousel
          ? html`
              <div class="controls-row">
                <button class="nav-arrow-btn" @click="${() => this._scroll(-1)}" aria-label="${t('scrollLeft', this.lang)}">&#x2039;</button>
                <div class="progress-track">
                  <div class="progress-thumb"></div>
                </div>
                <button class="nav-arrow-btn" @click="${() => this._scroll(1)}" aria-label="${t('scrollRight', this.lang)}">&#x203A;</button>
              </div>
            `
          : ''}
      </div>
    `;
  }
}

safeDefine('wx-category-carousel', WxCategoryCarousel);
safeDefine('wx-product-categories', class WxProductCategories extends WxCategoryCarousel {});
