// js/auth.js

// Firebase Initialization
const firebaseConfig = {
    apiKey: "AIzaSyAr7Hv2ApKtNTxF11MhT5cuWeg_Dgsh0TY",
    authDomain: "smart-burme-app.firebaseapp.com",
    projectId: "smart-burme-app",
    storageBucket: "smart-burme-app.appspot.com",
    messagingSenderId: "851502425686",
    appId: "1:851502425686:web:f29e0e1dfa84794b4abdf7"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// 🔐 Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => window.location.href = 'mainchat.html')
      .catch(err => alert("Login failed: " + err.message));
  });
}

// 📝 Register
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    auth.createUserWithEmailAndPassword(email, password)
      .then(() => window.location.href = 'mainchat.html')
      .catch(err => alert("Register failed: " + err.message));
  });
}

// 🔑 Reset
const resetForm = document.getElementById('reset-form');
if (resetForm) {
  resetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('reset-email').value;

    auth.sendPasswordResetEmail(email)
      .then(() => alert("Password reset email sent!"))
      .catch(err => alert("Reset failed: " + err.message));
  });
}
