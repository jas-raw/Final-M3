const express = require('express'),
    app = express(),
    cors = require('cors'),
    http = require('http').Server(app)
    config = require('./config/config'),
    db = require('./database/database'),
    io = require('socket.io')(http,{
        cors:{
            origins:['http://localhost:4200/']
        }
    }),
    socket = require("./controller/match.socket.controller")

socket.start(io)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use("/api", require('./routes/index'))

http.listen(config.port, () => {
    console.log(`Server is running in port ${config.port}`);
});