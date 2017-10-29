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
        type: Number,
        required: true,
        enum: [1, 2, 3, 4]
    },

    //发布内容
    "content": {
        type: String,
        required: true,
        maxlength: 500,
        validate: /\S+/
    },

    //图片地址数组
    "imgUrls": {
        type: [String]
    },

    //地址
    "address": {
        type: String,
        required: true,
        maxlength: 60
    },

    //经纬度 
    "location": {
        type: Array,
        index: '2d',
        required: true,
        sparse: true
    },

    //联系手机
    "mobile": {
        type: String,
        required: true,
        validate: /\d{11}/
    },

    //标签名称
    "tagName": {
        type: String,
        required: true,
        maxlength: 10
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
    "commentsNum":{
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