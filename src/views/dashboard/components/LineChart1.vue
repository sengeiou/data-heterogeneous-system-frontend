<!--
cpu 使用的折线图
 xdata 数组
 ydata 数组
 个数对应即可
 -->
<template>
  <div :class="className" :style="{height:height,width:width}" >111</div>

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
        this.chart = echarts.init(this.$el)
        this.setOptions(this.chartData)
      },

      setOptions({ xdata, ydata } = {}) {
        var base = +new Date(1968, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        var date = [];

        var data = [Math.random() * 300];

        for (var i = 1; i < 20000; i++) {
          var now = new Date(base += oneDay);
          date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
          data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
        }

        let option = {
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xdata,
            //设置坐标轴字体颜色和宽度
            axisLine:{
              lineStyle:{
                color: 'yellow',
                width:2
              }
            },
          },
          yAxis: {
            type: 'value',
            scale:true,
            boundaryGap: [0, '100%'],
            axisLine:{
              lineStyle:{
                color: 'yellow',
                width:2
              }
            },
          },
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 100
            }, {
              type: 'slider',
              // start: 0,
              // end: 100,
              // handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              // handleSize: '80%',
              textStyle: {
                color : '#fff'
              },
              // handleStyle: {
              //   color: '#fff',
              //   shadowBlur: 3,
              //   shadowColor: 'rgba(0, 0, 0, 0.6)',
              //   shadowOffsetX: 2,
              //   shadowOffsetY: 2
              // }
            },
            {
              type: 'slider',
              yAxisIndex: 0,
              filterMode: 'empty',
              textStyle: {
                color : '#fff'
              },
            }
          ],
          series: [
            {
              // name: '模拟数据',

              type: 'line',
              // smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: 'rgb(255, 70, 131)'
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
                }, {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
                }])
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

<style scoped>
div {
  color: white;
}
</style>
