import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  Gift,
  ArrowRight,
  Tag,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatINR } from '../utils/formatters';
import { BRAND_CONFIG, AVAILABLE_COUPONS } from '../data/config';
import { useToast } from '../components/common/Toast';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
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

  if (items.length === 0) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 rounded-full bg-blush-light flex items-center justify-center text-blush-accent mx-auto mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-medium text-brand-black mb-2">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-brand-gray mb-8">
          Explore our handcrafted 925 sterling silver collections from Rajkot.
        </p>
        <Link
          to="/collections/all"
          className="px-8 py-3.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-black transition-all shadow-card"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-brand-black mb-8">
          Shopping Bag ({items.length} designs)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Items Table / List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Alert Bar */}
            <div className="p-4 rounded-luxury bg-[#FAF2F4] border border-brand-border">
              <div className="flex justify-between text-xs font-medium mb-1.5">
                {amountNeeded > 0 ? (
                  <span>
                    Add <strong className="text-blush-deep">{formatINR(amountNeeded)}</strong> more to unlock <strong>FREE Express Shipping</strong>
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Congratulations! You have qualified for FREE Express Shipping
                  </span>
                )}
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-blush-accent/40">
                <div
                  className="h-full bg-gradient-to-r from-blush-accent to-blush-deep rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* List */}
            <div className="divide-y divide-brand-border border border-brand-border rounded-luxury overflow-hidden bg-white">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg object-cover bg-blush-light shrink-0"
                    />
                    <div>
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-serif text-base font-semibold text-brand-black hover:text-blush-deep"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-brand-gray">{item.product.metal}</p>
                      {item.selectedSize && (
                        <p className="text-xs text-brand-gray">Size: {item.selectedSize}</p>
                      )}
                      <div className="flex items-baseline space-x-2 mt-1">
                        <span className="text-sm font-bold text-brand-dark">
                          {formatINR(item.product.price)}
                        </span>
                        {item.product.originalPrice > item.product.price && (
                          <span className="text-xs text-brand-gray line-through">
                            {formatINR(item.product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 self-end sm:self-center">
                    <div className="flex items-center border border-brand-border rounded-lg bg-blush-light/60">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                        className="px-2.5 py-1 text-sm font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                        className="px-2.5 py-1 text-sm font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-brand-dark min-w-[70px] text-right">
                      {formatINR(item.product.price * item.quantity)}
                    </span>

                    <button
                      onClick={() => removeItem(item.product.id, item.selectedSize)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Gift Wrap Card */}
            <div className="p-5 rounded-luxury bg-blush-light border border-blush-accent/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-blush-deep" />
                  <div>
                    <h4 className="text-xs font-semibold text-brand-dark">
                      Complimentary Luxury Packaging & Velvet Box
                    </h4>
                    <p className="text-[11px] text-brand-gray">
                      Add a personalized handwritten gift note (+₹49)
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isGiftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 accent-blush-deep cursor-pointer"
                />
              </div>
              {isGiftWrap && (
                <textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Write your loving heartfelt message here..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-lg border border-brand-border bg-white"
                />
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 p-6 rounded-luxury bg-[#FAF2F4]/70 border border-brand-border space-y-5">
            <h3 className="font-serif text-xl font-medium text-brand-black pb-3 border-b border-brand-border">
              Order Summary
            </h3>

            {/* Coupon Code Section */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                  <div>
                    <p className="font-semibold text-emerald-800">{appliedCoupon.code} Applied</p>
                    <p className="text-emerald-700">You saved {formatINR(discount)}</p>
                  </div>
                  <button onClick={removeCoupon} className="text-rose-600 hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Coupon Code"
                    className="flex-1 px-3 py-2 rounded-lg border border-brand-border text-xs uppercase"
                  />
                  <button
                    onClick={() => handleApplyCoupon(couponInput)}
                    className="px-4 py-2 bg-brand-dark text-white rounded-lg text-xs font-semibold uppercase"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-brand-dark pt-3 border-t border-brand-border">
              <div className="flex justify-between">
                <span className="text-brand-gray">Subtotal</span>
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
                  <span className="text-brand-gray">Gift Wrapping</span>
                  <span>+{formatINR(giftWrapFee)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-brand-gray">Insured Shipping</span>
                <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : formatINR(shipping)}</span>
              </div>
              <div className="pt-3 border-t border-brand-border flex justify-between text-base font-bold text-brand-black">
                <span>Total Amount</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-black shadow-card flex items-center justify-center space-x-2 shimmer-sweep"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-brand-gray pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified 925 Hallmark · Doorstep Replacement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

