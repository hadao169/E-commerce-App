'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the CartItem type
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
// Define the CartContextType type
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [cart, setCart] = useState<CartItem[]>([]);
	const addToCart = (item: CartItem) => {};
	const removeFromCart = (id: string) => {};
	const clearCart = () => {};
	const value: CartContextType = {
		cart,
    addToCart,
    removeFromCart,
    clearCart,
  };
return (
  <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
);
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
