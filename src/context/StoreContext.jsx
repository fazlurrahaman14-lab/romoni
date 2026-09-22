import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CURRENCY_RATES } from '../data/products';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [currency, setCurrency] = useState('PKR');

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ledis_dress_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('ledis_dress_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [sortBy, setSortBy] = useState('featured');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem('ledis_dress_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ledis_dress_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const formatPrice = (pricePKR) => {
    const rateObj = CURRENCY_RATES[currency] || CURRENCY_RATES.PKR;
    const converted = Math.round(pricePKR * rateObj.rate);
    
    if (currency === 'PKR') {
      return `${rateObj.symbol} ${converted.toLocaleString()}`;
    }
    return `${rateObj.symbol}${converted.toLocaleString()}`;
  };

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

  const applyCoupon = (code) => {
    if (code.trim().toUpperCase() === 'LEDIS10' || code.trim().toUpperCase() === 'MUSHQ10') {
      setAppliedDiscount(0.10);
      setDiscountCode(code.toUpperCase());
      showToast('🎉 10% Luxury Coupon Discount Applied!');
      return true;
    } else {
      showToast('Invalid Coupon Code');
      return false;
    }
  };

  const cartSubtotalPKR = cart.reduce((acc, item) => acc + item.product.pricePKR * item.quantity, 0);
  const discountAmountPKR = Math.round(cartSubtotalPKR * appliedDiscount);
  const cartTotalPKR = Math.max(0, cartSubtotalPKR - discountAmountPKR);
  const freeShippingThresholdPKR = 35000;
  const shippingProgress = Math.min(100, Math.round((cartSubtotalPKR / freeShippingThresholdPKR) * 100));

  return (
    <StoreContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
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
        priceRange,
        setPriceRange,
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