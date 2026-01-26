const forgotBtn = document.querySelector("#forgot-btn");
const email = document.querySelector("#email");

forgotBtn.addEventListener("click", async () => {
  if (email.value) {
    try {
      const response = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert("Email failed");
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
});
