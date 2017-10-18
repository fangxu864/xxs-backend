var Redis = require('ioredis');
var redis = new Redis({
    port: 6379,          // Redis port 
    host: '118.31.5.72',   // Redis host 
    family: 4,           // 4 (IPv4) or 6 (IPv6) 
    password: 'fang1212',
    db: 0
});

module.exports = redis;