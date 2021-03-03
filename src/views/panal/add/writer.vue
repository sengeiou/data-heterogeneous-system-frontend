<template>
  <div class="app-container">

    <!--    from-->
    <el-row :gutter="0">
      <el-col :span="1.5">
        <el-form class="demo-form-inline">
          <el-form-item label="FROM" :inline="true" style="min-width: 100px"></el-form-item>
        </el-form>
      </el-col>
      <el-col :span="15">
        <el-select v-model="from" placeholder="请选择">
          <el-option
            v-for="item in fromChoice"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="width: 180px"
            cle
          >
          </el-option>

        </el-select>
      </el-col>
    </el-row>

    <!--    select-->
    <el-row :gutter="0">
      <el-col :span="1.5">
        <el-form class="demo-form-inline">
          <el-form-item label="SELECT" :inline="true" style="min-width: 100px"/>
        </el-form>
      </el-col>
      <el-col :span="15">
        <el-form class="demo-form-inline" :disabled="this.from==''">
          <el-form-item style="color: white">
            注意：{{ this.notice }}
          </el-form-item>
          <el-form v-show="select.length == 0">
            <el-form-item :inline="true">
              <div :inline="true" class="el-icon-circle-plus-outline"
                   style=" color: white; font-size: 28px"
                   @click="addSelect"></div>
            </el-form-item>
          </el-form>
          <el-form-item v-for="(item, index) in select">
            <el-select v-model="item[0].value" placeholder="请选择">
              <el-option
                v-for="item in selectChoice1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="width: 180px"
              >
              </el-option>
            </el-select>
            <el-select v-model="item[1].value" placeholder="请选择" clearable>
              <el-option
                v-for="item in selectChoice2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="width: 180px"
              >
              </el-option>
            </el-select>
            <el-input
              placeholder="输入字段别名"
              :inline="true"
              style="width: 180px"
              v-model="item[2].value"
              clearable>
            </el-input>
            <div :inline="true" class="el-icon-remove-outline"
                 style=" color: white; font-size: 28px ;margin-left: 5px"
                 @click="deleteSelect(index)"></div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="3">
        <el-form v-show="select.length!=0">
          <el-form-item :inline="true">
            <div :inline="true" class="el-icon-circle-plus-outline"
                 style=" color: white; font-size: 28px"
                 @click="addSelect"></div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!--    where-->
    <el-row :gutter="0">
      <el-col :span="1.5">
        <el-form class="demo-form-inline">
          <el-form-item label="WHERE" :inline="true" style="min-width: 100px"/>
        </el-form>
      </el-col>
      <el-col :span="15">
        <el-form class="demo-form-inline" :disabled="this.from==''">
          <el-form-item v-for="(item, index) in where">
            <el-select v-model="item[0].value" placeholder="请选择">
              <el-option
                v-for="item in selectChoice1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="width: 180px"
              >
              </el-option>
            </el-select>
            <el-select v-model="item[1].value" placeholder="请选择" clearable>
              <el-option
                v-for="item in whereChoice2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="width: 180px"
              >
              </el-option>
            </el-select>

            <el-input
              :inline="true"
              style="width: 180px;margin-right: 10px"
              v-model="item[2].value"
              clearable>
            </el-input>

            <el-select v-model="item[3].value" placeholder="请选择and/or" clearable>
              <el-option
                v-for="item in whereChoice3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="width: 180px"
              >
              </el-option>
            </el-select>
            <div :inline="true" class="el-icon-remove-outline"
                 style=" color: white; font-size: 28px"
                 @click="deleteWhere(index)"></div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="3">
        <el-form>
          <el-form-item :inline="true">
            <div :inline="true" class="el-icon-circle-plus-outline"
                 style=" color: white; font-size: 28px"
                 @click="addWhere"></div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!--    group by-->
    <el-row :gutter="0">
      <el-col :span="1.5">
        <el-form class="demo-form-inline">
          <el-form-item label="GROUPBY" :inline="true" style="min-width: 100px"/>
        </el-form>
      </el-col>
      <el-col :span="15">
        <el-form :inline="true" class="demo-form-inline" :disabled="this.from==''">
          <el-form-item v-for="(item, index) in groupBy">
            <el-select v-model="item.value" placeholder="请选择">
              <el-option
                v-for="item1 in selectChoice1"
                :key="item1.value"
                :label="item1.label"
                :value="item1.value"
                style="width: 180px"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <div :inline="true" class="el-icon-remove-outline"
               v-if="groupBy.length != 0"
               style=" color: white; font-size: 28px"
               @click="deleteGroupBy()"></div>
        </el-form>
      </el-col>
      <el-col :span="3">
        <div :inline="true" class="el-icon-circle-plus-outline"
             v-if="groupBy.length == 0"
             style=" color: white; font-size: 28px"
             @click="addGroupBy"></div>

      </el-col>
    </el-row>

    <!--  sql -->
    <el-row :gutter="0">
      <el-col :span="1.5">
        <el-form class="demo-form-inline">
          <el-form-item label="SQL" :inline="true" style="min-width: 100px"/>
        </el-form>
      </el-col>
      <el-col :span="15">
        <el-input
          type="textarea"
          autosize
          style="width: 800px"
          v-model="sql">
        </el-input>
      </el-col>
    </el-row>

    <!--面板名称-->
    <el-row :gutter="0" style="margin-top: 20px">
      <el-col :span="1.5">
        <el-form>
          <el-form-item label="面板名称" :inline="true" style="min-width: 100px"/>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-input v-model="description" autocomplete="off" class="inputName"></el-input>
      </el-col>
    </el-row>
    <!--横坐标-->
    <el-row :gutter="0" v-show="computeChartType">
      <el-col :span="1.5">
        <el-form>
          <el-form-item label="横坐标" :inline="true" style="min-width: 100px"/>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-input v-model="measurement" placeholder="请填写横坐标的属性"></el-input>
      </el-col>
    </el-row>
    <!--面板类型-->
    <el-row :gutter="0">
      <el-col :span="1.5">
        <el-form>
          <el-form-item label="面板类型" :inline="true" style="min-width: 100px"/>
        </el-form>
      </el-col>
      <el-col :span="20">
        <div>
          <el-button icon="el-icon-s-marketing" :type="(chartType=='line1')? 'primary':'info'" round
                     @click="selectChartType('line1')" style="margin-bottom: 10px">折线图1
          </el-button>
          <el-button icon="el-icon-s-marketing" :type="(chartType=='line')? 'primary':'info'" round
                     @click="selectChartType('line')" style="margin-bottom: 10px">折线图2
          </el-button>
          <el-button icon="el-icon-s-marketing" :type="(chartType=='pie')? 'primary':'info'" round
                     @click="selectChartType('pie')" style="margin-bottom: 10px">饼图
          </el-button>
          <el-button icon="el-icon-s-marketing" :type="(chartType=='transverse')? 'primary':'info'" round
                     @click="selectChartType('transverse')" style="margin-bottom: 10px">进度条
          </el-button>
          <el-button icon="el-icon-s-marketing" :type="(chartType=='funnel')? 'primary':'info'" round
                     @click="selectChartType('funnel')" style="margin-bottom: 10px">漏斗图
          </el-button>
          <el-button icon="el-icon-s-marketing" :type="(chartType=='table')? 'primary':'info'" round
                     @click="selectChartType('table')" style="margin-bottom: 10px">表格
          </el-button>
          <el-button icon="el-icon-s-marketing" :type="(chartType=='heatmap')? 'primary':'info'" round
                     @click="selectChartType('heatmap')" style="margin-bottom: 10px">热力图
          </el-button>
          <!--          <el-button icon="el-icon-s-marketing" :type="(chartType=='radar')? 'primary':'info'" round-->
          <!--                     @click="selectChartType('radar')" style="margin-bottom: 10px">雷达图-->
          <!--          </el-button>-->
        </div>
      </el-col>
    </el-row>
    <!--图表预览-->
    <el-row :gutter="0">
      <el-col :span="3">
        <el-form>
          <el-button icon="el-icon-thumb" @click="getChartData" round type="success">图表预览</el-button>
          <!--          <el-form-item label="图表预览" :inline="true" style="min-width: 100px"/>-->
        </el-form>
      </el-col>
      <el-col :span="15" v-show="flag">
        <div :class="{background:(chartType!='table') }">
          <chart :chartType="chartType" :chart-data1="chartData" :axis="measurement"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as getPanal from '@/api/panal'
import chart from '@/views/dashboard/chart'
import * as parTime from '@/utils'

// const chartData1 = {
//   xdata: [],
//   ydata: [],
//   others: {}
// }

export default {
  name: 'Writer',
  components: { chart },
  computed: {
    computeChartType() {
      return this.chartType == 'line1' || this.chartType == 'line' ||
        this.chartType == 'transverse' || this.chartType == 'heatmap'
    }
  },
  data() {
    let t = this
    return {
      flag: false,
      chartData: [],
      responseData: [],
      formatData: {
        description: '',
        panalTypeId: 0,
        x: '',
        sql: ''
      },
      description: '',
      measurement: '',
      formLabelWidth: '80px',
      chartType: 'line1',
      panalTypeArray: [],

      notice: '创建一条折线,' +
        '需要设置横坐标',
      title: {
        table: '表格支持任意数量数据',
        pie: '饼图需要别名，name是分类，value是对应的值',
        line1: '创建一条折线,' +
          '需要设置横坐标',
        line: '创建两条折线\n' +
          '需要命名横坐标',
        transverse: '进度图需要三个一一对应的属性，' + '分别命名:' +
          'name，used，total',
        funnel: '漏斗图需要将某属性命名为为name',
        heatmap: '热力图支持的时间格式为:2020-10-06 19:32:38 ,需命名为time' +
          ',数值需命名为:value'
      },

      //前一步数据
      id: 0,
      source: '',
      schema: '',
      sql: '',
      //固定项
      arithmeticOperator: [
        { value: '+', label: '+' },
        { value: '-', label: '-' },
        { value: '*', label: '*' },
        { value: '/', label: '/' }
      ],
      logicalOperator: [
        { value: ' and ', label: 'and' },
        { value: ' or ', label: 'or' },
        { value: '==', label: '==' },
        { value: '>=', label: '>=' },
        { value: '<=', label: '<=' },
        { value: '<', label: '<' },
        { value: '>', label: '>' }
      ],
      aggregateFun: [
        { value: ' max', label: 'max' },
        { value: ' min', label: 'min' },
        { value: ' count', label: 'count' },
        { value: ' sum', label: 'sum' },
        { value: ' avg', label: 'avg' }
      ],
      brackets: [
        { value: '(', label: '(' },
        { value: ')', label: ')' }
      ],
      //属性
      //组合项
      selectChoice1: [],
      selectChoice2: [],

      fromChoice: [],

      // whereChoice: [],
      whereChoice1: [],
      whereChoice2: [],
      whereChoice3: [],

      groupByChoice: [],
      //实现添加
      select: [],
      from: '',
      where: [],
      groupBy: []
    }
  },
  created() {
    this.panalTypeArray = this.$store.getters.panalTypeArray

    this.selectChoice1 = []
    this.selectChoice2 = []

    this.fromChoice = []

    this.whereChoice1 = []
    this.whereChoice2 = []
    this.whereChoice3 = []

    this.groupByChoice = []
    this.selectChoice2 = this.aggregateFun
    this.whereChoice2 = [
      { value: '==', label: '==' },
      { value: '>=', label: '>=' },
      { value: '<=', label: '<=' },
      { value: '<', label: '<' },
      { value: '>', label: '>' }
    ]
    this.whereChoice3 = [
      { value: ' and ', label: 'and' },
      { value: ' or ', label: 'or' }
    ]
    //groupByChoice
    this.groupByChoice.push({})
  },
  watch: {
    // chartType(newValue, oldValue) {
    // },
    select: {
      handler(newValue, oldValue) {
        this.getSQL()
      },
      // immediate: true,
      deep: true
    },
    from: {
      handler(newValue, oldValue) {
        this.getSQL()
        this.lazyLoadHand()
      },
      deep: true
    },
    where: {
      handler(newValue, oldValue) {
        this.getSQL()
      },
      deep: true
    },
    groupBy: {
      handler(newValue, oldValue) {
        this.getSQL()
      },
      deep: true
    }
  },
  methods: {
    //获取属性
    lazyLoadHand() {
      let t = this
      console.log(this.selectChoice1)
      let sql = 'show columns from ' + this.from
      getPanal.executesql({ sql: sql })
        .then(res => {
          console.log(res)
          const cities = res.data.rows.map((value, i) => ({
            value: t.from + '.' + value.Column,
            label: value.Column,
            leaf: true
          }))
          // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          this.selectChoice1 = cities
        })
        .catch(err => {
          console.log(err)
        })
    },
    //获取表名
    lazyLoadFrom() {
      let t = this
      let sql = 'show tables from ' + t.source + '.' + t.schema
      console.log(sql)
      getPanal.executesql({ sql: sql })
        .then(res => {
          // console.log(res.data)
          console.log(res)
          const cities = res.data.rows.map((value, i) => ({
            value: t.source + '.' + t.schema + '.' + value.Table,
            label: value.Table
          }))
          this.fromChoice = cities
          console.log('123', t.fromChoice)
        })
    },
    setData(id, source, schema) {
      this.id = id
      this.source = source
      this.schema = schema
      console.log(this.source)
      this.lazyLoadFrom()
      this.addSelect()
    },
    selectChartType(type) {
      this.chartType = type
      this.notice = this.title[this.chartType]
    },
    getChartData() {
      getPanal.executesql({ sql: this.sql }).then(resp => {
        this.responseData = resp.data.rows
        this.chartData = resp.data.rows
        console.log(this.chartData)
        this.flag = true
      }).catch(err => {
        console.log(err)
      })
    },
    getData() {
      this.formatData.panalTypeId = this.panalTypeArray.indexOf(this.chartType)
      this.formatData.sql = this.sql
      this.formatData.description = this.description
      this.formatData.x = this.measurement

      return this.formatData
    },
    init() {
      this.select = []
      this.from = ''
      this.where = []
      this.groupBy = []
    },
    addSelect() {
      this.select.push([{ value: '' }, { value: '' }, { value: '' }])
    },
    addWhere() {
      this.where.push([{ value: '' }, { value: '' }, { value: '' }, { value: '' }])
    },
    addGroupBy() {
      this.groupBy.push({ value: '' })
    },
    deleteSelect(row) {
      this.select.splice(row, 1)
    },
    deleteWhere(row) {
      this.where.splice(row, 1)
    },
    deleteGroupBy() {
      this.groupBy = []
    },
    getSQL() {
      let sql = ''
      sql += this.getSelect() + '\n'
      sql += this.getFrom() + '\n'
      sql += this.getWhere() + '\n'
      sql += this.getGroupBy() + '\n'
      console.log(sql)
      this.sql = sql
    },
    getSelect() {
      if (this.select.length == 0) {
        return ''
      }
      //每个value都是数组
      var sel = ' SELECT '
      console.log(this.select)
      for (let i = 0; i < this.select.length; i++) {
        //s是一个数组
        let s1 = this.select[i][0].value//
        let s2 = this.select[i][1].value//
        let s3 = this.select[i][2].value//字符串
        if (s1 == null || s1 == '') {
          continue
        }
        let s = ''
        s += s1

        if (s2 != null && s2 != '') {
          sel += s2 + '(' + s + ') '
        } else {
          sel += s + ' '
        }

        if (s3 != null && s3 != '') {
          sel += 'as ' + s3 + ','
        } else {
          sel += ','
        }
      }
      return sel.substring(0, sel.length - 1)
    },
    getFrom() {
      if (this.from != '') {
        var fr = ' FROM ' + this.from + ' '
        return fr
      }
      return ''
    },
    getWhere() {
      if (this.where.length == 0) {
        return ''
      }
      //每个value都是数组
      var wh = ' WHERE '
      console.log(this.where)
      for (let i = 0; i < this.where.length; i++) {
        //s是一个数组
        let s1 = this.where[i][0].value//
        let s2 = this.where[i][1].value//数组
        let s3 = this.where[i][2].value//字符串
        let s4 = this.where[i][3].value//数组
        if (s1.length == 0) {
          continue
        }
        wh += s1 + ' ' + (s2.length != 0 ? s2 : '')
          + (s3) + (s4.length != 0 ? s4 : '')
      }
      return wh
    },
    getGroupBy() {
      if (this.groupBy.length == 0) {
        return ''
      }
      // 每个value都是数组
      var gr = ' GROUP BY '
      for (let i = 0; i < this.groupBy.length; i++) {
        //s是一个数组
        let s = this.groupBy[i].value
        gr += s
      }
      return gr
    }
  }
}
</script>
<style scoped>
.el-cascader {
  margin-right: 10px;
}
</style>
