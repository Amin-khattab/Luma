# Luma

Luma is a simple one-to-one messaging app built with Next.js, Prisma, PostgreSQL, and Tailwind CSS.

## Features

- Sign up and log in with cookie-based auth
- One-to-one messaging between users
- Inbox and active conversation view
- Settings page
- Update username
- Logout
- Light and dark theme toggle

## Tech Stack

- Next.js 16
- React 19
- Prisma
- PostgreSQL
- Tailwind CSS 4
- bcryptjs

## Setup

1. Install dependencies:

```bash
npm install
```

2. Add your environment variables in `.env`:

```env
DATABASE_URL="postgresql://postgres:12345@localhost:5432/luma_db"
```

3. Push the Prisma schema and generate the client:

```bash
npx prisma db push
npx prisma generate
```

4. Start the dev server:

```bash
npm run dev
```

5. Open:

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
```

## App Structure

```text
app/
  page.tsx                 Sign up page
  login/page.tsx           Login page
  message/page.tsx         Messaging UI
  settings/page.tsx        Settings page
  api/
    sign_up/route.ts       Sign up handler
    login/route.ts         Login handler
    logout/route.ts        Logout handler
    message/send/route.ts  Send message handler
    settings/
      profile/route.ts     Update username
      theme/route.ts       Save theme preference
prisma/schema.prisma       Database schema
lib/prisma.ts              Prisma client
```

## Notes

- Auth is handled with an HTTP-only `UserId` cookie.
- Theme preference is stored in a `theme` cookie.
- This project is built as a clean MVP and currently supports text messaging only.

## Future Ideas

- Real-time updates with sockets or polling
- Message search
- Media uploads
- Password reset
- Profile customization
