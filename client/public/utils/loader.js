//Screen Loader
const loaderOverlay = document.querySelector(".loader-overlay");
const errorMessageBox = document.querySelector(".error-message-box");

if(!loaderOverlay || !errorMessageBox){
    throw new Error("Components not loaded")
}


//Show the spinning loading wheel
function showLoader() {
  //Shows loader and reset message
  loaderOverlay.classList.remove("hidden");
  const loaderWheel = document.createElement("span");
  loaderWheel.classList.add("loader-wheel");
  loaderOverlay.appendChild(loaderWheel);
}

//Hide the spinning loading wheel
function hideLoader() {
  setTimeout(() => {
    //removes the loader message box and adds the a hidden loader wheel
    errorMessageBox.textContent = "";
    errorMessageBox.classList.add("hidden");
    loaderOverlay.removeChild(loaderOverlay.firstChild);
  }, 3300);
}
//Show the message box
function messageLoader(message) {
  //removes the spinning loader wheel and shows the loader message box
   loaderOverlay.classList.add("hidden")
  errorMessageBox.classList.remove("hidden");
  errorMessageBox.textContent = message;
}

export { showLoader, hideLoader, messageLoader };
