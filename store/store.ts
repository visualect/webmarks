import { create } from "zustand";

export interface IModalState {
  isCategoryModalActive: boolean;
  closeCategoryModal: () => void;
  openCategoryModal: () => void;
}

export const useModalStore = create<IModalState>()((set) => ({
  isCategoryModalActive: false,
  closeCategoryModal: () => set(() => ({ isCategoryModalActive: false })),
  openCategoryModal: () => set(() => ({ isCategoryModalActive: true })),
}));
