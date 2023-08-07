import { getBookmarksById } from "@/actions/getBookmarks";
import { getCategoriesById } from "@/actions/getCategories";
import getCurrentUser from "@/actions/getCurrentUser";
import BookmarksList from "@/components/bookmarks/BookmarksList";
import Container from "@/components/Container";
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
  console.log(currentUser);

  return (
    <>
      <ToastClient />
      <AddCategoryModal />
      <DeleteCategoryModal />
      <EditCategoryModal categories={categories} />
      <EditBookmarkModal bookmarks={bookmarks} categories={categories} />
      <AddNewBookmarkModal categories={categories} bookmarks={bookmarks} />
      <Header currentUser={currentUser} />
      <Container>
        <BookmarksList bookmarks={bookmarks} categories={categories} />
      </Container>
    </>
  );
}
