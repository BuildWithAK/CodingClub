// ------------------ IMPORT FIREBASE MODULES ------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { 
  getFirestore, 
  setDoc, 
  doc,
  getDoc 
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// ------------------ FIREBASE CONFIG ------------------
const firebaseConfig = {
  apiKey: "AIzaSyAn5x2mrHMe9tVAEGDL7XbQoL6RG-xbUfw",
  authDomain: "codingclub-website.firebaseapp.com",
  projectId: "codingclub-website",
  storageBucket: "codingclub-website.firebasestorage.app",
  messagingSenderId: "349607815709",
  appId: "1:349607815709:web:edbdfe68f217fba585f4f4",
  measurementId: "G-5NDXD3NWK2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ------------------ UTILITY: SHOW MESSAGE ------------------
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// ------------------ SIGN UP (EMAIL/PASSWORD) ------------------
const signUp = document.getElementById('submitSignUp');
if (signUp) {
  signUp.addEventListener('click', (event) => {
    event.preventDefault();

    // Collect form data
    const fullname = document.getElementById('fName').value.trim();
    const college = document.getElementById('college').value.trim();
    const year = document.getElementById('year').value.trim();
    const email = document.getElementById('rEmail').value.trim();
    const password = document.getElementById('rPassword').value.trim();

    // Validation: All fields mandatory
    if (!fullname || !college || !year || !email || !password) {
      showMessage("⚠️ All fields are mandatory!", "signUpMessage");
      return;
    }

    if (password.length < 6) {
      showMessage("⚠️ Password must be at least 6 characters long!", "signUpMessage");
      return;
    }

    // Firebase create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // User data for Firestore
        const userData = {
          fullname,
          college,
          year,
          email,
          createdAt: new Date().toISOString()
        };

        const docRef = doc(db, "users", user.uid);
        return setDoc(docRef, userData);
      })
      .then(() => {
        showMessage("✅ Account Created Successfully!", "signUpMessage");
        window.location.href = "newdashboard.html"; // Redirect
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          showMessage("⚠️ Email already exists!", "signUpMessage");
        } else if (error.code === 'auth/invalid-email') {
          showMessage("⚠️ Invalid email format!", "signUpMessage");
        } else {
          showMessage("❌ Unable to create account. Try again.", "signUpMessage");
        }
      });
  });
}

// ------------------ SIGN IN (EMAIL/PASSWORD) ------------------
const signIn = document.getElementById('submitSignIn');
if (signIn) {
  signIn.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('rEmail').value.trim();
    const password = document.getElementById('rPassword').value.trim();

    if (!email || !password) {
      showMessage("⚠️ Both email and password are required!", "signInMessage");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("loggedInUserId", user.uid);

        showMessage("✅ Login successful!", "signInMessage");
        window.location.href = "newdashboard.html";
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          showMessage("❌ Incorrect email or password!", "signInMessage");
        } else {
          showMessage("⚠️ Account does not exist.", "signInMessage");
        }
      });
  });
}

// ------------------ GOOGLE SIGN IN ------------------
const googleLoginBtn = document.getElementById("googleLogin");
if (googleLoginBtn) {
  googleLoginBtn.addEventListener("click", (event) => {
    event.preventDefault();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const docRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(docRef);

        // If first time Google login, create Firestore entry
        if (!userSnap.exists()) {
          await setDoc(docRef, {
            fullname: user.displayName || "Google User",
            college: "N/A",
            year: "N/A",
            email: user.email,
            createdAt: new Date().toISOString()
          });
        }

        localStorage.setItem("loggedInUserId", user.uid);
        showMessage(`✅ Welcome ${user.displayName}!`, "signInMessage");
        window.location.href = "newdashboard.html";
      })
      .catch((error) => {
        console.error("Google login error:", error);
        showMessage("❌ Google login failed!", "signInMessage");
      });
  });
}


