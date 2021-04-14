const request = require("request");
const bcrypt = require("bcrypt");

//Métodos GET Hubspot

function getClients(req, res) {
  let options = {
    method: "GET",
    url:
      "https://api.hubapi.com/crm/v3/objects/contacts?hapikey=2f347fca-4639-40c7-af20-c2090d8649b5",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  request.get(options, async (error, response, body) => {
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

function addClient(properties, res) {
    const user = {
        "properties": properties
    }
    
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    url:
      "https://api.hubapi.com/crm/v3/objects/contacts/search?hapikey=2f347fca-4639-40c7-af20-c2090d8649b5",
    body: JSON.stringify(user),
  };

  request.post(options, (err, resp) => {
    if (!err) {
     if(resp.statusCode == 200) {
      res({
        'statusCode': 200,
        'body': {
          'user_id': JSON.parse(resp.body).id,
        }
      })
    } else {
      if (resp.statusCode == 400) {
        res({
          'statusCode': resp.statusCode,
          'body': JSON.parse(resp.body),
        })
      } else {
        res({
          'statusCode': resp.statusCode,
          'body': JSON.parse(resp.body),
        })
      }
    }
  } else {
    res({
      'statusCode': resp.statusCode,
      'body': JSON.parse(resp.body),
    })
  }
})
}
    


function getClientByID(req, res) {
  let options = {
    method: "GET",
    url:
      "https://api.hubapi.com/crm/v3/objects/contacts/contactId?hapikey=2f347fca-4639-40c7-af20-c2090d8649b5",
    headers: { accept: "application/json" },
  };

  request.get(options, async (error, response, body) => {
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
  existsClientNif: existsClientNif,
  addClient: addClient,
  updateClient: updateClient,
};
