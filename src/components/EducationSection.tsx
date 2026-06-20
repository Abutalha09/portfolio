import React from 'react';
import FadeIn from './FadeIn';

interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  description: string;
  tags: string[];
}

const educationTimeline: TimelineItem[] = [
  {
    year: '2023 — 2026',
    title: 'Bachelor of Computer Applications',
    institution: 'Vision Management College',
    description: 'Focused degree program in computer applications (BCA), covering relational databases, software design cycles, web development, and algorithms.',
    tags: ['Application Logic', 'Frontend Paradigms'],
  },
  {
    year: '2022 — 2023',
    title: 'Intermediate Education',
    institution: 'Harjinder Nagar College',
    description: 'Transitional learning phase preparing path directions towards computer science logic, coding foundations, and logical math structures.',
    tags: ['Algebraic Analysis', 'Career Pathing'],
  },
  {
    year: '2020 — 2021',
    title: 'High School Education',
    institution: 'SU Memorial',
    description: 'Primary academic baseline highlighting consistent coursework participation, team dynamics, and structured studies.',
    tags: ['Study Methodology', 'Academic Focus'],
  },
];

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-24 sm:py-32 w-full z-20 relative border-t border-white/5"
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
          >
            Education
          </h2>
        </FadeIn>

        {/* Education Timeline */}
        <div className="flex flex-col text-left w-full">
          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#D7E2EA] mb-8 border-b border-white/10 pb-4">
            Academic Journey
          </h3>

          <div className="relative border-l border-white/10 pl-6 ml-2 flex flex-col gap-8">
            {educationTimeline.map((item, idx) => (
              <FadeIn
                key={idx}
                delay={idx * 0.1}
                y={20}
                className="relative flex flex-col bg-[#0F0F0F] rounded-[30px] border border-white/10 hover:border-cyan-500/30 p-6 sm:p-8 hover:scale-[1.01] transition-all duration-300 shadow-xl group text-left"
              >
                {/* Timeline bullet node (pulsing glow) */}
                <div className="absolute -left-[35px] top-[30px] w-5 h-5 rounded-full bg-[#0C0C0C] border-4 border-cyan-500 shadow-[0_0_10px_#22d3ee] group-hover:scale-110 transition-transform z-10"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 w-full">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20 w-fit">
                    {item.year}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D7E2EA]/60">
                    {item.institution}
                  </span>
                </div>
                
                <h4 className="text-lg sm:text-xl font-bold uppercase text-[#D7E2EA] mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {item.title}
                </h4>
                
                <p className="text-xs sm:text-sm md:text-base text-[#D7E2EA]/75 font-light leading-relaxed mb-4">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#D7E2EA]/60 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
