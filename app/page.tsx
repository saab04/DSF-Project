import Slideshow from "@/components/layout/Slideshow";
import { Car, Coffee, Dumbbell, Wifi } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="w-full -m-5 flex flex-col">
      <section className="relative w-full min-h-[calc(100dvh-var(--header-h))]">
        <div className="absolute inset-0">
          <Slideshow />
        </div>
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div className="relative z-10 flex min-h-[calc(100dvh-var(--header-h))] w-full flex-col items-center justify-center px-6 text-center text-foreground">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wide">
            DSF Hotel
          </h1>
          <p className="mt-4 text-xl sm:text-2xl lg:text-3xl font-bold">
            The best hotel in DSFborg
          </p>
          <Link
            href="/bookings/date"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-buttons px-8 py-4 text-lg font-bold text-textPrimary shadow-xl transition-colors hover:bg-buttonsHover"
          >
            Make your reservation
          </Link>
        </div>
      </section>

      <section className="w-full bg-black/10">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-6 px-6 py-6 text-black sm:gap-10 sm:py-8">
          <div className="flex items-center gap-3">
            <Wifi className="h-6 w-6 text-black" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wide text-black">
              Free Wi-Fi
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Coffee className="h-6 w-6 text-black" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wide text-black">
              Breakfast
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Car className="h-6 w-6 text-black" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wide text-black">
              Parking
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Dumbbell className="h-6 w-6 text-black" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wide text-black">
              Gym Access
            </span>
          </div>
        </div>
      </section>

      <section className="relative w-full min-h-[60dvh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/gym-bg-1.webp')",
          }}
        />
        <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-center text-center text-foreground px-6">
          <h2 className="text-4xl sm:text-5xl font-bold">Train with us!</h2>
          <a
            href="https://skolprojekt.vercel.app/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-buttons px-8 py-4 text-lg font-bold text-textPrimary shadow-xl transition-colors hover:bg-buttonsHover"
          >
            Book training sessions with our gym
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
