import { getBookmarksById } from "@/actions/getBookmarks";
import { getCategoriesById } from "@/actions/getCategories";
import getCurrentUser from "@/actions/getCurrentUser";
import BookmarksList from "@/components/BookmarksList";
import Container from "@/components/Container";
import Header from "@/components/header/Header";
import AddCategoryModal from "@/components/modals/AddCategoryModal";
import AddNewBookmarkModal from "@/components/modals/AddNewBookmarkModal";
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
      <AddCategoryModal />
      <AddNewBookmarkModal categories={categories} bookmarks={bookmarks} />
      <Header currentUser={currentUser} />
      <Container>
        <BookmarksList bookmarks={bookmarks} categories={categories} />
      </Container>
    </>
  );
}
