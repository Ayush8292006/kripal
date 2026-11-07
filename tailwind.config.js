/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        'blush-light': '#FDF6F7',
        'blush-soft': '#F7EEF0',
        'blush-accent': '#E8B4BC',
        'blush-hover': '#DF9EA8',
        'blush-deep': '#B98A95',
        'brand-dark': '#2B2B2B',
        'brand-black': '#1E1E1E',
        'brand-gray': '#6B6B6B',
        'brand-border': '#EFE3E5',
        'brand-sale': '#D0485A',
        'brand-gold': '#C9A86A',
        'silver-badge': '#BFC3C9',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Poppins"', '"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        'luxury': '16px',
        'luxury-lg': '20px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(232, 180, 188, 0.15)',
        'luxury': '0 10px 30px -5px rgba(43, 43, 43, 0.06)',
        'card': '0 2px 16px rgba(185, 138, 149, 0.08)',
        'float': '0 16px 40px -8px rgba(43, 43, 43, 0.12)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(232, 180, 188, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(232, 180, 188, 0)' },
        }
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
        glow: 'pulseGlow 2s infinite',
      }
    },
  },
  plugins: [],
}

