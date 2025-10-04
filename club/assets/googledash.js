import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, update dashboard
    document.getElementById("user-name").textContent = user.displayName;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("profile-pic").src = user.photoURL;
  } else {
    // Not signed in, redirect to login
    window.location.href = "login.html";
  }
});


const showSignInBtn = document.getElementById("showSignIn");
const showSignUpBtn = document.getElementById("showSignUp");
const signupSection = document.getElementById("signup-section");
const signinSection = document.getElementById("signin-section");

// Show Sign In Form
showSignInBtn.addEventListener("click", () => {
  signupSection.style.display = "none";
  signinSection.style.display = "block";
});

// Show Sign Up Form
showSignUpBtn.addEventListener("click", () => {
  signinSection.style.display = "none";
  signupSection.style.display = "block";
});
