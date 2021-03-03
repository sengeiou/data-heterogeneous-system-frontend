<template>
  <div>
    <div class="panal">
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        style="top: 10px; left: 10px;position:absolute;"
      >
      </el-date-picker>
      <h1>{{ this.$route.query.dbName }}--资源监控面板</h1>
      <div class="panel-footer"></div>
    </div>
    <div class="panal">
      <h1>{{ this.$route.query.dbName }}--cpu</h1>
      <el-row :gutter="20">
        <div v-for="item in fetchedPanalData" v-if="showThis(item.info.sqlStatement, 'cpu')">
          <el-col :span="6">
            <div class="panal1">
              <h2>{{ item.info.panalName }}</h2>
              <div class="chart">
                <chart :chartType="panalTypeArray[item.info.panalTypeId]" :chart-data1="item.data" axis="xdata"/>
              </div>
              <div class="panel-footer"></div>

            </div>
            <el-row :gutter="5">
              <el-col :span="8">
                <div class="panal2" v-waves @click="updateChart(item)">修改
                </div>
              </el-col>
              <el-col :span="8">
                <div class="panal2" v-waves @click="removeChart(item.info)">删除
                </div>
              </el-col>
              <!--              <el-col :span="8">-->
              <!--                <div class="panal2" v-waves @click="warning(item.info)">预警-->
              <!--                </div>-->
              <!--              </el-col>-->
            </el-row>
          </el-col>
        </div>
        <el-col :span="6">
          <div class="panal1">
            <div class="el-icon-circle-plus-outline add-icon" @click="addNewChart()"></div>
            <div class="panel-footer"></div>
          </div>
        </el-col>

      </el-row>
      <div class="panel-footer"></div>

    </div>
    <div class="panal">
      <h1>{{ this.$route.query.dbName }}--内存</h1>
      <el-row :gutter="20">
        <div v-for="item in fetchedPanalData" v-if="showThis(item.info.sqlStatement, 'mem')">
          <el-col :span="6">
            <div class="panal1">
              <h2>{{ item.info.panalName }}</h2>
              <div class="chart">
                <chart :chartType="panalTypeArray[item.info.panalTypeId]" :chart-data1="item.data" axis="xdata"/>

              </div>
              <div class="panel-footer"></div>

            </div>
            <el-row :gutter="5">
              <el-col :span="8">
                <div class="panal2" v-waves @click="updateChart(item)">修改
                </div>
              </el-col>
              <el-col :span="8">
                <div class="panal2" v-waves @click="removeChart(item.info)">删除
                </div>
              </el-col>
              <!--              <el-col :span="8">-->
              <!--                <div class="panal2" v-waves @click="warning(item.info)">预警-->
              <!--                </div>-->
              <!--              </el-col>-->
            </el-row>
          </el-col>
        </div>
        <el-col :span="6">
          <div class="panal1">
            <div class="el-icon-circle-plus-outline add-icon" @click="addNewChart()"></div>
            <div class="panel-footer"></div>
          </div>
        </el-col>

      </el-row>
      <div class="panel-footer"></div>

    </div>
    <div class="panal">
      <h1>{{ this.$route.query.dbName }}--磁盘 IO</h1>
      <el-row :gutter="20">
        <div v-for="item in fetchedPanalData" v-if="showThis(item.info.sqlStatement, 'disk')">
          <el-col :span="6">
            <div class="panal1">
              <h2>{{ item.info.panalName }}</h2>
              <div class="chart">
                <chart :chartType="panalTypeArray[item.info.panalTypeId]" :chart-data1="item.data" axis="xdata"/>

              </div>
              <div class="panel-footer"></div>

            </div>
            <el-row :gutter="5">
              <el-col :span="8">
                <div class="panal2" v-waves @click="updateChart(item)">修改
                </div>
              </el-col>
              <el-col :span="8">
                <div class="panal2" v-waves @click="removeChart(item.info)">删除
                </div>
              </el-col>
              <el-col :span="8">
                <div class="panal2" v-waves @click="warning(item.info)">预警
                </div>
              </el-col>
            </el-row>
          </el-col>
        </div>
        <el-col :span="6">
          <div class="panal1">
            <div class="el-icon-circle-plus-outline add-icon" @click="addNewChart()"></div>
            <div class="panel-footer"></div>
          </div>
        </el-col>

      </el-row>
      <div class="panel-footer"></div>

    </div>
    <div class="panal">
      <h1>{{ this.$route.query.dbName }}--网络 IO</h1>
      <el-row :gutter="20">
        <div v-for="item in fetchedPanalData" v-if="showThis(item.info.sqlStatement, 'net')">
          <el-col :span="6">
            <div class="panal1">
              <h2>{{ item.info.panalName }}</h2>
              <div class="chart">
                <chart :chartType="panalTypeArray[item.info.panalTypeId]" :chart-data1="item.data" axis="xdata"/>

              </div>
              <div class="panel-footer"></div>

            </div>
            <el-row :gutter="5">
              <el-col :span="8">
                <div class="panal2" v-waves @click="updateChart(item)">修改
                </div>
              </el-col>
              <el-col :span="8">
                <div class="panal2" v-waves @click="removeChart(item.info)">删除
                </div>
              </el-col>
              <el-col :span="8">
                <div class="panal2" v-waves @click="warning(item.info)">预警
                </div>
              </el-col>
            </el-row>
          </el-col>
        </div>
        <el-col :span="6">
          <div class="panal1">
            <div class="el-icon-circle-plus-outline add-icon" @click="addNewChart()"></div>
            <div class="panel-footer"></div>
          </div>
        </el-col>

      </el-row>
      <div class="panel-footer"></div>

    </div>
    <div class="panal">
      <h1>{{ this.$route.query.dbName }}--其他</h1>
      <el-row :gutter="20">
        <div v-for="item in fetchedPanalData" v-if="showOthers(item.info.sqlStatement)">
          <el-col :span="6">
            <div class="panal1">
              <h2>{{ item.info.panalName }}</h2>
              <div class="chart">
                <chart :chartType="panalTypeArray[item.info.panalTypeId]" :chart-data1="item.data" axis="xdata"/>

              </div>
              <div class="panel-footer"></div>

            </div>
            <el-row :gutter="5">
              <el-col :span="8">
                <div class="panal2" v-waves @click="updateChart(item)">修改
                </div>
              </el-col>
              <el-col :span="8">
                <div class="panal2" v-waves @click="removeChart(item.info)">删除
                </div>
              </el-col>
              <el-col :span="8">
                <div class="panal2" v-waves @click="warning(item.info)">预警
                </div>
              </el-col>
            </el-row>
          </el-col>
        </div>
        <el-col :span="6">
          <div class="panal1">
            <div class="el-icon-circle-plus-outline add-icon" @click="addNewChart()"></div>
            <div class="panel-footer"></div>
          </div>
        </el-col>

      </el-row>
      <div class="panel-footer"></div>
    </div>
    <el-drawer
      :title="drawerTitle"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      size="50%"
    >
      <div class="demo-drawer__content">
        <el-form :model="formatData">
          <el-form-item label="面板名称" :label-width="formLabelWidth">
            <el-input v-model="formatData.panalName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="信息类型" :label-width="formLabelWidth">
            <el-select v-model="measurement" placeholder="请选择信息类型(measurement)">
              <el-option v-for="item in measurements" :label="item[0]" :value="item[0]"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面板类型" :label-width="formLabelWidth">
            <div>
              <el-button icon="el-icon-s-marketing" :type="(chartType=='line1')? 'primary':'info'" round
                         @click="selectChartType('line1')" style="margin-bottom: 10px">折线图1
              </el-button>
              <el-button icon="el-icon-s-marketing" :type="(chartType=='gauge')? 'primary':'info'" round
                         @click="selectChartType('gauge')" style="margin-bottom: 10px">仪表盘
              </el-button>
              <el-button icon="el-icon-s-marketing" :type="(chartType=='gauge2')? 'primary':'info'" round
                         @click="selectChartType('gauge2')" style="margin-bottom: 10px">仪表盘2
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="监控项" :label-width="formLabelWidth">
            <el-select v-model="field" placeholder="请选择监控项">
              <el-option v-for="item in fields" :label="item[0]" :value="item[0]"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="sql预览" :label-width="formLabelWidth">
            <el-input v-model="SQLStatement" type="textarea" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="图表预览" :label-width="formLabelWidth">
            <div :class="{background:(chartType!='table') }" v-show="(chartData.length != 0) && flag">

              <chart v-show="chartType=='line1'" :chartType="chartType" :chart-data1="chartData" axis="xdata"/>
              <gauge-chart v-show="chartType=='gauge'" :chart-data="chartData"/>
              <!--              <div v-show="chartType=='gauge'">111</div>-->
              <gauge-chart2 v-show="chartType=='gauge2'" :chart-data="chartData"/>
            </div>

            <!--            <line-chart1/>-->
          </el-form-item>
        </el-form>
      </div>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="handleClose" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import waves from '@/directive/waves/waves'
import * as getChart from '@/api/chart'
import chart from '@/views/dashboard/chart'
import GaugeChart from '@/views/dashboard/components/GaugeChart'
import GaugeChart2 from '@/views/dashboard/components/GaugeChart2'
import * as getPanal from '@/api/datasourceApi'

export default {
  name: 'index',
  directives: { waves },
  components: {
    chart,
    GaugeChart,
    GaugeChart2
  },
  computed: {
    SQLStatement() {
      let startTime, endTime

      endTime = new Date()
      startTime = new Date()
      startTime.setTime(startTime.getTime() - 3600 * 1000 * 12)

      let start = startTime.getTime()
      let end = endTime.getTime()
      return 'SELECT mean(\"' + this.field + '\") FROM \"' + this.measurement + '\" WHERE time >= ' + start + 'ms and time <= ' + end + 'ms GROUP BY time(20s)'
    }
  },
  watch: {
    // 如果发生改变，这个函数就会运行
    measurement: function(newType, oldType) {
      if (newType != null && newType != '') {
        this.getField()
        this.field = ''
      }
    },
    field(newValue, old) {
      this.getChartData()
    },
    value2: {
      immediate: true,
      deep: true,
      handler(val) {
        //重发请求
        console.log('Time', val, val[0].getTime(), val[1].getTime())

        this.init()
      }
    }
  },
  data() {
    return {
      flag: false,
      fetchedPanalInfo: [],
      fetchedPanalData: [],
      chartData: [],
      chartType: '',
      drawerTitle: '',
      table: false,
      dialog: false,
      loading: false,

      formatData: {
        id: null,
        panalName: '',
        panalTypeId: 0,
        dbId: '',
        sqlStatement: ''
      },
      formLabelWidth: '80px',
      timer: null,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value2: '',
      DBIndex: 0,
      // SQLStatement: "",
      measurement: '',
      measurements: [],
      field: '',
      fields: [],
      panalTypeArray: []
    }
  },
  created() {
    this.init()
    console.log(this.$store.getters.panalTypeArray)
    this.panalTypeArray = this.$store.getters.panalTypeArray
  },
  methods: {
    showThis(sqlStatement, type) {
      return sqlStatement.indexOf(type) != -1 ? true : false
    },
    showOthers(sqlStatement) {
      let bool = (sqlStatement.indexOf('cpu') == -1) & (sqlStatement.indexOf('mem') == -1) & (sqlStatement.indexOf('disk') == -1) & (sqlStatement.indexOf('net') == -1)
      return bool
    },
    handleClose() {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true
          let buf = {}
          if (this.drawerTitle == '修改面板') {
            console.log('11111')
            buf['panalName'] = this.formatData.panalName
            buf['dbId'] = this.$route.query.dbId
            buf['sqlStatement'] = 'SELECT mean(\"' + this.field + '\") FROM \"' + this.measurement + '"'
            buf['panalTypeId'] = this.panalTypeArray.indexOf(this.chartType)
            getChart.updatePanal(this.buf).then(response => {
              // 动画关闭需要一定的时间
              this.timer = setTimeout(() => {
                this.dialog = false
                this.loading = false
                this.preserved()
              }, 400)
            }).catch(() => {
              this.loading = false;
            });
          } else {
            console.log('2222')

            buf['panalName'] = this.formatData.panalName
            console.log(buf)

            buf['dbId'] = this.$route.query.dbId
            console.log(buf)

            buf['sqlStatement'] = 'SELECT mean(\"' + this.field + '\") FROM \"' + this.measurement + '"'
            console.log(buf)

            buf['panalTypeId'] = this.panalTypeArray.indexOf(this.chartType)

            console.log(buf)
            getChart.created(buf).then(response => {
              // 动画关闭需要一定的时间
              this.timer = setTimeout(() => {
                this.dialog = false
                this.loading = false
                this.preserved()
              }, 400)
            }).catch(() => {
              this.loading = false;
            });
          }
        })
        .catch(_ => {
        })
    },
    getMeasurements() {
      let SQLStatement = 'SHOW MEASUREMENTS LIMIT 100'
      this.getData(SQLStatement).then(resp => {
        this.measurements = resp
        console.log(this.measurements)

      })
    },
    getField() {
      let SQLStatement = 'SHOW FIELD KEYS FROM ' + this.measurement
      this.getData(SQLStatement).then(resp => {
        this.fields = resp
        console.log(this.fields)
      })
    },
    // 获取图表的数据
    getChartData() {
      if (this.field == '' || this.measurement == '') {
        return
      }
      let t = this
      console.log(this.SQLStatement)
      this.getData(this.SQLStatement).then(resp => {
        let temp = {}
        let chartDataArray = []
        for (let item in resp) {
          let temp = {}
          temp['xdata'] = (resp[item][0])
          temp['ydata'] = (resp[item][1] == null ? 0 : resp[item][1])
          chartDataArray.push(temp)
        }
        this.chartData = chartDataArray
        console.log(this.chartData)
      })
    },
    getData(SQLStatement) {
      return getChart.getDataBySql({ DBIndex: this.$route.query.dbId, SQLStatement: SQLStatement }).then(response => {
        console.log(response.data.series[0].values)
        return response.data.series[0].values
      })
    },
    init() {
      console.log(this.$route.query)
      this.preserved()
    },
    //查询已经保存的某数据库的所有面板信息）根据数据库ID
    preserved() {
      let t = this
      t.fetchedPanalData = []
      getChart.fetched({ DBIndex: this.$route.query.dbId }).then(resp => {
        t.fetchedPanalInfo = resp.data

        let startTime, endTime
        if (this.value2 == null || this.value2.length != 2) {
          endTime = new Date()
          startTime = new Date()
          startTime.setTime(startTime.getTime() - 3600 * 1000 * 12)
        } else {
          endTime = this.value2[1]
          startTime = this.value2[0]
        }
        console.log(startTime, endTime)
        let start = startTime.getTime()
        let end = endTime.getTime()

        for (let item in t.fetchedPanalInfo) {
          let str = t.fetchedPanalInfo[item].sqlStatement + 'WHERE time >= ' + start + 'ms and time <= ' + end + 'ms GROUP BY time(10s)'
          console.log(str)
          this.getData(str).then(resp => {
            console.log(t.fetchedPanalInfo[item].panalName + '  获取到数据加入data中')
            let temp = {}
            temp['info'] = t.fetchedPanalInfo[item]
            let chartDataArray = []
            for (let item in resp) {
              let temp = {}
              temp['xdata'] = (resp[item][0])
              temp['ydata'] = (resp[item][1] == null ? 0 : resp[item][1])
              chartDataArray.push(temp)
            }
            temp['data'] = chartDataArray
            console.log(chartDataArray)
            t.fetchedPanalData.push(temp)
            console.log('qin', t.fetchedPanalData)
            // console.log(temp)
          })
        }
      })
    },
    updateChart(data) {
      this.drawerTitle = '修改面板'
      this.dialog = true
      this.getMeasurements()
      console.log(data.info)
      this.formatData.panalName = data.info.panalName
      this.formatData.id = data.info.id
      this.measurement = ''
      this.field = ''
      this.chartData = data.data
    },
    addNewChart() {
      this.drawerTitle = '增加面板'
      this.getMeasurements()
      this.dialog = true
      this.formatData.panalName = ''
      this.measurement = ''
      this.field = ''
      this.chartData = []
      this.flag = false
    },
    selectChartType(type) {

      this.chartType = type
      this.flag = true

    },
    removeChart(info) {
      this.$confirm('此操作将永久删除该面板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //此处进行删除
        getChart.deletePanal({ id: info.id }).then(resp => {
          if (resp.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.deleteFromList(info.id)
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    deleteFromList(id) {
      for(let item in this.fetchedPanalData){
        if(this.fetchedPanalData[item].info.id == id){
          this.fetchedPanalData.splice(item,1)
          break;
        }
      }
      for(let item in this.fetchedPanalInfo){
        if(this.fetchedPanalInfo[item].id == id){
          this.fetchedPanalInfo.splice(item,1)
          break;
        }
      }
    },

    cancelForm() {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    }
  }
}
</script>

<style scoped lang="scss">
.background {
  background-color: #1c44de;
}

.charttype-item {
  line-height: 1.428571429;
  color: #333333;
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
  box-sizing: border-box;
  display: inline-block;
  width: 60px;
  vertical-align: middle;
  text-align: center;
  margin-right: 20px;
  cursor: pointer;
  opacity: 1;

  .linechart {
    /*line-height: 1.428571429;*/
    /*color: #333333;*/
    /*font-size: 12px;*/
    /*text-align: center;*/
    /*cursor: pointer;*/
    /*box-sizing: border-box;*/
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url(../../../icons/images/linechart.png) no-repeat;
    background-size: contain;

  }

  .areachart {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url(../../../icons/images/areachart.png) no-repeat;
    background-size: contain;

  }

  .tablechart {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url(../../../icons/images/tablechart.png) no-repeat;
    background-size: contain;

  }

  .hotmapchart {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url(../../../icons/images/hotmap.png) no-repeat;
    background-size: contain;

  }

  .piechart {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url(../../../icons/images/piechart.png) no-repeat;
    background-size: contain;
  }

  .linechart-gray {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url(../../../icons/images/linechart-gray.png) no-repeat;
    background-size: contain;

  }

  .areachart-gray {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url(../../../icons/images/areachart-gray.png) no-repeat;
    background-size: contain;

  }

  .tablechart-gray {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url(../../../icons/images/tablechart-gray.png) no-repeat;
    background-size: contain;

  }

  .hotmapchart-gray {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url(../../../icons/images/hotmap-gray.png) no-repeat;
    background-size: contain;

  }

  .piechart-gray {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url(../../../icons/images/piechart-gray.png) no-repeat;
    background-size: contain;
  }
}


.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.panal {
  position: relative;
  /*height: 285px;*/
  /*padding: 0 0.1875rem 0.5rem;*/
  padding: 0 10px 10px;
  border: 1px solid rgba(25, 186, 139, 0.17);
  margin: 10px 20px 20px;
  // background-color: #02b553;
  background: url(../../../icons/images/line.png) rgba(255, 255, 255, 0.03);
  // 边框角
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-left: 2px solid #02a6b5;
    border-top: 2px solid #02a6b5;
    content: "";
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-right: 2px solid #02a6b5;
    border-top: 2px solid #02a6b5;
    content: "";
  }

  .panel-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    &::before {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 10px;
      height: 10px;
      border-left: 2px solid #02a6b5;
      border-bottom: 2px solid #02a6b5;
      content: "";
    }

    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-right: 2px solid #02a6b5;
      border-bottom: 2px solid #02a6b5;
      content: "";
    }
  }

  h1 {
    /*height: 0.6rem;*/
    margin-top: 20px;
    font-family: "mengxiangFont";
    color: #fff;
    line-height: 20px;
    text-align: center;
    font-size: 20px;
    font-weight: 400;

    a {
      color: #fff;
      text-decoration: none;
      margin: 0 0.125rem;
    }
  }
}

.panal1 {
  position: relative;
  height: 285px;
  padding: 0 0.1875rem 0.5rem;
  border: 1px solid rgba(25, 186, 139, 0.17);
  margin-bottom: 10px;
  margin-top: 10px;
  // background-color: #02b553;
  background: url(../../../icons/images/line.png) rgba(255, 255, 255, 0.03);
  // 边框角
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-left: 2px solid #02a6b5;
    border-top: 2px solid #02a6b5;
    content: "";
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-right: 2px solid #02a6b5;
    border-top: 2px solid #02a6b5;
    content: "";
  }

  .panel-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    &::before {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 10px;
      height: 10px;
      border-left: 2px solid #02a6b5;
      border-bottom: 2px solid #02a6b5;
      content: "";
    }

    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-right: 2px solid #02a6b5;
      border-bottom: 2px solid #02a6b5;
      content: "";
    }
  }

  h2 {
    /*height: 0.6rem;*/
    font-family: "mengxiangFont";
    color: #fff;
    line-height: 20px;
    text-align: center;
    font-size: 15px;
    font-weight: 400;

    a {
      color: #fff;
      text-decoration: none;
      margin: 0 0.125rem;
    }
  }

  .add-icon {
    cursor: pointer;

    position: absolute;
    font-size: 150px;
    font-weight: 100;
    color: white;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .chart {
    /*height: 3rem;*/
    height: 225px;
    margin: 6px;
    position: relative;

  }
}

.panal2 {
  cursor: pointer;
  position: relative;
  font-family: "mengxiangFont";
  text-align: center;
  font-size: 15px;
  color: #80E5F3;
  /*height: 52px;*/
  /*margin: 0 25px 0;*/
  padding: 10px 0.1875rem 0.5rem;
  border: 1px solid rgba(25, 186, 139, 0.17);
  // background-color: #02b553;
  background: url(../../../icons/images/line.png) rgba(255, 255, 255, 0.03);
}

@font-face {
  font-family: mengxiangFont;
  src: url(../../../font/RuiZiRuiXianMengXiangHeiJianV1-0-1.ttf);
}

.demo-drawer__footer {
  margin-left: 20px;
}
</style>
