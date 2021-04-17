const request = require("request");
const bcrypt = require("bcrypt");

//Métodos GET Hubspot

function getClients(res) {
  let options = {
    method: "GET",
    url:
      "https://api.hubapi.com/crm/v3/objects/contacts?hapikey=2f347fca-4639-40c7-af20-c2090d8649b5",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  request.get(options, (error, res) => {
    if (!error) {
      if(resp.statusCode == 200) {
        const users = JSON.parse(resp.body).contacts;
        resp.send(users);
      } else {
        res({
          'statusCode': resp.statusCode,
          'body': JSON.parse(resp.body),
        })
    } 
    } else {
      console.log(error);
      res({
        'statusCode': resp.statusCode,
        'body': JSON.parse(resp.body),
      })
    }
  });
}

function addClient(properties, res) {
 const user = {
        "properties": properties
    }
console.log(user);
var options = {
  method: 'POST',
  url: 'https://api.hubapi.com/crm/v3/objects/contacts?hapikey=' + '4e320bb8-9cfd-4078-be5a-f383bc135310',
  body: JSON.stringify(user),
  headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
  }
};

request(options, function (error, response, body) {
  if (error){
    res.status(400).send(error);
  } else {
    const resposta = JSON.parse(body);
    res.status(200).send(resposta);
  }
});
}
    


function getClientByID(req, res) {
  let options = {
    method: "GET",
    url:
      "https://api.hubapi.com/crm/v3/objects/contacts/contactId?hapikey=4e320bb8-9cfd-4078-be5a-f383bc135310",
    headers: { accept: "application/json" },
  };

  request.get(options, async (error, res, body) => {
    if (error) {
      res.status(400).send({
        message: "Error",
        error: error,
      });
    } else {
      const json = JSON.parse(body);
      res.send(json);
    }
  });
}

function updateClient(req, res) {
  let options = {
    //method: "POST",
    url:
      "https://api.hubapi.com/contacts/v1/contact/vid/${user_id}/profile?hapikey=2f347fca-4639-40c7-af20-c2090d8649b5",
    headers: { accept: "application/json" },
  };

  request.put(options, async (error, response, body) => {
    if (error) {
      res.status(400).send({
        message: "Error",
        error: error,
      });
    } else {
      const json = JSON.parse(body);
      res.send(json);
    }
  });
}

/*Função que confirma se já existe um cliente com aquele NIF*/
function existsClientNif(nif, res) {
  let options = {
      url: `https://api.hubapi.com/contacts/v1/search/query?q=&property=nif&hapikey=2f347fca-4639-40c7-af20-c2090d8649b5`
  }
  req.get(options, (err, resp) => {
      if (!err && resp.statusCode == 200) {
          let users = JSON.parse(resp.body).contacts;
          let exists = false;
          for (let i = 0; i < users.length; i++) {
              let data = users[i].properties;

              if (nif == data.nif.value) {
                  exists = true;
              }
          }
          res({
              'exists': exists
          })
      } else {
          res({
              'statusCode': res.statusCode,
              'body': JSON.parse(res.body)
          })
      }
  })
}

module.exports = {
  getClients: getClients,
  getClientByID: getClientByID,
  //existsClientEmail: existsClientEmail,
  existsClientNif: existsClientNif,
  addClient: addClient,
  updateClient: updateClient,
  getClients: getClients
};
