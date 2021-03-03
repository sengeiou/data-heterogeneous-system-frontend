<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import resize from '../../../utils/resize'
  import echarts from 'echarts'

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
      chartData: {
        type: Array,
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
    methods: {
      initChart() {
        this.chart = this.$echarts.init(this.$el)
        let angle = 0; //角度，用来做简单的动画效果的
        let t = this
        t.setOptions(angle)
      },
      setOptions(angle) {
        let t = this
        console.log('11111111111111111111111',this.chartData)
        if (this.chartData.length == 0){
          return
        }
        let value = 0
        for (let i=this.chartData.length-1 ; i>=0; i--){

          if (this.chartData[i].ydata != null && this.chartData[i].ydata != undefined && this.chartData[i].ydata != 0){

            value = this.chartData[i].ydata
            break
          }
        }

        console.log(value)
        let option = {
          // backgroundColor: "#061740",
          title: {
            text: '{a|' + value.toFixed(2) + '}{c|%}',
            x: 'center',
            y: 'center',
            textStyle: {
              rich: {
                a: {
                  fontSize: 30,
                  color: '#29EEF3'
                },

                c: {
                  fontSize: 20,
                  color: '#ffffff',
                  // padding: [5,0]
                }
              }
            }
          },
          // legend: {
          //   type: "plain",
          //   orient: "vertical",
          //   right: 0,
          //   top: "10%",
          //   align: "auto",
          //   data: [{
          //     name: '涨价后没吃过',
          //     icon: "circle"
          //   }, {
          //     name: '天天吃',
          //     icon: "circle"
          //   }, {
          //     name: '三五天吃一次',
          //     icon: "circle"
          //   }, {
          //     name: '半个月吃一次',
          //     icon: "circle"
          //   }],
          //   textStyle: {
          //     color: "white",
          //     fontSize: 16,
          //     padding: [10, 1, 10, 0]
          //   },
          //   selectedMode: false
          // },
          series: [
            {
              // name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 *0.95,
                    startAngle: (0 + angle) * Math.PI / 180,
                    endAngle: (90 + angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            },
            {
            // name: "ring5",
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), api.getHeight()) / 2 *0.95,
                  startAngle: (180 + angle) * Math.PI / 180,
                  endAngle: (270 + angle) * Math.PI / 180
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5
                },
                silent: true
              };
            },
            data: [0]
          },
            {
            // name: "ring5",
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), api.getHeight()) / 2*0.9 ,
                  startAngle: (270 + -angle) * Math.PI / 180,
                  endAngle: (40 + -angle) * Math.PI / 180
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5
                },
                silent: true
              };
            },
            data: [0]
          },
            {
            // name: "ring5",
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), api.getHeight()) / 2 *0.9,
                  startAngle: (90 + -angle) * Math.PI / 180,
                  endAngle: (220 + -angle) * Math.PI / 180
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5
                },
                silent: true
              };
            },
            data: [0]
          },
            {
            // name: "ring5",
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
              let x0 = api.getWidth() / 2;
              let y0 = api.getHeight() / 2;
              let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.9;
              let point = getCirlPoint(x0, y0, r, (90 + -angle))
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4
                },
                style: {
                  stroke: "#0CD3DB", //粉
                  fill: "#0CD3DB"
                },
                silent: true
              };
            },
            data: [0]
          },
            {
            // name: "ring5", //绿点
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
              let x0 = api.getWidth() / 2;
              let y0 = api.getHeight() / 2;
              let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.9;
              let point = getCirlPoint(x0, y0, r, (270 + -angle))
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4
                },
                style: {
                  stroke: "#0CD3DB", //绿
                  fill: "#0CD3DB"
                },
                silent: true
              };
            },
            data: [0]
          },
            {
              type: 'pie',
              radius: ['44%', '80%'],
              silent: true,
              clockwise: true,
              startAngle: 90,
              z: 0,
              zlevel: 0,
              label: {
                normal: {
                  position: "center",

                }
              },
              data: [
                {
                  value: value,
                  name: "",
                  itemStyle: {
                    normal: {
                      color: { // 完成的圆环的颜色
                        colorStops: [{
                          offset: 0,
                          color: '#4FADFD' // 0% 处的颜色
                        }, {
                          offset: 1,
                          color: '#28E8FA' // 100% 处的颜色
                        }]
                      },
                    }
                  }
                },
                {
                  value: 100 - value,
                  name: "",
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#173164"
                    }
                  }
                }
              ]
            },
          ]
        };

        // let t= this
        //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
        function getCirlPoint(x0, y0, r, angle) {
          let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
          let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
          return {
            x: x1,
            y: y1
          }
        }

        this.chart.setOption(option)

        // function draw() {
        //   angle = angle + 3
        //   t.chart.setOption(option)
        // }
        // setInterval(function() {
        //   angle = angle + 3
        //
        //     this.$nextTick(function () {
        //       t.chart.setOption(option)
        //     })
        // }, 100);

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
