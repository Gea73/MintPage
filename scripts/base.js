const changeTheme = document.querySelector(".change-theme");
const savedTheme = localStorage.getItem("theme");
 const root = document.documentElement;

if (savedTheme) {
  if (savedTheme === "dark") {
    root.classList.remove("light");
    changeTheme.innerHTML = "☀ Change theme";
    

  } else {
    root.classList.add("light");
    changeTheme.innerHTML = '<span style="font-weight: bold;">☾</span> Change theme';
    
  }
}

if (changeTheme) {
  changeTheme.addEventListener("click", () => {
   

    if (root.classList.contains("light")) {
      root.classList.remove("light");
      changeTheme.innerHTML = "☀ Change theme";
      localStorage.setItem("theme", "dark");

    } else {
      root.classList.add("light");
      changeTheme.innerHTML ='<span style="font-weight: bold;">☾</span> Change theme';
      localStorage.setItem("theme", "light");
    }

  });
}


