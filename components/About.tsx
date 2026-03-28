"use client";

import Squares from "./Squares";
import StatsGrid from "./StatsGrid";
import { useInView } from "@/hooks/useInView";

export default function About() {
  const { ref: sectionRef, visible: sectionVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section 
      id="about" 
      className="bg-black min-h-screen py-20 relative overflow-hidden"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <Squares speed={0.5} squareSize={40} direction="diagonal" borderColor="#271E37" hoverFillColor="#222" />
      </div>
      <style>{`#about canvas { z-index: 0 !important; pointer-events: none !important; }`}</style>
      <div className="container mx-auto px-6 w-full relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-left mb-12 text-white">About</h2>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img 
              src="/pic sec 4.png" 
              alt="Accugeo construction materials testing laboratory and equipment" 
              width={420} 
              height={280} 
              className="w-full max-w-xs mx-auto md:mx-0 rounded-lg shadow-lg"
              onError={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
                e.currentTarget.style.display = 'block';
              }}
            />
          </div>
          <div className="flex-1 text-white leading-relaxed text-left">
            <div 
              className={`mb-8 transition-opacity duration-600 ${
                sectionVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0ms' }}
            >
              <p className="mb-4 text-xl">
                Accugeo is a leading provider of construction materials testing and soil investigation services. 
                With over 15 years of experience, we deliver accurate, reliable results that help ensure the 
                safety and quality of construction projects across the region.
              </p>
              <p className="text-xl">
                Our state-of-the-art laboratory and experienced team of engineers provide comprehensive testing 
                services for concrete, soil, aggregates, and other construction materials. We are committed to 
                excellence, precision, and timely delivery on every project.
              </p>
            </div>
            
            <div 
              className={`transition-opacity duration-600 ${
                sectionVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: '200ms' }}
            >
              <StatsGrid visible={sectionVisible} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
