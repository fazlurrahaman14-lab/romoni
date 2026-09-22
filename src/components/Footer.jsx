import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Instagram, Facebook, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showToast('🎁 Subscribed! Use code LEDIS10 for 10% off.');
      setEmail('');
    }
  };

  return (
    <footer style={{ background: 'var(--color-dark)', color: 'var(--color-text-light)', paddingTop: '4rem', paddingBottom: '5rem', borderTop: '2px solid var(--color-gold)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <img src="/assets/logo.jpg" alt="Ledis Dress" style={{ height: '44px', borderRadius: '4px' }} />
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.05em' }}>
                  LEDIS DRESS
                </span>
                <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '0.25em' }}>
                  ATELIER & COUTURE
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#a0ab9f', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Inspired by Mushq & Ammara Khan. Dedicated to crafting exquisite South Asian unstitched lawn, luxury pret, and bridal couture for global fashion connoisseurs.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)' }}>
                <Instagram size={18} />
              </a>
              <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)' }}>
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#ffffff', marginBottom: '1rem', borderBottom: '1px solid var(--color-gold-dark)', paddingBottom: '0.4rem', width: 'fit-content' }}>
              Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#a0ab9f' }}>
              <li><a href="#shop">COCO Prints Vol 4</a></li>
              <li><a href="#shop">ETHNC Embroidered Lawn</a></li>
              <li><a href="#shop">Winter Vol 1 2025 Velvet</a></li>
              <li><a href="#shop">Bridal & Formals Couture</a></li>
              <li><a href="#shop">Luxury Pret Series</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#ffffff', marginBottom: '1rem', borderBottom: '1px solid var(--color-gold-dark)', paddingBottom: '0.4rem', width: 'fit-content' }}>
              Customer Care
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#a0ab9f' }}>
              <li><a href="#">Worldwide Shipping & Delivery</a></li>
              <li><a href="#">Custom Stitching & Size Guide</a></li>
              <li><a href="#">Track Your Order</a></li>
              <li><a href="#">Return & Exchange Policy</a></li>
              <li><a href="https://wa.me/?text=Inquiry" target="_blank" rel="noreferrer">WhatsApp 24/7 Helpline</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#ffffff', marginBottom: '1rem', borderBottom: '1px solid var(--color-gold-dark)', paddingBottom: '0.4rem', width: 'fit-content' }}>
              Join Ledis Atelier
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#a0ab9f', marginBottom: '1rem' }}>
              Subscribe to get private access to early catalog drops and exclusive 10% discount codes.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gold)' }} />
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.65rem 0.65rem 2.2rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-gold-muted)',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#ffffff',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
              <button className="btn-primary" type="submit" style={{ padding: '0.65rem' }}>
                SUBSCRIBE & GET 10% OFF
              </button>
            </form>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.78rem', color: '#7a8579' }}>
          <div>
            © {new Date().getFullYear()} Ledis Dress Atelier. All Rights Reserved. Built for speed & cellphone experience.
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span>🔒 256-Bit SSL Encrypted</span>
            <span>✈ DHL Express Shipping</span>
            <span>💵 Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};