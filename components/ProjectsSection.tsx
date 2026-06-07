import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

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

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: (typeof projects)[0];
  index: number;
  totalCards: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'start 20%'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [120, 0]
  );

  const targetScale = 1 - index * 0.05;

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    // [1, 1, targetScale]
    [0.9, 0.95, 1]
  );

  return (
    <div
      ref={containerRef}
      className="relative h-screen "
      style={{
        marginTop: index === 0 ? 0 : '-80vh',
        zIndex: index + 1,
      }}
    >
      <motion.div
        className="
          sticky top-24 md:top-28
          rounded-[40px] sm:rounded-[50px] md:rounded-[60px]
          border-2 border-[#D7E2EA]
          bg-dark
          p-6 sm:p-8 md:p-10
          overflow-hidden
        "
        style={{
          scale,
          transformOrigin: 'top center',
          marginTop: `${index * 30}px`,
          y,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-40 bg-black px-50 md:px-50">
          <div className="flex items-center gap-4 md:gap-8">
            <span
              className="font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(3rem,10vw,140px)' }}
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
        <div className="mr-10 md:mr-20 p-20">
          <LiveProjectButton />
        </div>
        </div>

        {/* Images */}
        <div className="flex gap-3 md:gap-4 bg-black">
          <div className="w-[40%] flex flex-col gap-3 md:gap-4 bg-black">
            <img
              src={project.col1Img1}
              alt={project.name}
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(130px,16vw,230px)' }}
              loading="lazy"
            />

            <img
              src={project.col1Img2}
              alt={project.name}
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(160px,22vw,340px)' }}
              loading="lazy"
            />
          </div>

          <div className="w-[60%] bg-black">
            <img
              src={project.col2Img}
              alt={project.name}
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
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
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem,12vw,160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="relative mt-16 sm:mt-20 md:mt-28 bg-dark">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={i}
            totalCards={projects.length}
          />
        ))}
      </div>
    </section>
  );
}