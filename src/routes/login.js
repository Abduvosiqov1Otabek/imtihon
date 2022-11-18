const router = require("express").Router()
const path = require("path")

const loginController = require(path.join(__dirname, "..", "controllers", "login.js"))


router.get("/login", loginController.GET)
router.post("/login", loginController.POST)

module.exports = router