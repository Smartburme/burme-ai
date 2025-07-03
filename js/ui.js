// ui.js - Handles UI effects, mode selection, float3D

document.addEventListener("DOMContentLoaded", () => {
  applyFloat3D();
  setupModeSelector();
});

// ✅ Float3D background animation
function applyFloat3D() {
  const body = document.body;
  body.style.perspective = "1000px";
  body.style.transformStyle = "preserve-3d";
  body.addEventListener("mousemove", (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const offsetX = (e.clientX - centerX) / centerX;
    const offsetY = (e.clientY - centerY) / centerY;

    body.style.transform = `rotateY(${offsetX * 5}deg) rotateX(${-offsetY * 5}deg)`;
  });
}

// ✅ Add mode selector dropdown (text/image/code/video)
function setupModeSelector() {
  const inputBar = document.querySelector(".input-bar");
  if (!inputBar) return;

  const selector = document.createElement("select");
  selector.id = "modeSelect";
  selector.style.background = "#111";
  selector.style.color = "#00ffff";
  selector.style.border = "1px solid #00ffff";
  selector.style.borderRadius = "6px";
  selector.style.padding = "6px";
  selector.style.marginTop = "6px";
  selector.style.fontSize = "14px";

  const modes = ["text", "image", "code", "video"];
  modes.forEach((m) => {
    const option = document.createElement("option");
    option.value = m;
    option.innerText = m.toUpperCase();
    selector.appendChild(option);
  });

  inputBar.appendChild(selector);
}

// ✅ Get selected mode
function getSelectedMode() {
  const selector = document.getElementById("modeSelect");
  return selector ? selector.value : "text";
}
