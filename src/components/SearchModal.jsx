import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, X, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const SearchModal = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    setQuickViewProduct
  } = useStore();

  if (!isSearchOpen) return null;

  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.fabric.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const trendingTags = ['COCO Prints', 'Velvet', 'Unstitched Lawn', 'Maroon Zari', 'Bridal Couture'];

  return (
    <>
      <div className="overlay" onClick={() => setIsSearchOpen(false)} />
      <div
        style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '92vw',
          maxWidth: '650px',
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          zIndex: 250,
          padding: '1.25rem',
          animation: 'slideUp 0.2s forwards'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
          <Search size={22} style={{ color: 'var(--color-gold-dark)' }} />
          <input
            type="text"
            autoFocus
            placeholder="Search COCO Prints, Velvet, Lawn, Silk Pret..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-primary-dark)'
            }}
          />
          <button onClick={() => setIsSearchOpen(false)} style={{ color: 'var(--color-text-muted)' }}>
            <X size={22} />
          </button>
        </div>

        {!searchQuery && (
          <div style={{ padding: '1rem 0 0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-gold-dark)', fontWeight: 700, marginBottom: '0.6rem' }}>
              <TrendingUp size={14} />
              <span>Trending Searches</span>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    background: '#f4efe6',
                    border: '1px solid var(--color-border-gold)',
                    fontSize: '0.75rem',
                    color: 'var(--color-primary-dark)',
                    fontWeight: 600
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {searchQuery && (
          <div style={{ marginTop: '1rem', maxHeight: '350px', overflowY: 'auto' }}>
            {filteredProducts.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem' }}>
                No matching suits or collections found for "{searchQuery}".
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setQuickViewProduct(prod);
                      setIsSearchOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      transition: 'background var(--transition-fast)'
                    }}
                    className="search-item-row"
                  >
                    <img src={prod.image} alt={prod.title} style={{ width: '45px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--color-gold-dark)', fontWeight: 700 }}>
                        {prod.collection}
                      </span>
                      <h4 style={{ fontSize: '0.88rem', fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)' }}>
                        {prod.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};