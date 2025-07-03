// ui.js - UI interaction logic for Burme AI

document.addEventListener("DOMContentLoaded", () => {
  setupUploadTriggers();
});

// ✅ Upload image
function triggerUpload() {
  document.getElementById("imageUpload").click();
}

function uploadImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    addMessage("📷 Image uploaded:", "user");
    const img = document.createElement("img");
    img.src = e.target.result;
    img.style.maxWidth = "100%";
    img.style.borderRadius = "10px";
    const container = document.getElementById("chatContainer");
    container.appendChild(img);
    container.scrollTop = container.scrollHeight;
  };
  reader.readAsDataURL(file);
}

// ✅ Upload folder (optional display only)
function triggerFolderUpload() {
  document.getElementById("folderUpload").click();
}
function uploadFolder(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;
  addMessage(`📁 Folder uploaded with ${files.length} files.`, "user");
}

// ✅ Upload link
function triggerLinkUpload() {
  const link = prompt("🔗 Enter link to upload or analyze:");
  if (link) {
    addMessage(`🔗 Link uploaded: ${link}`, "user");
  }
}

// ✅ Chat UI render helper (if needed externally)
function addMessage(text, sender) {
  const container = document.getElementById("chatContainer");
  const div = document.createElement("div");
  div.className = "chat-message " + sender;
  div.innerText = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}
