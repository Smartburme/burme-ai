// အခြေခံလော့ဂင်လုပ်ဆောင်ချက်
function login() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    
    // အခြေခံ validation
    if(email && password) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
        initializeApp();
    } else {
        alert('ကျေးဇူးပြု၍ အီးမေးလ်နှင့် စကားဝှက်ထည့်ပါ');
    }
}

// အက်ပ်စတင်း
function initializeApp() {
    // Stream Viewer UI တည်ဆောက်မည်
    const mainApp = document.getElementById('mainApp');
    
    mainApp.innerHTML = `
        <div class="stream-container">
            <div class="video-player" id="videoPlayer">
                <!-- Stream video ဒီနေရာမှာထည့်မည် -->
                <h2 style="color:white; text-align:center;">Stream ကိုကြည့်ရှုနေပါသည်</h2>
            </div>
            
            <div class="chat-panel" id="chatPanel">
                <div class="chat-messages" id="chatMessages"></div>
                <div class="chat-input">
                    <input type="text" id="messageInput" placeholder="မက်ဆေ့ဂျ်ရေးရန်...">
                    <button onclick="sendMessage()">ပို့ရန်</button>
                </div>
            </div>
        </div>
    `;
    
    // Chat functionality
    setupChat();
}

// Chat system
function setupChat() {
    // Socket.io သို့မဟုတ် Firebase ဖြင့် real-time chat တည်ဆောက်နိုင်သည်
    // အခုအချိန်တွင် အခြေခံ demo အတွက်သာ
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            sendMessage();
        }
    });
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value;
    
    if(message.trim() !== '') {
        const chatMessages = document.getElementById('chatMessages');
        const newMessage = document.createElement('div');
        newMessage.textContent = message;
        chatMessages.appendChild(newMessage);
        input.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
