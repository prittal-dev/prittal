import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp = ({ onOpenContact, whatsappMessage = "Hi Prittal Team, I am interested in your packages and services." }) => {
  const handleWhatsApp = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleWhatsApp}
        className="flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-sm"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="hidden sm:inline">Quick Connect</span>
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
