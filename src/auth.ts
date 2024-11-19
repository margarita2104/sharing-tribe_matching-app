import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./server/db";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { getAccountByUserId } from "./data/account";
import {
  type SoftSkills,
  type TechSkills,
  type Education,
  type WorkExperience,
  type availability,
  type employmentStatus,
  type jobRoleFamily,
  type workMode,
} from "./next-auth";
import { type JobPreference } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (user) {
        if (!user.id) return false;
        const existingUser = await getUserById(user.id);

        if (!existingUser?.emailVerified) return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.linkedinUrl = token.linkedinUrl as string;
        session.user.bio = token.bio as string;
        session.user.githubUrl = token.githubUrl as string;
        session.user.location = token.location as string;
        session.user.jobTitle = token.jobTitle as string;
        session.user.jobRoleFamily = token.jobRoleFamily as jobRoleFamily;
        session.user.employmentStatus =
          token.employmentStatus as employmentStatus;
        session.user.workMode = token.workMode as workMode;
        session.user.availability = token.availability as availability;
        session.user.currentCompany = token.currentCompany as string;
        session.user.id = token.id as string;
        session.user.workExperiences =
          token.workExperiences as WorkExperience[];
      }
      session.user.education = token.education as Education[];
      session.user.technicalSkills = token.technicalSkills as TechSkills[];
      session.user.softSkills = token.softSkills as SoftSkills[];
      session.user.jobPreferences = token.jobPreferences as JobPreference;

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.linkedinUrl = existingUser.linkedinUrl;
      token.bio = existingUser.bio;
      token.githubUrl = existingUser.githubUrl;
      token.location = existingUser.location;
      token.jobTitle = existingUser.jobTitle;
      token.jobRoleFamily = existingUser.jobRoleFamily;
      token.employmentStatus = existingUser.employmentStatus;
      token.workMode = existingUser.workMode;
      token.availability = existingUser.availability;
      token.currentCompany = existingUser.currentCompany;
      token.workExperiences = existingUser.workExperiences;
      token.education = existingUser.education;
      token.id = existingUser.id;
      token.technicalSkills = existingUser.technicalSkills;
      token.softSkills = existingUser.softSkills;
      token.jobPreferences = existingUser.jobPreferences;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
