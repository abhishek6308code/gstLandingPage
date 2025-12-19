# GSTPro - Professional GST & Financial Services Platform

A comprehensive, production-ready financial services website for GST filing, bookkeeping, tax advisory, payroll management, and financial planning services targeting small businesses and freelancers in India.

## Overview

GSTPro is a full-featured web application built with modern technologies, providing a complete solution for financial services businesses. It includes public-facing pages, client authentication, a client portal, and an admin dashboard.

## Features

### Public Features
- **Responsive Landing Pages**: Home, Services, About, Pricing, Contact
- **Service Showcase**: Detailed information about 5 core services
- **Transparent Pricing**: Three-tier pricing structure with add-ons
- **Contact Form**: Enquiry submission with database storage
- **SEO Optimized**: Meta tags, semantic HTML, and performance optimization

### Authentication & User Management
- **Email/Password Authentication**: Powered by Supabase Auth
- **Role-Based Access Control**: Client and Admin roles
- **Secure Profile Management**: User profiles with business information
- **Protected Routes**: Page-level access control

### Client Portal
- **Dashboard Overview**: Statistics and recent activity
- **Document Management**: View and download financial documents
- **Profile Management**: View and update personal/business information
- **Real-time Data**: Live updates from Supabase

### Admin Panel
- **Enquiry Management**: View, filter, and update enquiries
- **Status Tracking**: Track enquiry progress (New → Contacted → Converted → Closed)
- **Admin Notes**: Internal notes for each enquiry
- **Analytics Dashboard**: Statistics and service interest breakdown
- **Client Overview**: Monitor business metrics

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: React Context API for authentication

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time Updates**: Supabase real-time subscriptions
- **Row Level Security**: Database-level security policies

### Development Tools
- **TypeScript**: Type safety across the application
- **ESLint**: Code quality and consistency
- **PostCSS & Autoprefixer**: CSS processing

## Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header with auth state
│   ├── Footer.tsx      # Footer with links and contact info
│   └── SEO.tsx         # SEO meta tag management
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── lib/                # Utilities and configurations
│   └── supabase.ts     # Supabase client and types
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Services.tsx    # Services listing
│   ├── Pricing.tsx     # Pricing plans
│   ├── About.tsx       # Company information
│   ├── Contact.tsx     # Contact form
│   ├── Login.tsx       # Authentication
│   ├── Signup.tsx      # Registration
│   ├── ClientPortal.tsx # Client dashboard
│   └── AdminPanel.tsx  # Admin dashboard
├── App.tsx             # Main app component with routing
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

### Database Schema

#### profiles
Stores extended user information
- `id` (uuid, FK to auth.users)
- `full_name` (text)
- `business_name` (text, nullable)
- `phone` (text)
- `gstin` (text, nullable)
- `role` (text: 'client' | 'admin')
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

#### enquiries
Stores contact form submissions
- `id` (uuid)
- `name` (text)
- `email` (text)
- `phone` (text)
- `business_name` (text, nullable)
- `service_type` (text: bookkeeping | gst_filing | tax_advisory | payroll | financial_planning | other)
- `message` (text)
- `status` (text: new | contacted | converted | closed)
- `admin_notes` (text, nullable)
- `created_at` (timestamptz)

#### documents
Stores client documents
- `id` (uuid)
- `user_id` (uuid, FK to auth.users)
- `title` (text)
- `description` (text, nullable)
- `file_path` (text)
- `file_type` (text: gst_return | invoice | tax_document | payroll | financial_report | other)
- `file_size` (integer)
- `uploaded_at` (timestamptz)
- `uploaded_by` (uuid, FK to auth.users)

### Security Features

#### Row Level Security (RLS)
All tables have RLS enabled with specific policies:

**Profiles**:
- Users can view/update their own profile
- Admins can view all profiles

**Enquiries**:
- Anyone can submit enquiries (insert)
- Only admins can view/update enquiries

**Documents**:
- Users can view their own documents
- Admins can view/upload documents for any user

#### Authentication Flow
1. User signs up with email/password
2. Supabase creates auth user
3. Profile record created automatically
4. User logged in and redirected to portal
5. Session managed by Supabase Auth
6. Protected routes check authentication state

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Git

### 1. Clone and Install
```bash
# Clone the repository
git clone <repository-url>
cd gstpro

# Install dependencies
npm install
```

### 2. Configure Supabase

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database to be ready

#### Run Database Migration
The migration file is located at `supabase/migrations/create_initial_schema.sql`

Execute it in your Supabase SQL Editor:
1. Go to SQL Editor in Supabase Dashboard
2. Copy the migration content
3. Run the SQL

#### Get API Credentials
1. Go to Settings → API in Supabase Dashboard
2. Copy the Project URL
3. Copy the anon/public API key

### 3. Environment Configuration

Create `.env` file in the project root:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Create Admin User

After signing up through the UI:
1. Go to Supabase Dashboard → Authentication → Users
2. Find your user
3. Go to SQL Editor
4. Run:
```sql
UPDATE profiles SET role = 'admin' WHERE id = 'your-user-id';
```

## Building for Production

```bash
# Type check
npm run typecheck

# Build
npm run build

# Preview build
npm run preview
```

The production build will be in the `dist/` directory.

## Key Features Implementation

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Hamburger menu for mobile
- Flexible grid layouts
- Touch-friendly interface

### SEO Optimization
- Dynamic meta tags per page
- Semantic HTML structure
- Proper heading hierarchy
- Open Graph tags for social sharing
- Descriptive alt texts
- Fast loading times

### Performance
- Code splitting by page
- Lazy loading components
- Optimized images
- Minimal bundle size
- Client-side routing for instant navigation
- Efficient re-renders with React hooks

### User Experience
- Smooth page transitions
- Loading states
- Error handling
- Form validation
- Success/error messages
- Intuitive navigation
- Consistent design language

## User Roles & Permissions

### Client Role
- Access to Client Portal
- View own documents
- View own profile
- Submit enquiries

### Admin Role
- Access to Admin Panel
- View all enquiries
- Update enquiry status
- Add admin notes
- View statistics
- Upload documents for clients

## Authentication Flow Details

### Sign Up
1. User fills registration form
2. Validates password match and length
3. Creates Supabase auth user
4. Creates profile record with role 'client'
5. Auto-login and redirect to portal

### Sign In
1. User enters email/password
2. Supabase validates credentials
3. Session created
4. Redirects based on role (client → portal, admin → admin panel)

### Sign Out
1. Clears Supabase session
2. Clears local state
3. Redirects to home page

## Testing Admin Features

To test admin features:

1. Create a regular account through signup
2. Update the role to 'admin' in Supabase Dashboard
3. Log out and log back in
4. You'll now see "Admin Panel" in the navigation

## Deployment

### Recommended Platforms
- **Vercel**: Best for Vite/React apps
- **Netlify**: Simple deployment with CI/CD
- **Cloudflare Pages**: Fast global CDN

### Environment Variables
Ensure these are set in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```

## Customization

### Branding
- Update colors in `tailwind.config.js`
- Replace "GSTPro" text throughout the application
- Update contact information in Footer component
- Modify pricing plans in Pricing page

### Services
- Edit service details in Services page
- Update service types in database and forms
- Modify pricing tiers

### Features
- Add new pages by creating components in `pages/`
- Add routes in `App.tsx`
- Extend database schema as needed
- Add new components in `components/`

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: 90+

## Security Best Practices
- All database access controlled by RLS
- Passwords hashed by Supabase Auth
- HTTPS enforced in production
- XSS protection via React
- CSRF protection via Supabase
- Input validation on forms
- SQL injection prevention via Supabase client

## Support & Documentation
- See `SITEMAP.md` for complete site structure
- Check Supabase documentation for database queries
- Refer to React documentation for component patterns

## License
Private - All rights reserved

## Credits
Built with React, TypeScript, Tailwind CSS, and Supabase.
#   G S T l a n d i n g P a g e  
 