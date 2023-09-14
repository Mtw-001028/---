const mongoose = require('mongoose')
const {model, Schema} = mongoose
// 创建用户文档结构
const schema = new Schema({
    uname: {type: String, index: true, unique: true},//用户账号
    pwd: {type: String, index: true},//账号密码
    nickname: {type: String, index: true},//用户昵称
    icon: {type: String, default: '../assets/img/user.png'}, // 头像 存储 img 的 src 路径
    isAdmin: {type: Boolean, default: false},//是否为管理员
    createdAt: {type: Date, index: true, default: new Date()},//注册时间
    updatedAt: {type: Date, index: true, default: new Date()},//信息最后一次修改时间
})

// 创建文档对象
const userModel = model('userModel', schema, 'users')

module.exports = userModel