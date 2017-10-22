var fs = require("fs");
var request = require("request");
var config = require("../config/index.js");
const redis = require("../redis");
const Util = require("../utils/index.js");




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
    console.log(ctx.request.body);
    let body = ctx.request.body;
    let code = body.code;
    let resultStr = await getOpenId(code);
    let resultObj = JSON.parse(resultStr);

    //如果存在session_key,说明登录成功
    if (resultObj.session_key) {
        //生成3rd_session_key就是redisKey
        var redisKey = Util.md5Decode(resultStr);
        let setResult = await redis.set(redisKey, resultStr, 'EX', 7200);
        console.log(setResult);
        Util.returnApi(ctx, {
            code: 200,
            data: {
                session_key : redisKey
            },
            msg: "获取session_key成功"
        })
    } else {
        Util.returnApi(ctx, {
            code: 201,
            data: {},
            msg: "登录失败"
        })
    }


    console.log(typeof resultObj);

    console.log( resultObj);

}


var loginModule = {
    login: login
}

module.exports = loginModule;