import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle, ShieldCheck, Lock, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    formatPrice,
    cartTotalPKR,
    currency
  } = useStore();

  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Pakistan',
    paymentMethod: 'cod',
    notes: ''
  });

  const [orderSummary, setOrderSummary] = useState(null);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill in required fields: Name, Phone, and Address.');
      return;
    }

    const orderId = `LD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newSummary = {
      orderId,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      customer: { ...formData },
      items: [...cart],
      totalAmount: cartTotalPKR,
      currency
    };

    setOrderSummary(newSummary);
    setStep('success');
    clearCart();

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti failed', err);
    }
  };

  return (
    <>
      <div className="overlay" onClick={() => setIsCheckoutOpen(false)} />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '94vw',
          maxWidth: '800px',
          maxHeight: '92vh',
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          zIndex: 260,
          overflowY: 'auto',
          animation: 'fadeIn 0.25s forwards'
        }}
      >
        <div className="drawer-header" style={{ position: 'sticky', top: 0, zIndex: 10, background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Lock size={18} style={{ color: 'var(--color-gold)' }} />
            <span className="drawer-title">
              {step === 'form' ? 'Secure Atelier Checkout' : 'Order Confirmation Receipt'}
            </span>
          </div>
          <button className="action-btn" onClick={() => setIsCheckoutOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {step === 'form' ? (
            <form onSubmit={handleSubmitOrder} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.4rem' }}>
                  1. Delivery Details
                </h3>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Ayesha Khan"
                    value={formData.fullName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '0.2rem', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '0.2rem', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="ayesha@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '0.2rem', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                    Shipping Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    rows="2"
                    placeholder="House number, Street name, Area"
                    value={formData.address}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '0.2rem', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="Lahore / Karachi / London"
                      value={formData.city}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '0.2rem', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '0.2rem', fontSize: '0.85rem' }}
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.4rem', marginBottom: '0.8rem' }}>
                    2. Payment Method
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {[
                      { id: 'cod', label: 'Cash on Delivery (COD)', desc: 'Pay with cash upon package delivery' },
                      { id: 'card', label: 'Debit / Credit Card (Visa / Mastercard)', desc: 'Instant 256-bit encrypted card checkout' },
                      { id: 'bank', label: 'Direct Bank Transfer / JazzCash', desc: 'Transfer directly to Ledis Dress account' }
                    ].map((method) => (
                      <label
                        key={method.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-sm)',
                          border: formData.paymentMethod === method.id ? '1px solid var(--color-gold)' : '1px solid var(--color-border)',
                          background: formData.paymentMethod === method.id ? 'var(--color-gold-muted)' : '#ffffff',
                          cursor: 'pointer'
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleChange}
                        />
                        <div>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary-dark)', display: 'block' }}>
                            {method.label}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{method.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ background: '#fbf9f5', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', height: 'fit-content' }}>
                <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
                  Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem', paddingRight: '0.4rem' }}>
                  {cart.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', fontSize: '0.8rem' }}>
                      <img src={item.product.image} alt="" style={{ width: '40px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 600, display: 'block' }}>{item.product.title}</span>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>
                          Qty: {item.quantity} • Size: {item.selectedSize}
                        </span>
                      </div>
                      <span style={{ fontWeight: 700 }}>{formatPrice(item.product.pricePKR * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Total Amount</span>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)' }}>{formatPrice(cartTotalPKR)}</strong>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
                  <Lock size={16} />
                  <span>PLACE CONFIRMED ORDER</span>
                </button>

                <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                  <ShieldCheck size={14} style={{ color: 'var(--color-gold-dark)' }} />
                  <span>Protected by Ledis Atelier 100% Satisfaction Guarantee</span>
                </p>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <CheckCircle size={60} style={{ color: 'var(--color-gold-dark)', margin: '0 auto 1rem' }} />
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-primary-dark)' }}>
                Thank You for Your Order!
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                Your order <strong>#{orderSummary?.orderId}</strong> has been received and sent to our atelier for dispatch.
              </p>

              <div
                id="printable-receipt"
                style={{
                  maxWidth: '550px',
                  margin: '0 auto',
                  background: '#fbf9f5',
                  border: '1px dashed var(--color-gold-dark)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.5rem',
                  textAlign: 'left',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem' }}>LEDIS DRESS ATELIER</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Date: {orderSummary?.date}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                      Order #{orderSummary?.orderId}
                    </span>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-gold-dark)', fontWeight: 700 }}>
                      STATUS: CONFIRMED
                    </span>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>
                  <strong>Customer:</strong> {orderSummary?.customer.fullName} ({orderSummary?.customer.phone})<br />
                  <strong>Address:</strong> {orderSummary?.customer.address}, {orderSummary?.customer.city}, {orderSummary?.customer.country}<br />
                  <strong>Payment:</strong> {orderSummary?.customer.paymentMethod.toUpperCase()}
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', marginBottom: '1rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-border)', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                      <th style={{ textAlign: 'left', paddingBottom: '0.4rem' }}>Item</th>
                      <th style={{ textAlign: 'center', paddingBottom: '0.4rem' }}>Qty</th>
                      <th style={{ textAlign: 'right', paddingBottom: '0.4rem' }}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderSummary?.items.map((it, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f0ece1' }}>
                        <td style={{ padding: '0.4rem 0' }}>
                          {it.product.title} <br />
                          <small style={{ color: 'var(--color-text-muted)' }}>Size: {it.selectedSize}</small>
                        </td>
                        <td style={{ textAlign: 'center' }}>{it.quantity}</td>
                        <td style={{ textAlign: 'right', fontWeight: 700 }}>{formatPrice(it.product.pricePKR * it.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ borderTop: '2px solid var(--color-primary-dark)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 700 }}>
                  <span>Grand Total Paid</span>
                  <span>{formatPrice(orderSummary?.totalAmount || 0)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                <button
                  className="btn-secondary"
                  onClick={() => window.print()}
                >
                  <Printer size={16} />
                  <span>Print Receipt</span>
                </button>

                <button
                  className="btn-primary"
                  onClick={() => setIsCheckoutOpen(false)}
                >
                  <span>CONTINUE SHOPPING</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};