import { LitElement, html, css } from 'lit';
import { themeStyles } from '../../styles/theme.js';
import { safeDefine } from '../../utils/element.js';
import { jsonObjectConverter, resolveImageUrl } from '../../utils/formatters.js';

export const DEFAULT_STORES = [
  {
    id: 'store-crescent-mall',
    ID: 'store-crescent-mall',
    title: 'ZWILLING CRESCENT MALL',
    address: 'Tầng 4F - 33, Crescent Mall, 101 Tôn Dật Tiên, Phường Tân Phú, Quận 7, TP.HCM',
    city: 'TP. Hồ Chí Minh',
    hotline: '028 399 07010',
    openHours: '10:00 - 22:00',
    latitude: 10.7293,
    longitude: 106.7198,
    googleMapsUrl: 'https://maps.google.com/?q=Crescent+Mall+101+Ton+Dat+Tien+Tan+Phu+Quan+7+TPHCM',
    image: '/images/store-crescent-mall.jpg',
    position: 1
  },
  {
    id: 'store-estella-place',
    ID: 'store-estella-place',
    title: 'ZWILLING ESTELLA PLACE',
    address: 'Tầng 3 - Estella Place, 88 Song Hành, Phường An Phú, TP. Thủ Đức, TP.HCM',
    city: 'TP. Hồ Chí Minh',
    hotline: '0283 519 3209',
    openHours: '09:30 - 22:00',
    latitude: 10.8016,
    longitude: 106.7431,
    googleMapsUrl: 'https://maps.google.com/?q=Estella+Place+88+Song+Hanh+An+Phu+TP+Thu+Duc+TPHCM',
    image: '/images/store-estella.jpg',
    position: 2
  },
  {
    id: 'store-lotte-lieu-giai',
    ID: 'store-lotte-lieu-giai',
    title: 'ZWILLING LOTTE DEPARTMENT STORE',
    address: 'Tầng 5 - Lotte Department Store, 54 Liễu Giai, Phường Cống Vị, Ba Đình, Hà Nội',
    city: 'Hà Nội',
    hotline: '0243 212 1177',
    openHours: '09:30 - 22:00',
    latitude: 21.0318,
    longitude: 105.8142,
    googleMapsUrl: 'https://maps.google.com/?q=Lotte+Department+Store+54+Lieu+Giai+Ba+Dinh+Ha+Noi',
    image: '/images/store-lotte.jpg',
    position: 3
  }
];

export class WxStoreLocator extends LitElement {
  static properties = {
    stores: { type: Array, converter: jsonObjectConverter },
    data: { type: Object, converter: jsonObjectConverter },
    selectedStoreId: { state: true },
    searchQuery: { state: true },
    selectedCity: { state: true },
    onlyOpen: { state: true },
    activeTab: { state: true }, // 'list' | 'map' (trên mobile)
    lang: { type: String }
  };

  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 0 40px 0;
        font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        color: #111111;
        box-sizing: border-box;
      }

      *, *::before, *::after {
        box-sizing: border-box;
        font-family: inherit;
      }

      button, input, select, textarea, a, h1, h2, h3, h4, p, span, div {
        font-family: inherit;
      }

      /* ------------------------------------
       * MAIN 2-COLUMN LAYOUT
       * ------------------------------------ */
      .locator-layout {
        display: grid;
        grid-template-columns: 440px 1fr;
        gap: 24px;
        min-height: 680px;
        align-items: stretch;
      }

      @media (max-width: 1024px) {
        .locator-layout {
          grid-template-columns: 380px 1fr;
        }
      }

      @media (max-width: 860px) {
        .locator-layout {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      }

      /* Mobile Toggle Tabs */
      .mobile-view-toggle {
        display: none;
      }

      @media (max-width: 860px) {
        .mobile-view-toggle {
          display: flex;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .toggle-btn {
          flex: 1;
          padding: 10px;
          border: none;
          background: #f8f9fa;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }

        .toggle-btn.active {
          background: #111111;
          color: #ffffff;
        }
      }

      /* ------------------------------------
       * LEFT COLUMN: STORE LIST & SEARCH
       * ------------------------------------ */
      .sidebar {
        display: flex;
        flex-direction: column;
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
        height: 680px;
      }

      @media (max-width: 860px) {
        .sidebar {
          height: auto;
          max-height: 580px;
        }
        .sidebar.mobile-hide {
          display: none;
        }
      }

      /* Search form */
      .search-box {
        display: flex;
        padding: 16px;
        border-bottom: 1px solid #e6e6e6;
        background: #fafafa;
        gap: 8px;
      }

      .search-input {
        flex: 1;
        height: 42px;
        padding: 0 14px;
        border: 1px solid #cccccc;
        border-radius: 2px;
        font-size: 13px;
        outline: none;
        transition: border-color 0.2s;
      }

      .search-input:focus {
        border-color: #111111;
      }

      .search-btn {
        height: 42px;
        padding: 0 20px;
        background: #111111;
        color: #ffffff;
        border: none;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        cursor: pointer;
        transition: background 0.2s;
        white-space: nowrap;
      }

      .search-btn:hover {
        background: #333333;
      }

      /* Filter bar */
      .filter-bar {
        padding: 12px 16px;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: #ffffff;
      }

      .city-pills {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }

      .city-pill {
        padding: 4px 12px;
        border: 1px solid #e0e0e0;
        border-radius: 20px;
        font-size: 12px;
        background: #ffffff;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .city-pill:hover {
        border-color: #999999;
      }

      .city-pill.active {
        background: #111111;
        border-color: #111111;
        color: #ffffff;
        font-weight: 600;
      }

      .open-filter {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: #444444;
        cursor: pointer;
        user-select: none;
      }

      .open-filter input[type="checkbox"] {
        accent-color: #d40026;
        cursor: pointer;
      }

      /* Store list scroll container */
      .store-list {
        flex: 1;
        overflow-y: auto;
        padding: 0;
        margin: 0;
        list-style: none;
      }

      .store-list::-webkit-scrollbar {
        width: 6px;
      }
      .store-list::-webkit-scrollbar-thumb {
        background: #d4d4d4;
        border-radius: 3px;
      }

      /* Store Card */
      .store-card {
        padding: 18px 16px;
        border-bottom: 1px solid #f0f0f0;
        cursor: pointer;
        display: flex;
        gap: 14px;
        position: relative;
        transition: background 0.15s ease;
      }

      .store-card:hover {
        background: #fbfbfb;
      }

      .store-card.active {
        background: #fbf6f6;
        border-left: 4px solid #d40026;
      }

      .store-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .store-name {
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: #111111;
        margin: 0;
        line-height: 1.4;
      }

      .store-address {
        font-size: 13px;
        color: #555555;
        line-height: 1.5;
        margin: 0;
      }

      .store-hotline {
        font-size: 13px;
        color: #111111;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 2px;
      }

      .store-hotline a {
        color: #d40026;
        text-decoration: none;
      }

      .store-hotline a:hover {
        text-decoration: underline;
      }

      .store-status {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: #444444;
        margin-top: 4px;
      }

      .status-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #10b981;
        display: inline-block;
      }

      .store-actions {
        display: flex;
        gap: 12px;
        margin-top: 6px;
      }

      .direction-link {
        font-size: 12px;
        font-weight: 600;
        color: #111111;
        text-decoration: underline;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }

      .direction-link:hover {
        color: #d40026;
      }

      .store-thumb {
        width: 72px;
        height: 72px;
        border-radius: 2px;
        object-fit: cover;
        background: #f0f0f0;
        flex-shrink: 0;
      }

      .empty-state {
        padding: 32px 16px;
        text-align: center;
        color: #888888;
        font-size: 13px;
      }

      /* ------------------------------------
       * RIGHT COLUMN: INTERACTIVE MAP
       * ------------------------------------ */
      .map-wrapper {
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        background: #eef2f5;
        height: 680px;
      }

      @media (max-width: 860px) {
        .map-wrapper {
          height: 480px;
        }
        .map-wrapper.mobile-hide {
          display: none;
        }
      }

      .map-iframe {
        width: 100%;
        height: 100%;
        border: none;
        display: block;
      }
    `
  ];

  constructor() {
    super();
    this.stores = [];
    this.data = null;
    this.selectedStoreId = '';
    this.searchQuery = '';
    this.selectedCity = 'all';
    this.onlyOpen = false;
    this.activeTab = 'list';
    this.lang = 'vi';
    this._boundOnMessage = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._boundOnMessage = this._onWindowMessage.bind(this);
    window.addEventListener('message', this._boundOnMessage);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._boundOnMessage) {
      window.removeEventListener('message', this._boundOnMessage);
    }
  }

  _onWindowMessage(e) {
    if (e.data && e.data.type === 'STORE_MARKER_CLICK') {
      const clickedId = e.data.id;
      if (clickedId) {
        this.selectedStoreId = clickedId;
        const card = this.shadowRoot.querySelector(`[data-store-id="${clickedId}"]`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  }

  firstUpdated() {
    this._initStoreSelection();
  }

  updated(changedProperties) {
    if (changedProperties.has('stores') || changedProperties.has('data')) {
      this._initStoreSelection();
    }
  }

  _getEffectiveStores() {
    if (Array.isArray(this.stores) && this.stores.length > 0) {
      return this.stores;
    }
    if (this.data && Array.isArray(this.data.stores) && this.data.stores.length > 0) {
      return this.data.stores;
    }
    return DEFAULT_STORES;
  }

  _initStoreSelection() {
    const list = this._getFilteredStores();
    if (list.length > 0 && (!this.selectedStoreId || !list.some(s => (s.id || s.ID) === this.selectedStoreId))) {
      this.selectedStoreId = list[0].id || list[0].ID;
    }
  }

  _getFilteredStores() {
    const all = this._getEffectiveStores();
    const q = (this.searchQuery || '').trim().toLowerCase();
    const city = this.selectedCity;

    return all.filter((s) => {
      // 1. Lọc theo thành phố
      if (city !== 'all' && s.city && !s.city.toLowerCase().includes(city.toLowerCase())) {
        return false;
      }

      // 2. Lọc theo tìm kiếm từ khóa
      if (q) {
        const textToSearch = [
          s.title, s.name, s.address, s.city, s.hotline
        ].filter(Boolean).join(' ').toLowerCase();

        if (!textToSearch.includes(q)) return false;
      }

      return true;
    });
  }

  _onSearchInput(e) {
    this.searchQuery = e.target.value;
  }

  _onSelectCity(city) {
    this.selectedCity = city;
    this._initStoreSelection();

    const filtered = this._getFilteredStores();
    const ids = filtered.map(s => s.id || s.ID);
    const iframe = this.shadowRoot.getElementById('storeMapFrame');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'FIT_BOUNDS', ids }, '*');
    }
  }

  _selectStore(store) {
    const id = store.id || store.ID;
    this.selectedStoreId = id;
    this.activeTab = 'map'; // Khi click store trên mobile, chuyển qua xem map

    const iframe = this.shadowRoot.getElementById('storeMapFrame');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'FLY_TO_STORE', id }, '*');
    }
  }

  _getMapIframeSrcDoc(stores, selectedId) {
    const storesData = JSON.stringify(stores.map(s => ({
      id: s.id || s.ID,
      title: s.title || '',
      address: s.address || '',
      hotline: s.hotline || '',
      openHours: s.openHours || '09:30 - 22:00',
      latitude: Number(s.latitude) || 0,
      longitude: Number(s.longitude) || 0,
      googleMapsUrl: s.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((s.title || '') + ' ' + (s.address || ''))}`
    })));

    return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ZWILLING Store Locations Map</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #eef2f5;
    }
    #map {
      width: 100%;
      height: 100%;
    }
    .leaflet-popup-content-wrapper {
      border-radius: 4px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.18);
      padding: 0;
    }
    .leaflet-popup-content {
      margin: 12px 14px;
      line-height: 1.4;
    }
    .popup-box {
      font-size: 12px;
    }
    .popup-title {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #111111;
      margin: 0 0 4px 0;
    }
    .popup-address {
      font-size: 12px;
      color: #555555;
      margin: 0 0 6px 0;
    }
    .popup-hotline {
      font-size: 12px;
      font-weight: 700;
      color: #d40026;
      margin: 0 0 8px 0;
    }
    .popup-btn {
      display: inline-block;
      padding: 5px 12px;
      background: #111111;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      border-radius: 2px;
      transition: background 0.2s;
    }
    .popup-btn:hover {
      background: #333333;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const stores = ${storesData};
    let currentSelectedId = "${selectedId || ''}";

    const map = L.map('map', {
      center: [16.0471, 107.8443],
      zoom: 6,
      zoomControl: true,
      scrollWheelZoom: true
    });

    // Google Maps Tile Layer - Hoàn toàn không cần API key, không watermark, tải cực nhanh tại Việt Nam
    L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps'
    }).addTo(map);

    // Custom Red Pin
    const redPin = L.divIcon({
      className: 'zwilling-pin',
      html: '<div style="width:32px;height:32px;background:#d40026;border:2.5px solid #ffffff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 4px 10px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div style="width:10px;height:10px;background:#ffffff;border-radius:50%;transform:rotate(45deg);"></div></div>',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const markers = {};
    const bounds = [];

    stores.forEach(s => {
      if (s.latitude && s.longitude) {
        bounds.push([s.latitude, s.longitude]);
        const m = L.marker([s.latitude, s.longitude], { icon: redPin }).addTo(map);

        const popupHtml = '<div class="popup-box">' +
          '<div class="popup-title">' + s.title + '</div>' +
          '<div class="popup-address">' + s.address + '</div>' +
          '<div class="popup-hotline">Hotline: ' + s.hotline + '</div>' +
          '<a class="popup-btn" href="' + s.googleMapsUrl + '" target="_blank">Chỉ đường ↗</a>' +
          '</div>';

        m.bindPopup(popupHtml);

        m.on('click', () => {
          currentSelectedId = s.id;
          window.parent.postMessage({ type: 'STORE_MARKER_CLICK', id: s.id }, '*');
        });

        markers[s.id] = m;
      }
    });

    // Khởi tạo vị trí ban đầu
    if (currentSelectedId && markers[currentSelectedId]) {
      const s = stores.find(x => x.id === currentSelectedId);
      if (s) {
        map.setView([s.latitude, s.longitude], 15);
        markers[currentSelectedId].openPopup();
      }
    } else if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }

    // Nhận thông điệp từ ngoài component
    window.addEventListener('message', (e) => {
      if (!e.data) return;
      if (e.data.type === 'FLY_TO_STORE') {
        const id = e.data.id;
        const s = stores.find(x => x.id === id);
        if (s && s.latitude && s.longitude) {
          map.flyTo([s.latitude, s.longitude], 15, { duration: 1.0 });
          if (markers[id]) {
            markers[id].openPopup();
          }
        }
      } else if (e.data.type === 'FIT_BOUNDS') {
        const activeIds = e.data.ids || [];
        const activeBounds = stores
          .filter(x => activeIds.includes(x.id))
          .map(x => [x.latitude, x.longitude]);
        if (activeBounds.length > 0) {
          map.fitBounds(activeBounds, { padding: [50, 50], maxZoom: 14 });
        }
      }
    });
  </script>
</body>
</html>`;
  }

  render() {
    const filteredStores = this._getFilteredStores();

    return html`
      <!-- Mobile Toggle Tabs (Danh sách / Bản đồ) -->
      <div class="mobile-view-toggle">
        <button
          class="toggle-btn ${this.activeTab === 'list' ? 'active' : ''}"
          @click="${() => { this.activeTab = 'list'; }}"
        >
          Danh sách (${filteredStores.length})
        </button>
        <button
          class="toggle-btn ${this.activeTab === 'map' ? 'active' : ''}"
          @click="${() => { this.activeTab = 'map'; }}"
        >
          Bản đồ
        </button>
      </div>

      <!-- Main Layout -->
      <div class="locator-layout">
        <!-- Cột trái: Tìm kiếm & Danh sách Showroom -->
        <aside class="sidebar ${this.activeTab === 'map' ? 'mobile-hide' : ''}">
          <div class="search-box">
            <input
              type="text"
              class="search-input"
              placeholder="Search locations..."
              .value="${this.searchQuery}"
              @input="${this._onSearchInput}"
            />
            <button class="search-btn" type="button">Search</button>
          </div>

          <div class="filter-bar">
            <div class="city-pills">
              <button
                class="city-pill ${this.selectedCity === 'all' ? 'active' : ''}"
                @click="${() => this._onSelectCity('all')}"
              >
                Tất cả (${this._getEffectiveStores().length})
              </button>
              <button
                class="city-pill ${this.selectedCity === 'TP. Hồ Chí Minh' ? 'active' : ''}"
                @click="${() => this._onSelectCity('TP. Hồ Chí Minh')}"
              >
                TP.HCM (2)
              </button>
              <button
                class="city-pill ${this.selectedCity === 'Hà Nội' ? 'active' : ''}"
                @click="${() => this._onSelectCity('Hà Nội')}"
              >
                Hà Nội (1)
              </button>
            </div>

            <label class="open-filter">
              <input
                type="checkbox"
                .checked="${this.onlyOpen}"
                @change="${(e) => { this.onlyOpen = e.target.checked; }}"
              />
              Only open locations
            </label>
          </div>

          <ul class="store-list">
            ${filteredStores.length === 0
              ? html`<li class="empty-state">Không tìm thấy cửa hàng phù hợp.</li>`
              : filteredStores.map((store) => {
                  const id = store.id || store.ID;
                  const isActive = id === this.selectedStoreId;

                  return html`
                    <li
                      class="store-card ${isActive ? 'active' : ''}"
                      data-store-id="${id}"
                      @click="${() => this._selectStore(store)}"
                    >
                      <div class="store-info">
                        <h3 class="store-name">${store.title}</h3>
                        <p class="store-address">${store.address}</p>
                        <div class="store-hotline">
                          Hotline:
                          <a href="tel:${(store.hotline || '').replace(/\s+/g, '')}">
                            ${store.hotline}
                          </a>
                        </div>
                        <div class="store-status">
                          <span class="status-dot"></span>
                          <span>Open now ${store.openHours || '09:30 - 22:00'}</span>
                        </div>
                        <div class="store-actions">
                          <a
                            href="${store.googleMapsUrl || '#'}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="direction-link"
                            @click="${(e) => e.stopPropagation()}"
                          >
                            Chỉ đường ↗
                          </a>
                        </div>
                      </div>

                      ${store.image
                        ? html`
                            <img
                              src="${resolveImageUrl(store.image)}"
                              alt="${store.title}"
                              class="store-thumb"
                              loading="lazy"
                            />
                          `
                        : ''}
                    </li>
                  `;
                })}
          </ul>
        </aside>

        <!-- Cột phải: Bản đồ tương tác -->
        <main class="map-wrapper ${this.activeTab === 'list' ? 'mobile-hide' : ''}">
          <iframe
            id="storeMapFrame"
            class="map-iframe"
            title="ZWILLING Store Locations Map"
            .srcdoc="${this._getMapIframeSrcDoc(filteredStores, this.selectedStoreId)}"
          ></iframe>
        </main>
      </div>
    `;
  }
}

safeDefine('wx-store-locator', WxStoreLocator);
