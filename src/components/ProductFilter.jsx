import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { RefreshCw } from 'lucide-react';

export const ProductFilter = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery
  } = useStore();

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.4rem',
            maxWidth: '100%'
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: selectedCategory === cat.id ? 700 : 500,
                whiteSpace: 'nowrap',
                background: selectedCategory === cat.id ? 'var(--color-primary-dark)' : '#ffffff',
                color: selectedCategory === cat.id ? 'var(--color-gold)' : 'var(--color-text-primary)',
                border: selectedCategory === cat.id ? '1px solid var(--color-gold)' : '1px solid var(--color-border)',
                transition: 'all var(--transition-fast)',
                cursor: 'pointer'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
            <span style={{ fontWeight: 600 }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                background: '#ffffff',
                fontSize: '0.8rem',
                outline: 'none',
                color: 'var(--color-primary-dark)'
              }}
            >
              <option value="featured">Featured Atelier</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {(selectedCategory !== 'all' || searchQuery) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-gold-muted)',
            border: '1px solid var(--color-border-gold)',
            padding: '0.6rem 1rem',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.5rem',
            fontSize: '0.8rem',
            color: 'var(--color-primary-dark)'
          }}
        >
          <div>
            Showing results for:{' '}
            <strong>
              {selectedCategory !== 'all'
                ? CATEGORIES.find((c) => c.id === selectedCategory)?.name
                : 'All Products'}
              {searchQuery && ` matching "${searchQuery}"`}
            </strong>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              color: 'var(--color-primary)',
              fontWeight: 700,
              fontSize: '0.75rem',
              textTransform: 'uppercase'
            }}
          >
            <RefreshCw size={13} />
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </>
  );
};