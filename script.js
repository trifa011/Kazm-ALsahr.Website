// ============================================
// CONCERT SEAT BOOKING FORM
// ============================================
const bookingForm = document.getElementById("booking-form");
const formMessage = document.getElementById("form-message");

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    // Stop the browser from reloading the page (default form behavior)
    event.preventDefault();

    // Grab each field's current value
    const fullName = document.getElementById("full-name");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");

    // Simple validation checklist — each check has a clear, specific message
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

    // --------------------------------------------------------
    // NOTE FOR LATER: this is a static front-end page, so there is
    // no server yet to actually save this booking or the password.
    // When you're ready to make this real, you would replace the
    // block below with something like:
    //
    //   fetch("https://your-server.com/api/bookings", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       fullName: fullName.value,
    //       phone: phone.value,
    //       password: password.value,   // never send plain passwords
    //       comment: document.getElementById("comment").value,
    //     }),
    //   });
    //
    // Real bookings should NEVER send plain-text passwords over the
    // internet without HTTPS, and a real server would hash the
    // password before saving it — never store it as plain text.
    // --------------------------------------------------------

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

// ============================================
// 3D PARALLAX BACKGROUND
// ============================================
// The idea: as the mouse moves across the hero section, we calculate
// how far it is from the CENTER (as a -1 to 1 value), then rotate/shift
// each layer by a different amount. Layers further "back" (translateZ
// negative) move less; the content up front moves a little more —
// that difference in movement speed is what tricks the eye into 3D.

const scene = document.getElementById("hero-scene");

if (scene) {
  const photo = scene.querySelector(".hero-photo");
  const overlay = scene.querySelector(".hero-overlay");
  const content = scene.querySelector(".hero-content");

  scene.addEventListener("mousemove", (event) => {
    const bounds = scene.getBoundingClientRect();

    // mouse position relative to the section, from -0.5 to 0.5
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    // Photo tilts the most (it's the "deepest" layer, exaggerated for effect)
    photo.style.transform =
      `translateZ(-100px) scale(1.15) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;

    // Overlay moves a little for subtle depth
    overlay.style.transform =
      `translateZ(-50px) scale(1.1) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;

    // Content (text) moves opposite + closer, feels like it's floating in front
    content.style.transform =
      `translateZ(40px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
  });

  // When the mouse leaves, smoothly reset everything back to flat/centered
  scene.addEventListener("mouseleave", () => {
    photo.style.transform = "translateZ(-100px) scale(1.15)";
    overlay.style.transform = "translateZ(-50px) scale(1.1)";
    content.style.transform = "translateZ(40px)";
  });
}

// ============================================
// DARK MODE TOGGLE
// ============================================

// Step 1: grab the button element from the HTML using its id
const themeToggle = document.getElementById("theme-toggle");
const icon = themeToggle.querySelector(".icon");

// Step 2: check if the user already chose a theme before (saved in browser storage)
// This makes their choice "remembered" even after they close the tab
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  icon.textContent = "☀️"; // show sun icon when already in dark mode
}

// Step 3: listen for clicks on the button
themeToggle.addEventListener("click", () => {
  // toggle() adds the class if it's missing, removes it if it's present
  // it also returns true/false telling us the new state
  const isDark = document.body.classList.toggle("dark");

  // Step 4: swap the icon depending on the new mode
  icon.textContent = isDark ? "☀️" : "🌙";

  // Step 5: save the choice so it persists on next visit
  localStorage.setItem("theme", isDark ? "dark" : "light");
});