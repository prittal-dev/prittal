import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Terminal, Rocket, Flame } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      num: '01',
      icon: Compass,
      title: 'Architectural Discovery',
      desc: 'We map out your strategic objectives, user journeys, brand assets, and technical requirements before writing a single line of code.'
    },
    {
      num: '02',
      icon: Terminal,
      title: 'Interactive Prototyping',
      desc: 'We construct high-fidelity interactive wireframes and motion prototypes to visualize the logo physics and scroll transitions.'
    },
    {
      num: '03',
      icon: Flame,
      title: 'Precision Engineering',
      desc: 'Using React, Vite, Framer Motion, and Tailwind CSS, we craft performant, pixel-perfect code with zero bloat.'
    },
    {
      num: '04',
      icon: Rocket,
      title: 'Global Launch & Scale',
      desc: 'Rigorous cross-browser testing, SEO optimization, performance audits, and seamless edge server deployment.'
    }
  ];

  return (
    <section id="process" className="py-24 bg-[#f3f3f5] text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono uppercase text-[#00A9B9] font-bold tracking-widest block mb-2">
            THE WORKFLOW
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 font-syne tracking-tight mb-4">
            THE <span className="text-[#00A9B9]">BLUEPRINT</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light">
            A disciplined 4-phase methodology engineered for rapid delivery without compromising visual craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-syne font-black text-4xl text-slate-300">
                      {step.num}
                    </span>
                    <div className="p-3 rounded-xl bg-[#00A9B9] text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-syne text-xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 text-xs font-light leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-[11px] font-mono text-[#00A9B9] font-bold">
                  Phase {step.num} Complete
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
