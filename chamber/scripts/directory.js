//busienss cards getting info
async function getBusiness(){
    const response = await fetch('./data/members.json');
    const data = await response.json();
    displayBusiness(data.companies);
}

getBusiness();


//building business card
const cards = document.querySelector('#business-cards')
const displayBusiness = (companies) => {
    companies.forEach((company) => {
        //creating the div (box)
        let card = document.createElement('div');
        card.classList.add('card-container');

        // card.className = 'card-container';
        let companyLogo = document.createElement('img');//fing a way to add a src and atl
        let companyName = document.createElement('h6');
        companyName.textContent = `${company.name}`;
        let companyAddress = document.createElement('p');
        let websiteCo = document.createElement('p');
        websiteCo.innerHTML = `<a href ='${company.website}'>${company.website}</a>`
        companyAddress.textContent = `${company.address}`;
        let phoneNum = document.createElement('p');
        phoneNum.textContent = `${company.phone}`;
      
        //build the image
        card.appendChild(companyLogo);
        card.appendChild(companyName);
        card.appendChild(phoneNum);
        card.appendChild(companyAddress);
        card.appendChild(websiteCo);

        cards.appendChild(card);
    });
}