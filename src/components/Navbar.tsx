import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const links = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const targetId = id.toLowerCase();
    setActive(targetId);
    setMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (targetId === 'contact') {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="flex items-center justify-between w-full px-4 py-3 rounded-2xl transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(202,197,186,0.85)' : 'rgba(202,197,186,0.5)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(17,17,17,0.10)',
        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="font-black text-[#111111] text-xl tracking-tight leading-none select-none hover:opacity-70 transition-opacity"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Abu.
      </button>

      {/* Desktop Nav Links */}
      <nav className="hidden md:flex items-center gap-1">
        {links.map((link) => {
          const isActive = active === link.toLowerCase();
          return (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              className="px-4 py-1.5 rounded-full text-[0.7rem] font-700 uppercase tracking-[0.1em] cursor-pointer border-none outline-none transition-all duration-200"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                color: isActive ? '#111111' : '#444444',
                background: isActive ? '#E8FF2A' : 'transparent',
                boxShadow: isActive ? '0 2px 12px rgba(232,255,42,0.35)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color = '#111111';
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(17,17,17,0.07)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color = '#444444';
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                }
              }}
            >
              {link}
            </button>
          );
        })}
      </nav>

      {/* CTA Button + Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => scrollToSection('contact')}
          className="btn-yellow hidden md:inline-flex text-[0.7rem] py-2 px-5"
          id="nav-hire-btn"
        >
          Hire Me →
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#111111] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#111111] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#111111] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div
          className="absolute top-[calc(100%+8px)] left-0 right-0 rounded-2xl p-4 flex flex-col gap-2 md:hidden z-50"
          style={{
            background: 'rgba(202,197,186,0.97)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(17,17,17,0.10)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
        >
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider text-[#111111] hover:bg-[#E8FF2A] transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-yellow mt-2 justify-center text-xs"
          >
            Hire Me →
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
