import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  isOAuth: boolean;
  linkedinUrl: string;
  bio: string;
};

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: ExtendedUser;
  }
}
