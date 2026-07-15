// =========================================
// CLAIMFLUX — MAIN SCRIPT
// =========================================

document.addEventListener('DOMContentLoaded', function () {

  // ---------- MOBILE MENU TOGGLE ----------
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
    });

    // Close menu when a link is clicked (mobile UX)
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
      });
    });
  }

  // ---------- CONSULTATION POPUP MODAL ----------
  const consultModal = document.getElementById('consultModal');
  const modalClose = document.getElementById('modalClose');

  if (consultModal) {
    // Auto-open popup shortly after page load
    setTimeout(function () {
      consultModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // prevent background scroll
    }, 1200);

    // Close on X button
    if (modalClose) {
      modalClose.addEventListener('click', function () {
        closeModal();
      });
    }

    // Close when clicking outside the modal box
    consultModal.addEventListener('click', function (e) {
      if (e.target === consultModal) {
        closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && consultModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function closeModal() {
    consultModal.classList.remove('active');
    document.body.style.overflow = '';
  }


  ////////sssss 
  // ---------- SERVICE OPTION BOXES ----------
  document.querySelectorAll('.service-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const group = btn.closest('.service-select-grid');
      group.querySelectorAll('.service-option').forEach(function (b) {
        b.classList.remove('selected');
      });
      btn.classList.add('selected');
      const hiddenInput = group.parentElement.querySelector('input[name="service"]');
      if (hiddenInput) hiddenInput.value = btn.dataset.value;
    });
  });

  // ---------- CONSULTATION FORM SUBMIT ----------
  const consultForm = document.getElementById('consultForm');
  if (consultForm) {
    consultForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = consultForm.querySelector('input[name="name"]').value;
      const phone = consultForm.querySelector('input[name="phone"]').value;
      const service = consultForm.querySelector('input[name="service"]').value;

      // For now, just show a confirmation.
      // Later this can be connected to WhatsApp, email, or a backend.
      alert('Thank you, ' + name + '! We received your request for "' + service + '". Our team will call you shortly at ' + phone + '.');

      consultForm.reset();
      closeModal();
    });
  }

  // ---------- MAIN CONTACT PAGE FORM (if present) ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for reaching out! We will get back to you within 24 hours.');
      contactForm.reset();
    });
  }

});
// ---------- FAQ ACCORDION TOGGLE (smooth height-based) ----------
function toggleFaq(el) {
  const item = el.parentElement;
  const answer = item.querySelector('.faq-answer');
  const wasOpen = item.classList.contains('open');

  // Close all FAQ items + collapse their heights
  item.parentElement.querySelectorAll('.faq-item').forEach(function (faq) {
    faq.classList.remove('open');
    faq.querySelector('.faq-answer').style.maxHeight = null;
  });

  // Reopen this one if it wasn't already open, using its real content height
  if (!wasOpen) {
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// Ensure the FAQ marked "open" by default is expanded correctly on page load
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.faq-item.open .faq-answer').forEach(function (answer) {
    answer.style.maxHeight = answer.scrollHeight + 'px';
  });
});

// ---------- SCROLL REVEAL ANIMATIONS (auto-applies everywhere) ----------
const revealTargets = document.querySelectorAll('.card, .section-head, .two-col > div, .faq-item');
revealTargets.forEach(function (el, i) {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 6) * 0.08 + 's';
});
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(function (el) { revealObserver.observe(el); });