function initializeHeaderScrollEffect() {
  const body = document.body;
  const header = document.getElementById('main-header');
  const nav = document.getElementById('main-nav');
  const headerMain = document.getElementById('main-header');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const scrollContainer = document.getElementById('scrollContainer');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDarkModeToggle = document.getElementById('mobileDarkModeToggle');
  const mobileMenu = document.getElementById('mobile-nav-menu');
  const mobileNavLinks = mobileMenu ? mobileMenu.querySelectorAll('nav a') : [];
  const scrollThreshold = 50; // Pixels to scroll before header changes

  // Scroll Effect Logic
  if (header && nav && scrollContainer) {
    const handleScroll = () => {
      // Check the container's scroll position
      if (scrollContainer.scrollTop > scrollThreshold) {
        // Scrolled State
        header.classList.remove('initial-state');
        header.classList.add('scrolled-state');
        nav.classList.add('scrolled-state');
      } else {
        // Initial State
        header.classList.remove('scrolled-state');
        header.classList.add('initial-state');
        nav.classList.remove('scrolled-state');
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
  } else {
    console.error("Elements are missing");
  }

  /**
   * Toggles the .dark-mode class on the body and header,
   * then saves the new state to localStorage
   */
  function toggleTheme() {
    body.classList.toggle('dark-mode');
    if (headerMain) {
      headerMain.classList.toggle('dark-mode');
    }

    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }

  // Mobile Menu Logic
  const toggleMenu = () => {
    body.classList.toggle('mobile-menu-open');
    if (hamburgerBtn) hamburgerBtn.classList.toggle('is-open');
  };

  const closeMenu = () => {
    body.classList.remove('mobile-menu-open');
    if (hamburgerBtn) hamburgerBtn.classList.remove('is-open');
  }

  // Desktop theme toggle event listener
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleTheme);
  }

  // Mobile theme toggle event listener
  if (mobileDarkModeToggle) {
    mobileDarkModeToggle.addEventListener('click', toggleTheme);
  }

  // Hamburger button for opening/closing mobile menu event listener
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMenu);
  }

  // Links inside the mobile menu (to close menu when clicked) event listeners
  if (mobileNavLinks) {
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Clicking the backround of the mobile menu to close it event listener
  if (mobileMenu) {
    mobileMenu.addEventListener('click', (event) => {
      if (event.target === mobileMenu) closeMenu();
    });
  }
}