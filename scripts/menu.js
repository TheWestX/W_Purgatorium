// Практическое занятие 5: гамбургер-меню + кнопка "Наверх"

(function () {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  // Оверлей (если нет — создадим)
  let navOverlay = document.getElementById('navOverlay');
  if (!navOverlay) {
    navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    navOverlay.id = 'navOverlay';
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(navOverlay);
  }

  const scrollTopButton = document.getElementById('scrollTop');

  function setBodyScrollLock(locked) {
    document.body.style.overflow = locked ? 'hidden' : '';
  }

  function toggleMenu(forceClose = false) {
    if (!menuToggle || !mainNav) return;

    const isOpen = mainNav.classList.contains('active');
    const nextState = forceClose ? false : !isOpen;

    menuToggle.classList.toggle('active', nextState);
    menuToggle.setAttribute('aria-expanded', String(nextState));

    mainNav.classList.toggle('active', nextState);
    navOverlay.classList.toggle('active', nextState);

    setBodyScrollLock(nextState);
  }

  // Открытие/закрытие по кнопке
  if (menuToggle) {
    menuToggle.addEventListener('click', () => toggleMenu());
  }

  // Закрытие по клику на оверлей
  navOverlay.addEventListener('click', () => toggleMenu(true));

  // Закрытие при клике на ссылку (на мобильных)
  document.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) toggleMenu(true);
    });
  });

  // Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(true);
  });

  // Если развернули экран до десктопа — закрываем меню и разблокируем скролл
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) toggleMenu(true);
  });

  // Кнопка "Наверх"
  if (scrollTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopButton.classList.add('visible');
      } else {
        scrollTopButton.classList.remove('visible');
      }
    });

    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();