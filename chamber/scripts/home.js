const eventCards = document.querySelector('#current-event');

async function getEvent(){
    const response = await fetch('./data/events.json');
    const data = await response.json();
    displayCards(data.events);
    
    
};

getEvent();

const displayCards = (e) => {
    console.log(e);
    e.forEach(element => {
        let card = document.createElement('div');
        card.classList.add('event-card');

        let title = document.createElement('h6');
        title.textContent = `${element.event}`;

        let eventDesc = document.createElement('p');
        eventDesc.innerHTML = `<b>About:</b> ${element.description}`;

        let eventLoc = document.createElement('p');
        eventLoc.innerHTML = `<b>Location:</b> ${element.location}`;
        
        let eventDate = document.createElement('p');
        eventDate.innerHTML = `<b>Date:</b> ${element.date}`;
        
        card.appendChild(title);
        card.appendChild(eventDesc);
        card.appendChild(eventLoc);
        card.appendChild(eventDate);

        eventCards.appendChild(card);
    });
};


//wheather 
const indexCard = document.querySelector('#weather');


const myKey = 'e1d3b62518b56abd4811d6a72b8ced76';
const myLat = '-17.366832637140057';
const myLon = '-66.19878838429028';

const myUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}`;


async function weatherFetch(){
    try{
        const response = await fetch(myUrl);
        if(response.ok){
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else{
            throw Error(await response.text());
        }
    } catch (error){
        console.log(error)
    }
};

weatherFetch();

function displayResults(d){
    console.log(d)
    for (let i = 0; i < 3; i++) {
        let card = document.createElement('div');
        card.classList.add('weather-container');
        let image = document.createElement('img');
        let city = document.createElement('h6');
        let currentTemp = document.createElement('p');
        let description = document.createElement('p');

        city.innerHTML = `${d.city.name},${d.city.country}`;
        currentTemp.innerHTML = `${d.list[i].main.temp.toString().slice(1)}°F`;
        description.innerHTML = d.list[i].weather[0].description;
        image.innerHTML = `https://openweathermap.org/img/wn/${d.list[i].weather[0].icon}@2x.png`;
        image.src = `https://openweathermap.org/img/wn/${d.list[i].weather[0].icon}@2x.png`;
        image.setAttribute('alt', d.list[i].weather[0].description);

        card.appendChild(city);
        card.appendChild(image)
        card.appendChild(currentTemp);
        card.appendChild(description);

        indexCard.appendChild(card);

    }
}


async function getBusiness(){
    const response = await fetch('./data/members.json');
    const data = await response.json();
    displayBusiness(data.companies);
}

getBusiness();


//building business card
const cards = document.querySelector('#gold-members')
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
        if(company.membershipLevel === 1){
            card.appendChild(companyLogo);
            card.appendChild(companyName);
            card.appendChild(phoneNum);
            card.appendChild(companyAddress);
            card.appendChild(websiteCo);
    
            cards.appendChild(card);
        }

    });
}