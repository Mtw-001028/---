const mongoose = require('mongoose')
const {model, Schema} = mongoose
// 创建病床文档结构
const schema = new Schema({
    wardId: {type: String},//病房
    bedId: {type: String},//病床
    patient: {type: String, default: null},//病人身份证
    temp: {type: String, default: 20},//温度
    humid: {type: String, default: 50}, // 湿度
    policeStatus: {type: Number, default: 0},//报警情况
    createdAt: {type: Date, index: true, default: new Date()},//注册时间
    updatedAt: {type: Date, index: true, default: new Date()},//信息最后一次修改时间
})

// 创建文档对象
const userModel = model('wardInfoModel', schema, 'wardInfo')

module.exports = userModel