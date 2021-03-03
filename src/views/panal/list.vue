<template>
  <div>
    <!--    head-->
    <div class="panal">
      <!--      <el-date-picker-->
      <!--        v-model="value2"-->
      <!--        type="datetimerange"-->
      <!--        align="right"-->
      <!--        unlink-panels-->
      <!--        range-separator="至"-->
      <!--        start-placeholder="开始日期"-->
      <!--        end-placeholder="结束日期"-->
      <!--        :picker-options="pickerOptions"-->
      <!--        style="top: 10px; left: 10px;position:absolute;"-->
      <!--      >-->
      <!--      </el-date-picker>-->
      <h1><{{ company }}>--企业监控面板</h1>
      <div class="panel-footer"></div>
    </div>
    <!--    body-->
    <div class="panal" v-for="item1 in departments">
      <h1><{{ company }}>--{{ item1.name }}</h1>
      <el-row :gutter="20">

        <div v-for="item in fetchedPanalData" v-if="item1.id == item.panal.departmentId">

          <el-col :span="8">
            <div class="panal1">
              <h2>{{ item.panal.description }}</h2>
              <div class="chart">
                <chart :chart-type="panalTypeArray[item.panal.panalTypeId]" :chart-data1="item.rows"
                       :axis="item.panal.x"/>
              </div>
              <div class="panel-footer"></div>

              <!--              <h2>{{item.info.panalName}}</h2>-->
              <!--              <div class="chart">-->
              <!--                <chart :chartType="panalTypeArray[item.info.panalTypeId]" :chartData="item.data"/>-->
              <!--              </div>-->
              <!--              <div class="panel-footer"></div>-->
            </div>
            <el-row :gutter="7">
              <el-col :span="8">
                <div class="panal2" v-waves @click="changeState(item)"
                     v-text="((item.panal.state == 1) ? '从首页删除' : '添加到首页')">
                </div>
              </el-col>
              <el-col :span="8">
                <div class="panal2" v-waves @click="removeChart(item.panal)">删除
                </div>
              </el-col>
<!--              <el-col :span="8">-->
<!--                <div class="panal2" v-waves @click="warning(item.panal)">预警-->
<!--                </div>-->
<!--              </el-col>-->
            </el-row>
          </el-col>
        </div>
        <el-col :span="8">
          <div class="panal1">
            <div class="el-icon-circle-plus-outline add-icon" @click="addNewChart()"></div>
            <div class="panel-footer"></div>
          </div>
        </el-col>

      </el-row>
      <div class="panel-footer"></div>

    </div>
    <!--    其他-->
    <div class="panal">
      <h1>{{ this.$route.query.dbName }}--其他</h1>
      <el-row :gutter="20">
        <div v-for="item in fetchedPanalData" v-if="showOthers(item.panal.departmentId)">
          {{ item.panal.departmentId }}
          <el-col :span="8">
            <div class="panal1">
              <!--              <h2>{{item.info.panalName}}</h2>-->
              <!--              <div class="chart">-->
              <!--                <chart :chartType="panalTypeArray[item.info.panalTypeId]" :chartData="item.data"/>-->
              <!--              </div>-->
              <!--              <div class="panel-footer"></div>-->
              <h2>{{ item.panal.description }}</h2>
              <div class="chart">
                <chart :chart-type="panalTypeArray[item.panal.panalTypeId]" :chart-data1="item.rows"
                       :axis="item.panal.x"/>
              </div>
              <div class="panel-footer"></div>
            </div>
            <el-row :gutter="7">
              <el-col :span="8">
                <div class="panal2" v-waves @click="changeState(item)"
                     v-text="((item.panal.state == 1) ? '从首页删除' : '添加到首页')">
                </div>
              </el-col>
              <el-col :span="8">
                <div class="panal2" v-waves @click="removeChart(item.panal)">删除
                </div>
              </el-col>
<!--              <el-col :span="8">-->
<!--                <div class="panal2" v-waves @click="warning(item.info)">预警-->
<!--                </div>-->
<!--              </el-col>-->
            </el-row>
          </el-col>
        </div>
        <el-col :span="8">
          <div class="panal1">
            <div class="el-icon-circle-plus-outline add-icon" @click="addNewChart()"></div>
            <div class="panel-footer"></div>
          </div>
        </el-col>

      </el-row>

      <div class="panel-footer"></div>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves/waves'
import * as getChart from '@/api/chart'
import * as getDepartment from '@/api/datasourceApi'
import chart from '@/views/dashboard/chart'
import * as dashboard from '@/api/homePage'
import * as getPanal from '@/api/datasourceApi'

export default {
  name: 'index',
  directives: { waves },
  components: {
    chart
  },
  computed: {
    SQLStatement() {
      const end = (new Date()).valueOf()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24)
      let start1 = start.valueOf()
      return 'SELECT mean(\"' + this.field + '\") FROM \"' + this.measurement + '\" WHERE time >= ' + start1 + 'ms and time <= ' + end + 'ms GROUP BY time(10s)'
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
    value2: function(newVal, oldVal) {
      console.log(newVal)
    }
  },
  data() {
    return {
      //部门
      departments: [],
      departmentIds: [],
      company: '',
      fetchedPanalData: [],
      chartData: [],
      chartType: 'line1',
      drawerTitle: '',
      table: false,
      dialog: false,
      loading: false,
      formatData: {
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
    this.company = this.$store.getters.company.company
    this.panalTypeArray = this.$store.getters.panalTypeArray
    this.init()
  },
  methods: {
    init() {
      this.company = this.$store.getters.company.company
      console.log(this.$route.query)
      this.preserved()
    },
    showOthers(id) {
      if (id == null || id == undefined) {
        return true
      }
      if (this.departmentIds.indexOf(id) == -1) {
        return false
      }
      return true
    },

    //查询已经保存的所有部门信息
    preserved() {
      //获取部门列表
      this.departmentsIds = []
      this.fetchedPanalData = []
      getDepartment.fetchDepartment().then(resp => {
        console.log(resp)
        this.departments = resp.data
        this.departmentsIds = []
        resp.data.forEach((item) => {
          this.departmentsIds.push(item.id)
        })
        console.log(this.departmentIds)
      })

      // 获取图表的数据
      dashboard.getAllPanal().then(resp1 => {
        console.log(resp1)
        this.fetchedPanalData = resp1.data.rows
        console.log(this.fetchedPanalData)

      })
    },
    //修改面板
    changeState(data) {
      if(data.panal.state == 0){
        let count = 0
        for(let index in this.fetchedPanalData){
          if(this.fetchedPanalData[index].panal.state == 1){
            count++;
          }
        }
        if(count>=5){
          this.$message({
            type: 'error',
            message: '当前首页面板已达最大数目'
          })
          return
        }
      }
      dashboard.changeState({ id: data.panal.id }).then(resp1 => {
        console.log(resp1)
        data.panal.state = 1 - data.panal.state
        // this.preserved()
      })
    },
    //添加面板
    addNewChart() {
      this.$router.push({ path: '/panal/add' })
    },
    //移除面板
    removeChart(info) {
      // this.$confirm('此操作将永久删除该面板, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   console.log("1111111111111")
      //   //此处进行删除

      //   this.$message({
      //     type: 'info',
      //     message: '取消删除'
      //   })
      // })
      this.$confirm('此操作将永久删除该面板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(info)
        //此处进行删除
        dashboard.deletePanal({ id: info.id }).then(resp => {
          if (resp.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.deleteFromList(info.id)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      });
    },
    deleteFromList(id) {
      for(let item in this.fetchedPanalData){
        if(this.fetchedPanalData[item].panal.id == id){
          this.fetchedPanalData.splice(item,1)
          break;
        }
      }
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
  background: url(../../icons/images/line.png) rgba(255, 255, 255, 0.03);
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
  background: url(../../icons/images/line.png) rgba(255, 255, 255, 0.03);
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
  background: url(../../icons/images/line.png) rgba(255, 255, 255, 0.03);
}

@font-face {
  font-family: mengxiangFont;
  src: url(../../font/RuiZiRuiXianMengXiangHeiJianV1-0-1.ttf);
}

.demo-drawer__footer {
  margin-left: 20px;
}
</style>
