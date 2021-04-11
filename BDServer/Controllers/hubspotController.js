const request = require ("request");
const bcrypt = require ("bcrypt");

//Métodos GET Hubspot

function getClients (req, res) {
    let options = {
        method: "GET",
        url:"https://api.hubapi.com/crm/v3/objects/contacts?hapikey=2f347fca-4639-40c7-af20-c2090d8649b5",
    };

request (options, async (error,response,body) => {
    if (error) {
        res.status (400).send({
            message: "Error",
            error: error,
        });
    } else {
        const json = JSON.parse(body);
        res.send(json);
    }
});
    
}

function addClient (req, res) {
    let options = {
        method: "POST",
        url:"https://api.hubapi.com/crm/v3/objects/contacts/search?hapikey=2f347fca-4639-40c7-af20-c2090d8649b5",
    };

request (options, async (error,response,body) => {
    if (error) {
        res.status (400).send({
            message: "Error",
            error: error,
        });
    } else {
        const json = JSON.parse(body);
        res.send(json);
    }
});
    
}

function getClientByID (req, res) {
    let options = {
        method: "POST",
        url:"https://api.hubapi.com/crm/v3/objects/contacts/contactId?hapikey=2f347fca-4639-40c7-af20-c2090d8649b5",
    };

request (options, async (error,response,body) => {
    if (error) {
        res.status (400).send({
            message: "Error",
            error: error,
        });
    } else {
        const json = JSON.parse(body);
        res.send(json);
    }
});
    
}

