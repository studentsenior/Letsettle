# Letsettle

> A public voting platform where opinions turn into rankings. Create debates, vote on options, and see live results—all without logging in.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-06B6D4)

## 🎯 Overview

Letsettle is an anonymous, public voting platform built for settling debates through democratic voting. Users can create debates, suggest options, and vote—all without creating an account. The platform features real-time rankings, vote protection mechanisms, and a clean, minimal design.

**Live Demo:** [Your deployed URL here]

## ✨ Key Features

- **🔓 No Login Required** - Vote and create debates anonymously
- **🔴 Live Rankings** - See results update in real-time as votes come in
- **🛡️ Vote Protection** - Multi-layer protection (IP tracking + browser fingerprinting)
- **📊 30+ Categories** - Organized debates across Sports, Technology, Politics, Entertainment, and more
- **⚡ Fast & Responsive** - Server-side rendering with Next.js 14 App Router
- **🎨 Minimal Design** - Clean, editorial-style interface with intentional whitespace
- **🔍 SEO Optimized** - Fully indexed with Schema.org markup
- **📱 Mobile Friendly** - Responsive design with mobile navigation

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Sonner** - Toast notifications

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database for debates, options, and votes
- **Mongoose** - ODM for MongoDB

### Features
- Browser fingerprinting for vote protection
- IP address tracking
- Local storage for vote persistence
- Case-insensitive duplicate detection
- Real-time vote counting

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/letsettle.git
cd letsettle
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/letsettle
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/letsettle
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
letsettle/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── debate/              # Debate CRUD operations
│   │   ├── vote/                # Vote recording
│   │   ├── option/              # Add new options
│   │   └── seed/                # Database seeding
│   ├── category/[category]/     # Category pages
│   ├── debate/[slug]/           # Individual debate pages
│   ├── create/                  # Create debate form
│   ├── how-it-works/           # Documentation page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx               # Homepage
│   └── globals.css           # Design system & styles
├── components/                # React components
│   ├── AddOptionForm.tsx     # Add new option form
│   ├── DebateCard.tsx       # Debate preview card
│   ├── Navbar.tsx          # Navigation bar
│   └── VoteButton.tsx     # Voting interface
├── lib/                   # Utilities
│   ├── db.ts            # MongoDB connection
│   ├── types.ts        # TypeScript interfaces
│   ├── utils.ts       # Helper functions (slugify, cn)
│   ├── constants.ts  # Categories list
│   └── hooks/       # Custom React hooks
│       └── useFingerprint.ts
├── models/              # Mongoose models
│   ├── Debate.ts      # Debate schema
│   ├── Option.ts     # Option schema
│   └── Vote.ts      # Vote schema
└── public/          # Static assets
```

## 🗄️ Database Models

### Debate Model
```typescript
{
  slug: string;              // URL-friendly identifier
  title: string;             // Debate question
  description?: string;      // Optional context
  category: string;          // Main category
  subCategory?: string;      // Optional subcategory
  totalVotes: number;        // Total vote count
  isActive: boolean;         // Published status
  isMoreOptionAllowed: boolean; // Allow user suggestions
  createdAt: Date;
}
```

### Option Model
```typescript
{
  debateId: ObjectId;   // Reference to Debate
  name: string;         // Option text
  votes: number;        // Vote count
}
```

### Vote Model
```typescript
{
  debateId: ObjectId;      // Reference to Debate
  optionId: ObjectId;      // Reference to Option
  ip: string;              // User IP address
  fingerprintId: string;   // Browser fingerprint
  createdAt: Date;
}
// Unique constraint: One vote per (debateId, ip) or (debateId, fingerprintId)
```

## 🛣️ API Routes

### Debates

**GET `/api/debate`**
- Fetch debates with filtering
- Query params: `limit`, `category`, `subCategory`
- Returns debates with top 3 options

**POST `/api/debate`**
- Create a new debate
- Body: `{ title, description?, category, subCategory?, options[], isMoreOptionAllowed }`
- Returns: `{ success: true, slug }`

**GET `/api/debate/[slug]`**
- Fetch single debate with all options
- Returns debate with sorted options

### Voting

**POST `/api/vote`**
- Record a vote
- Body: `{ debateId, optionId, fingerprintId }`
- Extracts IP from headers
- Returns: `{ success: true }` or error if already voted

### Options

**POST `/api/option`**
- Add new option to existing debate
- Body: `{ debateId, name }`
- Checks for duplicates (case-insensitive)
- Returns new option

### Seeding

**GET `/api/seed`**
- Populate database with sample debates
- Only creates non-existing debates
- Returns list of created/skipped debates

## 🎨 Design System

The app uses a minimal, editorial-style design with CSS variables:

### Color Palette
- **Base**: Warm off-white (`#FAFAF9`) background
- **Accent**: Deep teal (`#0D7C7C`) for interactive elements
- **Text**: High contrast with primary (`#1A1A1A`), secondary (`#737373`), tertiary (`#A3A3A3`)

### Typography
- **Font**: Inter (system fallback)
- **Mobile base**: 14px
- **Desktop base**: 16px
- **Weights**: 400 (normal), 500 (medium), 700 (bold)

### Key Principles
- Intentional whitespace
- Minimal borders (1px, subtle gray)
- Slow transitions (500ms)
- No color change on hover—just opacity

## 🔐 Vote Protection

Letsettle implements a **three-layer protection system**:

1. **IP Address Tracking**
   - Extracts from `x-forwarded-for` header
   - One vote per IP per debate

2. **Browser Fingerprinting**
   - Generates unique ID based on browser/device characteristics
   - Stored in localStorage
   - One vote per fingerprint per debate

3. **Database Constraints**
   - Unique index on `(debateId, ip)` and `(debateId, fingerprintId)`
   - Prevents duplicate votes even in race conditions

4. **Local Storage Sync**
   - Remembers which option was voted for
   - Highlights voted option across sessions

## 📝 Creating a Debate

1. Click **"Start Debate"** in the navbar
2. Fill in:
   - **Title**: The question or topic
   - **Category**: Choose from 30+ categories
   - **Subcategory** (optional): Add specific context
   - **Description** (optional): Background information
   - **Options**: Add at least 2 choices
3. Choose whether to **allow more options** after creation
4. Submit and share your debate!

## 🗳️ How Voting Works

1. Click the **checkbox** next to any option to vote
2. Vote is recorded instantly
3. Your chosen option is highlighted with a checkmark
4. Rankings auto-update based on vote counts
5. You can only vote **once per debate**
6. Percentages and vote counts are shown for all options

## 🌱 Seeding the Database

To populate your database with sample debates:

1. **Via API:**
```bash
curl http://localhost:3000/api/seed
```

2. **Or visit:**
```
http://localhost:3000/api/seed
```

This creates 30+ diverse debates across all categories with initial vote distribution.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variable: `MONGODB_URI`
4. Deploy

### Other Platforms

Letsettle works on any Next.js-compatible platform:
- Netlify
- Railway
- Render
- AWS Amplify

Just ensure you set the `MONGODB_URI` environment variable.

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Structure Best Practices

- **Server Components by default** - Use `'use client'` only when needed
- **Type safety** - Use TypeScript interfaces from `lib/types.ts`
- **Design tokens** - Use CSS variables from `globals.css`
- **Consistent naming** - kebab-case for routes, PascalCase for components

## 📊 Features in Detail

### Duplicate Prevention
- Options are checked case-insensitively before creation
- "JavaScript" and "javascript" are treated as duplicates
- Uses MongoDB regex for efficient checking

### SEO Optimization
- Server-side rendering for all pages
- Dynamic metadata per debate
- Schema.org ItemList markup for search engines
- Sitemap generation (if needed)

### Real-time Updates
- Uses `router.refresh()` for optimistic UI updates
- Server Components automatically refetch data
- No WebSocket complexity—simple and reliable

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Website: [yourwebsite.com](https://yourwebsite.com)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Toasts by [Sonner](https://sonner.emilkowal.ski/)
- Icons from [Lucide](https://lucide.dev/)

---

**Made with ❤️ for settling debates democratically**
