// js/ui.js

// Example: Simple 3D floating effect on icon
function float3D(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  let angle = 0;
  setInterval(() => {
    angle += 0.05;
    el.style.transform = `rotateX(${Math.sin(angle)*5}deg) rotateY(${Math.cos(angle)*5}deg)`;
  }, 50);
}

// Theme toggle (Dark/Light) example
function toggleTheme() {
  const body = document.body;
  if (body.style.background === 'skyblue') {
    body.style.background = '#121212';   // Dark
  } else {
    body.style.background = 'skyblue';   // Light
  }
}

// Initialize UI features
function initUI() {
  // e.g., float the icon if any
  // float3D('siteIcon');   // example if you have id="siteIcon"

  // Add theme toggle button logic if needed
  // document.getElementById('themeToggleBtn').onclick = toggleTheme;
}

window.onload = initUI;
window.toggleTheme = toggleTheme;
window.float3D = float3D;
