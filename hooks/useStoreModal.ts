import { create } from "zustand";

interface IUseModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useModalStore = create<IUseModalStore>()((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));
