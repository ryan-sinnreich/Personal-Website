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

  const photoGrid = document.getElementById('photoGrid');
  const modal = document.getElementById('photoModal');
  const modalImg = document.getElementById('modalImage');
  const closeModal = document.getElementById('closeModal');
  const photos = [
    { type: 'horizontal', src: 'assets/Photography/Squirrel.webp' },
    { type: 'horizontal', src: 'assets/Photography/Hawaii2022.webp' },
    { type: 'vertical', src: 'assets/Photography/Point-Reyes.webp' },
    { type: 'horizontal', src: 'assets/Photography/Butterfly.webp' },
    { type: 'horizontal', src: 'assets/Photography/Bluejay-2.webp' },
    { type: 'vertical', src: 'assets/Photography/Snow.webp' },
    { type: 'horizontal', src: 'assets/Photography/Heron.webp' },
    { type: 'horizontal', src: 'assets/Photography/Lizard.webp' },
    { type: 'horizontal', src: 'assets/Photography/Pelican.webp' },
    { type: 'horizontal', src: 'assets/Photography/Seagull.webp' },
    { type: 'horizontal', src: 'assets/Photography/Sunset.webp' },
    { type: 'vertical', src: 'assets/Photography/Lizard-3.webp' },
    { type: 'vertical', src: 'assets/Photography/Emerald-Bay.webp' },
    { type: 'horizontal', src: 'assets/Photography/Bluejay-1.webp' },
    { type: 'vertical', src: 'assets/Photography/Pigeon.webp' },
    { type: 'horizontal', src: 'assets/Photography/Stars.webp' },
    { type: 'horizontal', src: 'assets/Photography/Bluejay.webp' },
    { type: 'horizontal', src: 'assets/Photography/Crow.webp' },
    { type: 'horizontal', src: 'assets/Photography/Sunset-2.webp' },
    { type: 'horizontal', src: 'assets/Photography/Beach-tree.webp' },
    { type: 'horizontal', src: 'assets/Photography/Lizard-2.webp' },
    { type: 'horizontal', src: 'assets/Photography/Frogs.webp' },
    { type: 'horizontal', src: 'assets/Photography/Beach.webp' },
    { type: 'horizontal', src: 'assets/Photography/Dove-2.webp' },
    { type: 'vertical', src: 'assets/Photography/Leaves.webp' },
    { type: 'horizontal', src: 'assets/Photography/Rabbit.webp' },
    { type: 'horizontal', src: 'assets/Photography/Hawaii2022-bird.webp' },
    { type: 'vertical', src: 'assets/Photography/Hawaii2022-2.webp' },
    { type: 'vertical', src: 'assets/Photography/Beach-2.webp' },
    { type: 'horizontal', src: 'assets/Photography/Humming-bird.webp' },
    { type: 'horizontal', src: 'assets/Photography/Dove.webp' },
    { type: 'horizontal', src: 'assets/Photography/Bird.webp' },
    { type: 'horizontal', src: 'assets/Photography/Bird-2.webp' },
    { type: 'vertical', src: 'assets/Photography/Eagal.webp' },
    { type: 'horizontal', src: 'assets/Photography/Birds-3.webp' },
    { type: 'horizontal', src: 'assets/Photography/Bird-4.webp' },
  ];

  // Add photos to the grid
  photos.forEach(photo => {
    const photoItem = document.createElement('div');
    photoItem.classList.add('photo-item');
    if (photo.type === 'vertical') {
      photoItem.classList.add('vertical');
    }

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = 'Photo taken by Ryan Sinnreich';
    img.loading = 'lazy';

    // Event listener for opening modal
    photoItem.addEventListener('click', () => {
      modal.classList.add('active');
      modalImg.src = img.src;
      document.body.classList.add('modal-open');
    });

    photoItem.appendChild(img);
    photoGrid.appendChild(photoItem);
  });

  // Function to close modal
  const closeModalFunction = () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  };

  // Event listeners for closing modal
  // Click X button
  closeModal.addEventListener('click', closeModalFunction);

  // Click background (not image)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModalFunction();
    }
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && modal.classList.contains('active')) {
      closeModalFunction();
    }
  });
});