<template>
  <div class="app-container">
    <div class="filter-container">
<!--      <el-input-->
<!--        placeholder="请输入用户名"-->
<!--        class="filter-item"-->
<!--        prefix-icon="el-icon-search"-->
<!--        v-model="username"-->
<!--        style="width: 200px;position:fixed;left: 350px;top:80px"-->
<!--        @keyup.enter.native="search">-->
<!--      </el-input>-->
      <el-button class="filter-item"  type="primary" icon="el-icon-edit" @click="actAdd">
        添加
      </el-button>
    </div>
    <div v-show="influxInfo">
      <el-table
        :data="influxdb"
        element-loading-text="Loading"
        v-loading="listLoading"
        border
        fit
        highlight-current-row
        :header-cell-style="setSellStyle"
        style="border-radius: 8px;border: 0px;"
      >
        <el-table-column align="center" label="序号" width="80">
          <template slot-scope="scope">{{ scope.$index }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="id"
          label="ID"
          width="200">
        </el-table-column>
        <el-table-column align="center" prop="username" label="influx用户名" width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="sourceName"
          label="数据源名称"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="dbName"
          label="数据库名字"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="url"
          label="URL">
        </el-table-column>
        <el-table-column
          align="center"

          label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="open(scope.$index,scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteInflux(scope.$index)">删除</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="showPanel(scope.$index)">进入资源面板</el-button>
          </template>
        </el-table-column>
      </el-table>

    <el-pagination
      class="showPage"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="pageNum"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :page-size="pageSize"
      :page-sizes="[1, 10, 20, 50]"
      :total='total'>
    </el-pagination>

      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
        <el-form :model="currInfo" :rules="rules">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="currInfo.username" placeholder="请设置influx用户名" autocomplete="off" style="width: 40%"></el-input>
          </el-form-item>
          <!--        v-if else-->
          <el-form-item v-if="visible"  label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="currInfo.password" type="password" placeholder="请设置influx密码" style="width: 40%">
              <i slot="suffix" title="显示密码" style="cursor:pointer" class="el-icon-view" @click="changePass('show')" />
            </el-input>
          </el-form-item>
          <el-form-item v-else label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="currInfo.password" type="text" placeholder="请设置influx密码" style="width: 40%">
              <i slot="suffix" title="隐藏密码" style="cursor:pointer" class="el-icon-check" @click="changePass('hide')" />
            </el-input>
          </el-form-item>
          <el-form-item label="数据库名字" :label-width="formLabelWidth" prop="dbName">
            <el-input v-model="currInfo.dbName" placeholder="请设置数据库名字" autocomplete="off" style="width: 40%"></el-input>
          </el-form-item>
          <el-form-item label="数据源名称" :label-width="formLabelWidth" prop="sourceName">
            <el-input v-model="currInfo.sourceName" placeholder="请设置数据源名称" autocomplete="off" style="width: 40%"></el-input>
          </el-form-item>
          <el-form-item label="URL" :label-width="formLabelWidth" prop="url">
            <el-input v-model="currInfo.url" placeholder="请设置数据库url" autocomplete="off" style="width: 40%"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ping">Test Ping</el-button>
          <el-button @click="cancelEdit">取 消</el-button>
          <el-button type="primary" @click="getAction">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<style>
.el-table td, .el-table th{
  text-align: center;
}
.showPage{
  position: absolute;
  bottom: 100px;
  margin: 0 auto;
}
.getdb {
  position: absolute;
  left:50px;
  top:40px;
  vertical-align: center;
  position: relative;
  font-size: 15px;
}
</style>
<script>
import { get,post } from '@/utils/request'

export default {
  name: "getInfo",
  data(){
    return {
      total: 0,
      listLoading: false,
      username: undefined,
      influxdb:[],
      currInfo:{},
      influxInfo:false,
      currentID:0,
      formLabelWidth: '100px',
      dialogFormVisible: false,
      action:undefined,
      dialogTitle:undefined,
      showID:undefined,
      pageNum:1,
      pageSize:10,
      // 密码是否可见
      visible: true,
      rules: {
        sourceName: [{ required: true, message: 'this is required', trigger: 'blur' }],
        username: [{ required: true, message: 'this is required', trigger: 'blur' }],
        password: [{ required: true, message: 'this is required', trigger: 'blur' }],
        url: [{ required: true, message: 'this is required', trigger: 'blur' }],
        dbName: [{ required: true, message: 'this is required', trigger: 'blur' }]
      },
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    setSellStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color:#409EFF;color:#fff;font-wight:200;font-size:15px;"
    },
    changePass(value) {
      this.visible = !(value === 'show')
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getInflux()
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getInflux()
    },
    actAdd(){
      this.action = 0;
      this.showID = true
      this.currInfo = {}
      this.dialogTitle = "添加influx数据库"
      this.dialogFormVisible = true
    },
    getAction(){
      if(this.action == 0){
        this.addInflux()
      }else{
        this.update()
      }
    },
    getInfo(){
      this.influxInfo = true
      this.getInflux()
    },
    getInflux(){
      const t = this
      get('/sys-influx/influx/all/info')
      .then(resp =>{
        t.influxdb = resp.data
        t.$message({
          message: '获取成功！',
          type: 'success'
        });
      })
        .catch(err => console.log(err))
    },
    search(){
    },
    cancelEdit(){
      this.dialogFormVisible = false
      this.$message('已取消编辑');
    },
    ping(){
      const t = this
      post('/sys-influx/influx/ping',this.currInfo)
      .then(resp =>{
        t.$message({
          message: '当前状态；可连通',
          type: 'success'
        });
      })
        .catch(err => console.log(err))
    },
    open(index) {
      this.dialogFormVisible = true
      this.action = 1
      this.showID = false
      this.dialogTitle = "编辑influx数据库信息"
      this.currentID = this.influxdb[index].id
      // es6写法。注意赋值的数据
      this.currInfo = Object.assign({}, this.influxdb[index]);
      console.log(this.currInfo)
    },
    addInflux(){
      const t = this
      post('/sys-influx/influx/saveinfo',this.currInfo)
        .then(resp =>{
          t.$message({
            message: '保存成功！',
            type: 'success'
          });
          this.dialogFormVisible = false

          t.getInflux()
          t.currInfo = []
        })
    },
    update(){
      const t = this
      t.dialogFormVisible = false
      post('/sys-influx/influx/updateinfo',this.currInfo)
        .then(resp =>{
          t.$message({
            message: '修改成功！',
            type: 'success'
          });
          t.getInflux()
          t.currInfo = []
        })
    },
    deleteInflux (index) {
      const t = this
      const id = t.influxdb[index].id
      get('/sys-influx/influx/deleteinfo?id='+id)
        .then(resp => {
          t.$message({
            message: '删除成功',
            type: 'success'
          });
          t.getInflux()
        })
    },
    showPanel(index){
      this.$router.push({ path:'/influx/panal/',query: {dbId: this.influxdb[index].id, dbName:this.influxdb[index].sourceName} })
    },
  }
}
</script>

<style scoped>

</style>
