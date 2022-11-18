const express = require("express")
const path = require("path")
const fileUpload = require("express-fileupload");
const fs = require("fs");
const cors = require("cors");
const port = 4000
const app = express()

const files = JSON.parse(
    fs
        .readFileSync(path.join(__dirname, "..", "database", "file.json"), "UTF-8")
        .trim() || "[]"
);

const loginRouter = require(path.join(__dirname, "routes", "login.js"))
const registerRouter = require(path.join(__dirname, "routes", "register.js"))

app.use(express.static((__dirname, "..", "front")))
app.use(express.json())
app.use(cors());
app.use(fileUpload());
app.use(loginRouter)
app.use(registerRouter)

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.sendFile(__dirname + "../front/view/index.html");
});

app.get("/files", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(files);
});

app.get("/downloads/:filePath", (req, res) => {
    res.download(path.join(__dirname, "..", "files", req.params.filePath));
});


app.post("/upload", (req, res) => {
    const { file } = req.files;
    const fileName = new Date().getTime() + file.name;
    file.mv(path.join(__dirname, "..", "files", fileName));

    const newFile = {
        id: files.length ? files[files.length - 1].id + 1 : 1,
        title: req.body.title,
        path: fileName,
    };

    files.push(newFile);

    fs.writeFileSync(
        path.join(__dirname, "..", "database", "file.json"),
        JSON.stringify(files, null, 2)
    );
    res.status(201).json({
        message: "New file created!",
        status: 201,
    });
});


app.listen(port, () => console.log("Server ishlayapti!!! http://localhost:", port))