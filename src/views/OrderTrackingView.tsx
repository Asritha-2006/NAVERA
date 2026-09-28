import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, CheckCircle2, Clock, Truck, Package, ShieldCheck, MapPin } from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { activeTrackingOrder, trackOrderById, orders, navigate } = useShop();
  const [orderQuery, setOrderQuery] = useState(activeTrackingOrder?.id || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    trackOrderById(orderQuery.trim());
  };

  const order = activeTrackingOrder || orders[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#C6A867] font-semibold">
            REAL-TIME LOGISTICS DISPATCH
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] mt-1">
            Track Your Order
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor verified dispatch milestones from NAVÉRA Central Atelier to your residence.
          </p>
        </div>

        {/* Quick Order Lookup Input */}
        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-80">
          <input
            type="text"
            value={orderQuery}
            onChange={e => setOrderQuery(e.target.value)}
            placeholder="e.g. NAV-2026-9841"
            className="flex-1 px-3 py-2 text-xs uppercase bg-white border border-slate-300 font-mono focus:outline-hidden focus:border-[#0B1B3D]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#0B1B3D] text-[#FAF9F5] text-xs font-semibold uppercase hover:bg-[#162B56] flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5 text-[#C6A867]" />
            <span>Track</span>
          </button>
        </form>
      </div>

      {order ? (
        <div className="space-y-8 animate-fade-in">
          {/* Order Meta Bar */}
          <div className="bg-[#FAF9F5] border border-slate-200 p-6 rounded-sm grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-500 uppercase tracking-wider block text-[10px]">
                Order ID
              </span>
              <strong className="text-sm text-[#0B1B3D]">{order.id}</strong>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider block text-[10px]">
                Order Date
              </span>
              <strong className="text-sm text-[#0B1B3D]">{order.date}</strong>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider block text-[10px]">
                Estimated Delivery
              </span>
              <strong className="text-sm text-emerald-700">{order.estimatedDeliveryDate}</strong>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider block text-[10px]">
                Current Status
              </span>
              <span className="inline-block bg-[#0B1B3D] text-[#C6A867] px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
                {order.status}
              </span>
            </div>
          </div>

          {/* Visual 6-Stage Progress Tracker */}
          <div className="bg-white border border-slate-200 p-6 sm:p-10 rounded-sm shadow-xs">
            <h3 className="font-serif text-xl font-bold text-[#0B1B3D] mb-8">
              Consignment Journey Timeline
            </h3>

            {/* Desktop Horizontal Tracker */}
            <div className="hidden md:block relative pb-6">
              <div className="absolute top-5 left-8 right-8 h-1 bg-slate-200 z-0" />
              <div className="grid grid-cols-6 gap-2 relative z-10">
                {order.trackingSteps.map((step, idx) => {
                  return (
                    <div key={idx} className="flex flex-col items-center text-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                          step.completed
                            ? 'bg-[#0B1B3D] border-[#C6A867] text-[#C6A867]'
                            : step.current
                            ? 'bg-[#C6A867] border-[#0B1B3D] text-[#0B1B3D] ring-4 ring-[#C6A867]/30'
                            : 'bg-white border-slate-300 text-slate-400'
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : step.current ? (
                          <Truck className="w-5 h-5" />
                        ) : (
                          <span className="text-xs font-mono font-bold">{idx + 1}</span>
                        )}
                      </div>

                      <h4 className="font-serif text-sm font-bold text-[#0B1B3D] mt-3">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 max-w-[120px] mt-1 leading-tight">
                        {step.description}
                      </p>
                      <span className="text-[10px] font-mono text-[#C6A867] font-semibold mt-1">
                        {step.timestamp}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Vertical Tracker */}
            <div className="md:hidden space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {order.trackingSteps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-[29px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                      step.completed
                        ? 'bg-[#0B1B3D] border-[#C6A867] text-[#C6A867]'
                        : step.current
                        ? 'bg-[#C6A867] border-[#0B1B3D] text-[#0B1B3D]'
                        : 'bg-white border-slate-300 text-slate-400'
                    }`}
                  >
                    {step.completed ? '✓' : idx + 1}
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#0B1B3D]">{step.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{step.description}</p>
                    <span className="text-[11px] font-mono text-[#C6A867] font-semibold block mt-0.5">
                      {step.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Details & Garment Inspection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-sm text-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#0B1B3D] border-b border-slate-100 pb-2">
                <MapPin className="w-4 h-4 text-[#C6A867]" />
                <span>Shipping Address</span>
              </div>
              <p className="font-semibold text-slate-800">{order.address.fullName}</p>
              <p className="text-slate-600">
                {order.address.houseFlat}, {order.address.street}
              </p>
              <p className="text-slate-600">
                {order.address.city}, {order.address.state} - {order.address.pinCode}
              </p>
              <p className="text-slate-500 font-mono">Mobile: {order.address.mobile}</p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-sm text-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#0B1B3D] border-b border-slate-100 pb-2">
                <Package className="w-4 h-4 text-[#C6A867]" />
                <span>Consignment Contents ({order.items.length})</span>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-semibold text-slate-800">{item.product.name}</span>
                      <span className="text-slate-400 block text-[11px] font-mono">
                        Size: {item.selectedSize} · Color: {item.selectedColor.name} · Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-[#0B1B3D]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate-500 text-sm">Please enter an order ID to view tracking progress.</p>
        </div>
      )}
    </div>
  );
};
