"use client";

import { Button } from "./ui/button";

export default function Hero() {
  

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleServicesClick = () => {
    const servicesSection = document.getElementById("services");
    servicesSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[100svh]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/Hero-bg.png)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-transparent" />
      <div className="relative container mx-auto flex min-h-[100svh] items-center px-4 pb-8 pt-24 sm:px-6 md:pb-10 md:pt-28">
        <div className="max-w-3xl text-white">
          <h1 className="hero-heading mb-5 text-4xl font-bold opacity-0-initial animate-fade-in-up md:text-5xl">
            Precision in Every Test, Trust in Every Result
          </h1>
          <p className="mb-6 max-w-[54ch] text-base leading-relaxed text-white opacity-0-initial animate-fade-in-up sm:text-lg md:max-w-[56ch]">
            Accugeo Construction Materials Testing Center is committed to delivering high-quality, accurate, and reliable material testing services through strict adherence to ASTM and AASHTO standards.
          </p>
          
          {/* CTA Buttons */}
          <div className="mb-5 flex flex-col gap-3 opacity-0-initial animate-fade-in-up animation-delay-400 sm:mb-6 sm:flex-row sm:gap-4">
            <Button
              onClick={handleContactClick}
              size="lg"
              className="bg-[#C41E3A] hover:bg-[#A01830] text-white px-8 py-5 text-base font-semibold btn-glow"
              aria-label="Navigate to contact section"
            >
              Get in Touch
            </Button>
            <Button
              onClick={handleServicesClick}
              size="lg"
              className="bg-white text-[#0f1720] px-8 py-5 text-base font-semibold"
              aria-label="Navigate to services section"
            >
              View Services
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
