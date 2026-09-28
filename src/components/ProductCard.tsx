import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from './ImageWithFallback';
import { Heart, Star, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigate,
    toggleWishlist,
    isInWishlist,
    openQuickView,
    addToCart
  } = useShop();

  const isFavorited = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate('product-detail', { productId: product.id });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0] || 'Standard', product.colors[0], 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white border border-slate-200/80 rounded-sm hover:border-[#C6A867]/60 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Visual Image Slot */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-50">
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          categoryHint={product.category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Quiet Editorial Badges (No pill styling) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isSale && (
            <span className="bg-[#0B1B3D] text-[#C6A867] text-[10px] tracking-widest font-semibold uppercase px-2 py-0.5 border border-[#C6A867]/30">
              Sale -{product.discountPercent}%
            </span>
          )}
          {product.isNew && !product.isSale && (
            <span className="bg-[#0B1B3D] text-[#FAF9F5] text-[10px] tracking-widest font-semibold uppercase px-2 py-0.5 border border-white/20">
              New Season
            </span>
          )}
          {product.isBestSeller && !product.isSale && !product.isNew && (
            <span className="bg-[#C6A867] text-[#0B1B3D] text-[10px] tracking-widest font-bold uppercase px-2 py-0.5">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Heart Icon */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-[#0B1B3D] hover:bg-white transition-all shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isFavorited ? 'fill-[#C6A867] text-[#C6A867]' : 'text-slate-600'
            }`}
          />
        </button>

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={handleQuickView}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white/95 hover:bg-white text-[#0B1B3D] text-xs font-medium tracking-wider uppercase border border-slate-200 shadow-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#C6A867]" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="flex items-center justify-center p-2 bg-[#0B1B3D] hover:bg-[#162B56] text-white shadow-md transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-[#C6A867]" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Category Quiet Metadata */}
          <div className="flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-slate-600 mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.subCategory}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base font-semibold text-[#0B1B3D] group-hover:text-[#C6A867] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-700">
            <div className="flex items-center text-[#C6A867]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-medium text-slate-800">{product.rating}</span>
            <span className="text-slate-500">({product.reviewCount})</span>
          </div>
        </div>

        {/* Bottom: Pricing & Color Swatches */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          {/* Price with tabular numerals */}
          <div className="flex items-baseline gap-2 font-mono tabular-nums">
            <span className="text-base font-bold text-[#0B1B3D]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Available Colors Swatches */}
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((col, idx) => (
              <span
                key={idx}
                title={col.name}
                className="w-3 h-3 rounded-full border border-slate-300 shadow-2xs"
                style={{ backgroundColor: col.hex }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-slate-600 font-mono">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
