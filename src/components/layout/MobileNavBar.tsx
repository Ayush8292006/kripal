import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export const MobileNavBar: React.FC = () => {
  const location = useLocation();
  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useCartStore((state) => state.wishlist.length);
  const setCartOpen = useCartStore((state) => state.setCartOpen);

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Categories', path: '/collections/all', icon: Grid },
    { label: 'Wishlist', path: '/wishlist', icon: Heart, badge: wishlistCount },
    { label: 'Cart', isCartAction: true, icon: ShoppingBag, badge: cartCount },
    { label: 'Account', path: '/account', icon: User },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-brand-border/80 shadow-float safe-pb select-none"
      role="navigation"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around h-14 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = !item.isCartAction && location.pathname === item.path;

          if (item.isCartAction) {
            return (
              <button
                key="cart-tab"
                onClick={() => setCartOpen(true)}
                className="relative flex flex-col items-center justify-center flex-1 h-full py-1 text-brand-dark min-w-[44px] min-h-[44px] active:scale-90 transition-transform"
                aria-label="Shopping Cart"
              >
                <div className="relative">
                  <Icon className="w-5 h-5 text-brand-dark" />
                  {item.badge && item.badge > 0 ? (
                    <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 bg-blush-deep text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 font-medium text-brand-gray">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <NavLink
              key={item.label}
              to={item.path!}
              className="relative flex flex-col items-center justify-center flex-1 h-full py-1 text-brand-dark min-w-[44px] min-h-[44px] active:scale-90 transition-transform"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-blush-deep stroke-[2.3]' : 'text-brand-gray'
                  }`}
                />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 bg-brand-sale text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
              </div>

              <span
                className={`text-[10px] tracking-tight mt-0.5 transition-colors ${
                  isActive ? 'text-blush-deep font-semibold' : 'text-brand-gray font-normal'
                }`}
              >
                {item.label}
              </span>

              {/* Active Pill Indicator */}
              {isActive && (
                <motion.div
                  layoutId="mobileNavPill"
                  className="absolute -bottom-0.5 w-6 h-0.5 bg-blush-deep rounded-full"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

