const express = require("express");
const router = express.Router();

const authController = require("../controllers/authControllers.js");

router.post("/register", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.protect, authController.logout);
router.patch("/update/:id", authController.protect, authController.updateUser);
router.delete("/delete/:id", authController.protect, authController.deleteUser);

module.exports = router;
