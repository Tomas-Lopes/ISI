const User = require("../Models/User");
const Bcrypt = require("bcryptjs");
const clientCookie = require("../Config/cookie");
const hubspot = require('./hubspotController');

async function Login(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  
  try {
    const user = await User.findOne({ email: email });
    //const userpass = user.password;
    if (!user) {
      return res.send("User doesnt exist in DataBase");
    } else {
      const validPassword = async function (userpass, password) {
        return await Bcrypt.compare(password, userpass);
      }
        if (await validPassword (user.password, password)) {
          hubspot.getClientByID (user._id, (res) => {
            if (res.user) {
              let userF = {
                contactId: user._id,
                email: user.email,
                nome: res.user.nome,
                apelido: res.user.apelido,
                numero_telefone: res.user.numero_telefone,
                nif: res.user.nif,
            }
            clientCookie.setCookie(req,res,user);
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

function Register(req, resp) {

  const nome = req.body.nome;
  const apelido = req.body.apelido;
  const password = req.body.password;
  const email = req.body.email;
  const nif = req.body.nif;
  const numTel = req.body.numTel;
  const morada = req.body.morada;
  //const localidade = req.body.localidade;

  hubspot.existsClientByEmail(email, (res) => {
    if (!res.exists) {
      hubspot.existsClientNif(nif, (res) => {
        if (!res.exists) {
          let pass = "";
          Bcrypt.genSalt(10, function(err, salt) {
            Bcrypt.hash(password, salt, function (err, hash) {
              pass = hash;
              const properties = `{
                "properties": {
                  "firstname": "${nome}",
                  "lastname": "${apelido}",
                  "email": "${email}",
                  "password": "${pass}",
                  "company": "MCA Group",
                  "website": "vgbhjjk",
                  "nif" : "${nif}",
                  "address" : "${morada}",
                  "phone": "${numTel}",
                }
              }`;
     
    hubspot.addClient(properties, (res) => {
      if(res.statusCode == 201) {
        const user = new User({
          nome: req.body.nome,
          apelido: req.body.apelido,
          email: req.body.email,
          password: hashedPassword,
          nif: req.body.nif,
          numTel: req.body.numTel,
          morada: req.body.morada,
          localidade: req.body.localidade,
        })
        user.save();
        resp.send({
          'statusCode': 201,
          'body': {
            'message': 'Criado com sucesso'
          }
        });
      } else {
        if(res.statusCode == 400) {
          resp.send({
            'statusCode': 400,
            'body': {
            'message': 'Contacto existente'
            }
          });
        }
      }
    });
            });
          });
        } else {
          resp.status ({
            'statusCode': 400,
            'body': {
            'message': 'Nif em uso'
            }
          });
        }
      });
    } else {
      resp.status ({
        'statusCode': 409,
        'body': {
        'message': 'Email em uso'
        }
      });
    }
  })
}

async function Logout(req, res){
  clientCookie.deleteCookie(req, res);
  res.status(200).send("ok");
}

function EditUser(req, res) {
  
    const nome = req.body.nome;
    const apelido = req.body.apelido;
    const email = req.body.email;
    //const password = req.body.password;
    const nif = req.body.nif;
    const numTel = req.body.numTel;
    const morada = req.body.morada;
    const localidade = req.body.localidade;

    const user_id = req.user.user_id;

    const updateData  = [{
      'property': 'firstname',
      'value': nome
  }, {
      'property': 'lastname',
      'value': apelido
  }, {
      'property': 'email',
      'value': email
  }, {
      'property': 'nif',
      'value': nif
  }];

  hubspot.updateClient(user_id, updateData, (res) => {
    if (res.statusCode == 200) {
        response.status(200).send({
            'message': 'Data updated with success'
        })
    } else {
        response.status(res.statusCode).send(res.body);
    }
})

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

