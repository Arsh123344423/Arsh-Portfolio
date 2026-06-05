'use client';


import HeroSection from "@/components/HeroSection";
import MarqueeSection from '@/components/MarqueeSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import { StrictMode } from 'react';
import './index.css';

/**
 * Portfolio Home Page
 * Hosted on /home, ensuring zero overlap with the landing page.
 */
export default function PortfolioPage() {
  return (
    <>
      <StrictMode>
        <div style={{ overflowX: 'clip' , paddingRight: '3%', paddingLeft: '3%' , paddingTop: '2%' }}>
          <HeroSection />
          <MarqueeSection />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
        </div>
      </StrictMode>
    </>
  );
}
