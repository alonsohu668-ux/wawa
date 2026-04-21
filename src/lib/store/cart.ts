'use client';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  options: Record<string, string>;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [] as CartItem[],
      addItem: (item: CartItem) => {
        const existing = get().items.find(i => i.id === item.id);
        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              i.id === item.id ? {...i, quantity: i.quantity + 1} : i
            )
          }));
        } else {
          set(state => ({items: [...state.items, {...item, quantity: 1}]}));
        }
      },
      removeItem: (id: string) => set(state => ({items: state.items.filter(i => i.id !== id)})),
      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
        } else {
          set(state => ({
            items: state.items.map(i => i.id === id ? {...i, quantity} : i)
          }));
        }
      },
      clearCart: () => set({items: []}),
      total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {name: 'eurodolls-cart'}
  )
);
