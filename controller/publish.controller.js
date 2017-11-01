const redis = require("../redis");
const Util = require("../utils/index.js");
const publishModel = require("../model/publish.model.js");

async function publish(ctx, next) {

    var body = ctx.request.body;

    //登录校验，获取用户信息
    var loginInfo = await Util.loginCheck(ctx);

    //如果没登录信息，结束
    if (!loginInfo) return false;

    console.log(typeof body);
    console.log("--body---", body);

    var sessionKey = ctx.request.header["session-key-xxs"];
    var sessionInfo = await redis.get(sessionKey);
    console.log(sessionKey);
    console.log(sessionInfo);
    console.log(JSON.parse(sessionInfo));


    var publishData = Object.assign({
        publishStatus: 2,
        publishUser: JSON.parse(sessionInfo).userId
    },body)

    var publish = new publishModel(publishData);
    var saveRes = await publish.save();

    console.log(saveRes);

    ctx.response.body = "121212"
 
}

var publishController = {
    publish: publish
}

module.exports = publishController;