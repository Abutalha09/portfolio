import React from 'react';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full px-4 sm:px-8 md:px-10 py-20 sm:py-28 md:py-36 overflow-hidden"
      style={{ background: '#CAC5BA' }}
    >
      {/* Section label */}
      <FadeIn delay={0} y={20} className="flex justify-center mb-4">
        <span className="tag-yellow">01 — About Me</span>
      </FadeIn>

      {/* Giant heading */}
      <FadeIn delay={0.1} y={40} className="text-center mb-12 sm:mb-16">
        <h2
          className="section-heading"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
        >
          The Dev.<br />
          That's Abutalha.
        </h2>
      </FadeIn>

      {/* Content grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">

        {/* Left — Photo */}
        <FadeIn delay={0.2} y={30} className="md:col-span-5">
          <div
            className="relative overflow-hidden shadow-2xl mx-auto"
            style={{
              maxWidth: '380px',
              borderRadius: '32px',
              border: '2px solid rgba(17,17,17,0.12)',
              aspectRatio: '4/5',
              background: '#B8B3A8',
            }}
          >
            <img
              src="/talha2.jpg"
              alt="Mohammad Abutalha"
              className="w-full h-full object-cover"
              style={{ borderRadius: '28px' }}
            />
            {/* Yellow accent strip */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '4px',
                background: '#E8FF2A',
              }}
            />
          </div>

          {/* Quick facts card */}
          <FadeIn delay={0.35} y={20} className="mt-6">
            <div
              className="card-light p-5 rounded-2xl"
              style={{ maxWidth: '380px', margin: '0 auto' }}
            >
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#333] mb-4">Quick Facts</h4>
              {[
                { label: 'Location', value: 'Kanpur, India 🇮🇳' },
                { label: 'Degree', value: 'BCA — Computer Applications' },
                { label: 'Role', value: 'Product Support Associate' },
                { label: 'Status', value: '✅ Open to Opportunities' },
              ].map((fact) => (
                <div key={fact.label} className="flex justify-between items-center py-2 border-b last:border-b-0" style={{ borderColor: 'rgba(17,17,17,0.1)' }}>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#666]">{fact.label}</span>
                  <span className="text-xs font-bold text-[#111]">{fact.value}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </FadeIn>

        {/* Right — Text content */}
        <div className="md:col-span-7 flex flex-col gap-8">
          <FadeIn delay={0.3} y={25}>
            <AnimatedText
              text="I am a passionate Web Developer and BCA graduate, widely known online as Abutalha09. I love building fast, clean, and interactive user interfaces using modern web methodologies. During my structured training, I contributed actively to school management portals and administrative backends, reinforcing my knowledge of database alignment, frontend state flow, and teamwork. I am continuously learning, and currently working as a Product Support Associate, helping clients configure and optimize complex enterprise operations across school and hotel management spaces."
              className="leading-relaxed font-medium text-[#333]"
              style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)' } as React.CSSProperties}
            />
          </FadeIn>

          {/* Skills preview */}
          <FadeIn delay={0.4} y={20}>
            <div className="flex flex-wrap gap-2">
              {['HTML5', 'CSS3', 'JavaScript', 'React', 'Python', 'Git', 'Responsive Design', 'SaaS Support'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-full transition-all duration-200 hover:bg-[#E8FF2A] cursor-default"
                  style={{
                    background: 'rgba(17,17,17,0.08)',
                    color: '#111',
                    border: '1px solid rgba(17,17,17,0.15)',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* CTA buttons */}
          <FadeIn delay={0.5} y={20} className="flex flex-wrap gap-3">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-yellow"
              id="about-contact-btn"
            >
              Let's Work Together →
            </button>
            <a
              href="/Abutalha_Final_Resume (1).pdf"
              download
              className="btn-outline"
              id="about-resume-btn"
            >
              Download Resume ↓
            </a>
          </FadeIn>

          {/* Journey timeline */}
          <FadeIn delay={0.55} y={20}>
            <h3 className="font-black uppercase tracking-wider text-sm text-[#111] mb-5" style={{ fontFamily: "'Inter'" }}>
              My Journey
            </h3>
            <div className="timeline-line pl-6 flex flex-col gap-0">
              {[
                { year: '2026 — Present', title: 'Product Support Associate', place: 'Polar Bear Tech', color: '#E8FF2A' },
                { year: '2023 — 2026', title: 'Bachelor of Computer Applications', place: 'Vision Management College', color: '#111' },
                { year: '2022 — 2023', title: 'Intermediate Education', place: 'Harjinder Nagar College', color: '#111' },
                { year: '2020 — 2021', title: 'High School', place: 'SU Memorial', color: '#111' },
              ].map((item, i) => (
                <div key={i} className="relative flex items-start gap-4 pb-6 last:pb-0">
                  {/* Dot */}
                  <div
                    className="timeline-dot absolute -left-[29px] mt-1"
                    style={{ background: item.color }}
                  />
                  <div>
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#888]">{item.year}</span>
                    <h4 className="font-bold text-sm text-[#111] mt-0.5">{item.title}</h4>
                    <p className="text-xs text-[#555] mt-0.5">{item.place}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
