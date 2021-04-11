const User = require("../Models/User");
const Bcrypt = require("bcryptjs");

async function Login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send("User doesnt exist in DataBase");
    const validPassword = await Bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.send("Password not valid");
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

async function EditUser(req, res) {
  try {
    const nome = req.body.nome;
    const email = req.body.email;
    const password = req.body.password;
    const numTel = req.body.numTel;
    const morada = req.body.morada;
    const localidade = req.body.localidade;

    if (
      nome != null && email != null && numTel != null && morada != null && localidade != null) {
      const updatedUser = new User({
        nome: req.body.nome,
        email: req.body.email,
        password: hashedPassword,
        nif: req.body.nif,
        numTel: req.body.numTel,
        morada: req.body.morada,
        localidade: req.body.localidade,
      });
      updatedUser.save();
      return res.send("User editado com sucesso");
    }
  } catch (error) {
    return res.send(error);
  }
}

module.exports = {
  Login: Login,
  Register: Register,
  EditUser: EditUser,
};
