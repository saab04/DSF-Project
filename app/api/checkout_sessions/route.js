import { NextResponse } from 'next/server'

import { createClient } from '../../../lib/supabase/server'
import { stripe } from '../../../lib/stripe'
import { createBooking, getAvailableRoomCounts } from '../../../lib/bookings'

export async function POST(request) {
  try {
    const delayMs = 150 + Math.floor(Math.random() * 300)
    await new Promise((resolve) => setTimeout(resolve, delayMs))

    const headersList = request.headers
    const origin = headersList.get('origin') || headersList.get('referer')

    let smallRooms = 0
    let mediumRooms = 0
    let largeRooms = 0
    let checkIn = ''
    let checkOut = ''
    let guests = 0
    // simple fallback


    const formData = await request.formData()
    if (formData && typeof formData.get === 'function') {
      smallRooms = parseInt(formData.get('smallRooms')?.toString() || '0', 10)
      mediumRooms = parseInt(formData.get('mediumRooms')?.toString() || '0', 10)
      largeRooms = parseInt(formData.get('largeRooms')?.toString() || '0', 10)
      checkIn = formData.get('checkIn')?.toString() || ''
      checkOut = formData.get('checkOut')?.toString() || ''
      guests = parseInt(formData.get('guests')?.toString() || '0', 10)
    }
    else {
      // formData kan få cancer, fallback om det inte funkar
      const text = await request.text()
      const params = new URLSearchParams(text)
      smallRooms = parseInt(params.get('smallRooms') || '0', 10)
      mediumRooms = parseInt(params.get('mediumRooms') || '0', 10)
      largeRooms = parseInt(params.get('largeRooms') || '0', 10)
      checkIn = params.get('checkIn') || ''
      checkOut = params.get('checkOut') || ''
      guests = parseInt(params.get('guests') || '0', 10)
      }


    const line_items = []

    
    if (smallRooms > 0) {
      line_items.push({ price: 'price_1SxrYwD6gvK2JNWtDQqtdRRs', quantity: smallRooms })
    }
    if (mediumRooms > 0) {
      line_items.push({ price: 'price_1SxrYcD6gvK2JNWtXKXBi9Ay', quantity: mediumRooms })
    }
    if (largeRooms > 0) {
      line_items.push({ price: 'price_1SxrBnD6gvK2JNWt1gogkpzH', quantity: largeRooms })
    }

    if (line_items.length === 0) {
      return NextResponse.json({ error: 'No rooms selected' }, { status: 400 })
    }

    if (!checkIn || !checkOut || !Number.isFinite(guests) || guests <= 0) {
      return NextResponse.json({ error: 'Missing booking details' }, { status: 400 })
    }

    const availabilityResult = await getAvailableRoomCounts()
    if ('error' in availabilityResult) {
      return NextResponse.json({ error: 'Could not verify availability' }, { status: 503 })
    }

    const { available } = availabilityResult
    if (
      smallRooms > available.small ||
      mediumRooms > available.medium ||
      largeRooms > available.large
    ) {
      return NextResponse.json({ error: 'Insufficient availability' }, { status: 409 })
    }

    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { id: bookingId, error: bookingError } = await createBooking({
      userId: user.id,
      checkIn,
      checkOut,
      guests,
      smallRooms,
      mediumRooms,
      largeRooms,
    })

    if (bookingError || !bookingId) {
      return NextResponse.json(
        { error: bookingError || 'Booking insert failed' },
        { status: 500 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      metadata: {
        booking_id: String(bookingId),
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
    })

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json({ error: err.message || String(err) }, { status: err.statusCode || 500 })
  }
}