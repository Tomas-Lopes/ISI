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
router.post("/editUser", isLogged, userController.EditUser)
router.post("/newProject", isLogged, userController.newProj)

router.get("/pedidos", isLogged, userController.getPedidos)
router.get("/logout", userController.Logout)
router.get("/clients", userController.getClients)
router.get("/arquitetos", userController.getArq)


router.put("/associarArq", userController.associarArquiteto)
router.put("/alterarEst", SF.alterarEstado)

 /* router.get("/teste", async (req, res) => {
    const result = await con.sobject("TesteFDS__c").find({},{Id: 1, Name: 1, Texto__c: 1, Texto2__c:1});
    return res.send(result);
})
router.post("/teste", async (req, res) => {
    const data = {
        Texto__c: req.body.texto1,
        Texto2__c:req.body.texto2
    }
    const createdTestFDS = await con.sobject("TesteFDS__c").create(data);
    if (!createdTestFDS) return res.send("fodeu")
    return res.send(createdTestFDS);
} )*/

router.get("/testezao", hubspotController.getDeal)

module.exports = router;