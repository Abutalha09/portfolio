import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

/* ─── Section definitions ───────────────────────── */
const SECTIONS = [
  { id: 'hero',       label: 'HOME',       icon: '🏠' },
  { id: 'about',      label: 'ABOUT ME',   icon: '👤' },
  { id: 'experience', label: 'EXPERIENCE', icon: '🛠️' },
  { id: 'projects',   label: 'PROJECTS',   icon: '💼' },
  { id: 'skills',     label: 'SKILLS',     icon: '⚡' },
  { id: 'terminal',   label: 'TERMINAL',   icon: '💻' },
  { id: 'education',  label: 'EDUCATION',  icon: '🎓' },
  { id: 'contact',    label: 'CONTACT',    icon: '💬' },
];

export const StickyNav: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('hero');
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const visibleRef = useRef(false);

  /* ── GSAP show/hide ───────────────────────────── */
  const show = useCallback(() => {
    if (visibleRef.current) return;
    visibleRef.current = true;
    setVisible(true);
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, x: -35, filter: 'blur(8px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out' }
      );
    }
    if (mobileNavRef.current) {
      gsap.fromTo(
        mobileNavRef.current,
        { opacity: 0, y: -25, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' }
      );
    }
  }, []);

  const hide = useCallback(() => {
    if (!visibleRef.current) return;
    visibleRef.current = false;
    if (navRef.current) {
      gsap.to(navRef.current, {
        opacity: 0,
        x: -35,
        filter: 'blur(8px)',
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => setVisible(false),
      });
    }
    if (mobileNavRef.current) {
      gsap.to(mobileNavRef.current, {
        opacity: 0,
        y: -25,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, []);

  /* ── Hero visibility observer → show/hide nav ── */
  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) show();
        else hide();
      },
      {
        root: null,
        rootMargin: '-80px 0px 0px 0px',
        threshold: 0,
      }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [show, hide]);

  /* ── Active section tracking ─────────────────── */
  useEffect(() => {
    const sectionEls: [string, Element][] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionEls.push([id, el]);
    });

    if (!sectionEls.length) return;

    const visibilityMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap.set(entry.target.id, entry.intersectionRatio);
        });

        let maxRatio = 0;
        let mostVisible = 'hero';
        visibilityMap.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisible = id;
          }
        });
        setActive(mostVisible);
      },
      {
        root: null,
        rootMargin: '0px 0px -30% 0px',
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
      }
    );

    sectionEls.forEach(([, el]) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Scroll helper ────────────────────────────── */
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* ── Copy email helper ───────────────────────── */
  const copyEmail = () => {
    navigator.clipboard.writeText('mabutalha0923@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeObj = SECTIONS.find((s) => s.id === active) || SECTIONS[0];

  return (
    <>
      {/* ── Desktop Left Sticky Sidebar ─────────────── */}
      <div
        ref={navRef}
        className="fixed left-4 top-5 bottom-5 z-50 hidden lg:flex flex-col gap-2 w-[195px]"
        style={{
          opacity: 0,
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        {/* Card 1: Brand */}
        <div
          className="p-3 rounded-xl flex flex-col gap-1.5 shadow-sm"
          style={{
            background: 'var(--bg-light)',
            color: 'var(--text-dark)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--border)',
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="font-black text-[0.65rem] px-2 py-0.5 rounded tracking-wider shadow-sm"
              style={{ background: 'var(--accent)', color: '#111111', fontFamily: "'Inter'" }}
            >
              TALHA®
            </span>
            <span className="text-[0.55rem] font-bold text-[var(--text-mid)] uppercase tracking-widest">
              PORTFOLIO
            </span>
          </div>
          <p className="text-[0.64rem] text-[var(--text-mid)] leading-tight font-medium">
            Delivering Web builds that merge creativity &amp; technical value.
          </p>
        </div>

        {/* Card 2: Stats */}
        <div
          className="p-2.5 rounded-xl flex items-center justify-around shadow-sm"
          style={{
            background: 'var(--bg-light)',
            color: 'var(--text-dark)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--border)',
          }}
        >
          <div className="text-center">
            <div className="font-black text-xs text-[var(--text-dark)]" style={{ fontFamily: "'Inter'" }}>
              6+
            </div>
            <div className="text-[0.52rem] uppercase tracking-wider text-[var(--text-mid)] font-bold">
              Projects
            </div>
          </div>

          <div className="w-px h-6" style={{ background: 'var(--border)' }} />

          <div className="text-center">
            <div className="font-black text-xs text-[var(--text-dark)]" style={{ fontFamily: "'Inter'" }}>
              2+
            </div>
            <div className="text-[0.52rem] uppercase tracking-wider text-[var(--text-mid)] font-bold">
              Years Exp.
            </div>
          </div>
        </div>

        {/* Card 3: Navigation Links */}
        <div
          className="p-2 rounded-xl flex flex-col gap-1 flex-1 justify-center shadow-sm overflow-y-auto"
          style={{
            background: 'var(--bg-light)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--border)',
          }}
        >
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[0.62rem] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer border-none"
                style={{
                  background: isActive ? 'var(--accent)' : 'var(--bg-card)',
                  color: isActive ? '#111111' : 'var(--text-dark)',
                  boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
                  transform: isActive ? 'translateX(2px)' : 'none',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <span className="text-xs">{s.icon}</span>
                <span className="truncate">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Card 4: Quick Copy Email */}
        <div
          className="p-2 rounded-lg flex items-center justify-between shadow-sm"
          style={{
            background: 'var(--bg-light)',
            color: 'var(--text-dark)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--border)',
          }}
        >
          <span className="truncate text-[0.6rem] font-bold text-[var(--text-dark)]">
            mabutalha0923@gmail.com
          </span>
          <button
            onClick={copyEmail}
            title="Copy email"
            className="p-0.5 rounded cursor-pointer border-none bg-transparent hover:bg-[var(--accent)] transition-colors text-[0.65rem]"
          >
            {copied ? '✅' : '📋'}
          </button>
        </div>

        {/* Card 5: Book a Call */}
        <button
          onClick={() => scrollTo('contact')}
          className="w-full py-2.5 rounded-xl font-black text-[0.65rem] uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm cursor-pointer border-none"
          style={{
            background: 'var(--accent)',
            color: '#111111',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Book a Call
        </button>
      </div>

      {/* ── Mobile Top Sticky Bar (Shown on Mobile/Tablet < 1024px) ── */}
      <div
        ref={mobileNavRef}
        className="fixed top-3 left-3 right-3 z-50 flex lg:hidden items-center justify-between px-4 py-2.5 rounded-2xl shadow-xl transition-all"
        style={{
          opacity: 0,
          pointerEvents: visible ? 'auto' : 'none',
          background: 'var(--bg-light)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Left: Brand & Active Badge */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo('hero')}
            className="font-black text-xs px-2.5 py-1 rounded bg-[var(--accent)] text-[#111] uppercase tracking-wider"
          >
            TALHA®
          </button>
          <span className="text-[0.65rem] font-bold text-[var(--text-dark)] flex items-center gap-1">
            <span>{activeObj.icon}</span>
            <span className="uppercase tracking-wider">{activeObj.label}</span>
          </span>
        </div>

        {/* Right: Hamburger / Toggle Drawer Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo('contact')}
            className="px-3 py-1 rounded-full bg-[var(--accent)] text-[#111] font-extrabold text-[0.65rem] uppercase tracking-wider"
          >
            Hire
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-dark)] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            <span className="text-base leading-none">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Overlay */}
      {mobileMenuOpen && visible && (
        <div
          className="fixed top-16 left-3 right-3 z-50 p-4 rounded-2xl flex flex-col gap-2 shadow-2xl lg:hidden max-h-[80vh] overflow-y-auto"
          style={{
            background: 'var(--bg-light)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border)',
          }}
        >
          <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-mid)] mb-1 px-1">
            Navigation Menu
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all border-none"
                  style={{
                    background: isActive ? 'var(--accent)' : 'var(--bg-card)',
                    color: isActive ? '#111' : 'var(--text-dark)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span>{s.icon}</span>
                  <span className="truncate">{s.label}</span>
                </button>
              );
            })}
          </div>
          <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between mt-1">
            <span className="text-[0.65rem] font-medium text-[var(--text-mid)]">mabutalha0923@gmail.com</span>
            <button
              onClick={copyEmail}
              className="px-3 py-1 rounded bg-[var(--bg-card)] border border-[var(--border)] text-xs font-bold text-[var(--text-dark)]"
            >
              {copied ? 'Copied! ✅' : 'Copy Email 📋'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StickyNav;

