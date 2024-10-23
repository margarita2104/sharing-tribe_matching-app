import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { getServerAuthSession } from "~/server/auth";
import Providers from "./components/SessionProvider";

export const metadata: Metadata = {
  title: "Sharing Tribe",
  description: "Connect with people who share your interests.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
