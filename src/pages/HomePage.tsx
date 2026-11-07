import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { CategoryCircles } from '../sections/CategoryCircles';
import { ShopByPrice } from '../sections/ShopByPrice';
import { FeaturedCollections } from '../sections/FeaturedCollections';
import { BestsellersCarousel } from '../sections/BestsellersCarousel';
import { FindYourStyle } from '../sections/FindYourStyle';
import { ShopByMetal } from '../sections/ShopByMetal';
import { ShopForSplit } from '../sections/ShopForSplit';
import { NewArrivalsGrid } from '../sections/NewArrivalsGrid';
import { GiftingSection } from '../sections/GiftingSection';
import { OurJourneyTimeline } from '../sections/OurJourneyTimeline';
import { CraftsmanshipSection } from '../sections/CraftsmanshipSection';
import { TrustBadgesRow } from '../sections/TrustBadgesRow';
import { TestimonialsSlider } from '../sections/TestimonialsSlider';
import { InstagramGrid } from '../sections/InstagramGrid';
import { NewsletterSection } from '../sections/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Category circles */}
      <CategoryCircles />

      {/* 3. Shop by Price chips */}
      <ShopByPrice />

      {/* 4. Featured Collections bento */}
      <FeaturedCollections />

      {/* 5. Bestsellers carousel */}
      <BestsellersCarousel />

      {/* 6. Find your style cards */}
      <FindYourStyle />

      {/* 7. Shop by Metal / Finish */}
      <ShopByMetal />

      {/* 8. Shop for Him / Her split banner */}
      <ShopForSplit />

      {/* 9. New Arrivals grid */}
      <NewArrivalsGrid />

      {/* 10. Gifting section */}
      <GiftingSection />

      {/* 11. Our Journey timeline */}
      <OurJourneyTimeline />

      {/* 12. Craftsmanship counter animation */}
      <CraftsmanshipSection />

      {/* 13. Trust badges row */}
      <TrustBadgesRow />

      {/* 14. Testimonials slider */}
      <TestimonialsSlider />

      {/* 15. Instagram grid */}
      <InstagramGrid />

      {/* 16. Newsletter signup */}
      <NewsletterSection />
    </div>
  );
};

