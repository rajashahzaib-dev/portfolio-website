// ===== Typing effect in hero =====
const phrases = [
  "modern websites.",
  "mobile apps.",
  "online ordering apps.",
  "fast landing pages.",
  "mobile-friendly redesigns.",
];
const typedEl = document.getElementById("typed");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = phrases[phraseIndex];
  typedEl.textContent = current.slice(0, charIndex);

  if (!deleting) {
    charIndex++;
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(type, 1600); // pause at full phrase
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 40 : 75);
}
type();

// ===== Navbar background on scroll =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// ===== Mobile menu =====
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    navLinks.classList.remove("open");
  })
);

// ===== Scroll reveal animations (staggered inside grids) =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
        // clear stagger delay so hover effects respond instantly afterwards
        setTimeout(() => { entry.target.style.transitionDelay = ""; }, 1300);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".cards-grid").forEach((grid) => {
  [...grid.children].forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.12}s`;
  });
});
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== Galaxy star field =====
const starsBox = document.getElementById("stars");
for (let i = 0; i < 110; i++) {
  const star = document.createElement("span");
  star.className = "star";
  const size = 1 + Math.random() * 2.2;
  // ~25% of stars get a colored glow (cyan / purple / pink / gold)
  const roll = Math.random();
  if (roll > 0.94) star.classList.add("glow");
  else if (roll > 0.88) star.classList.add("glow-purple");
  else if (roll > 0.82) star.classList.add("glow-pink");
  else if (roll > 0.76) star.classList.add("glow-gold");
  star.style.width = size + "px";
  star.style.height = size + "px";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDuration = 2 + Math.random() * 5 + "s";
  star.style.animationDelay = Math.random() * 5 + "s";
  starsBox.appendChild(star);
}

// ===== Floating particles =====
const particles = document.getElementById("particles");
for (let i = 0; i < 28; i++) {
  const p = document.createElement("span");
  const size = 2 + Math.random() * 3;
  p.style.width = size + "px";
  p.style.height = size + "px";
  p.style.left = Math.random() * 100 + "%";
  p.style.animationDuration = 9 + Math.random() * 14 + "s";
  p.style.animationDelay = Math.random() * 14 + "s";
  if (Math.random() > 0.5) p.style.background = "#7c5cff";
  particles.appendChild(p);
}

// ===== Scroll progress bar =====
const progressBar = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (window.scrollY / max) * 100 + "%";
});

// ===== 3D tilt on cards =====
document.querySelectorAll(".card, .project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) perspective(800px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ===== Back to top button =====
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 500);
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });
  navAnchors.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Copy email button =====
const copyBtn = document.getElementById("copyEmail");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.email);
    } catch (e) {
      const tmp = document.createElement("textarea");
      tmp.value = copyBtn.dataset.email;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand("copy");
      tmp.remove();
    }
    const original = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = original), 1600);
  });
}
