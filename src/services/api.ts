import { PRODUCTS, CATEGORIES_CONFIG } from '../data/products';
import { AVAILABLE_COUPONS, BRAND_CONFIG } from '../data/config';
import { Product, Order, Coupon, Review } from '../types';

// Simulate realistic API delay
const delay = (ms: number = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ProductFilters {
  category?: string;
  metal?: string;
  minPrice?: number;
  maxPrice?: number;
  gender?: string;
  search?: string;
  sort?: 'popular' | 'newest' | 'price-low' | 'price-high' | 'discount';
  tags?: string;
}

export const api = {
  // Fetch all products or filtered products
  getProducts: async (filters?: ProductFilters): Promise<Product[]> => {
    await delay(180);
    let list = [...PRODUCTS];

    if (filters?.category && filters.category !== 'all') {
      list = list.filter((p) => p.category === filters.category);
    }

    if (filters?.metal && filters.metal !== 'all') {
      list = list.filter((p) => p.metal === filters.metal);
    }

    if (filters?.gender && filters.gender !== 'all') {
      list = list.filter((p) => p.gender === filters.gender || p.gender === 'Unisex');
    }

    if (filters?.minPrice !== undefined) {
      list = list.filter((p) => p.price >= (filters.minPrice ?? 0));
    }

    if (filters?.maxPrice !== undefined) {
      list = list.filter((p) => p.price <= (filters.maxPrice ?? Infinity));
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.metal.toLowerCase().includes(q)
      );
    }

    if (filters?.sort) {
      switch (filters.sort) {
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
    }

    return list;
  },

  // Fetch product by slug
  getProductBySlug: async (slug: string): Promise<Product | null> => {
    await delay(150);
    const product = PRODUCTS.find((p) => p.slug === slug);
    return product || null;
  },

  // Fetch related products
  getRelatedProducts: async (category: string, currentId: string): Promise<Product[]> => {
    await delay(120);
    return PRODUCTS.filter((p) => p.category === category && p.id !== currentId).slice(0, 4);
  },

  // Fetch bestsellers
  getBestsellers: async (): Promise<Product[]> => {
    await delay(100);
    return PRODUCTS.filter((p) => p.isBestseller).slice(0, 8);
  },

  // Fetch new arrivals
  getNewArrivals: async (): Promise<Product[]> => {
    await delay(100);
    return PRODUCTS.filter((p) => p.isNewArrival || p.tags?.includes('New')).slice(0, 8);
  },

  // Get categories
  getCategories: async () => {
    await delay(100);
    return CATEGORIES_CONFIG;
  },

  // Validate coupon
  validateCoupon: async (code: string, cartTotal: number): Promise<{ valid: boolean; coupon?: Coupon; error?: string }> => {
    await delay(150);
    const coupon = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return { valid: false, error: 'Invalid coupon code' };
    }
    if (cartTotal < coupon.minOrderValue) {
      return {
        valid: false,
        error: `Minimum order value for ${coupon.code} is ₹${coupon.minOrderValue}`,
      };
    }
    return { valid: true, coupon };
  },

  // Check pincode delivery estimate
  checkPincodeDelivery: async (pincode: string): Promise<{ serviceable: boolean; days: number; message: string }> => {
    await delay(200);
    if (!/^\d{6}$/.test(pincode)) {
      return { serviceable: false, days: 0, message: 'Please enter a valid 6-digit Indian PIN code' };
    }
    // Rajkot / Gujarat quick delivery simulation
    if (pincode.startsWith('36') || pincode.startsWith('38')) {
      return { serviceable: true, days: 2, message: 'Fast Delivery in 1-2 Days (Gujarat Express)' };
    }
    return { serviceable: true, days: 4, message: 'Standard Insured Delivery in 3-5 Days' };
  },

  // Create order
  createOrder: async (orderData: Partial<Order>): Promise<Order> => {
    await delay(350);
    const newOrder: Order = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      orderNumber: 'KP-' + Math.floor(1000000 + Math.random() * 9000000),
      createdAt: new Date().toISOString(),
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      discount: orderData.discount || 0,
      couponCode: orderData.couponCode,
      giftWrap: orderData.giftWrap || false,
      giftMessage: orderData.giftMessage,
      shipping: orderData.shipping || 0,
      total: orderData.total || 0,
      shippingAddress: orderData.shippingAddress!,
      paymentMethod: orderData.paymentMethod || 'UPI',
      paymentStatus: orderData.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Paid',
      orderStatus: 'Placed',
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
      trackingNumber: 'DEL-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    };

    // Save to localStorage for demo persistence
    const savedOrders: Order[] = JSON.parse(localStorage.getItem('kripal_orders') || '[]');
    savedOrders.unshift(newOrder);
    localStorage.setItem('kripal_orders', JSON.stringify(savedOrders));

    return newOrder;
  },

  // Get user orders
  getUserOrders: async (): Promise<Order[]> => {
    await delay(150);
    const orders = localStorage.getItem('kripal_orders');
    return orders ? JSON.parse(orders) : [];
  },

  // Track order
  trackOrder: async (orderNumber: string): Promise<Order | null> => {
    await delay(200);
    const orders: Order[] = JSON.parse(localStorage.getItem('kripal_orders') || '[]');
    return orders.find((o) => o.orderNumber === orderNumber || o.id === orderNumber) || null;
  },

  // Send OTP
  sendOtp: async (phone: string): Promise<{ success: boolean; message: string }> => {
    await delay(250);
    return { success: true, message: `OTP sent successfully to +91 ${phone} (Use 1234 for demo)` };
  },

  // Verify OTP
  verifyOtp: async (phone: string, otp: string): Promise<{ success: boolean; user?: { phone: string; name: string } }> => {
    await delay(300);
    if (otp === '1234' || otp.length === 4) {
      return {
        success: true,
        user: {
          phone,
          name: 'Kripal Patron',
        },
      };
    }
    return { success: false };
  },

  // Submit product review
  submitReview: async (review: Omit<Review, 'id' | 'date' | 'verified'>): Promise<Review> => {
    await delay(200);
    return {
      ...review,
      id: 'rev-' + Date.now(),
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      verified: true,
    };
  },
};

