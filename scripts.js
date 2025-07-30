
// Professional Portfolio JavaScript - Optimized for Performance
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio loaded successfully!");
  
  // Check if all sections are present
  const sections = ['home', 'about', 'experience', 'projects', 'contact'];
  sections.forEach(section => {
    const element = document.getElementById(section);
    if (element) {
      console.log(`✅ Section "${section}" found`);
    } else {
      console.log(`❌ Section "${section}" missing`);
    }
  });
  
  // Check if anime.js is loaded
  if (typeof anime !== 'undefined') {
    console.log("✅ Anime.js loaded successfully");
  } else {
    console.log("❌ Anime.js not loaded");
  }
  
  // Initialize with performance optimizations
  initNavigation();
  initAnimations();
  initSmoothScrolling();
  initContactForm();
  initScrollEffects();
  initProjectCards();
});

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Navigation functionality
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

// Smooth scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Animations
function initAnimations() {
  // Hero animations
  anime({
    targets: '.hero-title .title-line',
    translateY: [-50, 0],
    opacity: [0, 1],
    duration: 1200,
    delay: anime.stagger(200),
    easing: 'easeOutExpo'
  });

  anime({
    targets: '.hero-subtitle',
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: 600,
    easing: 'easeOutExpo'
  });

  anime({
    targets: '.hero-stats .stat-item',
    translateY: [30, 0],
    opacity: [0, 1],
    delay: anime.stagger(150, {start: 800}),
    duration: 800,
    easing: 'easeOutExpo'
  });

  anime({
    targets: '.hero-actions .btn',
    translateY: [30, 0],
    opacity: [0, 1],
    delay: anime.stagger(200, {start: 1100}),
    duration: 800,
    easing: 'easeOutExpo'
  });

  anime({
    targets: '.mascot',
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: 1000,
    easing: 'easeOutExpo'
  });

  // Section animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Animate children with stagger
        const children = entry.target.querySelectorAll('.expertise-item, .timeline-item, .project-card');
        if (children.length > 0) {
          anime({
            targets: children,
            translateY: [30, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutExpo'
          });
        }
      }
    });
  }, observerOptions);

  // Observe sections
  const sections = document.querySelectorAll('.about, .experience, .projects, .contact');
  sections.forEach(section => observer.observe(section));
}

// Scroll effects - Optimized with throttling
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(10, 10, 10, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(10, 10, 10, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  }, 16)); // ~60fps
}

// Project cards interactions
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
    
    card.addEventListener('click', () => {
      // Add click feedback
      card.style.transform = 'translateY(-5px) scale(0.98)';
      setTimeout(() => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
      }, 150);
    });
  });
}

// Contact form handling
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Validation
      if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Simulate form submission
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    });
  }
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `;
  
  // Background color based on type
  if (type === 'success') {
    notification.style.background = '#10b981';
  } else if (type === 'error') {
    notification.style.background = '#ef4444';
  } else {
    notification.style.background = '#00d4ff';
  }
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Add CSS for animations
const animationStyles = `
  .animate-in {
    animation: slideInUp 0.6s ease forwards;
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .expertise-item,
  .timeline-item,
  .project-card {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .expertise-item.animate-in,
  .timeline-item.animate-in,
  .project-card.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
