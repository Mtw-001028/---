<template>
  <div class="content d-flex flex-column align-items-center">
    <div class="card px-3 py-3" style="width: 90%">
      <h2 class="py-3 text-center">住院信息修改</h2>
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
        <el-form-item label="性别" prop="sex" class="w-100">
          <el-select v-model="ruleForm.sex" class="w-100" placeholder="请选择性别">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
            <el-option label="其他" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" required prop="birthday">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday"
                          style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号码" prop="IDcard">
          <el-input type="Number" v-model="ruleForm.IDcard" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="家属姓名" prop="familyName">
          <el-input v-model="ruleForm.familyName" placeholder="请输入家属姓名"></el-input>
        </el-form-item>
        <el-form-item label="家属电话" prop="familyPhone">
          <el-input type="Number" v-model="ruleForm.familyPhone" placeholder="请输入家属电话号码"></el-input>
        </el-form-item>
        <el-form-item label="入院时间：" prop="date">
          <div class="block w-100">
            <el-date-picker
                v-model="ruleForm.date"
                type="date"
                placeholder="请选择入院时间"
                class="w-100">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="病情简述：" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
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
        sex: '',
        birthday: '',
        IDcard: '',
        familyName: '',
        familyPhone: '',
        ward: [],
        date: '',
        desc: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        birthday: [
          {type: 'date', required: true, message: '请选择出生日期', trigger: 'change'}
        ],
        IDcard: [
          {required: true, message: '请输入身份证号码', trigger: 'change'},
          // {min: 5, max: 5, message: "身份证号码应为5位", trigger: "blur"}
        ],
        familyName: [
          {required: false, message: '请选择输入家属姓名', trigger: 'change'}
        ],
        familyPhone: [
          {required: false, message: '请输入家属电话', trigger: 'change'}
        ],
        ward: [
          {required: true, message: '请选择病房', trigger: 'change'}
        ],
        date: [
          {type: 'date', required: true, message: '请选择入院日期', trigger: 'change'}
        ],
        desc: [
          {required: true, message: '请填写病情简述', trigger: 'blur'}
        ]
      },
      options: []
    }
  },
  mounted() {
    axios.get("http://localhost:3000/wardInfo/useBed")
        .then(res => {
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
      console.log(ev)
      axios.get("http://localhost:3000/patient//PatientInfoChange", {
        params: {
          wardId: ev[0],
          bedId: ev[1]
        }
      }).then(res => {
        let ward = this.ruleForm.ward
        this.ruleForm = res.data
        this.ruleForm.ward = ward
        console.log(this.ruleForm)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.get("http://localhost:3000/patient/PatientChange", {
            params: {
              ...this.ruleForm
            }
          }).then(res => {
            console.log(res)
            if (res.data.code == 200) {
              ElNotification({
                title: '成功提示',
                message: '修改成功！',
                type: 'success',
                duration: 2000
              })
              this.$router.push("/index/wardInfo")
            } else if (res.data.code == 300) {
              ElNotification({
                title: '失败提示',
                message: '修改失败！',
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