import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { type Metadata } from "next";
import Header from "../components/Shared/Header";
import Footer from "../components/Shared/Footer";
import Container from "../components/Container";
import { auth } from "~/auth";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Sharing Tribe",
  description: "Connect with people who share your interests.",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
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
          <Header user={session?.user} />

          <Container>{children}</Container>
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
