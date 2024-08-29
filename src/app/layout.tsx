import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import * as React from "react";
import Main from "@/components/Main";
import { useTheme, ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aryan's Blog",
  description: "A blog website created by Aryan Randeriya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <ThemeProvider>
          <Main>{children}</Main>
        </ThemeProvider>
      </body>
    </html>
  );
}
