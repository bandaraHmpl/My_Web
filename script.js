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
if (!localStorage.getItem('theme') && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
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
      
      // Animate progress bars when skills section is visible
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
  // Show/hide back to top button
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
      const sectionHeight = section.clientHeight;
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
    anchor.addEventListener('click', function (e) {
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
        
        // Close mobile menu if open
        document.querySelector('nav').classList.remove('mobile-open');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        
        // Update URL without page reload
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
      
      // Show loading state
      const submitBtn = this.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');
      
      btnText.textContent = 'Sending...';
      btnLoader.style.display = 'block';
      submitBtn.disabled = true;

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      console.log('Form submitted with data:', data);
      
      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Success - show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Reset form
        this.reset();
        
        // Reset button state
        btnText.textContent = 'Send Message';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
        
        // Hide success message after 5 seconds and show form again
        setTimeout(() => {
          formSuccess.style.display = 'none';
          contactForm.style.display = 'block';
        }, 5000);
      }, 2000);
    });
  }

  // Add floating animation to info cards
  const infoCards = document.querySelectorAll('.info-card, .achievement-card, .project-card');
  
  infoCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('float-in');
  });

  // Initialize functions
  handleScroll();
  setActiveLink();
  
  // Event listeners
  window.addEventListener('scroll', () => {
    handleScroll();
    setActiveLink();
  });
  
  // Handle page load with hash in URL
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
    
    // Start typing animation
    if (texts.length) setTimeout(type, 1000);
  });
});

// Animate Progress Bars
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress');
  progressBars.forEach(bar => {
    const width = bar.getAttribute('data-width') + '%';
    bar.style.width = width;
  });
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.classList.add('loaded');
    });
    
    // If image is already loaded (cached)
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