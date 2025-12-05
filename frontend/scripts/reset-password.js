const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const passwordError = document.getElementById("password-error");

const showPassword = document.getElementById("show-password");
const showConfirmPassword = document.getElementById("show-confirm-password");

const resetBtn = document.getElementById("reset-btn");
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

resetBtn.addEventListener("click", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const email = urlParams.get("email");

  if (!token || !email) {
    alert("Invalid link.");
    return;
  }

  if (!password.value) {
    passwordError.textContent = "Passwords is empty";
  }
  if (password.value && str >= 3 && password.value.length >= 8) {
    try {
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
        alert("Password reset successful! You can now login.");
        window.location.href = "login.html";
      } else {
        alert(data);
      }
    } catch (error) {
      console.error(error);
      alert("Error resetting password.");
    }
  }
});
