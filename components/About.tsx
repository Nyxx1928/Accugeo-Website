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
        <h2 className={`text-8xl font-bold text-center mb-12 text-white ${isVisible ? 'fade-up' : 'opacity-0'}`}>
          About
        </h2>
        
        <div className="max-w-4xl mx-auto text-gray-300 leading-relaxed text-center">
          <p className={`mb-4 text-xl ${isVisible ? 'fade-up fade-up-delay-1' : 'opacity-0'}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat nulla eget elit. 
            Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit. 
            Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit.
          </p>
          <p className={`text-xl ${isVisible ? 'fade-up fade-up-delay-2' : 'opacity-0'}`}>
            Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit. 
            Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit. 
            Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit.
          </p>
        </div>
      </div>
    </section>
  )
}
