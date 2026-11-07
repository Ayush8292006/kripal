export type CategoryId =
  | 'rings'
  | 'earrings'
  | 'pendant-sets'
  | 'mangalsutra'
  | 'jewellery-sets'
  | 'kadas'
  | 'bracelets'
  | 'mens';

export type MetalFinish =
  | '925 Sterling Silver'
  | '18K Gold Plated'
  | 'Rose Gold Plated'
  | 'Oxidised Silver';

export type Occasion =
  | 'Daily Wear'
  | 'Party'
  | 'Wedding'
  | 'Anniversary'
  | 'Birthday'
  | 'Rakhi'
  | 'Diwali';

export type Gender = 'Women' | 'Men' | 'Unisex';

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  category: CategoryId;
  categoryName: string;
  metal: MetalFinish;
  gender: Gender;
  occasion?: Occasion[];
  rating: number;
  reviewCount: number;
  images: string[];
  videoUrl?: string;
  tags?: ('Bestseller' | 'New' | 'Under ₹999' | 'Under ₹1999' | 'Trending' | 'Handcrafted')[];
  purity: string;
  weightGrams: number;
  dimensions?: string;
  inStock: boolean;
  stockCount: number;
  sizes?: string[]; // For rings or kadas
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  details: {
    material: string;
    plating: string;
    stone?: string;
    warranty: string;
    care: string[];
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
  type: 'home' | 'work';
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  giftWrap: boolean;
  giftMessage?: string;
  shipping: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Wallet' | 'COD';
  paymentStatus: 'Paid' | 'Pending' | 'Cash on Delivery';
  orderStatus: 'Placed' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
  estimatedDelivery: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  image?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  description: string;
}
