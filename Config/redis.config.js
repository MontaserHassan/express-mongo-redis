const Redis = require('ioredis');


const redisClient = new Redis({
    host: 'redis-14100.c280.us-central1-2.gce.cloud.redislabs.com',
    port: 14100,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
});



module.exports = {
    redisClient
};