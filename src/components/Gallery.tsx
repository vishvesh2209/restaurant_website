import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'food' | 'interior' | 'drinks' | 'events'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'food', label: 'Chef Dishes & Plates' },
    { id: 'interior', label: 'Dining Lounge' },
    { id: 'drinks', label: 'Fresh Juice & Mocktails' },
    { id: 'events', label: 'Atmosphere' }
  ];

  // Filter items
  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const openLightbox = (item: GalleryItem) => {
    const index = filteredItems.findIndex((fi) => fi.id === item.id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery-page" className="py-24 lg:py-32 bg-[#0A0A0A] relative border-b border-white/[0.08] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B22222]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B22222] font-semibold font-sans flex items-center justify-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-[#B22222]" />
            A Visual Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            The Visual Gallery
          </h2>
          <div className="h-[2px] w-12 bg-[#B22222] mx-auto mb-6 rounded-full" />
          <p className="font-sans text-[#D0D0D0] text-sm sm:text-base md:text-lg font-normal leading-relaxed">
            Take a visual tour through our organic wood-fired sizzlers, artisanal pastas, hand-crafted mocktails, and luxurious dark-themed dining atmosphere.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 pb-6 border-b border-white/[0.08] max-w-2xl mx-auto">
          {filters.map((filter) => (
            <button
              id={`gallery-filter-${filter.id}`}
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id as any);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-[#B22222] text-white shadow-lg shadow-[#B22222]/30 border border-[#FF6B6B]/40'
                  : 'bg-[#181818] text-[#C8C8C8] hover:text-white border border-white/[0.08] hover:border-white/20'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Bento Image Grid */}
        <motion.div
          id="gallery-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                id={`gallery-item-${item.id}`}
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => openLightbox(item)}
                className="group relative rounded-[20px] overflow-hidden aspect-[4/3] bg-[#181818] border border-white/[0.08] hover:border-[#B22222]/50 transition-all duration-300 shadow-xl cursor-pointer"
              >
                {/* Image */}
                <img
                  src={item.url}
                  alt={item.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                  {/* Plus Icon at Center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#B22222] text-white p-3.5 rounded-full transform scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl border border-[#FF6B6B]/40">
                    <Maximize2 className="w-5 h-5 stroke-[2.5]" />
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-[#B22222] font-bold font-sans block mb-1">
                    {item.category === 'food' ? 'GOURMET CUISINE' : item.category === 'interior' ? 'ATMOSPHERE' : item.category === 'drinks' ? 'CRAFT BEVERAGE' : 'SPECIAL MOMENT'}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Immersive Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              id="gallery-lightbox-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
            >
              {/* Top Controls Bar */}
              <div className="flex items-center justify-between py-3 px-4 sm:px-6 border-b border-white/10 w-full z-50 relative">
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[10px] uppercase tracking-widest text-[#B22222] font-bold block mb-1 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#B22222]" />
                    TEXAS TASTE GALLERY
                  </span>
                  <span className="text-white text-xs sm:text-sm font-serif">
                    Photo {lightboxIndex + 1} of {filteredItems.length}
                  </span>
                </div>
                <button
                  id="lightbox-close-btn"
                  onClick={closeLightbox}
                  className="p-2.5 rounded-full bg-[#181818] border border-white/10 hover:border-[#B22222] text-[#B7B7B7] hover:text-white transition-all cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image Stage */}
              <div className="flex-grow flex items-center justify-center relative my-4 max-h-[75vh]">
                {/* Left navigation arrow */}
                <button
                  id="lightbox-prev-btn"
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 z-40 p-3.5 rounded-full bg-black/80 hover:bg-[#B22222] border border-white/15 text-white transition-all cursor-pointer shadow-2xl hover:scale-105"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>

                {/* Animated Image Wrapper */}
                <motion.div
                  key={lightboxIndex}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-full max-h-full flex items-center justify-center px-4 rounded-[20px] overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={filteredItems[lightboxIndex].url}
                    alt={filteredItems[lightboxIndex].title}
                    className="max-w-full max-h-[70vh] object-contain rounded-[18px] border border-white/10"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </motion.div>

                {/* Right navigation arrow */}
                <button
                  id="lightbox-next-btn"
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 z-40 p-3.5 rounded-full bg-black/80 hover:bg-[#B22222] border border-white/15 text-white transition-all cursor-pointer shadow-2xl hover:scale-105"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                </button>
              </div>

              {/* Bottom Caption Bar */}
              <div className="py-4 text-center max-w-xl mx-auto w-full z-50">
                <span className="text-[10px] tracking-widest text-[#B22222] uppercase font-bold font-sans">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-white mt-1">
                  {filteredItems[lightboxIndex].title}
                </h4>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
