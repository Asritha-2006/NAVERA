import React from 'react';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const {
    wishlist,
    products,
    toggleWishlist,
    moveWishlistToCart,
    navigate
  } = useShop();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#C6A867] font-semibold">
            YOUR CURATION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] mt-1">
            My Wishlist
          </h1>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          {wishlist.length} {wishlist.length === 1 ? 'Garment' : 'Garments'} Saved
        </span>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="py-24 text-center max-w-md mx-auto bg-white border border-slate-200 p-8 rounded-sm">
          <div className="w-16 h-16 rounded-full bg-[#FAF9F5] border border-[#C6A867]/30 flex items-center justify-center text-[#C6A867] mx-auto mb-4">
            <Heart className="w-8 h-8 stroke-1" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#0B1B3D] mb-2">
            Your wishlist is waiting for something beautiful.
          </h2>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Explore our collections and save your favorite tailored blazers, bespoke silks, and luxury essentials for future moments.
          </p>
          <button
            onClick={() => navigate('collections')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1B3D] hover:bg-[#162B56] text-[#FAF9F5] text-xs font-semibold tracking-widest uppercase transition-all shadow-md"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 text-[#C6A867]" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map(product => (
            <div
              key={product.id}
              className="group bg-white border border-slate-200 rounded-sm overflow-hidden flex flex-col justify-between hover:border-[#C6A867] transition-all shadow-xs"
            >
              {/* Product Media */}
              <div
                onClick={() => navigate('product-detail', { productId: product.id })}
                className="relative aspect-[3/4] cursor-pointer bg-slate-50 overflow-hidden"
              >
                <ImageWithFallback
                  src={product.images[0]}
                  alt={product.name}
                  categoryHint={product.category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  title="Remove from wishlist"
                  aria-label="Remove from wishlist"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-slate-600 hover:text-red-600 flex items-center justify-center shadow-xs transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Product Details & Actions */}
              <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-slate-500">
                    {product.category} · {product.subCategory}
                  </span>
                  <h3
                    onClick={() => navigate('product-detail', { productId: product.id })}
                    className="font-serif text-base font-semibold text-[#0B1B3D] hover:text-[#C6A867] transition-colors cursor-pointer line-clamp-1 mt-1"
                  >
                    {product.name}
                  </h3>
                  <div className="mt-1 font-mono tabular-nums text-sm font-bold text-[#0B1B3D]">
                    ₹{product.price.toLocaleString('en-IN')}
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through ml-2 font-normal">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => moveWishlistToCart(product.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#0B1B3D] hover:bg-[#162B56] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C6A867]" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
