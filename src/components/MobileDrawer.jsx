import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, ChevronRight, PhoneCall, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const MobileDrawer = () => {
  const {
    isMobileDrawerOpen,
    setIsMobileDrawerOpen,
    selectedCategory,
    setSelectedCategory
  } = useStore();

  if (!isMobileDrawerOpen) return null;

  return (
    <>
      <div className="overlay" onClick={() => setIsMobileDrawerOpen(false)} />
      <div className="drawer-content drawer-left">
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img src="/assets/logo.jpg" alt="Ledis Dress" style={{ height: '36px', borderRadius: '4px' }} />
            <div>
              <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.1rem' }}>
                LEDIS DRESS
              </span>
              <span style={{ display: 'block', fontSize: '0.6rem', color: 'var(--color-gold-dark)', letterSpacing: '0.15em' }}>
                LUXURY ATELIER
              </span>
            </div>
          </div>
          <button className="action-btn" onClick={() => setIsMobileDrawerOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="drawer-body">
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginBottom: '1rem', fontWeight: 600 }}>
            Catalog Collections
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setIsMobileDrawerOpen(false);
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: selectedCategory === cat.id ? 'var(--color-gold-muted)' : '#ffffff',
                  border: selectedCategory === cat.id ? '1px solid var(--color-border-gold)' : '1px solid var(--color-border)',
                  color: selectedCategory === cat.id ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
                  fontWeight: selectedCategory === cat.id ? 700 : 500,
                  fontSize: '0.9rem'
                }}
              >
                <span>{cat.name}</span>
                <ChevronRight size={16} style={{ opacity: 0.6 }} />
              </button>
            ))}
          </div>

          <div style={{ marginTop: '2rem', background: '#f4efe6', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-gold)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-dark)', fontWeight: 600, fontSize: '0.85rem' }}>
              <ShieldCheck size={18} style={{ color: 'var(--color-gold-dark)' }} />
              <span>100% Authentic Guarantee</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.3rem' }}>
              Direct from designer ateliers. Nationwide express delivery & 24/7 customer helpline.
            </p>
          </div>
        </div>

        <div className="drawer-footer">
          <a
            href="https://wa.me/?text=Hello%20Ledis%20Dress,%20I%20have%20an%20inquiry%20about%20your%20luxury%20collections."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ textDecoration: 'none' }}
          >
            <PhoneCall size={20} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
};