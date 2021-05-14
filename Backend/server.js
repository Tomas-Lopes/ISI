const express = require("express");
const bp = require("body-parser");
const swal = require("sweetalert");
const server = express();
const port = 8080;
const connectDB = require("./Config/connection");
const userRoutes = require("./Routes/UserRoutes");
const cookieParser = require('cookie-parser');
const googleapi=require("./Routes/googleapi");

server.use(bp.json(), bp.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(function (req, res, next) { //
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.header("Access-Control-Allow-Headers", "append,delete,entries,foreach,get,has,keys,set,values,Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
})

server.use("/user", userRoutes);
server.use("/google", googleapi);
connectDB();



server.listen(port, () => {
  console.log("O servidor esta a escuta na porta " + port);
});
