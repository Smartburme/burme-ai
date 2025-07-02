// js/ui.js

// Sidebar toggle logic (if sidebar exists)
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  sidebar.classList.toggle('active');
}

// Floating animation for icons/buttons (optional)
function floatAnimation(element, amplitude = 10, speed = 2000) {
  let start = null;
  function step(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const deltaY = amplitude * Math.sin((elapsed / speed) * 2 * Math.PI);
    element.style.transform = `translateY(${deltaY}px)`;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Initialize floating icons/buttons (pass NodeList or single element)
function initFloating(elements) {
  if (!elements) return;
  if (elements instanceof NodeList) {
    elements.forEach(el => floatAnimation(el));
  } else {
    floatAnimation(elements);
  }
}

// Theme toggle between dark/light (optional)
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('light-theme');
  // You can add localStorage save/load here
}

// Search input "Enter" key trigger
function initSearchInput(searchInputId, searchButtonId) {
  const input = document.getElementById(searchInputId);
  const btn = document.getElementById(searchButtonId);
  if (!input || !btn) return;

  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      btn.click();
    }
  });
}

// Initialize UI on page load
window.addEventListener('DOMContentLoaded', () => {
  // Example: init floating on all elements with class 'float-icon'
  const floats = document.querySelectorAll('.float-icon');
  initFloating(floats);

  // Initialize search input Enter key (if used)
  initSearchInput('searchInput', 'searchButton');
});

export {
  toggleSidebar,
  toggleTheme,
  initFloating,
  initSearchInput
};
