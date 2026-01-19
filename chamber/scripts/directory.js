// Get elements
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');
const container = document.getElementById('members-container');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

// URL for members data
const url = 'data/members.json';

// Toggle navigation menu (mobile)
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Toggle between grid and list view
gridBtn.addEventListener('click', () => {
  container.className = 'grid-view';
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
  container.className = 'list-view';
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
});

// Fetch and display members
async function getMembers() {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    container.innerHTML = '<p>Error loading member directory. Please try again later.</p>';
  }
}

// Display members in the container
function displayMembers(members) {
  container.innerHTML = ''; // Clear existing content
  
  members.forEach(member => {
    // Create card element
    const card = document.createElement('div');
    card.className = 'member-card';
    
    // Determine membership level text
    const levelText = {
      1: 'Member',
      2: 'Silver Member',
      3: 'Gold Member'
    };
    
    // Build card HTML
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank">${member.website}</a></p>
      <p>${member.description}</p>
      <span class="membership-level level-${member.membershipLevel}">
        ${levelText[member.membershipLevel]}
      </span>
    `;
    
    // Add card to container
    container.appendChild(card);
  });
}

// Footer dynamic content
function updateFooter() {
  // Current year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Last modified date
  const modifiedSpan = document.getElementById('last-modified');
  if (modifiedSpan) {
    modifiedSpan.textContent = document.lastModified;
  }
}

// Initialize
getMembers();
updateFooter();