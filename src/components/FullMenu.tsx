import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, SlidersHorizontal, Check, RefreshCw, Star, Info, Flame } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS, formatINR } from '../data';

interface FullMenuProps {
  onAddToCart: (item: MenuItem) => void;
}

type CategoryType = 'all' | 'starters' | 'pizzas' | 'pastas' | 'burgers' | 'mains' | 'indian' | 'sides' | 'desserts' | 'drinks';

export default function FullMenu({ onAddToCart }: FullMenuProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(750);
  const [dietaryFilter, setDietaryFilter] = useState<{
    spicy: boolean;
    gf: boolean;
    chef: boolean;
  }>({
    spicy: false,
    gf: false,
    chef: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showToastId, setShowToastId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'starters', label: 'Starters' },
    { id: 'pizzas', label: 'Wood-Fired Pizza' },
    { id: 'pastas', label: 'Handcrafted Pasta' },
    { id: 'burgers', label: 'Gourmet Veg Burgers' },
    { id: 'mains', label: 'Mains & Sizzlers' },
    { id: 'indian', label: 'Indian Specials' },
    { id: 'sides', label: 'House Sides' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', label: 'Fresh Juices & Mocktails' },
  ];

  const handleAddToCartWithToast = (item: MenuItem) => {
    onAddToCart(item);
    setShowToastId(item.id);
    setTimeout(() => {
      setShowToastId(null);
    }, 2000);
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (item.price > maxPrice) {
        return false;
      }

      if (dietaryFilter.spicy && !item.tags?.includes('Spicy')) return false;
      if (dietaryFilter.gf && !item.tags?.includes('Gluten-Free')) return false;
      if (dietaryFilter.chef && !item.tags?.includes("Chef's Special")) return false;

      return true;
    });
  }, [activeCategory, searchQuery, maxPrice, dietaryFilter]);

  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setMaxPrice(750);
    setDietaryFilter({ spicy: false, gf: false, chef: false });
  };

  return (
    <section id="full-menu-page" className="py-24 lg:py-32 bg-[#0A0A0A] relative min-h-screen border-b border-white/[0.08]">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#B22222]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B22222] font-semibold font-sans block mb-3 flex items-center justify-center gap-2">
            <Flame className="w-4 h-4 text-[#B22222]" />
            100% Organic Vegetarian Menu
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            The Texas Taste Culinary Collection
          </h1>
          <div className="h-[2px] w-12 bg-[#B22222] mx-auto mb-6 rounded-full" />
          <p className="font-sans text-[#B7B7B7] text-sm sm:text-base font-normal leading-relaxed">
            Every dish is prepared fresh daily with 100% pure organic ingredients, farm-fresh vegetables, artisanal cheeses, and authentic culinary passion.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8">
            
            {/* Search Bar */}
            <div className="relative flex-grow max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E8E8E] w-5 h-5" />
              <input
                id="menu-search-input"
                type="text"
                placeholder="Search paneer sizzler, truffle pasta, pizza..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181818] border border-white/[0.08] focus:border-[#B22222] rounded-[16px] py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none transition-all placeholder:text-[#8E8E8E] font-sans shadow-inner"
              />
            </div>

            {/* Filter Toggle and Reset Buttons */}
            <div className="flex items-center gap-3">
              <button
                id="menu-filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-[16px] border text-xs tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                  showFilters
                    ? 'bg-[#B22222] border-[#B22222] text-white shadow-lg shadow-[#B22222]/20'
                    : 'bg-[#181818] border-white/[0.08] text-white hover:border-[#B22222]'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Refine Menu
              </button>

              {(searchQuery || maxPrice < 750 || dietaryFilter.spicy || dietaryFilter.gf || dietaryFilter.chef) && (
                <button
                  id="menu-filter-reset"
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-[16px] bg-[#181818] border border-white/[0.08] text-[#B7B7B7] hover:text-white text-xs font-semibold tracking-wider transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Advanced Filters Drawer */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                id="menu-advanced-filters-drawer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-8"
              >
                <div className="p-6 bg-[#181818] rounded-[20px] border border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-8 mb-4 shadow-xl">
                  
                  {/* Price Slider */}
                  <div className="text-left">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase font-semibold tracking-wider text-[#B7B7B7] font-sans">
                        Maximum Price Limit
                      </span>
                      <span className="text-sm font-serif font-bold text-[#B22222]">
                        {formatINR(maxPrice)}
                      </span>
                    </div>
                    <input
                      id="menu-price-range"
                      type="range"
                      min="150"
                      max="750"
                      step="25"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-[#B22222] cursor-pointer h-1.5 bg-[#121212] rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-[#8E8E8E] font-sans mt-2">
                      <span>₹150</span>
                      <span>₹450</span>
                      <span>₹750</span>
                    </div>
                  </div>

                  {/* Dietary Checkbox Toggles */}
                  <div className="text-left">
                    <span className="block text-xs uppercase font-semibold tracking-wider text-[#B7B7B7] font-sans mb-3">
                      Dietary &amp; Specialties
                    </span>
                    <div className="flex flex-wrap gap-4">
                      {/* Chef's Special */}
                      <label className="flex items-center gap-2.5 cursor-pointer group text-sm text-[#B7B7B7] hover:text-white transition-colors">
                        <input
                          id="menu-filter-chef"
                          type="checkbox"
                          checked={dietaryFilter.chef}
                          onChange={(e) => setDietaryFilter({ ...dietaryFilter, chef: e.target.checked })}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors ${
                          dietaryFilter.chef 
                            ? 'bg-[#B22222] border-[#B22222] text-white' 
                            : 'border-white/15 bg-[#121212] group-hover:border-[#B22222]'
                        }`}>
                          {dietaryFilter.chef && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        Chef's Special
                      </label>

                      {/* Spicy */}
                      <label className="flex items-center gap-2.5 cursor-pointer group text-sm text-[#B7B7B7] hover:text-white transition-colors">
                        <input
                          id="menu-filter-spicy"
                          type="checkbox"
                          checked={dietaryFilter.spicy}
                          onChange={(e) => setDietaryFilter({ ...dietaryFilter, spicy: e.target.checked })}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors ${
                          dietaryFilter.spicy 
                            ? 'bg-[#B22222] border-[#B22222] text-white' 
                            : 'border-white/15 bg-[#121212] group-hover:border-[#B22222]'
                        }`}>
                          {dietaryFilter.spicy && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        Spicy Kick
                      </label>

                      {/* Gluten-Free */}
                      <label className="flex items-center gap-2.5 cursor-pointer group text-sm text-[#B7B7B7] hover:text-white transition-colors">
                        <input
                          id="menu-filter-gf"
                          type="checkbox"
                          checked={dietaryFilter.gf}
                          onChange={(e) => setDietaryFilter({ ...dietaryFilter, gf: e.target.checked })}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors ${
                          dietaryFilter.gf 
                            ? 'bg-[#B22222] border-[#B22222] text-white' 
                            : 'border-white/15 bg-[#121212] group-hover:border-[#B22222]'
                        }`}>
                          {dietaryFilter.gf && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        Gluten-Free
                      </label>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Categories Tabs */}
          <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-none snap-x border-b border-white/[0.08]">
            {categories.map((cat) => (
              <button
                id={`menu-cat-tab-${cat.id}`}
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as CategoryType)}
                className={`px-5 py-3 rounded-[16px] font-sans text-xs uppercase font-semibold tracking-wider whitespace-nowrap snap-center cursor-pointer transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#B22222] text-white shadow-lg shadow-[#B22222]/20'
                    : 'bg-[#181818] border border-white/[0.08] text-[#B7B7B7] hover:text-white hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            <motion.div
              id="menu-items-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              layout
            >
              {filteredItems.map((item) => (
                <motion.div
                  id={`menu-item-card-${item.id}`}
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-[#181818] rounded-[20px] overflow-hidden border border-white/[0.08] hover:border-[#B22222]/40 transition-all duration-300 flex flex-col justify-between h-full relative shadow-xl hover:-translate-y-1"
                >
                  {/* Item Image */}
                  <div className="relative aspect-[4/3] p-2 overflow-hidden">
                    <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-[#121212]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
                      
                      {/* Calorie Info Overlay */}
                      {item.calories && (
                        <div className="absolute bottom-2.5 left-2.5 bg-[#0A0A0A]/95 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-xs text-[#D8D8D8] font-sans flex items-center gap-1 font-medium">
                          <Info className="w-3.5 h-3.5 text-[#B22222]" />
                          {item.calories} kcal
                        </div>
                      )}

                      {/* Featured Special Banner */}
                      {item.isFeatured && (
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-3 py-1 rounded-full bg-[#B22222] text-white font-sans text-[10px] font-bold uppercase tracking-wider shadow-md">
                          <Star className="w-3 h-3 fill-white text-white" /> Special
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 flex-grow flex flex-col justify-between text-left">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#B22222] transition-colors line-clamp-1">
                          {item.name}
                        </h4>
                        <span className="font-serif text-lg sm:text-xl font-bold text-[#B22222] shrink-0">
                          {formatINR(item.price)}
                        </span>
                      </div>
                      <p className="font-sans text-[#C8C8C8] text-sm font-normal leading-relaxed mb-4 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Tags & Button */}
                    <div className="flex items-center justify-between gap-2 pt-4 border-t border-white/[0.08]">
                      <div className="flex flex-wrap gap-1">
                        {item.tags?.slice(0, 1).map((tag) => (
                          <span key={tag} className="text-[11px] font-sans font-semibold uppercase tracking-wider bg-[#0A0A0A] border border-white/15 text-white/90 px-2.5 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        id={`menu-add-cart-${item.id}`}
                        onClick={() => handleAddToCartWithToast(item)}
                        className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-[14px] text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer shadow-lg hover:scale-[1.04] active:scale-[0.98] ${
                          showToastId === item.id
                            ? 'bg-[#3FAE5A] text-white shadow-[#3FAE5A]/30'
                            : 'bg-[#B22222] text-white hover:bg-[#D32F2F] shadow-[#B22222]/30 border border-[#FF6B6B]/25'
                        }`}
                      >
                        {showToastId === item.id ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>Order Now</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              id="menu-no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-[#181818] rounded-[20px] border border-white/[0.08] max-w-md mx-auto shadow-xl"
            >
              <SlidersHorizontal className="w-10 h-10 text-[#8E8E8E] mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-white mb-2">No items matched</h3>
              <p className="font-sans text-xs text-[#B7B7B7] px-6 leading-relaxed mb-6 font-normal">
                Try widening your price limit or clearing search keywords to view all signature Texas dishes.
              </p>
              <button
                id="menu-clear-all-filters"
                onClick={resetFilters}
                className="px-6 py-3 rounded-[16px] bg-[#B22222] text-white font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#D32F2F] transition-colors cursor-pointer shadow-lg shadow-[#B22222]/20"
              >
                Show All Dishes
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
