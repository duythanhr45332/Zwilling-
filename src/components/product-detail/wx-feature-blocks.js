import { LitElement, html, css } from 'lit';
import { themeStyles } from '../../styles/theme.js';
import { safeDefine } from '../../utils/element.js';
import { jsonObjectConverter, resolveImageUrl } from '../../utils/formatters.js';
import { t } from '../../utils/i18n.js';

export class WxFeatureBlocks extends LitElement {
  static properties = {
    blocks: { type: Array, converter: jsonObjectConverter },
    block: { type: Object, converter: jsonObjectConverter },
    items: { type: Array, converter: jsonObjectConverter },
    data: { type: Object, converter: jsonObjectConverter },
    type: { type: String }, // 'all' | 'story' | 'highlights'
    lang: { type: String },
    activeHotspotIndex: { state: true },
    failedImages: { state: true }
  };

  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0;
        font-family: var(--wx-font-family);
        color: #111111;
        background: transparent;
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

      .feature-blocks-container {
        display: flex;
        flex-direction: column;
        gap: 48px;
        width: 100%;
        margin: 0;
      }

      /* -----------------------------------------
       * COMMON: KHUNG "CHƯA CÓ ẢNH" PLACEHOLDER
       * ----------------------------------------- */
      .no-image-placeholder {
        width: 100%;
        height: 100%;
        min-height: 220px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #fbfbfb;
        border: 1px dashed #d5d5d5;
        border-radius: 4px;
        color: #888888;
        gap: 10px;
        user-select: none;
      }

      .no-image-placeholder svg {
        opacity: 0.6;
      }

      .no-image-placeholder span {
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.02em;
      }

      /* -----------------------------------------
       * COMPONENT 1: STORY & 3-COLUMN HIGHLIGHTS
       * ----------------------------------------- */
      .story-section {
        display: flex;
        flex-direction: column;
        gap: 32px;
        background: #f2f0ee;
        padding: 40px;
        border-radius: 4px;
      }

      @media (max-width: 768px) {
        .story-section {
          padding: 20px 16px;
          gap: 20px;
        }
      }

      /* Story Banner (50/50 Layout) */
      .story-banner {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        align-items: center;
        background: #ffffff;
        padding-right: 40px;
        border-radius: 2px;
        overflow: hidden;
      }

      @media (max-width: 860px) {
        .story-banner {
          grid-template-columns: 1fr;
          gap: 24px;
          padding-right: 0;
          padding-bottom: 24px;
        }
      }

      .story-media {
        position: relative;
        width: 100%;
        min-height: 320px;
        background: #f8f8f8;
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .story-media img {
        width: 100%;
        height: 100%;
        max-height: 420px;
        object-fit: cover;
        display: block;
      }

      .story-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 18px;
        padding: 32px 0;
      }

      @media (max-width: 860px) {
        .story-content {
          padding: 0 20px 24px 20px;
        }
      }

      .story-heading {
        font-size: 22px;
        font-weight: 800;
        line-height: 1.25;
        color: #111111;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        margin: 0;
      }

      @media (max-width: 768px) {
        .story-heading {
          font-size: 18px;
        }
      }

      .story-body {
        font-size: 16px;
        line-height: 1.65;
        color: #444444;
        white-space: pre-line;
      }

      .story-cta-btn {
        align-self: flex-start;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #000000;
        color: #ffffff;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 12px 24px;
        border-radius: 2px;
        text-decoration: none;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s ease, transform 0.15s ease;
        margin-top: 6px;
      }

      .story-cta-btn:hover {
        background: #262626;
        transform: translateY(-1px);
      }

      /* 3-Column Highlights Grid */
      .cards-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }

      @media (max-width: 900px) {
        .cards-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 600px) {
        .cards-grid {
          grid-template-columns: 1fr;
        }
      }

      .feature-card {
        display: flex;
        flex-direction: column;
        background: #ffffff;
        border-radius: 2px;
        overflow: hidden;
        padding-bottom: 24px;
      }

      .card-media {
        width: 100%;
        aspect-ratio: 4 / 3;
        background: #f8f8f8;
        overflow: hidden;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .card-media img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .card-title {
        font-size: 18px;
        font-weight: 800;
        color: #111111;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        margin: 0 20px 8px 20px;
      }

      .card-body {
        font-size: 16px;
        line-height: 1.55;
        color: #555555;
        margin: 0 20px;
      }

      /* --------------------------------------------------
       * COMPONENT 2: INTERACTIVE KNIFE HOTSPOT & ACCORDION
       * -------------------------------------------------- */
      .hotspot-section {
        display: grid;
        grid-template-columns: 1.15fr 1fr;
        gap: 48px;
        align-items: center;
        background: #ffffff;
        padding: 24px 0;
      }

      @media (max-width: 920px) {
        .hotspot-section {
          grid-template-columns: 1fr;
          gap: 32px;
        }
      }

      /* Viewport Dao kèm Hotspot */
      .knife-viewport {
        position: relative;
        width: 100%;
        min-height: 280px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        user-select: none;
        padding: 10px 0;
      }

      .knife-media-wrapper {
        position: relative;
        display: inline-block;
        max-width: 100%;
        line-height: 0;
      }

      .knife-media-wrapper img {
        width: auto;
        max-width: 100%;
        height: auto;
        max-height: 320px;
        display: block;
        pointer-events: none;
      }

      /* Hotspot Pins trên ảnh dao */
      .hotspot-pin {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(18, 18, 18, 0.22);
        border: 2px solid rgba(255, 255, 255, 0.95);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
        cursor: pointer;
        padding: 0;
        margin: 0;
        outline: none;
        z-index: 5;
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                    background-color 0.2s ease,
                    border-color 0.2s ease,
                    box-shadow 0.2s ease;
      }

      .hotspot-pin:hover {
        transform: translate(-50%, -50%) scale(1.15);
        background: rgba(18, 18, 18, 0.35);
        border-color: #ffffff;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
      }

      .hotspot-pin-inner {
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s ease, background-color 0.2s ease;
        pointer-events: none;
      }

      .hotspot-pin-pulse {
        position: absolute;
        inset: -5px;
        border-radius: 50%;
        border: 2px solid #d40026;
        opacity: 0;
        pointer-events: none;
      }

      /* Điểm Active (màu đỏ như trong thiết kế mẫu) */
      .hotspot-pin.active {
        background: rgba(212, 0, 38, 0.25);
        border-color: #d40026;
        box-shadow: 0 0 14px rgba(212, 0, 38, 0.7), 0 2px 8px rgba(0, 0, 0, 0.3);
        transform: translate(-50%, -50%) scale(1.1);
        z-index: 10;
      }

      .hotspot-pin.active .hotspot-pin-inner {
        background: #d40026;
        box-shadow: 0 0 8px rgba(212, 0, 38, 0.8);
      }

      .hotspot-pin.active .hotspot-pin-pulse {
        animation: wx-hotspot-pulse 2s cubic-bezier(0.24, 0, 0.38, 1) infinite;
      }

      @keyframes wx-hotspot-pulse {
        0% {
          transform: scale(0.9);
          opacity: 0.85;
        }
        100% {
          transform: scale(1.65);
          opacity: 0;
        }
      }


      /* Cột Accordion */
      .accordion-col {
        display: flex;
        flex-direction: column;
        border-top: 1px solid #e5e5e5;
      }

      .accordion-row {
        border-bottom: 1px solid #e5e5e5;
      }

      .accordion-btn {
        width: 100%;
        background: none;
        border: none;
        padding: 16px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        text-align: left;
        color: #111111;
        transition: color 0.15s ease;
      }

      .accordion-btn:hover {
        color: #d40026;
      }

      .accordion-title {
        font-size: 18px;
        font-weight: 800;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        margin: 0;
      }

      .accordion-row.active .accordion-title {
        color: #111111;
      }

      .accordion-icon {
        font-size: 12px;
        color: #111111;
        transition: transform 0.2s ease;
      }

      .accordion-details {
        padding: 0 0 16px 0;
        font-size: 16px;
        line-height: 1.6;
        color: #555555;
        animation: wx-fade-down 0.2s ease-out;
      }

      @keyframes wx-fade-down {
        from {
          opacity: 0;
          transform: translateY(-4px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* -----------------------------------------
       * COMPONENT 3: INTRO BANNER
       * ----------------------------------------- */
      .intro-banner {
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }

      .intro-heading {
        font-size: 24px;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #111111;
        margin: 0;
      }

      .intro-body {
        font-size: 14px;
        line-height: 1.7;
        color: #555555;
      }
    `
  ];

  constructor() {
    super();
    this.blocks = [];
    this.items = [];
    this.data = null;
    this.type = 'all';
    this.lang = 'vi';
    this.activeHotspotIndex = 0;
    this.failedImages = new Set();
  }

  _getEffectiveBlocks() {
    if (this.block && typeof this.block === 'object') {
      return [this.block];
    }
    if (this.data && Array.isArray(this.data.blocks)) {
      return this.data.blocks;
    }
    if (this.data && this.data.block && typeof this.data.block === 'object') {
      return [this.data.block];
    }
    if (Array.isArray(this.blocks)) {
      return this.blocks;
    }
    return [];
  }

  _getEffectiveItems() {
    if (this.data && Array.isArray(this.data.items)) {
      return this.data.items;
    }
    if (Array.isArray(this.items)) {
      return this.items;
    }
    return [];
  }

  _getItemsForBlock(blockOrId) {
    const bId1 = typeof blockOrId === 'object' && blockOrId ? (blockOrId._id || '') : blockOrId;
    const bId2 = typeof blockOrId === 'object' && blockOrId ? (blockOrId.ID || '') : blockOrId;
    const allItems = this._getEffectiveItems();
    return allItems
      .filter((it) => {
        const b = it.block;
        if (!b) return true; // Cho phép truyền danh sách items trực tiếp vào component riêng
        if (typeof b === 'object' && b !== null) {
          const itId1 = b._id || '';
          const itId2 = b.ID || '';
          return (
            (bId1 && (itId1 === bId1 || itId2 === bId1)) ||
            (bId2 && (itId1 === bId2 || itId2 === bId2))
          );
        }
        return (bId1 && b === bId1) || (bId2 && b === bId2);
      })
      .sort((a, b) => (Number(a.position) || 0) - (Number(b.position) || 0));
  }

  _onImageError(src) {
    if (src) {
      const next = new Set(this.failedImages);
      next.add(src);
      this.failedImages = next;
    }
  }

  _isImageAvailable(src) {
    if (!src || typeof src !== 'string' || !src.trim()) return false;
    return !this.failedImages.has(src);
  }

  _renderPlaceholder(minHeight = '220px', label = null) {
    const text = label || t('noImage', this.lang) || 'Chưa có ảnh';
    return html`
      <div class="no-image-placeholder" style="min-height: ${minHeight};">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <span>${text}</span>
      </div>
    `;
  }

  _renderMedia(src, alt = '', minHeight = '220px') {
    const resolved = resolveImageUrl(src);
    if (this._isImageAvailable(resolved)) {
      return html`
        <img
          src="${resolved}"
          alt="${alt}"
          loading="lazy"
          @error="${() => this._onImageError(resolved)}"
        />
      `;
    }
    return this._renderPlaceholder(minHeight);
  }

  /* ----------------------------------------------------
   * RENDER: COMPONENT 1 — STORY & 3-COLUMN HIGHLIGHTS
   * ---------------------------------------------------- */
  _renderStoryBlock(block, childItems) {
    // Nếu item đầu tiên chứa tiêu đề, nội dung và ảnh story (theo đúng cấu trúc FeatureItems.csv)
    let heading = block.heading || block.title;
    let body = block.body || '';
    let cards = childItems;
    let bannerImage = block.image || '';

    if (childItems && childItems.length > 0) {
      const firstItem = childItems[0];
      heading = firstItem.title || heading;
      body = firstItem.body || body;
      // Luôn lấy ảnh banner chính từ item 1 trong FeatureItems (ưu tiên FeatureItems)
      bannerImage = firstItem.image || bannerImage;
      cards = childItems.slice(1);
    }

    return html`
      <div class="story-section">
        <!-- Banner 50/50 -->
        <div class="story-banner">
          <div class="story-media">
            ${this._renderMedia(bannerImage, heading, '320px')}
          </div>

          <div class="story-content">
            <h2 class="story-heading">${heading}</h2>
            ${body ? html`<div class="story-body">${body}</div>` : ''}
          </div>
        </div>

        <!-- 3-Column Feature Cards bên dưới -->
        ${cards.length > 0
          ? html`
              <div class="cards-grid">
                ${cards.map(
                  (card) => html`
                    <div class="feature-card">
                      <div class="card-media">
                        ${this._renderMedia(card.image, card.title, '180px')}
                      </div>
                      <h3 class="card-title">${card.title}</h3>
                      ${card.body ? html`<p class="card-body">${card.body}</p>` : ''}
                    </div>
                  `
                )}
              </div>
            `
          : ''}
      </div>
    `;
  }

  /* ----------------------------------------------------
   * RENDER: COMPONENT 2 — INTERACTIVE HOTSPOT & ACCORDION
   * ---------------------------------------------------- */
  _toggleAccordion(index) {
    if (this.activeHotspotIndex === index) {
      this.activeHotspotIndex = -1;
    } else {
      this.activeHotspotIndex = index;
    }
  }

  _selectHotspot(index) {
    this.activeHotspotIndex = index;
  }

  _renderHighlightsBlock(block, childItems) {
    const items = childItems.length > 0 ? childItems : [];
    const rawImage = block.image || (block.ID ? `/images/${block.ID}.png` : (block._id ? `/images/${block._id}.png` : ''));
    const resolvedImage = resolveImageUrl(rawImage);
    const hasImage = this._isImageAvailable(resolvedImage);

    return html`
      <div class="hotspot-section">
        <!-- Cột Trái: Ảnh Dao -->
        <div class="knife-viewport">
          ${hasImage
            ? html`
                <div class="knife-media-wrapper">
                  <img
                    src="${resolvedImage}"
                    alt="${block.title || 'Dao chi tiết'}"
                    loading="lazy"
                    @error="${() => this._onImageError(resolvedImage)}"
                  />
                  ${items.map((item, idx) => {
                    const rawX = item.coordX !== undefined && item.coordX !== null && item.coordX !== ''
                      ? item.coordX
                      : (item.x ?? item.hotspotX);
                    const rawY = item.coordY !== undefined && item.coordY !== null && item.coordY !== ''
                      ? item.coordY
                      : (item.y ?? item.hotspotY);

                    if (rawX === undefined || rawX === null || rawX === '') return '';
                    const x = parseFloat(rawX);
                    const y = parseFloat(rawY);
                    if (isNaN(x) || isNaN(y)) return '';

                    const isCurrent = this.activeHotspotIndex === idx;

                    return html`
                      <button
                        type="button"
                        class="hotspot-pin ${isCurrent ? 'active' : ''}"
                        style="left: ${x}%; top: ${y}%;"
                        @click="${(e) => {
                          e.stopPropagation();
                          this._selectHotspot(idx);
                        }}"
                        title="${item.title || `Điểm #${idx + 1}`}"
                        aria-label="${item.title || `Điểm #${idx + 1}`}"
                      >
                        <span class="hotspot-pin-pulse"></span>
                        <span class="hotspot-pin-inner"></span>
                      </button>
                    `;
                  })}
                </div>
              `
            : html`
                <div style="width: 100%;">
                  ${this._renderPlaceholder('260px')}
                </div>
              `}
        </div>

        <!-- Cột Phải: Danh sách Accordion tương tác -->
        <div class="accordion-col">
          ${items.map((item, idx) => {
            const isExpanded = this.activeHotspotIndex === idx;

            return html`
              <div class="accordion-row ${isExpanded ? 'active' : ''}">
                <button
                  class="accordion-btn"
                  @click="${() => this._toggleAccordion(idx)}"
                  aria-expanded="${isExpanded}"
                >
                  <span class="accordion-title">${item.title}</span>
                  <span class="accordion-icon">${isExpanded ? '▲' : '▼'}</span>
                </button>

                ${isExpanded
                  ? html`
                      <div class="accordion-details">
                        ${item.body}
                      </div>
                    `
                  : ''}
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  /* ----------------------------------------------------
   * RENDER: COMPONENT 3 — INTRO BANNER
   * ---------------------------------------------------- */
  _renderIntroBlock(block) {
    return html`
      <div class="intro-banner">
        <h2 class="intro-heading">${block.heading || block.title}</h2>
        ${block.body ? html`<div class="intro-body">${block.body}</div>` : ''}
        ${block.ctaLabel
          ? html`<button class="story-cta-btn" type="button">${block.ctaLabel}</button>`
          : ''}
      </div>
    `;
  }

  render() {
    const rawBlocks = this._getEffectiveBlocks();
    if (!rawBlocks || rawBlocks.length === 0) return html``;

    // Chỉ render các khối hợp lệ: 'story' và 'highlights'. Bỏ qua hoàn toàn các khối 'intro' cũ còn sót lại trong CMS.
    const filteredBlocks = rawBlocks.filter((b) => {
      const comp = b.component || 'story';
      if (comp === 'intro') return false;
      if (!this.type || this.type === 'all') return comp === 'story' || comp === 'highlights';
      return comp === this.type;
    });

    return html`
      <div class="feature-blocks-container">
        ${filteredBlocks.map((block) => {
          const childItems = this._getItemsForBlock(block);
          const compType = block.component || 'story';

          if (compType === 'highlights') {
            return this._renderHighlightsBlock(block, childItems);
          } else if (compType === 'story') {
            return this._renderStoryBlock(block, childItems);
          }
          return '';
        })}
      </div>
    `;
  }
}

safeDefine('wx-feature-blocks', WxFeatureBlocks);

/**
 * Component 1 Độc Lập: Story Section (Banner 50/50 trên + 3 Card dưới)
 */
export class WxStorySection extends WxFeatureBlocks {
  constructor() {
    super();
    this.type = 'story';
  }
}
safeDefine('wx-story-section', WxStorySection);

/**
 * Component 2 Độc Lập: Hotspot / Highlights Section (Sơ đồ ảnh + Accordion tính năng)
 */
export class WxHotspotSection extends WxFeatureBlocks {
  constructor() {
    super();
    this.type = 'highlights';
  }
}
safeDefine('wx-hotspot-section', WxHotspotSection);
