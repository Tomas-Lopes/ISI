const request = require ("request");
const bcrypt = require ("bcrypt");

//Métodos GET Hubspot

function getClients (req, res) {
    let options = {
        method: "GET",
        url:"https://api.hubapi.com/crm/v3/objects/contacts?hapikey=2f347fca-4639-40c7-af20-c2090d8649b5",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };

request.get (options, async (error,response,body) => {
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
        //method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        url:"https://api.hubapi.com/crm/v3/objects/contacts/search?hapikey=2f347fca-4639-40c7-af20-c2090d8649b5",
        body: req   
    }
 
 request.post(options, (err, res) => {
    if (!err && res.statusCode == 200) {
        callback({
            'statusCode': 200,
            body: {
                'user_id': JSON.parse(res.body).id
                
            }
        })
    } else {
        callback({
            'statusCode': res.statusCode,
            'body': JSON.parse(res.body)
        })
    }
    console.log("estou aqui")
})
}
    
function getClientByID (req, res) {
    let options = {
        method: "POST",
        url:"https://api.hubapi.com/crm/v3/objects/contacts/contactId?hapikey=2f347fca-4639-40c7-af20-c2090d8649b5",
        headers: {accept: 'application/json'}
    };

request.get (options, async (error,response,body) => {
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

function updateClient (req, res) {
    let options = {
        //method: "POST",
        url:"https://api.hubapi.com/contacts/v1/contact/vid/${user_id}/profile?hapikey=2f347fca-4639-40c7-af20-c2090d8649b5",
        headers: {accept: 'application/json'}
    };

request.put (options, async (error,response,body) => {
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

module.exports = {
    getClients:getClients,
    getClientByID: getClientByID,
    //existsClientNif: existsClientNif,
    addClient: addClient,
    updateClient: updateClient
};


