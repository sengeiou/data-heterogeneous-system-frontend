<template>
  <div class="app-container">
    <div class="filter-container">

      <el-input v-model="username" placeholder="用户名" style="width: 200px;" class="filter-item" />
      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="fetchData">
        搜索
      </el-button>
      <el-button  class="filter-item" type="primary"  @click="showOrdinary">普通管理员</el-button>
      <el-button  class="filter-item" type="primary"  @click="showSuper">超级管理员</el-button>
      <el-button  class="filter-item" type="primary"  @click="showAll">全部</el-button>
    </div>

    <div >
      <el-table
        :data="nameList"
        element-loading-text="Loading"
        v-loading="listLoading"
        border
        fit
        highlight-current-row
        :header-cell-style="setSellStyle"
        style="border-radius: 8px;border: 0px;margin-bottom: 20px"
      >
        <el-table-column
          align="center"
          prop="id"
          label="ID"
          width="165">
        </el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="nickName"
          label="昵称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column
          align="center"
          prop="note"
          label="备注信息">
        </el-table-column>
        <el-table-column
          align="center"
          label="账号状态"
          width="90">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.status==1?'启用':'禁用' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="用户角色"
          width="110">
        </el-table-column>
        <el-table-column
          align="center"
          prop="description"
          label="角色描述"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          width="300px"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="open(scope.$index,scope.row)">修改账号状态</el-button>
            <el-button
              type="success"
              size="mini"
              @click="updateRole(scope.$index,scope.row)">修改角色</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteMember(scope.$index)">删除</el-button>
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
    </div>
  </div>
</template>

<script>
import { get,post } from '@/utils/request'

export default {
  name: 'userlist',
  data(){
    return{
      allUser: true,
      listLoading: true,
      username: undefined,
      total:0,
      className:2222,
      loading: false,
      dialogFormVisible: false,
      currentID: 0,
      roleID:2,
      pageNum:1,
      pageSize:10,
      admin:
        {
          email: "",
          phone: "",
          nickName: "",
          note: "",
          icon: "",
          status: 1
        },
      nameList:[]
    }
  },
  created() {
    this.getList()
  },
  methods:{
    setSellStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color:#409EFF;color:#fff;font-wight:200;font-size:15px;"
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList()
    },
    showOrdinary(){
      this.allUser= false
      this.pageNum = 1
      this.roleID = 2
      this.getList()
    },
    showSuper(){
      this.allUser = false
      this.pageNum = 1
      this.roleID = 5
      this.getList()
    },
    showAll(){
      this.allUser = true
      this.pageNum = 1
      this.getList()
    },
    open(index) {
      // this.dialogFormVisible = true
      this.currentID = this.nameList[index].id
      // es6写法。注意赋值的数据
      this.admin = Object.assign({}, this.nameList[index]);
      this.admin.status = (this.nameList[index].status == 1? 0:1)
      console.log(this.admin)

      this.update()
    },
    updateRole(index) {
      this.currentID = this.nameList[index].id
      let roleId = this.nameList[index].name == "超级管理员"? 2:5
      let t = this
      post('/sys-user/admin/role/update?adminId='+ this.currentID + '&roleIds=' + roleId)
        .then(resp => {
          t.$message({
            message: '修改成功',
            type: 'success'
          });
          t.getList()
        })
    },
    cancelEdit(){
      this.dialogFormVisible = false
      this.$message('已取消编辑');
    },
    confirm(index){
      const t = this
      this.$confirm('此操作将彻底删除该用户账号信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        t.deleteMember(t.nameList[index].id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    update(){
      const t = this
      const dataObj = {}
      t.dialogFormVisible = false
      get('/sys-user/admin/updateStatus/'+t.currentID)
        .then(resp =>{
          t.$message({
            message: '修改成功！',
            type: 'success'
          });
          t.getList()
          t.admin = []
        })

    },
    getList () {
      const t = this
      this.listLoading = true
      if (this.allUser == true){
        get('/sys-user/admin/listAllByPage',{
            pageNum: t.pageNum,
            pageSize: t.pageSize
        })
          .then(resp => {
            console.log(resp.data)
            this.listLoading = false
            t.nameList = resp.data.list
            t.total = parseInt(resp.data.total)
          })
          .catch(err => {
            this.listLoading = false
            console.log(err)
          })
      } else {
        get('/sys-user/admin/listByPage',{
          id: t.roleID,
          pageNum: t.pageNum,
          pageSize: t.pageSize
        })
          .then(resp => {
            console.log(resp.data)
            this.listLoading = false
            t.nameList = resp.data.list
            t.total = parseInt(resp.data.total)
          })
          .catch(err => {
            this.listLoading = false
            console.log(err)
          })
      }
    },
    fetchData() {
      const t = this
      this.listLoading = true
      get('/sys-user/admin/searchByUsername',{
        username: t.username,
        pageNum: t.pageNum,
        pageSize: t.pageSize
      }).then(resp => {
        console.log(resp.data)
        this.listLoading = false
        t.nameList = resp.data.list
        t.total = parseInt(resp.data.total)

      })
        .catch(err =>{
          this.listLoading = false
          console.log(err)
        })
    },
    deleteMember (index) {
      const t = this
      const id = t.nameList[index].id
      post('/sys-user/admin/delete/'+id)
        .then(resp => {
          t.$message({
            message: '删除成功',
            type: 'success'
          });
          t.getList()
        })
    },
  }

}
</script>


<style scoped>

  .el-table td, .el-table th{
    text-align: center;
  }

  body{
    margin: 0px;
  }
  .register-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 500px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .auth_input{
    width:140px;
    height:38px;
    margin-bottom:20px;
    border:1px solid #DCDFE6;
    /* color:red; */
    padding-left:10px;
    border-radius: 8%;
    font-size: 16px;
  }

  #codeButton{
    width: 200px;
    height: 30px;
    background: #505458;
    border: none;
    color: #ffffff;
    font-size: 14px;
  }
  /*.ordinary{*/
  /*  position: absolute;*/
  /*  left:50px;*/
  /*  top:40px;*/
  /*  vertical-align: center;*/
  /*  position: relative;*/
  /*  font-size: 15px;*/
  /*}*/
  /*.super{*/
  /*  position: absolute;*/
  /*  left:55px;*/
  /*  top:40px;*/
  /*  vertical-align: center;*/
  /*  position: relative;*/
  /*  font-size: 15px;*/
  /*}*/
  .showPage{
    position: absolute;
    bottom: 100px;
    margin: 0 auto;
  }
  .el-header {
    position: fixed;
    top:0px;
    left:0;
    right: 0;
    background-color: #FFCC00;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
</style>
