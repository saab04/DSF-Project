DSF Project , hotel booking system

├── app/
│   ├── (admin)/
│   │   └── admin/
│   │       └── page.tsx
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── bookings/
│   │   │   ├── date/
│   │   │   │   └── page.tsx
│   │   │   ├── payment/
│   │   │   │   └── page.tsx
│   │   │   └── rooms/
│   │   │       └── page.tsx
│   │   └── dashboard/
│   │       ├── account/
│   │       │   └── page.tsx
│   │       └── page.tsx
│   ├── api/
│   │   ├── checkout_sessions/
│   │   │   └── route.js
│   │   └── stripe_webhook/
│   │       └── route.js
│   ├── cancel/
│   │   └── page.jsx
│   ├── success/
│   │   └── page.jsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   ├── FormDisplay.tsx
│   │   ├── LoginForm.tsx
│   │   ├── LogOutButton.tsx
│   │   └── SignUpForm.tsx
│   ├── bookings/
│   │   ├── BookingDisplay.tsx
│   │   ├── BookingPayment.tsx
│   │   ├── CancelBookingButton.tsx
│   │   ├── DateDisplay.tsx
│   │   ├── DateForm.tsx
│   │   └── RoomManager.tsx
│   └── layout/
│       ├── DropDown.tsx
│       ├── RoomSlider.tsx
│       ├── Slideshow.tsx
│       └── UserMenu.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── proxy.ts
│   │   └── server.ts
│   ├── auth.ts
│   ├── bookings.ts
│   └── stripe.js
├── public/
│   ├── bed-4416515_1920.webp
│   ├── favicon.ico
│   ├── gym-bg-1.webp
│   └── hotel-1979406_1920.webp
├── .gitignore
├── eslint.config.mjs
├── globals.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── proxy.ts
├── README.md
├── tsconfig.json
└── vercel.json

