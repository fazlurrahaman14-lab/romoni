import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CollectionGrid } from './components/CollectionGrid';
import { ProductFilter } from './components/ProductFilter';
import { ProductCard } from './components/ProductCard';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { MobileDrawer } from './components/MobileDrawer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const MainShop = () => {
  const { selectedCategory, searchQuery, sortBy, toast } = useStore();

  let filtered = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fabric.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.pricePKR - b.pricePKR);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.pricePKR - a.pricePKR);
  } else if (sortBy === 'newest') {
    filtered.reverse();
  }

  return (
    <main id="shop" style={{ padding: '3.5rem 0 5rem' }}>
      {toast && (
        <div className="toast-notification">
          <CheckCircle2 size={18} style={{ color: 'var(--color-gold)' }} />
          <span>{toast}</span>
        </div>
      )}

      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-gold-dark)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <Sparkles size={14} />
            <span>ATELIER CATALOGUE</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-primary-dark)', margin: '0.2rem 0' }}>
            Explore Designer Suits & Couture
          </h2>
        </div>

        <ProductFilter />

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>No suits found</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.4rem' }}>
              Try selecting a different collection or resetting your search term.
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export const App = () => {
  return (
    <StoreProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <HeroBanner />
        <CollectionGrid />
        <MainShop />
        <Footer />

        <MobileDrawer />
        <MobileBottomBar />
        <CartDrawer />
        <ProductQuickView />
        <SearchModal />
        <CheckoutModal />
      </div>
    </StoreProvider>
  );
};

export default App;