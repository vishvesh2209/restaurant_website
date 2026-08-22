import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Flame, Award, TrendingUp, Sparkles, UtensilsCrossed } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

interface FeaturedDishesProps {
  onAddToCart: (item: MenuItem) => void;
  onViewFullMenu: () => void;
}

export default function FeaturedDishes({ onAddToCart, onViewFullMenu }: FeaturedDishesProps) {
  const featured = MENU_ITEMS.filter((item) => item.isFeatured);

  return (
    <section id="featured-dishes" className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden border-b border-white/[0.08]">
      {/* Background Glow */}
      <div className="absolute -left-48 top-1/2 w-96 h-96 bg-[#B22222]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#B22222] font-semibold font-sans flex items-center justify-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-[#B22222]" />
            100% Pure Organic Vegetarian
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Chef's Signature Creations
          </h2>
          <div className="h-[2px] w-12 bg-[#B22222] mx-auto mb-6 rounded-full" />
          <p className="font-sans text-[#D0D0D0] text-sm sm:text-base md:text-lg font-normal leading-relaxed">
            Handcrafted with locally sourced organic produce, artisanal cheeses, and aromatic spices for an unforgettable dining experience.
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((dish, idx) => {
            const decorIcons = [
              <Award className="w-4 h-4 text-[#B22222]" />,
              <TrendingUp className="w-4 h-4 text-[#B22222]" />,
              <Sparkles className="w-4 h-4 text-[#B22222]" />
            ];
            const icon = decorIcons[idx % decorIcons.length];

            return (
              <motion.div
                id={`featured-card-${dish.id}`}
                key={dish.id}
                className="group relative bg-[#181818] rounded-[20px] overflow-hidden border border-white/[0.08] hover:border-[#B22222]/40 transition-all duration-300 flex flex-col h-full shadow-xl hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Image Box with 22px internal feel */}
                <div className="relative aspect-[4/3] p-2 overflow-hidden">
                  <div className="relative w-full h-full rounded-[16px] overflow-hidden bg-[#121212]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/30" />

                    {/* Floating Indicators */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A0A0A]/95 backdrop-blur-md border border-white/15 text-xs uppercase font-semibold text-white tracking-wider">
                        {icon}
                        {dish.category === 'pizzas' ? 'Wood-Fired Pizza' : dish.category === 'pastas' ? 'Artisanal Pasta' : dish.category === 'mains' ? 'Main Sizzler' : dish.category === 'indian' ? 'Indian Special' : dish.category === 'burgers' ? 'Gourmet Veg Burger' : 'Organic Specialty'}
                      </span>
                      {dish.calories && (
                        <span className="text-xs text-[#D8D8D8] font-medium bg-[#0A0A0A]/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                          {dish.calories} kcal
                        </span>
                      )}
                    </div>

                    {/* Dietary Tags */}
                    {dish.tags && dish.tags.length > 0 && (
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                        {dish.tags.map((tag) => (
                          <span key={tag} className="text-[11px] font-sans font-bold uppercase tracking-wider bg-[#B22222] text-white px-3 py-1 rounded-full shadow-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#B22222] transition-colors line-clamp-1">
                        {dish.name}
                      </h3>
                      <span className="font-serif text-xl sm:text-2xl font-bold text-[#B22222] shrink-0">
                        ${dish.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="font-sans text-[#C8C8C8] text-sm sm:text-base font-normal leading-relaxed mb-6 line-clamp-2">
                      {dish.description}
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="pt-4 border-t border-white/[0.08]">
                    <button
                      id={`featured-add-${dish.id}`}
                      onClick={() => onAddToCart(dish)}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-[16px] bg-[#B22222]/15 border-2 border-[#B22222]/60 hover:bg-[#B22222] hover:border-[#B22222] text-white text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#B22222]/30 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <ShoppingCart className="w-4 h-4 text-[#B22222] group-hover/btn:text-white" />
                      Order Now
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="featured-view-full-menu"
            onClick={onViewFullMenu}
            className="inline-flex items-center gap-3 px-10 py-4.5 rounded-[18px] bg-[#B22222] hover:bg-[#D32F2F] text-white font-sans font-bold text-sm sm:text-base uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-2xl shadow-[#B22222]/40 hover:scale-[1.03] active:scale-[0.98] border border-[#FF6B6B]/30"
          >
            <UtensilsCrossed className="w-5 h-5" />
            <span>View Full Menu</span>
          </button>
        </div>

      </div>
    </section>
  );
}
