import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, Coupon } from '../types';
import { BRAND_CONFIG, AVAILABLE_COUPONS } from '../data/config';

interface CartState {
  items: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  quickViewProduct: Product | null;
  appliedCoupon: Coupon | null;
  isGiftWrap: boolean;
  giftMessage: string;

  // Actions
  addItem: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeItem: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;

  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  setGiftWrap: (enabled: boolean) => void;
  setGiftMessage: (msg: string) => void;

  // Calculations
  getSubtotal: () => number;
  getDiscount: () => number;
  getShippingFee: () => number;
  getGiftWrapFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      isCartOpen: false,
      isSearchOpen: false,
      quickViewProduct: null,
      appliedCoupon: null,
      isGiftWrap: false,
      giftMessage: '',

      addItem: (product, quantity = 1, selectedSize) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.selectedSize === selectedSize
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            return { items: updated, isCartOpen: true };
          }

          return {
            items: [...state.items, { product, quantity, selectedSize }],
            isCartOpen: true,
          };
        });
      },

      removeItem: (productId, selectedSize) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
          ),
        }));
      },

      updateQuantity: (productId, quantity, selectedSize) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedSize);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.selectedSize === selectedSize
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({
          items: [],
          appliedCoupon: null,
          isGiftWrap: false,
          giftMessage: '',
        });
      },

      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.wishlist.some((p) => p.id === product.id);
          if (exists) {
            return { wishlist: state.wishlist.filter((p) => p.id !== product.id) };
          }
          return { wishlist: [...state.wishlist, product] };
        });
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((p) => p.id === productId);
      },

      setCartOpen: (open) => set({ isCartOpen: open }),
      setSearchOpen: (open) => set({ isSearchOpen: open }),
      setQuickViewProduct: (product) => set({ quickViewProduct: product }),

      applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
      removeCoupon: () => set({ appliedCoupon: null }),
      setGiftWrap: (enabled) => set({ isGiftWrap: enabled }),
      setGiftMessage: (msg) => set({ giftMessage: msg }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const coupon = get().appliedCoupon;
        if (!coupon || subtotal < coupon.minOrderValue) return 0;

        if (coupon.discountType === 'percentage') {
          return Math.round((subtotal * coupon.discountValue) / 100);
        }
        return Math.min(coupon.discountValue, subtotal);
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0 || subtotal >= BRAND_CONFIG.freeShippingThreshold) {
          return 0;
        }
        return BRAND_CONFIG.defaultShippingFee;
      },

      getGiftWrapFee: () => {
        return get().isGiftWrap ? BRAND_CONFIG.giftWrapFee : 0;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const shipping = get().getShippingFee();
        const giftWrap = get().getGiftWrapFee();
        return Math.max(0, subtotal - discount + shipping + giftWrap);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'kripal_cart_store',
      partialize: (state) => ({
        items: state.items,
        wishlist: state.wishlist,
        appliedCoupon: state.appliedCoupon,
        isGiftWrap: state.isGiftWrap,
        giftMessage: state.giftMessage,
      }),
    }
  )
);

