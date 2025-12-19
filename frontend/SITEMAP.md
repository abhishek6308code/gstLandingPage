# GSTPro Website Sitemap

## Public Pages

### 1. Home Page (`/`)
**Purpose**: Landing page showcasing services and value proposition

**Key Sections**:
- Hero section with main value proposition
- Key statistics (500+ clients, 5000+ returns, 99.8% accuracy)
- Services overview with 5 main services
- Client testimonials
- Call-to-action sections

**SEO**:
- Title: "Home | GSTPro - Professional GST & Financial Services"
- Meta Description: Professional GST Filing, Bookkeeping, Tax Advisory & Financial Services for Small Businesses and Freelancers in India
- Keywords: GST filing, bookkeeping, tax advisory, payroll management, financial planning, small business accounting, India

### 2. Services Page (`/services`)
**Purpose**: Detailed information about all services offered

**Key Sections**:
- GST Registration & Filing (complete details + features)
- Bookkeeping Services (features + benefits)
- Tax Advisory (services included)
- Payroll Management (compliance & processing)
- Financial Planning (business growth services)
- Why Choose GSTPro section
- CTA for consultation

**SEO**:
- Title: "Our Services | GSTPro"
- Meta Description: Comprehensive GST Filing, Bookkeeping, Tax Advisory, Payroll Management & Financial Planning services for Indian businesses
- Keywords: GST services, bookkeeping India, tax advisory, payroll services, financial planning, chartered accountant

### 3. Pricing Page (`/pricing`)
**Purpose**: Transparent pricing plans and add-on services

**Key Sections**:
- 3 main pricing tiers:
  - Freelancer (₹999/month)
  - Small Business (₹2,999/month - Most Popular)
  - Enterprise (₹9,999/month)
- Add-on services with pricing
- FAQ section
- Money-back guarantee information
- Contact CTA

**SEO**:
- Title: "Pricing Plans | GSTPro"
- Meta Description: Transparent and affordable pricing for GST filing, bookkeeping, and financial services. Plans starting from ₹999/month
- Keywords: GST filing cost, bookkeeping charges, tax consultant fees, accounting services pricing India

### 4. About Page (`/about`)
**Purpose**: Company information, mission, values, and team

**Key Sections**:
- Company story and statistics
- Mission and Vision statements
- Core values (Integrity, Excellence, Client-Centric, Innovation)
- Expert team profiles (4 key team members)
- Why businesses choose us
- Call-to-action

**SEO**:
- Title: "About Us | GSTPro"
- Meta Description: Learn about GSTPro - India's trusted GST filing and financial services company. Expert team with 15+ years experience serving 500+ businesses
- Keywords: about GSTPro, chartered accountant firm, tax consultants India, financial services company

### 5. Contact Page (`/contact`)
**Purpose**: Contact information and enquiry form

**Key Sections**:
- Contact information (phone, email, address)
- Office hours
- Enquiry form with fields:
  - Full Name
  - Email Address
  - Phone Number
  - Business Name (optional)
  - Service Type (dropdown)
  - Message
- Quick response guarantee
- Link to client login

**Form Integration**: Saves to `enquiries` table in Supabase

**SEO**:
- Title: "Contact Us | GSTPro"
- Meta Description: Get in touch with GSTPro for professional GST filing, bookkeeping, and financial services. Call +91 98765 43210 or fill out our contact form
- Keywords: contact GSTPro, tax consultant contact, GST services inquiry, financial services India

## Authentication Pages

### 6. Login Page (`/login`)
**Purpose**: Client authentication

**Features**:
- Email/password authentication
- Error handling
- Link to signup page
- Redirects to Client Portal after login

**SEO**:
- Title: "Client Login | GSTPro"
- Meta Description: Login to your GSTPro account to access your dashboard, documents, and financial reports
- Keywords: client login, GST portal, account access

### 7. Signup Page (`/signup`)
**Purpose**: New client registration

**Form Fields**:
- Full Name
- Email Address
- Phone Number
- Business Name (optional)
- Password
- Confirm Password

**Process**:
- Creates auth user in Supabase
- Creates profile record
- Redirects to Client Portal

**SEO**:
- Title: "Sign Up | GSTPro"
- Meta Description: Create your GSTPro account to access professional GST filing, bookkeeping, and financial services
- Keywords: register, sign up, create account, GST services

## Protected Pages (Authenticated Users)

### 8. Client Portal (`/portal`)
**Purpose**: Client dashboard for managing documents and profile

**Access**: Requires authentication, clients only

**Tabs**:
1. **Overview**:
   - Total documents count
   - Account status
   - Recent activity
   - Recent documents list

2. **Documents**:
   - Full document library
   - Document details (title, type, size, date)
   - Download functionality
   - Filtered by user_id

3. **Profile**:
   - View personal information
   - Business details
   - GSTIN information
   - Account creation date
   - Contact support CTA

**Database Integration**:
- Reads from `profiles` table
- Reads from `documents` table (user's documents only)

### 9. Admin Panel (`/admin`)
**Purpose**: Administrative dashboard for managing enquiries

**Access**: Requires authentication, admin role only

**Tabs**:
1. **Statistics**:
   - Total enquiries count
   - Status breakdown (New, Contacted, Converted)
   - Service interest breakdown with charts

2. **Enquiries**:
   - Complete enquiry list
   - View details (name, contact, service, status, date)
   - Edit functionality:
     - Update status
     - Add admin notes
   - Filter and sort options

**Database Integration**:
- Full access to `enquiries` table
- Can update enquiry status and notes

## Navigation Structure

```
Home (/)
├── Services (/services)
├── Pricing (/pricing)
├── About (/about)
└── Contact (/contact)

Authentication
├── Login (/login) → redirects to Portal or Admin
└── Signup (/signup) → redirects to Portal

Protected Areas
├── Client Portal (/portal) - for clients
└── Admin Panel (/admin) - for admins
```

## User Flows

### New User Journey:
1. Land on Home page
2. Explore Services/Pricing
3. Contact via form OR Sign up
4. Create account
5. Access Client Portal
6. View documents and manage profile

### Returning User Journey:
1. Click Login
2. Enter credentials
3. Redirected to appropriate dashboard (Client Portal or Admin Panel based on role)
4. Access features based on role

### Admin Journey:
1. Login with admin credentials
2. View enquiries and statistics
3. Update enquiry status
4. Add notes for follow-up
5. Monitor conversion metrics

## SEO Strategy

All pages include:
- Semantic HTML structure
- Meta titles and descriptions
- Open Graph tags
- Keyword optimization
- Mobile-responsive design
- Fast loading times
- Internal linking structure
- Clear call-to-actions

## Performance Optimization

- Lazy loading for images
- Code splitting for pages
- Optimized bundle size
- Responsive images
- Minimal external dependencies
- Client-side routing for instant navigation
