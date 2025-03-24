// const themeToggle = document.getElementById("theme-toggle");
// themeToggle.addEventListener("click", () => {
//   document.body.classList.toggle("dark");
//   document.getElementById("header").classList.toggle("dark");
// });

// const togglePassword = document.getElementById("toggle-password");
// const passwordInput = document.getElementById("password");
// togglePassword.addEventListener("click", () => {
//   const type =
//     passwordInput.getAttribute("type") === "password" ? "text" : "password";
//   passwordInput.setAttribute("type", type);
//   togglePassword.innerHTML =
//     type === "password"
//       ? '<i class="fas fa-eye"></i>'
//       : '<i class="fas fa-eye-slash"></i>';
// });

// const hamburgerMenu = document.getElementById("hamburger-menu");
// const mobileMenu = document.getElementById("mobile-menu");

// hamburgerMenu.addEventListener("click", () => {
//   mobileMenu.classList.toggle("active");
// });

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar-container");
  const toggleButton = document.getElementById("collapse-button");

  console.log(sidebar);
  console.log(toggleButton);
  console.log("uia");

  if (sidebar && toggleButton) {
    sidebar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");
    Array.from(sidebar.getElementsByClassName("show")).forEach((ul) => {
      ul.classList.remove("show");
      ul.previousElementSibling.classList.remove("rotate");
    });
  } else {
    console.error("Sidebar or toggle button not found");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("collapse-button");
  const sidebar = document.getElementById("sidebar-container");

  console.log("Toggle button:", toggleButton);
  console.log("Sidebar:", sidebar);
});

function toggleSubMenu(button) {
  button.nextElementSibling.classList.toggle("show");
  button.classList.toggle("rotate");
}

console.log("uia");