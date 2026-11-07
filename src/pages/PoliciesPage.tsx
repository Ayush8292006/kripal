import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';
import { BRAND_CONFIG } from '../data/config';

export const PoliciesPage: React.FC = () => {
  const { type = 'shipping' } = useParams<{ type: string }>();

  const getPolicyContent = () => {
    switch (type) {
      case 'returns':
        return {
          title: '30-Day Easy Returns & Exchange Policy',
          icon: RotateCcw,
          content: [
            'At Kripal Jewellers, we take pride in our 25+ years of customer trust. If you are not completely enchanted with your purchase, you may initiate a return or exchange within 30 days of delivery.',
            'Products must be unworn, in their original condition, with the 925 laser hallmark tag and original luxury velvet packaging intact.',
            'Doorstep reverse pickup is complimentary across India. Once inspected at our Rajkot atelier, refunds are credited back to your original payment method within 3 to 5 business days.',
            'Custom engraved or bespoke bridal sets are eligible for lifetime plating and resize assistance rather than standard return.',
          ],
        };
      case 'privacy':
        return {
          title: 'Privacy & Data Protection Policy',
          icon: Lock,
          content: [
            'Kripal Jewellers is dedicated to safeguarding your privacy. We collect personal data solely to fulfill orders, deliver tracking updates, and customize your jewellery shopping experience.',
            'We never sell, rent, or trade your phone number, email address, or payment details to any third-party advertisers.',
            'All payment transactions are processed through 256-bit encrypted gateways (Razorpay, UPI, verified bank networks). We never store your card CVV or net banking credentials.',
          ],
        };
      case 'shipping':
      default:
        return {
          title: 'Insured Shipping & Delivery Policy',
          icon: Truck,
          content: [
            'All jewellery dispatches are 100% insured against loss or transit damage from our Rajkot atelier to your doorstep.',
            `Orders above ₹${BRAND_CONFIG.freeShippingThreshold} qualify for Free Express Insured Delivery across India. For orders below this value, a nominal fee of ₹${BRAND_CONFIG.defaultShippingFee} applies.`,
            'Dispatch typically occurs within 24 hours on business days. Delivery to Gujarat and metropolitan centers takes 1 to 2 business days; all other Indian pin codes take 3 to 5 business days.',
            'Deliveries require a digital OTP or signature upon delivery to ensure total security.',
          ],
        };
    }
  };

  const policy = getPolicyContent();
  const Icon = policy.icon;

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-blush-light text-blush-deep flex items-center justify-center mx-auto mb-3">
            <Icon className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-brand-black">
            {policy.title}
          </h1>
          <p className="text-xs text-brand-gray mt-1">Kripal Jewellers · Since 1998</p>
        </div>

        <div className="p-6 sm:p-10 rounded-luxury bg-[#FAF2F4] border border-brand-border space-y-4 text-xs sm:text-sm text-brand-gray leading-relaxed">
          {policy.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <div className="pt-6 border-t border-brand-border/80 text-xs text-brand-dark">
            <p>
              Have further questions? Reach out to our concierge at{' '}
              <a href={`mailto:${BRAND_CONFIG.email}`} className="text-blush-deep font-semibold underline">
                {BRAND_CONFIG.email}
              </a>{' '}
              or WhatsApp us at{' '}
              <a href={BRAND_CONFIG.whatsappUrl} className="text-blush-deep font-semibold underline">
                {BRAND_CONFIG.phone}
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

