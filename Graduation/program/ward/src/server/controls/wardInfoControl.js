const wardInfoModel = require("../models/wardInfoModel")
const patientModel = require("../models/patientModel")

//空闲病房查询
exports.freeBed = async function (req, res) {
    let beds = await wardInfoModel.find({
        patient: null
    })
    res.send(beds)
}
//正在使用病房查询
exports.useBed = async function (req, res) {
    let beds = await wardInfoModel.find({})
    beds = beds.filter(el => {
        return el.patient != null
    })
    res.send(beds)
}
//病房信息列表查询
exports.useWard = async function (req, res) {
    let beds = await wardInfoModel.find({})
    res.send(beds)
}
//病人信息列表查询
exports.usePatient = async function (req, res) {
    patientModel.find({
        IDcard: req.query.IDcard
    }).then(data => {
        res.send(data)
    })
}
//病人详细信息查询
exports.detailPatient = async function (req, res) {
    patientModel.findOne({
        IDcard: req.query.IDcard
    }).then(data => {
        res.send(data)
    })
}
//病人信息查询按钮
exports.searchPatient = async function (req, res) {
    if (req.query.bedId == undefined && req.query.wardId == undefined) {
        wardInfoModel.find({}).then(data => {
            res.send(data)
        })
    } else {
        if (req.query.bedId == 0) {
            wardInfoModel.find({
                wardId: req.query.wardId
            }).then(data => {
                res.send(data)
            })
        } else {
            wardInfoModel.find({
                wardId: req.query.wardId,
                bedId: req.query.bedId
            }).then(data => {
                res.send(data)
            })
        }
    }
}
//病人病房信息查询
exports.getPatientWardInfo = async function (req, res) {
    let ward = await wardInfoModel.findOne({
        wardId: 1,
        bedId: req.query.bedId,
    })
    let patient = await patientModel.findOne({
        IDcard: ward.patient
    })
    console.log(122, req.query.bedId)
    wardInfoModel.updateOne({
        wardId: 1,
        bedId: req.query.bedId,
    }, {
        policeStatus: 1
    }).then(res => {
        console.log(res)
    })
    res.send({
        ward: ward,
        patient: patient
    })
}
//病人病房信息查询
exports.getWardInfo = async function (req, res) {
    console.log(req.query)
    let ward = await wardInfoModel.findOne({
        wardId: req.query.wardId,
        bedId: req.query.bedId,
    })
    res.send(ward)
}

