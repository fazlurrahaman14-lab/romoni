import React from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Heart, ShoppingBag, Menu, Globe } from 'lucide-react';
import { CURRENCY_RATES, CATEGORIES } from '../data/products';

export const Header = () => {
  const {
    currency,
    setCurrency,
    cart,
    wishlist,
    setIsCartOpen,
    setIsMobileDrawerOpen,
    setIsSearchOpen,
    selectedCategory,
    setSelectedCategory
  } = useStore();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="main-header">
      <div className="announcement-bar">
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', flex: 1, marginRight: '1rem' }}>
          <div className="marquee-content">
            ✨ FREE EXPRESS DELIVERY ACROSS BANGLADESH ON ORDERS OVER ৳5,000 &nbsp;&nbsp;•&nbsp;&nbsp;
            CASH ON DELIVERY (COD) & BKASH AVAILABLE &nbsp;&nbsp;•&nbsp;&nbsp;
            USE CODE <strong style={{ color: '#ffffff' }}>LEDIS10</strong> FOR 10% OFF YOUR FIRST ORDER &nbsp;&nbsp;•&nbsp;&nbsp;
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', shrink: 0 }}>
          <Globe size={13} style={{ color: 'var(--color-gold)' }} />
          <select
            className="currency-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            aria-label="Select Currency"
          >
            {Object.keys(CURRENCY_RATES).map((code) => (
              <option key={code} value={code}>
                {code} ({CURRENCY_RATES[code].symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="container">
        <div className="header-inner">
          <button
            className="action-btn"
            style={{ display: 'flex' }}
            onClick={() => setIsMobileDrawerOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={22} />
          </button>

          <a href="#" className="brand-logo-wrapper" onClick={() => setSelectedCategory('all')}>
            <img src="/assets/logo.jpg" alt="Ledis Dress Logo" className="brand-logo-img" />
            <div>
              <span className="brand-name">LEDIS DRESS</span>
              <span className="brand-subtext">ATELIER & COUTURE</span>
            </div>
          </a>

          <nav className="desktop-nav">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href="#shop"
                className={`nav-link ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory(cat.id);
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {cat.name}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="action-btn"
              onClick={() => setIsSearchOpen(true)}
              title="Search Collection"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button
              className="action-btn"
              onClick={() => {
                const el = document.getElementById('shop');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
            </button>

            <button
              className="action-btn"
              onClick={() => setIsCartOpen(true)}
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={20} />
              {totalCartItems > 0 && <span className="badge-count">{totalCartItems}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};