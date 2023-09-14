<script setup>
let appropriateList = []
let temperatureList = []
let timeList = []
// 1. 引入echarts
import * as echarts from 'echarts'
import {onBeforeMount, onBeforeUnmount, onMounted, ref} from 'vue'
import axios from "axios";

const chartRoot = ref(null)
const chartRoot1 = ref(null)
// echartsInstance 实例对象不能是响应式的
// const echartsInstance = ref(null)
// echarts 实例对象使用非响应式变量来存储
let echartsInstance = null
let echartsInstance1 = null
// 4. 声明 option 配置参数
const option = {
  legend: {},
  xAxis: {
    type: 'category',
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '温度',
      data: [5, 6, 10, 5, 1, 1, 5],
      type: 'line',
      symbol: 'triangle',
      symbolSize: 20,
      lineStyle: {
        color: '#5470C6',
        width: 4
      },
      itemStyle: {
        borderWidth: 3,
        borderColor: '#EE6666',
        color: 'yellow'
      }
    },
  ]
}
const option1 = {
  legend: {},
  xAxis: {
    type: 'category',
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '湿度',
      data: [10, 15, 26, 51, 21, 45, 65],
      type: 'line',
      symbol: 'triangle',
      symbolSize: 20,
      lineStyle: {
        color: '#5470C6',
        width: 4
      },
      itemStyle: {
        borderWidth: 3,
        borderColor: '#EE6666',
        color: 'yellow'
      }
    },
  ]
}

let lock
// 挂载完成后初始化 echarts
let options = ref(null)
let searchInfo = ref(null)

onMounted(() => {
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
        options.value = option

      })
  // 3. 初始化
  echartsInstance = echarts.init(chartRoot.value)
  echartsInstance1 = echarts.init(chartRoot1.value)
  //设置计时器定时更新图表
  lock = setInterval(() => {
    //发送请求获取温湿度数据
    axios.get("http://localhost:3000/wardEnv/test")
        .then(res => {
          //初始化echarts
          echartsInstance = echarts.init(chartRoot.value)
          echartsInstance1 = echarts.init(chartRoot1.value)

          //调用函数重新渲染
          hexToStr(res.data)
        })
        .catch(err => {
          console.log(err)
        })
  }, 5000)
})
// 挂载前获取温湿度
onBeforeMount(() => {
  //发送请求获取温湿度数据
  axios.get("http://localhost:3000/wardEnv/test")
      .then(res => {
        hexToStr(res.data)
      })
      .catch(err => {
        console.log(err)
      })
})
onBeforeUnmount(() => {
  clearInterval(lock)
})

//获取温湿度数据函数，渲染到echarts
function hexToStr(arr) {
  let app = []
  let tem = []
  let time = []
  arr.forEach(item => {
    let it = item.hex_packet.split(" ")
    app.push(Number(String.fromCharCode(parseInt(it[3], 16), parseInt(it[4], 16))))
    tem.push(Number(String.fromCharCode(parseInt(it[13], 16), parseInt(it[14], 16))))
    time.push(item.time.slice(11, 19))
  })
  appropriateList = app.reverse()
  temperatureList = tem.reverse()
  timeList = time.reverse()
  option.series[0].data = temperatureList
  option1.series[0].data = appropriateList
  option.xAxis.data = timeList
  option1.xAxis.data = timeList
  // 5. 设置并渲染
  echartsInstance.setOption(option)
  echartsInstance1.setOption(option1)
}

function onSearch() {
  window.localStorage.isLogin = 2
  // location.reload()
}

</script>

<template>
  <div>
    <!--  搜索框  -->
    <div class="searchForm m-4">
      <span style="line-height: 32px;margin-left: 400px">正在监控的病床：</span>
      <el-cascader
          v-model="searchInfo"
          :options="options"
          class="w-25">
      </el-cascader>
      <el-button type="primary" @click="onSearch">查询</el-button>
    </div>
  </div>
  <div ref="chartRoot" style="height: 350px"></div>
  <div ref="chartRoot1" style="height: 350px"></div>
</template>

<style scoped>

</style>
