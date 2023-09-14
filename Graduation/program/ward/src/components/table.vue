<template>
  <el-table
      :data="tableData"
      height="580"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName">
    <el-table-column
        prop="codeNum"
        label="序号"
        width="100">
    </el-table-column>
    <el-table-column
        prop="ward"
        label="病床"
        width="180">
    </el-table-column>
    <el-table-column
        prop="name"
        label="病人">
    </el-table-column>
    <el-table-column
        prop="date"
        label="入院时间">
    </el-table-column>
    <el-table-column
        prop="warningType"
        label="预警状态"
    >
    </el-table-column>
    <el-table-column
        prop="familyName"
        label="家属姓名">
    </el-table-column>
    <el-table-column
        prop="familyPhone"
        label="家属电话">
    </el-table-column>
    <el-table-column
        prop="desc"
        label="病情简述">
    </el-table-column>
    <el-table-column
        label="操作">
      <template #default="scope">
        <el-button class="btn btn-outline-secondary" @click="handleEdit(scope.$index, scope.row)"
        >详情
        </el-button>
      </template>
    </el-table-column>
  </el-table>


  <el-dialog v-model="dialogVisible" title="详情信息" width="30%" draggable>
    <el-form :model="detailData" label-width="100px" class="demo-ruleForm">
      <el-form-item label="病房：" prop="ward">
        <el-input readonly v-model="detailData.ward" placeholder="请选择姓名"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input readonly v-model="detailData.name" placeholder="请选择姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" class="w-100">
        <el-select disabled v-model="detailData.sex" class="w-100" placeholder="请选择性别">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
          <el-option label="其他" value="other"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker readonly type="date" placeholder="选择日期" v-model="detailData.birthday"
                        style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="身份证号码" prop="IDcard">
        <el-input readonly v-model="detailData.IDcard" placeholder="请输入身份证号码"></el-input>
      </el-form-item>
      <el-form-item label="家属姓名" prop="familyName">
        <el-input readonly v-model="detailData.familyName" placeholder="请输入家属姓名"></el-input>
      </el-form-item>
      <el-form-item label="家属电话" prop="familyPhone">
        <el-input readonly v-model="detailData.familyPhone" placeholder="请输入家属电话号码"></el-input>
      </el-form-item>
      <el-form-item label="入院时间：" prop="date">
        <div class="block w-100">
          <el-date-picker readonly
                          v-model="detailData.date"
                          type="date"
                          placeholder="请选择入院时间"
                          class="w-100">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="病情简述：" prop="desc">
        <el-input readonly type="textarea" v-model="detailData.desc"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          关闭
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<style>
.el-table .warning-row {
  background: #ed8585;
}

.el-table .success-row {
  background: #d6f5c5;
}

.el-table .null-row {
  background: #62c6da;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialogVisible: false,
      detailData: {}
    }
  },
  props: {
    //表格数据
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleEdit(index, row) {
      axios.get("http://localhost:3000/wardInfo/detailPatient", {
        params: {
          IDcard: row.patient
        }
      }).then(res => {
        this.detailData = res.data
        this.detailData.ward = row.ward
      })
      this.dialogVisible = true
    },
    tableRowClassName({row, rowIndex}) {
      if (row.name == "空床") {
        return "null-row"
      } else if (row.warningType == "报警") {
        return 'warning-row';
      } else if (row.warningType == "正常") {
        return 'success-row';
      }
      return '';
    }
  },
}
</script>