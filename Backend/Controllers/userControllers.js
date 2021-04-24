const User = require("../Models/User");
const Bcrypt = require("bcryptjs");
const clientCookie = require("../Config/cookie");
const hubspot = require('./hubspotController');
const { getClientByEmail } = require("./hubspotController");

async function Login(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  
  const user = hubspot.getClientByEmail(email, res);
  console.log (user);
  const validPassword = async function (userpass, password) {
    return await Bcrypt.compare(password, userpass);
  }
  if (await validPassword(user.password, password)) {
    hubspot.getClientByEmail(email, (res) => {
      if (res.user) {
        let userF = {
          contactId: id,
          email: user.email,
          nome: resp.user.nome,
          apelido: resp.user.apelido,
          numero_telefone: resp.user.numero_telefone,
          morada: resp.user.morada,
          nif: resp.user.nif,
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

function Register(req, res) {

  const nome = req.body.firstname;
  const apelido = req.body.lastname;
  const password = req.body.password;
  const email = req.body.email;
  const nif = req.body.nif;
  const numTel = req.body.phone;
  const morada = req.body.address;
  //const localidade = req.body.localidade;

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
                nif: nif,
                address: morada,
                phone: numTel
              };

              hubspot.addClient(properties, res);
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

/* ACABAR DEPOIS
function recoverPass (req, res) {
  const email = req.sanitize ('email').escape();
  const emailExists = User.findOne ({email: email});

  if (!err) {
    hubspot.getClientByID()
    if (res.user) {
      const link = generateLink();
      let validade = new Date();
      validade.setMinutes(validade.getMinutes() + 15);
      const post = {
        idUtilizador: res.user.user_id,
        link: link,
        validade: validade
      }
    }
  }

}
*/
/* 
Função que verifica se a password é válida
*/
/*
const validPassword = async function (userpass, password) {
  return await Bcrypt.compare(password, userpass);
}
*/
module.exports = {
  Login: Login,
  Register: Register,
  EditUser: EditUser,
  Logout: Logout,
  getUsers: getUsers
};

