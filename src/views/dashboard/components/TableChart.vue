<template>
  <div :class="className" :style="{height:height,width:width}" >
      <el-table
        :data="pageDataList"
        element-loading-text="Loading"
        v-loading="listLoading"
        border
        fit
        highlight-current-row
        :header-cell-style="setSellStyle"
        style="border-radius: 8px;border: 0px; margin-bottom: 10px"
      >
        <el-table-column v-for="item in dataList" align="center" :prop="item" :label='item'></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="pageNum"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-size="pageSize"
        :page-sizes="[1, 10, 20, 50]"
        :total='total'>

      </el-pagination>
  </div>

</template>


<script>
  import resize from '../../../utils/resize'
  import echarts from 'echarts'
  export default {

    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'table'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '25vh'
      },
      chartData:  {
        type: Object,
        // required: true
      }
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 1,
        total: 0,
        // 属性列表
        dataList: [],
        // 获取的数据列表
        nameList: [],
        // 分页之后展示的数据列表
        pageDataList: [],
        listLoading: false,
        chart: null
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods : {
      handleSizeChange(val) {
        this.pageSize = val;
        this.getList()
        // this.$emit('handleSizeChange', val)

      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getList()
        console.log('页面变化', this.pageNum)
        // this.$emit('handleCurrentChange', val)

      },
      setSellStyle({ row, column, rowIndex, columnIndex }) {
        return "background-color:#409EFF;color:#fff;font-wight:200;font-size:15px;"
      },
      initChart() {
        // this.chart = echarts.init(this.$el)
        this.setOptions()
      },
      setOptions() {
        // this.nameList = [
        //   {
        //     "id": 8,
        //     "username": "deltaqin"
        //   },
        //   {
        //     "id": 10,
        //     "username": "Defiko"
        //   },
        //   {
        //     "id": 17,
        //     "username": "iko111"
        //   },
        //   {
        //     "id": 18,
        //     "username": "333"
        //   },
        //   {
        //     "id": 19,
        //     "username": "333333"
        //   }
        // ]
        this.nameList = this.chartData
        this.dataList = []
        for (var key in this.nameList[0])
        {
          console.log(key);
          // console.log(this.nameList[0][key]);
          this.dataList.push(key)
          console.log(this.dataList)
        }
        this.getList()
      },
      getList() {
        this.total = this.nameList.length
        this.pageDataList = []
        let start  = (this.pageNum - 1) * this.pageSize
        console.log('起始索引',start)
        let max = (start + this.pageSize < this.total) ? start + this.pageSize : this.total
        for (let i = start; i< max; i++) {
          this.pageDataList.push(this.nameList[i])
          console.log(this.pageDataList)
        }
      }
    }
  }
</script>

<style >
.table .el-pagination__total {
  color: white;
}

  .table .el-pagination__jump{
    color: white;
  }
</style>
