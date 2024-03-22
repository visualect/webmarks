import Container from "../Container";
import UserLabel from "./UserLabel";


export default function Header() {

  return (
    <header className="bg-transparent">
      <Container>
        <div className="flex flex-row items-center justify-between gap-8 py-5">
          <div className="font-bold">webmarks</div>
          <UserLabel />
        </div>
      </Container>
    </header>
  );
}

