const express = require("express")
const { register, login, logout} = require("../controller/authController")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

module.exports = router