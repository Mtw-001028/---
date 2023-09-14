<template>
  <div class="d-flex" style="width: 100%;height: 100vh">
    <!--    左侧导航栏-->
    <div class="left-nav">
      <!--      标题-->
      <div class="left-title">
        <h3>病房环境监测管理系统</h3>
      </div>
      <el-col :span="24">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#258fa4"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>病房环境监测系统</span>
            </template>
            <div style="margin-left: 50px;">
              <router-link to="/index/video">
                <el-menu-item index="1-2">病房环境检测列表</el-menu-item>
              </router-link>
              <router-link to="/index/wardEnv">
                <el-menu-item index="1-1">温湿度数据监控</el-menu-item>
              </router-link>
            </div>
          </el-sub-menu>
        </el-menu>
      </el-col>
      <el-col :span="24">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#258fa4"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>病房信息管理系统</span>
            </template>
            <div style="margin-left: 50px;">
              <router-link to="/index/wardInfo">
                <el-menu-item index="1-1">病房信息查询</el-menu-item>
              </router-link>
              <router-link to="/index/wardAdmit">
                <el-menu-item index="1-2">入院登记</el-menu-item>
              </router-link>
              <router-link to="/index/wardLeave">
                <el-menu-item index="1-3">出院登记</el-menu-item>
              </router-link>
              <router-link to="/index/wardInfoChange">
                <el-menu-item index="1-4">病房信息修改</el-menu-item>
              </router-link>
            </div>
          </el-sub-menu>
        </el-menu>
      </el-col>
    </div>
    <!--    右侧用户栏+显示区域-->
    <div class="right-nav">
      <!--      头部导航栏-->
      <div class="top-title">
        <!--        系统logo-->
        <div>
          <img src="../assets/img/logo.png" class="logo">
        </div>
        <div class="float-right d-flex hstack gap-3 user-info">
          <div style="color: white">
            <span>欢迎你,</span>
            <span>{{ userInfo.nickname }}</span>
          </div>
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="public/js/components/nav#" role="button"
               data-bs-toggle="dropdown"
               aria-expanded="false">
              <img :src="userInfo.icon" class="user-head" style="width: 60px;height: 60px"/>
            </a>
            <ul class="dropdown-menu menu">
              <li>
                <router-link to="/index/userInfo" class="dropdown-item">账号设置</router-link>
              </li>
              <li v-if="userInfo.isAdmin">
                <router-link to="/index/addUser" class="dropdown-item">添加用户</router-link>
              </li>
              <li>
                <hr class="dropdown-divider"/>
              </li>
              <li><span class="dropdown-item" style="color: white" @click="goBack">安全退出</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>

    <el-dialog v-model="visible" :show-close="false">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h1 :id="titleId" :class="titleClass" style="color: #ED8585;margin-left: 390px;font-size: 32px;">警报</h1>
          <div class="mt-2">
            <div class="indexBox mt-3 d-flex">
              <!--   病房监测信息区   -->
              <div class="videoInfoBox w-50">
                <div class="d-flex w-100 justify-content-between">
                  <div class="card text-bg-success mb-3" style="max-width: 18rem;width: 47.5%">
                    <div class="card-header">病房监测信息</div>
                    <div class="card-body">
                      <div>病房号：{{ ward.wardId }}</div>
                      <div>床号：{{ ward.bedId }}</div>
                      <div>温度：{{ ward.temp }}°C</div>
                      <div>湿度：{{ ward.humid }}％RH</div>
                    </div>
                  </div>
                  <div class="card text-bg-success mb-3" style="max-width: 18rem;width: 47.5%">
                    <div class="card-header">患者信息</div>
                    <div class="card-body">
                      <div>患者姓名：{{ form.name }}</div>
                      <div>身份证号：{{ form.IDcard }}</div>
                      <div>性别：{{ form.sex == "male" ? "男" : form.sex == "female" ? "女" : "其他" }}</div>
                    </div>
                  </div>
                </div>
                <div class="videoBox mt-3">
                  <img
                      style="display: block;-webkit-user-select: none;margin: auto;background-color: hsl(0, 0%, 25%);height: 280px;width: 100%"
                      src="https://40987q4h45.yicp.fun/mjpeg/1">
                </div>
              </div>
              <!--   详细信息区   -->
              <div class="w-50 ms-3 p-2 card d-flex">
                <h2>详细信息</h2>
                <el-form :model="form">
                  <el-form-item label="病房号：">
                    <el-input readonly v-model="form.wardId"/>
                  </el-form-item>
                  <el-form-item label="床号：">
                    <el-input readonly v-model="form.bedId"/>
                  </el-form-item>
                  <el-form-item label="姓名：">
                    <el-input readonly v-model="form.name"/>
                  </el-form-item>
                  <el-form-item label="身份证号码：">
                    <el-input readonly v-model="form.IDcard"/>
                  </el-form-item>
                  <el-form-item label="家属姓名：">
                    <el-input readonly v-model="form.familyName"/>
                  </el-form-item>
                  <el-form-item label="家属电话：">
                    <el-input readonly v-model="form.familyPhone"/>
                  </el-form-item>
                  <el-form-item label="入院时间：" prop="date">
                    <div class="block w-100">
                      <el-date-picker readonly
                                      v-model="form.date"
                                      type="date"
                                      placeholder="请选择入院时间"
                                      class="w-100">
                      </el-date-picker>
                    </div>
                  </el-form-item>

                  <el-form-item label="病情简述：">
                    <el-input readonly v-model="form.desc" type="textarea"/>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <el-button class="float-end mt-3" type="danger" @click="closeDialog">
            <el-icon class="el-icon--left">
              <CircleCloseFilled/>
            </el-icon>
            关闭
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {ElNotification} from 'element-plus'
import wardDetail from "@/views/wardEnv/wardDetail";

let timer
let bed = 1

export default {
  name: "index",
  components: {
    wardDetail
  },
  data() {
    return {
      temperatureList: [],
      appropriateList: [],
      userInfo: {},
      visible: false,
      ward: {},
      form: {}
    }
  },
  mounted() {
    axios.get("http://localhost:3000/user/getUser", {
      params: {
        uId: window.localStorage.userId
      }
    }).then((res) => {
      this.userInfo = res.data
      if (window.localStorage.isLogin == 1) {
        ElNotification({
          title: '登陆提示',
          message: '登陆成功！',
          type: 'success',
        })
      }
    })
    timer = setInterval(() => {
      //发送请求获取温湿度数据
      axios.get("http://localhost:3000/wardEnv/getStatus")
          .then(res => {
            let app = []
            let tem = []
            let control = []
            res.data.forEach(item => {
              let it = item.hex_packet.split(" ")
              control.push(String.fromCharCode(parseInt(it[22], 16)))
              app.push(Number(String.fromCharCode(parseInt(it[3], 16), parseInt(it[4], 16))))
              tem.push(Number(String.fromCharCode(parseInt(it[13], 16), parseInt(it[14], 16))))
            })
            if (tem.length != 0&&app.length!=0){
              axios.get("http://localhost:3000/wardEnv/appAndtemp",{
                params:{
                  temp:tem,
                  humid:app
                }
              }).then(res=>{
              })
            }
            if (control.includes("A")) {
              bed = 1
              this.visible = true
            } else if (control.includes(("B"))) {
              bed = 2
              this.visible = true
            } else if (control.includes(("C"))) {
              bed = 3
              this.visible = true
            } else if (control.includes(("D"))) {
              bed = 4
              this.visible = true
            } else if (control.includes(("E"))) {
              bed = 5
              this.visible = true
            } else if (control.includes(("F"))) {
              bed = 6
              this.visible = true
            }
            if (this.visible) {
              axios.get("http://localhost:3000/wardInfo/getPatientWardInfo", {
                params: {
                  bedId: bed
                }
              }).then(res => {
                this.ward = res.data.ward
                this.form = res.data.patient
              })
            }
          })
          .catch(err => {
          })
    }, 1000)

  },
  methods: {
    goBack() {
      localStorage.clear()
      this.$router.push("/login")
    },
    closeDialog() {
      this.visible = false
      timer = null
      axios.get("http://localhost:3000/wardEnv/changeStatus",{
        params:{
          wardId:this.ward.wardId,
          bedId:this.ward.bedId,
        }
      }).then(res=>{
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}

/*左侧区域*/
.left-nav {
  background-color: #055160;
  border-right: #819a97 1px solid;
  color: white;
  width: 20%;
}

.left-title > h3 {
  line-height: 100px;
}

.choose {
  width: 190px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: end;
}

.left-items {
  background-color: #1b7e92;
}

.left-title {
  text-align: center;
  color: white;
  background-color: #055160;
  height: 100px;
}

.router-link-active {
  text-decoration: none;
  color: #1effea;
}

.left-items > div {
  margin-left: 60px;
  color: black;
}

/*左侧选项title*/
.title {
  font-size: 24px;
  font-weight: 600;
}


/*右侧区域*/
.right-nav {
  width: 80%;
  background-color: #f0f0f0;
}

/*头部导航栏*/
.top-title {
  height: 100px;
  background-color: #0AA2C0;
  display: flex;
  justify-content: space-between;
}

.logo {
  width: 100px;
  height: 100px;
  margin-left: 50px;
}

.user-head {
  width: 60px;
  height: 60px;
}

.user-info {
  margin-right: 80px;
}

.menu {
  background-color: #0AA2C0;
}
</style>