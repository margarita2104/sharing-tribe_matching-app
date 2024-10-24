import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function NavAuthButtons() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src={session.user.image ?? "/default-profile.png"}
              width={40}
              height={40}
              className="cursor-pointer rounded-full"
              alt="User profile picture"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => signOut()}
                className="cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center justify-center gap-7">
          <Link
            className="border-b-2 border-transparent font-semibold hover:border-b-2 hover:border-tree-poppy"
            href="/sign"
          >
            Sign in
          </Link>
          <Link
            className="rounded-2xl bg-tree-poppy px-5 py-2 text-violet hover:bg-flush-orange"
            href="/join"
          >
            Join
          </Link>
        </div>
      )}
    </>
  );
}
