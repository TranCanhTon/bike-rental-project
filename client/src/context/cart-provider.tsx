import { useEffect, useState } from "react";
import { CartContext } from "./cart-context";
import type { CartItem, CartContextType } from "@/types/Order";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<CartItem[]>([]);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
    setIsCartOpen(true);
  };

  const updateRentalDuration = (id: string, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              rentalDuration: Math.max(1, item.rentalDuration + change),
            }
          : item
      )
    );
  };

  const moveToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
    setWishlistItems((prev) => prev.filter((i) => i.id !== item.id));
    setIsCartOpen(true);
  };

  //   const addToWishlist = (item: CartItem) => {
  //     setWishlistItems((prev) => [...prev, item]);
  //   };

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToWishlist = (item: CartItem) => {
    setCartItems((prev) => prev.filter((i) => i.id !== item.id));
    setWishlistItems((prev) => [...prev, item]);
    setIsCartOpen(true);
  };

  const moveToCartFromWishlist = (id: string) => {
    const item = wishlistItems.find((i) => i.id === id);
    if (item) {
      setWishlistItems((prev) => prev.filter((i) => i.id !== id));
      setCartItems((prev) => [...prev, item]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const value: CartContextType = {
    cartItems,
    setCartItems,
    addToCart,
    updateRentalDuration,
    isCartOpen,
    setIsCartOpen,
    wishlistItems,
    setWishlistItems,
    // addToWishlist,
    removeFromWishlist,
    moveToWishlist,
    moveToCart,
    moveToCartFromWishlist,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
