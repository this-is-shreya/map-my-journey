const router = require("express").Router()
const { login, signUp,logout } = require("../controllers/auth")

router.post("/login",login)
router.post("/signup",signUp)
router.post("/logout",logout)

module.exports = router