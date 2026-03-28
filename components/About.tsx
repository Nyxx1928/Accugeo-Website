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
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative flex justify-center md:justify-start">
            <div className="w-[360px] h-[280px] md:w-[420px] md:h-[320px] relative">
              <img
                src="/pic sec 5.png"
                alt="interior sample"
                className="absolute left-0 top-6 w-3/4 rounded-2xl shadow-2xl object-cover border border-[#2b2b2b]"
              />
              <img
                src="/pic sec 6.png"
                alt="interior sample 2"
                className="absolute right-0 top-0 w-3/4 rounded-2xl shadow-2xl object-cover border border-[#2b2b2b] transform translate-x-6 translate-y-10"
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg border border-gray-200 w-20 h-20 flex items-center justify-center">
                <img src="/LOGO.png" alt="logo" className="w-12 h-12 object-contain" />
              </div>
            </div>
          </div>

          <div className="text-white">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Who Are <span className="italic">We?</span></h2>
            <div className={`mb-6 transition-opacity duration-600 ${sectionVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0ms' }}>
              <p className="text-lg md:text-xl text-gray-200 mb-4">
                At AccuGeo Materials, we redefine the art of interior transformation with innovation, quality, and style. From luxurious SPC flooring to premium wall panels, ceilings, and artificial grass — we bring beauty and durability together to elevate every space.
              </p>
              <p className="text-lg md:text-xl text-gray-300">
                With years of expertise in the interior industry, our mission is simple: to make modern interiors effortless. We take pride in offering end-to-end solutions — from design consultation and product selection to seamless installation and continuous supply.
              </p>
            </div>

            <div className={`transition-opacity duration-600 ${sectionVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
              <StatsGrid
                visible={sectionVisible}
                stats={[
                  { value: '25+', label: 'Years Of Experience' },
                  { value: '1250+', label: 'Projects Completed' },
                  { value: '45+', label: 'Awards Winning' },
                  { value: '35+', label: 'Professionals' },
                ]}
                className="mt-6 grid-cols-2 md:grid-cols-4 gap-6"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
