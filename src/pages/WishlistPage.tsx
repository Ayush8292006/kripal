import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { ProductCard } from '../components/product/ProductCard';

export const WishlistPage: React.FC = () => {
  const wishlist = useCartStore((state) => state.wishlist);

  return (
    <div className="bg-white min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="w-12 h-12 rounded-full bg-blush-light text-brand-sale flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 fill-brand-sale" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-brand-black">
            My Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs sm:text-sm text-brand-gray mt-1">
            Your curated gallery of handcrafted 925 sterling silver designs.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16 bg-blush-light rounded-luxury max-w-md mx-auto p-8">
            <p className="text-sm text-brand-gray mb-6">
              You haven't saved any jewellery to your wishlist yet.
            </p>
            <Link
              to="/collections/all"
              className="px-6 py-3 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-black transition-all shadow-card"
            >
              Explore Bestsellers
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

