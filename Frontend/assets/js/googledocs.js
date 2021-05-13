
window.onload=function() {
    
    let myButton = document.getElementById("getDocs");
    myButton.addEventListener('click', getDocs);
}
const {google} = require('googleapis');
function getDocs() {
fetch(`https://docs.google.com/document/d/148fCpUJj3SSTAaXWgKbI1tssYpELeEgDWLVLSvq_ldU/edit`, {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'GET',
    mode: 'cors'
}).then(response => {
    console.log(response);
    var customerName = 'Alice';
    var date = '123'
    let requests = [
        {
            replaceAllText: {
                containsText: {
                    text: '{{customer-name}}',
                    matchCase: true,
                },
                replaceText: customerName,
            },
        },
        {
            replaceAllText: {
                containsText: {
                    text: '{{date}}',
                    matchCase: true,
                },
                replaceText: date,
            },
        },
    ];

    google.options({ auth: auth });
    
        google.discoverAPI(
            'https://docs.googleapis.com/$discovery/rest?version=v1&key={AIzaSyDWWRWA2t0ykAgqewjz19ZuHVdL7awWeq0}')
        .then(function (docs) {
            docs.documents.batchUpdate(
                {
                    documentId: '148fCpUJj3SSTAaXWgKbI1tssYpELeEgDWLVLSvq_ldU',
                    resource: {
                        requests,
                    },
                },
                (err, { data }) => {
                    if (err) return console.log('The API returned an error: ' + err);
                    console.log(data);
                });
        });

    return response.json();
}).catch(error => {
    console.log(error);
})

}
