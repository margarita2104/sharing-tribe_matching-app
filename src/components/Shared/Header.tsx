import NavAuthButtons from "../NavAuthButtons";
import { UserButton } from "../auth/user-button";
import HeaderLinks from "./HeaderLinks";
import { auth } from "~/auth";
import { type Session } from "next-auth";

type UserProps = {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
    isOath: boolean;
  };
  expires: string;
};

const Header = async () => {
  const user: UserProps | Session | null = await auth();
  console.log(user);
  return (
    <header className="sticky top-0 flex items-center justify-between bg-violet px-7 py-2 text-tree-poppy">
      <HeaderLinks />
      {user ? <UserButton user={!user ? null : user} /> : <NavAuthButtons />}
    </header>
  );
};

export default Header;
