import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';

const FEATURED_COLLECTIONS = [
  {
    id: 'coco-prints',
    title: 'COCO PRINTS VOL 4',
    subtitle: 'Printed & Embroidered Lawn',
    itemCount: '24 Designs',
    image: '/assets/products/coco_prints_vol4_1790107095197.png'
  },
  {
    id: 'ethnic-lawn',
    title: 'ETHNC EMBROIDERED LAWN',
    subtitle: '3-Piece Unstitched Luxury',
    itemCount: '18 Designs',
    image: '/assets/products/ethnic_embroidered_lawn_1790107214388.png'
  },
  {
    id: 'winter-2025',
    title: 'WINTER VOL 1 2025',
    subtitle: 'Velvet Pret & Embroidered Suits',
    itemCount: '15 Designs',
    image: '/assets/products/hero_banner_winter_1790107081859.png'
  },
  {
    id: 'bridal-couture',
    title: 'BRIDAL & FORMALS',
    subtitle: 'Handcrafted Atelier Couture',
    itemCount: '10 Exclusive Designs',
    image: '/assets/products/wedding_couture_1790107234257.png'
  }
];

export const CollectionGrid = () => {
  const { setSelectedCategory } = useStore();

  return (
    <section style={{ padding: '4rem 0 2rem', background: '#fbf9f5' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--color-gold-dark)',
              fontWeight: 700
            }}
          >
            ATELIER SPOTLIGHT
          </span>
          <h2
            style={{
              fontSize: '2.2rem',
              marginTop: '0.3rem',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-primary-dark)'
            }}
          >
            Featured Luxury Collections
          </h2>
          <div
            style={{
              width: '60px',
              height: '2px',
              background: 'var(--color-gold)',
              margin: '0.75rem auto 0'
            }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {FEATURED_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => {
                setSelectedCategory(col.id);
                const el = document.getElementById('shop');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                aspectRatio: '3/4',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
              }}
              className="collection-card"
            >
              <img
                src={col.image}
                alt={col.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s ease'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(15,18,16,0.85) 100%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem',
                  color: '#ffffff'
                }}
              >
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-gold)',
                    fontWeight: 700
                  }}
                >
                  {col.itemCount}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    color: '#ffffff',
                    margin: '0.2rem 0'
                  }}
                >
                  {col.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#d1d5db', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span>{col.subtitle}</span>
                  <ArrowUpRight size={14} style={{ color: 'var(--color-gold)' }} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};