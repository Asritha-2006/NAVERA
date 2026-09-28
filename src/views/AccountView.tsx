import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Address } from '../types';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  Edit2,
  Plus,
  Truck,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    orders,
    wishlist,
    savedAddresses,
    addAddress,
    trackOrderById,
    navigate,
    showToast,
    products
  } = useShop();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'orders' | 'wishlist' | 'addresses' | 'payments' | 'notifications'
  >('profile');

  // Edit profile form
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(userProfile);

  // Add address modal
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState<Omit<Address, 'id'>>({
    fullName: userProfile.name,
    mobile: userProfile.phone,
    email: userProfile.email,
    houseFlat: '',
    street: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560001',
    isDefault: false
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(profileForm);
    setIsEditingProfile(false);
  };

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(newAddressForm);
    setShowAddAddressModal(false);
    setNewAddressForm({
      fullName: userProfile.name,
      mobile: userProfile.phone,
      email: userProfile.email,
      houseFlat: '',
      street: '',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560001',
      isDefault: false
    });
  };

  const handleLogout = () => {
    showToast('You have been logged out of the session.', 'info');
    navigate('home');
  };

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#C6A867] font-semibold">
            PATRON CONCIERGE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] mt-1">
            My Account & Orders
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Tier:</span>
          <span className="bg-[#0B1B3D] text-[#C6A867] px-2.5 py-0.5 font-bold uppercase tracking-wider">
            {userProfile.membershipTier}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar Left (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-sm shadow-xs space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="w-14 h-14 rounded-full bg-[#0B1B3D] text-[#C6A867] border-2 border-[#C6A867]/40 flex items-center justify-center font-serif text-xl font-bold">
              {userProfile.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#0B1B3D]">{userProfile.name}</h3>
              <p className="text-xs text-slate-500">{userProfile.email}</p>
              <span className="text-[10px] text-[#C6A867] font-semibold">Member since {userProfile.memberSince}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#0B1B3D] text-[#FAF9F5] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-[#C6A867]" />
                <span>Profile Information</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#0B1B3D] text-[#FAF9F5] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-[#C6A867]" />
                <span>My Orders</span>
              </div>
              <span className="font-mono text-[11px] font-bold">({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors ${
                activeTab === 'wishlist'
                  ? 'bg-[#0B1B3D] text-[#FAF9F5] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-[#C6A867]" />
                <span>Saved Wishlist</span>
              </div>
              <span className="font-mono text-[11px] font-bold">({wishlist.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-[#0B1B3D] text-[#FAF9F5] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A867]" />
                <span>Saved Addresses</span>
              </div>
              <span className="font-mono text-[11px] font-bold">({savedAddresses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors ${
                activeTab === 'payments'
                  ? 'bg-[#0B1B3D] text-[#FAF9F5] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-[#C6A867]" />
                <span>Payment Methods</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-[#0B1B3D] text-[#FAF9F5] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-[#C6A867]" />
                <span>Notifications & Privileges</span>
              </div>
            </button>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-500 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Tab Content Body Right (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 p-6 sm:p-8 rounded-sm shadow-xs">
          {/* TAB: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0B1B3D]">
                    Profile Information
                  </h3>
                  <p className="text-xs text-slate-500">Manage your personal credentials & contact points.</p>
                </div>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B1B3D] text-white text-xs font-semibold uppercase hover:bg-[#162B56]"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#C6A867]" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={profileForm.email}
                      onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={profileForm.phone}
                      onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 font-mono focus:outline-hidden focus:border-[#0B1B3D]"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#0B1B3D] text-white text-xs font-semibold uppercase hover:bg-[#162B56]"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2.5 bg-slate-200 text-slate-700 text-xs font-semibold uppercase"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider block text-[10px]">
                      Patron Name
                    </span>
                    <strong className="text-sm text-slate-800">{userProfile.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider block text-[10px]">
                      Email Address
                    </span>
                    <strong className="text-sm text-slate-800">{userProfile.email}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider block text-[10px]">
                      Mobile Phone
                    </span>
                    <strong className="text-sm text-slate-800 font-mono">{userProfile.phone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider block text-[10px]">
                      Privé Tier
                    </span>
                    <strong className="text-sm text-[#C6A867]">{userProfile.membershipTier}</strong>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <div className="pb-4 border-b border-slate-200">
                <h3 className="font-serif text-2xl font-bold text-[#0B1B3D]">
                  Order History & Logistics
                </h3>
                <p className="text-xs text-slate-500">Track and view invoices for all purchases.</p>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  No orders recorded yet. Start your curation from our collection.
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div
                      key={order.id}
                      className="p-5 border border-slate-200 rounded-sm space-y-4 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                        <div>
                          <span className="text-slate-400 font-mono text-[10px] block">Order Ref</span>
                          <strong className="text-sm font-mono text-[#0B1B3D]">{order.id}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">Date Placed</span>
                          <span className="font-mono text-slate-700">{order.date}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">Total Amount</span>
                          <span className="font-mono font-bold text-[#0B1B3D]">
                            ₹{order.totalAmount.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">Status</span>
                          <span className="inline-block bg-[#0B1B3D] text-[#C6A867] text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {order.items.map(item => (
                          <div key={item.id} className="flex items-center justify-between text-xs">
                            <span className="font-serif text-slate-800 font-medium">
                              {item.product.name}
                            </span>
                            <span className="text-slate-500 font-mono text-[11px]">
                              Qty: {item.quantity} · {item.selectedSize} · {item.selectedColor.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          onClick={() => trackOrderById(order.id)}
                          className="px-4 py-2 bg-[#0B1B3D] text-[#FAF9F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#162B56] flex items-center gap-1.5"
                        >
                          <Truck className="w-3.5 h-3.5 text-[#C6A867]" />
                          <span>Track Delivery</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0B1B3D]">
                    Saved Creations ({wishlist.length})
                  </h3>
                  <p className="text-xs text-slate-500">Your personal style moodboard.</p>
                </div>
                <button
                  onClick={() => navigate('wishlist')}
                  className="text-xs font-semibold uppercase text-[#0B1B3D] hover:text-[#C6A867] underline"
                >
                  View Full Wishlist Page
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {wishlistedProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => navigate('product-detail', { productId: p.id })}
                    className="p-3 border border-slate-200 rounded-sm cursor-pointer hover:border-[#C6A867] transition-colors"
                  >
                    <img src={p.images[0]} alt="" className="aspect-[3/4] object-cover mb-2" />
                    <h4 className="font-serif text-sm font-bold text-[#0B1B3D] line-clamp-1">{p.name}</h4>
                    <span className="font-mono text-xs font-bold text-[#0B1B3D]">₹{p.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0B1B3D]">
                    Saved Delivery Addresses
                  </h3>
                  <p className="text-xs text-slate-500">Manage shipping addresses for swift checkout.</p>
                </div>
                <button
                  onClick={() => setShowAddAddressModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B1B3D] text-white text-xs font-semibold uppercase hover:bg-[#162B56]"
                >
                  <Plus className="w-3.5 h-3.5 text-[#C6A867]" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedAddresses.map(addr => (
                  <div key={addr.id} className="p-4 border border-slate-200 rounded-sm text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <strong className="text-sm text-[#0B1B3D]">{addr.fullName}</strong>
                      {addr.isDefault && (
                        <span className="text-[9px] bg-[#0B1B3D] text-[#C6A867] px-2 py-0.5 uppercase">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600">{addr.houseFlat}, {addr.street}</p>
                    <p className="text-slate-600">{addr.city}, {addr.state} - {addr.pinCode}</p>
                    <p className="text-slate-500 font-mono mt-2">Mobile: {addr.mobile}</p>
                  </div>
                ))}
              </div>

              {/* Add Address Modal */}
              {showAddAddressModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                  <div className="bg-white border border-[#C6A867]/40 p-6 rounded-sm max-w-lg w-full space-y-4">
                    <h3 className="font-serif text-xl font-bold text-[#0B1B3D]">Add Delivery Address</h3>
                    <form onSubmit={handleAddNewAddress} className="space-y-3 text-xs">
                      <div>
                        <label className="block font-semibold mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={newAddressForm.fullName}
                          onChange={e => setNewAddressForm({ ...newAddressForm, fullName: e.target.value })}
                          className="w-full px-3 py-1.5 border border-slate-300"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-semibold mb-1">Mobile</label>
                          <input
                            type="tel"
                            required
                            value={newAddressForm.mobile}
                            onChange={e => setNewAddressForm({ ...newAddressForm, mobile: e.target.value })}
                            className="w-full px-3 py-1.5 border border-slate-300 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">PIN Code</label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            value={newAddressForm.pinCode}
                            onChange={e => setNewAddressForm({ ...newAddressForm, pinCode: e.target.value })}
                            className="w-full px-3 py-1.5 border border-slate-300 font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">House/Flat No.</label>
                        <input
                          type="text"
                          required
                          value={newAddressForm.houseFlat}
                          onChange={e => setNewAddressForm({ ...newAddressForm, houseFlat: e.target.value })}
                          className="w-full px-3 py-1.5 border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Street Address</label>
                        <input
                          type="text"
                          required
                          value={newAddressForm.street}
                          onChange={e => setNewAddressForm({ ...newAddressForm, street: e.target.value })}
                          className="w-full px-3 py-1.5 border border-slate-300"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-semibold mb-1">City</label>
                          <input
                            type="text"
                            required
                            value={newAddressForm.city}
                            onChange={e => setNewAddressForm({ ...newAddressForm, city: e.target.value })}
                            className="w-full px-3 py-1.5 border border-slate-300"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">State</label>
                          <input
                            type="text"
                            required
                            value={newAddressForm.state}
                            onChange={e => setNewAddressForm({ ...newAddressForm, state: e.target.value })}
                            className="w-full px-3 py-1.5 border border-slate-300"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 pt-3">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-[#0B1B3D] text-white text-xs font-semibold uppercase"
                        >
                          Save Address
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddAddressModal(false)}
                          className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-semibold uppercase"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="space-y-6 animate-fade-in">
              <div className="pb-4 border-b border-slate-200">
                <h3 className="font-serif text-2xl font-bold text-[#0B1B3D]">
                  Stored Payment Credentials
                </h3>
                <p className="text-xs text-slate-500">Secure tokens stored using PCI-DSS compliant vault.</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 border border-slate-200 rounded-sm flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#0B1B3D]" />
                    <div>
                      <strong className="text-slate-800">HDFC Regalia Gold Visa</strong>
                      <span className="text-slate-500 font-mono block text-[11px]">•••• •••• •••• 4444 · Exp 12/28</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5">
                    Verified
                  </span>
                </div>

                <div className="p-4 border border-slate-200 rounded-sm flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0B1B3D] text-[#C6A867] flex items-center justify-center font-bold text-[10px]">
                      @
                    </div>
                    <div>
                      <strong className="text-slate-800">Primary UPI VPA</strong>
                      <span className="text-slate-500 font-mono block text-[11px]">lakshmi@okhdfcbank</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-fade-in">
              <div className="pb-4 border-b border-slate-200">
                <h3 className="font-serif text-2xl font-bold text-[#0B1B3D]">
                  Patron Privileges & Alerts
                </h3>
                <p className="text-xs text-slate-500">Exclusive atelier events and dispatch status updates.</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 bg-[#FAF9F5] border border-[#C6A867]/30 rounded-xs">
                  <span className="font-bold text-[#0B1B3D] block text-sm">
                    Exclusive Autumn Couture Preview Active
                  </span>
                  <p className="text-slate-600 mt-1">
                    Your Gold Privé status entitles you to complimentary garment personalization on all tailored suit acquisitions.
                  </p>
                </div>

                <div className="p-4 border border-slate-200 rounded-xs">
                  <span className="font-bold text-[#0B1B3D] block">
                    Order #NAV-2026-9841 Dispatched
                  </span>
                  <p className="text-slate-600 mt-1">
                    Your shipment is in transit with BlueDart Express and scheduled to arrive on 29 Sep 2026.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
