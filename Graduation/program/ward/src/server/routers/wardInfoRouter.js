const express = require("express")
const router = express.Router()
const wardInfoControl = require("../controls/wardInfoControl")

//空闲病床
router.get("/freeBed", wardInfoControl.freeBed)
//正在使用病房
router.get("/useBed", wardInfoControl.useBed)
//病房信息查询
router.get("/useWard", wardInfoControl.useWard)
//病人信息查询
router.get("/usePatient", wardInfoControl.usePatient)
//病人详细信息查询
router.get("/detailPatient", wardInfoControl.detailPatient)
//病人信息查询按钮
router.get("/searchPatient", wardInfoControl.searchPatient)
//病人病房信息查询按钮
router.get("/getPatientWardInfo", wardInfoControl.getPatientWardInfo)
//病房信息查询
router.get("/getWardInfo", wardInfoControl.getWardInfo)

module.exports = router