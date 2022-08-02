const app = require("express")()
const server = require("http").createServer(app)
const cors = require('cors')
const io = require('socket.io')(server, {
    cors : {
        origin : "*",
        credentials : true
    }
})

io.on("connection", (socket) => {
    socket.on("getReady", (count) => {
        console.log(count)
        count++;
        socket.emit("getStart", count);
    })
})
// server.use(cors())s
// server.get("/", function(req, res) {
//     res.send("hello world")
// })

server.listen(4000, ( )=>{
    console.log("server start")
});