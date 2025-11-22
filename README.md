This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Supabase Setup

This project is configured to use Supabase for authentication and database.

1. Create a new Supabase project at [database.new](https://database.new)
2. Get your project URL and API key from the [API Settings](https://app.supabase.com/project/_/settings/api)
3. Create a `.env.local` file in the root directory with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_... or anon key
```

4. The Supabase client is configured in:
   - `src/utils/supabase/server.ts` - Server-side client
   - `src/utils/supabase/client.ts` - Client-side client
   - `src/middleware.ts` - Authentication middleware

5. **Set up the database tables:**
   - Go to your Supabase project's SQL Editor
   - Run the migration file: `supabase/migrations/001_create_admins_table.sql`
   - This will create the `admins` table and set up automatic user creation triggers

6. **Database Schema:**
   - `admins` table: Stores user information (username, display_name, email, role, etc.)
   - Automatically created when a user signs up via the trigger function
   - Row Level Security (RLS) is enabled for data protection

For more information, see the [Supabase Next.js Quickstart Guide](https://supabase.com/docs/guides/auth/quickstarts/nextjs).

## Database Structure

### Admins Table
The `admins` table stores user profile information:
- `id` (UUID): References `auth.users(id)`
- `username` (VARCHAR): Unique username
- `display_name` (VARCHAR): Display name
- `email` (VARCHAR): User email
- `role` (VARCHAR): User role (default: 'admin')
- `avatar_url` (TEXT): Profile picture URL
- `created_at` (TIMESTAMP): Account creation time
- `updated_at` (TIMESTAMP): Last update time

### Automatic User Creation
When a user signs up through Authentication, a trigger automatically creates a corresponding record in the `admins` table with the user's metadata.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
