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
      <nav className="hidden w-2/4 md:flex md:justify-between">
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
          target="_blank"
          className="border-b-2 border-transparent hover:border-b-2 hover:border-tree-poppy"
          href="https://sharingtribe.tech"
        >
          Sharing Tribe
        </Link>
        <Link
          className={
            currentPath === "/disc"
              ? "font-semibold"
              : "border-b-2 border-transparent hover:border-b-2 hover:border-tree-poppy"
          }
          href="/disc"
        >
          DISC Personality Test
        </Link>
      </nav>
    </>
  );
}
