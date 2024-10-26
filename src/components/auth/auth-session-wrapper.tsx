"use client";
import { SessionProvider } from "next-auth/react";
import { type ReactNode, Suspense } from "react";

export default function AuthSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider>
      <Suspense fallback={null}>{children}</Suspense>
    </SessionProvider>
  );
}
