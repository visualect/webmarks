import { create } from "zustand";

export interface IModalState {
  isCategoryModalActive: boolean;
  closeCategoryModal: () => void;
  openCategoryModal: () => void;
}

export interface IBookmarkState {
  isBookmarkModalActive: boolean;
  closeBookmarkModal: () => void;
  openBookmarkModal: () => void;
}

export const useModalStore = create<IModalState>()((set) => ({
  isCategoryModalActive: false,
  closeCategoryModal: () => set(() => ({ isCategoryModalActive: false })),
  openCategoryModal: () => set(() => ({ isCategoryModalActive: true })),
}));

export const useBookmarkStore = create<IBookmarkState>()((set) => ({
  isBookmarkModalActive: true,
  closeBookmarkModal: () => set(() => ({ isBookmarkModalActive: false })),
  openBookmarkModal: () => set(() => ({ isBookmarkModalActive: true })),
}));
