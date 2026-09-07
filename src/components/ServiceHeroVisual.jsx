import React from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Share2, 
  Target, 
  Video, 
  Calendar, 
  ShoppingBag,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Play,
  Volume2,
  Star,
  Zap,
  Activity,
  Layers,
  Search,
  Eye,
  Sliders,
  Check
} from 'lucide-react';

export default function ServiceHeroVisual({ service, isDark }) {
  if (!service) return null;

  const cardBg = isDark 
    ? 'bg-gradient-to-br from-[#0d131f]/90 via-[#0a0f18]/90 to-[#060a10]/95 border-white/10' 
    : 'bg-gradient-to-br from-white/95 via-[#f8fafc]/95 to-[#f1f5f9]/95 border-black/10';

  const subBoxBg = isDark ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5';
  const headerBorder = isDark ? 'border-white/10' : 'border-black/5';
  const textColor = isDark ? 'text-white' : 'text-[#003E4D]';

  // 1. BRAND & DESIGN VISUAL
  if (service.id === 'brand-design') {
    return (
      <div className={`w-full rounded-3xl p-5 sm:p-6 lg:p-7 border ${cardBg} shadow-2xl backdrop-blur-xl relative overflow-hidden group`}>
        {/* Glow Accent */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00afc8]/20 rounded-full filter blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className={`flex items-center justify-between border-b ${headerBorder} pb-4 mb-5`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00afc8]/10 text-[#00afc8] flex items-center justify-center font-bold">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <p className={`text-xs font-semibold ${textColor}`}>Brand System Specimen</p>
              <p className="text-[10px] font-mono text-slate-400">Design System v2.4 • Active</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-[#00afc8]/15 text-[#00afc8] px-2.5 py-1 rounded-full border border-[#00afc8]/30">
            Vector IP Ready
          </span>
        </div>

        {/* Color Palette Strip */}
        <div className="space-y-2 mb-5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Cohesive Color Palette
          </span>
          <div className="grid grid-cols-4 gap-2">
            {[
              { name: 'Teal Primary', hex: '#00afc8', color: 'bg-[#00afc8]' },
              { name: 'Navy Deep', hex: '#003E4D', color: 'bg-[#003E4D]' },
              { name: 'Obsidian', hex: '#07090e', color: 'bg-[#07090e]' },
              { name: 'Soft Cream', hex: '#fff6f1', color: 'bg-[#fff6f1]' },
            ].map((c, i) => (
              <div key={i} className={`rounded-xl p-2 ${subBoxBg} border flex flex-col gap-1.5`}>
                <div className={`h-7 w-full rounded-lg ${c.color} border ${isDark ? 'border-white/10' : 'border-black/10'} shadow-sm`} />
                <span className={`text-[9px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'} font-semibold`}>{c.hex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Typography & Logo Preview Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`p-3.5 rounded-2xl ${subBoxBg} border space-y-1`}>
            <span className="text-[9px] font-mono font-bold uppercase text-[#00afc8]">Typography Hierarchy</span>
            <p className={`text-sm font-bold ${textColor} leading-tight`}>Aa Outfit / Montserrat</p>
            <p className="text-[10px] text-slate-400">Headlines: Bold • Body: Regular</p>
          </div>

          <div className={`p-3.5 rounded-2xl ${subBoxBg} border space-y-1`}>
            <span className="text-[9px] font-mono font-bold uppercase text-[#00afc8]">System Output</span>
            <p className={`text-sm font-bold ${textColor} leading-tight`}>Master Kit</p>
            <p className="text-[10px] text-slate-400">SVG, Figma, Guidelines, Collateral</p>
          </div>
        </div>

        {/* Bottom Status Row */}
        <div className={`pt-3 border-t ${headerBorder} flex items-center justify-between text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00afc8]" /> Multi-touchpoint consistency
          </span>
          <span className="font-mono text-[10px] text-[#00afc8] font-bold">100% Custom</span>
        </div>
      </div>
    );
  }

  // 2. DIGITAL MARKETING VISUAL
  if (service.id === 'digital-marketing') {
    return (
      <div className={`w-full rounded-3xl p-5 sm:p-6 lg:p-7 border ${cardBg} shadow-2xl backdrop-blur-xl relative overflow-hidden group`}>
        {/* Glow Accent */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00afc8]/20 rounded-full filter blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className={`flex items-center justify-between border-b ${headerBorder} pb-4 mb-5`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00afc8]/10 text-[#00afc8] flex items-center justify-center font-bold">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <p className={`text-xs font-semibold ${textColor}`}>Organic Growth Engine</p>
              <p className="text-[10px] font-mono text-slate-400">SEO & Social Performance • Live</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-[#00afc8]/15 text-[#00afc8] px-2.5 py-1 rounded-full border border-[#00afc8]/30">
            +340% Reach
          </span>
        </div>

        {/* Growth Curve Simulation */}
        <div className={`p-4 rounded-2xl ${subBoxBg} border mb-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Search & Social Visibility Index</span>
            <span className="text-xs font-bold font-mono text-[#00afc8]">+4.8x Traffic</span>
          </div>

          {/* SVG Trend Graph */}
          <div className="h-20 w-full relative flex items-end">
            <svg viewBox="0 0 300 70" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00afc8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00afc8" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,55 Q50,50 90,40 T180,25 T250,15 T300,5 L300,70 L0,70 Z"
                fill="url(#curveGradient)"
              />
              <path
                d="M0,55 Q50,50 90,40 T180,25 T250,15 T300,5"
                fill="none"
                stroke="#00afc8"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Active Keywords & Cadence */}
        <div className="space-y-2 mb-4">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">Ranking Dominance</span>
          <div className="flex flex-wrap gap-1.5">
            {['#1 Brand Strategy', '#2 Growth Marketing', 'AEO AI Answer Curation', 'Weekly Social Cadence'].map((kw, i) => (
              <span key={i} className={`text-[10px] font-medium font-mono ${isDark ? 'text-slate-200' : 'text-[#003E4D]'} bg-[#00afc8]/10 border border-[#00afc8]/20 px-2.5 py-1 rounded-lg`}>
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Status Row */}
        <div className={`pt-3 border-t ${headerBorder} flex items-center justify-between text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00afc8]" /> Zero-click & AEO optimized
          </span>
          <span className="font-mono text-[10px] text-[#00afc8] font-bold">Organic Compound</span>
        </div>
      </div>
    );
  }

  // 3. PERFORMANCE MARKETING VISUAL
  if (service.id === 'performance-marketing') {
    return (
      <div className={`w-full rounded-3xl p-5 sm:p-6 lg:p-7 border ${cardBg} shadow-2xl backdrop-blur-xl relative overflow-hidden group`}>
        {/* Glow Accent */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00afc8]/20 rounded-full filter blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className={`flex items-center justify-between border-b ${headerBorder} pb-4 mb-5`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00afc8]/10 text-[#00afc8] flex items-center justify-center font-bold">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <p className={`text-xs font-semibold ${textColor}`}>Paid Media Command Hub</p>
              <p className="text-[10px] font-mono text-slate-400">Meta & Google PMax • Active</p>
            </div>
          </div>
          <span className={`text-[10px] font-mono font-bold ${isDark ? 'text-emerald-400 bg-emerald-500/15' : 'text-emerald-600 bg-emerald-500/15'} px-2.5 py-1 rounded-full border border-emerald-500/30`}>
            3.85x ROAS
          </span>
        </div>

        {/* Key Funnel Stats */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <div className={`p-3 rounded-2xl ${subBoxBg} border`}>
            <span className="text-[9px] font-mono text-slate-400 uppercase block">Ad Spend</span>
            <p className={`text-sm font-bold ${textColor} mt-0.5`}>Optimized</p>
            <span className="text-[9px] text-emerald-500 font-semibold font-mono">High Efficiency</span>
          </div>

          <div className={`p-3 rounded-2xl ${subBoxBg} border`}>
            <span className="text-[9px] font-mono text-slate-400 uppercase block">Conversion</span>
            <p className="text-sm font-bold text-[#00afc8] mt-0.5">+4.8% Rate</p>
            <span className="text-[9px] text-slate-400 font-mono">CRO Tuned</span>
          </div>

          <div className={`p-3 rounded-2xl ${subBoxBg} border`}>
            <span className="text-[9px] font-mono text-slate-400 uppercase block">Attribution</span>
            <p className={`text-sm font-bold ${textColor} mt-0.5`}>100% CAPI</p>
            <span className="text-[9px] text-[#00afc8] font-semibold font-mono">Server-Side</span>
          </div>
        </div>

        {/* Funnel Stage Progress Bars */}
        <div className={`p-4 rounded-2xl ${subBoxBg} border mb-4 space-y-2.5`}>
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Funnel Architecture</span>
            <span className="text-[#00afc8] font-bold">Full-Funnel Scale</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-medium">
              <span className={isDark ? 'text-slate-300' : 'text-slate-500'}>Top of Funnel (Awareness)</span>
              <span className="font-mono text-[#00afc8]">99.2%</span>
            </div>
            <div className={`w-full h-1.5 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/10'} overflow-hidden`}>
              <div className="h-full bg-[#00afc8] rounded-full w-full" />
            </div>

            <div className="flex items-center justify-between text-[10px] font-medium pt-1">
              <span className={isDark ? 'text-slate-300' : 'text-slate-500'}>Bottom of Funnel (Retargeting & Sales)</span>
              <span className="font-mono text-emerald-500">High Conv.</span>
            </div>
            <div className={`w-full h-1.5 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/10'} overflow-hidden`}>
              <div className="h-full bg-gradient-to-r from-[#00afc8] to-emerald-400 rounded-full w-[82%]" />
            </div>
          </div>
        </div>

        {/* Bottom Status Row */}
        <div className={`pt-3 border-t ${headerBorder} flex items-center justify-between text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00afc8]" /> Weekly media shift & testing
          </span>
          <span className="font-mono text-[10px] text-[#00afc8] font-bold">Every Rupee Tracked</span>
        </div>
      </div>
    );
  }

  // 4. VIDEO PRODUCTION VISUAL
  if (service.id === 'video-production') {
    return (
      <div className={`w-full rounded-3xl p-5 sm:p-6 lg:p-7 border ${cardBg} shadow-2xl backdrop-blur-xl relative overflow-hidden group`}>
        {/* Glow Accent */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00afc8]/20 rounded-full filter blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className={`flex items-center justify-between border-b ${headerBorder} pb-4 mb-5`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00afc8]/10 text-[#00afc8] flex items-center justify-center font-bold">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <p className={`text-xs font-semibold ${textColor}`}>Cinematic Video Studio</p>
              <p className="text-[10px] font-mono text-slate-400">4K Master & UGC Suite • Export Ready</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-[#00afc8]/15 text-[#00afc8] px-2.5 py-1 rounded-full border border-[#00afc8]/30">
            4K UHD 60FPS
          </span>
        </div>

        {/* Video Player Preview Mockup */}
        <div className="h-36 w-full rounded-2xl bg-gradient-to-tr from-[#003E4D] to-[#041a22] border border-[#00afc8]/20 relative overflow-hidden flex flex-col justify-between p-3.5 mb-4 shadow-inner">
          <div className="flex items-center justify-between text-[10px] font-mono text-white/80 z-10">
            <span className="bg-red-500/80 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" /> REC
            </span>
            <span className="bg-black/50 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 font-bold">
              00:18:42 / 00:30:00
            </span>
          </div>

          <div className="flex items-center justify-center z-10">
            <div className="w-11 h-11 rounded-full bg-[#00afc8] text-white flex items-center justify-center shadow-lg shadow-[#00afc8]/40 hover:scale-110 transition-transform cursor-pointer">
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 z-10">
            <span>Color: Rec.709 Master</span>
            <span>Ratio: 9:16 & 16:9</span>
          </div>

          {/* Decorative Grid Lines */}
          <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />
        </div>

        {/* Audio Waveform & Output Badges */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className={`p-3 rounded-2xl ${subBoxBg} border`}>
            <span className="text-[9px] font-mono text-slate-400 uppercase block mb-1">Hook Retention</span>
            <p className="text-sm font-bold text-[#00afc8]">65%+ First 3s</p>
          </div>

          <div className={`p-3 rounded-2xl ${subBoxBg} border`}>
            <span className="text-[9px] font-mono text-slate-400 uppercase block mb-1">Deliverables</span>
            <p className={`text-sm font-bold ${textColor}`}>Brand & UGC</p>
          </div>
        </div>

        {/* Bottom Status Row */}
        <div className={`pt-3 border-t ${headerBorder} flex items-center justify-between text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00afc8]" /> Shot for retention & conversion
          </span>
          <span className="font-mono text-[10px] text-[#00afc8] font-bold">High Production</span>
        </div>
      </div>
    );
  }

  // 5. EVENTS & ACTIVATIONS VISUAL
  if (service.id === 'events-activations') {
    return (
      <div className={`w-full rounded-3xl p-5 sm:p-6 lg:p-7 border ${cardBg} shadow-2xl backdrop-blur-xl relative overflow-hidden group`}>
        {/* Glow Accent */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00afc8]/20 rounded-full filter blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className={`flex items-center justify-between border-b ${headerBorder} pb-4 mb-5`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00afc8]/10 text-[#00afc8] flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className={`text-xs font-semibold ${textColor}`}>Experiential Stage & PR Hub</p>
              <p className="text-[10px] font-mono text-slate-400">On-Ground Live Production • Turnkey</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-[#00afc8]/15 text-[#00afc8] px-2.5 py-1 rounded-full border border-[#00afc8]/30">
            Pan-India Scale
          </span>
        </div>

        {/* Experiential Protocol Checklist */}
        <div className={`p-4 rounded-2xl ${subBoxBg} border mb-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Live Activation Protocol</span>
            <span className="text-[10px] font-mono font-bold text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Confirmed
            </span>
          </div>

          <div className="space-y-2">
            {[
              { task: 'VIP Guest & Creator PR Curation', detail: '500+ Top Creators & Press', status: 'Ready' },
              { task: 'Spatial Booth Architecture & AV Lighting', detail: 'Turnkey Stage Fabrication', status: 'Ready' },
              { task: 'Real-Time Content & Aftermovie Reels', detail: 'Instant PR Story Drops', status: 'Ready' },
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${isDark ? 'bg-white/5 border-white/5' : 'bg-white/60 border-black/5'} border`}>
                <div>
                  <p className={`text-xs font-bold ${textColor}`}>{item.task}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{item.detail}</p>
                </div>
                <span className="text-[9px] font-mono font-bold text-[#00afc8] bg-[#00afc8]/10 px-2 py-0.5 rounded">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reach Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className={`p-3 rounded-2xl ${subBoxBg} border`}>
            <span className="text-[9px] font-mono text-slate-400 uppercase block mb-1">On-Ground Footprint</span>
            <p className={`text-sm font-bold ${textColor}`}>Pop-ups to Expos</p>
          </div>

          <div className={`p-3 rounded-2xl ${subBoxBg} border`}>
            <span className="text-[9px] font-mono text-slate-400 uppercase block mb-1">Creator Reach</span>
            <p className="text-sm font-bold text-[#00afc8]">Multi-Million Buzz</p>
          </div>
        </div>

        {/* Bottom Status Row */}
        <div className={`pt-3 border-t ${headerBorder} flex items-center justify-between text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00afc8]" /> Seamless end-to-end management
          </span>
          <span className="font-mono text-[10px] text-[#00afc8] font-bold">Unforgettable Impact</span>
        </div>
      </div>
    );
  }

  // 6. MARKETPLACE GROWTH VISUAL
  if (service.id === 'marketplace-growth') {
    return (
      <div className={`w-full rounded-3xl p-5 sm:p-6 lg:p-7 border ${cardBg} shadow-2xl backdrop-blur-xl relative overflow-hidden group`}>
        {/* Glow Accent */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00afc8]/20 rounded-full filter blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className={`flex items-center justify-between border-b ${headerBorder} pb-4 mb-5`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00afc8]/10 text-[#00afc8] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <p className={`text-xs font-semibold ${textColor}`}>Omnichannel E-Commerce Hub</p>
              <p className="text-[10px] font-mono text-slate-400">Amazon, Flipkart & Quick-Commerce</p>
            </div>
          </div>
          <span className={`text-[10px] font-mono font-bold ${isDark ? 'text-emerald-400 bg-emerald-500/15' : 'text-emerald-600 bg-emerald-500/15'} px-2.5 py-1 rounded-full border border-emerald-500/30`}>
            +45% GMV Uplift
          </span>
        </div>

        {/* Rating & Buy Box Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`p-3.5 rounded-2xl ${subBoxBg} border space-y-1`}>
            <span className="text-[9px] font-mono font-bold uppercase text-slate-400">Customer Trust</span>
            <div className={`flex items-center gap-1 text-sm font-bold ${textColor}`}>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">12,400+ Verified Reviews</p>
          </div>

          <div className={`p-3.5 rounded-2xl ${subBoxBg} border space-y-1`}>
            <span className="text-[9px] font-mono font-bold uppercase text-slate-400">Buy Box Dominance</span>
            <p className="text-sm font-bold text-emerald-500">98.4% Win Rate</p>
            <p className="text-[10px] text-slate-400 font-mono">Dynamic Price & Stock Protection</p>
          </div>
        </div>

        {/* Channels Pill Strip */}
        <div className={`p-4 rounded-2xl ${subBoxBg} border mb-4 space-y-2.5`}>
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Marketplace Channels</span>
            <span className="text-[#00afc8] font-bold">Integrated</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { platform: 'Amazon India', status: 'A+ Content & PPC' },
              { platform: 'Flipkart', status: 'Brand Store Setup' },
              { platform: 'Blinkit', status: '10-Min Dark Store' },
              { platform: 'Zepto / Instamart', status: 'Top Shelf Banner' },
            ].map((p, i) => (
              <div key={i} className={`p-2 rounded-xl ${isDark ? 'bg-white/5 border-white/5' : 'bg-white/60 border-black/5'} border`}>
                <p className={`text-[11px] font-bold ${textColor}`}>{p.platform}</p>
                <p className="text-[9px] text-[#00afc8] font-mono font-semibold">{p.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Status Row */}
        <div className={`pt-3 border-t ${headerBorder} flex items-center justify-between text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00afc8]" /> High-margin inventory optimization
          </span>
          <span className="font-mono text-[10px] text-[#00afc8] font-bold">Catalog Scaled</span>
        </div>
      </div>
    );
  }

  return null;
}
