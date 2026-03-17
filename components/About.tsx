"use client";

import Squares from "./Squares";

export default function About() {
  return (
    <section id="about" className="bg-black min-h-screen py-20 relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <Squares speed={0.5} squareSize={40} direction="diagonal" borderColor="#271E37" hoverFillColor="#222" />
      </div>
      <style>{`#about canvas { z-index: 0 !important; pointer-events: none !important; }`}</style>
      <div className="container mx-auto px-6 w-full relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-left mb-12 text-white">About</h2>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img src="/about-image.png" alt="About Accugeo" width={420} height={280} className="w-full max-w-xs mx-auto md:mx-0 rounded-lg shadow-lg" />
          </div>
          <div className="flex-1 text-white leading-relaxed text-left">
            <p className="mb-4 text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat nulla eget elit.
              Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit.
            </p>
            <p className="text-xl">
              Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit.
              Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
