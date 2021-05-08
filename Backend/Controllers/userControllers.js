const User = require("../Models/User");
const Bcrypt = require("bcryptjs");
const clientCookie = require("../Config/cookie");
const hubspot = require('./hubspotController');
const { getClientByEmail } = require("./hubspotController");
const request = require("request");

async function Login(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    const userpass = user.password;
    if (!user) {
      return res.send("User doesnt exist in DataBase");
    } else {
      const validPassword = async function (userpass, password) {
        return await Bcrypt.compare(password, userpass);
      }
      if (await validPassword(user.password, password)) {

        hubspot.getClientByEmail(email, (result) => {
          if (result.user) {
            let userF = {
              id: result.user.user_id,
              email: user.email,
              firstname: result.user.firstname,
              lastname: result.user.lastname,
              phone: result.user.phone,
              address: result.user.address,
              nif: result.user.nif,
            }

            clientCookie.setCookie(req, res, user);
            return res.send({
              message: "Logged in sucessfully",
              user: userF,
            });
          } else {
            res.send("User not found")
          }
        })
      } else {
        res.send("Password invalid")
      }
    }
  } catch (error) {
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
                    phone: numTel
                  }
                },
                json: true
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

                  })
                  user.save();
                  res.status(201).send(body);
                } else {
                  res.status(400).send(err);
                }
              });
            })
          })
        }
      })
    }
  })
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
    nome != null && email != null && numTel != null && morada != null && localidade != null) {
    clientCookie.readCookie(req, async function (cb) {
      if (cb) {
        const user = getClientByID(user_id, res);
        console.log(user_id);
        if (!user) {
          return res.status(400).send("Nao existe user com esse id")
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
            phone: numTel
          };

          hubspot.updateClient(user_id, properties, res);
          return res.send("User editado com sucesso");
        }
      } else {
        return res.status(400).send("User nao esta logado");
      }
    })

  }
}

function getUsers(req, res) {
  const user_id = req.user.email;

  hubspot.getClients((resp) => {
    if (resp.users) {
      const users = resp.users;
      let usersF = [];

      for (let i = 0; i < users.length; i++) {
        if (user_id != users[i].id) {
          usersF.push(users[i]);
        }
      }
      res.status(200).send({
        'users': usersF
      })
    } else {
      res.status(resp.statusCode).send(resp.body);
    }
  })
}

async function getArq(req, res) {
  const arqs = await User.find({ cargo: "arquiteto" }, { email: 1, nome: 1 });
  res.send(arqs);

}

function newProj(req, res) {

  const amount = req.body.amount;
  const closedate = req.body.closedate;
  const dealname = req.body.dealname;
  const dealstage = req.body.dealstage;
  const description = req.body.description;
  const project_type = req.body.project_type;

  const properties = {
    amount: amount,
    closedate: closedate,
    dealname: dealname,
    dealstage: dealstage,
    description: description,
    project_type: project_type,
    hubspot_owner_id: "69176641",
    pipeline: "default",
    arq_id: "0"
  }

  hubspot.addDeal(properties, res)
  res.send("Projeto adicionado com sucesso");
}

function associarArquiteto(req, res) {

  const id_arquiteto = req.body.arq_id;
  const id_pedido = req.body.dealId;

  hubspot.updateDeal(id_pedido, id_arquiteto, res);

}


function getPedidos(req, res) {

  let options = {
    method: "GET",
    url: `https://api.hubapi.com/crm/v3/objects/deals?hapikey=ffdfdd87-f540-403c-8427-acc9eb296971`,
    //qs: {limit: '100', archived: 'false', hapikey: 'ffdfdd87-f540-403c-8427-acc9eb296971'},
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  request(options, function (error, body) {
    if (error) throw new Error(error);
    res.send(JSON.parse(body.body))
  });

}

function changeState(req, res){

  const newState = req.body.state;
  const id_pedido = req.body.dealId;
  
  hubspot.updateDealState(id_pedido, newState, res)

}


module.exports = {
  Login: Login,
  Register: Register,
  EditUser: EditUser,
  Logout: Logout,
  getUsers: getUsers,
  newProj: newProj,
  associarArquiteto: associarArquiteto,
  getPedidos: getPedidos,
  getArq: getArq,
  changeState: changeState,
};



