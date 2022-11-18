const fs = require("fs")
const path = require("path")

const login = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "database", "login.json"), "UTF-8".trim() || "[]"))



const GET = (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(login)
}





const POST = (req, res) => {
    res.setHeader("Content-Type", "application/json")

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            massage: "email and password invalid!",
            status: 400
        })
    }

    if (email.length < 3 || email.length > 30) {
        return res.status(400).json({
            message: "Email between 3 and 30!",
            status: 400,
        });
    }

    if (password.length < 3 || password.length > 8) {
        return res.status(400).json({
            message: "Password between 3 and 30!",
            status: 400,
        });
    }


    const newEmail = {
        id: login.length ? login[login.length - 1].id + 1 : 1,
        email,
        password
    }

    login.push(newEmail)

    fs.writeFileSync(path.join(__dirname, "..", "..", "database", "users.json"), JSON.stringify(login, null, 2))
    res.status(201).json({
        massage: "Emails created!",
        status: 201
    })
}


module.exports = {
    GET,
    POST
}