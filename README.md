# Marc Eldrian Gelera — Portfolio 🔴

A production-ready personal portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS v3**, and **Framer Motion**.

## 🎨 Design
- **Palette:** Vivid Red `#E63946` · Deep Red `#C1121F` · Gold `#FFD166` · Near-black `#0C0C0E`
- Glassmorphism cards with red-tinted hover glows
- Flip cards for Projects (hover = flip, back shows details + photo gallery)
- Certificate lightbox viewer with real cert images
- Dark / Light mode toggle
- Particle animation (red & gold floating dots)
- Cursor glow effect
- Loading screen

## 🚀 Quick Start
```bash
npm install
npm run dev        # → http://localhost:3000
```

## 📦 Deploy to Vercel (Recommended)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import
3. Framework: **Next.js** — everything else auto-detected
4. Click **Deploy** ✅

## 🗂 File Structure
```
src/
├── app/
│   ├── page.tsx          ← Main page + loader + dark mode
│   ├── layout.tsx        ← Root layout & SEO
│   └── globals.css       ← Red palette + glassmorphism styles
├── components/
│   ├── Navbar.tsx        ← Sticky nav + dark/light toggle
│   ├── Hero.tsx          ← Typing animation, stats, profile photo
│   ├── About.tsx         ← Summary, education, quick facts
│   ├── Skills.tsx        ← Animated skill bars + soft skills
│   ├── Experience.tsx    ← Fixed vertical timeline
│   ├── Projects.tsx      ← Flip cards + photo gallery modal
│   ├── Certifications.tsx← All 18 certs with lightbox viewer
│   ├── Contact.tsx       ← Contact form + info
│   └── Footer.tsx        ← Social links + back to top
public/
├── profile.jpg           ← Profile photo (no rotation)
├── resume.pdf            ← Downloadable CV
├── certs/                ← All 18 certificate images
└── projects/             ← AquaSense project photos
```

## ✅ Fixes Applied
- ❌ Profile picture no longer rotates (static ring border)
- ✅ Experience timeline fixed for all screen sizes
- ✅ Dark/Light mode fully working (toggled via CSS class on `<html>`)
- ✅ Projects flip on hover → back shows description, tech tags, photo gallery button
- ✅ Certifications show real certificate images — click to open lightbox
- ✅ Red is the signature color throughout
- ✅ 18 real certificates included with images
- ✅ AquaSense project has real photos
