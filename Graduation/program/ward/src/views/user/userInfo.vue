<template>
  <div class="mt-3 content d-flex flex-column align-items-center">
    <div class="w-75">
      <div class="mt-3">
        <div class="pb-3 border-bottom border-dark"><span class="fw-bold fs-1">修改账号信息</span></div>
      </div>
      <div>
        <label class="fw-bold fs-4 form-label mt-3">账号</label>
        <input type="text" class="form-control mt-2" v-model="info.uname" disabled>
      </div>
      <div>
        <label class="fw-bold fs-4 form-label mt-3">昵称</label>
        <input type="text" class="form-control mt-2" v-model="info.nickname">
      </div>
      <div>
        <label class="fw-bold fs-4 form-label mt-2">密码</label>
        <input type="password" class="form-control mt-2" v-model="info.pwd">
      </div>
      <div class="position-relative">
        <label class="fw-bold fs-4 form-label mt-2">头像</label><br>
        <img :src="info.icon" alt="" style="width: 100px;height: 100px"/>
        <input :onchange="onHeadImgChange" type="file"
               class="position-absolute opacity-0 mt-2"
               style="top: 45px;
                         left: 0px;
                         width: 100px;
                         height: 100px;
                         zIndex: 5"/>
      </div>
      <div class="mt-3">
        <button class="btn btn-success" @click="onChange">修改</button>
      </div>
      <div class="mt-3"><span>一旦注销，不可找回，请谨慎操作</span></div>

      <div class="mt-3">
        <button class="btn btn-danger"  @click="centerDialogVisible = true">注销</button>
      </div>
    </div>


    <el-dialog v-model="centerDialogVisible"  width="30%" center>
    <span>
     一旦注销，不可找回，请谨慎操作
    </span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="sure">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
import {ElNotification} from "element-plus";

export default {
  name: "userInfo",
  data() {
    return {
      tabPosition: "top",
      info: {},
      centerDialogVisible : false
    }
  },
  mounted() {
    axios.get("http://localhost:3000/user/getUser", {
      params: {
        uId: window.localStorage.userId
      }
    }).then((res) => {
      this.info = res.data
    })
  },
  methods: {
    //确认注销按钮
    sure() {
      axios.get("http://localhost:3000/user/deleteUser", {
        params: {
          id: window.localStorage.userId
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.centerDialogVisible = false
          this.$router.push("/login")
        }
      })
    },
    //修改按钮
    onChange() {
      console.log(this.info)
      axios.post("http://localhost:3000/user/changeUserInfo", {
        ...this.info
      }).then(res => {
        window.localStorage.isLogin = 2
        location.reload()
      })
    },
    onHeadImgChange(ev) {
      let file = ev.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener("load", (ev) => {
        this.info.icon = ev.target.result
      })
    },
  }
}
</script>

<style scoped>

</style>