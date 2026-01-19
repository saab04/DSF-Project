hotel-booking-app/ (Ungefärlig struktur????)
├─ app/
│ ├─ (auth)/ # Route group för inloggning/registrering
│ │ ├─ login/
│ │ │ └─ page.tsx # Login-sida
│ │ ├─ register/
│ │ │ └─ page.tsx # Registrerings-sida
│ │ └─ layout.tsx # Auth-layout (ingen navbar)
│ │
│ ├─ (dashboard)/ # Route group för vanliga användare
│ │ ├─ dashboard/
│ │ │ └─ page.tsx # User dashboard / översikt
│ │ ├─ bookings/
│ │ │ ├─ page.tsx # Lista mina bokningar
│ │ │ └─ new/page.tsx # Skapa ny bokning
│ │ └─ layout.tsx # Dashboard-layout med navbar
│ │
│ ├─ (admin)/ # Route group för admins
│ │ ├─ admin/
│ │ │ └─ page.tsx # Admin-översikt
│ │ ├─ bookings/
│ │ │ └─ page.tsx # Alla bokningar (admin)
│ │ ├─ users/
│ │ │ └─ page.tsx # Lista alla användare
│ │ └─ layout.tsx # Admin-layout med admin-navbar
│ │
│ ├─ layout.tsx # Root-layout
│ └─ page.tsx # Landningssida / startsida
│
├─ app/api/ # Server-endpoints
│ ├─ bookings/
│ │ └─ route.ts # CRUD för bokningar (server-side)
│ └─ users/
│ └─ route.ts # CRUD för användare/admin
│
├─ components/
│ ├─ auth/
│ │ ├─ LoginForm.tsx
│ │ └─ RegisterForm.tsx
│ │
│ ├─ bookings/
│ │ ├─ BookingForm.tsx
│ │ ├─ BookingList.tsx
│ │ └─ AdminBookingList.tsx
│ │
│ ├─ admin/
│ │ └─ AdminNav.tsx
│ │
│ ├─ layout/
│ │ └─ Navbar.tsx
│ │
│ └─ ui/
│ ├─ Button.tsx
│ └─ Input.tsx
│
├─ lib/
│ ├─ supabase/
│ │ ├─ client.ts # Client-side Supabase
│ │ └─ server.ts # Server-side Supabase
│ │
│ └─ auth.ts # Rollkontroller och helper-funktioner
│
├─ public/
│ └─ favicon.ico
│
├─ .env.local # Miljövariabler (Supabase URL & key)
├─ package.json
└─ tsconfig.json
