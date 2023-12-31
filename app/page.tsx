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
import GlobalProvider from "@/providers/GlobalProvider";
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
    <GlobalProvider bookmarks={bookmarks} categories={categories}>
      <>
        <ToastClient />
        <AddCategoryModal />
        <DeleteCategoryModal />
        <EditCategoryModal />
        <EditBookmarkModal />
        <AddNewBookmarkModal />
        <div className="flex flex-col content-between min-h-screen gap-8">
          <Header currentUser={currentUser} />
          <BookmarksList />
          <Footer />
        </div>
      </>
    </GlobalProvider>
  );
}
