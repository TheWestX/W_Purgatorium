// Практическое занятие 5: гамбургер-меню + кнопка "Наверх"
(() => {
  const menuToggle = document.getElementById('menuToggle') || document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('mainNav') || document.querySelector('nav.nav');
  const scrollTopButton = document.getElementById('scrollTop');

  if (!menuToggle || !mainNav) return;

  // Overlay
  let navOverlay = document.querySelector('.nav-overlay');
  if (!navOverlay) {
    navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(navOverlay);
  }

  const setBodyScrollLock = (locked) => {
    document.body.classList.toggle('no-scroll', locked);
  };

  const openMenu = () => {
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('active');
    navOverlay.classList.add('active');
    setBodyScrollLock(true);
  };

  const closeMenu = () => {
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('active');
    navOverlay.classList.remove('active');
    setBodyScrollLock(false);
  };

  const toggleMenu = () => {
    if (mainNav.classList.contains('active')) closeMenu();
    else openMenu();
  };

  menuToggle.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', closeMenu);

  // Закрыть по клику на пункт меню (только на мобилке)
  mainNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeMenu();
    });
  });

  // Закрыть по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // При возврате на десктоп — закрываем меню
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });

  // Кнопка "Наверх"
  if (scrollTopButton) {
    window.addEventListener('scroll', () => {
      scrollTopButton.classList.toggle('visible', window.scrollY > 300);
    });

    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();