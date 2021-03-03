<!--
显示资源使用情况，横柱状图
xdata 为y轴要显示的分类 //name
ydata 为使用量 //used
others.data 为总量 //total
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
        console.log('qindelta',this.chartData)
        var salvProName = ["服务器", "MySQL数据库", "docker容器", "redis", "消息队列中间件"];
        var salvProValue = [239, 181, 90, 40, 20];
        var salvProMax = [300, 200, 100, 50 , 40]; //背景按最大值
        // for (let i = 0; i < salvProValue.length; i++) {
        //   salvProMax.push(salvProValue[0])
        // }
        var option = {
          // backgroundColor: "#003366",
          grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            top: '2%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function(params) {
              return params[0].name + ' : ' + params[0].value
            }
          },
          xAxis: {
            show: false,
            type: 'value'
          },
          yAxis: [
            {
              type: 'category',
              inverse: true,
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              },

              data: xdata
          }, {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: '12'
              },
            },
            data: this.chartData.others.data
          }],
          series: [{
            name: '里面的值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: 'rgb(57,89,255,1)'
                }, {
                  offset: 1,
                  color: 'rgb(46,200,207,1)'
                }]),
              },
            },
            barWidth: 20,
            data: ydata
          },
            {
              name: '背景',
              type: 'bar',
              barWidth: 20,
              barGap: '-100%',
              data: this.chartData.others.data,
              itemStyle: {
                normal: {
                  color: 'rgb(188,15,252)',
                  barBorderRadius: 30,
                }
              },
            },
          ]
        };

        this.chart.setOption(option)
      }
    }
  }
</script>

<style scoped>

</style>
