const env = process.env.NODE_ENV || 'development';
const path = require('path');
const root = path.resolve(__dirname, '../');
const logDir = path.join(root, 'log');//日志部分可以以后再写

module.exports = {
    db: {
        name: 'postgres',
        username: 'postgres',
        pwd: 'postgres',
        host: '127.0.0.1',
        database: 'stardb'
    },
    toUrl() {
        const config = this[env];
        return `${config.name}://${config.username}:${config.pwd}@${config.host}/${config.database}`;
    },
    redisConfig: {
        host: '127.0.0.1',
        port: '6379',
        password: '',
        toConfig() {
            if (this.password === '') {
                return `redis://${this.host}:${this.port}`
            } else {
                return `redis://:${this.password}@${this.host}:${this.port}`;
            }
        }
    },
    fileUpload: {
        images: path.join(root, 'public', 'images')
    }
};
