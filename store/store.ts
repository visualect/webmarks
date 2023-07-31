import { create } from "zustand";

export interface ICategoryState {
  isCategoryModalActive: boolean;
  closeCategoryModal: () => void;
  openCategoryModal: () => void;
}

export interface IBookmarkState {
  isBookmarkModalActive: boolean;
  closeBookmarkModal: () => void;
  openBookmarkModal: () => void;
}

export const useCategoryStore = create<ICategoryState>()((set) => ({
  isCategoryModalActive: false,
  closeCategoryModal: () => set(() => ({ isCategoryModalActive: false })),
  openCategoryModal: () => set(() => ({ isCategoryModalActive: true })),
}));

export const useBookmarkStore = create<IBookmarkState>()((set) => ({
  isBookmarkModalActive: false,
  closeBookmarkModal: () => set(() => ({ isBookmarkModalActive: false })),
  openBookmarkModal: () => set(() => ({ isBookmarkModalActive: true })),
}));
