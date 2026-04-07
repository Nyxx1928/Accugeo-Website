"use client";

import React from "react";
import { CheckCircle, Award, Settings, Shield, Star } from "lucide-react";

const values = [
  {
    icon: <CheckCircle className="w-10 h-10" />,
    title: "Accuracy",
    description: "We ensure that all data, reports, and technical outputs are precise, reliable, and based on proper standards.",
  },
  {
    icon: <Award className="w-10 h-10" />,
    title: "Competence",
    description: "We maintain the necessary knowledge, skills, and expertise, to deliver high-quality professional services.",
  },
  {
    icon: <Settings className="w-10 h-10" />,
    title: "Methodical",
    description: "Approach We follow systematic, organized, and well-planned procedures to achieve consistent and dependable results.",
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Trustworthiness",
    description: "We build strong relationships with clients through honesty, integrity, and dependable service.",
  },
  {
    icon: <Star className="w-10 h-10" />,
    title: "Credibility",
    description: "We uphold professionalism and produce work that clients and partners can confidently rely on.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">ACTMC Core Values</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            ACMTC is committed to delivering accurate, competent, and methodical services built on trust and credibility
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 flex flex-col items-center text-center"
            >
              <div className="text-[#C41E3A] mb-4">{value.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
