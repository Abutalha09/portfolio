import React, { useEffect, useRef, useState } from 'react';
import { useAnimate, stagger } from 'framer-motion';
import { Sparkles, ShieldCheck, Target, Hammer, Gauge } from 'lucide-react';

/* ─── Reduced-motion preference ─────────────────── */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── Entrance easings (cubic-bézier equivalents of the former GSAP eases) ── */
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];  // ≈ power3.out
const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];  // ≈ power4.out

/* ─── Cycling role typewriter hook ──────────────── */
const ROLES = ['Product Support Associate', 'Frontend Developer', 'QA & Software Tester', 'Builder of Web Apps'];
function useTypewriter(active: boolean) {
  const [reduced] = useState(prefersReducedMotion);
  const [display, setDisplay] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pause' | 'erasing'>('typing');
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;
    let timer: ReturnType<typeof setTimeout>;
    const current = ROLES[roleIdx];

    if (phase === 'typing') {
      if (charIdx < current.length) {
        timer = setTimeout(() => {
          setDisplay(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        }, 52);
      } else {
        timer = setTimeout(() => setPhase('pause'), 1600);
      }
    } else if (phase === 'pause') {
      timer = setTimeout(() => setPhase('erasing'), 200);
    } else if (phase === 'erasing') {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          setDisplay(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        }, 28);
      } else {
        timer = setTimeout(() => {
          setRoleIdx(r => (r + 1) % ROLES.length);
          setPhase('typing');
        }, 120);
      }
    }
    return () => clearTimeout(timer);
  }, [active, reduced, phase, charIdx, roleIdx]);

  return reduced ? ROLES[0] : display;
}

/* ─── Count-up hook ─────────────────────────────── */
function useCountUp(target: number, durationMs = 1600, start = false) {
  const [reduced] = useState(prefersReducedMotion);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || reduced) return;
    let frame = 0;
    const totalFrames = Math.round((durationMs / 1000) * 60);
    const timer = setInterval(() => {
      frame++;
      setCount(Math.round(target * (frame / totalFrames)));
      if (frame >= totalFrames) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [start, target, durationMs, reduced]);
  return reduced ? target : count;
}

/* ─── Data ──────────────────────────────────────── */
const skills = [
  { Icon: Sparkles,    label: 'Creative' },
  { Icon: ShieldCheck, label: 'Reliable' },
  { Icon: Target,      label: 'Strategist' },
  { Icon: Hammer,      label: 'Builder' },
  { Icon: Gauge,       label: 'Efficient' },
];

const navItems = [
  { label: 'HOME', id: null },
  { label: 'ABOUT', id: 'about' },
  { label: 'EXPERIENCE', id: 'experience' },
  { label: 'PROJECTS', id: 'projects' },
  { label: 'SKILLS', id: 'skills' },
  { label: 'TERMINAL', id: 'terminal' },
  { label: 'EDUCATION', id: 'education' },
  { label: 'CONTACT', id: 'contact' },
];


/* ─── Props ─────────────────────────────────────── */
interface HeroSectionProps {
  /** Called by App after the page loader completes — starts the entrance animation */
  animate?: boolean;
}

/* ─── Component ─────────────────────────────────── */
export const HeroSection: React.FC<HeroSectionProps> = ({ animate = false }) => {
  const [activeNav, setActiveNav] = useState('HOME');
  const [countersStarted, setCountersStarted] = useState(false);

  /* Refs for entrance targets */
  const bgTextRef = useRef<HTMLSpanElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subLineRef = useRef<HTMLSpanElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [scope, runAnimation] = useAnimate();

  const projectCount = useCountUp(6, 1600, countersStarted);
  const expYears = useCountUp(2, 1200, countersStarted);
  const roleText = useTypewriter(countersStarted);

  /* ── Entrance animation (triggered by animate prop) ── */
  useEffect(() => {
    if (!animate) return;

    const bg = bgTextRef.current;
    const photo = photoRef.current;
    const heading = headingRef.current;
    const sub = subLineRef.current;
    const btns = btnsRef.current;
    const nav = navBarRef.current;
    const skills = skillsRef.current;
    const desc = descRef.current;
    const statsChildren = statsRef.current
      ? Array.from(statsRef.current.children)
      : [];

    if (!bg || !photo || !heading || !sub || !btns || !nav || !skills || !desc) return;

    // Reduced motion: reveal everything instantly, no transforms.
    // (Counters/typewriter hooks return their final values on their own.)
    if (prefersReducedMotion()) {
      runAnimation(
        [bg, photo, heading, sub, btns, nav, skills, desc, ...statsChildren],
        { opacity: 1, x: 0, y: 0, scale: 1, scaleX: 1, skewY: 0 },
        { duration: 0 }
      );
      setCountersStarted(true);
      return;
    }

    // Pre-set the from-state for elements that reveal *after* their container
    // (the nav strip) has already faded in, so they don't flash in first.
    runAnimation(statsChildren, { opacity: 0, y: 16 }, { duration: 0 });
    runAnimation([skills, desc], { opacity: 0, x: 20 }, { duration: 0 });

    // Orchestrated entrance — mirrors the former GSAP timeline positions.
    const controls = runAnimation([
      [bg,      { opacity: [0, 1], x: [-350, 0], scaleX: [0.92, 1] }, { duration: 1.25, ease: EASE_EXPO, at: 0 }],
      [photo,   { opacity: [0, 1], scale: [0.9, 1], y: [30, 0] },     { duration: 1.0,  ease: EASE_OUT, at: 0.15 }],
      [heading, { opacity: [0, 1], y: [55, 0], skewY: [2, 0] },       { duration: 0.85, ease: EASE_OUT, at: 0.35 }],
      [sub,     { opacity: [0, 1], y: [20, 0] },                      { duration: 0.6,  ease: EASE_OUT, at: 0.5 }],
      [btns,    { opacity: [0, 1], y: [24, 0] },                      { duration: 0.55, ease: EASE_OUT, at: 0.62 }],
      [nav,     { opacity: [0, 1], y: [18, 0] },                      { duration: 0.6,  ease: EASE_OUT, at: 0.72 }],
      [statsChildren,   { opacity: [0, 1], y: [16, 0] }, { duration: 0.5,  ease: EASE_OUT, delay: stagger(0.1), at: 0.78 }],
      [[skills, desc],  { opacity: [0, 1], x: [20, 0] }, { duration: 0.55, ease: EASE_OUT, delay: stagger(0.1), at: 0.82 }],
    ]);

    let cancelled = false;
    controls.then(() => {
      if (!cancelled) setCountersStarted(true);
    });

    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [animate, runAnimation]);



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
      ref={scope}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}
    >
      {/* ── Layer 0: Giant yellow "TALHA" background ─ */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <span
          ref={bgTextRef}
          style={{
            fontSize: 'clamp(70px, 24vw, 480px)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            color: 'var(--accent)',
            letterSpacing: '-0.06em',
            lineHeight: 0.85,
            whiteSpace: 'nowrap',
            willChange: 'transform, opacity',
            opacity: 0,           /* hidden until entrance plays */
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
          src="/hero-transparent.webp"
          alt="Mohammad Abutalha"
          className="h-[52vh] sm:h-[80vh] lg:h-[96vh] max-h-[900px] w-auto object-cover object-top filter drop-shadow-2xl"
          draggable={false}
        />
      </div>

      {/* ── Layer 2: Bottom gradient fade ──────── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '36vh',
          background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)',
          zIndex: 2,
        }}
      />

      {/* ── Layer 3: All overlay content ───────── */}
      <div
        className="relative flex flex-col min-h-screen"
        style={{ zIndex: 3 }}
      >
        {/* Spacer — pushes content to bottom */}
        <div className="flex-1 min-h-[140px]" />

        {/* Bottom content area */}
        <div className="w-full px-4 sm:px-8 md:px-10 pb-0">

          {/* ── HEADING ─────────────────────────── */}
          <h1
            ref={headingRef}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 7.5vw, 8rem)',
              color: '#ffffff',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              textShadow: '0 4px 40px rgba(0,0,0,0.15)',
              marginBottom: '0.25em',
              opacity: 0,         /* hidden until entrance plays */
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

          {/* Typewriter cycling role */}
          <div className="mb-3 h-6 flex items-center" aria-live="polite" aria-label="Current role">
            <span
              className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#333] typing-cursor pr-1"
              style={{ fontFamily: "'Inter'" }}
            >
              {roleText || '\u00A0'}
            </span>
          </div>

          {/* ── CTA BUTTONS ─────────────────────── */}
          <div
            ref={btnsRef}
            className="flex flex-wrap gap-3 mb-5 sm:mb-6"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            <button
              id="hero-hire-btn"
              onClick={() => scrollTo('contact', 'CONTACT')}
              className="btn-yellow text-xs sm:text-sm py-3 px-6 font-extrabold focus:outline-none focus:ring-2 focus:ring-white"
            >
              Hire Me
            </button>
            <button
              id="hero-view-work-btn"
              onClick={() => scrollTo('projects', 'PROJECTS')}
              className="btn-yellow text-xs sm:text-sm py-3 px-6 font-extrabold focus:outline-none focus:ring-2 focus:ring-white"
              style={{ background: '#111111', color: '#E8FF2A' }}
            >
              View My Work ↓
            </button>
            <button
              id="hero-about-btn"
              onClick={() => scrollTo('about', 'ABOUT')}
              className="btn-outline text-xs sm:text-sm py-3 px-6 font-extrabold focus:outline-none focus:ring-2 focus:ring-white"
              style={{
                color: 'var(--text-dark)',
                borderColor: 'var(--border-dark)',
              }}
            >
              About Me
            </button>
          </div>

          {/* ── BOTTOM NAV BAR ──────────────────── */}
          <nav
            ref={navBarRef}
            className="flex items-center flex-wrap gap-x-3 gap-y-2 pb-5 sm:pb-7"
            style={{
              borderTop: '1px solid rgba(17,17,17,0.15)',
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          >
            {/* Left cluster: identity + stat cards */}
            <div
              ref={statsRef}
              className="flex items-center gap-3 sm:gap-5 pt-3 flex-wrap"
            >
              {/* Identity blurb */}
              <div className="flex flex-col mr-1">
                <span className="text-[0.65rem] sm:text-xs font-semibold text-[#444] leading-tight">Product Support Associate</span>
                <span className="text-[0.65rem] sm:text-xs font-semibold text-[#444] leading-tight">That's Abutalha.</span>
              </div>

              <div className="w-px h-8 hidden sm:block" style={{ background: 'rgba(17,17,17,0.18)' }} />

              {/* Stat card 1 */}
              <div
                className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl"
                style={{
                  background: 'rgba(202,197,186,0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(17,17,17,0.12)',
                }}
              >
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-sm sm:text-base flex-shrink-0"
                  style={{ background: '#E8FF2A' }}
                >
                  🚀
                </div>
                <div>
                  <div
                    className="font-black text-sm sm:text-base leading-none"
                    style={{ fontFamily: "'Inter'", color: '#111' }}
                  >
                    {projectCount}+
                  </div>
                  <div className="text-[0.52rem] sm:text-[0.58rem] uppercase tracking-wider text-[var(--text-light)] font-semibold">Projects</div>
                </div>
              </div>

              {/* Stat card 2 */}
              <div
                className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl"
                style={{
                  background: 'rgba(202,197,186,0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(17,17,17,0.12)',
                }}
              >
                <div className="flex flex-col">
                  <div
                    className="font-black leading-none text-sm sm:text-base"
                    style={{ fontFamily: "'Inter'", color: '#E8FF2A' }}
                  >
                    {expYears}+
                  </div>
                  <div className="text-[0.52rem] sm:text-[0.58rem] uppercase tracking-wider text-[var(--text-light)] font-semibold">
                    Years Exp.
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
                  <s.Icon size={13} strokeWidth={2.5} className="text-[var(--text-dark)]" />
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
            <div className="flex items-center gap-2 sm:gap-4 pt-3 flex-wrap">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.id, item.label)}
                  className="text-[0.58rem] sm:text-[0.6rem] font-bold uppercase tracking-[0.1em] cursor-pointer border-none bg-transparent outline-none transition-colors duration-200 hover:text-[#111]"
                  style={{ color: activeNav === item.label ? '#111' : 'var(--text-light)' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* ── Vertical sidebar is handled by the StickyNav component in App.tsx ── */}
    </section>
  );
};

export default HeroSection;
