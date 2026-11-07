import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '../components/common/Toast';

export const NewsletterSection: React.FC = () => {
  const [contact, setContact] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;

    setSubscribed(true);
    showToast({
      title: 'Welcome to Kripal Jewellers!',
      description: 'Your ₹150 OFF coupon code KRIPAL150 is ready to use.',
      type: 'success',
    });
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-luxury-lg bg-gradient-to-br from-[#2B2B2B] via-[#232323] to-[#1A1A1A] text-white p-8 sm:p-14 text-center overflow-hidden shadow-float">
          {/* Subtle background glitter effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blush-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blush-deep/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-blush-accent mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Exclusive Member Privilege</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal mb-3">
              Get Flat ₹150 OFF
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 mb-8 leading-relaxed">
              Subscribe to the Kripal Silver inner circle for secret festival drops, complimentary gemstone care guides, and instant ₹150 off your first purchase.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-luxury bg-white/10 backdrop-blur-md border border-emerald-400/40 text-emerald-300 flex items-center justify-center space-x-2 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>You're in! Use coupon code <strong>KRIPAL150</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter email or WhatsApp number"
                  required
                  className="flex-1 px-4 py-3 rounded-luxury bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-blush-accent backdrop-blur-md"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-luxury bg-blush-accent text-brand-dark text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-white active:scale-97 transition-all flex items-center justify-center space-x-2 shadow-card shrink-0"
                >
                  <span>Claim ₹150</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <p className="text-[10px] text-gray-400 mt-4">
              No spam, ever. Only exquisite handcrafted silver and honest festival announcements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

