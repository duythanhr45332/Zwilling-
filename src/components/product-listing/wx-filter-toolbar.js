import { LitElement, html, css } from 'lit';
import { themeStyles } from '../../styles/theme.js';
import { safeDefine } from '../../utils/element.js';
import { dispatchCustomEvent } from '../../utils/events.js';
import { t } from '../../utils/i18n.js';

export class WxFilterToolbar extends LitElement {
  static properties = {
    totalResults: { type: Number },
    brands: { type: Array },
    categories: { type: Array },
    selectedBrand: { type: String },
    selectedCategory: { type: String },
    selectedSort: { type: String },
    lang: { type: String }
  };

  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
        margin: 0;
        padding: 0;
      }

      .toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--wx-color-border);
      }

      .results-count {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--wx-color-dark);
      }

      .filters-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 12px;
      }

      .select-wrapper {
        position: relative;
      }

      select {
        appearance: none;
        -webkit-appearance: none;
        background-color: var(--wx-color-surface);
        border: 1px solid var(--wx-color-border);
        border-radius: var(--wx-radius-md);
        padding: 8px 32px 8px 12px;
        font-size: 13px;
        font-family: inherit;
        color: var(--wx-color-text);
        cursor: pointer;
        transition: border-color var(--wx-transition-fast);
      }

      select:hover {
        border-color: var(--wx-color-border-hover);
      }

      select:focus {
        outline: none;
        border-color: var(--wx-color-primary);
      }

      .select-arrow {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        font-size: 10px;
        color: var(--wx-color-text-muted);
      }

      .btn-reset {
        background: none;
        border: none;
        color: var(--wx-color-primary);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        padding: 6px 10px;
        border-radius: var(--wx-radius-sm);
        transition: background-color var(--wx-transition-fast);
      }

      .btn-reset:hover {
        background-color: var(--wx-color-badge-bg);
      }
    `
  ];

  constructor() {
    super();
    this.totalResults = 0;
    this.brands = [];
    this.categories = [];
    this.selectedBrand = '';
    this.selectedCategory = '';
    this.selectedSort = 'default';
    this.lang = 'vi';
  }

  _onBrandChange(e) {
    this.selectedBrand = e.target.value;
    this._emitChange();
  }

  _onCategoryChange(e) {
    this.selectedCategory = e.target.value;
    this._emitChange();
  }

  _onSortChange(e) {
    this.selectedSort = e.target.value;
    this._emitChange();
  }

  _resetFilters() {
    this.selectedBrand = '';
    this.selectedCategory = '';
    this.selectedSort = 'default';
    this._emitChange();
  }

  _emitChange() {
    dispatchCustomEvent(this, 'filter-change', {
      brand: this.selectedBrand,
      category: this.selectedCategory,
      sort: this.selectedSort
    });
  }

  render() {
    const hasActiveFilters = this.selectedBrand || this.selectedCategory || this.selectedSort !== 'default';

    return html`
      <div class="toolbar">
        <div class="results-count">
          ${t('toolbarResults', this.lang, this.totalResults)}
        </div>

        <div class="filters-group">
          <!-- Thương hiệu -->
          ${this.brands && this.brands.length > 0
            ? html`
                <div class="select-wrapper">
                  <select @change="${this._onBrandChange}" .value="${this.selectedBrand}">
                    <option value="">${t('allBrandsToolbar', this.lang)}</option>
                    ${this.brands.map(
                      (b) => html`<option value="${b.ID || b.slug}" ?selected="${this.selectedBrand === (b.ID || b.slug)}">${b.title}</option>`
                    )}
                  </select>
                  <span class="select-arrow">▼</span>
                </div>
              `
            : ''}

          <!-- Danh mục -->
          ${this.categories && this.categories.length > 0
            ? html`
                <div class="select-wrapper">
                  <select @change="${this._onCategoryChange}" .value="${this.selectedCategory}">
                    <option value="">${t('allCategoriesToolbar', this.lang)}</option>
                    ${this.categories.map(
                      (c) => html`<option value="${c.ID || c.slug}" ?selected="${this.selectedCategory === (c.ID || c.slug)}">${c.title}</option>`
                    )}
                  </select>
                  <span class="select-arrow">▼</span>
                </div>
              `
            : ''}

          <!-- Sắp xếp -->
          <div class="select-wrapper">
            <select @change="${this._onSortChange}" .value="${this.selectedSort}">
              <option value="default">${t('sortDefault', this.lang)}</option>
              <option value="price-asc">${t('sortPriceAsc', this.lang)}</option>
              <option value="price-desc">${t('sortPriceDesc', this.lang)}</option>
              <option value="title-asc">${t('sortTitleAsc', this.lang)}</option>
            </select>
            <span class="select-arrow">▼</span>
          </div>

          ${hasActiveFilters
            ? html`<button class="btn-reset" @click="${this._resetFilters}">${t('clearFilters', this.lang)}</button>`
            : ''}
        </div>
      </div>
    `;
  }
}

safeDefine('wx-filter-toolbar', WxFilterToolbar);
