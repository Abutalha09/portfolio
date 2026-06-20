import React from 'react';

interface LiveProjectButtonProps {
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  className = '',
  onClick,
  href,
}) => {
  const baseClasses = `rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-all duration-300 hover:bg-[#D7E2EA]/10 active:scale-[0.98] cursor-pointer inline-flex items-center justify-center
    px-8 py-3 sm:px-10 sm:py-3.5
    text-sm sm:text-base ${className}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        Live Project
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      Live Project
    </button>
  );
};

export default LiveProjectButton;
