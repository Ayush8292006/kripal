import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { formatINR, isValidIndianPhone, isValidIndianPincode } from '../utils/formatters';
import { Address, Order } from '../types';
import { api } from '../services/api';
import { BRAND_CONFIG } from '../data/config';
import { useToast } from '../components/common/Toast';

type CheckoutStep = 'address' | 'delivery' | 'payment' | 'review';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const discount = useCartStore((state) => state.getDiscount());
  const shipping = useCartStore((state) => state.getShippingFee());
  const giftWrapFee = useCartStore((state) => state.getGiftWrapFee());
  const total = useCartStore((state) => state.getTotal());
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const isGiftWrap = useCartStore((state) => state.isGiftWrap);
  const giftMessage = useCartStore((state) => state.giftMessage);
  const clearCart = useCartStore((state) => state.clearCart);

  const addOrderToAuth = useAuthStore((state) => state.addOrder);

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Address state
  const [fullName, setFullName] = useState('Rahul Varma');
  const [phone, setPhone] = useState('9978103393');
  const [addressLine1, setAddressLine1] = useState('Flat 401, Sterling Heights, Kalawad Road');
  const [addressLine2, setAddressLine2] = useState('Near Crystal Mall');
  const [city, setCity] = useState('Rajkot');
  const [state, setState] = useState('Gujarat');
  const [pincode, setPincode] = useState('360005');

  // Delivery state
  const [deliverySpeed, setDeliverySpeed] = useState<'express' | 'standard'>('express');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('patron@okaxis');

  // Pincode auto-fill simulation
  const handlePincodeChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 6);
    setPincode(cleaned);
    if (cleaned.startsWith('360')) {
      setCity('Rajkot');
      setState('Gujarat');
    } else if (cleaned.startsWith('380')) {
      setCity('Ahmedabad');
      setState('Gujarat');
    } else if (cleaned.startsWith('400')) {
      setCity('Mumbai');
      setState('Maharashtra');
    } else if (cleaned.startsWith('110')) {
      setCity('New Delhi');
      setState('Delhi');
    }
  };

  const handleNextStep = () => {
    if (currentStep === 'address') {
      if (!fullName.trim() || !isValidIndianPhone(phone) || !addressLine1.trim() || !isValidIndianPincode(pincode)) {
        showToast({
          title: 'Incomplete Address',
          description: 'Please ensure valid name, 10-digit phone, and 6-digit pincode.',
          type: 'error',
        });
        return;
      }
      setCurrentStep('delivery');
    } else if (currentStep === 'delivery') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('review');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Place Order Execution
  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    const shippingAddress: Address = {
      id: 'addr-' + Date.now(),
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      type: 'home',
    };

    try {
      const order = await api.createOrder({
        items,
        subtotal,
        discount,
        couponCode: appliedCoupon?.code,
        giftWrap: isGiftWrap,
        giftMessage,
        shipping,
        total,
        shippingAddress,
        paymentMethod,
      });

      addOrderToAuth(order);
      setCreatedOrder(order);
      clearCart();

      // Trigger Confetti Celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E8B4BC', '#B98A95', '#2B2B2B', '#E6E6E6'],
      });
    } catch (err) {
      showToast({ title: 'Order Failed', description: 'Please try again.', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  if (createdOrder) {
    return (
      <div className="bg-[#FAF2F4] min-h-screen py-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-xl w-full bg-white rounded-luxury-lg shadow-float p-8 sm:p-12 text-center border border-brand-border"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-widest text-blush-deep">
            Payment Confirmed
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-brand-black mt-1 mb-2">
            Thank You For Your Order!
          </h1>

          <p className="text-xs sm:text-sm text-brand-gray mb-6">
            Your handcrafted 925 sterling silver is being prepared with hallmark laser seal at our Rajkot atelier.
          </p>

          <div className="p-4 rounded-luxury bg-blush-light text-left text-xs space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-brand-gray">Order Reference:</span>
              <strong className="text-brand-dark font-mono">{createdOrder.orderNumber}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-gray">Estimated Delivery:</span>
              <strong>{createdOrder.estimatedDelivery}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-gray">Total Paid:</span>
              <strong>{formatINR(createdOrder.total)} ({createdOrder.paymentMethod})</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-gray">Dispatch To:</span>
              <span className="truncate max-w-[200px]">{createdOrder.shippingAddress.city}, {createdOrder.shippingAddress.state}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/account"
              className="flex-1 py-3.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-black shadow-card"
            >
              Track Order
            </Link>
            <Link
              to="/"
              className="flex-1 py-3.5 rounded-luxury border border-brand-border text-brand-dark text-xs font-semibold uppercase tracking-wider hover:bg-blush-light"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-serif text-2xl font-medium">Your bag is empty</h2>
        <Link to="/collections/all" className="text-blush-deep font-semibold mt-4 inline-block underline">
          Discover Jewellery
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF2F4]/50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Step Header */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-brand-border -z-0" />
            {[
              { id: 'address', label: '1. Address' },
              { id: 'delivery', label: '2. Delivery' },
              { id: 'payment', label: '3. Payment' },
              { id: 'review', label: '4. Review' },
            ].map((st) => {
              const isActive = currentStep === st.id;
              const isPassed =
                (st.id === 'address' && currentStep !== 'address') ||
                (st.id === 'delivery' && (currentStep === 'payment' || currentStep === 'review')) ||
                (st.id === 'payment' && currentStep === 'review');

              return (
                <div key={st.id} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-dark text-white shadow-card scale-110'
                        : isPassed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-brand-gray border border-brand-border'
                    }`}
                  >
                    {isPassed ? '✓' : st.label.charAt(0)}
                  </div>
                  <span className="text-[11px] font-semibold text-brand-dark mt-1 hidden sm:block">
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Checkout Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Form Step Area */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-luxury shadow-card border border-brand-border">
            {/* Step 1: Address */}
            {currentStep === 'address' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-medium text-brand-black">
                    Shipping & Delivery Address
                  </h2>
                  <p className="text-xs text-brand-gray mt-1">
                    Enter your destination for tamper-proof, insured courier delivery.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="e.g. Pooja Varma"
                      className="w-full text-xs p-3 rounded-luxury border border-brand-border focus:outline-none focus:border-blush-deep"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      10-Digit Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      required
                      placeholder="9978103393"
                      className="w-full text-xs p-3 rounded-luxury border border-brand-border focus:outline-none focus:border-blush-deep"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      Street Address / Flat / Building *
                    </label>
                    <input
                      type="text"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      required
                      placeholder="Flat No, Wing, Apartment name"
                      className="w-full text-xs p-3 rounded-luxury border border-brand-border focus:outline-none focus:border-blush-deep"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      Landmark / Area (Optional)
                    </label>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="Near Temple / Circle / Metro station"
                      className="w-full text-xs p-3 rounded-luxury border border-brand-border focus:outline-none focus:border-blush-deep"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      6-Digit PIN Code * (Auto-fills City/State)
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      required
                      placeholder="360003"
                      className="w-full text-xs p-3 rounded-luxury border border-brand-border font-mono focus:outline-none focus:border-blush-deep"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      placeholder="Rajkot"
                      className="w-full text-xs p-3 rounded-luxury border border-brand-border focus:outline-none focus:border-blush-deep"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      placeholder="Gujarat"
                      className="w-full text-xs p-3 rounded-luxury border border-brand-border focus:outline-none focus:border-blush-deep"
                    />
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-black shadow-card flex items-center justify-center space-x-2"
                >
                  <span>Continue to Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Delivery Speed */}
            {currentStep === 'delivery' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-medium text-brand-black">
                    Choose Delivery Mode
                  </h2>
                  <p className="text-xs text-brand-gray mt-1">
                    All orders are dispatched in secured, tamper-evident velvet boxes.
                  </p>
                </div>

                <div className="space-y-4">
                  <label
                    onClick={() => setDeliverySpeed('express')}
                    className={`flex items-start justify-between p-4 rounded-luxury border cursor-pointer transition-all ${
                      deliverySpeed === 'express'
                        ? 'border-brand-dark bg-blush-light/60 shadow-xs'
                        : 'border-brand-border bg-white'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Truck className="w-5 h-5 text-blush-deep shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold text-brand-dark">
                          Express Insured Air Dispatch (1-3 Days)
                        </h4>
                        <p className="text-[11px] text-brand-gray mt-0.5">
                          Priority flight courier with real-time SMS tracking & OTP verification.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">FREE</span>
                  </label>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentStep('address')}
                    className="px-6 py-3 rounded-luxury border border-brand-border text-xs font-semibold uppercase text-brand-dark hover:bg-blush-light"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-black shadow-card flex items-center space-x-2"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 'payment' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-medium text-brand-black">
                    Secure Payment Options
                  </h2>
                  <p className="text-xs text-brand-gray mt-1">
                    Encrypted with 256-bit bank grade security. Razorpay integration ready.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'UPI', label: 'Instant UPI (Google Pay / PhonePe / Paytm / BHIM)', desc: 'Zero transaction charges' },
                    { id: 'Card', label: 'Credit or Debit Card', desc: 'Visa, Mastercard, RuPay, Amex' },
                    { id: 'NetBanking', label: 'NetBanking', desc: 'All 50+ major Indian banks' },
                    { id: 'COD', label: 'Cash on Delivery (COD)', desc: 'Pay cash upon doorstep verification' },
                  ].map((pm) => (
                    <label
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`flex items-start justify-between p-4 rounded-luxury border cursor-pointer transition-all ${
                        paymentMethod === pm.id
                          ? 'border-brand-dark bg-blush-light/60 shadow-xs'
                          : 'border-brand-border bg-white hover:border-blush-accent'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === pm.id}
                          onChange={() => setPaymentMethod(pm.id as any)}
                          className="w-4 h-4 accent-brand-dark cursor-pointer"
                        />
                        <div>
                          <h4 className="text-xs font-semibold text-brand-dark">{pm.label}</h4>
                          <p className="text-[11px] text-brand-gray">{pm.desc}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="p-4 rounded-luxury bg-white border border-brand-border space-y-2">
                    <label className="block text-xs font-semibold text-brand-dark">
                      Enter UPI VPA ID
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="mobile@upi or username@okhdfcbank"
                      className="w-full text-xs p-3 rounded-lg border border-brand-border focus:outline-none focus:border-blush-deep font-mono"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentStep('delivery')}
                    className="px-6 py-3 rounded-luxury border border-brand-border text-xs font-semibold uppercase text-brand-dark hover:bg-blush-light"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-black shadow-card flex items-center space-x-2"
                  >
                    <span>Review Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Final Review */}
            {currentStep === 'review' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-medium text-brand-black">
                    Final Order Review
                  </h2>
                  <p className="text-xs text-brand-gray mt-1">
                    Please verify your shipping address and selected jewellery items.
                  </p>
                </div>

                {/* Review Address Card */}
                <div className="p-4 rounded-luxury bg-blush-light border border-brand-border text-xs space-y-1">
                  <div className="flex justify-between font-semibold text-brand-dark">
                    <span>Deliver To:</span>
                    <button
                      onClick={() => setCurrentStep('address')}
                      className="text-blush-deep underline text-[11px]"
                    >
                      Change
                    </button>
                  </div>
                  <p className="font-bold">{fullName} ({phone})</p>
                  <p>{addressLine1}, {addressLine2}</p>
                  <p>{city}, {state} - {pincode}</p>
                  <p className="text-brand-gray pt-1">Payment Method: <strong>{paymentMethod}</strong></p>
                </div>

                {/* Items Summary list */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex items-center justify-between text-xs pb-3 border-b border-brand-border/60"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-blush-light"
                        />
                        <div>
                          <p className="font-semibold text-brand-dark">{item.product.name}</p>
                          <span className="text-brand-gray">Qty: {item.quantity}</span>
                          {item.selectedSize && <span className="text-brand-gray ml-2">Size: {item.selectedSize}</span>}
                        </div>
                      </div>
                      <span className="font-semibold text-brand-dark">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-4 pt-2">
                  <button
                    onClick={() => setCurrentStep('payment')}
                    className="px-6 py-3 rounded-luxury border border-brand-border text-xs font-semibold uppercase text-brand-dark hover:bg-blush-light"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 py-4 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-black shadow-card flex items-center justify-center space-x-2 shimmer-sweep disabled:opacity-50"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{isProcessing ? 'Securing Order...' : `Pay & Place Order (${formatINR(total)})`}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4 p-6 rounded-luxury bg-white border border-brand-border shadow-card space-y-4">
            <h3 className="font-serif text-lg font-medium text-brand-black pb-3 border-b border-brand-border">
              Order Breakdown
            </h3>

            <div className="space-y-2 text-xs text-brand-dark">
              <div className="flex justify-between">
                <span className="text-brand-gray">Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              {isGiftWrap && (
                <div className="flex justify-between">
                  <span className="text-brand-gray">Gift Wrap</span>
                  <span>+{formatINR(giftWrapFee)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-brand-gray">Delivery</span>
                <span className="text-emerald-700 font-semibold">FREE</span>
              </div>
              <div className="pt-3 border-t border-brand-border flex justify-between text-base font-bold text-brand-black">
                <span>Total Amount</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border space-y-2 text-[11px] text-brand-gray">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Hallmarked 925 Sterling Silver</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Complimentary Insured Delivery Across India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bank-grade 256-bit encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

