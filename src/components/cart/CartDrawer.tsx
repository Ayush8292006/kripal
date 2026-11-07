import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  Gift,
  ArrowRight,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatINR } from '../../utils/formatters';
import { BRAND_CONFIG, AVAILABLE_COUPONS } from '../../data/config';
import { useToast } from '../common/Toast';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const isOpen = useCartStore((state) => state.isCartOpen);
  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);
  const isGiftWrap = useCartStore((state) => state.isGiftWrap);
  const setGiftWrap = useCartStore((state) => state.setGiftWrap);
  const giftMessage = useCartStore((state) => state.giftMessage);
  const setGiftMessage = useCartStore((state) => state.setGiftMessage);

  const subtotal = useCartStore((state) => state.getSubtotal());
  const discount = useCartStore((state) => state.getDiscount());
  const shipping = useCartStore((state) => state.getShippingFee());
  const giftWrapFee = useCartStore((state) => state.getGiftWrapFee());
  const total = useCartStore((state) => state.getTotal());

  const { showToast } = useToast();
  const [couponInput, setCouponInput] = useState('');
  const [showGiftMessageInput, setShowGiftMessageInput] = useState(false);

  // Free shipping progress calculations
  const threshold = BRAND_CONFIG.freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));
  const amountNeeded = Math.max(0, threshold - subtotal);

  const handleApplyCoupon = (code: string) => {
    const coupon = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      showToast({ title: 'Invalid Coupon', description: 'Please enter a valid coupon code.', type: 'error' });
      return;
    }
    if (subtotal < coupon.minOrderValue) {
      showToast({
        title: 'Coupon Requirement',
        description: `Add items worth ${formatINR(coupon.minOrderValue - subtotal)} more to use this code.`,
        type: 'info',
      });
      return;
    }
    applyCoupon(coupon);
    setCouponInput('');
    showToast({ title: 'Coupon Applied!', description: `Saved with ${coupon.code}`, type: 'success' });
  };

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="w-screen max-w-md bg-white shadow-float flex flex-col"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-brand-border flex items-center justify-between bg-white">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-brand-dark" />
                <h2 className="font-serif text-lg sm:text-xl font-medium text-brand-black">
                  Your Shopping Bag
                </h2>
                <span className="text-xs text-brand-gray">({items.length} items)</span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart drawer"
                className="p-1.5 rounded-full text-brand-gray hover:text-brand-dark hover:bg-blush-light transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#FAF2F4] px-5 py-3 border-b border-brand-border/60">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                {amountNeeded > 0 ? (
                  <span>
                    Add <strong className="text-blush-deep">{formatINR(amountNeeded)}</strong> more for <strong>FREE Insured Shipping</strong>
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    Unlocked! You have FREE Express Shipping
                  </span>
                )}
                <span className="text-[11px] text-brand-gray">{progressPercent}%</span>
              </div>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-blush-accent/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-blush-accent to-blush-deep rounded-full"
                />
              </div>
            </div>

            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                  <div className="w-16 h-16 rounded-full bg-blush-light flex items-center justify-center text-blush-accent mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-brand-black mb-1">
                    Your bag is empty
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-gray mb-6 max-w-xs">
                    Discover our handcrafted pure 925 sterling silver collections from Rajkot.
                  </p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigate('/collections/all');
                    }}
                    className="px-6 py-2.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold tracking-wider uppercase hover:bg-brand-black transition-all shadow-card"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex space-x-3 p-3 rounded-luxury bg-white border border-brand-border/70 shadow-xs"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-20 rounded-lg bg-[#FDF6F7] overflow-hidden shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link
                            to={`/product/${item.product.slug}`}
                            onClick={() => setCartOpen(false)}
                            className="font-serif text-sm font-medium text-brand-black line-clamp-1 hover:text-blush-deep"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.product.id, item.selectedSize)}
                            className="text-gray-400 hover:text-rose-500 ml-2"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.selectedSize && (
                          <span className="text-[11px] text-brand-gray">Size: {item.selectedSize}</span>
                        )}

                        <div className="flex items-baseline space-x-2 mt-0.5">
                          <span className="text-xs font-semibold text-brand-dark">
                            {formatINR(item.product.price)}
                          </span>
                          {item.product.originalPrice > item.product.price && (
                            <span className="text-[10px] text-brand-gray line-through">
                              {formatINR(item.product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity & Wishlist controls */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-brand-border rounded-md bg-blush-light/50">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)
                            }
                            className="p-1 hover:bg-white text-brand-dark transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-brand-dark">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)
                            }
                            className="p-1 hover:bg-white text-brand-dark transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            toggleWishlist(item.product);
                            removeItem(item.product.id, item.selectedSize);
                            showToast({
                              title: 'Saved for Later',
                              description: 'Moved to your wishlist.',
                              type: 'info',
                            });
                          }}
                          className="text-[11px] text-brand-gray hover:text-blush-deep underline"
                        >
                          Save for later
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Gift Wrap Add-on */}
              {items.length > 0 && (
                <div className="p-3.5 rounded-luxury bg-blush-light/60 border border-blush-accent/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Gift className="w-4 h-4 text-blush-deep" />
                      <span className="text-xs font-medium text-brand-dark">
                        Add Luxury Velvet Gift Wrap (+₹49)
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={isGiftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="w-4 h-4 accent-blush-deep rounded cursor-pointer"
                    />
                  </div>
                  {isGiftWrap && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-2"
                    >
                      <textarea
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Write a sweet handwritten message for your loved one..."
                        rows={2}
                        className="w-full text-xs p-2 rounded-lg border border-brand-border bg-white focus:outline-none focus:border-blush-deep resize-none"
                      />
                    </motion.div>
                  )}
                </div>
              )}

              {/* Coupon Code Box */}
              {items.length > 0 && (
                <div className="space-y-2">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-semibold">{appliedCoupon.code} Applied</p>
                          <p className="text-[10px] text-emerald-700">You saved {formatINR(discount)}</p>
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-rose-600 hover:underline font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          placeholder="Coupon code (e.g. KRIPAL150)"
                          className="w-full pl-9 pr-3 py-2 text-xs uppercase font-medium rounded-lg border border-brand-border focus:outline-none focus:border-blush-deep"
                        />
                      </div>
                      <button
                        onClick={() => handleApplyCoupon(couponInput)}
                        className="px-4 py-2 bg-brand-dark text-white text-xs font-semibold rounded-lg hover:bg-brand-black transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  {/* Available coupon suggestions */}
                  {!appliedCoupon && (
                    <div className="flex items-center space-x-2 pt-1 overflow-x-auto text-[11px]">
                      <span className="text-brand-gray text-[10px]">Try:</span>
                      {AVAILABLE_COUPONS.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => handleApplyCoupon(c.code)}
                          className="px-2 py-0.5 rounded bg-blush-light text-blush-deep font-semibold border border-blush-accent/40 hover:bg-blush-accent hover:text-white transition-colors"
                        >
                          {c.code}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-brand-border bg-[#FDF6F7] space-y-3">
                <div className="space-y-1.5 text-xs text-brand-dark">
                  <div className="flex justify-between">
                    <span className="text-brand-gray">Bag Subtotal</span>
                    <span>{formatINR(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Coupon Discount</span>
                      <span>-{formatINR(discount)}</span>
                    </div>
                  )}
                  {isGiftWrap && (
                    <div className="flex justify-between">
                      <span className="text-brand-gray">Gift Packaging</span>
                      <span>+{formatINR(giftWrapFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-brand-gray">Insured Shipping</span>
                    <span>{shipping === 0 ? <span className="text-emerald-700 font-semibold">FREE</span> : formatINR(shipping)}</span>
                  </div>
                  <div className="pt-2 border-t border-brand-border/60 flex justify-between text-sm sm:text-base font-bold text-brand-black">
                    <span>Total Pay</span>
                    <span>{formatINR(total)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold tracking-wider uppercase hover:bg-brand-black active:scale-98 transition-all flex items-center justify-center space-x-2 shadow-card shimmer-sweep"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-center text-brand-gray">
                  🔒 100% Secure Checkout · 925 Hallmark Certified · Doorstep Delivery
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

