import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Plus, Minus, CreditCard, Check, Flame } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartSidebarProps) {
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [notes, setNotes] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cookingEta, setCookingEta] = useState(25);

  const subtotal = cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const taxRate = 0.0825;
  const tax = subtotal * taxRate;
  const deliveryFee = orderType === 'delivery' ? 4.99 : 0;
  const total = subtotal + tax + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setCookingEta(orderType === 'delivery' ? 40 : 25);
    setOrderPlaced(true);

    setTimeout(() => {
      onClearCart();
      setOrderPlaced(false);
      setNotes('');
      onClose();
    }, 4500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            id="cart-sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            id="cart-sidebar-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed top-0 right-0 h-screen w-full max-w-md bg-[#0A0A0A] border-l border-white/[0.08] z-50 flex flex-col justify-between shadow-2xl overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#121212]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#B22222]/20 border border-[#B22222]/40 flex items-center justify-center text-[#B22222]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">Your Order</h3>
                <span className="bg-[#B22222] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              </div>
              <button
                id="cart-close-btn"
                onClick={onClose}
                className="p-2 rounded-full bg-[#181818] border border-white/10 text-[#B7B7B7] hover:text-white transition-colors cursor-pointer"
                aria-label="Close Shopping Cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {orderPlaced ? (
                /* Success Checkout Layout */
                <motion.div
                  id="cart-order-success-stage"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center justify-center h-full space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-[#B22222]/20 border border-[#B22222]/50 flex items-center justify-center text-[#B22222]">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B22222] font-semibold block mb-1">
                      ORDER TRANSMITTED
                    </span>
                    <h4 className="font-serif text-2xl font-bold text-white mb-2">Order Confirmed!</h4>
                    <p className="font-sans text-xs text-[#B7B7B7] leading-relaxed max-w-xs mx-auto font-normal">
                      Your selections have been transmitted to our kitchen. Preparing fresh organic dishes for you.
                    </p>
                  </div>

                  {/* Countdown Timer Card */}
                  <div className="w-full max-w-xs p-5 rounded-[16px] bg-[#181818] border border-white/[0.08] text-center shadow-lg">
                    <span className="text-[10px] uppercase tracking-wider text-[#8E8E8E] block mb-1 font-sans font-medium">
                      ESTIMATED READY TIME
                    </span>
                    <span className="font-serif text-3xl font-bold text-[#B22222] block mb-1">
                      {cookingEta} Minutes
                    </span>
                    <span className="text-[10px] text-[#3FAE5A] font-sans font-semibold flex items-center justify-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#3FAE5A] animate-pulse"></span> Kitchen Active
                    </span>
                  </div>

                  <p className="text-[10px] text-[#8E8E8E] font-sans italic">
                    Closing automatically in a moment...
                  </p>
                </motion.div>
              ) : cartItems.length > 0 ? (
                /* Items view */
                <div className="space-y-6">
                  {/* Order Type Toggle */}
                  <div className="grid grid-cols-2 gap-2 p-1.5 rounded-[16px] bg-[#181818] border border-white/[0.08]">
                    <button
                      id="order-type-pickup"
                      onClick={() => setOrderType('pickup')}
                      className={`py-3 px-3 rounded-[12px] text-xs sm:text-sm font-sans font-semibold tracking-wider text-center cursor-pointer transition-all duration-200 ${
                        orderType === 'pickup'
                          ? 'bg-[#B22222] text-white shadow'
                          : 'text-[#C8C8C8] hover:text-white'
                      }`}
                    >
                      Pickup (25 min)
                    </button>
                    <button
                      id="order-type-delivery"
                      onClick={() => setOrderType('delivery')}
                      className={`py-3 px-3 rounded-[12px] text-xs sm:text-sm font-sans font-semibold tracking-wider text-center cursor-pointer transition-all duration-200 ${
                        orderType === 'delivery'
                          ? 'bg-[#B22222] text-white shadow'
                          : 'text-[#C8C8C8] hover:text-white'
                      }`}
                    >
                      Delivery (40 min)
                    </button>
                  </div>

                  {/* Items list */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        id={`cart-row-${item.menuItem.id}`}
                        key={item.menuItem.id}
                        className="flex items-center gap-4 py-3.5 border-b border-white/[0.08]"
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-14 rounded-[12px] overflow-hidden bg-[#121212] shrink-0 border border-white/10">
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-grow text-left leading-tight min-w-0">
                          <h4 className="text-white font-serif text-sm sm:text-base font-bold truncate">
                            {item.menuItem.name}
                          </h4>
                          <span className="text-[#B22222] text-sm font-bold font-serif">
                            ${(item.menuItem.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Counter Widget */}
                        <div className="flex items-center gap-2 bg-[#181818] rounded-[10px] p-1.5 border border-white/[0.08] shrink-0">
                          <button
                            id={`cart-decrease-${item.menuItem.id}`}
                            onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                            className="p-1.5 rounded-[6px] text-[#B7B7B7] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-white text-sm font-bold font-sans px-1">
                            {item.quantity}
                          </span>
                          <button
                            id={`cart-increase-${item.menuItem.id}`}
                            onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                            className="p-1.5 rounded-[6px] text-[#B7B7B7] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          id={`cart-remove-${item.menuItem.id}`}
                          onClick={() => onRemoveItem(item.menuItem.id)}
                          className="p-2 rounded-[8px] border border-red-500/10 text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Notes */}
                  <div className="text-left">
                    <label className="block text-xs uppercase font-semibold tracking-wider text-[#D0D0D0] font-sans mb-1.5">
                      Special Kitchen Instructions
                    </label>
                    <textarea
                      id="cart-notes"
                      rows={2}
                      placeholder="e.g. Extra sauce, allergy notes, gate codes..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#121212] border border-white/[0.08] focus:border-[#B22222] rounded-[14px] py-3 px-3.5 text-white text-sm focus:outline-none transition-all resize-none font-sans"
                    />
                  </div>
                </div>
              ) : (
                /* Empty Basket */
                <div className="flex flex-col items-center justify-center h-full py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-[#B22222]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-white mb-2">Your Basket is Empty</h4>
                    <p className="font-sans text-sm text-[#B7B7B7] max-w-[280px] mx-auto leading-relaxed font-normal mb-6">
                      Explore the Texas Taste menu to add wood-fired sizzlers, artisanal pizzas, and crafted mocktails.
                    </p>
                    <button
                      id="cart-empty-browse-menu-btn"
                      onClick={onClose}
                      className="px-6 py-3 rounded-[14px] bg-[#B22222] hover:bg-[#D32F2F] text-white font-sans text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-lg shadow-[#B22222]/30 cursor-pointer"
                    >
                      Browse Full Menu
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer and Checkout */}
            {cartItems.length > 0 && !orderPlaced && (
              <div className="p-6 bg-[#121212] border-t border-white/[0.08] space-y-4">
                <div className="space-y-2 text-xs sm:text-sm font-sans text-[#B7B7B7] text-left">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Texas Sales Tax (8.25%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="text-white">${deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-white/[0.08] pt-2 text-base font-serif font-bold text-[#B22222]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handleCheckout}>
                  <button
                    id="cart-checkout-submit"
                    type="submit"
                    className="w-full py-4.5 rounded-[18px] bg-[#B22222] hover:bg-[#D32F2F] text-white font-sans text-sm uppercase tracking-widest font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2.5 shadow-2xl shadow-[#B22222]/40 hover:scale-[1.02] active:scale-[0.98] border border-[#FF6B6B]/30"
                  >
                    <CreditCard className="w-5 h-5" />
                    Place Order &bull; ${total.toFixed(2)}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
