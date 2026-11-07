import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';

export const NewArrivalsGrid: React.FC = () => {
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival || p.tags?.includes('New')).slice(0, 8);

  return (
    <section className="py-12 sm:py-16 bg-[#FAF2F4]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10">
          <div>
            <div className="flex items-center space-x-1.5 text-xs uppercase tracking-widest text-blush-deep font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh From Our Rajkot Atelier</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-brand-black font-normal">
              New In Silver
            </h2>
          </div>

          <Link
            to="/collections/all?tags=New"
            className="text-xs sm:text-sm font-semibold text-brand-dark hover:text-blush-deep flex items-center space-x-1 mt-2 sm:mt-0 transition-colors"
          >
            <span>View All New Drops</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2 cols mobile, 3 tablet, 4 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
