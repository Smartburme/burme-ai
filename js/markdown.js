// Simple Markdown renderer using marked.js (or basic markdown parser)
// This example uses fetch to get README.md and renders to #markdownContainer

async function loadMarkdown(url, containerId) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);

    const markdownText = await response.text();

    // If you want better markdown rendering, include marked.js library in about.html
    // For now, a very simple conversion:
    const html = simpleMarkdownToHTML(markdownText);

    document.getElementById(containerId).innerHTML = html;
  } catch (err) {
    console.error('Markdown load error:', err);
    document.getElementById(containerId).innerText = 'Failed to load content.';
  }
}

// Very simple markdown to HTML converter (headers, links, bold, italics, code)
function simpleMarkdownToHTML(md) {
  // Replace headings: # H1, ## H2 ...
  md = md.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
  md = md.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
  md = md.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  md = md.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  md = md.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  md = md.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold **text**
  md = md.replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>');

  // Italic *text*
  md = md.replace(/\*(.*?)\*/gim, '<i>$1</i>');

  // Inline code `code`
  md = md.replace(/`([^`]+)`/gim, '<code>$1</code>');

  // Links [text](url)
  md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Line breaks
  md = md.replace(/\n/g, '<br />');

  return md.trim();
}

// Expose function globally
window.loadMarkdown = loadMarkdown;
