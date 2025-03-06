import NavAuthButtons from "../NavAuthButtons";
import { UserButton } from "../auth/user-button";
import HeaderLinks from "./HeaderLinks";
import { auth } from "~/auth";
import { type Session } from "next-auth";
import { MobileNav } from "../mobile-nav";
import Link from "next/link";

export type UserProps = {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
    isOAuth: boolean;
  };
  expires: string;
};

const Header = async () => {
  const user: UserProps | Session | null = await auth();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-violet px-7 py-2 text-tree-poppy">
      <HeaderLinks />

      {user && (
        <div className="hidden md:block">
          <Link
            className="border-b-2 border-transparent hover:border-b-2 hover:border-tree-poppy"
            href="/candidates"
          >
            Candidates!
          </Link>
        </div>
      )}

      {user ? (
        <div className="flex gap-x-2">
          <div className="hidden md:block">
            <UserButton user={!user ? null : user} />
          </div>
          <div className="block md:hidden">
            <MobileNav user={!user ? null : user} />
          </div>
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <NavAuthButtons />
          </div>
          <div className="block md:hidden">
            <MobileNav user={!user ? null : user} />
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
