'use client'

import { useEffect, useRef, useState } from 'react'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="bg-black min-h-screen py-20">
      <div className="container mx-auto px-6 w-full">
        <h2 className={`text-5xl md:text-6xl font-bold text-left mb-12 text-white ${isVisible ? 'fade-up' : 'opacity-0'}`}>
          About
        </h2>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img 
              src="/about-image.png" 
              alt="About Accugeo" 
              className={`w-full max-w-xs mx-auto md:mx-0 rounded-lg shadow-lg ${isVisible ? 'fade-up fade-up-delay-1' : 'opacity-0'}`}
            />
          </div>
          <div className="flex-1 text-gray-300 leading-relaxed text-left">
            <p className="mb-4 text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat nulla eget elit. 
              Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit. 
              Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit.
            </p>
            <p className="text-xl">
              Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit. 
              Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit. 
              Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
