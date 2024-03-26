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
        className={`relative ${inter.className} text-gray-800 dark:text-gray-100 bg-gradient-to-r from-gray-50 dark:from-neutral-900 from-1% to-100% to-white dark:to-neutral-950`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
