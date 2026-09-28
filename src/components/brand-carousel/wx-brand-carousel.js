import { LitElement, html, css } from 'lit';
import { themeStyles } from '../../styles/theme.js';
import { safeDefine } from '../../utils/element.js';
import { dispatchCustomEvent } from '../../utils/events.js';
import { t } from '../../utils/i18n.js';
import { resolveImageUrl } from '../../utils/formatters.js';

export class WxBrandCarousel extends LitElement {
  static properties = {
    title: { type: String },
    items: { type: Array },
    type: { type: String }, // 'brands' | 'series'
    selectedId: { type: String },
    lang: { type: String },
    loading: { type: Boolean }
  };

  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
        margin: 0;
        padding: 0;
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

      .skeleton-box {
        background: linear-gradient(90deg, #f2f2f2 25%, #e8e8e8 50%, #f2f2f2 75%);
        background-size: 200% 100%;
        animation: wx-shimmer 1.5s infinite ease-in-out;
        border-radius: 4px;
      }

      .skeleton-brand-card {
        background: #ffffff;
        border: 1px solid #eeeeee;
        border-radius: 6px;
        padding: 24px 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }

      .section-title {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        margin-bottom: 16px;
        color: var(--wx-color-dark);
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
      }

      .brand-card {
        background: var(--wx-color-surface);
        border: 1px solid var(--wx-color-border);
        border-radius: var(--wx-radius-md);
        padding: 20px 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        cursor: pointer;
        transition: all var(--wx-transition-normal);
        position: relative;
      }

      .brand-card:hover {
        border-color: var(--wx-color-primary);
        transform: translateY(-2px);
        box-shadow: var(--wx-shadow-md);
      }

      .brand-card.active {
        border-color: var(--wx-color-primary);
        background-color: var(--wx-color-badge-bg);
      }

      .brand-logo-box {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
      }

      .brand-name {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--wx-color-dark);
      }

      .brand-desc {
        font-size: 12px;
        color: var(--wx-color-text-secondary);
        margin-top: 6px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .series-tag {
        font-size: 11px;
        color: var(--wx-color-accent);
        font-weight: 600;
        text-transform: uppercase;
        margin-top: 4px;
      }
    `
  ];

  constructor() {
    super();
    this.title = '';
    this.items = null;
    this.type = 'brands';
    this.selectedId = '';
    this.lang = 'vi';
    this.loading = false;
  }

  _handleItemClick(item) {
    const id = item.ID || item.id || item.slug;
    this.selectedId = id;
    if (this.type === 'series') {
      dispatchCustomEvent(this, 'series-select', { series: item });
    } else {
      dispatchCustomEvent(this, 'brand-select', { brand: item });
    }
  }

  render() {
    const isLoading = (!this.items && this.items === null) || this.loading;
    const displayTitle = this.title || (this.type === 'series' ? t('seriesSectionTitle', this.lang) : t('brandSectionTitle', this.lang));

    if (isLoading) {
      return html`
        <div>
          ${displayTitle ? html`<div class="section-title">${displayTitle}</div>` : ''}
          <div class="grid" role="status" aria-label="Loading brands">
            ${[1, 2, 3, 4].map(
              () => html`
                <div class="skeleton-brand-card">
                  <div class="skeleton-box" style="width: 100px; height: 36px;"></div>
                  <div class="skeleton-box" style="width: 70%; height: 14px;"></div>
                </div>
              `
            )}
          </div>
        </div>
      `;
    }

    if (!this.items || this.items.length === 0) return html``;

    return html`
      <div>
        ${displayTitle ? html`<div class="section-title">${displayTitle}</div>` : ''}
        <div class="grid">
          ${this.items.map((item) => {
            const id = item.ID || item.id || item.slug;
            const isSelected = this.selectedId === id;
            return html`
              <div
                class="brand-card ${isSelected ? 'active' : ''}"
                tabindex="0"
                @click="${() => this._handleItemClick(item)}"
                @keydown="${(e) => e.key === 'Enter' && this._handleItemClick(item)}"
              >
                <div class="brand-logo-box">
                  ${(item.image || item.logoImage || item.logo)
                    ? html`<img src="${resolveImageUrl(item.image || item.logoImage || item.logo)}" alt="${item.title}" style="max-height: 48px; max-width: 140px;" />`
                    : html`<span class="brand-name">${item.title}</span>`}
                </div>
                ${item.description ? html`<div class="brand-desc">${item.description}</div>` : ''}
                ${this.type === 'series' ? html`<span class="series-tag">${t('seriesTag', this.lang)}</span>` : ''}
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

safeDefine('wx-brand-carousel', WxBrandCarousel);
safeDefine('wx-brand-categories', class WxBrandCategories extends WxBrandCarousel {});
safeDefine('wx-series-carousel', class WxSeriesCarousel extends WxBrandCarousel {});
