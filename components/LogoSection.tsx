'use client';

import LogoLoop from './LogoLoop';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiKubernetes,
  SiRedis,
  SiPython,
  SiOpenjdk,
  SiGooglecloud,
  SiVercel,
  SiCodecrafters,
} from 'react-icons/si';

const techLogos = [
    { node: <SiReact />, title: 'React', href: 'https://react.dev' },
    { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
    { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
    { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },

    { node: <SiDocker />, title: 'Docker', href: 'https://www.docker.com' },
    { node: <SiKubernetes />, title: 'Kubernetes', href: 'https://kubernetes.io' },
    { node: <SiRedis />, title: 'Redis', href: 'https://redis.io' },
    { node: <SiPython />, title: 'Python', href: 'https://www.python.org' },
    { node: <SiOpenjdk />, title: 'Java', href: 'https://www.java.com' },
    { node: <SiGooglecloud />, title: 'Google Cloud', href: 'https://cloud.google.com' },
    { node: <SiVercel />, title: 'Vercel', href: 'https://vercel.com' },
    { node: <SiCodecrafters />, title: 'CodeCrafters', href: 'https://codecrafters.io' },
];

export default function LogoSection() {
  return (
    <div className="relative w-full h-[120px] overflow-hidden">
      <LogoLoop
        logos={techLogos}
        speed={100}
        direction="left"
        logoHeight={60}
        gap={60}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#000000"
        ariaLabel="Technology partners"
      />
    </div>
  );
}