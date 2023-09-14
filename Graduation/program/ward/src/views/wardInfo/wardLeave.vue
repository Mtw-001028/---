<template>
  <div class="content d-flex flex-column align-items-center">
    <div class="card px-3 py-3" style="width: 90%">
      <h2 class="py-3 text-center">出院信息登记</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="病房：" prop="ward">
          <div class="block w-100">
            <el-cascader
                v-model="ruleForm.ward"
                :options="options"
                @change="ev=>onchoose(ev)"
                class="w-100">
            </el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请选择姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="IDcard">
          <el-input type="number" v-model="ruleForm.IDcard" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="出院时间：" prop="leavedate">
          <div class="block w-100">
            <el-date-picker
                v-model="ruleForm.leavedate"
                type="date"
                placeholder="请选择出院时间"
                class="w-100">
            </el-date-picker>
          </div>
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
import {ElNotification} from "element-plus";

export default {
  name: "wardAdmit",
  data() {
    return {
      ruleForm: {
        name: '',
        IDcard: '',
        ward: '',
        leavedate: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        IDcard: [
          {required: true, message: '请输入身份证号码', trigger: 'change'},
          // {min: 18, max: 18, message: "身份证号码应为18位", trigger: "blur"}
        ],
        ward: [
          {required: true, message: '请选择病房', trigger: 'change'}
        ],
        leavedate: [
          {type: 'date', required: true, message: '请选择出院日期', trigger: 'change'}
        ]
      },
      options: []
    }
  },
  mounted() {
    axios.get("http://localhost:3000/wardInfo/useBed")
        .then(res => {
          console.log(res)
          let option = [
            {
              value: 1,
              label: "1号房",
              children: []
            },
            {
              value: 2,
              label: "2号房",
              children: []
            },
            {
              value: 3,
              label: "3号房",
              children: []
            },
            {
              value: 4,
              label: "4号房",
              children: []
            },
            {
              value: 5,
              label: "5号房",
              children: []
            },
            {
              value: 6,
              label: "6号房",
              children: []
            },
          ]
          res.data.forEach(el1 => {
            option.forEach(el2 => {
              if (el1.wardId == el2.value) {
                let el = {
                  value: el1.bedId,
                  label: el1.bedId + "号床"
                }
                el2.children.push(el)
              }
            })
          })
          this.options = option
        })
  },
  methods: {
    onchoose(ev) {
      axios.get("http://localhost:3000/patient//PatientInfoChange", {
        params: {
          wardId: ev[0],
          bedId: ev[1]
        }
      }).then(res => {
        let ward = this.ruleForm.ward
        this.ruleForm = res.data
        this.ruleForm.ward = ward

      })
    },
    submitForm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.get("http://localhost:3000/patient/PatientLeave", {
            params: {
              ...this.ruleForm
            }
          }).then(res => {
            console.log(res.data)
            if (res.data.code == 200) {
              ElNotification({
                title: '成功提示',
                message: '出院成功！',
                type: 'success',
                duration: 2000
              })
              this.$router.push("/index/wardInfo")
            } else if (res.data.code == 300) {
              ElNotification({
                title: '失败提示',
                message: '姓名或身份证号码有误！',
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
    }
  }
}
</script>

<style scoped>
.content {
  padding: 30px 30px;
}
</style>