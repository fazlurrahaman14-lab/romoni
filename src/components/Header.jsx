import React from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Header = () => {
  const {
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
          >
            <img
              src="/assets/logo.jpg"
              alt="Romoni Mart Logo"
              className="brand-logo-img"
              onError={(e) => {
                if (!e.target.dataset.triedFallback) {
                  e.target.dataset.triedFallback = 'true';
                  e.target.src = '/logo.jpg';
                }
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="brand-name">
                ROMONI MART
              </span>
              <span className="brand-subtext">
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
          </div>
        </div>
      </div>
    </header>
  );
};
