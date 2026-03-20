# shadcn Theme Builder

A theme builder SPA for shadcn/ui that allows editing CSS variables with live preview and export functionality.

## Features

- 🎨 Edit theme tokens (colors, border radius)
- 👁️ Live preview on real UI components (Dashboard, Users table, Settings)
- 🌙 Dark/Light mode with separate theme storage
- ↩️ Undo/Redo history for each mode
- 📋 Export CSS variables for shadcn/ui projects

## Tech Stack

- React (Vite)
- TypeScript
- TailwindCSS
- Zustand
- Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Export

Click "Export Config" to copy CSS variables:
- `.dark` selector for dark mode
- `.light` selector for light mode
- Both combined

```css
.dark {
  --background: #020617;
  --primary: #ec4899;
  /* ... */
}

.light {
  --background: #ffffff;
  --primary: #ec4899;
  /* ... */
}
```
