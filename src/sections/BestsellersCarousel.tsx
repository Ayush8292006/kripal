import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const BestsellersCarousel: React.FC = () => {
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 8);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="py-12 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10">
          <div>
            <div className="flex items-center space-x-1.5 text-xs uppercase tracking-widest text-blush-deep font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Beloved by 10,000+ Patrons</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-brand-black font-normal">
              Most Loved Bestsellers
            </h2>
          </div>

          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
            <Link
              to="/collections/all?tags=Bestseller"
              className="text-xs sm:text-sm font-semibold text-brand-dark hover:text-blush-deep flex items-center space-x-1 transition-colors"
            >
              <span>View All Bestsellers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Slider arrows */}
            <div className="hidden sm:flex items-center space-x-2">
              <button
                ref={prevRef}
                className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-dark hover:bg-blush-light active:scale-95 transition-all shadow-xs"
                aria-label="Previous bestsellers"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                ref={nextRef}
                className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-dark hover:bg-blush-light active:scale-95 transition-all shadow-xs"
                aria-label="Next bestsellers"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1.3}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          onBeforeInit={(swiper) => {
            // @ts-expect-error Swiper params navigation typing
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-expect-error Swiper params navigation typing
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            480: {
              slidesPerView: 2.2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="pb-12"
        >
          {bestsellers.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
