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
