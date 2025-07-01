// js/ui.js

document.addEventListener('DOMContentLoaded', () => {
  // Float3D animation class toggle (already handled by CSS animation on class)
  // နောက်ထပ် animation logic ထည့်ချင်ရင် ဒီမှာရေးပါ။

  // Example: Sidebar toggle (if sidebar added)
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }

  // Tab button highlight handled in chat.js already

  // Responsive behavior or theme switching (optional)
  // Add more UI interactions here as needed
});
