(function () {
  // Ensure data is loaded from data.js (window.artezoData)
  // Wait for DOM and data to be ready
  function init() {
    if (!window.artezoData) {
      console.warn("Waiting for data.js to load...");
      setTimeout(init, 50);
      return;
    }
    renderApp();
    attachAllDynamicScripts();
  }

  function renderApp() {
    const data = window.artezoData;
    const root = document.getElementById("app-root");
    if (!root) return;

    // Build entire HTML structure using static data
   root.innerHTML = `
  <!-- Add global styles to fix spacing issues -->
  <style>
    /* Fix for service section background */
    .service-bg-fixed {
      background-image: url('./Images/servicebg.jfif');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
    }
    
    /* Fix for trending section spacing on mobile */
    .trending-slider-container {
      overflow-x: auto;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }
    
    .trending-slider-container::-webkit-scrollbar {
      display: none;
    }
    
    /* Ensure no horizontal overflow */
    .no-horizontal-overflow {
      overflow-x: hidden !important;
      max-width: 100% !important;
    }
  </style>

  <!-- Hero Section -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative overflow-hidden">
    <div id="banner-slider" class="overflow-hidden relative rounded-2xl w-full">
      <div class="flex w-full transition-transform duration-700 ease-in-out" id="banner-slides-wrapper">
        ${data.bannerSlides.map((slide, idx) => `
          <div class="flex-none min-w-full w-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div class="w-full md:w-2/3 relative rounded-2xl border border-gray-300 overflow-hidden shadow-lg h-[220px] sm:h-[260px] md:h-[350px]">
              <img src="${slide.mainImage}" class="w-full h-full object-cover" alt="banner" />
              ${slide.overlayText ? `
                <div class="absolute inset-0 bg-black/25 flex items-center justify-start p-4 sm:p-6 md:p-12">
                  <div class="text-white">
                    <h2 class="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-zain font-bold">${slide.overlayText.title}</h2>
                    <p class="mt-2 md:mt-4 text-xs sm:text-sm md:text-lg font-lexend">${slide.overlayText.subtitle}</p>
                  </div>
                </div>
              ` : ""}
            </div>
            <div class="w-full md:w-1/3 flex flex-col gap-4 md:gap-2">
              <div class="relative rounded-2xl overflow-hidden border border-gray-300 h-[160px] sm:h-[200px] md:h-[170px]">
                <img src="${slide.smallImage}" class="w-full h-full object-cover" />
              </div>
              <div class="rounded-2xl border border-gray-300 p-4 sm:p-5 md:p-6 flex flex-col justify-center h-auto md:h-[170px]" style="background-color: #effffd; border-color: #e5e7eb">
                <h3 class="flex items-center gap-2 font-lexend text-base sm:text-lg text-[#1D3C4A]">
                  <i class="fa-solid fa-tags text-[#e39f32]"></i>
                  ${slide.promoTitle}
                </h3>
                <p class="text-[#1D3C4A] mt-1 font-zain text-xs sm:text-sm">${slide.promoDesc}</p>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        ${data.bannerSlides.map((_, idx) => `<button class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/50" data-slide="${idx}"></button>`).join("")}
      </div>
    </div>
  </section>

  <!-- Category Section -->
  <section class="pt-8 pb-6 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12 text-center">
        <h2 class="text-4xl font-semibold font-zain text-[#1D3C4A]">Browse by Category</h2>
        <p class="text-gray-500 mt-2 font-lexend text-sm">Curated collections for every space</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]">
        ${data.categories.map((cat) => `
          <a href="${cat.link}" class="relative ${cat.spanClass} rounded-xl overflow-hidden group">
            <img src="${cat.image}" class="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
            <div class="absolute inset-x-0 bottom-0 ${cat.gradientHeight} bg-gradient-to-t from-black to-transparent"></div>
            <h3 class="absolute bottom-${cat.bottomOffset} left-4 text-white font-lexend ${cat.fontSize} font-semibold">${cat.name}</h3>
          </a>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- Discover Section -->
  <section class="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto bg-teal-50 rounded-xl p-4 sm:p-6">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <span class="w-1 h-8 bg-[#E39F32] rounded-full"></span>
            <h2 class="text-2xl sm:text-3xl font-semibold text-[#1D3C4A] font-zain">
              ${data.discover.title}
            </h2>
          </div>
          <p class="text-sm text-gray-500 ml-4">
            ${data.discover.subtitle}
          </p>
        </div>
      </div>

      <div class="relative">
        <button id="discoverPrevBtn" class="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 sm:p-3 rounded-full z-30 hover:scale-105 active:scale-95 transition flex items-center justify-center border border-gray-100">
          <i class="fa-solid fa-chevron-left text-xs sm:text-sm"></i>
        </button>

        <div id="discoverSlider" class="flex gap-3 sm:gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-4 px-8 sm:px-10 md:px-12 snap-x snap-mandatory">
          ${data.discover.products.map((prod) => `
            <div class="relative w-[180px] sm:w-[200px] md:w-[230px] lg:w-[250px] xl:w-[270px] flex-shrink-0 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 snap-start">
              <span class="absolute top-3 left-3 bg-[#E39F32] text-white text-[10px] font-semibold px-2 py-1 rounded-md z-20">
                ${prod.discount}
              </span>
              <button class="wishlist-btn absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:scale-110 transition z-20"
                data-product-id="${prod.id}"
                data-product-name="${prod.title}"
                data-price="${prod.price}"
                data-image="${prod.image}">
                <i class="fa-regular fa-heart text-gray-500 text-sm"></i>
              </button>
              <div class="p-1.5">
                <div class="border border-gray-200 rounded-xl overflow-hidden h-[120px] sm:h-[150px] bg-gray-100">
                  <img src="${prod.image}" class="w-full h-full object-cover" alt="${prod.title}" />
                </div>
              </div>
              <div class="px-2.5 pb-2 pt-1">
                <h3 class="text-sm text-gray-700 line-clamp-2 font-medium leading-tight min-h-[40px]">
                  ${prod.title}
                </h3>
                <div class="flex items-center text-orange-500 text-xs mt-1">
                  ${prod.starsHtml}
                  <span class="text-gray-400 ml-1">(${prod.reviews})</span>
                </div>
                <div class="flex items-center gap-1 mt-1 flex-wrap">
                  <span class="font-semibold text-base text-[#1D3C4A]">${prod.price}</span>
                  <span class="text-gray-400 line-through text-xs">${prod.originalPrice}</span>
                </div>
                <button class="group w-full mt-2 bg-[#1D3C4A] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-medium hover:bg-[#E39F32] transition-all duration-300" data-product-id="${prod.id}">
                  <i class="fa-solid fa-cart-shopping text-[#E39F32] group-hover:text-[#1D3C4A] transition-colors duration-300"></i>
                  <span class="text-white">Add to Cart</span>
                </button>
              </div>
            </div>
          `).join("")}
        </div>

        <button id="discoverNextBtn" class="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 sm:p-3 rounded-full z-30 hover:scale-105 active:scale-95 transition flex items-center justify-center border border-gray-100">
          <i class="fa-solid fa-chevron-right text-xs sm:text-sm"></i>
        </button>
      </div>
    </div>
  </section>

  <!-- Top Rated / Best Sellers Section -->
  <section class="py-8 bg-gray-50 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <span class="w-1 h-8 bg-[#E39F32] rounded-full"></span>
            <h2 class="text-2xl sm:text-4xl font-semibold text-[#1D3C4A] font-zain">Best Sellers</h2>
          </div>
          <p class="text-gray-500 text-sm ml-4">Our most loved pieces chosen by customers</p>
        </div>
      </div>

      <div class="relative">
        <button id="topRatedPrevBtn" class="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 sm:p-3 rounded-full z-30 hover:scale-105 active:scale-95 transition flex items-center justify-center border border-gray-100">
          <i class="fa-solid fa-chevron-left text-xs sm:text-sm"></i>
        </button>

        <div id="topRatedSlider" class="flex gap-3 sm:gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-4 px-8 sm:px-10 md:px-12 snap-x snap-mandatory">
          ${data.topRated.map((prod) => `
            <div class="relative w-[180px] sm:w-[200px] md:w-[230px] lg:w-[250px] xl:w-[270px] flex-shrink-0 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 snap-start">
              <span class="absolute top-3 left-3 bg-[#E39F32] text-white text-[10px] font-semibold px-2 py-1 rounded-md z-20">${prod.discount}</span>
              <button class="wishlist-btn absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:scale-110 transition z-20"
                data-product-id="${prod.id}"
                data-product-name="${prod.title}"
                data-price="${prod.price}"
                data-image="${prod.image}">
                <i class="fa-regular fa-heart text-gray-500 text-sm"></i>
              </button>
              <div class="p-1.5">
                <div class="border border-gray-200 rounded-xl overflow-hidden h-[150px] sm:h-[180px] bg-gray-100">
                  <img src="${prod.image}" class="w-full h-full object-cover" alt="${prod.title}" />
                </div>
              </div>
              <div class="px-2.5 pb-2 pt-1">
                <h3 class="text-sm text-gray-700 line-clamp-2 font-medium leading-tight min-h-[40px]">${prod.title}</h3>
                <div class="flex items-center text-orange-500 text-xs mt-1.5">
                  ${prod.starsHtml}
                  <span class="text-gray-400 ml-1">(${prod.reviews})</span>
                </div>
                <div class="mt-1">
                  <div class="flex items-center gap-1 flex-wrap">
                    <span class="font-semibold text-base text-[#1D3C4A]">${prod.price}</span>
                    <span class="text-gray-400 line-through text-xs">${prod.originalPrice}</span>
                  </div>
                </div>
                <button class="group w-full mt-2 bg-[#1D3C4A] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-medium hover:bg-[#E39F32] transition-all duration-300" data-product-id="${prod.id}">
                  <i class="fa-solid fa-cart-shopping text-[#E39F32] group-hover:text-[#1D3C4A] transition-colors duration-300"></i>
                  <span class="text-white">Add to Cart</span>
                </button>
              </div>
            </div>
          `).join("")}
        </div>

        <button id="topRatedNextBtn" class="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 sm:p-3 rounded-full z-30 hover:scale-105 active:scale-95 transition flex items-center justify-center border border-gray-100">
          <i class="fa-solid fa-chevron-right text-xs sm:text-sm"></i>
        </button>
      </div>
    </div>
  </section>

  <!-- Photo Frames Section -->
  <section class="py-6 sm:py-7 md:py-8 px-4 sm:px-6 lg:px-8 mt-1 overflow-hidden">
    <div class="max-w-7xl mx-auto bg-gradient-to-br from-teal-50 via-white to-teal-100 rounded-lg border border-teal-100/70 shadow-sm p-4 sm:p-5 md:p-6 lg:p-7">
      <div class="mb-6">
        <div class="flex items-center gap-3 mb-1">
          <span class="w-1 h-8 bg-[#E39F32] rounded-full"></span>
          <h2 class="text-2xl sm:text-3xl font-semibold text-[#1D3C4A] font-zain">Photo Frames</h2>
        </div>
        <p class="text-gray-500 text-sm ml-4">Capture and frame your beautiful memories</p>
      </div>

      <div class="relative">
        <button id="pfLeft" class="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 sm:p-3 rounded-full z-30 hover:scale-105 active:scale-95 transition flex items-center justify-center border border-gray-100">
          <i class="fa-solid fa-chevron-left text-xs sm:text-sm"></i>
        </button>

        <div id="photoFramesContainer" class="flex gap-3 sm:gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-4 px-8 sm:px-10 md:px-12 snap-x snap-mandatory">
          ${data.photoFrames.map((frame) => `
            <div class="relative w-[160px] sm:w-[190px] md:w-[220px] lg:w-[240px] xl:w-[260px] flex-shrink-0 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 snap-start overflow-hidden">
              <span class="absolute top-3 left-3 bg-[#E39F32] text-white text-[10px] font-semibold px-2 py-1 rounded-md z-20">${frame.discount}% OFF</span>
              <button class="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:scale-110 transition z-20">
                <i class="fa-regular fa-heart text-gray-500 text-sm"></i>
              </button>
              <div class="p-1.5">
                <div class="w-full h-[130px] sm:h-[150px] border border-gray-200 rounded-xl overflow-hidden bg-gray-100">
                  <img src="${frame.image}" alt="${frame.title}" class="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105" />
                </div>
              </div>
              <div class="px-2.5 pb-2 pt-1 flex flex-col">
                <p class="text-[10px] uppercase tracking-wide text-gray-500 mb-1">${frame.category}</p>
                <h3 class="text-sm text-gray-700 line-clamp-2 font-medium leading-tight min-h-[40px]">${frame.title}</h3>
                <div class="flex items-center gap-1 mt-1 flex-wrap">
                  <span class="font-semibold text-base text-[#1D3C4A]">${frame.price}</span>
                  <span class="text-gray-400 line-through text-xs">${frame.originalPrice}</span>
                </div>
                <button class="group/cart w-full mt-2 bg-[#1D3C4A] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-medium hover:bg-[#E39F32] hover:shadow-md transition-all duration-300">
                  <i class="fa-solid fa-cart-shopping text-[#E39F32] group-hover/cart:text-[#1D3C4A] transition-all duration-300"></i>
                  <span class="text-white">Add to Cart</span>
                </button>
              </div>
            </div>
          `).join("")}
        </div>

        <button id="pfRight" class="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 sm:p-3 rounded-full z-30 hover:scale-105 active:scale-95 transition flex items-center justify-center border border-gray-100">
          <i class="fa-solid fa-chevron-right text-xs sm:text-sm"></i>
        </button>
      </div>
    </div>
  </section>

  <!-- Corporate Gifting Banner Section -->
  <section class="py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${data.corporateBanners.map((banner) => `
          <div class="relative block overflow-hidden rounded-2xl group">
            <img src="${banner.image}" alt="${banner.title}" class="w-full h-[220px] sm:h-[260px] md:h-[280px] lg:h-[300px] object-cover transition duration-500 group-hover:scale-105" />
            ${banner.showText ? `
              <div class="absolute top-6 left-6 text-[#1D3C4A]" style="text-shadow: 0 2px 6px rgba(0,0,0,0.5)">
                <h3 class="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-lexend font-semibold">${banner.title}</h3>
                <p class="text-sm sm:text-base md:text-base lg:text-base font-lexend mt-1 max-w-xs">${banner.subtitle}</p>
              </div>
            ` : ""}
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- Trending Products Section - Fixed spacing issue -->
  <section class="py-10 bg-gray-50 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div class="flex items-center gap-4">
        <div class="w-1 h-10 bg-[#E39F32] rounded"></div>
        <div>
          <h2 class="text-3xl sm:text-4xl font-zain font-extrabold text-[#1D3C4A]">Trending Products</h2>
          <p class="text-sm text-gray-500">Popular picks customers love the most</p>
        </div>
      </div>
    </div>

    <!-- ROW 1 -->
    <div class="relative max-w-7xl mx-auto">
      <button onclick="scrollRow('trendingRow1', -1)" class="absolute left-0 sm:-left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow border flex items-center justify-center hover:bg-[#1D3C4A] hover:text-white transition">
        <i class="fa-solid fa-chevron-left text-xs sm:text-sm"></i>
      </button>
      <div id="trendingRow1" class="trending-slider-container overflow-x-auto scroll-smooth pb-4 mx-4 sm:mx-6 lg:mx-8">
        <div class="flex gap-4 sm:gap-6 w-max px-0">
          ${data.trendingProducts.row1.map((prod) => renderTrendingCard(prod)).join("")}
        </div>
      </div>
      <button onclick="scrollRow('trendingRow1', 1)" class="absolute right-0 sm:-right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow border flex items-center justify-center hover:bg-[#1D3C4A] hover:text-white transition">
        <i class="fa-solid fa-chevron-right text-xs sm:text-sm"></i>
      </button>
    </div>

    <!-- ROW 2 -->
    <div class="relative max-w-7xl mx-auto mt-8">
      <button onclick="scrollRow('trendingRow2', -1)" class="absolute left-0 sm:-left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow border flex items-center justify-center hover:bg-[#1D3C4A] hover:text-white transition">
        <i class="fa-solid fa-chevron-left text-xs sm:text-sm"></i>
      </button>
      <div id="trendingRow2" class="trending-slider-container overflow-x-auto scroll-smooth pb-4 mx-4 sm:mx-6 lg:mx-8">
        <div class="flex gap-4 sm:gap-6 w-max px-0">
          ${data.trendingProducts.row2.map((prod) => renderTrendingCard(prod)).join("")}
        </div>
      </div>
      <button onclick="scrollRow('trendingRow2', 1)" class="absolute right-0 sm:-right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow border flex items-center justify-center hover:bg-[#1D3C4A] hover:text-white transition">
        <i class="fa-solid fa-chevron-right text-xs sm:text-sm"></i>
      </button>
    </div>
  </section>

  <!-- DEALS BANNER -->
  <section class="pt-6 pb-3 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <div class="max-w-7xl mx-auto w-full">
      <a href="/deals" class="block">
        <div class="w-full rounded-lg overflow-hidden">
          <img src="${data.dealsBannerImage}" alt="Deals Banner" class="block w-full h-auto object-cover object-center transition-transform duration-500 hover:scale-105">
        </div>
      </a>
    </div>
  </section>

  <!-- Services Section - Fixed background -->
  <section class="py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden" style="background-image: url('./Images/servicebg.jfif'); background-size: cover; background-position: center; background-repeat: no-repeat; background-attachment: fixed;">
    <div class="max-w-7xl mx-auto">
      <div class="rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-md shadow-md sm:shadow-lg px-4 sm:px-6 lg:px-8 py-5 sm:py-6 md:py-7">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          ${data.services.map((service) => `
            <div class="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4 border-b md:border-b-0 md:border-r border-[#1D3C4A]/30 group transition hover:scale-[1.02]">
              <div class="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-[#e8f4f7] text-[#1D3C4A] rounded-xl flex items-center justify-center text-xl sm:text-2xl group-hover:bg-[#1D3C4A] group-hover:text-white transition-colors duration-200">
                <i class="${service.icon}"></i>
              </div>
              <div>
                <p class="text-sm sm:text-base font-semibold text-[#1D3C4A]">${service.title}</p>
                <p class="text-xs sm:text-sm text-gray-600">${service.desc}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  </section>
`;
  }

  function renderTrendingCard(prod) {
    return `
  <div class="w-[180px] sm:w-[200px] md:w-[230px] flex-shrink-0">

    <div class="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col h-full transition hover:shadow-md">

      <!-- Image -->
      <div class="p-1">
        <div class="relative border border-gray-100 rounded-lg overflow-hidden bg-gray-50">

          <img src="${prod.image}" 
               class="w-full h-[140px] sm:h-[150px] md:h-[170px] object-cover"/>

          <!-- Wishlist -->
          <button class="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full shadow flex items-center justify-center hover:text-red-500 hover:scale-110 transition">
            <i class="fa-regular fa-heart text-[10px] sm:text-sm"></i>
          </button>

        </div>
      </div>

      <!-- Content -->
      <div class="p-3 flex flex-col flex-grow justify-between">

        <div>
          <h3 class="text-xs sm:text-sm font-semibold text-[#1D3C4A] line-clamp-2">
            ${prod.title}
          </h3>

          <p class="text-[9px] sm:text-xs text-gray-500">
            ${prod.category}
          </p>

          <!-- Price -->
          <div class="flex items-center gap-2 mt-1 flex-wrap">

            <span class="text-[#1D3C4A] font-semibold text-xs sm:text-sm">
              ${prod.price}
            </span>

            <span class="text-gray-400 line-through text-[9px] sm:text-xs">
              ${prod.originalPrice}
            </span>

            <span class="text-green-600 text-[9px] sm:text-xs font-semibold">
              ${prod.discountPercent}% OFF
            </span>

          </div>
        </div>

        <!-- Add to Cart -->
        <button class="group mt-2 sm:mt-3 w-full bg-[#1D3C4A] text-white text-[10px] sm:text-sm py-1.5 sm:py-2 rounded-md hover:bg-[#E39F32] transition flex items-center justify-center gap-2">

          <i class="fa-solid fa-cart-shopping text-[#E39F32] group-hover:text-[#1D3C4A] transition"></i>
          Add to Cart

        </button>

      </div>

    </div>

  </div>
  `;
  }

  function attachAllDynamicScripts() {
    // Banner slider logic
    const sliderWrapper = document.querySelector("#banner-slider");
    const slider = document.querySelector("#banner-slides-wrapper");
    const slides = document.querySelectorAll("#banner-slides-wrapper > div");
    const dots = document.querySelectorAll("#banner-slider [data-slide]");
    let currentSlide = 0,
      slideInterval;
    function goToSlide(index) {
      if (slider) {
        slider.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot) => dot.classList.remove("bg-white"));
        if (dots[index]) dots[index].classList.add("bg-white");
        currentSlide = index;
      }
    }
    function startSlider() {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        let next = (currentSlide + 1) % slides.length;
        goToSlide(next);
      }, 3000);
    }
    function stopSlider() {
      clearInterval(slideInterval);
    }
    if (sliderWrapper) {
      sliderWrapper.addEventListener("mouseenter", stopSlider);
      sliderWrapper.addEventListener("mouseleave", startSlider);
    }
    if (slides.length) {
      goToSlide(0);
      startSlider();
    }
    dots.forEach((dot) =>
      dot.addEventListener("click", () => {
        let idx = parseInt(dot.dataset.slide);
        if (!isNaN(idx)) goToSlide(idx);
      }),
    );

    // Discover slider
    const discoverSlider = document.getElementById("discoverSlider");
    const discPrev = document.getElementById("discoverPrevBtn");
    const discNext = document.getElementById("discoverNextBtn");
    if (discoverSlider && discPrev && discNext) {
      discPrev.onclick = () =>
        discoverSlider.scrollBy({ left: -320, behavior: "smooth" });
      discNext.onclick = () =>
        discoverSlider.scrollBy({ left: 320, behavior: "smooth" });
    }

    // Top Rated slider
    const topSlider = document.getElementById("topRatedSlider");
    const topPrev = document.getElementById("topRatedPrevBtn");
    const topNext = document.getElementById("topRatedNextBtn");
    if (topSlider && topPrev && topNext) {
      const scrollAmount = 284;
      topNext.onclick = () =>
        topSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
      topPrev.onclick = () =>
        topSlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }

    // Photo frames scroll
    const pfContainer = document.getElementById("photoFramesContainer");
    const pfLeft = document.getElementById("pfLeft");
    const pfRight = document.getElementById("pfRight");
    if (pfContainer && pfLeft && pfRight) {
      pfLeft.onclick = () =>
        pfContainer.scrollBy({ left: -220, behavior: "smooth" });
      pfRight.onclick = () =>
        pfContainer.scrollBy({ left: 220, behavior: "smooth" });
    }

    // Trending rows scroll
    window.scrollRow = function (row, dir) {
      const cont = document.getElementById(row);
      if (cont) cont.scrollBy({ left: dir * 350, behavior: "smooth" });
    };
  }

  init();
})();
