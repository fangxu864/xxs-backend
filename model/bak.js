/**
 * 发布信息集合
 */

var publish = {
    "publishId": "",
    "publishStatus": 1, //1正式发布 , 2 审核中待发布 3 拒绝发布，内容有问题 ,4 下架
    "content": "5454545", //发布内容
    "imgUrls": [
        "图片地址集合",
    ],
    "address": "福州市仓山区",
    "location":[],
    "lantitude": "纬度",
    "longitude": "经度",
    "mobile": "15659329937",
    "tagName": "服务名片",
    "tagId": "标签id",

    "praiseNum": "赞数量",
    "praiseUserArr": [],
    "pageView": "浏览量",
    "viewUserNum": "访客数量",
    "viewUserArr": [],

    "publishTime": "发布时间",
    "publishUser": "发布人",
    "userName": "用户昵称",
    "userId": "openID",
    "userImg": "用户头像",
    "comments": [{
        commentId: "121",
        time: "",
        content: "这个多少钱呀",
        userId: "openid",
        commentTo: "回复给谁的id"
    }]
}


/**
 * 用户集合
 */
var users = {

    "openId": "微信的openid",
    "userName": "",
    "userImg": "",
    "openId": "OPENID",
    "nickName": "NICKNAME",
    "gender": GENDER,
    "city": "CITY",
    "province": "PROVINCE",
    "country": "COUNTRY",
    "avatarUrl": "AVATARURL",
    "unionId": "UNIONID",
    "watermark": {
        "appid": "APPID",
        "timestamp": TIMESTAMP
    }

}