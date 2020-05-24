/**Routes that handler Authentication....  */

const express = require("express");

const authController = require("../controllers/auth-controller");

const router = express.Router();

//get the login page.
router.get("/", authController.getLogin);

//login
router.post("/", authController.postLogin);

//logout
router.get("/logout", authController.postLogout);

module.exports = router;
