import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  Sparkles,
  ArrowUpDown,
  Check,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES_CONFIG } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { Product } from '../types';
import { formatINR } from '../utils/formatters';

const SORT_OPTIONS = [
  { value: 'popular', label: 'Bestselling & Popular' },
  { value: 'newest', label: 'New Arrivals' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'discount', label: 'Highest Discount' },
];

const METALS_LIST = [
  '925 Sterling Silver',
  '18K Gold Plated',
  'Rose Gold Plated',
  'Oxidised Silver',
];

export const CollectionPage: React.FC = () => {
  const { category = 'all' } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('popular');
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Parse query params if any
  useEffect(() => {
    const metalQuery = searchParams.get('metal');
    if (metalQuery) setSelectedMetals([metalQuery]);

    const maxPriceQuery = searchParams.get('maxPrice');
    if (maxPriceQuery) setPriceRange(Number(maxPriceQuery));

    const genderQuery = searchParams.get('gender');
    if (genderQuery) setSelectedGenders([genderQuery]);

    const sortQuery = searchParams.get('sort');
    if (sortQuery) setSelectedSort(sortQuery);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setVisibleCount(8);
  }, [category, searchParams]);

  // Find active category configuration
  const currentCategoryObj = CATEGORIES_CONFIG.find((c) => c.id === category);
  const categoryTitle =
    category === 'all'
      ? 'All Fine Silver Jewellery'
      : currentCategoryObj?.name || category.replace('-', ' ');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Filter by Category
    if (category !== 'all') {
      list = list.filter((p) => p.category === category);
    }

    // Filter by search query
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.metal.toLowerCase().includes(q)
      );
    }

    // Filter by Tags query
    const tagQuery = searchParams.get('tags');
    if (tagQuery) {
      if (tagQuery === 'Bestseller') list = list.filter((p) => p.isBestseller);
      if (tagQuery === 'New') list = list.filter((p) => p.isNewArrival);
      if (tagQuery === 'Handcrafted') list = list.filter((p) => p.tags?.includes('Handcrafted'));
      if (tagQuery === 'Trending') list = list.filter((p) => p.tags?.includes('Trending') || p.isBestseller);
    }

    // Filter by Metal
    if (selectedMetals.length > 0) {
      list = list.filter((p) => selectedMetals.includes(p.metal));
    }

    // Filter by Gender
    if (selectedGenders.length > 0) {
      list = list.filter((p) => selectedGenders.includes(p.gender) || p.gender === 'Unisex');
    }

    // Filter by Price
    list = list.filter((p) => p.price <= priceRange);

    // Sort
    switch (selectedSort) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'discount':
        list.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      case 'popular':
      default:
        list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
    }

    return list;
  }, [category, searchParams, selectedMetals, selectedGenders, priceRange, selectedSort]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 8);
      setIsLoadingMore(false);
    }, 400);
  };

  const toggleMetal = (m: string) => {
    setSelectedMetals((prev) =>
      prev.includes(m) ? prev.filter((item) => item !== m) : [...prev, m]
    );
  };

  const toggleGender = (g: string) => {
    setSelectedGenders((prev) =>
      prev.includes(g) ? prev.filter((item) => item !== g) : [...prev, g]
    );
  };

  const clearAllFilters = () => {
    setSelectedMetals([]);
    setSelectedGenders([]);
    setPriceRange(10000);
    setSearchParams({});
  };

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="bg-white min-h-screen">
      {/* Category Banner */}
      <div className="bg-gradient-to-b from-[#FAF2F4] to-white py-10 sm:py-14 border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white shadow-xs border border-blush-accent/40 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-blush-deep mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>925 Sterling Silver Hallmarked</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-brand-black capitalize mb-2">
            {categoryTitle}
          </h1>
          <p className="text-xs sm:text-sm text-brand-gray max-w-lg mx-auto">
            {currentCategoryObj?.tagline ||
              'Handcrafted with utmost precision in Rajkot, Gujarat. Pure silver artistry since 1998.'}
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-border gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold text-brand-dark">
              Showing {filteredProducts.length} designs
            </span>
            {(selectedMetals.length > 0 || selectedGenders.length > 0 || priceRange < 10000) && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-brand-sale hover:underline font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2 rounded-luxury border border-brand-border bg-white text-xs font-semibold text-brand-dark hover:bg-blush-light transition-all"
            >
              <SlidersHorizontal className="w-4 h-4 text-blush-deep" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full sm:w-auto appearance-none bg-white border border-brand-border rounded-luxury px-4 py-2 pr-9 text-xs font-semibold text-brand-dark focus:outline-none focus:border-blush-deep cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-brand-gray absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-8 pr-4 select-none">
            {/* Categories List */}
            <div>
              <h4 className="font-serif text-base font-semibold text-brand-black mb-3 pb-2 border-b border-brand-border">
                Categories
              </h4>
              <ul className="space-y-2 text-xs font-medium">
                <li>
                  <Link
                    to="/collections/all"
                    className={`block py-1 transition-colors ${
                      category === 'all' ? 'text-blush-deep font-bold' : 'text-brand-gray hover:text-brand-dark'
                    }`}
                  >
                    All Jewellery
                  </Link>
                </li>
                {CATEGORIES_CONFIG.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      to={`/collections/${cat.id}`}
                      className={`flex justify-between py-1 transition-colors ${
                        category === cat.id ? 'text-blush-deep font-bold' : 'text-brand-gray hover:text-brand-dark'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-gray-400">({cat.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Slider */}
            <div>
              <h4 className="font-serif text-base font-semibold text-brand-black mb-3 pb-2 border-b border-brand-border">
                Price (Under {formatINR(priceRange)})
              </h4>
              <input
                type="range"
                min="799"
                max="10000"
                step="200"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-blush-deep cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-brand-gray mt-1">
                <span>₹799</span>
                <span>₹10,000+</span>
              </div>
            </div>

            {/* Metal & Finish */}
            <div>
              <h4 className="font-serif text-base font-semibold text-brand-black mb-3 pb-2 border-b border-brand-border">
                Metal & Finish
              </h4>
              <div className="space-y-2">
                {METALS_LIST.map((metal) => (
                  <label
                    key={metal}
                    className="flex items-center space-x-2 text-xs text-brand-dark cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMetals.includes(metal)}
                      onChange={() => toggleMetal(metal)}
                      className="w-4 h-4 accent-blush-deep rounded cursor-pointer"
                    />
                    <span className="group-hover:text-blush-deep transition-colors">{metal}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div>
              <h4 className="font-serif text-base font-semibold text-brand-black mb-3 pb-2 border-b border-brand-border">
                Gender
              </h4>
              <div className="space-y-2">
                {['Women', 'Men'].map((gender) => (
                  <label
                    key={gender}
                    className="flex items-center space-x-2 text-xs text-brand-dark cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGenders.includes(gender)}
                      onChange={() => toggleGender(gender)}
                      className="w-4 h-4 accent-blush-deep rounded cursor-pointer"
                    />
                    <span className="group-hover:text-blush-deep transition-colors">{gender}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 px-4 bg-blush-light rounded-luxury">
                <Sparkles className="w-10 h-10 text-blush-accent mx-auto mb-3" />
                <h3 className="font-serif text-2xl font-medium text-brand-black mb-2">
                  No jewellery matches these filters
                </h3>
                <p className="text-xs sm:text-sm text-brand-gray mb-6">
                  Try broadening your price range or clearing metal selections.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-black transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div>
                {/* 2 cols mobile, 3 cols tablet / desktop */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredProducts.length && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="px-8 py-3 rounded-luxury bg-white border border-brand-border text-brand-dark hover:border-blush-accent text-xs font-semibold uppercase tracking-wider transition-all shadow-xs hover:shadow-luxury disabled:opacity-50"
                    >
                      {isLoadingMore ? 'Loading More Designs...' : `Load More (${filteredProducts.length - visibleCount} remaining)`}
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom-sheet Filters Modal */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              className="relative bg-white rounded-t-luxury-lg max-h-[85vh] overflow-y-auto p-6 z-10 safe-pb"
            >
              <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-6">
                <h3 className="font-serif text-xl font-medium text-brand-black">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-full text-brand-gray"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter Sections */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-gray mb-3">
                    Price Cap: {formatINR(priceRange)}
                  </h4>
                  <input
                    type="range"
                    min="799"
                    max="10000"
                    step="200"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-blush-deep cursor-pointer"
                  />
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-gray mb-3">
                    Metal & Finish
                  </h4>
                  <div className="space-y-2">
                    {METALS_LIST.map((metal) => (
                      <label key={metal} className="flex items-center space-x-2 text-xs">
                        <input
                          type="checkbox"
                          checked={selectedMetals.includes(metal)}
                          onChange={() => toggleMetal(metal)}
                          className="w-4 h-4 accent-blush-deep rounded"
                        />
                        <span>{metal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-gray mb-3">
                    Gender
                  </h4>
                  <div className="flex space-x-3">
                    {['Women', 'Men'].map((gender) => (
                      <button
                        key={gender}
                        onClick={() => toggleGender(gender)}
                        className={`px-4 py-2 rounded-luxury text-xs font-semibold border ${
                          selectedGenders.includes(gender)
                            ? 'bg-brand-dark text-white border-brand-dark'
                            : 'bg-white text-brand-dark border-brand-border'
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-border flex space-x-3">
                  <button
                    onClick={clearAllFilters}
                    className="flex-1 py-3 rounded-luxury border border-brand-border text-xs font-semibold text-brand-dark uppercase"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="flex-1 py-3 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider shadow-card"
                  >
                    Show Results
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

