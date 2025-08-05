Product Requirements Document (PRD)
Caren’s Cookbook
Version: 1.0
Type: PWA (Progressive Web App)
Target Device: iPad (saved to home screen)
Primary User: Caren (senior, non-tech-savvy user)
Delivery Goal: Mother’s Day gift

🥄 1. Purpose
Caren’s Cookbook is a personalized, senior-friendly web app that allows the user to input recipe URLs and view clean, easy-to-read recipe pages. It mimics core features of apps like Paprika, minus complexity like pantry/inventory/meal planning. The app should feel personal, with rotating photos of her son/dog and a heartfelt welcome.

🪄 2. Core Features
🔐 2.1. Password Gate (Soft Security)
Description: Simple password field before accessing the app

Purpose: Prevent public access without full auth

Storage: localStorage flag once authenticated

Fallback: Optionally hosted behind Vercel’s password protection

👋 2.2. Greeting Screen
Displayed: On first load / every visit before inactivity timeout

Components:

Rotating background image (of you or your dog)

Custom paragraph (“Welcome to your cookbook, Mom…”)

CTA button: “Let’s Get Cooking”

Behavior: Transitions to dashboard

🔎 2.3. Recipe Input
Input: URL field

Action: “Get Recipe” button

Flow:

Send to OpenAI o4-mini-2025-04-16 for parsing, scraping, and analysis

Extract:

Title

Ingredients

Steps

Image (optional)

Tech:

Use OpenAI entirely

📋 2.4. Recipe Display
Design: Very large readable text, minimal design

Sections:

Title

Image (if exists)

Ingredients (checklist style)

Steps (numbered list)

Cuisine (AI Generated)

Category (AI Generated)

Actual Prep Time (AI Generated)

Actual Cleanup Time (AI Generated)

Accessibility:

High contrast colors

Responsive font sizing

Large touch targets

🎙 2.5. Voice Controls
MVP:

“Read Ingredients”

“Read Instructions”

"Find Recipe"

Implementation: Web Speech API (Whisper OpenAI)

UI: Two floating buttons

Stretch: Voice commands like “Next Step”

🗂 2.6. Saved Recipes
Storage: Neon

View: Card grid or list with:

Title

“Open” button

“Delete” button (optional)

Behavior: Offline-first design with PWA caching

🧭 2.7. Navigation + UX Notes
No nav menus

One-page app with modal/page transitions

No logins

Should always return to dashboard after refresh

All buttons/touch targets >44px height

🌐 3. Platform Details
Frontend
Framework: React, Typescript, Next.js, ShadCN

Styling: Tailwind CSS for fast styling + responsive design, ShadCN for UI and Components

Voice: Web Speech API for TTS (Use OpenAI Whisper)

PWA: manifest.json, serviceWorker.js

Hosting: Vercel (preferred for speed)

🧪 4. Development Tasks
Task	Description	Priority
Setup project, frontend skeleton, PWA config	High
Add greeting screen	Rotating photos + custom message	High
Recipe input + fetcher	Parse recipe with AI from URL	High
Recipe display UI	Style ingredients + steps	High
Save/load recipes	Use Neon to persist	Medium
Add voice support	Whisper OpenAI API TTS	Medium
PWA install setup	Add manifest + service worker	Medium
Password gate	Simple client-side protection	Low

🖼 5. Stretch Features

Editable notes on recipes

Categories or tags

Print recipe view

Dark mode toggle

🧓 6. UX for Seniors Checklist
✅ Large readable fonts

✅ No logins or confusing flows

✅ Offline-friendly

✅ One-touch install

✅ Minimal distractions

✅ Simple input/output interactions

✅ Visual + voice engagement

🛠 7. Future Iteration Ideas
AI-powered voice assistant: “Find me a pasta recipe”

Image-based recipe scanner (e.g. snap a recipe from a book)

Shareable recipe links with friends