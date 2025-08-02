export type CartItem = {
  id: string;
  name: string;
  image: string;
  hourlyRate: number;
  rentalDuration: number;
  product: string;
};

export type CartContextType = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: CartItem) => void;
  updateRentalDuration: (id: string, change: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;

  wishlistItems: CartItem[];
  setWishlistItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  // addToWishlist: (item: CartItem) => void;
  removeFromWishlist: (id: string) => void;
  moveToWishlist: (item: CartItem) => void;
  moveToCart: (item: CartItem) => void;
  moveToCartFromWishlist: (id: string) => void;
  removeFromCart: (id: string) => void;
};
