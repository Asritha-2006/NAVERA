import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, ProductColor, Address, Order, PageRoute, Review } from '../types';
import { PRODUCTS, COUPONS } from '../data/products';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  membershipTier: string;
}

interface ShopContextType {
  // Navigation
  currentRoute: PageRoute;
  routeParams: Record<string, string>;
  navigate: (route: PageRoute, params?: Record<string, string>) => void;

  // Products
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  addReview: (productId: string, review: { author: string; rating: number; title: string; comment: string }) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  moveToWishlist: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalAmount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToCart: (productId: string, size?: string) => void;
  wishlistCount: number;

  // Checkout & Orders
  savedAddresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => Address;
  orders: Order[];
  currentOrderSuccess: Order | null;
  activeTrackingOrder: Order | null;
  placeOrder: (
    address: Address,
    deliveryMethod: 'standard' | 'express',
    paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD',
    paymentDetails: string
  ) => Order;
  trackOrderById: (orderId: string) => boolean;

  // Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Search & Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Lakshmi S.',
    mobile: '+91 98765 43210',
    email: 'slakshmi4381@gmail.com',
    houseFlat: 'Penthouse 14B, Palm Grove Residences',
    street: '100 Feet Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560038',
    isDefault: true
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'NAV-2026-9841',
    date: '24 Sep 2026',
    items: [
      {
        id: 'init-c1',
        productId: 'men-1',
        product: PRODUCTS[0],
        selectedColor: PRODUCTS[0].colors[0],
        selectedSize: 'L',
        quantity: 1,
        addedAt: Date.now() - 300000000
      }
    ],
    subtotal: 4999,
    discount: 500,
    couponCode: 'NAVY10',
    deliveryFee: 0,
    totalAmount: 4499,
    address: INITIAL_ADDRESSES[0],
    deliveryMethod: 'standard',
    paymentMethod: 'UPI',
    paymentDetails: 'lakshmi@okhdfcbank',
    status: 'Shipped',
    estimatedDeliveryDate: '29 Sep 2026',
    trackingSteps: [
      {
        status: 'Order Placed',
        title: 'Order Placed',
        description: 'Your order was successfully verified and placed.',
        timestamp: '24 Sep, 10:32 AM',
        completed: true,
        current: false
      },
      {
        status: 'Confirmed',
        title: 'Payment Confirmed',
        description: 'Payment verified via UPI.',
        timestamp: '24 Sep, 10:35 AM',
        completed: true,
        current: false
      },
      {
        status: 'Packed',
        title: 'Quality Checked & Packed',
        description: 'Carefully folded in luxury garment box with fragrance seal.',
        timestamp: '25 Sep, 02:15 PM',
        completed: true,
        current: false
      },
      {
        status: 'Shipped',
        title: 'Dispatched via BlueDart Express',
        description: 'Tracking AWB #BD89274910IN from Bengaluru Central Atelier Hub.',
        timestamp: '26 Sep, 09:00 AM',
        completed: true,
        current: true
      },
      {
        status: 'Out for Delivery',
        title: 'Out for Delivery',
        description: 'Courier agent will arrive at your address with contactless security code.',
        timestamp: 'Expected 29 Sep',
        completed: false,
        current: false
      },
      {
        status: 'Delivered',
        title: 'Delivered',
        description: 'Package handed over to recipient.',
        timestamp: 'Pending',
        completed: false,
        current: false
      }
    ]
  }
];

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Route state
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});

  // Products
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('navera_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('navera_wishlist');
      return saved ? JSON.parse(saved) : ['women-1', 'men-1'];
    } catch {
      return ['women-1', 'men-1'];
    }
  });

  // Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Cart Drawer
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('navera_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });
  const [currentOrderSuccess, setCurrentOrderSuccess] = useState<Order | null>(null);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(INITIAL_ORDERS[0]);

  // Addresses
  const [savedAddresses, setSavedAddresses] = useState<Address[]>(() => {
    try {
      const saved = localStorage.getItem('navera_addresses');
      return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
    } catch {
      return INITIAL_ADDRESSES;
    }
  });

  // Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('navera_profile');
      return saved
        ? JSON.parse(saved)
        : {
            name: 'Lakshmi S.',
            email: 'slakshmi4381@gmail.com',
            phone: '+91 98765 43210',
            memberSince: 'March 2024',
            membershipTier: 'NAVÉRA Privé Gold'
          };
    } catch {
      return {
        name: 'Lakshmi S.',
        email: 'slakshmi4381@gmail.com',
        phone: '+91 98765 43210',
        memberSince: 'March 2024',
        membershipTier: 'NAVÉRA Privé Gold'
      };
    }
  });

  // Modals & UI
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('navera_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('navera_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('navera_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('navera_addresses', JSON.stringify(savedAddresses));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [savedAddresses]);

  useEffect(() => {
    try {
      localStorage.setItem('navera_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [userProfile]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 3200);
  };

  const navigate = (route: PageRoute, params: Record<string, string> = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (params.productId) {
      const found = products.find(p => p.id === params.productId);
      if (found) setSelectedProduct(found);
    }
  };

  // Cart calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const couponDiscountPercentage = appliedCoupon ? COUPONS[appliedCoupon] || 0 : 0;
  const discount = Math.round((subtotal * couponDiscountPercentage) / 100);
  // Free delivery above ₹1999
  const deliveryFee = subtotal > 1999 || subtotal === 0 ? 0 : 150;
  const totalAmount = Math.max(0, subtotal - discount + deliveryFee);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const addToCart = (product: Product, size: string, color: ProductColor, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.selectedSize === size && item.selectedColor.name === color.name
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          productId: product.id,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
          addedAt: Date.now()
        };
        return [newItem, ...prev];
      }
    });
    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from cart.', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item)));
  };

  const moveToWishlist = (cartItemId: string) => {
    const item = cart.find(i => i.id === cartItemId);
    if (!item) return;
    if (!wishlist.includes(item.productId)) {
      setWishlist(prev => [...prev, item.productId]);
    }
    removeFromCart(cartItemId);
    showToast(`Moved "${item.product.name}" to your wishlist.`);
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (COUPONS[cleanCode]) {
      setAppliedCoupon(cleanCode);
      showToast(`Promo code "${cleanCode}" applied! ${COUPONS[cleanCode]}% OFF savings.`, 'success');
      return { success: true, message: `Promo code applied (${COUPONS[cleanCode]}% off)` };
    } else {
      showToast('Invalid coupon code. Try NAVY10, WELCOME15, or STYLE20.', 'error');
      return { success: false, message: 'Invalid coupon code' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed.', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId);
    const prodName = product ? product.name : 'Item';
    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast(`Removed "${prodName}" from wishlist.`, 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast(`Saved "${prodName}" to your wishlist.`, 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveWishlistToCart = (productId: string, preferredSize?: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const size = preferredSize || product.sizes[0] || 'Standard';
    const color = product.colors[0];
    addToCart(product, size, color, 1);
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  // Reviews
  const addReview = (productId: string, newReview: { author: string; rating: number; title: string; comment: string }) => {
    const reviewItem: Review = {
      id: `rev-${Date.now()}`,
      author: newReview.author || userProfile.name,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: 'Just now',
      verifiedPurchase: true
    };

    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const updatedReviews = [reviewItem, ...p.reviews];
          const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const newAvg = parseFloat((totalRating / updatedReviews.length).toFixed(1));
          return {
            ...p,
            reviews: updatedReviews,
            rating: newAvg,
            reviewCount: updatedReviews.length
          };
        }
        return p;
      })
    );

    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev =>
        prev
          ? {
              ...prev,
              reviews: [reviewItem, ...prev.reviews],
              reviewCount: prev.reviewCount + 1
            }
          : null
      );
    }

    showToast('Your review has been verified and published!', 'success');
  };

  // Addresses
  const addAddress = (addrData: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addrData,
      id: `addr-${Date.now()}`
    };
    setSavedAddresses(prev => [newAddr, ...prev]);
    showToast('Delivery address saved to your profile.');
    return newAddr;
  };

  // Profile
  const updateUserProfile = (patch: Partial<ShopContextType['userProfile']>) => {
    setUserProfile(prev => ({ ...prev, ...patch }));
    showToast('Profile information updated.');
  };

  // Order Placement
  const placeOrder = (
    address: Address,
    deliveryMethod: 'standard' | 'express',
    paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD',
    paymentDetails: string
  ): Order => {
    const randomOrderNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `NAV-2026-${randomOrderNum}`;

    const estDays = deliveryMethod === 'express' ? 2 : 4;
    const estDateObj = new Date();
    estDateObj.setDate(estDateObj.getDate() + estDays);
    const estFormatted = estDateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      subtotal,
      discount,
      couponCode: appliedCoupon || undefined,
      deliveryFee: deliveryMethod === 'express' ? deliveryFee + 150 : deliveryFee,
      totalAmount: deliveryMethod === 'express' ? totalAmount + 150 : totalAmount,
      address,
      deliveryMethod,
      paymentMethod,
      paymentDetails,
      status: 'Order Placed',
      estimatedDeliveryDate: estFormatted,
      trackingSteps: [
        {
          status: 'Order Placed',
          title: 'Order Placed',
          description: 'Your order was successfully registered.',
          timestamp: 'Just now',
          completed: true,
          current: true
        },
        {
          status: 'Confirmed',
          title: 'Confirmed',
          description: 'Order confirmed and inventory reserved.',
          timestamp: 'Pending verification',
          completed: false,
          current: false
        },
        {
          status: 'Packed',
          title: 'Quality Inspection & Luxury Packaging',
          description: 'Folded in archival tissue with NAVÉRA brass monogram tag.',
          timestamp: 'Expected within 24h',
          completed: false,
          current: false
        },
        {
          status: 'Shipped',
          title: 'Dispatched with Courier',
          description: 'Handed over to express air logistics partner.',
          timestamp: 'Pending',
          completed: false,
          current: false
        },
        {
          status: 'Out for Delivery',
          title: 'Out for Delivery',
          description: 'Local delivery courier on route to destination address.',
          timestamp: 'Pending',
          completed: false,
          current: false
        },
        {
          status: 'Delivered',
          title: 'Delivered',
          description: 'Handed over to customer.',
          timestamp: 'Expected ' + estFormatted,
          completed: false,
          current: false
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrderSuccess(newOrder);
    setActiveTrackingOrder(newOrder);
    clearCart();
    navigate('order-success');
    return newOrder;
  };

  const trackOrderById = (orderId: string): boolean => {
    const found = orders.find(o => o.id.toLowerCase() === orderId.toLowerCase().trim());
    if (found) {
      setActiveTrackingOrder(found);
      navigate('order-tracking');
      return true;
    }
    showToast(`Order #${orderId} not found. Please check the order number.`, 'error');
    return false;
  };

  // Quick view
  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <ShopContext.Provider
      value={{
        currentRoute,
        routeParams,
        navigate,
        products,
        selectedProduct,
        setSelectedProduct,
        addReview,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        moveToWishlist,
        clearCart,
        cartCount,
        subtotal,
        discount,
        deliveryFee,
        totalAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        wishlistCount,
        savedAddresses,
        addAddress,
        orders,
        currentOrderSuccess,
        activeTrackingOrder,
        placeOrder,
        trackOrderById,
        userProfile,
        updateUserProfile,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
