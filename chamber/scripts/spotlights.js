const spotlightContainer = document.querySelector("#spotlight-cards");

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error("Members data not found");
    }

    const members = await response.json();

    // ---- Filter Gold & Silver Members ----
    const qualifiedMembers = members.filter(member =>
      member.membership === "Gold" || member.membership === "Silver"
    );

    // ---- Randomize Selection ----
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffled.slice(0, 3);

    // ---- Display Spotlights ----
    spotlightContainer.innerHTML = "";

    selectedMembers.forEach(member => {
      const card = document.createElement("section");
      card.classList.add("spotlight-card");

      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="${member.logo}" alt="${member.name} logo" loading="lazy">
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
        <p><strong>Membership:</strong> ${member.membership}</p>
      `;

      spotlightContainer.appendChild(card);
    });

  } catch (error) {
    console.error(error);
  }
}

loadSpotlights();
