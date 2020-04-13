const app = require('../index');
const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app.callback());
const io = socketio(server);
const {addMessage} = require('../services/messages');
io.on('connection', function (socket) {
    console.log('a user connected')
    let userID = '';
    let nickname = '';
    socket.on('join', function (userName, name) {
        userID = userName;
        nickname = name;
        io.emit('sys', userID + '已加入房间');
        console.log(userID + '加入了');
    });
    socket.on('message', function (msg){
        io.sockets.emit('message', nickname , msg);
        console.log(msg);
        addMessage(userID, msg, nickname);
    })
})

module.exports = server;
