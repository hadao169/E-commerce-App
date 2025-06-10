'use client';
import React, { createContext, useContext, useState } from 'react';

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

	const addToCart = (item: CartItem) => {
		setCart(prevCart => {
			const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
			if (existingItem) {
				return prevCart.map(cartItem =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + item.quantity }
						: cartItem
				);
			}
			return [...prevCart, item];
		});
	};

	const removeFromCart = (id: string) => {
		setCart(prevCart => prevCart.filter(item => item.id !== id));
	};

	const clearCart = () => {
		setCart([]);
	};

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
