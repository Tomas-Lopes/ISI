const User = require("../Models/User");
const Bcrypt = require("bcryptjs");

async function Login(req, res) {
  try {
    const user = await User.findOne({email:req.body.email})
    if (!user) return res.send("User doesnt exist in DataBase")
    const validPassword = await Bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.send("Password not valid")
    return res.send({
      message:"Logged in sucessfully",
      user:user
    });
  } catch (error) {
    return res.send(error);
  }
}

async function Register(req, res) {
  try {
    const emailExists = await User.findOne({email:req.body.email})
    if (emailExists) return res.send("Email already exists in DataBase")
    if (req.body.password != req.body.passwordConf) return res.send("Passwords do not match");
    const salt = await Bcrypt.genSalt(10);
    const hashedPassword = await Bcrypt.hash(req.body.password, salt);
    const user = new User({
      email: req.body.email,
      password: hashedPassword
    });
    user.save();
    return res.send("User Created Sucessfully");
  } catch (error) {
    return res.send(error);
  }
}

module.exports = {
  Login: Login,
  Register: Register,
};
