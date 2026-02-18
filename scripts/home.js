// ----------------------------
// ThrivePath - home.js
// ----------------------------

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

  // ----------------------------
  // Dynamic Resource Cards (Array + Template Literals)
  // ----------------------------

  const resources = [
    { title: "Budget Planning", category: "Finance", level: "Beginner" },
    { title: "Investment Basics", category: "Finance", level: "Intermediate" },
    { title: "Resume Writing", category: "Career", level: "Beginner" },
    { title: "Interview Mastery", category: "Career", level: "Advanced" }
  ];

  const container = document.querySelector("#resourceContainer");

  if (container) {

    resources.forEach(resource => {
      container.innerHTML += `
        <div class="resource-card">
          <h3>${resource.title}</h3>
          <p>Category: ${resource.category}</p>
          <p>Level: ${resource.level}</p>
        </div>
      `;
    });

  }

});