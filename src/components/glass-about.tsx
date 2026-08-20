import React, { useEffect, useRef, useState } from 'react';

const DESKTOP_RADIUS = 260;
const MOBILE_RADIUS = 160;

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

  // Smooth interpolation frame loop
  const updateFrame = () => {
    if (!isInViewRef.current || !sectionRef.current) {
      rafIdRef.current = null;
      return;
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

  // Intersection Observer
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
      { threshold: 0.12 }
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

  // Pointer Handlers
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    {
      icon: '🎫',
      val: '20–25+',
      title: 'Tickets / Week',
      sub: 'Troubleshooting · Demos · SaaS QA',
    },
    {
      icon: '🤝',
      val: '40+',
      title: 'Clients Onboarded',
      sub: 'Hands-on Technical Training',
    },
    {
      icon: '🚀',
      val: '2 Live',
      title: 'SaaS Products',
      sub: 'EduBuddy · HotelBuddy Support',
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
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden select-none isolation-isolate"
      style={{
        background: 'var(--bg-primary, #CAC5BA)',
        color: '#111111',
        minWidth: '320px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        .glass-about-base {
          background-image: url('/images/About_reveal_desktop.png');
          background-position: right 2% center;
          background-size: contain;
          background-repeat: no-repeat;
        }
        .glass-about-reveal {
          background-image: url('/images/About_base_desktop.png');
          background-position: right 2% center;
          background-size: contain;
          background-repeat: no-repeat;
        }
        @media (min-width: 1440px) {
          .glass-about-base {
            background-position: right 6% center;
          }
          .glass-about-reveal {
            background-position: right 6% center;
          }
        }
        @media (max-width: 1024px) {
          .glass-about-base {
            background-position: right -10% center;
            background-size: contain;
          }
          .glass-about-reveal {
            background-position: right -10% center;
            background-size: contain;
          }
        }
        @media (max-width: 767px) {
          .glass-about-base {
            background-image: url('/images/About_reveal_mobile.png');
            background-position: center top 5%;
            background-size: contain;
          }
          .glass-about-reveal {
            background-image: url('/images/About_base_mobile.png');
            background-position: center top 5%;
            background-size: contain;
          }
        }
      `}</style>

      {/* ── Layer 0: Giant Background Watermark Text ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-start pointer-events-none select-none overflow-hidden pl-6 lg:pl-12 opacity-[0.05]"
        style={{ zIndex: 0 }}
      >
        <span
          style={{
            fontSize: 'clamp(80px, 22vw, 420px)',
            fontWeight: 900,
            letterSpacing: '-0.06em',
            lineHeight: 0.8,
            color: '#111111',
            whiteSpace: 'nowrap',
          }}
        >
          ABOUT
        </span>
      </div>

      {/* ── Layer 1: Base Image (Spider-Man shows FIRST, 100% Crystal Clear, No Blur) ── */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none glass-about-base transition-all duration-1000 ease-out ${
          hasEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
        }`}
        style={{ zIndex: 1 }}
      />

      {/* ── Layer 2: Reveal Image (Black Shirt Portrait revealed on cursor hover, 100% Crisp) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-10 glass-about-reveal"
        style={{
          zIndex: 2,
          WebkitMaskImage:
            'radial-gradient(circle var(--reveal-radius, 0px) at var(--reveal-x, -999px) var(--reveal-y, -999px), rgba(255,255,255,1) 0%, rgba(255,255,255,1) 62%, rgba(255,255,255,0.75) 78%, rgba(255,255,255,0.20) 92%, transparent 100%)',
          maskImage:
            'radial-gradient(circle var(--reveal-radius, 0px) at var(--reveal-x, -999px) var(--reveal-y, -999px), rgba(255,255,255,1) 0%, rgba(255,255,255,1) 62%, rgba(255,255,255,0.75) 78%, rgba(255,255,255,0.20) 92%, transparent 100%)',
        }}
      />

      {/* ── Layer 3: Main Content (Direct Typography, Left-Aligned with zero overlap) ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 pt-12 sm:pt-16 pb-6 flex flex-col justify-between flex-1">
        
        {/* Top Header Label */}
        <div
          className={`transition-all duration-700 delay-100 ${
            hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <span
            className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.2em] text-[#111111] uppercase px-3.5 py-1.5 rounded-full border border-black/20 bg-black/5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span style={{ color: 'var(--accent, #E8FF2A)', fontSize: '0.85rem' }}>◆</span>
            ABOUT ME / 01
          </span>
        </div>

        {/* Middle Editorial Content Block (Max-width strictly limited to left side to prevent image overlap) */}
        <div className="my-auto py-8 sm:py-10 max-w-lg lg:max-w-[460px] xl:max-w-[510px] flex flex-col gap-6">
          
          {/* Huge Editorial Heading */}
          <div
            className={`transition-all duration-800 delay-200 ${
              hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2
              className="font-black uppercase text-[#111111] leading-[0.94] tracking-[-0.04em] mb-3"
              style={{
                fontSize: 'clamp(2rem, 3.6vw, 3.6rem)',
                fontFamily: "'Inter', sans-serif",
                textShadow: '0 2px 20px rgba(0,0,0,0.06)',
              }}
            >
              PRODUCT SUPPORT &amp;<br />
              <span
                style={{
                  color: '#111111',
                  background: 'var(--accent, #E8FF2A)',
                  padding: '0 8px',
                  display: 'inline-block',
                }}
              >
                WEB DEVELOPMENT
              </span>
            </h2>
            
            <p
              className="text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#333333] mt-2 flex items-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span>Full-Stack Builder</span>
              <span>·</span>
              <span>Bug-Squasher</span>
              <span>·</span>
              <span>BCA '26</span>
            </p>
          </div>

          {/* Clean Bio Paragraphs — Directly on Page, Seamless & Modern */}
          <div
            className={`flex flex-col gap-3.5 transition-all duration-800 delay-300 ${
              hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-sm sm:text-base font-semibold text-[#111111] leading-relaxed">
              Hi, I'm <span className="font-extrabold text-black underline decoration-2 underline-offset-4 decoration-black">Mohammad Abutalha</span> — a Product Support Associate based in Kanpur, India, currently helping keep two live SaaS products, <strong>EduBuddy</strong> and <strong>HotelBuddy</strong>, running smoothly for real users.
            </p>
            
            <p className="text-xs sm:text-sm font-medium text-[#222222] leading-relaxed">
              I handle <strong>20–25+ client tickets a week</strong>, troubleshoot technical issues, and work closely with the dev team to squash bugs before they become bigger problems. I've personally onboarded <strong>40+ clients</strong> through hands-on training.
            </p>
            
            <p className="text-xs sm:text-sm font-medium text-[#333333] leading-relaxed">
              Outside of support work, I build web apps — including <a href="https://abusha.onrender.com" target="_blank" rel="noopener" className="font-bold underline text-black hover:text-[var(--accent)] transition-colors">Abusha — Fast HD Social Media Video Downloader</a> (Flask + Python) and an AI-powered telecom assistant using the Gemini API.
            </p>
          </div>

          {/* CTA Buttons (Matching Hero Action Buttons) */}
          <div
            className={`pt-2 flex flex-wrap gap-3 pointer-events-auto transition-all duration-800 delay-400 ${
              hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              id="about-hire-btn"
              onClick={() => scrollTo('contact')}
              className="btn-yellow text-xs sm:text-sm py-3 px-7 font-extrabold shadow-sm hover:shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              Hire Me
            </button>
            <button
              id="about-view-work-btn"
              onClick={() => scrollTo('projects')}
              className="btn-yellow text-xs sm:text-sm py-3 px-7 font-extrabold shadow-sm hover:shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
              style={{ background: '#111111', color: 'var(--accent, #E8FF2A)' }}
            >
              View My Work ↓
            </button>
            <a
              id="about-download-resume-btn"
              href="/Abutalha_Final_Resume (1).pdf"
              download
              target="_blank"
              rel="noreferrer"
              className="btn-outline text-xs sm:text-sm py-3 px-7 font-extrabold transition-transform hover:-translate-y-0.5 cursor-pointer"
              style={{ color: '#111111', borderColor: 'rgba(17,17,17,0.35)' }}
            >
              Download Résumé ↓
            </a>
          </div>

        </div>

        {/* ── Bottom Strip / Stats Bar (Integrated Clean Strip Matching Hero Bottom Nav) ── */}
        <div
          className={`pt-5 pb-2 border-t border-black/15 flex items-center justify-between flex-wrap gap-4 transition-all duration-800 delay-500 ${
            hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Stats Cluster */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {stats.map((s, idx) => (
              <div key={s.title} className="flex items-center gap-3">
                <div
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.40)',
                    border: '1px solid rgba(17,17,17,0.12)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span className="text-base">{s.icon}</span>
                  <div className="flex flex-col">
                    <div
                      className="font-black text-sm sm:text-base leading-none text-[#111111]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {s.val}
                    </div>
                    <div className="text-[0.56rem] uppercase tracking-wider text-[#555555] font-bold mt-0.5">
                      {s.title}
                    </div>
                  </div>
                </div>
                {idx < stats.length - 1 && (
                  <div className="w-px h-6 hidden md:block opacity-20 bg-black" />
                )}
              </div>
            ))}
          </div>

          {/* Right Status Pill */}
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
              style={{
                background: 'rgba(17,17,17,0.90)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse flex-shrink-0" />
              <span className="text-[0.62rem] font-bold uppercase tracking-wider text-white">
                Available for New Roles · 2026
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GlassAbout;

