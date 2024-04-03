import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "webmarks",
  description: "A simple and easy-to-use platform for taking notes on the web",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`relative ${inter.className} text-gray-800 dark:text-gray-100 bg-neutral-100 dark:bg-neutral-900`}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
