const url = window.location.href;
const everyThing = url.split("?");
const formData = everyThing[1].split("&"); 

console.log(formData)
function show(cup){
    
    formData.forEach(element => {
        if(element.startsWith(cup)){
            console.log("Match Found");
            result = element.split("=");
            result = result[1].replace(/\+/g," ");
            redult = result[3].replace()
        }
    });
    return (result); 
}



const resultBox = document.querySelector('#results');
resultBox.innerHTML= `
<h3>Welcome ${show("first-name")} ${show("last-name")}</h3>
<p>We are happy to have ${show("business")} in our directory</p>
<div class="tanksInfoCard">
    <p><b>Name:</b> ${show("first-name")} ${show("last-name")}</p>
    <p><b>Email:</b> <a href="mailto:${formData[3].split("=")[1].replace("%40","@")}">${formData[3].split("=")[1].replace("%40","@")}</a></p>
    <p><b>Phone:</b> ${show("phone").replace("%2B","+")}</p>
    <p><b>Business Name</b> ${show("business")}</p>
    <p><b>Registered:</b> ${show("timestamp").split("T")[0]}</p>
    
</div>`
//(first name, last name, email, mobile number, business name, and current date timestamp from the hidden field).