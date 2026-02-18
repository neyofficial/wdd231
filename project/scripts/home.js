// main.js

import { displayResources, setupModal } from "./display.js";

const resourceContainer = document.querySelector("#resourceContainer");
const visitDisplay = document.querySelector("#visitCount");

// ----------------------------
// Local Storage (Visit Counter)
// ----------------------------

let visits = localStorage.getItem("visits");

if (!visits) {
  visits = 1;
} else {
  visits = Number(visits) + 1;
}

localStorage.setItem("visits", visits);

if (visitDisplay) {
  visitDisplay.textContent = `You have visited this page ${visits} times.`;
}

// ----------------------------
// Fetch JSON Data (Async + Try/Catch)
// ----------------------------

async function loadResources() {
  try {
    const response = await fetch("data/resources.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Array method example
    const filteredData = data.filter(item => item.id <= 15);

    displayResources(filteredData, resourceContainer);

  } catch (error) {
    console.error("Error fetching data:", error);
    resourceContainer.innerHTML = "<p>Unable to load resources.</p>";
  }
}

loadResources();

// ----------------------------
// Modal Setup
// ----------------------------

setupModal();