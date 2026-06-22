import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const links = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const targetId = id.toLowerCase();
    setActive(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (targetId === 'contact') {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      {/* Nav Links — glassmorphism pill centered */}
      <nav
        className="flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: scrolled
            ? '0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)'
            : 'none',
          fontFamily: "'Inter', 'Kanit', sans-serif",
        }}
      >
        {links.map((link) => {
          const isActive = active === link.toLowerCase();
          return (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              className="relative px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-medium uppercase tracking-[0.12em] cursor-pointer border-none outline-none transition-all duration-300"
              style={{
                color: isActive ? '#0C0C0C' : 'rgba(215,226,234,0.7)',
                background: isActive
                  ? 'linear-gradient(135deg, #D7E2EA 0%, #b8cad4 100%)'
                  : 'transparent',
                boxShadow: isActive ? '0 2px 12px rgba(215,226,234,0.2)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.target as HTMLButtonElement).style.color = '#D7E2EA';
                  (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.target as HTMLButtonElement).style.color = 'rgba(215,226,234,0.7)';
                  (e.target as HTMLButtonElement).style.background = 'transparent';
                }
              }}
            >
              {link}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
