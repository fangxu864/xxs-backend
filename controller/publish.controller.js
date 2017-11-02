const redis = require("../redis");
const Util = require("../utils/index.js");
const publishModel = require("../model/publish.model.js");

async function publish(ctx, next) {

    var body = ctx.request.body;

    console.log(body);

    //登录校验，获取用户信息
    var loginInfo = await Util.loginCheck(ctx);

    //如果没登录信息，结束
    if (!loginInfo) return false;


    var sessionKey = ctx.request.header["session-key-xxs"];
    var sessionInfo = await redis.get(sessionKey);



    var publishData = Object.assign({
        publishStatus: 2,
        publishUser: JSON.parse(sessionInfo).userId
    }, body)

    var publish = new publishModel(publishData);
    var error = publish.validateSync();

    if (error) {
        console.log("-----------error-------------",error);
        var errorMsg = error.errors[Util.getObjLastKey(error.errors)].message;
        // console.log(error);
        Util.returnApi(ctx,{
            code: 201,
            msg: errorMsg
        })
        return false;
    }

    // console.log(error);

    var saveRes = await publish.save();

    console.log("------------------------------------saveRes-----------------------",saveRes);

    Util.returnApi(ctx,{
        code: 200,
        msg: "发布成功"
    })

}

var publishController = {
    publish: publish
}

module.exports = publishController;