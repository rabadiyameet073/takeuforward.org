# takeuforward.org Clone - Recruiter-Focused Showcase

A modern, high-performance frontend clone inspired by takeuforward.org, built to demonstrate product thinking, clean UI engineering, and interactive learning UX.

This project is designed to impress both recruiters and engineering teams with:
- polished UI/animation quality,
- production-style architecture,
- and a custom in-browser coding lab with live insights.

## Why This Project Stands Out

- Interactive Code Lab with a real editor feel (line numbers, syntax highlighting, run output, status bar).
- One-click language switching across 6 languages.
- Live code insights and suggestion engine (structure, data structure usage, style, and performance hints).
- JavaScript/TypeScript execution directly in browser sandbox.
- Clean routing and lazy-loaded sections for better performance.
- Strong component-driven design using reusable UI primitives.

## Core Features

### 1) Hero + Product Marketing Experience
- Animated intro sequence and smooth section transitions.
- Rich landing sections: hero, logos, stats, feature cards, testimonials, pricing.
- Motion design powered by Framer Motion for modern UX.

### 2) Code Playground (Main Highlight)
- Editable code area with line numbers.
- Syntax-highlighted overlay for better readability.
- Copy code action.
- Reset snippet action.
- Run button with terminal-like output panel.
- Live status indicators.

### 3) One-Click Language Change
Supports instant switching between:
- C++
- Python
- JavaScript
- Java
- Go
- TypeScript

Each language has:
- dedicated default snippet,
- language icon/color,
- mapped filename extension.

### 4) Smart Suggestions (Live Code Insights)
The built-in analyzer provides real-time tips like:
- nested-loop performance warnings,
- hash map optimization suggestions,
- style suggestions (example: prefer const/let over var),
- structure hints (long lines, TODO/FIXME markers),
- language-specific recommendations.

### 5) Browser Execution Engine
- Executes JavaScript and TypeScript snippets in-browser.
- Safely captures stdout/stderr output.
- Graceful handling for non-runnable languages (C++/Python/Java/Go) with clear guidance.

## Tech Stack

- React 18 + TypeScript
- Vite 6
- Wouter (routing)
- TanStack React Query
- Framer Motion
- Tailwind CSS v4
- Radix UI primitives
- Lucide React icons

## Engineering Highlights

- Component-first architecture under src/components.
- Lazy loading for heavy sections to improve initial load.
- Theme context abstraction for scalable UI theming.
- Utility layer for code playground internals:
  - language configs,
  - static analysis engine,
  - runtime execution helper,
  - syntax highlighting helper.

## Project Structure

```
src/
  components/
    CodePlayground.tsx
    Hero.tsx
    Features.tsx
    ...
  context/
    ThemeContext.tsx
  hooks/
  lib/
    codePlayground/
      analyze.ts
      highlight.ts
      langs.ts
      runJs.ts
  pages/
    Home.tsx
    Plus.tsx
    PricingPage.tsx
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open in browser:
- http://localhost:5173/

### Production Build

```bash
npm run build
npm run serve
```

### Type Check

```bash
npm run typecheck
```

## Recruiter Notes

This codebase demonstrates practical frontend strengths expected in product teams:
- building reusable design systems,
- creating interactive educational tooling,
- balancing aesthetics with performance,
- and shipping feature-rich UI in a maintainable structure.

If you are evaluating for frontend roles, focus on:
- src/components/CodePlayground.tsx
- src/lib/codePlayground/analyze.ts
- src/lib/codePlayground/runJs.ts
- route-based lazy loading in src/pages/Home.tsx and src/App.tsx

## Future Enhancements

- Monaco editor integration for richer IDE-like behavior.
- Server-side code execution for all languages.
- Persistent saved snippets per user.
- Unit/integration tests for analyzer and playground flows.
- Accessibility pass with keyboard-first playground controls.

## Author

Built as a portfolio-quality frontend project to showcase engineering and UI product skills.
