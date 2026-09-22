import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const {
    formatPrice,
    wishlist,
    toggleWishlist,
    addToCart,
    setQuickViewProduct
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const discountPercent = Math.round(
    ((product.originalPricePKR - product.pricePKR) / product.originalPricePKR) * 100
  );

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image-wrapper">
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.title}
          className="card-image"
          loading="lazy"
        />

        {product.badge && <span className="card-badge">{product.badge}</span>}

        {discountPercent > 0 && (
          <span
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              background: '#e11d48',
              color: '#ffffff',
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            -{discountPercent}% OFF
          </span>
        )}

        <button
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart size={18} fill={isWishlisted ? '#e11d48' : 'none'} color={isWishlisted ? '#e11d48' : 'currentColor'} />
        </button>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.2)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity var(--transition-fast)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <button
            onClick={() => setQuickViewProduct(product)}
            style={{
              background: '#ffffff',
              color: 'var(--color-primary-dark)',
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: 'var(--shadow-md)',
              transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Eye size={15} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      <div className="card-details">
        <span className="card-collection">{product.collection}</span>
        <h3 className="card-title" title={product.title}>
          {product.title}
        </h3>

        <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
          {product.pieces} • {product.fabric.split(',')[0]}
        </p>

        <div className="card-price-row">
          <span className="current-price">{formatPrice(product.pricePKR)}</span>
          {product.originalPricePKR > product.pricePKR && (
            <span className="original-price">{formatPrice(product.originalPricePKR)}</span>
          )}
        </div>

        <div className="card-actions">
          <button
            className="quick-add-btn"
            onClick={() => addToCart(product, product.sizes[0])}
          >
            <ShoppingBag size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};