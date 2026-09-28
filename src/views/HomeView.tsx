import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { CATEGORIES_LIST } from '../data/products';
import { ArrowRight, Sparkles, ChevronRight, ShieldCheck, Star } from 'lucide-react';
import { PageRoute } from '../types';

export const HomeView: React.FC = () => {
  const { navigate, products } = useShop();
  const [activeTab, setActiveTab] = useState<'All' | 'Men' | 'Women' | 'Accessories' | 'Footwear'>('All');

  const filteredFeatured = products.filter(p => {
    if (activeTab === 'All') return p.isBestSeller || p.isNew;
    return p.category === activeTab;
  }).slice(0, 8);

  const handleCategoryClick = (catId: string) => {
    switch (catId) {
      case 'men':
        navigate('men');
        break;
      case 'women':
        navigate('women');
        break;
      case 'kids':
        navigate('kids');
        break;
      case 'accessories':
        navigate('accessories');
        break;
      case 'footwear':
        navigate('footwear');
        break;
      case 'ethnic':
        navigate('ethnic');
        break;
      case 'formal':
        navigate('formal');
        break;
      case 'casual':
        navigate('casual');
        break;
      case 'sportswear':
        navigate('sportswear');
        break;
      case 'winter':
        navigate('winter');
        break;
      default:
        navigate('men');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0B1B3D] text-[#FAF9F5]">
        {/* Ambient Gold & Navy Glow Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#C6A867] blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#162B56] blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-[#C6A867]/40 text-[#C6A867] text-[11px] tracking-[0.25em] uppercase font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AUTUMN / WINTER 2026 COUTURE</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance">
                Define Your Style.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-light leading-relaxed">
                Discover timeless fashion crafted for every moment. From hand-finished Italian wool blazers to Banarasi Kadwa silks, experience elegance woven into every thread.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => navigate('men')}
                  className="px-7 py-3.5 bg-[#C6A867] hover:bg-[#B89748] text-[#0B1B3D] font-bold text-xs tracking-widest uppercase transition-all shadow-lg active:scale-98 flex items-center gap-2 group"
                >
                  <span>SHOP MEN</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('women')}
                  className="px-7 py-3.5 bg-white hover:bg-slate-100 text-[#0B1B3D] font-bold text-xs tracking-widest uppercase transition-all shadow-md active:scale-98 flex items-center gap-2 group"
                >
                  <span>SHOP WOMEN</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('collections')}
                  className="px-6 py-3.5 border border-[#C6A867] text-[#FAF9F5] hover:text-[#C6A867] hover:bg-white/5 font-semibold text-xs tracking-widest uppercase transition-all"
                >
                  EXPLORE COLLECTION
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-8 border-t border-white/15 grid grid-cols-3 gap-4 text-xs text-slate-300">
                <div>
                  <span className="font-mono text-base font-bold text-[#C6A867] block">100%</span>
                  <span className="text-[11px] text-slate-400">Pure Natural Fabrics</span>
                </div>
                <div>
                  <span className="font-mono text-base font-bold text-[#C6A867] block">Bespoke</span>
                  <span className="text-[11px] text-slate-400">Precision Tailoring</span>
                </div>
                <div>
                  <span className="font-mono text-base font-bold text-[#C6A867] block">Express</span>
                  <span className="text-[11px] text-slate-400">Insured Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Gold Frame Accent */}
                <div className="absolute -inset-2 border border-[#C6A867]/50 rounded-sm translate-x-2 translate-y-2 pointer-events-none" />
                
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-900 rounded-sm shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80"
                    alt="NAVÉRA Autumn Campaign"
                    categoryHint="Campaign"
                    className="w-full h-full object-cover"
                  />
                  {/* Bottom Vignette with Editorial Callout */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/70 to-transparent p-6 text-white">
                    <span className="text-[10px] tracking-widest uppercase text-[#C6A867] font-mono">
                      SIGNATURE ATELIER PIECE
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white mt-1">
                      Classic Navy Wool Blazer
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5 font-mono">
                      Super 130s Italian Merino · Gold Button Accents
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-[#C6A867] font-semibold">
              CURATED DEPARTMENTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] mt-1">
              Explore By Category
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-sm mt-2 md:mt-0 leading-relaxed">
            Select a world of bespoke tailoring, timeless occasion wear, and elevated everyday staples.
          </p>
        </div>

        {/* 10 Visual Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES_LIST.map(cat => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative flex flex-col bg-white border border-slate-200 rounded-sm overflow-hidden hover:border-[#C6A867] hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.name}
                  categoryHint={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-x-3 bottom-3 text-white">
                  <h3 className="font-serif text-base sm:text-lg font-semibold tracking-wide group-hover:text-[#C6A867] transition-colors">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-[#E5DCC5] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ChevronRight className="w-3 h-3 text-[#C6A867]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-[#C6A867] font-semibold">
              SIGNATURE CREATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] mt-1">
              Featured Products
            </h2>
          </div>

          {/* Department Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-sm">
            {(['All', 'Men', 'Women', 'Accessories', 'Footwear'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === tab
                    ? 'bg-[#0B1B3D] text-[#FAF9F5] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFeatured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('new-arrivals')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0B1B3D] hover:bg-[#162B56] text-[#FAF9F5] text-xs font-semibold tracking-widest uppercase transition-all shadow-md"
          >
            <span>DISCOVER ALL NEW ARRIVALS</span>
            <ArrowRight className="w-4 h-4 text-[#C6A867]" />
          </button>
        </div>
      </section>

      {/* 4. ATELIER STORY & VALUES SPOTLIGHT */}
      <section className="bg-[#FAF9F5] border-y border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Editorial imagery */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden rounded-sm border border-slate-200">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80"
                  alt="Tailored craftsmanship"
                  categoryHint="Craft"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-sm border border-slate-200 translate-y-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                  alt="Banarasi weaving heritage"
                  categoryHint="Textiles"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Story copy */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs tracking-[0.25em] uppercase text-[#C6A867] font-semibold">
                THE PHILOSOPHY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] leading-tight">
                "Elegance in Every Thread."
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Founded with a singular vision to redefine Indian luxury fashion, NAVÉRA combines heritage handloom artistry with razor-sharp modern silhouettes. Every blazer, gown, and shirt is measured against stringent standards of drape, comfort, and enduring character.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0B1B3D] text-[#C6A867] flex items-center justify-center shrink-0 text-xs font-bold">
                    01
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#0B1B3D]">Conscious Provenance</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Sustainably sourced Giza Egyptian cotton, Normandy linen, and Silk Mark certified handlooms.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0B1B3D] text-[#C6A867] flex items-center justify-center shrink-0 text-xs font-bold">
                    02
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#0B1B3D]">Artisanal Hand-Finishing</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Real horn and mother-of-pearl buttons with hand-rolled lapels crafted by master artisans.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0B1B3D] text-[#C6A867] flex items-center justify-center shrink-0 text-xs font-bold">
                    03
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#0B1B3D]">Timeless Wardrobe Architecture</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Pieces engineered to transcend fleeting micro-trends and anchor your signature presence.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('about')}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0B1B3D] hover:text-[#C6A867] uppercase border-b-2 border-[#0B1B3D] pb-1 transition-colors"
                >
                  <span>Read Our Full Atelier Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED CLIENT REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs tracking-[0.25em] uppercase text-[#C6A867] font-semibold">
            VOICES OF DISTINCTION
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0B1B3D] mt-1">
            Worn by Patrons Across the Globe
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-sm space-y-4">
            <div className="flex text-[#C6A867]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="font-serif italic text-sm text-slate-700 leading-relaxed">
              "The Classic Navy Tailored Blazer is an absolute masterpiece. The drape across the shoulders and the subtle gold buttons lend an effortless aristocratic flair to every boardroom presentation."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0B1B3D]">Arjun Mehta</span>
              <span className="text-slate-400">Managing Partner, Bengaluru</span>
            </div>
          </div>

          <div className="bg-white border border-[#C6A867]/40 p-6 rounded-sm space-y-4 shadow-sm">
            <div className="flex text-[#C6A867]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="font-serif italic text-sm text-slate-700 leading-relaxed">
              "The Midnight Silk Satin Gown felt like pure liquid moonlight. The quality of fabric and invisible zipper finishing matches haute couture salons in Paris."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0B1B3D]">Meera Sen</span>
              <span className="text-slate-400">Creative Director, Mumbai</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-sm space-y-4">
            <div className="flex text-[#C6A867]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="font-serif italic text-sm text-slate-700 leading-relaxed">
              "Ordered the Banarasi Saree for my sister’s reception. The antique gold kadwa weave is breathtaking in person. Truly heirloom quality that will be passed down for generations."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0B1B3D]">Shalini Iyer</span>
              <span className="text-slate-400">Patron, New Delhi</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
