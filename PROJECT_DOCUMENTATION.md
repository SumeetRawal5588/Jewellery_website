# Varahi Jewels - Luxury Jewellery Website & Admin Panel

Comprehensive technical documentation covering every aspect of the website, admin panel, technologies used, features, architecture, and implementation details.

---

## 1. Project Overview

**Project Name:** Varahi Jewels  
**Brand Tagline:** *Celebrate the joy of emotions*  
**Domain:** Luxury jewellery e-commerce/catalog showcase  
**Frontend Type:** Server-rendered React application with client-side interactivity  
**Admin Panel:** In-browser content management system for products and catalogs  
**Data Storage:** PostgreSQL database (`products` and `catalogs` tables), with optional JSON seed/migration files (`data/products.json`, `data/catalogs.json`)  
**Image Uploads:** Local filesystem (`public/uploads/`)  
**Default Admin Password:** `PASSWORD` (hardcoded in `src/app/admin/layout.tsx`; UI label shows "aurum2024")

---

## 2. Technology Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| Framework | Next.js | 16.2.4 | React framework, App Router, API Routes, image optimization, font loading |
| UI Library | React | 19.2.4 | Component-based user interface |
| React DOM | react-dom | 19.2.4 | DOM rendering for React |
| Language | TypeScript | ^5 | Type safety and developer tooling |
| Styling | Tailwind CSS | ^4 | Utility-first CSS; `@tailwindcss/postcss` is used in PostCSS |
| PostCSS | @tailwindcss/postcss | ^4 | Tailwind v4 PostCSS integration |
| Animations | Framer Motion | 12.38.0 | React component animations, layout transitions, mobile menu |
| Animations | GSAP | ^3.15.0 | Advanced scroll-triggered and timeline animations |
| GSAP Plugin | ScrollTrigger | included in gsap | Scroll-based animation triggers |
| Icons | lucide-react | ^1.8.0 | SVG icon library |
| Email | @emailjs/browser | ^4.4.1 | Client-side contact form email delivery |
| UUIDs | uuid | ^14.0.0 | Generate unique IDs for products/catalogs |
| Type Definitions | @types/uuid | ^10.0.0 | TypeScript types for uuid |
| Linting | ESLint | ^9 | Code linting |
| Next ESLint | eslint-config-next | 16.2.4 | Next.js recommended ESLint rules |
|| Database | pg (PostgreSQL client) | ^8.23.0 | PostgreSQL connection pooling and queries |

### Fonts

- **Primary (Serif/Headings):** Playfair Display (Google Fonts via `next/font`)
- **Secondary (Sans/Serif Body):** Cormorant Garamond (Google Fonts via `next/font`)

### Environment Variables (`.env.local`)

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/varahi
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_9ddi8er
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_oe2fmpi
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=YzScrRmyfuGu1QAEU
```

- `DATABASE_URL` is used by `src/lib/postgres.ts` to connect to the PostgreSQL database.
- `NEXT_PUBLIC_EMAILJS_*` are used by the **Contact page** for sending emails via EmailJS.

---

## 3. Project Structure

```
luxury-jewels/
├── .env.local                    # Public EmailJS environment variables
├── .gitignore                    # Git ignore rules
├── .vscode/settings.json         # VS Code editor settings
├── AGENTS.md                     # Next.js agent rules
├── CLAUDE.md                     # References AGENTS.md
├── README.md                     # Create Next App default README
├── data/
│   ├── products.json             # Product data (JSON file DB)
│   └── catalogs.json             # Catalog data (JSON file DB)
├── eslint.config.mjs             # ESLint 9 flat config
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── package-lock.json             # Lockfile
├── postcss.config.mjs            # PostCSS/Tailwind config
├── public/
│   ├── uploads/                  # Uploaded product/catalog images & PDFs
│   ├── logo.png.png
│   ├── varahi_logo.png
│   └── favicon.ico, SVG assets
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (root)/
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── layout.tsx        # Root layout with fonts, theme, nav, footer
│   │   │   ├── globals.css       # Tailwind + custom theme CSS
│   │   │   └── favicon.ico
│   │   ├── about/page.tsx        # About Us page
│   │   ├── collections/page.tsx  # Collections listing page
│   │   ├── catalogs/page.tsx     # Catalogs listing page
│   │   ├── catalogs/[id]/page.tsx # Catalog detail page
│   │   ├── contact/page.tsx      # Contact form with EmailJS
│   │   ├── product/[id]/page.tsx # Product detail page
│   │   ├── admin/                # Admin panel
│   │   │   ├── layout.tsx        # Admin auth gate + sidebar layout
│   │   │   ├── page.tsx          # Admin dashboard
│   │   │   ├── products/page.tsx # Products list
│   │   │   ├── products/new/page.tsx      # Add product
│   │   │   ├── products/[id]/edit/page.tsx # Edit product
│   │   │   ├── catalogs/page.tsx # Catalogs list
│   │   │   ├── catalogs/new/page.tsx      # Add catalog
│   │   │   └── catalogs/[id]/edit/page.tsx # Edit catalog
│   │   └── api/                  # API Routes
│   │       ├── products/route.ts         # GET/POST products
│   │       ├── products/[id]/route.ts    # GET/PUT/DELETE product
│   │       ├── catalogs/route.ts         # GET/POST catalogs
│   │       ├── catalogs/[id]/route.ts    # GET/PUT/DELETE catalog
│   │       └── upload/route.ts           # File upload handler
│   ├── components/               # Reusable UI components
│   │   ├── FeaturesSection.tsx
│   │   ├── FloatingJewelry.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── Navbar.tsx
│   │   ├── NewsletterSection.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ScrollDivider.tsx
│   │   ├── ShowcaseSection.tsx
│   │   └── TestimonialsSection.tsx
│   ├── components/admin/         # Admin-specific forms
│   │   ├── ProductForm.tsx
│   │   └── CatalogForm.tsx
│   ├── context/
│   │   └── ThemeContext.tsx      # Light/Dark theme provider
│   └── lib/                      # Utilities
│       ├── db.ts                 # File-based DB helpers
│       ├── products.ts           # Legacy static product list
│       ├── seed.ts               # Seed default products
│       └── types.ts              # TypeScript interfaces
├── tsconfig.json                 # TypeScript config
```

---

## 4. Core Architecture

### 4.1 Next.js App Router

The project uses **Next.js 16 App Router** with the file-based routing convention. Every route is defined under `src/app/`.

### 4.2 Data Layer (`src/lib/db.ts`)

A **PostgreSQL** database is used for data persistence. The data layer is implemented in `src/lib/db.ts` and backed by `src/lib/postgres.ts`, which manages a `pg` connection pool and auto-initializes the required tables.

- `readCollection<T>(collection)` - queries the `products` or `catalogs` table
- `writeCollection<T>(collection, data)` - replaces all rows in a table inside a transaction
- `findById<T>(collection, id)` - finds a row by primary key
- `insertItem<T>(collection, item)` - inserts a new row
- `updateItem<T>(collection, id, updates)` - updates an existing row
- `deleteItem(collection, id)` - removes a row by ID

### 4.3 PostgreSQL Setup (`src/lib/postgres.ts`)

The PostgreSQL connection is configured via the `DATABASE_URL` environment variable, with a local default of `postgresql://postgres:postgres@localhost:5432/varahi`.

On first use, `initializeDb()` creates the following tables if they do not exist:

- `products`
  - `id` (TEXT PRIMARY KEY)
  - `name` (TEXT NOT NULL)
  - `category` (TEXT NOT NULL)
  - `price` (NUMERIC NOT NULL)
  - `weight` (NUMERIC NOT NULL DEFAULT 0)
  - `image` (TEXT NOT NULL)
  - `description` (TEXT NOT NULL)
  - `badge` (TEXT)
  - `createdAt` (TEXT NOT NULL)
- `catalogs`
  - `id` (TEXT PRIMARY KEY)
  - `title` (TEXT NOT NULL)
  - `description` (TEXT NOT NULL)
  - `coverImage` (TEXT NOT NULL)
  - `pdfUrl` (TEXT)
  - `productIds` (JSONB NOT NULL DEFAULT `'[]'::jsonb`)
  - `createdAt` (TEXT NOT NULL)

### 4.4 Data Models (`src/lib/types.ts`)

#### Product

```ts
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  weight: number;
  image: string;
  description: string;
  badge?: string;
  createdAt: string;
}
```

#### Catalog

```ts
interface Catalog {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pdfUrl?: string;
  productIds: string[];
  createdAt: string;
}
```

#### Product Categories

`Necklaces`, `Rings`, `Earrings`, `Bracelets`, `Tiaras`, `Pendants`, `Watches`

### 4.4 Seeding (`src/lib/seed.ts`)

When the `products` collection is empty, 8 default luxury products are seeded with Unsplash images. This is triggered by `GET /api/products` and `GET /api/products/[id]`.

---

## 5. Frontend Website Features

### 5.1 Layout (`src/app/layout.tsx`)

- Loads Google Fonts: Playfair Display, Cormorant Garamond
- Wraps children in `ThemeProvider`
- Renders persistent `Navbar` and `Footer`
- Uses `<main className="flex-1">` for page content

### 5.2 Homepage (`src/app/page.tsx`)

Sections rendered in order:

1. `HeroBanner` - Full-screen video hero
2. `ScrollDivider` - Ornamental divider
3. `ProductGrid` - Filterable product grid
4. `ScrollDivider`
5. `ShowcaseSection` - Heritage story section
6. `ScrollDivider`
7. `FeaturesSection` - Brand promise cards
8. `ScrollDivider`
9. `TestimonialsSection` - Customer testimonials
10. `ScrollDivider`
11. `NewsletterSection` - Email subscription

### 5.3 Navigation (`src/components/Navbar.tsx`)

- Fixed top navbar
- Brand logo (`/varahi_logo.png`)
- Links: Home, Collections, Catalogs, About, Contact
- **Theme toggle** (sun/moon icon) using `useTheme`
- Mobile hamburger menu with `Framer Motion` AnimatePresence
- Scroll-aware background blur and light/dark text adjustment on homepage
- **GSAP** entrance animations for header and logo

### 5.4 Theme System (`src/context/ThemeContext.tsx`)

- Provides `light` / `dark` theme
- Saves preference to `localStorage` under key `varahi-theme`
- Sets `data-theme` attribute on `<html>`
- `globals.css` defines CSS variables for both themes

### 5.5 Hero Banner (`src/components/HeroBanner.tsx`)

- Full viewport height section
- Background **MP4 video** with parallax scroll effect
- Fallback poster image from Unsplash
- Dark gradient overlay
- GSAP timeline animation for heading, subtitle, CTA
- Gold gradient CTA button linking to `/collections`

### 5.6 Product Grid (`src/components/ProductGrid.tsx`)

- Fetches products from `/api/products`
- Category filter buttons (All + all categories)
- Uses `Framer Motion` for layout animations and filtering
- Uses `gsap/ScrollTrigger` for header reveal
- `luxury-card` CSS class for hover effects
- Product cards link to `/product/{id}`
- Displays price in **Indian Rupees (₹)**

### 5.7 Product Detail Page (`src/app/product/[id]/page.tsx`)

- Client-side data fetch from `/api/products/{id}`
- `use(params)` for dynamic route access
- Large product image with emerald decorative corners
- Product name, category, description, price, weight
- "Add to Bag" and "Favorite" buttons (UI only, no checkout)
- Trust badges: Lifetime Warranty, Free Shipping, 30-Day Returns
- Uses `Framer Motion` for slide-in animations
- Dark theme design (`bg-black`)

### 5.8 Collections Page (`src/app/collections/page.tsx`)

- Header section with title
- Reuses `ProductGrid` component

### 5.9 Catalogs Page (`src/app/catalogs/page.tsx`)

- Fetches catalogs from `/api/catalogs`
- Grid of catalog cards with cover image, title, description, product count
- Uses `Framer Motion` for card animations
- Links to `/catalogs/{id}`

### 5.10 Catalog Detail Page (`src/app/catalogs/[id]/page.tsx`)

- Fetches catalog and related products
- Shows cover image, title, description
- Optional **PDF download** link if `pdfUrl` exists
- Product grid of catalog items with hover actions (View / Shopping Bag)

### 5.11 About Page (`src/app/about/page.tsx`)

- Brand story header
- Two-column layout with image and text
- Stats section: 10,000+ Pieces, 50+ Artisans, 40+ Countries, 130+ Years
- Uses `Framer Motion` for scroll animations

### 5.12 Contact Page (`src/app/contact/page.tsx`)

- Contact form (first name, last name, email, message)
- Sends email via **EmailJS**
- Contact information: address, phone, email, hours
- Embedded Google Maps iframe
- Success/error alert feedback

### 5.13 Footer (`src/components/Footer.tsx`)

- 4-column layout
- Brand logo and description
- Footer link groups: Collections, Company, Support
- Copyright and legal links

### 5.14 Floating Jewelry Background (`src/components/FloatingJewelry.tsx`)

- SVG ornaments (chains, rings, diamonds, pendants, bangles)
- Floating and parallax scroll animations using GSAP
- Fixed full-screen overlay, pointer-events disabled

---

## 6. Styling & Design System

### 6.1 Tailwind CSS v4

Configured via `postcss.config.mjs`:

```mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### 6.2 Custom CSS (`src/app/globals.css`)

- `@import "tailwindcss"`
- Custom `@theme inline` colors:
  - Gold: `#c9a96e` / `#dfc28f` / `#a67c3d`
  - Emerald: `#10b981`
  - Black/Dark theme colors
- Light and dark theme CSS variables
- Custom utility classes:
  - `gold-gradient-text`
  - `emerald-gradient-text`
  - `luxury-card`
  - `divider-gold`, `divider-emerald`
  - `float-animation`, `shimmer-emerald`, `golden-glow`

### 6.3 Responsive Breakpoints

- Mobile first
- `sm`, `md`, `lg` breakpoints used throughout
- Mobile menu in `Navbar`
- Grid columns adapt: 1 on mobile, 2 on tablet, 3-4 on desktop

---

## 7. Animation & Motion Technologies

| Component | Library | Effect |
|-----------|---------|--------|
| Navbar entrance | GSAP | Slide down + fade in |
| Logo bounce | GSAP | Scale + back ease |
| Hero text | GSAP Timeline | Staggered reveal |
| Hero background | Vanilla JS | Parallax on scroll |
| ProductGrid header | GSAP ScrollTrigger | Fade/slide up |
| Product cards | Framer Motion | Layout, scale, hover |
| Mobile menu | Framer Motion AnimatePresence | Fade + staggered links |
| Product detail | Framer Motion | X-axis slide in |
| Showcase | GSAP ScrollTrigger | Image left, text right |
| Features cards | GSAP ScrollTrigger | Staggered scale/fade |
| Testimonials | GSAP ScrollTrigger | Staggered rotateX/fade |
| Newsletter | GSAP ScrollTrigger | Fade up |
| ScrollDivider | GSAP ScrollTrigger | Ornaments spin/scale |
| FloatingJewelry | GSAP + ScrollTrigger | Continuous float + parallax |
| About page | Framer Motion | Scroll-triggered reveals |

---

## 8. Admin Panel

### 8.1 Authentication (`src/app/admin/layout.tsx`)

- Simple **hardcoded password** check
- `ADMIN_PASSWORD = "PASSWORD"`
- Auth state stored in `sessionStorage` under `admin_auth`
- Password input stored in React state
- UI text shows: "Default password: aurum2024"
- Sign out clears `sessionStorage`
- **Note:** This is a basic client-side auth and not secure for production.

### 8.2 Admin Layout

- Sidebar with navigation: Dashboard, Products, Catalogs
- Mobile hamburger toggle
- Active link highlighting
- Sign-out button
- Logo and "Admin Panel" label

### 8.3 Admin Dashboard (`src/app/admin/page.tsx`)

Stats cards:

- Total Products
- Total Catalogs
- Inventory Value (sum of all product prices)
- Number of Categories

Recent products table showing name, category, price, badge.

### 8.4 Products Management

#### List Page (`src/app/admin/products/page.tsx`)

- Table with image, name, category, price, weight, badge
- Edit and Delete actions
- Add Product button
- Delete confirmation via `confirm()`

#### Add/Edit Product (`src/components/admin/ProductForm.tsx`)

Fields:

- Product image (file upload or URL input)
- Product Name
- Category (dropdown)
- Price (₹)
- Weight (grams)
- Badge (optional)
- Description

Image upload posts to `/api/upload` and receives a `/uploads/{uuid}.{ext}` URL.

### 8.5 Catalogs Management

#### List Page (`src/app/admin/catalogs/page.tsx`)

- Grid cards with cover image, title, description, product count
- Edit and Delete actions
- Add Catalog button

#### Add/Edit Catalog (`src/components/admin/CatalogForm.tsx`)

Fields:

- Cover image upload
- Catalog Title
- Description
- PDF Lookbook upload (optional)
- Product selector (multi-select checkboxes)

---

## 9. API Routes

### 9.1 Products API (`src/app/api/products/`)

**GET `/api/products`**
- Seeds default products if empty
- Optional query param `?category={name}` to filter
- Returns array of products

**POST `/api/products`**
- Creates a new product
- Generates UUID
- Stores in `data/products.json`

**GET `/api/products/{id}`**
- Seeds products if empty
- Returns single product or 404

**PUT `/api/products/{id}`**
- Updates product by ID

**DELETE `/api/products/{id}`**
- Deletes product by ID

### 9.2 Catalogs API (`src/app/api/catalogs/`)

**GET `/api/catalogs`**
- Returns all catalogs

**POST `/api/catalogs`**
- Creates a new catalog

**GET `/api/catalogs/{id}`**
- Returns single catalog

**PUT `/api/catalogs/{id}`**
- Updates catalog by ID

**DELETE `/api/catalogs/{id}`**
- Deletes catalog by ID

### 9.3 File Upload API (`src/app/api/upload/route.ts`)

**POST `/api/upload`**
- Accepts `multipart/form-data` with a `file` field
- Generates UUID filename
- Saves to `public/uploads/{uuid}.{ext}`
- Returns `{ url: "/uploads/{uuid}.{ext}" }`
- Supports images and PDFs

---

## 10. Data Storage Details

### 10.1 PostgreSQL Database

The application uses a **PostgreSQL** database for products and catalogs. Tables are auto-created on startup by `initializeDb()` in `src/lib/postgres.ts` and are accessed through `pg` connection pool helpers in `src/lib/db.ts`.

Default local connection:
```
postgresql://postgres:postgres@localhost:5432/varahi
```

Can also be set via the `DATABASE_URL` environment variable.

### 10.2 `data/products.json` and `data/catalogs.json`

Legacy seed/migration files. On first run, `src/lib/seed.ts` checks the PostgreSQL tables and, if they are empty, imports any existing data from these JSON files or falls back to a set of default products. After seeding, the JSON files are no longer the source of truth.

### 10.3 `public/uploads/`

Uploaded files directory. Contains product images and catalog PDFs.

### 10.4 Docker Compose Database

A `docker-compose.yml` is included to run the app with a Postgres 16 container:

- Service: `db` (`postgres:16-alpine`)
- Database: `varahi`
- User: `postgres`
- Password: `postgres`
- Port: `5432`
- Volume: `postgres_data` (persisted across restarts)

The `app` service builds the Next.js Dockerfile and connects using:
```
postgres://postgres:postgres@db:5432/varahi
```

### 10.5 Limitations

- No built-in database migrations; schema is created by `initializeDb()`
- No automated backups
- Uploads are still stored on the local filesystem

---

## 11. Development Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

### Next.js Configuration (`next.config.ts`)

```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.43.17:3000",
  ],
};
```

### TypeScript Config

- Target: ES2017
- Module: ESNext
- Module resolution: bundler
- JSX: react-jsx
- Path alias: `@/*` maps to `src/*`

---

## 12. Third-Party Integrations

### 12.1 EmailJS

- Used on Contact page
- Service ID, Template ID, and Public Key from `.env.local`
- Sends contact form data to `contact@example.com`

### 12.2 External Media

- **Unsplash** - Product/hero/showcase images (allowed in Next.js image config)
- **jsdelivr CDN** - Hero background video hosted externally
- **Google Maps** - Embedded map on Contact page

---

## 13. Feature-Technology Mapping

| Feature | Technology Used |
|---------|-----------------|
| Routing & Pages | Next.js 16 App Router (`src/app/`) |
| Server-side API | Next.js API Routes (`src/app/api/`) |
| React Components | React 19 + TypeScript |
| Styling | Tailwind CSS v4 + Custom CSS |
| Fonts | `next/font/google` (Playfair Display, Cormorant Garamond) |
| Theme Toggle | React Context + `localStorage` + CSS variables |
| Product/Catalog Data | PostgreSQL via `pg` (`src/lib/db.ts`, `src/lib/postgres.ts`) |
| Product Images | Next.js Image + local `/uploads` + Unsplash |
| File Uploads | Next.js API route + Node.js `fs` + `uuid` |
| Product Filtering | Client-side React state + API query params |
| Animations | GSAP + Framer Motion |
| Scroll Animations | GSAP ScrollTrigger |
| Mobile Menu | Framer Motion AnimatePresence |
| Icons | lucide-react |
| Contact Form Email | @emailjs/browser |
| Admin Auth | Client-side hardcoded password + `sessionStorage` |
| UUID Generation | `uuid` package |
| Linting | ESLint 9 + `eslint-config-next` |

---

## 14. Known Technical Notes

1. **No real database** - PostgreSQL is used; JSON files are only for initial seeding.
2. **Client-side admin auth** - Password is hardcoded in `layout.tsx`. Not secure for production.
3. **No checkout/payment** - "Add to Bag" is UI-only.
4. **File upload limits** - No explicit size/file type validation beyond `accept` attributes.
5. **Mixed currency display** - Admin products table shows `₹`, catalog detail page shows `$`, product grid shows `₹`.
6. **Default password mismatch** - Code uses `"PASSWORD"`, UI says `aurum2024`.
7. **No image optimization for local uploads** - Next.js Image requires domains to be configured for external URLs.
8. **Concurrent write risk** - PostgreSQL handles concurrency; still no row-level locking in app code.
9. **GSAP ScrollTrigger re-registration** - Called in multiple client components.
10. **No error boundaries** - API failures may not be gracefully handled everywhere.

---

## 15. Deployment

The README suggests deployment on **Vercel**, the creators of Next.js.

For production, consider:
- Hosting PostgreSQL on a managed service (e.g., Supabase, AWS RDS, Railway) and setting `DATABASE_URL` accordingly
- Implementing secure server-side admin authentication
- Adding environment-based config for EmailJS and upload limits
- Using a CDN for uploads and media
- Adding error monitoring and logging

---

*Document generated for the Varahi Jewels luxury jewellery website and admin panel.*
