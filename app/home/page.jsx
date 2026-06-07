'use client';


import HeroSection from "@/components/HeroSection";
import MarqueeSection from '@/components/MarqueeSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import LogoSection from '@/components/LogoSection';
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
        <div className="relative z-0 flex flex-col gap-4 w-full overflow-x-hidden pt-[2%]">
          <HeroSection />
          <MarqueeSection />
          <div className="flex flex-col gap-20 px-6 md:px-10 w-full mx-auto"> 
            <AboutSection />
            <ServicesSection />
            <LogoSection />
            <ProjectsSection />
          </div>
        </div>
      </StrictMode>
    </>
  );
}
