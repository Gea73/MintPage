const changeTheme = document.querySelector('.change-theme');
changeTheme.addEventListener("click", () => {
  const root = document.documentElement;
  if (root.classList.contains("light")) {
    root.classList.remove("light");
    changeTheme.innerHTML = "☀ Change theme";
  } else {
    root.classList.add("light");
    changeTheme.innerHTML =
      '<span style="font-weight: bold;">☾</span> Change theme';
  }
});