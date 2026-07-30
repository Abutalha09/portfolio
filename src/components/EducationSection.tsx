import React from 'react';
import FadeIn from './FadeIn';

const educationTimeline = [
  {
    year: '2023 — 2026',
    title: 'Bachelor of Computer Applications',
    institution: 'Vision Management College',
    description: 'BCA focused degree covering relational databases, software design cycles, web development, and algorithms.',
    tags: ['Application Logic', 'Frontend Paradigms', 'Databases'],
    isHighlight: true,
  },
  {
    year: '2022 — 2023',
    title: 'Intermediate Education',
    institution: 'Harjinder Nagar College',
    description: 'Transitional learning phase preparing towards computer science, coding foundations, and mathematical logic.',
    tags: ['Algebraic Analysis', 'CS Foundations'],
    isHighlight: false,
  },
  {
    year: '2020 — 2021',
    title: 'High School Education',
    institution: 'SU Memorial',
    description: 'Primary academic baseline with consistent coursework, team dynamics, and structured studies.',
    tags: ['Study Methodology', 'Academic Focus'],
    isHighlight: false,
  },
];

const certifications = [
  { name: 'Web Development Certification', issuer: 'Academic Program', year: '2025' },
  { name: 'Digital Marketing Foundations', issuer: 'Online Course', year: '2024' },
  { name: 'Python Programming', issuer: 'Online Course', year: '2024' },
];

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      className="w-full px-4 sm:px-8 md:px-10 py-20 sm:py-28 relative"
      style={{ background: '#CAC5BA' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <FadeIn delay={0} y={20} className="flex justify-center mb-4">
          <span className="tag-yellow">05 — Education</span>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.1} y={40} className="text-center mb-14 sm:mb-20">
          <h2
            className="section-heading"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
          >
            Academic<br />Journey
          </h2>
        </FadeIn>

        {/* Timeline */}
        <div className="timeline-line pl-8 ml-2 sm:ml-4 flex flex-col gap-6 mb-16">
          {educationTimeline.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.12} y={25}>
              <div className="relative">
                {/* Dot */}
                <div
                  className="timeline-dot absolute -left-[42px] top-5"
                  style={{ background: item.isHighlight ? '#E8FF2A' : 'rgba(17,17,17,0.25)' }}
                />

                {/* Card */}
                <div
                  className="card-light p-5 sm:p-7 hover:scale-[1.01] transition-all duration-300"
                  style={{
                    border: item.isHighlight ? '2px solid rgba(232,255,42,0.5)' : '1px solid rgba(17,17,17,0.1)',
                    boxShadow: item.isHighlight ? '0 4px 24px rgba(232,255,42,0.15)' : 'none',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-wider w-fit"
                      style={{
                        background: item.isHighlight ? '#E8FF2A' : 'rgba(17,17,17,0.08)',
                        color: '#111',
                        border: '1px solid rgba(17,17,17,0.12)',
                      }}
                    >
                      {item.year}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#777]">
                      {item.institution}
                    </span>
                  </div>

                  <h3
                    className="font-black uppercase text-[#111] mb-2"
                    style={{ fontSize: 'clamp(0.9rem, 2vw, 1.25rem)', fontFamily: "'Inter'" }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.6rem] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide"
                        style={{ background: 'rgba(17,17,17,0.06)', color: '#555', border: '1px solid rgba(17,17,17,0.1)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Certifications */}
        <FadeIn delay={0.3} y={25}>
          <h3 className="font-black uppercase text-sm tracking-widest text-[#555] mb-6" style={{ fontFamily: "'Inter'" }}>
            Certifications &amp; Courses
          </h3>
          <div className="flex flex-col gap-3">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-4 rounded-2xl hover:bg-white/40 transition-all duration-200"
                style={{ border: '1px solid rgba(17,17,17,0.1)', background: 'rgba(255,255,255,0.25)' }}
              >
                <div>
                  <h4 className="font-bold text-sm text-[#111]">{cert.name}</h4>
                  <p className="text-xs text-[#777]">{cert.issuer}</p>
                </div>
                <span className="tag-yellow flex-shrink-0">{cert.year}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default EducationSection;
