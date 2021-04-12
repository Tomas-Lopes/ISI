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
    /*
    let user = {};

    user["firstname"] = req.body.firstname;
    user["lastname"] = req.body.lastname;
    user["phone"] = req.body.phone;
    user["email"] = req.body.email;
    */
    let options = {
        //method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        url:"https://api.hubapi.com/crm/v3/objects/contacts/search?hapikey=2f347fca-4639-40c7-af20-c2090d8649b5",
        body: req   
    }
 };

 req.post(options, (err, res) => {
    if (!err && res.statusCode == 200) {
        callback({
            'statusCode': 200,
            body: {
                'user_id': JSON.parse(res.body).vid
                
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

    
function getClientByID (req, res) {
    let options = {
        method: "POST",
        url:"https://api.hubapi.com/crm/v3/objects/contacts/contactId?hapikey=2f347fca-4639-40c7-af20-c2090d8649b5",
        headers: {accept: 'application/json'}
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

module.exports = {
    getClients:getClients,
    getClientByID: getClientByID,
    //existsClientNif: existsClientNif,
    addClient: addClient
    //updateClient: updateClient
};


