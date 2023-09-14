<template>
  <div class="content d-flex flex-column align-items-center mt-3">
    <div class="card px-3 py-3 position-relative" style="width: 90%">
      <h2 class="py-3 text-center">住院信息列表</h2>
      <div class="position-absolute d-flex" style="top: 45px">
        <div class="yuan ms-2" style="background: #d6f5c5"></div>
        <span class=" ms-2 position-relative" style="top: -5px">正常</span>
        <div class="yuan ms-2" style="background: #ed8585"></div>
        <span class=" ms-2 position-relative" style="top: -5px">报警</span>
        <div class="yuan ms-2" style="background: #62c6da"></div>
        <span class=" ms-2 position-relative" style="top: -5px">空床</span>
      </div>
      <SearchForm @SearchWard="onSearch"></SearchForm>
      <Table :tableData="tableData"></Table>
    </div>
  </div>
</template>

<script>
let timer
import SearchForm from "@/components/searchForm";
import Table from "@/components/table";
import axios from "axios";

export default {
  components: {
    SearchForm,
    Table
  },
  name: "page2",
  data() {
    return {
      tableData: [],
      Data: "",
      searchForm:""
    }
  },
  mounted() {
    axios.get("http://localhost:3000/wardInfo/useWard", {})
        .then(res => {
          console.log(res)
          res.data.forEach((el, index) => {
            el.ward = `${el.wardId}病房${el.bedId}号床`
            el.codeNum = index + 1
            el.warningType = el.policeStatus == 0 ? "正常" : "报警"
            if (el.patient != null) {
              axios.get("http://localhost:3000/wardInfo/usePatient", {
                params: {
                  IDcard: el.patient
                }
              }).then(res1 => {
                res1.data[0].date = res1.data[0].date.slice(0, 10)
                let start = res1.data[0].date.slice(0, 8)
                let end = Number(res1.data[0].date.slice(8, 10)) + 1
                res1.data[0].date = start + end
                this.tableData[index] = {...el, ...res1.data[0]}
              })
            } else {
              el.name = "空床"
              this.tableData[index] = {...el}
            }
          })
        })
     timer = setInterval(()=>{
      axios.get("http://localhost:3000/wardInfo/searchPatient", {
        params: {
          wardId: this.searchForm[0],
          bedId: this.searchForm[1]
        }
      }).then(res => {
        this.tableData = []
        res.data.forEach((el, index) => {
          el.ward = `${el.wardId}病房${el.bedId}号床`
          el.codeNum = index + 1
          el.warningType = el.policeStatus == 0 ? "正常" : "报警"
          if (el.patient != null) {
            axios.get("http://localhost:3000/wardInfo/usePatient", {
              params: {
                IDcard: el.patient
              }
            }).then(res1 => {
              res1.data[0].date = res1.data[0].date.slice(0, 10)
              let start = res1.data[0].date.slice(0, 8)
              let end = Number(res1.data[0].date.slice(8, 10)) + 1
              res1.data[0].date = start + end
              this.tableData[index] = {...el, ...res1.data[0]}
            })
          } else {
            el.name = "空床"
            this.tableData[index] = {...el}
          }
        })
      })
    },5000)
  },
  unmounted() {
    clearInterval(timer)
  },
  methods: {
    //查询按钮
    onSearch(data) {
      this.searchForm = data
      axios.get("http://localhost:3000/wardInfo/searchPatient", {
        params: {
          wardId: data[0],
          bedId: data[1]
        }
      }).then(res => {
        this.tableData = []
        res.data.forEach((el, index) => {
          console.log(6)
          el.ward = `${el.wardId}病房${el.bedId}号床`
          el.codeNum = index + 1
          el.warningType = el.policeStatus == 0 ? "正常" : "报警"
          if (el.patient != null) {
            axios.get("http://localhost:3000/wardInfo/usePatient", {
              params: {
                IDcard: el.patient
              }
            }).then(res1 => {
              res1.data[0].date = res1.data[0].date.slice(0, 10)
              let start = res1.data[0].date.slice(0, 8)
              let end = Number(res1.data[0].date.slice(8, 10)) + 1
              res1.data[0].date = start + end
              this.tableData[index] = {...el, ...res1.data[0]}
            })
          } else {
            el.name = "空床"
            this.tableData[index] = {...el}
          }
        })
      })
    },

  }
}
</script>

<style scoped>
.yuan {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #6c757d;
}

</style>