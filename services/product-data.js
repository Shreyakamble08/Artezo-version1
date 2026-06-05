// ============================================================================
// PRODUCT DATABASE - Complete with 20+ dummy products
// ============================================================================

const ProductDatabase = {
  // ========== MAIN SWITCH PLATE PRODUCT (ID: 5055) ==========
  mainProduct: {
    productId: 5055,
    productName: "Artezo Golden Acrylic Premium Modern Light Switch Plate",
    brandName: "Artezo",
    currentSku: "ART-WPLATE-GLD",
    selectedColor: "Golden",
    currentSellingPrice: 499,
    currentMrpPrice: 899,
    currentStock: 150,
    mainImage:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600",
    mockupImages: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600",
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600",
    ],
    hero_banners: [
      {
        bannerId: 1,
        bannerImg:
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600",
      },
      {
        bannerId: 2,
        bannerImg:
          "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600",
      },
      {
        bannerId: 3,
        bannerImg:
          "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600",
      },
    ],
    availableVariants: [
      {
        variantId: "VAR-GOLD",
        color: "Golden",
        sku: "ART-WPLATE-GLD",
        price: 499,
        mrp: 899,
        stock: 150,
        mainImage:
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600",
        size: "Standard (4.5 x 4.5 inches)",
        sizes: ["Standard", "Large"],
        titleName: "Golden Matte Finish",
      },
      {
        variantId: "VAR-BLACK",
        color: "Matte Black",
        sku: "ART-WPLATE-BLK",
        price: 449,
        mrp: 799,
        stock: 85,
        mainImage:
          "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600",
        size: "Standard (4.5 x 4.5 inches)",
        sizes: ["Standard", "Large"],
        titleName: "Matte Black Finish",
      },
      {
        variantId: "VAR-WHITE",
        color: "Glossy White",
        sku: "ART-WPLATE-WHT",
        price: 399,
        mrp: 749,
        stock: 200,
        mainImage:
          "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600",
        size: "Standard (4.5 x 4.5 inches)",
        sizes: ["Standard", "Large"],
        titleName: "Glossy White Finish",
      },
      {
        variantId: "VAR-BRASS",
        color: "Antique Brass",
        sku: "ART-WPLATE-BRS",
        price: 599,
        mrp: 999,
        stock: 45,
        mainImage:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600",
        size: "Standard (4.5 x 4.5 inches)",
        sizes: ["Standard"],
        titleName: "Antique Brass Finish",
      },
    ],
    availabeCoupons: [
      {
        couponId: 1001,
        couponDescription: "Get 10% off on first purchase",
        discount: "10%",
        couponCode: "FIRST10",
        minPurchase: 499,
        terms: "Valid on first purchase only",
        discountValue: 10,
      },
      {
        couponId: 1002,
        couponDescription: "Special discount for members - Save 20%",
        discount: "20%",
        couponCode: "MEMBER20",
        minPurchase: 999,
        terms: "Membership required",
        discountValue: 20,
      },
      {
        couponId: 1003,
        couponDescription: "Free Shipping on orders above ₹999",
        discount: "FREE SHIPPING",
        couponCode: "FREESHIP",
        minPurchase: 999,
        terms: "Free shipping applicable",
        discountValue: 0,
      },
    ],
    productReviews: [
      {
        reviewId: "101",
        reviewerName: "Priya S.",
        reviewerImage: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        description:
          "Absolutely love the quality! The switch plate looks premium and modern.",
        approved: true,
        location: "Chennai",
        time: "2 days ago",
        likes: 24,
        verified: true,
      },
      {
        reviewId: "102",
        reviewerName: "Rahul M.",
        reviewerImage: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4,
        description: "Great product for the price. The acrylic finish is nice.",
        approved: true,
        location: "Mumbai",
        time: "5 days ago",
        likes: 18,
        verified: true,
      },
    ],
    faqAns: {
      "Is this product easy to care for?":
        "Yes! Simply wipe with a soft, damp cloth.",
      "Is installation difficult?":
        "No, installation is straightforward with basic tools.",
      "What material is it made of?":
        "Premium acrylic with scratch-resistant surface.",
    },
    installationSteps: [
      {
        step: 1,
        title: "Prepare the Wall",
        shortDescription: "Clean the wall surface and mark the positions.",
        stepImage:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
        shortNote: "Use a level for accuracy",
      },
      {
        step: 2,
        title: "Mount the Plate",
        shortDescription: "Align the plate and secure with screws.",
        stepImage:
          "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400",
        shortNote: "Don't overtighten",
      },
    ],
    aboutItem: [
      "Premium Acrylic Material",
      "Modern Minimalist Design",
      "Easy Installation",
      "Scratch Resistant Surface",
    ],
    specifications: {
      material: "Premium Acrylic",
      design_style: "Modern Minimalist",
      dimensions: "4.5 x 4.5 inches",
      warranty: "1 Year Warranty",
    },
    isCustomizable: false,
    price: 499,
    original: 899,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600",
    subcategory: "wall-plates",
    popular: 245,
    newest: 1,
    rating: 4.6,
    reviews: 178,
  },

  // ========== WALL CLOCKS (IDs: 101-110) ==========
 wallClock1: {
    productId: 101,
    productName: "Chhatrapati Shivaji Maharaj Portrait Framed Wall Art | Religious Print & Historical Wall Decor for Living Room | Office & Home (Size 14 x 20 Inches)",
    brandName: "Artezo",
    currentSku: "WC-101-BRN-L",
    selectedColor: "Brown",
    currentSellingPrice: 1299,
    currentMrpPrice: 2499,
    currentStock: 45,
    mainImage:
      "https://m.media-amazon.com/images/I/818njH7d3AL._SX522_.jpg",
    mockupImages: [
      "https://m.media-amazon.com/images/I/71TP-E2GXGL._SX522_.jpg",
      "https://m.media-amazon.com/images/I/81rBGvDALuL._SX522_.jpg",
      "https://m.media-amazon.com/images/I/71wZxZbhm5L._SX522_.jpg",
    ],
    hero_banners: [
      {
        bannerId: 1,
        bannerImg:
          "https://i.etsystatic.com/18909544/r/il/4d908c/7682769240/il_1588xN.7682769240_b8zb.jpg",
      },
    ],
   availableVariants: [
      // ===== 12 INCH SIZE - 3 COLOR VARIANTS =====
      {
        variantId: "WC-101-S-BRN",
        color: "Natural Brown",
        sku: "WC-101-S-BRN",
        price: 999,
        mrp: 1899,
        stock: 25,
        mainImage: "https://m.media-amazon.com/images/I/818njH7d3AL._SX522_.jpg",
        size: "20 X 14 inch",
        sizes: ["20 X 14 inch"],
        titleName: "Natural Brown - 20 X 14 inch"
      },
      {
        variantId: "WC-101-S-BLK",
        color: "Matte Black",
        sku: "WC-101-S-BLK",
        price: 1099,
        mrp: 1999,
        stock: 18,
        mainImage: "https://m.media-amazon.com/images/I/818njH7d3AL._SX522_.jpg",
        size: "12 inch",
        sizes: ["12 inch"],
        titleName: "Matte Black - 12 inch"
      },
      {
        variantId: "WC-101-S-WHT",
        color: "Ivory White",
        sku: "WC-101-S-WHT",
        price: 949,
        mrp: 1799,
        stock: 30,
        mainImage: "https://i.etsystatic.com/18909544/r/il/4d908c/7682769240/il_1588xN.7682769240_b8zb.jpg",
        size: "12 inch",
        sizes: ["12 inch"],
        titleName: "Ivory White - 12 inch"
      },

      // ===== 15 INCH SIZE - 4 COLOR VARIANTS =====
      {
        variantId: "WC-101-M-BRN",
        color: "Natural Brown",
        sku: "WC-101-M-BRN",
        price: 1299,
        mrp: 2499,
        stock: 22,
        mainImage: "https://images-eu.ssl-images-amazon.com/images/I/71VGxQvXZAL._AC_UL600_SR600,600_.jpg",
        sizes: ["15 inch"],
        titleName: "Natural Brown - 15 inch"
      },
      {
        variantId: "WC-101-M-BLK",
        color: "Matte Black",
        sku: "WC-101-M-BLK",
        price: 1399,
        mrp: 2699,
        stock: 15,
        mainImage: "https://i.etsystatic.com/18909544/r/il/4d908c/7682769240/il_1588xN.7682769240_b8zb.jpg",
        sizes: ["15 inch"],
        titleName: "Matte Black - 15 inch"
      },
      {
        variantId: "WC-101-M-GLD",
        color: "Antique Gold",
        sku: "WC-101-M-GLD",
        price: 1499,
        mrp: 2899,
        stock: 10,
        mainImage: "https://i.etsystatic.com/18909544/r/il/4d908c/7682769240/il_1588xN.7682769240_b8zb.jpg",
        sizes: ["15 inch"],
        titleName: "Antique Gold - 15 inch"
      },
      {
        variantId: "WC-101-M-COPPER",
        color: "Rustic Copper",
        sku: "WC-101-M-COPPER",
        price: 1449,
        mrp: 2799,
        stock: 8,
        mainImage: "https://images-eu.ssl-images-amazon.com/images/I/71VGxQvXZAL._AC_UL600_SR600,600_.jpg",
        sizes: ["15 inch"],
        titleName: "Rustic Copper - 15 inch"
      },

      // ===== 18 INCH SIZE - 5 COLOR VARIANTS (Updated) =====
      {
        variantId: "WC-101-L-BRN",
        color: "Natural Brown",
        sku: "WC-101-L-BRN",
        price: 1699,
        mrp: 3199,
        stock: 12,
        mainImage: "https://i.etsystatic.com/34705037/r/il/e6fbee/7524212685/il_1588xN.7524212685_971u.jpg",
        size: "18 inch",
        sizes: ["18 inch"],
        titleName: "Natural Brown - 18 inch"
      },
      {
        variantId: "WC-101-L-BLK",
        color: "Matte Black",
        sku: "WC-101-L-BLK",
        price: 1799,
        mrp: 3399,
        stock: 7,
        mainImage: "https://i.etsystatic.com/18909544/r/il/4d908c/7682769240/il_1588xN.7682769240_b8zb.jpg",
        size: "18 inch",
        sizes: ["18 inch"],
        titleName: "Matte Black - 18 inch"
      },
      {
        variantId: "WC-101-L-WHT",
        color: "Ivory White",
        sku: "WC-101-L-WHT",
        price: 1749,
        mrp: 3299,
        stock: 9,
        mainImage: "https://i.etsystatic.com/18909544/r/il/4d908c/7682769240/il_1588xN.7682769240_b8zb.jpg",
        size: "18 inch",
        sizes: ["18 inch"],
        titleName: "Ivory White - 18 inch"
      },
      {
        variantId: "WC-101-L-GLD",
        color: "Antique Gold",
        sku: "WC-101-L-GLD",
        price: 1899,
        mrp: 3599,
        stock: 6,
        mainImage: "https://i.etsystatic.com/34705037/r/il/e6fbee/7524212685/il_1588xN.7524212685_971u.jpg",
        size: "18 inch",
        sizes: ["18 inch"],
        titleName: "Antique Gold - 18 inch"
      },
      {
        variantId: "WC-101-L-COPPER",
        color: "Rustic Copper",
        sku: "WC-101-L-COPPER",
        price: 1849,
        mrp: 3499,
        stock: 5,
        mainImage: "https://i.etsystatic.com/18909544/r/il/4d908c/7682769240/il_1588xN.7682769240_b8zb.jpg",
        size: "18 inch",
        sizes: ["18 inch"],
        titleName: "Rustic Copper - 18 inch"
      }
    ],
    availabeCoupons: [
      {
        couponId: 2001,
        couponDescription: "15% off on wall clocks",
        discount: "15%",
        couponCode: "CLOCK15",
        minPurchase: 999,
      },
      {
        couponId: 2002,
        couponDescription: "Buy 2 Get 20% Off",
        discount: "20%",
        couponCode: "CLOCK20",
        minPurchase: 0,
      },
    ],
    productReviews: [
      {
        reviewId: "201",
        reviewerName: "Amit K.",
        rating: 5,
        description: "Beautiful rustic clock!",
        approved: true,
        location: "Delhi",
        time: "3 days ago",
        likes: 15,
        verified: true,
      },
    ],
    faqAns: { "Is it silent?": "Yes, it has silent sweep movement." },
    installationSteps: [
      {
        step: 1,
        title: "Choose Location",
        shortDescription: "Select wall location",
        stepImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
        shortNote: "Use level",
      },
    ],
    aboutItem: ["Rustic wooden finish", "Silent movement", "Easy to hang"],
    specifications: {
      material: "MDF Wood",
      movement: "Silent Quartz",
      battery: "1x AA",
    },
    isCustomizable: false,
    price: 1299,
    original: 2499,
    image: "https://i.pinimg.com/736x/b3/41/03/b34103909eaf77d68d8dae7d368cc28c.jpg",
    subcategory: "wall-clock",
    popular: 120,
    newest: 3,
    rating: 4.5,
    reviews: 234,
  },

  wallClock2: {
    productId: 102,
    productName: "Monaco Line Wall Clock - Industrial Style",
    brandName: "Artezo",
    currentSku: "WC-102-BLK-M",
    selectedColor: "Black",
    currentSellingPrice: 2499,
    currentMrpPrice: 4999,
    currentStock: 28,
    mainImage:
      "https://i.etsystatic.com/34705037/r/il/e6fbee/7524212685/il_1588xN.7524212685_971u.jpg",
    hero_banners: [
      {
        bannerId: 1,
        bannerImg:
          "https://i.etsystatic.com/34705037/r/il/e6fbee/7524212685/il_1588xN.7524212685_971u.jpg",
      },
    ],
    availableVariants: [
      {
        variantId: "WC-102-BLK",
        color: "Black",
        price: 2499,
        mrp: 4999,
        stock: 15,
        mainImage:
          "https://i.etsystatic.com/34705037/r/il/e6fbee/7524212685/il_1588xN.7524212685_971u.jpg",
        size: "12 inch",
        sizes: ["12 inch"],
      },
      {
        variantId: "WC-102-GLD",
        color: "Gold",
        price: 2699,
        mrp: 5399,
        stock: 8,
        mainImage:
          "https://i.etsystatic.com/34705037/r/il/e6fbee/7524212685/il_1588xN.7524212685_971u.jpg",
        size: "12 inch",
        sizes: ["12 inch"],
      },
    ],
    availabeCoupons: [
      {
        couponId: 2003,
        couponDescription: "10% off",
        discount: "10%",
        couponCode: "MONACO10",
        minPurchase: 0,
      },
    ],
    productReviews: [
      {
        reviewId: "202",
        reviewerName: "Rahul S.",
        rating: 4,
        description: "Stylish industrial look!",
        approved: true,
        location: "Mumbai",
        time: "1 week ago",
        likes: 12,
        verified: true,
      },
    ],
    faqAns: { "Is it metal?": "Yes, premium metal frame." },
    installationSteps: [
      {
        step: 1,
        title: "Mount",
        shortDescription: "Secure with screw",
        stepImage: "",
        shortNote: "Use wall anchor",
      },
    ],
    aboutItem: ["Industrial design", "Metal frame", "Large numbers"],
    specifications: { material: "Metal", style: "Industrial", size: "12 inch" },
    isCustomizable: false,
    price: 2499,
    original: 4999,
    image:
      "https://i.etsystatic.com/34705037/r/il/e6fbee/7524212685/il_1588xN.7524212685_971u.jpg",
    subcategory: "wall-clock",
    popular: 85,
    newest: 1,
    rating: 4.3,
    reviews: 156,
  },

  wallClock3: {
    productId: 103,
    productName: "Emerald Gold Geode Resin Wall Clock",
    brandName: "Artezo",
    currentSku: "WC-103-GLD-S",
    selectedColor: "Green/Gold",
    currentSellingPrice: 899,
    currentMrpPrice: 1799,
    currentStock: 67,
    mainImage:
      "https://i.etsystatic.com/32365247/r/il/38d2e1/7626635886/il_1588xN.7626635886_9ong.jpg",

    hero_banners: [
      {
        bannerId: 1,
        bannerImg:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
        imgDescription: "",
      },
      {
        bannerId: 2,
        bannerImg:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
        imgDescription: "test banner description",
      },
    ],

    availableVariants: [
      {
        variantId: "WC-103-GLD",
        color: "Emerald/Gold",
        price: 899,
        mrp: 1799,
        stock: 42,
        mainImage:
          "https://i.etsystatic.com/32365247/r/il/38d2e1/7626635886/il_1588xN.7626635886_9ong.jpg",
        size: "10 inch",
        sizes: ["10 inch"],
      },
      {
        variantId: "WC-103-RSD",
        color: "RoseGold",
        price: 900,
        mrp: 1659,
        stock: 24,
        mainImage:
          "https://i.etsystatic.com/32365247/r/il/38d2e1/7626635886/il_1588xN.7626635886_9ong.jpg",
        size: "10 inch",
        sizes: ["10 inch"],
      },

      {
        variantId: "WC-103-SLV",
        color: "Sapphire/Silver",
        price: 949,
        mrp: 1899,
        stock: 28,
        mainImage:
          "https://i.etsystatic.com/32365247/r/il/38d2e1/7626635886/il_1588xN.7626635886_9ong.jpg",
        size: "10 inch",
        sizes: ["10 inch"],
      },
    ],
    availabeCoupons: [
      {
        couponId: 2004,
        couponDescription: "Free Shipping",
        discount: "FREE SHIPPING",
        couponCode: "FREESHIP",
        minPurchase: 0,
      },
    ],
    productReviews: [
      {
        reviewId: "203",
        reviewerName: "Anjali K.",
        rating: 5,
        description: "Stunning resin art!",
        approved: true,
        location: "Bangalore",
        time: "3 days ago",
        likes: 28,
        verified: true,
      },
    ],
    faqAns: { "Is it handmade?": "Yes, each piece is unique." },
    installationSteps: [
      {
        step: 1,
        title: "Hang",
        shortDescription: "Use hanging hook",
        stepImage: "",
        shortNote: "Check level",
      },
    ],
    aboutItem: ["Resin art", "Unique design", "Silent mechanism"],
    specifications: { material: "Resin", style: "Modern Art", size: "10 inch" },
    isCustomizable: false,
    price: 899,
    original: 1799,
    image:
      "https://i.etsystatic.com/32365247/r/il/38d2e1/7626635886/il_1588xN.7626635886_9ong.jpg",
    subcategory: "wall-clock",
    popular: 210,
    newest: 5,
    rating: 4.8,
    reviews: 312,
  },

  // ========== PAINTINGS (IDs: 201-210) ==========
  painting1: {
    productId: 201,
    productName: "Mughal Floral Arch Print - Indian Wall Art",
    brandName: "Artezo",
    currentSku: "PT-201-BLU-L",
    selectedColor: "Blue",
    currentSellingPrice: 4299,
    currentMrpPrice: 8599,
    currentStock: 15,
    mainImage:
      "https://i.etsystatic.com/24426965/r/il/1a2154/7320284410/il_1588xN.7320284410_9gj3.jpg",
    hero_banners: [
      {
        bannerId: 1,
        bannerImg:
          "https://i.etsystatic.com/24426965/r/il/1a2154/7320284410/il_1588xN.7320284410_9gj3.jpg",
      },
    ],
    availableVariants: [
      {
        variantId: "PT-201-S",
        color: "Blue",
        price: 3299,
        mrp: 6599,
        stock: 12,
        mainImage:
          "https://i.etsystatic.com/24426965/r/il/1a2154/7320284410/il_1588xN.7320284410_9gj3.jpg",
        size: "18x24 inch",
        sizes: ["18x24", "24x36", "30x40"],
      },
      {
        variantId: "PT-201-M",
        color: "Blue",
        price: 4299,
        mrp: 8599,
        stock: 8,
        mainImage:
          "https://i.etsystatic.com/24426965/r/il/1a2154/7320284410/il_1588xN.7320284410_9gj3.jpg",
        size: "24x36 inch",
        sizes: ["18x24", "24x36", "30x40"],
      },
      {
        variantId: "PT-201-L",
        color: "Blue",
        price: 5599,
        mrp: 11199,
        stock: 5,
        mainImage:
          "https://i.etsystatic.com/24426965/r/il/1a2154/7320284410/il_1588xN.7320284410_9gj3.jpg",
        size: "30x40 inch",
        sizes: ["18x24", "24x36", "30x40"],
      },
    ],
    availabeCoupons: [
      {
        couponId: 3001,
        couponDescription: "20% off on paintings",
        discount: "20%",
        couponCode: "ART20",
        minPurchase: 5000,
      },
    ],
    productReviews: [
      {
        reviewId: "301",
        reviewerName: "Meera R.",
        rating: 5,
        description: "Beautiful artwork!",
        approved: true,
        location: "Mumbai",
        time: "1 week ago",
        likes: 34,
        verified: true,
      },
    ],
    faqAns: { "Is it framed?": "Frame available as add-on." },
    installationSteps: [
      {
        step: 1,
        title: "Hang",
        shortDescription: "Use picture hook",
        stepImage: "",
        shortNote: "Level properly",
      },
    ],
    aboutItem: ["Mughal art", "Premium canvas", "Fade resistant"],
    specifications: { material: "Canvas", style: "Mughal", print: "Giclee" },
    isCustomizable: true,
    price: 4299,
    original: 8599,
    image:
      "https://i.etsystatic.com/24426965/r/il/1a2154/7320284410/il_1588xN.7320284410_9gj3.jpg",
    subcategory: "paintings",
    popular: 210,
    newest: 9,
    rating: 4.8,
    reviews: 342,
    // Custom fields for this product
    customFields: [
      {
        fieldId: 1,
        fieldName: "frame color",
        fieldInputType: "select",
        fieldLabel: "Frame Color",
        options: ["Black", "White", "Gold", "Silver", "Natural Wood", "Walnut"],
        note: "Choose your preferred frame color",
        required: true,
        defaultValue: "Black",
      },
      {
        fieldId: 2,
        fieldName: "frame material",
        fieldInputType: "radio",
        fieldLabel: "Frame Material",
        options: ["Wood", "Metal", "Acrylic"],
        note: "Different materials have different durability",
        required: true,
        defaultValue: "Wood",
      },
      {
        fieldId: 3,
        fieldName: "glass type",
        fieldInputType: "radio",
        fieldLabel: "Glass Type",
        options: [
          "Normal Glass",
          "UV Protected Glass (+₹299)",
          "Non-Glare Glass (+₹199)",
        ],
        note: "UV Protected Glass prevents fading",
        required: true,
        defaultValue: "Normal Glass",
        priceMapping: {
          "Normal Glass": 0,
          "UV Protected Glass (+₹299)": 299,
          "Non-Glare Glass (+₹199)": 199,
        },
      },
      {
        fieldId: 4,
        fieldName: "mat board",
        fieldInputType: "checkbox",
        fieldLabel: "Add Mat Board",
        note: "Adds professional matting around artwork (+₹199)",
        price: 199,
        defaultValue: false,
      },
      {
        fieldId: 5,
        fieldName: "engraving text",
        fieldInputType: "textarea",
        fieldLabel: "Engraving Text",
        placeholder: "Enter text for engraving",
        note: "Maximum 100 characters. Additional ₹299",
        required: false,
        maxLength: 100,
        price: 299,
      },
      {
        fieldId: 6,
        fieldName: "delivery instructions",
        fieldInputType: "textarea",
        fieldLabel: "Special Instructions",
        placeholder: "Any special delivery instructions",
        note: "We'll do our best to accommodate",
        required: false,
        maxLength: 500,
      },
    ],
  },

  painting2: {
    productId: 202,
    productName: "Abstract Horse Oil Painting - Brown & Black",
    brandName: "Artezo",
    currentSku: "PT-202-BRN-M",
    selectedColor: "Brown/Black",
    currentSellingPrice: 3899,
    currentMrpPrice: 7799,
    currentStock: 22,
    mainImage:
      "https://i.etsystatic.com/24877167/r/il/7ef537/6088607241/il_1588xN.6088607241_blvw.jpg",
    hero_banners: [
      {
        bannerId: 1,
        bannerImg:
          "https://i.etsystatic.com/24877167/r/il/7ef537/6088607241/il_1588xN.6088607241_blvw.jpg",
      },
    ],
    availableVariants: [
      {
        variantId: "PT-202-M",
        color: "Brown/Black",
        price: 3899,
        mrp: 7799,
        stock: 15,
        mainImage:
          "https://i.etsystatic.com/24877167/r/il/7ef537/6088607241/il_1588xN.6088607241_blvw.jpg",
        size: "18x24 inch",
        sizes: ["18x24", "24x36"],
      },
      {
        variantId: "PT-202-L",
        color: "Brown/Black",
        price: 4999,
        mrp: 9999,
        stock: 10,
        mainImage:
          "https://i.etsystatic.com/24877167/r/il/7ef537/6088607241/il_1588xN.6088607241_blvw.jpg",
        size: "24x36 inch",
        sizes: ["18x24", "24x36"],
      },
    ],
    availabeCoupons: [
      {
        couponId: 3002,
        couponDescription: "15% off",
        discount: "15%",
        couponCode: "HORSE15",
        minPurchase: 3000,
      },
    ],
    productReviews: [
      {
        reviewId: "302",
        reviewerName: "Vikram S.",
        rating: 5,
        description: "Stunning horse painting!",
        approved: true,
        location: "Delhi",
        time: "5 days ago",
        likes: 22,
        verified: true,
      },
    ],
    faqAns: { "Is it oil painting?": "Yes, original oil painting." },
    installationSteps: [
      {
        step: 1,
        title: "Mount",
        shortDescription: "Secure on wall",
        stepImage: "",
        shortNote: "Use proper anchors",
      },
    ],
    aboutItem: ["Original oil painting", "Abstract style", "Ready to hang"],
    specifications: {
      material: "Oil on Canvas",
      style: "Abstract",
      size: "18x24 inch",
    },
    isCustomizable: true,
    price: 3899,
    original: 7799,
    image:
      "https://i.etsystatic.com/24877167/r/il/7ef537/6088607241/il_1588xN.6088607241_blvw.jpg",
    subcategory: "paintings",
    popular: 134,
    newest: 3,
    rating: 4.7,
    reviews: 267,
    customFields: [
      {
        fieldId: 1,
        fieldName: "frame color",
        fieldInputType: "select",
        fieldLabel: "Frame Color",
        options: ["Black", "White", "Gold", "Natural Wood"],
        note: "Choose your preferred frame color",
        required: true,
        defaultValue: "Black",
      },
      {
        fieldId: 2,
        fieldName: "frame material",
        fieldInputType: "radio",
        fieldLabel: "Frame Material",
        options: ["Wood", "Metal"],
        note: "Choose frame material",
        required: true,
        defaultValue: "Wood",
      },
      {
        fieldId: 3,
        fieldName: "engraving text",
        fieldInputType: "text",
        fieldLabel: "Personal Message",
        placeholder: "Enter your message",
        note: "Maximum 50 characters. Additional ₹299",
        required: false,
        maxLength: 50,
        price: 299,
      },
    ],
  },

  // ========== WALL SKETCHES (IDs: 301-305) ==========
  wallSketch1: {
    productId: 301,
    productName: "Abstract Charcoal Woman Portrait Sketch",
    brandName: "Artezo",
    currentSku: "WS-301-BLK-M",
    selectedColor: "Black/White",
    currentSellingPrice: 1599,
    currentMrpPrice: 3199,
    currentStock: 28,
    mainImage:
      "https://i.etsystatic.com/51859104/r/il/b9655d/6932475264/il_1588xN.6932475264_g6gf.jpg",
    hero_banners: [
      {
        bannerId: 1,
        bannerImg:
          "https://i.etsystatic.com/51859104/r/il/b9655d/6932475264/il_1588xN.6932475264_g6gf.jpg",
      },
    ],
    availableVariants: [
      {
        variantId: "WS-301-S",
        color: "Black/White",
        price: 1299,
        mrp: 2599,
        stock: 30,
        mainImage:
          "https://i.etsystatic.com/51859104/r/il/b9655d/6932475264/il_1588xN.6932475264_g6gf.jpg",
        size: "12x16 inch",
        sizes: ["12x16", "16x20", "20x24"],
      },
      {
        variantId: "WS-301-M",
        color: "Black/White",
        price: 1599,
        mrp: 3199,
        stock: 22,
        mainImage:
          "https://i.etsystatic.com/51859104/r/il/b9655d/6932475264/il_1588xN.6932475264_g6gf.jpg",
        size: "16x20 inch",
        sizes: ["12x16", "16x20", "20x24"],
      },
      {
        variantId: "WS-301-L",
        color: "Black/White",
        price: 1999,
        mrp: 3999,
        stock: 15,
        mainImage:
          "https://i.etsystatic.com/51859104/r/il/b9655d/6932475264/il_1588xN.6932475264_g6gf.jpg",
        size: "20x24 inch",
        sizes: ["12x16", "16x20", "20x24"],
      },
    ],
    availabeCoupons: [
      {
        couponId: 4001,
        couponDescription: "10% off sketches",
        discount: "10%",
        couponCode: "SKETCH10",
        minPurchase: 1000,
      },
    ],
    productReviews: [
      {
        reviewId: "401",
        reviewerName: "Neha G.",
        rating: 5,
        description: "Beautiful sketch work!",
        approved: true,
        location: "Pune",
        time: "2 days ago",
        likes: 18,
        verified: true,
      },
    ],
    faqAns: { "Is it original?": "Yes, original charcoal sketch." },
    installationSteps: [
      {
        step: 1,
        title: "Frame",
        shortDescription: "Place in frame",
        stepImage: "",
        shortNote: "Use acid-free mat",
      },
    ],
    aboutItem: ["Charcoal sketch", "Emotional portrait", "Gallery quality"],
    specifications: {
      material: "Charcoal on Paper",
      style: "Portrait",
      size: "16x20 inch",
    },
    isCustomizable: true,
    price: 1599,
    original: 3199,
    image:
      "https://i.etsystatic.com/51859104/r/il/b9655d/6932475264/il_1588xN.6932475264_g6gf.jpg",
    subcategory: "wall-sketch",
    popular: 70,
    newest: 3,
    rating: 4.5,
    reviews: 89,
    customFields: [
      {
        fieldId: 1,
        fieldName: "frame color",
        fieldInputType: "select",
        fieldLabel: "Frame Color",
        options: ["Black", "White", "Natural Wood"],
        note: "Choose frame color",
        required: true,
        defaultValue: "Black",
      },
      {
        fieldId: 2,
        fieldName: "mat board",
        fieldInputType: "checkbox",
        fieldLabel: "Add Mat Board",
        note: "Adds professional matting (+₹149)",
        price: 149,
        defaultValue: false,
      },
      {
        fieldId: 3,
        fieldName: "paper type",
        fieldInputType: "select",
        fieldLabel: "Paper Type",
        options: ["Premium Matte", "Textured", "Glossy"],
        note: "Choose paper finish",
        required: true,
        defaultValue: "Premium Matte",
      },
    ],
  },

  // ========== JHAROKAS (IDs: 401-405) ==========
  jharoka1: {
    productId: 401,
    productName: "Hand-Carved Wooden Jharokha Window Frame",
    brandName: "Artezo",
    currentSku: "JH-401-WD-M",
    selectedColor: "Brown",
    currentSellingPrice: 12499,
    currentMrpPrice: 24999,
    currentStock: 12,
    mainImage:
      "https://i.etsystatic.com/48701049/r/il/3bd6b1/7450079728/il_1588xN.7450079728_91hd.jpg",
    hero_banners: [
      {
        bannerId: 1,
        bannerImg:
          "https://i.etsystatic.com/48701049/r/il/3bd6b1/7450079728/il_1588xN.7450079728_91hd.jpg",
      },
    ],
    availableVariants: [
      {
        variantId: "JH-401-S",
        color: "Brown",
        price: 8999,
        mrp: 17999,
        stock: 8,
        mainImage:
          "https://i.etsystatic.com/48701049/r/il/3bd6b1/7450079728/il_1588xN.7450079728_91hd.jpg",
        size: "18x24 inch",
        sizes: ["18x24", "24x36", "30x42"],
      },
      {
        variantId: "JH-401-M",
        color: "Brown",
        price: 12499,
        mrp: 24999,
        stock: 5,
        mainImage:
          "https://i.etsystatic.com/48701049/r/il/3bd6b1/7450079728/il_1588xN.7450079728_91hd.jpg",
        size: "24x36 inch",
        sizes: ["18x24", "24x36", "30x42"],
      },
      {
        variantId: "JH-401-L",
        color: "Brown",
        price: 16999,
        mrp: 33999,
        stock: 3,
        mainImage:
          "https://i.etsystatic.com/48701049/r/il/3bd6b1/7450079728/il_1588xN.7450079728_91hd.jpg",
        size: "30x42 inch",
        sizes: ["18x24", "24x36", "30x42"],
      },
    ],
    availabeCoupons: [
      {
        couponId: 5001,
        couponDescription: "Free Installation",
        discount: "FREE INSTALL",
        couponCode: "FREEINSTALL",
        minPurchase: 10000,
      },
    ],
    productReviews: [
      {
        reviewId: "501",
        reviewerName: "Rajesh K.",
        rating: 5,
        description: "Exquisite craftsmanship!",
        approved: true,
        location: "Jaipur",
        time: "2 weeks ago",
        likes: 45,
        verified: true,
      },
    ],
    faqAns: { "Is it solid wood?": "Yes, solid Sheesham wood." },
    installationSteps: [
      {
        step: 1,
        title: "Mount",
        shortDescription: "Secure to wall",
        stepImage: "",
        shortNote: "Requires professional installation",
      },
    ],
    aboutItem: ["Hand-carved", "Traditional design", "Solid wood"],
    specifications: {
      material: "Sheesham Wood",
      style: "Traditional",
      finish: "Antique",
    },
    isCustomizable: false,
    price: 12499,
    original: 24999,
    image:
      "https://i.etsystatic.com/48701049/r/il/3bd6b1/7450079728/il_1588xN.7450079728_91hd.jpg",
    subcategory: "jharokas",
    popular: 60,
    newest: 2,
    rating: 4.8,
    reviews: 89,
  },

  // ========== METAL WALL HANGINGS (IDs: 501-505) ==========
  metalHanging1: {
    productId: 501,
    productName: "Goldfern Metal Wall Accent - Leaf Design",
    brandName: "Artezo",
    currentSku: "MWH-501-BLK-L",
    selectedColor: "Black/Gold",
    currentSellingPrice: 3499,
    currentMrpPrice: 6999,
    currentStock: 23,
    mainImage:
      "https://cdn.shopify.com/s/files/1/0632/2526/6422/files/9100000045771_6.jpg?v=1771489110&width=4320",
    hero_banners: [
      {
        bannerId: 1,
        bannerImg:
          "https://cdn.shopify.com/s/files/1/0632/2526/6422/files/9100000045771_6.jpg?v=1771489110&width=4320",
      },
    ],
    availableVariants: [
      {
        variantId: "MWH-501-BLK",
        color: "Black/Gold",
        price: 3499,
        mrp: 6999,
        stock: 20,
        mainImage:
          "https://cdn.shopify.com/s/files/1/0632/2526/6422/files/9100000045771_6.jpg?v=1771489110&width=4320",
        size: "24 inch",
        sizes: ["24 inch"],
      },
      {
        variantId: "MWH-501-CPR",
        color: "Copper",
        price: 3699,
        mrp: 7399,
        stock: 15,
        mainImage:
          "https://cdn.shopify.com/s/files/1/0632/2526/6422/files/9100000045771_6.jpg?v=1771489110&width=4320",
        size: "24 inch",
        sizes: ["24 inch"],
      },
    ],
    availabeCoupons: [
      {
        couponId: 6001,
        couponDescription: "15% off metal art",
        discount: "15%",
        couponCode: "METAL15",
        minPurchase: 3000,
      },
    ],
    productReviews: [
      {
        reviewId: "601",
        reviewerName: "Sneha P.",
        rating: 4,
        description: "Beautiful wall art!",
        approved: true,
        location: "Mumbai",
        time: "1 week ago",
        likes: 12,
        verified: true,
      },
    ],
    faqAns: { "Is it rust-proof?": "Yes, powder coated." },
    installationSteps: [
      {
        step: 1,
        title: "Hang",
        shortDescription: "Use nail or screw",
        stepImage: "",
        shortNote: "Check weight capacity",
      },
    ],
    aboutItem: ["Metal leaf design", "Modern look", "Easy to hang"],
    specifications: {
      material: "Iron",
      style: "Modern",
      finish: "Powder coated",
    },
    isCustomizable: false,
    price: 3499,
    original: 6999,
    image:
      "https://cdn.shopify.com/s/files/1/0632/2526/6422/files/9100000045771_6.jpg?v=1771489110&width=4320",
    subcategory: "metal-wall-hangings",
    popular: 89,
    newest: 4,
    rating: 4.5,
    reviews: 145,
  },

  // ========== WALLPAPERS (IDs: 601-605) ==========
  wallpaper1: {
    productId: 601,
    productName: "Floral Bird Wallpaper - Tropical Paradise",
    brandName: "Artezo",
    currentSku: "WP-601-PNK-R",
    selectedColor: "Pink/Green",
    currentSellingPrice: 2999,
    currentMrpPrice: 5999,
    currentStock: 45,
    mainImage:
      "https://www.kalakaarihaath.com/cdn/shop/files/TheRoyalApprentice_aqua_2.jpg?v=1768403784&width=1280",
    hero_banners: [
      {
        bannerId: 1,
        bannerImg:
          "https://www.kalakaarihaath.com/cdn/shop/files/TheRoyalApprentice_aqua_2.jpg?v=1768403784&width=1280",
      },
    ],
    availableVariants: [
      {
        variantId: "WP-601-PNK",
        color: "Pink/Green",
        price: 2999,
        mrp: 5999,
        stock: 45,
        mainImage:
          "https://www.kalakaarihaath.com/cdn/shop/files/TheRoyalApprentice_aqua_2.jpg?v=1768403784&width=1280",
        size: "Roll (10m)",
        sizes: ["Roll"],
      },
      {
        variantId: "WP-601-BLU",
        color: "Blue/Gold",
        price: 3199,
        mrp: 6399,
        stock: 38,
        mainImage:
          "https://www.kalakaarihaath.com/cdn/shop/files/TheRoyalApprentice_aqua_2.jpg?v=1768403784&width=1280",
        size: "Roll (10m)",
        sizes: ["Roll"],
      },
    ],
    availabeCoupons: [
      {
        couponId: 7001,
        couponDescription: "Free installation tools",
        discount: "FREE TOOLS",
        couponCode: "WALLTOOLS",
        minPurchase: 5000,
      },
    ],
    productReviews: [
      {
        reviewId: "701",
        reviewerName: "Priya M.",
        rating: 5,
        description: "Beautiful wallpaper!",
        approved: true,
        location: "Chennai",
        time: "4 days ago",
        likes: 23,
        verified: true,
      },
    ],
    faqAns: { "Is it removable?": "Yes, peel and stick." },
    installationSteps: [
      {
        step: 1,
        title: "Prepare Wall",
        shortDescription: "Clean surface",
        stepImage: "",
        shortNote: "Smooth wall needed",
      },
    ],
    aboutItem: ["Floral pattern", "Peel and stick", "Washable"],
    specifications: {
      material: "Vinyl",
      style: "Floral",
      application: "Peel and stick",
    },
    isCustomizable: false,
    price: 2999,
    original: 5999,
    image:
      "https://www.kalakaarihaath.com/cdn/shop/files/TheRoyalApprentice_aqua_2.jpg?v=1768403784&width=1280",
    subcategory: "wallpapers",
    popular: 156,
    newest: 7,
    rating: 4.6,
    reviews: 312,
  },

  // ========== BRASS WALL HANGINGS (IDs: 901-905) ==========
  brassHanging1: {
    productId: 901,
    productName: "Brass Temple Bells - Set of 7",
    brandName: "Artezo",
    currentSku: "BWH-901-BRS-S7",
    selectedColor: "Gold",
    currentSellingPrice: 4499,
    currentMrpPrice: 8999,
    currentStock: 15,
    mainImage:
      "https://images.pexels.com/photos/10295343/pexels-photo-10295343.jpeg?w=400",
    hero_banners: [
      {
        bannerId: 1,
        bannerImg:
          "https://images.pexels.com/photos/10295343/pexels-photo-10295343.jpeg?w=400",
      },
    ],
    availableVariants: [
      {
        variantId: "BWH-901-S7",
        color: "Gold",
        price: 4499,
        mrp: 8999,
        stock: 15,
        mainImage:
          "https://images.pexels.com/photos/10295343/pexels-photo-10295343.jpeg?w=400",
        size: "Set of 7",
        sizes: ["Set of 7"],
      },
      {
        variantId: "BWH-901-S5",
        color: "Gold",
        price: 3299,
        mrp: 6599,
        stock: 22,
        mainImage:
          "https://images.pexels.com/photos/10295343/pexels-photo-10295343.jpeg?w=400",
        size: "Set of 5",
        sizes: ["Set of 5"],
      },
    ],
    availabeCoupons: [
      {
        couponId: 8001,
        couponDescription: "10% off brass items",
        discount: "10%",
        couponCode: "BRASS10",
        minPurchase: 3000,
      },
    ],
    productReviews: [
      {
        reviewId: "801",
        reviewerName: "Arjun N.",
        rating: 5,
        description: "Beautiful brass bells!",
        approved: true,
        location: "Hyderabad",
        time: "1 week ago",
        likes: 31,
        verified: true,
      },
    ],
    faqAns: { "Does it produce sound?": "Yes, melodious sound." },
    installationSteps: [
      {
        step: 1,
        title: "Hang",
        shortDescription: "Mount on wall",
        stepImage: "",
        shortNote: "Use strong hook",
      },
    ],
    aboutItem: ["Pure brass", "Traditional design", "Melodious sound"],
    specifications: { material: "Brass", style: "Traditional", set: "7 bells" },
    isCustomizable: false,
    price: 4499,
    original: 8999,
    image:
      "https://images.pexels.com/photos/10295343/pexels-photo-10295343.jpeg?w=400",
    subcategory: "brass-wall-hangings",
    popular: 178,
    newest: 3,
    rating: 4.7,
    reviews: 234,
  },

  // ========== NAMEPLATES (IDs: 1001-1005) ==========
  nameplate1: {
    productId: 1001,
    productName: "Personalized Brass Nameplate - Handcrafted",
    brandName: "Artezo",
    currentSku: "NP-1001-BRS-M",
    selectedColor: "Gold",
    currentSellingPrice: 1499,
    currentMrpPrice: 2999,
    currentStock: 35,
    mainImage:
      "https://housenama.com/cdn/shop/files/veli-red-2.jpg?v=1766609828&width=1100",
    hero_banners: [
      {
        bannerId: 1,
        bannerImg:
          "https://housenama.com/cdn/shop/files/veli-red-2.jpg?v=1766609828&width=1100",
      },
    ],
    availableVariants: [
      {
        variantId: "NP-1001-S",
        color: "Gold",
        price: 999,
        mrp: 1999,
        stock: 35,
        mainImage:
          "https://housenama.com/cdn/shop/files/veli-red-2.jpg?v=1766609828&width=1100",
        size: "6x2 inch",
        sizes: ["6x2", "8x3", "10x4"],
      },
      {
        variantId: "NP-1001-M",
        color: "Gold",
        price: 1499,
        mrp: 2999,
        stock: 28,
        mainImage:
          "https://housenama.com/cdn/shop/files/veli-red-2.jpg?v=1766609828&width=1100",
        size: "8x3 inch",
        sizes: ["6x2", "8x3", "10x4"],
      },
      {
        variantId: "NP-1001-L",
        color: "Gold",
        price: 1999,
        mrp: 3999,
        stock: 20,
        mainImage:
          "https://housenama.com/cdn/shop/files/veli-red-2.jpg?v=1766609828&width=1100",
        size: "10x4 inch",
        sizes: ["6x2", "8x3", "10x4"],
      },
    ],
    availabeCoupons: [
      {
        couponId: 9001,
        couponDescription: "Personalization free",
        discount: "FREE ENGRAVING",
        couponCode: "ENGRAVE",
        minPurchase: 1500,
      },
    ],
    productReviews: [
      {
        reviewId: "901",
        reviewerName: "Kavita S.",
        rating: 5,
        description: "Beautiful nameplate!",
        approved: true,
        location: "Delhi",
        time: "3 days ago",
        likes: 42,
        verified: true,
      },
    ],
    faqAns: { "Can I customize text?": "Yes, fully customizable." },
    installationSteps: [
      {
        step: 1,
        title: "Mount",
        shortDescription: "Stick or screw",
        stepImage: "",
        shortNote: "Clean surface first",
      },
    ],
    aboutItem: ["Solid brass", "Handcrafted", "Personalized"],
    specifications: { material: "Brass", finish: "Antique", size: "8x3 inch" },
    isCustomizable: true,
    price: 1499,
    original: 2999,
    image:
      "https://housenama.com/cdn/shop/files/veli-red-2.jpg?v=1766609828&width=1100",
    subcategory: "nameplates",
    popular: 145,
    newest: 5,
    rating: 4.8,
    reviews: 567,
    customFields: [
      {
        fieldId: 1,
        fieldName: "name text",
        fieldInputType: "text",
        fieldLabel: "Name to Engrave",
        placeholder: "Enter family name / house name",
        note: "This will be engraved on the nameplate",
        required: true,
        maxLength: 30,
      },
      {
        fieldId: 2,
        fieldName: "font style",
        fieldInputType: "select",
        fieldLabel: "Font Style",
        options: [
          "Elegant Script",
          "Modern Sans",
          "Classic Serif",
          "Bold Modern",
          "Handwritten",
          "Vintage",
        ],
        note: "Choose the font for your nameplate",
        required: true,
        defaultValue: "Elegant Script",
      },
      {
        fieldId: 3,
        fieldName: "finish type",
        fieldInputType: "radio",
        fieldLabel: "Finish",
        options: ["Matte", "Glossy", "Antique", "Brushed", "Polished"],
        note: "Different finishes create different looks",
        required: true,
        defaultValue: "Antique",
      },
      {
        fieldId: 4,
        fieldName: "add icon",
        fieldInputType: "checkbox",
        fieldLabel: "Add Decorative Icon",
        note: "Adds a decorative symbol (+₹99)",
        price: 99,
        defaultValue: false,
      },
      {
        fieldId: 5,
        fieldName: "icon type",
        fieldInputType: "select",
        fieldLabel: "Icon Type",
        options: [
          "❤️ Heart",
          "✨ Star",
          "⭐ Om",
          "🏠 Home",
          "🌿 Leaf",
          "🎨 Lotus",
          "🕉️ Aum",
        ],
        note: "Choose an icon to enhance your nameplate",
        required: false,
        dependsOn: "add icon",
        defaultValue: "🏠 Home",
      },
    ],
  },

  // ========== ADDITIONAL DUMMY PRODUCTS (IDs: 1101-1105) ==========
  decorativeMirror1: {
    productId: 1101,
    productName: "Antique Gold Round Decorative Mirror",
    brandName: "Artezo",
    currentSku: "DM-1101-GLD",
    selectedColor: "Gold",
    currentSellingPrice: 3999,
    currentMrpPrice: 7999,
    currentStock: 18,
    mainImage:
      "https://images.pexels.com/photos/509922/pexels-photo-509922.jpeg?w=400",
    hero_banners: [
      {
        bannerId: 1,
        bannerImg:
          "https://images.pexels.com/photos/509922/pexels-photo-509922.jpeg?w=400",
      },
    ],
    availableVariants: [
      {
        variantId: "DM-1101-S",
        color: "Gold",
        price: 3999,
        mrp: 7999,
        stock: 18,
        mainImage:
          "https://images.pexels.com/photos/509922/pexels-photo-509922.jpeg?w=400",
        size: "24 inch",
        sizes: ["24 inch", "30 inch"],
      },
      {
        variantId: "DM-1101-L",
        color: "Gold",
        price: 5999,
        mrp: 11999,
        stock: 12,
        mainImage:
          "https://images.pexels.com/photos/509922/pexels-photo-509922.jpeg?w=400",
        size: "30 inch",
        sizes: ["24 inch", "30 inch"],
      },
    ],
    availabeCoupons: [
      {
        couponId: 11001,
        couponDescription: "10% off mirrors",
        discount: "10%",
        couponCode: "MIRROR10",
        minPurchase: 3000,
      },
    ],
    productReviews: [
      {
        reviewId: "1101",
        reviewerName: "Anita D.",
        rating: 5,
        description: "Stunning mirror!",
        approved: true,
        location: "Mumbai",
        time: "1 week ago",
        likes: 28,
        verified: true,
      },
    ],
    faqAns: { "Is it glass?": "Yes, high-quality glass." },
    installationSteps: [
      {
        step: 1,
        title: "Mount",
        shortDescription: "Secure with screw",
        stepImage: "",
        shortNote: "Use wall anchor",
      },
    ],
    aboutItem: ["Antique gold finish", "Round shape", "High-quality glass"],
    specifications: {
      material: "Glass & Metal",
      style: "Antique",
      size: "24 inch",
    },
    isCustomizable: false,
    price: 3999,
    original: 7999,
    image:
      "https://images.pexels.com/photos/509922/pexels-photo-509922.jpeg?w=400",
    subcategory: "mirrors",
    popular: 95,
    newest: 4,
    rating: 4.7,
    reviews: 134,
  },

  floatingShelf1: {
    productId: 1102,
    productName: "Floating Wall Shelf - Rustic Wood",
    brandName: "Artezo",
    currentSku: "FS-1102-WD",
    selectedColor: "Brown",
    currentSellingPrice: 1899,
    currentMrpPrice: 3799,
    currentStock: 32,
    mainImage:
      "https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?w=400",
    hero_banners: [
      {
        bannerId: 1,
        bannerImg:
          "https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?w=400",
      },
    ],
    availableVariants: [
      {
        variantId: "FS-1102-S",
        color: "Brown",
        price: 1899,
        mrp: 3799,
        stock: 32,
        mainImage:
          "https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?w=400",
        size: "24 inch",
        sizes: ["24 inch", "36 inch", "48 inch"],
      },
      {
        variantId: "FS-1102-M",
        color: "Brown",
        price: 2799,
        mrp: 5599,
        stock: 25,
        mainImage:
          "https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?w=400",
        size: "36 inch",
        sizes: ["24 inch", "36 inch", "48 inch"],
      },
      {
        variantId: "FS-1102-L",
        color: "Brown",
        price: 3699,
        mrp: 7399,
        stock: 18,
        mainImage:
          "https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?w=400",
        size: "48 inch",
        sizes: ["24 inch", "36 inch", "48 inch"],
      },
    ],
    availabeCoupons: [
      {
        couponId: 11002,
        couponDescription: "Free mounting hardware",
        discount: "FREE HARDWARE",
        couponCode: "SHELF",
        minPurchase: 2000,
      },
    ],
    productReviews: [
      {
        reviewId: "1102",
        reviewerName: "Rohit S.",
        rating: 5,
        description: "Sturdy and beautiful!",
        approved: true,
        location: "Bangalore",
        time: "5 days ago",
        likes: 19,
        verified: true,
      },
    ],
    faqAns: { "Weight capacity?": "Up to 20 kg." },
    installationSteps: [
      {
        step: 1,
        title: "Mount",
        shortDescription: "Install brackets",
        stepImage: "",
        shortNote: "Use level",
      },
    ],
    aboutItem: ["Solid wood", "Floating design", "Easy install"],
    specifications: {
      material: "Solid Wood",
      style: "Rustic",
      weight_capacity: "20 kg",
    },
    isCustomizable: false,
    price: 1899,
    original: 3799,
    image:
      "https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?w=400",
    subcategory: "shelves",
    popular: 112,
    newest: 6,
    rating: 4.6,
    reviews: 189,
  },

  macrameHanging1: {
    productId: 1103,
    productName: "Macrame Wall Hanging - Bohemian Design",
    brandName: "Artezo",
    currentSku: "MH-1103-CRM",
    selectedColor: "Cream",
    currentSellingPrice: 2499,
    currentMrpPrice: 4999,
    currentStock: 42,
    mainImage:
      "https://images.pexels.com/photos/3636484/pexels-photo-3636484.jpeg?w=400",
    hero_banners: [
      {
        bannerId: 1,
        bannerImg:
          "https://images.pexels.com/photos/3636484/pexels-photo-3636484.jpeg?w=400",
      },
    ],
    availableVariants: [
      {
        variantId: "MH-1103-S",
        color: "Cream",
        price: 2499,
        mrp: 4999,
        stock: 42,
        mainImage:
          "https://images.pexels.com/photos/3636484/pexels-photo-3636484.jpeg?w=400",
        size: "24 inch",
        sizes: ["24 inch", "36 inch"],
      },
      {
        variantId: "MH-1103-L",
        color: "Cream",
        price: 3499,
        mrp: 6999,
        stock: 28,
        mainImage:
          "https://images.pexels.com/photos/3636484/pexels-photo-3636484.jpeg?w=400",
        size: "36 inch",
        sizes: ["24 inch", "36 inch"],
      },
    ],
    availabeCoupons: [
      {
        couponId: 11003,
        couponDescription: "15% off boho decor",
        discount: "15%",
        couponCode: "BOHO15",
        minPurchase: 2000,
      },
    ],
    productReviews: [
      {
        reviewId: "1103",
        reviewerName: "Meera R.",
        rating: 5,
        description: "Beautiful boho piece!",
        approved: true,
        location: "Pune",
        time: "2 weeks ago",
        likes: 34,
        verified: true,
      },
    ],
    faqAns: { "Is it handmade?": "Yes, handcrafted." },
    installationSteps: [
      {
        step: 1,
        title: "Hang",
        shortDescription: "Mount on hook",
        stepImage: "",
        shortNote: "Use sturdy hook",
      },
    ],
    aboutItem: ["Handmade macrame", "Boho style", "Cotton cord"],
    specifications: {
      material: "Cotton",
      style: "Bohemian",
      size: "24x36 inch",
    },
    isCustomizable: false,
    price: 2499,
    original: 4999,
    image:
      "https://images.pexels.com/photos/3636484/pexels-photo-3636484.jpeg?w=400",
    subcategory: "macrame",
    popular: 167,
    newest: 2,
    rating: 4.9,
    reviews: 278,
  },
};

// ========== GET ALL PRODUCTS ==========
ProductDatabase.getAllProducts = function () {
  const all = [];

  // Add all products
  const productIds = [
    this.mainProduct,
    this.wallClock1,
    this.wallClock2,
    this.wallClock3,
    this.painting1,
    this.painting2,
    this.wallSketch1,
    this.jharoka1,
    this.metalHanging1,
    this.wallpaper1,
    this.brassHanging1,
    this.nameplate1,
    this.decorativeMirror1,
    this.floatingShelf1,
    this.macrameHanging1,
  ];

  productIds.forEach((product) => {
    if (product) {
      all.push({
        id: product.productId,
        name: product.productName,
        price: product.currentSellingPrice,
        original: product.currentMrpPrice,
        material: product.specifications?.material || "Various",
        color: product.selectedColor,
        size: product.availableVariants?.[0]?.size || "Standard",
        sizes: product.availableVariants?.[0]?.sizes || ["Standard"],
        image: product.mainImage,
        subcategory: product.subcategory,
        isCustomizable: product.isCustomizable || false,
        popular: product.popular || 100,
        newest: product.newest || 5,
        rating: product.rating || 4.5,
        reviews: product.reviews || 100,
        sku: product.currentSku,
        stock: product.currentStock,
        customFields: product.customFields || [],
      });
    }
  });

  return all;
};

// ========== HELPER FUNCTIONS ==========
ProductDatabase.getProductById = function (id) {
  // Map of product IDs to product objects
  const productMap = {
    5055: this.mainProduct,
    101: this.wallClock1,
    102: this.wallClock2,
    103: this.wallClock3,
    201: this.painting1,
    202: this.painting2,
    301: this.wallSketch1,
    401: this.jharoka1,
    501: this.metalHanging1,
    601: this.wallpaper1,
    901: this.brassHanging1,
    1001: this.nameplate1,
    1101: this.decorativeMirror1,
    1102: this.floatingShelf1,
    1103: this.macrameHanging1,
  };

  const product = productMap[id];
  if (product) {
    console.log("[ProductDatabase] Found product for ID:", id, product);
    return product;
  }

  console.warn("[ProductDatabase] Product not found for ID:", id);
  return null;
};

ProductDatabase.getProductDetails = function (id) {
  return this.getProductById(id);
};

ProductDatabase.isProductCustomizable = function (id) {
  const product = this.getProductById(id);
  return product ? product.isCustomizable === true : false;
};

ProductDatabase.getCustomizationOptions = function (id) {
  const product = this.getProductById(id);
  return product && product.customizationOptions
    ? product.customizationOptions
    : null;
};

ProductDatabase.getCustomFields = function (id) {
  const product = this.getProductById(id);
  return product && product.customFields ? product.customFields : [];
};

ProductDatabase.getProductsBySubcategory = function (subcategoryId) {
  const allProducts = this.getAllProducts();
  return allProducts.filter((p) => p.subcategory === subcategoryId);
};

ProductDatabase.getSimilarProducts = function (productId, limit = 4) {
  const currentProduct = this.getProductById(productId);
  if (!currentProduct) return [];

  const allProducts = this.getAllProducts();
  const similar = allProducts.filter(
    (p) => p.id !== productId && p.subcategory === currentProduct.subcategory,
  );

  return similar.slice(0, limit);
};

ProductDatabase.getProductVariants = function (productId) {
  const product = this.getProductById(productId);
  if (product && product.availableVariants) {
    return product.availableVariants;
  }
  return [];
};

ProductDatabase.getProductCoupons = function (productId) {
  const product = this.getProductById(productId);
  if (product && product.availabeCoupons) {
    return product.availabeCoupons;
  }
  return [];
};

// ========== GLOBAL EXPORTS ==========
if (typeof window !== "undefined") {
  window.ProductDatabase = ProductDatabase;
  window.allProducts = ProductDatabase.getAllProducts();
  window.artezoproducts = ProductDatabase.getAllProducts();

  if (window.dispatchEvent) {
    window.dispatchEvent(
      new CustomEvent("artezoproductsready", {
        detail: {
          products: window.allProducts,
          count: window.allProducts.length,
        },
      }),
    );
  }

  console.log("[ProductDatabase] Loaded successfully!");
  console.log("[ProductDatabase] Total products:", window.allProducts.length);
  console.log(
    "[ProductDatabase] Customizable products:",
    Object.values(ProductDatabase).filter((p) => p.isCustomizable === true)
      .length,
  );
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = ProductDatabase;
}
