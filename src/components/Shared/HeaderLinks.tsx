"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderLinks() {
  const currentPath = usePathname();
  return (
    <>
      <Link href="/">
        <Image
          src="/logo.svg"
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
    </>
  );
}
