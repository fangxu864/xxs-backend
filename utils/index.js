const crypto = require("crypto");
const redis = require("../redis");

var Util = {

    /**
     * md5 编码
     * 
     * @param {any} pwd 
     * @returns 
     */
    md5Decode(pwd) {
        return crypto
            .createHash("md5")
            .update(pwd)
            .digest("hex")
    },

    /**
     * 返回Api
     * 
     * @param {any} ctx 上下文
     * @param {any} opt 返回的数据
     */
    returnApi(ctx, opt) {
        let res = {
            code: opt.code || 201,
            data: opt.data || {},
            msg: opt.msg
        }
        ctx.response.body = JSON.stringify(res);
    },

    /**
     * 未登录状态处理函数
     * 
     * @param {any} ctx 
     */
    notLogin(ctx) {
        let res = {
            code: 205,
            data: {},
            msg: "未登录"
        }
        ctx.response.body = JSON.stringify(res);
    },

    /**
     * 登录校验，并且返回session信息
     * 
     */
    async loginCheck(ctx) {

        //获取小程序端传递过来的session_key
        let sessionKey = ctx.request.header["session-key-xxs"];

        //如果没有session_key返回未登录
        if (!sessionKey) return this.notLogin(ctx);

        //取得redis里面的session信息
        var redisRes = await redis.get(sessionKey);

        //如果redis里面没有session信息,通知客户端重新登录
        if (!redisRes) return this.notLogin(ctx);

        //能够走到这步说明有session信息，返回回去
        return JSON.parse(redisRes);

    }




}

module.exports = Util;