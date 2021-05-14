
window.onload=function() {
    
    let myButton = document.getElementById("getDocs");
    myButton.addEventListener('click', getDocs);
}
//const {google} = require('googleapis');
function getDocs() {
    let data={
        customerName:document.getElementById("registerLocation").value,
        date:document.getElementById("registerDescription").value
    }
fetch(`http://localhost:8080/google/inserirDados`, {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body:JSON.stringify(data)
}).then(response => {   
    return response.json();
}).then(result =>{
    console.log(result);
}).catch(error => {
    console.log(error);
})

}
