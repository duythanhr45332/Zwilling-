import { LitElement, html, css } from 'lit';
import { safeDefine } from '../../utils/element.js';
import { dispatchCustomEvent } from '../../utils/events.js';
import { jsonArrayConverter, booleanConverter } from '../../utils/formatters.js';
import { t } from '../../utils/i18n.js';

export class WxBreadcrumb extends LitElement {
  static properties = {
    items: { type: Array, converter: jsonArrayConverter },
    lang: { type: String },
    loading: { type: Boolean, converter: booleanConverter }
  };

  static styles = css`
    :host {
      display: block;
      font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      padding: 0;
      margin: 0;
      background: transparent;
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

    nav {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }

    .crumb-btn {
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      font-family: inherit;
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #555555;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      transition: color 0.15s ease;
      font-weight: 500;
    }

    .crumb-btn:hover {
      color: #111111;
    }

    .crumb-btn.first {
      font-weight: 800;
      color: #111111;
    }

    .crumb-btn.active {
      color: #222222;
      font-weight: 500;
      cursor: default;
      pointer-events: none;
    }

    .separator {
      font-size: 13px;
      color: #999999;
      user-select: none;
      display: inline-flex;
      align-items: center;
    }
  `;

  constructor() {
    super();
    this.items = null;
    this.lang = 'vi';
    this.loading = false;
  }

  _formatLabel(label) {
    if (!label || typeof label !== 'string') return '';
    const upper = label.trim().toUpperCase();
    if (upper === 'HOME' || upper === 'TRANG CHỦ') return t('home', this.lang);
    if (upper === 'PRODUCTS' || upper === 'SẢN PHẨM') return t('products', this.lang);
    if (upper === 'BRANDS' || upper === 'THƯƠNG HIỆU') return t('brandsBreadcrumb', this.lang);
    if (upper === 'ABOUT' || upper === 'ABOUT US' || upper === 'GIỚI THIỆU' || upper === 'VỀ CHÚNG TÔI') return t('about', this.lang);
    if (upper === 'BLOG' || upper === 'BÀI VIẾT' || upper === 'TIN TỨC') return t('blog', this.lang);
    return label;
  }

  _handleClick(e, item, index) {
    if (index === this.items.length - 1) return;
    e.preventDefault();
    dispatchCustomEvent(this, 'breadcrumb-click', { item, index });
  }

  render() {
    const isExplicitLoading = this.loading === true || this.loading === 'true';
    const isLoading = isExplicitLoading || (!this.items && this.items === null);

    if (isLoading) {
      return html`
        <nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 8px;">
          <div class="skeleton-box" style="width: 70px; height: 14px;"></div>
          <span class="separator" aria-hidden="true">&#x203A;</span>
          <div class="skeleton-box" style="width: 100px; height: 14px;"></div>
        </nav>
      `;
    }

    if (!this.items || !this.items.length) return html``;

    return html`
      <nav aria-label="Breadcrumb">
        ${this.items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === this.items.length - 1;
          const rawLabel = typeof item === 'string' ? item : item.label || item.title;
          const label = this._formatLabel(rawLabel);

          return html`
            ${index > 0 ? html`<span class="separator" aria-hidden="true">&#x203A;</span>` : ''}
            <button
              class="crumb-btn ${isFirst ? 'first' : ''} ${isLast ? 'active' : ''}"
              ?disabled="${isLast}"
              @click="${(e) => this._handleClick(e, item, index)}"
              aria-current="${isLast ? 'page' : 'false'}"
            >
              ${label}
            </button>
          `;
        })}
      </nav>
    `;
  }
}

safeDefine('wx-breadcrumb', WxBreadcrumb);
