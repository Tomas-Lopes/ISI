const express = require("express");
const router = express.Router();
//const isLogged = require("../Middleware/isLogged");
const googleapisController=require("../Controllers/googledocsapi");

router.post("/inserirDados",googleapisController.inserirDados);





module.exports = router;