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
  liveLink: string;
}

const featuredProjects: ProjectData[] = [
  {
    id: '01',
    name: 'Cosmic Portfolio',
    category: 'Brand Showcase',
    description: 'An interactive portfolio with deep space dynamics, canvas particle flows, custom cursor, and glassmorphism panels.',
    techTags: ['Canvas API', 'CSS variables', 'GitHub Pages'],
    img: '/portfolio.png',
    liveLink: 'https://abutalha09.github.io/portfolio/',
  },
  {
    id: '02',
    name: 'Video Downloader',
    category: 'Media Tool',
    description: 'A high-performance media downloader utility optimized for rapid client link parsing and download queues.',
    techTags: ['HTML/CSS', 'JavaScript', 'Render'],
    img: '/abusha.png',
    liveLink: 'https://abusha.onrender.com',
  },
  {
    id: '03',
    name: 'Al-Madina Telecom',
    category: 'Repair Shop Studio',
    description: 'Premium mobile and watch repair studio landing page with diagnostic details and a booking workflow.',
    techTags: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
    img: '/almadina.png',
    liveLink: 'https://almadina1.netlify.app/',
  },
  {
    id: '04',
    name: 'Sleek Calculator',
    category: 'Utility App',
    description: 'A lightweight calculator with prompt evaluations, tactile click feedback, and dark/light responsive layout.',
    techTags: ['HTML5', 'CSS Flexbox', 'Vanilla JS'],
    img: '/Calculator1.png',
    liveLink: 'https://abutalha09.github.io/calculator/',
  },
];

const otherProjects = [
  {
    name: 'Tic Tac Toe',
    category: 'Interactive Game',
    description: 'A tactile Tic Tac Toe game with smooth resets, score logging, and elegant UI.',
    techTags: ['Vanilla JS', 'CSS variables', 'State Tracking'],
    img: '/Tic tac toe.png',
    link: 'https://github.com/Abutalha09',
  },
  {
    name: 'Rock Paper Scissors',
    category: 'Interactive Game',
    description: 'Classic game with animation resets, score tracking, and responsive layouts for mobile.',
    techTags: ['Vanilla JS', 'Web Animations', 'Score Tracker'],
    img: '/rock paper.png',
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
      className="sticky h-[82vh] w-full origin-top"
    >
      <motion.div
        style={{ scale }}
        className="w-full h-full overflow-hidden shadow-xl"
      >
        <div
          style={{
            borderRadius: '32px',
            border: '2px solid rgba(17,17,17,0.15)',
            background: index % 2 === 0 ? '#F0EDE6' : '#E8E4DC',
            width: '100%',
            height: '100%',
          }}
          className="flex flex-col p-6 sm:p-8 md:p-10"
        >
          {/* Top row */}
          <div className="flex items-start justify-between mb-5 sm:mb-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <span
                className="font-black leading-none select-none"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontFamily: "'Inter'", color: 'rgba(17,17,17,0.1)' }}
              >
                {project.id}
              </span>
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[#888] font-semibold mb-0.5">
                  {project.category}
                </p>
                <h3
                  className="font-black uppercase text-[#111] leading-none"
                  style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)', fontFamily: "'Inter'" }}
                >
                  {project.name}
                </h3>
              </div>
            </div>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-yellow text-[0.65rem] py-2 px-4 flex-shrink-0"
              id={`project-link-${project.id}`}
            >
              Live ↗
            </a>
          </div>

          {/* Description and tags */}
          <div className="mb-5">
            <p className="text-sm sm:text-base text-[#444] leading-relaxed max-w-2xl mb-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.6rem] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide"
                  style={{ background: 'rgba(17,17,17,0.08)', color: '#333', border: '1px solid rgba(17,17,17,0.12)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Project image */}
          <div
            className="flex-1 overflow-hidden"
            style={{
              borderRadius: '20px',
              border: '1px solid rgba(17,17,17,0.1)',
              minHeight: 0,
            }}
          >
            <img
              src={project.img}
              alt={project.name}
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
            />
          </div>
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
      id="projects"
      className="w-full px-4 sm:px-8 md:px-10 py-20 sm:py-28 relative"
      style={{ background: '#CAC5BA' }}
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
                  background: activeFilter === f ? '#E8FF2A' : 'transparent',
                  color: activeFilter === f ? '#111' : '#666',
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
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[#888] block mb-1">
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
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-xs w-full justify-center"
                  >
                    View Code ↗
                  </a>
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
