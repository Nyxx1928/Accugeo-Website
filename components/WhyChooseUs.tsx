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
    <section id="why-choose-us" className="bg-gradient-to-b from-gray-900 to-black py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center md:mb-14">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">ACTMC Core Values</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-300 md:text-lg">
            ACMTC is committed to delivering accurate, competent, and methodical services built on trust and credibility
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="flex min-h-[240px] flex-col items-center rounded-lg border border-gray-700 bg-gray-800/50 p-5 text-center backdrop-blur-sm md:p-6"
            >
              <div className="mb-4 text-[#C41E3A]">{value.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-white">{value.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
