import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ProductColor } from '../types';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronRight,
  Ruler,
  X,
  MessageSquarePlus,
  CheckCircle2
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    navigate,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addReview,
    showToast,
    products
  } = useShop();

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#0B1B3D]">Garment Not Found</h2>
        <button
          onClick={() => navigate('home')}
          className="mt-4 px-6 py-2 bg-[#0B1B3D] text-white text-xs font-semibold uppercase"
        >
          Return to Atelier
        </button>
      </div>
    );
  }

  // Local state for product customization
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(selectedProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(selectedProduct.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);

  // Modals & PIN code checker
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [pinCodeInput, setPinCodeInput] = useState('');
  const [pinDeliveryStatus, setPinDeliveryStatus] = useState<{
    checked: boolean;
    valid: boolean;
    date: string;
    city?: string;
  } | null>(null);

  // Review submission state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isFavorited = isInWishlist(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    navigate('checkout');
  };

  const handleCheckPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pinCodeInput.trim())) {
      showToast('Please enter a valid 6-digit Indian PIN code.', 'error');
      return;
    }
    const pin = pinCodeInput.trim();
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);
    const formatted = estDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

    let city = 'Metro Hub';
    if (pin.startsWith('56')) city = 'Bengaluru';
    else if (pin.startsWith('40')) city = 'Mumbai';
    else if (pin.startsWith('11')) city = 'New Delhi';
    else if (pin.startsWith('60')) city = 'Chennai';
    else if (pin.startsWith('50')) city = 'Hyderabad';

    setPinDeliveryStatus({
      checked: true,
      valid: true,
      date: formatted,
      city
    });
    showToast(`Delivery available to PIN ${pin} (${city}).`);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewTitle.trim() || !newReviewComment.trim()) {
      showToast('Please write both a title and review comment.', 'error');
      return;
    }
    addReview(selectedProduct.id, {
      author: newReviewAuthor.trim() || 'Verified Patron',
      rating: newReviewRating,
      title: newReviewTitle.trim(),
      comment: newReviewComment.trim()
    });
    setNewReviewTitle('');
    setNewReviewComment('');
    setShowReviewForm(false);
  };

  // Recommended products (excluding self)
  const relatedProducts = products
    .filter(p => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.subCategory === selectedProduct.subCategory))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium tracking-wider uppercase">
        <button onClick={() => navigate('home')} className="hover:text-[#0B1B3D]">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button
          onClick={() => navigate(selectedProduct.category.toLowerCase() as any)}
          className="hover:text-[#0B1B3D]"
        >
          {selectedProduct.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#0B1B3D] truncate max-w-xs">{selectedProduct.name}</span>
      </nav>

      {/* Main Contiguous Product Showcase (PDP) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Gallery Left (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-50 border border-slate-200 rounded-sm">
            <ImageWithFallback
              src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
              alt={selectedProduct.name}
              categoryHint={selectedProduct.category}
              className="w-full h-full object-cover"
            />
            {selectedProduct.isSale && (
              <span className="absolute top-4 left-4 bg-[#0B1B3D] text-[#C6A867] text-xs font-mono font-bold px-3 py-1 uppercase tracking-wider border border-[#C6A867]/40">
                Sale -{selectedProduct.discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnails row */}
          {selectedProduct.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-26 shrink-0 border overflow-hidden transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#0B1B3D] ring-2 ring-[#0B1B3D]'
                      : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Contiguous Purchase Module Right (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs tracking-widest uppercase text-slate-500 mb-1">
              <span>{selectedProduct.category} · {selectedProduct.subCategory}</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock at Atelier
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1B3D] leading-tight">
              {selectedProduct.name}
            </h1>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-2 mt-2.5 text-xs">
              <div className="flex text-[#C6A867]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-slate-900">{selectedProduct.rating}</span>
              <span className="text-slate-500">({selectedProduct.reviewCount} customer reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="py-3 border-y border-slate-200">
            <div className="flex items-baseline gap-3 font-mono tabular-nums">
              <span className="text-3xl font-bold text-[#0B1B3D]">
                ₹{selectedProduct.price.toLocaleString('en-IN')}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-base text-slate-400 line-through">
                  ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {selectedProduct.discountPercent && (
                <span className="text-xs font-bold text-[#0B1B3D] bg-[#C6A867]/25 px-2.5 py-1 uppercase tracking-wider">
                  Save {selectedProduct.discountPercent}%
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Inclusive of all taxes · Complimentary insurance & garment pouch
            </p>
          </div>

          {/* Color Selection */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-semibold text-slate-800 uppercase tracking-wider">Color:</span>
              <span className="font-medium text-[#0B1B3D]">{selectedColor.name}</span>
            </div>
            <div className="flex items-center gap-3">
              {selectedProduct.colors.map(col => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col)}
                  className={`relative w-8 h-8 rounded-full border transition-all ${
                    selectedColor.name === col.name
                      ? 'ring-2 ring-offset-2 ring-[#0B1B3D] scale-105'
                      : 'border-slate-300 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-semibold text-slate-800 uppercase tracking-wider">Select Size:</span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="flex items-center gap-1 text-[#C6A867] hover:underline font-medium"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-xs font-mono font-semibold border transition-all ${
                    selectedSize === size
                      ? 'bg-[#0B1B3D] text-[#FAF9F5] border-[#0B1B3D] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-[#0B1B3D]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Quantity:
            </span>
            <div className="flex items-center border border-slate-300">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-slate-600 hover:bg-slate-100 font-mono text-sm"
              >
                -
              </button>
              <span className="px-4 py-1 text-xs font-mono font-bold text-slate-800">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-slate-600 hover:bg-slate-100 font-mono text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-[#0B1B3D] hover:bg-[#162B56] text-white text-xs font-bold tracking-widest uppercase transition-all shadow-md active:scale-98"
              >
                <ShoppingBag className="w-4 h-4 text-[#C6A867]" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                aria-label="Toggle wishlist"
                className="px-4 py-3.5 border border-slate-300 hover:border-[#0B1B3D] text-slate-700 hover:text-[#0B1B3D] flex items-center justify-center transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorited ? 'fill-[#C6A867] text-[#C6A867]' : ''
                  }`}
                />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#C6A867] hover:bg-[#B89748] text-[#0B1B3D] text-xs font-bold tracking-widest uppercase transition-all shadow-md active:scale-98"
            >
              <Zap className="w-4 h-4" />
              <span>Instant Buy Now</span>
            </button>
          </div>

          {/* Delivery & PIN Checker Module */}
          <div className="p-4 bg-[#FAF9F5] border border-slate-200 rounded-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0B1B3D] uppercase tracking-wider">
              <Truck className="w-4 h-4 text-[#C6A867]" />
              <span>Check Delivery Availability</span>
            </div>

            <form onSubmit={handleCheckPin} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pinCodeInput}
                onChange={e => setPinCodeInput(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-Digit PIN Code"
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 font-mono focus:outline-hidden focus:border-[#0B1B3D]"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#0B1B3D] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#162B56]"
              >
                Check
              </button>
            </form>

            {pinDeliveryStatus && pinDeliveryStatus.checked && (
              <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <div>
                  <strong>Fast Delivery to {pinDeliveryStatus.city}:</strong> Arrives by{' '}
                  <span className="font-semibold underline">{pinDeliveryStatus.date}</span> with insured dispatch.
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-200">
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>7-Day Return / Exchange</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>100% Certified Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Garment Specifications & Materials */}
      <div className="border-t border-slate-200 pt-12">
        <h2 className="font-serif text-2xl font-bold text-[#0B1B3D] mb-6">
          Sartorial Details & Craftsmanship
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C6A867]">
              Description & Silhouette
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C6A867]">
              Material Composition
            </h4>
            <p className="text-xs text-slate-700 font-medium">
              {selectedProduct.material}
            </p>
            <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
              {selectedProduct.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C6A867]">
              Atelier Care Instructions
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedProduct.careInstructions}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="border-t border-slate-200 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <span className="text-[11px] tracking-widest uppercase text-[#C6A867] font-semibold">
              COMMUNITY VOICES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1B3D]">
              Client Reviews ({selectedProduct.reviewCount})
            </h2>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1B3D] text-[#FAF9F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#162B56] transition-colors"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#C6A867]" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Submit Review Form */}
        {showReviewForm && (
          <form
            onSubmit={handleReviewSubmit}
            className="my-8 p-6 bg-[#FAF9F5] border border-[#C6A867]/40 rounded-sm space-y-4 max-w-2xl animate-fade-in"
          >
            <h3 className="font-serif text-lg font-bold text-[#0B1B3D]">
              Submit Your Patron Appraisal
            </h3>

            {/* Rating Stars Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Rating
              </label>
              <div className="flex gap-1 text-[#C6A867]">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setNewReviewRating(star)}
                    className="p-1"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= newReviewRating ? 'fill-current' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={newReviewAuthor}
                  onChange={e => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Anand R."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Review Headline *
                </label>
                <input
                  type="text"
                  required
                  value={newReviewTitle}
                  onChange={e => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Exceptional tailoring and luxurious drape"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Detailed Comments *
              </label>
              <textarea
                required
                rows={3}
                value={newReviewComment}
                onChange={e => setNewReviewComment(e.target.value)}
                placeholder="Share your thoughts on fit, material quality, and occasion wear..."
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0B1B3D] text-[#FAF9F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#162B56]"
              >
                Publish Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2.5 bg-slate-200 text-slate-700 text-xs font-semibold uppercase"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Existing Reviews List */}
        <div className="mt-8 space-y-6">
          {selectedProduct.reviews.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-4">
              Be the first patron to leave an appraisal for this creation.
            </p>
          ) : (
            selectedProduct.reviews.map(rev => (
              <div key={rev.id} className="pb-6 border-b border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0B1B3D]">{rev.author}</span>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 font-medium">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">{rev.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex text-[#C6A867]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <h4 className="font-semibold text-xs text-slate-800">{rev.title}</h4>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-slate-200 pt-12">
          <div className="mb-8">
            <span className="text-[11px] tracking-widest uppercase text-[#C6A867] font-semibold">
              COMPLEMENTARY CREATIONS
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#0B1B3D] mt-1">
              You May Also Admire
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-xl bg-white border border-[#C6A867]/40 shadow-2xl p-6 rounded-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="font-serif text-xl font-bold text-[#0B1B3D]">
                NAVÉRA Size Guide (Inches)
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-slate-500 hover:text-black p-1"
                aria-label="Close size guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 overflow-x-auto text-xs font-mono tabular-nums">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 bg-[#FAF9F5] text-slate-800 font-bold">
                    <th className="py-2 px-3">Size</th>
                    <th className="py-2 px-3">Chest (in)</th>
                    <th className="py-2 px-3">Waist (in)</th>
                    <th className="py-2 px-3">Hip (in)</th>
                    <th className="py-2 px-3">Length (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="py-2 px-3 font-bold text-[#0B1B3D]">XS</td>
                    <td className="py-2 px-3">34 - 36</td>
                    <td className="py-2 px-3">28 - 30</td>
                    <td className="py-2 px-3">35 - 37</td>
                    <td className="py-2 px-3">27.5</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-[#0B1B3D]">S</td>
                    <td className="py-2 px-3">36 - 38</td>
                    <td className="py-2 px-3">30 - 32</td>
                    <td className="py-2 px-3">37 - 39</td>
                    <td className="py-2 px-3">28.5</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-[#0B1B3D]">M</td>
                    <td className="py-2 px-3">38 - 40</td>
                    <td className="py-2 px-3">32 - 34</td>
                    <td className="py-2 px-3">39 - 41</td>
                    <td className="py-2 px-3">29.5</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-[#0B1B3D]">L</td>
                    <td className="py-2 px-3">40 - 42</td>
                    <td className="py-2 px-3">34 - 36</td>
                    <td className="py-2 px-3">41 - 43</td>
                    <td className="py-2 px-3">30.5</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-[#0B1B3D]">XL</td>
                    <td className="py-2 px-3">42 - 44</td>
                    <td className="py-2 px-3">36 - 38</td>
                    <td className="py-2 px-3">43 - 45</td>
                    <td className="py-2 px-3">31.5</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-[#0B1B3D]">XXL</td>
                    <td className="py-2 px-3">44 - 46</td>
                    <td className="py-2 px-3">38 - 40</td>
                    <td className="py-2 px-3">45 - 47</td>
                    <td className="py-2 px-3">32.0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-500 mt-2">
              All garments are tailored with 1.5 inches of internal inlay allowance for effortless local customization.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
