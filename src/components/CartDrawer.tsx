import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from './ImageWithFallback';
import { X, Trash2, Heart, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
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

  const [couponInput, setCouponInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('checkout');
  };

  const handleViewCartPage = () => {
    setIsCartDrawerOpen(false);
    navigate('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Dimmed Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-[#0B1B3D]/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#C6A867]/30">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-[#FAF9F5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C6A867]" />
              <h2 className="font-serif text-lg font-bold text-[#0B1B3D]">Shopping Bag</h2>
              <span className="text-xs font-mono text-slate-500 font-semibold">
                ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-slate-500 hover:text-black transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          <div className="px-5 py-2.5 bg-[#0B1B3D] text-[#FAF9F5] text-xs">
            {subtotal >= 1999 ? (
              <div className="flex items-center gap-1.5 text-[#C6A867]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span className="font-medium">You unlocked complimentary insured express delivery!</span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-slate-300">
                <span>Add ₹{(1999 - subtotal).toLocaleString('en-IN')} more for free delivery</span>
                <span className="text-[10px] text-[#C6A867] font-mono">₹1,999 THRESHOLD</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0B1B3D] mb-1">
                  Your cart is feeling a little empty.
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6 leading-relaxed">
                  Discover timeless pieces crafted in luxury wool, silk, and Egyptian cotton.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('home');
                  }}
                  className="px-6 py-2.5 bg-[#0B1B3D] text-[#FAF9F5] text-xs font-semibold tracking-wider uppercase hover:bg-[#162B56] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 shrink-0 overflow-hidden bg-slate-100 border border-slate-200 rounded-xs">
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      categoryHint={item.product.category}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-semibold text-[#0B1B3D] line-clamp-1 pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant quiet metadata */}
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <span>Size: <strong className="text-slate-700">{item.selectedSize}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          Color:
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-slate-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <strong className="text-slate-700">{item.selectedColor.name}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-slate-200">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right font-mono tabular-nums">
                        <span className="text-sm font-bold text-[#0B1B3D]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Move to Wishlist Link */}
                    <div className="mt-1">
                      <button
                        onClick={() => moveToWishlist(item.id)}
                        className="text-[11px] text-[#C6A867] hover:underline flex items-center gap-1 font-medium"
                      >
                        <Heart className="w-3 h-3" />
                        <span>Move to Wishlist</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-[#FAF9F5] flex flex-col gap-3">
              {/* Coupon Row */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2.5 border border-emerald-200">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{appliedCoupon}</strong> active</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-emerald-900 underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    placeholder="Enter code (NAVY10, WELCOME15)"
                    className="flex-1 px-3 py-1.5 text-xs uppercase bg-white border border-slate-200 focus:outline-hidden focus:border-[#0B1B3D]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold bg-[#0B1B3D] text-white hover:bg-[#162B56] uppercase tracking-wider transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-mono tabular-nums text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0B1B3D] pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#0B1B3D] hover:bg-[#162B56] text-[#FAF9F5] text-xs font-semibold tracking-widest uppercase transition-all shadow-md active:scale-[0.99]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#C6A867]" />
                </button>

                <button
                  onClick={handleViewCartPage}
                  className="w-full py-2 text-center text-xs font-medium text-slate-600 hover:text-[#0B1B3D] uppercase tracking-wider transition-colors"
                >
                  View Full Cart & Summary
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
