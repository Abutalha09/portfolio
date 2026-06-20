import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiveProjectButton from './LiveProjectButton';
import FadeIn from './FadeIn';

interface ProjectData {
  id: string;
  name: string;
  category: string;
  description: string;
  techTags: string[];
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  liveLink: string;
}

const featuredProjects: ProjectData[] = [
  {
    id: '01',
    name: 'Cosmic Portfolio',
    category: 'Brand Showcase',
    description: 'This interactive portfolio, designed with deep space dynamics, canvas particle flows, custom spring delay ring cursor, and extreme glassmorphism panels.',
    techTags: ['Canvas API', 'CSS variables', 'GitHub Pages'],
    col1Img1: '/portfolio.png',
    col1Img2: '/talha2.jpg',
    col2Img: '/portfolio.png',
    liveLink: 'https://abutalha09.github.io/portfolio/',
  },
  {
    id: '02',
    name: 'Video Downloader',
    category: 'Media Downloader',
    description: 'A clean, high-performance media downloader utility optimized for rapid client link parsing and download queues.',
    techTags: ['HTML/CSS', 'JavaScript', 'Render Deployment'],
    col1Img1: '/abusha.png',
    col1Img2: '/download.jpg',
    col2Img: '/abusha.png',
    liveLink: 'https://abusha.onrender.com',
  },
  {
    id: '03',
    name: 'Al-Madina Telecom',
    category: 'Repair Shop Studio',
    description: 'A premium mobile and watch repair studio landing page featuring trusted device care, diagnostic details, and a booking workflow.',
    techTags: ['HTML5 & CSS3', 'JavaScript', 'Netlify Host'],
    col1Img1: '/almadina.png',
    col1Img2: '/calculator.png',
    col2Img: '/almadina.png',
    liveLink: 'https://almadina1.netlify.app/',
  },
  {
    id: '04',
    name: 'Sleek Calculator',
    category: 'Everyday Utility',
    description: 'A light-weight calculator application providing prompt evaluations, tactile clicking, and advanced dark/light responsive layout.',
    techTags: ['HTML5', 'Flexbox CSS', 'Calculations'],
    col1Img1: '/Calculator1.png',
    col1Img2: '/calculator.png',
    col2Img: '/Calculator1.png',
    liveLink: 'https://abutalha09.github.io/calculator/',
  },
];

const otherProjects = [
  {
    name: 'Tic Tac Toe',
    category: 'Interactive Game',
    description: 'A tactile and responsive Tic Tac Toe game with smooth game resets, score logging, and an elegant UI.',
    techTags: ['Vanilla JS', 'CSS variables', 'State Tracking'],
    img: '/Tic tac toe.png',
    link: 'https://github.com/Abutalha09',
  },
  {
    name: 'Rock Paper Scissors',
    category: 'Interactive Game',
    description: 'Classic interactive game incorporating score logs, animation resets on select, and responsive layouts for mobile screens.',
    techTags: ['Vanilla JS', 'Web Animations', 'Score Tracker'],
    img: '/rock paper.png',
    link: 'https://github.com/Abutalha09',
  },
];

interface CardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
}

const Card: React.FC<CardProps> = ({ project, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      style={{
        top: `calc(${index * 28}px + 6rem)`,
      }}
      className="sticky h-[85vh] w-full origin-top"
    >
      <motion.div
        style={{
          scale,
        }}
        className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-7 md:p-9 flex flex-col justify-between overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Top Row */}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center gap-4 sm:gap-6 md:gap-8">
            {/* Number */}
            <div
              style={{ fontSize: 'clamp(2rem, 6vw, 75px)' }}
              className="font-black text-[#D7E2EA] leading-none select-none"
            >
              {project.id}
            </div>
            {/* Category and Name */}
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA] opacity-60">
                {project.category}
              </span>
              <span
                style={{ fontSize: 'clamp(1rem, 2.2vw, 1.8rem)' }}
                className="font-semibold uppercase text-[#D7E2EA] leading-tight"
              >
                {project.name}
              </span>
            </div>
          </div>
          {/* Live Button */}
          <LiveProjectButton href={project.liveLink} />
        </div>

        {/* Mid description & tags */}
        <div className="text-left mt-2 flex flex-col gap-2">
          <p className="text-xs sm:text-sm md:text-base text-[#D7E2EA]/80 font-light leading-relaxed max-w-3xl">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {project.techTags.map((tech) => (
              <span key={tech} className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#D7E2EA]/70">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Row: Two column image grid */}
        <div className="flex flex-row gap-4 sm:gap-6 md:gap-8 flex-grow mt-4 sm:mt-6 overflow-hidden items-stretch h-0">
          {/* Left Column (40% width) */}
          <div className="w-[40%] flex flex-col gap-4 sm:gap-6 md:gap-8 justify-between h-full">
            <img
              src={project.col1Img1}
              alt={`${project.name} mockup 1`}
              className="w-full h-[45%] object-cover rounded-[20px] sm:rounded-[30px] md:rounded-[40px] border border-white/5"
            />
            <img
              src={project.col1Img2}
              alt={`${project.name} mockup 2`}
              className="w-full h-[45%] object-cover rounded-[20px] sm:rounded-[30px] md:rounded-[40px] border border-white/5 flex-grow"
            />
          </div>

          {/* Right Column (60% width) */}
          <div className="w-[60%] flex h-full">
            <img
              src={project.col2Img}
              alt={`${project.name} design rendering`}
              className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[55px] border border-white/5"
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
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40 z-20 relative flex flex-col gap-16 md:gap-24"
    >
      {/* Title & Filters */}
      <div className="flex flex-col gap-6 sm:gap-8 items-center w-full">
        <FadeIn delay={0} y={40}>
          <h2
            style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
          >
            My Creations
          </h2>
        </FadeIn>

        {/* Filters Tabs */}
        <FadeIn delay={0.1} y={20}>
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest cursor-pointer transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[#D7E2EA] text-[#0C0C0C] shadow-lg font-bold'
                    : 'text-[#D7E2EA]/60 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Cards stack (Apps) */}
      {showApps && (
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-12 relative">
          {featuredProjects.map((project, index) => (
            <Card
              key={project.id}
              project={project}
              index={index}
              totalCards={featuredProjects.length}
            />
          ))}
        </div>
      )}

      {/* Other Projects Grid (Games) */}
      {showGames && (
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-10 mt-16 sm:mt-24">
          <FadeIn delay={0} y={30}>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-center tracking-wider text-[#D7E2EA]">
              Interactive Game Builds
            </h3>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
            {otherProjects.map((project, idx) => (
              <FadeIn
                key={project.name}
                delay={idx * 0.1}
                y={30}
                className="group flex flex-col bg-[#0F0F0F] rounded-[30px] border border-white/10 p-5 text-left hover:border-white/20 transition-all duration-300 shadow-lg justify-between"
              >
                <div>
                  {/* Image frame */}
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-[20px] mb-4 bg-[#0C0C0C] border border-white/5">
                    <img
                      src={project.img}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Meta */}
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#D7E2EA] opacity-50 block mb-1">
                    {project.category}
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold uppercase text-[#D7E2EA] mb-2 group-hover:text-[#BBCCD7] transition-colors">
                    {project.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techTags.map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#D7E2EA]/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2.5 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA] text-xs font-semibold tracking-wider uppercase hover:bg-white/5 transition-all w-full text-center"
                  >
                    View Code
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
