import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Package,
  Tag,
  ShoppingBag,
  DollarSign,
  RefreshCw,
  Search,
  MessageCircle,
  Lock,
  ArrowRight,
  TrendingUp,
  Percent,
  BarChart3,
  PieChart,
  Users,
  Eye,
  Check,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  Printer,
  Upload
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const AdminDashboard = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    productsList,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    storewideDiscountPercent,
    applyStorewideDiscount,
    getProductPrices,
    coupons,
    addCoupon,
    toggleCouponStatus,
    deleteCoupon,
    ordersList,
    updateOrderStatus,
    formatPrice
  } = useStore();

  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'products' | 'orders' | 'coupons'
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default accessible for ease
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Search and filter for admin tables
  const [adminSearch, setAdminSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Product Add / Edit Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Order Details Modal state
  const [selectedOrderReceipt, setSelectedOrderReceipt] = useState(null);

  // Form State for Add / Edit Product Modal with bi-directional discount calculation & multi-image gallery
  const [formData, setFormData] = useState({
    title: '',
    collection: 'Unstitched Luxury Lawn',
    category: 'unstitched-lawn',
    priceBDT: '',
    originalPriceBDT: '',
    discountPercent: 0,
    badge: 'New Arrival',
    fabric: 'Superfine Printed Lawn',
    pieces: '3 Piece Suit',
    image: '/assets/products/ethnic_embroidered_lawn_1790107214388.png',
    hoverImage: '/assets/products/hero_banner_winter_1790107081859.png',
    images: [
      '/assets/products/ethnic_embroidered_lawn_1790107214388.png',
      '/assets/products/hero_banner_winter_1790107081859.png'
    ],
    urlInput: '',
    description: '',
    inStock: true
  });

  // Quick Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponPercent, setNewCouponPercent] = useState('');
  const [newCouponDesc, setNewCouponDesc] = useState('');

  if (!isAdminOpen) return null;

  // Handle PIN Auth
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Open Add Product Modal
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    const defaultImgs = [
      '/assets/products/ethnic_embroidered_lawn_1790107214388.png',
      '/assets/products/hero_banner_winter_1790107081859.png'
    ];
    setFormData({
      title: '',
      collection: 'Unstitched Luxury Lawn',
      category: 'unstitched-lawn',
      priceBDT: '6500',
      originalPriceBDT: '7500',
      discountPercent: 13,
      badge: '-13% OFF',
      fabric: '100% Superfine Printed Lawn',
      pieces: '3 Piece Suit',
      image: defaultImgs[0],
      hoverImage: defaultImgs[1],
      images: defaultImgs,
      urlInput: '',
      description: 'Handcrafted premium ladies attire featuring intricate embroidery.',
      inStock: true
    });
    setIsProductModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    const orig = Number(product.originalPriceBDT || product.originalPricePKR || product.priceBDT || product.pricePKR || 0);
    const curr = Number(product.priceBDT || product.pricePKR || orig);
    const disc = orig > curr ? Math.round(((orig - curr) / orig) * 100) : 0;

    const prodImages = (product.images && product.images.length > 0)
      ? product.images
      : [product.image, product.hoverImage].filter(Boolean);

    setFormData({
      title: product.title || '',
      collection: product.collection || 'Unstitched Luxury Lawn',
      category: product.category || 'unstitched-lawn',
      priceBDT: curr.toString(),
      originalPriceBDT: orig.toString(),
      discountPercent: disc,
      badge: product.badge || (disc > 0 ? `-${disc}% OFF` : 'New Arrival'),
      fabric: product.fabric || '',
      pieces: product.pieces || '3 Piece Suit',
      image: prodImages[0] || product.image || '',
      hoverImage: prodImages[1] || product.hoverImage || prodImages[0] || '',
      images: prodImages.length > 0 ? prodImages : ['/assets/products/ethnic_embroidered_lawn_1790107214388.png'],
      urlInput: '',
      description: product.description || '',
      inStock: product.inStock !== false
    });
    setIsProductModalOpen(true);
  };

  // Bi-directional Discount Input Handlers for Product Form
  const handleRegularPriceChange = (val) => {
    const regPrice = Number(val) || 0;
    const disc = Number(formData.discountPercent) || 0;
    let newSellingPrice = formData.priceBDT;

    if (disc > 0 && regPrice > 0) {
      newSellingPrice = Math.round(regPrice * (1 - disc / 100)).toString();
    }

    setFormData((prev) => ({
      ...prev,
      originalPriceBDT: val,
      priceBDT: newSellingPrice,
      badge: disc > 0 ? `-${disc}% OFF` : prev.badge
    }));
  };

  const handleDiscountPercentChange = (val) => {
    const disc = Math.max(0, Math.min(99, Number(val) || 0));
    const regPrice = Number(formData.originalPriceBDT) || Number(formData.priceBDT) || 0;
    const newSellingPrice = disc > 0 && regPrice > 0 ? Math.round(regPrice * (1 - disc / 100)).toString() : regPrice.toString();

    setFormData((prev) => ({
      ...prev,
      discountPercent: val,
      priceBDT: newSellingPrice,
      badge: disc > 0 ? `-${disc}% OFF` : prev.badge
    }));
  };

  const handleSellingPriceChange = (val) => {
    const sellingPrice = Number(val) || 0;
    const regPrice = Number(formData.originalPriceBDT) || sellingPrice;
    let disc = 0;

    if (regPrice > sellingPrice && regPrice > 0) {
      disc = Math.round(((regPrice - sellingPrice) / regPrice) * 100);
    }

    setFormData((prev) => ({
      ...prev,
      priceBDT: val,
      discountPercent: disc,
      badge: disc > 0 ? `-${disc}% OFF` : prev.badge
    }));
  };

  // Handle Multiple File Upload from Device Gallery / PC
  const handleMultipleImageFileUpload = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is over 10MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target.result;
        setFormData((prev) => {
          const currentList = prev.images || [];
          const updatedList = [...currentList, base64Data];
          return {
            ...prev,
            images: updatedList,
            image: updatedList[0] || prev.image,
            hoverImage: updatedList[1] || updatedList[0] || prev.hoverImage
          };
        });
      };
      reader.readAsDataURL(file);
    });
  };

  // Add Image via Direct Web Link
  const handleAddUrlImage = (e) => {
    if (e) e.preventDefault();
    if (!formData.urlInput || !formData.urlInput.trim()) return;
    const url = formData.urlInput.trim();
    setFormData((prev) => {
      const currentList = prev.images || [];
      const updatedList = [...currentList, url];
      return {
        ...prev,
        images: updatedList,
        image: updatedList[0] || prev.image,
        hoverImage: updatedList[1] || updatedList[0] || prev.hoverImage,
        urlInput: ''
      };
    });
  };

  // Remove single image from product gallery
  const handleRemoveGalleryImage = (indexToRemove) => {
    setFormData((prev) => {
      const updatedList = prev.images.filter((_, i) => i !== indexToRemove);
      return {
        ...prev,
        images: updatedList,
        image: updatedList[0] || '',
        hoverImage: updatedList[1] || updatedList[0] || ''
      };
    });
  };

  // Set selected gallery image as Main Featured photo (index 0)
  const handleSetMainGalleryImage = (indexToMain) => {
    setFormData((prev) => {
      if (indexToMain === 0) return prev;
      const target = prev.images[indexToMain];
      const rest = prev.images.filter((_, i) => i !== indexToMain);
      const updatedList = [target, ...rest];
      return {
        ...prev,
        images: updatedList,
        image: updatedList[0],
        hoverImage: updatedList[1] || updatedList[0]
      };
    });
  };

  // Save Product (Add or Update)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.priceBDT) {
      alert('Please fill in product title and price.');
      return;
    }

    const finalImages = (formData.images && formData.images.length > 0)
      ? formData.images
      : [formData.image, formData.hoverImage].filter(Boolean);

    const payload = {
      ...formData,
      images: finalImages,
      image: finalImages[0] || formData.image,
      hoverImage: finalImages[1] || finalImages[0] || formData.hoverImage,
      priceBDT: Number(formData.priceBDT),
      originalPriceBDT: Number(formData.originalPriceBDT || formData.priceBDT)
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }
    setIsProductModalOpen(false);
  };

  // Handle Add Coupon
  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCouponCode || !newCouponPercent) return;
    addCoupon(newCouponCode, newCouponPercent, newCouponDesc);
    setNewCouponCode('');
    setNewCouponPercent('');
    setNewCouponDesc('');
  };

  // Analytics Metrics
  const totalRevenue = ordersList.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const completedOrders = ordersList.filter((o) => o.status === 'Completed');
  const pendingOrders = ordersList.filter((o) => o.status === 'Pending' || o.status === 'Processing');
  const avgOrderValue = ordersList.length > 0 ? Math.round(totalRevenue / ordersList.length) : 0;
  const totalItemsSold = ordersList.reduce((sum, o) => sum + (o.items?.reduce((isum, item) => isum + item.quantity, 0) || 0), 0);

  // Sales by Category Analytics
  const salesByCategory = CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
    const matchingProducts = productsList.filter((p) => p.category === cat.id);
    const count = matchingProducts.length;
    return {
      category: cat.name,
      productCount: count,
      percent: Math.round((count / (productsList.length || 1)) * 100)
    };
  });

  // Filtered Products for Admin Table
  const filteredProducts = productsList.filter(
    (p) =>
      p.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.collection.toLowerCase().includes(adminSearch.toLowerCase())
  );

  // Filtered Orders for Admin Table
  const filteredOrders = ordersList.filter((o) => {
    const matchesStatus = orderStatusFilter === 'all' || o.status.toLowerCase() === orderStatusFilter.toLowerCase();
    const matchesSearch =
      !adminSearch ||
      o.id.toLowerCase().includes(adminSearch.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(adminSearch.toLowerCase()) ||
      o.phone?.includes(adminSearch);
    return matchesStatus && matchesSearch;
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          maxWidth: '1200px',
          maxHeight: '94vh',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1.5px solid var(--color-border-gold)'
        }}
      >
        {/* Top Executive Header Bar */}
        <div
          style={{
            background: 'linear-gradient(135deg, #091a13 0%, #123829 100%)',
            color: '#ffffff',
            padding: '1.25rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid var(--color-gold)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                background: 'var(--color-gold)',
                color: 'var(--color-primary-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1.2rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              RM
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    color: '#ffffff',
                    lineHeight: '1.1',
                    letterSpacing: '0.03em'
                  }}
                >
                  ROMONI MART — SUPER ADMIN DASHBOARD
                </h2>
                <span
                  style={{
                    background: 'var(--color-gold)',
                    color: 'var(--color-primary-dark)',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    textTransform: 'uppercase'
                  }}
                >
                  LIVE ATELIER
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-gold)', marginTop: '0.15rem' }}>
                Sales Intelligence • Catalog Pricing & Discount Editor • Customer Order Manager
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Security PIN Screen (If not authenticated) */}
        {!isAuthenticated ? (
          <div style={{ padding: '4rem 1.5rem', textAlign: 'center', maxWidth: '420px', margin: '0 auto' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-gold-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: 'var(--color-primary-dark)' }}>
              <Lock size={32} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-primary-dark)' }}>Admin Manager Authentication</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '0.5rem 0 1.5rem' }}>
              Enter your secret security PIN to open executive sales reports and pricing controls.
            </p>

            <form onSubmit={handlePinSubmit}>
              <input
                type="password"
                placeholder="Enter PIN (Default: 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: pinError ? '2px solid #e11d48' : '1px solid var(--color-border)',
                  marginBottom: '1rem',
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  fontWeight: 700
                }}
              />
              {pinError && <p style={{ color: '#e11d48', fontSize: '0.8rem', marginBottom: '1rem' }}>Invalid passcode. Try "1234" or "admin"</p>}
              <button className="btn-primary" type="submit" style={{ width: '100%', height: '48px' }}>
                <span>UNLOCK SUPER DASHBOARD</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Top Navigation Tabs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 1.5rem',
                borderBottom: '1px solid var(--color-border)',
                background: '#ffffff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[
                  { id: 'analytics', label: 'Sell Info & Analytics', icon: BarChart3 },
                  { id: 'products', label: 'Products & Price/Discount Editor', icon: Package },
                  { id: 'orders', label: `Customer Orders (${ordersList.length})`, icon: ShoppingBag },
                  { id: 'coupons', label: 'Promo Coupons', icon: Percent }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        padding: '1rem 1.25rem',
                        border: 'none',
                        borderBottom: isActive ? '3.5px solid var(--color-gold-dark)' : '3.5px solid transparent',
                        background: 'none',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.55rem',
                        fontSize: '0.9rem',
                        transition: 'all 0.15s'
                      }}
                    >
                      <Icon size={18} style={{ color: isActive ? 'var(--color-gold-dark)' : 'inherit' }} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {activeTab === 'products' && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={resetProductsToDefault}
                    title="Reset to default demo suits"
                    style={{
                      padding: '0.45rem 0.85rem',
                      fontSize: '0.78rem',
                      background: '#f1f5f9',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontWeight: 600
                    }}
                  >
                    <RefreshCw size={13} />
                    <span>Reset Catalog</span>
                  </button>

                  <button
                    className="btn-primary"
                    onClick={handleOpenAddModal}
                    style={{ padding: '0.45rem 1.1rem', fontSize: '0.82rem', gap: '0.4rem' }}
                  >
                    <Plus size={16} />
                    <span>ADD NEW PRODUCT</span>
                  </button>
                </div>
              )}
            </div>

            {/* TAB CONTENT BODY */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', background: '#f8fafc' }}>
              {/* TAB 1: SELL INFO & ANALYTICS */}
              {activeTab === 'analytics' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Executive Metric Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                    <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Revenue</span>
                        <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: '#ecfdf5', color: '#047857' }}>
                          <DollarSign size={20} />
                        </div>
                      </div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>{formatPrice(totalRevenue)}</div>
                      <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.4rem' }}>
                        <TrendingUp size={14} /> Gross store sales performance
                      </span>
                    </div>

                    <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Orders</span>
                        <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: '#eff6ff', color: '#1d4ed8' }}>
                          <ShoppingBag size={20} />
                        </div>
                      </div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>{ordersList.length} Orders</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', display: 'block' }}>
                        {pendingOrders.length} Pending / {completedOrders.length} Completed
                      </span>
                    </div>

                    <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Avg Order Value</span>
                        <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: '#fef3c7', color: '#b45309' }}>
                          <BarChart3 size={20} />
                        </div>
                      </div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>{formatPrice(avgOrderValue)}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', display: 'block' }}>
                        {totalItemsSold} total product suits sold
                      </span>
                    </div>

                    <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Active Catalog</span>
                        <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: '#faf5ff', color: '#7e22ce' }}>
                          <Package size={20} />
                        </div>
                      </div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>{productsList.length} Items</div>
                      <span style={{ fontSize: '0.75rem', color: storewideDiscountPercent > 0 ? '#059669' : 'var(--color-text-muted)', fontWeight: 600, marginTop: '0.4rem', display: 'block' }}>
                        {storewideDiscountPercent > 0 ? `🔥 ${storewideDiscountPercent}% Storewide Sale` : 'Standard Pricing Active'}
                      </span>
                    </div>
                  </div>

                  {/* Charts & Breakdown Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
                    {/* Catalog Breakdown by Collection */}
                    <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-primary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <PieChart size={18} style={{ color: 'var(--color-gold-dark)' }} />
                        <span>Collection Catalog Share</span>
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        {salesByCategory.map((c, i) => (
                          <div key={i}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                              <span>{c.category}</span>
                              <span>{c.productCount} items ({c.percent}%)</span>
                            </div>
                            <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${c.percent}%`, background: 'var(--color-primary-dark)', borderRadius: '4px' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Fulfillment Status */}
                    <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-primary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={18} style={{ color: 'var(--color-gold-dark)' }} />
                        <span>Order Fulfillment Pipeline</span>
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {[
                          { status: 'Completed', count: ordersList.filter(o => o.status === 'Completed').length, color: '#10b981', bg: '#ecfdf5' },
                          { status: 'Processing', count: ordersList.filter(o => o.status === 'Processing').length, color: '#3b82f6', bg: '#eff6ff' },
                          { status: 'Pending', count: ordersList.filter(o => o.status === 'Pending').length, color: '#f59e0b', bg: '#fffbeb' },
                          { status: 'Cancelled', count: ordersList.filter(o => o.status === 'Cancelled').length, color: '#ef4444', bg: '#fef2f2' }
                        ].map((st, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: st.bg, borderRadius: 'var(--radius-sm)', border: `1px solid ${st.color}30` }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: st.color }}>{st.status} Orders</span>
                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>{st.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Customer Orders Quick Feed */}
                  <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-primary-dark)' }}>
                        Recent Customer Orders
                      </h3>
                      <button
                        onClick={() => setActiveTab('orders')}
                        style={{ background: 'none', border: 'none', color: 'var(--color-gold-dark)', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        <span>View All Orders</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead>
                          <tr style={{ background: 'var(--color-primary-dark)', color: '#ffffff', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Order ID</th>
                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Customer</th>
                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Payment Method</th>
                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Total</th>
                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ordersList.slice(0, 5).map((ord) => (
                            <tr key={ord.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                              <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>{ord.id}</td>
                              <td style={{ padding: '0.75rem 1rem' }}>
                                <div style={{ fontWeight: 600 }}>{ord.customerName}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{ord.phone}</div>
                              </td>
                              <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#047857' }}>{ord.paymentMethod}</td>
                              <td style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>{formatPrice(ord.totalAmount)}</td>
                              <td style={{ padding: '0.75rem 1rem' }}>
                                <span style={{ padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 700, background: ord.status === 'Completed' ? '#dcfce7' : ord.status === 'Processing' ? '#dbeafe' : '#fef3c7', color: ord.status === 'Completed' ? '#15803d' : ord.status === 'Processing' ? '#1e40af' : '#b45309' }}>
                                  {ord.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUCTS & PRICE / DISCOUNT EDITOR */}
              {activeTab === 'products' && (
                <div>
                  {/* Global Storewide Discount Control Banner */}
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                      color: '#ffffff',
                      padding: '1.25rem 1.5rem',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '1.25rem',
                      boxShadow: 'var(--shadow-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      border: '1px solid var(--color-gold)'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-gold)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        <Percent size={16} />
                        <span>GLOBAL STOREWIDE DISCOUNT CONTROL (% OFF ALL SUITS)</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
                        Enter a percentage below to instantly apply a sale discount across <strong>EVERY single product</strong> on your website!
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.1)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.25)' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-gold)', marginRight: '0.3rem' }}>%</span>
                        <input
                          type="number"
                          min="0"
                          max="90"
                          placeholder="e.g. 15"
                          value={storewideDiscountPercent || ''}
                          onChange={(e) => applyStorewideDiscount(e.target.value)}
                          style={{
                            width: '75px',
                            background: 'transparent',
                            border: 'none',
                            color: '#ffffff',
                            fontWeight: 800,
                            fontSize: '1.1rem',
                            outline: 'none',
                            textAlign: 'center'
                          }}
                        />
                        <span style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600 }}>OFF ALL</span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        {[0, 10, 15, 20, 25, 30].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => applyStorewideDiscount(p)}
                            style={{
                              padding: '0.35rem 0.65rem',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              borderRadius: 'var(--radius-sm)',
                              border: storewideDiscountPercent === p ? '1.5px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.2)',
                              background: storewideDiscountPercent === p ? 'var(--color-gold)' : 'rgba(255,255,255,0.08)',
                              color: storewideDiscountPercent === p ? 'var(--color-primary-dark)' : '#ffffff',
                              cursor: 'pointer'
                            }}
                          >
                            {p === 0 ? 'Clear' : `${p}%`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div
                    style={{
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      background: '#ffffff',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.5rem 1rem',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <Search size={18} style={{ color: 'var(--color-text-muted)', marginRight: '0.5rem' }} />
                    <input
                      type="text"
                      placeholder="Search product title, collection or category..."
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.88rem' }}
                    />
                  </div>

                  {/* Products Table */}
                  <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ background: 'var(--color-primary-dark)', color: '#ffffff', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          <th style={{ padding: '0.85rem 1rem' }}>Product Suit</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Collection</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Regular Price (BDT)</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Selling Price (Discount)</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Badge Label</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                          <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((p) => {
                          const prices = getProductPrices(p);
                          const currentP = p.priceBDT || p.pricePKR || 0;
                          const origP = p.originalPriceBDT || p.originalPricePKR || currentP;
                          const imgCount = (p.images && p.images.length > 0) ? p.images.length : (p.hoverImage ? 2 : 1);

                          return (
                            <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                              {/* Product Thumbnail & Title */}
                              <td style={{ padding: '0.85rem 1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                  <div style={{ position: 'relative' }}>
                                    <img
                                      src={p.image}
                                      alt={p.title}
                                      style={{ width: '44px', height: '54px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}
                                    />
                                    {imgCount > 1 && (
                                      <span style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: 'var(--color-gold-dark)', color: '#ffffff', fontSize: '0.6rem', fontWeight: 800, padding: '0.1rem 0.35rem', borderRadius: 'var(--radius-full)' }}>
                                        {imgCount}📷
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>{p.title}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>SKU: {p.sku} • {p.pieces}</div>
                                  </div>
                                </div>
                              </td>

                              {/* Collection */}
                              <td style={{ padding: '0.85rem 1rem', color: 'var(--color-text)' }}>
                                {p.collection}
                              </td>

                              {/* Regular Original Price BDT Input */}
                              <td style={{ padding: '0.85rem 1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                  <span style={{ color: 'var(--color-text-muted)' }}>৳</span>
                                  <input
                                    type="number"
                                    value={origP}
                                    onChange={(e) => updateProduct(p.id, { originalPriceBDT: e.target.value })}
                                    style={{
                                      width: '85px',
                                      padding: '0.25rem 0.4rem',
                                      borderRadius: 'var(--radius-sm)',
                                      border: '1px solid var(--color-border)',
                                      color: 'var(--color-text-muted)'
                                    }}
                                  />
                                </div>
                              </td>

                              {/* Selling Price BDT & Discount Badge */}
                              <td style={{ padding: '0.85rem 1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                  <span style={{ fontWeight: 700, color: 'var(--color-primary-dark)' }}>৳</span>
                                  <input
                                    type="number"
                                    value={currentP}
                                    onChange={(e) => updateProduct(p.id, { priceBDT: e.target.value })}
                                    style={{
                                      width: '85px',
                                      padding: '0.25rem 0.4rem',
                                      borderRadius: 'var(--radius-sm)',
                                      border: '1px solid var(--color-border)',
                                      fontWeight: 700,
                                      color: 'var(--color-primary-dark)'
                                    }}
                                  />
                                  {prices.hasDiscount && (
                                    <span style={{ background: '#e11d48', color: '#ffffff', fontSize: '0.65rem', fontWeight: 800, padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                                      -{prices.discountPercent}% OFF
                                    </span>
                                  )}
                                </div>
                              </td>

                              {/* Badge */}
                              <td style={{ padding: '0.85rem 1rem' }}>
                                <span style={{ background: '#fef3c7', color: '#b45309', fontSize: '0.72rem', fontWeight: 600, padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                                  {p.badge || 'Standard'}
                                </span>
                              </td>

                              {/* In Stock Toggle */}
                              <td style={{ padding: '0.85rem 1rem' }}>
                                <button
                                  onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                                  style={{
                                    border: 'none',
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    background: p.inStock !== false ? '#dcfce7' : '#fee2e2',
                                    color: p.inStock !== false ? '#15803d' : '#b91c1c'
                                  }}
                                >
                                  {p.inStock !== false ? 'In Stock' : 'Out of Stock'}
                                </button>
                              </td>

                              {/* Actions */}
                              <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem' }}>
                                  <button
                                    onClick={() => handleOpenEditModal(p)}
                                    title="Edit Full Details & Photos"
                                    style={{
                                      padding: '0.4rem 0.75rem',
                                      background: 'var(--color-gold-muted)',
                                      border: '1px solid var(--color-border-gold)',
                                      borderRadius: 'var(--radius-sm)',
                                      cursor: 'pointer',
                                      fontSize: '0.75rem',
                                      fontWeight: 700,
                                      color: 'var(--color-primary-dark)',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '0.3rem'
                                    }}
                                  >
                                    <Edit3 size={14} />
                                    <span>Edit Details</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      if (confirm(`Delete "${p.title}"?`)) {
                                        deleteProduct(p.id);
                                      }
                                    }}
                                    title="Delete Product"
                                    style={{
                                      padding: '0.4rem 0.6rem',
                                      background: '#fee2e2',
                                      border: '1px solid #fca5a5',
                                      borderRadius: 'var(--radius-sm)',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    <Trash2 size={14} color="#b91c1c" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: CUSTOMER ORDERS MANAGEMENT */}
              {activeTab === 'orders' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Status Filter Chips & Search */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {['all', 'Pending', 'Processing', 'Completed', 'Cancelled'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setOrderStatusFilter(st)}
                          style={{
                            padding: '0.4rem 0.85rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            border: orderStatusFilter === st ? '1.5px solid var(--color-gold-dark)' : '1px solid var(--color-border)',
                            background: orderStatusFilter === st ? 'var(--color-primary-dark)' : '#ffffff',
                            color: orderStatusFilter === st ? '#ffffff' : 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            textTransform: 'capitalize'
                          }}
                        >
                          {st === 'all' ? `All Orders (${ordersList.length})` : `${st} (${ordersList.filter(o => o.status === st).length})`}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', width: '280px' }}>
                      <Search size={16} style={{ color: 'var(--color-text-muted)', marginRight: '0.4rem' }} />
                      <input
                        type="text"
                        placeholder="Search order ID, name, phone..."
                        value={adminSearch}
                        onChange={(e) => setAdminSearch(e.target.value)}
                        style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.8rem', width: '100%' }}
                      />
                    </div>
                  </div>

                  {/* Orders Table */}
                  <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ background: 'var(--color-primary-dark)', color: '#ffffff', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          <th style={{ padding: '0.85rem 1rem' }}>Order Details</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Customer Contact</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Suits Ordered</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Payment</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Total Amount</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Status Control</th>
                          <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Invoice</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.length === 0 ? (
                          <tr>
                            <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                              <ShoppingBag size={36} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                              <p>No customer orders match the current filter.</p>
                            </td>
                          </tr>
                        ) : (
                          filteredOrders.map((ord) => (
                            <tr key={ord.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                              <td style={{ padding: '0.85rem 1rem' }}>
                                <div style={{ fontWeight: 800, color: 'var(--color-primary-dark)' }}>{ord.id}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{ord.date}</div>
                              </td>
                              <td style={{ padding: '0.85rem 1rem' }}>
                                <div style={{ fontWeight: 700 }}>{ord.customerName}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{ord.phone}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{ord.address}, {ord.city}</div>
                              </td>
                              <td style={{ padding: '0.85rem 1rem' }}>
                                <div style={{ fontSize: '0.78rem' }}>
                                  {ord.items?.map((it, idx) => (
                                    <div key={idx} style={{ marginBottom: '0.15rem' }}>
                                      • <strong>{it.title}</strong> x{it.quantity} <span style={{ color: 'var(--color-text-muted)' }}>({it.size})</span>
                                    </div>
                                  ))}
                                </div>
                              </td>
                              <td style={{ padding: '0.85rem 1rem' }}>
                                <span style={{ padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-sm)', background: '#ecfdf5', color: '#047857', fontWeight: 700, fontSize: '0.75rem', display: 'inline-block' }}>
                                  {ord.paymentMethod}
                                </span>
                              </td>
                              <td style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-primary-dark)' }}>
                                {formatPrice(ord.totalAmount)}
                              </td>
                              <td style={{ padding: '0.85rem 1rem' }}>
                                <select
                                  value={ord.status}
                                  onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                                  style={{
                                    padding: '0.35rem 0.6rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    background: ord.status === 'Completed' ? '#dcfce7' : ord.status === 'Processing' ? '#dbeafe' : ord.status === 'Cancelled' ? '#fee2e2' : '#fef3c7',
                                    color: ord.status === 'Completed' ? '#15803d' : ord.status === 'Processing' ? '#1e40af' : ord.status === 'Cancelled' ? '#b91c1c' : '#b45309',
                                    cursor: 'pointer'
                                  }}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Processing">Processing</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                                <button
                                  onClick={() => setSelectedOrderReceipt(ord)}
                                  style={{
                                    padding: '0.35rem 0.7rem',
                                    background: '#ffffff',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: 'var(--radius-sm)',
                                    cursor: 'pointer',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.3rem'
                                  }}
                                >
                                  <Eye size={13} />
                                  <span>Receipt</span>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: PROMO COUPONS MANAGEMENT */}
              {activeTab === 'coupons' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Create New Coupon Bar */}
                  <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
                      Create New Discount Promo Voucher
                    </h3>
                    <form onSubmit={handleCreateCoupon} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem', textTransform: 'uppercase' }}>Coupon Code *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. EID2026"
                          value={newCouponCode}
                          onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontWeight: 700 }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem', textTransform: 'uppercase' }}>Discount Percentage (% OFF) *</label>
                        <input
                          type="number"
                          required
                          min="1"
                          max="90"
                          placeholder="e.g. 15"
                          value={newCouponPercent}
                          onChange={(e) => setNewCouponPercent(e.target.value)}
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem', textTransform: 'uppercase' }}>Description Note</label>
                        <input
                          type="text"
                          placeholder="e.g. Festive Special Offer"
                          value={newCouponDesc}
                          onChange={(e) => setNewCouponDesc(e.target.value)}
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                        />
                      </div>

                      <button className="btn-primary" type="submit" style={{ height: '42px', gap: '0.4rem' }}>
                        <Plus size={16} />
                        <span>CREATE COUPON</span>
                      </button>
                    </form>
                  </div>

                  {/* Active Coupons Table */}
                  <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ background: 'var(--color-primary-dark)', color: '#ffffff', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                          <th style={{ padding: '0.85rem 1rem' }}>Voucher Code</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Discount Percentage</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Description</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                          <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coupons.map((c) => (
                          <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: 'var(--color-gold-dark)', fontSize: '1rem', letterSpacing: '0.05em' }}>
                              {c.code}
                            </td>
                            <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#047857' }}>
                              {c.discountPercent}% OFF
                            </td>
                            <td style={{ padding: '0.85rem 1rem', color: 'var(--color-text-secondary)' }}>
                              {c.description || 'General store promotion'}
                            </td>
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <button
                                onClick={() => toggleCouponStatus(c.id)}
                                style={{
                                  border: 'none',
                                  padding: '0.25rem 0.6rem',
                                  borderRadius: 'var(--radius-full)',
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  background: c.active ? '#dcfce7' : '#f1f5f9',
                                  color: c.active ? '#15803d' : '#64748b'
                                }}
                              >
                                {c.active ? 'Active' : 'Disabled'}
                              </button>
                            </td>
                            <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                              <button
                                onClick={() => deleteCoupon(c.id)}
                                style={{ padding: '0.35rem 0.5rem', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                              >
                                <Trash2 size={14} color="#b91c1c" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isProductModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-md)',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-xl)',
              border: '1.5px solid var(--color-border-gold)'
            }}
          >
            <div style={{ background: 'var(--color-primary-dark)', color: '#ffffff', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>
                {editingProduct ? `Edit Product: ${editingProduct.title}` : 'Add New Luxury Outfit'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem' }}>
              {/* Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Outfit Title / Model Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Royal Emerald Embroidered Lawn"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Collection</label>
                    <select
                      value={formData.collection}
                      onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                    >
                      <option value="Unstitched Luxury Lawn">Unstitched Luxury Lawn</option>
                      <option value="Ready To Wear Pret">Ready To Wear Pret</option>
                      <option value="Winter Velvet Series">Winter Velvet Series</option>
                      <option value="Festive & Bridal Couture">Festive & Bridal Couture</option>
                      <option value="Silk & Organza Edition">Silk & Organza Edition</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Category Filter</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                    >
                      <option value="unstitched-lawn">Unstitched Lawn</option>
                      <option value="luxury-pret">Luxury Pret</option>
                      <option value="velvet-series">Velvet Series</option>
                      <option value="festive-couture">Festive Couture</option>
                      <option value="silk-chiffon">Silk & Organza</option>
                    </select>
                  </div>
                </div>

                {/* PRICING & DISCOUNT CALCULATOR BOX */}
                <div style={{ background: '#fdfbf7', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-gold)' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
                    💰 PRICING & DISCOUNT CALCULATOR (BDT ৳)
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>Regular Price (৳)</label>
                      <input
                        type="number"
                        placeholder="7500"
                        value={formData.originalPriceBDT}
                        onChange={(e) => handleRegularPriceChange(e.target.value)}
                        style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontWeight: 600 }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: '#d97706', fontWeight: 700, marginBottom: '0.2rem' }}>Discount (% OFF)</label>
                      <input
                        type="number"
                        min="0"
                        max="99"
                        placeholder="15"
                        value={formData.discountPercent}
                        onChange={(e) => handleDiscountPercentChange(e.target.value)}
                        style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid #f59e0b', background: '#fffbeb', fontWeight: 800, color: '#b45309' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: '#047857', fontWeight: 700, marginBottom: '0.2rem' }}>Final Selling Price (৳) *</label>
                      <input
                        type="number"
                        required
                        placeholder="6375"
                        value={formData.priceBDT}
                        onChange={(e) => handleSellingPriceChange(e.target.value)}
                        style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid #10b981', background: '#ecfdf5', fontWeight: 800, color: '#047857' }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Badge Ribbon Label</label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g. -15% OFF, Bestseller, New Arrival"
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="checkbox"
                        id="inStockCheck"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      />
                      <label htmlFor="inStockCheck" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary-dark)', cursor: 'pointer' }}>
                        In Stock & Ready for Dispatch
                      </label>
                    </div>
                  </div>
                </div>

                {/* Fabric & Pieces */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Fabric Details</label>
                    <input
                      type="text"
                      value={formData.fabric}
                      onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                      placeholder="Superfine Lawn / Micro Velvet 9000"
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Suit Type / Pieces</label>
                    <input
                      type="text"
                      value={formData.pieces}
                      onChange={(e) => setFormData({ ...formData, pieces: e.target.value })}
                      placeholder="3 Piece Unstitched / Pret"
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                    />
                  </div>
                </div>

                {/* Multi-Photo Product Gallery Manager */}
                <div style={{ marginBottom: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border-gold)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-primary-dark)', textTransform: 'uppercase' }}>
                      📷 Product Photo Gallery ({formData.images?.length || 0} Photos)
                    </label>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>
                      #1 Main Photo • #2 Hover Photo
                    </span>
                  </div>

                  {/* Upload & Add Link Bar */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <label
                      style={{
                        padding: '0.55rem 0.95rem',
                        background: 'var(--color-primary-dark)',
                        color: 'var(--color-gold)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        border: '1px solid var(--color-border-gold)',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <Upload size={15} />
                      <span>UPLOAD MULTIPLE PHOTOS (PHONE / PC)</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleMultipleImageFileUpload}
                        style={{ display: 'none' }}
                      />
                    </label>

                    <div style={{ display: 'flex', gap: '0.3rem', flex: 1, minWidth: '240px' }}>
                      <input
                        type="text"
                        value={formData.urlInput}
                        onChange={(e) => setFormData({ ...formData, urlInput: e.target.value })}
                        placeholder="Or paste web image URL (https://i.ibb.co/...)"
                        style={{ flex: 1, padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.8rem' }}
                      />
                      <button
                        type="button"
                        onClick={handleAddUrlImage}
                        style={{ padding: '0.55rem 0.85rem', background: 'var(--color-gold-muted)', border: '1px solid var(--color-border-gold)', color: 'var(--color-primary-dark)', fontWeight: 700, fontSize: '0.78rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                      >
                        + Add Link
                      </button>
                    </div>
                  </div>

                  {/* Gallery Thumbnails List */}
                  {formData.images && formData.images.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.65rem' }}>
                      {formData.images.map((imgUrl, index) => (
                        <div
                          key={index}
                          style={{
                            background: '#ffffff',
                            borderRadius: 'var(--radius-sm)',
                            border: index === 0 ? '2px solid var(--color-gold-dark)' : '1px solid var(--color-border)',
                            padding: '0.35rem',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.3rem',
                            boxShadow: 'var(--shadow-sm)'
                          }}
                        >
                          <div style={{ height: '110px', width: '100%', borderRadius: '4px', overflow: 'hidden', background: '#f1f5f9', position: 'relative' }}>
                            <img src={imgUrl} alt={`Photo ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <span
                              style={{
                                position: 'absolute',
                                top: '4px',
                                left: '4px',
                                background: index === 0 ? 'var(--color-gold-dark)' : index === 1 ? '#0284c7' : 'rgba(0,0,0,0.65)',
                                color: '#ffffff',
                                fontSize: '0.6rem',
                                fontWeight: 800,
                                padding: '0.15rem 0.4rem',
                                borderRadius: '3px'
                              }}
                            >
                              {index === 0 ? '★ MAIN' : index === 1 ? 'HOVER' : `#${index + 1}`}
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: '0.2rem', justifyContent: 'space-between' }}>
                            {index !== 0 && (
                              <button
                                type="button"
                                onClick={() => handleSetMainGalleryImage(index)}
                                title="Make this the Primary Main Photo"
                                style={{ fontSize: '0.65rem', padding: '0.2rem 0.35rem', background: '#fef3c7', border: '1px solid #fde047', color: '#b45309', borderRadius: '3px', cursor: 'pointer', fontWeight: 700, flex: 1 }}
                              >
                                Set Main
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(index)}
                              title="Remove Photo"
                              style={{ fontSize: '0.65rem', padding: '0.2rem 0.4rem', background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', borderRadius: '3px', cursor: 'pointer', fontWeight: 700 }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '1rem', background: '#ffffff', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                      No photos added yet. Select photos from your phone/PC or paste image URLs above.
                    </div>
                  )}
                </div>

                {/* Description */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Product Description</label>
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* LIVE PRODUCT CARD PREVIEW SIDEBAR */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary-dark)' }}>
                  Live Storefront Preview
                </span>
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#f8fafc' }}>
                    <img
                      src={formData.images && formData.images[0] ? formData.images[0] : formData.image}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/assets/products/ethnic_embroidered_lawn_1790107214388.png'; }}
                    />
                    {formData.badge && (
                      <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--color-gold-dark)', color: '#ffffff', fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase' }}>
                        {formData.badge}
                      </span>
                    )}
                    {formData.images && formData.images.length > 1 && (
                      <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(9, 26, 19, 0.75)', color: 'var(--color-gold)', fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-full)' }}>
                        📷 {formData.images.length} Photos
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '0.85rem' }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-gold-dark)', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>
                      {formData.collection}
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--color-primary-dark)', margin: '0.2rem 0' }}>
                      {formData.title || 'Suit Name Preview'}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                        {formatPrice(formData.priceBDT || 0)}
                      </span>
                      {Number(formData.originalPriceBDT) > Number(formData.priceBDT) && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                          {formatPrice(formData.originalPriceBDT)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button className="btn-primary" type="submit" style={{ width: '100%', height: '46px' }}>
                    <Check size={18} />
                    <span>SAVE & PUBLISH PRODUCT</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: '#ffffff', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ORDER RECEIPT MODAL */}
      {selectedOrderReceipt && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-md)',
              maxWidth: '550px',
              width: '100%',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-primary-dark)' }}>Order Invoice #{selectedOrderReceipt.id}</h3>
              <button onClick={() => setSelectedOrderReceipt(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ background: '#fbf9f5', border: '1px dashed var(--color-gold-dark)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '0.85rem' }}>
                <div>
                  <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>ROMONI MART ATELIER</strong>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Date: {selectedOrderReceipt.date}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 800, color: 'var(--color-primary-dark)' }}>{selectedOrderReceipt.id}</span>
                  <div style={{ color: 'var(--color-gold-dark)', fontWeight: 700, fontSize: '0.7rem' }}>{selectedOrderReceipt.status}</div>
                </div>
              </div>

              <div style={{ marginBottom: '0.85rem' }}>
                <strong>Customer:</strong> {selectedOrderReceipt.customerName} ({selectedOrderReceipt.phone})<br />
                <strong>Address:</strong> {selectedOrderReceipt.address}, {selectedOrderReceipt.city}<br />
                <strong>Payment:</strong> {selectedOrderReceipt.paymentMethod}
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontSize: '0.72rem' }}>
                    <th style={{ textAlign: 'left', paddingBottom: '0.3rem' }}>Item</th>
                    <th style={{ textAlign: 'center', paddingBottom: '0.3rem' }}>Qty</th>
                    <th style={{ textAlign: 'right', paddingBottom: '0.3rem' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrderReceipt.items?.map((it, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f0ece1' }}>
                      <td style={{ padding: '0.3rem 0' }}>{it.title} <small style={{ color: 'var(--color-text-muted)' }}>({it.size})</small></td>
                      <td style={{ textAlign: 'center' }}>{it.quantity}</td>
                      <td style={{ textAlign: 'right', fontWeight: 700 }}>{formatPrice(it.price * it.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ borderTop: '2px solid var(--color-primary-dark)', paddingTop: '0.4rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1rem' }}>
                <span>Grand Total</span>
                <span>{formatPrice(selectedOrderReceipt.totalAmount)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
              <button className="btn-secondary" onClick={() => window.print()} style={{ padding: '0.55rem 1rem' }}>
                <Printer size={15} />
                <span>Print Invoice</span>
              </button>
              <button className="btn-primary" onClick={() => setSelectedOrderReceipt(null)} style={{ padding: '0.55rem 1.2rem' }}>
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
