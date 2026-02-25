(function () {
  // ── Mobile menu toggle ──────────────────────────────────
  var toggle   = document.querySelector('.site-header .menu-toggle');
  var menu     = document.getElementById('main-menu');
  var overlay  = document.querySelector('.menu-overlay');
  var body     = document.body;

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('is-open');
    if (overlay) overlay.classList.add('is-active');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-active');
    body.style.overflow = '';
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // ── Sticky header ──────────────────────────────────────
  var stickyWrapper = document.querySelector('.header-sticky-wrapper');
  var headerTop     = document.querySelector('.header-top');

  if (stickyWrapper && headerTop) {
    var spacer = document.createElement('div');
    spacer.className = 'sticky-spacer';
    stickyWrapper.parentNode.insertBefore(spacer, stickyWrapper.nextSibling);

    var ticking = false;

    function updateSticky() {
      var topBottom = headerTop.getBoundingClientRect().bottom;
      if (topBottom <= 0) {
        if (!stickyWrapper.classList.contains('is-stuck')) {
          spacer.style.height = stickyWrapper.offsetHeight + 'px';
          spacer.style.display = 'block';
          stickyWrapper.classList.add('is-stuck');
        }
      } else {
        if (stickyWrapper.classList.contains('is-stuck')) {
          spacer.style.display = 'none';
          stickyWrapper.classList.remove('is-stuck');
        }
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateSticky);
        ticking = true;
      }
    }, { passive: true });

    updateSticky();
  }

  // ── Commodity ticker: clone for seamless loop ──────────
  var tickerContent = document.querySelector('.ticker-content');
  if (tickerContent) {
    var clone = tickerContent.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    tickerContent.parentNode.appendChild(clone);
  }
})();
