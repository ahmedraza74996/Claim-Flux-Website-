// =========================================
// CLAIMFLUX — MAIN SCRIPT
// =========================================

// ---------- CONSULTATION MODAL — GLOBAL OPEN/CLOSE ----------
function openConsultModal() {
  const modal = document.getElementById('consultModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}
function closeConsultModal() {
  const modal = document.getElementById('consultModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ---------- FAQ ACCORDION TOGGLE (smooth height-based) ----------
function toggleFaq(el) {
  const item = el.parentElement;
  const answer = item.querySelector('.faq-answer');
  const wasOpen = item.classList.contains('open');

  item.parentElement.querySelectorAll('.faq-item').forEach(function (faq) {
    faq.classList.remove('open');
    faq.querySelector('.faq-answer').style.maxHeight = null;
  });

  if (!wasOpen) {
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

document.addEventListener('DOMContentLoaded', function () {

  // ---------- MOBILE MENU TOGGLE ----------
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
      });
    });
  }

  // ---------- QUICK QUESTIONS CHAT WIDGET ----------
  const quickChatToggle = document.getElementById('quickChatToggle');
  const quickChatWidget = document.querySelector('.quick-chat-widget');
  const quickChatQuestions = document.getElementById('quickChatQuestions');
  const quickChatAnswer = document.getElementById('quickChatAnswer');
  const quickChatAnswerText = document.getElementById('quickChatAnswerText');
  const quickChatBack = document.getElementById('quickChatBack');

  if (quickChatToggle) {
    quickChatToggle.addEventListener('click', function () {
      quickChatWidget.classList.toggle('open');
    });

    document.querySelectorAll('.quick-chat-q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        quickChatAnswerText.textContent = btn.dataset.answer;
        quickChatQuestions.style.display = 'none';
        quickChatAnswer.style.display = 'block';
      });
    });

    if (quickChatBack) {
      quickChatBack.addEventListener('click', function () {
        quickChatAnswer.style.display = 'none';
        quickChatQuestions.style.display = 'flex';
      });
    }
  }

  // ---------- CONSULTATION POPUP MODAL ----------
  const consultModal = document.getElementById('consultModal');
  const modalClose = document.getElementById('modalClose');

  if (consultModal) {
    // Auto-open popup ONLY on the home page
    if (document.body.classList.contains('home-page')) {
      setTimeout(function () {
        openConsultModal();
      }, 1200);
    }

    if (modalClose) {
      modalClose.addEventListener('click', function () {
        closeConsultModal();
      });
    }

    consultModal.addEventListener('click', function (e) {
      if (e.target === consultModal) {
        closeConsultModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && consultModal.classList.contains('active')) {
        closeConsultModal();
      }
    });
  }

  // ---------- CONSULTATION FORM SUBMIT (sends email via Web3Forms) ----------
  const consultForm = document.getElementById('consultForm');
  if (consultForm) {
    consultForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = consultForm.querySelector('input[name="name"]').value;
      const email = consultForm.querySelector('input[name="email"]').value;

      const submitBtn = consultForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(consultForm);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      })
      .then(function (response) { return response.json(); })
      .then(function () {
  document.getElementById('consultFormWrap').style.display = 'none';
  document.getElementById('consultSuccess').style.display = 'block';
  consultForm.reset();
  setTimeout(function () {
    closeConsultModal();
    document.getElementById('consultFormWrap').style.display = 'block';
    document.getElementById('consultSuccess').style.display = 'none';
  }, 3500);
})
      .catch(function () {
        alert('Something went wrong. Please try again or contact us directly on WhatsApp.');
      })
      .finally(function () {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }

  // ---------- MAIN CONTACT PAGE FORM (sends email via Web3Forms) ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      })
      .then(function (response) { return response.json(); })
      .then(function () {
  document.getElementById('contactFormWrap').style.display = 'none';
  document.getElementById('contactSuccess').style.display = 'block';
  contactForm.reset();
})
      .catch(function () {
        alert('Something went wrong. Please try again or contact us directly on WhatsApp.');
      })
      .finally(function () {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }

  // ---------- SCROLL REVEAL ANIMATIONS ----------
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

  // ---------- ANIMATED COUNTERS (home page trust strip) ----------
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 80));
          const timer = setInterval(function () {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current + suffix;
          }, 50);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

});

// ---------- AUTO-UPDATE FOOTER YEAR ----------
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ---------- BEFORE/AFTER BARS ANIMATION ----------
document.addEventListener('DOMContentLoaded', function () {
  const compareBars = document.querySelectorAll('.compare-bar');
  if (compareBars.length) {
    const barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percent = bar.dataset.percent;
          setTimeout(function () {
            bar.style.width = percent + '%';
          }, 150);
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    compareBars.forEach(function (bar) { barObserver.observe(bar); });
  }
});

// ---------- SAVINGS CALCULATOR ----------
function calculateSavings() {
  const revenueInput = document.getElementById('calcRevenue');
  const denialInput = document.getElementById('calcDenialRate');
  const resultBox = document.getElementById('calcResult');

  const revenue = parseFloat(revenueInput.value);
  const denialRate = parseFloat(denialInput.value) || 20;

  if (!revenue || revenue <= 0) {
    resultBox.innerHTML = '<div class="calc-placeholder"><div class="calc-placeholder-icon">⚠️</div><p>Please enter a valid monthly collections amount.</p></div>';
    return;
  }

  // Assumptions: ClaimFlux typically reduces denial rate to ~4% and improves first-pass collection.
  const improvedDenialRate = 4;
  const currentLoss = revenue * (denialRate / 100);
  const improvedLoss = revenue * (improvedDenialRate / 100);
  const monthlyRecovery = Math.max(0, currentLoss - improvedLoss);
  const annualRecovery = monthlyRecovery * 12;

  resultBox.innerHTML = `
    <div class="calc-output">
      <div class="calc-output-label">Estimated Monthly Recovery</div>
      <div class="calc-output-value">$${monthlyRecovery.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
      <div class="calc-output-sub">Based on reducing your denial rate from ${denialRate}% to ~4%</div>
      <hr>
      <div class="calc-output-row"><span>Estimated Annual Recovery</span><strong>$${annualRecovery.toLocaleString(undefined, {maximumFractionDigits:0})}</strong></div>
      <div class="calc-output-row"><span>Your Current Denial Rate</span><strong>${denialRate}%</strong></div>
      <div class="calc-output-row"><span>Target Denial Rate</span><strong>~4%</strong></div>
    </div>
  `;
}
