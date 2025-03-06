import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { type Metadata } from "next";
import Header from "../components/Shared/Header";
import Footer from "../components/Shared/Footer";
import Container from "../components/Container";
import { SessionProvider } from "next-auth/react";
import { auth } from "~/auth";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "Sharing Tribe",
  description: "Connect with people who share your interests.",
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" className={inter.className}>
        <body className="overflow-y-scroll">
          <Header />
          <Container>{children}</Container>
          <Footer />
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
