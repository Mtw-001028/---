const express = require("express")
const router = express.Router()
const patientControl = require("../controls/patientControl")

//病人入院接口
router.get("/addPatient",patientControl.addPatient)
//出院接口
router.get("/PatientLeave",patientControl.PatientLeave)
//入院信息修改
router.get("/PatientInfoChange",patientControl.PatientInfoChange)
//修改如愿信息
router.get("/PatientChange",patientControl.PatientChange)

module.exports = router