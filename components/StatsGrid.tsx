'use client';

import React from 'react';
import { Calendar, Award, Briefcase, Users } from 'lucide-react';

export interface Stat {
  id?: string;
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface StatsGridProps {
  stats?: Stat[];
  className?: string;
  play?: boolean;
  delayOffset?: number;
}

const defaultStats: Stat[] = [
  {
    id: 's1',
    icon: <Calendar className="w-6 h-6" />,
    value: '20+',
    label: 'Years Serving',
  },
  {
    id: 's2',
    icon: <Briefcase className="w-6 h-6" />,
    value: '500+',
    label: 'Projects',
  },
  {
    id: 's3',
    icon: <Award className="w-6 h-6" />,
    value: '50+',
    label: 'Awards',
  },
  {
    id: 's4',
    icon: <Users className="w-6 h-6" />,
    value: '300+',
    label: 'Clients',
  },
];

export default function StatsGrid({ stats = defaultStats, className = '', play = true, delayOffset = 0 }: StatsGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={stat.id ?? index}
          tabIndex={0}
          role="group"
          className={`stats-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-start gap-4 card-hover transition-all transform-gpu hover:-translate-y-1 hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C41E3A] ${play ? 'animate-fade-in-up opacity-0' : 'opacity-0'}`}
          style={{ animationDelay: `${delayOffset + index * 100}ms` }}
        >
          <div className="flex items-center gap-4">
            <div className="bg-[#C41E3A]/10 rounded-full p-3 text-[#C41E3A] flex items-center justify-center">
              {stat.icon}
            </div>
            <div className="flex flex-col">
              <div className="text-2xl md:text-3xl font-semibold text-white">{stat.value}</div>
              <div className="text-sm md:text-base text-gray-400">{stat.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
