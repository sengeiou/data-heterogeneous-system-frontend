<template>
  <div :class="className" :style="{height:height,width:width}" >111</div>

</template>


<script>
  import resize from '../../../utils/resize'
  import echarts from 'echarts'
  import echartsLiquidfill from 'echarts-liquidfill'//在这里引入
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
    methods : {
      initChart() {
        this.chart = echarts.init(this.$el)
        this.setOptions(this.chartData)
      },

      setOptions({ xdata, ydata } = {}) {
        let t = this
        let data = []
        // for (let i=this.chartData.ydata.length-1 ; i>=0; i--){
        //   if (this.chartData.ydata[i] != null && this.chartData.ydata[i] != undefined)
        //     data.push(this.chartData.ydata[i]/100)
        // }

        console.log('11111111111111111111111',this.chartData)
        if (this.chartData.length == 0){
          return
        }
        for (let i=this.chartData.length-1 ; i>=0; i--){
          if (this.chartData[i].ydata != null && this.chartData[i].ydata != undefined && this.chartData[i].ydata != 0){
            // value = this.chartData[i].ydata
            data.push(this.chartData[i].ydata/100)
            break
          }
        }
        console.log(data)


        // console.log(value)
        // var value = 0.2;
        // this.chartData.ydata;
        let option = {
          // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
          //     offset: 0,
          //     color: '#431ab8'
          //   }, {
          //     offset: 1,
          //     color: '#471bba'
          //   }]),
          // title: {
          //   text: (value * 100).toFixed(2) + '{a|%}',
          //   textStyle: {
          //     fontSize: 40,
          //     fontFamily: 'Microsoft Yahei',
          //     fontWeight: 'normal',
          //     color: '#bcb8fb',
          //     rich: {
          //       a: {
          //         fontSize: 28,
          //       }
          //     }
          //   },
          //   x: 'center',
          //   y: '35%'
          // },
          // graphic: [{
          //   type: 'group',
          //   left: 'center',
          //   top: '60%',
          //   // children: [{
          //   //   type: 'text',
          //   //   z: 100,
          //   //   left: '10',
          //   //   top: 'middle',
          //   //   style: {
          //   //     fill: '#aab2fa',
          //   //     text: '流量统计',
          //   //     font: '20px Microsoft YaHei'
          //   //   }
          //   // }]
          // }],
          series: [
            {
              type: 'liquidFill',
              radius: '80%',
              center: ['50%', '50%'],
              //  shape: 'roundRect',
              data: data,
              // backgroundStyle: {
              //   color: {
              //     type: 'linear',
              //     x: 1,
              //     y: 0,
              //     x2: 0.5,
              //     y2: 1,
              //     colorStops: [{
              //       offset: 1,
              //       color: 'rgba(68, 145, 253, 0)'
              //     }, {
              //       offset: 0.5,
              //       color: 'rgba(68, 145, 253, .25)'
              //     }, {
              //       offset: 0,
              //       color: 'rgba(68, 145, 253, 1)'
              //     }],
              //     globalCoord: false
              //   },
              // },
              // outline: {
              //   borderDistance: 0,
              //   itemStyle: {
              //     borderWidth: 20,
              //     borderColor: {
              //       type: 'linear',
              //       x: 0,
              //       y: 0,
              //       x2: 0,
              //       y2: 1,
              //       colorStops: [{
              //         offset: 0,
              //         color: 'rgba(69, 73, 240, 0)'
              //       }, {
              //         offset: 0.5,
              //         color: 'rgba(69, 73, 240, .25)'
              //       }, {
              //         offset: 1,
              //         color: 'rgba(69, 73, 240, 1)'
              //       }],
              //       globalCoord: false
              //     },
              //     shadowBlur: 10,
              //     shadowColor: '#000',
              //   }
              // },
              // color: {
              //   type: 'linear',
              //   x: 0,
              //   y: 0,
              //   x2: 0,
              //   y2: 1,
              //   colorStops: [{
              //     offset: 1,
              //     color: 'rgba(58, 71, 212, 0)'
              //   }, {
              //     offset: 0.5,
              //     color: 'rgba(31, 222, 225, .2)'
              //   }, {
              //     offset: 0,
              //     color: 'rgba(31, 222, 225, 1)'
              //   }],
              //   globalCoord: false
              // },
              label: {
                normal: {
                  // formatter: function(param) {
                  //   return param.value.toFixed(2);
                  // },

                  show: true,
                  textStyle: {
                    color:'#ffffff',//水球显示文字颜色
                    fontSize: '40',
                    // fontFamily:'serif',
                    // fontWeight: '100'
                  }
                }
              }
            },
          ]
        };
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
