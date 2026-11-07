import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, ChevronDown } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/config';
import { useCartStore } from '../../store/useCartStore';
import { MegaMenu } from './MegaMenu';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const location = useLocation();

  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useCartStore((state) => state.wishlist.length);
  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const setSearchOpen = useCartStore((state) => state.setSearchOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setActiveMegaMenu(null);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-header shadow-luxury py-2.5 sm:py-3 border-b border-brand-border/60'
          : 'bg-white py-3.5 sm:py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Identity / Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-blush-accent/40 shadow-sm group-hover:scale-105 transition-transform">
            <img
              src={BRAND_CONFIG.logo}
              alt={BRAND_CONFIG.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-2xl font-semibold tracking-wide text-brand-black leading-tight">
              {BRAND_CONFIG.name}
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-blush-deep font-medium">
              Rajkot · Since 1998
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Bar with Mega Menu Triggers */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-medium uppercase tracking-wider text-brand-dark">
          <button
            onMouseEnter={() => setActiveMegaMenu('women')}
            className={`flex items-center space-x-1 py-2 hover:text-blush-deep transition-colors ${
              activeMegaMenu === 'women' ? 'text-blush-deep font-semibold' : ''
            }`}
          >
            <span>Women</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>

          <button
            onMouseEnter={() => setActiveMegaMenu('men')}
            className={`flex items-center space-x-1 py-2 hover:text-blush-deep transition-colors ${
              activeMegaMenu === 'men' ? 'text-blush-deep font-semibold' : ''
            }`}
          >
            <span>Men</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>

          <Link
            to="/collections/all"
            onMouseEnter={() => setActiveMegaMenu(null)}
            className="py-2 hover:text-blush-deep transition-colors"
          >
            Collections
          </Link>

          <button
            onMouseEnter={() => setActiveMegaMenu('gifting')}
            className={`flex items-center space-x-1 py-2 hover:text-blush-deep transition-colors ${
              activeMegaMenu === 'gifting' ? 'text-blush-deep font-semibold' : ''
            }`}
          >
            <span>Gifting</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>

          <button
            onMouseEnter={() => setActiveMegaMenu('price')}
            className={`flex items-center space-x-1 py-2 hover:text-blush-deep transition-colors ${
              activeMegaMenu === 'price' ? 'text-blush-deep font-semibold' : ''
            }`}
          >
            <span>Shop by Price</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>

          <Link
            to="/about"
            onMouseEnter={() => setActiveMegaMenu(null)}
            className="py-2 hover:text-blush-deep transition-colors"
          >
            Our Story
          </Link>

          <Link
            to="/contact"
            onMouseEnter={() => setActiveMegaMenu(null)}
            className="py-2 hover:text-blush-deep transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Right: Quick Action Icons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search Jewellery"
            className="p-2 text-brand-dark hover:text-blush-deep rounded-full hover:bg-blush-light transition-all active:scale-95"
          >
            <Search className="w-5 h-5 sm:w-5 sm:h-5" />
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label="View Wishlist"
            className="relative p-2 text-brand-dark hover:text-blush-deep rounded-full hover:bg-blush-light transition-all active:scale-95"
          >
            <Heart className="w-5 h-5 sm:w-5 sm:h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-sale text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Account (Desktop Only) */}
          <Link
            to="/account"
            aria-label="User Account"
            className="hidden sm:inline-flex p-2 text-brand-dark hover:text-blush-deep rounded-full hover:bg-blush-light transition-all active:scale-95"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Open Shopping Cart"
            className="relative p-2 text-brand-dark hover:text-blush-deep rounded-full hover:bg-blush-light transition-all active:scale-95"
          >
            <ShoppingBag className="w-5 h-5 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-blush-deep text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <MegaMenu
        activeMenu={activeMegaMenu}
        onClose={() => setActiveMegaMenu(null)}
      />
    </header>
  );
};

