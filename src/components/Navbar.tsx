import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  toggleCart: () => void;
  openReservations: () => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  cartCount,
  toggleCart,
  openReservations
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Full Menu' },
    { id: 'about', label: 'Our Story' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="app-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl shadow-black/80'
            : 'bg-gradient-to-b from-[#0A0A0A]/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              id="nav-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group cursor-pointer text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-[#B22222] flex items-center justify-center transition-transform group-hover:scale-105 duration-300 shadow-md shadow-[#B22222]/30">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-serif text-xl font-bold tracking-wider text-white uppercase group-hover:text-[#B22222] transition-colors">
                  TEXAS TASTE
                </span>
                <span className="text-[9px] font-sans tracking-[0.25em] text-[#B7B7B7] uppercase font-semibold mt-1">
                  100% Premium Vegetarian
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav" className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  id={`nav-link-${link.id}`}
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative font-sans text-xs uppercase tracking-[0.18em] font-semibold cursor-pointer py-2 transition-colors duration-200 ${
                    currentTab === link.id
                      ? 'text-[#B22222]'
                      : 'text-[#B7B7B7] hover:text-white'
                  }`}
                >
                  {link.label}
                  {currentTab === link.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#B22222] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Order Online / Cart Toggle Button */}
              <button
                id="navbar-cart-toggle"
                onClick={toggleCart}
                className="relative text-xs sm:text-sm bg-[#B22222] hover:bg-[#D32F2F] text-white px-3.5 sm:px-5 py-2.5 rounded-[16px] font-bold tracking-wider cursor-pointer transition-all duration-300 flex items-center gap-1.5 sm:gap-2 shadow-xl shadow-[#B22222]/30 hover:scale-[1.04] active:scale-[0.98] border border-[#FF6B6B]/25"
                aria-label="Toggle Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Now</span>
                {cartCount > 0 && (
                  <span className="bg-white text-[#B22222] px-2 py-0.5 rounded-full text-xs font-extrabold ml-0.5 animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Reservation CTA Button (Desktop) */}
              <button
                id="navbar-reserve-btn"
                onClick={openReservations}
                className="hidden md:flex text-xs sm:text-sm bg-white/10 border-2 border-white/30 text-white hover:bg-[#B22222] hover:border-[#B22222] px-4 sm:px-5 py-2.5 rounded-[16px] font-bold tracking-wider cursor-pointer transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] shadow-md"
              >
                Book Table
              </button>

              {/* Mobile Menu Toggle */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 bg-[#181818] border border-white/15 rounded-[12px] text-white hover:text-white hover:border-[#B22222] transition-colors cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer-overlay"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-30 bg-[#0A0A0A]/98 backdrop-blur-2xl lg:hidden pt-28 pb-8 px-6 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-8 relative z-10">
              <div className="text-center pb-4 border-b border-white/[0.08]">
                <span className="font-serif text-xs tracking-[0.2em] text-[#B22222] uppercase font-bold flex items-center justify-center gap-1.5">
                  ★ Premium Organic Vegetarian Fine Dining ★
                </span>
              </div>
              
              <nav className="flex flex-col gap-4 text-center">
                {navLinks.map((link) => (
                  <button
                    id={`mobile-nav-link-${link.id}`}
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`py-2 font-serif text-2xl tracking-wide transition-colors ${
                      currentTab === link.id
                        ? 'text-[#B22222] font-semibold'
                        : 'text-[#B7B7B7] hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-3 relative z-10 pt-6 border-t border-white/[0.08]">
              <button
                id="mobile-reserve-btn"
                onClick={() => {
                  openReservations();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3.5 bg-[#B22222] hover:bg-[#D32F2F] text-white font-semibold rounded-[16px] text-sm tracking-wider transition-all duration-300 shadow-xl shadow-[#B22222]/25 cursor-pointer"
              >
                Reserve a Table
              </button>
              <div className="text-center text-xs text-[#8E8E8E] font-sans">
                401 E 6th St, Austin, TX &bull; (512) 555-8278
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
