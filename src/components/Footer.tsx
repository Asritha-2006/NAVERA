import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PageRoute } from '../types';
import { Send, CheckCircle2, Instagram, Facebook, Youtube, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, showToast } = useShop();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to NAVÉRA Privé. Check your inbox for your 15% welcome code.', 'success');
  };

  const handleLink = (route: PageRoute) => {
    navigate(route);
  };

  return (
    <footer className="bg-[#061024] text-[#FAF9F5] border-t border-[#C6A867]/30">
      {/* Brand Trust Bar */}
      <div className="border-b border-white/10 bg-[#08152e] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-[#C6A867] mb-2" />
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#FAF9F5]">Artisanal Craftsmanship</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Sourced fabrics & master tailoring</p>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-6 h-6 text-[#C6A867] mb-2" />
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#FAF9F5]">Insured Express Delivery</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Complimentary over ₹1,999</p>
          </div>
          <div className="flex flex-col items-center">
            <RefreshCw className="w-6 h-6 text-[#C6A867] mb-2" />
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#FAF9F5]">7-Day Atelier Exchanges</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Hassle-free doorstep pickup</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-[#C6A867] mb-2" />
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#FAF9F5]">Guaranteed Authenticity</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Direct from certified weavers</p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C6A867] font-semibold">
            THE NAVÉRA JOURNAL
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1 mb-2">
            Stay Ahead of the Style Curve.
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-6 leading-relaxed">
            Subscribe for private preview access to limited seasonal runs, bespoke styling consultations, and 15% off your maiden acquisition.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1B3D] border border-[#C6A867] text-[#C6A867] text-xs font-semibold tracking-widest uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>You are subscribed to the NAVÉRA Privé Circle</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-hidden focus:border-[#C6A867] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C6A867] hover:bg-[#B89748] text-[#0B1B3D] font-bold text-xs tracking-widest uppercase transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 shrink-0"
              >
                <span>SUBSCRIBE</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Navigation Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Presentation */}
          <div className="md:col-span-2">
            <span className="font-serif text-2xl font-bold tracking-[0.25em] text-[#FAF9F5] flex items-baseline">
              NAVÉRA
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A867] ml-1 mb-1 inline-block" />
            </span>
            <p className="text-xs text-[#C6A867] tracking-widest uppercase font-light mt-0.5 mb-4">
              Elegance in Every Thread.
            </p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-6">
              NAVÉRA crafts modern, comfortable, and expressive couture across menswear, womenswear, and bespoke heirlooms with meticulous attention to tailoring and sustainably certified textiles.
            </p>
            <div className="flex items-center gap-4 text-slate-300">
              <button
                onClick={() => showToast('Opening NAVÉRA Instagram atelier stream...')}
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-white/20 hover:border-[#C6A867] hover:text-[#C6A867] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                onClick={() => showToast('Opening NAVÉRA Facebook gallery...')}
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-white/20 hover:border-[#C6A867] hover:text-[#C6A867] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={() => showToast('Opening NAVÉRA YouTube lookbooks...')}
                aria-label="YouTube"
                className="w-8 h-8 rounded-full border border-white/20 hover:border-[#C6A867] hover:text-[#C6A867] flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#C6A867] mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => handleLink('men')} className="hover:text-[#C6A867] transition-colors">
                  Men's Fashion
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('women')} className="hover:text-[#C6A867] transition-colors">
                  Women's Fashion
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('kids')} className="hover:text-[#C6A867] transition-colors">
                  Kids' Fashion
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('new-arrivals')} className="hover:text-[#C6A867] transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('sale')} className="hover:text-[#C6A867] transition-colors">
                  Flash Sale (Up to 50% Off)
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#C6A867] mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => handleLink('contact')} className="hover:text-[#C6A867] transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('faq')} className="hover:text-[#C6A867] transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('order-tracking')} className="hover:text-[#C6A867] transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Shipping policy: Free express delivery across India on orders over ₹1,999.', 'info')}
                  className="hover:text-[#C6A867] transition-colors"
                >
                  Shipping & Customs
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Returns: 7-day hassle-free doorstep exchange and refund policy.', 'info')}
                  className="hover:text-[#C6A867] transition-colors"
                >
                  Returns & Exchanges
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#C6A867] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => handleLink('about')} className="hover:text-[#C6A867] transition-colors">
                  About Us & Story
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('collections')} className="hover:text-[#C6A867] transition-colors">
                  Seasonal Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Careers: Explore bespoke styling & merchandising roles at careers@navera.com', 'info')}
                  className="hover:text-[#C6A867] transition-colors"
                >
                  Careers at Atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Privacy Policy: All customer data is encrypted with strict confidentiality.', 'info')}
                  className="hover:text-[#C6A867] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Terms of Service: Certified luxury garment warranty and legal compliance.', 'info')}
                  className="hover:text-[#C6A867] transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 NAVÉRA Luxury Retail Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[11px] font-mono tracking-wider text-slate-300">
            <span className="px-2 py-0.5 border border-white/10 bg-white/5 rounded-xs">UPI</span>
            <span className="px-2 py-0.5 border border-white/10 bg-white/5 rounded-xs">VISA</span>
            <span className="px-2 py-0.5 border border-white/10 bg-white/5 rounded-xs">MASTERCARD</span>
            <span className="px-2 py-0.5 border border-white/10 bg-white/5 rounded-xs">NETBANKING</span>
            <span className="px-2 py-0.5 border border-white/10 bg-white/5 rounded-xs">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
