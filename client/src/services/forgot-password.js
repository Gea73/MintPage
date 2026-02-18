//DOM elements
const forgotBtn = document.querySelector("#forgot-btn");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

/* global showLoader */
/* global messageLoader */
/* global hideLoader */

const API_URL = "http://localhost:5000"//"https://mintpage-3qwv.onrender.com";
    


forgotBtn.addEventListener("click", async () => {
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
        messageLoader(String(data.message));
      } else {
        messageLoader("Email failed");
        messageLoader(String("Error: " + data.message));
      }
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  }
});

//Email field
email.addEventListener("input", () => {
  emailError.textContent = "";
});



function emailValidation(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}