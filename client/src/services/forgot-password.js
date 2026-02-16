//DOM elements
const forgotBtn = document.querySelector("#forgot-btn");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

const loader = document.querySelector(".loader-overlay");

const API_URL = "https://mintpage-3qwv.onrender.com";
    


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
        resultLoader(String(data.message));
      } else {
        resultLoader("Email failed");
        resultLoader(String("Error: " + data.message));
      }
    } catch (error) {
      console.error(error);
    } finally {
      endLoader();
    }
  }
});

//Email field
email.addEventListener("input", () => {
  emailError.textContent = "";
});

function showLoader() {
  loader.classList.remove("hidden");
   loader.firstElementChild.textContent = "";
}

function endLoader() {
  setTimeout(() => {
  loader.firstElementChild.classList.remove("loader-box");
  loader.firstElementChild.classList.add("loader");
  loader.classList.add("hidden");
    }, 1500);
}

function resultLoader(message) {
  
    loader.firstElementChild.classList.remove("loader");
    loader.firstElementChild.classList.add("loader-box");
    loader.firstElementChild.textContent = message;

}

function emailValidation(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}