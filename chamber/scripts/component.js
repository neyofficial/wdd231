//hamburgur menu
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menuLinks');

hamburgerElement.addEventListener('click',() =>{
    navElement.classList.toggle('open');
});

//year
const year = document.querySelector('#year');
const today = new Date();

year.innerHTML = `<span class='highlight'>${today.getFullYear()}</span>&copy; Samuel Mercado Perez`;

const option = {year:'numeric', month:'long', day:'numeric'};
const lastUpdated = today.toLocaleDateString('en-US', option);

document.getElementById('last-update').textContent = `Last Update ${lastUpdated}`;
