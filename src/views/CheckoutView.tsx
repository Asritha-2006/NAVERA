import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Address } from '../types';
import { ShieldCheck, Check, ArrowRight, Truck, CreditCard, Smartphone, Building2, Banknote } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    subtotal,
    discount,
    deliveryFee,
    totalAmount,
    savedAddresses,
    addAddress,
    placeOrder,
    showToast,
    navigate
  } = useShop();

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#0B1B3D] mb-4">No Items in Checkout</h2>
        <button
          onClick={() => navigate('home')}
          className="px-6 py-2.5 bg-[#0B1B3D] text-white text-xs font-semibold uppercase"
        >
          Return to Atelier
        </button>
      </div>
    );
  }

  // Multi-step: 1 (Address), 2 (Delivery), 3 (Payment)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Address State
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    savedAddresses[0]?.id || 'new'
  );
  const [addressForm, setAddressForm] = useState<Omit<Address, 'id'>>({
    fullName: savedAddresses[0]?.fullName || '',
    mobile: savedAddresses[0]?.mobile || '',
    email: savedAddresses[0]?.email || '',
    houseFlat: savedAddresses[0]?.houseFlat || '',
    street: savedAddresses[0]?.street || '',
    city: savedAddresses[0]?.city || '',
    state: savedAddresses[0]?.state || 'Karnataka',
    pinCode: savedAddresses[0]?.pinCode || '560038'
  });

  // Delivery Method State
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('lakshmi@okhdfcbank');
  const [cardDetails, setCardDetails] = useState({
    number: '4111 2222 3333 4444',
    name: 'Lakshmi S.',
    expiry: '12/28',
    cvv: '892'
  });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Step 1 Validation & Next
  const handleProceedToDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.fullName.trim() || !addressForm.mobile.trim() || !addressForm.houseFlat.trim() || !addressForm.city.trim() || !addressForm.pinCode.trim()) {
      showToast('Please fill in all required shipping address fields.', 'error');
      return;
    }
    if (!/^\d{6}$/.test(addressForm.pinCode.trim())) {
      showToast('Please enter a valid 6-digit Indian postal PIN code.', 'error');
      return;
    }
    setCurrentStep(2);
  };

  // Step 2 Proceed to Payment
  const handleProceedToPayment = () => {
    setCurrentStep(3);
  };

  // Step 3 Place Order
  const handleFinalPlaceOrder = () => {
    // Determine target address
    let finalAddress: Address;
    if (selectedAddressId !== 'new') {
      const found = savedAddresses.find(a => a.id === selectedAddressId);
      finalAddress = found || { ...addressForm, id: 'addr-custom' };
    } else {
      finalAddress = addAddress(addressForm);
    }

    let paymentDetailsStr = '';
    if (paymentMethod === 'UPI') paymentDetailsStr = `UPI ID: ${upiId}`;
    else if (paymentMethod === 'Card') paymentDetailsStr = `Card ending in ${cardDetails.number.slice(-4)}`;
    else if (paymentMethod === 'NetBanking') paymentDetailsStr = `NetBanking via ${selectedBank}`;
    else paymentDetailsStr = 'Cash on Delivery (Pay at doorstep)';

    placeOrder(finalAddress, deliveryMethod, paymentMethod, paymentDetailsStr);
  };

  const finalPayable =
    deliveryMethod === 'express' ? totalAmount + 150 : totalAmount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Checkout Progress Stepper */}
      <div className="max-w-3xl mx-auto pb-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
          
          {/* Step 1 */}
          <button
            onClick={() => setCurrentStep(1)}
            className={`relative z-10 flex flex-col items-center gap-1.5 transition-colors ${
              currentStep >= 1 ? 'text-[#0B1B3D]' : 'text-slate-400'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                currentStep > 1
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : currentStep === 1
                  ? 'bg-[#0B1B3D] border-[#C6A867] text-[#C6A867]'
                  : 'bg-white border-slate-300 text-slate-400'
              }`}
            >
              {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider">Address</span>
          </button>

          {/* Step 2 */}
          <button
            onClick={() => {
              if (currentStep > 2) setCurrentStep(2);
            }}
            className={`relative z-10 flex flex-col items-center gap-1.5 transition-colors ${
              currentStep >= 2 ? 'text-[#0B1B3D]' : 'text-slate-400'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                currentStep > 2
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : currentStep === 2
                  ? 'bg-[#0B1B3D] border-[#C6A867] text-[#C6A867]'
                  : 'bg-white border-slate-300 text-slate-400'
              }`}
            >
              {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider">Delivery</span>
          </button>

          {/* Step 3 */}
          <div
            className={`relative z-10 flex flex-col items-center gap-1.5 transition-colors ${
              currentStep === 3 ? 'text-[#0B1B3D]' : 'text-slate-400'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                currentStep === 3
                  ? 'bg-[#0B1B3D] border-[#C6A867] text-[#C6A867]'
                  : 'bg-white border-slate-300 text-slate-400'
              }`}
            >
              3
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider">Payment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Step Form Left (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 p-6 sm:p-8 rounded-sm shadow-xs">
          {/* STEP 1: ADDRESS */}
          {currentStep === 1 && (
            <form onSubmit={handleProceedToDelivery} className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-[10px] tracking-widest uppercase text-[#C6A867] font-semibold">
                  STEP 01 OF 03
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#0B1B3D]">
                  Shipping & Delivery Address
                </h2>
              </div>

              {/* Saved Address Preset Selection */}
              {savedAddresses.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Saved Addresses:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {savedAddresses.map(addr => (
                      <div
                        key={addr.id}
                        onClick={() => {
                          setSelectedAddressId(addr.id);
                          setAddressForm({
                            fullName: addr.fullName,
                            mobile: addr.mobile,
                            email: addr.email,
                            houseFlat: addr.houseFlat,
                            street: addr.street,
                            city: addr.city,
                            state: addr.state,
                            pinCode: addr.pinCode
                          });
                        }}
                        className={`p-3.5 border rounded-xs cursor-pointer text-xs transition-all ${
                          selectedAddressId === addr.id
                            ? 'border-[#0B1B3D] bg-[#FAF9F5] ring-1 ring-[#0B1B3D]'
                            : 'border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex justify-between items-start font-bold text-[#0B1B3D]">
                          <span>{addr.fullName}</span>
                          {addr.isDefault && (
                            <span className="text-[9px] bg-[#0B1B3D] text-[#C6A867] px-1.5 py-0.5">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 mt-1 line-clamp-2">
                          {addr.houseFlat}, {addr.street}, {addr.city}, {addr.state} - {addr.pinCode}
                        </p>
                        <p className="text-slate-500 font-mono mt-1">{addr.mobile}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Address Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.fullName}
                    onChange={e => setAddressForm({ ...addressForm, fullName: e.target.value })}
                    placeholder="Enter recipient's full name"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={addressForm.mobile}
                    onChange={e => setAddressForm({ ...addressForm, mobile: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 font-mono focus:outline-hidden focus:border-[#0B1B3D]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address for Dispatch Tracking *
                  </label>
                  <input
                    type="email"
                    required
                    value={addressForm.email}
                    onChange={e => setAddressForm({ ...addressForm, email: e.target.value })}
                    placeholder="yourname@domain.com"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    House / Flat / Suite No. *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.houseFlat}
                    onChange={e => setAddressForm({ ...addressForm, houseFlat: e.target.value })}
                    placeholder="e.g. Penthouse 14B or Flat 402"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Address & Landmark
                  </label>
                  <input
                    type="text"
                    value={addressForm.street}
                    onChange={e => setAddressForm({ ...addressForm, street: e.target.value })}
                    placeholder="e.g. 100 Feet Road, Indiranagar"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                    placeholder="e.g. Bengaluru"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.state}
                    onChange={e => setAddressForm({ ...addressForm, state: e.target.value })}
                    placeholder="e.g. Karnataka"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={addressForm.pinCode}
                    onChange={e => setAddressForm({ ...addressForm, pinCode: e.target.value.replace(/\D/g, '') })}
                    placeholder="6-digit PIN code"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 font-mono focus:outline-hidden focus:border-[#0B1B3D]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#0B1B3D] hover:bg-[#162B56] text-[#FAF9F5] text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center gap-2"
                >
                  <span>Proceed to Delivery Options</span>
                  <ArrowRight className="w-4 h-4 text-[#C6A867]" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: DELIVERY */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-[10px] tracking-widest uppercase text-[#C6A867] font-semibold">
                  STEP 02 OF 03
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#0B1B3D]">
                  Select Delivery Mode
                </h2>
              </div>

              <div className="space-y-4">
                {/* Standard Delivery Option */}
                <div
                  onClick={() => setDeliveryMethod('standard')}
                  className={`p-5 border rounded-xs cursor-pointer flex items-center justify-between transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-[#0B1B3D] bg-[#FAF9F5] ring-2 ring-[#0B1B3D]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Truck className="w-6 h-6 text-[#0B1B3D] mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#0B1B3D]">
                        Standard Insured Courier
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Arrives in 3–5 business days via BlueDart Air. Safe contactless delivery.
                      </p>
                    </div>
                  </div>
                  <div className="text-right font-mono tabular-nums">
                    <span className="text-sm font-bold text-[#0B1B3D]">
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                </div>

                {/* Express Priority Delivery Option */}
                <div
                  onClick={() => setDeliveryMethod('express')}
                  className={`p-5 border rounded-xs cursor-pointer flex items-center justify-between transition-all ${
                    deliveryMethod === 'express'
                      ? 'border-[#0B1B3D] bg-[#FAF9F5] ring-2 ring-[#0B1B3D]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#C6A867] text-[#0B1B3D] flex items-center justify-center font-bold text-xs">
                      ⚡
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base font-bold text-[#0B1B3D]">
                          NAVÉRA Privé Express White Glove
                        </h4>
                        <span className="bg-[#C6A867] text-[#0B1B3D] text-[9px] font-bold px-1.5 py-0.2 uppercase">
                          VIP Priority
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Guaranteed 24–48 hour delivery. Arrives in signature hard-box case with bespoke hanger.
                      </p>
                    </div>
                  </div>
                  <div className="text-right font-mono tabular-nums">
                    <span className="text-sm font-bold text-[#0B1B3D]">₹150</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address Summary */}
              <div className="p-4 bg-slate-50 border border-slate-200 text-xs text-slate-600 rounded-xs flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#0B1B3D]">Shipping to: </span>
                  {addressForm.fullName}, {addressForm.houseFlat}, {addressForm.city} ({addressForm.pinCode})
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-[#C6A867] hover:underline font-semibold uppercase text-[11px]"
                >
                  Edit
                </button>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 border border-slate-300 text-slate-700 text-xs font-semibold uppercase"
                >
                  Back to Address
                </button>
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="px-8 py-3.5 bg-[#0B1B3D] hover:bg-[#162B56] text-[#FAF9F5] text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center gap-2"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4 text-[#C6A867]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-[10px] tracking-widest uppercase text-[#C6A867] font-semibold">
                  STEP 03 OF 03
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#0B1B3D]">
                  Select Payment Method
                </h2>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'UPI', label: 'UPI / QR', icon: Smartphone },
                  { id: 'Card', label: 'Cards', icon: CreditCard },
                  { id: 'NetBanking', label: 'Net Banking', icon: Building2 },
                  { id: 'COD', label: 'Cash on Del.', icon: Banknote }
                ].map(item => {
                  const Icon = item.icon;
                  const isSelected = paymentMethod === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`p-3 border rounded-xs flex flex-col items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'border-[#0B1B3D] bg-[#0B1B3D] text-[#FAF9F5] shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-[#C6A867]' : 'text-slate-500'}`} />
                      <span className="text-xs font-semibold">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Payment Tab Body */}
              <div className="p-5 bg-[#FAF9F5] border border-slate-200 rounded-sm">
                {paymentMethod === 'UPI' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-700">
                      Enter UPI Virtual Payment Address (VPA)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      placeholder="e.g. mobileNumber@upi or name@okaxis"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 font-mono focus:outline-hidden focus:border-[#0B1B3D]"
                    />
                    <div className="flex gap-2 text-[10px] text-slate-500">
                      <span>Supported apps:</span>
                      <strong className="text-slate-700">Google Pay · PhonePe · Paytm · BHIM</strong>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })}
                        placeholder="16-digit card number"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 font-mono focus:outline-hidden focus:border-[#0B1B3D]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full px-3.5 py-2 bg-white border border-slate-300 font-mono focus:outline-hidden focus:border-[#0B1B3D]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          CVV Security Code
                        </label>
                        <input
                          type="password"
                          maxLength={3}
                          value={cardDetails.cvv}
                          onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          placeholder="•••"
                          className="w-full px-3.5 py-2 bg-white border border-slate-300 font-mono focus:outline-hidden focus:border-[#0B1B3D]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'NetBanking' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-700">
                      Select Primary Banking Institution
                    </label>
                    <select
                      value={selectedBank}
                      onChange={e => setSelectedBank(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 font-medium focus:outline-hidden focus:border-[#0B1B3D]"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="State Bank of India">State Bank of India</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'COD' && (
                  <div className="text-xs text-slate-600 space-y-1">
                    <p className="font-semibold text-[#0B1B3D]">
                      Cash on Delivery Available
                    </p>
                    <p>
                      Please keep exact cash or digital UPI ready upon delivery courier arrival.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 border border-slate-300 text-slate-700 text-xs font-semibold uppercase"
                >
                  Back to Delivery
                </button>
                <button
                  type="button"
                  onClick={handleFinalPlaceOrder}
                  className="px-10 py-4 bg-[#C6A867] hover:bg-[#B89748] text-[#0B1B3D] text-xs font-bold tracking-widest uppercase transition-all shadow-lg active:scale-98 flex items-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5 text-[#0B1B3D]" />
                  <span>Place Order (₹{finalPayable.toLocaleString('en-IN')})</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Right (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-sm shadow-xs space-y-5">
            <h3 className="font-serif text-lg font-bold text-[#0B1B3D] pb-3 border-b border-slate-200">
              Cart Summary ({cart.length} items)
            </h3>

            {/* Itemized previews */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-12 h-15 object-cover bg-slate-100 border border-slate-200"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900 line-clamp-1">{item.product.name}</h4>
                    <span className="text-slate-500 font-mono text-[11px]">
                      Qty: {item.quantity} · {item.selectedSize} · {item.selectedColor.name}
                    </span>
                    <div className="font-mono tabular-nums font-semibold text-[#0B1B3D]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs font-mono tabular-nums text-slate-600 pt-3 border-t border-slate-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Savings</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Mode</span>
                <span>{deliveryMethod === 'express' ? '₹150 (Express)' : deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#0B1B3D] pt-3 border-t border-slate-200">
                <span>Total Due</span>
                <span>₹{finalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
