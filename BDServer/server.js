const express = require("express");
const bp = require('body-parser');
const server = express();
const port = 3000;
server.use(bp.json())
server.use(bp.urlencoded({ extended: true }))
const connectDB = require("./Config/connection");
const userRoutes = require("./Routes/UserRoutes");


server.use("/user", userRoutes);

connectDB();



server.listen(port,()=>{
    console.log("O servidor esta a escuta na porta " + port );
});