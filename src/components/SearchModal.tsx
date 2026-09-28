import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

const POPULAR_SEARCHES = [
  'Navy Blazer',
  'Silk Saree',
  'Cotton White Shirt',
  'Evening Gown',
  'Sneakers',
  'Linen Shirt',
  'Gold Watch',
  'Anarkali'
];

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigate } = useShop();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return products.filter(p => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchSub = p.subCategory.toLowerCase().includes(q);
      const matchType = p.clothingType.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchMaterial = p.material.toLowerCase().includes(q);
      const matchColor = p.colors.some(c => c.name.toLowerCase().includes(q));
      return matchName || matchCat || matchSub || matchType || matchDesc || matchMaterial || matchColor;
    });
  }, [query, products]);

  if (!isSearchOpen) return null;

  const handleClose = () => {
    setIsSearchOpen(false);
    setQuery('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white/98 backdrop-blur-md animate-fade-in overflow-hidden">
      {/* Top Search Header */}
      <div className="border-b border-slate-200 bg-[#FAF9F5] px-6 py-6 md:py-8 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="relative flex-1 flex items-center">
            <Search className="w-6 h-6 text-[#C6A867] shrink-0 mr-3" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search garments, categories, fabrics, or colors (e.g. Navy Blazer, Silk, Saree)..."
              autoFocus
              className="w-full bg-transparent text-lg md:text-xl font-medium text-[#0B1B3D] placeholder-slate-400 focus:outline-hidden"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors mr-2"
                aria-label="Clear search input"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <button
            onClick={handleClose}
            className="flex items-center gap-1 text-xs tracking-widest uppercase font-semibold text-slate-600 hover:text-[#0B1B3D] px-3 py-2 border border-slate-200 hover:border-slate-400 bg-white transition-colors"
          >
            <span>Close</span>
            <X className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Suggestion Tags */}
        <div className="max-w-5xl mx-auto mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-600 flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A867]" />
            Trending Searches:
          </span>
          {POPULAR_SEARCHES.map(item => (
            <button
              key={item}
              onClick={() => handleSuggestionClick(item)}
              className="text-xs text-slate-700 hover:text-[#0B1B3D] hover:bg-[#C6A867]/15 bg-white border border-slate-200/80 px-2.5 py-1 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Results Viewport */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {query.trim() === '' ? (
            <div className="py-16 text-center max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0B1B3D]/5 border border-[#C6A867]/30 flex items-center justify-center text-[#C6A867]">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0B1B3D] mb-2">
                Discover the NAVÉRA Collection
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Type above to search through our luxury tailored blazers, bespoke formal wear, Banarasi silk sarees, cashmere knitwear, and accessories.
              </p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
                <span className="text-xs uppercase tracking-widest text-slate-500">
                  Found <strong className="text-[#0B1B3D] font-mono">{filteredProducts.length}</strong> creations matching "{query}"
                </span>
                <span className="text-xs text-slate-400">Click any garment to inspect specifications</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(p => (
                  <div key={p.id} onClick={handleClose}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-16 text-center max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0B1B3D] mb-2">
                No matching garments found
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                We couldn't find any items matching "{query}". Try checking your spelling or search by general category like "Blazer", "Dress", "Saree", or "Cotton".
              </p>
              <button
                onClick={() => {
                  handleClose();
                  navigate('new-arrivals');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1B3D] text-[#FAF9F5] text-xs font-semibold tracking-wider uppercase hover:bg-[#162B56] transition-colors"
              >
                <span>Browse New Arrivals</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C6A867]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
