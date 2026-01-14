// Практическое занятие 5: гамбургер-меню + кнопка "Наверх"
(() => {
  // Более устойчивые селекторы (на случай если id/класс поменяется)
  const menuToggle = document.querySelector('#menuToggle, .menu-toggle');
  const mainNav = document.querySelector('#mainNav, nav.nav');

  if (!menuToggle || !mainNav) return;

  // Overlay
  let navOverlay = document.querySelector('.nav-overlay');
  if (!navOverlay) {
    navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(navOverlay);
  }

  const scrollTopButton = document.getElementById('scrollTop');

  function setBodyScrollLock(locked) {
    document.body.classList.toggle('no-scroll', locked);
  }

  function openMenu() {
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('active');
    navOverlay.classList.add('active');
    setBodyScrollLock(true);
  }

  function closeMenu() {
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('active');
    navOverlay.classList.remove('active');
    setBodyScrollLock(false);
  }

  function toggleMenu() {
    if (mainNav.classList.contains('active')) closeMenu();
    else openMenu();
  }

  menuToggle.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', closeMenu);

  // Закрываем по клику на пункт меню только на мобилке
  mainNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeMenu();
    });
  });

  // Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // На ресайзе в десктоп — закрываем
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