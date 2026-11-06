/**
 * SARA RAMADAN — AI & MACHINE LEARNING ENGINEER PORTFOLIO
 * Vanilla JavaScript Interactions & Core Logic
 * 
 * Features:
 * - Theme Switcher (Light/Dark mode with localStorage)
 * - Mobile Navigation & Hamburger Menu
 * - Scroll Progress Indicator & Sticky Navbar
 * - Active Section Indicator (Scrollspy)
 * - Scroll Reveal Animations (IntersectionObserver)
 * - Animated Skill Progress Bars & Numerical Counters
 * - Skill Category Filtering
 * - Full-featured Testimonial Carousel (Auto-slide, controls, swipe)
 * - Interactive Contact Form with Validation
 * - Back to Top Button
 * - Subtle Card 3D Tilt Effect
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. THEME SWITCHER (LIGHT / DARK MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to 'dark' for the AI aesthetic
  const savedTheme = localStorage.getItem('sara_portfolio_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeButtonAria(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlRoot.setAttribute('data-theme', nextTheme);
      localStorage.setItem('sara_portfolio_theme', nextTheme);
      updateThemeButtonAria(nextTheme);
    });
  }

  function updateThemeButtonAria(theme) {
    if (!themeToggleBtn) return;
    const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    themeToggleBtn.setAttribute('aria-label', label);
    themeToggleBtn.setAttribute('title', label);
  }

  /* ==========================================================================
     2. MOBILE NAVIGATION & HAMBURGER MENU
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      toggleMobileMenu(!isOpen);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && 
          !navMenu.contains(e.target) && 
          !hamburgerBtn.contains(e.target)) {
        toggleMobileMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMobileMenu(false);
      }
    });
  }

  function toggleMobileMenu(open) {
    if (!hamburgerBtn || !navMenu) return;
    if (open) {
      navMenu.classList.add('open');
      hamburgerBtn.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // Prevent body scroll while menu is open
    } else {
      navMenu.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  /* ==========================================================================
     3. STICKY NAVBAR & READING SCROLL PROGRESS BAR
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', handleWindowScroll, { passive: true });

  function handleWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    // Sticky Navbar blur on scroll
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Top Reading Scroll Progress Bar
    if (scrollProgressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progressPercent = (scrollY / docHeight) * 100;
        scrollProgressBar.style.width = `${progressPercent}%`;
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  // Back to Top button click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     4. ACTIVE NAVIGATION LINK ON SCROLL (SCROLLSPY)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  const scrollspyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(section => scrollspyObserver.observe(section));

  /* ==========================================================================
     5. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const animatedElements = document.querySelectorAll('[data-animate]');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay') || 0;
        
        setTimeout(() => {
          el.classList.add('animated');
        }, parseInt(delay, 10));

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     6. ANIMATED SKILL PROGRESS BARS & COUNTERS
     ========================================================================== */
  const skillsSection = document.getElementById('skills');
  let skillsAnimated = false;

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
          skillsAnimated = true;
          animateAllSkills();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    skillsObserver.observe(skillsSection);
  }

  function animateAllSkills() {
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillPercentages = document.querySelectorAll('.skill-percentage');

    // Animate the horizontal progress bar widths
    skillFills.forEach(fill => {
      const targetWidth = fill.getAttribute('data-progress') || '0';
      fill.style.width = `${targetWidth}%`;
    });

    // Animate the numerical numbers counter
    skillPercentages.forEach(percentageEl => {
      const targetNum = parseInt(percentageEl.getAttribute('data-target'), 10) || 0;
      animateCounter(percentageEl, 0, targetNum, 1200);
    });
  }

  function animateCounter(element, start, end, duration) {
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic calculation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * (end - start) + start);
      element.textContent = `${currentVal}%`;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = `${end}%`;
      }
    }

    window.requestAnimationFrame(step);
  }

  /* ==========================================================================
     7. SKILL CATEGORY FILTER TABS
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.skill-filter-btn');
  const skillCategoryCards = document.querySelectorAll('.skill-category-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      skillCategoryCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ==========================================================================
     8. TESTIMONIAL SLIDER / CAROUSEL
     ========================================================================== */
  const slider = document.getElementById('testimonial-slider');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');
  const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];

  let currentSlideIndex = 0;
  let autoSlideTimer = null;
  const slideIntervalMs = 5000;

  function showSlide(index) {
    if (slides.length === 0) return;

    // Handle wrapping
    if (index >= slides.length) {
      currentSlideIndex = 0;
    } else if (index < 0) {
      currentSlideIndex = slides.length - 1;
    } else {
      currentSlideIndex = index;
    }

    slides.forEach((slide, idx) => {
      if (idx === currentSlideIndex) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === currentSlideIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }

  function nextSlide() {
    showSlide(currentSlideIndex + 1);
  }

  function prevSlide() {
    showSlide(currentSlideIndex - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(nextSlide, slideIntervalMs);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  // Button Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoSlide(); // reset timer on manual action
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoSlide();
    });
  }

  // Dot Listeners
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideNum = parseInt(e.target.getAttribute('data-slide'), 10);
      showSlide(slideNum);
      startAutoSlide();
    });
  });

  // Pause on hover
  const sliderWrapper = document.querySelector('.slider-wrapper');
  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
    sliderWrapper.addEventListener('mouseleave', startAutoSlide);
    sliderWrapper.addEventListener('focusin', stopAutoSlide);
    sliderWrapper.addEventListener('focusout', startAutoSlide);
  }

  // Touch Swipe Support for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (slider) {
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
      startAutoSlide();
    }, { passive: true });
  }

  function handleSwipeGesture() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swiped Left -> Next
      nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swiped Right -> Previous
      prevSlide();
    }
  }

  // Initialize first slide and start auto-timer
  showSlide(0);
  startAutoSlide();

  /* ==========================================================================
     9. INTERACTIVE CONTACT FORM WITH VALIDATION & MAILTO DISPATCH
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('sender-name');
      const emailInput = document.getElementById('sender-email');
      const subjectInput = document.getElementById('sender-subject');
      const messageInput = document.getElementById('sender-message');

      // Clear previous errors
      clearFormErrors();

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showFieldError('name-error', 'Please enter your name.');
        isValid = false;
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        showFieldError('email-error', 'Please enter your email address.');
        isValid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        showFieldError('email-error', 'Please enter a valid email address.');
        isValid = false;
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        showFieldError('subject-error', 'Please enter a subject.');
        isValid = false;
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        showFieldError('message-error', 'Please enter your message.');
        isValid = false;
      }

      if (!isValid) return;

      // Compose mailto link with encoded components
      const toEmail = 'sara.aiengineering@gmail.com';
      const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value.trim()}`);
      const body = encodeURIComponent(
        `Hello Sara,\n\n${messageInput.value.trim()}\n\nBest regards,\n${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}`
      );

      const mailtoUrl = `mailto:${toEmail}?subject=${subject}&body=${body}`;

      // Feedback message
      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Opening your email client to send your message...';
      }

      // Open mailto link
      window.location.href = mailtoUrl;

      // Clear form after 2 seconds
      setTimeout(() => {
        contactForm.reset();
        if (formStatus) {
          formStatus.textContent = '';
        }
      }, 3000);
    });
  }

  function showFieldError(errorElementId, message) {
    const errorEl = document.getElementById(errorElementId);
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearFormErrors() {
    const errorEls = document.querySelectorAll('.field-error');
    errorEls.forEach(el => el.textContent = '');
    if (formStatus) {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }
  }

  /* ==========================================================================
     10. SUBTLE MOUSE TILT & GLOW INTERACTION (DESKTOP ONLY)
     ========================================================================== */
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isTouchDevice && !prefersReducedMotion) {
    const tiltCards = document.querySelectorAll('.project-card, .hero-image-card');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((cardY - centerY) / centerY) * -5;
        const rotateY = ((cardX - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

});
