import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Sparkles } from 'lucide-react';

export const NewArrivalsView: React.FC = () => {
  const { products } = useShop();

  const newProducts = products.filter(p => p.isNew || p.isBestSeller);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.25em] uppercase text-[#C6A867] font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LATEST SEASONAL RELEASES</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D]">
          New Arrivals
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          The newest expressions of fine tailoring, flowing silks, and contemporary casual refinement fresh from our ateliers.
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-600 pb-2">
        <span className="font-mono">
          Curated <strong className="text-[#0B1B3D]">{newProducts.length}</strong> new releases
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {newProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
