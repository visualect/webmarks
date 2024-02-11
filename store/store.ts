import { create } from "zustand";

export interface ICategoryState {
  isCategoryModalActive: boolean;
  closeCategoryModal: () => void;
  openCategoryModal: () => void;
  isEditModalActive: boolean;
  closeEditModal: () => void;
  openEditModal: () => void;
  isDeleteModalActive: boolean;
  closeDeleteModal: () => void;
  openDeleteModal: () => void;
}

export const useCategoryStore = create<ICategoryState>()((set) => ({
  isCategoryModalActive: false,
  closeCategoryModal: () => set(() => ({ isCategoryModalActive: false })),
  openCategoryModal: () => set(() => ({ isCategoryModalActive: true })),
  isEditModalActive: false,
  closeEditModal: () => set(() => ({ isEditModalActive: false })),
  openEditModal: () => set(() => ({ isEditModalActive: true })),
  isDeleteModalActive: false,
  closeDeleteModal: () => set(() => ({ isDeleteModalActive: false })),
  openDeleteModal: () => set(() => ({ isDeleteModalActive: true })),
}));

export interface IBookmarkState {
  isBookmarkModalActive: boolean;
  closeBookmarkModal: () => void;
  openBookmarkModal: () => void;
  isEditModalActive: boolean;
  closeEditModal: () => void;
  openEditModal: () => void;
}

export const useBookmarkStore = create<IBookmarkState>()((set) => ({
  isBookmarkModalActive: false,
  closeBookmarkModal: () => set(() => ({ isBookmarkModalActive: false })),
  openBookmarkModal: () => set(() => ({ isBookmarkModalActive: true })),
  isEditModalActive: false,
  closeEditModal: () => set(() => ({ isEditModalActive: false })),
  openEditModal: () => set(() => ({ isEditModalActive: true })),
}));
