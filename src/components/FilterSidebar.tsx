import React from 'react';
import { RotateCcw, Check } from 'lucide-react';

export interface FilterOptions {
  category: string;
  clothingTypes: string[];
  sizes: string[];
  colors: string[];
  priceRange: string;
  tag: string;
  sortBy: string;
}

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
  availableCategories?: string[];
  totalResults: number;
}

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ALL_COLORS = [
  { name: 'Navy', hex: '#0B1B3D' },
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Blue', hex: '#2563EB' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Green', hex: '#059669' },
  { name: 'Pink', hex: '#EC4899' },
  { name: 'Gold', hex: '#C6A867' }
];

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-500', label: 'Under ₹500' },
  { id: '500-1000', label: '₹500 – ₹1,000' },
  { id: '1000-2000', label: '₹1,000 – ₹2,000' },
  { id: '2000-5000', label: '₹2,000 – ₹5,000' },
  { id: 'above-5000', label: 'Above ₹5,000' }
];

const TAGS = [
  { id: 'all', label: 'All Pieces' },
  { id: 'new', label: 'New Arrivals' },
  { id: 'bestseller', label: 'Best Sellers' },
  { id: 'sale', label: 'On Sale' },
  { id: 'rated', label: 'Highly Rated (4.8+)' }
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  availableCategories = ['All', 'Men', 'Women', 'Kids', 'Accessories', 'Footwear'],
  totalResults
}) => {
  const toggleSize = (size: string) => {
    const updated = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: updated });
  };

  const toggleColor = (colorName: string) => {
    const updated = filters.colors.includes(colorName)
      ? filters.colors.filter(c => c !== colorName)
      : [...filters.colors, colorName];
    onFilterChange({ ...filters, colors: updated });
  };

  const hasActiveFilters =
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange !== 'all' ||
    filters.tag !== 'all' ||
    filters.clothingTypes.length > 0;

  return (
    <aside className="w-full bg-white border border-slate-200 p-5 rounded-sm shadow-xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-baseline gap-2">
          <h3 className="font-serif text-base font-bold text-[#0B1B3D]">Refine By</h3>
          <span className="text-xs text-slate-500 font-mono">({totalResults} items)</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#0B1B3D] hover:text-[#C6A867] uppercase tracking-wider transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-[#0B1B3D] font-semibold mb-3">
          Department
        </h4>
        <div className="flex flex-col space-y-1 text-xs">
          {availableCategories.map(cat => {
            const isSelected = filters.category.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => onFilterChange({ ...filters, category: cat.toLowerCase() })}
                className={`flex items-center justify-between py-1.5 px-2 rounded-xs text-left transition-colors ${
                  isSelected
                    ? 'bg-[#0B1B3D] text-[#FAF9F5] font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{cat}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#C6A867]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Curated Highlights / Tags */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-[#0B1B3D] font-semibold mb-3">
          Collection Highlight
        </h4>
        <div className="flex flex-col space-y-1 text-xs">
          {TAGS.map(t => {
            const isSelected = filters.tag === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onFilterChange({ ...filters, tag: t.id })}
                className={`flex items-center justify-between py-1.5 px-2 rounded-xs text-left transition-colors ${
                  isSelected
                    ? 'bg-[#FAF9F5] text-[#0B1B3D] border-l-2 border-[#C6A867] font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-[#0B1B3D] font-semibold mb-3">
          Size
        </h4>
        <div className="grid grid-cols-3 gap-1.5">
          {ALL_SIZES.map(size => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`py-2 text-xs font-mono font-medium border text-center transition-colors ${
                  isSelected
                    ? 'bg-[#0B1B3D] text-white border-[#0B1B3D]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-[#0B1B3D] font-semibold mb-3">
          Color Palette
        </h4>
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map(c => {
            const isSelected = filters.colors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => toggleColor(c.name)}
                title={c.name}
                className={`relative w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                  isSelected
                    ? 'ring-2 ring-offset-2 ring-[#0B1B3D] scale-105'
                    : 'border-slate-300 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {isSelected && (
                  <Check
                    className={`w-3.5 h-3.5 ${
                      c.name === 'White' || c.name === 'Beige' ? 'text-black' : 'text-white'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
        {filters.colors.length > 0 && (
          <div className="mt-2 text-[11px] text-slate-500">
            Selected: <span className="font-semibold text-slate-700">{filters.colors.join(', ')}</span>
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-[#0B1B3D] font-semibold mb-3">
          Price Range
        </h4>
        <div className="flex flex-col space-y-1.5 text-xs">
          {PRICE_RANGES.map(p => {
            const isSelected = filters.priceRange === p.id;
            return (
              <label
                key={p.id}
                className="flex items-center gap-2.5 text-slate-700 cursor-pointer hover:text-black py-0.5"
              >
                <input
                  type="radio"
                  name="priceRange"
                  checked={isSelected}
                  onChange={() => onFilterChange({ ...filters, priceRange: p.id })}
                  className="accent-[#0B1B3D]"
                />
                <span className={isSelected ? 'font-semibold text-[#0B1B3D]' : ''}>
                  {p.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
