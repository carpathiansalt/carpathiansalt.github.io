
// Enhanced Portfolio JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initAnimations();
  initSmoothScrolling();
  initMobileMenu();
  initContactForm();
  initScrollEffects();
  initFloatingElements();
  initProjectCards();
});

// Animation initialization
function initAnimations() {
  // Hero section animations
  anime({
    targets: '.hero-text h1',
    translateY: [-50, 0],
    opacity: [0, 1],
    duration: 1200,
    easing: 'easeOutExpo'
  });

  anime({
    targets: '.hero-subtitle',
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: 300,
    easing: 'easeOutExpo'
  });

  anime({
    targets: '.hero-stats .stat',
    translateY: [30, 0],
    opacity: [0, 1],
    delay: anime.stagger(150, {start: 600}),
    duration: 800,
    easing: 'easeOutExpo'
  });

  anime({
    targets: '.hero-cta .btn',
    translateY: [30, 0],
    opacity: [0, 1],
    delay: anime.stagger(200, {start: 900}),
    duration: 800,
    easing: 'easeOutExpo'
  });

  // Project cards animation
  anime({
    targets: '.project-card',
    opacity: [0, 1],
    translateY: [50, 0],
    delay: anime.stagger(200, {start: 1200}),
    duration: 800,
    easing: 'easeOutExpo'
  });

  // Skills animation
  anime({
    targets: '.skill-category',
    opacity: [0, 1],
    translateX: [-50, 0],
    delay: anime.stagger(150, {start: 1600}),
    duration: 800,
    easing: 'easeOutExpo'
  });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('nav a, .hero-cta a, .footer-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }
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
      
      // Simple validation
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
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  
  // Set background color based on type
  if (type === 'success') {
    notification.style.background = '#10b981';
  } else if (type === 'error') {
    notification.style.background = '#ef4444';
  } else {
    notification.style.background = '#c580ff';
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
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Scroll effects
function initScrollEffects() {
  // Header background on scroll
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(20, 26, 31, 0.98)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.background = 'rgba(20, 26, 31, 0.95)';
      header.style.boxShadow = 'none';
    }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.skill-category, .ai-milestone, .project-card');
  animateElements.forEach(el => observer.observe(el));
}

// Floating elements animation
function initFloatingElements() {
  const floatingElements = document.querySelectorAll('.float-element');
  
  floatingElements.forEach((element, index) => {
    const speed = element.getAttribute('data-speed') || 1;
    
    // Create individual floating animation
    anime({
      targets: element,
      translateY: [-20, 20],
      translateX: [-10, 10],
      rotate: [-5, 5],
      duration: 4000 + (index * 1000),
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      delay: index * 500
    });
  });
}

// Project cards interaction
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add click sound effect (optional)
    card.addEventListener('click', () => {
      // You can add a subtle sound effect here
      card.style.transform = 'translateY(-5px) scale(0.98)';
      setTimeout(() => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
      }, 150);
    });
  });
}

// Parallax effect for background
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.animated-bg');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Typing effect for hero title (optional)
function initTypingEffect() {
  const heroTitle = document.querySelector('.hero-text h1');
  if (!heroTitle) return;
  
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  // Start typing effect after initial animation
  setTimeout(typeWriter, 1500);
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  // Uncomment the line below if you want the typing effect
  // initTypingEffect();
});

// Add CSS for mobile menu
const mobileMenuStyles = `
  @media (max-width: 768px) {
    nav {
      position: fixed;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(20, 26, 31, 0.98);
      backdrop-filter: blur(10px);
      flex-direction: column;
      padding: 20px;
      transform: translateY(-100%);
      transition: transform 0.3s ease;
      border-top: 1px solid rgba(197, 128, 255, 0.1);
    }
    
    nav.active {
      transform: translateY(0);
    }
    
    .mobile-menu-btn.active i {
      transform: rotate(90deg);
    }
    
    .mobile-menu-btn i {
      transition: transform 0.3s ease;
    }
  }
  
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
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);
