import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Radio,
  Sparkles,
  CheckCircle2,
  Activity,
  Zap,
} from 'lucide-react';
import { MaskReveal, KineticBackWord } from './KineticEditorial';

/* ─── Web Audio Click Synthesizer ───────────────── */
function playTactileClick() {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch {
    // AudioContext blocked or silent
  }
}

/* ─── Project Data Definitions ───────────────────── */
export interface ProjectItem {
  id: string;
  name: string;
  category: 'App' | 'Game';
  badge: string;
  tagline: string;
  description: string;
  highlights: string[];
  techTags: string[];
  img: string;
  imgAlt: string;
  liveLink: string;
  githubLink: string;
  status: string;
  metric: string;
  accent: string;
  architectureNote: string;
  deployTarget: string;
}

const ALL_PROJECTS: ProjectItem[] = [
  {
    id: '01',
    name: 'Abusha HD Downloader',
    category: 'App',
    badge: 'FLAGSHIP // CLOUD UTILITY',
    tagline: 'High-Speed Multi-Platform Video Downloader',
    description:
      'Eliminated slow, ad-heavy download websites by engineering Abusha — a high-performance web tool for fast HD downloads from YouTube, Instagram, Facebook, and TikTok with clean queue management.',
    highlights: [
      'Asynchronous Flask Stream Handler',
      'Cross-Platform Regex URL Parser',
      'High-Concurrency Render Cloud Instance',
    ],
    techTags: ['Python', 'Flask', 'JavaScript', 'Render', 'REST API'],
    img: '/abusha.webp',
    imgAlt: 'Abusha HD Video Downloader clean interface with URL parsing',
    liveLink: 'https://abusha.onrender.com',
    githubLink: 'https://github.com/Abutalha09',
    status: 'SYS.ONLINE // 1080P STREAM',
    metric: '1080p HD Direct Streams',
    accent: '#74B9F1',
    architectureNote: 'Engineered with async stream pipelining, multi-platform regex URL parsing, and zero-ad instant download queues.',
    deployTarget: 'Render Cloud (Python/Flask)',
  },
  {
    id: '02',
    name: 'Cosmic Portfolio',
    category: 'App',
    badge: 'CREATIVE TECH // BRAND',
    tagline: 'Immersive Canvas Particle Engine & Glassmorphism Panels',
    description:
      'Engineered a non-static digital identity built with canvas particle flows, glassmorphism panels, and a custom cursor — turning a simple personal page into an immersive, interactive experience.',
    highlights: [
      'HTML5 Canvas 60 FPS Particle Emitter',
      'Hardware-accelerated CSS Glass Morphism',
      'Dynamic Pointer Spring Trailing Physics',
    ],
    techTags: ['Canvas API', 'CSS Variables', 'Framer Motion', 'GitHub Pages'],
    img: '/portfolio.webp',
    imgAlt: 'Cosmic Portfolio showcase with dark particle flow and glassmorphic UI',
    liveLink: 'https://abutalha09.github.io/portfolio/',
    githubLink: 'https://github.com/Abutalha09/portfolio',
    status: 'SYS.ONLINE // 60 FPS',
    metric: 'Real-time Canvas Render',
    accent: '#E8FF2A',
    architectureNote: 'Custom 60 FPS Canvas particle physics engine with kinetic spring math and zero third-party canvas dependencies.',
    deployTarget: 'GitHub Pages Global CDN',
  },
  {
    id: '03',
    name: 'Al-Madina Telecom',
    category: 'App',
    badge: 'COMMERCIAL // LANDING STUDIO',
    tagline: 'Hardware Repair & Service Conversion Studio',
    description:
      'Delivered an executive commercial landing studio for a local telecom repair center. Features full repair service listings, customer trust proof, and an integrated booking conversion flow.',
    highlights: [
      'Mobile-First Fluid Grid & Semantic SEO',
      'High-Conversion Direct WhatsApp & Call Bridge',
      'Zero-JS Netlify Edge Global CDN Deployment',
    ],
    techTags: ['HTML5', 'CSS3', 'JavaScript', 'Netlify', 'SEO'],
    img: '/almadina.webp',
    imgAlt: 'Al-Madina Telecom repair shop website with service listing',
    liveLink: 'https://almadina1.netlify.app/',
    githubLink: 'https://github.com/Abutalha09',
    status: 'CLIENT ACTIVE // HOSTED',
    metric: 'Sub-Second Netlify CDN',
    accent: '#F3724C',
    architectureNote: 'High-conversion commercial architecture with localized phone repair lead generation and sub-second cold starts.',
    deployTarget: 'Netlify Edge Network',
  },
  {
    id: '04',
    name: 'Sleek Calculator',
    category: 'App',
    badge: 'UTILITY // MATH ENGINE',
    tagline: 'Tactile Keyboard-Supported Arithmetic Engine',
    description:
      'Rebuilt the traditional browser calculator from scratch to explore mathematical state machines and expression parsing. Features tactile key feedback, dual dark/light theming, and full keyboard parity.',
    highlights: [
      'Custom Reverse-Polish Expression Evaluator',
      'Physical Keyboard Event Listener Matrix',
      'Zero-Latency DOM State Mutations',
    ],
    techTags: ['HTML5', 'CSS Flexbox', 'Vanilla JS', 'State Engine'],
    img: '/Calculator1.webp',
    imgAlt: 'Sleek Calculator with modern tactile interface',
    liveLink: 'https://abutalha09.github.io/calculator/',
    githubLink: 'https://github.com/Abutalha09/calculator',
    status: 'UTILITY // STANDALONE',
    metric: 'Zero-Lag Tactile Keypress',
    accent: '#22c55e',
    architectureNote: 'Mathematical evaluation state machine handling parentheses, order of operations, and keyboard scan codes.',
    deployTarget: 'GitHub Pages Static Edge',
  },
  {
    id: '05',
    name: 'Tic Tac Toe Masters',
    category: 'Game',
    badge: 'INTERACTIVE // GAME ENGINE',
    tagline: 'Zero-Framework Matrix State Game',
    description:
      'Challenged myself to implement full game state management, win-line vector calculations, score logging, and animated board resets in pure Vanilla JS without any third-party framework.',
    highlights: [
      'Bitwise Win-Condition Validation Matrix',
      'Persistent LocalStorage Match History',
      'Micro-Spring Particle Reset Animations',
    ],
    techTags: ['Vanilla JS', 'State Machine', 'CSS Grid', 'LocalStorage'],
    img: '/tic-tac-toe.webp',
    imgAlt: 'Tic Tac Toe interactive game board',
    liveLink: 'https://abutalha09.github.io',
    githubLink: 'https://github.com/Abutalha09',
    status: 'GAME ENGINE // 2-PLAYER',
    metric: 'Zero-Framework Logic',
    accent: '#E8FF2A',
    architectureNote: 'Pure Vanilla JS state machine computing winning lines through bitwise matrix indexing with persistent match history.',
    deployTarget: 'Static Client-Side Runtime',
  },
  {
    id: '06',
    name: 'Rock Paper Scissors',
    category: 'Game',
    badge: 'INTERACTIVE // AI OPPONENT',
    tagline: 'Animated Decision-Tree Browser Game',
    description:
      'Built a classic Rock Paper Scissors game featuring animated hand reveals, computer decision algorithms, streak multipliers, and smooth tactile feedback tailored across both desktop and mobile screens.',
    highlights: [
      'Pseudorandom Weighted AI Decision Branch',
      'Hardware-Accelerated Shake & Reveal Keyframes',
      'Haptic & Audio Click Integration',
    ],
    techTags: ['Vanilla JS', 'Web Animations', 'Score Tracker', 'Game Loop'],
    img: '/rock-paper.webp',
    imgAlt: 'Rock Paper Scissors animated browser game',
    liveLink: 'https://abutalha09.github.io',
    githubLink: 'https://github.com/Abutalha09',
    status: 'AI OPPONENT // ACTIVE',
    metric: 'Instantaneous Feedback Loop',
    accent: '#74B9F1',
    architectureNote: 'Interactive decision tree engine with shake keyframes, adaptive streaks, and audio-tactile haptic synthesis.',
    deployTarget: 'Static Client-Side Runtime',
  },
];

export const ProjectsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'APPS' | 'GAMES'>('ALL');

  const filteredProjects = ALL_PROJECTS.filter((p) => {
    if (activeFilter === 'APPS') return p.category === 'App';
    if (activeFilter === 'GAMES') return p.category === 'Game';
    return true;
  });

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0];

  // Keep active index within bounds when filter changes
  useEffect(() => {
    if (activeIndex >= filteredProjects.length) {
      setActiveIndex(0);
    }
  }, [activeFilter, filteredProjects.length, activeIndex]);

  const handleSelectProject = (index: number) => {
    playTactileClick();
    setActiveIndex(index);
  };

  const handleFilterChange = (filter: 'ALL' | 'APPS' | 'GAMES') => {
    playTactileClick();
    setActiveFilter(filter);
    setActiveIndex(0);
  };

  const handleNext = () => {
    playTactileClick();
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    playTactileClick();
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <section
      id="projects"
      className="w-full px-4 sm:px-8 md:px-10 lg:px-16 pt-16 sm:pt-24 pb-10 sm:pb-14 relative overflow-hidden text-[#111]"
      style={{ background: 'var(--bg-primary, #CAC5BA)' }}
    >
      <KineticBackWord>Build</KineticBackWord>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-8 sm:gap-12">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/15 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="tag-yellow flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3 text-[#111]" />
                03 — Selected Works
              </span>
              <span className="text-[0.65rem] font-mono font-bold uppercase tracking-widest text-[#555]">
                // KINETIC DOSSIER
              </span>
            </div>

            <MaskReveal
              as="h2"
              className="section-heading text-3xl sm:text-5xl lg:text-6xl"
              text={'Featured\nCreations'}
            />
          </div>

          {/* Minimalist Filter Navigation & Scrubber Counter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Scrubber Count */}
            <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#333] px-3 py-1.5 rounded-full bg-black/5 border border-black/10">
              <span className="text-[#111]">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-black/30">/</span>
              <span className="text-black/50">
                {String(filteredProjects.length).padStart(2, '0')}
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-black/5 border border-black/10">
              {[
                { key: 'ALL', label: 'All Works' },
                { key: 'APPS', label: 'Web Apps' },
                { key: 'GAMES', label: 'Games' },
              ].map(({ key, label }) => {
                const isActive = activeFilter === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleFilterChange(key as 'ALL' | 'APPS' | 'GAMES')}
                    className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer border ${
                      isActive
                        ? 'bg-[#111] text-[#E8FF2A] border-[#111] shadow-sm'
                        : 'bg-transparent text-[#555] border-transparent hover:text-[#111]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Desktop View: The Asymmetric Kinetic Split Dossier ── */}
        <div className="hidden lg:grid grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* LEFT STAGE (7 cols): Sticky Cinematic Visual Viewport & Live Telemetry HUD */}
          <div className="lg:col-span-7 sticky top-28 flex flex-col gap-4">
            {/* Main Visual Monitor Frame */}
            <div className="relative rounded-3xl overflow-hidden border border-black/15 shadow-2xl bg-[#0a0d14] group">
              
              {/* Dynamic Backlight Ambient Glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-40 blur-3xl transition-colors duration-700"
                style={{
                  background: `radial-gradient(ellipse at center, ${activeProject.accent} 0%, transparent 70%)`,
                }}
              />

              {/* Minimalist Top HUD Bar */}
              <div className="relative z-20 flex items-center justify-between px-5 py-3.5 bg-black/60 backdrop-blur-md border-b border-white/10 select-none text-white">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <span className="font-mono text-xs font-bold text-white/70 pl-2 border-l border-white/15">
                    {activeProject.liveLink.replace('https://', '')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E8FF2A] animate-pulse" />
                  <span className="font-mono text-[0.62rem] font-black uppercase text-white/80 tracking-widest">
                    {activeProject.status}
                  </span>
                </div>
              </div>

              {/* Cinematic Viewport Screen */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeProject.id}
                    src={activeProject.img}
                    alt={activeProject.imgAlt}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </AnimatePresence>

                {/* Floating Bottom Quick Action Pills */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
                  <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg">
                    <Radio className="w-3 h-3 text-[#E8FF2A]" />
                    <span>{activeProject.metric}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      id={`desktop-live-btn-${activeProject.id}`}
                      href={activeProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playTactileClick}
                      className="px-4 py-2 rounded-xl bg-[#E8FF2A] hover:bg-[#d8ed1b] text-[#111] font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:scale-105 transition-all duration-200 active:scale-95"
                    >
                      <span>Explore Live</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </a>

                    <a
                      id={`desktop-github-btn-${activeProject.id}`}
                      href={activeProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playTactileClick}
                      className="p-2 rounded-xl bg-black/85 hover:bg-black text-white border border-white/15 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-200 active:scale-95"
                      title="Inspect Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture & Telemetry HUD Card (Fills left column space & balances height) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/[0.04] border border-black/10 backdrop-blur-md flex flex-col gap-3.5 select-none">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#111]" />
                  <span className="text-[0.68rem] font-mono font-black uppercase tracking-wider text-[#111]">
                    Live Architecture Telemetry
                  </span>
                </div>
                <span className="text-[0.62rem] font-mono font-bold uppercase text-[#555] px-2 py-0.5 rounded bg-black/5 border border-black/10">
                  SYS #{activeProject.id} // {activeProject.category}
                </span>
              </div>

              {/* Telemetry Metric Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-black/5 border border-black/5 flex flex-col gap-0.5">
                  <span className="text-[0.58rem] font-mono font-extrabold uppercase tracking-wider text-[#666]">
                    Performance
                  </span>
                  <span className="text-xs font-mono font-black text-[#111] truncate" title={activeProject.metric}>
                    {activeProject.metric}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/5 border border-black/5 flex flex-col gap-0.5">
                  <span className="text-[0.58rem] font-mono font-extrabold uppercase tracking-wider text-[#666]">
                    Target Host
                  </span>
                  <span className="text-xs font-mono font-black text-[#111] truncate" title={activeProject.deployTarget}>
                    {activeProject.deployTarget}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/5 border border-black/5 flex flex-col gap-0.5">
                  <span className="text-[0.58rem] font-mono font-extrabold uppercase tracking-wider text-[#666]">
                    Edge Latency
                  </span>
                  <span className="text-xs font-mono font-black text-[#111] flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#111]" />
                    &lt; 15ms
                  </span>
                </div>
              </div>

              {/* Architecture Brief */}
              <p className="text-xs font-medium text-[#333] leading-relaxed border-t border-black/10 pt-2.5">
                <span className="font-bold text-[#111] font-mono uppercase text-[0.68rem] mr-1.5">
                  Insight:
                </span>
                {activeProject.architectureNote}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN (5 cols): Interactive Typographic Editorial Ledger */}
          <div className="lg:col-span-5 flex flex-col gap-0">
            {filteredProjects.map((project, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <div
                  key={project.id}
                  onClick={() => handleSelectProject(idx)}
                  onMouseEnter={() => {
                    if (idx !== activeIndex) {
                      playTactileClick();
                      setActiveIndex(idx);
                    }
                  }}
                  className={`relative cursor-pointer transition-all duration-300 border-t border-black/15 py-5 px-3 rounded-2xl group ${
                    isSelected
                      ? 'bg-black/[0.04] border-black/30'
                      : 'hover:bg-black/[0.02]'
                  }`}
                >
                  {/* Left Active Accent Pill Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeLedgerAccent"
                      className="absolute left-0 top-3 bottom-3 w-1.5 rounded-full bg-[#111]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Header Row */}
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-3">
                      <span
                        className={`font-mono font-black text-lg transition-colors duration-200 ${
                          isSelected ? 'text-[#111]' : 'text-black/35 group-hover:text-black/60'
                        }`}
                      >
                        #{project.id}
                      </span>
                      <h3
                        className={`font-black text-xl xl:text-2xl uppercase tracking-tight transition-colors duration-200 leading-none ${
                          isSelected ? 'text-[#111]' : 'text-[#333] group-hover:text-[#111]'
                        }`}
                      >
                        {project.name}
                      </h3>
                    </div>

                    <span
                      className={`font-mono text-[0.62rem] font-bold uppercase tracking-wider transition-colors duration-200 ${
                        isSelected ? 'text-[#111]' : 'text-black/40'
                      }`}
                    >
                      {project.badge.split('//')[0].trim()}
                    </span>
                  </div>

                  {/* Accordion Expand Details When Selected */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 flex flex-col gap-3.5">
                          <p className="text-xs sm:text-sm font-semibold text-[#333] leading-relaxed">
                            {project.description}
                          </p>

                          {/* Engineering Specs */}
                          <div className="p-3.5 rounded-xl bg-black/5 border border-black/10 flex flex-col gap-2">
                            <span className="text-[0.6rem] font-mono font-extrabold uppercase tracking-widest text-[#555]">
                              ARCHITECTURE HIGHLIGHTS:
                            </span>
                            {project.highlights.map((h, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 text-xs font-semibold text-[#222]"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#111] shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.techTags.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded text-[0.65rem] font-mono font-bold bg-black/5 text-[#222] border border-black/10"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile / Tablet View: The Full-Bleed Cinematic Reel ── */}
        <div className="flex lg:hidden flex-col gap-6">
          {/* Mobile Cinematic Screen */}
          <div className="relative rounded-2xl overflow-hidden border border-black/15 shadow-xl bg-black">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#161616] border-b border-white/10 text-white select-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                <span className="font-mono text-[0.62rem] font-bold text-white/70 truncate max-w-[160px]">
                  {activeProject.liveLink.replace('https://', '')}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8FF2A] animate-pulse" />
                <span className="font-mono text-[0.55rem] font-black uppercase text-white/80">
                  {activeProject.status.split('//')[0].trim()}
                </span>
              </div>
            </div>

            {/* Preview Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProject.id}
                  src={activeProject.img}
                  alt={activeProject.imgAlt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>

              {/* Metric Tag */}
              <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md text-white font-mono text-[0.6rem] font-bold flex items-center gap-1.5">
                <Radio className="w-2.5 h-2.5 text-[#E8FF2A]" />
                <span>{activeProject.metric}</span>
              </div>
            </div>
          </div>

          {/* Reel Stepper Navigation Controls */}
          <div className="flex items-center justify-between gap-4 py-2 border-y border-black/15">
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-sm text-[#111]">
                #{activeProject.id}
              </span>
              <span className="font-black text-base uppercase text-[#111] truncate max-w-[180px]">
                {activeProject.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 border border-black/15 flex items-center justify-center cursor-pointer active:scale-90"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4 text-[#111]" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 border border-black/15 flex items-center justify-center cursor-pointer active:scale-90"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4 text-[#111]" />
              </button>
            </div>
          </div>

          {/* Mobile Project Details */}
          <div className="flex flex-col gap-4">
            <p className="text-xs sm:text-sm font-semibold text-[#222] leading-relaxed">
              {activeProject.description}
            </p>

            {/* Architecture specs */}
            <div className="p-3.5 rounded-xl bg-black/5 border border-black/10 flex flex-col gap-2">
              <span className="text-[0.6rem] font-mono font-extrabold uppercase tracking-widest text-[#555]">
                ENGINEERING HIGHLIGHTS:
              </span>
              {activeProject.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs font-semibold text-[#222]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#111] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
              {activeProject.techTags.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[0.62rem] font-mono font-bold bg-black/5 text-[#222] border border-black/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Launch Buttons Full-Width */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                id={`mobile-live-btn-${activeProject.id}`}
                href={activeProject.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playTactileClick}
                className="flex-1 py-3 px-4 rounded-xl bg-[#E8FF2A] text-[#111] font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95"
              >
                <span>Launch Live</span>
                <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>

              <a
                id={`mobile-github-btn-${activeProject.id}`}
                href={activeProject.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playTactileClick}
                className="py-3 px-4 rounded-xl bg-[#111] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                title="View Source Code"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repo</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Section: Verified Production Deliverables & Repository Bridge ── */}
        <div className="mt-4 sm:mt-6 p-6 sm:p-8 rounded-3xl bg-black/[0.04] border border-black/15 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          {/* Deliverable Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-1">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#111] tracking-tight font-mono">
                06+
              </div>
              <div className="text-[0.68rem] font-mono font-bold uppercase tracking-wider text-[#555] mt-0.5">
                Shipped Web Apps
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#111] tracking-tight font-mono">
                40+
              </div>
              <div className="text-[0.68rem] font-mono font-bold uppercase tracking-wider text-[#555] mt-0.5">
                Client Engagements
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#111] tracking-tight font-mono">
                100%
              </div>
              <div className="text-[0.68rem] font-mono font-bold uppercase tracking-wider text-[#555] mt-0.5">
                Handcrafted Code
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#111] tracking-tight font-mono">
                &lt; 1.2s
              </div>
              <div className="text-[0.68rem] font-mono font-bold uppercase tracking-wider text-[#555] mt-0.5">
                Edge Load Speed
              </div>
            </div>
          </div>

          {/* GitHub Repositories Direct CTA */}
          <div className="flex items-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-black/10 md:pl-6">
            <a
              id="projects-github-cta-banner"
              href="https://github.com/Abutalha09?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playTactileClick}
              className="w-full md:w-auto px-5 py-3 rounded-2xl bg-[#111] hover:bg-black text-[#E8FF2A] font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              <span>View 20+ Repos on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
