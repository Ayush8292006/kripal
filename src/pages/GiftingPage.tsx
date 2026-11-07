import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Gift, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';

export const GiftingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRecipient = searchParams.get('recipient') || 'wife';
  const initialOccasion = searchParams.get('occasion') || 'all';

  const [recipient, setRecipient] = useState(initialRecipient);
  const [occasion, setOccasion] = useState(initialOccasion);

  // Filter products for gifting
  const giftingProducts = PRODUCTS.filter((p) => {
    if (recipient === 'him') {
      return p.gender === 'Men';
    }
    if (recipient === 'wife') {
      return p.category === 'rings' || p.category === 'pendant-sets' || p.category === 'mangalsutra';
    }
    if (recipient === 'sister') {
      return p.category === 'bracelets' || p.category === 'earrings';
    }
    if (recipient === 'mother') {
      return p.category === 'earrings' || p.category === 'jewellery-sets';
    }
    return true;
  });

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blush-light text-xs font-semibold uppercase tracking-wider text-blush-deep mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>Kripal Gifting Atelier</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-brand-black mb-3">
            Pure Silver, Infinite Love
          </h1>
          <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
            Every gift tells a story. Our 925 sterling silver gifts arrive with a signature blush velvet box, certificate of authenticity, and optional handwritten love note.
          </p>
        </div>

        {/* Recipient Selection Bar */}
        <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-10">
          {[
            { id: 'wife', label: 'For Wife' },
            { id: 'sister', label: 'For Sister' },
            { id: 'mother', label: 'For Mother' },
            { id: 'friend', label: 'For Best Friend' },
            { id: 'him', label: 'For Him' },
          ].map((rec) => (
            <button
              key={rec.id}
              onClick={() => setRecipient(rec.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                recipient === rec.id
                  ? 'bg-brand-dark text-white shadow-card scale-105'
                  : 'bg-blush-light text-brand-dark hover:bg-blush-accent/40'
              }`}
            >
              {rec.label}
            </button>
          ))}
        </div>

        {/* Curated Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {giftingProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

