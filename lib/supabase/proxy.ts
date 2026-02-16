import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { isAdmin } from '../auth'
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims
  const admin = await isAdmin()
  const url = request.nextUrl.clone()
  if (user && (request.nextUrl.pathname.startsWith('/login'))) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if (!user && request.nextUrl.pathname.startsWith('/bookings/payment')) {
    url.pathname = '/login'
    const callbackUrl = request.nextUrl.pathname + '?' + request.nextUrl.searchParams
    url.searchParams.set('callbackUrl', callbackUrl)
    return NextResponse.redirect(url)
  }

  if (!admin && request.nextUrl.pathname.startsWith('/admin')) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}