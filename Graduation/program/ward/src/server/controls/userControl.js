const userModel = require("../models/userModel")
//用户登录
exports.login = async function (req, res) {
    let data = await userModel.findOne({
        uname: req.query.uname
    })
    if (data) {
        if (req.query.pwd == data.pwd) {
            res.send({
                code: 200,
                msg: "登陆成功！",
                userId: data._id
            })

        } else {
            res.send({
                code: 201,
                msg: "密码错误！"
            })
        }
    } else {
        res.send({
            code: 202,
            msg: "账号不存在"
        })
    }

}
//用户注册
exports.addUser = async function (req, res) {
    userModel.create({
        nickname: req.body.name,
        uname: req.body.user,
        pwd: req.body.pwd,
        icon: req.body.icon
    }).then(() => {
        res.send({
            code: 200,
            msg: "添加成功！"
        })
    }).catch(() => {
        res.send({
            code: 400,
            msg: "添加失败！"
        })
    })
}
//获取用户信息
exports.getUser = async function (req, res) {
    let data = await userModel.findOne({
        _id: req.query.uId
    })
    res.send(data)
}
//修改用户信息
exports.changeUserInfo = async function (req, res) {
    userModel.findOneAndUpdate({
        _id: req.body._id
    }, {
        nickname: req.body.nickname,
        pwd: req.body.pwd,
        icon: req.body.icon
    }).then(() => {
        res.send("ok!")
    })
}
//用户注销功能
exports.deleteUser = async function (req, res) {
    userModel.deleteOne({
        _id: req.query.id
    }).then(() => {
        res.send({
            code: 200,
            msg: "删除成功！"
        })
    })
}