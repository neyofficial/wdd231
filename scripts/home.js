// ----------------------------
// ThrivePath - home.js
// ----------------------------

// Wait until DOM loads
document.addEventListener("DOMContentLoaded", () => {

  // ----------------------------
  // Mobile Menu Toggle
  // ----------------------------

  const menuBtn = document.querySelector("#menuBtn");
  const navMenu = document.querySelector("#navMenu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  // ----------------------------
  // Contact Form Validation
  // ----------------------------

  const form = document.querySelector("#contactForm");

  if (form) {
    form.addEventListener("submit", (event) => {

      const name = document.querySelector("#fullname").value.trim();
      const email = document.querySelector("#email").value.trim();
      const message = document.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        event.preventDefault();
        alert("Please complete all required fields before submitting.");
      }

    });
  }

});