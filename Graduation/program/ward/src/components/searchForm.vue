<template>
  <div class="searchForm m-4">
    <span style="line-height: 32px">请选择查询的病床：</span>
    <el-cascader
        v-model="searchInfo"
        :options="options"
        class="w-25">
    </el-cascader>
    <el-button type="primary" @click="onSearch">查询</el-button>
  </div>
</template>

<script>
export default {
  name: "searchForm",
  data() {
    return {
      searchInfo: [],
      options: [
        {
          value: '1',
          label: '1号房',
          children: [
            {
              value: "0",
              label: "所有病床"
            },
            {
              value: '1',
              label: '1号床',
            }, {
              value: '2',
              label: '2号床',
            }, {
              value: '3',
              label: '3号床',
            }, {
              value: '4',
              label: '4号床',
            }, {
              value: '5',
              label: '5号床',
            }, {
              value: '6',
              label: '6号床',
            }]
        },
        {
          value: '2',
          label: '2号房',
          children: [ {
            value: "0",
            label: "所有病床"
          },{
            value: '1',
            label: '1号床',
          }, {
            value: '2',
            label: '2号床',
          }, {
            value: '3',
            label: '3号床',
          }, {
            value: '4',
            label: '4号床',
          }, {
            value: '5',
            label: '5号床',
          }, {
            value: '6',
            label: '6号床',
          }]
        },
        {
          value: '3',
          label: '3号房',
          children: [ {
            value: "0",
            label: "所有病床"
          },{
            value: '1',
            label: '1号床',
          }, {
            value: '2',
            label: '2号床',
          }, {
            value: '3',
            label: '3号床',
          }, {
            value: '4',
            label: '4号床',
          }, {
            value: '5',
            label: '5号床',
          }, {
            value: '6',
            label: '6号床',
          }]
        },
        {
          value: '4',
          label: '4号房',
          children: [ {
            value: "0",
            label: "所有病床"
          },{
            value: '1',
            label: '1号床',
          }, {
            value: '2',
            label: '2号床',
          }, {
            value: '3',
            label: '3号床',
          }, {
            value: '4',
            label: '4号床',
          }, {
            value: '5',
            label: '5号床',
          }, {
            value: '6',
            label: '6号床',
          }]
        },
        {
          value: '5',
          label: '5号房',
          children: [ {
            value: "0",
            label: "所有病床"
          },{
            value: '1',
            label: '1号床',
          }, {
            value: '2',
            label: '2号床',
          }, {
            value: '3',
            label: '3号床',
          }, {
            value: '4',
            label: '4号床',
          }, {
            value: '5',
            label: '5号床',
          }, {
            value: '6',
            label: '6号床',
          }]
        },
        {
          value: '6',
          label: '6号房',
          children: [ {
            value: "0",
            label: "所有病床"
          },{
            value: '1',
            label: '1号床',
          }, {
            value: '2',
            label: '2号床',
          }, {
            value: '3',
            label: '3号床',
          }, {
            value: '4',
            label: '4号床',
          }, {
            value: '5',
            label: '5号床',
          }, {
            value: '6',
            label: '6号床',
          }]
        }]
    }
  },
  methods:{
    onSearch(){
      this.$emit("SearchWard",[this.searchInfo[0],this.searchInfo[1]])
    }
  }
}
</script>

<style scoped>

.searchForm {
  display: flex;
  justify-content: center;
}

</style>