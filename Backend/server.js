const express = require("express");
const cors = require ("cors");
const bp = require("body-parser");
const swal = require("sweetalert");
const server = express();
const port = 8080;
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));
const connectDB = require("./Config/connection");
const userRoutes = require("./Routes/UserRoutes");
const cookieParser = require('cookie-parser');


server.use(cookieParser());
server.use(cors({exposedHeaders: ['Location'],
credentials: true, 
origin: 'http://localhost:8080'
}));

server.use("/user", userRoutes);
connectDB();



server.listen(port, () => {
  console.log("O servidor esta a escuta na porta " + port);
});
