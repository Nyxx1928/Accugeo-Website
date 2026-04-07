"use client";

import React from 'react';
import { ShieldCheck, Clock, Users, TrendingUp } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <ShieldCheck className="w-12 h-12" />,
    title: 'Certified Excellence',
    description: 'Accredited by leading industry bodies with 50+ certifications',
  },
  {
    icon: <Clock className="w-12 h-12" />,
    title: 'Fast Turnaround',
    description: 'Quick testing and reporting without compromising accuracy',
  },
  {
    icon: <Users className="w-12 h-12" />,
    title: 'Expert Team',
    description: 'Experienced professionals with decades of combined expertise',
  },
  {
    icon: <TrendingUp className="w-12 h-12" />,
    title: 'Proven Track Record',
    description: '500+ successful projects across diverse construction sectors',
  },
];

export default function WhyChooseUs() {
  const { ref, visible } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section 
      id="why-choose-us" 
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Accugeo?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover what sets us apart in the construction materials testing industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 
                border border-gray-700 card-hover
                ${visible ? 'opacity-0-initial animate-fade-in-up' : 'opacity-0'}
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-[#C41E3A] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
