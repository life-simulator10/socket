require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3000;


const server = http.createServer(app);
const io = new Server(server);

//socket.io
io.on("connection", (socket) => {
    socket.on("user-message", (data) => {
        io.emit("messages", {
            user: data.user,
            message: data.message
        });
    });
});

app.use(express.static("public"))

app.get("/", (req, res) => {
    return res.sendFile('./public/index.html')
})


server.listen(3000, () => {
    console.log("You are listening on the port 3000", PORT)
})