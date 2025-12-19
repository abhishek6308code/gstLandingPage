# GSTPro - Quick Setup Guide

This guide will help you get the GSTPro application up and running in minutes.

## Prerequisites

- Node.js 18 or higher installed
- A Supabase account (free tier is fine)
- Code editor (VS Code recommended)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including React, TypeScript, Tailwind CSS, and Supabase client.

### 2. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub (or create account)
4. Click "New Project"
5. Fill in:
   - Name: `gstpro` (or your choice)
   - Database Password: Create a strong password
   - Region: Choose closest to your users
6. Click "Create new project"
7. Wait 2-3 minutes for setup to complete

### 3. Run Database Migration

1. In your Supabase project, click "SQL Editor" in the left sidebar
2. Click "New Query"
3. Open the file: `supabase/migrations/create_initial_schema.sql` from this project
4. Copy all the SQL code
5. Paste it into the Supabase SQL Editor
6. Click "Run" button
7. You should see "Success. No rows returned"

This creates all necessary tables:
- `profiles` - User information
- `enquiries` - Contact form submissions
- `documents` - Client documents

### 4. Get API Credentials

1. In Supabase Dashboard, click "Settings" (gear icon) in left sidebar
2. Click "API" in the settings menu
3. You'll see two important values:
   - **Project URL**: Starts with `https://` and ends with `.supabase.co`
   - **anon/public key**: Long string starting with `eyJ...`
4. Keep this tab open for the next step

### 5. Configure Environment Variables

1. In your project root, create a new file named `.env`
2. Copy the following and paste into `.env`:

```env
VITE_SUPABASE_URL=YOUR_PROJECT_URL_HERE
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

3. Replace `YOUR_PROJECT_URL_HERE` with your Project URL from Supabase
4. Replace `YOUR_ANON_KEY_HERE` with your anon/public key from Supabase

Example:
```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 6. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

You should see:
```
  VITE v5.4.8  ready in 200 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 7. Test the Application

1. Open your browser to `http://localhost:5173`
2. You should see the GSTPro home page
3. Try navigating to different pages:
   - Services
   - Pricing
   - About
   - Contact

### 8. Create Your First Account

1. Click "Get Started" or "Sign up"
2. Fill in the registration form:
   - Full Name: Your name
   - Email: Your email
   - Phone: Any phone number
   - Business Name: (optional)
   - Password: At least 6 characters
   - Confirm Password: Same as password
3. Click "Create Account"
4. You'll be automatically logged in and redirected to the Client Portal

### 9. Create an Admin User

To access the Admin Panel:

1. First, sign up for an account (if you haven't already)
2. Go to your Supabase Dashboard
3. Click "Authentication" in the left sidebar
4. Click on "Users"
5. Find your user in the list
6. Copy your user ID (the long string of letters and numbers)
7. Click "SQL Editor" in the left sidebar
8. Run this query (replace YOUR_USER_ID with your actual ID):

```sql
UPDATE profiles SET role = 'admin' WHERE id = 'YOUR_USER_ID';
```

9. Log out of the application
10. Log back in
11. You should now see "Admin Panel" in the navigation

### 10. Test Contact Form

1. Go to the Contact page
2. Fill out the enquiry form
3. Submit it
4. Log in as admin (if you created an admin account)
5. Go to Admin Panel
6. You should see your enquiry in the list

## Common Issues & Solutions

### Issue: "Missing Supabase environment variables"

**Solution**: Make sure your `.env` file is in the project root (same folder as `package.json`) and contains both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

### Issue: Can't connect to database

**Solution**:
1. Check that your Supabase project is running (green status in dashboard)
2. Verify the URL in your `.env` file matches the one in Supabase settings
3. Restart your dev server (`Ctrl+C` then `npm run dev`)

### Issue: Can't sign up or login

**Solution**:
1. Go to Supabase Dashboard → Authentication → Policies
2. Make sure email confirmation is disabled for development
3. Check that the migration was run successfully
4. Try viewing the browser console for error messages

### Issue: 404 errors or blank pages

**Solution**:
1. Make sure all dependencies are installed (`npm install`)
2. Clear browser cache and reload
3. Check browser console for errors

## Building for Production

When you're ready to deploy:

1. Type check:
```bash
npm run typecheck
```

2. Build:
```bash
npm run build
```

3. Preview build:
```bash
npm run preview
```

The production files will be in the `dist/` folder.

## Next Steps

Now that your application is running:

1. **Customize Branding**: Update company name, colors, and contact info
2. **Test All Features**: Try all pages and functionality
3. **Add Content**: Update service descriptions and pricing
4. **Configure Email**: Set up Supabase email templates (optional)
5. **Deploy**: Choose a hosting platform (Vercel, Netlify, Cloudflare)

## Development Workflow

Typical development workflow:

```bash
# Start dev server
npm run dev

# In another terminal, type check while developing
npm run typecheck

# Before committing changes
npm run lint
npm run build
```

## Documentation

For more detailed information, see:

- `README.md` - Complete project documentation
- `SITEMAP.md` - All pages and their structure
- `WIREFRAMES.md` - Visual layouts for all pages
- `ARCHITECTURE.md` - Technical architecture and auth flow

## Getting Help

If you encounter issues:

1. Check the console in your browser (F12 → Console tab)
2. Check the terminal where `npm run dev` is running
3. Review the Supabase logs in the Dashboard
4. Consult the documentation files listed above

## Production Deployment

For deploying to production:

### Vercel (Recommended)
1. Push code to GitHub
2. Connect Vercel to your GitHub repo
3. Set environment variables in Vercel dashboard
4. Deploy

### Netlify
1. Push code to GitHub
2. Connect Netlify to your GitHub repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Set environment variables
6. Deploy

### Environment Variables in Production
Make sure to set both:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Support

For questions or issues with:
- **React/TypeScript**: Check React documentation
- **Tailwind CSS**: Check Tailwind documentation
- **Supabase**: Check Supabase documentation
- **This Project**: Review the documentation files

---

Congratulations! You now have a fully functional GST services website. Happy coding!
