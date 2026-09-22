import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    formatPrice,
    cartSubtotalPKR,
    discountAmountPKR,
    cartTotalPKR,
    freeShippingThresholdPKR,
    shippingProgress,
    applyCoupon,
    discountCode,
    setIsCheckoutOpen
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const freeShippingDifferencePKR = Math.max(0, freeShippingThresholdPKR - cartSubtotalPKR);

  return (
    <>
      <div className="overlay" onClick={() => setIsCartOpen(false)} />
      <div className="drawer-content drawer-right">
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} style={{ color: 'var(--color-gold)' }} />
            <span className="drawer-title">Shopping Bag ({cart.length})</span>
          </div>
          <button className="action-btn" onClick={() => setIsCartOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="drawer-body">
          <div className="shipping-progress-container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-primary-dark)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Truck size={15} style={{ color: 'var(--color-gold-dark)' }} />
                {freeShippingDifferencePKR === 0
                  ? '🎉 UNLOCKED FREE EXPRESS SHIPPING!'
                  : `Add ${formatPrice(freeShippingDifferencePKR)} more for Free Express Shipping`}
              </span>
              <span>{shippingProgress}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${shippingProgress}%` }} />
            </div>
          </div>

          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-gold-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: 'var(--color-gold-dark)'
                }}
              >
                <ShoppingBag size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>Your Bag is Empty</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '0.5rem 0 1.5rem' }}>
                Discover our latest luxury unstitched lawn & pret collections.
              </p>
              <button
                className="btn-primary"
                onClick={() => {
                  setIsCartOpen(false);
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                START SHOPPING
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${index}`}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '0.85rem',
                    background: '#ffffff',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    style={{ width: '70px', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '0.9rem', fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          style={{ color: 'var(--color-text-muted)', padding: '2px' }}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block', marginTop: '2px' }}>
                        Size: <strong>{item.selectedSize}</strong> • {item.product.sku}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, -1)}
                          style={{ padding: '0.2rem 0.5rem', color: 'var(--color-primary)' }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0 0.5rem' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, 1)}
                          style={{ padding: '0.2rem 0.5rem', color: 'var(--color-primary)' }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                        {formatPrice(item.product.pricePKR * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '1rem', background: '#f9f6f0', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-gold)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Tag size={14} style={{ color: 'var(--color-gold-dark)' }} />
                  <span>Promo Code</span>
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
                  <input
                    type="text"
                    placeholder="Try LEDIS10"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase'
                    }}
                  />
                  <button
                    onClick={() => applyCoupon(inputCoupon)}
                    style={{
                      background: 'var(--color-primary-dark)',
                      color: 'var(--color-gold)',
                      padding: '0.5rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}
                  >
                    Apply
                  </button>
                </div>
                {discountCode && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-primary)', fontWeight: 700, display: 'block', marginTop: '0.3rem' }}>
                    ✓ Code {discountCode} Applied (10% Off)
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotalPKR)}</span>
              </div>
              {discountAmountPKR > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-primary)', fontWeight: 600 }}>
                  <span>Discount ({discountCode})</span>
                  <span>-{formatPrice(discountAmountPKR)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                <span>Estimated Express Shipping</span>
                <span>{freeShippingDifferencePKR === 0 ? 'FREE' : formatPrice(1500)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justify: 'space-between',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--color-primary-dark)',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid var(--color-border)'
                }}
              >
                <span>Grand Total</span>
                <span>{formatPrice(cartTotalPKR + (freeShippingDifferencePKR === 0 ? 0 : 1500))}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                className="btn-primary"
                style={{ width: '100%' }}
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};