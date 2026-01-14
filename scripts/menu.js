(() => {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const scrollTopButton = document.getElementById('scrollTop');

  if (!menuToggle || !mainNav) return;

  // Overlay
  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
  }

  const lockScroll = (locked) => {
    document.body.classList.toggle('no-scroll', locked);
  };

  const openMenu = () => {
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('active');
    overlay.classList.add('active');
    lockScroll(true);
  };

  const closeMenu = () => {
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('active');
    overlay.classList.remove('active');
    lockScroll(false);
  };

  const toggleMenu = () => {
    if (mainNav.classList.contains('active')) closeMenu();
    else openMenu();
  };

  menuToggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Якоря: на мобилке делаем скролл сами (чтобы всегда работало)
  mainNav.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (window.innerWidth > 768) return; // десктоп: стандартное поведение

      e.preventDefault();

      const hash = a.getAttribute('href');
      const target = hash ? document.querySelector(hash) : null;

      closeMenu();

      requestAnimationFrame(() => {
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', hash);
        } else if (hash) {
          location.hash = hash;
        }
      });
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });

  // "Наверх"
  if (scrollTopButton) {
    window.addEventListener('scroll', () => {
      scrollTopButton.classList.toggle('visible', window.scrollY > 300);
    });

    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();