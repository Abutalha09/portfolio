import React, { useEffect, useRef, useState } from 'react';

const DESKTOP_RADIUS = 235;
const MOBILE_RADIUS = 150;

export const GlassAbout: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rawPosRef = useRef({ x: -999, y: -999 });
  const smoothPosRef = useRef({ x: -999, y: -999 });
  const currentRadiusRef = useRef(0);
  const targetRadiusRef = useRef(0);
  const isTouchTrackingRef = useRef(false);
  const isInViewRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Entrance animation state
  const [hasEntered, setHasEntered] = useState(false);

  // Frame Loop (Interpolation)
  const updateFrame = () => {
    if (!isInViewRef.current || !sectionRef.current) {
      rafIdRef.current = null;
      return;
    }

    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const posFactor = prefersReduced ? 1 : 0.14;
    const radiusFactor = prefersReduced ? 1 : 0.12;

    smoothPosRef.current.x += (rawPosRef.current.x - smoothPosRef.current.x) * posFactor;
    smoothPosRef.current.y += (rawPosRef.current.y - smoothPosRef.current.y) * posFactor;
    currentRadiusRef.current += (targetRadiusRef.current - currentRadiusRef.current) * radiusFactor;

    if (Math.abs(currentRadiusRef.current - targetRadiusRef.current) < 0.1 && targetRadiusRef.current === 0) {
      currentRadiusRef.current = 0;
    }

    if (sectionRef.current) {
      sectionRef.current.style.setProperty('--reveal-x', `${smoothPosRef.current.x}px`);
      sectionRef.current.style.setProperty('--reveal-y', `${smoothPosRef.current.y}px`);
      sectionRef.current.style.setProperty('--reveal-radius', `${currentRadiusRef.current}px`);
    }

    rafIdRef.current = requestAnimationFrame(updateFrame);
  };

  // IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          if (!hasEntered) setHasEntered(true);
          if (!rafIdRef.current) {
            rafIdRef.current = requestAnimationFrame(updateFrame);
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [hasEntered]);

  // Pointer handlers
  const handlePointerEnter = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse') {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        rawPosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        if (smoothPosRef.current.x === -999) {
          smoothPosRef.current = { ...rawPosRef.current };
        }
      }
      targetRadiusRef.current = DESKTOP_RADIUS;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    rawPosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    if (e.pointerType === 'mouse') {
      targetRadiusRef.current = DESKTOP_RADIUS;
    } else if (isTouchTrackingRef.current) {
      targetRadiusRef.current = MOBILE_RADIUS;
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse') {
      targetRadiusRef.current = 0;
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') {
      isTouchTrackingRef.current = true;
      try {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      } catch (_) {}
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        rawPosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        smoothPosRef.current = { ...rawPosRef.current };
      }
      targetRadiusRef.current = MOBILE_RADIUS;
    }
  };

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') {
      isTouchTrackingRef.current = false;
      targetRadiusRef.current = 0;
    }
  };

  const bottomHighlights = [
    {
      title: 'PRODUCT SUPPORT',
      tags: 'Troubleshooting · Demos · SaaS Operations',
      icon: '🎧',
    },
    {
      title: 'WEB DEVELOPMENT',
      tags: 'HTML · CSS · JavaScript · Python',
      icon: '⚡',
    },
    {
      title: 'TESTING',
      tags: 'Feature Testing · Bug Reporting · QA',
      icon: '🧪',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUpOrCancel}
      onPointerCancel={handlePointerUpOrCancel}
      className="relative w-full min-h-[100dvh] py-12 sm:py-16 overflow-hidden select-none isolation-isolate touch-none flex flex-col justify-between"
      style={{
        background: '#edf5ff',
        color: '#111111',
        minWidth: '320px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        .glass-about-base {
          background-image: url('/images/About_reveal_desktop.png');
          background-position: right top;
          background-size: contain;
        }
        .glass-about-reveal {
          background-image: url('/images/About_base_desktop.png');
          background-position: right top;
          background-size: contain;
        }
        @media (max-width: 1024px) {
          .glass-about-base {
            background-position: 85% top;
            background-size: cover;
          }
          .glass-about-reveal {
            background-position: 85% top;
            background-size: cover;
          }
        }
        @media (max-width: 767px) and (orientation: portrait) {
          .glass-about-base {
            background-image: url('/images/About_reveal_mobile.png');
            background-position: center top;
            background-size: cover;
          }
          .glass-about-reveal {
            background-image: url('/images/About_base_mobile.png');
            background-position: center top;
            background-size: cover;
          }
        }
        @media (max-width: 767px) and (orientation: landscape) {
          .glass-about-base {
            background-image: url('/images/About_reveal_desktop.png');
            background-position: right top;
            background-size: contain;
          }
          .glass-about-reveal {
            background-image: url('/images/About_base_desktop.png');
            background-position: right top;
            background-size: contain;
          }
        }
      `}</style>

      {/* Layer 1: Base Image (Anatomical Glass Portrait shows FIRST, positioned top to avoid cropping) */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-no-repeat pointer-events-none glass-about-base transition-all duration-1000 ease-out ${
          hasEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.035]'
        }`}
      />

      {/* Layer 2: Reveal Image (Human Portrait revealed on cursor hover) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-no-repeat pointer-events-none z-10 glass-about-reveal"
        style={{
          WebkitMaskImage:
            'radial-gradient(circle var(--reveal-radius, 0px) at var(--reveal-x, -999px) var(--reveal-y, -999px), rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.94) 62%, rgba(255,255,255,0.72) 76%, rgba(255,255,255,0.28) 90%, transparent 100%)',
          maskImage:
            'radial-gradient(circle var(--reveal-radius, 0px) at var(--reveal-x, -999px) var(--reveal-y, -999px), rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.94) 62%, rgba(255,255,255,0.72) 76%, rgba(255,255,255,0.28) 90%, transparent 100%)',
        }}
      />

      {/* Layer 3: Technical Grid & Left Backdrop for Pristine Readability */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {/* Soft paper gradient overlay on left column for high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#edf5ff] via-[#edf5ff]/90 to-transparent w-full md:w-[70%] z-0 pointer-events-none" />

        {/* Desktop 12-column grid lines */}
        <div className="hidden md:grid grid-cols-12 h-full w-full max-w-7xl mx-auto px-8 opacity-15">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-[#648cc8]/30 h-full first:border-l" />
          ))}
        </div>

        {/* Mobile 4-column grid lines */}
        <div className="grid md:hidden grid-cols-4 h-full w-full px-5 opacity-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-r border-[#648cc8]/40 h-full first:border-l" />
          ))}
        </div>

        {/* Oversized Fine-line Background Circle */}
        <div
          className="absolute rounded-full border border-[#648cc8]/20 pointer-events-none"
          style={{
            width: 'min(78vw, 72rem)',
            height: 'min(78vw, 72rem)',
            right: '5%',
            top: '-25%',
          }}
        />
      </div>

      {/* Layer 4: Content Overlay */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-10 flex flex-col justify-between flex-1 pointer-events-none">
        
        {/* Top Header: Left Section Label */}
        <div className={`pt-2 mb-6 sm:mb-8 transition-all duration-700 delay-100 ${
          hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <span
            className="inline-block text-[0.68rem] font-mono font-bold tracking-[0.2em] text-[#111111] uppercase px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/15 shadow-sm pointer-events-auto"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            ABOUT ME / 01
          </span>
        </div>

        {/* Middle Section: Editorial Heading & Wider About Bio Card */}
        <div className="flex flex-col gap-6 sm:gap-8 my-auto max-w-2xl">
          
          {/* Heading */}
          <div className={`transition-all duration-800 delay-200 ${
            hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2
              className="font-black uppercase text-[#111111] leading-[0.98] tracking-[-0.05em]"
              style={{
                fontSize: 'clamp(1.6rem, 3.2vw, 3.2rem)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              PRODUCT SUPPORT &amp;<br />
              WEB DEVELOPMENT<br />
              <span className="text-[#0055FF] underline decoration-wavy decoration-1 underline-offset-4">WITH A BUILDER'S MINDSET</span>.
            </h2>
          </div>

          {/* Wider About Bio Card */}
          <div className={`transition-all duration-800 delay-300 ${
            hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <div className="w-full backdrop-blur-md bg-white/60 p-5 sm:p-6 rounded-2xl border border-white/80 shadow-md">
              <p className="text-xs sm:text-sm md:text-base font-medium text-[#111111] leading-relaxed">
                I’m Mohammad Abutalha — a Product Support Associate and BCA graduate focused on product support, software testing, and web development. My experience includes troubleshooting SaaS products, testing new features, managing application data, and conducting product demos. Alongside my professional work, I build web applications and practical projects with HTML, CSS, JavaScript and Python.
              </p>

              {/* Prominent Download Résumé Button */}
              <div className="mt-5 pt-2 pointer-events-auto">
                <a
                  href="/Abutalha_Final_Resume (1).pdf"
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#E8FF2A] hover:bg-[#d8ef18] text-[#111111] font-black text-xs uppercase tracking-widest border border-black/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>Download Résumé</span>
                  <span className="text-base leading-none">↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Highlights (3 Cards / Columns) */}
        <div className={`mt-8 sm:mt-12 transition-all duration-800 delay-400 ${
          hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-3xl">
            {bottomHighlights.map((item) => (
              <div
                key={item.title}
                className="p-3.5 sm:p-4 rounded-xl bg-white/70 backdrop-blur-md border border-white/90 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{item.icon}</span>
                  <h4
                    className="font-black text-xs uppercase tracking-wider text-[#111111]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.title}
                  </h4>
                </div>
                <p className="text-[0.68rem] font-semibold text-[#444444] leading-normal">
                  {item.tags}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default GlassAbout;

