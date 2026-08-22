import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CalendarCheck, Award, Flame } from 'lucide-react';
import gourmetPlatterImg from '../assets/images/paneer_sizzler_gourmet_1787389990165.jpg';

export default function AboutUs() {
  return (
    <section id="about-us-page" className="py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden border-b border-white/[0.08]">
      {/* Subtle Crimson Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#B22222]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upper layout: Grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left Image Frame */}
          <motion.div 
            className="lg:col-span-5 relative text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-[22px] overflow-hidden border border-white/[0.08] p-2 bg-[#181818] shadow-2xl">
              <div className="relative rounded-[18px] overflow-hidden aspect-[4/5] bg-[#121212]">
                <img
                  src={gourmetPlatterImg}
                  alt="Fresh organic vegetables, herbs, and gourmet vegetarian cuisine"
                  className="object-cover w-full h-full transform hover:scale-105 transition duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />

                {/* Overlaid Award Plate */}
                <div className="absolute top-5 left-5 bg-[#0A0A0A]/95 backdrop-blur-md border border-white/15 p-4 rounded-[16px] flex items-center gap-3 shadow-lg">
                  <div className="w-10 h-10 rounded-[12px] bg-[#B22222]/20 flex items-center justify-center border border-[#B22222]/30 shrink-0">
                    <Award className="w-5 h-5 text-[#B22222]" />
                  </div>
                  <div>
                    <span className="block font-serif text-sm sm:text-base font-bold text-white">#1 Pure Vegetarian</span>
                    <span className="text-xs text-[#D8D8D8] font-sans font-medium">Austin Food Guild 2025</span>
                  </div>
                </div>

                {/* Pitmaster signature label */}
                <div className="absolute bottom-5 left-5 right-5 bg-[#0A0A0A]/95 backdrop-blur-md border-l-4 border-[#B22222] p-4 rounded-[16px]">
                  <span className="text-xs uppercase tracking-wider text-[#B22222] font-semibold font-sans block mb-0.5">HEAD CHEFS</span>
                  <span className="text-white font-serif font-bold text-base sm:text-lg block">Chef Elena Vance &amp; Chef Wyatt</span>
                  <span className="text-xs sm:text-sm text-[#D8D8D8] font-sans italic">"True culinary luxury lies in celebrating the vibrant flavors and aromas of fresh organic produce."</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Text Description */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#B22222] font-semibold font-sans block mb-3">
              Rooted in Austin, Texas
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              The Heritage of <br />
              <span className="text-[#B22222] italic">100% Pure Organic Dining</span>
            </h2>
            <div className="h-[2px] w-12 bg-[#B22222] mb-8 rounded-full" />

            <p className="font-sans text-[#D0D0D0] text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-6">
              Founded with an uncompromising commitment to health, sustainability, and high-end culinary craft, Texas Taste transforms 100% vegetarian ingredients into extraordinary fine dining experiences.
            </p>
            
            <p className="font-sans text-[#D0D0D0] text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-8">
              From our signature wood-fired paneer sizzlers and black truffle fettuccine to hand-rolled pizzas and cold-pressed organic detox juices, every plate is crafted with pesticide-free local produce, artisanal cheeses, and hand-ground spices.
            </p>

            {/* Sourcing Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              <div className="flex gap-4 p-5 rounded-[20px] bg-[#181818] border border-white/[0.08]">
                <ShieldCheck className="w-6 h-6 text-[#B22222] shrink-0" />
                <div>
                  <h4 className="font-serif font-bold text-white text-base sm:text-lg mb-1">100% Organic Sourcing</h4>
                  <p className="font-sans text-xs sm:text-sm text-[#C8C8C8] leading-relaxed font-normal">
                    Partnered directly with local Texas organic family farms for farm-fresh vegetables and wild herbs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-[20px] bg-[#181818] border border-white/[0.08]">
                <CalendarCheck className="w-6 h-6 text-[#B22222] shrink-0" />
                <div>
                  <h4 className="font-serif font-bold text-white text-base sm:text-lg mb-1">Handcrafted Daily</h4>
                  <p className="font-sans text-xs sm:text-sm text-[#C8C8C8] leading-relaxed font-normal">
                    Our doughs, pestos, marinades, cottage cheeses, and fresh juices are prepared from scratch every morning.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div
            id="about-pillar-1"
            className="p-8 bg-[#181818] rounded-[20px] border border-white/[0.08] text-center relative hover:border-[#B22222]/40 transition-all duration-300 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-12 h-12 rounded-[14px] bg-[#B22222]/15 border border-[#B22222]/30 flex items-center justify-center text-[#B22222] font-serif text-lg font-bold mx-auto mb-6">
              01
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">Farm-to-Table Freshness</h3>
            <p className="font-sans text-[#D0D0D0] text-sm sm:text-base leading-relaxed">
              We source crisp, seasonal organic vegetables and herbs directly from regional Texas farms daily.
            </p>
          </motion.div>

          <motion.div
            id="about-pillar-2"
            className="p-8 bg-[#181818] rounded-[20px] border border-white/[0.08] text-center relative hover:border-[#B22222]/40 transition-all duration-300 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-12 h-12 rounded-[14px] bg-[#B22222]/15 border border-[#B22222]/30 flex items-center justify-center text-[#B22222] font-serif text-lg font-bold mx-auto mb-6">
              02
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">Artisanal Spice Craft</h3>
            <p className="font-sans text-[#D0D0D0] text-sm sm:text-base leading-relaxed">
              Hand-ground spices, cold-pressed infused oils, and slow-simmered rich sauces created in-house without artificial additives.
            </p>
          </motion.div>

          <motion.div
            id="about-pillar-3"
            className="p-8 bg-[#181818] rounded-[20px] border border-white/[0.08] text-center relative hover:border-[#B22222]/40 transition-all duration-300 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-12 h-12 rounded-[14px] bg-[#B22222]/15 border border-[#B22222]/30 flex items-center justify-center text-[#B22222] font-serif text-lg font-bold mx-auto mb-6">
              03
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">Pure Fine Dining</h3>
            <p className="font-sans text-[#D0D0D0] text-sm sm:text-base leading-relaxed">
              Delivering memorable, luxurious 100% vegetarian dining in a warm, sophisticated atmosphere where every detail matters.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
