import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Winter Vol-1 2025 Velvet Atelier',
    subtitle: 'COUTURE & HEAVY EMBROIDERED VELVET',
    image: '/assets/products/hero_banner_winter_1790107081859.png',
    badge: 'LUXURY RELEASE',
    categoryId: 'winter-2025'
  },
  {
    id: 2,
    title: 'COCO Prints Vol 4 Pret Collection',
    subtitle: 'AUTHENTIC PRINTED & EMBROIDERED LAWN',
    image: '/assets/products/coco_prints_vol4_1790107095197.png',
    badge: 'NEW SEASON',
    categoryId: 'coco-prints'
  },
  {
    id: 3,
    title: 'ETHNC Lawn 3-Piece Unstitched',
    subtitle: 'ROYAL TILLA & EMBROIDERED NET DUPATTA',
    image: '/assets/products/ethnic_embroidered_lawn_1790107214388.png',
    badge: 'TRENDING ATELIER',
    categoryId: 'ethnic-lawn'
  }
];

export const HeroBanner = () => {
  const { setSelectedCategory } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-dark)' }}>
      <div
        style={{
          position: 'relative',
          minHeight: '78vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 1rem 6rem'
        }}
      >
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            opacity: 0.65,
            transition: 'opacity 1s ease-in-out',
            filter: 'brightness(0.85)'
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15,18,16,0.4) 0%, rgba(15,18,16,0.85) 100%)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              background: 'rgba(20, 23, 21, 0.75)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(207, 162, 75, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '2.5rem 1.5rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              color: '#ffffff'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--color-gold-muted)',
                color: 'var(--color-gold)',
                border: '1px solid var(--color-border-gold)',
                padding: '0.3rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              <Sparkles size={13} />
              <span>{slide.badge}</span>
            </div>

            <h1
              style={{
                fontSize: '2.4rem',
                lineHeight: '1.15',
                color: '#ffffff',
                marginBottom: '0.75rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600
              }}
            >
              {slide.title}
            </h1>

            <p
              style={{
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                color: 'var(--color-gold)',
                marginBottom: '2rem',
                textTransform: 'uppercase',
                fontWeight: 600
              }}
            >
              {slide.subtitle}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                className="btn-primary"
                onClick={() => {
                  setSelectedCategory(slide.categoryId);
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '25px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 15
          }}
        >
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === currentSlide ? '28px' : '8px',
                height: '8px',
                borderRadius: 'var(--radius-full)',
                background: index === currentSlide ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.4)',
                border: 'none',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};