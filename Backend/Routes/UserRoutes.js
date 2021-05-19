const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userControllers");
const hubspotController = require("../Controllers/hubspotController");
//const userController = require("../Controllers/hubspotController");
const isLogged = require("../Middleware/isLogged");
const isArq = require("../Middleware/isArq");
const isGes = require("../Middleware/isGes");
const isCam = require("../Middleware/isCam");
const con = require("../Config/ConnectionSF");
const moloniController = require("../Controllers/moloniController");
const SF = require("../Controllers/salesForceController");

router.post("/login", userController.Login)
router.post("/register", userController.Register)
//router.post("/registerArquiteto", userController.RegisterArquiteto)
router.post("/editUser", isLogged, userController.EditUser)
router.post("/newProject", isLogged, userController.newProj)

router.get("/pedidos", userController.getPedidos)
router.get("/logout", userController.Logout)
router.get("/clients", userController.getClientes)
router.get("/arquitetos", userController.getArq)
router.get("/projetosArquiteto", SF.pedidosArquiteto)


router.put("/associarArq", userController.associarArquiteto)
router.put("/alterarEst", userController.changeState)

router.get("/pedidosCamara", moloniController.getProducts)
router.post("/pedidosEnviados", moloniController.inserirDadosProjetos)

router.get("/testezao", hubspotController.getDeal)

module.exports = router;