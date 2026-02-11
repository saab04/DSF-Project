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
            className="flex text-center justify-center items-center w-full h-full absolute hover:bg-buttonsHover rounded-2xl"
            >
            Back to home
        </Link>
        <Link 
            href="/dashboard/account"
            className="flex text-center justify-center items-center w-full h-full absolute hover:bg-buttonsHover rounded-2xl justify-center items-center bg-buttons w-[30%] min-w-25 h-[120%] min-h-10 text-[20px] rounded-md cursor-pointer hover:bg-buttonsHover transition absolute sm:bottom-0 sm:right-0 sm:top-0 sm:mr-5 top-[350%] m-auto inset-0 disabled"
            >
            Your account
        </Link>
    </div>
    )
  }
