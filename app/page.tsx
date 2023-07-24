import getCurrentUser from "@/actions/getCurrentUser";
import Container from "@/components/Container";
import Header from "@/components/header/Header";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  return (
    <>
      <Header currentUser={currentUser} />
      <Container>Home page</Container>
    </>
  );
}
