const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userControllers");
const isLogged = require("../Config/isLogged");

router.post("/login", userController.Login)
router.post("/register", userController.Register)
router.post("/editUser", isLogged, userController.EditUser)
router.get("/logout", userController.Logout)

module.exports = router;