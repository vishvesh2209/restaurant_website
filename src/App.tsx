import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp, 
  Instagram, 
  Facebook, 
  Compass, 
  ChevronRight,
  Flame
} from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedDishes from './components/FeaturedDishes';
import FullMenu from './components/FullMenu';
import AboutUs from './components/AboutUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import ReservationForm from './components/ReservationForm';
import Contact from './components/Contact';
import CartSidebar from './components/CartSidebar';

import { TESTIMONIALS } from './data';
import { MenuItem, CartItem, Reservation, Review } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reviews, setReviews] = useState<Review[]>(TESTIMONIALS);

  useEffect(() => {
    const savedRes = localStorage.getItem('texas_taste_reservations');
    if (savedRes) {
      try {
        setReservations(JSON.parse(savedRes));
      } catch (e) {
        console.error('Failed to parse reservations', e);
      }
    }

    const savedReviews = localStorage.getItem('texas_taste_reviews');
    if (savedReviews) {
      try {
        const parsedCustom = JSON.parse(savedReviews) as Review[];
        setReviews([...TESTIMONIALS, ...parsedCustom]);
      } catch (e) {
        console.error('Failed to parse reviews', e);
      }
    }
  }, []);

  useEffect(() => {
    const handleScrollButton = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollButton);
    return () => window.removeEventListener('scroll', handleScrollButton);
  }, []);

  const handleAddReservation = (newRes: Reservation) => {
    const updated = [newRes, ...reservations];
    setReservations(updated);
    localStorage.setItem('texas_taste_reservations', JSON.stringify(updated));
  };

  const handleCancelReservation = (id: string) => {
    const updated = reservations.filter((r) => r.id !== id);
    setReservations(updated);
    localStorage.setItem('texas_taste_reservations', JSON.stringify(updated));
  };

  const handleAddReview = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
    const customOnly = [newReview, ...reviews.filter((r) => r.isCustom)];
    localStorage.setItem('texas_taste_reviews', JSON.stringify(customOnly));
  };

  const handleAddToCart = (item: MenuItem) => {
    const existing = cartItems.find((ci) => ci.menuItem.id === item.id);
    if (existing) {
      handleUpdateCartQuantity(item.id, existing.quantity + 1);
    } else {
      setCartItems([...cartItems, { menuItem: item, quantity: 1 }]);
    }
  };

  const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    const updated = cartItems.map((item) => {
      if (item.menuItem.id === itemId) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updated);
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.menuItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0A0A0A] text-white font-sans min-h-screen flex flex-col justify-between selection:bg-[#B22222] selection:text-white">
      
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cartCount={totalCartCount}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
        openReservations={() => {
          setCurrentTab('reservations');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Dynamic Stage */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentTab === 'home' && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero */}
              <Hero
                onViewMenu={() => {
                  setCurrentTab('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onReserveTable={() => {
                  setCurrentTab('reservations');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* Featured Sizzling Dishes */}
              <FeaturedDishes
                onAddToCart={handleAddToCart}
                onViewFullMenu={() => {
                  setCurrentTab('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* Home Promo Bento Box */}
              <section className="py-20 bg-[#0A0A0A] border-t border-b border-white/[0.08] relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#B22222]/10 rounded-full blur-[140px] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="bg-[#181818] rounded-[20px] border border-white/[0.08] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl">
                    
                    <div className="lg:col-span-7 text-left">
                      <span className="text-xs uppercase tracking-[0.25em] text-[#B22222] font-semibold font-sans flex items-center gap-2 mb-3">
                        <Flame className="w-4 h-4 text-[#B22222]" /> Farm-Fresh Craft
                      </span>
                      <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                        Experience 100% Pure Organic Culinary Mastery
                      </h3>
                      <p className="font-sans text-[#B7B7B7] text-sm sm:text-base font-normal leading-relaxed mb-6 max-w-xl">
                        At Texas Taste, we craft every dish using organic vegetables, artisanal cheeses, and fresh herbs sourced directly from local Texas farms. No artificial flavors, preservatives, or shortcuts — just pure freshness and culinary excellence.
                      </p>
                      
                      <div className="flex flex-wrap gap-3 text-xs font-serif font-bold text-white mb-8">
                        <span className="flex items-center gap-2 bg-[#121212] border border-white/10 px-4 py-2.5 rounded-full">
                          &bull; 100% Pure Vegetarian
                        </span>
                        <span className="flex items-center gap-2 bg-[#121212] border border-white/10 px-4 py-2.5 rounded-full">
                          &bull; Locally Sourced Organic
                        </span>
                        <span className="flex items-center gap-2 bg-[#121212] border border-white/10 px-4 py-2.5 rounded-full">
                          &bull; Chef-Crafted Daily
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <button
                          id="promo-story-btn"
                          onClick={() => {
                            setCurrentTab('about');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-7 py-4 rounded-[16px] bg-[#B22222] text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider hover:bg-[#D32F2F] cursor-pointer transition-all duration-300 shadow-xl shadow-[#B22222]/30 hover:scale-[1.02] active:scale-[0.98] border border-[#FF6B6B]/25"
                        >
                          Our Heritage Story
                        </button>
                        <button
                          id="promo-reserve-btn"
                          onClick={() => {
                            setCurrentTab('reservations');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-7 py-4 rounded-[16px] bg-[#121212] border-2 border-white/20 hover:border-[#B22222] text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider hover:bg-[#202020] cursor-pointer transition-all duration-300 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                        >
                          Book a Table
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-5 relative aspect-[4/3] p-2 rounded-[20px] bg-[#121212] border border-white/10">
                      <div className="relative w-full h-full rounded-[14px] overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
                          alt="Fresh organic vegetarian gourmet dish"
                          className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Reviews teaser */}
              <Testimonials reviews={reviews.slice(0, 3)} onAddReview={handleAddReview} />
            </motion.div>
          )}

          {currentTab === 'menu' && (
            <motion.div
              key="menu-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FullMenu onAddToCart={handleAddToCart} />
            </motion.div>
          )}

          {currentTab === 'about' && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AboutUs />
            </motion.div>
          )}

          {currentTab === 'gallery' && (
            <motion.div
              key="gallery-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Gallery />
            </motion.div>
          )}

          {currentTab === 'testimonials' && (
            <motion.div
              key="testimonials-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Testimonials reviews={reviews} onAddReview={handleAddReview} />
            </motion.div>
          )}

          {currentTab === 'contact' && (
            <motion.div
              key="contact-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Contact />
            </motion.div>
          )}

          {currentTab === 'reservations' && (
            <motion.div
              key="reservations-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ReservationForm
                reservations={reservations}
                onAddReservation={handleAddReservation}
                onCancelReservation={handleCancelReservation}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Cart Drawer */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="back-to-top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-6 z-30 p-3.5 rounded-full bg-[#181818]/90 backdrop-blur-md hover:bg-[#B22222] border border-white/10 text-[#B7B7B7] hover:text-white shadow-2xl transition-all duration-300 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Global Footer */}
      <footer id="app-footer" className="bg-[#0A0A0A] border-t border-white/[0.08] py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start mb-12">
            
            {/* Box 1: Brand info */}
            <div className="lg:col-span-4 text-left">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-serif text-[#B22222] font-bold text-lg">&bull;</span>
                <span className="font-serif text-lg font-bold tracking-wider text-white">TEXAS TASTE</span>
              </div>
              <p className="font-sans text-xs text-[#B7B7B7] leading-relaxed mb-6 max-w-xs font-normal">
                100% Organic vegetarian fine dining lounge in downtown Austin. Celebrating farm-to-table freshness with wood-fired sizzlers, artisanal pastas, pizzas, and handcrafted detox juices.
              </p>
              
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-[#181818] border border-white/10 text-[#B7B7B7] hover:text-[#B22222] hover:border-[#B22222]/40 transition-colors"
                  aria-label="Texas Taste Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-[#181818] border border-white/10 text-[#B7B7B7] hover:text-[#B22222] hover:border-[#B22222]/40 transition-colors"
                  aria-label="Texas Taste Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Box 2: Quick Links */}
            <div className="lg:col-span-2 text-left">
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">Navigation</h4>
              <ul className="space-y-2.5 text-xs font-sans text-[#B7B7B7]">
                {[
                  { id: 'home', label: 'Home Page' },
                  { id: 'menu', label: 'The Menu' },
                  { id: 'about', label: 'Our Heritage' },
                  { id: 'gallery', label: 'Gallery' },
                  { id: 'testimonials', label: 'Reviews' },
                  { id: 'contact', label: 'Contact Us' }
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setCurrentTab(item.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hover:text-[#B22222] flex items-center gap-1 transition-colors group cursor-pointer"
                    >
                      <ChevronRight className="w-3 h-3 text-[#8E8E8E] group-hover:text-[#B22222] group-hover:translate-x-0.5 transition-all" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 3: Hours */}
            <div className="lg:col-span-3 text-left">
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">Dining Hours</h4>
              <ul className="space-y-3 text-xs font-sans text-[#B7B7B7]">
                <li className="flex justify-between border-b border-white/[0.08] pb-2">
                  <span>Mon - Thu</span>
                  <span className="text-white font-serif font-bold">11:30 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-white/[0.08] pb-2">
                  <span>Fri - Sat</span>
                  <span className="text-white font-serif font-bold">11:00 AM - 11:30 PM</span>
                </li>
                <li className="flex justify-between pb-1">
                  <span>Sunday</span>
                  <span className="text-white font-serif font-bold">10:30 AM - 9:30 PM</span>
                </li>
              </ul>
            </div>

            {/* Box 4: Location */}
            <div className="lg:col-span-3 text-left">
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">Location</h4>
              <ul className="space-y-3.5 text-xs font-sans text-[#B7B7B7]">
                <li className="flex gap-2 items-start">
                  <MapPin className="w-4 h-4 text-[#B22222] shrink-0 mt-0.5" />
                  <span>401 E 6th St, Austin, TX 78701, USA</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Phone className="w-4 h-4 text-[#B22222] shrink-0" />
                  <a href="tel:+15125558278" className="hover:text-white transition-colors">+1 (512) 555-8278</a>
                </li>
                <li className="flex gap-2 items-center">
                  <Mail className="w-4 h-4 text-[#B22222] shrink-0" />
                  <a href="mailto:reservations@texastaste.com" className="hover:text-white transition-colors truncate">reservations@texastaste.com</a>
                </li>
              </ul>
            </div>

          </div>

          <div className="h-px bg-white/[0.08] w-full mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8E8E8E] font-sans">
            <span>&copy; {new Date().getFullYear()} Texas Taste 100% Organic Vegetarian. All Rights Reserved.</span>
            <div className="flex items-center gap-2 text-[#B22222] uppercase font-semibold">
              <span>100% Pure Vegetarian</span>
              <span>&bull;</span>
              <span>Austin, TX</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
