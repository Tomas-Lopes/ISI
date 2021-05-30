const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userControllers");
const hubspotController = require("../Controllers/hubspotController");
//const fileController = require("../Controllers/filesController");

const isLogged = require("../Middleware/isLogged");
const isArq = require("../Middleware/isArq");
const isGes = require("../Middleware/isGes");
const isCam = require("../Middleware/isCam");
const con = require("../Config/ConnectionSF");
const moloniController = require("../Controllers/moloniController");
const SF = require("../Controllers/salesForceController");

router.post("/login", userController.Login)
router.post("/register", userController.Register)
router.post("/editUser", isLogged, userController.EditUser)
router.post("/newProject", isLogged, userController.newProj)
router.post("/guardarURLSf", userController.guardarURLSf)
router.post("/guardarURLMoloni", userController.guardarURLMoloni)

router.get("/pedidos", userController.getPedidos)
router.get("/logout", userController.Logout)
router.get("/clients", userController.getClientes)
router.get("/arquitetos", userController.getArq)
router.get("/projetosArquiteto", SF.pedidosArquiteto)


router.put("/associarArq", userController.associarArquiteto)
router.put("/alterarEstSF", userController.changeStateSF)
router.put("/alterarEstHubspot", userController.changeStateHubspot)

router.post("/pedidosCamara", moloniController.getProducts)
router.get("/projetos", userController.getProjetos);
router.get("/rejeitados", userController.getPedidosRejeitados);
router.get("/pedidosCliente", userController.getClientePedidos)
router.post("/inserirDadosCamara", userController.migrarPedidosCamara)

router.get("/getDeal", hubspotController.getDeal)

module.exports = router;