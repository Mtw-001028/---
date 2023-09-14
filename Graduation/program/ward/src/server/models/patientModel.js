const mongoose = require('mongoose')
const {model, Schema} = mongoose
// 创建病人文档结构
const schema = new Schema({
    name: {type: String},//姓名
    sex: {type: String},//性别
    birthday: {type: Date},//出生日期
    IDcard: {type: Number}, // 身份证
    familyName: {type: String},//家属姓名
    familyPhone: {type: Number}, // 家属电话
    wardId: {type: Number},//病房id
    bedId: {type: Number},//病床id
    date: {type: Date, index: true},//入院日期
    leadvedate: {type: Date, default: null},//出院时间
    desc: {type: String},//病情描述
    createdAt: {type: Date, index: true, default: new Date()},//注册时间
    updatedAt: {type: Date, index: true, default: new Date()},//信息最后一次修改时间
})

// 创建文档对象
const userModel = model('patientModel', schema, 'patients')

module.exports = userModel