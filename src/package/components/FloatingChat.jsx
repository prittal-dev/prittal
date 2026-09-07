import React from 'react';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';

/**
 * FloatingChat component now uses the exact same FloatingWhatsApp Quick Connect
 * widget as the main website for unified UX and branding.
 */
export const FloatingChat = ({ onStartProject }) => {
  return (
    <FloatingWhatsApp
      onOpenContact={onStartProject}
      whatsappMessage="Hi Prittal Team, I am interested in your packages and services."
    />
  );
};

export default FloatingChat;
