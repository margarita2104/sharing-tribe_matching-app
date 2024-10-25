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
import { type User } from "@prisma/client";

export const UserButton = ({ user }: { user: User }) => {
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user.image ? (
          <Image
            src={user.image}
            height={36}
            width={36}
            alt="Profile picture"
            className="rounded-full"
          />
        ) : (
          <RxAvatar className="h-6 w-6" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
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
