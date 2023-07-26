import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AddCategoryModal from "@/components/modals/AddCategoryModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Webmarks",
  description: "A simple and easy-to-use platform for taking notes on the web",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`relative ${inter.className} bg-gradient-to-r from-gray-50 from-1% to-100% to-white`}
      >
        <AddCategoryModal />
        {children}
      </body>
    </html>
  );
}
