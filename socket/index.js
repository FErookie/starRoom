const app = require('../index');
const socketio = require('socket.io');
const server = http.createServer(app.callback());
const io = socketio(server);

io.on('connection', client => {
    client.on('message', async function (message) {
    });

    client.on('xxx', async function (message) {
    });

    client.on('disconnect', async function () {
    });
});

module.exports = server;
