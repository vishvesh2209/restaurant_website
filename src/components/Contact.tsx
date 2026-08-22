import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Flame } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';

export default function Contact() {
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFeedbackName('');
      setFeedbackEmail('');
      setFeedbackMessage('');
      setFormSent(false);
    }, 3000);
  };

  return (
    <section id="contact-us-page" className="py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden border-b border-white/[0.08]">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#B22222]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B22222] font-semibold font-sans block mb-3 flex items-center justify-center gap-2">
            <Flame className="w-4 h-4 text-[#B22222]" />
            Say Howdy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Contact &amp; Location
          </h2>
          <div className="h-[2px] w-12 bg-[#B22222] mx-auto mb-6 rounded-full" />
          <p className="font-sans text-[#B7B7B7] text-sm sm:text-base font-normal leading-relaxed">
            Have questions about our oak pit schedule, private dining, or catering? Reach out or stop by our Austin dining room.
          </p>
        </div>

        {/* Lower Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Info & Form */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 h-full">
            
            {/* Direct Cards */}
            <div className="space-y-4">
              
              {/* Address */}
              <div className="p-5 rounded-[20px] bg-[#181818] border border-white/[0.08] flex items-start gap-4 shadow-xl">
                <div className="p-3.5 rounded-[14px] bg-[#B22222]/15 border border-[#B22222]/30 text-[#B22222] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold font-sans block mb-1">Our Location</span>
                  <span className="text-white text-sm sm:text-base font-serif font-bold leading-snug block">
                    {RESTAURANT_INFO.address}
                  </span>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="p-5 rounded-[20px] bg-[#181818] border border-white/[0.08] flex items-start gap-3.5 shadow-xl">
                  <div className="p-3.5 rounded-[14px] bg-[#B22222]/15 border border-[#B22222]/30 text-[#B22222] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-left min-w-0">
                    <span className="text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold font-sans block mb-1">Call Us</span>
                    <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-white text-sm sm:text-base font-serif font-bold hover:text-[#B22222] transition-colors truncate block">
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="p-5 rounded-[20px] bg-[#181818] border border-white/[0.08] flex items-start gap-3.5 shadow-xl">
                  <div className="p-3.5 rounded-[14px] bg-[#B22222]/15 border border-[#B22222]/30 text-[#B22222] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left min-w-0">
                    <span className="text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold font-sans block mb-1">Email Us</span>
                    <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-white text-sm sm:text-base font-serif font-bold hover:text-[#B22222] transition-colors truncate block">
                      {RESTAURANT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Operating Hours Card */}
              <div className="p-6 rounded-[20px] bg-[#181818] border border-white/[0.08] flex items-start gap-4 shadow-xl">
                <div className="p-3.5 rounded-[14px] bg-[#B22222]/15 border border-[#B22222]/30 text-[#B22222] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-left w-full">
                  <span className="text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold font-sans block mb-3">Dining Hours</span>
                  <div className="space-y-2.5">
                    {RESTAURANT_INFO.hours.map((item, index) => (
                      <div key={index} className="flex justify-between text-xs sm:text-sm font-sans">
                        <span className="text-[#C8C8C8]">{item.days}</span>
                        <span className="text-white font-serif font-bold text-right pl-2">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Messaging Form */}
            <div className="p-6 rounded-[20px] bg-[#181818] border border-white/[0.08] shadow-xl relative flex-grow flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {formSent ? (
                  <motion.div
                    className="text-center py-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CheckCircle className="w-12 h-12 text-[#B22222] mx-auto mb-3" />
                    <h4 className="font-serif font-bold text-white text-xl mb-1">Message Sent!</h4>
                    <p className="font-sans text-xs text-[#B7B7B7] font-normal">
                      Our front office team will get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <h4 className="font-serif font-bold text-white text-lg text-left mb-1">Send a Message</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        id="contact-feedback-name"
                        type="text"
                        required
                        placeholder="Your Name"
                        value={feedbackName}
                        onChange={(e) => setFeedbackName(e.target.value)}
                        className="w-full bg-[#121212] border border-white/[0.08] focus:border-[#B22222] rounded-[14px] py-3 px-3.5 text-white text-xs focus:outline-none transition-all font-sans"
                      />
                      <input
                        id="contact-feedback-email"
                        type="email"
                        required
                        placeholder="Your Email"
                        value={feedbackEmail}
                        onChange={(e) => setFeedbackEmail(e.target.value)}
                        className="w-full bg-[#121212] border border-white/[0.08] focus:border-[#B22222] rounded-[14px] py-3 px-3.5 text-white text-xs focus:outline-none transition-all font-sans"
                      />
                    </div>

                    <textarea
                      id="contact-feedback-message"
                      rows={3}
                      required
                      placeholder="How can we assist you?"
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      className="w-full bg-[#121212] border border-white/[0.08] focus:border-[#B22222] rounded-[14px] py-3 px-3.5 text-white text-xs focus:outline-none transition-all resize-none font-sans"
                    />

                    <button
                      id="contact-feedback-submit"
                      type="submit"
                      className="w-full py-3.5 rounded-[14px] bg-[#B22222] hover:bg-[#D32F2F] text-white font-sans text-xs uppercase tracking-wider font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#B22222]/20"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Send Message
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Right: Map Iframe Container */}
          <div className="lg:col-span-7 rounded-[22px] overflow-hidden border border-white/[0.08] bg-[#181818] min-h-[420px] h-full relative shadow-2xl">
            
            {/* Location Badge */}
            <div className="absolute top-4 left-4 z-10 px-4 py-3 rounded-[14px] bg-[#0A0A0A]/90 backdrop-blur-md border border-white/10 text-left flex items-center gap-3 shadow-lg">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#B22222] animate-pulse"></span>
              <div>
                <span className="font-serif font-bold text-xs text-white block">TEXAS TASTE AUSTIN</span>
                <span className="text-[10px] text-[#8E8E8E] font-sans font-normal">401 E 6th St, Downtown Austin</span>
              </div>
            </div>

            <iframe
              title="Texas Taste Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.751634591427!2d-97.74175368487611!3d30.266904581801265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5a3637b98bf%3A0x6b71f308a09fbd6d!2s401%20E%206th%20St%2C%20Austin%2C%20TX%2078701!5e0!3m2!1sen!2sus!4v1655555555555!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: 'invert(90%) hue-rotate(180deg) grayscale(100%) contrast(120%)',
                minHeight: '420px'
              }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}
