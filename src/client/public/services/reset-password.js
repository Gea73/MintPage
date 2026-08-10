/* global API_URL */

//imports
import { passwordStrength } from "../utils/base.js";
import { changeEyeIcon } from "../utils/base.js";
import { showLoader, hideLoader, messageLoader } from "../utils/loader.js";

//DOM elements

//form fields
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

//error messages
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");

//buttons
const resetBtn = document.getElementById("reset-btn");

//password visibility eye
const showPasswordEye = document.getElementById("show-password");
const showConfirmPasswordEye = document.getElementById("show-confirm-password");

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

//password reset on click logic
resetBtn.addEventListener("click", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const email = urlParams.get("email");
  //get the url and the params

  if (!token || !email) {
    messageLoader("Invalid link.");
    return;
  }

  if (!password.value) {
    passwordError.textContent = "Passwords is empty";
  }
  if (password.value && passwordStrength(password.value) >= 3 && password.value.length >= 8) {
    try {
      showLoader();

      const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          token: token,
          newPassword: password.value,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        messageLoader("Password reset successful! You can now login.");
        window.location.href = "login.html";
      } else {
        messageLoader(String(data.message));
      }
    } catch (error) {
      console.error(error);
      messageLoader("Error resetting password.");
    } finally {
      hideLoader();
    }
  }
});

//Show password visibility eye buttons listener

showPasswordEye.addEventListener("click", () => {
  password.type === "password"
    ? (password.type = "text")
    : (password.type = "password");

  password.type === "password"
    ? changeEyeIcon(showPasswordEye, true)
    : changeEyeIcon(showPasswordEye, false);
});

//Show confirm password visibility eye buttons listener
showConfirmPasswordEye.addEventListener("click", () => {
  confirmPassword.type === "password"
    ? (confirmPassword.type = "text")
    : (confirmPassword.type = "password");

  confirmPassword.type === "password"
    ? changeEyeIcon(showConfirmPasswordEye, true)
    : changeEyeIcon(showConfirmPasswordEye, false);
});
