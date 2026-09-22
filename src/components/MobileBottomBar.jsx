import React from 'react';
import { useStore } from '../context/StoreContext';
import { Home, Grid, Search, Heart, ShoppingBag } from 'lucide-react';

export const MobileBottomBar = () => {
  const {
    cart,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    setSelectedCategory
  } = useStore();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToShop = () => {
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mobile-bottom-bar">
      <button
        className="bottom-tab active"
        onClick={() => {
          setSelectedCategory('all');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button
        className="bottom-tab"
        onClick={() => {
          setSelectedCategory('all');
          scrollToShop();
        }}
      >
        <Grid size={20} />
        <span>Shop</span>
      </button>

      <button className="bottom-tab" onClick={() => setIsSearchOpen(true)}>
        <Search size={20} />
        <span>Search</span>
      </button>

      <button
        className="bottom-tab"
        onClick={scrollToShop}
        style={{ position: 'relative' }}
      >
        <Heart size={20} />
        <span>Wishlist</span>
        {wishlist.length > 0 && <span className="badge-count" style={{ top: '2px', right: '16px' }}>{wishlist.length}</span>}
      </button>

      <button
        className="bottom-tab"
        onClick={() => setIsCartOpen(true)}
        style={{ position: 'relative' }}
      >
        <ShoppingBag size={20} />
        <span>Bag</span>
        {totalCartItems > 0 && <span className="badge-count" style={{ top: '2px', right: '16px' }}>{totalCartItems}</span>}
      </button>
    </div>
  );
};