import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Heart,
  ShoppingBag,
  Share2,
  ChevronDown,
  CheckCircle2,
  Tag,
  Clock,
  Ruler,
  X,
  Play,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, Review } from '../types';
import { formatINR, isValidIndianPincode } from '../utils/formatters';
import { useCartStore } from '../store/useCartStore';
import { useToast } from '../components/common/Toast';
import { ProductCard } from '../components/product/ProductCard';
import { AVAILABLE_COUPONS } from '../data/config';
import { api } from '../services/api';

export const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Pincode checker state
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{ serviceable: boolean; message: string } | null>(null);
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);

  // Accordions
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'rev-1',
      userName: 'Tanvi Jariwala',
      rating: 5,
      title: 'Exquisite polish, feels ultra-premium',
      comment: 'Ordered this for my sister’s engagement. The packaging, hallmarking card and shine exceeded expectations. Delivery to Surat took only 2 days!',
      date: '18 Oct 2026',
      verified: true,
    },
    {
      id: 'rev-2',
      userName: 'Aarav Parekh',
      rating: 5,
      title: 'Pure Rajkot Silver Craftsmanship',
      comment: 'Authentic 925 weight and crisp hallmarking. My wife loved the sparkle of the stone. Will definitely purchase again.',
      date: '2 Nov 2026',
      verified: true,
    },
  ]);

  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewName, setNewReviewName] = useState('');

  // Cart store
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const isInWishlist = useCartStore((state) => (product ? state.isInWishlist(product.id) : false));

  // Find product by slug
  useEffect(() => {
    const found = PRODUCTS.find((p) => p.slug === slug);
    if (found) {
      setProduct(found);
      setSelectedImgIndex(0);
      setSelectedSize(found.sizes?.[0] || '');
      setQuantity(1);
      setPincodeResult(null);

      // Save to recently viewed
      try {
        const recent: string[] = JSON.parse(localStorage.getItem('kripal_recent_viewed') || '[]');
        const updated = [found.id, ...recent.filter((id) => id !== found.id)].slice(0, 5);
        localStorage.setItem('kripal_recent_viewed', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-serif text-2xl font-medium">Product Not Found</h2>
        <Link to="/collections/all" className="text-blush-deep font-semibold mt-4 inline-block underline">
          Browse All Jewellery
        </Link>
      </div>
    );
  }

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  // Recently viewed products
  const recentIds: string[] = JSON.parse(localStorage.getItem('kripal_recent_viewed') || '[]');
  const recentlyViewed = PRODUCTS.filter(
    (p) => recentIds.includes(p.id) && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize);
    showToast({
      title: 'Added to Bag',
      description: `${product.name} (${quantity}) is now in your cart.`,
      type: 'success',
    });
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedSize);
    navigate('/checkout');
  };

  const handleCheckPincode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidIndianPincode(pincode)) {
      setPincodeResult({
        serviceable: false,
        message: 'Please enter a valid 6-digit Indian Pincode.',
      });
      return;
    }
    setIsCheckingPincode(true);
    const res = await api.checkPincodeDelivery(pincode);
    setPincodeResult(res);
    setIsCheckingPincode(false);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      userName: newReviewName,
      rating: newReviewRating,
      title: 'Verified Customer Review',
      comment: newReviewComment,
      date: 'Today',
      verified: true,
    };
    setReviews([newRev, ...reviews]);
    setNewReviewName('');
    setNewReviewComment('');
    showToast({ title: 'Thank you!', description: 'Your review was posted.', type: 'success' });
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="bg-white min-h-screen pb-20 md:pb-12">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-brand-border/60 py-3 bg-[#FAF2F4]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-brand-gray flex items-center space-x-2">
          <Link to="/" className="hover:text-blush-deep">Home</Link>
          <span>/</span>
          <Link to={`/collections/${product.category}`} className="hover:text-blush-deep capitalize">
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-brand-dark font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: Image Gallery with Zoom */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-luxury overflow-hidden bg-blush-light border-2 transition-all shrink-0 ${
                    selectedImgIndex === idx
                      ? 'border-blush-deep shadow-card'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}

              {/* Video Slot Trigger */}
              <button
                onClick={() => setShowVideoModal(true)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-luxury overflow-hidden bg-blush-light border-2 border-brand-border flex flex-col items-center justify-center text-brand-dark hover:border-blush-deep transition-all shrink-0 p-1 text-center"
              >
                <Play className="w-5 h-5 text-blush-deep mb-1 fill-blush-accent" />
                <span className="text-[10px] font-semibold">Video View</span>
              </button>
            </div>

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-square rounded-luxury overflow-hidden bg-[#FDF6F7] shadow-card group">
              <img
                src={product.images[selectedImgIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
              />

              {/* Hallmark Badge Overlay */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full silver-925-badge text-xs font-semibold text-brand-dark uppercase border border-silver-badge/60 shadow-xs flex items-center space-x-1.5">
                <span>✦</span>
                <span>925 Pure Silver Hallmarked</span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-brand-dark shadow-sm hover:bg-white active:scale-90 transition-all"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isInWishlist ? 'fill-brand-sale text-brand-sale' : 'text-brand-dark'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Right Column: Buying Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title & Category */}
            <div>
              <span className="text-xs uppercase tracking-widest text-blush-deep font-semibold">
                {product.metal} · {product.categoryName}
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl font-normal text-brand-black mt-1 mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                  <span className="font-semibold text-sm text-brand-dark">{product.rating}</span>
                </div>
                <span className="text-xs text-brand-gray">({product.reviewCount} reviews)</span>
                <span className="text-xs text-emerald-700 font-medium ml-2">✓ In Stock & Ready to Ship</span>
              </div>
            </div>

            {/* Price Block */}
            <div className="p-4 rounded-luxury bg-blush-light/80 border border-brand-border/80">
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-bold text-brand-black">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-brand-gray line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="px-2 py-0.5 rounded bg-brand-sale text-white text-xs font-bold uppercase">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-brand-gray mt-1">
                Inclusive of all taxes · Complimentary gift packaging included
              </p>
            </div>

            {/* Available Offers Box */}
            <div className="p-3.5 rounded-luxury bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-900">
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>Available Offers & Coupons</span>
              </div>
              <ul className="text-xs text-emerald-800 space-y-1">
                {AVAILABLE_COUPONS.slice(0, 2).map((c) => (
                  <li key={c.code} className="flex items-center justify-between">
                    <span>
                      Use code <strong className="font-mono text-emerald-950">{c.code}</strong> for {c.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selector for Rings/Kadas */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-brand-dark">
                    Select Size: <strong>{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-blush-deep font-semibold flex items-center hover:underline"
                  >
                    <Ruler className="w-3.5 h-3.5 mr-1" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-luxury text-xs font-semibold border transition-all ${
                        selectedSize === size
                          ? 'bg-brand-dark text-white border-brand-dark shadow-sm'
                          : 'bg-white text-brand-dark border-brand-border hover:border-blush-accent'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex space-x-3">
                {/* Quantity */}
                <div className="flex items-center border border-brand-border rounded-luxury bg-white px-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-2 text-brand-gray hover:text-brand-dark font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold text-brand-dark">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 py-2 text-brand-gray hover:text-brand-dark font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 rounded-luxury bg-white border-2 border-brand-dark text-brand-dark text-xs font-semibold tracking-wider uppercase hover:bg-blush-light active:scale-98 transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                {/* Buy Now */}
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold tracking-wider uppercase hover:bg-brand-black active:scale-98 transition-all flex items-center justify-center space-x-2 shadow-card shimmer-sweep"
                >
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="p-4 rounded-luxury bg-white border border-brand-border space-y-3">
              <div className="flex items-center space-x-2 text-xs font-semibold text-brand-dark">
                <Truck className="w-4 h-4 text-blush-deep" />
                <span>Delivery & Express Dispatch Check</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex space-x-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-2 rounded-lg border border-brand-border text-xs focus:outline-none focus:border-blush-deep font-mono"
                />
                <button
                  type="submit"
                  disabled={isCheckingPincode}
                  className="px-4 py-2 bg-brand-dark text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-brand-black"
                >
                  {isCheckingPincode ? 'Checking...' : 'Check'}
                </button>
              </form>

              {pincodeResult && (
                <div
                  className={`text-xs p-2 rounded-lg ${
                    pincodeResult.serviceable
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'bg-rose-50 text-rose-800'
                  }`}
                >
                  {pincodeResult.serviceable ? '✓ ' : '✕ '}
                  {pincodeResult.message}
                </div>
              )}
            </div>

            {/* Product Specifications & Details Accordion */}
            <div className="border-t border-brand-border pt-4 divide-y divide-brand-border/60">
              {/* Product Specifications */}
              <div>
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full py-3 flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-brand-black"
                >
                  <span>Product Specifications</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === 'details' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'details' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pb-4 text-xs text-brand-gray space-y-2"
                  >
                    <p><strong>Purity:</strong> {product.purity}</p>
                    <p><strong>Silver Weight:</strong> ~{product.weightGrams} grams</p>
                    {product.dimensions && <p><strong>Dimensions:</strong> {product.dimensions}</p>}
                    <p><strong>Plating:</strong> {product.details.plating}</p>
                    {product.details.stone && <p><strong>Stones:</strong> {product.details.stone}</p>}
                    <p className="mt-2 text-brand-black leading-relaxed">{product.description}</p>
                  </motion.div>
                )}
              </div>

              {/* Material & Jewelry Care */}
              <div>
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-3 flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-brand-black"
                >
                  <span>Material & Care Instructions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === 'care' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'care' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pb-4 text-xs text-brand-gray space-y-2"
                  >
                    <ul className="list-disc pl-4 space-y-1">
                      {product.details.care.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* Authenticity & Warranty */}
              <div>
                <button
                  onClick={() => toggleAccordion('warranty')}
                  className="w-full py-3 flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-brand-black"
                >
                  <span>6-Month Warranty & Hallmark Guarantee</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === 'warranty' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'warranty' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pb-4 text-xs text-brand-gray space-y-2"
                  >
                    <p>
                      Every Kripal Jewellers item comes with an official Laser Hallmark Certificate guaranteeing 925 sterling silver purity.
                    </p>
                    <p>
                      Includes 6 months of free replating, prong tightening, and ultrasonic gemstone cleaning at our Rajkot atelier.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews & Photo Rating Section */}
        <section className="mt-16 pt-12 border-t border-brand-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Reviews Summary */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="font-serif text-2xl font-medium text-brand-black">
                Customer Reviews
              </h3>
              <div className="flex items-center space-x-3">
                <span className="font-serif text-4xl font-bold text-brand-black">
                  {product.rating}
                </span>
                <div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-brand-gray">Based on {product.reviewCount} verified reviews</span>
                </div>
              </div>

              {/* Leave a review form */}
              <div className="p-4 rounded-luxury bg-blush-light border border-brand-border/80 space-y-3 mt-6">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-black">
                  Write a Review
                </h4>
                <form onSubmit={handleSubmitReview} className="space-y-3">
                  <input
                    type="text"
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    placeholder="Your Full Name"
                    required
                    className="w-full text-xs p-2.5 rounded-lg border border-brand-border bg-white"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-brand-gray">Rating:</span>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="text-xs p-1 rounded border border-brand-border bg-white"
                    >
                      <option value={5}>★★★★★ (5 Stars)</option>
                      <option value={4}>★★★★☆ (4 Stars)</option>
                      <option value={3}>★★★☆☆ (3 Stars)</option>
                    </select>
                  </div>
                  <textarea
                    rows={3}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Share your experience with the craftsmanship and shine..."
                    required
                    className="w-full text-xs p-2.5 rounded-lg border border-brand-border bg-white resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-black"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-8 space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-luxury bg-white border border-brand-border/80 shadow-xs space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm text-brand-dark">{rev.userName}</span>
                      {rev.verified && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium flex items-center">
                          <CheckCircle2 className="w-3 h-3 mr-0.5" />
                          Verified Patron
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-brand-gray">{rev.date}</span>
                  </div>

                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <h5 className="font-medium text-xs text-brand-black">{rev.title}</h5>
                  <p className="text-xs text-brand-gray leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-brand-border">
            <h3 className="font-serif text-2xl font-medium text-brand-black mb-6">
              You May Also Like
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="mt-16 pt-12 border-t border-brand-border">
            <h3 className="font-serif text-2xl font-medium text-brand-black mb-6">
              Recently Viewed
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {recentlyViewed.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Buy Bar on Mobile (<768px) */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-border p-3 flex items-center justify-between shadow-float">
        <div className="flex-1 min-w-0 pr-3">
          <p className="font-serif text-xs font-semibold text-brand-black truncate">
            {product.name}
          </p>
          <span className="text-sm font-bold text-brand-black">
            {formatINR(product.price)}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider shadow-sm"
          >
            Add to Bag
          </button>
        </div>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-luxury max-w-md w-full p-6 z-10 shadow-float"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-serif text-xl font-medium">Ring & Kada Size Guide</h4>
                <button onClick={() => setIsSizeGuideOpen(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <p className="text-xs text-brand-gray mb-4">
                Wrap a string or paper strip around your finger/wrist, mark where it overlaps, and measure the length against a ruler in millimeters.
              </p>
              <table className="w-full text-xs text-left border border-brand-border">
                <thead className="bg-blush-light font-semibold">
                  <tr>
                    <th className="p-2 border-b">Indian Size</th>
                    <th className="p-2 border-b">Inner Diameter</th>
                    <th className="p-2 border-b">Circumference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  <tr><td className="p-2">Size 6 / 16</td><td className="p-2">16.5 mm</td><td className="p-2">51.8 mm</td></tr>
                  <tr><td className="p-2">Size 7 / 18</td><td className="p-2">17.3 mm</td><td className="p-2">54.4 mm</td></tr>
                  <tr><td className="p-2">Size 8 / 20</td><td className="p-2">18.1 mm</td><td className="p-2">57.0 mm</td></tr>
                  <tr><td className="p-2">Size 9 / 22</td><td className="p-2">19.0 mm</td><td className="p-2">59.5 mm</td></tr>
                  <tr><td className="p-2">Adjustable</td><td className="p-2">Flexible band fits sizes 6 to 9</td><td className="p-2">Free Size</td></tr>
                </tbody>
              </table>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Preview Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVideoModal(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-black rounded-luxury max-w-lg w-full aspect-video z-10 overflow-hidden shadow-float flex items-center justify-center text-white"
            >
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-3 right-3 text-white z-20"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center p-6">
                <Sparkles className="w-12 h-12 text-blush-accent mx-auto mb-2 animate-pulse" />
                <h4 className="font-serif text-lg">360° Studio Craft Video</h4>
                <p className="text-xs text-gray-300 mt-1">High-definition preview of {product.name}</p>
                <p className="text-[11px] text-gray-400 mt-4">(Video simulation slot ready for mp4 / WebM stream)</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

