// Optional: dynamic motivational messages (UX polish)
const messages = [
  "Learning never exhausts the mind 💡",
  "Challenge yourself — take a quiz today! 🚀",
  "Knowledge shared is knowledge multiplied 🌟",
  "Small quizzes, big learning! 📚"
];

const paragraph = document.querySelector(".content p");
let i = 0;

setInterval(() => {
  i = (i + 1) % messages.length;
  paragraph.textContent = messages[i];
}, 4000);
