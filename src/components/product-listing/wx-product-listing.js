import { LitElement, html, css } from 'lit';
import { safeDefine } from '../../utils/element.js';
import { dispatchCustomEvent } from '../../utils/events.js';
import { formatCurrencyVND, jsonArrayConverter, booleanConverter } from '../../utils/formatters.js';
import { t } from '../../utils/i18n.js';
import './wx-product-card.js';

export class WxProductListing extends LitElement {
  static properties = {
    products: { type: Array, converter: jsonArrayConverter },
    data: { type: Array, converter: jsonArrayConverter },
    brands: { type: Array, converter: jsonArrayConverter },
    categories: { type: Array, converter: jsonArrayConverter },
    selectedCategory: { type: String },
    selectedBrand: { type: String },
    selectedPriceRange: { type: String },
    selectedSort: { type: String },
    sidebarOpen: { type: Boolean },
    activeSidebarTab: { type: String },
    visibleCount: { type: Number },
    pageSize: { type: Number },
    lang: { type: String },
    loading: { type: Boolean, converter: booleanConverter }
  };

  static styles = css`
    :host {
      display: block;
      font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: #ffffff;
      position: relative;
      width: 100%;
    }

    :host([hidden]) {
      display: none !important;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    button, input, select, textarea, a {
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

    .product-grid {
      animation: wx-fade-in 0.25s ease-out;
    }

    /* Skeleton Loading Cards */
    .skeleton-card {
      background: #ffffff;
      border: 1px solid #e7e7e7;
      border-radius: 4px;
      overflow: hidden;
      padding: 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      min-height: 420px;
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
      border-radius: 0;
    }

    .skeleton-content {
      padding: 8px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex-grow: 1;
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

    *, *::before, *::after {
      box-sizing: border-box;
    }

    /* Filter Toolbar */
    .filter-toolbar {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f2;
      font-size: 14px;
    }

    .results-text {
      font-size: 14px;
      font-weight: 500;
      color: #000000;
      margin-right: 12px;
      white-space: nowrap;
    }

    .sort-select-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    .sort-select {
      appearance: none;
      -webkit-appearance: none;
      background-color: #efecea;
      border: 1px solid #efecea;
      border-radius: 3px;
      color: #000;
      display: inline-block;
      height: 44px;
      padding: 12px 38px 12px 20px;
      font-size: 14px;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      box-sizing: border-box;
      transition: background-color 0.2s ease, border-color 0.2s ease;
    }

    .sort-select:hover,
    .sort-select:focus {
      background-color: #fff;
      border: 1px solid #817367;
      outline: none;
    }

    .sort-arrow {
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: #000000;
      display: flex;
      align-items: center;
    }

    .filter-buttons-group {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      flex: 1;
    }

    .filter-trigger-btn {
      background-color: #efecea;
      border: 1px solid #efecea;
      border-radius: 3px;
      color: #000;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      padding: 12px 24px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      font-family: inherit;
      box-sizing: border-box;
      transition: background-color 0.2s ease, border-color 0.2s ease;
      gap: 8px;
      white-space: nowrap;
    }

    .filter-trigger-btn:hover {
      background-color: #fff;
      border: 1px solid #817367;
      color: #000;
    }

    .filter-trigger-btn.has-value {
      background-color: #fff;
      border: 1px solid #817367;
      color: #000;
      font-weight: 600;
    }

    .all-filters-btn {
      margin-left: auto;
    }

    .active-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #817367;
      display: inline-block;
    }

    .reset-link {
      background: none;
      border: none;
      color: #d40026;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      padding: 6px 8px;
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      .filter-toolbar {
        gap: 8px;
      }
      .filter-trigger-btn {
        height: 38px;
        padding: 8px 14px;
        font-size: 12px;
      }
      .sort-select {
        height: 38px;
        padding: 8px 30px 8px 12px;
        font-size: 12px;
      }
    }

    /* 4 Column Product Grid */
    .product-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    @media (max-width: 1080px) {
      .product-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 768px) {
      .product-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
    }

    @media (max-width: 480px) {
      .product-grid {
        grid-template-columns: 1fr;
      }
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #777777;
      grid-column: 1 / -1;
    }

    /* Sidebar Drawer Bên Phải */
    .drawer-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.25s ease, visibility 0.25s ease;
    }

    .drawer-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .filter-sidebar {
      position: fixed;
      top: 0;
      right: 0;
      width: 380px;
      max-width: 90vw;
      height: 100vh;
      background: #ffffff;
      z-index: 1000;
      box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
    }

    .filter-sidebar.open {
      transform: translateX(0);
    }

    .sidebar-header {
      padding: 20px 24px;
      border-bottom: 1px solid #eeeeee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .sidebar-title {
      font-size: 16px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #111111;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 20px;
      color: #555555;
      cursor: pointer;
      line-height: 1;
      padding: 4px;
      transition: color 0.15s ease;
    }

    .close-btn:hover {
      color: #111111;
    }

    .sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .filter-group-title {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #111111;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .filter-options-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .filter-options-scrollable {
      max-height: 180px;
      overflow-y: auto;
      padding-right: 6px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scrollbar-width: thin;
      scrollbar-color: #d1d5db transparent;
    }

    .filter-options-scrollable::-webkit-scrollbar {
      width: 4px;
    }

    .filter-options-scrollable::-webkit-scrollbar-track {
      background: #f4f4f4;
      border-radius: 2px;
    }

    .filter-options-scrollable::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 2px;
    }

    .filter-options-scrollable::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }

    .filter-option-label {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      color: #333333;
      cursor: pointer;
    }

    .filter-option-label input[type="radio"] {
      accent-color: #111111;
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    .sidebar-footer {
      padding: 16px 24px;
      border-top: 1px solid #eeeeee;
      display: flex;
      gap: 12px;
    }

    .btn-apply {
      flex: 1;
      background: #111111;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      padding: 12px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .btn-apply:hover {
      background: #333333;
    }

    .btn-clear {
      background: #f4f4f4;
      color: #444444;
      border: 1px solid #e2e2e2;
      border-radius: 4px;
      padding: 12px 18px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-clear:hover {
      background: #eaeaea;
    }

    /* Pagination & Load More Section */
    .pagination-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 48px;
      margin-bottom: 24px;
      width: 100%;
    }

    .showing-text {
      font-size: 15px;
      font-weight: 700;
      color: #111111;
      margin-bottom: 18px;
      text-align: center;
      letter-spacing: -0.01em;
    }

    .progress-bar-container {
      width: 100%;
      max-width: 520px;
      height: 2px;
      background: #e0e0e0;
      position: relative;
      margin-bottom: 28px;
      border-radius: 1px;
    }

    .progress-bar-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #d40026;
      transition: width 0.3s ease;
    }

    .btn-load-more {
      background: #000000;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 14px 44px;
      border: none;
      border-radius: 2px;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.15s ease;
      font-family: inherit;
    }

    .btn-load-more:hover {
      background: #222222;
      transform: translateY(-1px);
    }

    .btn-load-more:active {
      transform: translateY(0);
    }
  `;

  constructor() {
    super();
    this.products = null;
    this.data = null;
    this.brands = [];
    this.categories = [];
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.selectedPriceRange = '';
    this.selectedSort = 'default';
    this.sidebarOpen = false;
    this.activeSidebarTab = 'all';
    this.visibleCount = 32;
    this.pageSize = 32;
    this.lang = 'vi';
    this.loading = false;
  }

  _categoryMatchesProduct(c, p) {
    if (!c || !p) return false;
    const cid = c.ID || c._id;
    const cslug = c.slug;
    const cpath = c.path;

    if (cid && (p.category === cid || p.brandCategory === cid)) return true;
    if (cslug && (p.category === cslug || p.primaryCategorySlug === cslug)) return true;
    if (p.category && cid && p.category.includes(cid)) return true;
    if (p.categoryPath) {
      if (cslug && (p.categoryPath.includes(`/${cslug}/`) || p.categoryPath.endsWith(`/${cslug}`) || p.categoryPath.includes(cslug))) return true;
      if (cid && p.categoryPath.includes(cid)) return true;
      if (cpath && p.categoryPath.startsWith(cpath)) return true;
    }
    if (p.brandCategoryPath && cslug && p.brandCategoryPath.includes(cslug)) return true;
    return false;
  }

  _getAvailableCategories() {
    const raw = this.data || this.products;
    const products = Array.isArray(raw) ? raw : [];
    const allCats = Array.isArray(this.categories) ? this.categories : [];

    if (!allCats.length) return [];
    if (!products.length) return [];

    // Chỉ giữ lại những danh mục có ít nhất 1 sản phẩm trong danh sách sản phẩm hiện có
    return allCats.filter((c) => {
      return products.some((p) => this._categoryMatchesProduct(c, p));
    });
  }

  _getFilteredProducts() {
    const raw = this.data || this.products;
    const list = Array.isArray(raw) ? [...raw] : [];

    let filtered = list;

    if (this.selectedCategory) {
      const allCats = Array.isArray(this.categories) ? this.categories : [];
      const matchedCat = allCats.find(
        (c) => c.ID === this.selectedCategory || c._id === this.selectedCategory || c.slug === this.selectedCategory
      );
      if (matchedCat) {
        filtered = filtered.filter((p) => this._categoryMatchesProduct(matchedCat, p));
      } else {
        filtered = filtered.filter((p) => {
          const cat = this.selectedCategory;
          return (
            p.category === cat ||
            p.categorySlug === cat ||
            p.brandCategory === cat ||
            (p.category && p.category.includes(cat)) ||
            (p.categoryPath && p.categoryPath.includes(cat))
          );
        });
      }
    }

    if (this.selectedBrand) {
      filtered = filtered.filter((p) => {
        const brand = this.selectedBrand.toLowerCase();
        const pBrand = (p.brand || '').toLowerCase();
        return pBrand === brand || pBrand.includes(brand) || (p.brandPath && p.brandPath.toLowerCase().includes(brand));
      });
    }

    if (this.selectedPriceRange) {
      filtered = filtered.filter((p) => {
        const price = Number(p.minPrice || p.price || 0);
        switch (this.selectedPriceRange) {
          case 'under-1m':
            return price < 1000000;
          case '1m-3m':
            return price >= 1000000 && price <= 3000000;
          case '3m-5m':
            return price >= 3000000 && price <= 5000000;
          case 'over-5m':
            return price > 5000000;
          default:
            return true;
        }
      });
    }

    if (this.selectedSort === 'price-asc') {
      filtered.sort((a, b) => (Number(a.minPrice || a.price || 0)) - (Number(b.minPrice || b.price || 0)));
    } else if (this.selectedSort === 'price-desc') {
      filtered.sort((a, b) => (Number(b.minPrice || b.price || 0)) - (Number(a.minPrice || a.price || 0)));
    } else if (this.selectedSort === 'title-asc') {
      filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }

    return filtered;
  }

  _openSidebar(tab = 'all') {
    this.activeSidebarTab = tab;
    this.sidebarOpen = true;
  }

  _closeSidebar() {
    this.sidebarOpen = false;
  }

  _clearAllFilters() {
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.selectedPriceRange = '';
    this.selectedSort = 'default';
    this.visibleCount = this.pageSize;
  }

  _loadMore() {
    this.visibleCount += this.pageSize;
  }

  updated(changedProps) {
    if (
      changedProps.has('selectedCategory') ||
      changedProps.has('selectedBrand') ||
      changedProps.has('selectedPriceRange') ||
      changedProps.has('selectedSort') ||
      changedProps.has('products') ||
      changedProps.has('data')
    ) {
      this.visibleCount = this.pageSize || 32;
    }
  }

  _onProductCardClick(e) {
    dispatchCustomEvent(this, 'product-select', { product: e.detail.product });
  }

  render() {
    const rawProducts = this.data || this.products;
    const hasRaw = Array.isArray(rawProducts) ? rawProducts.length > 0 : (rawProducts !== null && rawProducts !== undefined);
    const isExplicitLoading = this.loading === true || this.loading === 'true';
    const isLoading = isExplicitLoading || (this.products === null && !hasRaw);

    if (isLoading) {
      return html`
        <div>
          <div class="filter-toolbar">
            <div class="skeleton-box" style="width: 130px; height: 18px;"></div>
            <div class="skeleton-box" style="width: 120px; height: 34px; border-radius: 4px;"></div>
            <div class="skeleton-box" style="width: 100px; height: 34px; border-radius: 4px;"></div>
            <div class="skeleton-box" style="width: 100px; height: 34px; border-radius: 4px;"></div>
          </div>
          <div class="product-grid" role="status" aria-label="Loading products">
            ${[1, 2, 3, 4, 5, 6, 7, 8].map(
              () => html`
                <div class="skeleton-card">
                  <div style="height: 38px; padding: 8px 16px; display: flex; align-items: center;">
                    <div class="skeleton-box" style="width: 50px; height: 18px; border-radius: 2px;"></div>
                  </div>
                  <div class="skeleton-box skeleton-img"></div>
                  <div class="skeleton-content">
                    <div class="skeleton-box skeleton-brand"></div>
                    <div class="skeleton-box skeleton-title"></div>
                    <div class="skeleton-box skeleton-price"></div>
                  </div>
                </div>
              `
            )}
          </div>
        </div>
      `;
    }

    const filteredList = this._getFilteredProducts();
    const availableCategories = this._getAvailableCategories();
    const hasActiveFilters = this.selectedCategory || this.selectedBrand || this.selectedPriceRange;
    const totalItems = filteredList.length;
    const displayedList = filteredList.slice(0, this.visibleCount);
    const progressPercent = totalItems > 0 ? Math.min(100, (displayedList.length / totalItems) * 100) : 0;

    return html`
      <div>
        <div class="filter-toolbar">
          <span class="results-text">${t('resultsCount', this.lang, filteredList.length)}</span>

          <div class="sort-select-wrap">
            <select
              class="sort-select"
              @change="${(e) => (this.selectedSort = e.target.value)}"
              .value="${this.selectedSort}"
            >
              <option value="default">${t('sortBy', this.lang)}</option>
              <option value="price-asc">${t('sortPriceAsc', this.lang)}</option>
              <option value="price-desc">${t('sortPriceDesc', this.lang)}</option>
              <option value="title-asc">${t('sortTitleAsc', this.lang)}</option>
            </select>
            <span class="sort-arrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>

          <div class="filter-buttons-group">
            <button
              class="filter-trigger-btn ${this.selectedBrand ? 'has-value' : ''}"
              @click="${() => this._openSidebar('brand')}"
            >
              <span>${t('filterBrand', this.lang)}</span>
            </button>

            <button
              class="filter-trigger-btn ${this.selectedPriceRange ? 'has-value' : ''}"
              @click="${() => this._openSidebar('price')}"
            >
              <span>${t('filterPrice', this.lang)}</span>
            </button>

            <button
              class="filter-trigger-btn ${this.selectedCategory ? 'has-value' : ''}"
              @click="${() => this._openSidebar('category')}"
            >
              <span>${t('filterCategory', this.lang)}</span>
            </button>

            ${hasActiveFilters
              ? html`<button class="reset-link" @click="${this._clearAllFilters}">${t('clearAll', this.lang)}</button>`
              : ''}

            <button
              class="filter-trigger-btn all-filters-btn"
              @click="${() => this._openSidebar('all')}"
            >
              <span>${this.lang === 'vi' ? 'Tất cả bộ lọc' : 'All Filters'}</span>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM1 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5zm12 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM1 8.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm5 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5zm3 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM1 13.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm10 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="product-grid">
          ${displayedList.length > 0
            ? displayedList.map(
                (p) => html`
                  <wx-product-card
                    .product="${p}"
                    .lang="${this.lang}"
                    @product-click="${this._onProductCardClick}"
                  ></wx-product-card>
                `
              )
            : html`
                <div class="empty-state">
                  <p>${t('emptyProducts', this.lang)}</p>
                </div>
              `}
        </div>

        ${totalItems > this.pageSize
          ? html`
              <div class="pagination-wrapper">
                <div class="showing-text">
                  ${t('showingItems', this.lang, displayedList.length, totalItems)}
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
                </div>
                ${displayedList.length < totalItems
                  ? html`
                      <button class="btn-load-more" @click="${this._loadMore}">
                        ${t('loadMore', this.lang)}
                      </button>
                    `
                  : ''}
              </div>
            `
          : ''}

        <div
          class="drawer-overlay ${this.sidebarOpen ? 'open' : ''}"
          @click="${this._closeSidebar}"
        ></div>

        <aside class="filter-sidebar ${this.sidebarOpen ? 'open' : ''}" aria-label="${t('productFilterAria', this.lang)}">
          <div class="sidebar-header">
            <h3 class="sidebar-title">${t('searchFilters', this.lang)}</h3>
            <button class="close-btn" @click="${this._closeSidebar}" aria-label="${t('close', this.lang)}">✕</button>
          </div>

          <div class="sidebar-content">
            <div class="filter-section">
              <div class="filter-group-title">
                <span>${t('categories', this.lang)}</span>
                ${this.selectedCategory ? html`<a style="font-size: 11px; color: #d40026; cursor: pointer;" @click="${() => (this.selectedCategory = '')}">${t('clear', this.lang)}</a>` : ''}
              </div>
              <div class="filter-options-list">
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="cat_filter"
                    value=""
                    ?checked="${!this.selectedCategory}"
                    @change="${() => (this.selectedCategory = '')}"
                  />
                  <span>${t('allCategories', this.lang)}</span>
                </label>
                <div class="filter-options-scrollable">
                  ${availableCategories && availableCategories.length > 0
                    ? availableCategories.map(
                        (c) => html`
                          <label class="filter-option-label">
                            <input
                              type="radio"
                              name="cat_filter"
                              value="${c.ID || c.slug || c._id}"
                              ?checked="${this.selectedCategory === (c.ID || c.slug || c._id)}"
                              @change="${() => (this.selectedCategory = c.ID || c.slug || c._id)}"
                            />
                            <span>${c.title}</span>
                          </label>
                        `
                      )
                    : html`<span style="font-size: 12px; color: #888888; padding: 4px 0;">${t('noCategories', this.lang)}</span>`}
                </div>
              </div>
            </div>

            <div class="filter-section">
              <div class="filter-group-title">
                <span>${t('brands', this.lang)}</span>
                ${this.selectedBrand ? html`<a style="font-size: 11px; color: #d40026; cursor: pointer;" @click="${() => (this.selectedBrand = '')}">${t('clear', this.lang)}</a>` : ''}
              </div>
              <div class="filter-options-list">
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="brand_filter"
                    value=""
                    ?checked="${!this.selectedBrand}"
                    @change="${() => (this.selectedBrand = '')}"
                  />
                  <span>${t('allBrands', this.lang)}</span>
                </label>
                ${this.brands && this.brands.length > 0
                  ? this.brands.map(
                      (b) => html`
                        <label class="filter-option-label">
                          <input
                            type="radio"
                            name="brand_filter"
                            value="${b.ID || b.slug || b._id}"
                            ?checked="${this.selectedBrand === (b.ID || b.slug || b._id)}"
                            @change="${() => (this.selectedBrand = b.ID || b.slug || b._id)}"
                          />
                          <span>${b.title}</span>
                        </label>
                      `
                    )
                  : ''}
              </div>
            </div>

            <div class="filter-section">
              <div class="filter-group-title">
                <span>${t('priceRange', this.lang)}</span>
                ${this.selectedPriceRange ? html`<a style="font-size: 11px; color: #d40026; cursor: pointer;" @click="${() => (this.selectedPriceRange = '')}">${t('clear', this.lang)}</a>` : ''}
              </div>
              <div class="filter-options-list">
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value=""
                    ?checked="${!this.selectedPriceRange}"
                    @change="${() => (this.selectedPriceRange = '')}"
                  />
                  <span>${t('allPrices', this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="under-1m"
                    ?checked="${this.selectedPriceRange === 'under-1m'}"
                    @change="${() => (this.selectedPriceRange = 'under-1m')}"
                  />
                  <span>${t('priceUnder1m', this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="1m-3m"
                    ?checked="${this.selectedPriceRange === '1m-3m'}"
                    @change="${() => (this.selectedPriceRange = '1m-3m')}"
                  />
                  <span>${t('price1mTo3m', this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="3m-5m"
                    ?checked="${this.selectedPriceRange === '3m-5m'}"
                    @change="${() => (this.selectedPriceRange = '3m-5m')}"
                  />
                  <span>${t('price3mTo5m', this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="over-5m"
                    ?checked="${this.selectedPriceRange === 'over-5m'}"
                    @change="${() => (this.selectedPriceRange = 'over-5m')}"
                  />
                  <span>${t('priceOver5m', this.lang)}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="sidebar-footer">
            <button class="btn-clear" @click="${this._clearAllFilters}">${t('reset', this.lang)}</button>
            <button class="btn-apply" @click="${this._closeSidebar}">${t('viewResults', this.lang, filteredList.length)}</button>
          </div>
        </aside>
      </div>
    `;
  }
}

safeDefine('wx-product-listing', WxProductListing);
