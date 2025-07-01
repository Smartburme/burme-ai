// js/markdown.js

document.addEventListener('DOMContentLoaded', () => {
  fetch('README.md')
    .then(res => res.text())
    .then(md => {
      const html = marked.parse(md); // requires marked.js
      document.getElementById('markdown-content').innerHTML = html;
    })
    .catch(() => {
      document.getElementById('markdown-content').innerHTML = '<p>❌ Failed to load README.md</p>';
    });
});
