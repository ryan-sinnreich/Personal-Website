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
});