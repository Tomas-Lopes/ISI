const User = require("../Models/User");
const Bcrypt = require("bcryptjs");
const clientCookie = require("../Config/cookie");
const hubspot = require("./hubspotController");
const request = require("request");
const SF = require("./salesForceController");


async function loginMongo(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.send({
        message: "User doesnt exist in DataBase"
      });
    } else {
      const userpass = user.password;
      const validPassword = async function (userpass, password) {
        return await Bcrypt.compare(password, userpass);
      };
      if (await validPassword(user.password, password)) {
        let userF = {
          id: user.user_id,
          email: user.email,
          firstname: user.nome,
          lastname: user.apelido,
          phone: user.telemovel,
          address: user.morada,
          nif: user.nif,
          cargo: user.cargo,
        };
        //console.log("vou criar a cookie")
        clientCookie.setCookie(req, res, user);
        return res.send({
          message: "Logged in sucessfully",
          user: userF,
        });
      } else {
        return res.send({
          message: "Password invalid"
        });
      }
    }
  } catch (error) {
    //console.log("fodeu")
    return res.send(error);
  }
}


async function Login(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
    
      return res.send({
        message: "User doesnt exist in DataBase"
      });
    } else {
      const userpass = user.password;
      const validPassword = async function (userpass, password) {
        return await Bcrypt.compare(password, userpass);
      };
      if (await validPassword(user.password, password)) {
        hubspot.getClientByEmail(email, (result) => {
          if (result.user) {
            let userF = {
              id: result.user.user_id,
              email: user.email,
              firstname: result.user.nome,
              lastname: result.user.apelido,
              phone: result.user.telemovel,
              address: result.user.morada,
              nif: result.user.nif,
              cargo: result.user.cargo,
            };
           
            clientCookie.setCookie(req, res, user);
            return res.send({
              message: "Logged in sucessfully",
              user: userF,
            });
          } else {
            //res.send("User not found");
            //console.log("vou fazer o login do mongo")
            loginMongo(req, res);
          }
        });
      } else {
        return res.send({
          message: "Password invalid"
        });
      }
    }
  } catch (error) {
    //console.log("fodeu2")
    return res.send(error);

  }
}


function Register(req, res) {
  const nome = req.body.firstname;
  const apelido = req.body.lastname;
  const password = req.body.password;
  const email = req.body.email;
  const nif = req.body.nif;
  const numTel = req.body.phone;
  const morada = req.body.address;

  if (req.body.password != req.body.passwordConf)
    return res.send("Passwords do not match");
  hubspot.existsClientByEmail(email, (result) => {
    if (!result.exists) {
      hubspot.existsClientNif(nif, (result) => {
        if (!result.exists) {
          let pass = "";
          Bcrypt.genSalt(10, function (err, salt) {
            Bcrypt.hash(password, salt, function (err, hash) {
              pass = hash;

              var options = {
                method: "POST",
                url:
                  "https://api.hubapi.com/crm/v3/objects/contacts?hapikey=" +
                  "ffdfdd87-f540-403c-8427-acc9eb296971",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: {
                  properties: {
                    firstname: nome,
                    lastname: apelido,
                    email: email,
                    password: pass,
                    company: "MCA Group",
                    website: "vgbhjjk",
                    cargo: "cliente",
                    nif: nif,
                    address: morada,
                    phone: numTel,
                  },
                },
                json: true,
              };

              request(options, function (err, resp, body) {
                if (!err) {
                  const user = new User({
                    nome: req.body.firstname,
                    apelido: req.body.lastname,
                    email: req.body.email,
                    password: hash,
                    cargo: "cliente",
                    nif: req.body.nif,
                    numTel: req.body.phone,
                    morada: req.body.address,
                  });
                  user.save();
                  res.status(201).send(body);
                } else {
                  res.status(400).send(err);
                }
              });
            });
          });
        }
      });
    }
  });
}

async function Logout(req, res) {
  clientCookie.deleteCookie(req, res);
  res.status(200).send("ok");
}

async function EditUser(req, res) {
  const nome = req.body.nome;
  const apelido = req.body.apelido;
  const email = req.body.email;
  const numTel = req.body.phone;
  const morada = req.body.address;
  const nif = req.body.nif;
  const user_id = req.user.user_id;

  if (
    nome != null &&
    email != null &&
    numTel != null &&
    morada != null &&
    localidade != null
  ) {
    clientCookie.readCookie(req, async function (cb) {
      if (cb) {
        const user = getClientByID(user_id, res);
        console.log(user_id);
        if (!user) {
          return res.status(400).send("Nao existe user com esse id");
        } else {
          const properties = {
            firstname: nome,
            lastname: apelido,
            email: email,
            password: pass,
            company: "MCA Group",
            website: "vgbhjjk",
            cargo: "cliente",
            nif: nif,
            address: morada,
            phone: numTel,
          };

          hubspot.updateClient(user_id, properties, res);
          return res.send("User editado com sucesso");
        }
      } else {
        return res.status(400).send("User nao esta logado");
      }
    });
  }
}

async function getArq(req, res) {
  const arqs = await User.find(
    { cargo: "arquiteto" },
    { email: 1, nome: 1, id_build: 1 }
  );
  res.send(arqs);
}

/*function getClients(req, res) {
  var request = require("request")
  const returnedContacts = [];
  const API_KEY = 'ffdfdd87-f540-403c-8427-acc9eb296971'
  const count = 10;

  async function getContacts(offset) {
    if (typeof offset == 'undefined') {
      offsetParam = null;
    } else {
      offsetParam = `vidOffset=${offset}`;
    }
    const hapikeyParam = `hapikey=${API_KEY}`
    const paramsString = `?count=${count}&${hapikeyParam}&${offsetParam}`;

    const finalUrl = `https://api.hubapi.com/contacts/v1/lists/all/contacts/all${paramsString}`
    request(finalUrl, (error, response, body) => {
      if (error) {
        console.log('error', error)
        throw new Error
      }
      const parsedBody = JSON.parse(body)
      parsedBody.contacts.forEach(contact => {
        returnedContacts.push(contact);
      });
      if (parsedBody['has-more']) {
        getContacts(parsedBody['vid-offset'])
      } else {
        //print out all contacts
        console.log(returnedContacts)
        res.status(200).send({
          clients: returnedContacts,
        });
      }
    })
  };

  getContacts()
} */

/*function getClientes(req, res) {
  //hubspot.getClients(res);
  let options = {
    method: "GET",
    url: `https://api.hubapi.com/contacts/v1/lists/all/contacts/all?hapikey=ffdfdd87-f540-403c-8427-acc9eb296971`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  request.get(options, (error, resp) => {
    if (!error) {
      const users = JSON.parse(resp.body);
      console.log("aqui?");
      console.log(users);
      let usersF = [];
      for (let i = 0; i < users.length; i++) {
        console.log(users[i].nif);
        usersF.push({
          id: users[i].vid,
          name: users[i].firstname + " " + users[i].lastname,
          nif: users[i].nif,
        });
      }
      res.status(200).send(usersF);
    } else {
      console.log(err);
      res.status(400).send(err);
    }
  });
}*/

try {
  function getClientes(req, res) {
    var options = {
      method: 'GET',
      url: 'https://api.hubapi.com/crm/v3/objects/contacts',
      qs: {limit: '50', archived: 'false', hapikey: 'ffdfdd87-f540-403c-8427-acc9eb296971',
      properties: 'firstname, lastname, email, nif, phone'},
      headers: {accept: 'application/json'}
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const users = JSON.parse(body);
      res.status(200).send(users);
    }) 
  };
} catch (error) {
  console.log(error);
}

async function getArq(req, res) {
  const arqs = await User.find(
    { cargo: "arquiteto" },
    { email: 1, nome: 1, id_build: 1 }
  );
  res.send(arqs);
}

function newProj(req, res) {
  const amount = req.body.amount;
  const closedate = req.body.closedate;
  const dealname = req.body.dealname;
  const description = req.body.description;
  const project_type = req.body.project_type;
  const localizacao = req.body.address;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const id = req.body.id;
  
  var options = {
    method: "POST",
    url: "https://api.hubapi.com/deals/v1/deal",
    qs: { hapikey: "ffdfdd87-f540-403c-8427-acc9eb296971" },
    headers: { accept: "application/json", "content-type": "application/json" },
    body: {
      associations: { associatedVids: [id] },
      properties: [
        { value: dealname, name: "dealname" },
        { value: "appointmentscheduled", name: "dealstage" },
        { value: "default", name: "pipeline" },
        { value: "69176641", name: "hubspot_owner_id" },
        { value: closedate, name: "closedate" },
        { value: amount, name: "amount" },
        { value: description, name: "description" },
        { value: project_type, name: "project_type" },
        { value: localizacao, name: "localizacao" },
        { value: "0", name: "arq_id" },
        { value: "1", name: "gestorid" },
        { value: latitude, name: 'latitude'},
        { value: longitude, name: 'longitude'}
      ],
    },
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send("Projeto adicionado com sucesso");
    console.log(body);
  });
}


function associarArquiteto(req, res) {
  const id_arquiteto = req.body.arq_id;
  const id_pedido = req.body.dealId;

  hubspot.updateDeal(id_pedido, id_arquiteto, res);
  SF.migrarDeals(req, id_pedido, id_arquiteto, res);
}

function getPedidos(req, res) {
  let options = {
    method: "GET",
    url: `https://api.hubapi.com/crm/v3/objects/deals?hapikey=ffdfdd87-f540-403c-8427-acc9eb296971&limit=30`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  request(options, function (error, _body) {
    if (error) throw new Error(error);
    let array = [];
    let body = JSON.parse(_body.body);
    array = array.concat(body.results);
    
    /*let after = null;
    let next = false;
    if (body.paging){
      after = body.paging.next.after;
     
      next = true;
    }
    

    /*do{
      
      options.url = "https://api.hubapi.com/crm/v3/objects/deals?hapikey=ffdfdd87-f540-403c-8427-acc9eb296971&after="+after;

      request(options, function (_error, _body) {
        body = JSON.parse(_body.body);
        array = array.concat(body.results);
        console.log(body.paging);
        if (body.paging){
          after = body.paging.next.after;
          next = true;
        }else{next = false;}
        console.log(body.next);
      });
    }while (next);*/
    
    res.send(JSON.parse(_body.body));
  });
}

function changeState(req, res) {
  const newState = req.body.state;
  const id_pedido = req.body.dealId;

  SF.alterarEstado(id_pedido, newState, res);
  hubspot.updateDealState(id_pedido, newState, res);
}

function migrarPedidosCamara(req, res) {
  const id_pedido = req.body.dealId;
  moloni.inserirDadosProjetos(id_pedido, res);
}



/*function RegisterArquiteto(req, res) {
  const nome = req.body.firstname;
  const apelido = req.body.lastname;
  const password = req.body.password;
  const email = req.body.email;
  const nif = req.body.nif;
  const numTel = req.body.phone;
  const morada = req.body.address;

  if (req.body.password != req.body.passwordConf)
    return res.send("Passwords do not match");
  hubspot.existsClientByEmail(email, (result) => {
    if (!result.exists) {
      hubspot.existsClientNif(nif, (result) => {
        if (!result.exists) {
          let pass = "";
          Bcrypt.genSalt(10, function (err, salt) {
            Bcrypt.hash(password, salt, function (err, hash) {
              pass = hash;
              if (!err) {
                const user = new User({
                  nome: req.body.firstname,
                  apelido: req.body.lastname,
                  email: req.body.email,
                  password: hash,
                  cargo: "arquiteto",
                  nif: req.body.nif,
                  numTel: req.body.phone,
                  morada: req.body.address,
                });
                user.save();
                res.status(201).send(user);
              } else {
                res.status(400).send(err);
              }
            });
          });
        }
      });
    }
  });
}
*/
module.exports = {
  Login: Login,
  Register: Register,
  EditUser: EditUser,
  Logout: Logout,
  //getUsers: getUsers,
  getClientes: getClientes,
  newProj: newProj,
  associarArquiteto: associarArquiteto,
  getPedidos: getPedidos,
  getArq: getArq,
  changeState: changeState,
  migrarPedidosCamara: migrarPedidosCamara,
};
