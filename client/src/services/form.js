//DOM Elements
const user = document.getElementById("user");
const email = document.getElementById("email");
const password = document.getElementById("password");

const confirmEmail = document.getElementById("confirm-email");
const confirmPassword = document.getElementById("confirm-password");

const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const userError = document.getElementById("user-error");

const loginBtn = document.querySelector("#login-btn");
const registerBtn = document.querySelector("#register-btn");

const showPassword = document.getElementById("show-password");
const showConfirmPassword = document.getElementById("show-confirm-password");

const loader = document.querySelector(".loader-overlay");

const API_URL = process.env.API_URL || 
                "http://localhost:5000";



//Password strenght calculation
let str = 0;

function passwordStr(passwordValue) {
  let strength = 0;
  if (passwordValue.match(/[A-Z]/)) {
    strength += 1;
  }
  if (passwordValue.match(/[0-9]/)) {
    strength += 1;
  }
  if (passwordValue.match(/[^A-Za-z0-9]/)) {
    strength += 1;
  }
  return strength;
}

//Login button validation of the form fields

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    if (!user.value) {
      userError.textContent = "User is empty";
    }
    if (!email.value) {
      emailError.textContent = "Email is empty";
    }
    if (!password.value) {
      passwordError.textContent = "Passwords is empty";
    }
    if(!emailValidation(email.value)){
      emailError.textContent = "Invalid email format";
      return;
    }

    if (
      user.value &&
      email.value &&
      password.value &&
      str >= 3 &&
      password.value.length >= 8
    ) {
      try {

        showLoader();

        const response = await fetch(`${API_URL}/login`, {
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
          resultLoader(String(data.message));
        } else {
          resultLoader(String(data.message));
        }

      } catch (error) {
        console.error(error);
      }finally{
        endLoader();
      }
    }
  });
}

//Register button validation of the form fields

if (registerBtn) {
  registerBtn.addEventListener("click", async () => {
    if (!user.value) {
      userError.textContent = "User is empty";
    }
    if (!email.value) {
      emailError.textContent = "Email is empty";
    }
    if (!password.value) {
      passwordError.textContent = "Passwords is empty";
    }
     if(!emailValidation(email.value)){
      emailError.textContent = "Invalid email format";
      return;
    }
    if (
      user.value &&
      email.value &&
      email.value == confirmEmail.value &&
      password.value &&
      password.value == confirmPassword.value &&
      str >= 3 &&
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
          resultLoader(String(data.message));
          location.href = "login.html";
        } else if (response.status === 409) {
          resultLoader(String(data.message));
        } else {
          resultLoader(String(data.message));
        }
      } catch (error) {
        console.error(error);
      }
      finally{
        endLoader();
      }
    }
  });
}

//Event listeners

//User field
user.addEventListener("input", () => {
  userError.textContent = "";
});

//Email field
email.addEventListener("input", () => {
  emailError.textContent = "";

  //email match logic
  if (confirmEmail) {
    if (confirmEmail.value === email.value || confirmEmail.value === "") {
      emailError.textContent = "";
    } else {
      emailError.textContent = "Emails don't match";
    }
  }
});

//Confirm email field
if (confirmEmail) {
  confirmEmail.addEventListener("input", () => {
    emailError.textContent = "";
    //email match logic
    if (confirmEmail.value === email.value || confirmEmail.value === "") {
      emailError.textContent = "";
    } else {
      emailError.textContent = "Emails don't match";
    }
  });
}

//Password field
password.addEventListener("input", () => {
  passwordError.textContent = "";

  //update password strength
  str = passwordStr(password.value);

  //password match logic
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
    //str validation
    if (str < 3) {
      passwordError.textContent = "Password too weak";
    }
  }
});

//confirmpassword field
if (confirmPassword) {
  confirmPassword.addEventListener("input", () => {
    passwordError.textContent = "";
    //update password strength
    str = passwordStr(password.value);

    //password match logic
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


function emailValidation(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

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

