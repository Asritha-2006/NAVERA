import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { COLLECTIONS_LIST } from '../data/products';
import { Sparkles, ArrowRight } from 'lucide-react';

export const CollectionsView: React.FC = () => {
  const { products } = useShop();
  const [selectedCollection, setSelectedCollection] = useState(COLLECTIONS_LIST[0]);

  const collectionProducts = products.filter(
    p => p.collection === selectedCollection.title || p.subCategory.includes(selectedCollection.title.split(' ')[0])
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-[11px] tracking-[0.25em] uppercase text-[#C6A867] font-semibold">
          THEMED ARCHIVES
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] mt-1">
          Atelier Collections
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Thematic curations harmonizing fabric textures, seasonal weights, and design silhouettes.
        </p>
      </div>

      {/* Collection Switcher Pills / Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {COLLECTIONS_LIST.map(col => {
          const isSelected = selectedCollection.id === col.id;
          return (
            <button
              key={col.id}
              onClick={() => setSelectedCollection(col)}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-[#0B1B3D] text-[#FAF9F5] border-[#0B1B3D] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
              }`}
            >
              <span>{col.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Collection Showcase Banner */}
      <div className="bg-gradient-to-r from-[#0B1B3D] to-[#162B56] text-white p-8 sm:p-10 rounded-sm border border-[#C6A867]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-widest uppercase font-mono text-[#C6A867] font-bold">
            {selectedCollection.badge} · {collectionProducts.length} CREATIONS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            {selectedCollection.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">{selectedCollection.tagline}</p>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-xs text-slate-400">Exclusive Atelier Line</span>
          <p className="font-serif text-sm font-semibold text-[#C6A867]">NAVÉRA Autumn Edition</p>
        </div>
      </div>

      {/* Grid of Products in this Collection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {collectionProducts.length > 0 ? (
          collectionProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          products.slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} />
          ))
        )}
      </div>
    </div>
  );
};
