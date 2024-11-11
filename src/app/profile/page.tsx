"use client";
import AuthSessionProvider from "~/components/auth/auth-session-wrapper";

import Profile from "./components/profile";

export default function ProfileMain() {
  return (
    <AuthSessionProvider>
      <Profile />
    </AuthSessionProvider>
  );
}


