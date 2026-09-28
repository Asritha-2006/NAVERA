import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How can I place an order?',
    answer: 'Select your garment of choice, choose your desired size and color palette, and click "Add to Shopping Bag". When you are ready to complete your acquisition, open your shopping bag, apply any promotional voucher codes (e.g. NAVY10), and click "Proceed to Checkout". You can either check out with your stored patron profile or enter your destination details in three simple steps.',
    category: 'Orders'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We support all major Indian and international digital payment instruments: UPI (Google Pay, PhonePe, Paytm, BHIM, QR code), Credit Cards (Visa, MasterCard, American Express, RuPay), Debit Cards, Net Banking across 50+ leading Indian banks, and Cash on Delivery (COD) for eligible domestic postal codes.',
    category: 'Payments'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard Insured Delivery typically delivers within 3 to 5 business days across Indian metropolitan hubs and tier-1/2 cities. If you select our "NAVÉRA Privé Express White Glove" courier service at checkout, your pieces will arrive within 24 to 48 hours in a signature hard-box luxury casing.',
    category: 'Shipping'
  },
  {
    question: 'Can I cancel my order?',
    answer: 'You may cancel an order free of charge at any time prior to dispatch from our central atelier hub. Once our master tailors dispatch the consignment with courier tracking, cancellation is no longer possible; however, you can refuse the package at doorstep or initiate our 7-day hassle-free return upon receipt.',
    category: 'Orders'
  },
  {
    question: 'What is the return policy?',
    answer: 'NAVÉRA offers a 7-day hassle-free return and exchange policy from the date of physical delivery. Garments must be unworn, unwashed, and in their original packaging with all security seals, brass tags, and dust bags intact. Doorstep courier pickup is complimentary for size swaps and store credit exchanges.',
    category: 'Returns'
  },
  {
    question: 'How can I track my order?',
    answer: 'Navigate to our dedicated "Track Order" page from the top navigation or footer. Simply input your unique Order Reference Number (e.g. NAV-2026-9841) to inspect real-time logistics milestones from cutting and quality inspection to out-for-delivery status.',
    category: 'Shipping'
  },
  {
    question: 'How can I change my delivery address?',
    answer: 'If your order has not yet been marked as "Shipped", you can update the destination address directly by contacting our concierge desk at concierge@navera.com or calling +91 80 4920 1800 with your order ID. You can also manage your permanent shipping addresses inside your Account Dashboard.',
    category: 'Account'
  }
];

export const FaqView: React.FC = () => {
  const { navigate } = useShop();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center pb-6 border-b border-slate-200">
        <span className="text-[11px] tracking-[0.25em] uppercase text-[#C6A867] font-semibold">
          CLIENT ASSISTANCE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] mt-1">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg mx-auto">
          Clear answers regarding atelier ordering, payment security, bespoke sizing, and door-to-door courier logistics.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-sm overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0B1B3D]/5 text-[#C6A867] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-serif text-base font-bold text-[#0B1B3D]">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#C6A867] transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FAF9F5]/40 animate-fade-in">
                  <p>{faq.answer}</p>
                  <span className="inline-block mt-3 text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                    Category: {faq.category}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Need Assistance Banner */}
      <div className="p-6 bg-[#0B1B3D] text-[#FAF9F5] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-serif text-lg font-bold text-white">Have a unique styling inquiry?</h4>
          <p className="text-xs text-slate-300 mt-0.5">Our master tailors and stylists are ready to consult with you directly.</p>
        </div>
        <button
          onClick={() => navigate('contact')}
          className="px-6 py-2.5 bg-[#C6A867] hover:bg-[#B89748] text-[#0B1B3D] text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5"
        >
          <span>Contact Concierge</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
