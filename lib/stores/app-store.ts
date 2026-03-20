import { create } from "zustand";

// Add your global state properties here
type AppState = Record<string, never>;

export const useAppStore = create<AppState>()(() => ({}));
