import type { Metadata } from "next";
import { Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import UserMenu from "@/components/layout/UserMenu";

export const metadata: Metadata = {
  title: "NextBooking",
  description: "Hotel Booking System",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="flex items-center justify-between bg-primary text-textHF relative">
          <Link href="/" className="ml-7.5 text-[30px] z-3">
            NextBooking
          </Link>
          <UserMenu />
        </header>
        <main className="flex justify-center items-center bg-background relative">
          {children}
        </main>
        <footer className="flex justify-center bg-primary relative">
          <div className="absolute top-5 text-[32px] text-textHF">
            NextBooking
          </div>
        </footer>
      </body>
    </html>
  );
}
