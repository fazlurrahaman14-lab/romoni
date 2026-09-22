import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Winter Velvet Series',
    subtitle: 'COUTURE & HEAVY EMBROIDERED VELVET',
    image: '/assets/products/hero_banner_winter_1790107081859.png',
    badge: 'LUXURY RELEASE',
    categoryId: 'velvet-series'
  },
  {
    id: 2,
    title: 'Ready To Wear Pret',
    subtitle: 'AUTHENTIC PRINTED & EMBROIDERED LAWN',
    image: '/assets/products/coco_prints_vol4_1790107095197.png',
    badge: 'NEW SEASON',
    categoryId: 'luxury-pret'
  },
  {
    id: 3,
    title: 'Unstitched Luxury Lawn',
    subtitle: 'ROYAL TILLA & EMBROIDERED NET DUPATTA',
    image: '/assets/products/ethnic_embroidered_lawn_1790107214388.png',
    badge: 'TRENDING ATELIER',
    categoryId: 'unstitched-lawn'
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
          minHeight: '82vh',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: '2rem 1rem 4rem'
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
            opacity: 0.85,
            transition: 'opacity 0.8s ease-in-out',
            filter: 'contrast(1.05)'
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15,18,16,0.15) 0%, rgba(15,18,16,0.65) 75%, rgba(15,18,16,0.95) 100%)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div
            style={{
              maxWidth: '650px',
              margin: '0 auto',
              padding: '1rem',
              color: '#ffffff',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(20, 23, 21, 0.65)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: 'var(--color-gold)',
                border: '1px solid var(--color-border-gold)',
                padding: '0.35rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.85rem'
              }}
            >
              <Sparkles size={13} />
              <span>{slide.badge}</span>
            </div>

            <h1
              style={{
                fontSize: '2.5rem',
                lineHeight: '1.15',
                color: '#ffffff',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              {slide.title}
            </h1>

            <p
              style={{
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                color: 'var(--color-gold)',
                marginBottom: '1.5rem',
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
                style={{ width: 'auto', padding: '0 2rem' }}
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
            bottom: '20px',
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
                width: index === currentSlide ? '32px' : '8px',
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