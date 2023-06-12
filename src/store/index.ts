import { create } from "zustand";

export interface GlobalState {
  menuOpen: boolean;
  toggleMenu: (nextValue?: boolean) => void;
}

export const useGlobalState = create<GlobalState>()((set, get) => ({
  menuOpen: false,
  toggleMenu: (nextValue) =>
    set((state) => ({ menuOpen: nextValue ?? !state.menuOpen })),
}));