import { getBookmarksById } from "@/actions/getBookmarks";
import { getCategoriesById } from "@/actions/getCategories";
import getCurrentUser from "@/actions/getCurrentUser";
import BookmarksList from "@/components/bookmarks/BookmarksList";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import AddCategoryModal from "@/components/modals/AddCategoryModal";
import AddNewBookmarkModal from "@/components/modals/AddNewBookmarkModal";
import DeleteCategoryModal from "@/components/modals/DeleteCategoryModal";
import EditBookmarkModal from "@/components/modals/EditBookmarkModal";
import EditCategoryModal from "@/components/modals/EditCategoryModal";
import ToastClient from "@/utils/ToastClient";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }
  const bookmarks = await getBookmarksById(currentUser.id);
  const categories = await getCategoriesById(currentUser.id);

  return (
    <>
      <ToastClient />
      <AddCategoryModal />
      <DeleteCategoryModal />
      <EditCategoryModal categories={categories} />
      <EditBookmarkModal bookmarks={bookmarks} categories={categories} />
      <AddNewBookmarkModal categories={categories} />
      <div className="flex flex-col content-between min-h-screen gap-8">
        <Header currentUser={currentUser} />
        <BookmarksList bookmarks={bookmarks} categories={categories} />
        <Footer />
      </div>
    </>
  );
}
