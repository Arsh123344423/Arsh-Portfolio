'use client';

// No react hooks needed

const LINKS = [
  { href: '#hero',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#skills',   label: 'Tools' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact' },
];

const Nav = () => {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-10 py-5 bg-[rgba(5,5,8,0.9)] border-b border-cyber-red" 
      id="site-nav" 
      aria-label="Main"
    >
      <a className="font-mono text-[1.5rem] font-bold tracking-[2px] text-white no-underline" href="#hero">
        NEO<span className="text-cyber-red">-ZEN</span>
      </a>
      <ul className="hidden md:flex gap-8 list-none">
        {LINKS.map(({ href, label }) => (
          <li key={href}>
            <a href={href} className="font-mono text-[0.9rem] uppercase text-white no-underline transition-colors duration-300 hover:text-cyber-red">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
