import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
import Header from "./_components/Shared/Header";
import Footer from "./_components/Shared/Footer";

import { getServerAuthSession } from "~/server/auth";
import Providers from "./components/SessionProvider";

export const metadata: Metadata = {
  title: "Sharing Tribe",
  description: "Connect with people who share your interests.",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={inter.className}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
