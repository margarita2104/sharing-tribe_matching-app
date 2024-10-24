import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { type Metadata } from "next";
import Header from "./_components/Shared/Header";
import Footer from "./_components/Shared/Footer";
import Container from "./components/Container";

export const metadata: Metadata = {
  title: "Sharing Tribe",
  description: "Connect with people who share your interests.",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Container>
          <Header />
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  );
}
