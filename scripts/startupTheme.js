// This script is run right after the body tag of each .html file to make sure the correct theme is applied
(function () {
  const lightThemeColor = '#90EE90';
  const darkThemeColor = '#16A34A';

  const theme = localStorage.getItem('theme');
  const themeColorMeta = document.getElementById('theme-color-meta');

  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    themeColorMeta.setAttribute('content', darkThemeColor);
  } else {
    themeColorMeta.setAttribute('content', lightThemeColor);
  }
})();