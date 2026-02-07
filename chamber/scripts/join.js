// Timestamp
document.getElementById("timestamp").value = new Date().toISOString();

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Modal logic
const buttons = document.querySelectorAll("[data-modal]");
const dialogs = document.querySelectorAll("dialog");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const modal = document.getElementById(button.dataset.modal);
    modal.showModal();
  });
});

dialogs.forEach(dialog => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.querySelector(".close").addEventListener("click", () => {
    dialog.close();
  });
});