import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MaskReveal, KineticBackWord, EditorialRow } from './KineticEditorial';

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

interface GameData {
  id: string;
  name: string;
  category: string;
  description: string;
  techTags: string[];
  liveLink: string;
}

const otherProjects: GameData[] = [
  {
    id: '01',
    name: 'Tic Tac Toe',
    category: 'Interactive Game',
    description: 'Challenged myself to implement complete game state management in Vanilla JS — win detection, score logging, and smooth resets — without any framework.',
    techTags: ['Vanilla JS', 'CSS variables', 'State Tracking'],
    liveLink: 'https://abutalha09.github.io',
  },
  {
    id: '02',
    name: 'Rock Paper Scissors',
    category: 'Interactive Game',
    description: 'Built classic Rock Paper Scissors with animated choice reveals, computer AI, and score persistence — focused on delivering smooth micro-interactions across all screen sizes.',
    techTags: ['Vanilla JS', 'Web Animations', 'Score Tracker'],
    liveLink: 'https://abutalha09.github.io',
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Apps' | 'Games'>('All');
  const filters: ('All' | 'Apps' | 'Games')[] = ['All', 'Apps', 'Games'];
  const showApps = activeFilter === 'All' || activeFilter === 'Apps';
  const showGames = activeFilter === 'All' || activeFilter === 'Games';

  return (
    <section
      className="w-full px-4 sm:px-8 md:px-10 py-20 sm:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-dark)' }}
    >
      <KineticBackWord>Build</KineticBackWord>

      <div className="kx-content max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <motion.span
            className="tag-yellow"
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            03 — Projects
          </motion.span>
          <MaskReveal
            as="h2"
            className="section-heading"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)', marginTop: '1rem' }}
            text={'My\nCreations'}
          />
        </div>

        {/* Filters */}
        <motion.div
          className="flex mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
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
        </motion.div>

        {/* Featured apps — editorial image-led blocks */}
        {showApps && (
          <div className="kxp-list">
            {featuredProjects.map((p, idx) => (
              <article key={p.id} className="kxp-item">
                <div className="kxp-text">
                  <div className="kxp-head">
                    <span className="kxp-index" aria-hidden="true">{p.id}</span>
                    <div className="kxp-headings">
                      <span className="kx-shot-eyebrow">{p.category}</span>
                      <MaskReveal as="h3" className="kxp-title" text={p.name} delay={0.05} />
                    </div>
                  </div>

                  <p className="kx-desc" style={{ maxWidth: '46ch' }}>{p.description}</p>

                  <div className="kx-tags">
                    {p.techTags.map((t) => (
                      <span key={t} className="kx-tag">{t}</span>
                    ))}
                  </div>

                  <div className="kxp-links">
                    <a
                      id={`project-link-${p.id}`}
                      className="kxp-link kxp-link--live"
                      href={p.liveLink}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${p.name} live demo`}
                    >
                      Live ↗
                    </a>
                    <a
                      id={`project-github-${p.id}`}
                      className="kxp-link"
                      href={p.githubLink}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${p.name} GitHub repository`}
                    >
                      GitHub ↗
                    </a>
                  </div>
                </div>

                <a
                  className="kxp-media group"
                  href={p.liveLink}
                  target="_blank"
                  rel="noopener"
                  aria-label={`Open ${p.name}`}
                >
                  <img src={p.img} alt={p.imgAlt} loading="lazy" />
                  <motion.div
                    className="kx-shot-cover"
                    initial={{ scaleX: 1 }}
                    whileInView={{ scaleX: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.85, ease: EASE, delay: idx * 0.06 }}
                  />
                </a>
              </article>
            ))}
          </div>
        )}

        {/* Interactive games — editorial ledger */}
        {showGames && (
          <div style={{ marginTop: showApps ? 'clamp(3.5rem, 7vw, 6rem)' : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <span style={{ width: '28px', height: '2px', background: 'var(--accent)', flexShrink: 0 }} />
              <MaskReveal as="h3" className="kx-subhead" text="Interactive Games" />
            </div>

            <div className="kx-list">
              {otherProjects.map((g, i) => (
                <EditorialRow
                  key={g.name}
                  index={g.id}
                  title={g.name}
                  meta={g.category}
                  period=""
                  description={g.description}
                  tags={g.techTags}
                  href={g.liveLink}
                  delay={i * 0.05}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
