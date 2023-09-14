const express = require("express")
const router = express.Router()
const userControl = require("../controls/userControl")
//用户登录
router.get("/login",userControl.login)
//添加用户
router.post("/addUser",userControl.addUser)
//获取用户信息
router.get("/getUser",userControl.getUser)
//修改用户信息
router.post("/changeUserInfo",userControl.changeUserInfo)
//用户注销功能
router.get("/deleteUser",userControl.deleteUser)

module.exports = router