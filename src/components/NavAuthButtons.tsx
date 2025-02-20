"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavAuthButtons() {
  const currentPath = usePathname();

  return (
    <>
      <div className="flex items-center justify-center gap-2 lg:gap-7">
        <Link
          className={
            currentPath === "/auth/login"
              ? "font-semibold"
              : "border-b-2 border-transparent hover:border-b-2 hover:border-tree-poppy"
          }
          href="/auth/login"
        >
          Login
        </Link>
        <Link
          className="rounded-lg bg-tree-poppy px-5 py-2 text-violet hover:bg-flush-orange"
          href="/auth/register"
        >
          Register
        </Link>
      </div>
    </>
  );
}
