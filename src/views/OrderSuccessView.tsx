import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Truck, ArrowRight, ShoppingBag, Clock } from 'lucide-react';

export const OrderSuccessView: React.FC = () => {
  const { currentOrderSuccess, navigate } = useShop();

  const order = currentOrderSuccess;

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#0B1B3D]">No Recent Order</h2>
        <button
          onClick={() => navigate('home')}
          className="mt-4 px-6 py-2.5 bg-[#0B1B3D] text-white text-xs font-semibold uppercase"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 animate-fade-in">
      {/* Success Hero Confirmation */}
      <div className="bg-white border border-[#C6A867]/40 p-8 sm:p-12 text-center rounded-sm shadow-xl space-y-4 relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-[#FAF9F5] border-2 border-[#C6A867] flex items-center justify-center text-[#C6A867] mx-auto mb-2 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-[11px] tracking-[0.3em] uppercase text-[#C6A867] font-bold">
          CONGRATULATIONS
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1B3D]">
          Order Placed Successfully!
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Thank you for choosing NAVÉRA. Your order has been recorded into our atelier production queue. A confirmation receipt has been transmitted to <strong className="text-slate-800">{order.address.email}</strong>.
        </p>

        {/* Order Reference Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#FAF9F5] border border-slate-200 text-xs font-mono">
          <span className="text-slate-500 uppercase tracking-wider">Order Reference:</span>
          <strong className="text-[#0B1B3D] text-sm tracking-wider">{order.id}</strong>
        </div>

        {/* Action CTAs */}
        <div className="pt-6 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => navigate('order-tracking')}
            className="px-6 py-3.5 bg-[#0B1B3D] hover:bg-[#162B56] text-[#FAF9F5] text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center gap-2"
          >
            <Truck className="w-4 h-4 text-[#C6A867]" />
            <span>Track Order</span>
          </button>

          <button
            onClick={() => navigate('account')}
            className="px-6 py-3.5 bg-white border border-slate-300 hover:border-[#0B1B3D] text-slate-800 text-xs font-bold tracking-widest uppercase transition-all"
          >
            <span>View All Orders</span>
          </button>

          <button
            onClick={() => navigate('home')}
            className="px-6 py-3.5 bg-[#C6A867] hover:bg-[#B89748] text-[#0B1B3D] text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 text-[#0B1B3D]" />
          </button>
        </div>
      </div>

      {/* Itemized Order Summary Card */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-sm shadow-xs space-y-6">
        <h2 className="font-serif text-xl font-bold text-[#0B1B3D] pb-3 border-b border-slate-200">
          Order Summary & Delivery Details
        </h2>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs pb-4 border-b border-slate-200">
          <div>
            <h4 className="font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Delivery Destination
            </h4>
            <p className="font-bold text-[#0B1B3D] text-sm">{order.address.fullName}</p>
            <p className="text-slate-600 mt-0.5">
              {order.address.houseFlat}, {order.address.street}
            </p>
            <p className="text-slate-600">
              {order.address.city}, {order.address.state} - {order.address.pinCode}
            </p>
            <p className="text-slate-500 font-mono mt-1">Phone: {order.address.mobile}</p>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Estimated Delivery Date
              </h4>
              <div className="flex items-center gap-2 text-[#0B1B3D] font-bold text-sm font-mono">
                <Clock className="w-4 h-4 text-[#C6A867]" />
                <span>{order.estimatedDeliveryDate}</span>
                <span className="text-[10px] text-[#C6A867] uppercase font-sans font-semibold ml-1">
                  ({order.deliveryMethod === 'express' ? 'VIP Express' : 'Standard Insured'})
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
                Payment Method
              </h4>
              <p className="font-bold text-[#0B1B3D]">{order.paymentMethod}</p>
              <p className="text-slate-500 font-mono text-[11px]">{order.paymentDetails}</p>
            </div>
          </div>
        </div>

        {/* Itemized Garments List */}
        <div>
          <h4 className="font-semibold text-xs text-slate-500 uppercase tracking-wider mb-3">
            Acquired Garments ({order.items.length})
          </h4>
          <div className="divide-y divide-slate-100">
            {order.items.map(item => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-12 h-14 object-cover border border-slate-200"
                  />
                  <div>
                    <h5 className="font-serif font-bold text-[#0B1B3D] text-sm">
                      {item.product.name}
                    </h5>
                    <span className="text-slate-500 font-mono text-[11px]">
                      Size: {item.selectedSize} · Color: {item.selectedColor.name} · Qty: {item.quantity}
                    </span>
                  </div>
                </div>

                <div className="font-mono tabular-nums font-bold text-[#0B1B3D]">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="pt-4 border-t border-slate-200 space-y-1.5 text-xs font-mono tabular-nums text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Savings ({order.couponCode})</span>
              <span>-₹{order.discount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-[#0B1B3D] pt-2 border-t border-slate-200">
            <span>Total Paid</span>
            <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
