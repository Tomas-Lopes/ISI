const User = require("../Models/User");
const Bcrypt = require("bcryptjs");
const clientCookie = require("../Config/cookie");

async function Login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send("User doesnt exist in DataBase");
    const validPassword = await Bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
    return res.send("Password not valid");
    }
    clientCookie.setCookie(req,res,user);
    return res.send({
      message: "Logged in sucessfully",
      user: user,
    });
  } catch (error) {
    return res.send(error);
  }
}

async function Register(req, res) {
  try {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.send("Email already exists in DataBase");
    if (req.body.password != req.body.passwordConf)
      return res.send("Passwords do not match");
    const salt = await Bcrypt.genSalt(10);
    const hashedPassword = await Bcrypt.hash(req.body.password, salt);
    const user = new User({
      nome: req.body.nome,
      email: req.body.email,
      password: hashedPassword,
      nif: req.body.nif,
      numTel: req.body.numTel,
      morada: req.body.morada,
      localidade: req.body.localidade,
    });
    user.save();
    return res.send("User Created Sucessfully");
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

module.exports = {
  Login: Login,
  Register: Register,
  EditUser: EditUser,
  Logout: Logout
};
