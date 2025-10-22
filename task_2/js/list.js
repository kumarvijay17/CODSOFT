const quizListContainer = document.getElementById("quizList");

const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

if (quizzes.length === 0) {
  quizListContainer.innerHTML = "<p>No quizzes available. Create one!</p>";
} else {
  quizzes.forEach((quiz, index) => {
    const card = document.createElement("div");
    card.classList.add("quiz-card");
    card.innerHTML = `
      <h3>${quiz.title}</h3>
      <p>${quiz.questions.length} questions</p>
      <a href="take.html?quiz=${index}" class="take-btn">Take Quiz</a>
    `;
    quizListContainer.appendChild(card);
  });
}
if (confirm(`Delete "${quizName}"?`)) {
  const card = e.target.closest(".quiz-card");
  card.classList.add("fade-out");
  setTimeout(() => {
    quizzes.splice(index, 1);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    renderQuizzes();
  }, 400);
}
