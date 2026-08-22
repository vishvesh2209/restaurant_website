import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, CheckCircle, MessageSquarePlus, User, Flame } from 'lucide-react';
import { Review } from '../types';

interface TestimonialsProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export default function Testimonials({ reviews, onAddReview }: TestimonialsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Please provide your name.');
      return;
    }
    if (!comment.trim() || comment.length < 10) {
      setFormError('Please write a detailed review (at least 10 characters).');
      return;
    }

    const newReview: Review = {
      id: `custom-rev-${Date.now()}`,
      name: name.trim(),
      rating,
      comment: comment.trim(),
      location: location.trim() || 'Texas Resident',
      date: new Date().toISOString().split('T')[0],
      avatarUrl: name.trim().charAt(0).toUpperCase(),
      isCustom: true
    };

    onAddReview(newReview);
    setFormSubmitted(true);
    
    setTimeout(() => {
      setName('');
      setLocation('');
      setRating(5);
      setComment('');
      setFormSubmitted(false);
      setShowReviewForm(false);
    }, 2500);
  };

  return (
    <section id="testimonials-page" className="py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden border-b border-white/[0.08]">
      {/* Background Glow */}
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-[#B22222]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16 border-b border-white/[0.08] pb-10">
          <div className="text-left max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B22222] font-semibold font-sans block mb-3 flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#B22222]" />
              Guest Verdicts
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Southern Hospitality Reviews
            </h2>
            <p className="font-sans text-[#B7B7B7] text-sm sm:text-base font-normal leading-relaxed">
              Discover what food lovers and dining guests are saying about our 100% vegetarian dishes, artisanal pastas, and atmosphere.
            </p>
          </div>

          <div>
            <button
              id="write-review-toggle"
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-[16px] bg-[#181818] border border-white/[0.08] hover:border-[#B22222] text-white text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#B22222]/10"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#B22222]" />
              Write a Review
            </button>
          </div>
        </div>

        {/* Collapsible Slide-Down Review Form */}
        <AnimatePresence>
          {showReviewForm && (
            <motion.div
              id="testimonial-form-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-16"
            >
              <div className="max-w-2xl mx-auto p-8 rounded-[20px] bg-[#181818] border border-white/[0.08] shadow-2xl relative">

                {formSubmitted ? (
                  <motion.div
                    className="text-center py-10"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <CheckCircle className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
                    <h3 className="font-serif text-2xl font-bold text-white mb-2">Thank you!</h3>
                    <p className="font-sans text-sm text-[#B7B7B7]">
                      Your review has been published directly to the feed below. We deeply appreciate your feedback.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10 text-left">
                    <h3 className="font-serif text-xl font-bold text-white mb-1">Share Your Dining Experience</h3>
                    <p className="font-sans text-xs text-[#B7B7B7] mb-6">
                      Your feedback inspires our pitmasters to maintain authentic steakhouse quality.
                    </p>

                    {formError && (
                      <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-[12px] text-xs text-red-400 font-sans">
                        {formError}
                      </div>
                    )}

                    {/* Star Selection Rating */}
                    <div>
                      <label className="block text-xs uppercase font-semibold tracking-wider text-[#B7B7B7] font-sans mb-2">
                        Your Rating
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(null)}
                            className="p-1 text-white/20 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star
                              className={`w-7 h-7 transition-colors ${
                                star <= (hoveredRating ?? rating)
                                  ? 'text-[#B22222] fill-[#B22222]'
                                  : 'text-white/10'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Location Input */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-semibold tracking-wider text-[#B7B7B7] font-sans mb-2">
                          Your Name
                        </label>
                        <input
                          id="review-name"
                          type="text"
                          required
                          placeholder="e.g. Samuel Houston"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#121212] border border-white/[0.08] focus:border-[#B22222] rounded-[16px] py-3 px-4 text-white text-sm focus:outline-none transition-all font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-semibold tracking-wider text-[#B7B7B7] font-sans mb-2">
                          Your Location
                        </label>
                        <input
                          id="review-location"
                          type="text"
                          placeholder="e.g. San Antonio, TX"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full bg-[#121212] border border-white/[0.08] focus:border-[#B22222] rounded-[16px] py-3 px-4 text-white text-sm focus:outline-none transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs uppercase font-semibold tracking-wider text-[#B7B7B7] font-sans mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="review-message"
                        rows={4}
                        required
                        placeholder="Tell us about the Paneer Sizzler, Truffle Pasta, fresh organic mocktails or atmosphere..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-[#121212] border border-white/[0.08] focus:border-[#B22222] rounded-[16px] py-3 px-4 text-white text-sm focus:outline-none transition-all resize-none font-sans"
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        id="review-cancel-btn"
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-5 py-3 rounded-[16px] border border-white/10 text-[#B7B7B7] hover:text-white text-xs font-semibold tracking-wider cursor-pointer transition-colors bg-transparent"
                      >
                        Cancel
                      </button>
                      <button
                        id="review-submit-btn"
                        type="submit"
                        className="px-6 py-3 rounded-[16px] bg-[#B22222] text-white font-sans text-xs uppercase tracking-widest font-semibold cursor-pointer hover:bg-[#D32F2F] transition-all shadow-md shadow-[#B22222]/20"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {reviews.map((rev, idx) => (
              <motion.div
                id={`review-card-${rev.id}`}
                key={rev.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-8 bg-[#181818] rounded-[20px] border flex flex-col justify-between h-full relative shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                  rev.isCustom ? 'border-[#B22222]/40' : 'border-white/[0.08]'
                }`}
              >
                {/* Quotes Decor Icon */}
                <div className="absolute top-6 right-6 text-[#B22222]/15">
                  <Quote className="w-10 h-10 stroke-[1.5]" />
                </div>

                <div className="text-left">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-[#B22222] mb-6">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-4 h-4 ${
                          starIdx < rev.rating ? 'fill-[#B22222] text-[#B22222]' : 'text-white/10'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="font-sans text-white/90 text-sm sm:text-base font-normal leading-relaxed mb-6 italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Profile Bottom */}
                <div className="flex items-center gap-3.5 pt-6 border-t border-white/[0.08]">
                  <div className="w-11 h-11 rounded-full bg-[#B22222]/20 border border-[#B22222]/40 text-[#B22222] flex items-center justify-center font-serif font-bold text-base shrink-0">
                    {rev.avatarUrl ? rev.avatarUrl : <User className="w-5 h-5 text-[#B22222]" />}
                  </div>

                  <div className="text-left leading-none">
                    <span className="block font-serif text-sm sm:text-base font-bold text-white mb-1.5">
                      {rev.name}
                    </span>
                    <span className="text-xs text-[#A8A8A8] font-sans font-medium tracking-wide">
                      {rev.location} &bull; {rev.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
