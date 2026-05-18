"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TenantProduct } from "@/types/product";

export interface CartItem {
  productId: string;
  whopProductId: string;
  slug: string;
  name: string;
  priceCents: number;
  currency: string;
  image?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: TenantProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  count: () => number;
  subtotalCents: () => number;
}

const CART_STORAGE_KEY = "gondoor-cart-v1";

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.productId === product.id
          );
          if (existingIndex >= 0) {
            const next = state.items.slice();
            next[existingIndex] = {
              ...next[existingIndex],
              quantity: next[existingIndex].quantity + quantity,
            };
            return { items: next };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                whopProductId: product.whopProductId,
                slug: product.slug,
                name: product.name,
                priceCents: product.priceCents,
                currency: product.currency,
                image: product.image,
                quantity,
              },
            ],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.productId === productId
                ? { ...item, quantity: Math.max(0, quantity) }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      subtotalCents: () =>
        get().items.reduce(
          (sum, item) => sum + item.priceCents * item.quantity,
          0
        ),
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return memoryStorage;
        }
        return window.localStorage;
      }),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

const memoryStore = new Map<string, string>();
const memoryStorage: Storage = {
  get length() {
    return memoryStore.size;
  },
  clear: () => memoryStore.clear(),
  getItem: (key) => memoryStore.get(key) ?? null,
  key: (index) => Array.from(memoryStore.keys())[index] ?? null,
  removeItem: (key) => {
    memoryStore.delete(key);
  },
  setItem: (key, value) => {
    memoryStore.set(key, value);
  },
};
