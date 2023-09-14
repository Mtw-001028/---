<template>
  <div class="father">
    <!--  搜索框  -->
    <div class="searchForm m-4">
      <span style="line-height: 32px">正在监控的病床：</span>
      <el-cascader
          v-model="searchInfo"
          :options="options"
          class="w-25">
      </el-cascader>
      <el-button type="primary" @click="onSearch">查询</el-button>
    </div>

    <div class="videoBox m-3 py-3 border border-1 border-light rounded d-flex  flex-wrap">
      <div class="box" v-for="(warn,index) in wardInfoList" :key="index" @click="()=>VideoInfo(warn)">
        <div class="imgBox">
          <img
              style="display: block;-webkit-user-select: none;margin: auto;background-color: hsl(0, 0%, 25%);height: 100%;width: 100%"
              src="https://40987q4h45.yicp.fun/mjpeg/1">
        </div>
        <div class="wardInfo px-2" style="font-size: 14px">
          <div class="">
            <div>病房号:{{ warn.wardId }}</div>
            <div>床号:{{ warn.bedId }}</div>
          </div>
          <div class="Info">
            <div>温度:{{ warn.temp }}℃</div>
            <div>湿度:{{ warn.humid }}％RH</div>
            <div class="d-flex">
              <div><span>预警信息：</span></div>
              <div class='scroll' :style="warn.policeStatus==0?
              'background-color:#3aff00'
              :
              'background-color:#ed8585 '"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

let timer

export default {
  name: "page3",
  data() {
    return {
      searchInfo: '',
      options: [],
      wardInfoList: [],
    }
  },
  mounted() {
    axios.get("http://localhost:3000/wardInfo/useBed")
        .then(res => {
          let option = [
            {
              value: 1,
              label: "1号房",
              children: [{
                value: "0",
                label: "所有病床"
              },]
            },
            {
              value: 2,
              label: "2号房",
              children: [{
                value: "0",
                label: "所有病床"
              },]
            },
            {
              value: 3,
              label: "3号房",
              children: [{
                value: "0",
                label: "所有病床"
              }]
            },
            {
              value: 4,
              label: "4号房",
              children: [{
                value: "0",
                label: "所有病床"
              }]
            },
            {
              value: 5,
              label: "5号房",
              children: [{
                value: "0",
                label: "所有病床"
              }]
            },
            {
              value: 6,
              label: "6号房",
              children: [{
                value: "0",
                label: "所有病床"
              }]
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

          this.wardInfoList = res.data
          this.wardInfoList.forEach(el => {
            el.imgUrl = require("../../assets/img/Nursestation2.jpg")
          })
        })
    timer = setInterval(()=>{
      axios.get("http://localhost:3000/wardInfo/searchPatient", {
        params: {
          wardId: this.searchInfo[0],
          bedId: this.searchInfo[1]
        }
      }).then(res => {
        let dataList = res.data.filter(el => {
          return el.patient
        })
        this.wardInfoList = dataList
        console.log(this.wardInfoList,6)
      })
    },2000)
  },
  unmounted() {
    clearInterval(timer)
  },
  methods: {
    onSearch() {
      axios.get("http://localhost:3000/wardInfo/searchPatient", {
        params: {
          wardId: this.searchInfo[0],
          bedId: this.searchInfo[1]
        }
      }).then(res => {
        let dataList = res.data.filter(el => {
          return el.patient
        })
        this.wardInfoList = dataList
      })
    },
    VideoInfo(warn) {
      this.$store.dispatch("aWardId", warn)
      this.$router.push("/index/wardDetail")
    }
  }
}
</script>

<style scoped>
.Info {
  line-height: 18px;
}

.scroll {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.videoBox {
  background-color: white;
  height: 730px;
  overflow: auto;
}

.searchForm {
  display: flex;
  justify-content: center;
}

.box {
  width: 21%;
  margin-left: 3%;
  height: 200px;
  background-color: white;
  border: #6c757d 1px solid;
}

.imgBox {
  width: 100%;
  height: 70%;
}

.imgBox > img {
  width: 100%;
  height: 100%;
}

.wardInfo {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>