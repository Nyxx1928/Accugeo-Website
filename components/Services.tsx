"use client";

import Image from "next/image";
import React, { useRef, useState, useCallback } from "react";

type ServiceImage = { src: string; alt: string };

type Service = {
  title: string;
  summary: string;
  subServices: string[];
  images: [ServiceImage, ServiceImage, ServiceImage];
};

const services: Service[] = [
  {
    title: "Material Testing",
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
    title: "Quality Inspection",
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
    title: "Consulting & Reporting",
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
    title: "Structural Assessment",
    summary: "Accugeo provides comprehensive consultancy and inspection services tailored to the needs of construction, infrastructure, and industrial projects.",
    subServices: [
      "Visual Inspection",
      "Load Testing",
      "Condition Survey",
    ],
    images: [
      { src: "/service2.png", alt: "Engineer performing visual structural condition inspection" },
      { src: "/service1.png", alt: "Crack mapping worksheet used in a structural assessment" },
      { src: "/service3.png", alt: "Assessment team discussing reinforcement corrosion findings" },
    ],
  },
  {
    title: "Geotechnical Investigation",
    summary: "Advanced geotechnical investigation methods to assess subsurface conditions and support safe foundation design.",
    subServices: [
      "Borehole Drilling",
      "Standard Penetration Test",
      "Soil Classification",
    ],
    images: [
      { src: "/service1.png", alt: "Borehole operation capturing subsurface soil profiles" },
      { src: "/service3.png", alt: "Geotechnical specialist reviewing field penetration test readings" },
      { src: "/service2.png", alt: "Soil sample trays prepared for classification and moisture analysis" },
    ],
  },
  {
    title: "Non-Destructive Testing",
    summary: "Advanced non-destructive testing methods to assess the condition and integrity of materials and structures without causing damage, ensuring safety and compliance across all project phases.",
    subServices: [
      "Rebound Hammer Test",
      "Dye Penetrant Test",
      "Magnetic Test",
      "Hardness Test",
      "Rebar Scanning",
    ],
    images: [
      { src: "/service1.png", alt: "Technician performing rebound hammer test on concrete surface" },
      { src: "/service3.png", alt: "Dye penetrant test revealing surface cracks in metal component" },
      { src: "/service2.png", alt: "Rebar scanning equipment detecting reinforcement layout" },
    ],
  },
];

const TRANSITION_DURATION = 400;
const MAX_VISIBLE_SUBSERVICES = 6;

type NavigationDirection = "next" | "prev" | "jump";

export default function Services() {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [navigationDirection, setNavigationDirection] = useState<NavigationDirection>("next");
  const [expandedServices, setExpandedServices] = useState<Record<number, boolean>>({});
  const isTransitioningRef = useRef(false);
  const pendingDirectionRef = useRef<NavigationDirection>("next");
  const liveRef = useRef<HTMLParagraphElement | null>(null);

  const navigate = useCallback((nextIndex: number, direction: NavigationDirection = "jump") => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    pendingDirectionRef.current = direction;
    setIsTransitioning(true);
    setTimeout(() => {
      isTransitioningRef.current = false;
      setNavigationDirection(pendingDirectionRef.current);
      setIndex(nextIndex);
      setIsTransitioning(false);
      if (liveRef.current) {
        liveRef.current.textContent = `Showing ${services[nextIndex].title}, service ${nextIndex + 1} of ${services.length}`;
      }
    }, TRANSITION_DURATION);
  }, []);

  const prev = () => navigate((index - 1 + services.length) % services.length, "prev");
  const next = () => navigate((index + 1) % services.length, "next");

  const toggleExpanded = (serviceIndex: number) => {
    setExpandedServices((prevState) => ({
      ...prevState,
      [serviceIndex]: !prevState[serviceIndex],
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  };

  const current = services[index];

  return (
    <section id="services" className="relative overflow-hidden bg-gradient-to-b from-[#090909] via-[#111111] to-[#0b0b0b] text-white py-16 md:py-24 min-h-screen flex flex-col justify-center">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="absolute bottom-8 right-8 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 mb-8 text-center relative z-10">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-red">Services</p>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-white leading-tight">
          Professional testing &amp; inspection
        </h1>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Services Carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative container mx-auto px-6 md:px-8 flex items-center outline-none z-10"
      >
        <button
          aria-label="Previous service"
          onClick={prev}
          disabled={isTransitioning}
          className="absolute left-2 z-20 border border-white/20 bg-black/60 backdrop-blur-sm hover:bg-black/80 p-2 rounded-full transition-colors disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="w-full px-10 md:px-16">
          {services.map((service, i) => (
            <div
              key={service.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${services.length}: ${service.title}`}
              aria-hidden={i !== index ? "true" : "false"}
              className={
                i !== index
                  ? "hidden"
                  : `grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 items-start rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-5 md:p-8 ${navigationDirection === "prev" ? "animate-slide-in-left" : "animate-slide-in-right"}`
              }
            >
              {/* Left: 3 image boxes */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="relative border border-white/15 rounded-2xl overflow-hidden bg-black/30 shadow-[0_10px_30px_rgba(0,0,0,0.35)] aspect-[4/3]">
                  <Image
                    src={service.images[0].src}
                    alt={service.images[0].alt}
                    fill
                    sizes="(max-width: 768px) 46vw, (max-width: 1280px) 28vw, 420px"
                    className="object-cover"
                    priority={i === 0}
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
                <div className="relative border border-white/15 rounded-2xl overflow-hidden bg-black/30 shadow-[0_10px_30px_rgba(0,0,0,0.35)] aspect-[4/3]">
                  <Image
                    src={service.images[1].src}
                    alt={service.images[1].alt}
                    fill
                    sizes="(max-width: 768px) 46vw, (max-width: 1280px) 28vw, 420px"
                    className="object-cover"
                    priority={i === 0}
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
                <div className="relative col-span-2 border border-white/15 rounded-2xl overflow-hidden bg-black/30 shadow-[0_10px_30px_rgba(0,0,0,0.35)] aspect-[16/5]">
                  <Image
                    src={service.images[2].src}
                    alt={service.images[2].alt}
                    fill
                    sizes="(max-width: 768px) 94vw, (max-width: 1280px) 58vw, 900px"
                    className="object-cover"
                    priority={i === 0}
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </div>

              {/* Right: title + sub-services */}
              <div className="text-white">
                <div className="w-12 h-px bg-gradient-to-r from-brand-red to-transparent mb-4" aria-hidden="true" />
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white leading-tight">{service.title}</h2>
                <p className="text-gray-300 mb-5 leading-relaxed" style={{ fontSize: "1rem" }}>{service.summary}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-gray-400 mb-3">Key Capabilities</p>
                <ul id={`service-list-${i}`} className={`grid gap-x-3 gap-y-0.5 ${i === 0 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {(expandedServices[i] ? service.subServices : service.subServices.slice(0, MAX_VISIBLE_SUBSERVICES)).map((sub) => (
                    <li
                      key={sub}
                      className="flex items-start gap-1 text-white/90"
                      style={{ fontSize: i === 0 ? "0.875rem" : "1.125rem", lineHeight: "1.5" }}
                    >
                      <span className="mt-1 w-1 h-1 rounded-full bg-brand-red flex-shrink-0" aria-hidden="true" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
                {service.subServices.length > MAX_VISIBLE_SUBSERVICES ? (
                  <button
                    onClick={() => toggleExpanded(i)}
                    type="button"
                    className="mt-4 text-sm font-semibold text-brand-red hover:text-white transition-colors"
                    aria-expanded={expandedServices[i] ? "true" : "false"}
                    aria-controls={`service-list-${i}`}
                  >
                    {expandedServices[i] ? "Show fewer capabilities" : `Show all ${service.subServices.length} capabilities`}
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <button
          aria-label="Next service"
          onClick={next}
          disabled={isTransitioning}
          className="absolute right-2 z-20 border border-white/20 bg-black/60 backdrop-blur-sm hover:bg-black/80 p-2 rounded-full transition-colors disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mt-6 px-6">
        {services.map((s, i) => (
          <button
            key={s.title}
            onClick={() => {
              if (i === index) return;
              navigate(i, i > index ? "next" : "prev");
            }}
            disabled={isTransitioning}
            aria-label={`Go to ${s.title}`}
            aria-current={i === index ? "true" : undefined}
            className={`rounded-full border px-3 py-1 text-xs tracking-wide uppercase transition-all duration-300 ${i === index ? "bg-brand-red border-brand-red text-white" : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"} disabled:opacity-50`}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>

      <p className="text-center text-gray-400 text-sm mt-2">{index + 1} of {services.length}</p>

      <p
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        ref={liveRef}
      >
        {`Showing ${current.title}, service ${index + 1} of ${services.length}`}
      </p>
    </section>
  );
}
