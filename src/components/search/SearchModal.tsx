import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { formatINR } from '../../utils/formatters';

const TRENDING_KEYWORDS = [
  'Solitaire Ring',
  '925 Silver Kada',
  'Floral Jhumkas',
  'Bridal Mangalsutra',
  'Tennis Bracelet',
  'Couple Bands',
  'Under ₹999',
];

export const SearchModal: React.FC = () => {
  const isOpen = useCartStore((state) => state.isSearchOpen);
  const setSearchOpen = useCartStore((state) => state.setSearchOpen);
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('kripal_recent_searches') || '[]');
    } catch {
      return ['Silver Kada', 'Rose Gold Ring'];
    }
  });

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase().trim();
    const matched = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.metal.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    ).slice(0, 5);

    setResults(matched);
  }, [query]);

  const handleSelectQuery = (text: string) => {
    setQuery(text);
    saveRecentSearch(text);
    navigate(`/collections/all?search=${encodeURIComponent(text)}`);
    setSearchOpen(false);
  };

  const saveRecentSearch = (text: string) => {
    const updated = [text, ...recentSearches.filter((s) => s.toLowerCase() !== text.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('kripal_recent_searches', JSON.stringify(updated));
  };

  const handleProductClick = (slug: string) => {
    if (query) saveRecentSearch(query);
    setSearchOpen(false);
    navigate(`/product/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-start pt-16 sm:pt-24 px-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSearchOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Search Modal Content */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl mx-auto bg-white rounded-luxury shadow-float overflow-hidden z-10 border border-brand-border"
        >
          {/* Input field */}
          <div className="relative flex items-center px-4 py-3.5 border-b border-brand-border">
            <Search className="w-5 h-5 text-brand-gray mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for silver rings, earrings, kadas, sets..."
              autoFocus
              className="w-full text-sm sm:text-base text-brand-black placeholder-gray-400 bg-transparent focus:outline-none font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-gray-400 hover:text-gray-600 mr-2 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setSearchOpen(false)}
              className="px-2 py-1 text-xs font-semibold text-brand-gray hover:text-brand-dark"
            >
              ESC
            </button>
          </div>

          <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto space-y-6">
            {/* Live Results */}
            {query.trim() && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs uppercase tracking-widest text-brand-gray font-semibold">
                    Matching Products ({results.length})
                  </h4>
                  {results.length > 0 && (
                    <button
                      onClick={() => handleSelectQuery(query)}
                      className="text-xs text-blush-deep font-semibold hover:underline flex items-center"
                    >
                      <span>View all results</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  )}
                </div>

                {results.length === 0 ? (
                  <p className="text-xs text-brand-gray py-4 text-center">
                    No jewellery found matching "{query}". Try searching for 'ring', 'kada', or 'earrings'.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {results.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.slug)}
                        className="flex items-center space-x-3 p-2.5 rounded-luxury hover:bg-blush-light cursor-pointer transition-colors"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-blush-light"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif text-sm font-medium text-brand-black truncate">
                            {product.name}
                          </h5>
                          <span className="text-[11px] text-brand-gray">{product.metal}</span>
                        </div>
                        <span className="text-xs font-semibold text-brand-dark">
                          {formatINR(product.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Trending Searches */}
            <div>
              <div className="flex items-center space-x-1.5 mb-2.5 text-xs uppercase tracking-widest font-semibold text-brand-gray">
                <TrendingUp className="w-3.5 h-3.5 text-blush-deep" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING_KEYWORDS.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => handleSelectQuery(kw)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-blush-light text-brand-dark hover:bg-blush-accent/40 border border-blush-accent/30 transition-colors flex items-center space-x-1"
                  >
                    <Sparkles className="w-3 h-3 text-blush-deep" />
                    <span>{kw}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-gray mb-2.5">
                  Recent Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((kw, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectQuery(kw)}
                      className="px-3 py-1.5 rounded-full text-xs text-brand-gray hover:text-brand-dark bg-white border border-brand-border hover:border-blush-accent transition-colors"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

