// js/auth.js

// 🔐 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr7Hv2ApKtNTxF11MhT5cuWeg_Dgsh0TY",
  authDomain: "smart-burme-app.firebaseapp.com",
  projectId: "smart-burme-app",
  storageBucket: "smart-burme-app.appspot.com",
  messagingSenderId: "851502425686",
  appId: "1:851502425686:web:f29e0e1dfa84794b4abdf7"
};

// 🚀 Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


// 🔓 Login Function
function loginUser(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = 'mainchat.html';
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
}

// 📝 Register Function
function registerUser(name, email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return userCredential.user.updateProfile({
        displayName: name
      });
    })
    .then(() => {
      alert("Registration successful!");
      window.location.href = 'mainchat.html';
    })
    .catch((error) => {
      alert("Registration failed: " + error.message);
    });
}

// 🔑 Reset Password
function resetPassword(email) {
  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert("Reset email sent!");
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// 🌐 Export functions to global scope if used inline
window.loginUser = loginUser;
window.registerUser = registerUser;
window.resetPassword = resetPassword;
