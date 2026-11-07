import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-[#FAF2F4] min-h-[70vh] flex items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md w-full bg-white p-8 sm:p-12 rounded-luxury shadow-card border border-brand-border">
        <Sparkles className="w-12 h-12 text-blush-deep mx-auto mb-4" />
        <span className="text-xs uppercase tracking-widest text-blush-deep font-bold">
          Error 404
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-brand-black mt-1 mb-3">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-brand-gray mb-6">
          The fine silver piece or collection you are seeking may have been moved or updated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-black transition-all shadow-card"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

