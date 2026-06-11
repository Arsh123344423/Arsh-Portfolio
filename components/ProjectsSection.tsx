"use client";

import React from 'react';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';
import ScrollStack, { ScrollStackItem } from './ScrollStack'; // Ensure this path is correct

const projects = [
  {
    num: '01',
    name: 'Meet Up - Linkedin',
    category: 'Personal',
    col1Img1: './m1.png',
    col1Img2: './m2.png',
    col2Img: './m3.png',
    link: 'https://www.linkedin.com/in/arshsrivastava72235a300/',
  },
  {
    num: '02',
    name: 'SwiftTrans',
    category: 'Project',
    col1Img1: './st1.png',
    col1Img2: './st2.png',
    col2Img: './st3.png',
    link: 'https://www.linkedin.com/posts/arshsrivastava72235a300_ai-blockchain-fintech-activity-7319687328979988480-6c9N?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEzwQIoBgt53V93G9_GxPjAhHg71aKHfCtk',
  },
  {
    num: '03',
    name: 'KalaKatha',
    category: 'Project',
    col1Img1: './kalakatha1.png',
    col1Img2: './kalakatha2.png',
    col2Img: './image.png',
    link: 'https://kalakatha-frontend-test.vercel.app/',
  },
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <ScrollStackItem 
      // Overriding the default 'h-80' and 'p-12' from your ScrollStackItem 
      // to maintain your original design dimensions.
      itemClassName="bg-dark border-2 border-[#D7E2EA] !h-auto !p-6 sm:!p-8 md:!p-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10 px-2 sm:px-4 md:px-6">
        <div className="flex items-center gap-4 md:gap-8">
          <span
            className="font-black text-[#D7E2EA] leading-none"
            style={{ fontSize: 'clamp(2.5rem,8vw,100px)' }}
          >
            {project.num}
          </span>

          <div className="flex flex-col">
            <span className="text-[#D7E2EA] font-light uppercase tracking-wider text-sm md:text-base">
              {project.category}
            </span>

            <span
              className="text-[#D7E2EA] font-medium uppercase"
              style={{ fontSize: 'clamp(1rem,2.2vw,2.1rem)' }}
            >
              {project.name}
            </span>
          </div>
        </div>
        <div>
          <LiveProjectButton link={project.link} />
        </div>
      </div>

      {/* Images */}
      <div className="flex gap-3 md:gap-4">
        <div className="w-[40%] flex flex-col gap-3 md:gap-4">
          <img
            src={project.col1Img1}
            alt={project.name}
            className="w-full object-cover rounded-[20px] sm:rounded-[30px] md:rounded-[40px]"
            style={{ height: 'clamp(130px,16vw,230px)' }}
            loading="lazy"
          />

          <img
            src={project.col1Img2}
            alt={project.name}
            className="w-full object-cover rounded-[20px] sm:rounded-[30px] md:rounded-[40px]"
            style={{ height: 'clamp(160px,22vw,340px)' }}
            loading="lazy"
          />
        </div>

        <div className="w-[60%]">
          <img
            src={project.col2Img}
            alt={project.name}
            className="w-full h-full object-cover rounded-[20px] sm:rounded-[30px] md:rounded-[40px]"
            loading="lazy"
          />
        </div>
      </div>
    </ScrollStackItem>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="
        bg-dark
        rounded-t-[40px]
        sm:rounded-t-[50px]
        md:rounded-t-[60px]
        relative z-10
        px-5 sm:px-8 md:px-10
        mt-[-70px] sm:mt-[-90px] md:mt-[-120px]
      "
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center pt-20"
          style={{ fontSize: 'clamp(3rem,12vw,160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="relative mt-16 sm:mt-20 md:mt-28 bg-dark">
        {/* IMPORTANT: useWindowScroll={true} allows the stack to respond to the whole page scrolling, rather than containing it to a nested box */}
        <ScrollStack useWindowScroll={true}>
          {projects.map((project) => (
            <ProjectCard
              key={project.num}
              project={project}
            />
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}