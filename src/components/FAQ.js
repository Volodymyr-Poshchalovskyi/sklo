"use client";
import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "WHAT DO WE NEED TO START A PROJECT?",
      answer: "We begin with your 3D-model or drawings and a brief describing the mood, materials, and goals of your project. Using our structured onboarding system, our team refines your model and translates all inputs into high-end visuals.",
    },
    {
      question: "WHAT'S THE PROJECT WORKFLOW?",
      answer: "Our workflow consists of several stages: initial brief, gray material renders for geometry approval, preliminary renders with materials and lighting, and final high-resolution delivery.",
    },
    {
      question: "HOW LONG DOES A PROJECT TAKE?",
      answer: "The timeline depends on the complexity and scale of the project. A standard set of interior or exterior visuals typically takes between 1 to 3 weeks.",
    },
    {
      question: "HOW IS PRICING CALCULATED?",
      answer: "Pricing is calculated based on the number of views, the complexity of the architecture or interior, required level of detail, and turnaround time.",
    },
    {
      question: "ANY PARTNERSHIP PROGRAMS?",
      answer: "Yes, we offer special rates and conditions for long-term partnerships with architectural firms, design studios, and real estate developers.",
    },
  ];

  return (
    <section className="relative w-full py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-white/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0f] via-[#0d0d0f]/80 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        <h2 className="text-2xl font-bold tracking-widest uppercase shrink-0 lg:w-1/3">
          FAQS
        </h2>
        
        <div className="flex flex-col w-full lg:w-2/3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="border-b border-white/20 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex justify-between items-center py-6 text-left focus:outline-none"
                >
                  <span className="text-sm font-semibold tracking-widest uppercase">
                    {faq.question}
                  </span>
                  <span className="text-lg font-light ml-4">
                    {isOpen ? "-" : "+"}
                  </span>
                </button>
                <div 
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-40 opacity-100 pb-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-xs text-white/70 leading-relaxed max-w-2xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}