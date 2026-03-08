# Customization Guide - Google-Inspired Theme

## 🎨 Color Customization

### Changing Google Colors

Edit `tailwind.config.js`:

```js
colors: {
  google: {
    blue: '#4285F4',    // Change to your blue
    red: '#EA4335',     // Change to your red
    yellow: '#FBBC05',  // Change to your yellow
    green: '#34A853',   // Change to your green
  },
}
```

### Dark Mode Colors

```js
dark: {
  bg: '#0F172A',        // Main background
  card: '#1E1E1E',      // Card background
  surface: '#2A2A2A',   // Elevated surfaces
  border: '#333333',    // Borders
  text: '#E5E7EB',      // Text color
  muted: '#9CA3AF',     // Muted text
},
```

### Glow Effects

Edit `index.css` to customize glow colors:

```css
.shadow-glow-blue {
  box-shadow: 0 0 20px rgba(66, 133, 244, 0.3);
}
```

## 🔧 Component Customization

### Button Variants

Add new button styles in `index.css`:

```css
.btn-custom {
  @apply bg-purple-600 text-white;
  @apply hover:bg-purple-700 hover:shadow-glow-purple;
}
```

### Card Styles

Customize card appearance:

```css
.card-custom {
  @apply card;
  @apply bg-gradient-to-br from-blue-50 to-green-50;
  @apply dark:from-blue-900/20 dark:to-green-900/20;
}
```

## 🌙 Theme Toggle

### Default Theme

Change default theme in `index.html`:

```html
<!-- Dark mode by default -->
<html lang="en" class="dark">

<!-- Light mode by default -->
<html lang="en">
```

### Disable Theme Toggle

Remove ThemeToggle component from:
- `Header.jsx`
- `Navbar.jsx`

## 🎭 Animations

### Customize Animation Speed

Edit `tailwind.config.js`:

```js
animation: {
  'glow': 'glow 1s ease-in-out infinite',  // Faster glow
  'float': 'float 3s ease-in-out infinite', // Faster float
}
```

### Disable Animations

Add to `index.css`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 📱 Responsive Breakpoints

Customize in `tailwind.config.js`:

```js
theme: {
  screens: {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  }
}
```

## 🔤 Typography

### Change Fonts

1. Update `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;500;600;700&display=swap">
```

2. Update `tailwind.config.js`:
```js
fontFamily: {
  sans: ['YourFont', 'system-ui'],
}
```

### Font Sizes

Add custom sizes in `tailwind.config.js`:

```js
fontSize: {
  'tiny': '0.625rem',
  'huge': '5rem',
}
```

## 🎯 Adding New Google Colors

### Step 1: Add to Tailwind Config
```js
colors: {
  google: {
    // ... existing colors
    purple: '#9334E9',
  }
}
```

### Step 2: Add Glow Effect
```css
.shadow-glow-purple {
  box-shadow: 0 0 20px rgba(147, 52, 233, 0.3);
}
```

### Step 3: Add Button Variant
```css
.btn-purple {
  @apply bg-google-purple text-white;
  @apply hover:shadow-glow-purple;
}
```

## 🎨 Badge Customization

Add new badge variants in `index.css`:

```css
.badge-purple {
  @apply bg-purple-100 dark:bg-purple-900/30;
  @apply text-purple-700 dark:text-purple-400;
}
```

## 🌟 Glow Intensity

Adjust glow strength:

```css
/* Subtle glow */
.shadow-glow-blue-subtle {
  box-shadow: 0 0 10px rgba(66, 133, 244, 0.2);
}

/* Strong glow */
.shadow-glow-blue-strong {
  box-shadow: 0 0 30px rgba(66, 133, 244, 0.5);
}
```

## 📦 Remove 3D Background

1. Delete `ThreeBackground.jsx`
2. Remove from `LandingPage.jsx`:
```jsx
<ThreeBackground />
```
3. Uninstall packages:
```bash
npm uninstall @react-three/fiber @react-three/drei three
```

## 🔍 Custom Scrollbar

Modify in `index.css`:

```css
::-webkit-scrollbar-thumb {
  @apply bg-google-green/30;  /* Change color */
}
```

## 🎯 Environment-Specific Styles

Create `index.dev.css` for development-only styles:

```css
/* Development mode indicator */
body::before {
  content: 'DEV';
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: red;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}
```

## 📝 Tips

1. **Test Dark & Light** - Always test changes in both modes
2. **Use CSS Variables** - For easier theme switching
3. **Maintain Contrast** - Keep WCAG AA standards
4. **Progressive Enhancement** - Start with basic, add fancy
5. **Performance First** - Remove unused Tailwind classes

## 🛠️ Debug Mode

Add to components for debugging:

```jsx
{process.env.NODE_ENV === 'development' && (
  <div className="debug-info">
    Current theme: {isDark ? 'dark' : 'light'}
  </div>
)}
```

---

Need more customization help? Check the main README.md!
