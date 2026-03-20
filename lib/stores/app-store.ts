import { create } from "zustand";

interface AppState {
  // Add your global state here
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAppStore = create<AppState>()(_set => ({}));
