# SmartContent Frontend - React Application

Modern, Google-inspired UI with professional dark mode for content management.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

**App will be available at:** `http://localhost:3000`

## 📋 Prerequisites

- Node.js 18+
- npm 9+

## ⚙️ Configuration

### 1. Create Environment File

```bash
cp .env.example .env
```

### 2. Configure API URL

Edit `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 🎨 Design System

### Color Palette (Google-Inspired)

```css
/* Primary Colors */
Google Blue:   #4285F4  /* Primary actions, links */
Google Red:    #EA4335  /* Errors, danger actions */
Google Yellow: #FBBC05  /* Warnings, highlights */
Google Green:  #34A853  /* Success, confirmations */

/* Dark Mode (Default) */
Background: #0F172A  /* Deep charcoal */
Cards:      #1E1E1E  /* Soft surface */
Text:       #E5E7EB  /* High contrast */

/* Light Mode */
Background: #F8F9FA  /* Soft white */
Cards:      #FFFFFF  /* Pure white */
Text:       #202124  /* Google text color */
```

### Typography

- **Font:** Inter (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700, 800

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Loading.jsx
│   │   └── ThemeToggle.jsx
│   ├── landing/         # Landing page sections
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   └── Footer.jsx
│   └── dashboard/       # Dashboard components
│       ├── Sidebar.jsx
│       ├── Navbar.jsx
│       └── StatsCard.jsx
├── pages/               # Page components
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── ArticlesPage.jsx
│   ├── CreateArticlePage.jsx
│   ├── EditArticlePage.jsx
│   ├── ProfilePage.jsx
│   └── NotFoundPage.jsx
├── layouts/             # Layout wrappers
│   └── DashboardLayout.jsx
├── store/               # Zustand stores
│   ├── authStore.js
│   └── themeStore.js
├── services/            # API services
│   ├── api.js
│   ├── authService.js
│   ├── articleService.js
│   └── aiService.js
├── hooks/               # Custom hooks
│   ├── useTheme.js
│   └── useScrollReveal.js
└── utils/               # Utilities
```

## 🧩 Key Components

### Button Component

```jsx
import Button from '@/components/common/Button';

// Primary button (Google Blue)
<Button variant="primary">Save</Button>

// Success button (Google Green)
<Button variant="success">Publish</Button>

// Danger button (Google Red)
<Button variant="danger">Delete</Button>

// With loading state
<Button variant="primary" loading>Processing...</Button>
```

### Card Component

```jsx
import Card from '@/components/common/Card';

// Standard card
<Card className="p-6">
  <h3>Content</h3>
</Card>

// Card with hover effect and glow
<Card hover className="p-6">
  <h3>Interactive Card</h3>
</Card>
```

### Input Component

```jsx
import Input from '@/components/common/Input';

<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  icon={Mail}
/>
```

## 🎯 Features

- ✅ **Authentication** - Login/Register with JWT
- ✅ **Dashboard** - Stats and analytics
- ✅ **Article Management** - Create, edit, delete articles
- ✅ **AI Features** - Summaries, tags, SEO scoring
- ✅ **Dark/Light Mode** - Persistent theme switching
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Animations** - Smooth Framer Motion transitions
- ✅ **Glow Effects** - Interactive hover states

## 🛠️ Available Scripts

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
# Create optimized build
npm run build

# Output will be in dist/ folder
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🎨 Customization

### Change Primary Color

Edit `tailwind.config.js`:

```js
colors: {
  google: {
    blue: '#YOUR_COLOR',  // Change primary color
  }
}
```

### Disable Dark Mode

Remove from `index.html`:

```html
<!-- Change this: -->
<html lang="en" class="dark">

<!-- To this: -->
<html lang="en">
```

### Disable 3D Background

Remove from `LandingPage.jsx`:

```jsx
<ThreeBackground />
```

## 🐛 Troubleshooting

### Issue: Backend not connecting

**Check `.env` file:**
```bash
cat .env
# Should show: VITE_API_BASE_URL=http://localhost:8080/api
```

**Restart dev server:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Issue: Dark mode not working

**Check localStorage:**
```javascript
localStorage.getItem('theme-storage')
```

**Clear and reload:**
```javascript
localStorage.clear()
location.reload()
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

## 📚 Documentation

- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)

## 🔧 Tech Stack

- **React** 18.2.0 - UI library
- **Vite** 5.0.8 - Build tool
- **TailwindCSS** 3.4.0 - Styling
- **Framer Motion** 10.18.0 - Animations
- **Zustand** 4.4.7 - State management
- **Axios** 1.6.5 - HTTP client
- **React Router** 6.21.1 - Routing

## 📝 License

MIT License
