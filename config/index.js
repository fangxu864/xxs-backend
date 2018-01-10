const argv = require('yargs').argv;

exports.MONGODB = {
	uri: `mongodb://fangxu:${argv.pwd}@127.0.0.1/xxs`,
	username: argv.db_username || 'DB_username',
	password: argv.db_password || 'DB_password'
}

exports.xxsInfo = {
	appId: "wx3ccc43b68911b51a",
	secret: "ab0cb5d81b60839932929d6ec70e57f9"
}

exports.REDIS = {
	port: 6379,          // Redis port 
    host: '127.0.0.1',   // Redis host 
    family: 4,           // 4 (IPv4) or 6 (IPv6) 
    password: 'fang1212',
    db: 0
}