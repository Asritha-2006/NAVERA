export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'Men' | 'Women' | 'Kids' | 'Accessories' | 'Footwear';
  clothingType: string; // e.g. "Blazer", "Dress", "Shirt", "Jeans", "Ethnic", "Formal", "Casual", "Sportswear", "Winter"
  subCategory: string; // e.g. "Formal Wear", "Ethnic Wear", "Casual Wear", etc.
  collection?: string; // e.g. "Summer Collection", "Festive Collection", etc.
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  sizes: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  description: string;
  material: string;
  features: string[];
  careInstructions: string;
  images: string[];
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique item id in cart
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
  addedAt: number;
}

export interface Address {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  houseFlat: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  isDefault?: boolean;
}

export interface TrackingStep {
  status: string;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  totalAmount: number;
  address: Address;
  deliveryMethod: 'standard' | 'express';
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  paymentDetails: string;
  status: 'Order Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDeliveryDate: string;
  trackingSteps: TrackingStep[];
}

export type PageRoute = 
  | 'home' 
  | 'men' 
  | 'women' 
  | 'kids' 
  | 'accessories' 
  | 'footwear' 
  | 'ethnic' 
  | 'formal' 
  | 'casual' 
  | 'sportswear' 
  | 'winter' 
  | 'new-arrivals' 
  | 'sale' 
  | 'collections' 
  | 'product-detail' 
  | 'wishlist'
  | 'cart' 
  | 'checkout' 
  | 'order-success' 
  | 'order-tracking' 
  | 'account' 
  | 'about' 
  | 'contact' 
  | 'faq';
