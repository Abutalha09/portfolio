import React from 'react';

export const Navbar: React.FC = () => {
  const links = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

  const scrollToSection = (id: string) => {
    const targetId = id.toLowerCase();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (targetId === 'contact') {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <ul className="flex flex-wrap justify-between items-center w-full list-none gap-2">
      {links.map((link) => (
        <li key={link}>
          <button
            onClick={() => scrollToSection(link)}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70 text-xs sm:text-sm md:text-lg lg:text-[1.4rem] cursor-pointer bg-transparent border-none outline-none"
          >
            {link}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
