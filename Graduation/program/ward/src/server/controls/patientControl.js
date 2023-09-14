const patientModel = require("../models/patientModel")
const wardInfoModel = require("../models/wardInfoModel")

//病人入院接口
exports.addPatient = async function (req, res) {
    let ward = await wardInfoModel.findOne({
        wardId: req.query.wardId,
        bedId: req.query.bedId
    })
    patientModel.findOne({
        IDcard: req.query.IDcard
    }).then(data => {
        if (data) {
            res.send({
                code: 300,
                msg: "身份证重复！"
            })
        } else if (ward.patient != null) {
            res.send({
                code: 100,
                msg: "该病床正在使用！"
            })
        } else {
            //修改病房信息
            wardInfoModel.updateOne({
                wardId: req.query.wardId,
                bedId: req.query.bedId
            }, {
                patient: req.query.IDcard
            }).then(() => {
                //创建病人
                patientModel.create({
                    ...req.query
                }).then(() => {
                    res.send({
                        code: 200,
                        msg: "上传成功！"
                    })
                })
            })

        }
    })

}
//病人出院接口
exports.PatientLeave = async function (req, res) {
    let bedInfo = await wardInfoModel.findOne({
        wardId: req.query.ward[0],
        bedId: req.query.ward[1]
    })
    let patient = await patientModel.findOne({
        IDcard: bedInfo.patient
    })
    patient.deleteOne({
        IDcard: bedInfo.patient
    })
    wardInfoModel.updateOne({
        wardId: req.query.ward[0],
        bedId: req.query.ward[1]
    }, {
        patient: null,
        policeStatus: 0
    }).then(data => {
        console.log(data)
    })
    res.send({
        code: 200,
        msg: "删除成功！"
    })

}
//获取病人信息接口
exports.PatientInfoChange = async function (req, res) {
    let data = await wardInfoModel.findOne({
        wardId: req.query.wardId,
        bedId: req.query.bedId,
    })
    let patient = await patientModel.findOne({
        IDcard: data.patient
    })
    res.send(patient)
}
//获取病人信息修改接口
exports.PatientChange = async function (req, res) {

    wardInfoModel.updateOne({
        wardId: req.query.wardId,
        bedId: req.query.bedId
    }, {
        patient: req.query.IDcard
    })
    patientModel.updateOne({
        _id: req.query._id
    }, {
        ...req.query
    }).then(err => {
        res.send({
            code: 200,
            msg: "ok!"
        })
    })


}