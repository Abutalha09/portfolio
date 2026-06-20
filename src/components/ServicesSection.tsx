import React from 'react';
import FadeIn from './FadeIn';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    id: '01',
    role: 'Product Support Associate',
    company: 'Polar Bear Tech (2026 - Present)',
    description: 'Supporting flagship operational platforms, handling user interface queries, database configurations, compiling guides, and streamlining SaaS client operations.',
  },
  {
    id: '02',
    role: 'EduBuddy Platform Support',
    company: 'School Operation Suite',
    description: 'Assisting academic client operations utilizing a SaaS suite automating registrations, fee billings, parent messaging, and gradebook databases.',
  },
  {
    id: '03',
    role: 'HotelBuddy Platform Support',
    company: 'Hospitality Control Hub',
    description: 'Providing technical and configuration support for a comprehensive hotel engine tracking bookings, POS invoice logs, housekeeping, and room occupancy.',
  },
  {
    id: '04',
    role: 'Web Operations Prep',
    company: 'BCA Web Portals Training',
    description: 'Contributed to school management backends and portals during academic training, reinforcing database alignment and frontend operations.',
  },
  {
    id: '05',
    role: 'Technical Operations',
    company: 'SaaS Platform Optimizations',
    description: 'Ensuring operations run smoothly, debugging workflow bottlenecks, and optimizing configuration settings across multiple client platforms.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full z-10 relative border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto flex flex-col">
        {/* Title */}
        <FadeIn delay={0} y={40}>
          <h2
            style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
            className="text-[#D7E2EA] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight hero-heading"
          >
            Experience
          </h2>
        </FadeIn>

        {/* Experience List */}
        <div className="flex flex-col border-t border-white/10">
          {experiences.map((exp, index) => (
            <FadeIn
              key={exp.id}
              delay={index * 0.1}
              y={30}
              className="border-b border-white/10 group hover:bg-white/5 transition-all duration-300 rounded-2xl px-4 sm:px-6"
            >
              <div className="flex flex-row items-center py-8 sm:py-10 md:py-12 gap-6 md:gap-12 w-full text-left">
                {/* Left side: Huge number */}
                <div
                  style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}
                  className="font-black text-[#D7E2EA]/10 group-hover:text-cyan-400/20 transition-colors duration-300 leading-none select-none w-[20%] sm:w-[25%] min-w-[70px] sm:min-w-[120px]"
                >
                  {exp.id}
                </div>

                {/* Right side: Role, company and description stacked */}
                <div className="flex flex-col flex-1 justify-center">
                  <h3
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 1.8rem)' }}
                    className="font-medium uppercase text-[#D7E2EA] mb-1 leading-snug group-hover:text-cyan-400 transition-colors duration-300"
                  >
                    {exp.role}
                  </h3>
                  <span className="text-xs sm:text-sm uppercase tracking-widest text-cyan-400 font-semibold mb-3">
                    {exp.company}
                  </span>
                  <p
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                    className="font-light leading-relaxed max-w-2xl text-[#D7E2EA]/75"
                  >
                    {exp.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Showcase Images: EduBuddy & HotelBuddy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 sm:mt-24 w-full">
          <FadeIn delay={0.1} y={30} className="flex flex-col bg-[#0F0F0F] rounded-3xl p-4 sm:p-6 text-left border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl">
            <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider mb-2">Platform Preview</span>
            <h4 className="font-semibold text-lg sm:text-xl text-[#D7E2EA] mb-3">EduBuddy School Operations</h4>
            <div className="w-full rounded-2xl overflow-hidden border border-white/5 bg-black">
              <img src="/edubuddy-showcase.png" alt="EduBuddy Portal" className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-300" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2} y={30} className="flex flex-col bg-[#0F0F0F] rounded-3xl p-4 sm:p-6 text-left border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl">
            <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider mb-2">Platform Preview</span>
            <h4 className="font-semibold text-lg sm:text-xl text-[#D7E2EA] mb-3">HotelBuddy Control Hub</h4>
            <div className="w-full rounded-2xl overflow-hidden border border-white/5 bg-black">
              <img src="/hotelbuddy-showcase.png" alt="HotelBuddy Portal" className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-300" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
