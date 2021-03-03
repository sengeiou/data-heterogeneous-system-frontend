<!--漏斗图
xdata 为分类，由ydata的所有name组成

ydata格式，只需要值，百分比会自己计算
[
{
  value: 10,
  name: 'A'
}, {
  value: 20,
  name: 'B'
}
]
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
        var option = {
          // backgroundColor: '#000',
          // title: {
          //   // text: '转化率',
          //   // subtext: '转化的百分率或分率',
          //   // link: 'https://gallery.echartsjs.com/explore.html?u=bd-1841183165&type=work',
          //   // target: 'blank',
          //   x: 'center',
          //   top: '10',
          //   textStyle: {
          //     color: '#FFF',
          //     fontSize: 16,
          //   }
          // },

          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c}%"
          },

          legend: {
            data: xdata,
            x: 'center',
            y: '85%',
            textStyle: {
              color: '#FFF'
            }
          },

          color: ['#d6ae71', '#6D300E', '#52301C', '#471C05', '#52301C', '#6D300E', ],

          series: [

            {
              // name: 'TIT',
              type: 'funnel',
              left: 'center',
              width: '58%',
              // sort: 'ascending',
              label: {
                normal: {
                  formatter: '{b}',
                  backgroundColor: '#6D480E',
                  color: '#fff',
                  borderRadius: 3,
                  padding: [5, 5, 1, 5],
                  shadowBlur: 0,
                  shadowOffsetX: 2,
                  shadowOffsetY: 2,
                  shadowColor: '#9E853A'
                },

              },
              labelLine: {
                normal: {
                  show: true,
                  length: 30,
                  lineStyle: {
                    type: 'solid',
                    color: "#6D480E"
                  },
                }
              },
              itemStyle: {
                normal: {
                  opacity: 0.5,
                  borderColor: '#000',
                  borderWidth: 2,
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowOffsetY: 10,
                  shadowColor: 'rgba(0, 0, 0, .6)'
                }
              },
              tooltip: {
                show: false
              },

              data: ydata
            },

            {
              // name: 'TIT',
              type: 'funnel',
              left: 'center',
              width: '80%',
              maxSize: '80%',
              // sort: 'ascending',
              label: {
                normal: {
                  position: 'inside',
                  formatter: '{c}%',
                  textStyle: {
                    color: '#fff',
                    fontSize: 14,
                  },
                },
                emphasis: {
                  position: 'inside',
                  formatter: '{b}: {c}%'
                }
              },

              itemStyle: {
                normal: {
                  opacity: .9,
                  borderColor: '#B6883F',
                  borderWidth: 2,
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowOffsetY: 10,
                  shadowColor: 'rgba(0, 0, 0, .6)'
                }
              },

              data: ydata
            }
          ]
        };
        this.chart.setOption(option)
      }

    }
  }

</script>
