const express =require("express")
const router = express.Router()
const wardEnvControl =require("../controls/wardEnvControl")


router.get("/test",wardEnvControl.test)

router.get("/getStatus",wardEnvControl.getStatus)

router.get("/appAndtemp",wardEnvControl.appAndtemp)

router.get("/changeStatus",wardEnvControl.changeStatus)


module.exports = router