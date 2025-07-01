// Float3D effect on body based on mouse move
(function() {
  const body = document.body;

  body.style.transition = 'transform 0.1s ease';

  window.addEventListener('mousemove', (e) => {
    // Get center of viewport
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    // Calculate offset from center, normalize and invert a bit for 3D tilt
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    const maxTilt = 10; // max degrees tilt

    const tiltX = dy * maxTilt;
    const tiltY = dx * maxTilt;

    body.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  window.addEventListener('mouseout', () => {
    // Reset transform when mouse leaves window
    body.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
})();

// Neon glow animation for title bar and buttons
(function() {
  const titleBar = document.querySelector('.title-bar');
  const buttons = document.querySelectorAll('.icon-button');

  function neonGlow(element) {
    if (!element) return;
    element.style.transition = 'box-shadow 0.6s ease-in-out, color 0.6s ease-in-out';
    let on = false;
    setInterval(() => {
      if (on) {
        element.style.boxShadow = '0 0 10px cyan, 0 0 20px cyan, 0 0 30px #00ffff';
        element.style.color = '#00ffff';
      } else {
        element.style.boxShadow = 'none';
        element.style.color = '#00cccc';
      }
      on = !on;
    }, 1000);
  }

  neonGlow(titleBar);
  buttons.forEach(btn => neonGlow(btn));
})();

// Responsive adjustments for textarea rows based on screen size
(function() {
  const textarea = document.getElementById('userInput');

  function adjustTextareaRows() {
    if (!textarea) return;
    if (window.innerWidth < 600) {
      textarea.rows = 3;
    } else {
      textarea.rows = 2;
    }
  }

  window.addEventListener('resize', adjustTextareaRows);
  window.addEventListener('load', adjustTextareaRows);
})();
