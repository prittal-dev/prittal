import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const reviews = [
    {
      quote: "Prittal built us a scroll intro animation that literally blew away our Series B investors. Our site conversion rate jumped by 340% within two weeks of launch.",
      author: "Marcus Vance",
      title: "CEO & Co-Founder, Aether Flow",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      quote: "The multi-angle deconstructed logo reveal transition is the smoothest scroll mechanism I have ever seen. Their attention to detail is world-class.",
      author: "Elena Rostova",
      title: "VP of Product, Lumina Real Estate",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      quote: "Working with Prittal felt like partnering with an elite silicon valley team. Fast velocity, pixel-perfect code execution, and rock-solid reliability.",
      author: "David Chen",
      title: "CTO, Nexus Cloud Infrastructure",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-[#f8f8fa] text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase text-[#00A9B9] font-bold tracking-widest block mb-2">
            CLIENT REVIEWS
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 font-syne tracking-tight mb-4">
            TRUSTED BY <span className="text-[#00A9B9]">VISIONARIES</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light">
            Here is what technical leaders say about working with Prittal Agency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl flex flex-col justify-between"
            >
              <div className="mb-6">
                <div className="flex items-center gap-1 mb-4 text-[#00A9B9]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#00A9B9]" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-cyan-200 mb-3" />

                <p className="text-slate-700 text-sm font-light leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-12 h-12 rounded-full object-cover border border-[#00A9B9]/30"
                />
                <div>
                  <h4 className="font-syne font-bold text-sm text-slate-900">{rev.author}</h4>
                  <span className="text-xs font-mono text-slate-500">{rev.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
