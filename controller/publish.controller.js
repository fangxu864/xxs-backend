const redis = require("../redis");
const Util = require("../utils/index.js");

async function publish(ctx, next) {

    //登录校验，获取用户信息
    var loginInfo = await Util.loginCheck(ctx);

    //如果没登录信息，结束
    if (!loginInfo) return false;
 
}

var publishModel = {
    publish: publish
}

module.exports = publishModel;