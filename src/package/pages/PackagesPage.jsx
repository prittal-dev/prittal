import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { CategoryNav } from '../components/CategoryNav';
import { CategorySection } from '../components/CategorySection';
import { Footer } from '../components/Footer';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';
import { ProjectModal } from '../components/ProjectModal';
import { packagesData } from '../data/packagesData';
import { useTheme } from '../context/ThemeContext';

export const PackagesPage = ({ onNavigateHome, onNavigate }) => {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState(packagesData[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleSelectCategory = (id) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -150;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleOpenModal = (categoryTitle, tierName, packagePayload = null) => {
    if (categoryTitle && tierName) {
      setSelectedPackage({ categoryTitle, tierName, ...(packagePayload || {}) });
    } else {
      setSelectedPackage(null);
    }
    setIsModalOpen(true);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-slate-900'} transition-colors duration-300 relative`}>
      {/* Recreated Prittal Navbar */}
      <Navbar onStartProject={() => handleOpenModal()} onNavigateHome={onNavigateHome} />

      {/* Package Page Hero */}
      <Hero />

      {/* Category Navigation Bar */}
      <CategoryNav
        categories={packagesData}
        activeCategoryId={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Package Sections (Data Source from Excel) */}
      <main>
        {packagesData.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            onSelectTier={(catTitle, tierName, payload) => handleOpenModal(catTitle, tierName, payload)}
            onOpenConsultation={() => handleOpenModal(category.title, 'CONSULTATION')}
          />
        ))}
      </main>

      {/* Footer */}
      <Footer onStartProject={() => handleOpenModal()} onNavigateHome={onNavigateHome} onNavigate={onNavigate} />

      {/* Floating Quick Connect Widget (Same as Main Website) */}
      <FloatingWhatsApp
        onOpenContact={() => handleOpenModal()}
        whatsappMessage="Hi Prittal Team, I am interested in your packages and services."
      />

      {/* Project & Inquiry Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialPackage={selectedPackage}
      />
    </div>
  );
};
