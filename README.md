# shadcn Theme Builder

A theme builder SPA for shadcn/ui that allows editing CSS variables with live preview and export functionality.

## Features

- 🎨 Edit theme tokens (colors, border radius)
- 👁️ Live preview on real UI components (Dashboard, Users table, Settings)
- 🌙 Dark/Light mode with separate theme storage
- ↩️ Undo/Redo history for each mode
- 📋 Export CSS variables for shadcn/ui projects
- 🤖 AI Theme Generator (Groq API)

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

## Environment Variables

Copy `.env.example` to `.env` and add your API key:

```bash
cp .env.example .env
```

## AI Theme Generator

This app features an AI-powered theme generator using Groq API.

### Setup / Налаштування

**English:**
1. Get a free Groq API key at [console.groq.com](https://console.groq.com)
2. Add the key to Vercel environment variables:
   - Name: `VITE_GROQ_API_KEY`
   - Value: your_api_key
3. Redeploy on Vercel

**Українською:**
1. Отримай безкоштовний API ключ на [console.groq.com](https://console.groq.com)
2. Додай ключ в Vercel environment variables:
   - Name: `VITE_GROQ_API_KEY`
   - Value: твій_ключ
3. Передеплой на Vercel

**For local development / Для локальної розробки:**
```bash
# Add to .env file (NEVER commit this to git!)
VITE_GROQ_API_KEY=your_api_key_here
```

### Usage / Використання

Click "AI Theme" in the header and type a prompt like:
- "Cyberpunk neon"
- "Ocean sunset"
- "Forest nature"
- "Minimalist white"

Натисни "AI Theme" в хедері і напиши промпт типу:
- "Кіберпанк неон"
- "Океанічний захід сонця"
- "Лісова природа"

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

## Deploy

Deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shongeorg/shadcn-theme-constructor)
