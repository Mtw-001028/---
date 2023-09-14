<template>
  <div class="content d-flex flex-column align-items-center">
    <div class="card px-3 py-3" style="width: 90%">
      <h2 class="py-3 text-center">用户添加</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="账号：" prop="user">
          <el-input v-model="ruleForm.user" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="userPwd">
          <el-input type="password" v-model="ruleForm.userPwd" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="头像：" prop="head">
          <img :src="ruleForm.headsrc" alt="" style="width: 100px;height: 100px"/>
          <input :onchange="onHeadImgChange" type="file"
                 class="position-absolute opacity-0"
                 style="top: 23px;
                         left: 12px;
                         width: 100px;
                         height: 100px;
                         zIndex: 5"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import {ElNotification} from 'element-plus'

export default {
  name: "wardAdmit",
  data() {
    return {
      ruleForm: {
        name: '',
        user: '',
        userPwd: '',
        headsrc: require("../../assets/img/user.png"),//默认头像地址
      },
      rules: {
        name: [
          {required: true, message: '请输入昵称', trigger: 'change'}
        ],
        user: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        userPwd: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ],
        headsrc: [
          {required: false, message: '请输入密码', trigger: 'change'}
        ]
      },
    }
  },
  methods: {
    onHeadImgChange(ev) {
      let file = ev.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener("load", (ev) => {
        this.ruleForm.headsrc = ev.target.result
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("http://localhost:3000/user/addUser", {
            name: this.ruleForm.name,
            user: this.ruleForm.user,
            pwd: this.ruleForm.userPwd,
            icon: this.ruleForm.headsrc
          }).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
              ElNotification({
                title: '成功！',
                message: '成功添加用户！',
                type: 'success',
                duration: 2000
              })
            } else {
              ElNotification({
                title: '失败！',
                message: '添加用户失败！',
                type: 'error',
                duration: 2000
              })
            }

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.headsrc = require("../../assets/img/user.png")
    }
  }
}
</script>

<style scoped>
.content {
  padding: 30px 30px;
}
</style>