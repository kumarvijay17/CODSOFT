const params = new URLSearchParams(window.location.search);
const score = params.get("score");
const total = params.get("total");

document.getElementById("score").textContent = `${score} / ${total}`;

let feedback = "";
const percent = (score / total) * 100;
if (percent === 100) feedback = "🌟 Perfect score! Outstanding!";
else if (percent >= 75) feedback = "👏 Great job!";
else if (percent >= 50) feedback = "🙂 Not bad, keep improving!";
else feedback = "😅 Better luck next time!";
document.getElementById("feedback").textContent = feedback;

// Confetti effect
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];
for (let i = 0; i < 150; i++) {
  confetti.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 2,
    c: `hsl(${Math.random() * 360}, 100%, 60%)`,
    d: Math.random() + 1
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.fill();
  });
  update();
  requestAnimationFrame(draw);
}

function update() {
  confetti.forEach(p => {
    p.y += p.d;
    if (p.y > canvas.height) p.y = 0;
  });
}

draw();
