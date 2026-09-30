/**
 * Quản lý đa ngôn ngữ (i18n) cho my-wix-ui-lib
 * Mặc định: Tiếng Việt (vi)
 * Hỗ trợ chuyển đổi song ngữ: Tiếng Anh (en)
 */

export const translations = {
  vi: {
    // wx-product-listing
    resultsCount: (count) => `${count} sản phẩm`,
    sortBy: 'Sắp xếp theo',
    sortPriceAsc: 'Giá: Thấp đến Cao',
    sortPriceDesc: 'Giá: Cao đến Thấp',
    sortTitleAsc: 'Tên: A đến Z',
    filterCategory: 'Danh mục',
    filterBrand: 'Thương hiệu',
    filterSeries: 'Dòng sản phẩm',
    filterPrice: 'Mức giá',
    clearAll: 'Xóa tất cả',
    emptyProducts: 'Không có sản phẩm nào phù hợp với bộ lọc.',
    showingItems: (displayed, total) => `Đang hiển thị ${displayed} trên tổng số ${total} sản phẩm`,
    loadMore: 'XEM THÊM SẢN PHẨM',
    searchFilters: 'BỘ LỌC TÌM KIẾM',
    clear: 'Xóa',
    categories: 'DANH MỤC',
    allCategories: 'Tất cả danh mục',
    noCategories: 'Không có danh mục nào',
    brands: 'THƯƠNG HIỆU',
    allBrands: 'Tất cả thương hiệu',
    series: 'DÒNG SẢN PHẨM',
    allSeries: 'Tất cả dòng sản phẩm',
    noSeries: 'Không có dòng sản phẩm nào',
    priceRange: 'KHOẢNG GIÁ',
    allPrices: 'Tất cả mức giá',
    priceUnder1m: 'Dưới 1.000.000 ₫',
    price1mTo3m: '1.000.000 ₫ - 3.000.000 ₫',
    price3mTo5m: '3.000.000 ₫ - 5.000.000 ₫',
    priceOver5m: 'Trên 5.000.000 ₫',
    reset: 'Thiết lập lại',
    viewResults: (count) => `Xem ${count} sản phẩm`,
    close: 'Đóng',
    productFilterAria: 'Bộ lọc sản phẩm',

    // wx-product-card
    contactUs: 'Liên hệ',
    noImage: 'Chưa có ảnh',
    prevImage: 'Ảnh trước',
    nextImage: 'Ảnh sau',

    // wx-product-detail
    seriesLabel: (name) => `Dòng sản phẩm: ${name}`,
    reviewsCount: (count) => `(${count} Đánh giá)`,
    highlights: 'Đặc điểm nổi bật:',
    descriptionTab: 'MÔ TẢ SẢN PHẨM',
    specsTab: 'THÔNG SỐ KỸ THUẬT',
    instructionsTab: 'HƯỚNG DẪN SỬ DỤNG & BẢO QUẢN',
    noDescription: 'Chưa có thông tin mô tả cho sản phẩm này.',
    noSpecs: 'Chưa có thông số kỹ thuật.',
    defaultInstructions: [
      'Vệ sinh bằng tay với nước ấm và xà phòng nhẹ sau khi sử dụng.',
      'Lau khô hoàn toàn trước khi cất giữ.',
      'Bảo quản nơi khô ráo, thoáng mát.'
    ],
    relatedProducts: 'SẢN PHẨM LIÊN QUAN',

    // wx-filter-toolbar
    toolbarResults: (count) => `${count} KẾT QUẢ`,
    allBrandsToolbar: 'Tất cả Thương hiệu',
    allCategoriesToolbar: 'Tất cả Danh mục',
    sortDefault: 'Sắp xếp: Mặc định',
    clearFilters: 'Xóa bộ lọc',

    // wx-brand-carousel
    brandSectionTitle: 'THƯƠNG HIỆU',
    seriesSectionTitle: 'DÒNG SẢN PHẨM',
    seriesTag: 'Dòng sản phẩm',

    // wx-category-carousel & product-carousel
    scrollLeft: 'Cuộn sang trái',
    scrollRight: 'Cuộn sang phải',

    // breadcrumb
    home: 'TRANG CHỦ',
    products: 'SẢN PHẨM',
    brandsBreadcrumb: 'THƯƠNG HIỆU',
    about: 'GIỚI THIỆU',
    news: 'TIN TỨC'
  },
  en: {
    // wx-product-listing
    resultsCount: (count) => `${count} Results`,
    sortBy: 'Sort by',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    sortTitleAsc: 'Name: A to Z',
    filterCategory: 'Category',
    filterBrand: 'Brand',
    filterSeries: 'Series',
    filterPrice: 'Price',
    clearAll: 'Clear All',
    emptyProducts: 'No products found matching your filters.',
    showingItems: (displayed, total) => `Showing ${displayed} of ${total} items`,
    loadMore: 'LOAD MORE',
    searchFilters: 'SEARCH FILTERS',
    clear: 'Clear',
    categories: 'CATEGORIES',
    allCategories: 'All Categories',
    noCategories: 'No categories found',
    brands: 'BRANDS',
    allBrands: 'All Brands',
    series: 'SERIES',
    allSeries: 'All Series',
    noSeries: 'No series found',
    priceRange: 'PRICE RANGE',
    allPrices: 'All Prices',
    priceUnder1m: 'Under 1,000,000 ₫',
    price1mTo3m: '1,000,000 ₫ - 3,000,000 ₫',
    price3mTo5m: '3,000,000 ₫ - 5,000,000 ₫',
    priceOver5m: 'Over 5,000,000 ₫',
    reset: 'Reset',
    viewResults: (count) => `View ${count} products`,
    close: 'Close',
    productFilterAria: 'Product filters',

    // wx-product-card
    contactUs: 'Contact Us',
    noImage: 'No image available',
    prevImage: 'Previous image',
    nextImage: 'Next image',

    // wx-product-detail
    seriesLabel: (name) => `Series: ${name}`,
    reviewsCount: (count) => `(${count} Reviews)`,
    highlights: 'Highlights:',
    descriptionTab: 'PRODUCT DESCRIPTION',
    specsTab: 'SPECIFICATIONS',
    instructionsTab: 'INSTRUCTIONS & CARE',
    noDescription: 'No description available for this product.',
    noSpecs: 'No specifications available.',
    defaultInstructions: [
      'Hand wash with warm water and mild soap after use.',
      'Dry completely before storage.',
      'Store in a cool, dry place.'
    ],
    relatedProducts: 'RELATED PRODUCTS',

    // wx-filter-toolbar
    toolbarResults: (count) => `${count} RESULTS`,
    allBrandsToolbar: 'All Brands',
    allCategoriesToolbar: 'All Categories',
    sortDefault: 'Sort: Default',
    clearFilters: 'Clear Filters',

    // wx-brand-carousel
    brandSectionTitle: 'BRANDS',
    seriesSectionTitle: 'SERIES',
    seriesTag: 'Series',

    // wx-category-carousel & product-carousel
    scrollLeft: 'Scroll left',
    scrollRight: 'Scroll right',

    // breadcrumb
    home: 'HOME',
    products: 'PRODUCTS',
    brandsBreadcrumb: 'BRANDS',
    about: 'ABOUT US',
    news: 'NEWS'
  }
};

/**
 * Helper lấy chuỗi bản dịch theo ngôn ngữ
 * @param {string} key
 * @param {string} lang
 * @param  {...any} args
 */
export function t(key, lang = 'vi', ...args) {
  let activeLang = 'vi';
  if (lang && typeof lang === 'string') {
    activeLang = lang.toLowerCase().startsWith('en') ? 'en' : 'vi';
  } else if (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) {
    activeLang = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'vi';
  }

  const dict = translations[activeLang] || translations.vi;
  const val = dict[key] !== undefined ? dict[key] : translations.vi[key];

  if (typeof val === 'function') {
    return val(...args);
  }
  return val !== undefined ? val : key;
}
