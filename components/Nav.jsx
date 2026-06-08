'use client';
import { useState } from 'react';

const LINKS = [
  { href: '#hero',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#skills',   label: 'Tools' },
  { href: '#projects', label: 'Projects' },
  { href: '/contact',  label: 'Contact' },
];


const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    

    <nav 
      className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-10 py-5 bg-[rgba(5,5,8,0.9)] border-b border-cyber-red" 
      id="site-nav" 
      aria-label="Main"
    >
      <a 
        className="font-mono text-[1.5rem] font-bold tracking-[2px] text-white no-underline" 
        href="#hero"
      >
        NEO<span className="text-cyber-red">-ZEN</span>
      </a>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 list-none">
        {LINKS.map(({ href, label }) => (
          <li key={href}>
            <a 
              href={href} 
              className="font-mono text-[0.9rem] uppercase text-white no-underline transition-colors duration-300 hover:text-cyber-red"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger Menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col gap-1.5 cursor-pointer"
        aria-label="Toggle menu"
      >
        <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-full left-0 right-0 bg-[rgba(5,5,8,0.95)] border-b border-cyber-red flex flex-col list-none md:hidden">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a 
                href={href}
                onClick={() => setIsOpen(false)}
                className="block px-10 py-4 font-mono text-[0.9rem] uppercase text-white no-underline transition-colors duration-300 hover:text-cyber-red border-b border-cyber-red/20"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>  
  );
};

export default Nav;
