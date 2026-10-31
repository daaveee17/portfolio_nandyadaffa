/**
 * Portfolio - Nandya Muhammad Daffa
 * Interactive JavaScript for smooth navigation, lightbox, presentation mode, and micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect & ScrollSpy
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links .nav-item a, .mobile-nav-drawer .nav-item a');
  const sections = document.querySelectorAll('.slide-section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      document.querySelectorAll('.nav-item').forEach(li => {
        li.classList.remove('active');
        const link = li.querySelector('a');
        if (link && link.getAttribute('href') === `#${currentId}`) {
          li.classList.add('active');
        }
      });
    }
  });

  // 2. Mobile Drawer Navigation
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('open');
      mobileDrawer.classList.toggle('open');
    });

    // Close drawer when clicking a link
    mobileDrawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 3. Lightbox / Modal for Certificates and Project Mockups
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

  function openLightbox(src, captionText) {
    if (!lightboxModal) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = captionText || '';
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    if (!document.body.classList.contains('presentation-mode')) {
      document.body.style.overflow = '';
    }
  }

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Attach click listeners to all certificate cards, project mockups & education photo
  document.querySelectorAll('.cert-card, .project-mockup-card, .earsip-mobile-card, .earsip-wide-card, .education-banner-wrap').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const caption = card.dataset.caption || (img ? img.alt : '');
      if (img) {
        openLightbox(img.src, caption);
      }
    });
  });

  // 4. Toast Notification & Copy to Clipboard
  const toastMsg = document.getElementById('toast-msg');

  function showToast(message) {
    if (!toastMsg) return;
    toastMsg.textContent = message;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 2500);
  }

  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      const textToCopy = el.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Disalin: ${textToCopy}`);
        }).catch(() => {
          showToast(`Teks: ${textToCopy}`);
        });
      }
    });
  });

  // 5. Presentation / Slide-by-slide Mode
  const modeToggleBtn = document.getElementById('mode-toggle-btn');
  const presControls = document.getElementById('pres-controls');
  const presPrevBtn = document.getElementById('pres-prev');
  const presNextBtn = document.getElementById('pres-next');
  const presCounter = document.getElementById('pres-counter');
  
  let isPresentationMode = false;
  let currentSlideIndex = 0;
  const slideSections = Array.from(document.querySelectorAll('.slide-section'));

  function updateSlideView() {
    slideSections.forEach((sec, idx) => {
      if (idx === currentSlideIndex) {
        sec.classList.add('active-slide');
      } else {
        sec.classList.remove('active-slide');
      }
    });
    if (presCounter) {
      presCounter.textContent = `${currentSlideIndex + 1} / ${slideSections.length}`;
    }
    // Update navbar active state
    const currentId = slideSections[currentSlideIndex].getAttribute('id');
    document.querySelectorAll('.nav-item').forEach(li => {
      li.classList.remove('active');
      const link = li.querySelector('a');
      if (link && link.getAttribute('href') === `#${currentId}`) {
        li.classList.add('active');
      }
    });
  }

  function togglePresentationMode() {
    isPresentationMode = !isPresentationMode;
    document.body.classList.toggle('presentation-mode', isPresentationMode);

    if (isPresentationMode) {
      modeToggleBtn.textContent = 'Mode Web';
      if (presControls) presControls.style.display = 'flex';
      updateSlideView();
    } else {
      modeToggleBtn.textContent = 'Mode Slide';
      if (presControls) presControls.style.display = 'none';
      slideSections.forEach(sec => sec.classList.remove('active-slide'));
      document.body.style.overflow = '';
      // Scroll to current slide in page
      slideSections[currentSlideIndex].scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (modeToggleBtn) {
    modeToggleBtn.addEventListener('click', togglePresentationMode);
  }

  if (presNextBtn) {
    presNextBtn.addEventListener('click', () => {
      if (currentSlideIndex < slideSections.length - 1) {
        currentSlideIndex++;
        updateSlideView();
      }
    });
  }

  if (presPrevBtn) {
    presPrevBtn.addEventListener('click', () => {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateSlideView();
      }
    });
  }

  // Keyboard navigation for presentation mode and lightbox
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      if (isPresentationMode) {
        togglePresentationMode();
      }
    } else if (isPresentationMode) {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        if (currentSlideIndex < slideSections.length - 1) {
          currentSlideIndex++;
          updateSlideView();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentSlideIndex > 0) {
          currentSlideIndex--;
          updateSlideView();
        }
      }
    }
  });

  // 6. Intersection Observer for Smooth Reveal Animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.slide-canvas').forEach(el => {
    revealObserver.observe(el);
  });
});

