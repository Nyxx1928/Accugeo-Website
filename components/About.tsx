"use client";

import Squares from "./Squares";
import StatsGrid from "./StatsGrid";
import { useInView } from "@/hooks/useInView";
import Image from 'next/image';
import { Layers, Target, Calendar, Briefcase, Award, Users } from 'lucide-react';

export default function About() {
  const { ref: sectionRef, visible: sectionVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section 
      id="about" 
      className="bg-black min-h-screen py-16 md:py-24 relative overflow-hidden"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.32 }}>
        <Squares speed={0.5} squareSize={40} direction="diagonal" borderColor="#1a1a1a" hoverFillColor="#1a1a1a" />
      </div>
      <style>{`#about canvas { z-index: 0 !important; pointer-events: none !important; }`}</style>
      <div className="container mx-auto px-6 w-full relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative flex justify-center md:justify-start">
            <div className="w-full md:w-[520px] h-auto md:h-[420px] relative overflow-visible">
              <div aria-hidden className="absolute -left-6 -top-6 w-[420px] h-[420px] rounded-full blur-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(196,30,58,0.08) 0%, transparent 70%)', zIndex: 0 }} />
              <Image
                src="/pic sec 5.png"
                alt="interior sample"
                className="md:absolute left-0 md:top-6 md:w-3/4 w-full rounded-3xl shadow-2xl object-cover border border-[#2b2b2b] animate-scale-in md:z-30 z-20 md:-rotate-2 transform-gpu"
                style={{ animationDelay: '200ms' }}
                width={900}
                height={700}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
              />
              <Image
                src="/pic sec 6.png"
                alt="interior sample 2"
                className="md:absolute right-0 md:top-0 md:w-3/4 w-full rounded-3xl shadow-2xl object-cover border border-[#2b2b2b] md:translate-x-6 md:translate-y-10 animate-scale-in md:z-20 z-10 md:rotate-2 transform-gpu mt-6 md:mt-0"
                style={{ animationDelay: '220ms' }}
                width={900}
                height={700}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
              />

              {/* Moved stat badge out of the image overlay to a dedicated, modern badge below the images */}
              <div className="mt-6 md:mt-4 flex justify-center md:justify-start">
                <div className="inline-flex items-center gap-3 bg-white/6 hover:bg-white/8 transition-colors duration-200 px-4 py-2 rounded-2xl border border-white/10 shadow-lg">
                  <div className="text-2xl font-bold text-white">25+</div>
                  <div className="text-sm text-gray-300">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-white">
            <div className="flex items-center gap-4 mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0ms' }}>
              <div className="w-1.5 h-6 bg-[#C41E3A] rounded" aria-hidden />
              <div className="text-xs tracking-widest text-[#C41E3A]">ABOUT US</div>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 animate-fade-in-up opacity-0" style={{ animationDelay: '100ms' }}>Building Trust Through Precision & <span className="italic">Quality</span></h2>

            <div className="h-px w-16 bg-gradient-to-r from-[#C41E3A] to-transparent my-4 animate-fade-in-up opacity-0" style={{ animationDelay: '150ms' }} />

            <div className={`mb-6 ${sectionVisible ? '' : 'opacity-0'}`}>
              <p className="text-lg md:text-xl text-gray-200 mb-4 leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '200ms' }}>
                At AccuGeo Materials, we combine technical precision with a commitment to quality. From SPC flooring to premium wall systems, our solutions are engineered for durability and designed for beauty.
              </p>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed mt-4 animate-fade-in-up opacity-0" style={{ animationDelay: '300ms' }}>
                We deliver full-service support — design consultation, product selection, and professional installation — so every project is completed on time and to spec.
              </p>
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-gray-300 animate-fade-in-up opacity-0" style={{ animationDelay: '320ms' }}>
                  <Layers className="w-5 h-5 text-[#C41E3A]" aria-hidden />
                  <span>Product Sourcing</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 animate-fade-in-up opacity-0" style={{ animationDelay: '340ms' }}>
                  <Target className="w-5 h-5 text-[#C41E3A]" aria-hidden />
                  <span>Project Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip - full width below content */}
        <div className="mt-16 border-t border-white/10 pt-16">
          <StatsGrid
            play={sectionVisible}
            delayOffset={400}
            stats={[
              { id: 'a1', icon: <Calendar className="w-5 h-5" />, value: '25+', label: 'Years Of Experience' },
              { id: 'a2', icon: <Briefcase className="w-5 h-5" />, value: '1250+', label: 'Projects Completed' },
              { id: 'a3', icon: <Award className="w-5 h-5" />, value: '45+', label: 'Awards Winning' },
              { id: 'a4', icon: <Users className="w-5 h-5" />, value: '35+', label: 'Professionals' },
            ]}
            className="mt-6"
          />
        </div>
      </div>
    </section>
  );
}
