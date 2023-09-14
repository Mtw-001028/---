<template>
  <div class="p-3">
    <div class="topBar">
      <el-button class="ms-1" type="primary" @click="back">返回</el-button>
    </div>
    <div class="indexBox mt-3 d-flex">
      <!--   病房监测信息区   -->
      <div class="videoInfoBox">
        <div class="d-flex w-100 justify-content-between">
          <div class="card text-bg-success mb-3 w-50" style="max-width: 18rem;">
            <div class="card-header">病房监测信息</div>
            <div class="card-body">
              <div>病房号：{{ ward.wardId }}</div>
              <div>床号：{{ ward.bedId }}</div>
              <div>温度：{{ ward.temp }}°C</div>
              <div>湿度：{{ ward.humid }}％RH</div>
            </div>
          </div>
          <div class="card text-bg-success mb-3 w-50" style="max-width: 18rem;">
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
              style="display: block;-webkit-user-select: none;margin: auto;background-color: hsl(0, 0%, 25%);height: 450px;width: 670px"
              src="https://40987q4h45.yicp.fun/mjpeg/1">
        </div>
      </div>
      <!--   详细信息区   -->
      <div class="ms-5 card d-flex justify-content-center align-items-center" style="width: 600px">
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
          <el-form-item label="性别：">
            <el-select disabled v-model="form.sex" class="w-100">
              <el-option label="男" value="male"/>
              <el-option label="女" value="female"/>
              <el-option label="其他" value="other"/>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期：">
            <div class="block w-100">
              <el-date-picker
                  readonly
                  v-model="form.birthday"
                  type="date"
                  placeholder="请选择日期"
                  class="w-100">
              </el-date-picker>
            </div>
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

          <el-form-item label="备注：">
            <el-input readonly v-model="form.desc" type="textarea"/>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

let timer

export default {
  name: "wardDetail",
  data() {
    return {
      form: {},
      ward: {}
    }
  },
  mounted() {
    this.ward = this.$store.state.warn
    axios.get("http://localhost:3000/wardInfo/detailPatient", {
      params: {
        IDcard: this.$store.state.warn.patient
      }
    }).then(res => {
      this.form = res.data
    })
    timer = setInterval(() => {
      axios.get("http://localhost:3000/wardInfo/getWardInfo", {
        params: {
          wardId: this.$store.state.warn.wardId,
          bedId: this.$store.state.warn.bedId,
        }
      }).then(res => {
        this.ward = res.data
      })
    }, 2000)
  },
  unmounted() {
    clearInterval(timer)
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.topBar {
  height: 80px;
  display: flex;
  align-items: center;
}

.videoInfoBox {
  width: 50%;
}

.videoBox > video {
  width: 100%;
}
</style>