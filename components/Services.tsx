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

const MOBILE_VISIBLE_SUBSERVICES = 4;
const MAX_VISIBLE_SUBSERVICES = 6;

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
      { src: "/img 4.jpg", alt: "Engineers preparing concrete sample cylinders in a materials lab" },
      { src: "/img2.jpg", alt: "Close-up of aggregate material analysis for quality grading" },
      { src: "/img7.jpg", alt: "Lab technician recording asphalt stability test results" },
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
      { src: "/dyna cone pen test.jpg", alt: "Inspector examining delivered material on-site before installation" },
      { src: "/field den test.jpg", alt: "Quality team reviewing construction phase checks at project site" },
      { src: "/field den test 2.jpg", alt: "Inspection report and checklist documentation for compliance tracking" },
    ],
  },
  {
    title: "Geotechnical Investigation",
    summary: "Systematic subsurface exploration and geotechnical investigation to characterize soil and rock conditions, supporting safe and cost-effective design of foundations, slopes, and underground structures.",
    subServices: [
      "Onshore and Offshore",
      "Test Pitting",
      "Borehole Drilling",
      "Standard Penetration Test",
    ],
    images: [
      { src: "/img 11.jpg", alt: "Consultant presenting technical findings to stakeholders" },
      { src: "/img 16.jpg", alt: "Detailed engineering report with compliance and recommendations" },
      { src: "/img15.jpg", alt: "Project planning session focused on material standards" },
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
      { src: "/non desc test 1.jpg", alt: "Technician performing rebound hammer test on concrete surface" },
      { src: "/non desc test 2.jpg", alt: "Dye penetrant test revealing surface cracks in metal component" },
      { src: "/non desc test 3.jpg", alt: "Rebar scanning equipment detecting reinforcement layout" },
    ],
  },
];

const subServiceDescriptions: Record<string, string> = {
  // Material Testing
  "QUALITY TEST OF SOILS/ SOIL AGGREGATES": "Evaluates the physical and engineering properties of soils and soil aggregates including gradation, plasticity, compaction, and bearing capacity to ensure suitability for construction use.",
  "QUALITY TEST OF COARSE AGGREGATES": "Assesses coarse aggregate samples for size distribution, abrasion resistance, soundness, and specific gravity to verify compliance with project and DPWH specifications.",
  "QUALITY TEST OF FINE AGGREGATES": "Tests fine aggregates for fineness modulus, organic impurities, clay content, and specific gravity to confirm suitability for concrete and asphalt mix designs.",
  "QUALITY TEST OF COMPOSITE AGGREGATES": "Examines blended aggregate combinations for gradation balance and material consistency, ensuring the mix meets structural and pavement design requirements.",
  "QUALITY TEST OF HARDENED CONCRETE": "Determines the compressive strength and durability of hardened concrete specimens to verify that placed concrete meets the specified design strength.",
  "QUALITY TEST OF CONCRETE CORE": "Extracts and tests drilled cores from existing concrete structures to assess in-place strength, density, and integrity for quality assurance or forensic evaluation.",
  "QUALITY TEST OF CONCRETE HOLLOW BLOCKS": "Measures the compressive strength, dimensions, and water absorption of concrete hollow blocks to confirm compliance with ASTM and local masonry standards.",
  "QUALITY TEST OF ASPHALT CORE": "Analyzes extracted asphalt pavement cores for thickness, density, air voids, and bitumen content to evaluate pavement quality and construction compliance.",
  "QUALITY TEST OF CEMENT": "Tests cement samples for fineness, setting time, soundness, and compressive strength to ensure the material meets ASTM C150 or equivalent standards before use.",
  "QUALITY TEST OF ASPHALT CEMENT": "Evaluates asphalt cement binder for penetration, ductility, softening point, and viscosity to confirm performance characteristics for pavement applications.",
  "QUALITY TEST OF EMULSIFIED ASPHALTS": "Tests emulsified asphalt products for viscosity, residue content, and stability to verify suitability for tack coats, prime coats, and surface treatments.",
  "QUALITY TEST OF CONCRETE JOINT SEALER": "Assesses joint sealant materials for flow resistance, bond strength, and flexibility to ensure long-term performance in concrete pavement joints.",
  "QUALITY TEST OF BITUMINOUS COLD MIXTURES": "Evaluates cold-mix asphalt for stability, flow, and air void content to confirm adequacy for patching and low-volume road applications.",
  "QUALITY TEST OF REINFORCING STEEL BARS": "Tests rebar samples for tensile strength, yield strength, elongation, and bend properties to verify compliance with ASTM A615 or PNS standards.",
  "QUALITY TEST OF GALVANIZED STEEL PRODUCTS": "Checks galvanized steel for coating thickness, adhesion, and uniformity to ensure adequate corrosion protection for structural and utility applications.",
  "QUALITY TEST OF MINERAL FILLER": "Determines the gradation and plasticity of mineral filler materials used in asphalt mixes to confirm they meet mix design and specification requirements.",
  "QUALITY TEST OF FLY ASH": "Tests fly ash for fineness, loss on ignition, and pozzolanic activity index to verify its suitability as a supplementary cementitious material in concrete.",
  "QUALITY TEST OF HYDRATED LIME": "Evaluates hydrated lime for purity, fineness, and reactivity to confirm performance as a stabilizing agent or anti-stripping additive in pavement construction.",
  "QUALITY TEST OF CURING COMPOUND": "Assesses liquid membrane-forming curing compounds for water retention efficiency and coverage rate to ensure proper concrete curing and strength development.",
  // Quality Inspection
  "Field Density Test": "Measures the in-place dry density and moisture content of compacted soil or base materials using nuclear gauge or sand cone methods to verify that compaction meets specified requirements.",
  "Dynamic Cone Penetrometer Test": "Uses a DCP device to rapidly assess the in-situ strength and bearing capacity of subgrade and base layers, providing continuous resistance profiles for pavement evaluation.",
  // Geotechnical Investigation
  "Onshore and Offshore": "Conducts comprehensive subsurface investigations on land and marine environments, including soil sampling, in-situ testing, and laboratory analysis to support foundation and infrastructure design.",
  "Test Pitting": "Excavates shallow test pits to directly observe and sample soil stratigraphy, identify subsurface anomalies, and collect disturbed or undisturbed specimens for laboratory testing.",
  "Borehole Drilling": "Advances boreholes to required depths using rotary or percussion drilling methods, retrieving soil and rock samples for classification, testing, and geotechnical profile development.",
  "Standard Penetration Test": "Performs SPT at regular depth intervals within boreholes to measure soil resistance, providing N-values used for bearing capacity estimation, liquefaction assessment, and pile design.",
  // Non-Destructive Testing
  "Rebound Hammer Test": "Uses a Schmidt rebound hammer to estimate the surface hardness and approximate compressive strength of concrete elements quickly and without causing any damage to the structure.",
  "Dye Penetrant Test": "Applies a liquid penetrant to metal surfaces to detect surface-breaking cracks, porosity, and discontinuities in welds and structural components through capillary action.",
  "Magnetic Test": "Employs magnetic particle inspection to locate surface and near-surface flaws in ferromagnetic materials, commonly used for weld inspection and structural steel assessment.",
  "Hardness Test": "Measures the resistance of a material to permanent deformation using Brinell, Rockwell, or Vickers methods to verify material grade and heat treatment compliance.",
  "Rebar Scanning": "Uses ground-penetrating radar or cover meter technology to locate embedded reinforcement bars, determine cover depth, and assess rebar layout without breaking the concrete surface.",
};

function buildAccordionDescription(_serviceTitle: string, subService: string): string {
  return subServiceDescriptions[subService] ?? `${subService} is performed following applicable standards with documented findings and practical recommendations for your project team.`;
}

export default function Services() {
  const [openItemByService, setOpenItemByService] = useState<Record<number, number>>(() => {
    return services.reduce<Record<number, number>>((acc, _service, index) => {
      acc[index] = 0;
      return acc;
    }, {});
  });
  const [expandedServiceLists, setExpandedServiceLists] = useState<Record<number, boolean>>({});

  const firstThreeServices = useMemo(() => services, []);

  const toggleAccordionItem = (serviceIndex: number, itemIndex: number) => {
    setOpenItemByService((previous) => ({
      ...previous,
      [serviceIndex]: previous[serviceIndex] === itemIndex ? -1 : itemIndex,
    }));
  };

  const toggleSubServiceList = (serviceIndex: number) => {
    setExpandedServiceLists((previous) => ({
      ...previous,
      [serviceIndex]: !previous[serviceIndex],
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
            We provide laboratory testing, in-situ testing, geotechnical investigation, and technical reporting with the precision and responsiveness modern projects require.
          </p>
        </div>

        <div className="space-y-16 md:space-y-20">
          {firstThreeServices.map((service, serviceIndex) => {
            const isEvenRow = serviceIndex % 2 === 0;
            const isMobileListExpanded = expandedServiceLists[serviceIndex] ?? false;
            const isClippableService = service.title === "Material Testing";
            const hasHiddenItems = isClippableService
              ? false
              : service.subServices.length > MOBILE_VISIBLE_SUBSERVICES;

            return (
              <article key={service.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                <div className={`${isEvenRow ? "md:order-1" : "md:order-2"}`}>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#e56c81]">{`0${serviceIndex + 1}`}</p>
                  <h3 className="text-3xl font-semibold leading-tight text-white md:text-4xl">{service.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#c7a3ae] md:text-base">{service.summary}</p>

                  <div className="mt-6 rounded-2xl border border-[#c85d72]/25 bg-[rgba(44,14,22,0.48)] px-4 py-2 backdrop-blur-sm md:px-5">
                    {service.subServices.map((subService, itemIndex) => {
                      const isOpen = openItemByService[serviceIndex] === itemIndex;
                      const panelId = `service-panel-${serviceIndex}-${itemIndex}`;
                      const isMobileHidden =
                        itemIndex >= MOBILE_VISIBLE_SUBSERVICES &&
                        !isMobileListExpanded;
                      const isClippedAllView =
                        isClippableService && itemIndex >= MAX_VISIBLE_SUBSERVICES;

                      return (
                        <div
                          key={subService}
                          className={`border-b border-white/10 last:border-b-0 ${isClippedAllView ? "hidden" : isMobileHidden ? "hidden md:block" : ""}`}
                        >
                          <button
                            type="button"
                            className="flex min-h-[44px] w-full items-center justify-between py-3 text-left text-[0.98rem] text-white/95 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d86a80]"
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
                    {hasHiddenItems && (
                      <div className="pt-2 md:hidden">
                        <button
                          type="button"
                          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d86a80]"
                          onClick={() => toggleSubServiceList(serviceIndex)}
                          aria-expanded={isMobileListExpanded}
                        >
                          {isMobileListExpanded ? "Show less" : "Show more"}
                        </button>
                      </div>
                    )}
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
