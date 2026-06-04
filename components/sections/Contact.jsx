'use client';

import { useCallback } from 'react';

/**
 * Contact Section
 */
export default function Contact() {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    alert('Signal Transmitted.');
  }, []);

  return (
    <section className="cyber-section pb-32" id="contact">
      <div className="w-full max-w-[720px] z-10 pointer-events-auto glass-panel p-11">
        <div className="font-mono text-[0.72rem] text-cyber-red flex items-center gap-2.5 mb-6 tracking-[3px]">
          <span className="w-2 h-2 bg-cyber-red rounded-full shadow-[0_0_10px_var(--color-cyber-red)] animate-pulse" />
          <span className="text-gray">ESTABLISH PORTAL LINK</span>
        </div>
        
        <h2 className="text-[2.5rem] font-semibold mb-5 tracking-[1px] text-white">NEXUS CONNECT</h2>
        <p className="text-gray leading-[1.75] mb-4">
          Ready to build the next dimension? Send a neural signal to establish
          contact. I am currently open for full-time contracts, creative
          collaborations, and high-impact web design projects.
        </p>

        <form className="flex flex-col gap-5 mt-8" id="contact-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="font-mono text-[0.68rem] tracking-[3px] text-cyber-red uppercase">CODENAME / NAME</label>
            <input
              type="text"
              id="contact-name"
              name="name"
              required
              placeholder="e.g. Ronin 08"
              className="bg-[#050510]/70 border border-cyber-red/20 text-white px-4 py-3.5 font-sans text-[0.95rem] rounded-[2px] outline-none transition-all duration-300 focus:border-cyber-red focus:bg-[#080814]/90 placeholder:text-muted"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="font-mono text-[0.68rem] tracking-[3px] text-cyber-red uppercase">SIGNAL ADDR / EMAIL</label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              placeholder="e.g. cyber@domain.com"
              className="bg-[#050510]/70 border border-cyber-red/20 text-white px-4 py-3.5 font-sans text-[0.95rem] rounded-[2px] outline-none transition-all duration-300 focus:border-cyber-red focus:bg-[#080814]/90 placeholder:text-muted"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="font-mono text-[0.68rem] tracking-[3px] text-cyber-red uppercase">TRANSMISSION DATA / MESSAGE</label>
            <textarea
              id="contact-message"
              name="message"
              rows="4"
              required
              placeholder="What are we building..."
              className="bg-[#050510]/70 border border-cyber-red/20 text-white px-4 py-3.5 font-sans text-[0.95rem] rounded-[2px] outline-none resize-none transition-all duration-300 focus:border-cyber-red focus:bg-[#080814]/90 placeholder:text-muted"
            />
          </div>
          
          <button type="submit" className="font-mono text-[0.85rem] font-bold tracking-[3px] py-4 px-10 bg-cyber-red-dim text-white border border-cyber-red rounded-[2px] cursor-pointer transition-all duration-300 uppercase mt-2 hover:bg-cyber-red hover:shadow-[0_0_20px_rgba(255,0,60,0.5)]">
            TRANSMIT NEURAL SIGNAL
          </button>
        </form>
      </div>
    </section>
  );
}
