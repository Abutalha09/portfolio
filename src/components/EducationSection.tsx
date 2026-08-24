import React from 'react';
import { motion } from 'framer-motion';
import { MaskReveal, KineticBackWord, EditorialRow, CountUp } from './KineticEditorial';

interface EducationItem {
  index: string;
  year: string;
  title: string;
  institution: string;
  description: string;
  tags: string[];
  isHighlight: boolean;
}

const educationTimeline: EducationItem[] = [
  {
    index: '01',
    year: '2023 — 2026',
    title: 'Bachelor of Computer Applications',
    institution: 'Vision Institute of Technology',
    description: 'BCA focused degree covering relational databases, software design cycles, web development, and algorithms.',
    tags: ['Application Logic', 'Frontend Paradigms', 'Databases'],
    isHighlight: true,
  },
  {
    index: '02',
    year: '2022 — 2023',
    title: 'Intermediate Education',
    institution: 'Harjinder Nagar College',
    description: 'Transitional learning phase preparing towards computer science, coding foundations, and mathematical logic.',
    tags: ['Algebraic Analysis', 'CS Foundations'],
    isHighlight: false,
  },
  {
    index: '03',
    year: '2020 — 2021',
    title: 'High School Education',
    institution: 'SU Memorial',
    description: 'Primary academic baseline with consistent coursework, team dynamics, and structured studies.',
    tags: ['Study Methodology', 'Academic Focus'],
    isHighlight: false,
  },
];

const certifications = [
  { name: 'Web Development Certification', issuer: 'Academic Program', year: 2025 },
  { name: 'Digital Marketing Foundations', issuer: 'Online Course', year: 2024 },
  { name: 'Python Programming', issuer: 'Online Course', year: 2024 },
];

export const EducationSection: React.FC = () => {
  return (
    <section
      className="w-full px-4 sm:px-8 md:px-10 py-20 sm:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-dark)' }}
    >
      <KineticBackWord>Study</KineticBackWord>

      <div className="kx-content max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <motion.span
            className="tag-yellow"
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            05 — Education
          </motion.span>
          <MaskReveal
            as="h2"
            className="section-heading"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)', marginTop: '1rem' }}
            text={'Academic\nJourney'}
          />
        </div>

        {/* Education ledger — hairline-ruled editorial rows */}
        <div className="kx-list">
          {educationTimeline.map((item, i) => (
            <EditorialRow
              key={item.index}
              index={item.index}
              title={item.title}
              meta={item.institution}
              period={item.year}
              description={item.description}
              tags={item.tags}
              highlight={item.isHighlight}
              delay={i * 0.05}
            />
          ))}
        </div>

        {/* Certifications ledger — borderless list with rolling years */}
        <div className="kx-certs" style={{ marginTop: 'clamp(3rem, 6vw, 5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
            <span style={{ width: '28px', height: '2px', background: 'var(--accent)', flexShrink: 0 }} />
            <MaskReveal as="h3" className="kx-subhead" text="Certifications & Courses" />
          </div>

          <div>
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                className="kx-cert group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <div>
                  <MaskReveal as="span" className="kx-cert-name" text={cert.name} delay={i * 0.06} />
                  <span className="kx-cert-issuer">{cert.issuer}</span>
                </div>
                <span className="kx-cert-year">
                  <CountUp to={cert.year} />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
