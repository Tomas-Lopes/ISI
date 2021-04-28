const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userControllers");
//const userController = require("../Controllers/hubspotController");
const isLogged = require("../Config/isLogged");

router.post("/login", userController.Login)
router.post("/register", userController.Register)
router.post("/editUser", isLogged, userController.EditUser)
router.post("/newProject", isLogged, userController.newProj)
router.get("/pedidos", userController.getPedidos)
router.get("/logout", userController.Logout)
router.get("/users", userController.getUsers)
router.get("/arquitetos", userController.getArq)


module.exports = router;