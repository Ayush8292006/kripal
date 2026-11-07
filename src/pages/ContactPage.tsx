import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  Instagram,
  Facebook,
  Sparkles,
} from 'lucide-react';
import { BRAND_CONFIG } from '../data/config';
import { useToast } from '../components/common/Toast';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast({
      title: 'Message Received',
      description: 'Our Rajkot atelier concierge will respond within 2 business hours.',
      type: 'success',
    });
  };

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blush-light text-xs font-semibold uppercase tracking-wider text-blush-deep mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atelier Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-brand-black mb-3">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm text-brand-gray">
            Whether you are inquiring about a custom bridal order, size consultation, or gifting guidance, our team in Rajkot is delighted to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Direct Contact Info & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-luxury bg-[#FAF2F4] border border-brand-border space-y-5">
              <h3 className="font-serif text-xl font-medium text-brand-black">
                Atelier Location & Hours
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-brand-gray">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blush-deep shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-dark block font-semibold">Rajkot Atelier & Works:</strong>
                    <span>
                      {BRAND_CONFIG.address.line1}, {BRAND_CONFIG.address.road}, {BRAND_CONFIG.address.city} - {BRAND_CONFIG.address.pincode}, {BRAND_CONFIG.address.state}, India.
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blush-deep shrink-0" />
                  <div>
                    <strong className="text-brand-dark block font-semibold">Phone Support:</strong>
                    <a href={`tel:${BRAND_CONFIG.phone}`} className="hover:text-blush-deep font-mono">
                      {BRAND_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blush-deep shrink-0" />
                  <div>
                    <strong className="text-brand-dark block font-semibold">Email Concierge:</strong>
                    <a href={`mailto:${BRAND_CONFIG.email}`} className="hover:text-blush-deep">
                      {BRAND_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blush-deep shrink-0" />
                  <div>
                    <strong className="text-brand-dark block font-semibold">Showroom Timings:</strong>
                    <span>Mon - Sat: 10:00 AM – 8:00 PM IST</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout Button */}
              <a
                href={BRAND_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-luxury bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:brightness-105 active:scale-98 transition-all flex items-center justify-center space-x-2 shadow-card"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>

            {/* Social channels */}
            <div className="p-4 rounded-luxury border border-brand-border flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-dark">Follow Our Silver Journey:</span>
              <div className="flex space-x-2">
                <a
                  href={BRAND_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-blush-light text-brand-dark flex items-center justify-center hover:bg-blush-accent hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={BRAND_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-blush-light text-brand-dark flex items-center justify-center hover:bg-blush-accent hover:text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-luxury border border-brand-border shadow-card">
            <h3 className="font-serif text-2xl font-medium text-brand-black mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs text-brand-gray mb-6">
              Fill out this form and our Rajkot jewellery specialists will get back to you promptly.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-luxury text-emerald-800">
                <h4 className="font-serif text-xl font-bold mb-1">Message Sent Successfully!</h4>
                <p className="text-xs text-emerald-700">Thank you for reaching out to Kripal Jewellers.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Dr. Hiren Patel"
                      className="w-full text-xs p-3 rounded-luxury border border-brand-border focus:outline-none focus:border-blush-deep"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+91 99781 03393"
                      className="w-full text-xs p-3 rounded-luxury border border-brand-border focus:outline-none focus:border-blush-deep"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="vipulajani11233@gmail.com"
                    className="w-full text-xs p-3 rounded-luxury border border-brand-border focus:outline-none focus:border-blush-deep"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1">
                    Message / Product Inquiry *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Please specify if you need customization or have questions about a design..."
                    className="w-full text-xs p-3 rounded-luxury border border-brand-border focus:outline-none focus:border-blush-deep resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-black shadow-card flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

