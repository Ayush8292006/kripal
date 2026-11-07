import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../../types';
import { formatINR } from '../../utils/formatters';
import { useCartStore } from '../../store/useCartStore';
import { useToast } from '../common/Toast';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const isInWishlist = useCartStore((state) => state.isInWishlist(product.id));
  const setQuickView = useCartStore((state) => state.setQuickViewProduct);
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.sizes?.[0]);
    showToast({
      title: 'Added to Bag',
      description: `${product.name} is now in your shopping cart.`,
      type: 'success',
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast({
      title: isInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
      description: product.name,
      type: isInWishlist ? 'info' : 'success',
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickView(product);
  };

  const hasMultipleImages = product.images.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (hasMultipleImages) setActiveImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (hasMultipleImages) setActiveImageIndex(0);
      }}
      className="group relative flex flex-col bg-white rounded-luxury overflow-hidden border border-brand-border/70 hover:border-blush-accent/60 shadow-sm hover:shadow-luxury transition-all duration-300"
    >
      {/* Product Image Square Container with Soft Blush Bg */}
      <Link
        to={`/product/${product.slug}`}
        className="relative aspect-square w-full bg-[#FDF6F7] overflow-hidden block"
      >
        {/* Main Image */}
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
        />

        {/* Shimmer metallic reflection badge for 925 Hallmark */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full silver-925-badge text-[9px] font-semibold tracking-wider text-brand-dark uppercase border border-white/60 shadow-xs flex items-center space-x-1">
          <span>925 Silver</span>
        </div>

        {/* Top Badges / Tags */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1 z-10">
          {product.isBestseller && (
            <span className="px-2 py-0.5 rounded-full bg-blush-accent text-brand-dark text-[10px] font-bold tracking-wider uppercase shadow-xs">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
              New
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-brand-sale text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Button (Pop animation) */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-brand-dark shadow-sm hover:bg-white active:scale-75 transition-all"
        >
          <motion.div
            key={isInWishlist ? 'active' : 'inactive'}
            initial={{ scale: 0.8 }}
            animate={{ scale: isInWishlist ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.25 }}
          >
            <Heart
              className={`w-4 h-4 ${
                isInWishlist
                  ? 'fill-brand-sale text-brand-sale'
                  : 'text-brand-gray group-hover:text-brand-dark'
              }`}
            />
          </motion.div>
        </button>

        {/* Quick View Button (Desktop Hover) */}
        <button
          onClick={handleQuickView}
          aria-label="Quick preview"
          className="hidden md:flex absolute top-12 right-2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm items-center justify-center text-brand-dark shadow-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity active:scale-90"
        >
          <Eye className="w-4 h-4 text-brand-gray hover:text-brand-dark" />
        </button>

        {/* Mobile Swipe Indicators (dots) */}
        {hasMultipleImages && (
          <div className="md:hidden absolute bottom-2 right-2 flex space-x-1 z-10">
            {product.images.slice(0, 3).map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === activeImageIndex ? 'bg-brand-dark w-3' : 'bg-brand-dark/30'
                }`}
              />
            ))}
          </div>
        )}

        {/* Desktop Slide-up Add to Cart Button */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10 bg-gradient-to-t from-white/95 via-white/80 to-transparent">
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold tracking-wider uppercase hover:bg-brand-black active:scale-98 transition-all flex items-center justify-center space-x-2 shadow-card shimmer-sweep"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </Link>

      {/* Product Details Section */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center space-x-1.5 mb-1.5">
            <div className="flex items-center text-amber-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
              <span className="font-semibold text-brand-dark">{product.rating}</span>
            </div>
            <span className="text-[11px] text-brand-gray">({product.reviewCount})</span>
          </div>

          {/* Product Name (2 lines max) */}
          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-sm sm:text-base font-medium text-brand-black line-clamp-2 hover:text-blush-deep transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price and Mobile Add Button */}
        <div className="mt-3 pt-2 border-t border-brand-border/60 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-sm sm:text-base font-semibold text-brand-black">
              {formatINR(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-brand-gray line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
            {product.discountPercent > 0 && (
              <span className="text-[11px] font-bold text-brand-sale hidden sm:inline">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Mobile Add to Cart Icon Button (always visible on mobile) */}
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to Cart`}
            className="md:hidden w-8 h-8 rounded-full bg-blush-light text-brand-dark flex items-center justify-center hover:bg-blush-accent active:scale-90 transition-all border border-blush-accent/40"
          >
            <ShoppingBag className="w-4 h-4 text-brand-dark" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

