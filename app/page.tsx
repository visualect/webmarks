import { getBookmarksById } from "@/actions/getBookmarks";
import getCurrentUser from "@/actions/getCurrentUser";
import BookmarksList from "@/components/BookmarksList";
import Container from "@/components/Container";
import Header from "@/components/header/Header";
import { redirect } from "next/navigation";
import { bookmarks } from "@/utils/bookmarks";

export default async function Home() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }
  // const bookmarks = await getBookmarksById(currentUser.id);

  return (
    <>
      <Header currentUser={currentUser} />
      <Container>
        <BookmarksList bookmarks={bookmarks} currentUser={currentUser} />
      </Container>
    </>
  );
}
