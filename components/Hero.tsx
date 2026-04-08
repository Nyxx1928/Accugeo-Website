"use client";

import { Button } from "./ui/button";
import TrustIndicators from "./TrustIndicators";

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
    <section id="home" className="relative h-screen">
      <div
        className="absolute -top-20 left-0 right-0 bottom-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/Hero-bg.png)",
        }}
      />
      <div className="absolute -top-20 left-0 right-0 bottom-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="relative container mx-auto px-6 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <h1 className="hero-heading text-4xl md:text-5xl font-bold mb-6 opacity-0-initial animate-fade-in-up">
            Precision in Every Test, Trust in Every Result
          </h1>
          <p className="text-lg leading-relaxed text-white mb-8 opacity-0-initial animate-fade-in-up animation-delay-200">
            Accugeo Construction Materials Testing Center is committed to delivering high-quality, accurate, and reliable material testing services through strict adherence to ASTM and AASHTO standards.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 opacity-0-initial animate-fade-in-up animation-delay-400">
            <Button
              onClick={handleContactClick}
              size="lg"
              className="bg-[#C41E3A] hover:bg-[#A01830] text-white px-8 py-6 text-base font-semibold btn-glow"
              aria-label="Navigate to contact section"
            >
              Get in Touch
            </Button>
            <Button
              onClick={handleServicesClick}
              size="lg"
              className="bg-white text-[#0f1720] px-8 py-6 text-base font-semibold"
              aria-label="Navigate to services section"
            >
              View Services
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="opacity-0-initial animate-fade-in-up animation-delay-600">
            <TrustIndicators />
          </div>
        </div>
      </div>
    </section>
  );
}
