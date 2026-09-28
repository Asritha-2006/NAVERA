import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Trash2, Heart, ArrowRight, ShieldCheck, Tag, ShoppingBag, Sparkles } from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    moveToWishlist,
    subtotal,
    discount,
    deliveryFee,
    totalAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigate
  } = useShop();

  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    applyCoupon(couponCode);
    setCouponCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-[#FAF9F5] border border-[#C6A867]/30 flex items-center justify-center text-[#C6A867] mx-auto mb-4">
          <ShoppingBag className="w-10 h-10 stroke-1" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#0B1B3D] mb-2">
          Your cart is feeling a little empty.
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
          Explore the autumn couture collection featuring Italian wool blazers, handloom Banarasi sarees, and pure cashmere essentials.
        </p>
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0B1B3D] hover:bg-[#162B56] text-[#FAF9F5] text-xs font-semibold tracking-widest uppercase transition-all shadow-md"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4 text-[#C6A867]" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-[11px] tracking-[0.25em] uppercase text-[#C6A867] font-semibold">
          ORDER OVERVIEW
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] mt-1">
          Your Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(item => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 p-4 sm:p-6 rounded-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between shadow-xs"
            >
              {/* Product Info */}
              <div className="flex gap-4 items-center">
                <div
                  onClick={() => navigate('product-detail', { productId: item.productId })}
                  className="w-20 h-26 shrink-0 bg-slate-50 border border-slate-200 overflow-hidden cursor-pointer"
                >
                  <ImageWithFallback
                    src={item.product.images[0]}
                    alt={item.product.name}
                    categoryHint={item.product.category}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <span className="text-[10px] tracking-widest uppercase text-slate-500">
                    {item.product.category} · {item.product.subCategory}
                  </span>
                  <h3
                    onClick={() => navigate('product-detail', { productId: item.productId })}
                    className="font-serif text-base font-semibold text-[#0B1B3D] hover:text-[#C6A867] cursor-pointer transition-colors"
                  >
                    {item.product.name}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>Size: <strong className="text-slate-800">{item.selectedSize}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1.5">
                      Color:
                      <span
                        className="w-3 h-3 rounded-full border border-slate-300"
                        style={{ backgroundColor: item.selectedColor.hex }}
                      />
                      <strong className="text-slate-800">{item.selectedColor.name}</strong>
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-3 text-xs">
                    <button
                      onClick={() => moveToWishlist(item.id)}
                      className="text-[#C6A867] hover:underline flex items-center gap-1 font-medium"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>Move to Wishlist</span>
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-600 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quantity Stepper & Price */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="flex items-center border border-slate-300">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 font-mono text-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-mono font-bold text-slate-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 font-mono text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="text-right font-mono tabular-nums">
                  <div className="text-base font-bold text-[#0B1B3D]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                  {item.product.originalPrice && (
                    <div className="text-xs text-slate-400 line-through">
                      ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Checkout Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-sm shadow-xs space-y-5">
            <h2 className="font-serif text-xl font-bold text-[#0B1B3D] pb-3 border-b border-slate-200">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Privé Promo Code
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-3 border border-emerald-200">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon}</strong> Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-emerald-900 underline text-xs font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="e.g. NAVY10, WELCOME15"
                    className="flex-1 px-3 py-2 text-xs uppercase bg-white border border-slate-300 font-mono focus:outline-hidden focus:border-[#0B1B3D]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0B1B3D] hover:bg-[#162B56] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Sample Coupons Suggestions */}
              <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                <span className="text-slate-400">Try codes:</span>
                {['NAVY10', 'WELCOME15', 'STYLE20'].map(code => (
                  <button
                    key={code}
                    onClick={() => applyCoupon(code)}
                    className="font-mono text-[#0B1B3D] hover:text-[#C6A867] underline font-semibold"
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs font-mono tabular-nums text-slate-600 pt-3 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Promo Discount ({appliedCoupon})</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Standard Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#0B1B3D] pt-3 border-t border-slate-200">
                <span>Total Payable</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => navigate('checkout')}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-[#0B1B3D] hover:bg-[#162B56] text-[#FAF9F5] text-xs font-bold tracking-widest uppercase transition-all shadow-md active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#C6A867]" />
            </button>

            {/* Trust markers */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C6A867] shrink-0" />
                <span>256-Bit SSL Encrypted & Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C6A867] shrink-0" />
                <span>Hand-pressed and packaged in luxury garment casing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
