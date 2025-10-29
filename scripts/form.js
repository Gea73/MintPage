
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmEmail = document.getElementById("confirm-email");
const confirmPassword = document.getElementById("confirm-password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

if (confirmEmail) {
  confirmEmail.addEventListener("input", () => {
    if (confirmEmail.value === email.value || confirmEmail.value === "") {
      emailError.textContent = "";
    } else {
      emailError.textContent = "Emails don't match";
    }
  });
}

if (confirmPassword) {
  confirmPassword.addEventListener("input", () => {
    if (
      confirmPassword.value === password.value ||
      confirmPassword.value === ""
    ) {
      passwordError.textContent = "";
    } else {
      passwordError.textContent = "Passwords don't match";
    }
  });
}

const showPassword = document.getElementById("show-password");
const showConfirmPassword = document.getElementById("show-confirm-password");

if (showPassword) {
  showPassword.addEventListener("click", () => {
    password.type === "password"
      ? (password.type = "text")
      : (password.type = "password");

    password.type === "password"
      ? showPassword.classList.remove("unhidden")
      : showPassword.classList.add("unhidden");
  });
}

if (showConfirmPassword) {
  showConfirmPassword.addEventListener("click", () => {
    confirmPassword.type === "password"
      ? (confirmPassword.type = "text")
      : (confirmPassword.type = "password");

    confirmPassword.type === "password"
      ? showConfirmPassword.classList.remove("unhidden")
      : showConfirmPassword.classList.add("unhidden");
  });
}
