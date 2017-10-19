var fs = require("fs");
var request = require("request");


function getOpenId(code) {
    return new Promise((resolve, reject) => {
        request(`https://api.weixin.qq.com/sns/jscode2session?appid=wx3ccc43b68911b51a&secret=ab0cb5d81b60839932929d6ec70e57f9&js_code=${code}&grant_type=authorization_code`, function (error, response, body) {
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
    let result = await getOpenId(code);

    console.log(result);

}


var loginModule = {
    login: login
}

module.exports = loginModule;