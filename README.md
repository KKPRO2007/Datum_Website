# DATUM – Student Data Science Community Website

![DATUM Banner](public/logo_datum.png)

## 🚀 About DATUM

DATUM is a student-run Data Science community website that connects aspiring data scientists, showcases events, and provides resources for learning and collaboration.

---

## 👥 Team Assignments & Responsibilities

### Team Member 1 — Hero + About

**Assigned to:** Sparsh Shukla

**Works on:**

* Hero section (homepage)
* Short About section (homepage)
* Full About page

**Focus Areas:**

* Strong first impression and visual impact
* Smooth animations and transitions
* Fully responsive design
* Engaging user experience

**Key Files:**

* `components/Hero.tsx`
* `components/AboutSummary.tsx`
* `pages/About.tsx`

---

### Team Member 2 — Team Page

**Assigned to:** Dev Thakur

**Works on:**

* Team page component

**Includes:**

* Member photo
* Name and role
* LinkedIn profile link
* GitHub profile link

**Focus Areas:**

* Clean, modern card UI
* Professional layout
* Easy navigation
* Responsive grid system

**Key Files:**

* `pages/Team.tsx`

---

### Team Member 3 — Events + Timeline

**Assigned to:** Mayank

**Works on:**

* Homepage Events/Timeline section
* Full Events page

**Includes:**

* Upcoming events
* Past events (timeline view)
* Event cards with details

**Focus Areas:**

* Clear visual timeline
* Distinction between past and upcoming events
* Responsive event layouts

**Key Files:**

* `pages/Events.tsx`
* `components/Hero.tsx` (events section)

---

### Team Member 4 — Gallery + Admin Dashboard

**Assigned to:** Krishna Koushik

**Works on:**

* Gallery page
* Admin dashboard
* Add Event component

**Gallery Features:**

* Grid / masonry layout
* Lightbox image preview
* Image filtering and categorization
* Lazy loading for performance

**Admin Features:**

* Secure authentication
* Dashboard with website stats
* Event management (add / edit / delete)
* Gallery image management
* Content moderation

**Add Event Features:**

* Validated form
* Rich text editor
* Image upload
* Date & time picker
* Event preview before submission

**Focus Areas:**

* Secure admin access
* Intuitive content management
* Seamless Events–Gallery integration
* Optimized images and performance

**Key Files:**

* `components/Admin.tsx`
* `components/AddEvent.tsx`
* `components/Gallery.tsx`
* `services/authService.ts`
* `services/eventService.ts`
* `services/galleryService.ts`

**Integration Points:**

* Admin-added events appear on Events page
* Event images auto-sync to Gallery
* Shared event data types with Events module
* Consistent UI patterns across the app

---

## 📁 Project Structure

```
DATUM-WEB-SITE/
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── AboutSummary.tsx
│   ├── Footer.tsx
│   ├── ChatWidget.tsx
│   ├── Admin.tsx
│   ├── AddEvent.tsx
│   ├── Gallery.tsx
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Team.tsx
│   ├── Events.tsx
│   ├── Gallery.tsx
├── services/
│   ├── geminiService.ts
│   ├── authService.ts
│   ├── eventService.ts
│   ├── galleryService.ts
│   └── index.ts
├── public/
│   ├── logo_datum.png
│   └── images/
├── types.ts
├── constants.tsx
├── App.tsx
├── index.tsx
├── vite.config.ts
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

* **Frontend:** React + TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router
* **Icons:** Lucide React
* **API Integration:** Gemini API
* **State Management:** React Context
* **Forms:** React Hook Form + Zod
* **Image Upload:** React Dropzone
* **Dates:** date-fns
* **Notifications:** React Hot Toast

---

## 🚀 Getting Started

### Prerequisites

* Node.js v18 or higher
* npm or yarn

### Installation

```bash
git clone https://github.com/your-username/DATUM-WEB-SITE.git
cd DATUM-WEB-SITE
npm install
```

### Run Development Server

```bash
npm run dev
```

App runs at: `http://localhost:3000/`

### Build for Production

```bash
npm run build
```

---

## 🎨 Design Guidelines

### Color Scheme

* Primary: Indigo (#4f46e5)
* Secondary: Slate shades
* Accent: Gradients for depth

### Typography

* Font weights: Regular, Bold, Black
* Headings: Tight letter spacing

### Animations

* Smooth transitions (500–1000ms)
* Hover effects and subtle transforms

### Responsiveness

* Mobile-first design
* Breakpoints: sm, md, lg, xl

---

## 🌱 Git Workflow

1. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

2. Commit changes

```bash
git commit -m "Descriptive commit message"
```

3. Push branch

```bash
git push origin feature/your-feature-name
```

4. Open a Pull Request

---

## 🤝 Contributing

* Follow existing structure and style
* Ensure responsiveness
* Test animations and interactions
* Document complex logic if needed

---

## 📞 Contact & Support

For questions or clarifications, contact the respective team member or project lead.

---

*Last Updated: January 21, 2026*
