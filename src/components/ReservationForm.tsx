import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, Phone, Mail, User, Sparkles, Check, Trash2, CalendarDays, Flame } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationFormProps {
  reservations: Reservation[];
  onAddReservation: (res: Reservation) => void;
  onCancelReservation: (id: string) => void;
}

export default function ReservationForm({
  reservations,
  onAddReservation,
  onCancelReservation
}: ReservationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [preference, setPreference] = useState<'indoor' | 'outdoor' | 'bar' | 'no-preference'>('no-preference');
  const [requests, setRequests] = useState('');

  const [bookingSuccess, setBookingSuccess] = useState<Reservation | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showActiveBookings, setShowActiveBookings] = useState(false);

  const [minDate, setMinDate] = useState('');
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !phone.trim() || !date || !time) {
      setErrorMsg('Please populate all required fields (Name, Phone, Date, Time).');
      return;
    }

    const newRes: Reservation = {
      id: `booking-${Date.now()}`,
      name: name.trim(),
      email: email.trim() || 'guest@example.com',
      phone: phone.trim(),
      date,
      time,
      guests,
      seatingPreference: preference,
      specialRequests: requests.trim(),
      createdAt: new Date().toLocaleDateString(),
      status: 'confirmed'
    };

    onAddReservation(newRes);
    setBookingSuccess(newRes);

    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTime('');
    setGuests(2);
    setPreference('no-preference');
    setRequests('');
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <section id="reservations-page" className="py-24 lg:py-32 bg-[#0A0A0A] relative min-h-screen border-b border-white/[0.08]">
      {/* Ambient Red Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#B22222]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B22222] font-semibold font-sans flex items-center justify-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-[#B22222]" />
            Guaranteed Table Reservation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Reserve Your Experience
          </h2>
          <div className="h-[2px] w-12 bg-[#B22222] mx-auto mb-6 rounded-full" />
          <p className="font-sans text-[#B7B7B7] text-sm sm:text-base font-normal leading-relaxed">
            Seating at Texas Taste is intimately paced. Reserve your table or private booth to enjoy our 100% organic vegetarian fine dining and wood-fired sizzlers.
          </p>
        </div>

        {/* View Switcher */}
        {reservations.length > 0 && (
          <div className="flex justify-center gap-4 mb-12">
            <button
              id="reserve-tab-new"
              onClick={() => {
                setShowActiveBookings(false);
                setBookingSuccess(null);
              }}
              className={`px-6 py-3 rounded-[16px] font-sans text-xs uppercase font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                !showActiveBookings && !bookingSuccess
                  ? 'bg-[#B22222] text-white shadow-lg shadow-[#B22222]/20'
                  : 'bg-[#181818] text-[#B7B7B7] hover:text-white border border-white/[0.08]'
              }`}
            >
              Book New Table
            </button>
            <button
              id="reserve-tab-active"
              onClick={() => {
                setShowActiveBookings(true);
                setBookingSuccess(null);
              }}
              className={`px-6 py-3 rounded-[16px] font-sans text-xs uppercase font-semibold tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                showActiveBookings
                  ? 'bg-[#B22222] text-white shadow-lg shadow-[#B22222]/20'
                  : 'bg-[#181818] text-[#B7B7B7] hover:text-white border border-white/[0.08]'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              My Bookings ({reservations.length})
            </button>
          </div>
        )}

        {/* Dynamic Display Content */}
        <AnimatePresence mode="wait">
          {bookingSuccess ? (
            /* Crimson Confirmed Ticket */
            <motion.div
              id="reservation-ticket-success"
              key="ticket"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl mx-auto rounded-[20px] overflow-hidden border border-[#B22222]/50 bg-[#181818] p-1 shadow-2xl relative"
            >
              <div className="border border-dashed border-[#B22222]/40 rounded-[18px] p-8 text-center bg-[#121212] relative">
                <div className="w-16 h-16 rounded-[16px] bg-[#B22222]/15 border border-[#B22222]/40 flex items-center justify-center text-[#B22222] mx-auto mb-6">
                  <Sparkles className="w-8 h-8" />
                </div>

                <span className="text-[10px] tracking-[0.2em] text-[#B22222] font-bold font-sans uppercase block mb-1">
                  RESERVATION CONFIRMED &bull; TEXAS TASTE
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mb-6">Table Pass</h3>

                <div className="h-px bg-white/[0.08] w-full mb-8" />

                <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-left mb-8 max-w-sm mx-auto">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#8E8E8E] font-sans mb-1">Guest Name</span>
                    <span className="text-white text-sm font-serif font-bold">{bookingSuccess.name}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#8E8E8E] font-sans mb-1">Guests</span>
                    <span className="text-[#B22222] text-sm font-serif font-bold">{bookingSuccess.guests} People</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#8E8E8E] font-sans mb-1">Date</span>
                    <span className="text-white text-sm font-serif font-bold">{bookingSuccess.date}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#8E8E8E] font-sans mb-1">Time</span>
                    <span className="text-white text-sm font-serif font-bold">{bookingSuccess.time} PM</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#8E8E8E] font-sans mb-1">Seating</span>
                    <span className="text-white text-xs font-sans uppercase tracking-wider bg-[#181818] border border-white/10 px-2.5 py-1 rounded-full inline-block">
                      {bookingSuccess.seatingPreference === 'no-preference' ? 'Standard Seating' : bookingSuccess.seatingPreference}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#8E8E8E] font-sans mb-1">Pass ID</span>
                    <span className="text-[#B22222] text-xs font-mono font-semibold">{bookingSuccess.id}</span>
                  </div>
                </div>

                <div className="h-px bg-white/[0.08] w-full mb-8" />

                <p className="font-sans text-xs text-[#B7B7B7] leading-relaxed mb-8 max-w-xs mx-auto">
                  A verification SMS has been sent to <span className="text-white font-medium">{bookingSuccess.phone}</span>. Please present this pass upon arrival.
                </p>

                <div className="flex gap-4 justify-center">
                  <button
                    id="print-ticket-btn"
                    onClick={handlePrint}
                    className="px-6 py-3.5 rounded-[16px] bg-[#B22222] hover:bg-[#D32F2F] text-white font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-lg shadow-[#B22222]/20"
                  >
                    Print Pass
                  </button>
                  <button
                    id="dismiss-ticket-btn"
                    onClick={() => setBookingSuccess(null)}
                    className="px-5 py-3.5 rounded-[16px] border border-white/20 text-white hover:bg-white/10 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Done
                  </button>
                </div>

              </div>
            </motion.div>
          ) : showActiveBookings ? (
            /* Active Reservations List */
            <motion.div
              id="active-reservations-dashboard"
              key="active-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reservations.map((res) => (
                  <div
                    id={`res-card-${res.id}`}
                    key={res.id}
                    className="p-6 rounded-[20px] bg-[#181818] border border-white/[0.08] flex flex-col justify-between shadow-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full bg-[#B22222]/15 border border-[#B22222]/30 text-[#B22222] text-[10px] uppercase font-bold tracking-wider font-sans">
                          {res.id}
                        </span>
                        <span className="flex h-2 w-2 rounded-full bg-[#3FAE5A] animate-pulse" />
                      </div>

                      <h4 className="font-serif font-bold text-xl text-white mb-4 text-left">
                        Table for {res.guests} ({res.seatingPreference === 'no-preference' ? 'Standard' : res.seatingPreference})
                      </h4>

                      <div className="space-y-2.5 text-xs text-[#B7B7B7] font-sans mb-6 text-left">
                        <p className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#B22222]" />
                          <span>Guest: <strong className="text-white">{res.name}</strong></span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#B22222]" />
                          <span>Date/Time: <strong className="text-white">{res.date} @ {res.time} PM</strong></span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#B22222]" />
                          <span>Phone: <strong className="text-white">{res.phone}</strong></span>
                        </p>
                        {res.specialRequests && (
                          <p className="text-[#8E8E8E] italic">
                            Requests: "{res.specialRequests}"
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      id={`cancel-res-btn-${res.id}`}
                      onClick={() => onCancelReservation(res.id)}
                      className="w-full py-3 rounded-[14px] border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-[#8E8E8E] hover:text-red-400 text-xs font-semibold tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Cancel Reservation
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Booking Form */
            <motion.div
              id="reservation-booking-form-wrap"
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-3xl mx-auto rounded-[20px] bg-[#181818] border border-white/[0.08] p-8 sm:p-12 relative shadow-2xl"
            >
              {errorMsg && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-[12px] text-xs text-red-400 font-sans mb-6 text-left">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                  {/* Name */}
                  <div>
                    <label className="block text-xs sm:text-sm uppercase font-semibold tracking-wider text-[#D0D0D0] font-sans mb-2 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-[#B22222]" /> Full Name <span className="text-[#B22222]">*</span>
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      placeholder="e.g. Samuel Houston"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#121212] border border-white/[0.08] focus:border-[#B22222] rounded-[16px] py-3.5 px-4 text-white text-sm sm:text-base focus:outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs sm:text-sm uppercase font-semibold tracking-wider text-[#D0D0D0] font-sans mb-2 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-[#B22222]" /> Phone Number <span className="text-[#B22222]">*</span>
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      placeholder="e.g. +1 (512) 555-0199"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#121212] border border-white/[0.08] focus:border-[#B22222] rounded-[16px] py-3.5 px-4 text-white text-sm sm:text-base focus:outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs sm:text-sm uppercase font-semibold tracking-wider text-[#D0D0D0] font-sans mb-2 flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-[#B22222]" /> Email Address
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      placeholder="e.g. sam@houston.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#121212] border border-white/[0.08] focus:border-[#B22222] rounded-[16px] py-3.5 px-4 text-white text-sm sm:text-base focus:outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-xs sm:text-sm uppercase font-semibold tracking-wider text-[#D0D0D0] font-sans mb-2 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#B22222]" /> Guests Count <span className="text-[#B22222]">*</span>
                    </label>
                    <select
                      id="booking-guests"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#121212] border border-white/[0.08] focus:border-[#B22222] rounded-[16px] py-3.5 px-4 text-white text-sm sm:text-base focus:outline-none transition-all font-sans"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num} className="bg-[#181818] text-white">
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs sm:text-sm uppercase font-semibold tracking-wider text-[#D0D0D0] font-sans mb-2 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#B22222]" /> Date <span className="text-[#B22222]">*</span>
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      required
                      min={minDate}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#121212] border border-white/[0.08] focus:border-[#B22222] rounded-[16px] py-3.5 px-4 text-white text-sm sm:text-base focus:outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-xs sm:text-sm uppercase font-semibold tracking-wider text-[#D0D0D0] font-sans mb-2 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#B22222]" /> Preferred Time <span className="text-[#B22222]">*</span>
                    </label>
                    <select
                      id="booking-time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#121212] border border-white/[0.08] focus:border-[#B22222] rounded-[16px] py-3.5 px-4 text-white text-sm sm:text-base focus:outline-none transition-all font-sans"
                    >
                      <option value="" className="bg-[#181818] text-[#8E8E8E]">Select hour</option>
                      <option value="5:00" className="bg-[#181818] text-white">5:00 PM</option>
                      <option value="5:30" className="bg-[#181818] text-white">5:30 PM</option>
                      <option value="6:00" className="bg-[#181818] text-white">6:00 PM</option>
                      <option value="6:30" className="bg-[#181818] text-white">6:30 PM</option>
                      <option value="7:00" className="bg-[#181818] text-white">7:00 PM</option>
                      <option value="7:30" className="bg-[#181818] text-white">7:30 PM</option>
                      <option value="8:00" className="bg-[#181818] text-white">8:00 PM</option>
                      <option value="8:30" className="bg-[#181818] text-white">8:30 PM</option>
                      <option value="9:00" className="bg-[#181818] text-white">9:00 PM</option>
                      <option value="9:30" className="bg-[#181818] text-white">9:30 PM</option>
                    </select>
                  </div>
                </div>

                {/* Seating Preference */}
                <div className="text-left">
                  <label className="block text-xs sm:text-sm uppercase font-semibold tracking-wider text-[#D0D0D0] font-sans mb-3">
                    Seating Preference
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'no-preference', label: 'No Preference' },
                      { id: 'indoor', label: 'Main Dining' },
                      { id: 'outdoor', label: 'Oak Terrace' },
                      { id: 'bar', label: 'Cocktail Bar' }
                    ].map((pref) => (
                      <button
                        id={`pref-btn-${pref.id}`}
                        key={pref.id}
                        type="button"
                        onClick={() => setPreference(pref.id as any)}
                        className={`py-3.5 px-4 rounded-[16px] text-xs sm:text-sm font-sans font-semibold tracking-wider text-center border cursor-pointer transition-all duration-200 ${
                          preference === pref.id
                            ? 'bg-[#B22222] border-[#B22222] text-white shadow-md'
                            : 'bg-[#121212] border-white/[0.08] text-[#D0D0D0] hover:text-white hover:border-white/20'
                        }`}
                      >
                        {pref.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div className="text-left">
                  <label className="block text-xs sm:text-sm uppercase font-semibold tracking-wider text-[#D0D0D0] font-sans mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    id="booking-requests"
                    rows={3}
                    placeholder="e.g. Anniversary celebration, booth preference, dietary notes..."
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    className="w-full bg-[#121212] border border-white/[0.08] focus:border-[#B22222] rounded-[16px] py-3.5 px-4 text-white text-sm sm:text-base focus:outline-none transition-all resize-none font-sans"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    id="reservation-submit"
                    type="submit"
                    className="w-full py-4 rounded-[16px] bg-[#B22222] hover:bg-[#D32F2F] text-white font-sans font-semibold text-xs sm:text-sm uppercase tracking-widest cursor-pointer transition-all duration-300 shadow-xl shadow-[#B22222]/20 hover:scale-[1.01]"
                  >
                    Confirm Table Reservation
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
