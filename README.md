# Asardeen Portfolio

Personal portfolio website for **Asardeen Azees** (Software Engineer and AI Automation Engineer), built as a modern, responsive static site.

## Live Site

- [Portfolio Website](https://azeesasardeen.github.io/asardeen-portfolio)

## Overview

This project showcases:

- professional summary and education
- technical skills with animated proficiency bars
- experience timeline
- selected projects with source/demo links
- certificates
- contact form integration

The site uses a premium light/dark theme, smooth section reveals, and mobile-first responsive behavior.

## Tech Stack

- **HTML5**
- **CSS3** (custom properties, animations, responsive layouts)
- **Vanilla JavaScript** (UI interactions, theme toggle, scroll-spy, animations)
- **EmailJS** (client-side contact form sending)
- **Boxicons** (icon set)

## Key Features

- Sticky navigation with active section highlighting (scroll-spy)
- Theme switcher (light/dark) with persisted preference in `localStorage`
- Responsive hero, about, skills, experience, projects, and certificates sections
- Animated profile card highlight and reveal-on-scroll effects
- Contact form validation and send flow with status messaging
- Accessible basics: semantic structure, skip link, labels, ARIA attributes

## Project Structure

```text
asardeen-portfolio/
├─ index.html
├─ assets/
│  ├─ css/
│  │  └─ styles.css
│  ├─ js/
│  │  └─ main.js
│  └─ img/
└─ README.md
```

## Run Locally

This is a static website, so no build step is required.

1. Clone the repository:
   ```bash
   git clone https://github.com/AsardeenAzees/asardeen-portfolio.git
   ```
2. Open the folder in your editor.
3. Launch `index.html` in a browser.

For best results during development, use a local static server (for example VS Code Live Server).

## Contact Form (EmailJS)

The contact form uses EmailJS in `assets/js/main.js`.



If you fork this project, replace these values with your own EmailJS service/template/public key.

## Customization Guide

Common updates:

- **Profile content**: edit text in `index.html`
- **Colors/theme tokens**: update CSS variables in `assets/css/styles.css` (`:root` and dark theme block)
- **Skills and percentages**: edit `.skill-item` entries in `index.html`
- **Projects and links**: update project cards in `index.html`
- **Social links**: update hero/footer social URLs in `index.html`

## Deployment

You can deploy this project to any static host:

- GitHub Pages
- Netlify
- Vercel (static)

For GitHub Pages, push to the repository and enable Pages from repository settings.

## Credits

- Icons: [Boxicons](https://boxicons.com/)
- Fonts: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

---

If you find this project useful, feel free to star the repository and connect on [GitHub](https://github.com/AsardeenAzees).
