import React from 'react';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ShieldCheck, Leaf, Users, Sparkles, Compass, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { navigate } = useShop();

  const values = [
    {
      icon: ShieldCheck,
      title: 'Uncompromising Quality',
      description: 'From 120s two-ply Egyptian cotton to Italian-milled merino wool, every fiber meets rigorous tensile and colorfastness standards.'
    },
    {
      icon: Leaf,
      title: 'Sustainability & Provenance',
      description: 'Ethically spun yarns, low-impact botanical dyes, and certified Silk Mark handlooms preserving traditional weaver communities.'
    },
    {
      icon: Users,
      title: 'Customer First Privé',
      description: 'Doorstep size exchanges, dedicated style concierges, and an unwavering commitment to your sartorial confidence.'
    },
    {
      icon: Sparkles,
      title: 'Innovation in Drapery',
      description: 'Harmonizing classic heritage cuts with modern stretch ease and wrinkle-resistant breathable weaves for global travel.'
    },
    {
      icon: Compass,
      title: 'Timeless Design Architecture',
      description: 'We reject disposable fast fashion. Every silhouette is crafted to remain relevant, revered, and commanding year after year.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Header */}
      <section className="bg-[#0B1B3D] text-[#FAF9F5] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C6A867]/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#C6A867] font-semibold">
            THE ATELIER HERITAGE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Elegance in Every Thread.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Founded with the belief that luxury clothing should unite effortless comfort with commanding elegance.
          </p>
        </div>
      </section>

      {/* Brand Statistics Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-10">
        <div className="bg-white border border-[#C6A867]/40 shadow-xl rounded-sm p-6 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] block font-mono">
              14+
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium mt-1 block">
              Years of Experience
            </span>
          </div>
          <div>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] block font-mono">
              250K+
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium mt-1 block">
              Garments Tailored
            </span>
          </div>
          <div>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] block font-mono">
              120K+
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium mt-1 block">
              Happy Global Patrons
            </span>
          </div>
          <div>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] block font-mono">
              28
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium mt-1 block">
              Countries Served
            </span>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs tracking-[0.25em] uppercase text-[#C6A867] font-semibold">
              OUR ORIGIN
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D]">
              Born to Bridge Regal Heritage and Modern Sensibility
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              NAVÉRA was established to solve a perennial wardrobe challenge: formal and occasion wear was either overly rigid and unbreathable, or fleeting and disposable.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Drawing inspiration from India's millennia-old textile prowess—from Banarasi kadwa zari to Chanderi silk—and fusing it with European bespoke canvas tailoring, our ateliers sculpt garments that feel as sublime as they look.
            </p>
            <div className="p-6 bg-[#FAF9F5] border-l-2 border-[#C6A867] space-y-2">
              <span className="text-[10px] tracking-widest uppercase font-mono text-[#C6A867] font-bold">
                OUR MISSION
              </span>
              <p className="font-serif text-lg font-bold text-[#0B1B3D] italic">
                "To make premium fashion accessible, comfortable and expressive."
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] overflow-hidden rounded-sm border border-slate-200 shadow-md">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
                alt="Men's tailoring"
                categoryHint="Atelier"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-sm border border-slate-200 shadow-md translate-y-6">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
                alt="Women's silk gown"
                categoryHint="Couture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Grid */}
      <section className="bg-[#FAF9F5] py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs tracking-[0.25em] uppercase text-[#C6A867] font-semibold">
              THE PILLARS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] mt-1">
              Our Guiding Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-white border border-slate-200 p-6 rounded-sm shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B1B3D] text-[#C6A867] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0B1B3D]">{v.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Explore Collection */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-[#0B1B3D]">
          Experience NAVÉRA in Person or Online
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Visit our flagship ateliers in Bengaluru, Mumbai, and New Delhi or order through our white-glove digital salon.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('collections')}
            className="px-8 py-3.5 bg-[#0B1B3D] hover:bg-[#162B56] text-[#FAF9F5] text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center gap-2"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4 text-[#C6A867]" />
          </button>
          <button
            onClick={() => navigate('contact')}
            className="px-6 py-3.5 border border-slate-300 text-slate-800 text-xs font-bold tracking-widest uppercase hover:border-[#0B1B3D]"
          >
            Visit Our Ateliers
          </button>
        </div>
      </section>
    </div>
  );
};
