"use client";

import React, { useRef, useState } from "react";

type Service = {
  title: string;
  subServices: string[];
  images: [string, string, string];
};

const services: Service[] = [
  {
    title: "Material Testing",
    subServices: [
      "Concrete mix design and testing",
      "Soil classification and compaction",
      "Aggregate quality analysis",
      "Asphalt content and stability",
      "Cement and admixture testing",
      "Core sample extraction and analysis",
    ],
    images: ["/service1.png", "/service2.png", "/service3.png"],
  },
  {
    title: "Quality Inspection",
    subServices: [
      "On-site material sampling",
      "Construction phase monitoring",
      "Delivery inspection and logging",
      "Compliance verification",
      "Defect identification and reporting",
      "Third-party quality audits",
    ],
    images: ["/service2.png", "/service3.png", "/service1.png"],
  },
  {
    title: "Consulting & Reporting",
    subServices: [
      "Technical specification writing",
      "Project compliance consulting",
      "Failure investigation reports",
      "Material selection guidance",
      "Regulatory standards advisory",
      "Timely and clear documentation",
    ],
    images: ["/service3.png", "/service1.png", "/service2.png"],
  },
  {
    title: "Soil Investigation",
    subServices: [
      "Borehole drilling and logging",
      "Standard penetration testing",
      "Soil bearing capacity analysis",
      "Groundwater level monitoring",
      "Foundation design support",
      "Geotechnical hazard assessment",
    ],
    images: ["/service1.png", "/service3.png", "/service2.png"],
  },
  {
    title: "Structural Assessment",
    subServices: [
      "Visual structural inspection",
      "Load capacity evaluation",
      "Crack mapping and analysis",
      "Reinforcement corrosion testing",
      "Structural integrity reporting",
      "Retrofit and repair recommendations",
    ],
    images: ["/service2.png", "/service1.png", "/service3.png"],
  },
  {
    title: "Non-Destructive Testing",
    subServices: [
      "Ultrasonic pulse velocity testing",
      "Rebound hammer testing",
      "Ground penetrating radar",
      "Magnetic particle inspection",
      "Radiographic testing",
      "Infrared thermography",
    ],
    images: ["/service3.png", "/service2.png", "/service1.png"],
  },
];

export default function Services() {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [fadeState, setFadeState] = useState<'visible' | 'fading-out' | 'fading-in'>('visible');
  const liveRef = useRef<HTMLParagraphElement | null>(null);
  const carouselRef = useRef<HTMLElement | null>(null);

  const navigateToIndex = (newIndex: number, navDirection: 'left' | 'right') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setDirection(navDirection);
    setFadeState('fading-out');
    
    // Fade out for 200ms
    setTimeout(() => {
      setIndex(newIndex);
      setFadeState('fading-in');
      
      // Fade in for 200ms
      setTimeout(() => {
        setFadeState('visible');
        setIsTransitioning(false);
        setDirection(null);
      }, 200);
    }, 200);
  };

  const prev = () => {
    const newIndex = (index - 1 + services.length) % services.length;
    navigateToIndex(newIndex, 'right'); // Slide right when going back
  };
  
  const next = () => {
    const newIndex = (index + 1) % services.length;
    navigateToIndex(newIndex, 'left'); // Slide left when going forward
  };

  const goToIndex = (i: number) => {
    if (i === index || isTransitioning) return;
    const navDirection = i > index ? 'left' : 'right';
    navigateToIndex(i, navDirection);
  };

  const current = services[index];

  // Update ARIA live region when service changes
  React.useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = `Showing ${current.title}, service ${index + 1} of ${services.length}`;
    }
  }, [index, current.title]);

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (isTransitioning) return; // Disable keyboard nav during transition
    
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <section 
      id="services" 
      ref={carouselRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Services carousel"
      className="bg-black text-white py-8 min-h-screen flex flex-col justify-center"
    >
      {/* Header */}
      <div className="container mx-auto px-6 mb-6 text-center">
        <p className="text-xs uppercase tracking-wide text-gray-400">Services</p>
        <h1 className="text-2xl md:text-3xl font-extrabold mt-1 text-white">
          Professional testing &amp; inspection
        </h1>
      </div>

      {/* Main layout with arrows */}
      <div className="relative flex items-center">
        {/* Left arrow */}
        <button
          aria-label="Previous service"
          onClick={prev}
          disabled={isTransitioning}
          className="absolute left-2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Content */}
        <div className="container mx-auto px-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: 3 image boxes */}
          <div 
            className="grid grid-cols-2 gap-3"
            style={{
              opacity: fadeState === 'fading-out' ? 0 : 1,
              transform: fadeState === 'fading-in' 
                ? `translateX(${direction === 'left' ? '-30px' : '30px'})` 
                : 'translateX(0)',
              transition: fadeState === 'fading-out' 
                ? 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)' 
                : fadeState === 'fading-in'
                ? 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none'
            }}
          >
            <div className="border-2 border-brand-red rounded-xl overflow-hidden aspect-[4/3]">
              <img src={current.images[0]} alt={current.title} className="w-full h-full object-cover" />
            </div>
            <div className="border-2 border-brand-red rounded-xl overflow-hidden aspect-[4/3]">
              <img src={current.images[1]} alt={current.title} className="w-full h-full object-cover" />
            </div>
            <div className="col-span-2 border-2 border-brand-red rounded-xl overflow-hidden aspect-[16/5]">
              <img src={current.images[2]} alt={current.title} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right: title + sub-services */}
          <div 
            className="text-white"
            style={{
              opacity: fadeState === 'fading-out' ? 0 : 1,
              transform: fadeState === 'fading-in' 
                ? `translateX(${direction === 'left' ? '-30px' : '30px'})` 
                : 'translateX(0)',
              transition: fadeState === 'fading-out' 
                ? 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)' 
                : fadeState === 'fading-in'
                ? 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none'
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white">{current.title}</h2>
            <ul className="space-y-2">
              {current.subServices.map((sub) => (
                <li key={sub} className="flex items-center gap-3 text-white text-base">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-red flex-shrink-0" aria-hidden="true" />
                  {sub}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right arrow */}
        <button
          aria-label="Next service"
          onClick={next}
          disabled={isTransitioning}
          className="absolute right-2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicator dots with counter */}
      <div className="flex flex-col items-center gap-3 mt-6">
        <div className="flex gap-2 justify-center">
          {services.map((s, i) => (
            <button
              key={s.title}
              onClick={() => goToIndex(i)}
              disabled={isTransitioning}
              aria-label={`Go to ${s.title}`}
              aria-current={i === index ? "true" : undefined}
              className={`w-11 h-11 rounded-full transition-all duration-200 flex items-center justify-center disabled:cursor-not-allowed ${
                i === index 
                  ? "bg-brand-red scale-110" 
                  : "bg-gray-600 hover:bg-gray-400 hover:scale-120"
              }`}
            >
              <span className={`w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-gray-400"}`} />
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-400">
          {index + 1} of {services.length}
        </p>
      </div>

      <p className="sr-only" aria-live="polite" ref={liveRef} />
    </section>
  );
}
