import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const STYLE_CARDS = [
  {
    id: 1,
    title: 'Bold Jewellery',
    description: 'Stand out with pieces as strong as she is',
    image: 'https://kripalsilver.com/uploads/jewellery-cards/1779194363_website1.png',
    link: '/collections/all?tags=Trending',
  },
  {
    id: 2,
    title: 'Minimal Jewellery',
    description: 'Light, versatile pieces for your every role',
    image: 'https://kripalsilver.com/uploads/jewellery-cards/1779194374_website2.png',
    link: '/collections/all?category=rings',
  },
  {
    id: 3,
    title: 'Jewellery Sets',
    description: 'Complete looks, thoughtfully curated for you',
    image: 'https://kripalsilver.com/uploads/jewellery-cards/1779194386_website3.png',
    link: '/collections/jewellery-sets',
  },
  {
    id: 4,
    title: 'Matching Jewellery',
    description: 'Match, gift, and feel closer, no matter the distance',
    image: 'https://kripalsilver.com/uploads/jewellery-cards/1779194398_website4.png',
    link: '/gifting',
  },
  {
    id: 5,
    title: 'Divine Jewellery',
    description: 'Celebrate strength with jewellery that speaks for you',
    image: 'https://kripalsilver.com/assets/images/website5.png',
    link: '/collections/all?tags=Handcrafted',
  },
  {
    id: 6,
    title: 'Timeless Pearls',
    description: 'Classic pearls made for moments that matter',
    image: 'https://kripalsilver.com/uploads/jewellery-cards/1779194410_website6.png',
    link: '/collections/earrings',
  },
];

export const FindYourStyle: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FDF6F7] border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-1.5 text-xs uppercase tracking-widest text-blush-deep font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover Your Persona</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-brand-black font-normal">
            Find Your Style
          </h2>
        </div>

        {/* Horizontal scroll on mobile, staggered grid on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STYLE_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
            >
              <Link
                to={card.link}
                className="group relative rounded-luxury overflow-hidden bg-white shadow-card border border-brand-border block aspect-[4/3]"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <h3 className="font-serif text-xl sm:text-2xl font-medium mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-snug mb-3">
                    {card.description}
                  </p>
                  <div className="flex items-center space-x-1 text-xs font-semibold tracking-wider uppercase text-blush-accent group-hover:text-white transition-colors">
                    <span>Shop Style</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

