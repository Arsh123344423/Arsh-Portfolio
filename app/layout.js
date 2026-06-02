import './globals.css';

export const metadata = {
  title: 'NEO‑ZEN // Interactive 3D Portfolio',
  description:
    'A premium cyber-samurai 3D portfolio built with Three.js, GSAP, and Next.js.',
};

import GlobalEffects from '@/components/GlobalEffects';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;900&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="locked">
        <GlobalEffects />
        {children}
      </body>
    </html>
  );
}
