var userModel = require("../model/user.model.js");



/**
 * 设置
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
async function set(ctx, next) {
    var param = ctx.query;

    var username = param.name;

    var user = new userModel({
        username : username,                 //用户账号
        userpwd: '121212',                            //密码
        userage: 25,                                //年龄
        logindate : new Date()                      //最近登录时间
    });

    var result = await user.save();
    if (result) {
        ctx.response.body = `插入  ${username} 成功！`
    }
}


/**
 * 获取
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
async function get(ctx, next) {
    var param = ctx.query;

    var username = param.name;

    let queryStr = { 'username': username };

    var result = await userModel.findOne(queryStr);
    console.log(result);
    if (result) {
        ctx.response.body = `查询结果：${JSON.stringify(result)}`
    }
}



var user = {
    get: get,
    set: set
}

module.exports = user;