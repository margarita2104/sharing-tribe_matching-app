import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [LinkedIn, Google],
});
