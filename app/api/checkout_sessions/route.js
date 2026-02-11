import { NextResponse } from 'next/server'


import { stripe } from '../../../lib/stripe'

export async function POST(request) {
  try {
    const headersList = request.headers
    const origin = headersList.get('origin') || headersList.get('referer')

    let smallRooms = 0
    let mediumRooms = 0
    let largeRooms = 0
    // simple fallback


    const formData = await request.formData()
    if (formData && typeof formData.get === 'function') {
      smallRooms = parseInt(formData.get('smallRooms')?.toString() || '0', 10)
      mediumRooms = parseInt(formData.get('mediumRooms')?.toString() || '0', 10)
      largeRooms = parseInt(formData.get('largeRooms')?.toString() || '0', 10)
    }
    else {
      // formData kan få cancer, fallback om det inte funkar
      const text = await request.text()
      const params = new URLSearchParams(text)
      smallRooms = parseInt(params.get('smallRooms') || '0', 10)
      mediumRooms = parseInt(params.get('mediumRooms') || '0', 10)
      largeRooms = parseInt(params.get('largeRooms') || '0', 10)
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

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    })

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json({ error: err.message || String(err) }, { status: err.statusCode || 500 })
  }
}