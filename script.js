const bookingForm = document.getElementById("booking-form");
const formMessage = document.getElementById("form-message");

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    
    event.preventDefault();

   
    const fullName = document.getElementById("full-name");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");

   
    if (fullName.value.trim() === "") {
      showMessage("Please enter your full name.", "error");
      fullName.focus();
      return;
    }

    if (phone.value.trim().length < 7) {
      showMessage("Please enter a valid phone number.", "error");
      phone.focus();
      return;
    }

    if (password.value.length < 6) {
      showMessage("Password must be at least 6 characters.", "error");
      password.focus();
      return;
    }



    showMessage(
      `Thank you, ${fullName.value.trim()}! Your chair is reserved. We'll confirm by phone shortly.`,
      "success"
    );
    bookingForm.reset();
  });
}

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
}


const scene = document.getElementById("hero-scene");

if (scene) {
  const photo = scene.querySelector(".hero-photo");
  const overlay = scene.querySelector(".hero-overlay");
  const content = scene.querySelector(".hero-content");

  scene.addEventListener("mousemove", (event) => {
    const bounds = scene.getBoundingClientRect();

   
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    
    photo.style.transform =
      `translateZ(-100px) scale(1.15) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;

    
    overlay.style.transform =
      `translateZ(-50px) scale(1.1) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;

    
    content.style.transform =
      `translateZ(40px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
  });

  
  scene.addEventListener("mouseleave", () => {
    photo.style.transform = "translateZ(-100px) scale(1.15)";
    overlay.style.transform = "translateZ(-50px) scale(1.1)";
    content.style.transform = "translateZ(40px)";
  });
}


const themeToggle = document.getElementById("theme-toggle");
const icon = themeToggle.querySelector(".icon");


const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  icon.textContent = "☀️";
}


themeToggle.addEventListener("click", () => {
 
  const isDark = document.body.classList.toggle("dark");
  
  icon.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});