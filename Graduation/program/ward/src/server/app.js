const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
//引入路由
const wardEnv = require("./routers/wardEnvRouter")
const userInf = require("./routers/userRouter")
const patient = require("./routers/paitientRouter")
const wardInfo = require("./routers/wardInfoRouter")
//跨域问题
const cors = require("cors")
app.use(cors())
//注册中间件
app.use(express.json({limit: "2100000kb"}));
app.use(express.urlencoded({extended: false}));
//cookie
app.use(cookieParser())
//路由器
app.use("/wardEnv", wardEnv)
app.use("/user", userInf)
app.use("/patient", patient)
app.use("/wardInfo", wardInfo)

app.listen(port, () => {
    mongoose.connect("mongodb://127.0.0.1:27017/ward")
        .then(() => {
            console.log("连接成功")
        })
})