import { redirect } from 'next/navigation'
import Link from 'next/link'
import { stripe } from '@/lib/stripe'

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
    <div id="success">
      <section>
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail}. If you have any questions, please email{' '}
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
              href="/dashboard"
              className="flex text-center justify-center items-center w-[200px] h-[60px] bg-buttons hover:bg-buttonsHover rounded-2xl text-[20px] shadow-xl text-textPrimary transition duration-200 active:scale-95"
              >
             Your account
          </Link>
        </div>
    </div>
    )
  }
}