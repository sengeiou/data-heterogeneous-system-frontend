<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-top:10px;">
      <el-col :span="8">
<!--        <div class="grid-content bg-purple">-->
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>个人中心</span>
            </div>
            <div  class="name-role">
              <el-image :src="dataForm.icon" style="border-radius: 10px;"></el-image>
            </div>
            <div class="name-role">
              <span class="sender">用户名 - {{dataForm.username}}</span>

            </div>
            <div class="name-role">
              <span class="sender">用户角色 - {{dataForm.roles[0]}}</span>
            </div>
            <div class="name-role">
              <span class="sender">公司名称 - {{dataForm.company}}</span>
            </div>
            <el-divider></el-divider>
            <div class="name-role">
              <el-button v-show="edit" type="primary" @click="editContent">编辑</el-button>
            </div>
          </el-card>

<!--        </div>-->

        <el-card class="box-card" style="margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>过往登录地址统计</span>
          </div>
          <div  class="name-role">
            <pie-chart :pieChartData = "pieChartData"/>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基本资料</span>
            </div>
            <div>
              <el-form label-width="80px" v-model="dataObject" size="small" label-position="right">
                <el-form-item label="用户昵称" prop="nickname">
                  <el-input  :disabled="edit" auto-complete="off" v-model="dataObject.nickName"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input :disabled="edit" auto-complete="off" v-model="dataObject.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input :disabled="edit" auto-complete="off" v-model="dataObject.email"></el-input>
                </el-form-item>
                <el-form-item label="个人介绍" prop="note">
                  <el-input :disabled="edit" auto-complete="off" v-model="dataObject.note"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button v-show="!edit" size="mini" type="primary" @click="commit">提交</el-button>
                <el-button v-show="!edit" size="mini" type="warning" @click="cancel">关闭</el-button>
              </div>
            </div>
          </el-card>
        </div>
        <el-card class="box-card" style="margin-top: 20px">
          <div slot="header" class="clearfix" >
            <span>当前用户登录次数统计</span>
          </div>
          <div>
<!--            <el-col :xs="24" :sm="24" :lg="8">-->
            <el-col>
              <div class="chart-wrapper">
                <bar-chart :barChartData="barChartData"/>
              </div>
            </el-col>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import BarChart from './components/BarChart'
  import PieChart from './components/PieChart'
  import { get,post } from '@/utils/request'

  const barChartData = {
    chartInfo: {
      xdata: [],
      ydata: []
    }
  }

  const pieChartData = {
    chartInfo: {
      categories: [],
      data: []
    }
  }

  export default {
    data(){
      return{
        barChartData: barChartData.chartInfo,
        pieChartData: pieChartData.chartInfo,
        chart: null,
        edit: true,
        dataForm:{
          email: "",
          phone: "",
          username: "",
          nickName: "",
          note: "",
          icon: "",
          roles: [],
          company: ""
        },
        dataObject:{
          username: "",
          email: "",
          phone: "",
          nickName: "",
          note: "",
          icon: ""
        },
        roleID:2,
        loginLog: [],
        loginRegion: []
      }
    },
    components: {
      BarChart,
      PieChart
    },
    mounted() {
      this.fetchData()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      cancel(){
        this.edit = true;
      },
      commit(){
        this.edit = true;
        this.update()
      },
      editContent(){
        this.edit = false;

      },
      fetchData() {
        const t = this
        this.listLoading = true
        this.$store.dispatch('user/getInfo', this.loginForm).then((data) => {
          console.log(data)
          this.dataForm = Object.assign({}, data);
          for (let i in t.dataObject){
            t.dataObject[i] = data[i]
          }
          console.log(this.dataObject)
          get('/sys-user/admin/login/log/day', {username: this.dataForm.username})
            .then(resp =>{
              t.loginLog = resp.data.list
              console.log(t.loginLog)
              t.barChartData.xdata = []
              t.barChartData.ydata = []
              for (let item in t.loginLog){

                console.log(item)
                t.barChartData.xdata.unshift(t.loginLog[item].loginTime)
                t.barChartData.ydata.unshift(t.loginLog[item].count)
              }
              console.log(t.barChartData.xdata)
              console.log(t.barChartData.ydata)
              // t.initChart()
            })

          get('/sys-user/admin/login/region', {username: this.dataForm.username})
            .then(resp =>{
              t.loginRegion = resp.data.list
              console.log(t.loginRegion)
              t.pieChartData.categories = []
              t.pieChartData.data = []
              for (let item in t.loginRegion){
                console.log(item)

                t.pieChartData.categories.unshift(t.loginRegion[item].name)
                t.pieChartData.data.unshift(t.loginRegion[item])
              }
              console.log(t.pieChartData.categories)
              console.log(t.pieChartData.data)
              // t.initChart()
            })
        })


      },
      update(){
        const t = this
        console.log(t.dataObject)
        post('/sys-user/admin/update/user',t.dataObject)
          .then(resp =>{
            t.$message({
              message: '修改成功！',
              type: 'success'
            });
            t.getList()
            t.admin = []
          })
      },
    }
  }
</script>

<style lang="scss" scoped>
  //卡片样式
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
  //文本样式区
  .name-role {
    font-size: 16px;
    padding: 5px;
    text-align:center;
  }
  .sender{
    text-align:center;
  }
  .registe-info{
    text-align: center;
    padding-top:10px;
  }
  .personal-relation {
    font-size: 16px;
    padding: 0px 5px 15px;
    margin-right: 1px;
    width: 100%
  }

  .relation-item {
    padding: 12px;

  }
  .dialog-footer{
    padding-top:10px ;
    padding-left: 7.7%;
  }
  //布局样式区
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
</style>
