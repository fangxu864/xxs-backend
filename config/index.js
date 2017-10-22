const argv = require('yargs').argv;

exports.MONGODB = {
	uri: `mongodb://fangxu:${argv.pwd}@118.31.5.72/xxs`,
	username: argv.db_username || 'DB_username',
	password: argv.db_password || 'DB_password'
}

exports.xxsInfo = {
	appId: "wx3ccc43b68911b51a",
	secret: "ab0cb5d81b60839932929d6ec70e57f9"
}