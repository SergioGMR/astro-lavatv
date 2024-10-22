import { create } from "zustand";

export const useStore = create((set) => ({
    currentProfile: null,
    setCurrentProfile: (profile) => set({ currentProfile: profile }),
}));
