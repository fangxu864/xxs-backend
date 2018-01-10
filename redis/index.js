var Redis = require('ioredis');
var redisConfig = require("../config/index.js").REDIS; 
var redis = new Redis(redisConfig);

module.exports = redis;