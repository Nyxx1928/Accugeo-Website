"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";

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

function buildAccordionDescription(serviceTitle: string, subService: string) {
  return `${subService} is delivered as part of ${serviceTitle} with standards-based workflows, documented findings, and practical recommendations for your project team.`;
}

export default function Services() {
  const [openItemByService, setOpenItemByService] = useState<Record<number, number>>(() => {
    return services.reduce<Record<number, number>>((acc, _service, index) => {
      acc[index] = 0;
      return acc;
    }, {});
  });

  const firstThreeServices = useMemo(() => services.slice(0, 3), []);

  const toggleAccordionItem = (serviceIndex: number, itemIndex: number) => {
    setOpenItemByService((previous) => ({
      ...previous,
      [serviceIndex]: previous[serviceIndex] === itemIndex ? -1 : itemIndex,
    }));
  };

  return (
    <section id="services" className="relative overflow-hidden py-24 text-white md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#090507_0%,#14070c_45%,#0a0406_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-[#c41e3a]/25 blur-[120px]" />
        <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-[#7a1c2d]/20 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 md:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e56c81]">Our Services</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-6xl">Reliable engineering services for better build outcomes</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#c7a3ae] md:text-base">
            We provide laboratory testing, on-site inspection, and technical reporting with the precision and responsiveness modern projects require.
          </p>
        </div>

        <div className="space-y-16 md:space-y-20">
          {firstThreeServices.map((service, serviceIndex) => {
            const isEvenRow = serviceIndex % 2 === 0;

            return (
              <article key={service.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                <div className={`${isEvenRow ? "md:order-1" : "md:order-2"}`}>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#e56c81]">{`0${serviceIndex + 1}`}</p>
                  <h3 className="text-3xl font-semibold leading-tight text-white md:text-4xl">{service.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#c7a3ae] md:text-base">{service.summary}</p>

                  <div className="mt-6 rounded-2xl border border-[#c85d72]/25 bg-[rgba(44,14,22,0.48)] px-4 py-2 backdrop-blur-sm md:px-5">
                    {service.subServices.slice(0, 4).map((subService, itemIndex) => {
                      const isOpen = openItemByService[serviceIndex] === itemIndex;
                      const panelId = `service-panel-${serviceIndex}-${itemIndex}`;

                      return (
                        <div key={subService} className="border-b border-white/10 last:border-b-0">
                          <button
                            type="button"
                            className="flex w-full items-center justify-between py-3 text-left text-[0.98rem] text-white/95 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d86a80]"
                            aria-expanded={isOpen ? "true" : "false"}
                            aria-controls={panelId}
                            onClick={() => toggleAccordionItem(serviceIndex, itemIndex)}
                          >
                            <span>{subService}</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 flex-shrink-0 text-[#e48b9d] transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          <div
                            id={panelId}
                            className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-28 pb-3 opacity-100" : "max-h-0 opacity-0"}`}
                          >
                            <p className="pr-6 text-sm leading-relaxed text-[#b88f9b]">
                              {buildAccordionDescription(service.title, subService)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={`${isEvenRow ? "md:order-2" : "md:order-1"}`}>
                  <div className="relative rounded-2xl border border-[#c85d72]/30 bg-[rgba(52,16,26,0.42)] p-2 shadow-[0_18px_60px_rgba(18,6,10,0.45)] backdrop-blur-md">
                    <div className="grid grid-cols-2 grid-rows-[1.35fr_1fr] gap-1.5">
                      <div className="relative col-span-2 min-h-[210px] overflow-hidden rounded-xl md:min-h-[260px]">
                        <Image
                          src={service.images[0].src}
                          alt={service.images[0].alt}
                          fill
                          sizes="(max-width: 767px) 100vw, 42vw"
                          className="object-cover"
                          priority={serviceIndex === 0}
                        />
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                      </div>
                      <div className="relative min-h-[110px] overflow-hidden rounded-xl md:min-h-[145px]">
                        <Image
                          src={service.images[1].src}
                          alt={service.images[1].alt}
                          fill
                          sizes="(max-width: 767px) 50vw, 21vw"
                          className="object-cover"
                        />
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </div>
                      <div className="relative min-h-[110px] overflow-hidden rounded-xl md:min-h-[145px]">
                        <Image
                          src={service.images[2].src}
                          alt={service.images[2].alt}
                          fill
                          sizes="(max-width: 767px) 50vw, 21vw"
                          className="object-cover"
                        />
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl border border-white/10 bg-[linear-gradient(110deg,rgba(196,30,58,0.28)_0%,rgba(56,16,25,0.58)_30%,rgba(18,8,12,0.72)_100%)] p-8 shadow-[0_22px_64px_rgba(20,6,10,0.45)] backdrop-blur-sm md:mt-24 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <h3 className="max-w-xl text-3xl font-medium leading-tight text-white md:text-5xl">
              Let&apos;s build a safer, stronger project together.
            </h3>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-[#f09aad]/45 bg-[#c41e3a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a31931]"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
