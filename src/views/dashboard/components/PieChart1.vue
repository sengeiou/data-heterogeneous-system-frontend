<!--xdata不需要传数据，ydata数据格式
              [
                {
                value: 10,
                name: 'IDS'
                },
                {
                  value: 5,
                  name: 'VPN'
                }
              ]
              -->
<!--<template>-->
<!--  <div :class="className" :style="{height:height,width:width}" />-->

<!--</template>-->
<template>
  <div>
    <div ref="bar_dv" :style="{height:height,width:width}" class="chart"></div>
  </div>
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
        chart: null,
        fl: 0,
      }
    },
    watch: {
      chartData: {
        immediate:true,
        deep: true,
        handler(val) {
          console.log('数据变化')
          this.$nextTick(() => {
            // this.setOptions(val)
            // this.initChart()
          })
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
        // this.chart = this.$echarts.init(this.$el, 'macarons')
        //
        console.log(this.fl + this.chartData)
        this.fl++
        if (true) {
          this.chart = this.$echarts.init(this.$refs.bar_dv)
          this.setOptions(this.chartData)
        }
      },
      setOptions({ xdata, ydata } = {}) {
          let option = {
            // backgroundColor:"#0B1837",
            color: ["#EAEA26", "#906BF9", "#FE5656", "#01E17E", "#3DD1F9", "#FFAD05"],
            // title: {
            //     text: '网络/安全设备',
            //     left: '60',
            //     top: 0,
            //     textAlign: 'center',
            //     textStyle: {
            //         color: '#fff',
            //         fontSize: 14,
            //         fontWeight: 0
            //     }
            // },
            // 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。
            // 可以在网格上绘制折线图，柱状图，散点图（气泡图）。
            // grid: {
            //   left: -100,
            //   top: 50,
            //   bottom: 10,
            //   right: 10,
            //   containLabel: true
            // },
            // 提示框组件
            tooltip: {
              trigger: 'item',
              formatter: "{b} : {c} ({d}%)"
            },
            // 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
            // legend: {
            //   type: "scroll",
            //   orient: "vartical",
            //   // x: "right",
            //   top: "center",
            //   right: "15",
            //   // bottom: "0%",
            //   itemWidth: 16,
            //   itemHeight: 8,
            //   itemGap: 16,
            //   textStyle: {
            //     color: '#A3E2F4',
            //     fontSize: 12,
            //     fontWeight: 0
            //   },
            //   data: ['IDS', 'VPN', '交换机', '防火墙', 'WAF', '堡垒机']
            //   // data: xdata
            // },
            //极坐标系，可以用于散点图和折线图。每个极坐标系拥有一个角度轴和一个半径轴。
            polar: {},
            //极坐标系的角度轴。
            angleAxis: {
              interval: 1,
              //坐标轴类型。
              //               可选：
              // 'value' 数值轴，适用于连续数据。
              // 'category' 类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 angleAxis.data 设置类目数据。
              // 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
              // 'log' 对数轴。适用于对数数据。
              type: 'category',
              data: [],
              z: 10,
              // //坐标轴轴线相关设置。
              // axisLine: {
              //   show: true,
              //   lineStyle: {
              //     color: "#0B4A6B",
              //     width: 1,
              //     type: "solid"
              //   },
              // },
              // //坐标轴刻度标签的相关设置。
              // axisLabel: {
              //   interval: 0,
              //   show: true,
              //   color: "#0B4A6B",
              //   margin: 8,
              //   fontSize: 16
              // },
            },
            //极坐标系的径向轴。
            radiusAxis: {
              //刻度最小值
              min: 40,
              max: 120,
              interval: 20,
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#0B3E5E",
                  width: 1,
                  type: "solid"
                },
              },
              axisLabel: {
                formatter: '{value} %',
                show: false,
                padding: [0, 0, 20, 0],
                color: "#0B3E5E",
                fontSize: 16
              },
              splitLine: {
                lineStyle: {
                  color: "#0B3E5E",
                  width: 2,
                  type: "solid"
                }
              }
            },
            calculable: true,
            series: [
            //   {
            //   type: 'pie',
            //   radius: ["5%", "10%"],
            //   hoverAnimation: false,
            //   labelLine: {
            //     normal: {
            //       show: false,
            //       length: 30,
            //       length2: 55
            //     },
            //     emphasis: {
            //       show: false
            //     }
            //   },
            //   data: [{
            //     name: '',
            //     value: 0,
            //     itemStyle: {
            //       normal: {
            //         color: "#0B4A6B"
            //       }
            //     }
            //   }]
            // },
            //   {
            //   type: 'pie',
            //   radius: ["90%", "95%"],
            //   hoverAnimation: false,
            //   labelLine: {
            //     normal: {
            //       show: false,
            //       length: 30,
            //       length2: 55
            //     },
            //     emphasis: {
            //       show: false
            //     }
            //   },
            //   name: "",
            //   data: [{
            //     name: '',
            //     value: 0,
            //     itemStyle: {
            //       normal: {
            //         color: "#0B4A6B"
            //       }
            //     }
            //   }]
            // },
              {
                stack: 'a',
                type: 'pie',
                radius: ['20%', '80%'],
                roseType: 'area',
                zlevel:10,
                label: {
                  normal: {
                    show: true,
                    formatter: "{c}",
                    textStyle: {
                      fontSize: 12,
                    },
                    position: 'outside'
                  },
                  emphasis: {
                    show: true
                  }
                },
                labelLine: {
                  normal: {
                    show: true,
                    length: 20,
                    length2: 55
                  },
                  emphasis: {
                    show: false
                  }
                },
                  data: ydata
              },
            ]
          }
          this.chart.setOption(option)
        }

    }
  }
</script>

<style scoped>
  .chart {
    /*background-color: #1c44de;*/
    /*height: 3rem;*/
    height: 225px;
    margin: 6px 50px 0 0;
    position: relative;

  }
</style>
