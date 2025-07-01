# webapp Structure 

```
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
```
# Burme-ai

Burme-ai သည် မြန်မာဘာသာစကားအတွက် AI assistant web app ဖြစ်ပြီး  
Chat (စာသား၊ ပုံ၊ ကုဒ်) ဖန်တီးနိုင်ပါသည်။

## Features

- User Authentication (Login/Register/Reset Password)
- Text, Image, Code AI generation (Gemini API သုံးပြီး)
- Responsive Mobile-first Design
- GitHub Pages hosting support
- README.md မှ အချက်အလက်များကို About Page တွင်ပြရန်

## Usage

- Register / Login ဝင်ပြီး mainchat.html တွင် Chat ကို အသုံးပြုပါ။
- About page မှာ Project အကြောင်းအရာများကို ကြည့်ရှုနိုင်သည်။

## admin
- Name     Mg Aung Myo Kyaw
- Country  Naypyitaw Myanmar 
- Mail     wayne.mm.92@gmail.com
- Ph       09677740154

## purpose 
- for ai generate and Study and learn. 
