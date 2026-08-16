import type { PortfolioData } from './types';

/* ────────────────────────── Default content ────────────────────────── */

export const DEFAULT_DATA: PortfolioData = {
  name: 'Arsh Srivastava',
  role: 'AI · Full-Stack · Software Developer',
  email: 'arxh.dev3@gmail.com',
  location: 'India · GMT+5:30',
  heroLines: ['Building Scalable', 'products for', 'real-world impact.'],
  heroSub:
    "I am a full-stack developer with a passion for building AI-native products. I work best on projects that require a blend of front-end polish, robust backend architecture, and smart AI integrations.",
  navLinks: [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Contact', href: '#contact' },
  ],
  disciplines: ['AI / ML', 'Full-Stack', '3D / WebGL', 'Systems'],
  marqueeWords: [
    'AI-Native Products',
    'Full-Stack Engineering',
    'Three.js & WebGL',
    'Real-Time Systems',
    'Design Systems',
    'Motion & Interaction',
  ],
  about: {
    paragraphs: [
      "I'm Arsh Srivastava, currently a final year B.Tech student. I'm a full-stack software developer who builds products where AI isn't a bolted-on feature, it's part of the architecture from day one. Most of my work sits at the intersection of a fast, well-engineered backend and an interface that feels considered rather than assembled.",
      "I am also a national level team sports player which proves I am not only a team player but also someone who takes casre of his health. I love to interact with people and learn as many new skills as possible."
    ],
    facts: [
      { label: 'Based in', value: 'India, working globally' },
      { label: 'Stack', value: 'TypeScript, Next.js, Python, Three.js' },
      { label: 'Open to', value: 'Freelance & collaborations' },
    ],
    currently: 'Currently building AI-native tooling and experimenting with real-time 3D interfaces.',
    initials: 'AS',
    photoSrc: '/Arsh Image.PNG',
    ringText: 'ARSH SRIVASTAVA  ✦  FULL-STACK DEVELOPER  ✦  AI ENGINEER  ✦  ',
  },
  capabilities: [
    { id: 'c1', number: '01', title: 'AI & ML Integration', description: 'LLM-powered features, agentic workflows, and RAG pipelines built into the product, not bolted on after.', tags: ['OpenAI', 'LangChain', 'Vector DBs'] },
    { id: 'c2', number: '02', title: 'Full-Stack Engineering', description: 'End-to-end product builds — typed APIs, real databases, and interfaces that hold up under real usage.', tags: ['Next.js', 'Node.js', 'PostgreSQL'] },
    { id: 'c3', number: '03', title: '3D & WebGL', description: 'Interactive three.js scenes and product visualizations, optimized to actually run well on real devices.', tags: ['Three.js', 'R3F', 'Shaders'] },
    { id: 'c4', number: '04', title: 'Motion & Interaction', description: 'Purposeful micro-interactions and page transitions that reinforce what the interface is doing.', tags: ['anime.js', 'GSAP', 'Framer Motion'] },
    { id: 'c5', number: '05', title: 'Design Systems', description: 'Token-driven component libraries that keep a fast-moving product consistent as it scales.', tags: ['Figma', 'Tokens', 'Storybook'] },
    { id: 'c6', number: '06', title: 'Product Design', description: 'Interfaces grounded in real user flows — from a rough wireframe through to shipped UI.', tags: ['UX', 'Prototyping', 'Systems Thinking'] },
  ],
  work: [
    {
      id: 'w1',
      title: 'Cortex — AI Research Copilot',
      year: '2026',
      description: 'An AI copilot that reads, summarizes, and cross-references research papers in real time, with a RAG pipeline over a user\u2019s own library.',
      tags: ['Next.js', 'LangChain', 'PostgreSQL'],
      link: '#',
      gradient: 'linear-gradient(135deg, #2a2115, #e3a874 150%)',
    },
    {
      id: 'w2',
      title: 'Aether — 3D Product Configurator',
      year: '2025',
      description: 'A real-time three.js configurator letting customers customize and rotate a product in the browser before checkout, with no app to install.',
      tags: ['Three.js', 'React Three Fiber', 'WebGL'],
      link: '#',
      gradient: 'linear-gradient(135deg, #172119, #6f9179 150%)',
    },
    {
      id: 'w3',
      title: 'Loop — Team Automation Platform',
      year: '2025',
      description: 'A full-stack workflow automation tool for small teams — trigger-based actions across email, Slack, and internal tools.',
      tags: ['Node.js', 'TypeScript', 'Redis'],
      link: '#',
      gradient: 'linear-gradient(135deg, #1e1a22, #a48fc2 150%)',
    },
    {
      id: 'w4',
      title: 'Signal — Realtime Analytics Dashboard',
      year: '2024',
      description: 'A live analytics dashboard streaming event data over websockets, built for teams who need to watch numbers move, not refresh a page.',
      tags: ['Next.js', 'WebSockets', 'D3.js'],
      link: '#',
      gradient: 'linear-gradient(135deg, #221a1a, #c98a7e 150%)',
    },
    {
      id: 'w5',
      title: 'Nimbus — Voice-First Notes App',
      year: '2024',
      description: 'A voice-to-structured-notes app using speech-to-text plus an LLM cleanup pass, so a rough voice memo comes out as clean, formatted notes.',
      tags: ['Whisper API', 'React Native', 'GPT-4'],
      link: '#',
      gradient: 'linear-gradient(135deg, #1a1f2a, #7e9bc9 150%)',
    },
    {
      id: 'w6',
      title: 'Kiln — Portfolio Site for a Ceramicist',
      year: '2023',
      description: 'A quiet, gallery-style portfolio site for an independent ceramicist, built around large imagery and almost no chrome.',
      tags: ['Next.js', 'Sanity CMS', 'GSAP'],
      link: '#',
      gradient: 'linear-gradient(135deg, #22201a, #cbb787 150%)',
    },
  ],
  stats: [
    { id: 's1', value: '4', suffix: '+', label: 'Years Building', note: 'From first line of code to shipped, maintained products.' },
    { id: 's2', value: '20', suffix: '+', label: 'Products Shipped', note: 'Across web, mobile, and embedded 3D contexts.' },
    { id: 's3', value: '8', label: 'AI-Native Products', note: 'AI woven into the architecture, never bolted on after.' },
    { id: 's4', value: '100', suffix: '%', label: 'Design-to-Code Handoff', note: 'Every pixel and token accounted for in the build.' },
  ],
  socials: [
    { label: 'Twitter', href: 'https://x.com/ArshSri01642844' },
    { label: 'GitHub', href: 'https://github.com/Arsh123344423' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arshsrivastava72235a300/' },
    { label: 'CodersRank', href: 'https://profile.codersrank.io/user/arsh123344423/' },
  ],
};
