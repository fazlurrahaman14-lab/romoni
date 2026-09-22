import React, { useState } from 'react';
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
  Percent
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
    coupons,
    addCoupon,
    toggleCouponStatus,
    deleteCoupon,
    ordersList,
    updateOrderStatus,
    formatPrice
  } = useStore();

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'coupons', 'orders'
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default accessible for ease
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Search filter for admin product table
  const [adminSearch, setAdminSearch] = useState('');

  // Product Add / Edit Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // New / Edit Product Form State
  const [formData, setFormData] = useState({
    title: '',
    collection: 'Unstitched Luxury Lawn',
    category: 'unstitched-lawn',
    priceBDT: '',
    originalPriceBDT: '',
    badge: 'New Arrival',
    fabric: 'Superfine Printed Lawn',
    pieces: '3 Piece Suit',
    image: '/assets/products/ethnic_embroidered_lawn_1790107214388.png',
    hoverImage: '/assets/products/hero_banner_winter_1790107081859.png',
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
    setFormData({
      title: '',
      collection: 'Unstitched Luxury Lawn',
      category: 'unstitched-lawn',
      priceBDT: '6500',
      originalPriceBDT: '7500',
      badge: 'New Arrival',
      fabric: '100% Superfine Printed Lawn',
      pieces: '3 Piece Suit',
      image: '/assets/products/ethnic_embroidered_lawn_1790107214388.png',
      hoverImage: '/assets/products/hero_banner_winter_1790107081859.png',
      description: 'Handcrafted premium ladies attire.',
      inStock: true
    });
    setIsProductModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      collection: product.collection,
      category: product.category || 'unstitched-lawn',
      priceBDT: product.priceBDT || product.pricePKR || '',
      originalPriceBDT: product.originalPriceBDT || product.originalPricePKR || '',
      badge: product.badge || '',
      fabric: product.fabric || '',
      pieces: product.pieces || '3 Piece Suit',
      image: product.image,
      hoverImage: product.hoverImage || product.image,
      description: product.description || '',
      inStock: product.inStock !== false
    });
    setIsProductModalOpen(true);
  };

  // Save Product (Add or Update)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.priceBDT) {
      alert('Please fill in product title and price.');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
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

  // Filtered Products for Admin Table
  const filteredProducts = productsList.filter(
    (p) =>
      p.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.collection.toLowerCase().includes(adminSearch.toLowerCase())
  );

  // Total Revenue Calculation
  const totalRevenue = ordersList.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(6px)',
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
          maxWidth: '1100px',
          maxHeight: '92vh',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid var(--color-border-gold)'
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            background: 'var(--color-primary-dark)',
            color: '#ffffff',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid var(--color-gold)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--color-gold)',
                color: 'var(--color-primary-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800
              }}
            >
              LD
            </div>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem',
                  color: 'var(--color-gold)',
                  lineHeight: '1.2'
                }}
              >
                LEDIS DRESS — ADMIN MANAGEMENT DASHBOARD
              </h2>
              <p style={{ fontSize: '0.75rem', opacity: 0.8, color: '#e2e8f0' }}>
                Manage catalog products, set prices & discounts, create promo codes & view customer orders
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Security PIN Screen (If not authenticated) */}
        {!isAuthenticated ? (
          <div style={{ padding: '3rem 1.5rem', textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
            <Lock size={48} style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>Admin Authentication</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Enter your manager passcode to access product pricing and inventory.
            </p>

            <form onSubmit={handlePinSubmit}>
              <input
                type="password"
                placeholder="Enter PIN (Default: 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: pinError ? '2px solid #e11d48' : '1px solid var(--color-border)',
                  marginBottom: '1rem',
                  fontSize: '1rem',
                  textAlign: 'center'
                }}
              />
              {pinError && <p style={{ color: '#e11d48', fontSize: '0.8rem', marginBottom: '1rem' }}>Invalid passcode. Try "1234"</p>}
              <button className="btn-primary" type="submit" style={{ width: '100%' }}>
                <span>Access Dashboard</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Quick Analytics Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                padding: '1rem 1.5rem',
                background: '#f8fafc',
                borderBottom: '1px solid var(--color-border)'
              }}
            >
              <div
                style={{
                  background: '#ffffff',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem'
                }}
              >
                <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', background: '#ecfdf5', color: '#047857' }}>
                  <Package size={22} />
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total Products</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>{productsList.length} Items</div>
                </div>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem'
                }}
              >
                <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', background: '#fef3c7', color: '#b45309' }}>
                  <Tag size={22} />
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Active Coupons</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                    {coupons.filter((c) => c.isActive).length} Codes
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem'
                }}
              >
                <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', background: '#eff6ff', color: '#1d4ed8' }}>
                  <ShoppingBag size={22} />
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total Orders</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>{ordersList.length} Orders</div>
                </div>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem'
                }}
              >
                <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', background: '#faf5ff', color: '#7e22ce' }}>
                  <DollarSign size={22} />
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Store Sales</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>{formatPrice(totalRevenue)}</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 1.5rem',
                borderBottom: '1px solid var(--color-border)',
                background: '#ffffff'
              }}
            >
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setActiveTab('products')}
                  style={{
                    padding: '0.85rem 1.2rem',
                    border: 'none',
                    borderBottom: activeTab === 'products' ? '3px solid var(--color-gold)' : '3px solid transparent',
                    background: 'none',
                    fontWeight: activeTab === 'products' ? 700 : 500,
                    color: activeTab === 'products' ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <Package size={16} />
                  <span>Products & Price Editor</span>
                </button>

                <button
                  onClick={() => setActiveTab('coupons')}
                  style={{
                    padding: '0.85rem 1.2rem',
                    border: 'none',
                    borderBottom: activeTab === 'coupons' ? '3px solid var(--color-gold)' : '3px solid transparent',
                    background: 'none',
                    fontWeight: activeTab === 'coupons' ? 700 : 500,
                    color: activeTab === 'coupons' ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <Percent size={16} />
                  <span>Discounts & Coupons</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  style={{
                    padding: '0.85rem 1.2rem',
                    border: 'none',
                    borderBottom: activeTab === 'orders' ? '3px solid var(--color-gold)' : '3px solid transparent',
                    background: 'none',
                    fontWeight: activeTab === 'orders' ? 700 : 500,
                    color: activeTab === 'orders' ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Customer Orders ({ordersList.length})</span>
                </button>
              </div>

              {activeTab === 'products' && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={resetProductsToDefault}
                    title="Reset to default 6 demo suits"
                    style={{
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.75rem',
                      background: '#f1f5f9',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <RefreshCw size={13} />
                    <span>Reset Catalog</span>
                  </button>

                  <button
                    className="btn-primary"
                    onClick={handleOpenAddModal}
                    style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
                  >
                    <Plus size={15} />
                    <span>ADD NEW PRODUCT</span>
                  </button>
                </div>
              )}
            </div>

            {/* TAB CONTENT BODY */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', background: '#f8fafc' }}>
              {/* TAB 1: PRODUCTS MANAGEMENT */}
              {activeTab === 'products' && (
                <div>
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
                          <th style={{ padding: '0.85rem 1rem' }}>Product</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Collection</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Selling Price (BDT)</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Original Price (Discount)</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Badge</th>
                          <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                          <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((p) => {
                          const currentP = p.priceBDT || p.pricePKR || 0;
                          const origP = p.originalPriceBDT || p.originalPricePKR || currentP;
                          const hasDiscount = origP > currentP;
                          const discPercent = hasDiscount ? Math.round(((origP - currentP) / origP) * 100) : 0;

                          return (
                            <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                              {/* Product Thumbnail & Title */}
                              <td style={{ padding: '0.85rem 1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                  <img
                                    src={p.image}
                                    alt={p.title}
                                    style={{ width: '42px', height: '52px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}
                                  />
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

                              {/* Price BDT Input / Display */}
                              <td style={{ padding: '0.85rem 1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                  <span style={{ fontWeight: 700, color: 'var(--color-primary-dark)' }}>৳</span>
                                  <input
                                    type="number"
                                    value={currentP}
                                    onChange={(e) => updateProduct(p.id, { priceBDT: e.target.value })}
                                    style={{
                                      width: '90px',
                                      padding: '0.25rem 0.4rem',
                                      borderRadius: 'var(--radius-sm)',
                                      border: '1px solid var(--color-border)',
                                      fontWeight: 700,
                                      color: 'var(--color-primary-dark)'
                                    }}
                                  />
                                </div>
                              </td>

                              {/* Original Price (for Discount) */}
                              <td style={{ padding: '0.85rem 1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                  <span style={{ color: 'var(--color-text-muted)' }}>৳</span>
                                  <input
                                    type="number"
                                    value={origP}
                                    onChange={(e) => updateProduct(p.id, { originalPriceBDT: e.target.value })}
                                    placeholder="Reg Price"
                                    style={{
                                      width: '90px',
                                      padding: '0.25rem 0.4rem',
                                      borderRadius: 'var(--radius-sm)',
                                      border: '1px solid var(--color-border)',
                                      color: 'var(--color-text-muted)'
                                    }}
                                  />
                                  {hasDiscount && (
                                    <span style={{ background: '#e11d48', color: '#ffffff', fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                                      -{discPercent}% OFF
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
                                    title="Edit Full Details"
                                    style={{
                                      padding: '0.35rem 0.6rem',
                                      background: '#f1f5f9',
                                      border: '1px solid var(--color-border)',
                                      borderRadius: 'var(--radius-sm)',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    <Edit3 size={15} color="var(--color-primary-dark)" />
                                  </button>

                                  <button
                                    onClick={() => {
                                      if (confirm(`Delete "${p.title}"?`)) {
                                        deleteProduct(p.id);
                                      }
                                    }}
                                    title="Delete Product"
                                    style={{
                                      padding: '0.35rem 0.6rem',
                                      background: '#fee2e2',
                                      border: '1px solid #fca5a5',
                                      borderRadius: 'var(--radius-sm)',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    <Trash2 size={15} color="#b91c1c" />
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

              {/* TAB 2: COUPONS & DISCOUNTS MANAGEMENT */}
              {activeTab === 'coupons' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
                  {/* Create New Coupon Form */}
                  <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-primary-dark)' }}>
                      Create Promo Coupon
                    </h3>
                    <form onSubmit={handleCreateCoupon}>
                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Coupon Code (Uppercase)</label>
                        <input
                          type="text"
                          placeholder="e.g. EID2026"
                          value={newCouponCode}
                          onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                          required
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontWeight: 700 }}
                        />
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Discount Percentage (%)</label>
                        <input
                          type="number"
                          placeholder="e.g. 15"
                          value={newCouponPercent}
                          onChange={(e) => setNewCouponPercent(e.target.value)}
                          required
                          min="1"
                          max="90"
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                        />
                      </div>

                      <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Description / Note</label>
                        <input
                          type="text"
                          placeholder="e.g. Special 15% discount"
                          value={newCouponDesc}
                          onChange={(e) => setNewCouponDesc(e.target.value)}
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                        />
                      </div>

                      <button className="btn-primary" type="submit" style={{ width: '100%' }}>
                        <Plus size={16} />
                        <span>CREATE PROMO CODE</span>
                      </button>
                    </form>
                  </div>

                  {/* Coupon List */}
                  <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem 1.25rem', background: '#f1f5f9', borderBottom: '1px solid var(--color-border)', fontWeight: 700 }}>
                      Active Coupon Codes ({coupons.length})
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                          <th style={{ padding: '0.75rem 1rem' }}>Code</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Discount</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Description</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                          <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coupons.map((c) => (
                          <tr key={c.code} style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                              {c.code}
                            </td>
                            <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#e11d48' }}>
                              {c.discountPercent}% OFF
                            </td>
                            <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>
                              {c.description || 'General store coupon'}
                            </td>
                            <td style={{ padding: '0.75rem 1rem' }}>
                              <button
                                onClick={() => toggleCouponStatus(c.code)}
                                style={{
                                  border: 'none',
                                  padding: '0.2rem 0.5rem',
                                  borderRadius: 'var(--radius-full)',
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  background: c.isActive ? '#dcfce7' : '#fee2e2',
                                  color: c.isActive ? '#15803d' : '#b91c1c'
                                }}
                              >
                                {c.isActive ? 'Active' : 'Disabled'}
                              </button>
                            </td>
                            <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                              <button
                                onClick={() => deleteCoupon(c.code)}
                                style={{ background: 'none', border: 'none', color: '#b91c1c', cursor: 'pointer' }}
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: CUSTOMER ORDERS */}
              {activeTab === 'orders' && (
                <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--color-primary-dark)', color: '#ffffff', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '0.85rem 1rem' }}>Order ID & Date</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Customer Info</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Items Ordered</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Payment Method</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Total Amount</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Contact Customer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersList.map((ord) => (
                        <tr key={ord.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <div style={{ fontWeight: 800, color: 'var(--color-primary-dark)' }}>{ord.id}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{ord.date}</div>
                          </td>

                          <td style={{ padding: '0.85rem 1rem' }}>
                            <div style={{ fontWeight: 600 }}>{ord.customerName}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{ord.phone}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{ord.address}, {ord.city}</div>
                          </td>

                          <td style={{ padding: '0.85rem 1rem' }}>
                            {ord.items?.map((it, idx) => (
                              <div key={idx} style={{ fontSize: '0.78rem' }}>
                                • {it.title} ({it.size || 'Unstitched'}) x {it.quantity}
                              </div>
                            ))}
                          </td>

                          <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#047857' }}>
                            {ord.paymentMethod}
                          </td>

                          <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                            {formatPrice(ord.totalAmount)}
                          </td>

                          <td style={{ padding: '0.85rem 1rem' }}>
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                              style={{
                                padding: '0.3rem 0.5rem',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--color-border)',
                                fontSize: '0.75rem',
                                fontWeight: 700
                              }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                            <a
                              href={`https://wa.me/${ord.phone?.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                                ord.customerName
                              )},%20regarding%20your%20Ledis%20Dress%20order%20${ord.id}...`}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                padding: '0.35rem 0.7rem',
                                background: '#25D366',
                                color: '#ffffff',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                textDecoration: 'none'
                              }}
                            >
                              <MessageCircle size={14} />
                              <span>WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ADD / EDIT PRODUCT MODAL OVERLAY */}
      {isProductModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
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
              borderRadius: 'var(--radius-lg)',
              width: '100%',
              maxWidth: '650px',
              padding: '1.5rem',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--color-primary-dark)' }}>
                {editingProduct ? 'Edit Product Details' : 'Add New Designer Suit'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Product Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Mahparah - Crimson Zari Lawn"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Collection Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const selCat = CATEGORIES.find((c) => c.id === e.target.value);
                      setFormData({
                        ...formData,
                        category: e.target.value,
                        collection: selCat ? selCat.name : 'Unstitched Luxury Lawn'
                      });
                    }}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Selling Price (BDT ৳)</label>
                  <input
                    type="number"
                    required
                    value={formData.priceBDT}
                    onChange={(e) => setFormData({ ...formData, priceBDT: e.target.value })}
                    placeholder="6500"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Reg Original Price (Discount)</label>
                  <input
                    type="number"
                    value={formData.originalPriceBDT}
                    onChange={(e) => setFormData({ ...formData, originalPriceBDT: e.target.value })}
                    placeholder="7500"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Badge Label</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Bestseller, New Arrival"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Fabric Details</label>
                  <input
                    type="text"
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    placeholder="Micro Velvet 9000 shirt & dupatta"
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

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Image URL / Asset Path</label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  style={{ padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: '#ffffff', cursor: 'pointer' }}
                >
                  Cancel
                </button>

                <button className="btn-primary" type="submit" style={{ width: 'auto', padding: '0.6rem 1.5rem' }}>
                  <span>SAVE PRODUCT</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
