import { Button } from "../components/ui/button";
import { type Session } from "next-auth";
import { CiMenuBurger } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import Link from "next/link";
import { LogoutButton } from "./auth/logout-button";
import { ExitIcon } from "@radix-ui/react-icons";
import { RxAvatar } from "react-icons/rx";

export function MobileNav({ user }: { user: Session | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-tree-poppy hover:bg-tree-poppy/75">
          <CiMenuBurger />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="w-full" href="/">
              Home
            </Link>

          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="w-full"
              target="_blank"
              href="https://sharingtribe.tech"
            >
              Sharing Tribe
            </Link>

          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="w-full" href="/disc">
              DISC Personality Test
            </Link>

          </DropdownMenuItem>
          {user && (
            <DropdownMenuItem>
              <Link className="w-full" href="/candidates">
                Candidates
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user ? (
            <DropdownMenuItem>
              <Avatar>
                <AvatarImage src={user.user.image ? user.user.image : ""} />
                <AvatarFallback>
                  <RxAvatar className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <Link className="w-full" href="/profile">
                Profile
              </Link>
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem>
                <Link className="w-full" href="/auth">
                  Sign in{" "}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Join</DropdownMenuItem>{" "}
            </>
          )}
        </DropdownMenuGroup>
        {user ? (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LogoutButton>
                <ExitIcon />
                Logout
              </LogoutButton>
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
