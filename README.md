# FitLog - Workout Library

A dark, no-nonsense gym companion built with Next.js 15 (App Router). Pick a lift, lock it into today's plan, and watch the week's work add up.

## 🚀 Features

1. **Workout Library** - Browse 12 lifts covering every major muscle group with detailed cards showing duration, calories, rating, and equipment
2. **Workout Details** - View comprehensive workout info including instructions, muscle groups, equipment, difficulty, sets, reps, and key specs
3. **Today's Plan** - Add up to 5 lifts to your daily plan with live metrics (exercises, minutes, calories)
4. **Saved Workouts** - Save workouts for later with a dedicated Saved tab
5. **Mark as Done / Remove** - Track completed lifts and remove items from plan or saved
6. **Sort & Search** - Sort workouts by Duration, Calories, or Rating; search by name, tag, or equipment
7. **Persistent Storage** - Plan and saved workouts survive page reloads via localStorage
8. **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
9. **Toast Notifications** - Real-time feedback for all actions
10. **Loading States** - Skeleton loaders while fetching data

## 🛠️ Technologies Used

- **Next.js 15** (App Router) - React framework with server components
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first styling
- **TypeScript** - Type safety
- **Lucide React** - Icon library
- **Next.js Image** - Optimized images

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd fit-log

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production
```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page with Library
│   ├── myplan/page.tsx       # My Plan page (Today's Plan / Saved)
│   ├── workout/[id]/page.tsx # Workout detail page
│   ├── not-found.tsx         # 404 page
│   ├── layout.tsx            # Root layout with providers
│   └── globals.css           # Global styles
├── components/
│   ├── homepage/
│   │   ├── Banner.tsx        # Hero section
│   │   ├── WorkoutGrid.tsx   # Library grid (fetch, sort, search)
│   │   └── WorkoutCard.tsx   # Individual workout card
│   ├── workout/
│   │   └── WorkoutActions.tsx # Add to plan / Save buttons
│   ├── shared/
│   │   ├── Navbar.tsx        # Navigation with dynamic badges
│   │   └── Footer.tsx        # Footer
│   ├── ui/
│   │   └── Toast.tsx         # Toast notification system
│   └── Providers.tsx         # Context providers
├── context/
│   └── WorkoutContext.tsx    # Global state for plan/saved
├── types/
│   └── WorkoutTypes.ts       # TypeScript interfaces
└── assets/
    ├── logo.png
    ├── footer-logo.png
    └── banner.png
```

## 🔌 API

- **All Workouts**: `https://api.abcz.workers.dev/api/fitlog`
- **Single Workout**: `https://api.abcz.workers.dev/api/fitlog/:id`

## 🎨 Design System

- **Primary Color**: `#BAFF00` (Neon Green)
- **Background**: `#0C0D10` (Near Black)
- **Surface**: `#15181F` / `#15171D` (Dark Gray)
- **Borders**: `#292F3A` / `#1A1B1F`
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#8D929D` / `#B8BAC2`
- **Font**: Geist (Sans & Mono)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column grid)
- **Tablet**: 640px - 1024px (2 column grid)
- **Desktop**: > 1024px (3 column grid)

## 🚀 Deployment

Deployed on Vercel: [Live Link](https://your-vercel-url.vercel.app)

## 📝 License

MIT License - feel free to use for learning or personal projects.

---

Built with ❤️ for gym enthusiasts who want to track their progress.