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
  const liveRef = useRef<HTMLParagraphElement | null>(null);

  const prev = () => setIndex((i) => (i - 1 + services.length) % services.length);
  const next = () => setIndex((i) => (i + 1) % services.length);

  const current = services[index];

  return (
    <section id="services" className="bg-black text-white py-8 min-h-screen flex flex-col justify-center">
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
          className="absolute left-2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Content */}
        <div className="container mx-auto px-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: 3 image boxes */}
          <div className="grid grid-cols-2 gap-3">
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
          <div className="text-white">
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
          className="absolute right-2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicator bars */}
      <div className="flex gap-2 justify-center mt-6">
        {services.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setIndex(i)}
            aria-label={`Go to ${s.title}`}
            aria-current={i === index ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "bg-brand-red w-10" : "bg-gray-600 w-6 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite" ref={liveRef} />
    </section>
  );
}
