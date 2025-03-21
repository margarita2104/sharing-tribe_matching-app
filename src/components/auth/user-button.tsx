import { ExitIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogoutButton } from "./logout-button";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";
import { type Session } from "next-auth";
import Link from "next/link";

export const UserButton = ({ user }: { user: Session | null }) => {
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user.user?.image ? (
          <Image
            src={user?.user?.image}
            height={36}
            width={36}
            alt="Profile picture"
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <RxAvatar className="h-6 w-6" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link className="w-full" href="/profile">
            Profile
          </Link>
        </DropdownMenuItem>

        <div className="border-b-2 border-slate-100" />
        <DropdownMenuItem>
          <LogoutButton>
            <ExitIcon />
            Logout
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
