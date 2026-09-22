import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, ChevronRight, PhoneCall, ShieldCheck, Facebook } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const MobileDrawer = () => {
  const {
    isMobileDrawerOpen,
    setIsMobileDrawerOpen,
    selectedCategory,
    setSelectedCategory,
    setIsAdminOpen
  } = useStore();

  if (!isMobileDrawerOpen) return null;

  return (
    <>
      <div className="overlay" onClick={() => setIsMobileDrawerOpen(false)} />
      <div className="drawer-content drawer-left">
        {/* Drawer Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <img src="/assets/logo.jpg" alt="Romoni Mart" style={{ height: '40px', borderRadius: '4px', border: '1px solid var(--color-border-gold)' }} />
            <div>
              <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-primary-dark)' }}>
                ROMONI MART
              </span>
              <span style={{ display: 'block', fontSize: '0.6rem', color: 'var(--color-gold-dark)', letterSpacing: '0.18em' }}>
                LUXURY ATELIER
              </span>
            </div>
          </div>
          <button className="action-btn" onClick={() => setIsMobileDrawerOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Drawer Body */}
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

          <button
            onClick={() => {
              setIsMobileDrawerOpen(false);
              setIsAdminOpen(true);
            }}
            style={{
              width: '100%',
              marginTop: '1rem',
              padding: '0.75rem',
              background: 'var(--color-primary-dark)',
              color: 'var(--color-gold)',
              border: '1px solid var(--color-border-gold)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <ShieldCheck size={18} />
            <span>OPEN ADMIN DASHBOARD</span>
          </button>
        </div>

        {/* Drawer Footer - Elevated WhatsApp & Facebook Buttons */}
        <div className="drawer-footer" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <a
            href="https://wa.me/?text=Hello%20Romoni%20Mart,%20I%20have%20an%20inquiry%20about%20your%20luxury%20collections."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ textDecoration: 'none' }}
          >
            <PhoneCall size={20} />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href="https://www.facebook.com/RomoniMart"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1877F2',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Facebook size={18} />
            <span>Visit Facebook Page</span>
          </a>
        </div>
      </div>
    </>
  );
};
