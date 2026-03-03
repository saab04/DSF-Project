import Link from 'next/link'
import { setBookingActiveStatus } from '@/lib/bookings'

export default async function Cancel({ searchParams }) {
  const { booking_id: bookingId } = await searchParams
  if (bookingId) {
    await setBookingActiveStatus(Number(bookingId), false)
  }

    return (
    <div id="cancel" className="w-full h-full flex flex-col items-center justify-center gap-13">
      <div className="sm:max-w-200 max-w-[80vw]">
        <p className="text-center">
          Payment cancelled. If you have any questions, please email{' '}
           <a href="mailto:nextbooking@live.se">nextbooking@live.se</a>.
        </p>
      </div>
      <div className="flex justify-center flex-wrap gap-6 max-w-[90vw]">
        <Link 
            href="/"
            className="flex text-center justify-center items-center w-50 h-15 bg-buttons hover:bg-buttonsHover rounded-2xl text-[20px] shadow-xl text-textPrimary transition duration-200"
            >
            Back to home
        </Link>
        <Link 
            href="/dashboard"
            className="flex text-center justify-center items-center w-50 h-15 bg-buttons hover:bg-buttonsHover rounded-2xl text-[20px] shadow-xl text-textPrimary transition duration-200"
            >
            Your account
        </Link>
      </div>
    </div>
    )
  }
