export const CURRENCY_RATES = {
  PKR: { symbol: 'Rs.', rate: 1, name: 'Pakistani Rupee' },
  USD: { symbol: '$', rate: 0.0036, name: 'US Dollar' },
  GBP: { symbol: '£', rate: 0.0028, name: 'British Pound' },
  EUR: { symbol: '€', rate: 0.0033, name: 'Euro' },
  AED: { symbol: 'AED', rate: 0.013, name: 'UAE Dirham' },
  SAR: { symbol: 'SAR', rate: 0.0135, name: 'Saudi Riyal' }
};

export const CATEGORIES = [
  { id: 'all', name: 'All Collections' },
  { id: 'coco-prints', name: 'COCO Prints Vol 4' },
  { id: 'ethnic-lawn', name: 'ETHNC Embroidered Lawn' },
  { id: 'winter-2025', name: 'Winter Vol 1 2025' },
  { id: 'bridal-couture', name: 'Bridal & Formals' },
  { id: 'velvet-series', name: 'Velvet Pret Series' }
];

export const PRODUCTS = [
  {
    id: 'ld-001',
    sku: 'WIN-25-01',
    title: 'Emerald Enchantment Velvet Suit',
    collection: 'Winter Vol 1 2025',
    category: 'winter-2025',
    pricePKR: 24500,
    originalPricePKR: 29500,
    badge: 'Bestseller',
    rating: 4.9,
    reviewsCount: 38,
    image: '/assets/products/hero_banner_winter_1790107081859.png',
    hoverImage: '/assets/products/luxury_pret_plum_1790107251980.png',
    description: 'Exquisite deep emerald green velvet shirt adorned with intricate gold zari tilla work, paired with a embellished velvet dupatta and tailored trousers.',
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
    sku: 'COCO-V4-02',
    title: 'Blush Floral Elegance - COCO Vol 4',
    collection: 'COCO Prints Vol 4',
    category: 'coco-prints',
    pricePKR: 11500,
    originalPricePKR: 14000,
    badge: 'New Arrival',
    rating: 4.8,
    reviewsCount: 24,
    image: '/assets/products/coco_prints_vol4_1790107095197.png',
    hoverImage: '/assets/products/hero_banner_winter_1790107081859.png',
    description: 'Soft pastel pink & sage printed premium lawn shirt with organza embroidered neckline, coupled with printed chiffon dupatta and solid cambric trouser.',
    fabric: '100% Superfine Printed Lawn, Organza Lace, Printed Chiffon',
    pieces: '3 Piece Unstitched',
    sizes: ['Unstitched', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blush Pink', hex: '#f4c2c2' },
      { name: 'Sage Green', hex: '#b2ac88' }
    ],
    inStock: true
  },
  {
    id: 'ld-003',
    sku: 'ETH-LAWN-03',
    title: 'Maroon Zari Heritage Embroidered Suit',
    collection: 'ETHNC Embroidered Lawn',
    category: 'ethnic-lawn',
    pricePKR: 16800,
    originalPricePKR: 19500,
    badge: 'Trending',
    rating: 5.0,
    reviewsCount: 42,
    image: '/assets/products/ethnic_embroidered_lawn_1790107214388.png',
    hoverImage: '/assets/products/wedding_couture_1790107234257.png',
    description: 'Royal maroon heavy embroidered lawn shirt with golden metallic tilla and sequin detailing, featuring a embroidered net dupatta.',
    fabric: 'Luxury Embroidered Lawn, Net Dupatta, Dyed Cotton Trousers',
    pieces: '3 Piece Suit',
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
    title: 'Champagne Gold Royal Bridal Lehenga',
    collection: 'Bridal & Formals',
    category: 'bridal-couture',
    pricePKR: 145000,
    originalPricePKR: 175000,
    badge: 'High Couture',
    rating: 5.0,
    reviewsCount: 19,
    image: '/assets/products/wedding_couture_1790107234257.png',
    hoverImage: '/assets/products/hero_banner_winter_1790107081859.png',
    description: 'Handcrafted champagne gold bridal gown encrusted with dabka, nakshi, cut-dana, and Swarovski crystals. Designed for timeless bridal grandeur.',
    fabric: 'Pure Net & Tissue Tissue organza with handwork embroidery',
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
    sku: 'VEL-PRET-05',
    title: 'Plum Silk Pret Tunic & Embellished Pants',
    collection: 'Velvet Pret Series',
    category: 'velvet-series',
    pricePKR: 18900,
    originalPricePKR: 22000,
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
    sku: 'COCO-V4-06',
    title: 'Emerald Botanical Lawn - COCO Vol 4',
    collection: 'COCO Prints Vol 4',
    category: 'coco-prints',
    pricePKR: 10800,
    originalPricePKR: 12900,
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