"use client";
import Link from "next/link";

export default function NavAuthButtons() {
  return (
    <>
      <div className="flex items-center justify-center gap-7">
        <Link
          className="border-b-2 border-transparent font-semibold hover:border-b-2 hover:border-tree-poppy"
          href="/auth/login"
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
    </>
  );
}
