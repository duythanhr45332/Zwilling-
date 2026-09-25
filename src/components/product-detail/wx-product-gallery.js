import { LitElement, html, css } from 'lit';
import { themeStyles } from '../../styles/theme.js';
import { safeDefine } from '../../utils/element.js';

export class WxProductGallery extends LitElement {
  static properties = {
    images: { type: Array },
    selectedIndex: { type: Number }
  };

  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }

      .gallery-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .main-viewport {
        position: relative;
        width: 100%;
        padding-top: 100%; /* 1:1 Aspect ratio */
        background: var(--wx-color-surface-subtle);
        border: 1px solid var(--wx-color-border);
        border-radius: var(--wx-radius-md);
        overflow: hidden;
      }

      .main-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 24px;
        transition: opacity var(--wx-transition-normal);
      }

      .thumbnails-track {
        display: flex;
        gap: 12px;
        overflow-x: auto;
        padding-bottom: 8px;
        scrollbar-width: thin;
      }

      .thumb-btn {
        flex: 0 0 72px;
        height: 72px;
        border: 2px solid var(--wx-color-border);
        border-radius: var(--wx-radius-sm);
        background: var(--wx-color-surface-subtle);
        padding: 4px;
        cursor: pointer;
        transition: all var(--wx-transition-fast);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .thumb-btn:hover {
        border-color: var(--wx-color-border-hover);
      }

      .thumb-btn.active {
        border-color: var(--wx-color-primary);
        box-shadow: 0 0 0 1px var(--wx-color-primary);
      }

      .thumb-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .empty-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48px;
        color: var(--wx-color-text-muted);
      }
    `
  ];

  constructor() {
    super();
    this.images = [];
    this.selectedIndex = 0;
  }

  _selectImage(index) {
    this.selectedIndex = index;
  }

  render() {
    const list = this.images || [];
    const currentImg = list[this.selectedIndex] || list[0];

    return html`
      <div class="gallery-container">
        <div class="main-viewport">
          ${currentImg
        ? html`<img class="main-image" src="${currentImg}" alt="Product preview" />`
        : html`<div class="empty-placeholder">🔪</div>`}
        </div>

        ${list.length > 1
        ? html`
              <div class="thumbnails-track" role="tablist">
                ${list.map(
          (img, idx) => html`
                    <button
                      class="thumb-btn ${idx === this.selectedIndex ? 'active' : ''}"
                      @click="${() => this._selectImage(idx)}"
                      aria-label="Xem ảnh ${idx + 1}"
                    >
                      <img class="thumb-img" src="${img}" alt="Thumbnail ${idx + 1}" loading="lazy" />
                    </button>
                  `
        )}
              </div>
            `
        : ''}
      </div>
    `;
  }
}

safeDefine('wx-product-gallery', WxProductGallery);
