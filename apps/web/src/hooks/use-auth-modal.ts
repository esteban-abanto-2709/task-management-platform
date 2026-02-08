import { create } from "zustand";

type AuthView = "login" | "register";

interface AuthModalStore {
  isOpen: boolean;
  view: AuthView;
  onOpen: (view?: AuthView) => void;
  onClose: () => void;
  onSwitchView: () => void;
}

export const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  view: "login",
  onOpen: (view = "login") => set({ isOpen: true, view }),
  onClose: () => set({ isOpen: false }),
  onSwitchView: () =>
    set((state) => ({ view: state.view === "login" ? "register" : "login" })),
}));
