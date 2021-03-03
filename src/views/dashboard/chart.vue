<template>
  <div >
    <transverse-bar v-if="chartType=='transverse'" :chartData="chartData"/>
    <pie-chart1 v-if="chartType=='pie'" :chartData="chartData"/>
    <map-chart v-if="chartType=='map'" :chartData="chartData"/>
    <line-chart v-if="chartType=='line'" :chartData="chartData"/>
    <line-chart1 v-if="chartType=='line1'" :chartData="chartData"></line-chart1>
    <line-up-down-chart v-if="chartType=='lineupdown'" :chartData="chartData"/>
<!--    <gauge-chart v-if="chartType=='gauge'" :chartData="chartData"/>-->
    <funnel-chart v-if="chartType=='funnel'" :chartData="chartData"/>
    <radar-chart v-if="chartType=='radar'" :chartData="chartData"/>
    <heat-map v-if="chartType=='heatmap'" :chartData="chartData"/>
<!--    <gauge-chart2 v-if="chartType=='gauge2'" :chartData="chartData"/>-->
    <table-chart v-if="chartType=='table'" :chartData="chartData"/>
<!--    <table-chart v-if="chartType=='table'" :chartData="chartData"-->
<!--                 @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"/>-->
  </div>
</template>

<script>
  import FunnelChart from "@/views/dashboard/components/FunnelChart";
  import LineUpDownChart from "@/views/dashboard/components/LineUpDownChart";
  import LineChart1 from "@/views/dashboard/components/LineChart1";
  import LineChart from "@/views/dashboard/components/LineChart";
  import MapChart from "@/views/dashboard/components/MapChart";
  import PieChart1 from "@/views/dashboard/components/PieChart1";
  import TransverseBar from "@/views/dashboard/components/TransverseBar";
  import RadarChart from "@/views/dashboard/components/RadarChart";
  import HeatMap from "@/views/dashboard/components/HeatMap";
  // import GaugeChart from "@/views/dashboard/components/GaugeChart";
  // import GaugeChart2 from "@/views/dashboard/components/GaugeChart2";
  import TableChart from "@/views/dashboard/components/TableChart";



  export default {
    name: "chart",
    components: {
      FunnelChart,
      LineUpDownChart,
      LineChart1,
      LineChart,
      MapChart,
      PieChart1,
      TransverseBar,
      RadarChart,
      HeatMap,
      TableChart
    },
    data() {
      return{
        //这里十分关键，主要作用，不能使用model赋值
        chartData : {},
      }
    },
    watch: {
      chartType: {
        immediate:true,
        deep: true,
        handler(val) {
          console.log('图表变化')
          this.init()
          // this.setOptions(val)
        }
      },
      chartData1: {
        immediate:true,
        deep: true,
        handler(val) {
          console.log('数据变化')
          this.init()
          // this.setOptions(val)
        }
      }
    },
    props : {
      chartType: {
        type: String,
        default: 'line1'
      },
      chartData1:  {
        type: Array,
        // required: true
      },
      axis: {
        type: String,

      }
    },
    methods :{
      init(){
        console.log('chartData',this.chartData1)
        console.log('chartType',this.chartType)
        this.formateChartData(this.chartData1,this.chartType)
      },
      // handleCurrentChange(val)
      formateChartData(data, chartType) {

        // console.log('111111')
        if (chartType == 'table') {
          this.chartData = data
        } else if (chartType == 'pie') {
          this.chartData['ydata'] = data
          // console.log(chartData)

        }  else if (chartType == 'line1' || chartType == 'line') {
          console.log(this.axis)
          let dataList = [], tempy = []
          for (var key in data[0]) {
            dataList.push(key)
            if (key != this.axis) {
              tempy.push(key)
              console.log(tempy)
            }
          }
          if (!this.axis in dataList) {
            this.$message({
              type: 'error',
              message: '横坐标不存在'
            })
          }
          if (chartType == 'line1') {
            let xdata = [], ydata = []
            for (let item in data) {
              xdata.push(data[item][this.axis])
              ydata.push(data[item][tempy[0]])
            }
            this.chartData['xdata'] = xdata
            this.chartData['ydata'] = ydata

          } else {
            let xdata = [], ydata = [], others = { yname: tempy[0], yname1: tempy[1], ydata1: [] }
            for (let index in data) {
              // others.yname 1折线名字
              // others.yname1 2折线名字
              // xdata
              // ydata  1的数据
              // others.ydata1  2折线的数据
              xdata.push(data[index][this.axis])
              ydata.push(data[index][tempy[0]])
              others.ydata1.push(data[index][tempy[1]])
            }
            this.chartData['xdata'] = xdata
            this.chartData['ydata'] = ydata
            this.chartData['others'] = others

          }
        } else if (chartType == 'transverse') {
          console.log('qqqqqqqqqqqqqq',data)
          let name = [], used = [], total = []
          for (let index in data) {
            // others.yname 1折线名字
            // others.yname1 2折线名字
            // xdata
            // ydata  1的数据
            // others.ydata1  2折线的数据
            name.push(data[index]['name'])
            used.push(data[index]['used'])
            total.push(data[index]['total'])
          }
          // name = ["cpu","io","内存"]
          // used = [10,20,50]
          // total = [50,100,60]
          this.chartData['xdata'] = name
          this.chartData['ydata'] = used
          let  tmp = {}
          tmp['data'] = total
          this.chartData['others'] = tmp

          console.log('qqqq',this.chartData)

        } else if (chartType == 'funnel') {
          // console.log(data)
          let xdata = []
          for (let index in data) {
            xdata.push(data[index]['name'])
          }
          this.chartData['xdata'] = xdata
          this.chartData['ydata'] = data

        } else if (chartType == 'heatmap') {
          // console.log(data)
          // data = [
          //   {
          //     time: '2020-10-06 19:32:38',
          //     value: 20
          //   },
          //   {
          //     time: '2020-10-07 19:32:38',
          //     value: 90
          //   },
          //   {
          //     time: '2020-10-08 19:32:38',
          //     value: 50
          //   }
          // ]
          let value = [],
            xdata = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            ydata = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
          for (let index in data) {
            let d = new Date(data[index]['time'].replace(/-/g, '/'))
            let day = ydata[d.getDay()]
            let month = xdata[d.getMonth()]
            value.push([day, month, data[index]['value']])
          }
          console.log(this.chartData)
          this.chartData['xdata'] = xdata
          this.chartData['ydata'] = ydata
          let  tmp = {}
          tmp['data'] = value
          this.chartData['others'] = tmp

        }
      },

    }

  }
</script>

<style scoped>
  .chart {
    /*background-color: #1c44de;*/
    height: 30vh;
    /*height: 225px;*/
    margin: 6px 50px 0 0;
    position: relative;

  }
</style>
