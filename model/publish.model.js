const mongoose = require("../mongodb").mongoose;
const Schema = mongoose.Schema;
//自增插件
const autoIncrement = require('mongoose-auto-increment');

// 自增ID初始化
autoIncrement.initialize(mongoose.connection);


var publishSchema = new Schema({

    //发布id
    "publishId": {
        type: Number,
        required: true,
        index: true
    },

    // 发布日期
    "create_at": {
        type: Date,
        default: Date.now
    },

    // 最后修改日期
    "update_at": {
        type: Date
    },

    //发布状态
    //1正式发布 , 2 审核中待发布 3 拒绝发布，内容有问题 ,4 下架,软删除
    "publishStatus": {
        type: String,
        // required: [true, ' 不能为空'],
        enum: {
            values: [1, 2, 3, 4],
            message: `“{VALUE}”不是正确的publishStatus值`
        }
    },

    //发布内容
    "content": {
        type: String,
        required: [true, '发布内容不能为空'],
        maxlength: [500, '不能超过500个字'],
        validate: /\S+/
    },

    //图片地址数组
    "imgUrls": {
        type: Array
    },

    //地址
    "address": {
        type: String,
        required: [true, '地址不能为空'],
        maxlength: [60, '地址长度不能超过60']
    },

    //经纬度 
    "location": {
        type: [],
        index: '2d',
        required: true,
        sparse: true
    },

    //联系手机
    "mobile": {
        type: String,
        required: [true, "手机号必填"],
        validate: {
            validator: function (v) {
                return /\d{11}/.test(v);
            },
            msg: '{VALUE} 不是正确的手机号!'
        }
    },

    //标签名称
    "tagName": {
        type: String,
        required: true,
        maxlength: 10,
        index: true
    },

    //赞数量
    "praiseNum": {
        type: Number,
        default: 0
    },

    //赞用户的id数组
    "praiseUserArr": {
        type: [String]
    },

    //浏览量
    "pageView": {
        type: Number,
        default: 0
    },

    //访客数量
    "viewUserNum": {
        type: Number,
        default: 0
    },

    //访客的id arr
    "viewUserArr": {
        type: [String]
    },

    //发布人的id
    "publishUser": {
        type: String,
        index: true
    },

    //评论数量
    "commentsNum": {
        type: Number,
        default: 0
    },
});


//自增插件配置
publishSchema.plugin(autoIncrement.plugin, {
    model: 'publishModel',
    field: 'publishId',
    startAt: 1,
    incrementBy: 1
});


const publishModel = mongoose.model('publish', publishSchema);

module.exports = publishModel;