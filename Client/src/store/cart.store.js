import create from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  total: 0,

  addItem: (item) => {
    const items = get().items;
    const existingItem = items.find((i) => i.id === item.id);

    if (existingItem) {
      const updatedItems = items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      set({
        items: updatedItems,
        total: calculateTotal(updatedItems),
      });
    } else {
      const updatedItems = [...items, { ...item, quantity: 1 }];
      set({
        items: updatedItems,
        total: calculateTotal(updatedItems),
      });
    }
  },

  removeItem: (itemId) => {
    const items = get().items;
    const updatedItems = items.filter((item) => item.id !== itemId);
    set({
      items: updatedItems,
      total: calculateTotal(updatedItems),
    });
  },

  updateQuantity: (itemId, quantity) => {
    const items = get().items;
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    set({
      items: updatedItems,
      total: calculateTotal(updatedItems),
    });
  },

  clearCart: () => {
    set({
      items: [],
      total: 0,
    });
  },
}));

function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export default useCartStore; 