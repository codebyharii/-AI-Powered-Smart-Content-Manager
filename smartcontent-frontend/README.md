# SmartContent Frontend - Google-Inspired Design

A modern, professional SaaS frontend with Google's design language and developer-friendly dark mode.

## 🎨 Design Philosophy

### Color Palette (Google-Inspired)
This project uses Google's iconic color palette with modern, professional implementation:

```css
Primary Colors:
- Blue:   #4285F4 (Primary actions, links, accents)
- Red:    #EA4335 (Errors, delete, danger actions)  
- Yellow: #FBBC05 (Warnings, highlights)
- Green:  #34A853 (Success, confirmations)

Dark Mode (Default):
- Background: #0F172A (Deep charcoal)
- Cards: #1E1E1E (Soft surface)  
- Surface: #2A2A2A (Elevated elements)
- Border: #333333 (Subtle dividers)
- Text: #E5E7EB (High contrast readable)

Light Mode:
- Background: #F8F9FA (Soft white)
- Cards: #FFFFFF (Pure white)
- Surface: #F1F3F4 (Light gray)
- Border: #E0E0E0 (Subtle dividers)
- Text: #202124 (Google's text color)
```

### Design Principles
✨ **Clean & Minimal** - No clutter, focused UI  
🎯 **Developer-Friendly** - Built for productivity  
🌙 **Dark Mode First** - Easy on the eyes  
💫 **Smooth Animations** - Framer Motion transitions  
🔥 **Glow Effects** - Subtle hover glows  
📐 **Rounded Components** - Modern, soft edges  
♿ **Accessible** - WCAG AA compliant  
⚡ **Performance** - Optimized and fast  

## 🚀 Features

### UI/UX Features
- 🌓 **Full Dark/Light Mode** - Persistent theme switching
- ✨ **Glow Effects** - Google-blue hover glows on interactive elements
- 🎭 **Smooth Transitions** - 300ms easing on all interactions
- 📱 **Fully Responsive** - Mobile-first design
- 🎨 **Google Color Accents** - Used subtly throughout
- 💎 **Glassmorphism** - Modern card effects
- 🔄 **Page Transitions** - Framer Motion animations
- 📊 **Professional Dashboard** - Stats, charts, analytics

### Core Pages
- ✅ **Landing Page** - Hero, features, CTA
- 🔐 **Auth Pages** - Login, Register  
- 📊 **Dashboard** - Stats cards with Google colors
- 📝 **Articles** - List, Create, Edit, Delete
- 👤 **Profile** - User settings
- ❌ **404** - Custom error page

### Technical Features
- ⚛️ **React 18** - Latest features
- ⚡ **Vite** - Lightning-fast HMR
- 🎨 **TailwindCSS** - Utility-first styling
- 🎭 **Framer Motion** - Advanced animations  
- 🗂️ **Zustand** - Lightweight state management
- 🌐 **Axios** - HTTP client with interceptors
- 🛣️ **React Router v6** - Client-side routing
- 🎯 **React Three Fiber** - 3D backgrounds (optional)

## 📋 Prerequisites

```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

## 🛠️ Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 3. Start Development Server
```bash
npm run dev
```

App opens at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── Button.jsx       # Google-styled buttons
│   │   ├── Card.jsx         # Card with glow effects
│   │   ├── Input.jsx        # Form inputs
│   │   ├── Loading.jsx      # Loading states
│   │   ├── ThemeToggle.jsx  # Dark/light switcher
│   │   └── ThreeBackground.jsx  # 3D background
│   ├── dashboard/           # Dashboard components
│   │   ├── Sidebar.jsx      # Navigation sidebar
│   │   ├── Navbar.jsx       # Top navigation
│   │   └── StatsCard.jsx    # Stat displays
│   └── landing/             # Landing page sections
│       ├── Header.jsx
│       ├── Hero.jsx
│       ├── Features.jsx
│       └── Footer.jsx
├── pages/                   # Route pages
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── ArticlesPage.jsx
│   ├── CreateArticlePage.jsx
│   ├── EditArticlePage.jsx
│   ├── ProfilePage.jsx
│   └── NotFoundPage.jsx
├── layouts/                 # Layout wrappers
│   └── DashboardLayout.jsx
├── store/                   # Zustand stores
│   ├── authStore.js         # Authentication state
│   └── themeStore.js        # Theme state
├── services/                # API services
│   ├── api.js               # Axios instance
│   ├── authService.js       # Auth endpoints
│   ├── articleService.js    # Article CRUD
│   └── aiService.js         # AI features
├── hooks/                   # Custom React hooks
│   ├── useTheme.js
│   └── useScrollReveal.js
└── utils/                   # Utility functions
```

## 🎨 Component Examples

### Button Component
```jsx
import Button from '@/components/common/Button';

// Primary (Google Blue)
<Button variant="primary">Save</Button>

// Success (Google Green)  
<Button variant="success">Publish</Button>

// Danger (Google Red)
<Button variant="danger">Delete</Button>

// Warning (Google Yellow)
<Button variant="warning">Alert</Button>

// With loading
<Button variant="primary" loading>Processing...</Button>
```

### Card Component  
```jsx
import Card from '@/components/common/Card';

// Standard card
<Card className="p-6">
  <h3>Content</h3>
</Card>

// Hover effect with glow
<Card hover className="p-6">
  <h3>Interactive Card</h3>
</Card>

// Glowing card
<Card className="p-6 card-glow">
  <h3>Important</h3>
</Card>
```

### Badge Component
```jsx
// Using Tailwind classes
<span className="badge badge-blue">Active</span>
<span className="badge badge-green">Success</span>
<span className="badge badge-red">Error</span>
<span className="badge badge-yellow">Warning</span>
```

## 🎯 Styling Guidelines

### Using Google Colors
```jsx
// Text colors
className="text-google-blue"
className="text-google-green"  
className="text-google-red"
className="text-google-yellow"

// Background colors
className="bg-google-blue"
className="hover:bg-google-blue"

// Glow effects  
className="shadow-glow-blue"
className="hover:shadow-glow-green"
```

### Dark Mode
```jsx
// Light mode | Dark mode
className="bg-light-card dark:bg-dark-card"
className="text-light-text dark:text-dark-text"
className="border-light-border dark:border-dark-border"
```

### Responsive Design
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
className="text-sm md:text-base lg:text-lg"
className="p-4 md:p-6 lg:p-8"
```

## 🔧 Available Scripts

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📦 Build for Production

```bash
npm run build
```

Output in `dist/` folder, optimized and minified.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

### Custom Server
```bash
npm run build
npm run preview
```

## 🎓 Key Customizations

### Change Primary Color
Edit `tailwind.config.js`:
```js
colors: {
  google: {
    blue: '#YOUR_COLOR',
    // ...
  }
}
```

### Disable 3D Background
Remove from `LandingPage.jsx`:
```jsx
<ThreeBackground />
```

### Disable Glow Effects
Remove from `index.css`:
```css
.shadow-glow-blue { ... }
```

## 🐛 Troubleshooting

### Backend Connection
```bash
# Check backend is running
curl http://localhost:8080/api/health

# Verify CORS is configured
```

### Build Errors
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Dark Mode Issues  
```bash
# Check localStorage
localStorage.getItem('theme-storage')

# Verify <html> class
document.documentElement.classList.contains('dark')
```

## 📚 Tech Stack Details

| Package | Version | Purpose |
|---------|---------|---------|
| React | 18.2.0 | UI Library |
| Vite | 5.0.8 | Build Tool |
| Tailwind | 3.4.0 | CSS Framework |
| Framer Motion | 10.18.0 | Animations |
| Zustand | 4.4.7 | State Management |
| Axios | 1.6.5 | HTTP Client |
| React Router | 6.21.1 | Routing |
| Lucide React | 0.307.0 | Icons |
| Three.js | 0.160.0 | 3D Graphics |

## 🎨 Design Tokens

```css
/* Spacing */
--spacing-xs: 0.5rem  (8px)
--spacing-sm: 1rem    (16px)
--spacing-md: 1.5rem  (24px)
--spacing-lg: 2rem    (32px)
--spacing-xl: 3rem    (48px)

/* Border Radius */
--radius-sm: 0.5rem   (8px)
--radius-md: 0.75rem  (12px)
--radius-lg: 1rem     (16px)
--radius-xl: 1.5rem   (24px)

/* Typography */
--font-sans: 'Inter', system-ui
--font-mono: 'JetBrains Mono', monospace
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Follow existing patterns
4. Test dark/light modes
5. Submit PR

## 📄 License

MIT License - Commercial use allowed

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)  
- Safari (latest)
- Mobile browsers

## 💡 Best Practices

✅ Use semantic HTML  
✅ Follow component patterns  
✅ Test in dark/light modes  
✅ Maintain accessibility  
✅ Keep bundle size small  
✅ Use lazy loading  
✅ Optimize images  

---

**🎨 Designed with Google's Design Language**  
**🌙 Dark Mode First Approach**  
**⚡ Built for Performance**  
**♿ Accessibility Focused**

No flashy gradients. No neon colors. Just clean, professional, Google-inspired design.
