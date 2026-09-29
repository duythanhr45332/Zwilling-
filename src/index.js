/**
 * my-wix-ui-lib Entry Point
 * Bộ 5 Web Components Lit 3 độc lập, tái sử dụng cho Wix Studio
 */

// 1. Component Breadcrumb (Ảnh 1)
export { WxBreadcrumb } from './components/breadcrumb/wx-breadcrumb.js';

// 2. Component Product Categories Carousel (Ảnh 2)
export { WxCategoryCarousel } from './components/category-carousel/wx-category-carousel.js';

// 3. Component Product Card & Product Carousel (Ảnh 3)
export { WxProductCard } from './components/product-listing/wx-product-card.js';
export { WxProductCarousel } from './components/product-carousel/wx-product-carousel.js';

// 4. Component List Product kèm Filter Toolbar (Ảnh 4)
export { WxProductListing } from './components/product-listing/wx-product-listing.js';

// 5. Component Product Detail View (Ảnh 5 - bỏ add to cart & shipping)
export { WxProductDetail } from './components/product-detail/wx-product-detail.js';

// 6. Component Feature Blocks (Ảnh 1: Story 3-col & Ảnh 2: Hotspot Accordion)
export { WxFeatureBlocks, WxStorySection, WxHotspotSection } from './components/product-detail/wx-feature-blocks.js';

// 7. Component Store Locator (Bản đồ & Danh sách Showroom)
export { WxStoreLocator, DEFAULT_STORES } from './components/store-locator/wx-store-locator.js';

// Tiện ích
export { safeDefine } from './utils/element.js';
export { formatCurrencyVND, safeJsonParse, parseGallery } from './utils/formatters.js';
export { dispatchCustomEvent } from './utils/events.js';
export { t, translations } from './utils/i18n.js';
export { themeStyles } from './styles/theme.js';

console.log('[my-wix-ui-lib] Đã đăng ký thành công 5 Web Components tái sử dụng (Lit 3)');
