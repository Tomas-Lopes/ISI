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

async function Register(req, res) {

  const nome = req.body.nome;
  const apelido = req.body.apelido;
  const password = req.body.password;
  const email = req.body.email;
  const nif = req.body.nif;
  const numTel = req.body.numTel;
  const morada = req.body.morada;
  const localidade = req.body.localidade;

  try {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.send("Email already exists in DataBase");
    if (req.body.password != req.body.passwordConf)
      return res.send("Passwords do not match");
    const salt = await Bcrypt.genSalt(10);
    const hashedPassword = await Bcrypt.hash(req.body.password, salt);
    
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
    const properties = {
            "firstname": req.body.nome,
            "lastname": req.body.apelido,
            "email": req.body.email,
            "company": "MCA Group",
            "website": "vgbhjjk",
            "nif" : req.body.nif,
            "address" : req.body.morada,
            "phone": req.body.numTel,             
    };
    /* campos que faltam q temos na base de dados
     "lastname": req.body.apelido,
      "company": "MCA Group",
            "website": "vgbhjjk",
            "phone": req.body.numTel, 
    "nif": "${nif}",
    "morada": "${morada}",
    "localidade": "${localidade}"*/
    hubspot.addClient(properties, res);
    user.save();

  } catch (error) {
    return res.send(error);
  }
}

async function Logout(req, res){
  clientCookie.deleteCookie(req, res);
  res.status(200).send("ok");
}

async function EditUser(req, res) {
  try {
    const nome = req.body.nome;
    const email = req.body.email;
    const numTel = req.body.numTel;
    const morada = req.body.morada;
    const localidade = req.body.localidade;
    const nif = req.body.nif;

    if (
      nome != null && email != null && numTel != null && morada != null && localidade != null) {
        clientCookie.readCookie(req, async function (cb){
          if (cb) {
            const mongoUser = await User.findById(cb._id);
            if (!mongoUser) {
              return res.status(400).send("Nao existe user com esse id")
            }
            console.log("estou aqui")
            mongoUser.set({
              nome: nome,
              email: email,
              nif: nif,
              numTel: numTel,
              morada: morada,
              localidade: localidade
            })
            console.log("continuo aqui")
            await mongoUser.save();
          return res.send("User editado com sucesso");      
          } else {
              return res.status(400).send("User nao esta logado");
          }
      })
        
    }
  } catch (error) {
    return res.send("fds po erro");
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

