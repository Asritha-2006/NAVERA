import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    navigate,
    cartCount,
    wishlistCount,
    setIsSearchOpen,
    setIsCartDrawerOpen
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  const navLinks: { label: string; route: PageRoute; badge?: string }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Men', route: 'men' },
    { label: 'Women', route: 'women' },
    { label: 'Kids', route: 'kids' },
    { label: 'New Arrivals', route: 'new-arrivals' },
    { label: 'Collections', route: 'collections' },
    { label: 'Sale', route: 'sale', badge: 'UP TO 50%' },
    { label: 'About Us', route: 'about' }
  ];

  const handleLinkClick = (route: PageRoute) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B1B3D] text-[#FAF9F5] shadow-md border-b border-[#C6A867]/30 transition-all">
      {/* Top Announcement Bar */}
      {announcementVisible && (
        <div className="bg-[#061024] border-b border-[#C6A867]/20 px-4 py-1.5 text-center text-[11px] tracking-widest text-[#E5DCC5] flex items-center justify-between">
          <div className="w-6" /> {/* spacer */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">COMPLIMENTARY EXPRESS DELIVERY ON ORDERS OVER ₹1,999</span>
            <span className="hidden sm:inline text-[#C6A867]">·</span>
            <span>USE CODE <strong className="text-[#C6A867] font-mono">NAVY10</strong> FOR 10% OFF</span>
          </div>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main 3-Zone Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLinkClick('home')}
              className="flex flex-col text-left group focus:outline-hidden"
              aria-label="NAVÉRA Home"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.25em] text-[#FAF9F5] group-hover:text-[#C6A867] transition-colors flex items-baseline">
                NAVÉRA
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A867] ml-1 mb-1 inline-block" />
              </span>
              <span className="text-[9px] tracking-[0.28em] uppercase text-[#C6A867] -mt-1 hidden sm:block font-light">
                Elegance in Every Thread
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean unboxed text links) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleLinkClick(link.route)}
                  className={`relative py-1 text-xs tracking-[0.14em] uppercase font-medium transition-colors hover:text-[#C6A867] ${
                    isActive ? 'text-[#C6A867] font-semibold' : 'text-slate-200'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1 text-[9px] font-mono font-bold text-[#0B1B3D] bg-[#C6A867] px-1 py-0.2 rounded-xs">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C6A867] rounded-full animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Interactive Affordances (Search, Wishlist, Cart, Profile) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
              className="p-2 text-slate-200 hover:text-[#C6A867] transition-colors rounded-full hover:bg-white/5"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button with Badge */}
            <button
              onClick={() => handleLinkClick('wishlist')}
              aria-label={`Wishlist (${wishlistCount} items)`}
              className="relative p-2 text-slate-200 hover:text-[#C6A867] transition-colors rounded-full hover:bg-white/5"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C6A867] text-[#0B1B3D] text-[10px] font-mono font-bold flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button with Badge */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              aria-label={`Shopping bag (${cartCount} items)`}
              className="relative p-2 text-slate-200 hover:text-[#C6A867] transition-colors rounded-full hover:bg-white/5"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C6A867] text-[#0B1B3D] text-[10px] font-mono font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Button */}
            <button
              onClick={() => handleLinkClick('account')}
              aria-label="My account"
              className="p-2 text-slate-200 hover:text-[#C6A867] transition-colors rounded-full hover:bg-white/5"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 text-slate-200 hover:text-[#C6A867] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#061024] border-t border-[#C6A867]/20 px-6 py-6 animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map(link => (
              <button
                key={link.route}
                onClick={() => handleLinkClick(link.route)}
                className="flex items-center justify-between py-2 text-sm tracking-wider uppercase text-left text-slate-200 hover:text-[#C6A867] border-b border-white/5"
              >
                <div className="flex items-center gap-2">
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] font-mono text-[#0B1B3D] bg-[#C6A867] px-1 py-0.5 rounded-xs font-bold">
                      {link.badge}
                    </span>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}

            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => handleLinkClick('account')}
                className="w-full py-2.5 px-4 bg-[#0B1B3D] text-[#C6A867] border border-[#C6A867]/40 text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>My Account & Orders</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
