import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, Flame, Clock } from 'lucide-react';

export const SaleView: React.FC = () => {
  const { products } = useShop();

  // Flash Sale Countdown Timer (Hours : Minutes : Seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter products that have discounts or are flagged for sale
  const saleProducts = products.filter(
    p => p.isSale || (p.discountPercent && p.discountPercent >= 20)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Flash Sale Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#061024] via-[#0B1B3D] to-[#162B56] text-white p-8 sm:p-12 rounded-sm border border-[#C6A867]/40 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C6A867]/20 border border-[#C6A867] text-[#C6A867] text-[10px] tracking-[0.25em] uppercase font-bold">
              <Flame className="w-3.5 h-3.5" />
              <span>LIMITED ATELIER CLEARANCE</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Privé Flash Sale: Up to 50% OFF
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Acquire certified Italian wool blazers, hand-woven Banarasi sarees, and organic cotton essentials at seasonal celebratory privileges.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="bg-[#0B1B3D]/80 border border-[#C6A867]/50 p-5 rounded-sm shadow-xl shrink-0">
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#C6A867] uppercase tracking-widest font-semibold mb-3">
              <Clock className="w-3.5 h-3.5" />
              <span>OFFER EXPIRES IN</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-center">
              <div className="bg-white/10 px-3 py-2 border border-white/20 min-w-16">
                <span className="text-2xl sm:text-3xl font-bold text-white block">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">Hours</span>
              </div>
              <span className="text-xl font-bold text-[#C6A867]">:</span>
              <div className="bg-white/10 px-3 py-2 border border-white/20 min-w-16">
                <span className="text-2xl sm:text-3xl font-bold text-white block">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">Mins</span>
              </div>
              <span className="text-xl font-bold text-[#C6A867]">:</span>
              <div className="bg-white/10 px-3 py-2 border border-white/20 min-w-16">
                <span className="text-2xl sm:text-3xl font-bold text-[#C6A867] block">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sale Product Grid */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <span className="text-xs uppercase tracking-widest text-slate-600 font-medium">
            Showing <strong className="text-[#0B1B3D] font-mono">{saleProducts.length}</strong> Discounted Garments
          </span>
          <span className="text-xs text-[#0B1B3D] font-semibold bg-[#C6A867]/20 px-2.5 py-1">
            Complimentary shipping on orders over ₹1,999
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {saleProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
