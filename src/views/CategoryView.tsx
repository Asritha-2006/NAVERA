import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar, FilterOptions } from '../components/FilterSidebar';
import { SlidersHorizontal, ArrowUpDown, ChevronDown } from 'lucide-react';

interface CategoryViewProps {
  categoryTitle: string;
  categorySlug: string;
  subtitle?: string;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  categoryTitle,
  categorySlug,
  subtitle
}) => {
  const { products } = useShop();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterOptions>({
    category: categorySlug,
    clothingTypes: [],
    sizes: [],
    colors: [],
    priceRange: 'all',
    tag: 'all',
    sortBy: 'popularity'
  });

  const handleResetFilters = () => {
    setFilters({
      category: categorySlug,
      clothingTypes: [],
      sizes: [],
      colors: [],
      priceRange: 'all',
      tag: 'all',
      sortBy: 'popularity'
    });
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category / Type matching
      if (categorySlug === 'men' && p.category !== 'Men') return false;
      if (categorySlug === 'women' && p.category !== 'Women') return false;
      if (categorySlug === 'kids' && p.category !== 'Kids') return false;
      if (categorySlug === 'accessories' && p.category !== 'Accessories') return false;
      if (categorySlug === 'footwear' && p.category !== 'Footwear') return false;
      if (categorySlug === 'ethnic' && !p.subCategory.toLowerCase().includes('ethnic')) return false;
      if (categorySlug === 'formal' && !p.subCategory.toLowerCase().includes('formal')) return false;
      if (categorySlug === 'casual' && !p.subCategory.toLowerCase().includes('casual')) return false;
      if (categorySlug === 'sportswear' && !p.clothingType.toLowerCase().includes('casual') && !p.category.toLowerCase().includes('footwear')) return false;
      if (categorySlug === 'winter' && !p.subCategory.toLowerCase().includes('winter')) return false;

      // Secondary department filter if user switched
      if (filters.category !== 'all' && filters.category !== categorySlug) {
        if (p.category.toLowerCase() !== filters.category.toLowerCase()) return false;
      }

      // Sizes filter
      if (filters.sizes.length > 0) {
        const hasMatchingSize = filters.sizes.some(s => p.sizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      // Colors filter
      if (filters.colors.length > 0) {
        const hasMatchingColor = filters.colors.some(c =>
          p.colors.some(col => col.name.toLowerCase() === c.toLowerCase())
        );
        if (!hasMatchingColor) return false;
      }

      // Price ranges
      if (filters.priceRange === 'under-500' && p.price >= 500) return false;
      if (filters.priceRange === '500-1000' && (p.price < 500 || p.price > 1000)) return false;
      if (filters.priceRange === '1000-2000' && (p.price < 1000 || p.price > 2000)) return false;
      if (filters.priceRange === '2000-5000' && (p.price < 2000 || p.price > 5000)) return false;
      if (filters.priceRange === 'above-5000' && p.price < 5000) return false;

      // Special tags
      if (filters.tag === 'new' && !p.isNew) return false;
      if (filters.tag === 'bestseller' && !p.isBestSeller) return false;
      if (filters.tag === 'sale' && !p.isSale) return false;
      if (filters.tag === 'rated' && p.rating < 4.8) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return b.reviewCount - a.reviewCount; // Popularity
    });
  }, [products, categorySlug, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Category Header */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <span className="text-[11px] tracking-[0.25em] uppercase text-[#C6A867] font-semibold">
          COLLECTION CATALOGUE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] mt-1">
          {categoryTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          {subtitle || 'Handcrafted garments and refined wardrobe essentials designed with bespoke detailing.'}
        </p>
      </div>

      {/* Controls Bar: Results count, Mobile Filter Button, Sorting Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-[#FAF9F5] p-3 border border-slate-200 rounded-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-[#0B1B3D] text-white text-xs font-semibold tracking-wider uppercase"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C6A867]" />
            <span>Filters</span>
          </button>
          <span className="text-xs text-slate-600 font-mono">
            Showing <strong className="text-[#0B1B3D]">{filteredProducts.length}</strong> creations
          </span>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 uppercase tracking-wider font-medium">Sort By:</span>
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={e => setFilters({ ...filters, sortBy: e.target.value })}
              className="appearance-none bg-white border border-slate-300 text-slate-800 text-xs py-1.5 pl-3 pr-8 focus:outline-hidden focus:border-[#0B1B3D] font-medium cursor-pointer"
            >
              <option value="popularity">Popularity</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
            totalResults={filteredProducts.length}
          />
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="lg:hidden col-span-1 mb-4">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
              totalResults={filteredProducts.length}
            />
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 p-12 text-center rounded-sm">
              <h3 className="font-serif text-xl font-bold text-[#0B1B3D] mb-2">
                No matching creations found
              </h3>
              <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
                No items in this department match your selected filter criteria. Try resetting your sizes, colors, or price bracket.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#0B1B3D] text-[#FAF9F5] text-xs font-semibold tracking-wider uppercase hover:bg-[#162B56] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
