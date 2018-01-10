var fs = require("fs");
var request = require("request");
var config = require("../config/index.js");
const redis = require("../redis");
const Util = require("../utils/index.js");

var userModel = require("../model/user.model.js");





function getOpenId(code) {
    return new Promise((resolve, reject) => {
        request(`https://api.weixin.qq.com/sns/jscode2session?appid=${config.xxsInfo.appId}&secret=${config.xxsInfo.secret}&js_code=${code}&grant_type=authorization_code`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            } else {
                reject(error)
            }
        })

    })
}

async function login(ctx, next) {
    let body = ctx.request.body;
    let code = body.code;

    if (!code) {
        Util.returnApi(ctx, {
            code: 201,
            data: {},
            msg: "code缺失"
        })
    }

    var resultStr = await getOpenId(code);
    var resultObj = JSON.parse(resultStr);
    //如果存在session_key,则向wx服务器获取成功
    if (resultObj.session_key) {

        //根据wxOpenid查库，如果存在，则取回userId存到session，否则新建一个用户、查库、存session
        var userModelRes = await userModel.find({ "wxOpenId": resultObj.openid }, { userId: 1 });
        if (Util.judgeTrue(userModelRes)) {
            resultObj["userId"] = userModelRes[0]["userId"];
            resultStr = JSON.stringify(resultObj);
        } else {
            var user = new userModel({
                wxOpenId: resultObj.openid
            });
            var saveRes = await user.save();
            if (saveRes) {
                let userModelRes = await userModel.find({ "wxOpenId": resultObj.openid }, { usrId: 1 });
                if (Util.judgeTrue(userModelRes)) {
                    resultObj["userId"] = userModelRes[0]["userId"];
                    resultStr = JSON.stringify(resultObj);
                }
            }
        }

        //生成3rd_session_key就是redisKey
        var redisKey = Util.md5Decode(resultStr);

        let setResult = await redis.set(redisKey, resultStr, 'EX', 7200);

        Util.returnApi(ctx, {
            code: 200,
            data: {
                session_key: redisKey
            },
            msg: "获取session_key成功"
        })

    } else {
        Util.returnApi(ctx, {
            data: {},
            code: 201,
            msg: "登录失败"
        })
    }


}


var loginModule = {
    login: login
}

module.exports = loginModule;