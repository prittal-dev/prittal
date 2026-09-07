import React from 'react';
import { Globe, Search, Share2, Target, Camera, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const CategoryNav = ({
  categories,
  activeCategoryId,
  onSelectCategory,
}) => {
  const { isDark } = useTheme();

  const getIcon = (id) => {
    switch (id) {
      case 'websites':
        return <Globe className="w-4 h-4" />;
      case 'seo':
        return <Search className="w-4 h-4" />;
      case 'social-media':
        return <Share2 className="w-4 h-4" />;
      case 'paid-campaigns':
        return <Target className="w-4 h-4" />;
      case 'product-shoots':
        return <Camera className="w-4 h-4" />;
      case 'google-my-business':
        return <MapPin className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className={`sticky top-[53px] sm:top-[61px] z-40 py-5 sm:py-6 mb-6 sm:mb-8 backdrop-blur-md transition-all ${
      isDark ? 'bg-black/95 border-slate-800' : 'bg-white/95 border-slate-200'
    } border-b`}>
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16">
        {/* 2 lines of 3 on mobile responsive, centered flex container on desktop */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:flex md:items-center md:justify-center md:space-x-3 w-full">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`inline-flex items-center justify-center space-x-1 sm:space-x-2 px-1.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[9px] sm:text-xs md:text-sm font-bold tracking-wide transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#11b1d0] text-white border-[#11b1d0] shadow-md shadow-[#11b1d0]/20 scale-[1.02]'
                    : isDark
                      ? 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-[#11b1d0]'}`}>
                  {getIcon(cat.id)}
                </span>
                <span className="truncate">{cat.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
