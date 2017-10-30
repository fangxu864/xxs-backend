const redis = require("../redis");
async function fangxu(ctx, next) {

    var param = ctx.query;
    console.log(param);

    await redis.set("name", param.key);
    var name = await redis.get("name");
    console.log(name)
    ctx.response.body = name;
}


module.exports = fangxu; 