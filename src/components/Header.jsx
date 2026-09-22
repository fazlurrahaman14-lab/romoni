import React from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Heart, ShoppingBag, Menu, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Header = () => {
  const {
    cart,
    wishlist,
    setIsCartOpen,
    setIsMobileDrawerOpen,
    setIsSearchOpen,
    setIsAdminOpen,
    selectedCategory,
    setSelectedCategory
  } = useStore();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="main-header">
      {/* Top Announcement Marquee */}
      <div className="announcement-bar">
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', textAlign: 'center' }}>
          <div className="marquee-content">
            ✨ FREE EXPRESS DELIVERY ACROSS BANGLADESH ON ORDERS OVER ৳5,000 &nbsp;&nbsp;•&nbsp;&nbsp;
            CASH ON DELIVERY (COD) & BKASH AVAILABLE &nbsp;&nbsp;•&nbsp;&nbsp;
            USE CODE <strong style={{ color: '#ffffff' }}>ROMONI10</strong> FOR 10% OFF YOUR FIRST ORDER &nbsp;&nbsp;•&nbsp;&nbsp;
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container">
        <div className="header-inner">
          {/* Mobile Menu Trigger */}
          <button
            className="action-btn"
            style={{ display: 'flex' }}
            onClick={() => setIsMobileDrawerOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={22} />
          </button>

          {/* Brand Logo & Name */}
          <a
            href="#"
            className="brand-logo-wrapper"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory('all');
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
          >
            <img
              src="/assets/logo.jpg"
              alt="Romoni Mart Logo"
              style={{
                height: '46px',
                width: 'auto',
                objectFit: 'contain',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                border: '1px solid var(--color-border-gold)'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div
              style={{
                display: 'none',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--color-primary-dark)',
                border: '1.5px solid var(--color-gold)',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '1rem',
                flexShrink: 0
              }}
            >
              RM
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="brand-name" style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.04em' }}>
                ROMONI MART
              </span>
              <span className="brand-subtext" style={{ fontSize: '0.65rem', color: 'var(--color-gold-dark)', letterSpacing: '0.2em' }}>
                LUXURY ATELIER & COUTURE
              </span>
            </div>
          </a>

          {/* Desktop Links */}
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

          {/* Action Icons */}
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

            <button
              className="action-btn"
              onClick={() => setIsAdminOpen(true)}
              title="Admin Dashboard (Manage Prices & Products)"
              aria-label="Admin Dashboard"
              style={{ color: 'var(--color-gold-dark)' }}
            >
              <ShieldCheck size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
