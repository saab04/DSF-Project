import Slideshow from "@/components/layout/Slideshow";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
const HomePage = () => {
  return (
    <div className="w-[90%] h-full flex justify-center items-center lg:gap-25 gap-7 flex-wrap lg:flex-nowrap">
      <div className="lg:w-[20vw] sm:w-[40vw] w-[70vw] min-h-47.5 aspect-3/2 lg:aspect-2/3 bg-buttons rounded-2xl text-[30px] shadow-xl text-textPrimary relative">
        <Link
          href="/bookings/date"
          className="flex text-center justify-center items-center w-full h-full absolute hover:bg-buttonsHover rounded-2xl"
        >
          <p className="w-[90%]">Make your reservation</p>
        </Link>
      </div>
      <div className="sm:w-[60vw] w-[90vw] aspect-1920/1280 min-h-47.5 shadow-xl bg-background rounded-2xl">
        <Slideshow />
      </div>
    </div>
  );
};

export default HomePage;
