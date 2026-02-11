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
        <Link 
            href="/"
            className="flex justify-flex text-center justify-center items-center w-full h-full absolute hover:bg-buttonsHover rounded-2xl items-center bg-buttons w-[30%] min-w-25 h-[120%] min-h-10 text-[20px] rounded-md cursor-pointer hover:bg-buttonsHover transition absolute sm:bottom-0 sm:right-0 sm:top-0 sm:mr-5 top-[250%] m-auto inset-0 disabled"
            >
            Back to home
        </Link>
        <Link 
            href="/dashboard/account"
            className="flex flex text-center justify-center items-center w-full h-full absolute hover:bg-buttonsHover rounded-2xl-center items-center bg-buttons w-[30%] min-w-25 h-[120%] min-h-10 text-[20px] rounded-md cursor-pointer hover:bg-buttonsHover transition absolute sm:bottom-0 sm:right-0 sm:top-0 sm:mr-5 top-[350%] m-auto inset-0 disabled"
            >
            Your account
        </Link>
    </div>
    )
  }
}