<template>
  <!--   背景图-->
  <div class="bcg position-relative">
    <!--    登录框-->
    <div class="loginCard card position-absolute d-flex flex-column align-items-center">
      <!--   logo图标   -->
      <div class="logoSize mt-3">
        <img src="../../assets/img/logo.png" class="w-100">
      </div>
      <!--      用户登录-->
      <div class="fw-bold fs-2 mb-3">
        <span>用户登录</span>
      </div>
      <form noValidate class="w-75">
        <!--      用户名-->
        <div class=" row mb-3">
          <label class="col-form-label fw-bold col-2 p-0" style="line-height: 34px">账号：</label>
          <div class="col px-0">
            <input type="text" class="form-control" @input="ev=>onUnameInp(ev)" placeholder="请输入账号">
          </div>
        </div>
        <!--      密码-->
        <div class="row mb-3">
          <label class="col-form-label fw-bold col-2 p-0" style="line-height: 34px">密码：</label>
          <div class="col px-0">
            <input type="password" class="form-control" @input="ev=>onUpwdInp(ev)" placeholder="请输入密码">
          </div>
        </div>
        <!--        验证码-->
        <div class="row mb-3">
          <label class="col-form-label fw-bold col-2 p-0" style="line-height: 40px">验证码：</label>
          <div class="col d-flex p-0">
            <input type="text" class="form-control w-75 me-2" @input="ev=>onCodeChange(ev)" placeholder="请输入验证码">
            <valid-code @input="createValidCode" width="120px"></valid-code>
          </div>
        </div>
        <div style="color: red;font-size: 14px" class="ps-5">
          <span v-if="status==1">验证码错误！</span>
          <span v-if="status==2">账号不存在！</span>
          <span v-if="status==3">密码错误！</span>
        </div>
        <!--      登录按钮-->
        <div class="row mt-2">
          <button class=" form-control btn btn-success" @click="onSubit">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import validCode from "@/components/validCode";
import axios from "axios";

export default {
  mounted() {
    document.title = "登陆页面"
  },
  data() {
    return {
      uname: "",
      upwd: "",
      inpCode: "",
      validCode: "",
      status: 0
    }
  },
  components: {
    validCode
  },

  methods: {
    //账号输入
    onUnameInp(ev) {
      this.uname = ev.target.value
    },
    //密码输入
    onUpwdInp(ev) {
      this.upwd = ev.target.value
    },
    //验证码
    onCodeChange(ev) {
      this.inpCode = ev.target.value
    },
    createValidCode(data) {
      this.validCode = data
    },
    //登录按钮
    onSubit() {
      if (this.$data.inpCode == this.$data.validCode) {
        axios.get("http://localhost:3000/user/login", {
          params: {
            uname: this.$data.uname,
            pwd: this.$data.upwd,
          }
        }).then((res) => {
          if (res.data.code == 200) {
            window.localStorage.userId = res.data.userId
            window.localStorage.isLogin = 1
            this.$router.push("/index/video")
          } else if (res.data.code == 201) {
            this.status = 3
          } else if (res.data.code == 202) {
            this.status = 2
          }
        })
      } else {
        this.status = 1
      }
    }
  }
}
</script>

<style scoped>
.bcg {
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/img/Nursestation2.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.loginCard {
  width: 500px;
  height: 430px;
  background-color: rgba(255, 255, 255, 0.75);
  left: calc(73% - 250px);
  top: calc(50% - 200px);
}

.logoSize {
  width: 75px;
}
</style>