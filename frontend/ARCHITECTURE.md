# GSTPro - Technical Architecture & Authentication Flow

## Technology Stack Overview

### Frontend Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Application                     │
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │   Pages    │  │ Components │  │  Contexts  │       │
│  │            │  │            │  │            │       │
│  │ - Home     │  │ - Header   │  │ - Auth     │       │
│  │ - Services │  │ - Footer   │  │ Context    │       │
│  │ - Pricing  │  │ - SEO      │  │            │       │
│  │ - About    │  │            │  │            │       │
│  │ - Contact  │  │            │  │            │       │
│  │ - Login    │  │            │  │            │       │
│  │ - Signup   │  │            │  │            │       │
│  │ - Portal   │  │            │  │            │       │
│  │ - Admin    │  │            │  │            │       │
│  └────────────┘  └────────────┘  └────────────┘       │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Supabase Client Library             │  │
│  │  (Database, Auth, Real-time Subscriptions)       │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   Supabase Backend                       │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  PostgreSQL  │  │ Supabase Auth│  │  Row Level   │ │
│  │   Database   │  │   Service    │  │   Security   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Tech Stack Details

**Frontend:**
- React 18.3.1
- TypeScript 5.5.3
- Vite 5.4.2
- Tailwind CSS 3.4.1
- Lucide React 0.344.0

**Backend/Database:**
- Supabase (PostgreSQL)
- Supabase Auth
- Supabase Client JS 2.57.4

**Development Tools:**
- ESLint for code quality
- TypeScript for type safety
- PostCSS & Autoprefixer

## Database Architecture

### Entity Relationship Diagram

```
┌─────────────────┐
│   auth.users    │ (Supabase managed)
│  ─────────────  │
│  id (PK)        │
│  email          │
│  created_at     │
└────────┬────────┘
         │
         │ 1:1
         ↓
┌─────────────────┐         ┌─────────────────┐
│    profiles     │         │   documents     │
│  ─────────────  │         │  ─────────────  │
│  id (PK, FK)    │←─────┐  │  id (PK)        │
│  full_name      │      │  │  user_id (FK)   │
│  business_name  │   1:N│  │  title          │
│  phone          │      └──│  description    │
│  gstin          │         │  file_path      │
│  role           │         │  file_type      │
│  created_at     │         │  file_size      │
│  updated_at     │         │  uploaded_at    │
└─────────────────┘         │  uploaded_by(FK)│
                            └─────────────────┘

┌─────────────────┐
│   enquiries     │
│  ─────────────  │
│  id (PK)        │
│  name           │
│  email          │
│  phone          │
│  business_name  │
│  service_type   │
│  message        │
│  status         │
│  admin_notes    │
│  created_at     │
└─────────────────┘
```

### Database Tables

#### auth.users (Managed by Supabase)
- System table for authentication
- Stores email, password hash, metadata
- Automatically managed by Supabase Auth

#### profiles
```sql
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text NOT NULL,
  business_name text,
  phone text NOT NULL,
  gstin text,
  role text NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Purpose**: Extended user information
**Relationships**: 1:1 with auth.users
**Indexes**: role (for admin queries)

#### enquiries
```sql
CREATE TABLE enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  business_name text,
  service_type text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  admin_notes text,
  created_at timestamptz DEFAULT now()
);
```

**Purpose**: Store contact form submissions
**Indexes**: status, created_at (for admin panel queries)

#### documents
```sql
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size integer DEFAULT 0,
  uploaded_at timestamptz DEFAULT now(),
  uploaded_by uuid NOT NULL REFERENCES auth.users
);
```

**Purpose**: Track client documents
**Relationships**: N:1 with auth.users (user_id), N:1 with auth.users (uploaded_by)
**Indexes**: user_id, uploaded_at (for client portal queries)

## Authentication Flow

### Complete Authentication Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    User Journey Flow                          │
└──────────────────────────────────────────────────────────────┘

NEW USER REGISTRATION:
─────────────────────

┌─────────┐     ┌─────────┐     ┌──────────┐     ┌──────────┐
│  User   │────>│ Signup  │────>│ Supabase │────>│ Database │
│ Visits  │     │  Page   │     │   Auth   │     │          │
└─────────┘     └─────────┘     └──────────┘     └──────────┘
                     │                │                 │
                     │  1. Fill Form  │                 │
                     │     - Email    │                 │
                     │     - Password │                 │
                     │     - Name     │                 │
                     │     - Phone    │                 │
                     │                │                 │
                     │  2. Submit     │                 │
                     │────────────────>│                 │
                     │                 │  3. Create User │
                     │                 │────────────────>│
                     │                 │                 │
                     │                 │  4. User Created│
                     │                 │<────────────────│
                     │                 │                 │
                     │  5. Create Profile                │
                     │───────────────────────────────────>│
                     │                 │                 │
                     │  6. Profile Created               │
                     │<───────────────────────────────────│
                     │                 │                 │
                     │  7. Auto Login  │                 │
                     │<────────────────│                 │
                     │                 │                 │
                     │  8. Redirect to Portal            │
                     └───────────────────────────────────┘

RETURNING USER LOGIN:
────────────────────

┌─────────┐     ┌─────────┐     ┌──────────┐     ┌──────────┐
│  User   │────>│  Login  │────>│ Supabase │────>│ Database │
│ Visits  │     │  Page   │     │   Auth   │     │          │
└─────────┘     └─────────┘     └──────────┘     └──────────┘
                     │                │                 │
                     │  1. Enter      │                 │
                     │     - Email    │                 │
                     │     - Password │                 │
                     │                │                 │
                     │  2. Submit     │                 │
                     │────────────────>│                 │
                     │                 │  3. Verify User │
                     │                 │────────────────>│
                     │                 │                 │
                     │                 │  4. User Valid  │
                     │                 │<────────────────│
                     │                 │                 │
                     │  5. Session     │                 │
                     │     Created     │                 │
                     │<────────────────│                 │
                     │                 │                 │
                     │  6. Load Profile│                 │
                     │───────────────────────────────────>│
                     │                 │                 │
                     │  7. Profile Data│                 │
                     │<───────────────────────────────────│
                     │                 │                 │
                     │  8. Redirect based on role        │
                     │     - Client → Portal             │
                     │     - Admin → Admin Panel         │
                     └───────────────────────────────────┘

SESSION MANAGEMENT:
──────────────────

┌─────────┐     ┌──────────┐     ┌──────────┐
│  User   │────>│ Auth     │────>│ Supabase │
│ Active  │     │ Context  │     │          │
└─────────┘     └──────────┘     └──────────┘
                     │                │
                     │  1. Check Session on mount
                     │────────────────>│
                     │                 │
                     │  2. Session Valid/Invalid
                     │<────────────────│
                     │                 │
                     │  3. Listen for auth changes
                     │────────────────>│
                     │                 │
                     │  4. On change, update state
                     │<────────────────│
                     │                 │
                     └─────────────────┘
```

### Authentication Context (AuthContext.tsx)

```typescript
interface AuthContextType {
  user: User | null;              // Supabase auth user
  profile: Profile | null;        // Extended profile data
  session: Session | null;        // Current session
  loading: boolean;               // Loading state
  signUp: (email, password, userData) => Promise;
  signIn: (email, password) => Promise;
  signOut: () => Promise;
  isAdmin: boolean;               // Computed from profile.role
}
```

**Key Features:**
1. Manages authentication state globally
2. Provides auth methods to all components
3. Loads profile data automatically
4. Tracks admin status
5. Handles session persistence

### Protected Routes Implementation

```typescript
// In Page Components
useEffect(() => {
  if (!authLoading && !user) {
    onNavigate('login');  // Redirect if not authenticated
  }
}, [user, authLoading, onNavigate]);

// For Admin-only pages
useEffect(() => {
  if (!authLoading && (!user || !isAdmin)) {
    onNavigate('home');  // Redirect if not admin
  }
}, [user, isAdmin, authLoading, onNavigate]);
```

## Row Level Security (RLS) Policies

### Security Model

```
┌──────────────────────────────────────────────────────────────┐
│                 Row Level Security Flow                       │
└──────────────────────────────────────────────────────────────┘

USER QUERY:
──────────

User Request
     ↓
Supabase Client (with user's JWT token)
     ↓
PostgreSQL with RLS enabled
     ↓
Check RLS Policies
     │
     ├─ Policy 1: Check if user owns row
     │       └─ WHERE auth.uid() = user_id
     │
     ├─ Policy 2: Check if user is admin
     │       └─ WHERE EXISTS (SELECT role FROM profiles
     │                        WHERE id = auth.uid()
     │                        AND role = 'admin')
     │
     └─ Policy 3: Allow public access
             └─ USING (true)
     ↓
Return only authorized rows
```

### Profiles Table Policies

```sql
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### Enquiries Table Policies

```sql
-- Anyone can submit enquiries
CREATE POLICY "Anyone can submit enquiry"
  ON enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can view enquiries
CREATE POLICY "Admins can view all enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Only admins can update enquiries
CREATE POLICY "Admins can update enquiries"
  ON enquiries FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### Documents Table Policies

```sql
-- Users can view their own documents
CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view all documents
CREATE POLICY "Admins can view all documents"
  ON documents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can insert documents for any user
CREATE POLICY "Admins can insert documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

## Application State Management

### Component State Flow

```
┌──────────────────────────────────────────────────────────────┐
│                   Application State Flow                      │
└──────────────────────────────────────────────────────────────┘

App.tsx (Root)
  │
  ├─ AuthProvider (Context)
  │   │
  │   ├─ Manages: user, profile, session, isAdmin
  │   ├─ Methods: signUp, signIn, signOut
  │   └─ Available to all child components
  │
  ├─ Header Component
  │   ├─ Reads: user, profile, isAdmin (from AuthContext)
  │   └─ Shows/hides menu items based on auth state
  │
  ├─ Pages (Routes)
  │   │
  │   ├─ Public Pages (Home, Services, etc.)
  │   │   └─ No auth required, but aware of auth state
  │   │
  │   ├─ Auth Pages (Login, Signup)
  │   │   ├─ Call: signIn(), signUp()
  │   │   └─ Redirect after success
  │   │
  │   ├─ Client Portal
  │   │   ├─ Protected: Requires authentication
  │   │   ├─ Reads: user, profile (from AuthContext)
  │   │   └─ Queries: documents (filtered by user_id)
  │   │
  │   └─ Admin Panel
  │       ├─ Protected: Requires authentication + admin role
  │       ├─ Reads: user, profile, isAdmin (from AuthContext)
  │       └─ Queries: all enquiries (admin access)
  │
  └─ Footer Component
      └─ Static content
```

## API Integration Patterns

### Supabase Client Usage

```typescript
// Example: Fetching user documents
const loadDocuments = async () => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', user?.id)        // Filter by user
    .order('uploaded_at', { ascending: false });  // Sort

  if (error) throw error;
  setDocuments(data);
};

// Example: Submitting enquiry (public form)
const submitEnquiry = async (formData) => {
  const { error } = await supabase
    .from('enquiries')
    .insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service_type: formData.service_type,
      message: formData.message,
    });

  if (error) throw error;
};

// Example: Admin updating enquiry status
const updateEnquiry = async (enquiryId, updates) => {
  const { error } = await supabase
    .from('enquiries')
    .update({
      status: updates.status,
      admin_notes: updates.notes,
    })
    .eq('id', enquiryId);

  if (error) throw error;
};
```

## Performance Optimizations

### Code Splitting
- Each page is a separate component
- Lazy loading can be added for route-based splitting
- Reduces initial bundle size

### Database Queries
- Indexed columns for fast lookups
- RLS policies prevent over-fetching
- Specific field selection (not SELECT *)

### Caching Strategy
- Supabase handles connection pooling
- Browser caches static assets
- Session tokens stored in localStorage

### Image Optimization
- Use WebP format when possible
- Responsive images with srcset
- Lazy loading for below-fold images

## Security Considerations

### Frontend Security
- No sensitive data in client code
- Environment variables for API keys
- XSS protection via React
- Input validation on forms

### Backend Security
- All tables have RLS enabled
- JWT tokens for authentication
- Row-level access control
- SQL injection prevention via parameterized queries

### Data Privacy
- Passwords hashed by Supabase
- User data isolated by RLS
- Admin access logged
- HTTPS in production

## Deployment Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Production Setup                           │
└──────────────────────────────────────────────────────────────┘

Developer
     ↓
   [Git Push]
     ↓
GitHub Repository
     ↓
   [CI/CD Trigger]
     ↓
Vercel/Netlify/Cloudflare
     │
     ├─ Build: npm run build
     ├─ Test: npm run typecheck
     └─ Deploy: dist/ directory
     ↓
CDN (Static Assets)
     ↓
Users (Browser)
     ↓
Supabase API (Database + Auth)
```

### Environment Variables
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
```

### Build Configuration
- Output: `dist/` directory
- Build command: `npm run build`
- Build time: ~7 seconds
- Bundle size: ~365KB (gzipped: ~98KB)

## Monitoring & Maintenance

### Application Monitoring
- Supabase Dashboard for database metrics
- Error tracking in console
- Performance monitoring via Lighthouse

### Database Maintenance
- Regular backups via Supabase
- Monitor query performance
- Update indexes as needed
- Review RLS policies

### Security Audits
- Regular dependency updates
- Review auth logs
- Test RLS policies
- Penetration testing

## Scalability Considerations

### Current Capacity
- Supabase Free Tier: 500MB database, 2GB bandwidth
- Supabase Pro: Unlimited database, 8GB bandwidth
- Frontend: CDN serves static files (unlimited scale)

### Scaling Strategy
1. Database: Upgrade Supabase tier
2. Frontend: Auto-scales via CDN
3. Auth: Handled by Supabase (scales automatically)
4. File Storage: Add Supabase Storage for documents

### Future Enhancements
- Real-time notifications
- File upload functionality
- Advanced analytics dashboard
- Email notifications (via Supabase Functions)
- Payment integration
- Multi-language support

---

This architecture provides a solid foundation for a production-ready financial services platform with security, scalability, and maintainability built-in.
