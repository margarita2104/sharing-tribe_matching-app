"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const currentPath = usePathname();

  return (
    <header className="flex sticky top-0 items-center justify-between bg-violet px-7 py-2 text-tree-poppy">
      <Link href="/">
        <Image
          src={"logo.svg"}
          alt="Sharing Tribe logo"
          width="180"
          height="64"
        />
      </Link>
      <nav className="flex w-2/4 justify-around">
        <Link
          className={
            currentPath === "/"
              ? "font-semibold"
              : "border-b-2 border-transparent hover:border-b-2 hover:border-tree-poppy"
          }
          href="/"
        >
          Home
        </Link>
        <Link
          className="border-b-2 border-transparent hover:border-b-2 hover:border-tree-poppy"
          href="https://sharingtribe.tech"
        >
          Sharing Tribe
        </Link>
        <Link
          className={
            currentPath === "/disctest"
              ? "font-semibold"
              : "border-b-2 border-transparent hover:border-b-2 hover:border-tree-poppy"
          }
          href="/disctest"
        >
          DISC Personality Test
        </Link>
      </nav>
      <div className="flex items-center justify-center gap-7">
        <Link
          className={
            currentPath === "/signin"
              ? "font-semibold"
              : "border-b-2 border-transparent hover:border-b-2 hover:border-tree-poppy"
          }
          href="/api/auth/signin"
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
    </header>
  );
};

export default Header;
