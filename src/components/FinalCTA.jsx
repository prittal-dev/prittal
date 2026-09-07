// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowRight, CheckCircle2 } from 'lucide-react';
// import confetti from 'canvas-confetti';

// export default function FinalCTA() {
//   const [formData, setFormData] = useState({
//     name: '',
//     company: '',
//     email: '',
//     phone: '',
//     requirement: ''
//   });
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitted(true);

//     try {
//       confetti({
//         particleCount: 80,
//         spread: 70,
//         origin: { y: 0.7 },
//         colors: ['#00afc8', '#ffffff', '#003E4D']
//       });
//     } catch (err) {}

//     setTimeout(() => {
//       setSubmitted(false);
//       setFormData({
//         name: '',
//         company: '',
//         email: '',
//         phone: '',
//         requirement: ''
//       });
//     }, 5000);
//   };

//   return (
//     <section 
//       id="final-cta" 
//       className="py-8 sm:py-10 lg:py-12 bg-[#003E4D] text-white border-t border-white/10 relative z-10 font-montserrat overflow-hidden"
//     >
//       {/* Subtle Background Glow Accent */}
//       <div className="absolute top-0 right-0 w-80 h-80 bg-[#00afc8]/10 rounded-full filter blur-3xl pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
//           {/* Left Column: Get In Touch Info */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.4 }}
//             className="lg:col-span-5 space-y-4"
//           >
//             <div>
//               <span className="text-[10px] font-montserrat font-extrabold uppercase tracking-[0.25em] text-[#00afc8] block mb-1">
//                 GET IN TOUCH
//               </span>
              
//               <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-montserrat tracking-tight text-white leading-tight mb-2">
//                 Begin a <span className="text-[#00afc8]">conversation.</span>
//               </h2>

//               <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
//                 Tell us about your requirement. Our strategy team will reach out within the day with a tailored growth proposal.
//               </p>
//             </div>

//             {/* Direct Contact Details with Subtle Underline Separators */}
//             <div className="space-y-1 pt-1 border-t border-white/15">
//               <div className="flex items-center justify-between py-1 border-b border-white/10">
//                 <span className="text-[9px] font-montserrat font-bold uppercase tracking-widest text-white/60">CALL</span>
//                 <a href="tel:+919910992774" className="text-xs font-semibold text-white hover:text-[#00afc8] transition-colors">
//                   +91 99109 92774
//                 </a>
//               </div>

//               <div className="flex items-center justify-between py-1 border-b border-white/10">
//                 <span className="text-[9px] font-montserrat font-bold uppercase tracking-widest text-white/60">EMAIL</span>
//                 <a href="mailto:sales@prittal.com" className="text-xs font-semibold text-white hover:text-[#00afc8] transition-colors">
//                   sales@prittal.com
//                 </a>
//               </div>

//               <div className="flex items-center justify-between py-1 border-b border-white/10">
//                 <span className="text-[9px] font-montserrat font-bold uppercase tracking-widest text-white/60">WHATSAPP</span>
//                 <a href="https://wa.me/919910992774" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-white hover:text-[#00afc8] transition-colors">
//                   +91 99109 92774
//                 </a>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Column: Compact Luxury Underline Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.4, delay: 0.1 }}
//             className="lg:col-span-7 bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 shadow-xl"
//           >
//             {submitted ? (
//               <div className="py-10 text-center space-y-3">
//                 <div className="w-12 h-12 rounded-full bg-[#00afc8]/20 text-[#00afc8] flex items-center justify-center mx-auto border border-[#00afc8]/40 shadow-lg">
//                   <CheckCircle2 className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-xl font-bold font-montserrat text-white">Inquiry Sent Successfully!</h3>
//                 <p className="text-xs text-white/80 font-light max-w-md mx-auto">
//                   Thank you for reaching out. Our growth strategy team is reviewing your requirements and will contact you within 24 hours.
//                 </p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-3.5">
                
//                 {/* 2-Column Grid: Name & Company */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {/* Name Input */}
//                   <div className="space-y-1">
//                     <label className="block text-[9px] sm:text-[10px] font-montserrat font-extrabold uppercase tracking-[0.2em] text-white/70">
//                       NAME
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       placeholder="Your name"
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       className="w-full bg-transparent border-b border-white/20 focus:border-[#00afc8] py-1.5 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
//                     />
//                   </div>

//                   {/* Company Input */}
//                   <div className="space-y-1">
//                     <label className="block text-[9px] sm:text-[10px] font-montserrat font-extrabold uppercase tracking-[0.2em] text-white/70">
//                       COMPANY
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Organisation / Business"
//                       value={formData.company}
//                       onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//                       className="w-full bg-transparent border-b border-white/20 focus:border-[#00afc8] py-1.5 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
//                     />
//                   </div>
//                 </div>

//                 {/* 2-Column Grid: Email & Phone */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {/* Email Input */}
//                   <div className="space-y-1">
//                     <label className="block text-[9px] sm:text-[10px] font-montserrat font-extrabold uppercase tracking-[0.2em] text-white/70">
//                       EMAIL
//                     </label>
//                     <input
//                       type="email"
//                       required
//                       placeholder="you@company.com"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       className="w-full bg-transparent border-b border-white/20 focus:border-[#00afc8] py-1.5 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
//                     />
//                   </div>

//                   {/* Phone Input */}
//                   <div className="space-y-1">
//                     <label className="block text-[9px] sm:text-[10px] font-montserrat font-extrabold uppercase tracking-[0.2em] text-white/70">
//                       PHONE
//                     </label>
//                     <input
//                       type="tel"
//                       placeholder="+91 99109 92774"
//                       value={formData.phone}
//                       onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                       className="w-full bg-transparent border-b border-white/20 focus:border-[#00afc8] py-1.5 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
//                     />
//                   </div>
//                 </div>

//                 {/* Full Width Requirement Textarea */}
//                 <div className="space-y-1 pt-1">
//                   <label className="block text-[9px] sm:text-[10px] font-montserrat font-extrabold uppercase tracking-[0.2em] text-white/70">
//                     TELL US ABOUT YOUR REQUIREMENT
//                   </label>
//                   <textarea
//                     rows="2"
//                     required
//                     placeholder="Quantities, goals, timeline, customisation..."
//                     value={formData.requirement}
//                     onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
//                     className="w-full bg-transparent border-b border-white/20 focus:border-[#00afc8] py-1.5 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none transition-colors resize-none"
//                   />
//                 </div>

//                 {/* Submit Action Button */}
//                 <div className="pt-2">
//                   <button
//                     type="submit"
//                     className="px-6 py-2.5 rounded-lg bg-[#00afc8] hover:bg-white text-white hover:text-[#003E4D] font-montserrat font-bold text-xs tracking-widest uppercase transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
//                   >
//                     <span>SEND INQUIRY</span>
//                     <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </div>

//               </form>
//             )}
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// }
