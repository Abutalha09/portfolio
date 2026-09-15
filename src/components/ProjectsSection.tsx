import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Radio,
  Sparkles,
  CheckCircle2,
  Activity,
  Copy,
  Check,
  FileText,
  Server,
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
export interface CaseStudyTradeoff {
  decision: string;
  tradeoff: string;
}

export interface CaseStudy {
  problemStatement: string;
  tradeoffs: CaseStudyTradeoff[];
  futureRoadmap: string[];
}

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
  networkInfo: string;
  caseStudy: CaseStudy;
}

type LiveStatus = 'checking' | 'online' | 'unreachable';

const ALL_PROJECTS: ProjectItem[] = [
  {
    id: '01',
    name: 'Abusha HD Downloader',
    category: 'App',
    badge: 'FLAGSHIP // CLOUD UTILITY',
    tagline: 'High-Speed Multi-Platform Video Downloader',
    description:
      'Most media downloading websites are cluttered with intrusive ads, broken links, and slow redirects. I engineered a Python/Flask web utility that extracts direct video streams from multiple platforms into an ad-free, reliable interface.',
    highlights: [
      'Asynchronous Flask Stream Handler',
      'Cross-Platform Regex URL Extraction',
      'Render Cloud Background Worker Deployment',
    ],
    techTags: ['Python', 'Flask', 'JavaScript', 'Render', 'REST API'],
    img: '/abusha.webp',
    imgAlt: 'Abusha HD Video Downloader clean interface with URL parsing',
    liveLink: 'https://abusha.onrender.com',
    githubLink: 'https://github.com/Abutalha09/abusha', // TODO: Update with exact repository name if private/renamed
    status: 'SYS.ONLINE // 1080P STREAM',
    metric: 'Direct HD Stream Piping',
    accent: '#74B9F1',
    architectureNote:
      'Engineered with Python and Flask to process media stream endpoints, extract direct MP4/audio links using regex parsers, and stream responses cleanly without third-party ad injection.',
    deployTarget: 'Render Cloud (Python/Flask)',
    networkInfo: 'HTTPS / REST Stream',
    caseStudy: {
      problemStatement:
        'Third-party media download services are riddled with spam popups, misleading download buttons, and broken stream endpoints that degrade user trust.',
      tradeoffs: [
        {
          decision: 'Server-side media stream piping via Python Flask',
          tradeoff:
            'Introduces memory and worker constraints on Render compared to purely client-side approaches, but bypasses CORS limitations and provider token protections safely.',
        },
        {
          decision: 'Direct binary streaming without permanent server storage',
          tradeoff:
            'Avoids disk storage consumption and copyright liability on cloud hosting tiers, but requires holding network sockets open for the duration of the transfer.',
        },
        {
          decision: 'Regular-expression based URL normalizer for 4+ platforms',
          tradeoff:
            'Eliminates heavy scraping library overhead, but requires maintaining regex patterns when upstream media providers update their URL formats.',
        },
      ],
      futureRoadmap: [
        'Add Redis task queue (RQ/Celery) for high-concurrency background batch downloads.',
        'Implement WebSocket progress events for real-time chunk download feedback.',
        '// TODO: Add audio extraction (MP3) toggle and quality selection modal.',
      ],
    },
  },
  {
    id: '02',
    name: 'Md. Faizan Portfolio',
    category: 'App',
    badge: 'EDITORIAL // CREATOR BRAND',
    tagline: 'High-End Creator Portfolio & Media Showcase Studio',
    description:
      'The client needed an editorial portfolio to present high-end videography work directly to brands without relying on social platform algorithms. I developed an image-optimized showcase with dark editorial typography that delivers instant page loads on global CDN edges.',
    highlights: [
      'High-Contrast Editorial Typography Grid',
      'Fluid Responsive Viewports & Media Showcase',
      'Netlify Global Edge CDN Static Deployment',
    ],
    techTags: ['HTML5', 'CSS3', 'JavaScript', 'Netlify', 'Responsive Design'],
    img: '/faizan-portfolio.webp',
    imgAlt: 'Md. Faizan professional creator portfolio showcase',
    liveLink: 'https://mdfaizan873.netlify.app',
    githubLink: 'https://github.com/Abutalha09/faizan-portfolio', // TODO: Update with exact repository link
    status: 'CLIENT ACTIVE // NETLIFY EDGE',
    metric: 'Zero-Runtime Static Bundle',
    accent: '#E0A96D',
    architectureNote:
      'Static creator portfolio built with semantic HTML5 and vanilla CSS, featuring high-contrast serif typography and optimized media delivery.',
    deployTarget: 'Netlify Global Edge',
    networkInfo: 'Static CDN / Global PoPs',
    caseStudy: {
      problemStatement:
        'Videographers sharing work only via social media links lose credibility with premium commercial brands seeking curated, distraction-free presentations.',
      tradeoffs: [
        {
          decision: 'Pure HTML5/CSS static implementation without heavy UI frameworks',
          tradeoff:
            'Achieves near-zero cold start times and negligible bundle weight, but means content edits require git commits rather than a non-technical CMS dashboard.',
        },
        {
          decision: 'WebP compressed media stills with async loading',
          tradeoff:
            'Dramatically reduces initial data payload on mobile devices, requiring pre-generating poster stills instead of embedding live video players immediately.',
        },
      ],
      futureRoadmap: [
        'Integrate a headless CMS (e.g. Decap or Sanity) for no-code video reel updates.',
        '// TODO: Add verified client testimonial carousel and engagement statistics.',
      ],
    },
  },
  {
    id: '03',
    name: 'Al-Madina Telecom',
    category: 'App',
    badge: 'COMMERCIAL // LANDING STUDIO',
    tagline: 'Hardware Repair & Service Conversion Studio',
    description:
      'A local telecom repair shop was losing potential walk-in customers because their repair services and pricing were invisible online. I built a mobile-friendly landing page with clear repair categories and instant WhatsApp contact links to drive qualified walk-in leads.',
    highlights: [
      'Clear Service & Hardware Repair Breakdown',
      'Direct WhatsApp & Call Conversion Triggers',
      'Mobile-First Responsive Layout with Netlify Hosting',
    ],
    techTags: ['HTML5', 'CSS3', 'JavaScript', 'Netlify', 'SEO'],
    img: '/almadina.webp',
    imgAlt: 'Al-Madina Telecom repair shop website with service listing',
    liveLink: 'https://almadina1.netlify.app/',
    githubLink: 'https://github.com/Abutalha09/almadina-telecom', // TODO: Update with exact repository link
    status: 'CLIENT ACTIVE // HOSTED',
    metric: 'Mobile Conversion Layout',
    accent: '#F3724C',
    architectureNote:
      'Commercial landing page focused on local search intent, streamlined service pricing discovery, and direct one-tap customer communication channels.',
    deployTarget: 'Netlify Edge Network',
    networkInfo: 'Static CDN / WhatsApp API',
    caseStudy: {
      problemStatement:
        'Local phone repair clients frequently struggled to know whether specific device brands and motherboard fixes were supported before visiting the physical store.',
      tradeoffs: [
        {
          decision: 'WhatsApp click-to-chat integration with pre-filled repair query text',
          tradeoff:
            'Eliminates the complexity and maintenance of a custom booking backend while utilizing the primary messaging app of local customers.',
        },
        {
          decision: 'Single-page vertical hierarchy over multi-page navigation',
          tradeoff:
            'Minimizes friction on low-bandwidth mobile devices, though limits the breadth of long-form localized blog articles.',
        },
      ],
      futureRoadmap: [
        'Add a live repair status ticket lookup by phone number.',
        '// TODO: Connect Google Business Reviews API widget for automated social proof.',
      ],
    },
  },
  {
    id: '04',
    name: 'Sleek Calculator',
    category: 'App',
    badge: 'UTILITY // MATH ENGINE',
    tagline: 'Tactile Keyboard-Supported Arithmetic Engine',
    description:
      'Standard browser calculator demos often lack tactile feedback and omit full keyboard input support. I built a clean arithmetic tool with complete keyboard navigation, decimal handling, and instant visual response using vanilla JavaScript.',
    highlights: [
      'Physical Keyboard & Numpad Event Binding',
      'Order of Operations Arithmetic Parser',
      'Dual Dark & Light Theme State Toggle',
    ],
    techTags: ['HTML5', 'CSS Flexbox', 'Vanilla JS', 'State Engine'],
    img: '/Calculator1.webp',
    imgAlt: 'Sleek Calculator with modern tactile interface',
    liveLink: 'https://abutalha09.github.io/calculator/',
    githubLink: 'https://github.com/Abutalha09/calculator',
    status: 'UTILITY // STANDALONE',
    metric: 'Pure Vanilla DOM Engine',
    accent: '#22c55e',
    architectureNote:
      'Standard state-driven calculator handling operator precedence, decimal floating point precision, and native keydown listener bindings without external libraries.',
    deployTarget: 'GitHub Pages Static Edge',
    networkInfo: 'Static / Zero Runtime Deps',
    caseStudy: {
      problemStatement:
        'Many simple web calculators rely strictly on mouse clicks and fail to handle decimal edge cases or rapid numpad keyboard entry.',
      tradeoffs: [
        {
          decision: 'Structured token evaluation state over JavaScript eval()',
          tradeoff:
            'Prevents malicious arbitrary execution and handles invalid syntax sequences gracefully, but requires manual handling of chained operations.',
        },
        {
          decision: 'CSS custom properties for dual light/dark theme switching',
          tradeoff:
            'Provides instant, zero-flicker theme switching with zero external CSS frameworks, but requires manually auditing contrast across all button states.',
        },
      ],
      futureRoadmap: [
        'Add interactive calculation history tape with export to clipboard.',
        'Implement scientific math functions (trigonometry, powers, square roots).',
      ],
    },
  },
  {
    id: '05',
    name: 'Tic Tac Toe Masters',
    category: 'Game',
    badge: 'INTERACTIVE // GAME ENGINE',
    tagline: 'Zero-Framework Matrix State Game',
    description:
      'I wanted to solidify fundamental state management and DOM rendering before using heavy front-end frameworks. I built a responsive two-player game featuring automatic win-detection, smooth board resets, and local session score tracking.',
    highlights: [
      '8-Combination Win Condition Matrix',
      'Persistent LocalStorage Match History',
      'CSS Grid 3x3 Responsive Game Board',
    ],
    techTags: ['Vanilla JS', 'State Machine', 'CSS Grid', 'LocalStorage'],
    img: '/tic-tac-toe.webp',
    imgAlt: 'Tic Tac Toe interactive game board',
    liveLink: 'https://abutalha09.github.io', // TODO: Update with dedicated game live link if deployed separately
    githubLink: 'https://github.com/Abutalha09/tic-tac-toe', // TODO: Update with exact repository link
    status: 'GAME ENGINE // 2-PLAYER',
    metric: 'Zero-Framework Logic',
    accent: '#E8FF2A',
    architectureNote:
      'Zero-dependency game tracking 2-player turn states, checking 8 winning combinations across rows, columns, and diagonals, with match history stored in browser storage.',
    deployTarget: 'Static Client-Side Runtime',
    networkInfo: 'Client-Side Runtime',
    caseStudy: {
      problemStatement:
        'Building a functional game without frameworks is a core test of DOM event delegation, race condition avoidance, and state purity.',
      tradeoffs: [
        {
          decision: 'Static array indexing for 8 win conditions over dynamic graph search',
          tradeoff:
            'Provides instant O(1) condition checks with minimal code, but is strictly bound to a 3x3 grid rather than arbitrary N-by-N dimensions.',
        },
        {
          decision: 'LocalStorage match serialization',
          tradeoff:
            'Retains score tallies across browser refreshes with zero backend cost, but does not synchronize scores across multiple devices.',
        },
      ],
      futureRoadmap: [
        'Implement unbeatable single-player Minimax AI algorithm.',
        'Add optional 4x4 grid mode with connect-4 win logic.',
      ],
    },
  },
  {
    id: '06',
    name: 'Rock Paper Scissors',
    category: 'Game',
    badge: 'INTERACTIVE // AI OPPONENT',
    tagline: 'Animated Decision-Tree Browser Game',
    description:
      'Many beginner web games feel static and lack responsive tactile feedback on mobile screens. I developed an animated browser game with timed shake animations, automated opponent moves, and persistent streak tracking.',
    highlights: [
      'Randomized Computer Opponent Logic',
      'CSS Keyframe Shake & Timed Reveal Animations',
      'Session Win, Loss, and Draw Streak Tracker',
    ],
    techTags: ['Vanilla JS', 'Web Animations', 'Score Tracker', 'Game Loop'],
    img: '/rock-paper.webp',
    imgAlt: 'Rock Paper Scissors animated browser game',
    liveLink: 'https://abutalha09.github.io', // TODO: Update with dedicated game live link if deployed separately
    githubLink: 'https://github.com/Abutalha09/rock-paper-scissors', // TODO: Update with exact repository link
    status: 'AI OPPONENT // ACTIVE',
    metric: 'Pure JavaScript Game Loop',
    accent: '#74B9F1',
    architectureNote:
      'Event-driven browser game utilizing Math.random for opponent choices, synchronized shake CSS animations, and reactive score counters in pure JavaScript.',
    deployTarget: 'Static Client-Side Runtime',
    networkInfo: 'Client-Side Runtime',
    caseStudy: {
      problemStatement:
        'Turn-based web games that resolve instantaneously without suspense often feel unrewarding and mechanically flat to casual players.',
      tradeoffs: [
        {
          decision: 'CSS keyframe animations paired with setTimeout state dispatch',
          tradeoff:
            'Creates classic rhythmic suspense prior to outcome reveal, but requires disabling input triggers during the animation sequence.',
        },
        {
          decision: 'Session streak logic with win/loss multipliers',
          tradeoff:
            'Encourages repeat play without needing user login or database tracking.',
        },
      ],
      futureRoadmap: [
        'Incorporate player pattern recognition AI that adapts to human move biases.',
        'Add Web Audio synthesizer sounds for victory and defeat jingles.',
      ],
    },
  },
];

/* ─── Blur-up / Skeleton Shimmer Image Component ─── */
interface ProjectImageProps {
  src: string;
  alt: string;
  reduceMotion?: boolean | null;
}

const ProjectImage: React.FC<ProjectImageProps> = ({ src, alt, reduceMotion }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0c0e14]">
      {/* Blurred Low-res Skeleton Shimmer Placeholder */}
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-md"
        >
          <div className="w-full h-full bg-gradient-to-r from-white/[0.02] via-white/[0.08] to-white/[0.02] animate-pulse" />
        </div>
      )}

      <motion.img
        key={src}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
        animate={
          reduceMotion
            ? { opacity: isLoaded ? 1 : 0.4 }
            : { opacity: isLoaded ? 1 : 0.4, scale: 1 }
        }
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
        transition={{
          duration: reduceMotion ? 0.15 : 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`w-full h-full object-cover object-top filter contrast-105 transition-[filter,transform] duration-500 ease-out group-hover:scale-105 ${
          isLoaded ? 'blur-0' : 'blur-md'
        }`}
      />
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.15 });

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'APPS' | 'GAMES'>('ALL');
  const [statusMap, setStatusMap] = useState<Record<string, LiveStatus>>({});
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<string | null>(null);

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

  // Real live-status check (no-cors fetch probe with timeout)
  const checkLiveStatus = useCallback((id: string, url: string) => {
    if (!url || url.startsWith('#')) return;

    setStatusMap((prev) => {
      if (prev[id] === 'online') return prev;
      return { ...prev, [id]: 'checking' };
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    fetch(url, { mode: 'no-cors', signal: controller.signal })
      .then(() => {
        setStatusMap((prev) => ({ ...prev, [id]: 'online' }));
      })
      .catch(() => {
        setStatusMap((prev) => ({ ...prev, [id]: 'unreachable' }));
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });
  }, []);

  useEffect(() => {
    if (activeProject) {
      checkLiveStatus(activeProject.id, activeProject.liveLink);
    }
  }, [activeProject, checkLiveStatus]);

  const handleSelectProject = (index: number) => {
    playTactileClick();
    setActiveIndex(index);
  };

  const handleFilterChange = (filter: 'ALL' | 'APPS' | 'GAMES') => {
    playTactileClick();
    setActiveFilter(filter);
    setActiveIndex(0);
  };

  const handleNext = useCallback(() => {
    playTactileClick();
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  }, [filteredProjects.length]);

  const handlePrev = useCallback(() => {
    playTactileClick();
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  }, [filteredProjects.length]);

  // Subtle keyboard shortcuts: Left/Right arrow keys cycle activeIndex when in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement | null)?.tagName;
      if (targetTag === 'INPUT' || targetTag === 'TEXTAREA' || targetTag === 'SELECT') {
        return;
      }

      if (!isSectionInView) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSectionInView, handleNext, handlePrev]);

  // Copy to clipboard handler
  const handleCopyUrl = (url: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playTactileClick();
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
      })
      .catch(() => {
        // Fallback silent
      });
  };

  // Render live status probe indicator
  const renderStatusBadge = (status: LiveStatus | undefined, fallbackText: string) => {
    if (status === 'checking') {
      return (
        <div className="flex items-center gap-1.5" title="Probing live endpoint availability...">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono text-[0.62rem] font-black uppercase text-amber-300 tracking-widest">
            CHECKING...
          </span>
        </div>
      );
    }
    if (status === 'online') {
      return (
        <div className="flex items-center gap-1.5" title="Deployment endpoint is reachable">
          <span className="w-2 h-2 rounded-full bg-[#27C93F] animate-pulse" />
          <span className="font-mono text-[0.62rem] font-black uppercase text-[#27C93F] tracking-widest">
            LIKELY ONLINE
          </span>
        </div>
      );
    }
    if (status === 'unreachable') {
      return (
        <div className="flex items-center gap-1.5" title="Endpoint could not be reached">
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          <span className="font-mono text-[0.62rem] font-black uppercase text-rose-400 tracking-widest">
            UNREACHABLE
          </span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#E8FF2A] animate-pulse" />
        <span className="font-mono text-[0.62rem] font-black uppercase text-white/80 tracking-widest">
          {fallbackText}
        </span>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
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
            {/* Scrubber Count & Keyboard Hint */}
            <div className="flex items-center gap-2.5">
              <div
                className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#333] px-3 py-1.5 rounded-full bg-black/5 border border-black/10"
                aria-label={`Project ${activeIndex + 1} of ${filteredProjects.length}`}
              >
                <span className="text-[#111]">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-black/30">/</span>
                <span className="text-black/50">
                  {String(filteredProjects.length).padStart(2, '0')}
                </span>
              </div>
              <span className="hidden xl:inline-block font-mono text-[0.62rem] text-[#666] tracking-wider uppercase">
                [← / → to cycle]
              </span>
            </div>

            {/* Accessible Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex items-center gap-1 p-1 rounded-full bg-black/5 border border-black/10"
            >
              {[
                { key: 'ALL', label: 'All Works' },
                { key: 'APPS', label: 'Web Apps' },
                { key: 'GAMES', label: 'Games' },
              ].map(({ key, label }) => {
                const isActive = activeFilter === key;
                return (
                  <button
                    key={key}
                    role="tab"
                    id={`filter-tab-${key.toLowerCase()}`}
                    aria-selected={isActive}
                    aria-controls="projects-dossier-view"
                    onClick={() => handleFilterChange(key as 'ALL' | 'APPS' | 'GAMES')}
                    className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/70 ${
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
        <div
          id="projects-dossier-view"
          className="hidden lg:grid grid-cols-12 gap-10 xl:gap-14 items-start"
        >
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
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>

                  <div className="flex items-center gap-2 pl-2 border-l border-white/15">
                    <span className="font-mono text-xs font-bold text-white/80 truncate max-w-[200px] xl:max-w-[280px]">
                      {activeProject.liveLink.replace('https://', '')}
                    </span>
                    <button
                      id={`desktop-copy-btn-${activeProject.id}`}
                      type="button"
                      onClick={(e) => handleCopyUrl(activeProject.liveLink, e)}
                      aria-label={`Copy live URL for ${activeProject.name} to clipboard`}
                      title={copiedUrl ? 'Copied to clipboard!' : 'Copy live link'}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all active:scale-90 cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8FF2A]"
                    >
                      {copiedUrl ? (
                        <Check className="w-3 h-3 text-[#27C93F]" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                    {copiedUrl && (
                      <span className="font-mono text-[0.62rem] font-bold text-[#27C93F]">
                        COPIED!
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {renderStatusBadge(statusMap[activeProject.id], activeProject.status)}
                </div>
              </div>

              {/* Cinematic Viewport Screen with Lazy Blurred Placeholder */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <ProjectImage
                    key={activeProject.id}
                    src={activeProject.img}
                    alt={activeProject.imgAlt}
                    reduceMotion={shouldReduceMotion}
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
                      aria-label={`Explore live application: ${activeProject.name}`}
                      className="px-4 py-2 rounded-xl bg-[#E8FF2A] hover:bg-[#d8ed1b] text-[#111] font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:scale-105 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
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
                      aria-label={`Inspect source code for ${activeProject.name} on GitHub`}
                      title="Inspect Source Code"
                      className="p-2 rounded-xl bg-black/85 hover:bg-black text-white border border-white/15 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture & Defensible Telemetry Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/[0.04] border border-black/10 backdrop-blur-md flex flex-col gap-3.5 select-none">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#111]" />
                  <span className="text-[0.68rem] font-mono font-black uppercase tracking-wider text-[#111]">
                    Defensible Architecture Telemetry
                  </span>
                </div>
                <span className="text-[0.62rem] font-mono font-bold uppercase text-[#555] px-2 py-0.5 rounded bg-black/5 border border-black/10">
                  SYS #{activeProject.id} // {activeProject.category}
                </span>
              </div>

              {/* Defensible Telemetry Metric Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-black/5 border border-black/5 flex flex-col gap-0.5">
                  <span className="text-[0.58rem] font-mono font-extrabold uppercase tracking-wider text-[#666]">
                    Feature Metric
                  </span>
                  <span
                    className="text-xs font-mono font-black text-[#111] truncate"
                    title={activeProject.metric}
                  >
                    {activeProject.metric}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/5 border border-black/5 flex flex-col gap-0.5">
                  <span className="text-[0.58rem] font-mono font-extrabold uppercase tracking-wider text-[#666]">
                    Target Host
                  </span>
                  <span
                    className="text-xs font-mono font-black text-[#111] truncate"
                    title={activeProject.deployTarget}
                  >
                    {activeProject.deployTarget}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/5 border border-black/5 flex flex-col gap-0.5">
                  <span className="text-[0.58rem] font-mono font-extrabold uppercase tracking-wider text-[#666]">
                    Network Stack
                  </span>
                  <span
                    className="text-xs font-mono font-black text-[#111] truncate flex items-center gap-1"
                    title={activeProject.networkInfo}
                  >
                    <Server className="w-3 h-3 text-[#111]" />
                    {activeProject.networkInfo}
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
          <div className="lg:col-span-5 flex flex-col gap-0" role="region" aria-label="Projects Ledger">
            {filteredProjects.map((project, idx) => {
              const isSelected = idx === activeIndex;
              const isCaseStudyOpen = expandedCaseStudy === project.id;

              return (
                <div
                  key={project.id}
                  id={`project-ledger-item-${project.id}`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isSelected}
                  aria-controls={`project-accordion-${project.id}`}
                  onClick={() => handleSelectProject(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectProject(idx);
                    }
                  }}
                  className={`relative cursor-pointer transition-all duration-300 border-t border-black/15 py-5 px-3 rounded-2xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#CAC5BA] ${
                    isSelected
                      ? 'bg-black/[0.04] border-black/30 shadow-sm'
                      : 'hover:bg-black/[0.02]'
                  }`}
                >
                  {/* Left Active Accent Pill Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId={shouldReduceMotion ? undefined : 'activeLedgerAccent'}
                      className="absolute left-0 top-3 bottom-3 w-1.5 rounded-full bg-[#111]"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0.1 }
                          : { type: 'spring', stiffness: 350, damping: 30 }
                      }
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
                        id={`project-accordion-${project.id}`}
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        animate={
                          shouldReduceMotion
                            ? { opacity: 1 }
                            : { opacity: 1, height: 'auto' }
                        }
                        exit={
                          shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }
                        }
                        transition={{
                          duration: shouldReduceMotion ? 0.15 : 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
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

                          {/* ── Case Study Expand Section ── */}
                          <div className="pt-1">
                            <button
                              id={`case-study-toggle-desktop-${project.id}`}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                playTactileClick();
                                setExpandedCaseStudy((prev) =>
                                  prev === project.id ? null : project.id
                                );
                              }}
                              aria-expanded={isCaseStudyOpen}
                              aria-controls={`case-study-panel-desktop-${project.id}`}
                              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-black/5 hover:bg-black/10 border border-black/10 transition-colors text-left font-mono text-xs font-bold text-[#111] cursor-pointer group/cs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="w-3.5 h-3.5 text-[#111]" />
                                <span>
                                  {isCaseStudyOpen
                                    ? 'Hide Case Study'
                                    : 'Case Study: Problem & Trade-offs'}
                                </span>
                              </div>
                              <motion.div
                                animate={{ rotate: isCaseStudyOpen ? 180 : 0 }}
                                transition={{
                                  duration: shouldReduceMotion ? 0.1 : 0.2,
                                }}
                              >
                                <ChevronDown className="w-3.5 h-3.5 text-[#555] group-hover/cs:text-[#111]" />
                              </motion.div>
                            </button>

                            <AnimatePresence>
                              {isCaseStudyOpen && (
                                <motion.div
                                  id={`case-study-panel-desktop-${project.id}`}
                                  initial={
                                    shouldReduceMotion
                                      ? { opacity: 0 }
                                      : { opacity: 0, height: 0 }
                                  }
                                  animate={
                                    shouldReduceMotion
                                      ? { opacity: 1 }
                                      : { opacity: 1, height: 'auto' }
                                  }
                                  exit={
                                    shouldReduceMotion
                                      ? { opacity: 0 }
                                      : { opacity: 0, height: 0 }
                                  }
                                  transition={{
                                    duration: shouldReduceMotion ? 0.15 : 0.35,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-2 p-3.5 rounded-xl bg-black/[0.04] border border-black/10 flex flex-col gap-3 text-xs">
                                    {/* 01 Problem */}
                                    <div>
                                      <span className="text-[0.6rem] font-mono font-extrabold uppercase tracking-widest text-[#666] block mb-1">
                                        01 // THE PROBLEM
                                      </span>
                                      <p className="text-xs font-semibold text-[#222] leading-relaxed">
                                        {project.caseStudy.problemStatement}
                                      </p>
                                    </div>

                                    {/* 02 Trade-offs */}
                                    <div>
                                      <span className="text-[0.6rem] font-mono font-extrabold uppercase tracking-widest text-[#666] block mb-1.5">
                                        02 // DECISIONS & TRADE-OFFS
                                      </span>
                                      <div className="flex flex-col gap-2">
                                        {project.caseStudy.tradeoffs.map((item, tIdx) => (
                                          <div
                                            key={tIdx}
                                            className="p-2.5 rounded-lg bg-black/5 border border-black/5 flex flex-col gap-1"
                                          >
                                            <span className="font-bold text-[#111]">
                                              {item.decision}
                                            </span>
                                            <span className="text-[#444] text-[0.72rem] leading-normal">
                                              <strong className="text-[#222]">Trade-off:</strong>{' '}
                                              {item.tradeoff}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* 03 Next Roadmap */}
                                    <div>
                                      <span className="text-[0.6rem] font-mono font-extrabold uppercase tracking-widest text-[#666] block mb-1">
                                        03 // WHAT I WOULD IMPROVE NEXT
                                      </span>
                                      <ul className="list-disc list-inside space-y-1 text-[#333] text-[0.72rem] font-medium">
                                        {project.caseStudy.futureRoadmap.map((item, rIdx) => (
                                          <li key={rIdx} className="leading-relaxed">
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
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
            {/* Top Bar with Live Link and Copy Action */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#161616] border-b border-white/10 text-white select-none">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1" aria-hidden="true">
                  <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <span className="font-mono text-[0.62rem] font-bold text-white/70 truncate max-w-[130px] sm:max-w-[200px]">
                  {activeProject.liveLink.replace('https://', '')}
                </span>
                <button
                  id={`mobile-copy-btn-${activeProject.id}`}
                  type="button"
                  onClick={(e) => handleCopyUrl(activeProject.liveLink, e)}
                  aria-label={`Copy live URL for ${activeProject.name}`}
                  title={copiedUrl ? 'Copied!' : 'Copy URL'}
                  className="p-1 rounded bg-white/10 text-white/80 hover:text-white transition-all active:scale-90 cursor-pointer flex items-center justify-center"
                >
                  {copiedUrl ? (
                    <Check className="w-2.5 h-2.5 text-[#27C93F]" />
                  ) : (
                    <Copy className="w-2.5 h-2.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                {renderStatusBadge(
                  statusMap[activeProject.id],
                  activeProject.status.split('//')[0].trim()
                )}
              </div>
            </div>

            {/* Preview Image with Skeleton / Shimmer Blur-up */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black">
              <AnimatePresence mode="wait">
                <ProjectImage
                  key={activeProject.id}
                  src={activeProject.img}
                  alt={activeProject.imgAlt}
                  reduceMotion={shouldReduceMotion}
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
              <h3 className="font-black text-base uppercase text-[#111] truncate max-w-[180px]">
                {activeProject.name}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 border border-black/15 flex items-center justify-center cursor-pointer active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                aria-label="Previous project (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4 text-[#111]" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 border border-black/15 flex items-center justify-center cursor-pointer active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                aria-label="Next project (Right Arrow)"
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

            {/* Mobile Case Study Collapsible */}
            <div className="pt-1">
              <button
                id={`case-study-toggle-mobile-${activeProject.id}`}
                type="button"
                onClick={() => {
                  playTactileClick();
                  setExpandedCaseStudy((prev) =>
                    prev === activeProject.id ? null : activeProject.id
                  );
                }}
                aria-expanded={expandedCaseStudy === activeProject.id}
                aria-controls={`case-study-panel-mobile-${activeProject.id}`}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-black/5 hover:bg-black/10 border border-black/10 font-mono text-xs font-bold text-[#111] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-[#111]" />
                  <span>
                    {expandedCaseStudy === activeProject.id
                      ? 'Hide Case Study'
                      : 'Case Study: Problem & Trade-offs'}
                  </span>
                </div>
                <motion.div
                  animate={{
                    rotate: expandedCaseStudy === activeProject.id ? 180 : 0,
                  }}
                  transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
                >
                  <ChevronDown className="w-3.5 h-3.5 text-[#555]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedCaseStudy === activeProject.id && (
                  <motion.div
                    id={`case-study-panel-mobile-${activeProject.id}`}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, height: 0 }
                    }
                    animate={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 1, height: 'auto' }
                    }
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, height: 0 }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0.15 : 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 p-3.5 rounded-xl bg-black/[0.04] border border-black/10 flex flex-col gap-3 text-xs">
                      <div>
                        <span className="text-[0.6rem] font-mono font-extrabold uppercase tracking-widest text-[#666] block mb-1">
                          01 // THE PROBLEM
                        </span>
                        <p className="text-xs font-semibold text-[#222] leading-relaxed">
                          {activeProject.caseStudy.problemStatement}
                        </p>
                      </div>

                      <div>
                        <span className="text-[0.6rem] font-mono font-extrabold uppercase tracking-widest text-[#666] block mb-1.5">
                          02 // DECISIONS & TRADE-OFFS
                        </span>
                        <div className="flex flex-col gap-2">
                          {activeProject.caseStudy.tradeoffs.map((item, tIdx) => (
                            <div
                              key={tIdx}
                              className="p-2.5 rounded-lg bg-black/5 border border-black/5 flex flex-col gap-1"
                            >
                              <span className="font-bold text-[#111]">
                                {item.decision}
                              </span>
                              <span className="text-[#444] text-[0.72rem] leading-normal">
                                <strong className="text-[#222]">Trade-off:</strong>{' '}
                                {item.tradeoff}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[0.6rem] font-mono font-extrabold uppercase tracking-widest text-[#666] block mb-1">
                          03 // WHAT I WOULD IMPROVE NEXT
                        </span>
                        <ul className="list-disc list-inside space-y-1 text-[#333] text-[0.72rem] font-medium">
                          {activeProject.caseStudy.futureRoadmap.map((item, rIdx) => (
                            <li key={rIdx} className="leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                aria-label={`Launch live application: ${activeProject.name}`}
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
                aria-label={`View ${activeProject.name} source code on GitHub`}
                className="py-3 px-4 rounded-xl bg-[#111] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                title="View Source Code"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repo</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Section: Verified Production Deliverables & Defensible Bridge ── */}
        <div className="mt-4 sm:mt-6 p-6 sm:p-8 rounded-3xl bg-black/[0.04] border border-black/15 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          {/* Deliverable Metrics (Defensible, Honest Facts) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-1">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#111] tracking-tight font-mono">
                06
              </div>
              <div className="text-[0.68rem] font-mono font-bold uppercase tracking-wider text-[#555] mt-0.5">
                Shipped Works
              </div>
            </div>
            <div>
              {/* TODO: Replace with verified client engagement count or personal milestone */}
              <div className="text-2xl sm:text-3xl font-black text-[#111] tracking-tight font-mono">
                100%
              </div>
              <div className="text-[0.68rem] font-mono font-bold uppercase tracking-wider text-[#555] mt-0.5">
                Strict TypeScript
              </div>
            </div>
            <div>
              {/* TODO: Replace with your actual unit test coverage or zero-dependency count */}
              <div className="text-2xl sm:text-3xl font-black text-[#111] tracking-tight font-mono">
                0 Deps
              </div>
              <div className="text-[0.68rem] font-mono font-bold uppercase tracking-wider text-[#555] mt-0.5">
                Vanilla Game Engines
              </div>
            </div>
            <div>
              {/* TODO: Add measured Lighthouse p95 performance score or edge CDN metric */}
              <div className="text-2xl sm:text-3xl font-black text-[#111] tracking-tight font-mono">
                Global
              </div>
              <div className="text-[0.68rem] font-mono font-bold uppercase tracking-wider text-[#555] mt-0.5">
                Edge Deployed
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
              aria-label="View public repositories on GitHub"
              className="w-full md:w-auto px-5 py-3 rounded-2xl bg-[#111] hover:bg-black text-[#E8FF2A] font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <Github className="w-4 h-4" />
              <span>View Repos on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
