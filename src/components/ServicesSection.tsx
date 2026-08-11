import React from 'react';
import FadeIn from './FadeIn';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    id: '01',
    role: 'Product Support Associate',
    company: 'Polar Bear Tech',
    period: '2026 — Present',
    description: 'Supporting flagship operational platforms, handling user interface queries, database configurations, compiling guides, and streamlining SaaS client operations.',
  },
  {
    id: '02',
    role: 'EduBuddy Platform Support',
    company: 'School Operation Suite',
    period: '2025 — 2026',
    description: 'Assisting academic client operations utilizing a SaaS suite automating registrations, fee billings, parent messaging, and gradebook databases.',
  },
  {
    id: '03',
    role: 'HotelBuddy Platform Support',
    company: 'Hospitality Control Hub',
    period: '2024 — 2025',
    description: 'Providing technical and configuration support for a comprehensive hotel engine tracking bookings, POS invoice logs, housekeeping, and room occupancy.',
  },
  {
    id: '04',
    role: 'Web Operations Intern',
    company: 'BCA Academic Portals',
    period: '2023 — 2024',
    description: 'Contributed to school management backends and portals during academic training, reinforcing database alignment and frontend operations.',
  },
  {
    id: '05',
    role: 'Technical Operations',
    company: 'SaaS Platform Optimizations',
    period: '2023',
    description: 'Ensuring operations run smoothly, debugging workflow bottlenecks, and optimizing configuration settings across multiple client platforms.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="w-full px-4 sm:px-8 md:px-10 py-20 sm:py-28 relative"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-dark)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <FadeIn delay={0} y={20} className="flex justify-center mb-4">
          <span className="tag-yellow">02 — Experience</span>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.1} y={40} className="text-center mb-14 sm:mb-20">
          <h2
            className="section-heading text-[var(--text-dark)]"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
          >
            Where I've<br />Worked
          </h2>
        </FadeIn>

        {/* Experience list */}
        <div className="flex flex-col" style={{ borderTop: '1px solid var(--border-dark)' }}>
          {experiences.map((exp, index) => (
            <FadeIn
              key={exp.id}
              delay={index * 0.07}
              y={20}
              className="group transition-all duration-300"
            >
              <div
                className="flex flex-col sm:flex-row sm:items-center py-7 sm:py-9 gap-4 sm:gap-8 cursor-default px-3 rounded-2xl transition-all duration-300 hover:bg-[var(--bg-card)]"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                {/* Number */}
                <span
                  className="font-black leading-none select-none flex-shrink-0 opacity-20"
                  style={{
                    fontSize: 'clamp(1.8rem, 5vw, 4rem)',
                    color: 'var(--text-dark)',
                    fontFamily: "'Inter'",
                    width: '80px',
                  }}
                >
                  {exp.id}
                </span>

                {/* Main info */}
                <div className="flex-1 flex flex-col gap-1">
                  <h3
                    className="font-black uppercase text-[var(--text-dark)] leading-tight transition-colors"
                    style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontFamily: "'Inter'" }}
                  >
                    {exp.role}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--text-mid)]">
                    {exp.company}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--text-mid)] leading-relaxed mt-1 max-w-2xl font-medium">
                    {exp.description}
                  </p>
                </div>

                {/* Period badge */}
                <div className="flex-shrink-0">
                  <span
                    className="inline-block px-3 py-1.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wider group-hover:bg-[var(--accent)] group-hover:text-[#111] transition-all duration-300"
                    style={{
                      background: 'var(--bg-card)',
                      color: 'var(--text-dark)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Platform showcase */}
        <FadeIn delay={0.3} y={30} className="mt-16 sm:mt-24">
          <h3 className="font-black uppercase text-sm tracking-widest text-[var(--text-mid)] mb-6" style={{ fontFamily: "'Inter'" }}>
            Platforms I've Supported
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'EduBuddy School Operations', src: '/edubuddy-showcase.png', alt: 'EduBuddy Portal' },
              { label: 'HotelBuddy Control Hub', src: '/hotelbuddy-showcase.png', alt: 'HotelBuddy Portal' },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 sm:p-5 hover:scale-[1.01] transition-transform duration-300 rounded-2xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <span className="tag-yellow mb-3 inline-block">Platform Preview</span>
                <h4 className="font-bold text-base text-[var(--text-dark)] mb-3">{item.label}</h4>
                <div className="w-full rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto object-cover transition-opacity duration-300 hover:opacity-90"
                  />
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ServicesSection;
