import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from './ImageWithFallback';
import { X, Star, ShoppingBag, ArrowRight, Heart } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigate
  } = useShop();

  const [selectedColor, setSelectedColor] = useState(quickViewProduct?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(quickViewProduct?.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]);
      setSelectedSize(quickViewProduct.sizes[0] || 'Standard');
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    if (!selectedColor) return;
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    closeQuickView();
  };

  const handleViewFullDetails = () => {
    const id = quickViewProduct.id;
    closeQuickView();
    navigate('product-detail', { productId: id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1B3D]/70 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-white border border-[#C6A867]/30 shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 text-slate-700 hover:text-black flex items-center justify-center border border-slate-200 shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Media Left */}
        <div className="w-full md:w-1/2 bg-slate-50 flex flex-col p-6">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-slate-200">
            <ImageWithFallback
              src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              categoryHint={quickViewProduct.category}
              className="w-full h-full object-cover"
            />
          </div>

          {quickViewProduct.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-16 shrink-0 border overflow-hidden transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#0B1B3D] ring-1 ring-[#0B1B3D]'
                      : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Right */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-slate-500">
                {quickViewProduct.category} · {quickViewProduct.subCategory}
              </span>
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#0B1B3D]"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorited ? 'fill-[#C6A867] text-[#C6A867]' : ''
                  }`}
                />
                <span>{isFavorited ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#0B1B3D] mt-2 mb-2">
              {quickViewProduct.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4 text-xs text-slate-600">
              <div className="flex text-[#C6A867]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(quickViewProduct.rating)
                        ? 'fill-current'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-slate-800">{quickViewProduct.rating}</span>
              <span>({quickViewProduct.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5 font-mono tabular-nums">
              <span className="text-2xl font-bold text-[#0B1B3D]">
                ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {quickViewProduct.discountPercent && (
                <span className="text-xs font-semibold text-[#0B1B3D] bg-[#C6A867]/20 px-2 py-0.5">
                  Save {quickViewProduct.discountPercent}%
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-3">
              {quickViewProduct.description}
            </p>

            {/* Color Swatches */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs font-medium mb-2">
                <span className="text-slate-700">Color:</span>
                <span className="text-[#0B1B3D] font-semibold">{selectedColor?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {quickViewProduct.colors.map(col => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col)}
                    className={`w-7 h-7 rounded-full border transition-all ${
                      selectedColor?.name === col.name
                        ? 'ring-2 ring-offset-2 ring-[#0B1B3D] scale-105'
                        : 'border-slate-300 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-medium mb-2">
                <span className="text-slate-700">Size:</span>
                <span className="text-[#0B1B3D] font-semibold">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                      selectedSize === size
                        ? 'bg-[#0B1B3D] text-[#FAF9F5] border-[#0B1B3D]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-[#0B1B3D]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-medium text-slate-700">Quantity:</span>
              <div className="flex items-center border border-slate-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-100"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-mono tabular-nums font-semibold text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0B1B3D] hover:bg-[#162B56] text-white text-xs font-medium tracking-widest uppercase transition-all shadow-md active:scale-[0.99]"
            >
              <ShoppingBag className="w-4 h-4 text-[#C6A867]" />
              <span>Add to Shopping Bag</span>
            </button>

            <button
              onClick={handleViewFullDetails}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-[#0B1B3D] hover:text-[#C6A867] tracking-wider uppercase transition-colors"
            >
              <span>View Full Product Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
