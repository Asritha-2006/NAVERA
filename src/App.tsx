/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { Toast } from './components/Toast';

// Views
import { HomeView } from './views/HomeView';
import { CategoryView } from './views/CategoryView';
import { ProductDetailView } from './views/ProductDetailView';
import { WishlistView } from './views/WishlistView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { AccountView } from './views/AccountView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { FaqView } from './views/FaqView';
import { SaleView } from './views/SaleView';
import { NewArrivalsView } from './views/NewArrivalsView';
import { CollectionsView } from './views/CollectionsView';

const MainRouter: React.FC = () => {
  const { currentRoute } = useShop();

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomeView />;
      case 'men':
        return (
          <CategoryView
            categoryTitle="Men's Fashion"
            categorySlug="men"
            subtitle="Italian-tailored blazers, Egyptian cotton shirts, selvedge denim, and structured trousers."
          />
        );
      case 'women':
        return (
          <CategoryView
            categoryTitle="Women's Fashion"
            categorySlug="women"
            subtitle="Silk satin evening gowns, oversized blazers, Banarasi sarees, and sculpted co-ords."
          />
        );
      case 'kids':
        return (
          <CategoryView
            categoryTitle="Kids' Fashion"
            categorySlug="kids"
            subtitle="Organic cotton staples, festive star dresses, and cozy fleece wear."
          />
        );
      case 'accessories':
        return (
          <CategoryView
            categoryTitle="Luxury Accessories"
            categorySlug="accessories"
            subtitle="Italian Saffiano leather bags, gold chronograph watches, and polarized aviators."
          />
        );
      case 'footwear':
        return (
          <CategoryView
            categoryTitle="Artisanal Footwear"
            categorySlug="footwear"
            subtitle="Full-grain calfskin sneakers, stiletto evening heels, and Goodyear welted oxfords."
          />
        );
      case 'ethnic':
        return (
          <CategoryView
            categoryTitle="Heritage Ethnic Wear"
            categorySlug="ethnic"
            subtitle="Hand-woven Banarasi silk sarees, zardozi anarkalis, and regal ceremonial ensembles."
          />
        );
      case 'formal':
        return (
          <CategoryView
            categoryTitle="Bespoke Formal Wear"
            categorySlug="formal"
            subtitle="Full canvas suits, tuxedo cutaways, and structured boardroom blazers."
          />
        );
      case 'casual':
        return (
          <CategoryView
            categoryTitle="Casual Luxury Wear"
            categorySlug="casual"
            subtitle="Selvedge denim jackets, heavyweight graphic tees, and Normandy linen shirts."
          />
        );
      case 'sportswear':
        return (
          <CategoryView
            categoryTitle="Performance Sportswear"
            categorySlug="sportswear"
            subtitle="Breathable Pima cotton polos and court leather sneakers."
          />
        );
      case 'winter':
        return (
          <CategoryView
            categoryTitle="Winter & Cashmere Wear"
            categorySlug="winter"
            subtitle="Grade-A Himalayan cashmere scarves, chelsea boots, and warm wool layers."
          />
        );
      case 'new-arrivals':
        return <NewArrivalsView />;
      case 'sale':
        return <SaleView />;
      case 'collections':
        return <CollectionsView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'wishlist':
        return <WishlistView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-success':
        return <OrderSuccessView />;
      case 'order-tracking':
        return <OrderTrackingView />;
      case 'account':
        return <AccountView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'faq':
        return <FaqView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-slate-800 selection:bg-[#C6A867]/25 selection:text-[#0B1B3D]">
      <Navbar />

      <main className="flex-1">
        {renderCurrentView()}
      </main>

      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainRouter />
    </ShopProvider>
  );
}
