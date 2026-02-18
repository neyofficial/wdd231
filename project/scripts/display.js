// display.js

export function displayResources(resources, container) {

  container.innerHTML = "";

  resources.forEach(resource => {

    const card = document.createElement("div");
    card.classList.add("resource-card");

    // Template Literal
    card.innerHTML = `
      <h3>${resource.title}</h3>
      <p><strong>Category:</strong> ${resource.category}</p>
      <p><strong>Level:</strong> ${resource.level}</p>
      <p><strong>Duration:</strong> ${resource.duration}</p>
      <button class="details-btn" data-id="${resource.id}">
        View Details
      </button>
    `;

    container.appendChild(card);
  });
}

export function setupModal() {

  const modal = document.querySelector("#modal");
  const modalContent = document.querySelector("#modalContent");
  const closeBtn = document.querySelector("#closeModal");

  document.addEventListener("click", (event) => {

    if (event.target.classList.contains("details-btn")) {

      const id = event.target.dataset.id;

      modalContent.innerHTML = `
        <p>You selected resource ID: ${id}</p>
      `;

      modal.showModal();
    }

  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.close();
    });
  }

}