# Muhammed Sinan Aneefa — Full Stack Developer & AI Engineer Portfolio

A modern, precision-crafted, single-page developer portfolio designed in the style and structure of **muhammadsahal.vercel.app**. Built with semantic HTML5, Vanilla CSS design system (Dark & Light theme engine), GSAP + ScrollTrigger choreography, and Lenis smooth momentum scrolling.

## 🚀 Live Demo & Projects
- **Talkeasy AI Platform (Winner &bull; Microsoft Challenge 2025):** [https://talk-lemon.vercel.app/](https://talk-lemon.vercel.app/)
- **Virtual Nurse (AR-NurSys Healthcare AI):** [https://virtual-nurse-theta.vercel.app/](https://virtual-nurse-theta.vercel.app/)
- **Liyaura Luxury Rental Portal:** [https://liyaura.onrender.com/](https://liyaura.onrender.com/)
- **AnalystEdge AI Financial Intelligence:** [https://analystedge-seven.vercel.app/](https://analystedge-seven.vercel.app/)
- **Forest Flame Boutique Resort:** [https://forest-flame.vercel.app/](https://forest-flame.vercel.app/)
- **Finance Flow App:** [https://finance-eight-green-68.vercel.app/](https://finance-eight-green-68.vercel.app/)

## ✨ Architecture & Key Features
- **Interactive Preloader:** `LOADING... 0%` counter animated to `100%` with a smooth reveal fade.
- **Dark & Light Mode Switcher:** One-click theme toggle with seamless CSS token transitions and `localStorage` persistence.
- **Hero Ken Burns Slider:** Auto-rotating project photo crossfade background with slow zoom animation (`scale 1 → 1.08`).
- **Standardized Section Tags:** Monospace `[00N / SECTIONNAME]` tags site-wide (`[01 / HERO]`, `[02 / ABOUT]`, `[03 / SKILLS]`, `[04 / SELECTED WORK]`, `[05 / OTHER PROJECTS]`, `[06 / EXPERIENCE]`, `[07 / CONTACT]`).
- **Alternating Direction Marquees:** Dual continuous auto-scrolling strips (forward & reverse) with hover-pause mechanics.
- **7 Numbered Skill Subsections:** Programming Languages, Frontend Engineering, Backend & API Architecture, Databases & ORM, DevOps & Cloud, Core Concepts, and AI / Emerging Tech with staggered card animations.
- **Selected Work & Other Projects:** Cards with project preview photos, category + year tags, status pills, and `CASE STUDY` badges.
- **Experience Timeline & Credentials:** Vertical industry timeline (Emdata Networks), formal education (B.E. AIML, CGPA 8.29), hackathon honors, and verified certifications (Oracle & Cisco).
- **Direct WhatsApp Messaging:** Real-time form encoder generating prefilled `wa.me` links directly to your WhatsApp.
- **Copy-to-Clipboard Buttons:** One-click copy for email and phone numbers with animated "Copied!" feedback.

## 📁 Project Structure
```
├── index.html                  # Semantic single-page layout & structure
├── styles.css                  # Dark & Light design system, typography, animations
├── script.js                   # Preloader, Theme engine, Slider, Lenis & GSAP triggers
├── Full-Stack-Developer.pdf    # Direct CV / Resume download asset
├── assets/
│   └── projects/               # High-resolution project preview screenshots
│       ├── talkeasy.jpg
│       ├── virtual-nurse.jpg
│       ├── liyaura.jpg
│       ├── analystedge.jpg
│       ├── forest-flame.jpg
│       └── finance-flow.jpg
└── README.md                   # Documentation
```

## 💻 Local Preview
To preview locally, launch any static HTTP server:
```bash
python -m http.server 4173
```
Then open `http://localhost:4173` in your web browser.
