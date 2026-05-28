import './Nav.css';

const LINKS = [
  { href: '#hero',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#skills',   label: 'Tools' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact' },
];

export function createNav() {
  return /* html */ `
    <nav class="site-nav" id="site-nav" aria-label="Main">
      <a class="site-nav__brand" href="#hero">NEO<span>-ZEN</span></a>
      <ul class="site-nav__links">
        ${LINKS.map(({ href, label }) => `
          <li><a href="${href}" class="site-nav__link">${label}</a></li>
        `).join('')}
      </ul>
    </nav>
  `;
}

/** Show nav after user enters the experience. */
export function revealNav() {
  document.getElementById('site-nav')?.classList.add('visible');
}
