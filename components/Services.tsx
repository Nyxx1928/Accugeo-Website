"use client";

import React, { useRef, useState } from "react";

type ServiceImage = { src: string; alt: string };

type Service = {
  title: string;
  summary: string;
  subServices: string[];
  images: [ServiceImage, ServiceImage, ServiceImage];
};

const services: Service[] = [
  {
    title: "Quality Test",
    summary:
      "Comprehensive quality testing across a wide range of construction materials — from soils and aggregates to steel, asphalt, and cement — ensuring every component meets regulatory and project standards.",
    subServices: [
      "QUALITY TEST OF SOILS/ SOIL AGGREGATES",
      "QUALITY TEST OF COARSE AGGREGATES",
      "QUALITY TEST OF FINE AGGREGATES",
      "QUALITY TEST OF COMPOSITE AGGREGATES",
      "QUALITY TEST OF HARDENED CONCRETE",
      "QUALITY TEST OF CONCRETE CORE",
      "QUALITY TEST OF CONCRETE HOLLOW BLOCKS",
      "QUALITY TEST OF ASPHALT CORE",
      "QUALITY TEST OF CEMENT",
      "QUALITY TEST OF ASPHALT CEMENT",
      "QUALITY TEST OF EMULSIFIED ASPHALTS",
      "QUALITY TEST OF CONCRETE JOINT SEALER",
      "QUALITY TEST OF BITUMINOUS COLD MIXTURES",
      "QUALITY TEST OF REINFORCING STEEL BARS",
      "QUALITY TEST OF GALVANIZED STEEL PRODUCTS",
      "QUALITY TEST OF MINERAL FILLER",
      "QUALITY TEST OF FLY ASH",
      "QUALITY TEST OF HYDRATED LIME",
      "QUALITY TEST OF CURING COMPOUND",
    ],
    images: [
      { src: "/service1.png", alt: "Engineers preparing concrete sample cylinders in a materials lab" },
      { src: "/service2.png", alt: "Close-up of aggregate material analysis for quality grading" },
      { src: "/service3.png", alt: "Lab technician recording asphalt stability test results" },
    ],
  },
  {
    title: "IN-SITU TEST",
    summary: "Field-based in-situ testing to evaluate soil and material properties directly at the project site, providing accurate data for foundation design, earthwork decisions, and construction quality control.",
    subServices: [
      "Field Density Test",
      "Dynamic Cone Penetrometer Test",
    ],
    images: [
      { src: "/service2.png", alt: "Inspector examining delivered material on-site before installation" },
      { src: "/service3.png", alt: "Quality team reviewing construction phase checks at project site" },
      { src: "/service1.png", alt: "Inspection report and checklist documentation for compliance tracking" },
    ],
  },
  {
    title: "GEOTECHNICAL INVESTIGATION",
    summary: "Systematic subsurface exploration and geotechnical investigation to characterize soil and rock conditions, supporting safe and cost-effective design of foundations, slopes, and underground structures.",
    subServices: [
      "Onshore and Offshore",
      "Test Pitting",
    ],
    images: [
      { src: "/service3.png", alt: "Consultant presenting technical findings to stakeholders" },
      { src: "/service1.png", alt: "Detailed engineering report with compliance and recommendations" },
      { src: "/service2.png", alt: "Project planning session focused on material standards" },
    ],
  },
  {
    title: "NON-DESTRUCTIVE TEST",
    summary: "Advanced non-destructive testing methods to assess the condition and integrity of materials and structures without causing damage, ensuring safety and compliance across all project phases.",
    subServices: [
      "Rebound Hammer Test",
      "Dye Penetrant Test",
      "Magnetic Test",
      "Hardness Test",
      "Rebar Scanning",
    ],
    images: [
      { src: "/service1.png", alt: "Borehole operation capturing subsurface soil profiles" },
      { src: "/service3.png", alt: "Geotechnical specialist reviewing field penetration test readings" },
      { src: "/service2.png", alt: "Soil sample trays prepared for classification and moisture analysis" },
    ],
  },
  {
    title: "CONSULTANCY SERVICES AND INSPECTION",
    summary: "Accugeo provides comprehensive consultancy and inspection services tailored to the needs of construction, infrastructure, and industrial projects. Our team of licensed engineers and technical specialists delivers expert guidance on material selection, structural integrity, regulatory compliance, and quality assurance. From project inception through completion, we conduct thorough site inspections, review technical specifications, and provide actionable recommendations that help clients minimize risk, reduce costs, and meet the highest standards of safety and performance.",
    subServices: [],
    images: [
      { src: "/service2.png", alt: "Engineer performing visual structural condition inspection" },
      { src: "/service1.png", alt: "Crack mapping worksheet used in a structural assessment" },
      { src: "/service3.png", alt: "Assessment team discussing reinforcement corrosion findings" },
    ],
  },
];

export default function Services() {
  const [index, setIndex] = useState(0);
  const liveRef = useRef<HTMLParagraphElement | null>(null);

  const prev = () => setIndex((i) => (i - 1 + services.length) % services.length);
  const next = () => setIndex((i) => (i + 1) % services.length);

  const current = services[index];
  const isFirstService = index === 0;

  return (
    <section id="services" className="bg-black text-white py-8 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6 mb-6 text-center">
        <p className="text-xs uppercase tracking-wide text-gray-400">Services</p>
        <h1 className="text-2xl md:text-3xl font-extrabold mt-1 text-white">
          Professional testing &amp; inspection
        </h1>
      </div>

      <div className="relative flex items-center">
        <button aria-label="Previous service" onClick={prev} className="absolute left-2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="container mx-auto px-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: 3 image boxes */}
          <div className="grid grid-cols-2 gap-3">
            <div className="border-2 border-brand-red rounded-xl overflow-hidden aspect-[4/3]">
              <img src={current.images[0].src} alt={current.images[0].alt} className="w-full h-full object-cover" />
            </div>
            <div className="border-2 border-brand-red rounded-xl overflow-hidden aspect-[4/3]">
              <img src={current.images[1].src} alt={current.images[1].alt} className="w-full h-full object-cover" />
            </div>
            <div className="col-span-2 border-2 border-brand-red rounded-xl overflow-hidden aspect-[16/5]">
              <img src={current.images[2].src} alt={current.images[2].alt} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right: title + sub-services */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-1 text-white">{current.title}</h2>
            <p className="text-gray-300 mb-3 leading-relaxed" style={{ fontSize: "1rem" }}>{current.summary}</p>
            <ul className={`grid gap-x-3 gap-y-0.5 ${isFirstService ? "grid-cols-2" : "grid-cols-1"}`}>
              {current.subServices.map((sub) => (
                <li
                  key={sub}
                  className="flex items-start gap-1 text-white"
                  style={{ fontSize: isFirstService ? "0.875rem" : "1.125rem", lineHeight: "1.5" }}
                >
                  <span className="mt-1 w-1 h-1 rounded-full bg-brand-red flex-shrink-0" aria-hidden="true" />
                  <span>{sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button aria-label="Next service" onClick={next} className="absolute right-2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex gap-2 justify-center mt-6">
        {services.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setIndex(i)}
            aria-label={`Go to ${s.title}`}
            aria-current={i === index ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "bg-brand-red w-10" : "bg-gray-600 w-6 hover:bg-gray-400"}`}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite" ref={liveRef} />
    </section>
  );
}
