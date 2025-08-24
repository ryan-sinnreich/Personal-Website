async function startTypingAnimation() {
  const typingRoleEl = document.getElementById('typing-role');
  if (!typingRoleEl) return;

  const roles = [
    "Software Engineer",
    "Web Developer",
    "Embedded Systems Engineer",
    "IOS Mobile App Developer",
    "Internship",
    "Game Developer",
    "Hardware Engineer"
  ];

  const typingSpeed = 120;
  const erasingSpeed = 60;
  const delayBetweenRoles = 1500;
  const delayAfterErasing = 500;

  // Helper function to create delay
  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  let roleIndex = 0;
  // Infinite loop to cycle through roles
  while (true) {
    const currentRole = roles[roleIndex];

    // Type out the role
    for (let i = 0; i < currentRole.length; i++) {
      typingRoleEl.textContent = currentRole.substring(0, i + 1);
      await delay(typingSpeed);
    }

    // Delay
    await delay(delayBetweenRoles);

    // Erase the role
    for (let i = currentRole.length; i > 0; i--) {
      typingRoleEl.textContent = currentRole.substring(0, i - 1);
      await delay(erasingSpeed);
    }

    // Delay
    await delay(delayAfterErasing);

    // Move to the next role
    roleIndex = (roleIndex + 1) % roles.length;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Start header and footer insert
  // Load Header
  fetch('_header.html')
    .then(response => {
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
      initializeHeaderScrollEffect();
    })
    .catch(error => {
      console.error('Error loading header:', error);
      // Display error message to the user
      document.getElementById('header-placeholder').innerHTML = "<p>Could not load header.</p>";
    });

  // Load the Footer
  fetch('_footer.html')
    .then(response => {
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading footer:', error);
      // Display error message to the user
      document.getElementById('footer-placeholder').innerHTML = "<p>Could not load footer.</p>";
    });
  // End header and footer insert


  startTypingAnimation();
  const trailSection = document.getElementById('photography-container');

  const images = [
    'assets/Home/HomepageImageTrail/Anole.webp',
    'assets/Home/HomepageImageTrail/Beach.webp',
    'assets/Home/HomepageImageTrail/Bluejay.webp',
    'assets/Home/HomepageImageTrail/Crow.webp',
    'assets/Home/HomepageImageTrail/Heron.webp',
    'assets/Home/HomepageImageTrail/HummingBird.webp',
    'assets/Home/HomepageImageTrail/Lizard.webp',
    'assets/Home/HomepageImageTrail/Rabbit.webp',
    'assets/Home/HomepageImageTrail/Seagull.webp',
    'assets/Home/HomepageImageTrail/Sunset.webp'
  ];
  let currentImageIndex = 0;
  let mobileInterval = null;

  // Desktop Logic
  let activeImages = [];
  let isThrottled = false;
  const throttleDuration = 75;

  const handleMouseMove = (event) => {
    if (isThrottled) return;
    isThrottled = true;
    setTimeout(() => { isThrottled = false; }, throttleDuration);

    const rect = trailSection.getBoundingClientRect();
    for (const activeImg of activeImages) {
      const imgRect = activeImg.getBoundingClientRect();
      if (event.clientX > imgRect.left && event.clientX < imgRect.right &&
        event.clientY > imgRect.top && event.clientY < imgRect.bottom) {
        return;
      }
    }
    const img = document.createElement('img');
    img.src = images[currentImageIndex];
    img.classList.add('trail-img');
    trailSection.appendChild(img);
    activeImages.push(img);
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.classList.add('fade-in');
    setTimeout(() => {
      img.classList.remove('fade-in');
      img.classList.add('fade-out');
      img.addEventListener('animationend', () => {
        img.remove();
        activeImages = activeImages.filter(i => i !== img);
      }, { once: true });
    }, 800);
  };
  const handleMouseDown = () => trailSection.classList.add('clicking');
  const handleMouseUp = () => trailSection.classList.remove('clicking');

  // Mobile Logic
  const createAutomaticImage = () => {
    const img = document.createElement('img');
    img.src = images[currentImageIndex];
    img.classList.add('trail-img', 'mobile-float');
    trailSection.appendChild(img);
    currentImageIndex = (currentImageIndex + 1) % images.length;

    const containerWidth = trailSection.offsetWidth;
    const imageWidth = 130;
    const maxLeft = containerWidth - imageWidth;
    const randomX = Math.random() * maxLeft;

    const duration = Math.random() * 8 + 7;
    img.style.left = `${randomX}px`;
    img.style.top = '110%';
    img.style.animationDuration = `${duration}s`;
    img.addEventListener('animationend', () => img.remove(), { once: true });
  };

  // Setup and Teardown helper functions
  const setupDesktop = () => {
    trailSection.addEventListener('mousemove', handleMouseMove);
    trailSection.addEventListener('mousedown', handleMouseDown);
    trailSection.addEventListener('mouseup', handleMouseUp);
    trailSection.addEventListener('mouseleave', handleMouseUp);
  };

  const teardownDesktop = () => {
    trailSection.removeEventListener('mousemove', handleMouseMove);
    trailSection.removeEventListener('mousedown', handleMouseDown);
    trailSection.removeEventListener('mouseup', handleMouseUp);
    trailSection.removeEventListener('mouseleave', handleMouseUp);
  };

  const setupMobile = () => {
    trailSection.querySelectorAll('.trail-img').forEach(el => el.remove());
    mobileInterval = setInterval(createAutomaticImage, 1500);
  };

  const teardownMobile = () => {
    clearInterval(mobileInterval);
    trailSection.querySelectorAll('.trail-img').forEach(el => el.remove());
  };

  // Main Logic
  const mediaQuery = window.matchMedia("(max-width: 768px)");

  const handleModeChange = (e) => {
    if (e.matches) {
      // Is Mobile
      teardownDesktop();
      setupMobile();
    } else {
      // Is Desktop
      teardownMobile();
      setupDesktop();
    }
  };

  mediaQuery.addEventListener('change', handleModeChange);
  handleModeChange(mediaQuery);
});