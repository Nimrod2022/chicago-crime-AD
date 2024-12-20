import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CrimeProvider } from "@/contexts/CrimeDataContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chicago Crime",
  description: "Chicago crimes visualization dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` h-screen bg-[#F0F3F9] ${inter.className}`}>
        <CrimeProvider>{children}</CrimeProvider>
      </body>
    </html>
  );
}
