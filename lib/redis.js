const Redis = require('ioredis');
const config = require('../conf/config');

class Store{
    constructor(space) {
        this.redis = new Redis(config.redisConfig.toConfig());
        this.space = space;
    }

    async get(key){
        let data = await this.redis.get(`${this.space}:${key}`);
        return JSON.parse(data);
    }

    async set(key, value, maxAge){
        await this.redis.set(`${this.space}:${key}`, JSON.stringify(value), 'EX', maxAge/1000);
        return key;
    }

    async destroy(key) {
        return await this.redis.del(`${this.space}:${key}`);
    }
}

module.exports = Store;
