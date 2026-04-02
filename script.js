// Loading Screen
window.addEventListener('load', function() {
  const loadingScreen = document.querySelector('.loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1000);
});

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme in localStorage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  themeBtn.textContent = '🌞';
}

// Check system preference if no saved theme
if (
    !localStorage.getItem('theme') &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  body.classList.add('dark');
  themeBtn.textContent = '🌞';
}

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  themeBtn.textContent = body.classList.contains('dark') ? '🌞' : '🌙';
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    if (e.matches) {
      body.classList.add('dark');
      themeBtn.textContent = '🌞';
    } else {
      body.classList.remove('dark');
      themeBtn.textContent = '🌙';
    }
  }
});

// Typing Animation for Home Section
const texts = [
  "Pradeep Lakshan",
  "a Developer",
  "a Problem Solver",
  "a Creative Thinker"
];
const typingSpeed = 100;
const erasingSpeed = 50;
const newTextDelay = 2000;

let textArrayIndex = 0;
let charIndex = 0;
let isTyping = true;

function type() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  if (isTyping) {
    if (charIndex < texts[textArrayIndex].length) {
      typingElement.textContent += texts[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      isTyping = false;
      setTimeout(type, newTextDelay);
    }
  } else {
    if (charIndex > 0) {
      typingElement.textContent = texts[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, erasingSpeed);
    } else {
      isTyping = true;
      textArrayIndex = (textArrayIndex + 1) % texts.length;
      setTimeout(type, typingSpeed + 1000);
    }
  }
}

// Scroll Reveal Animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');

      if (entry.target.id === 'skills') {
        animateProgressBars();
      }
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('section').forEach(sec => observer.observe(sec));

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

backToTopBtn.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Header Functionality
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

  // Mobile menu functionality
  mobileMenuBtn.addEventListener('click', function() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('mobile-open');
    this.innerHTML = nav.classList.contains('mobile-open') ? '✕' : '☰';
    this.setAttribute('aria-expanded', nav.classList.contains('mobile-open'));
  });

  // Header scroll effect
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Active link highlighting
  function setActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        document.querySelector('nav').classList.remove('mobile-open');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');

        history.pushState(null, null, targetId);
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    const nav = document.querySelector('nav');
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnMenuBtn = mobileMenuBtn.contains(e.target);

    if (!isClickInsideNav && !isClickOnMenuBtn && nav.classList.contains('mobile-open')) {
      nav.classList.remove('mobile-open');
      mobileMenuBtn.innerHTML = '☰';
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const nav = document.querySelector('nav');
      if (nav.classList.contains('mobile-open')) {
        nav.classList.remove('mobile-open');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Contact Form Functionality
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitBtn = this.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');

      btnText.textContent = 'Sending...';
      btnLoader.style.display = 'block';
      submitBtn.disabled = true;

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      console.log('Form submitted with data:', data);

      setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';

        this.reset();

        btnText.textContent = 'Send Message';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;

        setTimeout(() => {
          formSuccess.style.display = 'none';
          contactForm.style.display = 'block';
        }, 5000);
      }, 2000);
    });
  }

  // Add floating animation to cards
  const infoCards = document.querySelectorAll('.info-card, .achievement-card, .project-card');

  infoCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('float-in');
  });

  handleScroll();
  setActiveLink();

  window.addEventListener('scroll', () => {
    handleScroll();
    setActiveLink();
  });

  window.addEventListener('load', function() {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        setTimeout(() => {
          window.scrollTo(0, targetPosition);
        }, 100);
      }
    }

    if (texts.length) setTimeout(type, 1000);
  });
});

// Animate Progress Bars
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress');
  progressBars.forEach(bar => {
    bar.style.width = bar.getAttribute('data-width') + '%';
  });
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');

  images.forEach(img => {
    img.addEventListener('load', function() {
      this.classList.add('loaded');
    });

    if (img.complete) {
      img.classList.add('loaded');
    }
  });
});

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.alt = 'Image not available';
    console.warn('Image failed to load:', this.src);
  });
});

// Add intersection observer for progress bars
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateProgressBars();
    }
  });
}, { threshold: 0.5 });

// Observe skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Load Projects from Backend
const apiUrl = "https://my-web-backend-production.up.railway.app/projects";

function getProjectIcon(title) {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("web") || lowerTitle.includes("portfolio")) {
    return "fas fa-globe";
  }
  if (lowerTitle.includes("todo") || lowerTitle.includes("task")) {
    return "fas fa-tasks";
  }
  if (lowerTitle.includes("design") || lowerTitle.includes("creative")) {
    return "fas fa-palette";
  }
  if (lowerTitle.includes("student") || lowerTitle.includes("management")) {
    return "fas fa-user-graduate";
  }

  return "fas fa-code";
}

function getProjectNumber(index) {
  return String(index + 1).padStart(2, "0");
}

function getTechTags(technologies) {
  if (!technologies || technologies.trim() === "") {
    return "";
  }

  return technologies
      .split(",")
      .map(tech => tech.trim())
      .filter(tech => tech !== "")
      .map(tech => `<span class="tech-tag">${tech}</span>`)
      .join("");
}

function createProjectGallery(images = []) {
  if (!images || images.length === 0) {
    return "";
  }

  const count = images.length;

  if (count === 1) {
    return `
      <div class="project-gallery gallery-1">
        <img src="${images[0]}" alt="Project image" class="gallery-img">
      </div>
    `;
  }

  if (count === 2) {
    return `
      <div class="project-gallery gallery-2">
        <img src="${images[0]}" alt="Project image" class="gallery-img">
        <img src="${images[1]}" alt="Project image" class="gallery-img">
      </div>
    `;
  }

  if (count === 3) {
    return `
      <div class="project-gallery gallery-3">
        <img src="${images[0]}" alt="Project image" class="gallery-img big-img">
        <img src="${images[1]}" alt="Project image" class="gallery-img">
        <img src="${images[2]}" alt="Project image" class="gallery-img">
      </div>
    `;
  }

  if (count === 4) {
    return `
      <div class="project-gallery gallery-4">
        <img src="${images[0]}" alt="Project image" class="gallery-img">
        <img src="${images[1]}" alt="Project image" class="gallery-img">
        <img src="${images[2]}" alt="Project image" class="gallery-img">
        <img src="${images[3]}" alt="Project image" class="gallery-img">
      </div>
    `;
  }

  const remaining = count - 4;

  return `
    <div class="project-gallery gallery-many">
      <img src="${images[0]}" alt="Project image" class="gallery-img">
      <img src="${images[1]}" alt="Project image" class="gallery-img">
      <img src="${images[2]}" alt="Project image" class="gallery-img">
      <div class="gallery-more">
        <img src="${images[3]}" alt="Project image" class="gallery-img">
        <span class="more-overlay">+${remaining}</span>
      </div>
    </div>
  `;
}

function loadProjects() {
  fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const container = document.querySelector(".project-grid");
        if (!container) return;

        container.innerHTML = "";

        data.forEach((project, index) => {
          const iconClass = getProjectIcon(project.title || "");
          const techTags = getTechTags(project.technologies || "");
          const projectNumber = getProjectNumber(index);

          const githubButton =
              project.githubLink && project.githubLink.trim() !== ""
                  ? `<a href="${project.githubLink}" target="_blank" class="project-link">View on GitHub</a>`
                  : `<span class="project-link coming-soon">GitHub Soon</span>`;

          const liveButton =
              project.liveLink && project.liveLink.trim() !== ""
                  ? `<a href="${project.liveLink}" target="_blank" class="project-link live-link">Live Preview</a>`
                  : `<span class="project-link coming-soon">Coming Soon</span>`;

          const projectGallery = createProjectGallery(project.images || []);

          container.insertAdjacentHTML(
              "beforeend",
              `
          <div class="project-card">
            ${projectGallery}
            
            <div class="project-icon">
              <i class="${iconClass}"></i>
            </div>

            <h3>Project ${projectNumber} – ${project.title || ""}</h3>

            <p>${project.description || ""}</p>

            <div class="project-tech">
              ${techTags}
            </div>

            <div class="project-buttons">
              ${githubButton}
              ${liveButton}
            </div>
          </div>
          `
          );
        });
      })
      .catch(err => console.error("Error loading projects:", err));
}

loadProjects();