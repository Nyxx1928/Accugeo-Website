"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "framer-motion";

type ServiceImage = {
  src: string;
  alt: string;
};

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
      "Lab-grade verification for concrete, asphalt, and aggregates to keep every build phase compliant and reliable.",
    subServices: [
      "Concrete mix design and testing",
      "Soil classification and compaction",
      "Aggregate quality analysis",
      "Asphalt content and stability",
      "Cement and admixture testing",
      "Core sample extraction and analysis",
    ],
    images: [
      { src: "/service1.png", alt: "Engineers preparing concrete sample cylinders in a materials lab" },
      { src: "/service2.png", alt: "Close-up of aggregate material analysis for quality grading" },
      { src: "/service3.png", alt: "Lab technician recording asphalt stability test results" },
    ],
  },
  {
    title: "Quality Inspection",
    summary:
      "Field-first inspection workflows that catch issues early and keep materials, deliveries, and execution on spec.",
    subServices: [
      "On-site material sampling",
      "Construction phase monitoring",
      "Delivery inspection and logging",
      "Compliance verification",
      "Defect identification and reporting",
      "Third-party quality audits",
    ],
    images: [
      { src: "/service2.png", alt: "Inspector examining delivered material on-site before installation" },
      { src: "/service3.png", alt: "Quality team reviewing construction phase checks at project site" },
      { src: "/service1.png", alt: "Inspection report and checklist documentation for compliance tracking" },
    ],
  },
  {
    title: "Consulting & Reporting",
    summary:
      "Actionable technical reporting and advisory support that helps teams make faster, lower-risk project decisions.",
    subServices: [
      "Technical specification writing",
      "Project compliance consulting",
      "Failure investigation reports",
      "Material selection guidance",
      "Regulatory standards advisory",
      "Timely and clear documentation",
    ],
    images: [
      { src: "/service3.png", alt: "Consultant presenting technical findings to stakeholders" },
      { src: "/service1.png", alt: "Detailed engineering report with compliance and recommendations" },
      { src: "/service2.png", alt: "Project planning session focused on material standards" },
    ],
  },
  {
    title: "Soil Investigation",
    summary:
      "Site-specific geotechnical data collection and interpretation to support safe foundation and earthwork decisions.",
    subServices: [
      "Borehole drilling and logging",
      "Standard penetration testing",
      "Soil bearing capacity analysis",
      "Groundwater level monitoring",
      "Foundation design support",
      "Geotechnical hazard assessment",
    ],
    images: [
      { src: "/service1.png", alt: "Borehole operation capturing subsurface soil profiles" },
      { src: "/service3.png", alt: "Geotechnical specialist reviewing field penetration test readings" },
      { src: "/service2.png", alt: "Soil sample trays prepared for classification and moisture analysis" },
    ],
  },
  {
    title: "Structural Assessment",
    summary:
      "Targeted structural diagnostics to evaluate performance, reveal risk areas, and guide retrofit planning.",
    subServices: [
      "Visual structural inspection",
      "Load capacity evaluation",
      "Crack mapping and analysis",
      "Reinforcement corrosion testing",
      "Structural integrity reporting",
      "Retrofit and repair recommendations",
    ],
    images: [
      { src: "/service2.png", alt: "Engineer performing visual structural condition inspection" },
      { src: "/service1.png", alt: "Crack mapping worksheet used in a structural assessment" },
      { src: "/service3.png", alt: "Assessment team discussing reinforcement corrosion findings" },
    ],
  },
  {
    title: "Non-Destructive Testing",
    summary:
      "Advanced NDT methods that assess internal material conditions without damaging existing structures.",
    subServices: [
      "Ultrasonic pulse velocity testing",
      "Rebound hammer testing",
      "Ground penetrating radar",
      "Magnetic particle inspection",
      "Radiographic testing",
      "Infrared thermography",
    ],
    images: [
      { src: "/service3.png", alt: "Technician running ultrasonic pulse velocity measurements on concrete" },
      { src: "/service2.png", alt: "Ground-penetrating radar scan in progress at site" },
      { src: "/service1.png", alt: "Infrared thermography image used for non-destructive inspection" },
    ],
  },
];

const TRANSITION_MS = 360;

type Direction = "left" | "right";

export default function Services() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>("left");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 26 });
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTransitioningRef = useRef(false);
  const liveRef = useRef<HTMLParagraphElement | null>(null);
  const carouselRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const serviceCountLabel = `${index + 1} of ${services.length}`;

  const clearTransitionTimer = useCallback(() => {
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  }, []);

  const beginTransition = useCallback((nextDirection: Direction) => {
    isTransitioningRef.current = true;
    setDirection(nextDirection);
    setIsTransitioning(true);
    clearTransitionTimer();
    transitionTimerRef.current = setTimeout(() => {
      isTransitioningRef.current = false;
      setIsTransitioning(false);
      transitionTimerRef.current = null;
    }, TRANSITION_MS);
  }, [clearTransitionTimer]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    return () => {
      isTransitioningRef.current = false;
      clearTransitionTimer();
    };
  }, [clearTransitionTimer]);

  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = `Showing ${services[index].title}, service ${index + 1} of ${services.length}`;
    }
  }, [index]);

  const prev = useCallback(() => {
    if (!emblaApi || isTransitioningRef.current) return;
    beginTransition("right");
    emblaApi.scrollPrev();
  }, [emblaApi, beginTransition]);

  const next = useCallback(() => {
    if (!emblaApi || isTransitioningRef.current) return;
    beginTransition("left");
    emblaApi.scrollNext();
  }, [emblaApi, beginTransition]);

  const goToIndex = useCallback((i: number) => {
    if (!emblaApi || i === index || isTransitioningRef.current) return;
    beginTransition(i > index ? "left" : "right");
    emblaApi.scrollTo(i);
  }, [emblaApi, beginTransition, index]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (isTransitioningRef.current) return;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const activeMotion = useMemo(
    () => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.38,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    [prefersReducedMotion],
  );

  const inactiveMotion = useMemo(
    () => ({
      opacity: 0.65,
      x: prefersReducedMotion ? 0 : direction === "left" ? 10 : -10,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.24,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
    [prefersReducedMotion, direction],
  );

  return (
    <section
      id="services"
      ref={carouselRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Services carousel"
      aria-roledescription="carousel"
      className="relative overflow-hidden bg-gradient-to-b from-[#070707] via-[#111111] to-[#090909] text-white py-16 md:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Services</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight tracking-tight text-white">
            Professional Testing and Inspection
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-300">
            Precision-driven support from lab testing to field verification and technical reporting.
          </p>
        </div>

        <div className="relative mt-10 md:mt-14 flex items-center">
          <motion.button
            aria-label="Previous service"
            onClick={prev}
            disabled={isTransitioning}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            className="absolute left-1 md:-left-6 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/60 backdrop-blur hover:border-brand-red hover:bg-black/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.45)]" ref={emblaRef}>
            <div className="flex">
              {services.map((service, i) => {
                const isActive = i === index;

                return (
                  <div
                    key={service.title}
                    className="min-w-0 flex-[0_0_100%] p-5 md:p-10"
                    aria-hidden={!isActive}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-10 items-center">
                      <motion.div
                        className="grid grid-cols-2 gap-3"
                        initial={false}
                        animate={isActive ? activeMotion : inactiveMotion}
                      >
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
                          <img src={service.images[0].src} alt={service.images[0].alt} className="w-full h-full object-cover" />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                        </div>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
                          <img src={service.images[1].src} alt={service.images[1].alt} className="w-full h-full object-cover" />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                        </div>
                        <div className="relative col-span-2 rounded-2xl overflow-hidden border border-white/10 aspect-[16/7]">
                          <img src={service.images[2].src} alt={service.images[2].alt} className="w-full h-full object-cover" />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                        </div>
                      </motion.div>

                      <motion.div
                        className="text-white"
                        initial={false}
                        animate={isActive ? activeMotion : inactiveMotion}
                      >
                        <div className="inline-flex items-center rounded-full border border-brand-red/40 bg-brand-red/10 px-3 py-1 text-xs font-medium tracking-wide text-white/95">
                          Service {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                        </div>
                        <h2 className="mt-4 text-3xl md:text-4xl font-bold leading-tight tracking-tight">{service.title}</h2>
                        <p className="mt-3 text-sm md:text-base leading-relaxed text-gray-300">{service.summary}</p>

                        <ul className="mt-6 space-y-3">
                          {service.subServices.map((sub) => (
                            <li key={sub} className="flex items-start gap-3 text-sm md:text-base text-white/90 leading-relaxed">
                              <span className="mt-2 h-2 w-2 rounded-full bg-brand-red flex-shrink-0" aria-hidden="true" />
                              <span>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <motion.button
            aria-label="Next service"
            onClick={next}
            disabled={isTransitioning}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            className="absolute right-1 md:-right-6 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/60 backdrop-blur hover:border-brand-red hover:bg-black/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex gap-2 justify-center">
            {services.map((s, i) => (
              <motion.button
                key={s.title}
                onClick={() => goToIndex(i)}
                disabled={isTransitioning}
                aria-label={`Go to ${s.title}`}
                aria-current={i === index ? "true" : undefined}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                className={`h-2 rounded-full transition-all duration-200 disabled:cursor-not-allowed ${
                  i === index
                    ? "w-12 bg-brand-red"
                    : "w-6 bg-white/25 hover:bg-white/45"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-400">{serviceCountLabel}</p>
        </div>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true" ref={liveRef} />
    </section>
  );
}
