//globals
/* global API_URL */

//imports
import { emailValidation } from "../utils/base.js";
import { passwordStrength } from "../utils/base.js";
import { changeEyeIcon } from "../utils/base.js";
import { showLoader, hideLoader, messageLoader } from "../utils/loader.js";

//DOM Elements
//form fields
const user = document.getElementById("user");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmEmail = document.getElementById("confirm-email");
const confirmPassword = document.getElementById("confirm-password");

//error messages
const userError = document.getElementById("user-error");
const emailError = document.getElementById("email-error");
const confirmEmailError = document.getElementById("confirm-email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");

//buttons
const registerBtn = document.querySelector("#register-btn");

//password visibility eye
const showPasswordEye = document.getElementById("show-password");
const showConfirmPasswordEye = document.getElementById("show-confirm-password");

//Register button validation of the form fields and request

registerBtn.addEventListener("click", async () => {
  if (!user.value) {
    userError.textContent = "User is empty";
  }
  if (!email.value) {
    emailError.textContent = "Email is empty";
  } else if (!emailValidation(email.value)) {
    emailError.textContent = "Invalid email format";
  }
  if (!confirmEmail.value) {
    confirmEmailError.textContent = "Confirm Email is empty";
  }
  if (!password.value) {
    passwordError.textContent = "Password is empty";
  }
  if (!confirmPassword.value) {
    confirmPasswordError.textContent = "Confirm Password is empty";
  }

  if (
    user.value &&
    email.value &&
    email.value == confirmEmail.value &&
    password.value &&
    password.value == confirmPassword.value &&
    passwordStrength(password.value) >= 3 &&
    password.value.length >= 8
  ) {
    try {
      showLoader();
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user.value,
          email: email.value,
          password: password.value,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        messageLoader(String(data.message));
        location.href = "login.html";
      } else if (response.status === 409) {
        messageLoader(String(data.message));
      } else {
        messageLoader(String(data.message));
      }
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  }
});

//Event listeners

//User error message update in input
user.addEventListener("input", () => {
  userError.textContent = "";
});

//Email field
email.addEventListener("input", () => {
  //email error message update in input
  emailError.textContent = "";

  if (!email.value) {
    return;
  }

  if (!emailValidation(email.value)) {
    emailError.textContent = "Invalid email format";
    return;
  }

  if (confirmEmail.value && email.value !== confirmEmail.value) {
    //confirm email match logic
    emailError.textContent = "Emails don't match";
  }
});

//Confirm email field
confirmEmail.addEventListener("input", () => {
  //email error message update in input
  confirmEmailError.textContent = "";

  if (!confirmEmail.value) {
    return;
  }
  if (!emailValidation(confirmEmail.value)) {
    confirmEmailError.textContent = "Invalid email format";
    return;
  }
  if (email.value && confirmEmail.value !== email.value) {
    //confirm email match logic
    confirmEmailError.textContent = "Emails don't match";
  }
});

//Password field
password.addEventListener("input", () => {
  //password error message update in input
  passwordError.textContent = "";

  //update password strength value

  //password length validation
  if (password.value.length < 8 && password.value.length > 0) {
    passwordError.textContent = "Password too short";
    return;
  }
  if (passwordStrength(password.value) < 3) {
    passwordError.textContent = "Password too weak";
    return;
  }

  //confirm password match logic

  if (!confirmPassword.value) return;

  if (confirmPassword.value !== password.value) {
    confirmPasswordError.textContent = "Passwords don't match";
  }
});

//confirm password field
confirmPassword.addEventListener("input", () => {
  //password error message update in input
  confirmPasswordError.textContent = "";

  //update password strength

  //password length validation
  if (confirmPassword.value.length < 8 && confirmPassword.value.length > 0) {
    confirmPasswordError.textContent = "Password too short";
    return;
  }
  if (passwordStrength(confirmPassword.value) < 3) {
    confirmPasswordError.textContent = "Password too weak";
    return;
  }

  //password match logic
  if (!password.value) return;
  if (confirmPassword.value !== password.value) {
    confirmPasswordError.textContent = "Passwords don't match";
  }
});

//Password visibility listeners
//change input field type
showPasswordEye.addEventListener("click", () => {
  password.type === "password"
    ? (password.type = "text")
    : (password.type = "password");

  //change the visibility eye icon
  password.type === "password"
    ? changeEyeIcon(showPasswordEye, true)
    : changeEyeIcon(showPasswordEye, false);
});

//ConfirmPassword visibilty listeners
//change input field type
showConfirmPasswordEye.addEventListener("click", () => {
  confirmPassword.type === "password"
    ? (confirmPassword.type = "text")
    : (confirmPassword.type = "password");

  //change the visibility eye icon
  confirmPassword.type === "password"
    ? changeEyeIcon(showConfirmPasswordEye, true)
    : changeEyeIcon(showConfirmPasswordEye, false);
});
