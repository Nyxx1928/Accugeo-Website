'use client'

import { useState, useEffect, useRef } from 'react'

const services = [
  {
    title: 'Service Example 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit.',
    image: '/service1.png'
  },
  {
    title: 'Service Example 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit.',
    image: '/service2.png'
  },
  {
    title: 'Service Example 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit.',
    image: '/service3.png'
  },
]

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0)
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)
  }

  return (
    <section ref={sectionRef} id="services" className="bg-black text-white min-h-screen py-20">
      <div className="container mx-auto px-6 w-full">
        <h2 className={`text-5xl md:text-6xl font-bold text-center mb-12 ${isVisible ? 'fade-up' : 'opacity-0'}`}>Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <div key={service.title} className={`bg-gray-900 rounded-lg shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow ${isVisible ? 'fade-up fade-up-delay-1' : 'opacity-0'}`}>
              <img src={service.image} alt={service.title} className="w-20 h-20 mb-4 object-contain" />
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-300 text-lg">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center container mx-auto px-6 py-12 relative">
        <h2 className={`text-8xl font-bold text-center mb-16 ${isVisible ? 'fade-up' : 'opacity-0'}`}>
          What We Offer
        </h2>
        
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-10 hover:opacity-80 transition-opacity"
        >
          <img src="/arrowleft.png" alt="Previous" className="w-20 h-20" />
        </button>
        
        <div className="max-w-7xl mx-auto flex-1 flex items-center px-32">
          <div className="grid md:grid-cols-2 gap-16 items-center w-full">
            <div>
              <h3 className={`text-5xl font-bold mb-8 ${isVisible ? 'fade-up fade-up-delay-1' : 'opacity-0'}`}>
                {services[currentIndex].title}
              </h3>
              <p className={`text-gray-300 leading-relaxed text-2xl ${isVisible ? 'fade-up fade-up-delay-2' : 'opacity-0'}`}>
                {services[currentIndex].description}
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className={`aspect-square bg-gray-800 rounded-lg overflow-hidden ${
                    idx === currentIndex ? 'ring-4 ring-brand-red' : ''
                  } ${isVisible ? 'fade-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hover:opacity-80 transition-opacity"
        >
          <img src="/arrowright.png" alt="Next" className="w-20 h-20" />
        </button>
      </div>
      
      <div 
        className="h-32"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #C41E3A 0, #C41E3A 40px, #000 40px, #000 80px)'
        }}
      />
    </section>
  )
}
