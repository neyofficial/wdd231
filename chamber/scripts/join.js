const timestampField = document.querySelector('#timestamp');
    const currentDate = new Date().toISOString();
    timestampField.value = currentDate;

async function getMembershipLevel(){
    const response = await fetch('./data/form.json');
    const data = await response.json();
    cards(data.membership);
    
}
const modal = document.querySelector('#modal');
const closeModal = document.querySelector('#modal button');
const membershipBox = document.querySelector('.membership-content');
const mytitle = document.querySelector("#modal h2");
const myinfo = document.querySelector("#modal p")

const cards = (d) =>{
    console.log(d);
    d.forEach(element => {
        let card = document.createElement("div")
        card.classList.add("card");
        let memberCategory = document.createElement("h6");
        let cardImage = document.createElement("img");
        let cardButton = document.createElement("button");
        cardButton.classList.add("card-btn");

        cardButton.addEventListener("click",()=> showStuff(element) )


        memberCategory.textContent = `${element.category}`;
        cardImage.src = `${element.image}`;
        cardButton.textContent = `learn more`

        card.appendChild(cardImage);
        card.appendChild(memberCategory);
        card.appendChild(cardButton);
        membershipBox.appendChild(card);

    });

};
closeModal.addEventListener('click', ()=>{
    modal.close();
 })

function showStuff(x){
    mytitle.innerHTML = x.category;
    myinfo.innerHTML = x.description;
    modal.showModal();

}
getMembershipLevel();

 