export const BRAND_CONFIG = {
  name: 'Kripal Jewellers',
  tradeName: 'Kripal Silver',
  tagline: 'Timeless Elegance',
  since: '1998',
  experienceYears: '25+',
  story: 'Started in 1998 with handcrafted jewellery rooted in trust, purity and timeless artistry. 25+ Years of Trust. Handcrafted Excellence. Where tradition meets contemporary elegance.',
  logo: 'https://kripalsilver.com/assets/images/ks%20logo.jpg.jpeg',
  phone: '+91 99781 03393',
  phoneRaw: '919978103393',
  whatsappUrl: 'https://wa.me/919978103393',
  email: 'vipulajani11233@gmail.com',
  address: {
    line1: 'Rajaram Ind Zone, Plot No. 17',
    road: 'Kuvadava Road',
    city: 'Rajkot',
    state: 'Gujarat',
    pincode: '360003',
    country: 'India',
  },
  social: {
    instagram: 'https://instagram.com/kripalsilver',
    instagramHandle: '@kripalsilver',
    facebook: 'https://facebook.com/kripaljewellers',
  },
  freeShippingThreshold: 999,
  defaultShippingFee: 99,
  giftWrapFee: 49,
};

export const ANNOUNCEMENTS = [
  '✨ Flat ₹150 OFF on first order | Use code KRIPAL150',
  '🚚 Free shipping across India on orders above ₹999',
  '💎 925 Pure Sterling Silver · Hallmarked Authenticity',
  '🎁 Complimentary luxury velvet box with every piece',
];

export const TRUST_BADGES = [
  {
    id: 'hallmark',
    title: '925 Hallmarked Silver',
    description: '100% genuine sterling silver authenticated with laser stamp',
    icon: 'ShieldCheck',
  },
  {
    id: 'plating',
    title: 'Lifetime Plating Guarantee',
    description: 'Rhodium & micron gold electroplating for enduring shine',
    icon: 'Sparkles',
  },
  {
    id: 'warranty',
    title: '6-Month Warranty',
    description: 'Free polish and stone setting warranty on all fine items',
    icon: 'Award',
  },
  {
    id: 'returns',
    title: '30-Day Easy Returns',
    description: 'No questions asked doorstep replacement and returns',
    icon: 'RotateCcw',
  },
  {
    id: 'shipping',
    title: 'Free & Insured Express Delivery',
    description: 'Tracked dispatch within 24 hours in tamper-evident packaging',
    icon: 'Truck',
  },
  {
    id: 'payment',
    title: '100% Secure Payments',
    description: 'Encrypted UPI, Cards, NetBanking & Cash on Delivery',
    icon: 'Lock',
  },
];

export const AVAILABLE_COUPONS = [
  {
    code: 'KRIPAL150',
    discountType: 'fixed' as const,
    discountValue: 150,
    minOrderValue: 999,
    description: 'Flat ₹150 OFF on your first purchase above ₹999',
  },
  {
    code: 'SILVER10',
    discountType: 'percentage' as const,
    discountValue: 10,
    minOrderValue: 1999,
    description: '10% OFF on all 925 Hallmarked Jewellery above ₹1999',
  },
  {
    code: 'FESTIVE500',
    discountType: 'fixed' as const,
    discountValue: 500,
    minOrderValue: 4999,
    description: 'Flat ₹500 OFF on luxury bridal & heirloom sets above ₹4999',
  },
];

export const STATS = [
  { value: '25+', label: 'Years of Trust' },
  { value: '10,000+', label: 'Happy Patrons' },
  { value: '100%', label: 'Handcrafted in Rajkot' },
  { value: '925', label: 'Certified Hallmark Purity' },
];

