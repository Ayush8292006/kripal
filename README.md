# Kripal Jewellers (Kripal Silver) · Production E-Commerce Platform

> **"Timeless Elegance"** — 25+ Years of Trust & Handcrafted 925 Sterling Silver from Rajkot, Gujarat (Since 1998).

A production-grade, responsive, luxury animated e-commerce website and native-like progressive web app (PWA) inspired by the airy, modern, gifting-centric design language of GIVA (`giva.co`).

---

## 💎 Brand Identity

- **Brand:** Kripal Jewellers | **Trade Name:** Kripal Silver
- **Legacy:** Handcrafted in Rajkot since 1998 · 25+ Years of Trust · 100% 925 Hallmarked Authenticity
- **Logo:** `https://kripalsilver.com/assets/images/ks%20logo.jpg.jpeg`
- **Atelier Address:** Rajaram Ind Zone, Plot No. 17, Kuvadava Road, Rajkot, Gujarat - 360003
- **Phone / WhatsApp:** +91 99781 03393 (`wa.me/919978103393`)
- **Email:** `vipulajani11233@gmail.com`
- **Social:** [Instagram @kripalsilver](https://instagram.com/kripalsilver) · [Facebook @kripaljewellers](https://facebook.com/kripaljewellers)

---

## 🎨 Design System & Color Palette

- **Background:** `#FFFFFF`, Section Alt: `#FDF6F7` (Blush White), `#FAF2F4`
- **Primary Accent:** `#E8B4BC` (Blush Rose), Deep CTA: `#2B2B2B` (Near-Black)
- **Secondary Accent:** `#B98A95` (Dusty Mauve), Sale Tag: `#D0485A`
- **Metallic Accents:** Silver Hallmark Gradient (`#FFFFFF` → `#E6E6E6` → `#BFC3C9`), Soft Gold (`#C9A86A`)
- **Typography:** Headings in *Cormorant Garamond* / *Playfair Display*; UI & Body in *DM Sans* / *Poppins*
- **Aesthetics:** 12–20px luxury rounded corners, soft rose shadows, white space, and micro-sparkle shimmer sweeps.

---

## 🛠️ Tech Stack & Architecture

- **Core:** React 18 + Vite 5 + TypeScript
- **Styling:** Tailwind CSS (Custom theme extension with luxury shadows, animations, and safe-area insets)
- **Animations:** Framer Motion (page transitions, micro-interactions, modal overlays), Lenis (smooth 60fps momentum scroll)
- **State Management:** Zustand with `persist` middleware for:
  - Shopping Cart, Wishlist, Applied Coupons, Gift Wrap & Note
  - User Authentication, Addresses, and Order History
- **Carousels & Swipers:** Swiper.js v11 for responsive touch-swipe product showcases
- **Icons:** Lucide React
- **Celebrations:** Canvas-Confetti on successful order placement

---

## 📂 Project Structure

```
├── public/
│   └── manifest.json            # PWA manifest for native app install
├── src/
│   ├── components/
│   │   ├── common/              # IntroLoader, FloatingWhatsApp, Toast
│   │   ├── layout/              # Header, MegaMenu, MobileNavBar, AnnouncementBar, Footer
│   │   ├── product/             # GIVA-style ProductCard, QuickViewModal
│   │   ├── cart/                # Slide-in CartDrawer with free shipping tracker
│   │   └── search/              # Real-time search overlay with trending keywords
│   ├── sections/                # All 17 Homepage Sections (Hero, Bento, Timeline, etc.)
│   ├── pages/
│   │   ├── HomePage.tsx         # Assembles 17 animated sections in exact sequence
│   │   ├── CollectionPage.tsx   # Filter sidebar / bottom-sheet, sort, pagination
│   │   ├── ProductPage.tsx      # Zoom gallery, video slot, ring size guide, pincode checker
│   │   ├── CartPage.tsx         # Full cart page with coupon & gift wrap support
│   │   ├── CheckoutPage.tsx     # Multi-step checkout (Address → Delivery → Payment → Review)
│   │   ├── AccountPage.tsx      # Mobile OTP login, order tracking timeline, addresses
│   │   ├── WishlistPage.tsx     # Saved items gallery
│   │   ├── GiftingPage.tsx      # Recipient & occasion concierge
│   │   ├── AboutPage.tsx        # 1998 heritage story & craftsmanship narrative
│   │   ├── ContactPage.tsx      # Atelier contact, direct WhatsApp, and inquiry form
│   │   ├── PoliciesPage.tsx     # Shipping, 30-Day Returns, and Privacy policies
│   │   ├── AdminPage.tsx        # Protected dashboard, products CRUD, orders, coupons
│   │   └── NotFoundPage.tsx     # Custom 404 page
│   ├── data/
│   │   ├── config.ts            # Brand data, trust badges, coupons, announcements
│   │   └── products.ts          # 24+ realistic 925 sterling silver products
│   ├── services/
│   │   └── api.ts               # Clean API service layer (swappable with real backend)
│   ├── store/
│   │   ├── useCartStore.ts      # Cart & wishlist store with localStorage persistence
│   │   └── useAuthStore.ts      # User auth & address store
│   ├── hooks/
│   │   └── useSmoothScroll.ts   # Lenis smooth scroll hook (respects reduced-motion)
│   ├── utils/
│   │   └── formatters.ts        # INR currency formatting (₹), Pincode & Phone validators
│   ├── App.tsx                  # Code-split routes with Suspense fallback
│   ├── main.tsx
│   └── index.css
├── index.html                   # Fonts preconnect, PWA tags, and SEO Open Graph
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ⚡ Getting Started

### 1. Installation

```bash
# Clone or navigate to the repository
cd d:\Techora\Kripal

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set the appropriate keys:

```ini
VITE_APP_NAME="Kripal Jewellers"
VITE_APP_URL="https://kripalsilver.com"

# Backend API Base URL (leave blank to use the built-in mock services)
VITE_API_BASE_URL="https://api.yourdomain.com/v1"

# Razorpay Test Mode Keys
VITE_RAZORPAY_KEY_ID="rzp_test_YourKeyHere"
VITE_RAZORPAY_KEY_SECRET="YourSecretKeyHere"

# Official WhatsApp Support
VITE_WHATSAPP_PHONE="919978103393"
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### 4. Build for Production

```bash
npm run build
```

This generates code-split, minified WebP and JS chunks in `/dist` optimized for Lighthouse 90+ targets.

---

## 🔌 How the Backend Team Can Plug in Real APIs

All UI components communicate exclusively with `/src/services/api.ts`. No mock data is imported directly into the application pages.

To replace mock data with your live REST or GraphQL backend:

1. Open `src/services/api.ts`.
2. Configure `axios` or native `fetch` with `import.meta.env.VITE_API_BASE_URL`.
3. Simply replace the mock returns with real HTTP calls:
   - `getProducts(filters)` → `GET /api/v1/products?category=...&minPrice=...`
   - `getProductBySlug(slug)` → `GET /api/v1/products/:slug`
   - `createOrder(orderData)` → `POST /api/v1/orders`
   - `checkPincodeDelivery(pincode)` → `GET /api/v1/pincode/:pincode`
   - `sendOtp(phone)` / `verifyOtp(phone, otp)` → `POST /api/v1/auth/otp`

---

## 📱 Mobile App Experience (<768px)

- **Fixed Native Bottom Tab Bar:** Home, Categories, Wishlist, Bag, and Account with spring indicator pills.
- **Story Circles:** Horizontally scrollable category avatars under the header.
- **Bottom-Sheet Modals:** Draggable filters, sorting, and size guide.
- **Sticky Buy Bar:** Always-visible Add-to-Bag and price bar on product detail pages.
- **PWA Ready:** Manifest and meta tags configured for home-screen installation.

