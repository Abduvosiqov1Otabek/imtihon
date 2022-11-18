const router = require("express").Router()
const path = require("path")

const registerController = require(path.join(__dirname, "..", "controllers", "register.js"))


router.get("/register", registerController.GET)
router.post("/register", registerController.POST)

module.exports = router