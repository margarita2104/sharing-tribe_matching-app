import { type User } from "@prisma/client";
import NavAuthButtons from "../NavAuthButtons";
import { UserButton } from "../auth/user-button";
import HeaderLinks from "./HeaderLinks";

const Header = ({ user }: { user: User }) => {
  return (
    <header className="sticky top-0 flex items-center justify-between bg-violet px-7 py-2 text-tree-poppy">
      <HeaderLinks />
      {user ? <UserButton user={user} /> : <NavAuthButtons />}
    </header>
  );
};

export default Header;