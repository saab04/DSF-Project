import type { Metadata } from "next";
import { Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import UserMenu from "@/components/layout/UserMenu";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";

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
        <footer className="flex flex-col bg-primary h-auto">
          <div className="w-full h-20 flex justify-center items-center gap-3 text-textHF">
            <div className="text-[32px]">NextBooking</div>
          </div>
          <div className="flex-1 flex justify-center gap-7 flex-wrap p-5">
            <div className="w-[80vw] h-30 sm:max-w-65 flex flex-col text-textHF">
              <p className="text-[20px] text-center py-2">Follow us</p>
              <div className="w-full flex-1 flex flex-col items-center gap-2">
                <div className="w-[80%] h-14 flex items-center justify-center gap-3">
                  <Facebook
                    size={45}
                    className="cursor-pointer hover:scale-120 transition"
                  />
                  <Instagram
                    size={45}
                    className="cursor-pointer hover:scale-120 transition"
                  />
                </div>
              </div>
            </div>
            <div className="w-[80vw] h-30 sm:max-w-65 flex flex-col text-textHF ">
              <p className="text-[20px] text-center py-2">Contact us</p>
              <div className="w-full flex-1 flex flex-col items-center gap-2">
                <div className="w-[80%] flex items-center justify-center gap-2">
                  <Phone size={18} />
                  <p>070-000 00 00</p>
                </div>
                <div className="w-[80%] flex items-center justify-center gap-2">
                  <Mail size={18} />
                  <p>070-000 00 00</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
