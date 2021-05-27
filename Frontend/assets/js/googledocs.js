
window.onload=function() {
    
    let myButton = document.getElementById("getDocs");
    myButton.addEventListener('click', getDocs);
}
//const {google} = require('googleapis');
function getDocs() {
    let data={
        orcamentoArquiteto:document.getElementById("registerLocation").value,
        area:document.getElementById("registerDescription").value,
        Dealname__c: document.getElementById("Dealname__c").value,
        Localizacao__c: document.getElementById("Localizacao__c").value,
        TipoProjeto__c: document.getElementById("TipoProjeto__c").value,
        Description__c: document.getElementById("Description__c").value,
        Closedate__c: document.getElementById("Closedate__c").value
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
