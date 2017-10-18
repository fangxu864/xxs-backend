
const redis = require("../redis");
async function main(ctx, next) {
    await redis.set("name", "首页121212");
    var name = await redis.get("name");
    console.log(name)
    ctx.response.body = name;
}


module.exports = main;