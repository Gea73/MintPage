//globals
/* global API_URL */

//imports
import { emailValidation } from "../utils/base.js";
import { showLoader, hideLoader, messageLoader } from "../utils/loader.js";

//DOM elements

//form fields
const form = document.querySelector("form");
const email = document.querySelector("#email");

//error messages
const emailError = document.querySelector("#email-error");

//buttons
//const forgotBtn = document.querySelector("#forgot-btn");

//email send request on click

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!email.value) {
    emailError.textContent = "Email field empty";
    return;
  }
  if (!emailValidation(String(email.value))) {
    emailError.textContent = "Email format incorrect";
    return;
  }

  if (email.value) {
    try {
      showLoader();

      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        messageLoader(String(data.detail));
      } else {
        messageLoader("Email failed");
        messageLoader(String("Error: " + data.detail));
      }
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  }
});

//forgotBtn.addEventListener("click", async () => {

//});

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
