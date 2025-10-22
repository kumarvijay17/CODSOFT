const addBtn = document.getElementById("addQuestionBtn");
const saveBtn = document.getElementById("saveQuizBtn");
const questionList = document.getElementById("questionList");

let questionCount = 0;

addBtn.addEventListener("click", () => {
  questionCount++;
  const qBlock = document.createElement("div");
  qBlock.classList.add("question-block");
  qBlock.innerHTML = `
    <input type="text" class="question-text" placeholder="Question ${questionCount}" />

    <div class="options">
      ${[1,2,3,4].map(i => `
        <div class="option">
          <input type="radio" name="correct${questionCount}" value="${i-1}">
          <input type="text" class="option-text" placeholder="Option ${i}">
        </div>
      `).join('')}
    </div>
  `;
  questionList.appendChild(qBlock);
});

saveBtn.addEventListener("click", () => {
  const title = document.getElementById("quizTitle").value.trim();
  if (!title) return alert("Please enter a quiz title!");

  const questions = Array.from(document.querySelectorAll(".question-block")).map(block => {
    const text = block.querySelector(".question-text").value;
    const options = Array.from(block.querySelectorAll(".option-text")).map(o => o.value);
    const correctRadio = block.querySelector("input[type='radio']:checked");
    const correct = correctRadio ? parseInt(correctRadio.value) : null;

    if (!text || options.some(o => !o) || correct === null) {
      throw new Error("Please complete all questions and select correct answers.");
    }

    return { text, options, correct };
  });

  // Save quiz to localStorage
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  quizzes.push({ title, questions });
  localStorage.setItem("quizzes", JSON.stringify(quizzes));

  alert("✅ Quiz saved successfully!");
  window.location.href = "list.html";
});

