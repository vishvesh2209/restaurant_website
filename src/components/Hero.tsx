import React from 'react';
import { motion } from 'motion/react';
import { UtensilsCrossed, Calendar, Flame, ArrowRight, Sparkles } from 'lucide-react';
import restaurantHeroImage from '../assets/images/luxury_restaurant_interior_1787344582283.jpg';

interface HeroProps {
  onViewMenu?: () => void;
  onReserveTable?: () => void;
}

export default function Hero({ onViewMenu, onReserveTable }: HeroProps) {
  return (
    <section 
      id="home-hero" 
      className="relative w-full min-h-[85vh] sm:min-h-[90vh] bg-[#0A0A0A] flex items-center justify-center overflow-hidden border-b border-white/[0.08] pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28"
    >
      {/* Cinematic Ambient Red Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#B22222]/20 rounded-full blur-[160px] pointer-events-none z-10" />

      {/* Full-Screen Luxury Restaurant Image Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
        <motion.img
          src={restaurantHeroImage}
          alt="Texas Taste Luxury Restaurant Dining Room and Interior"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 6, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45] contrast-[1.1] scale-105"
        />
      </div>

      {/* Dark Studio Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/70 z-10 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        
        {/* Quality Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#181818]/90 backdrop-blur-md border border-[#B22222]/40 text-[#B22222] shadow-xl mb-6 sm:mb-8 max-w-[92vw] sm:max-w-none text-center"
        >
          <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B22222] shrink-0" />
          <span className="text-[10px] sm:text-xs md:text-sm font-sans font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-white whitespace-normal sm:whitespace-nowrap leading-tight">
            100% Pure Organic Vegetarian Fine Dining
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 max-w-4xl"
        >
          Elevated Flavors.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F0ECE1] to-[#B22222]">
            Artisan Vegetarian Craft.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans text-[#E0E0E0] text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-10 text-shadow-sm"
        >
          Experience handcrafted wood-fired sizzlers, organic artisanal pastas, and signature mocktails created with farm-fresh produce in Austin, Texas.
        </motion.p>

        {/* PROMINENT CALL TO ACTION (CTA) BUTTONS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-xl"
        >
          {/* Primary CTA: Book Table */}
          <button
            id="hero-book-table-cta"
            onClick={onReserveTable}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-8 py-4 sm:py-4.5 rounded-[18px] bg-[#B22222] hover:bg-[#D32F2F] text-white font-sans font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-2xl shadow-[#B22222]/40 hover:shadow-[#B22222]/60 hover:scale-[1.03] active:scale-[0.98] border border-[#FF6B6B]/30"
          >
            <Calendar className="w-5 h-5 text-white" />
            <span>Book a Table</span>
          </button>

          {/* Secondary CTA: View Full Menu */}
          <button
            id="hero-view-menu-cta"
            onClick={onViewMenu}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-8 py-4 sm:py-4.5 rounded-[18px] bg-[#181818]/90 hover:bg-[#252525] border-2 border-white/20 hover:border-[#B22222] text-white font-sans font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-xl backdrop-blur-md hover:scale-[1.03] active:scale-[0.98]"
          >
            <UtensilsCrossed className="w-5 h-5 text-[#B22222]" />
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4 text-white/70" />
          </button>
        </motion.div>

        {/* Social Proof Quick Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#D0D0D0] font-sans"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B22222]" />
            <span>Michelin Recommended 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3FAE5A]" />
            <span>Open Today: 11:30 AM – 11:00 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⭐️ 4.9 / 5.0 (850+ Diners)</span>
          </div>
        </motion.div>

      </div>

      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B22222]/40 to-transparent z-10" />
    </section>
  );
}
