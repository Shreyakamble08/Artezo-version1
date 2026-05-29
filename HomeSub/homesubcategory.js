// ========== FIXED homesubcategory.js - Using Global Service ==========

(function () {
  // ========== IMPORT PRODUCTS FROM CENTRAL DATABASE ==========
  let allProducts = [];
  let cartService = null;
  let currentCustomizingProduct = null;
  let currentCustomizationSelections = {};

  // Wait for ProductDatabase to be available
  function loadProducts() {
    if (typeof window.ProductDatabase !== "undefined") {
      allProducts = window.ProductDatabase.getAllProducts();
      console.log(
        "[HomeSubcategory] Products loaded from ProductDatabase:",
        allProducts.length,
      );

      // Wait for cart service
      waitForCartService();
    } else {
      console.log("[HomeSubcategory] Waiting for ProductDatabase...");
      setTimeout(loadProducts, 100);
    }
  }

  // Wait for cart service
  function waitForCartService(maxAttempts = 20) {
    let attempts = 0;
    function check() {
      if (window.getCartWishlistService) {
        cartService = window.getCartWishlistService();
        console.log("[HomeSubcategory] Cart service found");
        initPage();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(check, 100);
      } else {
        console.warn(
          "[HomeSubcategory] Cart service not available, using fallback",
        );
        initPage();
      }
    }
    check();
  }

  // ========== SUBCATEGORY CONFIGURATION ==========
  const subcategories = [
    {
      id: "wall-clock",
      name: "Wall Clock",
      icon: "far fa-clock",
      desc: "Timeless elegance for your walls – discover our curated collection of handcrafted clocks.",
    },
    {
      id: "paintings",
      name: "Paintings",
      icon: "fas fa-palette",
      desc: "Expressive artworks to bring color and emotion into your space.",
    },
    {
      id: "wall-sketch",
      name: "Wall Sketch",
      icon: "fas fa-pencil-alt",
      desc: "Minimalist sketches that add character and depth to any room.",
    },
    {
      id: "jharokas",
      name: "Jharokas",
      icon: "fas fa-archway",
      desc: "Traditional arched windows – intricate craftsmanship with a royal touch.",
    },
    {
      id: "metal-wall-hangings",
      name: "Metal Wall Hangings",
      icon: "fas fa-cog",
      desc: "Contemporary metal art pieces that add industrial charm to your walls.",
    },
    {
      id: "wallpapers",
      name: "Wallpapers",
      icon: "fas fa-paint-roller",
      desc: "Transform your space with stunning patterns and textures.",
    },
    {
      id: "handmade-paintings",
      name: "Handmade Paintings",
      icon: "fas fa-brush",
      desc: "Unique, original artworks crafted by skilled artists.",
    },
    {
      id: "digital-canvas-prints",
      name: "Digital Canvas Prints",
      icon: "fas fa-print",
      desc: "Modern digital art printed on premium canvas.",
    },
    {
      id: "brass-wall-hangings",
      name: "Brass Wall Hangings",
      icon: "fas fa-medal",
      desc: "Elegant brass decor pieces with traditional appeal.",
    },
  ];

  // Get subcategory from URL
  const urlParams = new URLSearchParams(window.location.search);
  let currentSub = urlParams.get("sub") || "wall-clock";

  // State management (only for UI filters, not cart/wishlist data)
  let activeFilters = {
    material: null,
    style: null,
    color: null,
    size: null,
    shape: null,
    setPieces: null,
    priceRange: null,
  };
  let sortOption = "default";

  // DOM elements
  const grid = document.getElementById("productGrid");
  const skeleton = document.getElementById("skeletonGrid");
  const emptyState = document.getElementById("emptyState");
  const emptyReset = document.getElementById("emptyResetBtn");
  const desktopFilterDiv = document.getElementById("desktopFilterContainer");
  const mobileFilterContent = document.getElementById("mobileFilterContent");
  const mobileToggle = document.getElementById("mobileFilterToggle");
  const mobileDrawer = document.getElementById("mobileFilterDrawer");
  const closeMobile = document.getElementById("closeMobileFilter");
  const mobileApply = document.getElementById("mobileApplyFilters");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");
  const applyFiltersBtn = document.getElementById("applyFiltersBtn");
  const sortSelect = document.getElementById("sortSelect");
  const productCountSpan = document.getElementById("productCount");
  const toast = document.getElementById("toast");
  const tabsContainer = document.getElementById("subcategoryTabs");

  // ========== GET CURRENT WISHLIST FROM GLOBAL SERVICE ==========
  function getCurrentWishlist() {
    return cartService ? cartService.getWishlistItems() : [];
  }

  // ========== CHECK IF PRODUCT IS IN WISHLIST ==========
  function isInWishlist(productId) {
    return cartService ? cartService.isInWishlist(productId) : false;
  }

  // ========== TOGGLE WISHLIST USING GLOBAL SERVICE ==========
  function toggleWishlistGlobal(productId, buttonElement) {
    if (!cartService) {
      showToast("Service not available", "error");
      return false;
    }

    const product = allProducts.find((p) => p.id === productId);
    if (!product) return false;

    const isWished = cartService.isInWishlist(productId);

    if (isWished) {
      const result = cartService.removeFromWishlist(productId);
      if (result.success) {
        showToast("Removed from wishlist", "info");
        updateWishlistButtonUI(buttonElement, false);
        return false;
      }
    } else {
      const wishlistProduct = {
        id: product.id,
        productId: product.id,
        name: product.name,
        image: product.image,
      };
      const result = cartService.addToWishlist(wishlistProduct);
      if (result.success) {
        showToast("Added to wishlist", "success");
        updateWishlistButtonUI(buttonElement, true);
        return true;
      }
    }
    return false;
  }

  function updateWishlistButtonUI(buttonElement, isWished) {
    if (!buttonElement) return;
    const icon = buttonElement.querySelector("i");
    if (icon) {
      if (isWished) {
        icon.className = "fas fa-heart wishlist-active";
        icon.style.color = "#e39f32";
      } else {
        icon.className = "far fa-heart text-gray-300";
        icon.style.color = "";
      }
    }
  }

  // ========== ADD TO CART USING GLOBAL SERVICE ==========
  function addToCartGlobal(productId, isCustomizable = false, product = null) {
    if (!cartService) {
      showToast("Service not available", "error");
      return false;
    }

    const productData = product || allProducts.find((p) => p.id === productId);
    if (!productData) return false;

    // For customizable products, open customization overlay
    if (isCustomizable || productData.isCustomizable) {
      openCustomizationOverlay(productId);
      return true;
    }

    // For regular products
    const cartProduct = {
      id: productData.id,
      productId: productData.id,
      name: productData.name,
      productName: productData.name,
      price: productData.price,
      unitPrice: productData.price,
      image: productData.image,
      quantity: 1,
      material: productData.material,
      color: productData.color,
      size: productData.size,
      sku: `SKU-${productData.id}`,
      selectedColor: productData.color,
      selectedSize: productData.size,
    };

    const result = cartService.addToCart(cartProduct, 1);
    if (result && result.success) {
      showToast("Added to cart!", "success");
      return true;
    } else {
      showToast(result?.message || "Error adding to cart", "error");
      return false;
    }
  }

  // ========== CUSTOMIZATION OVERLAY FUNCTIONS ==========
  function createCustomizationOverlay() {
    if (document.getElementById("customizationOverlay")) return;

    const overlayHTML = `
      <div id="customizationOverlay" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden opacity-0 transition-all duration-300 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-95">
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10 rounded-t-2xl">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <i class="fas fa-sliders-h text-purple-600"></i>
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900">Customize Your Product</h2>
                <p class="text-sm text-gray-500">Make it uniquely yours</p>
              </div>
            </div>
            <button onclick="window.closeCustomizationOverlay && closeCustomizationOverlay()" class="text-gray-400 hover:text-gray-600 transition">
              <i class="fas fa-times text-2xl"></i>
            </button>
          </div>
          
          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="space-y-4">
                <div class="bg-gray-100 rounded-xl overflow-hidden aspect-square">
                  <img id="customPreviewImage" src="" alt="Product preview" class="w-full h-full object-cover">
                </div>
                <div class="bg-gray-50 rounded-xl p-4">
                  <h3 class="font-medium text-gray-900 mb-2">Your Customization</h3>
                  <div id="customSummary" class="text-sm text-gray-600 space-y-1 max-h-40 overflow-y-auto"></div>
                  <div class="mt-3 pt-3 border-t border-gray-200">
                    <div class="flex justify-between items-center">
                      <span class="font-semibold text-gray-700">Total Price:</span>
                      <span id="customTotalPrice" class="text-2xl font-bold text-purple-600">₹0</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div id="customOptionsContainer" class="space-y-5 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar"></div>
            </div>
          </div>
          
          <div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
            <button onclick="window.closeCustomizationOverlay && closeCustomizationOverlay()" class="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium">Cancel</button>
            <button id="addCustomizedToCartBtn" onclick="window.addCustomizedToCart && addCustomizedToCart()" class="px-6 py-2.5 bg-[#1D3C4A] text-white rounded-lg hover:bg-[#16323d] transition font-medium flex items-center gap-2">
              <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
            <button id="buyCustomizedNowBtn" onclick="window.buyCustomizedNow && buyCustomizedNow()" class="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium flex items-center gap-2">
              <i class="fas fa-bolt"></i> Buy Now
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", overlayHTML);

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar { width: 6px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      .option-card { transition: all 0.2s ease; }
      .option-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
      .color-option-btn { transition: all 0.2s ease; }
      .color-option-btn:hover { transform: scale(1.05); }
      .wishlist-active { color: #e39f32; }
    `;
    document.head.appendChild(style);
  }

  function openCustomizationOverlay(productId) {
    console.log(
      "[HomeSubcategory] Opening customization for product:",
      productId,
    );

    currentCustomizingProduct = allProducts.find((p) => p.id === productId);

    if (!currentCustomizingProduct) {
      showToast("Product not found", "error");
      return;
    }

    if (!currentCustomizingProduct.isCustomizable) {
      window.location.href = `/products/product-detail.html?id=${productId}`;
      return;
    }

    createCustomizationOverlay();
    initCustomizationSelections();

    const previewImg = document.getElementById("customPreviewImage");
    if (previewImg)
      previewImg.src =
        currentCustomizingProduct.image || currentCustomizingProduct.mainImage;

    buildCustomizationOptionsUI();
    updateCustomizationPrice();

    const overlay = document.getElementById("customizationOverlay");
    if (overlay) {
      overlay.classList.remove("hidden");
      setTimeout(() => {
        overlay.classList.remove("opacity-0");
        overlay.querySelector(".bg-white").classList.remove("scale-95");
        overlay.classList.add("opacity-100");
        overlay.querySelector(".bg-white").classList.add("scale-100");
      }, 10);
      document.body.style.overflow = "hidden";
    }
  }

  function closeCustomizationOverlay() {
    const overlay = document.getElementById("customizationOverlay");
    if (overlay) {
      overlay.classList.add("opacity-0");
      overlay.querySelector(".bg-white").classList.add("scale-95");
      overlay.classList.remove("opacity-100");
      overlay.querySelector(".bg-white").classList.remove("scale-100");
      setTimeout(() => {
        overlay.classList.add("hidden");
        document.body.style.overflow = "";
      }, 300);
    }
    currentCustomizingProduct = null;
  }

  function initCustomizationSelections() {
    const opts = currentCustomizingProduct.customizationOptions;

    currentCustomizationSelections = {
      size: opts?.sizes?.[0] || null,
      frameColor: opts?.frameColors?.[0] || null,
      frameMaterial: opts?.frameMaterials?.[0] || null,
      glassType: opts?.glassType?.[0] || null,
      engraving: { enabled: false, text: "" },
      matBoard: { enabled: false, color: null },
      addIcon: { enabled: false, icon: null },
      customMessage: { enabled: false, text: "" },
      font: opts?.fonts?.[0] || null,
      finish: opts?.finishes?.[0] || null,
      shape: opts?.shapes?.[0] || null,
      ledColor: opts?.ledColors?.[0] || null,
      mountingType: opts?.mountingType?.[0] || null,
      canvasType: opts?.canvasType?.[0] || null,
      borderStyle: opts?.borderStyle?.[0] || null,
      customColor: opts?.customColors?.[0] || null,
      paperType: opts?.paperType?.[0] || null,
      engravingDepth: opts?.engravingDepth?.[0] || null,
    };
  }

  function buildCustomizationOptionsUI() {
    const container = document.getElementById("customOptionsContainer");
    if (!container) return;

    const opts = currentCustomizingProduct.customizationOptions;
    let html = "";

    if (opts?.sizes && opts.sizes.length > 0) {
      html += `
        <div class="option-card border border-gray-200 rounded-xl p-4 bg-white">
          <h3 class="font-semibold text-gray-900 mb-3">Select Size</h3>
          <div class="grid grid-cols-2 gap-3">
            ${opts.sizes
              .map(
                (size) => `
              <button class="size-option px-4 py-2.5 border rounded-lg text-sm font-medium transition-all ${currentCustomizationSelections.size === size ? "border-purple-500 bg-purple-50 text-purple-700" : "border-gray-300 hover:border-purple-300"}"
                      onclick="window.selectCustomizationOption && selectCustomizationOption('size', '${escapeHtmlForJS(size)}')">${size}</button>
            `,
              )
              .join("")}
          </div>
        </div>
      `;
    }

    if (opts?.frameColors && opts.frameColors.length > 0) {
      html += `
        <div class="option-card border border-gray-200 rounded-xl p-4 bg-white">
          <h3 class="font-semibold text-gray-900 mb-3">Frame Color</h3>
          <div class="flex flex-wrap gap-3">
            ${opts.frameColors
              .map(
                (color) => `
              <button class="color-option-btn w-12 h-12 rounded-full border-2 transition-all ${currentCustomizationSelections.frameColor === color ? "border-purple-500 scale-110 shadow-md" : "border-gray-300"}"
                      style="background: ${getColorCode(color)};"
                      onclick="window.selectCustomizationOption && selectCustomizationOption('frameColor', '${escapeHtmlForJS(color)}')"
                      title="${color}"></button>
            `,
              )
              .join("")}
          </div>
          <div class="text-xs text-gray-500 mt-3">Selected: <span id="selectedFrameColor">${currentCustomizationSelections.frameColor || "None"}</span></div>
        </div>
      `;
    }

    // Add more option sections as needed...

    container.innerHTML =
      html ||
      '<div class="text-center text-gray-500 py-8">No customization options available</div>';
  }

  function selectCustomizationOption(option, value) {
    currentCustomizationSelections[option] = value;
    updateCustomizationPrice();
    updateCustomizationSummary();
  }

  function updateCustomizationPrice() {
    if (!currentCustomizingProduct) return;

    let total =
      currentCustomizingProduct.basePrice ||
      currentCustomizingProduct.price ||
      0;

    if (currentCustomizationSelections.glassType === "UV Protected Glass")
      total += 299;
    if (currentCustomizationSelections.glassType === "Non-Glare Glass")
      total += 199;

    if (
      currentCustomizationSelections.engraving.enabled &&
      currentCustomizingProduct.customizationOptions?.engraving
    ) {
      total += currentCustomizingProduct.customizationOptions.engraving.price;
    }

    if (
      currentCustomizationSelections.matBoard.enabled &&
      currentCustomizingProduct.customizationOptions?.matBoard
    ) {
      total += currentCustomizingProduct.customizationOptions.matBoard.price;
    }

    const priceSpan = document.getElementById("customTotalPrice");
    if (priceSpan) priceSpan.textContent = `₹${total.toLocaleString()}`;

    updateCustomizationSummary();
  }

  function updateCustomizationSummary() {
    const summaryDiv = document.getElementById("customSummary");
    if (!summaryDiv) return;

    const items = [];
    if (currentCustomizationSelections.size)
      items.push(
        `<div><span class="font-medium">Size:</span> ${currentCustomizationSelections.size}</div>`,
      );
    if (currentCustomizationSelections.frameColor)
      items.push(
        `<div><span class="font-medium">Frame Color:</span> ${currentCustomizationSelections.frameColor}</div>`,
      );
    if (currentCustomizationSelections.frameMaterial)
      items.push(
        `<div><span class="font-medium">Frame Material:</span> ${currentCustomizationSelections.frameMaterial}</div>`,
      );
    if (currentCustomizationSelections.glassType)
      items.push(
        `<div><span class="font-medium">Glass:</span> ${currentCustomizationSelections.glassType}</div>`,
      );
    if (currentCustomizationSelections.font)
      items.push(
        `<div><span class="font-medium">Font:</span> ${currentCustomizationSelections.font}</div>`,
      );

    if (
      currentCustomizationSelections.engraving.enabled &&
      currentCustomizationSelections.engraving.text
    ) {
      items.push(
        `<div><span class="font-medium">Engraving:</span> "${currentCustomizationSelections.engraving.text.substring(0, 30)}${currentCustomizationSelections.engraving.text.length > 30 ? "..." : ""}"</div>`,
      );
    }

    if (
      currentCustomizationSelections.matBoard.enabled &&
      currentCustomizationSelections.matBoard.color
    ) {
      items.push(
        `<div><span class="font-medium">Mat Board:</span> ${currentCustomizationSelections.matBoard.color}</div>`,
      );
    }

    items.push(
      `<div class="mt-2 pt-2 border-t border-gray-200"><span class="font-medium">Base Price:</span> ₹${(currentCustomizingProduct.basePrice || currentCustomizingProduct.price).toLocaleString()}</div>`,
    );

    summaryDiv.innerHTML =
      items.length > 0
        ? items.join("")
        : '<div class="text-gray-400 text-center py-4">No customizations selected</div>';
  }

  function getCustomizedProduct() {
    const total =
      parseInt(
        document
          .getElementById("customTotalPrice")
          ?.textContent.replace(/[^0-9]/g, ""),
      ) || 0;

    return {
      id: currentCustomizingProduct.id,
      productId: currentCustomizingProduct.id,
      name: currentCustomizingProduct.name,
      productName: currentCustomizingProduct.name,
      basePrice:
        currentCustomizingProduct.basePrice || currentCustomizingProduct.price,
      finalPrice: total,
      quantity: 1,
      image:
        currentCustomizingProduct.image || currentCustomizingProduct.mainImage,
      isCustomized: true,
      customization: JSON.parse(JSON.stringify(currentCustomizationSelections)),
      sku: `${currentCustomizingProduct.id}-CUSTOM-${Date.now()}`,
      selectedColor:
        currentCustomizationSelections.frameColor ||
        currentCustomizingProduct.color,
      selectedSize:
        currentCustomizationSelections.size || currentCustomizingProduct.size,
    };
  }

  function addCustomizedToCart() {
    if (!cartService) {
      showToast("Service not available", "error");
      return;
    }

    const customizedProduct = getCustomizedProduct();
    const result = cartService.addToCart(customizedProduct, 1);

    if (result && result.success) {
      showToast("Customized product added to cart!", "success");
      closeCustomizationOverlay();
    } else {
      showToast(result?.message || "Error adding to cart", "error");
    }
  }

  function buyCustomizedNow() {
    if (!cartService) {
      showToast("Service not available", "error");
      return;
    }

    const customizedProduct = getCustomizedProduct();
    const result = cartService.addToCart(customizedProduct, 1);

    if (result && result.success) {
      setTimeout(
        () => (window.location.href = "/Checkout/checkout.html"),
        300,
      );
    } else {
      showToast(result?.message || "Error processing", "error");
    }
  }

  function getColorCode(colorName) {
    const colors = {
      Black: "#000000",
      White: "#FFFFFF",
      Gold: "#FFD700",
      Silver: "#C0C0C0",
      "Natural Wood": "#DEB887",
      Walnut: "#5C4033",
      Mahogany: "#C04000",
      Red: "#FF0000",
      Blue: "#0000FF",
      Green: "#008000",
    };
    return colors[colorName] || "#CCCCCC";
  }

  function escapeHtmlForJS(text) {
    if (!text) return "";
    return text.replace(/'/g, "\\'").replace(/"/g, '\\"');
  }

  // ========== URL SLUG HELPERS (from ref: homesubcategory.js) ==========
  function slugify(text) {
    if (!text) return "product";
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  function navigateToProduct(pid, productData) {
    console.log("[HomeSubcategory] navigating to product:", pid);

    if (productData && productData.brandName && productData.productName) {
      let cleanName = productData.productName;
      if (cleanName.toLowerCase().startsWith(productData.brandName.toLowerCase())) {
        cleanName = cleanName.substring(productData.brandName.length).trim();
      }

      const brandSlug    = slugify(productData.brandName);
      const categorySlug = slugify(productData.productCategory || "products");
      const productSlug  = slugify(cleanName || productData.productName);
      const sku          = productData.currentSku || `PROD-${pid}`;

      const url = `/products/product-detail.html?id=${pid}&sku=${sku}&brand=${brandSlug}&category=${categorySlug}&product=${productSlug}`;
      console.log("[HomeSubcategory] navigating to:", url);
      window.location.href = url;
    } else {
      window.location.href = `/products/product-detail.html?id=${pid}`;
    }
  }

  // ========== DYNAMIC SUBCATEGORY FUNCTIONS ==========
  function renderSubcategoryTabs() {
    if (!tabsContainer) return;

    let tabsHtml = "";
    subcategories.forEach((sub) => {
      const isActive = sub.id === currentSub;
      const activeClasses = isActive
        ? "bg-[#1D3C4A] text-white border-[#1D3C4A] shadow-md"
        : "bg-white text-gray-700 border-gray-200 hover:bg-[#e39f32] hover:text-white hover:border-[#e39f32]";

      tabsHtml += `
        <a href="?cat=wall-decor&sub=${sub.id}"
            class="subcat-link px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 border ${activeClasses} flex items-center gap-2 flex-shrink-0"
            data-sub="${sub.id}">
            <i class="${sub.icon} ${isActive ? "text-[#e39f32]" : ""}"></i>
            ${sub.name}
        </a>
      `;
    });
    tabsContainer.innerHTML = tabsHtml;
    attachSubcategoryListeners();
  }

  function attachSubcategoryListeners() {
    document.querySelectorAll(".subcat-link").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const sub = this.dataset.sub;
        const newUrl = "?cat=wall-decor&sub=" + sub;
        window.history.pushState({}, "", newUrl);
        currentSub = sub;

        document.querySelectorAll(".subcat-link").forEach((l) => {
          l.classList.remove(
            "bg-[#1D3C4A]",
            "text-white",
            "border-[#1D3C4A]",
            "shadow-md",
          );
          l.classList.add("bg-white", "text-gray-700", "border-gray-200");
          l.querySelector("i")?.classList.remove("text-[#e39f32]");
        });

        this.classList.remove("bg-white", "text-gray-700", "border-gray-200");
        this.classList.add(
          "bg-[#1D3C4A]",
          "text-white",
          "border-[#1D3C4A]",
          "shadow-md",
        );
        this.querySelector("i")?.classList.add("text-[#e39f32]");

        updateCategoryHeader(sub);
        resetFiltersAndReload(sub);
      });
    });
  }

  function updateCategoryHeader(sub) {
    const subData = subcategories.find((s) => s.id === sub);
    if (subData) {
      document.getElementById("categoryTitle").innerText = subData.name;
      document.getElementById("categoryDescription").innerText = subData.desc;
      document.getElementById("breadcrumbSub").innerText = subData.name;
    }
  }

  function resetFiltersAndReload(sub) {
    activeFilters = {
      material: null,
      color: null,
      size: null,
      priceRange: null,
      style: null,
      shape: null,
      setPieces: null,
    };
    sortOption = "default";
    if (sortSelect) sortSelect.value = "default";
    buildFilterUI();
    const filtered = getFilteredProducts();
    if (skeleton) skeleton.style.display = "grid";
    grid.classList.add("hidden");
    setTimeout(() => {
      if (skeleton) skeleton.style.display = "none";
      renderProducts(filtered);
    }, 400);
  }

  function getFilteredProducts() {
    let filtered = allProducts.filter((p) => p.subcategory === currentSub);

    if (activeFilters.material)
      filtered = filtered.filter((p) => p.material === activeFilters.material);
    if (activeFilters.style)
      filtered = filtered.filter((p) => p.style === activeFilters.style);
    if (activeFilters.color)
      filtered = filtered.filter((p) => p.color === activeFilters.color);
    if (activeFilters.size)
      filtered = filtered.filter((p) => p.size === activeFilters.size);
    if (activeFilters.shape) {
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(activeFilters.shape.toLowerCase()) ||
          p.style?.toLowerCase().includes(activeFilters.shape.toLowerCase()),
      );
    }
    if (activeFilters.setPieces) {
      filtered = filtered.filter(
        (p) =>
          p.name?.includes(activeFilters.setPieces) ||
          p.size?.includes(activeFilters.setPieces),
      );
    }
    if (activeFilters.priceRange) {
      if (activeFilters.priceRange === "under2000")
        filtered = filtered.filter((p) => p.price < 2000);
      else if (activeFilters.priceRange === "2000-5000")
        filtered = filtered.filter((p) => p.price >= 2000 && p.price <= 5000);
      else if (activeFilters.priceRange === "5000-10000")
        filtered = filtered.filter((p) => p.price >= 5000 && p.price <= 10000);
      else if (activeFilters.priceRange === "above10000")
        filtered = filtered.filter((p) => p.price > 10000);
    }

    if (sortOption === "price-low") filtered.sort((a, b) => a.price - b.price);
    else if (sortOption === "price-high")
      filtered.sort((a, b) => b.price - a.price);
    else if (sortOption === "newest")
      filtered.sort((a, b) => b.newest - a.newest);
    else if (sortOption === "popular")
      filtered.sort((a, b) => b.popular - a.popular);

    return filtered;
  }

  // ========== RENDER PRODUCTS ==========
  function renderProducts(products) {
    if (!grid) return;
    if (products.length === 0) {
      grid.classList.add("hidden");
      if (emptyState) emptyState.classList.remove("hidden");
      if (productCountSpan) productCountSpan.innerText = "0 items";
      return;
    }
    if (emptyState) emptyState.classList.add("hidden");
    grid.classList.remove("hidden");

    let html = "";
    products.forEach((p) => {
      const isWished = isInWishlist(p.id);
      const heartIcon = isWished ? "fas fa-heart" : "far fa-heart";
      const mrp = Math.round(p.price * 1.35);
      const discount = Math.round(((mrp - p.price) / mrp) * 100);

      let badge = "";
      if (p.isCustomizable) {
        badge =
          '<span class="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">CUSTOMIZABLE</span>';
      } else if (p.popular > 150) {
        badge =
          '<span class="absolute top-2 left-2 bg-[#e39f32] text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">BESTSELLER</span>';
      } else if (p.newest <= 3) {
        badge =
          '<span class="absolute top-2 left-2 bg-[#1D3C4A] text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">NEW</span>';
      } else if (discount >= 30) {
        badge =
          '<span class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">' +
          discount +
          "% OFF</span>";
      }

      // Resolve SKU fallback — single source of truth for navigation
      const resolvedSku = p.sku || p.currentSku || `PROD-${p.id}`;

      html += `
            <div class="product-card bg-white border border-gray-200 rounded-xl overflow-hidden hover-scale flex flex-col shadow-sm group cursor-pointer"
                 data-id="${p.id}"
                 data-brand="${escapeHtml(p.brandName || p.brand || '')}"
                 data-product-name="${escapeHtml(p.name || '')}"
                 data-category="${escapeHtml(p.category || p.subcategory || '')}"
                 data-sku="${escapeHtml(resolvedSku)}"
                 onclick="window._hscNavigateToProduct(${p.id}, this)">
                <div class="aspect-square bg-gray-100 relative overflow-hidden">
                    <img src="${p.image}" alt="${escapeHtml(p.name)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
                    ${badge}
                    <button class="wishlist-btn absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 z-20" 
                            data-id="${p.id}" 
                            onclick="event.stopPropagation(); window.toggleWishlistFromCard(${p.id}, this)">
                        <i class="${heartIcon} text-lg hover:scale-110 transition-transform" style="${isWished ? "color: #e39f32;" : "color: #9ca3af;"}"></i>
                    </button>
                </div>
                <div class="p-4 flex-1 flex flex-col">
                    <h3 class="font-medium text-gray-800 text-sm mb-2 line-clamp-2 min-h-[40px]">${escapeHtml(p.name)}</h3>
                    <div class="mb-3">
                        <div class="flex items-baseline gap-2 flex-wrap">
                            <span class="font-bold text-lg" style="color:#1D3C4A;">₹${p.price.toLocaleString()}</span>
                            <span class="text-xs text-gray-400 line-through">₹${mrp.toLocaleString()}</span>
                            <span class="text-xs font-semibold text-green-600">${discount}% off</span>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-1 mt-2">
                        ${p.material ? `<span class="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">${escapeHtml(p.material)}</span>` : ""}
                        ${p.size ? `<span class="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">${escapeHtml(p.size)}</span>` : ""}
                        ${p.isCustomizable ? '<span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">✨ Customizable</span>' : ""}
                    </div>
                </div>
               <button class="add-cart-btn mt-auto w-full bg-gray-100 hover:bg-[#1D3C4A] hover:text-white transition-all duration-300 text-gray-800 text-sm py-3 rounded-lg border border-gray-200 flex items-center justify-center gap-2 font-medium"
                       onclick="event.stopPropagation(); window.handleQuickAddToCart(${p.id}, ${p.isCustomizable || false})">
                    <i class="fas ${p.isCustomizable ? "fa-sliders-h" : "fa-shopping-cart"} text-xs" style="color:#e39f32;"></i> 
                    ${p.isCustomizable ? "Customize" : "Add to Cart"}
               </button>
            </div>
        `;
    });

    grid.innerHTML = html;

    if (productCountSpan)
      productCountSpan.innerText = `${products.length} item${products.length !== 1 ? "s" : ""}`;
  }

  // ========== ESCAPE HTML FUNCTION ==========
  function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // ========== FILTER UI BUILDING ==========
  function buildFilterUI() {
    if (!desktopFilterDiv) return;
    const catProducts = allProducts.filter((p) => p.subcategory === currentSub);
    const materials = [
      ...new Set(catProducts.map((p) => p.material).filter(Boolean)),
    ];
    const colors = [
      ...new Set(catProducts.map((p) => p.color).filter(Boolean)),
    ];
    const sizes = [...new Set(catProducts.map((p) => p.size).filter(Boolean))];
    const styles = [
      ...new Set(catProducts.map((p) => p.style).filter(Boolean)),
    ];

    let html = `<div class="space-y-4">`;
    html += `<div class="filter-section border-b border-gray-100 pb-3">
      <button class="filter-toggle flex items-center justify-between w-full text-left mb-2 group" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180');">
        <h4 class="font-medium text-sm" style="color:#1D3C4A;">Price Range</h4>
        <i class="fas fa-chevron-down text-xs transition-transform duration-300" style="color:#e39f32;"></i>
      </button>
      <div class="filter-options">
        <select id="priceRangeSelect" class="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50 focus:border-[#e39f32] focus:ring-1 focus:ring-[#e39f32] outline-none transition">
          <option value="">All prices</option>
          <option value="under2000">Under ₹2,000</option>
          <option value="2000-5000">₹2,000 - ₹5,000</option>
          <option value="5000-10000">₹5,000 - ₹10,000</option>
          <option value="above10000">Above ₹10,000</option>
        </select>
      </div>
    </div>`;

    if (materials.length) {
      html += `<div class="filter-section border-b border-gray-100 pb-3">
        <button class="filter-toggle flex items-center justify-between w-full text-left mb-2 group" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180');">
          <h4 class="font-medium text-sm" style="color:#1D3C4A;">Material</h4>
          <i class="fas fa-chevron-down text-xs transition-transform duration-300" style="color:#e39f32;"></i>
        </button>
        <div class="filter-options space-y-2">`;
      materials.forEach((m) => {
        const count = catProducts.filter((p) => p.material === m).length;
        const isActive = activeFilters.material === m;
        html += `<label class="flex items-center justify-between text-sm mb-2 cursor-pointer group hover:bg-gray-50 p-1 rounded transition-colors">
          <div class="flex items-center gap-2">
            <input type="radio" name="material" value="${m}" ${isActive ? "checked" : ""} class="w-4 h-4 accent-[#e39f32] cursor-pointer">
            <span class="${isActive ? "text-[#e39f32] font-medium" : "text-gray-600"} group-hover:text-[#1D3C4A] transition-colors">${m}</span>
          </div>
          <span class="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">${count}</span>
        </label>`;
      });
      html += `</div></div>`;
    }

    if (styles.length) {
      html += `<div class="filter-section border-b border-gray-100 pb-3">
        <button class="filter-toggle flex items-center justify-between w-full text-left mb-2 group" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180');">
          <h4 class="font-medium text-sm" style="color:#1D3C4A;">Style</h4>
          <i class="fas fa-chevron-down text-xs transition-transform duration-300" style="color:#e39f32;"></i>
        </button>
        <div class="filter-options space-y-2">`;
      styles.forEach((s) => {
        const count = catProducts.filter((p) => p.style === s).length;
        const isActive = activeFilters.style === s;
        html += `<label class="flex items-center justify-between text-sm mb-2 cursor-pointer group hover:bg-gray-50 p-1 rounded transition-colors">
          <div class="flex items-center gap-2">
            <input type="radio" name="style" value="${s}" ${isActive ? "checked" : ""} class="w-4 h-4 accent-[#e39f32] cursor-pointer">
            <span class="${isActive ? "text-[#e39f32] font-medium" : "text-gray-600"} group-hover:text-[#1D3C4A] transition-colors">${s}</span>
          </div>
          <span class="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">${count}</span>
        </label>`;
      });
      html += `</div></div>`;
    }

    if (colors.length) {
      html += `<div class="filter-section border-b border-gray-100 pb-3">
        <button class="filter-toggle flex items-center justify-between w-full text-left mb-2 group" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180');">
          <h4 class="font-medium text-sm" style="color:#1D3C4A;">Color</h4>
          <i class="fas fa-chevron-down text-xs transition-transform duration-300" style="color:#e39f32;"></i>
        </button>
        <div class="filter-options space-y-2">`;
      colors.forEach((c) => {
        const count = catProducts.filter((p) => p.color === c).length;
        const isActive = activeFilters.color === c;
        const colorSwatch = c.toLowerCase().includes("gold")
          ? "#e39f32"
          : c.toLowerCase().includes("brown")
            ? "#8B4513"
            : c.toLowerCase().includes("black")
              ? "#000000"
              : c.toLowerCase().includes("white")
                ? "#FFFFFF"
                : c.toLowerCase().includes("blue")
                  ? "#0000FF"
                  : c.toLowerCase().includes("green")
                    ? "#008000"
                    : c.toLowerCase().includes("red")
                      ? "#FF0000"
                      : "#CCCCCC";
        html += `<label class="flex items-center justify-between text-sm mb-2 cursor-pointer group hover:bg-gray-50 p-1 rounded transition-colors">
          <div class="flex items-center gap-2">
            <input type="radio" name="color" value="${c}" ${isActive ? "checked" : ""} class="w-4 h-4 accent-[#e39f32] cursor-pointer">
            <span class="w-3 h-3 rounded-full border border-gray-200" style="background: ${colorSwatch};"></span>
            <span class="${isActive ? "text-[#e39f32] font-medium" : "text-gray-600"} group-hover:text-[#1D3C4A] transition-colors">${c}</span>
          </div>
          <span class="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">${count}</span>
        </label>`;
      });
      html += `</div></div>`;
    }

    if (sizes.length) {
      html += `<div class="filter-section border-b border-gray-100 pb-3">
        <button class="filter-toggle flex items-center justify-between w-full text-left mb-2 group" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180');">
          <h4 class="font-medium text-sm" style="color:#1D3C4A;">Size</h4>
          <i class="fas fa-chevron-down text-xs transition-transform duration-300" style="color:#e39f32;"></i>
        </button>
        <div class="filter-options space-y-2">`;
      sizes.forEach((s) => {
        const count = catProducts.filter((p) => p.size === s).length;
        const isActive = activeFilters.size === s;
        html += `<label class="flex items-center justify-between text-sm mb-2 cursor-pointer group hover:bg-gray-50 p-1 rounded transition-colors">
          <div class="flex items-center gap-2">
            <input type="radio" name="size" value="${s}" ${isActive ? "checked" : ""} class="w-4 h-4 accent-[#e39f32] cursor-pointer">
            <span class="${isActive ? "text-[#e39f32] font-medium" : "text-gray-600"} group-hover:text-[#1D3C4A] transition-colors">${s}</span>
          </div>
          <span class="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">${count}</span>
        </label>`;
      });
      html += `</div></div>`;
    }

    desktopFilterDiv.innerHTML = html;
    if (mobileFilterContent) mobileFilterContent.innerHTML = html;
    document
      .querySelectorAll(".filter-options")
      .forEach((section) => section.classList.remove("hidden"));
  }

  function readFilters() {
    const materialRadio = document.querySelector(
      'input[name="material"]:checked',
    );
    const styleRadio = document.querySelector('input[name="style"]:checked');
    const colorRadio = document.querySelector('input[name="color"]:checked');
    const sizeRadio = document.querySelector('input[name="size"]:checked');
    const priceSelect = document.getElementById("priceRangeSelect");
    activeFilters.material = materialRadio ? materialRadio.value : null;
    activeFilters.style = styleRadio ? styleRadio.value : null;
    activeFilters.color = colorRadio ? colorRadio.value : null;
    activeFilters.size = sizeRadio ? sizeRadio.value : null;
    activeFilters.priceRange = priceSelect ? priceSelect.value : null;
  }

  function applyFiltersAndRender() {
    readFilters();
    const filtered = getFilteredProducts();
    renderProducts(filtered);
    if (mobileDrawer) {
      mobileDrawer.classList.add("opacity-0", "pointer-events-none");
      const drawerDiv = document.querySelector("#mobileFilterDrawer > div");
      if (drawerDiv) drawerDiv.classList.remove("drawer-open");
    }
  }

  function resetFilters() {
    activeFilters = {
      material: null,
      style: null,
      color: null,
      size: null,
      shape: null,
      setPieces: null,
      priceRange: null,
    };
    buildFilterUI();
    applyFiltersAndRender();
  }

  function showToast(msg, type = "success") {
    if (!toast) return;
    toast.querySelector("span").innerText = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  }

  function initPage() {
    renderSubcategoryTabs();
    updateCategoryHeader(currentSub);
    if (skeleton) {
      let skeletonHtml = "";
      for (let i = 0; i < 8; i++)
        skeletonHtml += '<div class="skeleton-pulse rounded-xl h-64"></div>';
      skeleton.innerHTML = skeletonHtml;
    }
    buildFilterUI();
    setTimeout(function () {
      if (skeleton) skeleton.style.display = "none";
      const filtered = getFilteredProducts();
      renderProducts(filtered);
    }, 400);
  }

  // ========== EVENT LISTENERS ==========
  if (applyFiltersBtn)
    applyFiltersBtn.addEventListener("click", applyFiltersAndRender);
  if (resetFiltersBtn) resetFiltersBtn.addEventListener("click", resetFilters);
  if (emptyReset) emptyReset.addEventListener("click", resetFilters);
  if (sortSelect)
    sortSelect.addEventListener("change", function (e) {
      sortOption = e.target.value;
      applyFiltersAndRender();
    });
  if (mobileToggle && mobileDrawer)
    mobileToggle.addEventListener("click", function () {
      mobileDrawer.classList.remove("opacity-0", "pointer-events-none");
      const drawerDiv = document.querySelector("#mobileFilterDrawer > div");
      if (drawerDiv) drawerDiv.classList.add("drawer-open");
    });
  if (closeMobile && mobileDrawer)
    closeMobile.addEventListener("click", function () {
      mobileDrawer.classList.add("opacity-0", "pointer-events-none");
      const drawerDiv = document.querySelector("#mobileFilterDrawer > div");
      if (drawerDiv) drawerDiv.classList.remove("drawer-open");
    });
  if (mobileApply)
    mobileApply.addEventListener("click", function () {
      const material = document.querySelector(
        '#mobileFilterContent input[name="material"]:checked',
      );
      const style = document.querySelector(
        '#mobileFilterContent input[name="style"]:checked',
      );
      const color = document.querySelector(
        '#mobileFilterContent input[name="color"]:checked',
      );
      const size = document.querySelector(
        '#mobileFilterContent input[name="size"]:checked',
      );
      const price = document.querySelector(
        "#mobileFilterContent #priceRangeSelect",
      );
      activeFilters.material = material ? material.value : null;
      activeFilters.style = style ? style.value : null;
      activeFilters.color = color ? color.value : null;
      activeFilters.size = size ? size.value : null;
      activeFilters.priceRange = price ? price.value : null;
      buildFilterUI();
      applyFiltersAndRender();
    });

  // ========== MAKE GLOBAL FUNCTIONS AVAILABLE ==========
  window.openCustomizationOverlay = openCustomizationOverlay;
  window.closeCustomizationOverlay = closeCustomizationOverlay;
  window.selectCustomizationOption = selectCustomizationOption;
  window.addCustomizedToCart = addCustomizedToCart;
  window.buyCustomizedNow = buyCustomizedNow;
  window.toggleWishlistFromCard = function (productId, btn) {
    event.stopPropagation();
    toggleWishlistGlobal(productId, btn);
  };
  window.handleQuickAddToCart = function (productId, isCustomizable) {
    addToCartGlobal(productId, isCustomizable);
  };

  // ── Card click navigation — reads data-attributes set on the card div ──────
  window._hscNavigateToProduct = function (pid, cardEl) {
    const productData = cardEl ? {
      brandName:       cardEl.dataset.brand,
      productName:     cardEl.dataset.productName,
      productCategory: cardEl.dataset.category,
      currentSku:      cardEl.dataset.sku,
    } : null;
    navigateToProduct(pid, productData);
  };

  // Add CSS styles
  const style = document.createElement("style");
  style.textContent = `
    .filter-section .filter-options { transition: all 0.3s ease; }
    .filter-section .filter-toggle:hover h4 { color: #e39f32 !important; }
    .filter-section input[type="radio"] { transition: all 0.2s ease; }
    .filter-section input[type="radio"]:checked + span { color: #e39f32 !important; font-weight: 500; }
    .rotate-180 { transform: rotate(180deg); }
    .wishlist-active { color: #e39f32 !important; }
  `;
  document.head.appendChild(style);

  // Start loading products
  loadProducts();
})();




































// // ========== FIXED homesubcategory.js - Using Global Service ==========

// (function () {
//   // ========== IMPORT PRODUCTS FROM CENTRAL DATABASE ==========
//   let allProducts = [];
//   let cartService = null;
//   let currentCustomizingProduct = null;
//   let currentCustomizationSelections = {};

//   // Wait for ProductDatabase to be available
//   function loadProducts() {
//     if (typeof window.ProductDatabase !== "undefined") {
//       allProducts = window.ProductDatabase.getAllProducts();
//       console.log(
//         "[HomeSubcategory] Products loaded from ProductDatabase:",
//         allProducts.length,
//       );

//       // Wait for cart service
//       waitForCartService();
//     } else {
//       console.log("[HomeSubcategory] Waiting for ProductDatabase...");
//       setTimeout(loadProducts, 100);
//     }
//   }

//   // Wait for cart service
//   function waitForCartService(maxAttempts = 20) {
//     let attempts = 0;
//     function check() {
//       if (window.getCartWishlistService) {
//         cartService = window.getCartWishlistService();
//         console.log("[HomeSubcategory] Cart service found");
//         initPage();
//       } else if (attempts < maxAttempts) {
//         attempts++;
//         setTimeout(check, 100);
//       } else {
//         console.warn(
//           "[HomeSubcategory] Cart service not available, using fallback",
//         );
//         initPage();
//       }
//     }
//     check();
//   }

//   // ========== SUBCATEGORY CONFIGURATION ==========
//   const subcategories = [
//     {
//       id: "wall-clock",
//       name: "Wall Clock",
//       icon: "far fa-clock",
//       desc: "Timeless elegance for your walls – discover our curated collection of handcrafted clocks.",
//     },
//     {
//       id: "paintings",
//       name: "Paintings",
//       icon: "fas fa-palette",
//       desc: "Expressive artworks to bring color and emotion into your space.",
//     },
//     {
//       id: "wall-sketch",
//       name: "Wall Sketch",
//       icon: "fas fa-pencil-alt",
//       desc: "Minimalist sketches that add character and depth to any room.",
//     },
//     {
//       id: "jharokas",
//       name: "Jharokas",
//       icon: "fas fa-archway",
//       desc: "Traditional arched windows – intricate craftsmanship with a royal touch.",
//     },
//     {
//       id: "metal-wall-hangings",
//       name: "Metal Wall Hangings",
//       icon: "fas fa-cog",
//       desc: "Contemporary metal art pieces that add industrial charm to your walls.",
//     },
//     {
//       id: "wallpapers",
//       name: "Wallpapers",
//       icon: "fas fa-paint-roller",
//       desc: "Transform your space with stunning patterns and textures.",
//     },
//     {
//       id: "handmade-paintings",
//       name: "Handmade Paintings",
//       icon: "fas fa-brush",
//       desc: "Unique, original artworks crafted by skilled artists.",
//     },
//     {
//       id: "digital-canvas-prints",
//       name: "Digital Canvas Prints",
//       icon: "fas fa-print",
//       desc: "Modern digital art printed on premium canvas.",
//     },
//     {
//       id: "brass-wall-hangings",
//       name: "Brass Wall Hangings",
//       icon: "fas fa-medal",
//       desc: "Elegant brass decor pieces with traditional appeal.",
//     },
//   ];

//   // Get subcategory from URL
//   const urlParams = new URLSearchParams(window.location.search);
//   let currentSub = urlParams.get("sub") || "wall-clock";

//   // State management (only for UI filters, not cart/wishlist data)
//   let activeFilters = {
//     material: null,
//     style: null,
//     color: null,
//     size: null,
//     shape: null,
//     setPieces: null,
//     priceRange: null,
//   };
//   let sortOption = "default";

//   // DOM elements
//   const grid = document.getElementById("productGrid");
//   const skeleton = document.getElementById("skeletonGrid");
//   const emptyState = document.getElementById("emptyState");
//   const emptyReset = document.getElementById("emptyResetBtn");
//   const desktopFilterDiv = document.getElementById("desktopFilterContainer");
//   const mobileFilterContent = document.getElementById("mobileFilterContent");
//   const mobileToggle = document.getElementById("mobileFilterToggle");
//   const mobileDrawer = document.getElementById("mobileFilterDrawer");
//   const closeMobile = document.getElementById("closeMobileFilter");
//   const mobileApply = document.getElementById("mobileApplyFilters");
//   const resetFiltersBtn = document.getElementById("resetFiltersBtn");
//   const applyFiltersBtn = document.getElementById("applyFiltersBtn");
//   const sortSelect = document.getElementById("sortSelect");
//   const productCountSpan = document.getElementById("productCount");
//   const toast = document.getElementById("toast");
//   const tabsContainer = document.getElementById("subcategoryTabs");

//   // ========== GET CURRENT WISHLIST FROM GLOBAL SERVICE ==========
//   function getCurrentWishlist() {
//     return cartService ? cartService.getWishlistItems() : [];
//   }

//   // ========== CHECK IF PRODUCT IS IN WISHLIST ==========
//   function isInWishlist(productId) {
//     return cartService ? cartService.isInWishlist(productId) : false;
//   }

//   // ========== TOGGLE WISHLIST USING GLOBAL SERVICE ==========
//   function toggleWishlistGlobal(productId, buttonElement) {
//     if (!cartService) {
//       showToast("Service not available", "error");
//       return false;
//     }

//     const product = allProducts.find((p) => p.id === productId);
//     if (!product) return false;

//     const isWished = cartService.isInWishlist(productId);

//     if (isWished) {
//       const result = cartService.removeFromWishlist(productId);
//       if (result.success) {
//         showToast("Removed from wishlist", "info");
//         updateWishlistButtonUI(buttonElement, false);
//         return false;
//       }
//     } else {
//       const wishlistProduct = {
//         id: product.id,
//         productId: product.id,
//         name: product.name,
//         image: product.image,
//       };
//       const result = cartService.addToWishlist(wishlistProduct);
//       if (result.success) {
//         showToast("Added to wishlist", "success");
//         updateWishlistButtonUI(buttonElement, true);
//         return true;
//       }
//     }
//     return false;
//   }

//   function updateWishlistButtonUI(buttonElement, isWished) {
//     if (!buttonElement) return;
//     const icon = buttonElement.querySelector("i");
//     if (icon) {
//       if (isWished) {
//         icon.className = "fas fa-heart wishlist-active";
//         icon.style.color = "#e39f32";
//       } else {
//         icon.className = "far fa-heart text-gray-300";
//         icon.style.color = "";
//       }
//     }
//   }

//   // ========== ADD TO CART USING GLOBAL SERVICE ==========
//   function addToCartGlobal(productId, isCustomizable = false, product = null) {
//     if (!cartService) {
//       showToast("Service not available", "error");
//       return false;
//     }

//     const productData = product || allProducts.find((p) => p.id === productId);
//     if (!productData) return false;

//     // For customizable products, open customization overlay
//     if (isCustomizable || productData.isCustomizable) {
//       openCustomizationOverlay(productId);
//       return true;
//     }

//     // For regular products
//     const cartProduct = {
//       id: productData.id,
//       productId: productData.id,
//       name: productData.name,
//       productName: productData.name,
//       price: productData.price,
//       unitPrice: productData.price,
//       image: productData.image,
//       quantity: 1,
//       material: productData.material,
//       color: productData.color,
//       size: productData.size,
//       sku: `SKU-${productData.id}`,
//       selectedColor: productData.color,
//       selectedSize: productData.size,
//     };

//     const result = cartService.addToCart(cartProduct, 1);
//     if (result && result.success) {
//       showToast("Added to cart!", "success");
//       return true;
//     } else {
//       showToast(result?.message || "Error adding to cart", "error");
//       return false;
//     }
//   }

//   // ========== CUSTOMIZATION OVERLAY FUNCTIONS ==========
//   function createCustomizationOverlay() {
//     if (document.getElementById("customizationOverlay")) return;

//     const overlayHTML = `
//       <div id="customizationOverlay" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden opacity-0 transition-all duration-300 flex items-center justify-center p-4">
//         <div class="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-95">
//           <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10 rounded-t-2xl">
//             <div class="flex items-center gap-3">
//               <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
//                 <i class="fas fa-sliders-h text-purple-600"></i>
//               </div>
//               <div>
//                 <h2 class="text-xl font-semibold text-gray-900">Customize Your Product</h2>
//                 <p class="text-sm text-gray-500">Make it uniquely yours</p>
//               </div>
//             </div>
//             <button onclick="window.closeCustomizationOverlay && closeCustomizationOverlay()" class="text-gray-400 hover:text-gray-600 transition">
//               <i class="fas fa-times text-2xl"></i>
//             </button>
//           </div>
          
//           <div class="p-6">
//             <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div class="space-y-4">
//                 <div class="bg-gray-100 rounded-xl overflow-hidden aspect-square">
//                   <img id="customPreviewImage" src="" alt="Product preview" class="w-full h-full object-cover">
//                 </div>
//                 <div class="bg-gray-50 rounded-xl p-4">
//                   <h3 class="font-medium text-gray-900 mb-2">Your Customization</h3>
//                   <div id="customSummary" class="text-sm text-gray-600 space-y-1 max-h-40 overflow-y-auto"></div>
//                   <div class="mt-3 pt-3 border-t border-gray-200">
//                     <div class="flex justify-between items-center">
//                       <span class="font-semibold text-gray-700">Total Price:</span>
//                       <span id="customTotalPrice" class="text-2xl font-bold text-purple-600">₹0</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div id="customOptionsContainer" class="space-y-5 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar"></div>
//             </div>
//           </div>
          
//           <div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
//             <button onclick="window.closeCustomizationOverlay && closeCustomizationOverlay()" class="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium">Cancel</button>
//             <button id="addCustomizedToCartBtn" onclick="window.addCustomizedToCart && addCustomizedToCart()" class="px-6 py-2.5 bg-[#1D3C4A] text-white rounded-lg hover:bg-[#16323d] transition font-medium flex items-center gap-2">
//               <i class="fas fa-cart-plus"></i> Add to Cart
//             </button>
//             <button id="buyCustomizedNowBtn" onclick="window.buyCustomizedNow && buyCustomizedNow()" class="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium flex items-center gap-2">
//               <i class="fas fa-bolt"></i> Buy Now
//             </button>
//           </div>
//         </div>
//       </div>
//     `;

//     document.body.insertAdjacentHTML("beforeend", overlayHTML);

//     // Add styles
//     const style = document.createElement("style");
//     style.textContent = `
//       .custom-scrollbar::-webkit-scrollbar { width: 6px; }
//       .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
//       .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
//       .option-card { transition: all 0.2s ease; }
//       .option-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
//       .color-option-btn { transition: all 0.2s ease; }
//       .color-option-btn:hover { transform: scale(1.05); }
//       .wishlist-active { color: #e39f32; }
//     `;
//     document.head.appendChild(style);
//   }

//   function openCustomizationOverlay(productId) {
//     console.log(
//       "[HomeSubcategory] Opening customization for product:",
//       productId,
//     );

//     currentCustomizingProduct = allProducts.find((p) => p.id === productId);

//     if (!currentCustomizingProduct) {
//       showToast("Product not found", "error");
//       return;
//     }

//     if (!currentCustomizingProduct.isCustomizable) {
//       window.location.href = `../Product-Details/product-detail.html?id=${productId}`;
//       return;
//     }

//     createCustomizationOverlay();
//     initCustomizationSelections();

//     const previewImg = document.getElementById("customPreviewImage");
//     if (previewImg)
//       previewImg.src =
//         currentCustomizingProduct.image || currentCustomizingProduct.mainImage;

//     buildCustomizationOptionsUI();
//     updateCustomizationPrice();

//     const overlay = document.getElementById("customizationOverlay");
//     if (overlay) {
//       overlay.classList.remove("hidden");
//       setTimeout(() => {
//         overlay.classList.remove("opacity-0");
//         overlay.querySelector(".bg-white").classList.remove("scale-95");
//         overlay.classList.add("opacity-100");
//         overlay.querySelector(".bg-white").classList.add("scale-100");
//       }, 10);
//       document.body.style.overflow = "hidden";
//     }
//   }

//   function closeCustomizationOverlay() {
//     const overlay = document.getElementById("customizationOverlay");
//     if (overlay) {
//       overlay.classList.add("opacity-0");
//       overlay.querySelector(".bg-white").classList.add("scale-95");
//       overlay.classList.remove("opacity-100");
//       overlay.querySelector(".bg-white").classList.remove("scale-100");
//       setTimeout(() => {
//         overlay.classList.add("hidden");
//         document.body.style.overflow = "";
//       }, 300);
//     }
//     currentCustomizingProduct = null;
//   }

//   function initCustomizationSelections() {
//     const opts = currentCustomizingProduct.customizationOptions;

//     currentCustomizationSelections = {
//       size: opts?.sizes?.[0] || null,
//       frameColor: opts?.frameColors?.[0] || null,
//       frameMaterial: opts?.frameMaterials?.[0] || null,
//       glassType: opts?.glassType?.[0] || null,
//       engraving: { enabled: false, text: "" },
//       matBoard: { enabled: false, color: null },
//       addIcon: { enabled: false, icon: null },
//       customMessage: { enabled: false, text: "" },
//       font: opts?.fonts?.[0] || null,
//       finish: opts?.finishes?.[0] || null,
//       shape: opts?.shapes?.[0] || null,
//       ledColor: opts?.ledColors?.[0] || null,
//       mountingType: opts?.mountingType?.[0] || null,
//       canvasType: opts?.canvasType?.[0] || null,
//       borderStyle: opts?.borderStyle?.[0] || null,
//       customColor: opts?.customColors?.[0] || null,
//       paperType: opts?.paperType?.[0] || null,
//       engravingDepth: opts?.engravingDepth?.[0] || null,
//     };
//   }

//   function buildCustomizationOptionsUI() {
//     const container = document.getElementById("customOptionsContainer");
//     if (!container) return;

//     const opts = currentCustomizingProduct.customizationOptions;
//     let html = "";

//     if (opts?.sizes && opts.sizes.length > 0) {
//       html += `
//         <div class="option-card border border-gray-200 rounded-xl p-4 bg-white">
//           <h3 class="font-semibold text-gray-900 mb-3">Select Size</h3>
//           <div class="grid grid-cols-2 gap-3">
//             ${opts.sizes
//               .map(
//                 (size) => `
//               <button class="size-option px-4 py-2.5 border rounded-lg text-sm font-medium transition-all ${currentCustomizationSelections.size === size ? "border-purple-500 bg-purple-50 text-purple-700" : "border-gray-300 hover:border-purple-300"}"
//                       onclick="window.selectCustomizationOption && selectCustomizationOption('size', '${escapeHtmlForJS(size)}')">${size}</button>
//             `,
//               )
//               .join("")}
//           </div>
//         </div>
//       `;
//     }

//     if (opts?.frameColors && opts.frameColors.length > 0) {
//       html += `
//         <div class="option-card border border-gray-200 rounded-xl p-4 bg-white">
//           <h3 class="font-semibold text-gray-900 mb-3">Frame Color</h3>
//           <div class="flex flex-wrap gap-3">
//             ${opts.frameColors
//               .map(
//                 (color) => `
//               <button class="color-option-btn w-12 h-12 rounded-full border-2 transition-all ${currentCustomizationSelections.frameColor === color ? "border-purple-500 scale-110 shadow-md" : "border-gray-300"}"
//                       style="background: ${getColorCode(color)};"
//                       onclick="window.selectCustomizationOption && selectCustomizationOption('frameColor', '${escapeHtmlForJS(color)}')"
//                       title="${color}"></button>
//             `,
//               )
//               .join("")}
//           </div>
//           <div class="text-xs text-gray-500 mt-3">Selected: <span id="selectedFrameColor">${currentCustomizationSelections.frameColor || "None"}</span></div>
//         </div>
//       `;
//     }

//     // Add more option sections as needed...

//     container.innerHTML =
//       html ||
//       '<div class="text-center text-gray-500 py-8">No customization options available</div>';
//   }

//   function selectCustomizationOption(option, value) {
//     currentCustomizationSelections[option] = value;
//     updateCustomizationPrice();
//     updateCustomizationSummary();
//   }

//   function updateCustomizationPrice() {
//     if (!currentCustomizingProduct) return;

//     let total =
//       currentCustomizingProduct.basePrice ||
//       currentCustomizingProduct.price ||
//       0;

//     if (currentCustomizationSelections.glassType === "UV Protected Glass")
//       total += 299;
//     if (currentCustomizationSelections.glassType === "Non-Glare Glass")
//       total += 199;

//     if (
//       currentCustomizationSelections.engraving.enabled &&
//       currentCustomizingProduct.customizationOptions?.engraving
//     ) {
//       total += currentCustomizingProduct.customizationOptions.engraving.price;
//     }

//     if (
//       currentCustomizationSelections.matBoard.enabled &&
//       currentCustomizingProduct.customizationOptions?.matBoard
//     ) {
//       total += currentCustomizingProduct.customizationOptions.matBoard.price;
//     }

//     const priceSpan = document.getElementById("customTotalPrice");
//     if (priceSpan) priceSpan.textContent = `₹${total.toLocaleString()}`;

//     updateCustomizationSummary();
//   }

//   function updateCustomizationSummary() {
//     const summaryDiv = document.getElementById("customSummary");
//     if (!summaryDiv) return;

//     const items = [];
//     if (currentCustomizationSelections.size)
//       items.push(
//         `<div><span class="font-medium">Size:</span> ${currentCustomizationSelections.size}</div>`,
//       );
//     if (currentCustomizationSelections.frameColor)
//       items.push(
//         `<div><span class="font-medium">Frame Color:</span> ${currentCustomizationSelections.frameColor}</div>`,
//       );
//     if (currentCustomizationSelections.frameMaterial)
//       items.push(
//         `<div><span class="font-medium">Frame Material:</span> ${currentCustomizationSelections.frameMaterial}</div>`,
//       );
//     if (currentCustomizationSelections.glassType)
//       items.push(
//         `<div><span class="font-medium">Glass:</span> ${currentCustomizationSelections.glassType}</div>`,
//       );
//     if (currentCustomizationSelections.font)
//       items.push(
//         `<div><span class="font-medium">Font:</span> ${currentCustomizationSelections.font}</div>`,
//       );

//     if (
//       currentCustomizationSelections.engraving.enabled &&
//       currentCustomizationSelections.engraving.text
//     ) {
//       items.push(
//         `<div><span class="font-medium">Engraving:</span> "${currentCustomizationSelections.engraving.text.substring(0, 30)}${currentCustomizationSelections.engraving.text.length > 30 ? "..." : ""}"</div>`,
//       );
//     }

//     if (
//       currentCustomizationSelections.matBoard.enabled &&
//       currentCustomizationSelections.matBoard.color
//     ) {
//       items.push(
//         `<div><span class="font-medium">Mat Board:</span> ${currentCustomizationSelections.matBoard.color}</div>`,
//       );
//     }

//     items.push(
//       `<div class="mt-2 pt-2 border-t border-gray-200"><span class="font-medium">Base Price:</span> ₹${(currentCustomizingProduct.basePrice || currentCustomizingProduct.price).toLocaleString()}</div>`,
//     );

//     summaryDiv.innerHTML =
//       items.length > 0
//         ? items.join("")
//         : '<div class="text-gray-400 text-center py-4">No customizations selected</div>';
//   }

//   function getCustomizedProduct() {
//     const total =
//       parseInt(
//         document
//           .getElementById("customTotalPrice")
//           ?.textContent.replace(/[^0-9]/g, ""),
//       ) || 0;

//     return {
//       id: currentCustomizingProduct.id,
//       productId: currentCustomizingProduct.id,
//       name: currentCustomizingProduct.name,
//       productName: currentCustomizingProduct.name,
//       basePrice:
//         currentCustomizingProduct.basePrice || currentCustomizingProduct.price,
//       finalPrice: total,
//       quantity: 1,
//       image:
//         currentCustomizingProduct.image || currentCustomizingProduct.mainImage,
//       isCustomized: true,
//       customization: JSON.parse(JSON.stringify(currentCustomizationSelections)),
//       sku: `${currentCustomizingProduct.id}-CUSTOM-${Date.now()}`,
//       selectedColor:
//         currentCustomizationSelections.frameColor ||
//         currentCustomizingProduct.color,
//       selectedSize:
//         currentCustomizationSelections.size || currentCustomizingProduct.size,
//     };
//   }

//   function addCustomizedToCart() {
//     if (!cartService) {
//       showToast("Service not available", "error");
//       return;
//     }

//     const customizedProduct = getCustomizedProduct();
//     const result = cartService.addToCart(customizedProduct, 1);

//     if (result && result.success) {
//       showToast("Customized product added to cart!", "success");
//       closeCustomizationOverlay();
//     } else {
//       showToast(result?.message || "Error adding to cart", "error");
//     }
//   }

//   function buyCustomizedNow() {
//     if (!cartService) {
//       showToast("Service not available", "error");
//       return;
//     }

//     const customizedProduct = getCustomizedProduct();
//     const result = cartService.addToCart(customizedProduct, 1);

//     if (result && result.success) {
//       setTimeout(
//         () => (window.location.href = "../Checkout/checkout.html"),
//         300,
//       );
//     } else {
//       showToast(result?.message || "Error processing", "error");
//     }
//   }

//   function getColorCode(colorName) {
//     const colors = {
//       Black: "#000000",
//       White: "#FFFFFF",
//       Gold: "#FFD700",
//       Silver: "#C0C0C0",
//       "Natural Wood": "#DEB887",
//       Walnut: "#5C4033",
//       Mahogany: "#C04000",
//       Red: "#FF0000",
//       Blue: "#0000FF",
//       Green: "#008000",
//     };
//     return colors[colorName] || "#CCCCCC";
//   }

//   function escapeHtmlForJS(text) {
//     if (!text) return "";
//     return text.replace(/'/g, "\\'").replace(/"/g, '\\"');
//   }

//   // ========== DYNAMIC SUBCATEGORY FUNCTIONS ==========
//   function renderSubcategoryTabs() {
//     if (!tabsContainer) return;

//     let tabsHtml = "";
//     subcategories.forEach((sub) => {
//       const isActive = sub.id === currentSub;
//       const activeClasses = isActive
//         ? "bg-[#1D3C4A] text-white border-[#1D3C4A] shadow-md"
//         : "bg-white text-gray-700 border-gray-200 hover:bg-[#e39f32] hover:text-white hover:border-[#e39f32]";

//       tabsHtml += `
//         <a href="?cat=wall-decor&sub=${sub.id}"
//             class="subcat-link px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 border ${activeClasses} flex items-center gap-2 flex-shrink-0"
//             data-sub="${sub.id}">
//             <i class="${sub.icon} ${isActive ? "text-[#e39f32]" : ""}"></i>
//             ${sub.name}
//         </a>
//       `;
//     });
//     tabsContainer.innerHTML = tabsHtml;
//     attachSubcategoryListeners();
//   }

//   function attachSubcategoryListeners() {
//     document.querySelectorAll(".subcat-link").forEach((link) => {
//       link.addEventListener("click", function (e) {
//         e.preventDefault();
//         const sub = this.dataset.sub;
//         const newUrl = "?cat=wall-decor&sub=" + sub;
//         window.history.pushState({}, "", newUrl);
//         currentSub = sub;

//         document.querySelectorAll(".subcat-link").forEach((l) => {
//           l.classList.remove(
//             "bg-[#1D3C4A]",
//             "text-white",
//             "border-[#1D3C4A]",
//             "shadow-md",
//           );
//           l.classList.add("bg-white", "text-gray-700", "border-gray-200");
//           l.querySelector("i")?.classList.remove("text-[#e39f32]");
//         });

//         this.classList.remove("bg-white", "text-gray-700", "border-gray-200");
//         this.classList.add(
//           "bg-[#1D3C4A]",
//           "text-white",
//           "border-[#1D3C4A]",
//           "shadow-md",
//         );
//         this.querySelector("i")?.classList.add("text-[#e39f32]");

//         updateCategoryHeader(sub);
//         resetFiltersAndReload(sub);
//       });
//     });
//   }

//   function updateCategoryHeader(sub) {
//     const subData = subcategories.find((s) => s.id === sub);
//     if (subData) {
//       document.getElementById("categoryTitle").innerText = subData.name;
//       document.getElementById("categoryDescription").innerText = subData.desc;
//       document.getElementById("breadcrumbSub").innerText = subData.name;
//     }
//   }

//   function resetFiltersAndReload(sub) {
//     activeFilters = {
//       material: null,
//       color: null,
//       size: null,
//       priceRange: null,
//       style: null,
//       shape: null,
//       setPieces: null,
//     };
//     sortOption = "default";
//     if (sortSelect) sortSelect.value = "default";
//     buildFilterUI();
//     const filtered = getFilteredProducts();
//     if (skeleton) skeleton.style.display = "grid";
//     grid.classList.add("hidden");
//     setTimeout(() => {
//       if (skeleton) skeleton.style.display = "none";
//       renderProducts(filtered);
//     }, 400);
//   }

//   function getFilteredProducts() {
//     let filtered = allProducts.filter((p) => p.subcategory === currentSub);

//     if (activeFilters.material)
//       filtered = filtered.filter((p) => p.material === activeFilters.material);
//     if (activeFilters.style)
//       filtered = filtered.filter((p) => p.style === activeFilters.style);
//     if (activeFilters.color)
//       filtered = filtered.filter((p) => p.color === activeFilters.color);
//     if (activeFilters.size)
//       filtered = filtered.filter((p) => p.size === activeFilters.size);
//     if (activeFilters.shape) {
//       filtered = filtered.filter(
//         (p) =>
//           p.name?.toLowerCase().includes(activeFilters.shape.toLowerCase()) ||
//           p.style?.toLowerCase().includes(activeFilters.shape.toLowerCase()),
//       );
//     }
//     if (activeFilters.setPieces) {
//       filtered = filtered.filter(
//         (p) =>
//           p.name?.includes(activeFilters.setPieces) ||
//           p.size?.includes(activeFilters.setPieces),
//       );
//     }
//     if (activeFilters.priceRange) {
//       if (activeFilters.priceRange === "under2000")
//         filtered = filtered.filter((p) => p.price < 2000);
//       else if (activeFilters.priceRange === "2000-5000")
//         filtered = filtered.filter((p) => p.price >= 2000 && p.price <= 5000);
//       else if (activeFilters.priceRange === "5000-10000")
//         filtered = filtered.filter((p) => p.price >= 5000 && p.price <= 10000);
//       else if (activeFilters.priceRange === "above10000")
//         filtered = filtered.filter((p) => p.price > 10000);
//     }

//     if (sortOption === "price-low") filtered.sort((a, b) => a.price - b.price);
//     else if (sortOption === "price-high")
//       filtered.sort((a, b) => b.price - a.price);
//     else if (sortOption === "newest")
//       filtered.sort((a, b) => b.newest - a.newest);
//     else if (sortOption === "popular")
//       filtered.sort((a, b) => b.popular - a.popular);

//     return filtered;
//   }

//   // ========== REPLACE THE renderProducts FUNCTION ==========

//   function renderProducts(products) {
//     if (!grid) return;
//     if (products.length === 0) {
//       grid.classList.add("hidden");
//       if (emptyState) emptyState.classList.remove("hidden");
//       if (productCountSpan) productCountSpan.innerText = "0 items";
//       return;
//     }
//     if (emptyState) emptyState.classList.add("hidden");
//     grid.classList.remove("hidden");

//     let html = "";
//     products.forEach((p) => {
//       const isWished = isInWishlist(p.id);
//       const heartIcon = isWished ? "fas fa-heart" : "far fa-heart";
//       const mrp = Math.round(p.price * 1.35);
//       const discount = Math.round(((mrp - p.price) / mrp) * 100);

//       let badge = "";
//       if (p.isCustomizable) {
//         badge =
//           '<span class="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">CUSTOMIZABLE</span>';
//       } else if (p.popular > 150) {
//         badge =
//           '<span class="absolute top-2 left-2 bg-[#e39f32] text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">BESTSELLER</span>';
//       } else if (p.newest <= 3) {
//         badge =
//           '<span class="absolute top-2 left-2 bg-[#1D3C4A] text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">NEW</span>';
//       } else if (discount >= 30) {
//         badge =
//           '<span class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">' +
//           discount +
//           "% OFF</span>";
//       }

//       // ALL products open product-detail page on click
//       const clickHandler = `onclick="window.location.href='../Product-Details/product-detail.html?id=${p.id}'"`;

//       html += `
//             <div class="bg-white border border-gray-200 rounded-xl overflow-hidden hover-scale flex flex-col shadow-sm group cursor-pointer" data-id="${p.id}" ${clickHandler}>
//                 <div class="aspect-square bg-gray-100 relative overflow-hidden">
//                     <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
//                     ${badge}
//                     <button class="wishlist-btn absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 z-20" 
//                             data-id="${p.id}" 
//                             onclick="event.stopPropagation(); window.toggleWishlistFromCard(${p.id}, this)">
//                         <i class="${heartIcon} text-lg hover:scale-110 transition-transform" style="${isWished ? "color: #e39f32;" : "color: #9ca3af;"}"></i>
//                     </button>
//                 </div>
//                 <div class="p-4 flex-1 flex flex-col">
//                     <h3 class="font-medium text-gray-800 text-sm mb-2 line-clamp-2 min-h-[40px]">${escapeHtml(p.name)}</h3>
//                     <div class="mb-3">
//                         <div class="flex items-baseline gap-2 flex-wrap">
//                             <span class="font-bold text-lg" style="color:#1D3C4A;">₹${p.price.toLocaleString()}</span>
//                             <span class="text-xs text-gray-400 line-through">₹${mrp.toLocaleString()}</span>
//                             <span class="text-xs font-semibold text-green-600">${discount}% off</span>
//                         </div>
//                     </div>
//                     <div class="flex flex-wrap gap-1 mt-2">
//                         ${p.material ? `<span class="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">${escapeHtml(p.material)}</span>` : ""}
//                         ${p.size ? `<span class="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">${escapeHtml(p.size)}</span>` : ""}
//                         ${p.isCustomizable ? '<span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">✨ Customizable</span>' : ""}
//                     </div>
//                 </div>
//                <button class="add-cart-btn mt-auto w-full bg-gray-100 hover:bg-[#1D3C4A] hover:text-white transition-all duration-300 text-gray-800 text-sm py-3 rounded-lg border border-gray-200 flex items-center justify-center gap-2 font-medium">
    
//     <i class="fas ${p.isCustomizable ? "fa-sliders-h" : "fa-shopping-cart"} text-xs" style="color:#e39f32;"></i> 
    
//     ${p.isCustomizable ? "Customize" : "Add to Cart"}

// </button>
//             </div>
//         `;
//     });

//     grid.innerHTML = html;
//   }

//   // ========== ADD ESCAPE HTML FUNCTION ==========
//   function escapeHtml(text) {
//     if (!text) return "";
//     const div = document.createElement("div");
//     div.textContent = text;
//     return div.innerHTML;
//   }

//   // ========== FILTER UI BUILDING ==========
//   function buildFilterUI() {
//     if (!desktopFilterDiv) return;
//     const catProducts = allProducts.filter((p) => p.subcategory === currentSub);
//     const materials = [
//       ...new Set(catProducts.map((p) => p.material).filter(Boolean)),
//     ];
//     const colors = [
//       ...new Set(catProducts.map((p) => p.color).filter(Boolean)),
//     ];
//     const sizes = [...new Set(catProducts.map((p) => p.size).filter(Boolean))];
//     const styles = [
//       ...new Set(catProducts.map((p) => p.style).filter(Boolean)),
//     ];

//     let html = `<div class="space-y-4">`;
//     html += `<div class="filter-section border-b border-gray-100 pb-3">
//       <button class="filter-toggle flex items-center justify-between w-full text-left mb-2 group" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180');">
//         <h4 class="font-medium text-sm" style="color:#1D3C4A;">Price Range</h4>
//         <i class="fas fa-chevron-down text-xs transition-transform duration-300" style="color:#e39f32;"></i>
//       </button>
//       <div class="filter-options">
//         <select id="priceRangeSelect" class="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50 focus:border-[#e39f32] focus:ring-1 focus:ring-[#e39f32] outline-none transition">
//           <option value="">All prices</option>
//           <option value="under2000">Under ₹2,000</option>
//           <option value="2000-5000">₹2,000 - ₹5,000</option>
//           <option value="5000-10000">₹5,000 - ₹10,000</option>
//           <option value="above10000">Above ₹10,000</option>
//         </select>
//       </div>
//     </div>`;

//     if (materials.length) {
//       html += `<div class="filter-section border-b border-gray-100 pb-3">
//         <button class="filter-toggle flex items-center justify-between w-full text-left mb-2 group" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180');">
//           <h4 class="font-medium text-sm" style="color:#1D3C4A;">Material</h4>
//           <i class="fas fa-chevron-down text-xs transition-transform duration-300" style="color:#e39f32;"></i>
//         </button>
//         <div class="filter-options space-y-2">`;
//       materials.forEach((m) => {
//         const count = catProducts.filter((p) => p.material === m).length;
//         const isActive = activeFilters.material === m;
//         html += `<label class="flex items-center justify-between text-sm mb-2 cursor-pointer group hover:bg-gray-50 p-1 rounded transition-colors">
//           <div class="flex items-center gap-2">
//             <input type="radio" name="material" value="${m}" ${isActive ? "checked" : ""} class="w-4 h-4 accent-[#e39f32] cursor-pointer">
//             <span class="${isActive ? "text-[#e39f32] font-medium" : "text-gray-600"} group-hover:text-[#1D3C4A] transition-colors">${m}</span>
//           </div>
//           <span class="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">${count}</span>
//         </label>`;
//       });
//       html += `</div></div>`;
//     }

//     if (styles.length) {
//       html += `<div class="filter-section border-b border-gray-100 pb-3">
//         <button class="filter-toggle flex items-center justify-between w-full text-left mb-2 group" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180');">
//           <h4 class="font-medium text-sm" style="color:#1D3C4A;">Style</h4>
//           <i class="fas fa-chevron-down text-xs transition-transform duration-300" style="color:#e39f32;"></i>
//         </button>
//         <div class="filter-options space-y-2">`;
//       styles.forEach((s) => {
//         const count = catProducts.filter((p) => p.style === s).length;
//         const isActive = activeFilters.style === s;
//         html += `<label class="flex items-center justify-between text-sm mb-2 cursor-pointer group hover:bg-gray-50 p-1 rounded transition-colors">
//           <div class="flex items-center gap-2">
//             <input type="radio" name="style" value="${s}" ${isActive ? "checked" : ""} class="w-4 h-4 accent-[#e39f32] cursor-pointer">
//             <span class="${isActive ? "text-[#e39f32] font-medium" : "text-gray-600"} group-hover:text-[#1D3C4A] transition-colors">${s}</span>
//           </div>
//           <span class="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">${count}</span>
//         </label>`;
//       });
//       html += `</div></div>`;
//     }

//     if (colors.length) {
//       html += `<div class="filter-section border-b border-gray-100 pb-3">
//         <button class="filter-toggle flex items-center justify-between w-full text-left mb-2 group" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180');">
//           <h4 class="font-medium text-sm" style="color:#1D3C4A;">Color</h4>
//           <i class="fas fa-chevron-down text-xs transition-transform duration-300" style="color:#e39f32;"></i>
//         </button>
//         <div class="filter-options space-y-2">`;
//       colors.forEach((c) => {
//         const count = catProducts.filter((p) => p.color === c).length;
//         const isActive = activeFilters.color === c;
//         const colorSwatch = c.toLowerCase().includes("gold")
//           ? "#e39f32"
//           : c.toLowerCase().includes("brown")
//             ? "#8B4513"
//             : c.toLowerCase().includes("black")
//               ? "#000000"
//               : c.toLowerCase().includes("white")
//                 ? "#FFFFFF"
//                 : c.toLowerCase().includes("blue")
//                   ? "#0000FF"
//                   : c.toLowerCase().includes("green")
//                     ? "#008000"
//                     : c.toLowerCase().includes("red")
//                       ? "#FF0000"
//                       : "#CCCCCC";
//         html += `<label class="flex items-center justify-between text-sm mb-2 cursor-pointer group hover:bg-gray-50 p-1 rounded transition-colors">
//           <div class="flex items-center gap-2">
//             <input type="radio" name="color" value="${c}" ${isActive ? "checked" : ""} class="w-4 h-4 accent-[#e39f32] cursor-pointer">
//             <span class="w-3 h-3 rounded-full border border-gray-200" style="background: ${colorSwatch};"></span>
//             <span class="${isActive ? "text-[#e39f32] font-medium" : "text-gray-600"} group-hover:text-[#1D3C4A] transition-colors">${c}</span>
//           </div>
//           <span class="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">${count}</span>
//         </label>`;
//       });
//       html += `</div></div>`;
//     }

//     if (sizes.length) {
//       html += `<div class="filter-section border-b border-gray-100 pb-3">
//         <button class="filter-toggle flex items-center justify-between w-full text-left mb-2 group" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('i').classList.toggle('rotate-180');">
//           <h4 class="font-medium text-sm" style="color:#1D3C4A;">Size</h4>
//           <i class="fas fa-chevron-down text-xs transition-transform duration-300" style="color:#e39f32;"></i>
//         </button>
//         <div class="filter-options space-y-2">`;
//       sizes.forEach((s) => {
//         const count = catProducts.filter((p) => p.size === s).length;
//         const isActive = activeFilters.size === s;
//         html += `<label class="flex items-center justify-between text-sm mb-2 cursor-pointer group hover:bg-gray-50 p-1 rounded transition-colors">
//           <div class="flex items-center gap-2">
//             <input type="radio" name="size" value="${s}" ${isActive ? "checked" : ""} class="w-4 h-4 accent-[#e39f32] cursor-pointer">
//             <span class="${isActive ? "text-[#e39f32] font-medium" : "text-gray-600"} group-hover:text-[#1D3C4A] transition-colors">${s}</span>
//           </div>
//           <span class="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">${count}</span>
//         </label>`;
//       });
//       html += `</div></div>`;
//     }

//     desktopFilterDiv.innerHTML = html;
//     if (mobileFilterContent) mobileFilterContent.innerHTML = html;
//     document
//       .querySelectorAll(".filter-options")
//       .forEach((section) => section.classList.remove("hidden"));
//   }

//   function readFilters() {
//     const materialRadio = document.querySelector(
//       'input[name="material"]:checked',
//     );
//     const styleRadio = document.querySelector('input[name="style"]:checked');
//     const colorRadio = document.querySelector('input[name="color"]:checked');
//     const sizeRadio = document.querySelector('input[name="size"]:checked');
//     const priceSelect = document.getElementById("priceRangeSelect");
//     activeFilters.material = materialRadio ? materialRadio.value : null;
//     activeFilters.style = styleRadio ? styleRadio.value : null;
//     activeFilters.color = colorRadio ? colorRadio.value : null;
//     activeFilters.size = sizeRadio ? sizeRadio.value : null;
//     activeFilters.priceRange = priceSelect ? priceSelect.value : null;
//   }

//   function applyFiltersAndRender() {
//     readFilters();
//     const filtered = getFilteredProducts();
//     renderProducts(filtered);
//     if (mobileDrawer) {
//       mobileDrawer.classList.add("opacity-0", "pointer-events-none");
//       const drawerDiv = document.querySelector("#mobileFilterDrawer > div");
//       if (drawerDiv) drawerDiv.classList.remove("drawer-open");
//     }
//   }

//   function resetFilters() {
//     activeFilters = {
//       material: null,
//       style: null,
//       color: null,
//       size: null,
//       shape: null,
//       setPieces: null,
//       priceRange: null,
//     };
//     buildFilterUI();
//     applyFiltersAndRender();
//   }

//   function showToast(msg, type = "success") {
//     if (!toast) return;
//     toast.querySelector("span").innerText = msg;
//     toast.classList.add("show");
//     setTimeout(() => toast.classList.remove("show"), 2000);
//   }

//   function initPage() {
//     renderSubcategoryTabs();
//     updateCategoryHeader(currentSub);
//     if (skeleton) {
//       let skeletonHtml = "";
//       for (let i = 0; i < 8; i++)
//         skeletonHtml += '<div class="skeleton-pulse rounded-xl h-64"></div>';
//       skeleton.innerHTML = skeletonHtml;
//     }
//     buildFilterUI();
//     setTimeout(function () {
//       if (skeleton) skeleton.style.display = "none";
//       const filtered = getFilteredProducts();
//       renderProducts(filtered);
//     }, 400);
//   }

//   // ========== EVENT LISTENERS ==========
//   if (applyFiltersBtn)
//     applyFiltersBtn.addEventListener("click", applyFiltersAndRender);
//   if (resetFiltersBtn) resetFiltersBtn.addEventListener("click", resetFilters);
//   if (emptyReset) emptyReset.addEventListener("click", resetFilters);
//   if (sortSelect)
//     sortSelect.addEventListener("change", function (e) {
//       sortOption = e.target.value;
//       applyFiltersAndRender();
//     });
//   if (mobileToggle && mobileDrawer)
//     mobileToggle.addEventListener("click", function () {
//       mobileDrawer.classList.remove("opacity-0", "pointer-events-none");
//       const drawerDiv = document.querySelector("#mobileFilterDrawer > div");
//       if (drawerDiv) drawerDiv.classList.add("drawer-open");
//     });
//   if (closeMobile && mobileDrawer)
//     closeMobile.addEventListener("click", function () {
//       mobileDrawer.classList.add("opacity-0", "pointer-events-none");
//       const drawerDiv = document.querySelector("#mobileFilterDrawer > div");
//       if (drawerDiv) drawerDiv.classList.remove("drawer-open");
//     });
//   if (mobileApply)
//     mobileApply.addEventListener("click", function () {
//       const material = document.querySelector(
//         '#mobileFilterContent input[name="material"]:checked',
//       );
//       const style = document.querySelector(
//         '#mobileFilterContent input[name="style"]:checked',
//       );
//       const color = document.querySelector(
//         '#mobileFilterContent input[name="color"]:checked',
//       );
//       const size = document.querySelector(
//         '#mobileFilterContent input[name="size"]:checked',
//       );
//       const price = document.querySelector(
//         "#mobileFilterContent #priceRangeSelect",
//       );
//       activeFilters.material = material ? material.value : null;
//       activeFilters.style = style ? style.value : null;
//       activeFilters.color = color ? color.value : null;
//       activeFilters.size = size ? size.value : null;
//       activeFilters.priceRange = price ? price.value : null;
//       buildFilterUI();
//       applyFiltersAndRender();
//     });

//   // ========== MAKE GLOBAL FUNCTIONS AVAILABLE ==========
//   window.openCustomizationOverlay = openCustomizationOverlay;
//   window.closeCustomizationOverlay = closeCustomizationOverlay;
//   window.selectCustomizationOption = selectCustomizationOption;
//   window.addCustomizedToCart = addCustomizedToCart;
//   window.buyCustomizedNow = buyCustomizedNow;
//   window.toggleWishlistFromCard = function (productId, btn) {
//     event.stopPropagation();
//     toggleWishlistGlobal(productId, btn);
//   };
//   window.handleQuickAddToCart = function (productId, isCustomizable) {
//     addToCartGlobal(productId, isCustomizable);
//   };

//   // Add CSS styles
//   const style = document.createElement("style");
//   style.textContent = `
//     .filter-section .filter-options { transition: all 0.3s ease; }
//     .filter-section .filter-toggle:hover h4 { color: #e39f32 !important; }
//     .filter-section input[type="radio"] { transition: all 0.2s ease; }
//     .filter-section input[type="radio"]:checked + span { color: #e39f32 !important; font-weight: 500; }
//     .rotate-180 { transform: rotate(180deg); }
//     .wishlist-active { color: #e39f32 !important; }
//   `;
//   document.head.appendChild(style);

//   // Start loading products
//   loadProducts();
// })();
