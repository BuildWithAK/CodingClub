// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Typing Effect
const typingText = document.querySelector('.typing');
const words = ["Coding Club", "Innovation", "Collaboration", "Future Coders"];
let wordIndex = 0;
let charIndex = 0;
let currentWord = "";
let isDeleting = false;

function typeEffect() {
  currentWord = words[wordIndex];
  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 500);
    } else {
      setTimeout(typeEffect, 50);
    }
  } else {
    typingText.textContent = currentWord.substring(0, charIndex++);
    if (charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
    } else {
      setTimeout(typeEffect, 120);
    }
  }
}
typeEffect();

