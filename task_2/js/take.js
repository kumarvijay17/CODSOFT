const params = new URLSearchParams(window.location.search);
const quizIndex = params.get("quiz");
const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
const quiz = quizzes[quizIndex];

if (!quiz) {
  document.body.innerHTML = "<h2 style='color:white'>Quiz not found!</h2>";
  throw new Error("No quiz found");
}

document.getElementById("quizTitle").textContent = quiz.title;

let currentQ = 0;
let answers = new Array(quiz.questions.length).fill(null);

const questionBox = document.getElementById("questionBox");
const progress = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

function loadQuestion() {
  const q = quiz.questions[currentQ];
  questionBox.innerHTML = `
    <h2>${currentQ + 1}. ${q.text}</h2>
    <div class="options">
      ${q.options.map((opt, i) => `
        <div class="option ${answers[currentQ] === i ? "selected" : ""}" data-index="${i}">
          ${opt}
        </div>
      `).join('')}
    </div>
  `;
  updateProgress();
  prevBtn.disabled = currentQ === 0;
  nextBtn.textContent = currentQ === quiz.questions.length - 1 ? "Submit ✅" : "Next ➡";
}

function updateProgress() {
  const percent = ((currentQ + 1) / quiz.questions.length) * 100;
  progress.style.width = `${percent}%`;
}

questionBox.addEventListener("click", e => {
  if (e.target.classList.contains("option")) {
    document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
    e.target.classList.add("selected");
    answers[currentQ] = parseInt(e.target.dataset.index);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentQ === quiz.questions.length - 1) {
    const score = quiz.questions.reduce((sum, q, i) => sum + (answers[i] === q.correct ? 1 : 0), 0);
    window.location.href = `result.html?score=${score}&total=${quiz.questions.length}`;
  } else {
    currentQ++;
    loadQuestion();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQ > 0) {
    currentQ--;
    loadQuestion();
  }
});

loadQuestion();
