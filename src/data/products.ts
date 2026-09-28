import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- MEN'S ---
  {
    id: 'men-1',
    name: 'Classic Navy Tailored Blazer',
    category: 'Men',
    clothingType: 'Formal',
    subCategory: 'Formal Wear',
    collection: 'Office Wear',
    price: 4999,
    originalPrice: 6999,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 142,
    colors: [
      { name: 'Navy', hex: '#0B1B3D' },
      { name: 'Black', hex: '#111827' },
      { name: 'Charcoal', hex: '#374151' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isBestSeller: true,
    description: 'Precision-tailored in structured Italian-blend wool with bespoke gold-toned button detailing. Structured shoulders and a contemporary tapered waist ensure a sharp silhouette.',
    material: '70% Wool, 30% Fine Viscose with Bemberg Cupro lining',
    features: ['Double rear vent', 'Interior ticket pocket', 'Gold-plated accent cuff buttons', 'Pick-stitch lapel detailing'],
    careInstructions: 'Dry clean only. Steam gently.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: [
      {
        id: 'rev-m1-1',
        author: 'Arjun Mehta',
        rating: 5,
        title: 'Impeccable cut & premium drape',
        comment: 'The navy shade is deep and opulent, exactly what I sought for executive presentations. The stitching and lining exceed expectations.',
        date: '14 Sept 2026',
        verifiedPurchase: true
      },
      {
        id: 'rev-m1-2',
        author: 'Vikramaditya S.',
        rating: 5,
        title: 'Perfect fit right out of the box',
        comment: 'True to size. The fabric breathes well even during long evening events. The gold buttons give a subtle regal flair.',
        date: '02 Sept 2026',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'men-2',
    name: 'Premium Egyptian Cotton White Shirt',
    category: 'Men',
    clothingType: 'Formal',
    subCategory: 'Formal Wear',
    collection: 'Minimal Collection',
    price: 2499,
    originalPrice: 3299,
    discountPercent: 24,
    rating: 4.9,
    reviewCount: 218,
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#BFDBFE' },
      { name: 'Beige', hex: '#F5F5DC' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isBestSeller: true,
    isNew: true,
    description: 'Woven from 120-two-ply Giza Egyptian cotton with an easy-iron silky hand feel. Features a spread cutaway collar and mother-of-pearl buttons.',
    material: '100% Long-Staple Egyptian Cotton',
    features: ['Cutaway spread collar', 'Mother-of-pearl buttons', 'Wrinkle-resistant twill weave', 'Split back yoke'],
    careInstructions: 'Machine wash delicate at 30°C. Warm iron while slightly damp.',
    images: [
      'https://images.unsplash.com/photo-1620012253295-c15c429fbb41?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: [
      {
        id: 'rev-m2-1',
        author: 'Rohan K.',
        rating: 5,
        title: 'Luxurious feel',
        comment: 'Crisp, bright white, and exceptionally smooth against the skin. Holds its collar shape cleanly under a suit.',
        date: '20 Aug 2026',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'men-3',
    name: 'Slim Fit Black Trousers',
    category: 'Men',
    clothingType: 'Formal',
    subCategory: 'Formal Wear',
    collection: 'Office Wear',
    price: 2199,
    originalPrice: 2899,
    discountPercent: 24,
    rating: 4.7,
    reviewCount: 96,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#0B1B3D' },
      { name: 'Charcoal', hex: '#4B5563' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    description: 'A refined slim silhouette crafted from stretch poly-viscose with a subtle luster. Engineered with an anti-slip internal waistband.',
    material: '65% Viscose, 30% Polyester, 5% Elastane',
    features: ['Anti-slip inner waistband', 'Blind-hemmed ankle break', 'Wrinkle recovery', 'French fly closure'],
    careInstructions: 'Machine wash cold inside out. Hang dry.',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: [
      {
        id: 'rev-m3-1',
        author: 'Tanmay C.',
        rating: 4,
        title: 'Sleek cut and comfortable',
        comment: 'Very flattering taper without being restrictive. Fabric has just enough give for all-day office comfort.',
        date: '11 Aug 2026',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'men-4',
    name: 'Heritage Indigo Denim Jacket',
    category: 'Men',
    clothingType: 'Casual',
    subCategory: 'Casual Wear',
    collection: 'Street Style',
    price: 3499,
    originalPrice: 4499,
    discountPercent: 22,
    rating: 4.8,
    reviewCount: 88,
    colors: [
      { name: 'Navy', hex: '#1E3A8A' },
      { name: 'Black', hex: '#1F2937' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: true,
    description: 'Raw 13.5oz ring-spun selvedge denim, stone-washed to achieve a vintage deep-indigo patina with antique brass hardware.',
    material: '99% Organic Cotton, 1% Comfort Stretch',
    features: ['Antiqued brass rivets', 'Double chest flap pockets', 'Adjustable waist tabs', 'Reinforced elbow stitching'],
    careInstructions: 'Wash inside-out in cold water. Air dry away from direct sunlight.',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: [
      {
        id: 'rev-m4-1',
        author: 'Karan D.',
        rating: 5,
        title: 'Hefty, premium denim',
        comment: 'Sturdy denim that softens nicely with wear. Goes seamlessly over both tees and button-downs.',
        date: '08 Sept 2026',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'men-5',
    name: 'Oversized Monogram Graphic T-Shirt',
    category: 'Men',
    clothingType: 'Casual',
    subCategory: 'Casual Wear',
    collection: 'Street Style',
    price: 1299,
    originalPrice: 1799,
    discountPercent: 27,
    rating: 4.6,
    reviewCount: 165,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Beige', hex: '#E5E7EB' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isSale: true,
    description: 'Heavyweight 260 GSM combed cotton featuring the subtle gold NAVÉRA monogram embossed on the chest and dropped shoulders.',
    material: '100% Combed Compact Cotton',
    features: ['260 GSM heavy drape', 'Double-needle bound collar', 'High-density screenprint', 'Pre-shrunk'],
    careInstructions: 'Gentle cycle machine wash. Do not iron directly on print.',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'men-6',
    name: 'Pima Cotton Piqué Polo Shirt',
    category: 'Men',
    clothingType: 'Casual',
    subCategory: 'Casual Wear',
    collection: 'Summer Collection',
    price: 1899,
    originalPrice: 2499,
    discountPercent: 24,
    rating: 4.7,
    reviewCount: 110,
    colors: [
      { name: 'Navy', hex: '#0B1B3D' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Green', hex: '#064E3B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    description: 'Refined Peruvian Pima cotton knit with ribbed collar and genuine horn buttons. Elevated sportswear for casual Fridays or weekends.',
    material: '100% Supima Cotton Piqué',
    features: ['Side vent hem with grosgrain tape', 'Natural horn 3-button placket', 'Retains collar crispness'],
    careInstructions: 'Machine wash delicate. Lay flat to dry.',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'men-7',
    name: 'Bespoke Midnight Two-Piece Formal Suit',
    category: 'Men',
    clothingType: 'Formal',
    subCategory: 'Formal Wear',
    collection: 'Premium Collection',
    price: 8999,
    originalPrice: 12499,
    discountPercent: 28,
    rating: 4.9,
    reviewCount: 74,
    colors: [
      { name: 'Navy', hex: '#08152e' },
      { name: 'Black', hex: '#000000' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isBestSeller: true,
    description: 'The pinnacle of sartorial excellence. Full canvas construction with hand-finished lapel roll, matching trousers with side adjusters.',
    material: 'Super 130s Merino Wool (Italy)',
    features: ['Full canvas interlining', 'Real surgeon cuffs', 'Side tab waist adjusters (belt-free)', 'Satin interior lining'],
    careInstructions: 'Specialist dry clean only. Garment bag included.',
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'men-8',
    name: 'French Linen Relaxed Resort Shirt',
    category: 'Men',
    clothingType: 'Casual',
    subCategory: 'Casual Wear',
    collection: 'Summer Collection',
    price: 2299,
    originalPrice: 2999,
    discountPercent: 23,
    rating: 4.8,
    reviewCount: 92,
    colors: [
      { name: 'Beige', hex: '#E7DFD5' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#1E293B' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    inStock: true,
    isNew: true,
    description: 'Airy Normandy flax linen garment-dyed for ultra-soft lived-in texture. Features a relaxed camp collar ideal for warm evenings.',
    material: '100% Normandy Pure Linen',
    features: ['Camp resort collar', 'Natural coconut shell buttons', 'Breathable open-weave', 'Chest patch pocket'],
    careInstructions: 'Machine wash cold. Line dry in shade.',
    images: [
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },

  // --- WOMEN'S ---
  {
    id: 'women-1',
    name: 'Midnight Silk Satin Evening Gown',
    category: 'Women',
    clothingType: 'Party Wear',
    subCategory: 'Formal Wear',
    collection: 'Party Wear',
    price: 5499,
    originalPrice: 7999,
    discountPercent: 31,
    rating: 4.9,
    reviewCount: 189,
    colors: [
      { name: 'Navy', hex: '#0B1B3D' },
      { name: 'Black', hex: '#111827' },
      { name: 'Red', hex: '#991B1B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isBestSeller: true,
    isNew: true,
    description: 'A breathtaking column silhouette in heavyweight silk satin with an asymmetric cowl neckline and thigh-high side slit. Accented by delicate gold chain straps.',
    material: '95% Pure Silk Satin, 5% Lycra for movement',
    features: ['Asymmetrical draped neckline', 'Dainty detachable gold chain strap', 'Concealed side zipper', 'Floor-length sweeping hem'],
    careInstructions: 'Dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: [
      {
        id: 'rev-w1-1',
        author: 'Meera Sen',
        rating: 5,
        title: 'Felt like royalty',
        comment: 'Wore this for an international awards banquet in Mumbai and received dozens of compliments. The satin has an exquisite fluid weight.',
        date: '18 Sept 2026',
        verifiedPurchase: true
      },
      {
        id: 'rev-w1-2',
        author: 'Ananya Roy',
        rating: 5,
        title: 'Stunning craftsmanship',
        comment: 'The cowl falls naturally and the side slit is tastefully cut. The gold hardware accent is a lovely luxury signature.',
        date: '04 Sept 2026',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'women-2',
    name: 'Botanical Bloom Chiffon Maxi Dress',
    category: 'Women',
    clothingType: 'Casual',
    subCategory: 'Casual Wear',
    collection: 'Summer Collection',
    price: 3299,
    originalPrice: 4299,
    discountPercent: 23,
    rating: 4.8,
    reviewCount: 134,
    colors: [
      { name: 'Beige', hex: '#FDFBF7' },
      { name: 'Pink', hex: '#FBCFE8' },
      { name: 'Blue', hex: '#BAE6FD' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    isSale: true,
    description: 'Tiered floral print dress crafted in ethereal crinkle chiffon with smocked bodice and delicate ruffled cap sleeves.',
    material: '100% Fine Modal Chiffon with soft viscose slip',
    features: ['Smocked elasticated bodice', 'Flattering tiered skirt', 'Keyhole back button', 'Hand-drawn botanical print'],
    careInstructions: 'Hand wash cold or dry clean.',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'women-3',
    name: 'Structured Double-Breasted Oversized Blazer',
    category: 'Women',
    clothingType: 'Formal',
    subCategory: 'Formal Wear',
    collection: 'Office Wear',
    price: 4499,
    originalPrice: 5999,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 95,
    colors: [
      { name: 'Navy', hex: '#0B1B3D' },
      { name: 'Beige', hex: '#E5DCC5' },
      { name: 'Black', hex: '#18181B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isBestSeller: true,
    description: 'Modern power dressing reimagined. Boxy oversized cut in premium compact gabardine, accented with embossed brushed gold buttons.',
    material: '78% Polyester, 18% Rayon, 4% Spandex',
    features: ['Peak lapels', 'Brushed gold shank buttons', 'Functional flap pockets', 'Padded structured shoulders'],
    careInstructions: 'Dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'women-4',
    name: 'High-Waist Sculpting Straight Jeans',
    category: 'Women',
    clothingType: 'Casual',
    subCategory: 'Casual Wear',
    collection: 'Minimal Collection',
    price: 2499,
    originalPrice: 3299,
    discountPercent: 24,
    rating: 4.7,
    reviewCount: 168,
    colors: [
      { name: 'Blue', hex: '#3B82F6' },
      { name: 'Black', hex: '#111827' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    description: 'Contouring high-rise denim with gentle tummy control panel and vintage ankle straight cut. Retains silhouette through all-day wear.',
    material: '98% Cotton, 2% Elastane Recovery Denim',
    features: ['11.5 inch high rise', 'Antique brass button closure', 'Contour waistband', 'Clean cropped ankle break'],
    careInstructions: 'Wash cold inside-out.',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'women-5',
    name: 'Ribbed Knit Cashmere-Blend Crop Top',
    category: 'Women',
    clothingType: 'Casual',
    subCategory: 'Casual Wear',
    collection: 'Summer Collection',
    price: 1499,
    originalPrice: 1999,
    discountPercent: 25,
    rating: 4.6,
    reviewCount: 82,
    colors: [
      { name: 'Beige', hex: '#F3E8D6' },
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#0B1B3D' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    isSale: true,
    description: 'Fine-gauge featherweight knit in cashmere and modal blend with square neckline and wide rib structure.',
    material: '85% Modal, 10% Cashmere, 5% Silk',
    features: ['Architectural square neckline', 'Wide horizontal rib detail', 'Double-faced hem'],
    careInstructions: 'Hand wash cold with wool detergent. Dry flat.',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'women-6',
    name: 'Handloom Chanderi Casual Kurti',
    category: 'Women',
    clothingType: 'Ethnic',
    subCategory: 'Ethnic Wear',
    collection: 'Festive Collection',
    price: 2199,
    originalPrice: 2899,
    discountPercent: 24,
    rating: 4.9,
    reviewCount: 147,
    colors: [
      { name: 'Navy', hex: '#0B1B3D' },
      { name: 'Pink', hex: '#F472B6' },
      { name: 'Green', hex: '#10B981' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isBestSeller: true,
    description: 'Authentic Chanderi silk-cotton kurti with zari thread border motifs and subtle mirrorwork around the mandarin neckline.',
    material: '60% Chanderi Silk, 40% Fine Cotton',
    features: ['Mandarin slit collar', 'Subtle gold zari border', 'Calf-length A-line cut', 'Cotton mulmul lining'],
    careInstructions: 'Gentle hand wash with mild soap.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'women-7',
    name: 'Royal Navy Embroidered Anarkali Ensemble',
    category: 'Women',
    clothingType: 'Ethnic',
    subCategory: 'Ethnic Wear',
    collection: 'Wedding Collection',
    price: 6499,
    originalPrice: 8999,
    discountPercent: 28,
    rating: 5.0,
    reviewCount: 92,
    colors: [
      { name: 'Navy', hex: '#08152e' },
      { name: 'Red', hex: '#831843' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: true,
    description: 'A regal floor-sweeping 24-kali anarkali in rich georgette, embellished with handcrafted metallic pita and zari zardozi embroidery. Accompanied by a scalloped organza dupatta.',
    material: 'Pure Viscose Georgette with Pure Silk Organza Dupatta',
    features: ['24-kali flare with 5-meter ghera', 'Intricate hand zardozi yoke', 'Scalloped zari dupatta border', 'Full lining with can-can option'],
    careInstructions: 'Dry clean only. Store wrapped in muslin.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: [
      {
        id: 'rev-w7-1',
        author: 'Shalini Iyer',
        rating: 5,
        title: 'Heirloom quality embroidery',
        comment: 'The zardozi work is done by true masters. The ghera moves like poetry. I wore it for my brother’s sangeet and it stood out among all designer wear.',
        date: '10 Sept 2026',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'women-8',
    name: 'Mulberry Silk Banarasi Zari Saree',
    category: 'Women',
    clothingType: 'Ethnic',
    subCategory: 'Ethnic Wear',
    collection: 'Wedding Collection',
    price: 7999,
    originalPrice: 10999,
    discountPercent: 27,
    rating: 4.9,
    reviewCount: 114,
    colors: [
      { name: 'Navy', hex: '#0B1B3D' },
      { name: 'Red', hex: '#991B1B' },
      { name: 'Green', hex: '#065F46' }
    ],
    sizes: ['Free Size'],
    inStock: true,
    isBestSeller: true,
    description: 'Hand-woven Banarasi Katan silk saree adorned with classic antique gold sona-rupa zari floral jaal. Includes unstitched matching blouse piece with border.',
    material: '100% Certified Katan Mulberry Silk with Tested Zari',
    features: ['Traditional Kadwa weaving technique', 'Heavy ornate pallu', 'Silk Mark Certified', 'Includes 0.8m running blouse fabric'],
    careInstructions: 'Dry clean only. Roll fold to protect zari integrity.',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'women-9',
    name: 'Tailored Linen-Blend Co-ord Set',
    category: 'Women',
    clothingType: 'Casual',
    subCategory: 'Casual Wear',
    collection: 'Minimal Collection',
    price: 3699,
    originalPrice: 4799,
    discountPercent: 23,
    rating: 4.7,
    reviewCount: 68,
    colors: [
      { name: 'Beige', hex: '#EDE8D0' },
      { name: 'Navy', hex: '#1E293B' },
      { name: 'Pink', hex: '#FCE7F3' }
    ],
    sizes: ['S', 'M', 'L'],
    inStock: true,
    isNew: true,
    description: 'Modern two-piece matching set featuring a cropped buttoned vest and pleated wide-leg trousers.',
    material: '55% Linen, 45% Rayon',
    features: ['V-neck tailored waistcoat', 'High-rise pleated trousers', 'Concealed side zipper', 'Self-fabric covered buttons'],
    careInstructions: 'Dry clean or cold hand wash.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'women-10',
    name: 'Velvet Embellished Party Wear Gown',
    category: 'Women',
    clothingType: 'Party Wear',
    subCategory: 'Formal Wear',
    collection: 'Party Wear',
    price: 5899,
    originalPrice: 7999,
    discountPercent: 26,
    rating: 4.8,
    reviewCount: 76,
    colors: [
      { name: 'Navy', hex: '#0B1B3D' },
      { name: 'Black', hex: '#09090B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    description: 'Deep midnight blue micro-velvet gown featuring hand-placed crystal beadwork along the sweetheart neckline and plunging back.',
    material: 'Plush Silk Micro-Velvet',
    features: ['Sweetheart corset bodice', 'Hand crystal micro-beading', 'Mermaid flare hem', 'Built-in cup support'],
    careInstructions: 'Dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },

  // --- KIDS ---
  {
    id: 'kids-1',
    name: 'Kids Organic Cotton Graphic Tee',
    category: 'Kids',
    clothingType: 'Casual',
    subCategory: 'Casual Wear',
    collection: 'Summer Collection',
    price: 699,
    originalPrice: 999,
    discountPercent: 30,
    rating: 4.7,
    reviewCount: 65,
    colors: [
      { name: 'Navy', hex: '#0B1B3D' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Yellow', hex: '#FBBF24' }
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    inStock: true,
    isSale: true,
    description: 'Ultra-soft GOTS certified organic cotton t-shirt with whimsical constellation print using non-toxic inks.',
    material: '100% GOTS Certified Organic Cotton',
    features: ['Tagless neck for sensitive skin', 'Hypoallergenic dyes', 'Durable double-stitch hem'],
    careInstructions: 'Machine wash warm, tumble dry low.',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'kids-2',
    name: 'Kids Comfort Stretch Denim Jeans',
    category: 'Kids',
    clothingType: 'Casual',
    subCategory: 'Casual Wear',
    collection: 'Street Style',
    price: 1199,
    originalPrice: 1599,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 48,
    colors: [
      { name: 'Blue', hex: '#2563EB' },
      { name: 'Navy', hex: '#1E3A8A' }
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    inStock: true,
    description: 'Hard-wearing yet soft stretch denim with an internal elastic buttonhole waistband for growing kids.',
    material: '98% Cotton, 2% Spandex',
    features: ['Adjustable hidden buttonhole waistband', 'Reinforced knees', 'Easy snap button closure for younger sizes'],
    careInstructions: 'Machine wash cold.',
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'kids-3',
    name: 'Little Stars Shimmer Party Dress',
    category: 'Kids',
    clothingType: 'Party Wear',
    subCategory: 'Formal Wear',
    collection: 'Party Wear',
    price: 1999,
    originalPrice: 2699,
    discountPercent: 26,
    rating: 4.9,
    reviewCount: 54,
    colors: [
      { name: 'Navy', hex: '#0B1B3D' },
      { name: 'Pink', hex: '#F9A8D4' }
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    inStock: true,
    isBestSeller: true,
    description: 'Charming festive dress with gold star sequin overlay on soft navy tulle, finished with a satin sash and bow.',
    material: 'Tulle with 100% Breathable Cotton Slip Underneath',
    features: ['Non-scratchy cotton lining', 'Satin waist tie', 'Invisible back zip with safety guard'],
    careInstructions: 'Gentle hand wash inside out.',
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'kids-4',
    name: 'Kids Festive Silk Kurta & Pyjama Set',
    category: 'Kids',
    clothingType: 'Ethnic',
    subCategory: 'Ethnic Wear',
    collection: 'Festive Collection',
    price: 1799,
    originalPrice: 2399,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 39,
    colors: [
      { name: 'Navy', hex: '#0B1B3D' },
      { name: 'Beige', hex: '#FEF3C7' }
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    inStock: true,
    isNew: true,
    description: 'Royal navy art-silk kurta with subtle gold thread collar embroidery, paired with comfortable elasticated churidar pyjama.',
    material: 'Art Silk with 100% Soft Cotton Inner Lining',
    features: ['Mandarin neck with fabric buttons', 'Comfort cotton lining against skin', 'Elastic waistband pyjama'],
    careInstructions: 'Dry clean recommended.',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'kids-5',
    name: 'Kids Cozy Fleece Pullover Hoodie',
    category: 'Kids',
    clothingType: 'Casual',
    subCategory: 'Winter Wear',
    collection: 'Winter Collection',
    price: 1399,
    originalPrice: 1799,
    discountPercent: 22,
    rating: 4.7,
    reviewCount: 41,
    colors: [
      { name: 'Navy', hex: '#0B1B3D' },
      { name: 'Charcoal', hex: '#4B5563' }
    ],
    sizes: ['5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    inStock: true,
    description: 'Thick brushed interior fleece hoodie with kangaroo pocket and embroidered NAVÉRA crest.',
    material: '80% Cotton, 20% Polyester Sherpa-feel Fleece',
    features: ['Double-lined warm hood', 'Ribbed cuffs and waistband', 'Spacious kangaroo pocket'],
    careInstructions: 'Machine wash warm.',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },

  // --- ACCESSORIES ---
  {
    id: 'acc-1',
    name: 'Saffiano Leather Executive Handbag',
    category: 'Accessories',
    clothingType: 'Accessories',
    subCategory: 'Accessories',
    collection: 'Premium Collection',
    price: 4999,
    originalPrice: 6999,
    discountPercent: 28,
    rating: 4.9,
    reviewCount: 104,
    colors: [
      { name: 'Navy', hex: '#0B1B3D' },
      { name: 'Black', hex: '#000000' },
      { name: 'Beige', hex: '#D2B48C' }
    ],
    sizes: ['One Size'],
    inStock: true,
    isBestSeller: true,
    description: 'Crafted from scratch-resistant Italian Saffiano calf leather with 24k gold-plated brass hardware and custom lock pendant.',
    material: '100% Genuine Saffiano Leather, Monogram Twill Lining',
    features: ['Padded laptop compartment fits up to 14"', 'Protective metal bottom feet', 'Detachable shoulder strap', 'Internal zip organizer'],
    careInstructions: 'Wipe with soft leather conditioner cloth. Keep in dust bag.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: [
      {
        id: 'rev-a1-1',
        author: 'Pooja Verma',
        rating: 5,
        title: 'Breathtaking quality',
        comment: 'The navy leather with gold hardware looks like a luxury European fashion house piece. Roomy enough for my MacBook and planner.',
        date: '16 Sept 2026',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'acc-2',
    name: 'Sovereign Gold & Navy Chronograph Watch',
    category: 'Accessories',
    clothingType: 'Accessories',
    subCategory: 'Accessories',
    collection: 'Premium Collection',
    price: 5999,
    originalPrice: 8499,
    discountPercent: 29,
    rating: 4.9,
    reviewCount: 88,
    colors: [
      { name: 'Gold', hex: '#C6A867' }
    ],
    sizes: ['41mm'],
    inStock: true,
    isBestSeller: true,
    isNew: true,
    description: 'Bespoke 41mm timepiece in polished 316L stainless steel with gold PVD coating, sunburst navy dial, and scratch-proof sapphire crystal.',
    material: '316L Stainless Steel, PVD Gold, Sapphire Crystal Glass',
    features: ['Japanese Miyota Chronograph movement', '5 ATM / 50m water resistance', 'Luminous hands and indices', 'Genuine Italian leather strap'],
    careInstructions: 'Avoid direct contact with perfumes and chlorinated water.',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'acc-3',
    name: 'Aviator Polarized Gold Sunglasses',
    category: 'Accessories',
    clothingType: 'Accessories',
    subCategory: 'Accessories',
    collection: 'Summer Collection',
    price: 1999,
    originalPrice: 2899,
    discountPercent: 31,
    rating: 4.7,
    reviewCount: 77,
    colors: [
      { name: 'Gold', hex: '#C6A867' }
    ],
    sizes: ['Standard'],
    inStock: true,
    isSale: true,
    description: 'Featherweight titanium-alloy frame in satin champagne gold with TAC polarized lenses providing 100% UV400 protection.',
    material: 'Titanium-Alloy Wire Frame, TAC Polarized CR-39 Lenses',
    features: ['100% UV400 & Glare reduction', 'Adjustable silicone nose pads', 'Spring-loaded flexible hinges', 'Includes hard leather case'],
    careInstructions: 'Clean with provided microfiber cloth.',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'acc-4',
    name: 'Reversible Italian Full-Grain Leather Belt',
    category: 'Accessories',
    clothingType: 'Accessories',
    subCategory: 'Accessories',
    collection: 'Minimal Collection',
    price: 1599,
    originalPrice: 2199,
    discountPercent: 27,
    rating: 4.8,
    reviewCount: 92,
    colors: [
      { name: 'Black / Brown', hex: '#1F2937' }
    ],
    sizes: ['32', '34', '36', '38', '40'],
    inStock: true,
    description: 'Dual-tone reversible belt switching effortlessly between Classic Black and Rich Cognac Tan. Finished with a brushed gold rotatable buckle.',
    material: '100% Italian Full-Grain Vegetable Tanned Leather',
    features: ['Twist-to-reverse buckle mechanism', '35mm versatile dress width', 'Hand-burnished beveled edges'],
    careInstructions: 'Condition with beeswax leather balm twice a year.',
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'acc-5',
    name: 'Pure Cashmere Monogram Twill Scarf',
    category: 'Accessories',
    clothingType: 'Winter',
    subCategory: 'Winter Wear',
    collection: 'Winter Collection',
    price: 2499,
    originalPrice: 3499,
    discountPercent: 28,
    rating: 4.9,
    reviewCount: 63,
    colors: [
      { name: 'Navy', hex: '#0B1B3D' },
      { name: 'Beige', hex: '#D6C7A1' }
    ],
    sizes: ['200cm x 70cm'],
    inStock: true,
    isNew: true,
    description: 'Woven in the Himalayas from Grade-A Mongolian cashmere with delicate eyelash fringe trim. Sublime warmth without excess bulk.',
    material: '100% Grade-A Pure Cashmere',
    features: ['Eyelash fringed edges', 'Woven tone-on-tone monogram pattern', 'Featherlight 180g weight'],
    careInstructions: 'Dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },

  // --- FOOTWEAR ---
  {
    id: 'foot-1',
    name: 'Minimalist Clean White Calfskin Sneakers',
    category: 'Footwear',
    clothingType: 'Casual',
    subCategory: 'Casual Wear',
    collection: 'Minimal Collection',
    price: 3499,
    originalPrice: 4999,
    discountPercent: 30,
    rating: 4.8,
    reviewCount: 156,
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy Accents', hex: '#0B1B3D' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    inStock: true,
    isBestSeller: true,
    description: 'Sleek court sneakers crafted from Italian calfskin leather with Margom-style stitched rubber cupsoles and gold foil heel embossing.',
    material: 'Full-Grain Italian Calfskin, Calf Leather Lining, Natural Rubber Cupsole',
    features: ['Cushioned Ortholite antimicrobial footbed', 'Reinforced heel counter', 'Waxed cotton flat laces', 'Gold foil serial stamp on heel'],
    careInstructions: 'Wipe with damp cloth and leather sneaker cream.',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: [
      {
        id: 'rev-f1-1',
        author: 'Sameer G.',
        rating: 5,
        title: 'Worth every rupee',
        comment: 'Leather is butter-soft with zero break-in period. Easily compares to European luxury designer sneakers at a fraction of the cost.',
        date: '12 Sept 2026',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'foot-2',
    name: 'Aurelia Strappy Gold Stiletto Heels',
    category: 'Footwear',
    clothingType: 'Party Wear',
    subCategory: 'Formal Wear',
    collection: 'Party Wear',
    price: 3999,
    originalPrice: 5499,
    discountPercent: 27,
    rating: 4.9,
    reviewCount: 84,
    colors: [
      { name: 'Gold', hex: '#C6A867' },
      { name: 'Navy', hex: '#0B1B3D' }
    ],
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    inStock: true,
    isNew: true,
    description: 'Sculpted 85mm stiletto heel with cross-ankle straps in metallic champagne gold specchio leather and padded memory foam insole.',
    material: 'Specchio Metallic Leather, Non-Slip Leather Outsole',
    features: ['85mm (3.3 inch) balanced stiletto heel', 'Dual-density padded footbed', 'Delicate gold buckle closure'],
    careInstructions: 'Buff gently with soft cloth.',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'foot-3',
    name: 'Bespoke Goodyear Welted Oxford Formal Shoes',
    category: 'Footwear',
    clothingType: 'Formal',
    subCategory: 'Formal Wear',
    collection: 'Premium Collection',
    price: 5499,
    originalPrice: 7499,
    discountPercent: 26,
    rating: 4.9,
    reviewCount: 98,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Cognac', hex: '#78350F' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    inStock: true,
    isBestSeller: true,
    description: 'Traditional cap-toe oxford handcrafted using 200+ step Goodyear welt construction. Premium French box calf leather with hand-burnished toe.',
    material: 'French Box Calf Leather, Channel-Stitched Oak Bark Tanned Sole',
    features: ['Goodyear welted (fully recraftable)', 'Hand-burnished mirror shine cap-toe', 'Cork footbed that molds to your foot over time'],
    careInstructions: 'Use cedar shoe trees after every wear and condition monthly.',
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'foot-4',
    name: 'Artisan Suede Chelsea Boots',
    category: 'Footwear',
    clothingType: 'Casual',
    subCategory: 'Winter Wear',
    collection: 'Winter Collection',
    price: 4499,
    originalPrice: 5999,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 73,
    colors: [
      { name: 'Navy', hex: '#1E293B' },
      { name: 'Beige', hex: '#A89F91' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    inStock: true,
    description: 'Weather-guarded Italian water-resistant split suede chelsea boots with reinforced woven elastic gussets and stacked leather crepe sole.',
    material: 'Water-Repellent Italian Suede, Natural Crepe Rubber Sole',
    features: ['Water-repellent hydro-suede', 'Durable woven elastic side panels', 'Grosgrain pull-on tabs'],
    careInstructions: 'Spray with suede protector. Use crepe brush for cleaning.',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  }
];

export const CATEGORIES_LIST = [
  { id: 'men', name: "Men's Fashion", image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', description: 'Tailored blazers, Egyptian cotton shirts & trousers' },
  { id: 'women', name: "Women's Fashion", image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80', description: 'Silk gowns, oversized blazers & graceful ensembles' },
  { id: 'kids', name: "Kids' Fashion", image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80', description: 'Organic essentials & festive star dresses' },
  { id: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', description: 'Leather bags, chronograph timepieces & sunglasses' },
  { id: 'footwear', name: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80', description: 'Calfskin sneakers, stiletto heels & Goodyear oxfords' },
  { id: 'ethnic', name: 'Ethnic Wear', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80', description: 'Banarasi silk sarees, Anarkalis & regal kurtas' },
  { id: 'formal', name: 'Formal Wear', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80', description: 'Bespoke suits, tuxedos & boardroom authority' },
  { id: 'casual', name: 'Casual Wear', image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=800&q=80', description: 'Selvedge denim, Pima cotton polos & linen' },
  { id: 'sportswear', name: 'Sportswear', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80', description: 'Athletic recovery knits & technical activewear' },
  { id: 'winter', name: 'Winter Wear', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80', description: 'Mongolian cashmere scarves & shearling coats' }
];

export const COLLECTIONS_LIST = [
  { id: 'summer', title: 'Summer Collection', tagline: 'Lightweight linens & sun-washed silks', badge: 'New Season', count: 12 },
  { id: 'winter', title: 'Winter Collection', tagline: 'Pure cashmere layers & structured wool', badge: 'Warmth', count: 8 },
  { id: 'festive', title: 'Festive Collection', tagline: 'Royal navy & gold zari heritage craft', badge: 'Handloom', count: 14 },
  { id: 'office', title: 'Office Wear', tagline: 'Impeccable blazers & pristine Egyptian cotton', badge: 'Executive', count: 10 },
  { id: 'street', title: 'Street Style', tagline: 'Raw selvedge denim & heavyweight graphics', badge: 'Urban', count: 9 },
  { id: 'party', title: 'Party Wear', tagline: 'Silk satin evening gowns & gold heels', badge: 'Midnight', count: 11 },
  { id: 'wedding', title: 'Wedding Collection', tagline: 'Bespoke suits & heirloom Banarasi sarees', badge: 'Couture', count: 15 },
  { id: 'minimal', title: 'Minimal Collection', tagline: 'Clean architectural lines & neutral palettes', badge: 'Timeless', count: 10 },
  { id: 'premium', title: 'Premium Collection', tagline: 'Super 130s wool & chronograph timepieces', badge: 'Signature', count: 8 }
];

export const COUPONS: Record<string, number> = {
  NAVY10: 10,
  WELCOME15: 15,
  STYLE20: 20
};
