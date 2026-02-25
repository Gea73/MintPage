//DOM Elements

//form fields
const user = document.getElementById("user");
const email = document.getElementById("email");
const password = document.getElementById("password");

const confirmEmail = document.getElementById("confirm-email");
const confirmPassword = document.getElementById("confirm-password");

//error messages
const emailError = document.getElementById("email-error");
const confirmEmailError = document.getElementById("confirm-email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const userError = document.getElementById("user-error");

//buttons
const loginBtn = document.querySelector("#login-btn");
const registerBtn = document.querySelector("#register-btn");

//password visibility eye
const showPassword = document.getElementById("show-password");
const showConfirmPassword = document.getElementById("show-confirm-password");

//globals

/* global showLoader */
/* global messageLoader */
/* global hideLoader */
/* global API_URL */

//Password strenght calculation
let passStrength = 0;

//Login button validation of the form fields and request

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    if (!user.value) {
      userError.textContent = "User is empty";
    }
    if (!email.value) {
      emailError.textContent = "Email is empty";
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
      password.value &&
      passStrength >= 3 &&
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
}

//Register button validation of the form fields and request

if (registerBtn) {
  registerBtn.addEventListener("click", async () => {
    if (!user.value) {
      userError.textContent = "User is empty";
    }
    if (!email.value) {
      emailError.textContent = "Email is empty";
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
      passStrength >= 3 &&
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
}

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
if (confirmEmail) {
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
}

//Password field
password.addEventListener("input", () => {
  //password error message update in input
  passwordError.textContent = "";

  //update password strength value
  passStrength = passwordStr(password.value);

  //password length validation
  if (password.value.length < 8 && password.value.length > 0) {
    passwordError.textContent = "Password too short";
    return;
  }
  if (passStrength < 3) {
    passwordError.textContent = "Password too weak";
    return;
  }

  //confirm password match logic
  if (confirmPassword) {
    if (!confirmPassword.value) return;

    if (confirmPassword.value !== password.value) {
      confirmPasswordError.textContent = "Passwords don't match";
    }
  }
});

//confirm password field
if (confirmPassword) {
  confirmPassword.addEventListener("input", () => {
    //password error message update in input
    confirmPasswordError.textContent = "";

    //update password strength
    passStrength = passwordStr(confirmPassword.value);

    //password length validation
    if (confirmPassword.value.length < 8 && confirmPassword.value.length > 0) {
      confirmPasswordError.textContent = "Password too short";
      return;
    }
    if (passStrength < 3) {
      confirmPasswordError.textContent = "Password too weak";
      return;
    }

    //password match logic
    if (!password.value) return;
    if (confirmPassword.value !== password.value) {
      confirmPasswordError.textContent = "Passwords don't match";
    }
  });
}

//Password visibilty listeners

if (showPassword) {
  //change input field type
  showPassword.addEventListener("click", () => {
    password.type === "password"
      ? (password.type = "text")
      : (password.type = "password");

    //change the visibility eye icon
    password.type === "password"
      ? changePasswordVisibility(showPassword, true)
      : changePasswordVisibility(showPassword, false);
  });
}

//ConfirmPassword visibilty listeners
if (showConfirmPassword) {
  //change input field type
  showConfirmPassword.addEventListener("click", () => {
    confirmPassword.type === "password"
      ? (confirmPassword.type = "text")
      : (confirmPassword.type = "password");

    //change the visibility eye icon
    confirmPassword.type === "password"
      ? changePasswordVisibility(showConfirmPassword, true)
      : changePasswordVisibility(showConfirmPassword, false);
  });
}

//change visiblity eye func
function changePasswordVisibility(element, hidden) {
  if (hidden) {
    element.setAttribute("fill", "#009688");
    element.children[0].setAttribute(
      "d",
      "M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z",
    );
  } else {
    element.setAttribute("fill", "#00C6A7");
    element.children[0].setAttribute(
      "d",
      "m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z",
    );
  }
}

//password strenght logic
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

//frontend email validation regex
function emailValidation(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
