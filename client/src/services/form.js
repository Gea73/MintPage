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

//Password strenght calculation
let str = 0;

function passwordStr(passwordValue) {
  strength = 0;
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
    if (
      user.value &&
      email.value &&
      password.value &&
      str >= 3 &&
      password.value.length >= 8
    ) {
      try {
        const response = await fetch("http://localhost:5000/login", {
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
          alert(data.message);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
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
        const response = await fetch("http://localhost:5000/register", {
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
          alert(data.message);
          location.href = "login.html";
        } else if (response.status === 409) {
          alert(data.message);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
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
