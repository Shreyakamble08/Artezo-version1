/**
 * Handles cart display, quantity updates, and checkout
 */

// Global variables
let cartService = null;
let productsData = [];
let isInitialized = false;
let initAttempts = 0;
const MAX_INIT_ATTEMPTS = 10;

// DOM elements
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartLoading = document.getElementById("cart-loading");
const emptyCartMessage = document.getElementById("emptyCartMessage");
const cartContent = document.getElementById("cartContent");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartShipping = document.getElementById("cartShipping");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const applyCouponBtn = document.getElementById("applyCouponBtn");
const couponCodeInput = document.getElementById("couponCode");
const couponMessage = document.getElementById("couponMessage");
const recommendedSection = document.getElementById("recommendedSection");
const recommendedGrid = document.getElementById("recommendedGrid");

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
    console.log("[Cart] DOM ready, initializing...");
    initCartPage();
});

/**
 * Initialize cart page with retry logic
 */
function initCartPage() {
    if (isInitialized) return;

    if (initAttempts >= MAX_INIT_ATTEMPTS) {
        console.error(
            "[Cart] Max initialization attempts reached, showing fallback",
        );
        showFallbackMessage();
        return;
    }

    initAttempts++;

    try {
        if (typeof window.getCartWishlistService !== "undefined") {
            cartService = window.getCartWishlistService();
        } else if (typeof getCartWishlistService !== "undefined") {
            cartService = getCartWishlistService();
        }

        if (cartService && typeof cartService.getCartItems === "function") {
            console.log("[Cart] Service found, loading cart");

            if (typeof cartService.onCartChange === "function") {
                cartService.onCartChange(function (data) {
                    console.log("[Cart] Cart updated, re-rendering");
                    renderCart();
                });
            }

            renderCart();
        } else {
            console.log(
                "[Cart] Waiting for service... (attempt " + initAttempts + ")",
            );
            setTimeout(initCartPage, 500);
        }
    } catch (error) {
        console.error("[Cart] Error initializing cart page:", error);
        setTimeout(initCartPage, 500);
    }
}

/**
 * Render cart with items
 */
function renderCart() {
    try {
        if (!cartService) {
            console.error("[Cart] Cart service not available for rendering");
            showFallbackMessage();
            return;
        }

        const cartItems = cartService.getCartItems();
        console.log("[Cart] Cart items:", cartItems);

        if (cartLoading) cartLoading.classList.add("hidden");

        if (!cartItems || cartItems.length === 0) {
            if (emptyCartMessage) emptyCartMessage.classList.remove("hidden");
            if (cartContent) cartContent.classList.add("hidden");
            if (recommendedSection) recommendedSection.classList.add("hidden");
            updateCartSummary();
            return;
        }

        if (emptyCartMessage) emptyCartMessage.classList.add("hidden");
        if (cartContent) cartContent.classList.remove("hidden");

        let cartHtml = "";

        for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            const itemId = item.id || item.productId;
            const itemName =
                item.name || item.titleName || item.productName || "Product";
            // CRITICAL: Use finalPrice for customized products, otherwise use regular price
            const itemPrice = item.finalPrice || item.unitPrice || item.price || 0;
            const itemQuantity = item.quantity || 1;
            const subtotal = itemPrice * itemQuantity;
            const mrp = Math.round(itemPrice * 1.35);
            const discount = Math.round(((mrp - itemPrice) / mrp) * 100);

            // cart cards ui changes
            cartHtml += `
<div class="cart-item bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300">                 <div class="flex flex-col md:flex-row gap-4 md:gap-5">
                        <!-- Product Image -->
                       <div class="w-full md:w-24 flex-shrink-0">
    <div class="w-full h-52 sm:h-64 md:h-24 bg-gray-100 rounded-xl overflow-hidden">
        <img src="${item.image || "https://placehold.co/400x300/e2e8f0/475569?text=Product"}"
             alt="${escapeHtml(itemName)}"
             class="w-full h-full object-cover"
             onerror="this.src='https://placehold.co/400x300/e2e8f0/475569?text=Product'">
    </div>
</div>
                        
                        <!-- Product Details -->
                        <div class="flex-grow">
                            <div class="flex flex-col md:flex-row justify-between gap-4">
                                <div class="flex-grow">
                                    <h3 class="font-semibold text-gray-800 mb-1 line-clamp-2">${escapeHtml(itemName)}</h3>
                                    ${item.selectedColor ? `<p class="text-sm text-gray-500">Color: ${escapeHtml(item.selectedColor)}</p>` : ""}
                                    ${item.selectedSize ? `<p class="text-sm text-gray-500">Size: ${escapeHtml(item.selectedSize)}</p>` : ""}
                                    ${item.sku ? `<p class="text-xs text-gray-400 mt-1">SKU: ${escapeHtml(item.sku)}</p>` : ""}
                                    ${item.isCustomized ? `<p class="text-xs text-purple-600 mt-1"><i class="fas fa-magic"></i> Customized Item</p>` : ""}
                                </div>
                                
                                <!-- Price -->
                               <div class="flex items-center justify-between md:block md:text-right">
                                    <div class="font-bold text-lg" style="color:#1D3C4A;">₹${itemPrice.toLocaleString()}</div>
                                    <div class="text-xs text-gray-400 line-through">₹${mrp.toLocaleString()}</div>
                                    ${discount > 0 ? `<div class="text-xs text-green-600">${discount}% off</div>` : ""}
                                </div>
                            </div>
                            
                            <!-- Customization Details (for customized products) -->
                            ${item.isCustomized && item.customization
                    ? `
                                <div class="mt-2 text-xs text-gray-500 border-t border-gray-100 pt-2">
                                    <details>
                                        <summary class="cursor-pointer text-purple-600 hover:text-purple-700 font-medium">
                                            <i class="fas fa-sliders-h mr-1"></i>Customization Details ▼
                                        </summary>
                                        <div class="mt-2 space-y-1 pl-2">
                                            ${item.customization.size ? `<div class="flex justify-between"><span class="text-gray-500">Size:</span> <span class="text-gray-700">${escapeHtml(item.customization.size)}</span></div>` : ""}
                                            ${item.customization.frameColor ? `<div class="flex justify-between"><span class="text-gray-500">Frame Color:</span> <span class="text-gray-700">${escapeHtml(item.customization.frameColor)}</span></div>` : ""}
                                            ${item.customization.frameMaterial ? `<div class="flex justify-between"><span class="text-gray-500">Frame Material:</span> <span class="text-gray-700">${escapeHtml(item.customization.frameMaterial)}</span></div>` : ""}
                                            ${item.customization.glassType ? `<div class="flex justify-between"><span class="text-gray-500">Glass Type:</span> <span class="text-gray-700">${escapeHtml(item.customization.glassType)}</span></div>` : ""}
                                            ${item.customization.font ? `<div class="flex justify-between"><span class="text-gray-500">Font:</span> <span class="text-gray-700">${escapeHtml(item.customization.font)}</span></div>` : ""}
                                            ${item.customization.finish ? `<div class="flex justify-between"><span class="text-gray-500">Finish:</span> <span class="text-gray-700">${escapeHtml(item.customization.finish)}</span></div>` : ""}
                                            ${item.customization.shape ? `<div class="flex justify-between"><span class="text-gray-500">Shape:</span> <span class="text-gray-700">${escapeHtml(item.customization.shape)}</span></div>` : ""}
                                            ${item.customization.ledColor ? `<div class="flex justify-between"><span class="text-gray-500">LED Color:</span> <span class="text-gray-700">${escapeHtml(item.customization.ledColor)}</span></div>` : ""}
                                            ${item.customization.engraving
                        ?.enabled &&
                        item.customization.engraving.text
                        ? `
                                                <div class="flex justify-between"><span class="text-gray-500">Engraving:</span> <span class="text-gray-700 italic">"${escapeHtml(item.customization.engraving.text)}"</span></div>
                                            `
                        : ""
                    }
                                            ${item.customization.matBoard
                        ?.enabled &&
                        item.customization.matBoard.color
                        ? `
                                                <div class="flex justify-between"><span class="text-gray-500">Mat Board:</span> <span class="text-gray-700">${escapeHtml(item.customization.matBoard.color)}</span></div>
                                            `
                        : ""
                    }
                                            ${item.customization.addIcon
                        ?.enabled &&
                        item.customization.addIcon.icon
                        ? `
                                                <div class="flex justify-between"><span class="text-gray-500">Icon:</span> <span class="text-gray-700">${escapeHtml(item.customization.addIcon.icon)}</span></div>
                                            `
                        : ""
                    }
                                            ${item.customization.customMessage
                        ?.enabled &&
                        item.customization.customMessage
                            .text
                        ? `
                                                <div class="flex justify-between"><span class="text-gray-500">Message:</span> <span class="text-gray-700 italic">"${escapeHtml(item.customization.customMessage.text)}"</span></div>
                                            `
                        : ""
                    }
                                            ${item.customization.canvasType ? `<div class="flex justify-between"><span class="text-gray-500">Canvas Type:</span> <span class="text-gray-700">${escapeHtml(item.customization.canvasType)}</span></div>` : ""}
                                            ${item.customization.borderStyle ? `<div class="flex justify-between"><span class="text-gray-500">Border Style:</span> <span class="text-gray-700">${escapeHtml(item.customization.borderStyle)}</span></div>` : ""}
                                            ${item.customization.paperType ? `<div class="flex justify-between"><span class="text-gray-500">Paper Type:</span> <span class="text-gray-700">${escapeHtml(item.customization.paperType)}</span></div>` : ""}
                                        </div>
                                        <div class="mt-2 pt-1 border-t border-gray-100">
                                            <div class="flex justify-between font-medium">
                                                <span>Customization Cost:</span>
                                                <span class="text-purple-600">+₹${(itemPrice - (item.basePrice || itemPrice)).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </details>
                                </div>
                            `
                    : ""
                }
                            
                            <!-- Quantity and Actions -->
                           <div class="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mt-4 pt-4 border-t border-gray-100">
                                <div class="flex items-center gap-3">
                                    <button class="quantity-decrease w-8 h-8 rounded-full border border-gray-300 hover:border-accent hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center"
                                            data-id="${itemId}">
                                        <i class="fas fa-minus text-xs"></i>
                                    </button>
                                    <span class="quantity-value w-12 text-center font-medium">${itemQuantity}</span>
                                    <button class="quantity-increase w-8 h-8 rounded-full border border-gray-300 hover:border-accent hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center"
                                            data-id="${itemId}">
                                        <i class="fas fa-plus text-xs"></i>
                                    </button>
                                </div>
                                
                               <div class="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                                    <span class="font-semibold" style="color:#1D3C4A;">₹${subtotal.toLocaleString()}</span>
                                    <button class="remove-item text-gray-400 hover:text-red-500 transition-colors"
                                            data-id="${itemId}">
                                        <i class="far fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = cartHtml;
        }

        attachCartEventListeners();
        updateCartSummary();
        loadRecommendedProducts();

        isInitialized = true;
    } catch (error) {
        console.error("[Cart] Error rendering cart:", error);
        showFallbackMessage();
    }
}

/**
 * Attach event listeners to cart items
 */
function attachCartEventListeners() {
    try {
        document.querySelectorAll(".quantity-decrease").forEach((btn) => {
            btn.removeEventListener("click", handleQuantityDecrease);
            btn.addEventListener("click", handleQuantityDecrease);
        });

        document.querySelectorAll(".quantity-increase").forEach((btn) => {
            btn.removeEventListener("click", handleQuantityIncrease);
            btn.addEventListener("click", handleQuantityIncrease);
        });

        document.querySelectorAll(".remove-item").forEach((btn) => {
            btn.removeEventListener("click", handleRemoveItem);
            btn.addEventListener("click", handleRemoveItem);
        });
    } catch (error) {
        console.error("[Cart] Error attaching event listeners:", error);
    }
}

/**
 * Handle quantity decrease
 */
function handleQuantityDecrease(event) {
    event.preventDefault();
    event.stopPropagation();

    const button = event.currentTarget;
    const productId = parseInt(button.getAttribute("data-id"));
    const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
    const quantitySpan = cartItem?.querySelector(".quantity-value");
    let currentQuantity = parseInt(quantitySpan?.innerText || 1);

    if (currentQuantity > 1) {
        const newQuantity = currentQuantity - 1;
        if (cartService && typeof cartService.updateCartQuantity === "function") {
            const result = cartService.updateCartQuantity(productId, newQuantity);
            if (result && result.success) {
                renderCart();
                showToast("Quantity updated", "success");
            } else {
                console.error("[Cart] Failed to update quantity:", result?.message);
                showToast(result?.message || "Failed to update quantity", "error");
            }
        } else {
            updateCartQuantityFallback(productId, newQuantity);
        }
    }
}

/**
 * Handle quantity increase
 */
function handleQuantityIncrease(event) {
    event.preventDefault();
    event.stopPropagation();

    const button = event.currentTarget;
    const productId = parseInt(button.getAttribute("data-id"));
    const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
    const quantitySpan = cartItem?.querySelector(".quantity-value");
    let currentQuantity = parseInt(quantitySpan?.innerText || 1);

    const newQuantity = currentQuantity + 1;
    if (cartService && typeof cartService.updateCartQuantity === "function") {
        const result = cartService.updateCartQuantity(productId, newQuantity);
        if (result && result.success) {
            renderCart();
            showToast("Quantity updated", "success");
        } else {
            console.error("[Cart] Failed to update quantity:", result?.message);
            showToast(result?.message || "Failed to update quantity", "error");
        }
    } else {
        updateCartQuantityFallback(productId, newQuantity);
    }
}

/**
 * Handle remove item
 */
function handleRemoveItem(event) {
    event.preventDefault();
    event.stopPropagation();

    const button = event.currentTarget;
    const productId = parseInt(button.getAttribute("data-id"));

    if (cartService && typeof cartService.removeFromCart === "function") {
        const result = cartService.removeFromCart(productId);
        if (result && result.success) {
            renderCart();
            showToast("Item removed from cart", "info");
        } else {
            console.error("[Cart] Failed to remove item:", result?.message);
            showToast(result?.message || "Failed to remove item", "error");
        }
    } else {
        removeFromCartFallback(productId);
    }
}

/**
 * Update cart quantity fallback (direct localStorage)
 */
function updateCartQuantityFallback(productId, newQuantity) {
    try {
        let cart = JSON.parse(localStorage.getItem("artezocart")) || {
            items: [],
            total: 0,
            count: 0,
        };
        const itemIndex = cart.items.findIndex(
            (item) => item.id === productId || item.productId === productId,
        );

        if (itemIndex !== -1) {
            cart.items[itemIndex].quantity = newQuantity;
            // Recalculate totals
            cart.total = cart.items.reduce((sum, item) => {
                const price = item.finalPrice || item.unitPrice || item.price || 0;
                return sum + price * (item.quantity || 1);
            }, 0);
            cart.count = cart.items.reduce(
                (sum, item) => sum + (item.quantity || 1),
                0,
            );
            localStorage.setItem("artezocart", JSON.stringify(cart));
            renderCart();
            showToast("Quantity updated", "success");
        }
    } catch (error) {
        console.error("[Cart] Fallback update quantity error:", error);
        showToast("Error updating quantity", "error");
    }
}

/**
 * Remove from cart fallback (direct localStorage)
 */
function removeFromCartFallback(productId) {
    try {
        let cart = JSON.parse(localStorage.getItem("artezocart")) || {
            items: [],
            total: 0,
            count: 0,
        };
        cart.items = cart.items.filter(
            (item) => item.id !== productId && item.productId !== productId,
        );
        // Recalculate totals
        cart.total = cart.items.reduce((sum, item) => {
            const price = item.finalPrice || item.unitPrice || item.price || 0;
            return sum + price * (item.quantity || 1);
        }, 0);
        cart.count = cart.items.reduce(
            (sum, item) => sum + (item.quantity || 1),
            0,
        );
        localStorage.setItem("artezocart", JSON.stringify(cart));
        renderCart();
        showToast("Item removed from cart", "info");
    } catch (error) {
        console.error("[Cart] Fallback remove error:", error);
        showToast("Error removing item", "error");
    }
}

/**
 * Update cart summary (subtotal, total, etc.)
 */
function updateCartSummary() {
    try {
        if (!cartService) return;

        const subtotal = cartService.getCartTotal();
        const shipping = subtotal > 0 ? (subtotal > 999 ? 0 : 99) : 0;
        const total = subtotal + shipping;
        const itemCount = cartService.getCartCount();

        console.log(
            `[Cart] Summary - Subtotal: ₹${subtotal}, Shipping: ${shipping === 0 ? "FREE" : "₹" + shipping}, Total: ₹${total}`,
        );

        if (cartSubtotal) {
            cartSubtotal.innerText = `₹${subtotal.toLocaleString()}`;
        }

        if (cartShipping) {
            if (shipping === 0 && subtotal > 0) {
                cartShipping.innerText = "FREE";
                cartShipping.classList.add("text-green-600");
                cartShipping.classList.remove("text-gray-500");
            } else if (subtotal === 0) {
                cartShipping.innerText = "Calculating...";
            } else {
                cartShipping.innerText = `₹${shipping.toLocaleString()}`;
                cartShipping.classList.remove("text-green-600");
                cartShipping.classList.add("text-gray-500");
            }
        }

        if (cartTotal) {
            cartTotal.innerText = `₹${total.toLocaleString()}`;
        }

        // Update cart count in header if needed
        const cartCountBadge = document.getElementById("cart-count-badge");
        if (cartCountBadge) {
            cartCountBadge.textContent = itemCount;
            cartCountBadge.style.display = itemCount > 0 ? "flex" : "none";
        }
    } catch (error) {
        console.error("[Cart] Error updating cart summary:", error);
    }
}

/**
 * Load recommended products
 */
function loadRecommendedProducts() {
    try {
        if (!recommendedSection || !recommendedGrid) return;

        // Get recommended products from ProductDatabase if available
        let recommendedProducts = [];

        if (
            window.ProductDatabase &&
            window.ProductDatabase.getRecommendedProducts
        ) {
            recommendedProducts = window.ProductDatabase.getRecommendedProducts(4);
        } else {
            // Fallback recommended products
            recommendedProducts = [
                {
                    id: 101,
                    name: "Rustic Wooden Wall Clock",
                    price: 1299,
                    image:
                        "https://i.etsystatic.com/18909544/r/il/4d908c/7682769240/il_1588xN.7682769240_b8zb.jpg",
                },
                {
                    id: 103,
                    name: "Emerald Gold Geode Resin Wall Clock",
                    price: 899,
                    image:
                        "https://i.etsystatic.com/32365247/r/il/38d2e1/7626635886/il_1588xN.7626635886_9ong.jpg",
                },
                {
                    id: 201,
                    name: "Mughal Floral Arch Print",
                    price: 4299,
                    image:
                        "https://i.etsystatic.com/24426965/r/il/1a2154/7320284410/il_1588xN.7320284410_9gj3.jpg",
                },
                {
                    id: 501,
                    name: "Goldfern Metal Wall Accent",
                    price: 3499,
                    image:
                        "https://cdn.shopify.com/s/files/1/0632/2526/6422/files/9100000045771_6.jpg?v=1771489110&width=4320",
                },
            ];
        }

        let recHtml = "";
        recommendedProducts.forEach((product) => {
            recHtml += `
                <div class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group" onclick="viewProductDetails(${product.id})">
                    <div class="aspect-square bg-gray-100 overflow-hidden">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    </div>
                    <div class="p-3">
                        <h3 class="text-sm font-medium text-gray-800 line-clamp-2">${escapeHtml(product.name)}</h3>
                        <div class="mt-2 font-bold" style="color:#1D3C4A;">₹${product.price.toLocaleString()}</div>
                        <button class="mt-2 w-full text-xs bg-gray-100 hover:bg-primary hover:text-white py-1.5 rounded transition" onclick="event.stopPropagation(); addToCartFromRecommended(${product.id})">
                            <i class="fas fa-cart-plus mr-1"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;
        });

        recommendedGrid.innerHTML = recHtml;
        recommendedSection.classList.remove("hidden");
    } catch (error) {
        console.error("[Cart] Error loading recommended products:", error);
    }
}

/**
 * Add product from recommended section
 */
window.addToCartFromRecommended = function (productId) {
    if (window.ProductDatabase) {
        const product = window.ProductDatabase.getProductById(productId);
        if (product && cartService) {
            const cartProduct = {
                id: product.id,
                productId: product.id,
                name: product.name,
                productName: product.name,
                price: product.price,
                unitPrice: product.price,
                image: product.image,
                quantity: 1,
                material: product.material,
                color: product.color,
                size: product.size,
            };
            const result = cartService.addToCart(cartProduct, 1);
            if (result && result.success) {
                showToast("Added to cart!", "success");
                renderCart();
            } else {
                showToast(result?.message || "Error adding to cart", "error");
            }
        }
    }
};

/**
 * View product details
 */
window.viewProductDetails = function (productId) {
    window.location.href = `../Product-Details/product-detail.html?id=${productId}`;
};

/**
 * Show fallback message when cart fails to load
 */
function showFallbackMessage() {
    if (cartLoading) cartLoading.classList.add("hidden");
    if (emptyCartMessage) {
        emptyCartMessage.classList.remove("hidden");
        const emptyStateDiv = emptyCartMessage.querySelector("div");
        if (emptyStateDiv && !emptyStateDiv.querySelector(".retry-button")) {
            const retryButton = document.createElement("button");
            retryButton.innerText = "Retry Loading Cart";
            retryButton.className =
                "mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition";
            retryButton.onclick = () => {
                initAttempts = 0;
                initCartPage();
            };
            retryButton.classList.add("retry-button");
            emptyStateDiv.appendChild(retryButton);
        }
    }
    if (cartContent) cartContent.classList.add("hidden");
    if (recommendedSection) recommendedSection.classList.add("hidden");
}

/**
 * Show toast notification
 */
function showToast(message, type = "success") {
    let toast = document.getElementById("toast-notification");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-notification";
        toast.className =
            "fixed bottom-6 right-6 transform translate-y-0 transition-all duration-300 z-50";
        document.body.appendChild(toast);
    }

    const bgColor =
        type === "success"
            ? "bg-green-500"
            : type === "error"
                ? "bg-red-500"
                : "bg-primary";
    const icon =
        type === "success"
            ? "fa-check-circle"
            : type === "error"
                ? "fa-exclamation-circle"
                : "fa-info-circle";

    toast.innerHTML = `
        <div class="${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[200px] animate-slide-in">
            <i class="fa-solid ${icon}"></i>
            <span class="text-sm">${escapeHtml(message)}</span>
        </div>
    `;
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
        toast.innerHTML = "";
    }, 3000);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Handle checkout
 */
function handleCheckout() {
    try {
        if (!cartService || cartService.getCartCount() === 0) {
            showToast("Your cart is empty", "error");
            return;
        }
        window.location.href = "../Checkout/checkout.html";
    } catch (error) {
        console.error("[Cart] Error during checkout:", error);
        showToast("Error during checkout. Please try again.", "error");
    }
}

/**
 * Apply coupon code
 */
function applyCoupon() {
    const code = couponCodeInput?.value.trim().toUpperCase();
    if (!code) {
        showToast("Please enter a coupon code", "error");
        return;
    }

    const coupons = {
        WELCOME10: {
            discount: 10,
            type: "percentage",
            message: "10% off applied!",
        },
        SAVE50: { discount: 50, type: "fixed", message: "₹50 off applied!" },
        FREESHIP: {
            discount: 0,
            type: "free_shipping",
            message: "Free shipping applied!",
        },
        ARTEZO20: { discount: 20, type: "percentage", message: "20% off applied!" },
    };

    if (coupons[code]) {
        const coupon = coupons[code];
        if (couponMessage) {
            couponMessage.textContent = coupon.message;
            couponMessage.classList.remove("hidden", "text-red-500");
            couponMessage.classList.add("text-green-600");
            setTimeout(() => {
                couponMessage.classList.add("hidden");
            }, 3000);
        }
        showToast(coupon.message, "success");

        // Store applied coupon in localStorage
        localStorage.setItem("appliedCoupon", JSON.stringify(coupon));
        updateCartSummary();
    } else {
        if (couponMessage) {
            couponMessage.textContent = "Invalid coupon code";
            couponMessage.classList.remove("hidden", "text-green-600");
            couponMessage.classList.add("text-red-500");
            setTimeout(() => {
                couponMessage.classList.add("hidden");
            }, 3000);
        }
        showToast("Invalid coupon code", "error");
    }
}

// Set up event listeners
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", handleCheckout);
}
if (applyCouponBtn) {
    applyCouponBtn.addEventListener("click", applyCoupon);
}
if (couponCodeInput) {
    couponCodeInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") applyCoupon();
    });
}

// Listen for cart service ready event
window.addEventListener("cartServiceReady", function () {
    console.log("[Cart] Cart service ready event received");
    initAttempts = 0;
    initCartPage();
});

// Listen for storage events (when cart changes in another tab)
window.addEventListener("storage", function (e) {
    if (e.key === "artezocart") {
        console.log("[Cart] Storage event detected, reloading cart");
        if (cartService) {
            cartService.loadCart();
            renderCart();
        }
    }
});

// Add animation styles
function addAnimationStyles() {
    if (document.getElementById("cart-animation-styles")) return;

    const style = document.createElement("style");
    style.id = "cart-animation-styles";
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .animate-slide-in {
            animation: slideIn 0.3s ease-out;
        }
        details summary {
            list-style: none;
        }
        details summary::-webkit-details-marker {
            display: none;
        }
        details summary {
            cursor: pointer;
        }
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

addAnimationStyles();

console.log("[Cart] Cart page script loaded");
