import { LitElement, html, css } from 'lit';
import { safeDefine } from '../../utils/element.js';
import { dispatchCustomEvent } from '../../utils/events.js';
import { jsonArrayConverter, jsonObjectConverter } from '../../utils/formatters.js';
import { t } from '../../utils/i18n.js';
import '../product-listing/wx-product-card.js';

export class WxRelatedProducts extends LitElement {
  static properties = {
    title: { type: String },
    products: { type: Array, converter: jsonArrayConverter },
    items: { type: Array, converter: jsonArrayConverter },
    data: { type: Array, converter: jsonArrayConverter },
    currentProduct: { type: Object, converter: jsonObjectConverter },
    product: { type: Object, converter: jsonObjectConverter },
    category: { type: String },
    limit: { type: Number },
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

    .related-container {
      width: 100%;
      position: relative;
    }

    .related-title {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #111111;
      margin-bottom: 20px;
    }

    /* 4-Column Grid Layout on Desktop */
    .related-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      animation: wx-fade-in 0.25s ease-out;
    }

    .card-item {
      width: 100%;
      height: 420px;
      display: flex;
    }

    .card-item > wx-product-card {
      width: 100%;
      height: 100%;
    }

    /* Controls: arrows & progress bar (Dành cho màn hình nhỏ khi cuộn ngang) */
    .controls-row {
      display: none;
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

    /* Skeleton Loading Cards */
    .skeleton-card {
      background: #ffffff;
      border: 1px solid #eeeeee;
      padding: 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
      height: 420px;
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

    /* Responsive */
    @media (max-width: 1024px) {
      .related-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
      }
      .card-item {
        height: 410px;
      }
    }

    @media (max-width: 640px) {
      .related-grid {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -ms-overflow-style: none;
        gap: 12px;
        padding-bottom: 8px;
      }

      .related-grid::-webkit-scrollbar {
        display: none;
      }

      .card-item {
        flex: 0 0 240px;
        height: 390px;
        scroll-snap-align: start;
      }

      .skeleton-card {
        flex: 0 0 240px;
        height: 390px;
      }

      .skeleton-img {
        height: 210px;
      }

      .controls-row {
        display: flex;
      }
    }
  `;

  constructor() {
    super();
    this.title = '';
    this.products = null;
    this.items = null;
    this.data = null;
    this.currentProduct = null;
    this.product = null;
    this.category = '';
    this.limit = 4;
    this.lang = 'vi';
    this.loading = false;
    this._progressLeft = 0;
    this._progressWidth = 25;
  }

  firstUpdated() {
    this._grid = this.shadowRoot.querySelector('.related-grid');
    this._initScroll();
  }

  updated(changedProps) {
    if (changedProps.has('products') || changedProps.has('items') || changedProps.has('data')) {
      this._initScroll();
    }
  }

  _initScroll() {
    if (this._grid) {
      this._grid.addEventListener('scroll', () => this._updateProgress());
      this._updateProgress();
    }
  }

  _updateProgress() {
    if (!this._grid) return;
    const { scrollLeft, scrollWidth, clientWidth } = this._grid;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      this._progressWidth = 100;
      this._progressLeft = 0;
    } else {
      this._progressWidth = Math.max(25, (clientWidth / scrollWidth) * 100);
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
    if (!this._grid) return;
    const distance = 260 * direction;
    this._grid.scrollBy({ left: distance, behavior: 'smooth' });
  }

  _getEffectiveProducts() {
    const rawList = this.data || this.items || this.products;
    if (!rawList || !Array.isArray(rawList)) return [];

    const current = this.currentProduct || this.product;
    const currentId = current ? (current.ID || current.id || current._id || current.slug) : '';

    // 1. Loại bỏ sản phẩm hiện tại khỏi danh sách
    let list = currentId
      ? rawList.filter((p) => {
          const pId = p.ID || p.id || p._id || p.slug;
          return pId !== currentId;
        })
      : [...rawList];

    // 2. Xác định thông tin danh mục cần đối chiếu
    let targetCat = this.category;
    let targetCatPath = '';
    let targetBrandCat = '';
    let targetBrand = '';

    if (current) {
      if (!targetCat) {
        if (typeof current.category === 'object' && current.category !== null) {
          targetCat = current.category._id || current.category.ID || current.category.slug || '';
        } else {
          targetCat = current.category || '';
        }
      }
      targetCatPath = current.categoryPath || '';
      targetBrandCat = current.brandCategory || '';
      targetBrand = current.brand || '';
    }

    if (targetCat || targetCatPath || targetBrandCat) {
      const catKey = (targetCat || '').toLowerCase().trim();
      const brandCatKey = (targetBrandCat || '').toLowerCase().trim();

      // Phân tách root category từ đường dẫn (ví dụ: "/dao-bep/dao-santoku/" => "dao-bep")
      const pathSegments = (targetCatPath || '').split('/').filter(Boolean);
      const rootCatSlug = pathSegments.length > 0 ? pathSegments[0].toLowerCase().trim() : '';

      // Ưu tiên 1: Cùng danh mục con (Sub-category) chính xác
      const exactMatches = list.filter((p) => {
        const pCat = String(p.category || '').toLowerCase().trim();
        const pBrandCat = String(p.brandCategory || '').toLowerCase().trim();
        return (catKey && (pCat === catKey || pBrandCat === catKey)) ||
               (brandCatKey && (pCat === brandCatKey || pBrandCat === brandCatKey));
      });

      // Ưu tiên 2: Cùng danh mục cha (Root Category / Cùng loại sản phẩm)
      const parentMatches = list.filter((p) => {
        if (exactMatches.includes(p)) return false;
        const pPath = String(p.categoryPath || '').toLowerCase();
        const pCat = String(p.category || '').toLowerCase();
        return rootCatSlug && (pPath.includes(`/${rootCatSlug}/`) || pCat.includes(rootCatSlug));
      });

      // Ưu tiên 3: Cùng thương hiệu nếu vẫn chưa đủ 4 sản phẩm
      const brandMatches = list.filter((p) => {
        if (exactMatches.includes(p) || parentMatches.includes(p)) return false;
        return targetBrand && p.brand === targetBrand;
      });

      // Gộp danh sách theo thứ tự ưu tiên
      const prioritized = [...exactMatches, ...parentMatches, ...brandMatches];
      if (prioritized.length > 0) {
        list = prioritized;
      }
    }

    // 3. Giới hạn hiển thị đúng 4 sản phẩm cùng danh mục
    const maxItems = Number(this.limit) > 0 ? Number(this.limit) : 4;
    return list.slice(0, maxItems);
  }

  _onProductClick(e) {
    dispatchCustomEvent(this, 'product-select', { product: e.detail.product });
  }

  render() {
    const effectiveList = this._getEffectiveProducts();
    const displayTitle = this.title || t('relatedProducts', this.lang);
    const maxItems = Number(this.limit) > 0 ? Number(this.limit) : 4;

    // Đang loading hoặc chưa có dữ liệu nạp
    if (this.loading || (this.products === null && this.items === null && this.data === null)) {
      return html`
        <div class="related-container">
          <div class="related-title">${displayTitle}</div>
          <div class="related-grid" role="status" aria-label="Loading related products">
            ${Array.from({ length: maxItems }).map(
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

    // Nếu đã nạp nhưng không có sản phẩm nào
    if (!effectiveList.length) return html``;

    return html`
      <div class="related-container">
        <div class="related-title">${displayTitle}</div>
        <div class="related-grid" role="list">
          ${effectiveList.map(
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

safeDefine('wx-related-products', WxRelatedProducts);
safeDefine('wx-related', class WxRelated extends WxRelatedProducts {});
