const bookingForm = document.getElementById("booking-form");
const formMessage = document.getElementById("form-message");

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
}

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const fullName = document.getElementById("full-name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const comment = document.getElementById("comment");

    const selectedSeat = document.querySelector(
      'input[name="seat"]:checked'
    );


    

    // Check full name
    if (fullName.value.trim() === "") {
      showMessage("Please enter your full name.", "error");
      fullName.focus();
      return;
    }

    // Check phone
    if (phone.value.trim().length < 7) {
      showMessage("Please enter a valid phone number.", "error");
      phone.focus();
      return;
    }

    
    // Check seat
    if (!selectedSeat) {
      showMessage("Please choose a seat.", "error");
      return;
    }

    // Successful booking
    showMessage(
      `Thank you, ${fullName.value.trim()}! Your ${selectedSeat.value} chair is reserved. We'll confirm by phone shortly.`,
      "success"
    );

    console.log("Name:", fullName.value);
    console.log("Phone:", phone.value);
    console.log("Email:", email.value);
    console.log("Seat:", selectedSeat.value);
    console.log("Comment:", comment.value);

    bookingForm.reset();
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