const express = require("express");
const router = express.Router();
//const isLogged = require("../Middleware/isLogged");
const googleapisController=require("../Controllers/googledocsapi");
const googledriveController=require("../Controllers/googledrveapi");

router.post("/inserirDados",googleapisController.inserirDados);
//router.get("/downloadFile", googledriveController.download)


module.exports = router;