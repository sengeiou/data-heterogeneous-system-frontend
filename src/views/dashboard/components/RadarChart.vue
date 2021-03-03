<!--雷达
xdata 每个边角以及最大值
  [{
    name: "sales",
    max: 6500
  }, {
    name: "Administration",
    max: 16000
  }, {
    name: "Information Techology",
    max: 30000
  }, {
    name: "Customer Support",
    max: 38000
  }, {
    name: "Development",
    max: 52000
  }, {
    name: "Marketing",
    max: 25000
  }],

ydata [{
        value: [4300, 10000, 28000, 35000, 50000, 19000],
        name: "Allocated Budget"
      }, {
        value: [5000, 14000, 28000, 31000, 42000, 21000],
        name: "Actual Spending"
      }]


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
        // var imgPath = ['http://bmob-cdn-15355.b0.upaiyun.com/2017/12/01/bee4341c4089af7980b87074a77479ad.png']
        let option = {
          // backgroundColor: '#101736',
          color: ['#00c2ff', '#f9cf67', '#e92b77'],
          // 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
          // legend: {
          //   show: true,
          //   // icon: 'circle',//图例形状
          //   bottom: 45,
          //   center: 0,
          //   itemWidth: 14, // 图例标记的图形宽度。[ default: 25 ]
          //   itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
          //   itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
          //   textStyle: {
          //     fontSize: 14,
          //     color: '#ade3ff'
          //   },
          //   // data: ['2016', '2017', '2018'],
          //   data: ["Allocated Budget", "Actual Spending"]
          // },
          tooltip: {},
          radar: [{
            indicator: xdata,
            //   [{
            //   name: "sales",
            //   max: 6500
            // }, {
            //   name: "Administration",
            //   max: 16000
            // }, {
            //   name: "Information Techology",
            //   max: 30000
            // }, {
            //   name: "Customer Support",
            //   max: 38000
            // }, {
            //   name: "Development",
            //   max: 52000
            // }, {
            //   name: "Marketing",
            //   max: 25000
            // }],

            textStyle: {
              color: 'red'
            },
            center: ['50%', '50%'],
            radius: 100,
            startAngle: 90,
            splitNumber: 3,
            orient: 'horizontal', // 图例列表的布局朝向,默认'horizontal'为横向,'vertical'为纵向.
            // shape: 'circle',
            // backgroundColor: {
            //     image:imgPath[0]
            // },
            name: {
              formatter: '{value}',
              textStyle: {
                fontSize: 14, //外圈标签字体大小
                color: '#5b81cb' //外圈标签字体颜色
              }
            },
            splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
              show: true,
              areaStyle: { // 分隔区域的样式设置。
                color: ['#141c42', '#141c42'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
              }
            },
            // axisLabel:{//展示刻度
            //     show: true
            // },
            axisLine: { //指向外圈文本的分隔线样式
              lineStyle: {
                color: '#153269'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#113865', // 分隔线颜色
                width: 1, // 分隔线线宽
              }
            }
          }, ],
          series: [{
            name: '雷达图',
            type: 'radar',
            itemStyle: {
              emphasis: {
                lineStyle: {
                  width: 4
                }
              }
            },
            data: ydata
            // data: [
            // //   {
            // //   name: '2016',
            // //   value: [85, 65, 55, 90, 82],
            // //   areaStyle: {
            // //     normal: { // 单项区域填充样式
            // //       color: {
            // //         type: 'linear',
            // //         x: 0, //右
            // //         y: 0, //下
            // //         x2: 1, //左
            // //         y2: 1, //上
            // //         colorStops: [{
            // //           offset: 0,
            // //           color: '#00c2ff'
            // //         }, {
            // //           offset: 0.5,
            // //           color: 'rgba(0,0,0,0)'
            // //         }, {
            // //           offset: 1,
            // //           color: '#00c2ff'
            // //         }],
            // //         globalCoord: false
            // //       },
            // //       opacity: 1 // 区域透明度
            // //     }
            // //   },
            // //   symbolSize: 2.5, // 单个数据标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
            // //   label: {                    // 单个拐点文本的样式设置
            // //     normal: {
            // //       show: true,             // 单个拐点文本的样式设置。[ default: false ]
            // //       position: 'top',        // 标签的位置。[ default: top ]
            // //       distance: 2,            // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。[ default: 5 ]
            // //       color: '#6692e2',          // 文字的颜色。如果设置为 'auto'，则为视觉映射得到的颜色，如系列色。[ default: "#fff" ]
            // //       fontSize: 14,           // 文字的字体大小
            // //       formatter:function(params) {
            // //         return params.value;
            // //       }
            // //     }
            // //   },
            // //   itemStyle: {
            // //     normal: { //图形悬浮效果
            // //       borderColor: '#00c2ff',
            // //       borderWidth: 2.5
            // //     }
            // //   },
            // //   // lineStyle: {
            // //   //     normal: {
            // //   //         opacity: 0.5// 图形透明度
            // //   //     }
            // //   // }
            // // },
            // //   {
            // //   name: '2017',
            // //   value: [50, 20, 45, 30, 75],
            // //   symbolSize: 2.5,
            // //   itemStyle: {
            // //     normal: {
            // //       borderColor: '#f9cf67',
            // //       borderWidth: 2.5,
            // //     }
            // //   },
            // //   areaStyle: {
            // //     normal: { // 单项区域填充样式
            // //       color: {
            // //         type: 'linear',
            // //         x: 0, //右
            // //         y: 0, //下
            // //         x2: 1, //左
            // //         y2: 1, //上
            // //         colorStops: [{
            // //           offset: 0,
            // //           color: '#f9cf67'
            // //         }, {
            // //           offset: 0.5,
            // //           color: 'rgba(0,0,0,0)'
            // //         }, {
            // //           offset: 1,
            // //           color: '#f9cf67'
            // //         }],
            // //         globalCoord: false
            // //       },
            // //       opacity: 1 // 区域透明度
            // //     }
            // //   },
            // //   // lineStyle: {
            // //   //     normal: {
            // //   //         opacity: 0.5// 图形透明度
            // //   //     }
            // //   // }
            // // },
            // //   {
            // //   name: '2018',
            // //   value: [37, 80, 12, 50, 25],
            // //   symbolSize: 2.5,
            // //   itemStyle: {
            // //     normal: {
            // //       borderColor: '#e92b77',
            // //       borderWidth: 2.5,
            // //     }
            // //   },
            // //   areaStyle: {
            // //     normal: { // 单项区域填充样式
            // //       color: {
            // //         type: 'linear',
            // //         x: 0, //右
            // //         y: 0, //下
            // //         x2: 1, //左
            // //         y2: 1, //上
            // //         colorStops: [{
            // //           offset: 0,
            // //           color: '#e92b77'
            // //         }, {
            // //           offset: 0.5,
            // //           color: 'rgba(0,0,0,0)'
            // //         }, {
            // //           offset: 1,
            // //           color: '#e92b77'
            // //         }],
            // //         globalCoord: false
            // //       },
            // //       opacity: 1 // 区域透明度
            // //     }
            // //   }
            // // },
            //   {
            //     value: [4300, 10000, 28000, 35000, 50000, 19000],
            //     name: "Allocated Budget"
            //   }, {
            //     value: [5000, 14000, 28000, 31000, 42000, 21000],
            //     name: "Actual Spending"
            //   }
            // ]
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
