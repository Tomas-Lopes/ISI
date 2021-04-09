const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userControllers");

router.post("/login", userController.Login)
router.post("/register", userController.Register)

module.exports = router;