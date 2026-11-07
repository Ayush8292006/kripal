import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  LogOut,
  Sparkles,
  Phone,
  CheckCircle2,
  Clock,
  Truck,
  Box,
  Search,
  Plus,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { formatINR, formatDate, isValidIndianPhone } from '../utils/formatters';
import { useToast } from '../components/common/Toast';
import { api } from '../services/api';
import { Order } from '../types';

export const AccountPage: React.FC = () => {
  const { user, isAuthenticated, login, logout, addresses, addAddress, removeAddress } = useAuthStore();
  const wishlist = useCartStore((state) => state.wishlist);
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'track'>('orders');

  // OTP Login states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Track order query
  const [trackingInput, setTrackingInput] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);

  // New Address form modal
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrLine1, setNewAddrLine1] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('');
  const [newAddrPin, setNewAddrPin] = useState('');

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem('kripal_orders');
      if (stored) return JSON.parse(stored);
    } catch {}
    // Default mock sample order
    return [
      {
        id: 'ORD-781923',
        orderNumber: 'KP-991204',
        createdAt: '2026-10-24T10:00:00Z',
        items: [
          {
            product: {
              id: 'kp-101',
              name: 'Celestial Dew Solitaire Ring',
              slug: 'celestial-dew-solitaire-ring',
              description: 'Pure 925 sterling silver ring',
              price: 1499,
              originalPrice: 2499,
              discountPercent: 40,
              category: 'rings',
              categoryName: 'Rings',
              metal: '925 Sterling Silver',
              gender: 'Women',
              rating: 4.9,
              reviewCount: 128,
              images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'],
              purity: '925 Sterling Silver',
              weightGrams: 3.2,
              inStock: true,
              stockCount: 10,
              details: {
                material: '925 Silver',
                plating: 'Rhodium',
                warranty: '6 Months',
                care: ['Wipe clean'],
              },
            },
            quantity: 1,
            selectedSize: '7',
          },
        ],
        subtotal: 1499,
        discount: 150,
        couponCode: 'KRIPAL150',
        giftWrap: true,
        giftMessage: 'Happy Anniversary love!',
        shipping: 0,
        total: 1398,
        shippingAddress: {
          id: 'addr-1',
          fullName: 'Pooja Varma',
          phone: '9978103393',
          addressLine1: 'B-402, Royal Palms, Racecourse Road',
          city: 'Rajkot',
          state: 'Gujarat',
          pincode: '360001',
          type: 'home',
        },
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        orderStatus: 'Shipped',
        trackingNumber: 'DEL-99214KR',
        estimatedDelivery: 'Tomorrow, 10:00 AM',
      },
    ];
  });

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidIndianPhone(phoneNumber)) {
      showToast({ title: 'Invalid Mobile Number', description: 'Enter a valid 10-digit Indian number.', type: 'error' });
      return;
    }
    const res = await api.sendOtp(phoneNumber);
    setOtpSent(true);
    showToast({ title: 'OTP Sent', description: res.message, type: 'info' });
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    const res = await api.verifyOtp(phoneNumber, otpCode);
    setIsVerifying(false);

    if (res.success) {
      login(phoneNumber, 'Valued Patron');
      showToast({ title: 'Welcome Back', description: 'Signed in successfully.', type: 'success' });
    } else {
      showToast({ title: 'Invalid OTP', description: 'Please enter 1234 (demo code).', type: 'error' });
    }
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === trackingInput.trim().toLowerCase() ||
        o.id.toLowerCase() === trackingInput.trim().toLowerCase()
    );
    if (found) {
      setTrackedOrder(found);
    } else {
      showToast({ title: 'Order Not Found', description: 'Check your order number and retry.', type: 'error' });
    }
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrName || !newAddrPhone || !newAddrLine1 || !newAddrPin) return;

    addAddress({
      fullName: newAddrName,
      phone: newAddrPhone,
      addressLine1: newAddrLine1,
      city: newAddrCity || 'Rajkot',
      state: newAddrState || 'Gujarat',
      pincode: newAddrPin,
      type: 'home',
    });

    setShowAddAddress(false);
    setNewAddrName('');
    setNewAddrPhone('');
    setNewAddrLine1('');
    setNewAddrPin('');
    showToast({ title: 'Address Saved', type: 'success' });
  };

  // Status timeline steps
  const timelineStages = ['Placed', 'Packed', 'Shipped', 'Delivered'];

  // If NOT logged in, show clean OTP Login screen
  if (!isAuthenticated) {
    return (
      <div className="bg-[#FAF2F4] min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-luxury-lg shadow-float p-8 border border-brand-border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-blush-light flex items-center justify-center text-blush-deep mx-auto mb-3">
              <Sparkles className="w-8 h-8" />
            </div>
            <h1 className="font-serif text-3xl font-medium text-brand-black">
              Sign In to Kripal Silver
            </h1>
            <p className="text-xs text-brand-gray mt-1">
              Enter your mobile number to view orders, track dispatches, and save favourites.
            </p>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  10-Digit Mobile Number
                </label>
                <div className="flex">
                  <span className="px-3 py-3 rounded-l-luxury bg-blush-light border border-r-0 border-brand-border text-xs font-semibold text-brand-dark">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="9978103393"
                    required
                    className="flex-1 text-xs p-3 rounded-r-luxury border border-brand-border focus:outline-none focus:border-blush-deep"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-black shadow-card"
              >
                Send Verification OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  Enter 4-Digit OTP (Demo: 1234)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="1 2 3 4"
                  required
                  className="w-full text-center text-xl tracking-[0.5em] font-mono p-3 rounded-luxury border border-brand-border focus:outline-none focus:border-blush-deep"
                />
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-black shadow-card"
              >
                {isVerifying ? 'Verifying...' : 'Verify & Continue'}
              </button>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-xs text-brand-gray hover:text-blush-deep underline text-center block pt-2"
              >
                Change mobile number
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-brand-border text-center text-[11px] text-brand-gray">
            🔒 Pure 925 Hallmarked Jewellery · 100% Encrypted Login
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF2F4]/40 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Greeting Bar */}
        <div className="bg-white p-6 rounded-luxury border border-brand-border shadow-xs mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-blush-light text-blush-deep flex items-center justify-center font-serif text-2xl font-bold">
              {user?.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-serif text-2xl font-medium text-brand-black">
                Namaste, {user?.name}
              </h1>
              <p className="text-xs text-brand-gray">+91 {user?.phone} · Patron Since 1998</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-luxury border border-brand-border text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 bg-white rounded-luxury border border-brand-border shadow-xs p-3 space-y-1">
            {[
              { id: 'orders', label: 'My Orders', icon: ShoppingBag, count: orders.length },
              { id: 'track', label: 'Track Consignment', icon: Truck },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: addresses.length },
              { id: 'profile', label: 'Profile Details', icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-dark text-white shadow-sm'
                      : 'text-brand-dark hover:bg-blush-light'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-blush-light text-brand-dark'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 border-t border-brand-border/60 mt-4 px-2">
              <Link
                to="/wishlist"
                className="flex items-center justify-between text-xs text-brand-gray hover:text-blush-deep py-2"
              >
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-brand-sale" />
                  <span>View Wishlist</span>
                </div>
                <span>({wishlist.length})</span>
              </Link>
            </div>
          </div>

          {/* Main Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-medium text-brand-black">Order History</h2>

                {orders.length === 0 ? (
                  <div className="bg-white p-12 rounded-luxury text-center border border-brand-border">
                    <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-brand-gray">You haven't placed any orders yet.</p>
                  </div>
                ) : (
                  orders.map((order) => {
                    const currentStageIdx = timelineStages.indexOf(order.orderStatus);

                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-luxury border border-brand-border shadow-xs p-6 space-y-5"
                      >
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row justify-between pb-4 border-b border-brand-border/60 gap-2">
                          <div>
                            <span className="font-serif text-lg font-bold text-brand-black">
                              Order #{order.orderNumber}
                            </span>
                            <p className="text-xs text-brand-gray">
                              Placed on {formatDate(order.createdAt)} · {formatINR(order.total)} ({order.paymentMethod})
                            </p>
                          </div>
                          <div className="text-right sm:text-right">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                              {order.orderStatus}
                            </span>
                            <p className="text-[11px] text-brand-gray mt-1">Est: {order.estimatedDelivery}</p>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-3">
                          {order.items.map((it, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={it.product.images[0]}
                                  alt=""
                                  className="w-12 h-12 rounded-lg object-cover bg-blush-light"
                                />
                                <div>
                                  <Link
                                    to={`/product/${it.product.slug}`}
                                    className="font-semibold text-brand-dark hover:text-blush-deep"
                                  >
                                    {it.product.name}
                                  </Link>
                                  <p className="text-brand-gray">Qty: {it.quantity}</p>
                                </div>
                              </div>
                              <span className="font-semibold">{formatINR(it.product.price * it.quantity)}</span>
                            </div>
                          ))}
                        </div>

                        {/* Status Timeline Progress Bar */}
                        <div className="pt-4 border-t border-brand-border/60">
                          <h4 className="text-xs font-semibold text-brand-dark mb-4">
                            Consignment Progress (Tracking #{order.trackingNumber})
                          </h4>
                          <div className="grid grid-cols-4 gap-2 text-center">
                            {timelineStages.map((stage, idx) => {
                              const isCompleted = idx <= currentStageIdx;
                              return (
                                <div key={stage} className="flex flex-col items-center">
                                  <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-all ${
                                      isCompleted
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gray-100 text-gray-400'
                                    }`}
                                  >
                                    {isCompleted ? '✓' : idx + 1}
                                  </div>
                                  <span
                                    className={`text-[11px] ${
                                      isCompleted ? 'font-semibold text-brand-dark' : 'text-gray-400'
                                    }`}
                                  >
                                    {stage}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Track Consignment Tab */}
            {activeTab === 'track' && (
              <div className="bg-white p-6 sm:p-8 rounded-luxury border border-brand-border space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-medium text-brand-black">
                    Live Consignment Tracker
                  </h2>
                  <p className="text-xs text-brand-gray mt-1">
                    Enter your Kripal Order Number (e.g. KP-991204) to monitor insured transit status.
                  </p>
                </div>

                <form onSubmit={handleTrackOrder} className="flex space-x-2 max-w-md">
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="KP-991204"
                    className="flex-1 text-xs p-3 rounded-luxury border border-brand-border font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand-dark text-white rounded-luxury text-xs font-semibold uppercase tracking-wider"
                  >
                    Track
                  </button>
                </form>

                {trackedOrder && (
                  <div className="p-6 rounded-luxury bg-blush-light border border-brand-border space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-serif text-lg font-bold">Order #{trackedOrder.orderNumber}</h4>
                        <p className="text-xs text-brand-gray">Tracking: {trackedOrder.trackingNumber}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                        {trackedOrder.orderStatus}
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <p><strong>Courier:</strong> BlueDart / Delhivery Insured Priority Air</p>
                      <p><strong>Destination:</strong> {trackedOrder.shippingAddress.city}, {trackedOrder.shippingAddress.state}</p>
                      <p><strong>Expected Arrival:</strong> {trackedOrder.estimatedDelivery}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Saved Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white p-6 sm:p-8 rounded-luxury border border-brand-border space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-brand-black">
                      Saved Delivery Addresses
                    </h2>
                    <p className="text-xs text-brand-gray mt-1">
                      Manage destination addresses for fast 1-click checkout.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    className="px-4 py-2 rounded-luxury bg-brand-dark text-white text-xs font-semibold flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New</span>
                  </button>
                </div>

                {showAddAddress && (
                  <form onSubmit={handleSaveAddress} className="p-5 rounded-luxury bg-blush-light space-y-3">
                    <h4 className="text-xs font-semibold text-brand-dark">New Address</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={newAddrName}
                        onChange={(e) => setNewAddrName(e.target.value)}
                        required
                        className="text-xs p-2.5 rounded-lg border border-brand-border bg-white"
                      />
                      <input
                        type="tel"
                        placeholder="10-digit Phone"
                        value={newAddrPhone}
                        onChange={(e) => setNewAddrPhone(e.target.value)}
                        required
                        className="text-xs p-2.5 rounded-lg border border-brand-border bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Flat / Building / Street"
                        value={newAddrLine1}
                        onChange={(e) => setNewAddrLine1(e.target.value)}
                        required
                        className="sm:col-span-2 text-xs p-2.5 rounded-lg border border-brand-border bg-white"
                      />
                      <input
                        type="text"
                        placeholder="PIN Code"
                        value={newAddrPin}
                        onChange={(e) => setNewAddrPin(e.target.value)}
                        required
                        className="text-xs p-2.5 rounded-lg border border-brand-border bg-white font-mono"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddrCity}
                        onChange={(e) => setNewAddrCity(e.target.value)}
                        className="text-xs p-2.5 rounded-lg border border-brand-border bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase"
                    >
                      Save Address
                    </button>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 rounded-luxury border border-brand-border relative bg-white space-y-1 text-xs"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-brand-dark">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] bg-blush-light text-blush-deep px-2 py-0.5 rounded font-bold">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-brand-gray">{addr.addressLine1}</p>
                      <p className="text-brand-gray">{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-brand-dark font-medium pt-1">Phone: +91 {addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white p-6 sm:p-8 rounded-luxury border border-brand-border space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-medium text-brand-black">Profile Information</h2>
                  <p className="text-xs text-brand-gray mt-1">Manage your account information.</p>
                </div>

                <div className="space-y-4 max-w-md text-xs">
                  <div>
                    <label className="block text-brand-gray mb-1">Registered Phone</label>
                    <input
                      type="text"
                      disabled
                      value={`+91 ${user?.phone}`}
                      className="w-full p-3 rounded-luxury bg-gray-50 border border-brand-border font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-gray mb-1">Patron Name</label>
                    <input
                      type="text"
                      value={user?.name}
                      readOnly
                      className="w-full p-3 rounded-luxury bg-gray-50 border border-brand-border"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-gray mb-1">Email</label>
                    <input
                      type="text"
                      value={user?.email || 'patron@kripalsilver.com'}
                      readOnly
                      className="w-full p-3 rounded-luxury bg-gray-50 border border-brand-border"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

