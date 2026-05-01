const EMAILJS_PUBLIC_KEY = "F15PPLHuipmmZlgb7";

const body = document.body;
const siteHeader = document.getElementById("site-header");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.getElementById("theme-toggle");
const form = document.getElementById("contact-form");
const sendButton = document.getElementById("send-button");
const formStatus = document.getElementById("form-status");
const year = document.getElementById("year");
const reveals = document.querySelectorAll(".reveal");
const skillItems = document.querySelectorAll(".skill-item");
const projectCards = [...document.querySelectorAll(".project-card")];
const projectModal = document.getElementById("project-modal");
const projectModalClose = document.getElementById("project-modal-close");
const projectModalTitle = document.getElementById("project-modal-title");
const projectModalTagline = document.getElementById("project-modal-tagline");
const projectModalTags = document.getElementById("project-modal-tags");
const projectModalDescription = document.getElementById("project-modal-description");
const projectModalProblem = document.getElementById("project-modal-problem");
const projectModalFeatures = document.getElementById("project-modal-features");
const projectModalRole = document.getElementById("project-modal-role");
const projectModalStack = document.getElementById("project-modal-stack");
const projectModalStatus = document.getElementById("project-modal-status");
const projectModalLinks = document.getElementById("project-modal-links");
const projectSlider = document.getElementById("project-slider");
const projectSliderNav = document.getElementById("project-slider-nav");
const projectSliderDots = document.getElementById("project-slider-dots");
const projectSliderPrev = document.getElementById("project-slider-prev");
const projectSliderNext = document.getElementById("project-slider-next");

const THEME_KEY = "portfolio-theme";
const defaultTheme = "light";

const THEME_COLORS = {
  light: "#f3f6fb",
  dark: "#070b12"
};

const openMenu = () => {
  navMenu.classList.add("open");
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Close menu");
};

const closeMenu = () => {
  navMenu.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open menu");
};

if (typeof window.emailjs !== "undefined" && typeof window.emailjs.init === "function") {
  try {
    window.emailjs.init(EMAILJS_PUBLIC_KEY);
  } catch {
    /* EmailJS init optional for some CDN builds */
  }
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    if (navMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
}

const setTheme = (theme) => {
  body.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";
  localStorage.setItem(THEME_KEY, theme);
  const isDark = theme === "dark";
  const metaTheme = document.getElementById("theme-color-meta");
  if (metaTheme) {
    metaTheme.setAttribute("content", isDark ? THEME_COLORS.dark : THEME_COLORS.light);
  }
  if (!themeToggle) return;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.classList.toggle("theme-toggle--dark", isDark);
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  const themeLabel = themeToggle.querySelector(".theme-toggle-label");
  if (themeLabel) {
    themeLabel.textContent = isDark ? "Light" : "Dark";
  }
};

if (themeToggle) {
  const savedTheme = localStorage.getItem(THEME_KEY) || defaultTheme;
  setTheme(savedTheme);
  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme") || defaultTheme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const handleHeaderState = () => {
  if (!siteHeader) return;
  if (window.scrollY > 8) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
};

/* Scroll-spy: one active nav link based on scroll position (avoids wrong highlight when multiple sections intersect). */
const sections = [...document.querySelectorAll("main section[id]")];

const getHeaderHeight = () => {
  if (!siteHeader) return 72;
  return siteHeader.getBoundingClientRect().height;
};

const updateNavActive = () => {
  if (!navLinks.length || !sections.length) return;

  const headerH = getHeaderHeight();
  const activationY = window.scrollY + headerH + 32;
  let activeId = sections[0].getAttribute("id") || "home";

  for (const section of sections) {
    const top = window.scrollY + section.getBoundingClientRect().top;
    if (top <= activationY) {
      activeId = section.getAttribute("id");
    }
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const id = href.startsWith("#") ? href.slice(1) : "";
    link.classList.toggle("active", id === activeId);
  });
};

let navSpyTicking = false;
const requestNavSpy = () => {
  if (navSpyTicking) return;
  navSpyTicking = true;
  requestAnimationFrame(() => {
    navSpyTicking = false;
    updateNavActive();
  });
};

const onScroll = () => {
  handleHeaderState();
  requestNavSpy();
};

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", requestNavSpy, { passive: true });
handleHeaderState();
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", requestNavSpy);
} else {
  requestNavSpy();
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
);

reveals.forEach((el) => revealObserver.observe(el));

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const level = entry.target.getAttribute("data-level");
      const fill = entry.target.querySelector(".skill-fill");
      if (fill && level) {
        fill.style.width = `${Math.max(0, Math.min(Number(level), 100))}%`;
      }
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.35 }
);

skillItems.forEach((item) => skillObserver.observe(item));

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const PROJECT_CONTENT = {
  "smart-greenhouse-decision-support-system": {
    tagline: "IoT + ML automation for precision greenhouse operations.",
    description:
      "A production-style research system that combines live sensor data, ML irrigation prediction, and a web control panel to improve greenhouse decision-making and reduce manual monitoring.",
    problem:
      "Greenhouse operators often rely on manual checks, delayed decisions, and disconnected tools. The project centralizes monitoring, recommendations, and actuator control in one workflow.",
    features: [
      "Real-time sensor ingestion and dashboard visualization.",
      "ML-assisted irrigation prediction and trigger recommendations.",
      "Hardware control integration for pumps, vents, and fans.",
      "Manual override controls with status monitoring.",
      "Event logs for troubleshooting and process tuning."
    ],
    role: "Final year research contributor focused on system integration, dashboard behavior, and turning model outputs into usable control workflows.",
    status: "Live project site available",
    badges: ["Featured", "Research"],
    screenshots: [
      "./assets/img/Projects_Images/RP_Automation_DashBoard.png",
      "./assets/img/Projects_Images/RP_Irrigation_UI.png",
      "./assets/img/Projects_Images/RP_Irrigation_Output.png"
    ]
  },
  "zumora-ai": {
    tagline: "Live AI SaaS Platform | React + Node + MongoDB + Gemini + NVIDIA",
    live: "https://zumora-ai.vercel.app/",
    description:
      "Zumora AI is a production-ready full-stack SaaS application for AI image generation and AI photo editing, built for real users with scalable provider routing and admin operations.",
    problem:
      "Most AI image apps are demos with fragile architecture. Zumora AI was built as a commercial-style platform with secure auth, usage controls, provider failover, and operational tooling.",
    features: [
      "Text-to-image generation and style-based AI photo editing.",
      "Before/after comparison slider, prompt history, and image history tracking.",
      "Google OAuth, JWT auth, OTP verification, and OTP password reset flows.",
      "Daily usage limits, feature toggles, upload limits, and retention controls.",
      "Admin panel to manage users, AI models, API keys, styles, and analytics."
    ],
    role: "Architected and developed the complete system: frontend UX, backend APIs, MongoDB schema design, AI integrations, deployment pipeline, and admin analytics.",
    status: "Live and actively used by real users",
    badges: ["Featured", "SaaS", "Live"],
    screenshots: [
      "./assets/img/Projects_Images/Zumora-AI-Home.png",
      "./assets/img/Projects_Images/Zumora-AI-Dashboard.png",
      "./assets/img/Projects_Images/Zumora-AI-Image Generation Page.png",
      "./assets/img/Projects_Images/Zumora-AI-Login.png",
      "./assets/img/Projects_Images/Zumora-AI-Profile.png",
      "./assets/img/Projects_Images/Admin-Zumora-Dashboard.png",
      "./assets/img/Projects_Images/Admin-Zumora-Main control.png",
    ]
  },
  "online-event-ticketing-web-application": {
    tagline: "End-to-end ticketing and event operations platform.",
    description:
      "A role-based ticketing platform for event operations, including organizer tools, customer booking flow, and administration support for sales visibility.",
    problem:
      "Event teams need reliable ticket sales, secure access control, and reporting in one place instead of fragmented manual processes.",
    features: [
      "Role-based modules for admin, organizers, and customers.",
      "Event CRUD, booking workflow, and QR e-ticket handling.",
      "Discount and loyalty handling in checkout flow.",
      "Sales and user reporting views for operations."
    ],
    role: "Full-stack developer building core backend and frontend modules with database-backed workflows.",
    status: "Repository private / not published yet",
    badges: ["Enterprise style"],
    screenshots: ["./assets/img/Projects_Images/OnlineEventTicketing.png"]
  },
  "bakery-management-web-application": {
    tagline: "Business workflow app for bakery operations.",
    description:
      "A unified bakery management web application covering catalog handling, orders, inventory tracking, and daily operations reporting.",
    problem:
      "Small teams need a simple workflow hub for stock and orders without switching across spreadsheets and disconnected tools.",
    features: [
      "Role-aware admin, staff, and customer views.",
      "Catalog and order processing flows.",
      "Inventory tracking with stock visibility.",
      "Sales overviews for day-to-day decisions."
    ],
    role: "Full-stack developer implementing core modules and workflow integration.",
    status: "Repository private / not published yet",
    screenshots: ["./assets/img/Projects_Images/BakeryManagement.png"]
  },
  "client-management-system-cms": {
    tagline: "Internship CMS focused on team coordination and task flow.",
    description:
      "A client management system module built during internship work, with responsive interfaces, API-backed updates, and team collaboration features.",
    problem:
      "Operational teams needed a cleaner way to track tasks and client-state changes without inconsistent updates between frontend and backend.",
    features: [
      "Responsive admin and staff task management screens.",
      "REST API integration for real-time state updates.",
      "Database design and CRUD operations for core entities.",
      "Integrated workflow with broader internship platform."
    ],
    role: "Web developer and group lead for the task management slice from UI to backend integration.",
    status: "Source code available",
    screenshots: ["./assets/img/Projects_Images/cms-inter-pro-2.png"]
  },
  "shopping-mall-web-application-ezy-mall": {
    tagline: "MERN shopping platform with shopper and admin journeys.",
    description:
      "A multi-module MERN project that includes shopping flows, management tools, parking visibility, and communication support.",
    problem:
      "The solution aimed to combine shopper convenience and store-side operations into one scalable web platform.",
    features: [
      "Separate user flows for shoppers and administrators.",
      "Product and shop management modules.",
      "Real-time parking information panel.",
      "Built-in chat room interaction area."
    ],
    role: "Project team contributor on full-stack module wiring and frontend-backend integration.",
    status: "Source code available",
    screenshots: ["./assets/img/Projects_Images/ITPM_ShoppingMall_App_EZY-mall.png"]
  },
  "social-media-fitness-web-application": {
    tagline: "Community fitness platform with social interactions.",
    description:
      "A social fitness web application blending profile features, workout content, API-backed feeds, and responsive UI behavior.",
    problem:
      "Fitness users needed a social and content-driven platform where progress, routines, and engagement live in one experience.",
    features: [
      "User profile and workout content modules.",
      "Feed-style interaction architecture.",
      "API-connected backend workflows.",
      "Responsive layout for mobile and desktop."
    ],
    role: "Team contributor on full-stack implementation and integration flow quality.",
    status: "Source code available",
    screenshots: ["./assets/img/Projects_Images/PAF_SocialMedia.png"]
  },
  "hi-fi-prototype-development-uiux": {
    tagline: "UX-focused high-fidelity prototyping project.",
    description:
      "A high-fidelity interface redesign and prototype exercise focused on usability improvements and modern interaction clarity.",
    problem:
      "The original flow had experience gaps that reduced usability and task completion confidence.",
    features: [
      "User-centered flow redesign and layout refinement.",
      "Interactive hi-fi prototype in Figma.",
      "Usability-oriented design decisions and iteration."
    ],
    role: "Frontend and UX lead for redesign direction and prototype delivery.",
    status: "Design file available",
    badges: ["Design"],
    screenshots: ["./assets/img/Projects_Images/HCI_Hi-Fi_Prototyoe.png"]
  },
  "e-commerce-shopping-application": {
    tagline: "Team-built MERN commerce workflow application.",
    description:
      "A coursework e-commerce application with catalog, cart behavior, and backend-connected product and order workflows.",
    problem:
      "The project explored how to keep an end-to-end commerce flow stable under team-based development and module integration.",
    features: [
      "Catalog and cart handling with full-stack wiring.",
      "MERN architecture for rapid feature extension.",
      "Reusable frontend components and API-connected flows."
    ],
    role: "Team contributor on integration stability and frontend-backend coordination.",
    status: "Source code available",
    screenshots: ["./assets/img/Projects_Images/ITP_E-Commese_App.png"]
  },
  "financial-management-app": {
    tagline: "Android personal finance tracker using Kotlin + Firebase.",
    description:
      "A mobile application for tracking income and expenses, maintaining lightweight budgets, and persisting user data with Firebase.",
    problem:
      "Many finance tracking apps are heavy for first-time users; this project focused on a simpler and practical flow.",
    features: [
      "Expense and income tracking workflows.",
      "Basic budget summaries for quick decisions.",
      "Firebase-backed persistence for user data."
    ],
    role: "Mobile application developer implementing core features and data flows.",
    status: "Repository private / not published yet",
    screenshots: ["./assets/img/Projects_Images/MAD_Finanical_App.png"]
  },
  "online-vehicle-service-management-system": {
    tagline: "Service booking and workshop flow management system.",
    description:
      "A Java servlet-based system for handling vehicle service bookings, schedule visibility, and service workflow tracking.",
    problem:
      "Manual booking coordination creates delays and poor traceability; this project digitized booking and service records.",
    features: [
      "Service slot booking and history tracking.",
      "Workshop-side service workflow organization.",
      "MySQL-backed persistence and retrieval."
    ],
    role: "Full-stack contributor on Java, frontend behavior, and database integration.",
    status: "Repository private / not published yet",
    screenshots: ["./assets/img/Projects_Images/OOP_Wehicle_Service_webapp.png"]
  },
  "web-application": {
    tagline: "Foundational full-stack coursework project.",
    description:
      "An early-stage web application built to practice PHP, MySQL, and front-end fundamentals while implementing end-to-end flows.",
    problem:
      "The goal was to establish practical full-stack fundamentals and delivery discipline early in the engineering path.",
    features: [
      "Basic dynamic pages using PHP and MySQL.",
      "Client-side interactivity with JavaScript.",
      "Structured HTML/CSS layout patterns."
    ],
    role: "Student developer implementing complete coursework module requirements.",
    status: "Source code available",
    screenshots: ["./assets/img/Projects_Images/IWT_Web_Ap.png"]
  }
};

let modalActiveProject = null;
let modalLastFocused = null;
let modalAutoSlideId = null;
let modalSlideIndex = 0;
let modalTouchStartX = null;
let modalTouchStartInScroll = false;
let scrollRestoreY = 0;
let modalCloseTimerId = null;
let modalFocusTimerId = null;

const ensureArray = (value) => (Array.isArray(value) ? value : []);

const buildProjectRecord = (card) => {
  const title = card.querySelector(".project-content h3")?.textContent?.trim() || "Project";
  const id = slugify(title);
  const meta = card.querySelector(".project-meta")?.textContent?.trim() || "Project case study";
  const shortDescription = card.querySelector(".project-body p")?.textContent?.trim() || "";
  const techStack = [...card.querySelectorAll(".tag-list span")].map((el) => el.textContent.trim()).filter(Boolean);
  const mediaImage = card.querySelector(".project-media img");
  const image = mediaImage
    ? {
        src: mediaImage.getAttribute("src") || "",
        alt: mediaImage.getAttribute("alt") || `${title} screenshot`
      }
    : null;

  const actionLinks = [...card.querySelectorAll(".project-actions a")].map((link) => ({
    href: link.getAttribute("href") || "",
    label: link.textContent.trim()
  }));
  const liveLink = actionLinks.find((link) => /live|demo/i.test(link.label))?.href || "";
  const githubLink = actionLinks.find((link) => /source|github|repo|cms|fms/i.test(link.label))?.href || "";
  const figmaLink = actionLinks.find((link) => /figma|design/i.test(link.label))?.href || "";

  const config = PROJECT_CONTENT[id] || {};
  const screenshots = ensureArray(config.screenshots)
    .map((src) => ({ src, alt: `${title} screenshot` }))
    .filter((shot) => shot.src);
  if (!screenshots.length && image?.src) {
    screenshots.push(image);
  }

  return {
    id,
    title,
    tagline: config.tagline || meta,
    description: config.description || shortDescription,
    problem: config.problem || "This project focuses on solving practical workflow and delivery challenges with a clean end-to-end approach.",
    features:
      ensureArray(config.features).length > 0
        ? config.features
        : ["Responsive user experience", "Backend-connected workflow", "Production-oriented engineering decisions"],
    role: config.role || meta,
    status: config.status || (liveLink || githubLink ? "Public links available" : "Project details available on request"),
    badges: ensureArray(config.badges),
    stack: ensureArray(config.techStack).length > 0 ? config.techStack : techStack,
    links: {
      live: config.live || liveLink,
      github: config.github || githubLink,
      figma: config.figma || figmaLink
    },
    screenshots
  };
};

const createTagChip = (value) => {
  const span = document.createElement("span");
  span.textContent = value;
  return span;
};

const createLinkPill = (label, href, iconClass) => {
  if (!href) return null;
  const anchor = document.createElement("a");
  anchor.className = "link-pill";
  anchor.href = href;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.innerHTML = `<i class="${iconClass}" aria-hidden="true"></i> ${label}`;
  return anchor;
};

const stopModalAutoplay = () => {
  if (modalAutoSlideId) {
    clearInterval(modalAutoSlideId);
    modalAutoSlideId = null;
  }
};

const renderModalSlideState = () => {
  if (!projectSlider || !projectSliderDots || !modalActiveProject) return;
  const slides = [...projectSlider.querySelectorAll(".project-slide")];
  const dots = [...projectSliderDots.querySelectorAll(".project-slider-dot")];
  slides.forEach((slide, index) => {
    const isActive = index === modalSlideIndex;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });
  dots.forEach((dot, index) => {
    const isActive = index === modalSlideIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-selected", String(isActive));
    dot.setAttribute("tabindex", isActive ? "0" : "-1");
  });
};

const getRenderedSlideCount = () => (projectSlider ? projectSlider.querySelectorAll(".project-slide").length : 0);

const setModalSlide = (index) => {
  const total = getRenderedSlideCount();
  if (total <= 0) return;
  modalSlideIndex = (index + total) % total;
  if (projectSlider) {
    projectSlider.querySelectorAll(".project-slide-scroll").forEach((el) => {
      el.scrollLeft = 0;
      el.scrollTop = 0;
    });
  }
  renderModalSlideState();
};

const startModalAutoplay = () => {
  stopModalAutoplay();
  if (getRenderedSlideCount() <= 1) return;
  modalAutoSlideId = window.setInterval(() => {
    setModalSlide(modalSlideIndex + 1);
  }, 4200);
};

const renderProjectSlider = (project) => {
  if (!projectSlider || !projectSliderDots || !projectSliderPrev || !projectSliderNext || !projectSliderNav) return;

  const shots = project.screenshots.length > 0 ? project.screenshots : [];
  modalSlideIndex = 0;

  if (!shots.length) {
    projectSlider.innerHTML = `
      <figure class="project-slide is-active" aria-hidden="false">
        <div class="project-slide-empty" role="img" aria-label="No preview available for this project">
          <i class="bx bx-image"></i>
          <p>No project preview available</p>
        </div>
      </figure>
    `;
    projectSliderDots.innerHTML = "";
    projectSliderNav.hidden = true;
    projectSliderPrev.disabled = true;
    projectSliderNext.disabled = true;
    stopModalAutoplay();
    return;
  }

  projectSlider.innerHTML = shots
    .map(
      (shot, index) => `
        <figure class="project-slide${index === 0 ? " is-active" : ""}" aria-hidden="${index === 0 ? "false" : "true"}">
          <div class="project-slide-scroll" role="region" aria-label="Screenshot — scroll to see full image">
            <img src="${shot.src}" alt="${shot.alt}" draggable="false">
          </div>
        </figure>
      `
    )
    .join("");

  projectSliderDots.innerHTML = shots
    .map(
      (_shot, index) => `
        <button
          class="project-slider-dot${index === 0 ? " is-active" : ""}"
          type="button"
          role="tab"
          aria-selected="${index === 0 ? "true" : "false"}"
          aria-label="View image ${index + 1}"
          data-slide-index="${index}"
        ></button>
      `
    )
    .join("");

  const hasManyShots = shots.length > 1;
  projectSliderNav.hidden = !hasManyShots;
  projectSliderPrev.disabled = !hasManyShots;
  projectSliderNext.disabled = !hasManyShots;
  renderModalSlideState();
  startModalAutoplay();
};

const getFocusableElements = () => {
  if (!projectModal) return [];
  return [...projectModal.querySelectorAll("a, button, textarea, input, select, [tabindex]:not([tabindex='-1'])")].filter(
    (el) => {
      if (el.hasAttribute("disabled")) return false;
      if (el.closest("[aria-hidden='true']")) return false;
      if (el.closest("[hidden]")) return false;
      return true;
    }
  );
};

const closeProjectModal = () => {
  if (!projectModal || !projectModal.classList.contains("is-open")) return;
  if (modalCloseTimerId) {
    clearTimeout(modalCloseTimerId);
    modalCloseTimerId = null;
  }
  if (modalFocusTimerId) {
    clearTimeout(modalFocusTimerId);
    modalFocusTimerId = null;
  }
  projectModal.classList.add("is-closing");
  projectModal.setAttribute("aria-hidden", "true");
  stopModalAutoplay();

  modalCloseTimerId = window.setTimeout(() => {
    projectModal.classList.remove("is-open", "is-closing");
    body.classList.remove("modal-open");
    document.documentElement.classList.remove("modal-open");
    body.style.removeProperty("top");
    window.scrollTo(0, scrollRestoreY);
    if (modalLastFocused instanceof HTMLElement) {
      modalLastFocused.focus();
    }
    modalCloseTimerId = null;
    modalActiveProject = null;
  }, 240);
};

const openProjectModal = (project) => {
  if (
    !projectModal ||
    !projectModalTitle ||
    !projectModalTagline ||
    !projectModalTags ||
    !projectModalDescription ||
    !projectModalProblem ||
    !projectModalFeatures ||
    !projectModalRole ||
    !projectModalStack ||
    !projectModalStatus ||
    !projectModalLinks
  ) {
    return;
  }

  if (modalCloseTimerId) {
    clearTimeout(modalCloseTimerId);
    modalCloseTimerId = null;
  }
  if (modalFocusTimerId) {
    clearTimeout(modalFocusTimerId);
    modalFocusTimerId = null;
  }
  modalActiveProject = project;
  if (!body.classList.contains("modal-open")) {
    modalLastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    scrollRestoreY = window.scrollY;
  }

  projectModalTitle.textContent = project.title;
  projectModalTagline.textContent = project.tagline;
  projectModalDescription.textContent = project.description;
  projectModalProblem.textContent = project.problem;
  projectModalRole.textContent = project.role;
  projectModalStatus.textContent = `Status: ${project.status}`;

  projectModalTags.innerHTML = "";
  project.badges.forEach((tag) => projectModalTags.append(createTagChip(tag)));
  if (!project.badges.length) {
    projectModalTags.append(createTagChip("Case study"));
  }

  projectModalFeatures.innerHTML = "";
  const featureList = project.features.length ? project.features : ["Feature details available on request"];
  featureList.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    projectModalFeatures.append(li);
  });

  projectModalStack.innerHTML = "";
  const stackList = project.stack.length ? project.stack : ["Not specified"];
  stackList.forEach((item) => projectModalStack.append(createTagChip(item)));

  projectModalLinks.innerHTML = "";
  const links = [
    createLinkPill("Live", project.links.live, "bx bx-link-external"),
    createLinkPill("GitHub", project.links.github, "bx bxl-github"),
    createLinkPill("Figma", project.links.figma, "bx bx-palette")
  ].filter(Boolean);

  if (!links.length) {
    const muted = document.createElement("span");
    muted.className = "link-pill link-pill--muted";
    muted.textContent = "Public links not available";
    projectModalLinks.append(muted);
  } else {
    links.forEach((link) => projectModalLinks.append(link));
  }

  renderProjectSlider(project);

  body.classList.add("modal-open");
  document.documentElement.classList.add("modal-open");
  body.style.top = `-${scrollRestoreY}px`;
  projectModal.classList.add("is-open");
  projectModal.classList.remove("is-closing");
  projectModal.setAttribute("aria-hidden", "false");

  modalFocusTimerId = window.setTimeout(() => {
    projectModalClose?.focus();
    modalFocusTimerId = null;
  }, 50);
};

if (projectCards.length && projectModal) {
  const projectRecords = new Map();

  projectCards.forEach((card) => {
    const record = buildProjectRecord(card);
    projectRecords.set(record.id, record);
    card.dataset.projectId = record.id;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-label", `Open project details for ${record.title}`);

    const actions = card.querySelector(".project-actions");
    if (actions && !actions.querySelector(".project-open-button")) {
      const button = document.createElement("button");
      button.className = "link-pill project-open-button";
      button.type = "button";
      button.innerHTML = '<i class="bx bx-expand-alt"></i> View details';
      actions.prepend(button);

      const label = document.createElement("span");
      label.className = "project-open-label";
      label.textContent = "Click card for full case study";
      actions.append(label);
    }

    card.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.closest(".project-details")) return;
      if (target.closest("a")) {
        event.preventDefault();
      }
      const id = card.dataset.projectId || "";
      const project = projectRecords.get(id);
      if (project) openProjectModal(project);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      const id = card.dataset.projectId || "";
      const project = projectRecords.get(id);
      if (project) openProjectModal(project);
    });
  });

  projectModal.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.closest("[data-modal-close='true']")) {
      closeProjectModal();
    }
  });

  projectModalClose?.addEventListener("click", closeProjectModal);

  projectSliderPrev?.addEventListener("click", () => {
    setModalSlide(modalSlideIndex - 1);
    startModalAutoplay();
  });

  projectSliderNext?.addEventListener("click", () => {
    setModalSlide(modalSlideIndex + 1);
    startModalAutoplay();
  });

  projectSliderDots?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest(".project-slider-dot");
    if (!button) return;
    const index = Number(button.getAttribute("data-slide-index"));
    if (!Number.isNaN(index)) {
      setModalSlide(index);
      startModalAutoplay();
    }
  });

  projectSlider?.addEventListener("pointerdown", (event) => {
    modalTouchStartX = event.clientX;
    const el = event.target instanceof HTMLElement ? event.target : null;
    modalTouchStartInScroll = Boolean(el?.closest(".project-slide-scroll"));
  });

  projectSlider?.addEventListener("pointerup", (event) => {
    if (modalTouchStartX == null || getRenderedSlideCount() <= 1) {
      modalTouchStartX = null;
      modalTouchStartInScroll = false;
      return;
    }
    if (modalTouchStartInScroll) {
      modalTouchStartX = null;
      modalTouchStartInScroll = false;
      return;
    }
    const delta = event.clientX - modalTouchStartX;
    modalTouchStartX = null;
    modalTouchStartInScroll = false;
    if (Math.abs(delta) < 38) return;
    setModalSlide(delta < 0 ? modalSlideIndex + 1 : modalSlideIndex - 1);
    startModalAutoplay();
  });

  projectSlider?.addEventListener("pointercancel", () => {
    modalTouchStartX = null;
    modalTouchStartInScroll = false;
  });

  document.addEventListener("keydown", (event) => {
    if (!projectModal.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeProjectModal();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setModalSlide(modalSlideIndex + 1);
      startModalAutoplay();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setModalSlide(modalSlideIndex - 1);
      startModalAutoplay();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = getFocusableElements();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

const setFormStatus = (message, isError = false) => {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.removeAttribute("data-state");
  if (isError) {
    formStatus.setAttribute("data-state", "error");
  }
};

const isEmailJSAvailable = () =>
  typeof window.emailjs !== "undefined" && typeof window.emailjs.sendForm === "function";

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      setFormStatus("Please complete all required fields correctly.", true);
      form.reportValidity();
      return;
    }

    if (!isEmailJSAvailable()) {
      setFormStatus("Message service is currently unavailable. Please email me directly.", true);
      return;
    }

    if (!sendButton) return;
    sendButton.disabled = true;
    setFormStatus("Sending your message...");

    try {
      await window.emailjs.sendForm(
        "service_5huckw5",
        "template_9qe856m",
        form,
        "F15PPLHuipmmZlgb7"
      );
      setFormStatus("Thanks! Your message has been sent successfully.");
      form.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      setFormStatus("Failed to send message. Please try again in a moment.", true);
    } finally {
      sendButton.disabled = false;
    }
  });
}
