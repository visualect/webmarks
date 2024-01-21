import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "webmarks",
  description: "A simple and easy-to-use platform for taking notes on the web",
  applicationName: "webmarks",
  appleWebApp: true,
  manifest: "/manifest.json"
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`relative ${inter.className} text-gray-800 bg-gradient-to-r from-gray-50 from-1% to-100% to-white`}
      >
        {children}
      </body>
    </html>
  );
}
