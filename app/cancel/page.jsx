import Link from 'next/link'
import { setBookingActiveStatus } from '@/lib/bookings'

export default async function Cancel({ searchParams }) {
  const { booking_id: bookingId } = await searchParams
  if (bookingId) {
    await setBookingActiveStatus(bookingId, false)
  }

    return (
    <div id="cancel">
      <section>
        <p>
          Payment cancelled. If you have any questions, please email{' '}
        </p>
        <a href="mailto:NextBooking@live.se">NextBooking@live.se</a>.
        </section>
        <div className="flex flex-row gap-6 mt-8 justify-center">
        <Link 
            href="/"
            className="flex text-center justify-center items-center w-[200px] h-[60px] bg-buttons hover:bg-buttonsHover rounded-2xl text-[20px] shadow-xl text-textPrimary transition duration-200 active:scale-95"
            >
            Back to home
        </Link>
        <Link 
            href="/dashboard/account"
            className="flex text-center justify-center items-center w-[200px] h-[60px] bg-buttons hover:bg-buttonsHover rounded-2xl text-[20px] shadow-xl text-textPrimary transition duration-200 active:scale-95"
            >
            Your account
        </Link>
        </div>
    </div>
    )
  }
