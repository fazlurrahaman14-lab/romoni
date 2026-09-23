import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const {
    formatPrice,
    getProductPrices,
    wishlist,
    toggleWishlist,
    addToCart,
    setQuickViewProduct
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const { sellingPrice, originalPrice, discountPercent, hasDiscount } = getProductPrices(product);

  const allImages = (product.images && product.images.length > 0)
    ? product.images
    : [product.image, product.hoverImage].filter(Boolean);

  const primaryImage = allImages[0] || product.image;
  const secondaryImage = allImages[1] || product.hoverImage || primaryImage;
  const currentImage = isHovered && secondaryImage ? secondaryImage : primaryImage;

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image-wrapper">
        <img
          src={currentImage}
          alt={product.title}
          className="card-image"
          loading="lazy"
        />

        {product.badge && <span className="card-badge">{product.badge}</span>}

        {allImages.length > 1 && (
          <span
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(9, 26, 19, 0.75)',
              backdropFilter: 'blur(4px)',
              color: 'var(--color-gold)',
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '0.2rem 0.55rem',
              borderRadius: 'var(--radius-full)',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              border: '1px solid var(--color-border-gold)'
            }}
          >
            📷 {allImages.length} Photos
          </span>
        )}

        {hasDiscount && discountPercent > 0 && (
          <span
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              background: '#e11d48',
              color: '#ffffff',
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              zIndex: 2
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
          {product.pieces} • {product.fabric ? product.fabric.split(',')[0] : 'Luxury Fabric'}
        </p>

        <div className="card-price-row">
          <span className="current-price">{formatPrice(sellingPrice)}</span>
          {hasDiscount && (
            <span className="original-price">{formatPrice(originalPrice)}</span>
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

export default ProductCard;
