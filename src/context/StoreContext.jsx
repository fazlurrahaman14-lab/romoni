import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';

const StoreContext = createContext();

const DEFAULT_COUPONS = [
  { code: 'ROMONI10', discountPercent: 10, isActive: true, description: '10% off for new customers' },
  { code: 'LEDIS10', discountPercent: 10, isActive: true, description: '10% off special promo' },
  { code: 'MUSHQ10', discountPercent: 10, isActive: true, description: '10% off luxury collection' },
  { code: 'EID20', discountPercent: 20, isActive: true, description: '20% off Eid Special' }
];

export const StoreProvider = ({ children }) => {
  // Dynamic Products State (saved in localStorage)
  const [productsList, setProductsList] = useState(() => {
    try {
      const saved = localStorage.getItem('ledis_dress_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  // Dynamic Coupons State
  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem('ledis_dress_coupons');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_COUPONS;
  });

  // Customer Orders State
  const [ordersList, setOrdersList] = useState(() => {
    try {
      const saved = localStorage.getItem('ledis_dress_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'ORD-9081',
        date: new Date().toLocaleDateString('en-GB'),
        customerName: 'Nusrat Jahan',
        phone: '+8801712345678',
        address: 'House 42, Road 11, Banani',
        city: 'Dhaka',
        paymentMethod: 'bKash (01712345678)',
        items: [
          { title: 'Aria - Emerald Velvet Ensemble', size: 'M', quantity: 1, price: 8500 }
        ],
        totalAmount: 8500,
        status: 'Processing'
      }
    ];
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ledis_dress_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('ledis_dress_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Storewide Global Discount (%) State
  const [storewideDiscountPercent, setStorewideDiscountPercentState] = useState(() => {
    try {
      const saved = localStorage.getItem('romoni_storewide_discount');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const applyStorewideDiscount = (percent) => {
    const val = Math.max(0, Math.min(99, Number(percent) || 0));
    setStorewideDiscountPercentState(val);
    localStorage.setItem('romoni_storewide_discount', val.toString());
    if (val > 0) {
      showToast(`🔥 ${val}% Storewide Discount Applied to ALL Products!`);
    } else {
      showToast('Storewide discount cleared');
    }
  };

  // Helper: Dynamic Price & Discount calculation for any product
  const getProductPrices = (product) => {
    if (!product) return { sellingPrice: 0, originalPrice: 0, discountPercent: 0, hasDiscount: false };
    const baseOriginalPrice = Number(product.originalPriceBDT || product.originalPricePKR || product.priceBDT || product.pricePKR || 0);
    const baseSellingPrice = Number(product.priceBDT || product.pricePKR || baseOriginalPrice);

    if (storewideDiscountPercent > 0) {
      const refPrice = baseOriginalPrice > baseSellingPrice ? baseOriginalPrice : baseSellingPrice;
      const sellingPrice = Math.round(refPrice * (1 - storewideDiscountPercent / 100));
      return {
        sellingPrice,
        originalPrice: refPrice,
        discountPercent: storewideDiscountPercent,
        hasDiscount: true
      };
    }

    const hasDiscount = baseOriginalPrice > baseSellingPrice;
    const discountPercent = hasDiscount ? Math.round(((baseOriginalPrice - baseSellingPrice) / baseOriginalPrice) * 100) : 0;
    return {
      sellingPrice: baseSellingPrice,
      originalPrice: baseOriginalPrice,
      discountPercent,
      hasDiscount
    };
  };

  // Subdomain & URL auto admin trigger (e.g., admin.domain.com, dashboard.domain.com, dashboad.domain.com, /admin, or ?admin=true)
  useEffect(() => {
    try {
      const host = window.location.hostname;
      const path = window.location.pathname;
      const search = window.location.search;
      if (
        host.startsWith('admin.') ||
        host.startsWith('dashboard.') ||
        host.startsWith('dashboad.') ||
        path.startsWith('/admin') ||
        path.startsWith('/dashboard') ||
        path.startsWith('/dashboad') ||
        search.includes('admin=true') ||
        window.location.hash === '#admin' ||
        window.location.hash === '#dashboard' ||
        window.location.hash === '#dashboad'
      ) {
        setIsAdminOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync state with LocalStorage
  useEffect(() => {
    localStorage.setItem('ledis_dress_products', JSON.stringify(productsList));
  }, [productsList]);

  useEffect(() => {
    localStorage.setItem('ledis_dress_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('ledis_dress_orders', JSON.stringify(ordersList));
  }, [ordersList]);

  useEffect(() => {
    localStorage.setItem('ledis_dress_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ledis_dress_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast Helper
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Price formatter strictly in BDT (৳)
  const formatPrice = (priceBDT) => {
    const val = priceBDT || 0;
    return `৳ ${Math.round(val).toLocaleString('en-IN')}`;
  };

  // Product CRUD Operations
  const addProduct = (newProduct) => {
    const created = {
      id: `ld-${Date.now().toString().slice(-4)}`,
      sku: newProduct.sku || `LD-${Math.floor(100 + Math.random() * 900)}`,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      colors: [{ name: 'Default', hex: '#123829' }],
      sizes: ['Unstitched', 'S', 'M', 'L', 'XL'],
      ...newProduct,
      priceBDT: Number(newProduct.priceBDT),
      pricePKR: Number(newProduct.priceBDT),
      originalPriceBDT: Number(newProduct.originalPriceBDT || newProduct.priceBDT),
      originalPricePKR: Number(newProduct.originalPriceBDT || newProduct.priceBDT)
    };
    setProductsList((prev) => [created, ...prev]);
    showToast(`Product "${created.title}" added to catalog!`);
  };

  const updateProduct = (productId, updatedFields) => {
    setProductsList((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updated = { ...p, ...updatedFields };
          if (updatedFields.priceBDT !== undefined) {
            updated.priceBDT = Number(updatedFields.priceBDT);
            updated.pricePKR = Number(updatedFields.priceBDT);
          }
          if (updatedFields.originalPriceBDT !== undefined) {
            updated.originalPriceBDT = Number(updatedFields.originalPriceBDT);
            updated.originalPricePKR = Number(updatedFields.originalPriceBDT);
          }
          return updated;
        }
        return p;
      })
    );
    showToast('Product details updated successfully!');
  };

  const deleteProduct = (productId) => {
    setProductsList((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from store');
  };

  const resetProductsToDefault = () => {
    setProductsList(INITIAL_PRODUCTS);
    localStorage.removeItem('ledis_dress_products');
    showToast('Reset catalog to initial demo collection!');
  };

  // Coupon CRUD Operations
  const addCoupon = (code, discountPercent, description = '') => {
    const uppercaseCode = code.trim().toUpperCase();
    if (!uppercaseCode) return;
    if (coupons.some((c) => c.code === uppercaseCode)) {
      showToast('Coupon code already exists');
      return;
    }
    const newCoupon = { code: uppercaseCode, discountPercent: Number(discountPercent), isActive: true, description };
    setCoupons((prev) => [...prev, newCoupon]);
    showToast(`Coupon "${uppercaseCode}" (${discountPercent}%) created!`);
  };

  const toggleCouponStatus = (code) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
    showToast('Coupon status updated');
  };

  const deleteCoupon = (code) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showToast(`Coupon "${code}" deleted`);
  };

  // Order Operations
  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-GB'),
      status: 'Pending',
      ...orderData
    };
    setOrdersList((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrdersList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order #${orderId} status changed to ${newStatus}`);
  };

  // Cart operations
  const addToCart = (product, selectedSize = 'Unstitched', selectedColor = null, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedSize, selectedColor: selectedColor || product.colors[0], quantity }];
    });

    showToast(`Added "${product.title}" (${selectedSize}) to Bag!`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId, selectedSize, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === selectedSize) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId, selectedSize) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedSize === selectedSize)));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist ❤');
        return [...prev, productId];
      }
    });
  };

  // Coupon apply logic
  const applyCoupon = (code) => {
    const found = coupons.find((c) => c.code === code.trim().toUpperCase() && c.isActive);
    if (found) {
      setAppliedDiscount(found.discountPercent / 100);
      setDiscountCode(found.code);
      showToast(`🎉 ${found.discountPercent}% Luxury Coupon Discount Applied!`);
      return true;
    } else {
      showToast('Invalid or Inactive Coupon Code');
      return false;
    }
  };

  // Calculations using getProductPrices
  const cartSubtotalPKR = cart.reduce((acc, item) => {
    const prices = getProductPrices(item.product);
    return acc + prices.sellingPrice * item.quantity;
  }, 0);

  const discountAmountPKR = Math.round(cartSubtotalPKR * appliedDiscount);
  const cartTotalPKR = Math.max(0, cartSubtotalPKR - discountAmountPKR);
  const freeShippingThresholdPKR = 5000; // ৳5000 BDT threshold
  const shippingProgress = Math.min(100, Math.round((cartSubtotalPKR / freeShippingThresholdPKR) * 100));

  return (
    <StoreContext.Provider
      value={{
        formatPrice,
        productsList,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        storewideDiscountPercent,
        applyStorewideDiscount,
        getProductPrices,
        coupons,
        addCoupon,
        toggleCouponStatus,
        deleteCoupon,
        ordersList,
        addOrder,
        updateOrderStatus,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        isCartOpen,
        setIsCartOpen,
        isMobileDrawerOpen,
        setIsMobileDrawerOpen,
        isFilterOpen,
        setIsFilterOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAdminOpen,
        setIsAdminOpen,
        toast,
        showToast,
        discountCode,
        appliedDiscount,
        applyCoupon,
        cartSubtotalPKR,
        discountAmountPKR,
        cartTotalPKR,
        freeShippingThresholdPKR,
        shippingProgress
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
