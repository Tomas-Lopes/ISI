const User = require("../Models/User");
const Bcrypt = require("bcryptjs");
const clientCookie = require("../Config/cookie");
const hubspot = require('./hubspotController');
const { getClientByEmail } = require("./hubspotController");

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
              nome: result.user.firstname,
              apelido: result.user.lastname,
              numero_telefone: result.user.phone,
              morada: result.user.address,
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

              hubspot.addClient(properties, res);
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
  const hubspot_owner_id = req.body.hubspot_owner_id;
  const pipeline = req.body.pipeline;

  const properties = {
    amount: amount,
    closedate: closedate,
    dealname: dealname,
    dealstage: dealstage,
    hubspot_owner_id: "69176641",
    pipeline: "default",
    arq_id: "0"
  }

  hubspot.addDeal(properties, res)
  res.send("Projeto adicionado com sucesso");
}

function associarArquiteto(req, res) {

  const id_arq = req.body.arq_id;
  const id_pedido = req.body.dealId;
  const amount = req.body.amount;
  const closedate = req.body.closedate;
  const dealname = req.body.dealname;
  const dealstage = req.body.dealstage;
  //const hubspot_owner_id = req.body.hubspot_owner_id;
  //const pipeline = req.body.pipeline;
 
  hubspot.getDeal(id_pedido, (result) => {
    console.log("boa!");
    if (result.deal) {

      let properties = {
        amount: amount,
        closedate: closedate,
        dealname: dealname,
        dealstage: dealstage,
        hubspot_owner_id: "69176641",
        pipeline: "default",
        arq_id: id_arq

      }

      hubspot.updateDeal(id_pedido, properties, res);
      res.send({
        message: "Inserted with success",
        deal: properties,
      });
    } else {
      res.send("Request not found")
    }
  })
}


function getPedidos(req, resp) {

  hubspot.getDealsList(res);
  resp.send(res)

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
};



