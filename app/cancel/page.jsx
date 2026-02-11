import { redirect } from 'next/navigation'
import Link from 'next/link'
import { stripe } from '@/lib/stripe'

export default async function Cancel({}) {
  
    return (
    <div id="cancel">
      <section>
        <p>
          Payment cancelled. If you have any questions, please email{' '}
        </p>
        <a href="mailto:NextBooking@live.se">NextBooking@live.se</a>.
        </section>
        <Link 
            href="/"
            className="w-15 h-15 text-[80px] flex justify-center items-center bg-buttons hover:bg-buttonsHover cursor-pointer transition rounded-xl duration-200 active:scale-95"
            >
            Back to home
        </Link>
        <Link 
            href="/dashboard/account"
            className="w-15 h-15 text-[80px] flex justify-center items-center bg-buttons hover:bg-buttonsHover cursor-pointer transition rounded-xl duration-200 active:scale-95"
            >
            Your account
        </Link>
    </div>
    )
  }
