// MOASS Website Interactions
(function() {
  'use strict';

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  const copyBtn = document.getElementById('copyCa');
  const caBox = document.getElementById('caBox');

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu after clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.textContent = '☰';
      });
    });
  }

  // Copy CA when available
  if (copyBtn && caBox) {
    copyBtn.addEventListener('click', () => {
      const ca = caBox.textContent.trim();
      if (ca && ca.length > 10 && !ca.includes('soon')) {
        navigator.clipboard.writeText(ca).then(() => {
          const original = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          setTimeout(() => copyBtn.textContent = original, 1500);
        }).catch(() => {
          copyBtn.textContent = 'Error';
          setTimeout(() => copyBtn.textContent = 'Copy', 1500);
        });
      }
    });
  }

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
      } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.85)';
      }
    });
  }

  // Intersection observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.narrative-card, .token-card, .story-step, .community-link').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add visible class style
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
})();
