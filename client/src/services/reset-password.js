//DOM elements
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const passwordError = document.getElementById("password-error");
const showPassword = document.getElementById("show-password");
const showConfirmPassword = document.getElementById("show-confirm-password");
const resetBtn = document.getElementById("reset-btn");
const loader = document.querySelector(".loader-overlay");




//Password strenght calculation
let str = 0;
function passwordStr(passwordValue) {
 let strength = 0;
  //Upcase
  if (passwordValue.match(/[A-Z]/)) {
    strength += 1;
  }
  //Number
  if (passwordValue.match(/[0-9]/)) {
    strength += 1;
  }
  //Special character
  if (passwordValue.match(/[^A-Za-z0-9]/)) {
    strength += 1;
  }
  return strength;
}

//Password field
password.addEventListener("input", () => {
  //clear error when a new input is typed
  passwordError.textContent = "";

  //update password strength real time
  str = passwordStr(password.value);

  //check if the password and confirm match
  if (confirmPassword) {
    if (
      confirmPassword.value === password.value ||
      confirmPassword.value === ""
    ) {
      passwordError.textContent = "";
    } else {
      passwordError.textContent = "Passwords don't match";
    }
  }

  //length validation
  if (password.value.length < 8 && password.value.length > 0) {
    passwordError.textContent = "Password too short";
  } else {
    //strenght validation
    if (str < 3) {
      passwordError.textContent = "Password too weak";
    }
  }
});

//confirmpassword field
if (confirmPassword) {
  confirmPassword.addEventListener("input", () => {
      //clear error when a new input is typed
    passwordError.textContent = "";

    //update password strength real time
    str = passwordStr(password.value);

    //check if the password and confirm match
    if (
      confirmPassword.value === password.value ||
      confirmPassword.value === ""
    ) {
      passwordError.textContent = "";
    } else {
      passwordError.textContent = "Passwords don't match";
    }

    //length validation
    if (password.value.length < 8 && password.value.length > 0) {
      passwordError.textContent = "Password too short";
    } else {
      //str validation
      if (str < 3) {
        passwordError.textContent = "Password too weak";
      }
    }
  });
}

//Show password eye buttons listeners

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

resetBtn.addEventListener("click", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const email = urlParams.get("email");

  if (!token || !email) {
    resultLoader("Invalid link.");
    return;
  }

  if (!password.value) {
    passwordError.textContent = "Passwords is empty";
  }
  if (password.value && str >= 3 && password.value.length >= 8) {
    try {
      showLoader();

      const response = await fetch("http://localhost:5000/reset-password", {
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
        resultLoader("Password reset successful! You can now login.");
        window.location.href = "login.html";
      } else {
        resultLoader(String(data.message));
      }
    } catch (error) {
      console.error(error);
      resultLoader("Error resetting password.");
    }finally{
      endLoader();
    }
  }
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
