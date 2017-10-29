const mongoose = require("../mongodb").mongoose;
const Schema = mongoose.Schema;
//自增插件
const autoIncrement = require('mongoose-auto-increment');

// 自增ID初始化
autoIncrement.initialize(mongoose.connection);

const commentSchema = {

    // 评论所在的发布_id
    publishId: {
        type: Number,
        required: true
    },

    //评论人的id
    authorId: {
        type: String,
        index: true
    },

    //是否是回复
    isReply: {
        type: Boolean,
        default: false
    },

    //评论给谁的id
    replyUserId: {
        type: String,
        index: true
    },

    //评论id
    commentId: {
        type: Number,
        required: true,
        index: true
    },

    //评论时间
    time: {
        type: Date,
        default: Date.now
    },

    //评论内容
    content: {
        type: String,
        required: true,
        maxlength: 200,
        validate: /\S+/
    }
}

//自增插件配置
commentSchema.plugin(autoIncrement.plugin, {
    model: 'commentModel',
    field: 'commentId',
    startAt: 1,
    incrementBy: 1
});


const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;