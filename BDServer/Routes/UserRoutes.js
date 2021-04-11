const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userControllers");

router.post("/login", userController.Login)
router.post("/register", userController.Register)
router.post("/editUser", userController.EditUser)

module.exports = router;