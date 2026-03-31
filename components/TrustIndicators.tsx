import React from 'react';
import { Calendar, Award, Users } from 'lucide-react';

export interface TrustIndicator {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface TrustIndicatorsProps {
  indicators?: TrustIndicator[];
  className?: string;
}

const defaultIndicators: TrustIndicator[] = [
  {
    icon: <Calendar className="w-8 h-8" />,
    value: '15+',
    label: 'Years in Business',
  },
  {
    icon: <Award className="w-8 h-8" />,
    value: '50+',
    label: 'Certifications',
  },
  {
    icon: <Users className="w-8 h-8" />,
    value: '500+',
    label: 'Projects Completed',
  },
];

export default function TrustIndicators({ indicators = defaultIndicators, className = '' }: TrustIndicatorsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-8 sm:gap-12 ${className}`}>
      {indicators.map((indicator, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div className="mb-3 text-[#C41E3A]">
            {indicator.icon}
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
            {indicator.value}
          </div>
          <div className="text-sm sm:text-base text-gray-300">
            {indicator.label}
          </div>
        </div>
      ))}
    </div>
  );
}
