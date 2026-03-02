import type { Metadata } from "next";
import { Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import UserMenu from "@/components/layout/UserMenu";
import { Mail, Phone } from "lucide-react";

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
          <Link href="/" className="ml-7.5 text-[30px] z-51">
            NextBooking
          </Link>
          <UserMenu />
        </header>
        <main className="flex justify-center items-center bg-background relative">
          {children}
        </main>
        <footer className="flex justify-center bg-primary relative">
          <div className="flex flex-col gap-3 absolute top-5 text-textHF">
            <div className="text-[32px]">NextBooking</div>
            <div className="flex flex-col items-center">
              <p>Contact us:</p>
              <div className="flex items-center gap-1.5">
                <Phone size={16} />
                <p>070-000 00 00</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail size={16} />
                <p>nextbooking@live.se</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
