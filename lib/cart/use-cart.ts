"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/product";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  totalCents: () => number;
  totalQuantity: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((existing) => existing.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((row) =>
                row.productId === item.productId
                  ? { ...row, quantity: row.quantity + item.quantity }
                  : row,
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((row) => row.productId !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((row) => (row.productId === productId ? { ...row, quantity } : row))
            .filter((row) => row.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      totalCents: () => get().items.reduce((sum, row) => sum + row.priceCents * row.quantity, 0),
      totalQuantity: () => get().items.reduce((sum, row) => sum + row.quantity, 0),
    }),
    { name: "tenant-cart" },
  ),
);
