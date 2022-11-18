const fs = require("fs")
const path = require("path")

const register = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "database", "register.json"), "UTF-8".trim() || "[]"))

const GET = (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.sendFile(__dirname + "/front/view/register.html")
    res.status(200).json(register)
}

const POST = (req, res) => {
    res.setHeader("Content-Type", "application/json")

    const { name, lastname, email, createPassword } = req.body

    if (!name || !lastname || !email || !createPassword) {
        return res.status(400).json({
            massage: "Name,lastname,email and createPassword invalid!",
            status: 400
        })
    }

    if (name.length < 3 || name.length > 10) {
        return res.status(400).json({
            message: "Name between 3 and 30!",
            status: 400,
            data: newUser
        });
    }

    if (typeof (name) != "string") {
        return res.status(400).json({
            message: "Name not number",
            status: 400,
        });
    }


    if (lastname.length < 3 || lastname.length > 15) {
        return res.status(400).json({
            message: "Lastname between 3 and 15!",
            status: 400,
        });
    }

    if (typeof (lastname) != "string") {
        return res.status(400).json({
            message: "LastName not number",
            status: 400,
        });
    }

    if (email.length < 3 || email.length > 30) {
        return res.status(400).json({
            message: "Email between 3 and 30!",
            status: 400,
        });
    }

    if (createPassword.length < 3 || createPassword.length > 8) {
        return res.status(400).json({
            message: "Create Password between 3 and 8!",
            status: 400,
        });
    }


    const newEmail = {
        id: register.length ? register[register.length - 1].id + 1 : 1,
        name,
        lastname,
        email,
        createPassword
    }

    register.push(newEmail)

    fs.writeFileSync(path.join(__dirname, "..", "..", "database", "register.json"), JSON.stringify(register, null, 2))
    res.status(201).json({
        massage: "Emails created!",
        status: 201
    })
}

module.exports = {
    GET,
    POST,

}