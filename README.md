# webapp Structure 

burme-ai/
│
├── index.html              ← Login Page
├── register.html           ← Register Page
├── reset.html              ← Reset Password Page
├── mainchat.html           ← Main Chat UI (Text, Image, Code)
├── about.html              ← Loads README.md (About Page)
├── privacy.html            ← Privacy Policy & Terms
│
├── js/
│   ├── auth.js             ← Login/Register/Reset Logic
│   ├── chat.js             ← ChatBot Logic (Text/Image/Code)
│   ├── gemini.js           ← Gemini API handler (Google Drive Key based)
│   ├── ui.js               ← UI Components (Sidebar, 3D float)
│   └── markdown.js         ← Load README.md into about.html
│
├── css/
│   └── style.css           ← All Styles (float3D + responsive)
│
├── assets/
│   └── icon.jpg            ← Site Icon (https://burme-ai.io/image/icon.jpg)
│
├── README.md               ← Project Introduction for About Page
├── .gitignore              ← Ignore .env and other sensitive files
├── .env                    ← (Not pushed to GitHub) API Keys (local only)
