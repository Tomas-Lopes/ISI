const request = require("request");
const bcrypt = require("bcrypt");

//Métodos GET Hubspot

function getClients(res) {
  let options = {
    method: "GET",
    url:
      "https://api.hubapi.com/crm/v3/objects/contacts/all?hapikey=2f347fca-4639-40c7-af20-c2090d8649b5",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  request.get(options, (error, resp) => {
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

function addClient(req, res) {
 
    var options = {
      method: 'POST',
      url: 'https://api.hubapi.com/crm/v3/objects/contacts?hapikey=' + 'ffdfdd87-f540-403c-8427-acc9eb296971',
      body: req,
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      }
    };

request.post(options, (err, resp) => {
  if (!err){
    if(resp.statusCode == 201) {
      res({
        'statusCode': 201,
        'body': {
          'user_id': JSON.parse(resp.body).vid
        }
      })
    } else {
      if(resp.statusCode == 400) {
        res({
          'statusCode': 400,
          'body': JSON.parse(resp.body)
        })
    } else {
      res({
        'statusCode': resp.statusCode,
        'body': JSON.parse(resp.body)
      })
    }
  }
  }
}) 

/*
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
    const user_id = JSON.parse(resp.body).id;
    
    const resposta = JSON.parse(body);
    res.status(200).send(resposta);
  }
});
}
*/
}

function getClientByID(user_id, res) {
  let options = {
    method: "GET",
    url:
      "https://api.hubapi.com/crm/v3/objects/contacts/&{user_id}?hapikey=ffdfdd87-f540-403c-8427-acc9eb296971",

    headers: { accept: "application/json" },

  };


  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let user = JSON.parse(res.body);
    let data = user.properties;
    console.log(data);
  });
  
}

function updateClient(req, res) {
  let options = {
    //method: "POST",
    url:
      "https://api.hubapi.com/contacts/v1/contact/vid/${user_id}/profile?hapikey=ffdfdd87-f540-403c-8427-acc9eb296971",
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
function existsClientNif(req, res) {
  const nif = req;
  let options = {
      url: `https://api.hubapi.com/crm/v3/objects/contacts?properties=nif&hapikey=ffdfdd87-f540-403c-8427-acc9eb296971`
  }
  request.get(options, (err, resp) => {
    if (!err && resp.statusCode == 200) {
        const users = JSON.parse(resp.body).results;
        let exists = false;
        let nifC = "";

        for (let i = 0; i < users.length; i++) {
            let data = users[i].properties.nif;

            if (nif == data) {
                exists = true;
                nifC = data;
            }
        }
        if (exists) {
          res({
            'statusCode': 200,
            'exists': exists,
            'nif': nifC
        })
        } else {
          res({
            'statusCode': 404,
            'exists': exists
        })
        }
    } else {
        res({
            'statusCode': resp.statusCode,
            'body': JSON.parse(resp.body)
        })
    }
})
}

/*Função que confirma se já existe um cliente com aquele Email*/
function existsClientByEmail(req, res) {
  const email = req;
  let options = {
      url: `https://api.hubapi.com/crm/v3/objects/contacts?properties=email&hapikey=ffdfdd87-f540-403c-8427-acc9eb296971`
  }
  request.get(options, (err, resp) => {
      if (!err && resp.statusCode == 200) {
          const users = JSON.parse(resp.body).results;
          let exists = false;
          let emailC = "";

          for (let i = 0; i < users.length; i++) {
              let data = users[i].properties.email;

              if (email == data) {
                  exists = true;
                  emailC = data;
              }
          }
          if (exists) {
            res({
              'statusCode': 200,
              'exists': exists,
              'email': emailC
          })
          } else {
            res({
              'statusCode': 404,
              'exists': exists
          })
          }
      } else {
          res({
              'statusCode': resp.statusCode,
              'body': JSON.parse(resp.body)
          })
      }
  })
}

function addDeal(properties, res) {
  const deal = {
    properties: properties,
  };
  var request = require("request");

  var options = {
    method: "POST",
    url: "https://api.hubapi.com/crm/v3/objects/deals",

    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify(deal),
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
}

module.exports = {
  getClients: getClients,
  getClientByID: getClientByID,
  existsClientByEmail: existsClientByEmail,
  existsClientNif: existsClientNif,
  addClient: addClient,
  updateClient: updateClient,
  getClients: getClients,
  addDeal: addDeal
};
