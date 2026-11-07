import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, ShieldCheck, Heart } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatINR } from '../../utils/formatters';
import { useToast } from '../common/Toast';
import { Link } from 'react-router-dom';

export const QuickViewModal: React.FC = () => {
  const product = useCartStore((state) => state.quickViewProduct);
  const setQuickView = useCartStore((state) => state.setQuickViewProduct);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const isInWishlist = useCartStore((state) => (product ? state.isInWishlist(product.id) : false));
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.sizes?.[0]);
  const [selectedImg, setSelectedImg] = useState<number>(0);

  if (!product) return null;

  const handleAdd = () => {
    addItem(product, 1, selectedSize);
    showToast({
      title: 'Added to Bag',
      description: `${product.name} is now in your shopping cart.`,
      type: 'success',
    });
    setQuickView(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickView(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-white rounded-luxury-lg shadow-float overflow-hidden z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickView(null)}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-brand-dark hover:bg-white shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Gallery */}
            <div className="bg-[#FDF6F7] p-6 flex flex-col items-center justify-center">
              <div className="aspect-square w-full max-w-sm rounded-luxury overflow-hidden bg-white shadow-card mb-4">
                <img
                  src={product.images[selectedImg] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(idx)}
                      className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImg === idx ? 'border-blush-deep' : 'border-transparent opacity-70'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-blush-deep">
                  {product.metal}
                </span>

                <h3 className="font-serif text-2xl font-medium text-brand-black mt-1 mb-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center text-amber-500 text-xs">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                    <span className="font-semibold text-brand-dark">{product.rating}</span>
                  </div>
                  <span className="text-xs text-brand-gray">({product.reviewCount} customer reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-3 mb-4">
                  <span className="text-2xl font-bold text-brand-black">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-brand-gray line-through">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                  {product.discountPercent > 0 && (
                    <span className="text-xs font-bold text-brand-sale">
                      {product.discountPercent}% OFF
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-brand-gray line-clamp-3 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Sizes if applicable */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-brand-dark">Select Size</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            selectedSize === size
                              ? 'border-brand-dark bg-brand-dark text-white'
                              : 'border-brand-border bg-white text-brand-dark hover:border-blush-accent'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-brand-border">
                <div className="flex space-x-3">
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 rounded-luxury bg-brand-dark text-white text-xs font-semibold tracking-wider uppercase hover:bg-brand-black active:scale-98 transition-all flex items-center justify-center space-x-2 shadow-card shimmer-sweep"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className="w-12 h-12 rounded-luxury border border-brand-border flex items-center justify-center text-brand-dark hover:bg-blush-light active:scale-95 transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isInWishlist ? 'fill-brand-sale text-brand-sale' : 'text-brand-dark'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-brand-gray pt-2">
                  <div className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blush-deep" />
                    <span>925 Hallmark Certified</span>
                  </div>
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={() => setQuickView(null)}
                    className="text-blush-deep font-semibold hover:underline"
                  >
                    Full Product Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

