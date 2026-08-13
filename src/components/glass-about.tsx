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

  // Entrance animation state (runs once on first scroll view)
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

  // IntersectionObserver to start/stop rAF loop & trigger entrance animation
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

  // Pointer event handlers
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
      className="relative w-full min-h-[100dvh] overflow-hidden select-none isolation-isolate touch-none"
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
        }
        .glass-about-reveal {
          background-image: url('/images/About_base_desktop.png');
        }
        @media (max-width: 767px) and (orientation: portrait) {
          .glass-about-base {
            background-image: url('/images/About_reveal_mobile.png');
          }
          .glass-about-reveal {
            background-image: url('/images/About_base_mobile.png');
          }
        }
        @media (max-width: 767px) and (orientation: landscape) {
          .glass-about-base {
            background-image: url('/images/About_reveal_desktop.png');
          }
          .glass-about-reveal {
            background-image: url('/images/About_base_desktop.png');
          }
        }
      `}</style>

      {/* Layer 1: Base Image (Anatomical Glass Portrait shows FIRST) */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-center bg-no-repeat bg-cover pointer-events-none glass-about-base transition-all duration-1000 ease-out ${
          hasEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.035]'
        }`}
      />

      {/* Layer 2: Reveal Image (Human Portrait revealed on cursor hover) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-center bg-no-repeat bg-cover pointer-events-none z-10 glass-about-reveal"
        style={{
          WebkitMaskImage:
            'radial-gradient(circle var(--reveal-radius, 0px) at var(--reveal-x, -999px) var(--reveal-y, -999px), rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.94) 62%, rgba(255,255,255,0.72) 76%, rgba(255,255,255,0.28) 90%, transparent 100%)',
          maskImage:
            'radial-gradient(circle var(--reveal-radius, 0px) at var(--reveal-x, -999px) var(--reveal-y, -999px), rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.94) 62%, rgba(255,255,255,0.72) 76%, rgba(255,255,255,0.28) 90%, transparent 100%)',
        }}
      />

      {/* Layer 3: Technical Grid + Large Fine-line Circle */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
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
            right: '8%',
            top: '-30%',
          }}
        />
        <div
          className="md:hidden absolute rounded-full border border-[#648cc8]/25 pointer-events-none"
          style={{
            width: '150vw',
            height: '150vw',
            right: '-76%',
            top: '-8%',
          }}
        />
      </div>

      {/* Layer 4: Content Overlay (Scoped strictly to left column so face is untouched) */}
      <div className="relative z-30 w-full min-h-[100dvh] flex flex-col justify-between p-4 sm:p-8 md:p-10 max-w-7xl mx-auto pointer-events-none">
        
        {/* Top spacer (No top text header) */}
        <div className="h-6 sm:h-10" />

        {/* Editorial Heading (Constrained strictly to left column max-w-[420px] so it NEVER touches face) */}
        <div
          className={`my-auto max-w-[340px] sm:max-w-[420px] md:max-w-[450px] transition-all duration-800 delay-200 ${
            hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2
            className="font-black uppercase text-[#111111] leading-[0.96] tracking-[-0.05em]"
            style={{
              fontSize: 'clamp(1.4rem, 2.6vw, 2.6rem)',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            PRODUCT SUPPORT &amp;<br />
            WEB DEVELOPMENT<br />
            <span className="text-[#0055FF] underline decoration-wavy decoration-1 underline-offset-4">APPLIED CREATIVELY</span>.
          </h2>
        </div>

        {/* Bottom Section: Bio Copy & Pill Button */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 sm:pb-6 transition-all duration-800 delay-300 ${
            hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Bio text (Left side, compact) */}
          <div className="max-w-[340px] sm:max-w-[400px]">
            <p className="text-xs sm:text-sm font-medium text-[#222222] leading-relaxed backdrop-blur-md bg-white/50 p-3.5 sm:p-4 rounded-2xl border border-white/70 shadow-sm">
              I am Mohammad Abutalha — a Product Support Associate and BCA graduate dedicated to building fast, clean, and interactive user interfaces. I specialize in SaaS operations support, front-end state flow, and AI integrations.
            </p>
          </div>

          {/* White Pill Button */}
          <div className="pointer-events-auto flex-shrink-0">
            <a
              href="/Abutalha_Final_Resume (1).pdf"
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-[#111111] font-extrabold text-xs uppercase tracking-wider border border-black/15 shadow-xl hover:bg-[#111111] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Download Résumé</span>
              <span className="text-base leading-none">↓</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GlassAbout;
