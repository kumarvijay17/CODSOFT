const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const msg = document.getElementById("message");

loginTab.addEventListener("click", () => {
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  msg.textContent = "";
});

registerTab.addEventListener("click", () => {
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  msg.textContent = "";
});

// OTP Simulation
let generatedOtp = "";

document.getElementById("sendOtpBtn").addEventListener("click", () => {
  const mobile = document.getElementById("regMobile").value.trim();
  if (mobile.length !== 10) return (msg.textContent = "📱 Enter a valid mobile number");

  generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  alert("📩 Your OTP is: " + generatedOtp);
  msg.textContent = "✅ OTP sent to your mobile.";
  document.getElementById("otpSection").style.display = "block";
});

document.getElementById("verifyOtpBtn").addEventListener("click", () => {
  const enteredOtp = document.getElementById("otpInput").value.trim();
  if (enteredOtp === generatedOtp) {
    msg.textContent = "✅ OTP Verified! You can register now.";
    document.getElementById("registerBtn").style.display = "block";
  } else {
    msg.textContent = "❌ Incorrect OTP.";
  }
});

document.getElementById("registerBtn").addEventListener("click", () => {
  const user = document.getElementById("regUser").value.trim();
  const pass = document.getElementById("regPass").value.trim();
  const mobile = document.getElementById("regMobile").value.trim();

  if (!user || !pass || !mobile)
    return (msg.textContent = "⚠️ Please fill in all fields");

  localStorage.setItem("user_" + user, JSON.stringify({ pass, mobile }));
  msg.textContent = "✅ Registered successfully! Refreshing...";
  setTimeout(() => window.location.reload(), 1500);
});

document.getElementById("loginBtn").addEventListener("click", () => {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  const userData = JSON.parse(localStorage.getItem("user_" + user));
  if (userData && userData.pass === pass) {
    msg.textContent = "✅ Login successful! Redirecting...";
    localStorage.setItem("loggedUser", user);
    setTimeout(() => (window.location.href = "index.html"), 1500);
  } else {
    msg.textContent = "❌ Invalid credentials!";
  }
});
