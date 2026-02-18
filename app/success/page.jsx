import { redirect } from 'next/navigation'
import Link from 'next/link'
import { stripe } from '@/lib/stripe'
import { CircleCheckBig } from 'lucide-react';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
    <div
      id="success"
      className="w-full h-full flex flex-col items-center justify-center gap-13"
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-[25px] text-center">Your booking is confirmed</h2>
        <CircleCheckBig className="w-30 h-30 text-green-400" />
      </div>
      <div className="sm:max-w-200 max-w-[80vw]">
        <p className="text-center">
          Thank You for choosing us - we truly appreciate your reservation. A
          confirmation email will be sent to {customerEmail}. If you have any
          questions, please email{" "}
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
          className="flex text-center justify-center items-center w-50 h-15 bg-buttons hover:bg-buttonsHover rounded-2xl text-[20px] shadow-xl text-textPrimary transition duration-200 "
        >
          Your account
        </Link>
      </div>
    </div>
    )
  }
}