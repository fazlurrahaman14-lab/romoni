export const CURRENCY_RATES = {
  BDT: { symbol: '৳', rate: 1, name: 'Bangladeshi Taka' },
  USD: { symbol: '$', rate: 0.0083, name: 'US Dollar' },
  PKR: { symbol: 'Rs.', rate: 2.3, name: 'Pakistani Rupee' },
  GBP: { symbol: '£', rate: 0.0065, name: 'British Pound' },
  EUR: { symbol: '€', rate: 0.0076, name: 'Euro' },
  AED: { symbol: 'AED', rate: 0.030, name: 'UAE Dirham' },
  SAR: { symbol: 'SAR', rate: 0.031, name: 'Saudi Riyal' }
};

export const CATEGORIES = [
  { id: 'all', name: 'All Collections' },
  { id: 'unstitched-lawn', name: 'Unstitched Luxury Lawn' },
  { id: 'luxury-pret', name: 'Ready To Wear Pret' },
  { id: 'velvet-series', name: 'Winter Velvet Series' },
  { id: 'festive-couture', name: 'Festive & Bridal Couture' },
  { id: 'silk-chiffon', name: 'Silk & Organza Edition' }
];

export const PRODUCTS = [
  {
    id: 'ld-001',
    sku: 'WIN-25-01',
    title: 'Aria - Emerald Velvet Ensemble',
    collection: 'Winter Velvet Series',
    category: 'velvet-series',
    pricePKR: 8500,
    originalPricePKR: 9800,
    badge: 'Bestseller',
    rating: 4.9,
    reviewsCount: 38,
    image: '/assets/products/hero_banner_winter_1790107081859.png',
    hoverImage: '/assets/products/luxury_pret_plum_1790107251980.png',
    description: 'Exquisite deep emerald green micro-velvet shirt embellished with intricate gold zari tilla embroidery, paired with a matching embroidered velvet dupatta and silk trousers.',
    fabric: 'Micro Velvet 9000 shirt & dupatta, Raw Silk trousers',
    pieces: '3 Piece Full Suit',
    sizes: ['Unstitched', 'XS', 'S', 'M', 'L', 'XL', 'Custom Stitching'],
    colors: [
      { name: 'Emerald Green', hex: '#123829' },
      { name: 'Plum Royal', hex: '#4a154b' }
    ],
    inStock: true
  },
  {
    id: 'ld-002',
    sku: 'PRET-V4-02',
    title: 'Noor - Blush Embroidered Lawn',
    collection: 'Ready To Wear Pret',
    category: 'luxury-pret',
    pricePKR: 4800,
    originalPricePKR: 5500,
    badge: 'New Arrival',
    rating: 4.8,
    reviewsCount: 24,
    image: '/assets/products/coco_prints_vol4_1790107095197.png',
    hoverImage: '/assets/products/hero_banner_winter_1790107081859.png',
    description: 'Soft blush pink digital floral lawn shirt featuring organza hand-embroidery around neckline and border, coupled with printed chiffon dupatta and tailored cambric pants.',
    fabric: '100% Superfine Printed Lawn, Organza Lace, Printed Chiffon',
    pieces: '3 Piece Suit',
    sizes: ['Unstitched', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blush Pink', hex: '#f4c2c2' },
      { name: 'Sage Green', hex: '#b2ac88' }
    ],
    inStock: true
  },
  {
    id: 'ld-003',
    sku: 'LAWN-03',
    title: 'Mahparah - Crimson Zari Lawn',
    collection: 'Unstitched Luxury Lawn',
    category: 'unstitched-lawn',
    pricePKR: 6200,
    originalPricePKR: 7200,
    badge: 'Trending',
    rating: 5.0,
    reviewsCount: 42,
    image: '/assets/products/ethnic_embroidered_lawn_1790107214388.png',
    hoverImage: '/assets/products/wedding_couture_1790107234257.png',
    description: 'Royal maroon heavy embroidered unstitched lawn shirt crafted with metallic golden tilla work, featuring an embroidered net dupatta and cotton trousers.',
    fabric: 'Luxury Embroidered Lawn, Net Dupatta, Dyed Cotton Trousers',
    pieces: '3 Piece Unstitched',
    sizes: ['Unstitched', 'XS', 'S', 'M', 'L', 'XL', 'Custom Stitching'],
    colors: [
      { name: 'Royal Maroon', hex: '#722f37' },
      { name: 'Midnight Black', hex: '#141715' }
    ],
    inStock: true
  },
  {
    id: 'ld-004',
    sku: 'WED-COU-04',
    title: 'Shehnai - Royal Gold Bridal Lehenga',
    collection: 'Festive & Bridal Couture',
    category: 'festive-couture',
    pricePKR: 45000,
    originalPricePKR: 52000,
    badge: 'High Couture',
    rating: 5.0,
    reviewsCount: 19,
    image: '/assets/products/wedding_couture_1790107234257.png',
    hoverImage: '/assets/products/hero_banner_winter_1790107081859.png',
    description: 'Handcrafted champagne gold bridal gown encrusted with dabka, nakshi, cut-dana, and Swarovski crystals. Custom tailored by master artisans.',
    fabric: 'Pure Net & Tissue organza with handwork embroidery',
    pieces: '3 Piece Couture Ensemble',
    sizes: ['Custom Stitching'],
    colors: [
      { name: 'Champagne Gold', hex: '#e5bf67' },
      { name: 'Rose Gold', hex: '#b76e79' }
    ],
    inStock: true
  },
  {
    id: 'ld-005',
    sku: 'SILK-PRET-05',
    title: 'Gulbagh - Plum Raw Silk Pret Tunic',
    collection: 'Silk & Organza Edition',
    category: 'silk-chiffon',
    pricePKR: 6900,
    originalPricePKR: 7900,
    badge: 'Limited Edition',
    rating: 4.7,
    reviewsCount: 15,
    image: '/assets/products/luxury_pret_plum_1790107251980.png',
    hoverImage: '/assets/products/coco_prints_vol4_1790107095197.png',
    description: 'Regal plum raw silk straight tunic accented with antique gold tilla threadwork around neck and sleeves, matched with detailed cigarette pants.',
    fabric: 'Raw Silk shirt & straight pants',
    pieces: '2 Piece Pret Suit',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Royal Plum', hex: '#4a154b' }
    ],
    inStock: true
  },
  {
    id: 'ld-006',
    sku: 'LAWN-06',
    title: 'Zainab - Forest Botanical Lawn',
    collection: 'Unstitched Luxury Lawn',
    category: 'unstitched-lawn',
    pricePKR: 4500,
    originalPricePKR: 5200,
    badge: 'New Arrival',
    rating: 4.9,
    reviewsCount: 29,
    image: '/assets/products/hero_banner_winter_1790107081859.png',
    hoverImage: '/assets/products/ethnic_embroidered_lawn_1790107214388.png',
    description: 'Deep forest green digitally printed lawn shirt with embroidered organza border, styled with printed silk dupatta.',
    fabric: 'Superfine Printed Lawn & Silk Dupatta',
    pieces: '3 Piece Unstitched',
    sizes: ['Unstitched', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Forest Green', hex: '#123829' }
    ],
    inStock: true
  }
];