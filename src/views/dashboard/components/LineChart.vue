<!--两条折线
others.yname 1折线名字
others.yname1 2折线名字
xdata
ydata  1的数据
others.ydata1  2折线的数据
-->
<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import resize from '../../../utils/resize'

  export default {

    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
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
      initChart() {
        this.chart = this.$echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      },
      setOptions({ xdata, ydata } = {}) {
        // var xData = function() {
        //   var data = [];
        //   for (var i = 1; i < 31; i++) {
        //     data.push(i + "日");
        //   }
        //   return data;
        // }();

        let xData = xdata
        var option = {
          // backgroundColor: "#1A1835",

          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              textStyle: {
                color: "#fff"
              }

            },
          },
          grid: {
            borderWidth: 0,
            top: 35,
            bottom: 55,
            right: 75,
            textStyle: {
              color: "#fff"
            }
          },
          // 右上角标注
          // legend: {
          //   x: '85%',
          //   top: '5%',
          //   textStyle: {
          //     color: '#90979c',
          //   },
          //   data: ['活跃量', '新增量']
          // },
          calculable: true,

          xAxis: [{
            type: "category",
            axisLine:{
              lineStyle:{
                color: 'yellow',
                width:2
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            data: xData,
          }],

          yAxis: [{
            type: "value",
            scale:true,
            splitLine: {
              show: false
            },
            axisLine:{
              lineStyle:{
                color: 'yellow',
                width:2
              }
            },

          }],
          dataZoom: [{
            show: true,
            height: 15,
            xAxisIndex: [0],
            bottom: 9,

            "start": 0,
            "end": 100,
            // handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            // handleSize: '110%',
            // handleStyle: {
            //   color: "#5B3AAE",
            // },
            textStyle:{
              color:"rgba(204,187,225,1)",
            },
            // fillerColor:"rgba(67,55,160,0.4)",
            // borderColor: "rgba(204,187,225,0.5)",

          }, {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35
          }],
          series: [
            {
              name: this.chartData.others.yname,
            type: "line",
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              color: "#6f7de3",
            },
            markPoint: {
              label: {
                normal: {
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              data: [{
                type: 'max',
                name: '最大值',

              }, {
                type: 'min',
                name: '最小值'
              }]
            },
            data: ydata,
          },
            {
              name: this.chartData.others.yname1,
            type: "line",
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              color: "#c257F6",
            },
            markPoint: {
              label: {
                normal: {
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              data: [{
                type: 'max',
                name: '最大值',

              }, {
                type: 'min',
                name: '最小值'
              }]
            },
            data: this.chartData.others.ydata1
          },
          ]
        }
        this.chart.setOption(option)
      }

    }
  }
</script>

<style scoped>

</style>
