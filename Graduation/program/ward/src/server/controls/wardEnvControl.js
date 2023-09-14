const axios = require("axios");
const wardInfoModel = require("../models/wardInfoModel")

//echarts
exports.test = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    axios.get('https://cloud.alientek.com/api/orgs/8639/devicepacket/31102033656925356052', {
        headers: {
            'token': '2e5df5e7349e44bd87529dacce38f4d3'
        },
        params: {
            page: 1,
            limit: 10
        }
    })
        .then(ress => {
            res.send(ress.data.data.items)
        })
        .catch(err => {
            console.log(err)
        })
}
//红外
exports.getStatus = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    axios.get('https://cloud.alientek.com/api/orgs/8639/devicepacket/31102033656925356052', {
        headers: {
            'token': '2e5df5e7349e44bd87529dacce38f4d3'
        },
        params: {
            page: 1,
            limit: 1
        }
    })
        .then(ress => {
            res.send(ress.data.data.items)
        })
        .catch(err => {
            console.log(err)
        })
}
//存储温湿度
exports.appAndtemp = async function (req, res) {
    wardInfoModel.updateMany({
        wardId: 1
    }, {
        temp: req.query.temp[0],
        humid: req.query.humid[0]
    }).then(() => {
        res.send("ok!")

    })
}
//修改红外状态
exports.changeStatus = async function(req,res){
    console.log(1)
    wardInfoModel.updateOne({
        wardId:req.query.wardId,
        bedId:req.query.bedId
    },{
        policeStatus:0
    }).then(()=>{
        res.send("ok!")
    })
}