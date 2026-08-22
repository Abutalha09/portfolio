import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';

interface ProjectData {
  id: string;
  name: string;
  category: string;
  description: string;
  techTags: string[];
  img: string;
  imgAlt: string;
  liveLink: string;
  githubLink: string;
}

const featuredProjects: ProjectData[] = [
  {
    id: '01',
    name: 'Cosmic Portfolio',
    category: 'Brand Showcase',
    description: 'Needed a portfolio that felt alive, not static. Built with canvas particle flows, glassmorphism panels, and a custom cursor — turning a simple personal page into an immersive interactive experience.',
    techTags: ['Canvas API', 'CSS variables', 'GitHub Pages'],
    img: '/portfolio.webp',
    imgAlt: 'Cosmic Portfolio website — deep space particle animations with glassmorphism panels',
    liveLink: 'https://abutalha09.github.io/portfolio/',
    githubLink: 'https://github.com/Abutalha09/portfolio',
  },
  {
    id: '02',
    name: 'Abusha — Fast HD Social Media Video Downloader',
    category: 'Media Tool',
    description: 'Solved the problem of slow, ad-heavy video download sites by building Abusha — a high-performance web application for fast HD video downloads from YouTube, Instagram, Facebook, and TikTok with clean queue management.',
    techTags: ['HTML/CSS', 'JavaScript', 'Python', 'Render'],
    img: '/abusha.webp',
    imgAlt: 'Abusha — Fast HD Social Media Video Downloader web app — clean interface with download queue management',
    liveLink: 'https://abusha.onrender.com',
    githubLink: 'https://github.com/Abutalha09',
  },
  {
    id: '03',
    name: 'Al-Madina Telecom',
    category: 'Repair Shop Studio',
    description: 'A local repair shop needed a professional digital presence to attract customers. Designed and built a premium landing page with service details and a booking workflow to convert visitors into clients.',
    techTags: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
    img: '/almadina.webp',
    imgAlt: 'Al-Madina Telecom repair shop website — professional landing page with service listing',
    liveLink: 'https://almadina1.netlify.app/',
    githubLink: 'https://github.com/Abutalha09',
  },
  {
    id: '04',
    name: 'Sleek Calculator',
    category: 'Utility App',
    description: 'Rebuilt the browser calculator concept from scratch to explore prompt-based expression evaluation. Added tactile click feedback, keyboard support, and a responsive dark/light layout — clean and functional.',
    techTags: ['HTML5', 'CSS Flexbox', 'Vanilla JS'],
    img: '/Calculator1.webp',
    imgAlt: 'Sleek Calculator app — modern dark-mode calculator with keyboard support',
    liveLink: 'https://abutalha09.github.io/calculator/',
    githubLink: 'https://github.com/Abutalha09/calculator',
  },
];

const otherProjects = [
  {
    name: 'Tic Tac Toe',
    category: 'Interactive Game',
    description: 'Challenged myself to implement complete game state management in Vanilla JS — win detection, score logging, and smooth resets — without any framework.',
    techTags: ['Vanilla JS', 'CSS variables', 'State Tracking'],
    img: '/tic-tac-toe.webp',
    imgAlt: 'Tic Tac Toe game with score tracking and smooth UI',
    liveLink: 'https://abutalha09.github.io',
    link: 'https://github.com/Abutalha09',
  },
  {
    name: 'Rock Paper Scissors',
    category: 'Interactive Game',
    description: 'Built classic Rock Paper Scissors with animated choice reveals, computer AI, and score persistence — focused on delivering smooth micro-interactions across all screen sizes.',
    techTags: ['Vanilla JS', 'Web Animations', 'Score Tracker'],
    img: '/rock-paper.webp',
    imgAlt: 'Rock Paper Scissors game with animated moves and score tracking',
    liveLink: 'https://abutalha09.github.io',
    link: 'https://github.com/Abutalha09',
  },
];

interface StickyCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
}

const StickyCard: React.FC<StickyCardProps> = ({ project, index, totalCards }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      style={{ top: `calc(${index * 24}px + 5rem)` }}
      className="sticky h-auto min-h-[440px] md:h-[82vh] w-full origin-top"
    >
      <motion.div
        style={{ scale }}
        className="w-full h-full overflow-hidden shadow-xl group"
      >
        <div
          style={{
            borderRadius: '28px',
            border: '2px solid var(--border-dark)',
            background: 'var(--bg-card)',
            color: 'var(--text-dark)',
            width: '100%',
            height: '100%',
            transition: 'box-shadow 0.3s ease',
          }}
          className="flex flex-col p-5 sm:p-8 md:p-10 backdrop-blur-md hover:shadow-[0_0_40px_rgba(232,255,42,0.12)]"
        >
          {/* Top row */}
          <div className="flex items-start justify-between mb-4 sm:mb-6 gap-2">
            <div className="flex items-center gap-3 sm:gap-6">
              <span
                className="font-black leading-none select-none opacity-20"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)', fontFamily: "'Inter'", color: 'var(--text-dark)' }}
              >
                {project.id}
              </span>
              <div>
                <p className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.18em] text-[var(--text-mid)] font-semibold mb-0.5">
                  {project.category}
                </p>
                <h3
                  className="font-black uppercase text-[var(--text-dark)] leading-tight"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 1.75rem)', fontFamily: "'Inter'" }}
                >
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener"
                    className="hover:text-[var(--accent)] transition-colors inline-block"
                  >
                    {project.name}
                  </a>
                </h3>
              </div>
            </div>
            {/* Live + GitHub links */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener"
                className="btn-outline text-[0.65rem] py-1.5 px-3 sm:py-2 sm:px-3.5"
                id={`project-github-${project.id}`}
                aria-label={`${project.name} GitHub repository`}
              >
                GitHub ↗
              </a>
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener"
                className="btn-yellow text-[0.65rem] py-1.5 px-3.5 sm:py-2 sm:px-4"
                id={`project-link-${project.id}`}
                aria-label={`${project.name} live demo`}
              >
                Live ↗
              </a>
            </div>
          </div>

          {/* Description and tags */}
          <div className="mb-4">
            <p className="text-xs sm:text-base text-[var(--text-mid)] leading-relaxed max-w-2xl mb-3 font-medium">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.techTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.58rem] sm:text-[0.6rem] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide"
                  style={{ background: 'var(--bg-card)', color: 'var(--text-dark)', border: '1px solid var(--border)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Project image */}
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener"
            className="flex-1 overflow-hidden min-h-[160px] sm:min-h-[220px] block cursor-pointer"
            style={{ borderRadius: '16px', border: '1px solid var(--border)' }}
            aria-label={`Open ${project.name}`}
          >
            <img
              src={project.img}
              alt={project.imgAlt}
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Apps' | 'Games'>('All');
  const filters: ('All' | 'Apps' | 'Games')[] = ['All', 'Apps', 'Games'];
  const showApps = activeFilter === 'All' || activeFilter === 'Apps';
  const showGames = activeFilter === 'All' || activeFilter === 'Games';

  return (
    <section
      className="w-full px-4 sm:px-8 md:px-10 py-20 sm:py-28 relative"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <FadeIn delay={0} y={20} className="flex justify-center mb-4">
          <span className="tag-yellow">03 — Projects</span>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.1} y={40} className="text-center mb-10">
          <h2
            className="section-heading"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
          >
            My Creations
          </h2>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.15} y={20} className="flex justify-center mb-14 sm:mb-20">
          <div
            className="flex p-1 rounded-full"
            style={{ background: 'rgba(17,17,17,0.08)', border: '1px solid rgba(17,17,17,0.12)' }}
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer"
                style={{
                  background: activeFilter === f ? 'var(--accent)' : 'transparent',
                  color: activeFilter === f ? '#111' : 'var(--text-light)',
                  boxShadow: activeFilter === f ? '0 2px 12px rgba(232,255,42,0.3)' : 'none',
                  fontFamily: "'Inter'",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Sticky cards */}
        {showApps && (
          <div className="flex flex-col gap-10 relative mb-16">
            {featuredProjects.map((project, index) => (
              <StickyCard
                key={project.id}
                project={project}
                index={index}
                totalCards={featuredProjects.length}
              />
            ))}
          </div>
        )}

        {/* Games grid */}
        {showGames && (
          <div className="mt-20 sm:mt-28">
            <FadeIn delay={0} y={25}>
              <h3
                className="font-black uppercase text-center mb-10 tracking-wider"
                style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontFamily: "'Inter'", color: '#111' }}
              >
                Interactive Games
              </h3>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherProjects.map((proj, idx) => (
                <FadeIn
                  key={proj.name}
                  delay={idx * 0.1}
                  y={30}
                  className="group card-light p-5 hover:scale-[1.01] transition-all duration-300"
                >
                  <div
                    className="w-full aspect-[16/10] overflow-hidden rounded-xl mb-4"
                    style={{ border: '1px solid rgba(17,17,17,0.08)' }}
                  >
                    <img
                      src={proj.img}
                      alt={proj.imgAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-light)] block mb-1">
                    {proj.category}
                  </span>
                  <h4 className="font-black uppercase text-[#111] text-lg mb-2" style={{ fontFamily: "'Inter'" }}>
                    {proj.name}
                  </h4>
                  <p className="text-xs text-[#555] leading-relaxed mb-4">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.techTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.6rem] px-2 py-0.5 rounded-full font-bold uppercase"
                        style={{ background: 'rgba(17,17,17,0.07)', color: '#555', border: '1px solid rgba(17,17,17,0.1)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-xs flex-1 justify-center"
                    >
                      GitHub ↗
                    </a>
                    <a
                      href={proj.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-yellow text-xs flex-1 justify-center"
                    >
                      Live ↗
                    </a>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
