'use client';

import React from 'react';
import { Calendar, Award, Briefcase } from 'lucide-react';

export interface Stat {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface StatsGridProps {
  stats?: Stat[];
  className?: string;
  visible?: boolean;
}

const defaultStats: Stat[] = [
  {
    icon: <Calendar className="w-8 h-8" />,
    value: '15+',
    label: 'Years in Business',
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    value: '500+',
    label: 'Projects Completed',
  },
  {
    icon: <Award className="w-8 h-8" />,
    value: '50+',
    label: 'Certifications',
  },
];

export default function StatsGrid({ stats = defaultStats, className = '', visible = true }: StatsGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`flex flex-col items-center text-center transition-opacity duration-600 ${
            visible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {stat.icon && (
            <div className="mb-4 text-[#C41E3A]">
              {stat.icon}
            </div>
          )}
          <div className="text-4xl md:text-5xl font-bold text-white mb-2">
            {stat.value}
          </div>
          <div className="text-base md:text-lg text-gray-300">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
