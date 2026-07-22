# Mayoor School Jaipur – Homepage (Next.js)

A Next.js recreation of the [Mayoor School Jaipur](https://www.mayoorschooljaipur.org/) homepage.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- react-icons

## Project structure

```
app/              → layout, page, global styles
components/       → homepage sections (Header, Hero, News, FAQ, etc.)
data/homepage.ts  → content and navigation data
lib/images.ts     → image URLs from the live site CDN
```

## Sections included

- Top bar + sticky navigation with dropdowns
- Hero (“Be the Light”)
- Why Choose Mayoor
- Latest News carousel
- Parent Testimonials
- Why Choose Us cards
- Admissions CTA (2026–27)
- Vision stages (Chetna → Sadhana)
- Student Development pillars
- Learners will be Leaders + gallery
- Mayoor Manifesto
- FAQ accordion
- Footer
- Floating “Admission Enquiry” button + modal form
