# DATUM - Student Data Science Community Website

## Team Assignments & Responsibilities

This document outlines the responsibilities and focus areas for each team member working on the DATUM website frontend.

---

## Team Member 1 — Hero + About
**Assigned to:** Sparsh Shukla

### Works on:
- Hero section (homepage)
- Short About section (homepage)
- Full About.jsx page

### Focus Areas:
- First impression and visual impact
- Smooth animations and transitions
- Responsive design across all devices
- Engaging user experience

### Key Files:
- `components/Hero.tsx`
- `components/AboutSummary.tsx`
- `pages/About.tsx`

---

## Team Member 2 — Team Page
**Assigned to:** Dev Thakur

### Works on:
- `Team.jsx` page component

### Includes:
- Member photo
- Name
- Role
- LinkedIn profile links
- GitHub profile links

### Focus Areas:
- Clean, modern card design
- Professional layout
- Easy navigation and profile access
- Responsive grid layout

### Key Files:
- `pages/Team.tsx`

---

## Team Member 3 — Events + Timeline
**Assigned to:** Mayank

### Works on:
- Homepage Events/Timeline section
- Full `Events.jsx` page

### Includes:
- Upcoming events
- Past events (timeline style)
- Event cards with details

### Focus Areas:
- Visual timeline representation
- Event card design
- Clear distinction between past and upcoming events
- Responsive event display

### Key Files:
- `pages/Events.tsx`
- `components/Hero.tsx` (events section)

---

## Project Structure

```
d:\DATUM 7/
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── AboutSummary.tsx
│   ├── Footer.tsx
│   ├── ChatWidget.tsx
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Team.tsx
│   ├── Events.tsx
├── services/
│   └── geminiService.ts
├── public/
│   └── logo_datum.png
├── index.tsx
├── App.tsx
├── vite.config.ts
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```

The website will be available at `http://localhost:3000/`

### Building for Production
```bash
npm run build
```

---

## Tech Stack

- **Frontend Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Icons:** Lucide React
- **API Integration:** Gemini API (via geminiService)

---

## Design Guidelines

### Color Scheme
- Primary: Indigo (#4f46e5)
- Secondary: Slate (various shades)
- Accent: Use gradients for visual depth

### Typography
- Font weights: Regular, Bold, Black
- Letter-spacing: Tight for headings (tracking-tight, tracking-tighter)

### Animations
- Smooth transitions (duration-500 to duration-1000)
- Hover effects for interactive elements
- Scale and rotate transforms for depth

### Responsiveness
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Responsive padding and spacing

---

## Git Workflow

1. Create a branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Commit your changes:
   ```bash
   git commit -m "Descriptive commit message"
   ```

3. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request for review

---

## Contributing

- Follow the existing code style and structure
- Ensure responsive design on all breakpoints
- Test animations and interactions thoroughly
- Add comments for complex logic
- Update this README if adding new sections

---

## Contact & Support

For questions or clarifications about assignments, reach out to the respective team members or project lead.

---

*Last Updated: January 21, 2026*
