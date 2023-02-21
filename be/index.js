// import { Server } from "socket.io";
import express from "express";
import http from "http";
import dotenv from "dotenv";
import routes from "./routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import { getUserById, saveUserIfNotExist, userLogout } from "./user.js";

dotenv.config();

const expressApp = express();
expressApp.use(cors())
expressApp.use(bodyParser.json())
expressApp.use(routes)
const  server = http.createServer(expressApp);
const io = new Server(server, {
    cors : {
        origin : ["http://localhost:5173"]
    }
});


io.on("connection", (socket) => {

    console.log("new connection "+socket.id);

    socket.on("join",({username, room},callback)=> {
        console.log(socket.id+" join the room");
        const result = saveUserIfNotExist({username, room, id: socket.id})
        socket.join("tes");
        io.to("tes").emit("message",{sender:"admin", message: `${username} joined the chat`})
        callback(result);
    });

    socket.on("message:send", ({user, message},callback) => {
        console.log( {sender: user.username, message})
        console.log("room : "+user.room);
        io.in("tes").emit("message",{sender:"admin", message:`tes`})
        console.log("ngirim msg")
        callback();
    }); 


    socket.on("disconnect", (dfs) =>{
        console.log("user "+socket.id+" disconnected")
    })
})

server.listen(5000, () => {
    console.log("listening")
})