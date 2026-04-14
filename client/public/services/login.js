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

//error messages
const userError = document.getElementById("user-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

//buttons

const loginBtn = document.querySelector("#login-btn");

//password visibility eye
const showPasswordEye = document.getElementById("show-password");

//Login button validation of the form fields and request

loginBtn.addEventListener("click", async () => {
  if (!user.value) {
    userError.textContent = "User is empty";
  }

  if (!password.value) {
    passwordError.textContent = "Password is empty";
  }

  if (!email.value) {
    emailError.textContent = "Email is empty";
  } else if (!emailValidation(email.value)) {
    emailError.textContent = "Invalid email format";
  }

  if (
    user.value &&
    email.value &&
    password.value &&
    passwordStrength(password.value) >= 3 &&
    password.value.length >= 8
  ) {
    try {
      showLoader();

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.value,
          email: email.value,
          password: password.value,
        }),
      });

      const data = await response.json();
      if (response.ok) {
      messageLoader(String(data.message));
         window.location.href = "/dashboard";
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

//User field validation
user.addEventListener("input", () => {
  //User error message update in input
  userError.textContent = "";
});

//Email field validation
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
});

//Password field
password.addEventListener("input", () => {
  //password error message update in input
  passwordError.textContent = "";

  //update password strength value

  //password length validation error message
  if (password.value.length < 8 && password.value.length > 0) {
    passwordError.textContent = "Password must be at least 8 long";
    return;
  }

  //password strength validation error message
  if (password.value && passwordStrength(password.value) < 3) {
    passwordError.textContent =
      "Password must include an uppercase letter, number, and special character";
    return;
  }
});

//change password visibility
//change input field type
showPasswordEye.addEventListener("click", () => {
  //change the visibility eye icon

  const isHidden = password.type === "password";

  changeEyeIcon(showPasswordEye, !isHidden);
  password.type = isHidden ? "text" : "password";
});
