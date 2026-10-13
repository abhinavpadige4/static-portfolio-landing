document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const nav = document.querySelector('.nav');
  const toggleBtn = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open');
    });
  }

  // Smooth scroll fallback for browsers without CSS support
  const supportsScrollBehavior = 'scrollBehavior' in document.documentElement.style;
  if (!supportsScrollBehavior) {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.pageYOffset - 56; // offset for nav
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  // Contact form mailto handler
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.elements['name'].value.trim();
      const email = form.elements['email'].value.trim();
      const message = form.elements['message'].value.trim();
      if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields.';
        return;
      }
      const subject = encodeURIComponent('Portfolio Contact from ' + name);
      const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
      const mailto = `mailto:teju@example.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;
      status.textContent = 'Opening your email client...';
      setTimeout(() => { status.textContent = ''; }, 4000);
    });
  }
});
