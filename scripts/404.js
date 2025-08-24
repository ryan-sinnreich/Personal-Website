const maskCircle = document.getElementById('mask-circle');
window.addEventListener('mousemove', (e) => {
  const clientX = e.clientX;
  const clientY = e.clientY;

  requestAnimationFrame(() => {
    maskCircle.setAttribute('cx', clientX);
    maskCircle.setAttribute('cy', clientY);
  });
});