// This script is run right after the body tag of each .html file to make sure the correct theme is applied
(function() {
      const theme = localStorage.getItem('theme');

      if (theme === 'dark') {
        document.body.classList.add('dark-mode');
      }
    })();