import type { Metadata } from "next";
import { epilogue, clashDisplay } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickHire - Discover Your Dream Job",
  description: "Modern job board platform connecting talented professionals with opportunities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${epilogue.variable} ${clashDisplay.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}