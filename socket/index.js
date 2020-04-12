const app = require('../index');
const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app.callback());
const io = socketio(server);
const {addMessage} = require('../services/messages');
io.on('connection', function (socket) {
    console.log('a user connected')
    let userID = ''
    socket.on('join', function (userName) {
        userID = userName;
        io.emit('sys', userID + '已加入房间');
        console.log(userID + '加入了');
    });
    socket.on('message', function (msg){
        let rsg = msg;
        io.broadcast.emit('msg', rsg);
        console.log(rsg);
        addMessage(userID, rsg);
    })
})

module.exports = server;
