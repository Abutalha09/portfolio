import React, { useState, useRef, useEffect } from 'react';
import { useTheme, THEMES, type ThemeId } from '../context/ThemeContext';
import { Palette, Check, Sparkles, X, ChevronRight, Wand2 } from 'lucide-react';

interface ThemeSwitcherProps {
  variant?: 'floating' | 'inline' | 'compact' | 'nav';
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ variant = 'floating' }) => {
  const { theme, setTheme, cycleTheme, currentThemeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTheme = (id: ThemeId, name: string) => {
    setTheme(id);
    setIsOpen(false);
    setToast(`Switched to ${name} theme! 🎨`);
    setTimeout(() => setToast(null), 2500);
  };

  // Render Compact Nav Version (for StickyNav & Navbar)
  if (variant === 'compact' || variant === 'nav') {
    return (
      <div ref={dropdownRef} className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[0.62rem] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer border hover:scale-105 active:scale-95 shadow-sm"
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-dark)',
            borderColor: 'var(--border)',
            fontFamily: "'Inter', sans-serif",
          }}
          title="Change Theme (4 Themes Available)"
        >
          <Palette className="w-3.5 h-3.5 text-[var(--accent)] animate-pulse" />
          <span className="truncate max-w-[80px]">{currentThemeConfig.name}</span>
          <span className="text-xs">{currentThemeConfig.icon}</span>
        </button>

        {/* Small Popover Menu for Nav */}
        {isOpen && (
          <div
            className="absolute left-0 mt-2 w-56 rounded-xl p-2 shadow-2xl z-50 flex flex-col gap-1 text-xs animate-in fade-in zoom-in-95 duration-150"
            style={{
              background: 'var(--bg-light)',
              color: 'var(--text-dark)',
              border: '1px solid var(--border-dark)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center justify-between px-2 py-1 border-b border-[var(--border)] text-[0.6rem] font-extrabold uppercase tracking-widest text-[var(--text-mid)]">
              <span>Select Theme (4)</span>
              <button
                onClick={cycleTheme}
                className="text-[var(--accent)] hover:underline flex items-center gap-1 border-none bg-transparent cursor-pointer"
                title="Quick Next"
              >
                <Wand2 className="w-2.5 h-2.5" /> Cycle
              </button>
            </div>
            {THEMES.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t.id, t.name)}
                  className={`flex items-center justify-between p-2 rounded-lg text-left transition-all duration-150 cursor-pointer border-none ${
                    isSelected ? 'bg-[var(--accent)] text-[#111] font-extrabold' : 'hover:bg-[var(--border)] text-[var(--text-dark)] font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{t.icon}</span>
                    <span className="text-[0.7rem]">{t.name}</span>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full border border-black/20"
                    style={{ background: t.accentPreview }}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Floating Main Version
  return (
    <div
      ref={dropdownRef}
      className="fixed top-5 right-5 sm:right-8 md:right-10 z-50 inline-block"
    >
      {/* Toast Notification */}
      {toast && (
        <div
          className="fixed top-20 right-5 sm:right-8 z-50 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-black animate-bounce"
          style={{
            background: 'var(--bg-light)',
            color: 'var(--text-dark)',
            border: '1px solid var(--accent)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <Sparkles className="w-4 h-4 text-[var(--accent)] animate-spin" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Floating Theme Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-xl cursor-pointer border hover:scale-105 active:scale-95"
        style={{
          background: 'var(--bg-light)',
          color: 'var(--text-dark)',
          borderColor: 'var(--border-dark)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        }}
        title="Change Visual Theme"
      >
        <div className="relative flex items-center justify-center">
          <Palette className="w-4 h-4 text-[var(--accent)] transition-transform duration-300 group-hover:rotate-45" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
        </div>
        <span className="hidden sm:inline-block font-extrabold text-[0.7rem]">{currentThemeConfig.name}</span>
        <span className="text-sm">{currentThemeConfig.icon}</span>
        <ChevronRight className={`w-3.5 h-3.5 text-[var(--text-mid)] transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {/* Floating Theme Selection Modal */}
      {isOpen && (
        <div
          className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200"
          style={{
            background: 'var(--bg-light)',
            color: 'var(--text-dark)',
            border: '2px solid var(--border-dark)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-xs font-black uppercase tracking-widest text-[var(--text-dark)]">
                Portfolio Themes (4)
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-[var(--border)] text-[var(--text-mid)] transition-colors border-none bg-transparent cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Cycle Button */}
          <button
            onClick={cycleTheme}
            className="w-full py-2 px-3 rounded-xl font-bold text-[0.7rem] uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer border-none"
            style={{
              background: 'var(--accent)',
              color: '#111111',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" /> Cycle Next Theme →
          </button>

          {/* Theme Options List */}
          <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto pr-1">
            {THEMES.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t.id, t.name)}
                  className={`flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? 'shadow-md scale-[1.01]'
                      : 'hover:scale-[1.01] hover:bg-[var(--border)]'
                  }`}
                  style={{
                    background: isSelected ? 'var(--bg-card)' : 'transparent',
                    borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                  }}
                >
                  {/* Swatch */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 relative shadow-inner overflow-hidden border border-black/10"
                    style={{ background: t.bgPreview }}
                  >
                    <span>{t.icon}</span>
                    <div
                      className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-tl-md shadow-sm"
                      style={{ background: t.accentPreview }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-[var(--text-dark)] flex items-center gap-1.5">
                        {t.name}
                        {t.id === 'cream' && (
                          <span
                            className="text-[0.55rem] font-bold px-1.5 py-0.2 rounded-full uppercase"
                            style={{ background: 'var(--accent)', color: '#111' }}
                          >
                            Existing
                          </span>
                        )}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-[0.65rem] text-[var(--text-mid)] mt-0.5 leading-snug">
                      {t.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
