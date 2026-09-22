import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, ShoppingBag, PhoneCall, Scissors } from 'lucide-react';

export const ProductQuickView = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart
  } = useStore();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Unstitched');
  const [selectedColor] = useState(product.colors[0] || null);
  const [selectedImage, setSelectedImage] = useState(product.image);

  const handleWhatsAppOrder = () => {
    const text = `Hello Ledis Dress! I would like to order:\n- Item: ${product.title} (${product.sku})\n- Collection: ${product.collection}\n- Size: ${selectedSize}\n- Price: ${formatPrice(product.pricePKR)}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <div className="overlay" onClick={() => setQuickViewProduct(null)} />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '92vw',
          maxWidth: '850px',
          maxHeight: '90vh',
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          zIndex: 250,
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          animation: 'fadeIn 0.25s forwards'
        }}
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10,
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 'var(--radius-full)',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary-dark)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div style={{ padding: '1.5rem', background: '#fbf9f5', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ aspectRatio: '3/4', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: '#e8e4dc' }}>
              <img
                src={selectedImage}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[product.image, product.hoverImage].filter(Boolean).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: '60px',
                    height: '75px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: selectedImage === img ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                    opacity: selectedImage === img ? 1 : 0.6
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-gold-dark)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {product.collection}
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-primary-dark)', margin: '0.2rem 0' }}>
                {product.title}
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>SKU: {product.sku}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', color: 'var(--color-gold)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span style={{ fontWeight: 600 }}>{product.rating}</span>
              <span style={{ color: 'var(--color-text-muted)' }}>({product.reviewsCount} verified reviews)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                {formatPrice(product.pricePKR)}
              </span>
              {product.originalPricePKR > product.pricePKR && (
                <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                  {formatPrice(product.originalPricePKR)}
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
              {product.description}
            </p>

            <div style={{ background: '#f9f6f0', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-gold)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-dark)', display: 'block' }}>
                Fabric Specification
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                {product.fabric} ({product.pieces})
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  Select Size / Stitching:
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      padding: '0.5rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      fontWeight: selectedSize === sz ? 700 : 500,
                      border: selectedSize === sz ? '1.5px solid var(--color-gold)' : '1px solid var(--color-border)',
                      background: selectedSize === sz ? 'var(--color-primary-dark)' : '#ffffff',
                      color: selectedSize === sz ? 'var(--color-gold)' : 'var(--color-text-primary)'
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              {selectedSize === 'Custom Stitching' && (
                <p style={{ fontSize: '0.72rem', color: 'var(--color-gold-dark)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Scissors size={13} />
                  <span>Custom Atelier Stitching: Tailored to your exact measurements (7-10 days delivery).</span>
                </p>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                className="btn-primary"
                style={{ width: '100%', height: '52px', fontSize: '0.9rem' }}
                onClick={() => {
                  addToCart(product, selectedSize, selectedColor, 1);
                  setQuickViewProduct(null);
                }}
              >
                <ShoppingBag size={18} />
                <span>ADD TO SHOPPING BAG</span>
              </button>

              <button
                className="btn-whatsapp"
                style={{ width: '100%', height: '52px', fontSize: '0.9rem' }}
                onClick={handleWhatsAppOrder}
              >
                <PhoneCall size={18} />
                <span>ORDER DIRECT VIA WHATSAPP</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};