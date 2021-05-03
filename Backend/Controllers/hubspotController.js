const request = require("request");
const bcrypt = require("bcrypt");

//Métodos GET Hubspot

function getClients(res) {
  let options = {
    method: "GET",
    url: `https://api.hubapi.com/crm/v3/objects/contacts?hapikey=ffdfdd87-f540-403c-8427-acc9eb296971`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  request(options, (error, resp) => {
    if (!error) {
      const users = JSON.parse(resp.body).contacts;
      let usersF = [];
      for (let i = 0; i < users.length; i++) {
        usersF.push({
          id: users[i].vid,
          name:
            users[i].properties.firstname.value +
            " " +
            users[i].properties.lastname.value,
        });
      }
      res({
        users: usersF,
      });
      res.status(200).send(users);
    } else {
      res.status(400).send(error);
    }
  });
}

function addClient(properties, res) {
  const user = {
    properties: properties,
  };

  var options = {
    method: "POST",
    url:
      "https://api.hubapi.com/crm/v3/objects/contacts?hapikey=" +
      "ffdfdd87-f540-403c-8427-acc9eb296971",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  request(options, function (err, resp, body) {
    if (!err) {
      const resposta = JSON.parse(body);
      console.log(resposta);

      res.status(201).send(resposta);
    } else {
      res.status(400).send(err);
    }
  });
}

function getClientByID(user_id, res) {
  let options = {
    method: "GET",
    url:
      "https://api.hubapi.com/crm/v3/objects/contacts/{user_id}?hapikey=ffdfdd87-f540-403c-8427-acc9eb296971",

    headers: { accept: "application/json" },
  };

  request(options, (error, resp) => {
    if (!error) {
      if (resp.statusCode == 200) {
        let user = JSON.parse(resp.body);
        let data = user.properties;
        console.log("hello");
        const result = {
          user_id: data.hs_object_id.value,
          nome: data.firstname.value,
          apelido: data.lastname.value,
          email: data.email.value,
          nif: data.nif.value,
          morada: data.address.value,
          telemovel: data.phone.value,
          password: data.password.value,
          company: "MCA Group",
          website: "vgbhjjk",
        };
        res({
          user: result,
        });
      } else {
        res({
          statusCode: resp.statusCode,
          body: JSON.parse(res.body),
        });
      }
    } else {
      console.log(error);
      res({
        statusCode: 400,
        body: "erro",
      });
    }
  });
}

function getClientByEmail(email, res) {
  let options = {
    method: "GET",
    url: `https://api.hubapi.com/contacts/v1/contact/email/${email}/profile?hapikey=ffdfdd87-f540-403c-8427-acc9eb296971`,

    headers: { accept: "application/json" },
  };

  request(options, (error, resp) => {
    if (!error) {
      if (resp.statusCode == 200) {
        let user = JSON.parse(resp.body);
        let data = user.properties;

        const result = {
          user_id: data.hs_object_id.value,
          nome: data.firstname.value,
          apelido: data.lastname.value,
          email: data.email.value,
          nif: data.nif.value,
          morada: data.address.value,
          telemovel: data.phone.value,
          password: data.password.value,
          company: "MCA Group",
          website: "vgbhjjk",
        }
        res({
          'user': result
        });
        //res.status(200).send(params);
      } else {
        res({
          'statusCode': res.statusCode,
          'body': JSON.parse(res.body)
        })
      }
    } else {
      console.log(error);
      res({
        'statusCode': 400,
        'body': 'erro'
      })
    }
  });
}

function updateClient(user_id, properties, res) {
  let json = {
    properties: properties,
  };
  let options = {
    url: `https://api.hubapi.com/contacts/v1/contact/vid/${user_id}/profile?hapikey=ffdfdd87-f540-403c-8427-acc9eb296971`,
    headers: { accept: "application/json" },
    body: JSON.stringify(json),
  };

  request.patch(options, async (error, response, body) => {
    if (error) {
      res.status(400).send(error);
    } else {
      const json = JSON.parse(body);
      res.status(200).send(json);
    }
  });
}

/*Função que confirma se já existe um cliente com aquele NIF*/
function existsClientNif(nif, res) {

  let options = {
    url: `https://api.hubapi.com/crm/v3/objects/contacts?properties=nif&hapikey=ffdfdd87-f540-403c-8427-acc9eb296971`,
  };
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
          statusCode: 200,
          exists: exists,
          nif: nifC,
        });
      } else {
        res({
          statusCode: 404,
          exists: exists,
        });
      }
    } else {
      res({
        statusCode: resp.statusCode,
        body: JSON.parse(resp.body),
      });
    }
  });
}

/*Função que confirma se já existe um cliente com aquele Email*/
function existsClientByEmail(req, res) {
  const email = req;
  let options = {
    url: `https://api.hubapi.com/crm/v3/objects/contacts?properties=email&hapikey=ffdfdd87-f540-403c-8427-acc9eb296971`,
  };
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
          statusCode: 200,
          exists: exists,
          email: emailC,
        });
      } else {
        res({
          statusCode: 404,
          exists: exists,
        });
      }
    } else {
      res({
        statusCode: resp.statusCode,
        body: JSON.parse(resp.body),
      });
    }
  });
}

/*Função que cria um novo deal(pedido)*/
function addDeal(properties, res) {
  const deal = {
    properties: properties,
  };
  var request = require("request");

  var options = {
    method: "POST",
    url: "https://api.hubapi.com/crm/v3/objects/deals",
    qs: { hapikey: "ffdfdd87-f540-403c-8427-acc9eb296971" },
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify(deal),
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
}

function getDeal(dealId, res) {
  var options = {
    method: "GET",
    url: `https://api.hubapi.com/crm/v3/objects/deals/${dealId}?hapikey=ffdfdd87-f540-403c-8427-acc9eb296971`,
    headers: { accept: "application/json" },
  };

  request(options, (error, resp) => {
    if (!error) {
      let pedido = JSON.parse(resp.body);
      let data = pedido.properties;

      const id = {
        dealId: data.hs_object_id
      }
      console.log(data)
      res({
        'dealId': id
      });
    } else {
      res({
        'statusCode': res.statusCode,
        'body': JSON.parse(res.body)
      })
    }
  });
}

function updateDeal(dealId, id, res) {

  var options = {
    method: 'PUT',
    url: `https://api.hubapi.com/deals/v1/deal/${dealId}?hapikey=ffdfdd87-f540-403c-8427-acc9eb296971`,
    headers: { accept: "application/json", 'content-type': 'application/json' },
    body: {
      properties:
        [
          { name: "arq_id", value: id }
        ]
    },
    json: true
  };


  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send({
      message: "Architect associated with success",
      arq_id: id
    });
  })
}


module.exports = {
  getClients: getClients,
  getClientByID: getClientByID,
  existsClientByEmail: existsClientByEmail,
  existsClientNif: existsClientNif,
  addClient: addClient,
  updateClient: updateClient,
  getClients: getClients,
  getClientByEmail: getClientByEmail,
  addDeal: addDeal,
  getDeal: getDeal,
  updateDeal: updateDeal,
};
