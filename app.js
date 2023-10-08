const express = require("express");
const path =require("path")

const app = express();
const http=require("http");
const exp = require("constants");



app.use(express.static(path.join(__dirname,'public')))
let server=http.createServer(app);
const io= require('socket.io')(server);

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public")+"/index.html")
})

let users=0;
io.on("connection", function(socket){
    console.log("user connected");
    users++;

    io.sockets.emit("broadcast-user-number",users);

    socket.on("draw",function(value){
        socket.broadcast.emit("all_users",value);
    })

    

    socket.on("disconnect",function(){
        console.log("user disconnected bro");
        users--;
    })
})


server.listen(4500,function(){
    console.log("your server is running at http://localhost:4500")
})