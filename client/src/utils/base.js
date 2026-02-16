//DOM elements
const changeTheme = document.querySelector(".change-theme");
const root = document.documentElement;
//get localstorage
const savedTheme = localStorage.getItem("theme");

//Define theme based on localstorage
if (savedTheme) {
  if (savedTheme === "dark") {
    root.classList.remove("light");
    changeTheme.innerHTML = "☀ Change theme";
  } else {
    root.classList.add("light");
    changeTheme.innerHTML =
      '<span style="font-weight: bold;">☾</span> Change theme';
  }
}

//Change theme when clicked
if (changeTheme) {
  changeTheme.addEventListener("click", () => {
    const html = document.documentElement;
    html.classList.add("theme-transition");
    if (root.classList.contains("light")) {

      root.classList.remove("light");
      changeTheme.innerHTML = "☀ Change theme";

      localStorage.setItem("theme", "dark");

    } else {

      root.classList.add("light");
      changeTheme.innerHTML =
        '<span style="font-weight: bold;">☾</span> Change theme';
        
      localStorage.setItem("theme", "light");

    }
    setTimeout(()=>{
      html.classList.remove("theme-transition");
    },400)
  });
}

