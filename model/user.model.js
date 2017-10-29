const mongoose = require("../mongodb").mongoose;
const Schema = mongoose.Schema;

//自增插件
const autoIncrement = require('mongoose-auto-increment');

// 自增ID初始化
autoIncrement.initialize(mongoose.connection);

var userSchema = new Schema({

    // "userId": {
    //     type: Number,
    //     required: true
    // },

    //微信开放id
    "wxOpenId": {
        type: String,
        unique: true
    },

    //用户账号
    "userName": {
        type: String,
        default: ''
    },

    //用户密码
    "userPwd": {
        type: String,
        default: "xxs123456"
    },

    //用户头像
    "userImg": {
        type: String,
    },

    //年龄
    "userAge": {
        type: Number
    },

    //联系手机
    "mobile": {
        type: String,
        validate: /\d{11}/
    },

    //最近登录时间
    "loginDate": {
        type: Date
    }

});


//自增插件配置
userSchema.plugin(autoIncrement.plugin, {
    model: 'userModel',
    field: 'userId',
    startAt: 1,
    incrementBy: 1
});


var userModel = mongoose.model('user', userSchema);

module.exports = userModel;