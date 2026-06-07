import FadeIn from './FadeIn';

const services = [
  {
    num: '01',
    name: 'AI Architectures',
    desc: 'RAG , NLP and CNN architectures, Vector storage, Neo4j, LLM Reranking and response validation.',
  },
  
  {
    num: '02',
    name: 'Forward Deployment',
    desc: 'Deploying AI solutions to production environments, ensuring scalability, reliability, and performance while maintaining security and compliance standards.',
  },
  {
    num: '03',
    name: 'Backend Development',
    desc: 'Building robust and scalable backend systems with a focus on performance, security, and maintainability.',
  },
  {
    num: '04',
    name: 'Frontend Development',
    desc: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
  {
    num: '05',
    name: 'Rendering',
    desc: 'High-quality, photorealistic renders that showcase designs that bring concepts to life with attention to detail, lighting, and materials.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 mt-90 sm:mt-120 md:mt-150 mb-90 sm:mb-120 md:mb-150"
    >
      <h2
        className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight
          mb-20 sm:mb-30 md:mb-40"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </h2>

      <div className="max-w-5xl max-h-5xl mx-auto flex flex-col">
        {services.map((service, i) => (
          <FadeIn
            key={service.num}
            delay={i * 0.1}
            className={`flex items-start gap-8 md:gap-12 py-8 sm:py-10 md:py-12
              ${i > 0 ? 'border-t border-[rgba(12,12,12,0.15)]' : ''}`}
          >
            <span
              className="font-black text-[#0C0C0C] flex-shrink-0 leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {service.num}
            </span>

            <div className="flex flex-col mt-25 gap-2">
              <span
                className="font-medium uppercase text-[#0C0C0C] tracking-[0.08em]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.name}
              </span>

              <span
                className="font-light leading-relaxed max-w-2xl opacity-60 text-[#0C0C0C]"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
              >
                {service.desc}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}