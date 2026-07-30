import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/* ─── Count-up hook ─────────────────────────────── */
function useCountUp(target: number, durationMs = 1600, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame = 0;
    const totalFrames = Math.round((durationMs / 1000) * 60);
    const timer = setInterval(() => {
      frame++;
      setCount(Math.round(target * (frame / totalFrames)));
      if (frame >= totalFrames) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [start, target, durationMs]);
  return count;
}

/* ─── Data ──────────────────────────────────────── */
const skills = [
  { icon: '⚡', label: 'Creative' },
  { icon: '🛡️', label: 'Reliable' },
  { icon: '🎯', label: 'Strategist' },
  { icon: '🔨', label: 'Builder' },
  { icon: '⚙️', label: 'Efficient' },
];

const navItems = [
  { label: 'HOME', id: null },
  { label: 'ABOUT', id: 'about' },
  { label: 'PROJECTS', id: 'projects' },
  { label: 'SKILLS', id: 'skills' },
  { label: 'EXPERIENCE', id: 'experience' },
  { label: 'CONTACT', id: 'contact' },
];

/* ─── Props ─────────────────────────────────────── */
interface HeroSectionProps {
  /** Called by App after the page loader completes — starts the GSAP entrance */
  animate?: boolean;
}

/* ─── Component ─────────────────────────────────── */
export const HeroSection: React.FC<HeroSectionProps> = ({ animate = false }) => {
  const [activeNav, setActiveNav] = useState('HOME');
  const [countersStarted, setCountersStarted] = useState(false);

  /* Refs for GSAP targets */
  const bgTextRef = useRef<HTMLSpanElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subLineRef = useRef<HTMLSpanElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const projectCount = useCountUp(6, 1600, countersStarted);
  const expYears = useCountUp(2, 1200, countersStarted);

  /* ── GSAP entrance (triggered by animate prop) ── */
  useEffect(() => {
    if (!animate) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => setCountersStarted(true),
    });

    // 1. Giant "TALHA" bg text — slide in from LEFT
    tl.fromTo(
      bgTextRef.current,
      { opacity: 0, x: -350, scaleX: 0.92 },
      { opacity: 1, x: 0, scaleX: 1, duration: 1.25, ease: 'power4.out' },
      0
    );

    // 2. Photo — scale + fade in (slight delay so bg text comes first)
    tl.fromTo(
      photoRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.0 },
      0.15
    );

    // 3. Heading — clip/slide up (premium text reveal)
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 55, skewY: 2 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.85 },
      0.35
    );

    // 4. Yellow "Applied" highlight word (sub-line)
    tl.fromTo(
      subLineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.5
    );

    // 5. CTA buttons
    tl.fromTo(
      btnsRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55 },
      0.62
    );

    // 6. Bottom nav bar (whole strip)
    tl.fromTo(
      navBarRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.72
    );

    // 7. Stats cards
    tl.fromTo(
      statsRef.current?.children ?? [],
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
      0.78
    );

    // 8. Skills + description (right side)
    tl.fromTo(
      [skillsRef.current, descRef.current],
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.55, stagger: 0.1 },
      0.82
    );

    return () => { tl.kill(); };
  }, [animate]);



  /* ── Smooth scroll helper ─────────────────────── */
  const scrollTo = (id: string | null, label: string) => {
    setActiveNav(label);
    if (!id) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  /* ── Render ──────────────────────────────────── */
  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh', background: '#CAC5BA' }}
    >
      {/* ── Layer 0: Giant yellow "ABU" background ─ */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <span
          ref={bgTextRef}
          style={{
            fontSize: 'clamp(180px, 32vw, 480px)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            color: '#E8FF2A',
            letterSpacing: '-0.06em',
            lineHeight: 0.85,
            whiteSpace: 'nowrap',
            willChange: 'transform, opacity',
            opacity: 0,           /* hidden until GSAP plays */
          }}
        >
          TALHA
        </span>
      </div>

      {/* ── Layer 1: Photo ─────────────────────── */}
      <div
        ref={photoRef}
        className="absolute inset-0 flex items-end justify-center pointer-events-none select-none"
        style={{ zIndex: 1, opacity: 0, willChange: 'transform, opacity' }}
      >
        <img
          src="/hero-transparent.png"
          alt="Mohammad Abutalha"
          style={{
            height: '96vh',
            maxHeight: '900px',
            width: 'auto',
            objectFit: 'cover',
            objectPosition: 'top center',
            filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.12))',
          }}
          draggable={false}
        />
      </div>

      {/* ── Layer 2: Bottom gradient fade ──────── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '36vh',
          background: 'linear-gradient(to top, #CAC5BA 0%, transparent 100%)',
          zIndex: 2,
        }}
      />

      {/* ── Layer 3: All overlay content ───────── */}
      <div
        className="relative flex flex-col"
        style={{ minHeight: '100vh', zIndex: 3 }}
      >
        {/* Spacer — pushes content to bottom */}
        <div className="flex-1" />

        {/* Bottom content area */}
        <div className="w-full px-5 sm:px-8 md:px-10 pb-0">

          {/* ── HEADING ─────────────────────────── */}
          <h1
            ref={headingRef}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 7.5vw, 8rem)',
              color: '#ffffff',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              textShadow: '0 4px 40px rgba(0,0,0,0.15)',
              marginBottom: '0.25em',
              opacity: 0,         /* hidden until GSAP */
              willChange: 'transform, opacity',
            }}
          >
            Web Dev,<br />
            <span ref={subLineRef} style={{ color: '#E8FF2A', display: 'inline-block', opacity: 0 }}>
              Applied
            </span>
            <br />
            Creatively
          </h1>

          {/* ── CTA BUTTONS ─────────────────────── */}
          <div
            ref={btnsRef}
            className="flex gap-3 mb-5 sm:mb-6"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            <button
              id="hero-hire-btn"
              onClick={() => scrollTo('contact', 'CONTACT')}
              className="btn-yellow"
              style={{ fontSize: '0.82rem', padding: '12px 28px', fontWeight: 800 }}
            >
              Hire Me
            </button>
            <button
              id="hero-about-btn"
              onClick={() => scrollTo('about', 'ABOUT')}
              className="btn-outline"
              style={{
                fontSize: '0.82rem',
                padding: '12px 28px',
                fontWeight: 800,
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.55)',
              }}
            >
              About Me
            </button>
          </div>

          {/* ── BOTTOM NAV BAR ──────────────────── */}
          <nav
            ref={navBarRef}
            className="flex items-center flex-wrap gap-x-0 gap-y-2 pb-5 sm:pb-7"
            style={{
              borderTop: '1px solid rgba(17,17,17,0.15)',
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          >
            {/* Left cluster: identity + stat cards */}
            <div
              ref={statsRef}
              className="flex items-center gap-4 sm:gap-5 pt-3 flex-wrap"
            >
              {/* Identity blurb */}
              <div className="flex flex-col mr-1">
                <span className="text-xs font-semibold text-[#444] leading-tight">Product Support Associate</span>
                <span className="text-xs font-semibold text-[#444] leading-tight">That's Abutalha.</span>
              </div>

              <div className="w-px h-8 hidden sm:block" style={{ background: 'rgba(17,17,17,0.18)' }} />

              {/* Stat card 1 */}
              <div
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl"
                style={{
                  background: 'rgba(202,197,186,0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(17,17,17,0.12)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: '#E8FF2A' }}
                >
                  🚀
                </div>
                <div>
                  <div
                    className="font-black text-base leading-none"
                    style={{ fontFamily: "'Inter'", color: '#111' }}
                  >
                    {projectCount}+
                  </div>
                  <div className="text-[0.58rem] uppercase tracking-wider text-[#666] font-semibold">Projects</div>
                </div>
              </div>

              {/* Stat card 2 */}
              <div
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl"
                style={{
                  background: 'rgba(202,197,186,0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(17,17,17,0.12)',
                }}
              >
                <div className="flex flex-col">
                  <div
                    className="font-black leading-none"
                    style={{ fontSize: '1.4rem', fontFamily: "'Inter'", color: '#E8FF2A' }}
                  >
                    {expYears}+
                  </div>
                  <div className="text-[0.58rem] uppercase tracking-wider text-[#666] font-semibold">
                    Years<br />Exp.
                  </div>
                </div>
              </div>
            </div>

            {/* Flexible spacers */}
            <div className="flex-1 hidden md:block" />

            {/* Skills list */}
            <div
              ref={skillsRef}
              className="flex-col gap-0.5 pt-3 mr-6 hidden md:flex"
              style={{ willChange: 'transform, opacity' }}
            >
              {skills.map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <span className="text-xs">{s.icon}</span>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#333]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-px h-10 mx-4 hidden md:block" style={{ background: 'rgba(17,17,17,0.18)' }} />

            {/* Short description */}
            <p
              ref={descRef}
              className="text-xs text-[#444] leading-relaxed max-w-[200px] pt-3 hidden lg:block"
              style={{ willChange: 'transform, opacity' }}
            >
              Crafting fast, clean &amp; interactive web experiences — turning complex ideas into sleek digital realities.
            </p>

            <div className="flex-1 hidden sm:block" />

            {/* Right nav links */}
            <div className="flex items-center gap-3 sm:gap-4 pt-3 flex-wrap">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.id, item.label)}
                  className="text-[0.6rem] font-bold uppercase tracking-[0.12em] cursor-pointer border-none bg-transparent outline-none transition-colors duration-200 hover:text-[#111]"
                  style={{ color: activeNav === item.label ? '#111' : '#666' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* ── Vertical sidebar (scroll-triggered Framer motion kept for compatibility) */}
      {/* Sidebar is now handled by the StickyNav component in App.tsx */}
    </section>
  );
};

export default HeroSection;
