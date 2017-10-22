const redis = require("../redis");
const Util = require("../utils/index.js");

async function publish(ctx, next) {
    console.log(ctx);
    console.log("---body---", ctx.request.body);

    //登录校验，获取用户信息
    var loginInfo = await Util.loginCheck(ctx);

    //如果没登录信息，结束
    if (!loginInfo) return false;

    console.log("--loginInfo--", loginInfo);    
}

var publishModel = {
    publish: publish
}

module.exports = publishModel;