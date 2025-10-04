
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js"
  import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const analytics = getAnalytics(app);
