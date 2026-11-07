import React from 'react';
import { Instagram, Heart, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../data/config';

const INSTA_POSTS = [
  {
    image: 'https://kripalsilver.com/uploads/home-collections/1779194336_ca7.png',
    likes: '1.2k',
  },
  {
    image: 'https://kripalsilver.com/assets/images/indexpage-1.png',
    likes: '894',
  },
  {
    image: 'https://kripalsilver.com/uploads/jewellery-cards/1779194386_website3.png',
    likes: '1.5k',
  },
  {
    image: 'https://kripalsilver.com/uploads/jewellery-cards/1779194363_website1.png',
    likes: '960',
  },
  {
    image: 'https://kripalsilver.com/assets/images/Shop%20for%20him.png',
    likes: '740',
  },
  {
    image: 'https://kripalsilver.com/uploads/jewellery-cards/1779194410_website6.png',
    likes: '1.1k',
  },
];

export const InstagramGrid: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FDF6F7] border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-1.5 text-xs uppercase tracking-widest text-blush-deep font-semibold mb-1">
            <Instagram className="w-3.5 h-3.5" />
            <span>Join Our Silver Community</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-brand-black font-normal">
            Follow Us on Instagram
          </h2>
          <a
            href={BRAND_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-semibold text-blush-deep hover:underline mt-1 inline-block"
          >
            {BRAND_CONFIG.social.instagramHandle}
          </a>
        </div>

        {/* 6-col grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTA_POSTS.map((post, idx) => (
            <a
              key={idx}
              href={BRAND_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-luxury overflow-hidden bg-white shadow-xs border border-brand-border/60 block"
            >
              <img
                src={post.image}
                alt="Kripal Silver Instagram post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white space-x-1.5">
                <Heart className="w-4 h-4 fill-white" />
                <span className="text-xs font-semibold">{post.likes}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
